import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import {APRI10, BLACK} from 'Root/config/color';
import {Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList} from 'Root/api/community';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeEtc} from 'Root/api/likeetc';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import community_obj from 'Root/config/community_obj';
import {NETWORK_ERROR, REPORT_MENU, REVIEW_LIMIT} from 'Root/i18n/msg';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {searchProtectRequest} from 'Templete/style_templete';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';
import {useNavigation} from '@react-navigation/core';

export default ReviewMain = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		community_animal_type: [],
		box: {
			userInterestReview: {
				interests_etc: [],
				// interests_hospital: [],
				// interests_interior: [],
				// interests_review: [],
				// interests_trip: [],
				interests_group1: [],
				interests_group2: [],
				interests_group3: [],
				interests_etc: [],
				interests_location: {city: '', district: ''},
			},
		},
	});
	const [recommend, setRecommend] = React.useState([]);
	const [offset, setOffset] = React.useState(1);
	const [total, setTotal] = React.useState();
	const [refreshing, setRefreshing] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const filterRef = React.useRef(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (community_obj.review.length > 0) {
				setData(community_obj.review);
			}
		});
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [filterData]);

	//리프레시 시도 시, 데이터 및 페이징 초기화
	React.useEffect(() => {
		refreshing ? fetchData(true) : false;
	}, [refreshing]);

	const fetchData = isRefresh => {
		isRefresh ? false : setLoading(true); //refresh시도로 인한 api 접속은 loading indicator 미출력
		let params = {
			limit: REVIEW_LIMIT,
			page: offset,
		};
		const userInterestObj = filterData.box.userInterestReview;
		console.log('userInterestObj', userInterestObj);
		let arr = [];
		const selectedCategoryFilter = arr.concat(
			userInterestObj.interests_group1,
			userInterestObj.interests_group2,
			userInterestObj.interests_etc,
			userInterestObj.interests_group3,
		);
		// const selectedCategoryFilter = arr.concat(
		// 	userInterestObj.interests_review,
		// 	userInterestObj.interests_trip,
		// 	userInterestObj.interests_etc,
		// 	userInterestObj.interests_hospital,
		// 	userInterestObj.interests_interior,
		// );
		const hasLocationFilter = userInterestObj.interests_location.city != '';
		if (selectedCategoryFilter.length > 0) {
			userInterestObj.interests_group1.length > 0 ? (params.interests_group1 = userInterestObj.interests_group1) : false;
			userInterestObj.interests_group2.length > 0 ? (params.interests_group2 = userInterestObj.interests_group2) : false;
			userInterestObj.interests_etc.length > 0 ? (params.interests_etc = userInterestObj.interests_etc) : false;
			userInterestObj.interests_group3.length > 0 ? (params.interests_group3 = userInterestObj.interests_group3) : false;
		}
		// if (selectedCategoryFilter.length > 0) {
		// 	userInterestObj.interests_trip.length > 0 ? (params.interests_trip = userInterestObj.interests_trip) : false;
		// 	userInterestObj.interests_review.length > 0 ? (params.interests_review = userInterestObj.interests_review) : false;
		// 	userInterestObj.interests_etc.length > 0 ? (params.interests_etc = userInterestObj.interests_etc) : false;
		// 	userInterestObj.interests_hospital.length > 0 ? (params.interests_hospital = userInterestObj.interests_hospital) : false;
		// 	userInterestObj.interests_interior.length > 0 ? (params.interests_interior = userInterestObj.interests_interior) : false;
		// }
		if (hasLocationFilter) {
			params.interests_city = userInterestObj.interests_location.city;
			params.interests_district = userInterestObj.interests_location.district;
		}
		if (filterData.community_animal_type.length > 0) {
			params.community_animal_type = filterData.community_animal_type;
		}
		console.log('api 접속전 파라미터 : ', params);
		getCommunityList(
			params,
			result => {
				console.log('result / getCommunityList / ReviewMain :', result.msg.length);
				setTotal(result.total_count);
				const res = result.msg;
				let recommendList = [];
				res.map((v, i) => {
					if (v.community_is_recomment) {
						recommendList.push(v);
					}
				});
				let list = [];
				if (isRefresh) {
					//리프레싱 호출일 경우 해당 페이지만 갱신
					list = res;
				} else if (data != 'false') {
					//1페이지 이후 호출일 경우 더하기
					// console.log('temp lenth', [...data, ...res].length);
					list = [...data, ...res];
				} else {
					list = res;
				}
				setRecommend(recommendList); //추천 게시글 목록
				setData(list); //리뷰글 set
				community_obj.review = list; //전역 변수에 현재 리스트 갱신
				setOffset(offset + 1); //현재 페이지 +1
				setLoading(false); //로딩 종료
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				if (err.includes('code 500')) {
					setData([]);
					setTimeout(() => {
						Modal.alert(NETWORK_ERROR);
					}, 500);
				} else if (err.includes('없습니다')) {
					setData([]);
				}
				setLoading(false);
			},
		);
	};

	//필터 존재 여부 테스트
	const hasNoFilter = () => {
		const previousFilter = community_obj.reviewFilter.userInterestReview;
		let arr = [];
		const selectedCategoryFilter = arr.concat(
			previousFilter.interests_review,
			previousFilter.interests_trip,
			previousFilter.interests_etc,
			previousFilter.interests_hospital,
			previousFilter.interests_interior,
		);
		const isCategoryNotSelected = selectedCategoryFilter.length == 0;
		const none_interests_location = previousFilter.interests_location.city == '';
		return isCategoryNotSelected && none_interests_location;
	};

	//개 고양이 그외 버튼 필터 클릭
	const onPressAnimalFilter = (kind, bool) => {
		let temp = [...filterData.community_animal_type];
		temp.includes(kind) ? (temp = temp.filter(e => e != kind)) : temp.push(kind);
		setData('false');
		setOffset(1);
		setFilterData({...filterData, community_animal_type: temp});
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', data.length, total);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (data.length < total) {
			fetchData();
		}
	};

	//좌상단 필터 모달 호출
	const onPressFilter = () => {
		// console.log('filter', JSON.stringify(filterData));
		Modal.popReviewFilterModal(
			'Review',
			filterData.box.userInterestReview,
			() => Modal.close(),
			() => {
				filterRef.current = false;
				// setIsFilter(false);
				Modal.close();
			},
			arg => {
				console.log('arg', arg);
				const userInterestObj = arg.userInterestReview;
				let arr = [];
				let selectedCategoryFilter = [];
				selectedCategoryFilter = arr.concat(
					userInterestObj.interests_group1,
					userInterestObj.interests_group2,
					userInterestObj.interests_group3,
					userInterestObj.interests_etc,
				);
				// selectedCategoryFilter = arr.concat(
				// 	userInterestObj.interests_review,
				// 	userInterestObj.interests_trip,
				// 	userInterestObj.interests_etc,
				// 	userInterestObj.interests_hospital,
				// 	userInterestObj.interests_interior,
				// );

				const isCategoryNotSelected = selectedCategoryFilter.length == 0;
				setData('false'); //현재 리스트를 초기상태로 되돌림
				if (!arg.userInterestReview.interests_location.city && isCategoryNotSelected) {
					filterRef.current = false;
				} else {
					community_obj.reviewFilter = arg;
					filterRef.current = true;
				}
				setOffset(1);
				setFilterData({...filterData, box: arg});
			},
		);
	};

	//리뷰 좋아요 클릭
	const onPressLike = (index, bool) => {
		likeEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data[index]._id,
				is_like: bool,
			},
			result => {
				console.log('result/ onPressLike / ReviewMain : ', result.msg);
				// fetchData(); //offSet이 자동 increment되는 문제 발생 우선 보류
			},
			err => console.log('err / onPressLike / ReviewMain : ', err),
		);
	};

	//댓글 모두 보기 클릭
	const onPressReply = index => {
		// navigation.navigate('ReviewDetail', {community_object: data[index], comment: true});
		navigation.navigate({key: data[index]._id, name: 'ReviewDetail', params: {community_object: data[index], comment: true}});
	};

	//리뷰 썸네일 클릭
	const onPressReviewContent = index => {
		// navigation.navigate('ReviewDetail', {community_object: data[index]});
		navigation.navigate({key: data[index]._id, name: 'ReviewDetail', params: {community_object: data[index]}});
	};

	const onPressRecommendReview = data => {
		// navigation.navigate('ReviewDetail', {community_object: data});
		navigation.navigate({key: data._id, name: 'ReviewDetail', params: {community_object: data}});
	};

	//글쓰기 아이콘 클릭
	const onPressWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			navigation.navigate('CommunityWrite', {isReview: true});
		}
	};

	//즐겨찾기 클릭
	const onPressFavorite = (index, bool) => {
		console.log('data[index]._id,', data[index]._id);
		setFavoriteEtc(
			{
				collectionName: 'communityobjects',
				target_object_id: data[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc);
				// setData({...data, })
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setOffset(1);
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	const filterComponent = () => {
		return (
			<View style={[style.filter]}>
				<View style={[]}>{filterRef.current ? <Filter60Filled onPress={onPressFilter} /> : <Filter60Border onPress={onPressFilter} />}</View>
				<View style={[style.animalFilter]}>
					{!filterData.community_animal_type.includes('dog') ? (
						<AnimalButton type={'dog'} on={false} onPress={() => onPressAnimalFilter('dog')} />
					) : (
						<AnimalButton type={'dog'} on={true} onPress={() => onPressAnimalFilter('dog')} />
					)}
					{!filterData.community_animal_type.includes('cat') ? (
						<AnimalButton type={'cat'} on={false} onPress={() => onPressAnimalFilter('cat')} />
					) : (
						<AnimalButton type={'cat'} on={true} onPress={() => onPressAnimalFilter('cat')} />
					)}
					{!filterData.community_animal_type.includes('etc') ? (
						<AnimalButton type={'another'} on={false} onPress={() => onPressAnimalFilter('etc')} />
					) : (
						<AnimalButton type={'another'} on={true} onPress={() => onPressAnimalFilter('etc')} />
					)}
				</View>
			</View>
		);
	};

	const whenEmpty = () => {
		return <ListEmptyInfo text={'리뷰글이 없습니다.'} />;
	};

	if (data == 'false') {
		return (
			<View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
				<ActivityIndicator size={'large'} color={'black'} />
			</View>
		);
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					listKey={({item, index}) => index}
					showsVerticalScrollIndicator={false}
					refreshing
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					extraData={refreshing}
					renderItem={({item, index}) => {
						return (
							<>
								<ReviewList
									items={data}
									// recommend={filterRef.current ? [] : recommend}
									whenEmpty={whenEmpty}
									onPressReviewContent={onPressReviewContent}
									onPressReply={onPressReply}
									onPressLike={index => onPressLike(index, true)}
									onPressUnlike={index => onPressLike(index, false)}
									onPressFavorite={onPressFavorite}
									onPressRecommendReview={onPressRecommendReview}
									onEndReached={onEndReached}
								/>
							</>
						);
					}}
					ListHeaderComponent={filterComponent()}
				/>
				<TouchableOpacity activeOpacity={0.8} onPress={onPressWrite} style={[style.write, style.shadowButton]}>
					<WriteBoard />
				</TouchableOpacity>
				{loading ? (
					<View style={searchProtectRequest.indicatorCont}>
						<ActivityIndicator size="large" color={APRI10} />
					</View>
				) : (
					<></>
				)}
			</View>
		);
};
ReviewMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 694 * DP,
		paddingTop: 20 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
		// backgroundColor: 'red',
	},
	animalFilter: {
		width: 420 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 22 * DP,
	},
	shadow_filter: {
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		elevation: 2,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		borderRadius: 20 * DP,
	},
	shadowButton: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {},
		elevation: 3,
		borderRadius: 37 * DP,
	},
});
