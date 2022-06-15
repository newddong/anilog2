import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import {APRI10, BLACK} from 'Root/config/color';
import {Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeEtc} from 'Root/api/likeetc';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import community_obj from 'Root/config/community_obj';
import {NETWORK_ERROR, REPORT_MENU, REVIEW_LIMIT} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {searchProtectRequest} from 'Templete/style_templete';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';

export default ReviewMain = ({route, navigation}) => {
	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		etc: false,
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
	const [refreshing, setRefreshing] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const filterRef = React.useRef(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// filterRef.current ? false : fetchData(); //포커스마다 새로 fetch를 시도하면 상세글을 갔다가 메인페이지로 돌아와도 기존의 스크롤로 이동을 하지 않음
			// console.log('리뷰 게시글 전역변수 길이 :  ', community_obj.review.length);
			// console.log('community_obj.review.length : ', community_obj.review.length);
			if (community_obj.review.length > 0) {
				// let temp = [...data];
				setData(community_obj.review);
			}
			// fetchData();
		});
		fetchData();
		return unsubscribe;
	}, []);

	//리프레시 시도 시, 데이터 및 페이징 초기화
	React.useEffect(() => {
		refreshing ? fetchData(true) : false;
	}, [refreshing]);

	const fetchData = isRefresh => {
		isRefresh ? false : setLoading(true); //refresh시도로 인한 api 접속은 loading indicator 미출력
		getCommunityList(
			{
				limit: REVIEW_LIMIT,
				page: offset,
				community_type: 'review',
			},
			result => {
				console.log('result / getCommunityList / ReviewMain :', result.msg.review.length);
				const res = result.msg.review;
				let recommendList = [];
				res.map((v, i) => {
					if (v.community_is_recomment) {
						recommendList.push(v);
					}
				});
				let list = [];
				if (isRefresh) {
					list = res;
				} else if (data != 'false') {
					console.log('temp lenth', [...data, ...res].length);
					list = [...data, ...res];
				} else {
					list = res;
				}
				setRecommend(recommendList);
				setData(list);
				community_obj.review = list;
				setOffset(offset + 1);
				if (!hasNoFilter()) {
					doFilter(community_obj.reviewFilter, result.msg.review);
				}
				setLoading(false);
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

	//미트볼 클릭
	const onPressMeatball = index => {
		if (getData()[index].community_writer_id) {
			const isMyArticle = userGlobalObject.userInfo._id == getData()[index].community_writer_id._id;
			Modal.popSelectBoxModal(
				isMyArticle ? ['수정', '삭제'] : ['신고'],
				select => {
					console.log('select', select);
					switch (select) {
						case '수정':
							navigation.push('CommunityEdit', {previous: getData()[index], isReview: true});
							break;
						case '삭제':
							Modal.close();
							setTimeout(() => {
								Modal.popTwoBtn(
									'정말로 이 게시글을 \n 삭제하시겠습니까?',
									'아니오',
									'네',
									() => Modal.close(),
									() => {
										updateAndDeleteCommunity(
											{
												community_object_id: getData()[index]._id,
												community_is_delete: true,
											},
											result => {
												// console.log('result / updateAndDeleteCommunity / ArticleDetail : ', result.msg);
												Modal.close();
												setTimeout(() => {
													Modal.popNoBtn('게시글 삭제가 완료되었습니다.');
													setTimeout(() => {
														Modal.close();
														// fetchData();
													}, 600);
												}, 200);
											},
											err => {
												console.log('err / updateAndDeleteCommunity / ArticleDetail : ', err);
												Modal.alert(err);
											},
										);
									},
								);
							}, 200);
							break;
						case '신고':
							Modal.close();
							if (userGlobalObject.userInfo.isPreviewMode) {
								setTimeout(() => {
									Modal.popLoginRequestModal(() => {
										navigation.navigate('Login');
									});
								}, 100);
							} else {
								setTimeout(() => {
									Modal.popOneBtnSelectModal(
										REPORT_MENU,
										'이 게시물을 신고 하시겠습니까?',
										selectedItem => {
											createReport(
												{
													report_target_object_id: getData()[index]._id,
													report_target_object_type: 'communityobjects',
													report_target_reason: selectedItem,
													report_is_delete: false,
												},
												result => {
													console.log('신고 완료', result);
													Modal.close();
													Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
												},
												err => {
													Modal.close();
													if (err == '이미 신고되었습니다.') {
														Modal.popOneBtn('이미 신고하셨습니다.', '확인', () => Modal.close());
													}
												},
											);
										},
										'신고하기',
									);
								}, 200);
							}
							break;
						default:
							break;
					}
				},
				() => Modal.close(),
				false,
				false,
			);
		}
	};

	//개 고양이 그외 버튼 필터 클릭
	const onPressAnimalFilter = filter => {
		switch (filter) {
			case 'dog':
				setFilterData({...filterData, dog: !filterData.dog});
				break;
			case 'cat':
				setFilterData({...filterData, cat: !filterData.cat});
				break;
			case 'etc':
				setFilterData({...filterData, etc: !filterData.etc});
				break;
			default:
				break;
		}
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
		console.log('필터가 존재하므로 호출!');
		console.log('dofilter arg', arg);
		setFilterData({...filterData, box: arg});
		const userInterestObj = arg.userInterestReview;
		let filtered = [];
		if (review == undefined) {
			//기존의 필터가 존재하지 않은 경우
			filtered = getData();
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
				console.log(i, v.community_interests.interests_location);
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
		console.log('EndReached', getData().length % REVIEW_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (getData().length % REVIEW_LIMIT == 0) {
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
				community_obj.reviewFilter = arg;
				doFilter(arg);
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
		// navigation.push('CommunityCommentList', {community_object: getData()[index]});
		navigation.push('ReviewDetail', {community_object: getData()[index], comment: true});
	};

	//리뷰 썸네일 클릭
	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: getData()[index]});
	};

	const onPressRecommendReview = data => {
		navigation.push('ReviewDetail', {community_object: data});
	};

	//글쓰기 아이콘 클릭
	const onPressWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.navigate('CommunityWrite', {isReview: true});
		}
	};

	//즐겨찾기 클릭
	const onPressFavorite = (index, bool) => {
		console.log('data[index]._id,', getData()[index]._id);
		setFavoriteEtc(
			{
				collectionName: 'communityobjects',
				target_object_id: getData()[index]._id,
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

	//리스트에 출력될 리스트 목록 필터
	const getData = () => {
		let filtered = [];
		// console.log('data', data[0]);
		if (filterData.dog) {
			const getDogType = data.filter(e => e.community_animal_type == 'dog');
			getDogType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.cat) {
			const getCatType = data.filter(e => e.community_animal_type == 'cat');
			getCatType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.etc) {
			const getEtcType = data.filter(e => e.community_animal_type == 'etc');
			getEtcType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (!filterData.dog && !filterData.cat && !filterData.etc) {
			filtered = data;
		}
		return filtered;
	};

	const filterComponent = () => {
		return (
			<View style={[style.filter]}>
				<View style={[]}>{filterRef.current ? <Filter60Filled onPress={onPressFilter} /> : <Filter60Border onPress={onPressFilter} />}</View>
				<View style={[style.animalFilter]}>
					<View style={[]}>
						{!filterData.dog ? (
							<AnimalButton type={'dog'} on={false} onPress={() => onPressAnimalFilter('dog')} />
						) : (
							<AnimalButton type={'dog'} on={true} onPress={() => onPressAnimalFilter('dog')} />
						)}
					</View>
					<View style={[]}>
						{!filterData.cat ? (
							<AnimalButton type={'cat'} on={false} onPress={() => onPressAnimalFilter('cat')} />
						) : (
							<AnimalButton type={'cat'} on={true} onPress={() => onPressAnimalFilter('cat')} />
						)}
					</View>
					<View style={[]}>
						{!filterData.etc ? (
							<AnimalButton type={'another'} on={false} onPress={() => onPressAnimalFilter('etc')} />
						) : (
							<AnimalButton type={'another'} on={true} onPress={() => onPressAnimalFilter('etc')} />
						)}
					</View>
				</View>
			</View>
		);
	};

	const whenEmpty = () => {
		return <ListEmptyInfo text={'리뷰글이 없습니다.'} />;
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
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
									items={getData()}
									// recommend={filterRef.current ? [] : recommend}
									whenEmpty={whenEmpty}
									onPressReviewContent={onPressReviewContent}
									onPressReply={onPressReply}
									onPressMeatball={onPressMeatball}
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
