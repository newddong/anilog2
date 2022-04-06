import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Image} from 'react-native';
import {BLACK} from 'Root/config/color';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {styles} from 'Root/component/atom/image/imageStyle';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeEtc} from 'Root/api/likeetc';
import {favoriteEtc} from 'Root/api/favoriteect';

export default ReviewMain = ({route, navigation}) => {
	const [data, setData] = React.useState('false');
	const [isFilter, setIsFilter] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => fetchData());
		fetchData();
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		!isFilter ? fetchData() : false;
	}, [isFilter]);

	const fetchData = () => {
		getCommunityList(
			{
				community_type: 'review',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg);
				setData(result.msg.review);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				Modal.alert(err);
			},
		);
	};

	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		etc: false,
		filter: {
			location: {
				city: '',
				district: '',
			},
			category: [],
		},
	});

	const onPressMeatball = index => {
		console.log('index', index);
		const isMyArticle = userGlobalObject.userInfo._id == data[index].community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						navigation.push('CommunityEdit', {previous: data[index], isReview: true});
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
											community_object_id: data[index]._id,
											community_is_delete: true,
										},
										result => {
											// console.log('result / updateAndDeleteCommunity / ArticleDetail : ', result.msg);
											Modal.close();
											setTimeout(() => {
												Modal.popNoBtn('게시글 삭제가 완료되었습니다.');
												setTimeout(() => {
													Modal.close();
													fetchData();
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

	const onPressFilter = () => {
		setIsFilter(true);
		Modal.popInterestTagModal(
			'Review',
			{interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: []},
			() => Modal.close(),
			() => {
				setIsFilter(false);
				Modal.close();
			},
			arg => {
				// console.log('arg', arg);
				let filtered = getData();
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
						setData(filtered);
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

	//리뷰 좋아요 클릭
	const onPressLike = (index, bool) => {
		console.log('index', index, bool);
		likeEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data[index]._id,
				is_like: bool,
			},
			result => {
				console.log('result/ onPressLike / ReviewMain : ', result.msg);
				fetchData();
			},
			err => console.log('err / onPressLike / ReviewMain : ', err),
		);
	};

	//댓글 모두 보기 클릭
	const onPressReply = index => {
		navigation.push('CommunityCommentList', {community_object: data[index]});
	};

	//리뷰 썸네일 클릭
	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: data[index]});
	};

	//글쓰기 아이콘 클릭
	const onPressWrite = () => {
		navigation.navigate('CommunityWrite', {isReview: true});
	};

	//즐겨찾기 클릭
	const onPressFavorite = (index, bool) => {
		console.log('index', index, bool);
		favoriteEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg);
				// setData({...data, })
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
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
				<View style={[style.shadow_filter]}>
					{isFilter ? <Filter60Filled onPress={() => setIsFilter(false)} /> : <Filter60Border onPress={onPressFilter} />}
				</View>
				<View style={[style.animalFilter]}>
					<View style={[style.shadow]}>
						{!filterData.dog ? (
							<Animal_dog onPress={() => onPressAnimalFilter('dog')} />
						) : (
							<Animal_dog_off onPress={() => onPressAnimalFilter('dog')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{!filterData.cat ? (
							<Animal_cat onPress={() => onPressAnimalFilter('cat')} />
						) : (
							<Animal_cat_off onPress={() => onPressAnimalFilter('cat')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{!filterData.etc ? (
							<Animal_another onPress={() => onPressAnimalFilter('etc')} />
						) : (
							<Animal_another_off onPress={() => onPressAnimalFilter('etc')} />
						)}
					</View>
				</View>
			</View>
		);
	};

	const whenEmpty = () => {
		return (
			<>
				<Image
					style={[styles.img_square_246, {marginTop: 150 * DP}]}
					resizeMode={'stretch'}
					source={{
						uri: 'https://st.depositphotos.com/21121724/53932/v/600/depositphotos_539322694-stock-illustration-cartoon-home-pets-empty-feeder.jpg',
					}}
				/>
				<Text style={[txt.roboto36b]}>목록이 없네요.</Text>
			</>
		);
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
					renderItem={({item, index}) => {
						return (
							<>
								<ReviewList
									items={getData()}
									whenEmpty={whenEmpty}
									onPressReviewContent={onPressReviewContent}
									onPressReply={onPressReply}
									onPressMeatball={onPressMeatball}
									onPressLike={index => onPressLike(index, true)}
									onPressUnlike={index => onPressLike(index, false)}
									onPressFavorite={onPressFavorite}
								/>
							</>
						);
					}}
					ListHeaderComponent={filterComponent()}
					stickyHeaderIndices={[0]}
				/>
				<View style={[style.write, style.shadowButton]}>
					<WriteBoard onPress={onPressWrite} />
				</View>
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
		width: 676 * DP,
		paddingTop: 15 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
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
		// width: 140 * DP,
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
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
