import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import ReviewFavoriteBriefList from 'Root/component/organism/list/ReviewFavoriteBriefList';
import Loading from 'Root/component/molecules/modal/Loading';
import {likeEtc} from 'Root/api/likeetc';
import community_obj from 'Root/config/community_obj';
import {favoriteEtc, getFavoriteEtcListByUserId} from 'Root/api/favoriteetc';
import userGlobalObject from 'Root/config/userGlobalObject';

//즐겨찾기한 피드목록을 조회
export default FavoriteReview = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		// fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getFavoriteEtcListByUserId(
			{
				userobject_id: userGlobalObject.userInfo._id,
				collectionName: 'communityobjects',
			},
			result => {
				// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg[0]);
				let reviewCont = result.msg.filter(e => e.favorite_etc_post_id.community_type == 'review');
				let reviewList = reviewCont.map(v => v.favorite_etc_post_id);
				console.log('review length', reviewList.length);
				setData(reviewList);
			},
			err => {
				console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
				setData([]);
			},
		);
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
			Modal.popOneBtn('선택한 목록을 삭제하시겠습니까?', '해제', doDelete);
		}
	};

	const doDeleteFavorite = list => {
		list.map((v, i) => {
			console.log('v.id', v._id, v.community_title);
			favoriteEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: v._id,
					is_favorite: false,
				},
				result => {
					console.log('result/ onPressLike / FavoriteReview : ', result.msg.targetPost);
					cancelSelectMode(false);
					checkSelectMode(false);
					fetchData();
				},
				err => console.log('err / onPressLike / FavoriteReview : ', err),
			);
		});
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
		console.log('index', index);
		community_obj.object = data[index];
		community_obj.pageToMove = 'ReviewDetail';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 보고 있는 ArticleDetail이 없음
			//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
			navigation.navigate('COMMUNITY', {screen: 'ReviewMain', initial: false, params: {community_object: data[index], pageToMove: 'ReviewDetail'}});
		} else {
			//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
			navigation.navigate('COMMUNITY', {
				screen: 'ReviewDetail',
				initial: false,
				params: {community_object: data[index], reset: true},
			});
		}
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

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				{route.name == 'MyReview' ? (
					<></>
				) : (
					<View style={[temp_style.selectstat_view]}>
						<View style={[temp_style.selectstat, selectstat_view_style.selectstat]}>
							<SelectStat
								selectMode={selectMode}
								onSelectMode={checkSelectMode}
								onCancelSelectMode={cancelSelectMode}
								onSelectAllClick={selectAll}
								onDeleteSelectedItem={deleteSelectedItem}
							/>
						</View>
					</View>
				)}

				<View style={[temp_style.FeedThumbnailList, {flex: 1}]}>
					<ReviewFavoriteBriefList
						items={data}
						selectMode={selectMode}
						onPressReview={onPressReview}
						onPressLike={i => onPressLike(i, true)}
						onPressUnlike={i => onPressLike(i, false)}
						onPressCheck={onPressCheck}
					/>
				</View>
			</View>
		);
};
