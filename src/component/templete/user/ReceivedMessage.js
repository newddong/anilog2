import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {deleteMemoBoxWithUserObjectID, getMemoBoxAllList} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import {login_style, temp_style} from '../style_templete';
import NoteList from 'Root/component/organism/list/NoteList';
import Modal from 'Root/component/modal/Modal';
import UserNote from 'Root/component/organism/listitem/UserNote';
import Loading from 'Root/component/molecules/modal/Loading';
export default ReceivedMessage = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);

	//받은 쪽지함, 보낸쪽지함 처리
	React.useEffect(() => {
		getMemoBoxListFunction();
	}, []);

	const getMemoBoxListFunction = () => {
		// setData(dummyData);
		getMemoBoxAllList(
			{},
			result => {
				console.log('result', result.msg.length);
				setData(
					result.msg.map(v => {
						v = {...v, checkBoxState: false};
						return v;
					}),
				);
			},
			err => {
				console.log('getMemoBoxAllList error : ', err);
			},
		);
	};

	//Check Box On
	const checkSelectMode = state => {
		// console.log('state', state);
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

	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
		setData(copy);
	};

	const onClickLabel = (item, index) => {
		if (selectMode) {
			let copy = [...data];
			copy[index].checkBoxState = !copy[index].checkBoxState;
			setData(copy);
		} else navigation.navigate('UserNotePage', {title: item.opponent_user_nickname, _id: item.opponent});
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
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

	const deleteSelectedItem = () => {
		if (data.findIndex(e => e.checkBoxState == true) == -1) {
			Modal.popOneBtn('선택된 쪽지가 없습니다.', '확인', () => Modal.close());
		} else {
			Modal.popTwoBtn('선택한 쪽지내역을 삭제하시겠습니까?', '취소', '삭제', Modal.close, () => doDelete());
		}
		// setCheckBoxMode(false);
		// getMemoBoxListFunction();
	};

	const doDelete = () => {
		let copy = [...data];
		copy = copy.filter(e => e.checkBoxState == true);
		copy.map((v, i) => {
			// console.log('vvv', v);
			deleteMemoBoxWithUserObjectID(
				{user_object_id: v.opponent},
				result => {
					// console.log('delelteMemoBoxWithUser success', result);
					if (i == copy.length - 1) {
						getMemoBoxListFunction();
					}
				},
				err => {
					console.log('deleteMomoBoxWithUser err', err);
				},
			);
			// console.log('index=>' + i);
			v._index = i;
			v.checkBoxState = false;
		});
		Modal.close();
		// onRefresh();
		setSelectMode(false);
		// checkSelectMode(false);
	};

	//Checkbox off
	const cancelSelectMode = e => {
		data.map((v, i) => {
			v.checkBoxState = false;
		});
		setSelectMode(e);
	};

	const [refreshing, setRefreshing] = React.useState(false); //위로 스크롤 시도 => 리프레싱

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	React.useEffect(() => {
		refreshing ? getMemoBoxListFunction() : false;
	}, [refreshing]);

	const whenEmpty = () => {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<Text>쪽지 내역이 없습니다.</Text>
			</View>
		);
	};

	const ITEM_HEIGHT = 94 * DP;

	const renderItem = ({item, index}) => {
		return (
			<View style={[style.userAccount]}>
				<UserNote data={item} checkBoxMode={selectMode} onLabelClick={() => onClickLabel(item, index)} onCheckBox={e => onCheckBox(e, index)} />
			</View>
		);
	};

	const header = () => {
		return (
			<SelectStat
				selectMode={selectMode}
				// onSelectMode={e => showCheckBox(e)}
				onSelectMode={checkSelectMode}
				// onCancelSelectMode={e => hideCheckBox(e)}
				onCancelSelectMode={cancelSelectMode}
				onSelectAllClick={selectAll}
				onDeleteSelectedItem={deleteSelectedItem}
				// received={received}
			/>
		);
	};

	if (data == 'false') {
		return (
			<View style={[login_style.wrp_main, {flex: 1, paddingVertical: 200 * DP}]}>
				<Loading isModal={false} />
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				{/* <View style={[style.noteList, {}]}>
					<SelectStat
						selectMode={selectMode}
						// onSelectMode={e => showCheckBox(e)}
						onSelectMode={checkSelectMode}
						// onCancelSelectMode={e => hideCheckBox(e)}
						onCancelSelectMode={cancelSelectMode}
						onSelectAllClick={selectAll}
						onDeleteSelectedItem={deleteSelectedItem}
						// received={received}
					/>
					<NoteList
						data={data}
						checkBoxMode={selectMode}
						onClickLabel={onClickLabel}
						onCheckBox={onCheckBox}
						routeName={route.name}
						whenEmpty={whenEmpty}
						refresh={getMemoBoxListFunction}
					/>
				</View> */}
				<FlatList
					data={data}
					renderItem={renderItem}
					extraData={data}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListHeaderComponent={header()}
					keyExtractor={item => item._id}
					showsVerticalScrollIndicator={false}
					getItemLayout={(data, index) => {
						if (!data[index]) return {length: 0, offset: 0, index: index};
						return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
					}}
					ListFooterComponent={<View style={{height: 100 * DP}} />}
					ListEmptyComponent={whenEmpty()}
				/>
			</View>
		);
	}
};

const style = StyleSheet.create({
	noteList: {
		width: 694 * DP,
		paddingVertical: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	userAccount: {
		width: 750 * DP,
		height: 94 * DP,
		marginTop: 40 * DP,
	},
});
