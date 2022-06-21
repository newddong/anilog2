import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import {APRI10, BLACK} from 'Root/config/color';
import {Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeEtc} from 'Root/api/likeetc';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import community_obj from 'Root/config/community_obj';
import {NETWORK_ERROR, REPORT_MENU, REVIEW_LIMIT} from 'Root/i18n/msg';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {searchProtectRequest} from 'Templete/style_templete';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';

export default ReviewMain = ({route, navigation}) => {
	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		community_animal_type: [],
		box: {
			userInterestReview: {
				interests_etc: [],
				interests_hospital: [],
				interests_interior: [],
				interests_review: [],
				interests_trip: [],
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
		let arr = [];
		const selectedCategoryFilter = arr.concat(
			userInterestObj.interests_review,
			userInterestObj.interests_trip,
			userInterestObj.interests_etc,
			userInterestObj.interests_hospital,
			userInterestObj.interests_interior,
		);
		const hasLocationFilter = userInterestObj.interests_location.city != '';
		// console.log('selectedCategoryFilter', selectedCategoryFilter.length);
		// console.log('hasLocationFilter', hasLocationFilter);
		if (selectedCategoryFilter.length > 0) {
			userInterestObj.interests_trip.length > 0 ? (params.interests_trip = userInterestObj.interests_trip) : false;
			userInterestObj.interests_review.length > 0 ? (params.interests_review = userInterestObj.interests_review) : false;
			userInterestObj.interests_etc.length > 0 ? (params.interests_etc = userInterestObj.interests_etc) : false;
			userInterestObj.interests_hospital.length > 0 ? (params.interests_hospital = userInterestObj.interests_hospital) : false;
			userInterestObj.interests_interior.length > 0 ? (params.interests_interior = userInterestObj.interests_interior) : false;
		}
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

	//필터 적용(community_obj reviewFilter 존재 시 호출)
	const doFilter = (arg, review) => {
		//두 배열 간 비교 함수
		function compareArray(a, b) {
			for (let i = 0; i < a.length; i++) {
				for (let j = 0; j < b.length; j++) {
					if (a[i] == b[j]) {
						return true;
					}
				}
			}
		}
		// console.log('필터가 존재하므로 호출!');
		console.log('dofilter arg', arg);
		setFilterData({...filterData, box: arg});
		const userInterestObj = arg.userInterestReview;
		let filtered = [];
		if (review == undefined) {
			//기존의 필터가 존재하지 않은 경우
			filtered = data;
		} else {
			//기존 필터가 존재하는 경우 필터할 데이터를 보내줌
			filtered = review;
		}
		let arr = [];
		const selectedCategoryFilter = arr.concat(
			userInterestObj.interests_review,
			userInterestObj.interests_trip,
			userInterestObj.interests_etc,
			userInterestObj.interests_hospital,
			userInterestObj.interests_interior,
		);
		// console.log()
		const isCategoryNotSelected = selectedCategoryFilter.length == 0;
		if (!arg.userInterestReview.interests_location.city && isCategoryNotSelected) {
			filterRef.current = false;
		} else {
			filterRef.current = true;
		}
		let locationFilter = [];
		if (arg.userInterestReview.interests_location.city) {
			//도시 선택 필터가 존재할 경우 locationFilter에 필터링한 결과를 입력
			filtered.map((v, i) => {
				// console.log(i, v.community_interests.interests_location);
				if (v.community_interests.interests_location.city) {
					let apiCity = arg.userInterestReview.interests_location.city;
					let dbCity = v.community_interests.interests_location.city;
					let apiDistrict = arg.userInterestReview.interests_location.district;
					let dbDistrcit = v.community_interests.interests_location.district;
					const cityMatched = apiCity.includes(dbCity);
					const districtMatched = apiDistrict.includes(dbDistrcit);
					if (cityMatched && districtMatched) {
						locationFilter.push(v);
					}
				}
			});
			//도시 선택 필터가 존재, locationFilter로 카테고리 필터링 시작
			if (!isCategoryNotSelected) {
				console.log('도시선택 필터가 존재 , 카테고리도 존재');
				let category_filtered_list = [];
				locationFilter.map((v, i) => {
					let arr = [];
					const review_category_list = arr.concat(
						v.community_interests.interests_review,
						v.community_interests.interests_trip,
						v.community_interests.interests_etc,
						v.community_interests.interests_hospital,
						v.community_interests.interests_interior,
					);
					const checkMatchedCategory = compareArray(selectedCategoryFilter, review_category_list);
					checkMatchedCategory ? category_filtered_list.push(v) : false;
				});
				setData(category_filtered_list);
			} else {
				console.log('도시선택 필터가 존재 하지만 카테고리는 선택이 없음', locationFilter.length);
				setData(locationFilter);
			}
		} else {
			//도시 선택 필터가 존재하지 않는경우 tempData가 아닌 filtered로 카테고리 필터링 시작
			if (!isCategoryNotSelected) {
				console.log('도시 선택 필터는 없지만 카테고리는 선택한 상태');
				let category_filtered_list = [];
				console.log('filtered.length', filtered.length);
				filtered.map((v, i) => {
					let arr = [];
					const review_category_list = arr.concat(
						v.community_interests.interests_review,
						v.community_interests.interests_trip,
						v.community_interests.interests_etc,
						v.community_interests.interests_hospital,
						v.community_interests.interests_interior,
					);
					const checkMatchedCategory = compareArray(selectedCategoryFilter, review_category_list);
					checkMatchedCategory ? category_filtered_list.push(v) : false;
				});
				console.log('도시 선택 필터는 없지만 카테고리는 선택한 상태', category_filtered_list.length);
				setData(category_filtered_list);
			} else {
				console.log('도시선택 필터와 카테고리는 선택이 없으므로 전체 리스트와 동일');
				filterRef.current = false;
				// console.log(filtered);
				setOffset(1);
				fetchData();
			}
		}
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
				// console.log('arg', arg);
				const userInterestObj = arg.userInterestReview;
				let arr = [];
				const selectedCategoryFilter = arr.concat(
					userInterestObj.interests_review,
					userInterestObj.interests_trip,
					userInterestObj.interests_etc,
					userInterestObj.interests_hospital,
					userInterestObj.interests_interior,
				);
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
		navigation.push('ReviewDetail', {community_object: data[index], comment: true});
	};

	//리뷰 썸네일 클릭
	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: data[index]});
	};

	const onPressRecommendReview = data => {
		navigation.push('ReviewDetail', {community_object: data});
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
