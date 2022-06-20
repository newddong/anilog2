import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {CONFIRM_DELETE_FAVORITE_FEED, CONFIRM_DELETE_MY_FEED, CONFIRM_DELETE_TAG_ME_FEED, NETWORK_ERROR, THUMNAIL_LIMIT} from 'Root/i18n/msg';
import {getFeedListByUserId, getFavoriteFeedListByUserId, getUserTaggedFeedList, favoriteFeed, deleteFeed} from 'Root/api/feedapi';
import {getUserProfile} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';

//즐겨찾기한 피드목록을 조회
export default FavoriteFeeds = ({route, navigation}) => {
	const [selectMode, setSelectMode] = React.useState(false);
	const [data, setData] = React.useState('false');
	const [total, setTotal] = React.useState();
	const [init, setInit] = React.useState(true);
	const [selectCNT, setSelectCNT] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		getList();
	}, []);

	const getList = refresh => {
		setLoading(true);
		let params = {
			userobject_id: userGlobalObject.userInfo._id,
			limit: THUMNAIL_LIMIT,
		};
		if (!init) {
			params.order_value = 'next';
		}
		setInit(false);
		if (data != 'false') {
			if (data.length - 1 != 0) {
				params.target_object_id = data[data.length - 1]._id;
			}
		}
		switch (route.name) {
			case 'UserFeeds': //내 게시글
				getFeedListByUserId(params, complete, handleError);
				break;
			case 'FavoriteFeeds': //즐겨찾기한 피드 게시글
				getFavoriteFeedListByUserId(params, complete, handleError);
				break;
			case 'TagMeFeeds': //나의 활동 => 나를 태그한 글
				getUserTaggedFeedList(params, complete, handleError);
				break;
			default:
				break;
		}
	};

	const complete = result => {
		let res = result.msg;
		if (route.name == 'FavoriteFeeds') {
			res = result.msg.map(v => v.favorite_feed_id);
		} else if (route.name == 'TagMeFeeds') {
			res = result.msg.map(v => v.usertag_feed_id);
		}
		// console.log('result', result);
		if (data != 'false') {
			setData([...data, ...res]);
		} else {
			setData(res);
		}
		setTotal(result.total_count);
		console.log('result.total_count', result.total_count);
		setLoading(false);
	};

	const handleError = err => {
		console.log('err / getFeedListByUserId / FavoriteFeeds : ', err);
		if (err.includes('code 500')) {
			Modal.popOneBtn(NETWORK_ERROR, '확인', () => Modal.close());
		}
		setData([]);
		setLoading(false);
	};

	const onEndReached = () => {
		if (data.length >= total) {
			console.log('토탈 초과');
		} else {
			getList();
		}
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

	//즐겨찾기 삭제 api
	const doDeltedFavorite = list => {
		list.map((v, i) => {
			favoriteFeed(
				{
					feedobject_id: v._id,
					userobject_id: userGlobalObject.userInfo._id,
					is_favorite: false,
				},
				result => {
					console.log('result / favoriteFeed / FavoriteFeeds : ', result.msg.favoriteFeed.favorite_feed_is_delete);
					const temp = data.filter(e => e.checkBoxState != true);
					setData(temp);
				},
				err => {
					console.log('err / favoriteFeed / FavoriteFeeds : ', err);
					if (err.includes('code 500')) {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => Modal.close());
					} else {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => Modal.close());
					}
				},
			);
		});
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
				console.log('route name', route.name);
				let copy = [...data];
				copy = copy.filter(element => element.checkBoxState == true); //CheckBoxState가 true인 경우엔 걸러진다
				console.log('copy', copy);
				switch (route.name) {
					case 'UserFeeds':
						for (const element of copy) {
							deleteFeed(
								{feed_object_id: element._id},
								result => {
									console.log('deleteFeed Success', result);
									let difference = data.filter(x => !copy.includes(x));
									setData(difference);
								},
								err => {
									console.log('deleteFeed err', err);
								},
							);
						}
						Modal.popOneBtn('삭제 되었습니다.', '확인', () => Modal.close());
						break;
					case 'FavoriteFeeds':
						doDeltedFavorite(copy);
						break;
					case 'TagMeFeeds':
						console.log('Tagme Delete');
						break;
				}

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

	const emptyMsg = () => {
		//FavoriteFeeds는 총 세 개의 Screen 호출 - UserFeed, FavoriteFeeds, TagMeFeeds
		if (route.name == 'TagMeFeeds') {
			return '나를 태그한 피드가 없습니다..';
		} else if (route.name == 'FavoriteFeeds') {
			return '즐겨찾기한 피드가 없습니다..';
		} else return '목록이 없습니다..';
	};

	//썸네일 클릭 - [ selecteMode에 따른 분기 ]
	const onClickThumnail = (index, feed_id) => {
		//선택하기 모드가 아닐 경우 (일반모드이며 썸네일 클릭시 네비게이션 동작)
		let passing_id = '';
		if (!selectMode) {
			if (feed_id.feed_type == 'feed') {
				if (feed_id.feed_avatar_id) {
					console.log('아바타로 작성한 글');
					passing_id = feed_id.feed_avatar_id;
				} else {
					passing_id = feed_id.feed_writer_id._id;
				}
			} else {
				passing_id = feed_id.feed_writer_id._id;
			}
			const titleValue = feed_id.feed_writer_id.user_nickname;
			//선택모드 true값과 false값이 반대로 주는 이유 확인 후 case 문으로 변경 필요
			getUserProfile(
				{
					userobject_id: passing_id,
				},
				result => {
					// console.log('result / getUserProfile / FavoriteFeeds   :', result.msg.feedList[0]);
					if (route.name == 'UserFeeds') {
						navigation.push('UserFeedList', {title: titleValue, userobject: result.msg, selected: feed_id});
					} else if (route.name == 'TagMeFeeds') {
						// console.log('tageme');
						navigation.push('TagMeFeedList', {
							title: userGlobalObject.userInfo.user_nickname + '님을 태그한 글',
							userobject: result.msg,
							selected: feed_id, //target_object_id
							index: index,
						});
					} else if (route.name == 'FavoriteFeeds') {
						// console.log('feed_id', feed_id);
						navigation.push('FavoriteFeedList', {title: '즐겨찾기한 게시글', userobject: result.msg, selected: feed_id});
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

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				{route.name == 'TagMeFeeds' ? (
					<SelectStat
						onSelectMode={checkSelectMode}
						onCancelSelectMode={cancelSelectMode}
						onSelectAllClick={selectAll}
						onDeleteSelectedItem={deleteSelectedItem}
						showBottomLine={false}
					/>
				) : (
					<SelectStat
						onSelectMode={checkSelectMode}
						onCancelSelectMode={cancelSelectMode}
						onSelectAllClick={selectAll}
						onDeleteSelectedItem={deleteSelectedItem}
						showBottomLine={false}
					/>
				)}

				{/* 즐겨찾기한 FeedList출력하는 FeedThumbnailList */}
				<View style={[{flex: 1}]}>
					{data.length == 0 ? (
						<ListEmptyInfo text={emptyMsg()} />
					) : (
						<FeedThumbnailList items={data} selectMode={selectMode} onClickThumnail={onClickThumnail} onEndReached={onEndReached} />
					)}
				</View>
				{loading ? (
					<View
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<ActivityIndicator size="large" color={APRI10} />
					</View>
				) : (
					<></>
				)}
			</View>
		);
};

const style = StyleSheet.create({
	feedThumbnailList: {
		// width: 750 * DP,
	},
});
