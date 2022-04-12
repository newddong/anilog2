import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {followUser, getChekingFollow, getFollows, getUserListByNickname, unFollowUser} from 'Root/api/userapi';
import AccountHashList from 'Organism/list/AccountHashList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
import {favoriteEtc, getFavoriteEtcListByUserId} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import {EmptyIcon} from 'Root/component/atom/icon';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';

//즐겨찾기 친구
export default FavoriteUser = props => {
	const navigation = useNavigation();
	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	const [data, setData] = React.useState('false');
	let selectCNT = React.useRef(0);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		getFavoriteEtcListByUserId(
			{
				userobject_id: userGlobalObject.userInfo._id,
				collectionName: 'userobjects',
			},
			result => {
				console.log('result / getFavoriteEtcListByUserId : FavoriteUser ', result.msg.length);
				let userList = [];
				result.msg.map((v, i) => {
					getChekingFollow(
						{
							follow_userobject_id: v.favorite_etc_post_id._id,
						},
						result => {
							// console.log('result / getChekingFollow / FavoriteUser : ', result.msg);
							if (result.msg) {
								v.favorite_etc_post_id.is_follow = true;
							} else {
								v.favorite_etc_post_id.is_follow = false;
							}
							userList.push(v.favorite_etc_post_id);
							setData(userList);
						},
						err => {
							console.log(' err / getCheckingFollow / FavoriteUser : ', err);
						},
					);
					// v.favorite_etc_post_id.is_follow = true;
				});
			},
			err => {
				console.log(' err / getFavoriteEtcListByUserId : FavoriteUser : ', err);
				setData([]);
			},
		);
	};

	//Check Box On
	const showCheckBox = e => {
		// console.log(`showCheckBox=>${showCheckBox}`);
		setCheckBoxMode(e);
		//전체 선택을 처음 누를 경우 무조건 체크 박스가 모두 선택되도록 하기 위해 setSelectCNT값을 0으로 초기화.
		selectCNT.current = 0;

		//취소를 누르고 다시 선택하기를 누를 경우 선택되어 있는 체크박스가 없게 하기 위해 false로 초기화.
		let copy = [...data];
		copy.map((v, i) => {
			v._index = i;
			v.checkBoxState = false;
		});
		setData(copy);
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
		selectCNT.current += 1;
		let copy = [...data];
		// console.log('selectCNT.current =====>' + selectCNT.current);
		copy.map((v, i) => {
			//카운트의 2로 나눈 나머지값을 이용해서 전체 선택 혹은 전체 취소가 되도록 함.
			selectCNT.current % 2 == 1 ? (v.checkBoxState = true) : (v.checkBoxState = false);
		});
		setData(copy);
	};

	// 선택하기 => 선택 삭제 클릭
	const deleteSelectedItem = () => {
		// let copy = [...data];
		// copy = copy.filter(e => e.checkBoxState != true);
		// copy.map((v, i) => {
		// 	// console.log('index=>' + i);
		// 	v._index = i;
		// 	v.checkBoxState = false;
		// });
		// setData(copy);
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
					collectionName: 'userobjects',
					post_object_id: v._id,
					is_favorite: false,
				},
				result => {
					console.log('result/ onPressLike / FavoriteUser : ', result.msg.targetPost);
					// cancelSelectMode(false);
					// checkSelectMode(false);
					// checkBoxMode(false)
					fetchData();
				},
				err => console.log('err / onPressLike / FavoriteUser : ', err),
			);
		});
	};

	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
	};

	const onClickFollow = item => {
		if (item.is_follow) {
			unFollowUser(
				{
					follow_userobject_id: item._id,
				},
				result => {
					console.log('result / unFollow / FavoriteUser : ', result.msg);
					fetchData();
				},
				err => {
					console.log('err / unFollow / FavoriteUser : ', err);
				},
			);
		} else {
			followUser(
				{
					follow_userobject_id: item._id,
				},
				result => {
					console.log('result / unFollow / FavoriteUser : ', result.msg);
					fetchData();
				},
				err => {
					console.log('err / unFollow / FavoriteUser : ', err);
				},
			);
		}
	};

	const onClickLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	const onClickHash = data => {
		navigation.push('FeedListForHashTag', data);
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.roboto28b, {marginTop: 10 * DP}]}>즐겨찾기한 친구가 없습니다..</Text>
			</View>
		);
	};

	if (data == 'false') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<Loading isModal={false} />
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={[temp_style.selectstat_view]}>
					<View style={[temp_style.selectstat, selectstat_view_style.selectstat]}>
						<SelectStat
							onSelectMode={e => showCheckBox(e)}
							onCancelSelectMode={e => hideCheckBox(e)}
							onSelectAllClick={selectAll}
							onDeleteSelectedItem={deleteSelectedItem}
						/>
					</View>
				</View>
				<View style={[style.accountHashList, {height: null}]}>
					<AccountHashList
						data={data}
						checkBoxMode={checkBoxMode}
						onClickLabel={onClickLabel}
						onClickHash={onClickHash}
						onClickFollow={onClickFollow}
						onCheckBox={onCheckBox}
						routeName={props.route.name}
						showFollowBtn={true}
						whenEmpty={whenEmpty}
					/>
				</View>
			</View>
		);
	}
};

const style = StyleSheet.create({
	accountHashList: {
		// width: 654 * DP,
		marginTop: 30 * DP,
		paddingBottom: 100 * DP, // ScrollView로 주지 않아 아래가 잘리는 현상 처리
		alignItems: 'center',
		justifyContent: 'center',
	},
});
