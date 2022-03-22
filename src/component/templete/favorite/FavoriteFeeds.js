import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';

import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {CONFIRM_DELETE_FAVORITE_FEED, CONFIRM_DELETE_MY_FEED, CONFIRM_DELETE_TAG_ME_FEED} from 'Root/i18n/msg';
import {getFeedListByUserId, getFavoriteFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import {getUserProfile} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';

//즐겨찾기한 피드목록을 조회
export default FavoriteFeeds = ({route, navigation}) => {
	const [selectMode, setSelectMode] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [selectCNT, setSelectCNT] = React.useState(0);

	// console.log('token', token);
	React.useEffect(() => {
		switch (route.name) {
			case 'UserFeeds': //내 게시글
				getFeedListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
					},
					result => {
						console.log('result / getFeedListByUserId / FavoriteFeeds  : ', result.msg[0]);
						setData(result.msg);
					},
					err => {
						console.log('err / getFeedListByUserId / FavoriteFeeds : ', err);
					},
				);
				break;
			case 'FavoriteFeeds': //즐겨찾기한 피드 게시글
				getFavoriteFeedListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
					},
					result => {
						console.log('result / getFeedListByUserId / FavoriteFeeds  : ', result.msg);
						setData(result.msg);
					},
					err => {
						console.log('err / getFeedListByUserId / FavoriteFeeds : ', err);
					},
				);
				break;
			case 'TagMeFeeds': //나의 활동 => 나를 태그한 글
				getUserTaggedFeedList(
					{ userobject_id:  userGlobalObject.userInfo._id},
					result=> {
						console.log('유저의 태그된 피드 리스트', result);
						setData(result.msg);
					},
					err => {
						console.log(err);
						setData([]);
					}
				)
				// getFavoriteFeedListByUserId(
				// 	{
				// 		userobject_id: userGlobalObject.userInfo._id,
				// 	},
				// 	result => {
				// 		// console.log('result / getFeedListByUserId / FavoriteFeeds  : ', result.msg);
				// 		setData(result.msg);
				// 	},
				// 	err => {
				// 		console.log('err / getFeedListByUserId / FavoriteFeeds : ', err);
				// 	},
				// );
				break;

			default:
				break;
		}
	}, [route.params]);

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
			Modal.popOneBtn('선택된 피드가 없습니다.', '확인', () => Modal.close());
			// CheckBox 상태가 true인 것이 존재하는 경우 삭제 시작
		} else {
			console.log('삭제시작');
			const doDelete = () => {
				let copy = [...data];
				copy = copy.filter(element => element.checkBoxState != true); //CheckBoxState가 true인 경우엔 걸러진다
				setData(copy);
				Modal.close();
			};
			const deleteMsg = () => {
				//FavoriteFeeds는 총 세 개의 Screen 호출 - UserFeed, FavoriteFeeds, TagMeFeeds
				if (route.name == 'TagMeFeeds') {
					return CONFIRM_DELETE_TAG_ME_FEED;
				} else if (route.name == 'FavoriteFeeds') {
					return CONFIRM_DELETE_FAVORITE_FEED;
				} else return CONFIRM_DELETE_MY_FEED;
			};
			// Modal.popTwoBtn(deleteMsg(), '취소', '해제', () => Modal.close(), doDelete);
			Modal.popOneBtn(deleteMsg(), '해제', doDelete);
		}
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
		//v.checkBoxState = !v.checkBoxState와 같이 할 경우 체크 박스 값들이 각각 다를 경우 그것의 반대로만 변경 될 뿐 모두 선택되거나 모두 취소 되지 않음.
		setSelectCNT(selectCNT + 1);
		let copy = [...data];
		copy.map((v, i) => {
			//카운트의 2로 나눈 나머지값을 이용해서 전체 선택 혹은 전체 취소가 되도록 함.
			selectCNT % 2 == 0 ? (v.checkBoxState = true) : (v.checkBoxState = false);
			console.log('checkBoxState==>' + v.checkBoxState);
		});
		setData(copy);
	};

	//썸네일 클릭 - [ selecteMode에 따른 분기 ]
	const onClickThumnail = (index, feed_id) => {
		//선택하기 모드가 아닐 경우 (일반모드이며 썸네일 클릭시 네비게이션 동작)
		console.log('선택한 피드의 작성자 Id', feed_id.feed_writer_id._id);
		console.log('선택한 route.name', route.name);

		if (!selectMode) {
			const titleValue = feed_id.feed_writer_id.user_nickname;
			//선택모드 true값과 false값이 반대로 주는 이유 확인 후 case 문으로 변경 필요
			getUserProfile(
				{
					userobject_id: feed_id.feed_writer_id._id,
				},
				result => {
					console.log('result / getUserProfile / FavoriteFeeds   :', result.msg.feedList[0]);
					if (route.name == 'UserFeeds') {
						navigation.push('UserFeedList', {title: titleValue, userobject: result.msg, selected: feed_id});
					} else if (route.name == 'TagMeFeeds') {
						// console.log('tageme');
						navigation.push('TagMeFeedList', {title: titleValue + '님을 태그한 글', userobject: result.msg, selected: feed_id});
					} else if (route.name == 'FavoriteFeeds') {
						navigation.push('FavoriteFeedList', {title: titleValue + '님을 태그한 글', userobject: result.msg, selected: feed_id});
					}
					//다른 route가 있을 경우 else if 확장 할 것
					else {
						console.log('props.route.name=>' + route.name);
					}
				},
				err => {
					Modal.alert('err / getUserProfile / FavoriteFeeds ' + err);
				},
			);
		} else if (selectMode) {
			//SelectMode가 true일 경우, 썸네일 클릭 시 선택여부 state가 변화
			let copy = [...data];
			copy[index].checkBoxState = !copy[index].checkBoxState;
			setData(copy);
		}
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
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

			{/* 즐겨찾기한 FeedList출력하는 FeedThumbnailList */}
			<View style={[temp_style.FeedThumbnailList, {flex: 1}]}>
				{data.length == 0 ? (
					<Text style={[txt.noto30, {alignSelf: 'center', marginTop: 130, color: GRAY10}]}>목록이 없네요.</Text>
				) : (
					<FeedThumbnailList items={data} selectMode={selectMode} onClickThumnail={onClickThumnail} />
				)}
			</View>
		</View>
	);
};
