import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import {getCommunityList} from 'Root/api/community';
import ReviewFavoriteBriefList from 'Root/component/organism/list/ReviewFavoriteBriefList';
import Loading from 'Root/component/molecules/modal/Loading';
import {likeEtc} from 'Root/api/likeetc';
import community_obj from 'Root/config/community_obj';
import {getFavoriteEtcListByUserId} from 'Root/api/favoriteect';
import userGlobalObject from 'Root/config/userGlobalObject';

//즐겨찾기한 피드목록을 조회
export default FavoriteReview = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		getFavoriteEtcListByUserId(
			{
				userobject_id: userGlobalObject.userInfo._id,
				collectionName: 'communityobjects',
			},
			result => {
				// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg);
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
				copy = copy.filter(element => element.checkBoxState != true); //CheckBoxState가 true인 경우엔 걸러진다
				console.log('copy length', copy.length);
				setData(copy);
				Modal.close();
			};

			// Modal.popTwoBtn(deleteMsg(), '취소', '해제', () => Modal.close(), doDelete);
			Modal.popOneBtn('선택한 목록을 삭제하시겠습니까?', '해제', doDelete);
		}
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
			// alert('선택이 있다');
			const filtered = data.filter(e => e.checkBoxState == true);
			const len = data.length;
			const ratio = filtered / len;
			console.log('filtered', filtered);
			console.log('len', data.length);
			console.log('ratio', ratio);
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
				console.log('result/ onPressLike / ReviewMain : ', result.msg.targetPost.community_like_count);
				fetchData();
			},
			err => console.log('err / onPressLike / ReviewMain : ', err),
		);
	};

	// console.log('i', i);
	const onCheckBox = i => {
		let copy = [...data];
		copy[i].checkBoxState = !copy[i].checkBoxState;
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
								onSelectMode={checkSelectMode}
								onCancelSelectMode={cancelSelectMode}
								onSelectAllClick={selectAll}
								onDeleteSelectedItem={deleteSelectedItem}
							/>
						</View>
					</View>
				)}

				<View style={[temp_style.FeedThumbnailList, {flex: 1}]}>
					{data.length == 0 ? (
						<Text style={[txt.noto30, {alignSelf: 'center', marginTop: 130, color: GRAY10}]}>목록이 없네요.</Text>
					) : (
						<ReviewFavoriteBriefList
							items={data}
							selectMode={selectMode}
							onPressReview={onPressReview}
							onPressLike={i => onPressLike(i, true)}
							onPressUnlike={i => onPressLike(i, false)}
							onCheckBox={onCheckBox}
						/>
					)}
				</View>
			</View>
		);
};