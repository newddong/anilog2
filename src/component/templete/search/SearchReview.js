import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Image} from 'react-native';
import {BLACK, GRAY10} from 'Root/config/color';
import {Filter60Border, Filter60Filled} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Modal from 'Root/component/modal/Modal';
import {updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeEtc} from 'Root/api/likeetc';
import {useNavigation} from '@react-navigation/core';
import searchContext from 'Root/config/searchContext';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';
import community_obj, {updateReview} from 'Root/config/community_obj';
import {txt} from 'Root/config/textstyle';

export default SearchReview = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data.review ? props.data.review : []);
	const [searchInput, setSearchInput] = React.useState('');
	const [isFilter, setIsFilter] = React.useState(false);
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

	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
		setSearchInput(searchContext.searchInfo.searchInput);
	}, [searchContext.searchInfo.searchInput]);

	React.useEffect(() => {
		if (props.data.review) {
			let temp = props.data.review;
			// console.log('temp', temp);
			temp.map((v, i) => {
				v.community_is_favorite = v.is_favorite;
				v.community_is_like = v.is_like;
			});
			setData(temp);
		}
	}, [props.data.review]);

	const onPressMeatball = index => {
		const isMyArticle = getData()[index].community_writer_id && userGlobalObject.userInfo._id == getData()[index].community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						navigation.push('CommunityEdit', {previous: getData()[index], isReview: true, isSearch: searchInput});
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
						break;
					default:
						break;
				}
			},
			() => Modal.close(),
			false,
			false,
		);
	};

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

	const onPressFilterOff = () => {
		setIsFilter(false);
		setData(props.data.review);
	};

	const onPressFilter = () => {
		setIsFilter(true);
		Modal.popReviewFilterModal(
			'Review',
			// {interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: []},
			filterData.box.userInterestReview,
			() => Modal.close(),
			() => {
				Modal.close();
			},
			arg => {
				let filtered = getData();
				const userInterestObj = arg.userInterestReview;
				setFilterData({...filterData, box: arg});
				let arr = [];
				const selectedCategoryFilter = arr.concat(
					userInterestObj.interests_review,
					userInterestObj.interests_trip,
					userInterestObj.interests_etc,
					userInterestObj.interests_hospital,
					userInterestObj.interests_interior,
				);
				const isCategoryNotSelected = selectedCategoryFilter.length == 0;
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
						console.log('filtered', filtered.length);
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
						setIsFilter(false);
						setData(props.data.review || []);
					}
				}
			},
		);
	};

	function compareArray(a, b) {
		for (let i = 0; i < a.length; i++) {
			for (let j = 0; j < b.length; j++) {
				if (a[i] == b[j]) {
					return true;
				}
			}
		}
	}

	//댓글 모두 보기 클릭
	const onPressReply = index => {
		// navigation.push('CommunityCommentList', {community_object: getData()[index]});
		navigation.push('ReviewDetail', {community_object: getData()[index], comment: true});
	};

	//리뷰 썸네일 클릭
	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: getData()[index], searchInput: searchInput});
	};

	//글쓰기 아이콘 클릭
	const onPressWrite = () => {
		navigation.navigate('CommunityWrite', {isReview: true});
	};

	//리뷰 즐겨찾기 클릭
	const onPressFavorite = (index, bool) => {
		console.log('index', index, bool);
		setFavoriteEtc(
			{
				collectionName: 'communityobjects',
				target_object_id: getData()[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc);
				updateReview(false, getData()[index]._id, bool);
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
	};

	//리뷰 좋아요 클릭
	const onPressLike = (index, bool) => {
		console.log('index', index, bool);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			likeEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: getData()[index]._id,
					is_like: bool,
				},
				result => {
					console.log('result/ onPressLike / SearchReview : ', result.msg);
					props.resetCommunityList();
					updateReview(true, getData()[index]._id, bool);
				},
				err => console.log('err / onPressLike / SearchReview : ', err),
			);
		}
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
			<>
				<View style={{marginTop: 12 * DP, width: 694 * DP, alignSelf: 'center'}}>
					<Text style={[txt.noto24, {color: GRAY10}]}>검색 결과 {getData().length}개</Text>
				</View>
				<View style={[style.filter]}>
					<View style={[]}>{isFilter ? <Filter60Filled onPress={onPressFilter} /> : <Filter60Border onPress={onPressFilter} />}</View>
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
			</>
		);
	};

	const whenEmpty = () => {
		return <ListEmptyInfo paddingVertical={450 * DP} text={'검색 결과가 없습니다..'} />;
	};

	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					listKey={({item, index}) => index}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={filterComponent()}
					renderItem={({item, index}) => {
						return (
							<>
								<ReviewList
									items={getData()}
									whenEmpty={whenEmpty}
									onPressReviewContent={onPressReviewContent}
									onPressReply={onPressReply}
									onPressMeatball={onPressMeatball}
									showRecommend={false}
									onPressLike={index => onPressLike(index, true)}
									onPressUnlike={index => onPressLike(index, false)}
									onPressFavorite={onPressFavorite}
									isSearch={searchInput}
								/>
							</>
						);
					}}
				/>
				{/* <View style={[style.write, style.shadowButton]}>
					<WriteBoard onPress={onPressWrite} />
				</View> */}
			</View>
		);
};
SearchReview.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 694 * DP,
		paddingTop: 15 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	animalFilter: {
		width: 446 * DP,
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
		// width: 140 * DP,
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
		// shadowOpacity: 0.1,
		elevation: 2,
		shadowOffset: {
			height: 2 * DP,
		},
		borderRadius: 20 * DP,
	},
	shadowButton: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 39 * DP,
	},
});
