import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import DP from 'Root/config/dp';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {getFavoriteEtcListByUserId, setFavoriteEtcCancelList} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getCommunityListByUserId} from 'Root/api/community';
import SelectStat from 'Root/component/organism/list/SelectStat';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {FREE_LIMIT, NETWORK_ERROR} from 'Root/i18n/msg';
import {GRAY10, GRAY40} from 'Root/config/color';

//즐겨찾기한 커뮤니티 조회
export default FavoriteArticle = ({route, isFavorite}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);
	const [offset, setOffset] = React.useState(1);
	const [total, setTotal] = React.useState(0);

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
						limit: 100,
						page: offset,
						userobject_id: userGlobalObject.userInfo._id,
						community_type: 'free',
					},
					result => {
						setTotal(result.total_count);
						const res = result.msg.free.filter(
							e => e.community_writer_id != null && e.community_writer_id.user_nickname == userGlobalObject.userInfo.user_nickname,
						);
						// console.log('result / getCommunityListByUserId / FavoriteArticle', res.length);
						if (data != 'false') {
							console.log('temp lenth', [...data, ...res].length);
							setData([...data, ...res]);
						} else {
							setData(res);
						}
						setOffset(offset + 1);
					},
					err => {
						console.log('err / getCommunityListByUserId / FavoriteArticle : ', err);
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
						page: offset,
						limit: 100,
						userobject_id: userGlobalObject.userInfo._id,
						collectionName: 'communityobjects',
						community_type: 'free',
					},
					result => {
						setTotal(result.total_count);
						// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg);
						let articleList = [];
						result.msg.map((v, i) => {
							// console.log('v', i, v.favorite_etc_target_object_id.community_is_delete, v.favorite_etc_target_object_id.community_title);
							if (v.favorite_etc_target_object_id.community_type == 'free' && v.favorite_etc_target_object_id.community_is_delete != true) {
								v.favorite_etc_target_object_id.community_is_like = v.is_like;
								v.favorite_etc_target_object_id.community_is_favorite = v.is_favorite;
								articleList.push(v.favorite_etc_target_object_id);
							}
						});
						console.log('articleList', articleList.length);
						if (data != 'false') {
							console.log('temp lenth', [...data, ...articleList].length);
							setData([...data, ...articleList]);
						} else {
							setData(articleList);
						}
						setOffset(offset + 1);
					},
					err => {
						console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
						setData([]);
					},
			  );
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', data.length, total);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		// if (data.length < total) {
		fetchData();
		// }
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		console.log('index', index, selectMode);
		if (selectMode) {
			let copy = [...data];
			copy[index].checkBoxState = !copy[index].checkBoxState;
			setData(copy);
		} else {
			// navigation.navigate('ArticleDetail', {community_object: data[index], reset: true});
			navigation.navigate({key: data[index]._id, name: 'ArticleDetail', params: {reset: true, community_object: data[index]}});
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

	//즐겨찾기 선택모드에서 체크박스 클릭
	const onPressCheck = (i, bool) => {
		console.log('i', i, bool);
		let copy = [...data];
		copy[i].checkBoxState = bool;
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
				// setData(copy);
				Modal.close();
			};

			// Modal.popTwoBtn(deleteMsg(), '취소', '해제', () => Modal.close(), doDelete);
			Modal.popOneBtn('선택한 자유게시글을 즐겨찾기에서 \n 삭제하시겠습니까?', '삭제', doDelete);
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

	const whenEmpty = () => {
		return <ListEmptyInfo text={!isFavorite ? '작성한 자유게시글이 없습니다..' : '즐겨찾기한 자유게시글이 없습니다..'} />;
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
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
				<View style={[{marginTop: 5 * DP, flex: 1}]}>
					<ArticleList
						items={data}
						selectMode={selectMode}
						onPressCheck={onPressCheck}
						onPressArticle={onPressArticle} //게시글 내용 클릭
						whenEmpty={whenEmpty}
						onEndReached={onEndReached}
					/>
				</View>
			</View>
		);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
	},
	header: {
		width: 654 * DP,
		marginTop: 10 * DP,
		marginBottom: 30 * DP,
		alignItems: 'flex-end',
	},
	separator: {
		height: 10 * DP,
		width: 750 * DP,
		backgroundColor: GRAY40,
		marginBottom: 20 * DP,
	},
});
