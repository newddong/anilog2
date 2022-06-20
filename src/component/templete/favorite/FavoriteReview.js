import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import ReviewFavoriteBriefList from 'Root/component/organism/list/ReviewFavoriteBriefList';
import Loading from 'Root/component/molecules/modal/Loading';
import {likeEtc} from 'Root/api/likeetc';
import community_obj, {updateReview} from 'Root/config/community_obj';
import {getFavoriteEtcListByUserId, setFavoriteEtc, setFavoriteEtcCancelList} from 'Root/api/favoriteetc';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getCommunityListByUserId} from 'Root/api/community';
import {EmptyIcon} from 'Root/component/atom/icon';
import {txt} from 'Root/config/textstyle';
import {NETWORK_ERROR, REVIEW_BRIEF_LIMIT, REVIEW_LIMIT} from 'Root/i18n/msg';
import {GRAY40} from 'Root/config/color';

//즐겨찾기한 피드목록을 조회
export default FavoriteReview = ({route, isFavorite}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);
	const [offset, setOffset] = React.useState(1);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		// fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		!isFavorite
			? getCommunityListByUserId(
					{
						limit: REVIEW_BRIEF_LIMIT,
						page: offset,
						userobject_id: userGlobalObject.userInfo._id,
						community_type: 'review',
					},
					result => {
						// console.log('result.msg.review', result.msg.review.length);
						const res = result.msg.review.filter(
							e => e.community_writer_id != null && e.community_writer_id.user_nickname == userGlobalObject.userInfo.user_nickname,
						);
						let reviewList = [];
						console.log('result / getCommunityListByUserId / FavoriteCommunity', res.length);
						if (data != 'false') {
							console.log('temp lenth', [...data, ...res].length);
							// setData([...data, ...res]);
							reviewList = [...data, ...res];
						} else {
							reviewList = res;
						}
						setOffset(offset + 1);
						setData(
							reviewList
								.map((v, i, a) => {
									let height = 186 * DP;
									//사진이 없으며 카테고리 선택도 없는 경우
									if (!v.community_is_attached_file) {
										height = 186 * DP;
										//사진은 있지만 카테고리 선택이 없는 경우
									}
									return {...v, height: height + 40 * DP}; // ItemSeparator Componenet Height 2 추가
								})
								.map((v, i, a) => {
									let offset = a.slice(0, i).reduce((prev, current) => {
										return current.height + prev;
									}, 0);
									return {
										...v,
										offset: offset,
									};
								}),
						);
					},
					err => {
						console.log('err / getCommunityListByUserId / FavoriteCommunity : ', err);
						if (err.includes('code 500')) {
							setReview([]);
							setArticle([]);
							setTimeout(() => {
								Modal.alert(NETWORK_ERROR);
							}, 500);
						} else if (err.includes('없습니다')) {
							setReview([]);
							setArticle([]);
						}
					},
			  )
			: getFavoriteEtcListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
						collectionName: 'communityobjects',
					},
					result => {
						// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg[0]);
						let reviewList = [];
						result.msg.map(v => {
							if (v.favorite_etc_target_object_id.community_type == 'review') {
								v.favorite_etc_target_object_id.community_is_favorite = v.is_favorite;
								v.favorite_etc_target_object_id.community_is_like = v.is_like;
								reviewList.push(v.favorite_etc_target_object_id);
							}
						});
						setData(
							reviewList
								.map((v, i, a) => {
									let height = 186 * DP;
									//사진이 없으며 카테고리 선택도 없는 경우
									if (!v.community_is_attached_file) {
										height = 186 * DP;
										//사진은 있지만 카테고리 선택이 없는 경우
									}
									return {...v, height: height + 40 * DP}; // ItemSeparator Componenet Height 2 추가
								})
								.map((v, i, a) => {
									let offset = a.slice(0, i).reduce((prev, current) => {
										return current.height + prev;
									}, 0);
									return {
										...v,
										offset: offset,
									};
								}),
						);
					},
					err => {
						console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
						if (err.includes('code 500')) {
							setData([]);
							setTimeout(() => {
								Modal.alert(NETWORK_ERROR);
							}, 500);
						} else if (err.includes('없습니다')) {
							setData([]);
						}
					},
			  );
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', data.length % REVIEW_BRIEF_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (data.length % REVIEW_BRIEF_LIMIT == 0) {
			fetchData();
		}
	};

	//Check Box On
	const checkSelectMode = state => {
		console.log('state', state);
		setSelectMode(state);
		//전체 선택을 처음 누를 경우 무조건 체크 박스가 모두 선택되도록 하기 위해 setSelectCNT값을 0으로 초기화.
		setSelectCNT(0);
		//취소를 누르고 다시 선택하기를 누를 경우 선택되어 있는 체크박스가 없게 하기 위해 false로 초기화.
		let copy = [...data];
		copy.map((v, i) => {
			v.checkBoxState = false;
		});
		setData(copy);
	};

	//CheckBox Off
	const cancelSelectMode = e => {
		data.map((v, i) => {
			v.checkBoxState = false;
		});
		setSelectMode(e);
	};

	// 선택하기 => 선택 삭제 클릭
	const deleteSelectedItem = () => {
		//현재 dummyData 중 CheckBox 상태가 true인 것이 없는 경우
		if (data.findIndex(e => e.checkBoxState == true) == -1) {
			Modal.popOneBtn('선택된 리뷰가 없습니다.', '확인', () => Modal.close());
			// CheckBox 상태가 true인 것이 존재하는 경우 삭제 시작
		} else {
			console.log('삭제시작');
			const doDelete = () => {
				let copy = [...data];
				copy = copy.filter(element => element.checkBoxState == true); //CheckBoxState가 true인 경우엔 걸러진다
				console.log('copy length', copy.length);
				doDeleteFavorite(copy);
				setData(copy);
				Modal.close();
			};

			// Modal.popTwoBtn(deleteMsg(), '취소', '해제', () => Modal.close(), doDelete);
			isFavorite
				? Modal.popOneBtn('선택한 리뷰를 즐겨찾기에서 \n 해제하시겠습니까?', '해제', doDelete)
				: Modal.popOneBtn('선택한 목록을 삭제하시겠습니까?', '해제', doDelete);
		}
	};

	const doDeleteFavorite = list => {
		const listToDelete = list.map(v => v._id);
		console.log('listToDelete', listToDelete);
		setFavoriteEtcCancelList(
			{
				collectionName: 'communityobjects',
				target_object_id: listToDelete,
				is_favorite: false,
			},
			result => {
				console.log('result/ setFavoriteEtcCancelList / FavoriteReview : ', result.msg);
				cancelSelectMode(false);
				checkSelectMode(false);
				fetchData();
				listToDelete.map((v, i) => {
					updateReview(false, v, false);
				});
			},
			err => console.log('err / setFavoriteEtcCancelList / FavoriteReview : ', err),
		);
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
		//v.checkBoxState = !v.checkBoxState와 같이 할 경우 체크 박스 값들이 각각 다를 경우 그것의 반대로만 변경 될 뿐 모두 선택되거나 모두 취소 되지 않음.
		setSelectCNT(selectCNT + 1);
		let copy = [...data];
		if (data.findIndex(e => e.checkBoxState == true) == -1) {
			copy.map((v, i) => {
				copy[i].checkBoxState = true;
			});
		} else {
			console.log('선택이 있다');
			const filtered = data.filter(e => e.checkBoxState == true);
			const len = data.length;
			const ratio = filtered.length / len;
			// console.log('filtered', filtered);
			console.log('len', data.length);
			console.log('ratio', ratio);
			if (ratio < 0.5) {
				copy.map((v, i) => {
					copy[i].checkBoxState = true;
				});
			} else {
				copy.map((v, i) => {
					copy[i].checkBoxState = false;
				});
			}
		}
		setData(copy);
	};

	//선택모드가 아닌 상태에서 리뷰를 클릭
	const onPressReview = index => {
		navigation.push('ReviewDetail', {community_object: data[index]});
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
				console.log('result/ onPressLike / FavoriteReview : ', result.msg.targetPost.community_like_count);
				fetchData();
				updateReview(true, data[index]._id, bool); // 리뷰 메인 페이지 데이터 전역변수 최신화
			},
			err => console.log('err / onPressLike / FavoriteReview : ', err),
		);
	};

	//즐겨찾기 선택모드에서 체크박스 클릭
	const onPressCheck = (i, bool) => {
		console.log('i', i, bool);
		let copy = [...data];
		copy[i].checkBoxState = bool;
		setData(copy);
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.noto28, {marginTop: 10 * DP}]}>{!isFavorite ? '작성한 리뷰글이 없습니다..' : '즐겨찾기한 리뷰가 없습니다..'} </Text>
			</View>
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={style.separator} />
				{!isFavorite ? (
					<></>
				) : (
					<SelectStat
						selectMode={selectMode}
						onSelectMode={checkSelectMode}
						onCancelSelectMode={cancelSelectMode}
						onSelectAllClick={selectAll}
						onDeleteSelectedItem={deleteSelectedItem}
					/>
				)}
				<View style={[{flex: 1}]}>
					<ReviewFavoriteBriefList
						items={data}
						selectMode={selectMode}
						onPressReview={onPressReview}
						onPressLike={i => onPressLike(i, true)}
						onPressUnlike={i => onPressLike(i, false)}
						onPressCheck={onPressCheck}
						whenEmpty={whenEmpty}
						onEndReached={onEndReached}
					/>
				</View>
			</View>
		);
};

const style = StyleSheet.create({
	selectstat_view: {
		width: 694 * DP,
		height: 100 * DP,
	},
	separator: {
		height: 10 * DP,
		width: 750 * DP,
		backgroundColor: GRAY40,
		marginBottom: 10 * DP,
	},
});
