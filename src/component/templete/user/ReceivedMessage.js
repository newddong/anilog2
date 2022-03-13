import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import {login_style, temp_style} from '../style_templete';
import NoteSelectStat from 'Root/component/organism/list/NoteSelectStat';
import NoteList from 'Root/component/organism/list/NoteList';

export default ReceivedMessage = ({route}) => {
	const dummyData = [
		{
			_id: '61d2dcb0c0f179ccd5ba5649',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641208228907_a7a1dff3-5d0f-4395-834c-d5251f669a73.jpg',
			memobox_send_id: 'ender',
			memobox_receive_id: '받는사람',
			memobox_contents: '메모 더미 데이터 메모 더미 데이터 메모 더미 데이터 메모 더미 데이터',
			memobox_date: '2022-03-01T00:00:00.000Z',
			memobox_is_delete: false,
		},
		{
			_id: '61d2d9a5c0f179ccd5ba555e',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641208228907_a7a1dff3-5d0f-4395-834c-d5251f669a73.jpg',
			memobox_send_id: '리리',
			memobox_receive_id: '받는사람',
			memobox_contents: '메모 더미 데이터222',
			memobox_date: '2022-03-02T00:00:00.000Z',
			memobox_is_delete: false,
		},
	];
	const navigation = useNavigation();
	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	const [data, setData] = React.useState();
	const [received, setReceived] = React.useState(true); //받은 쪽지함:true 보낸 쪽지함 false;
	let selectCNT = React.useRef(0);
	//data 구조가 아직 정해지지않아서 data처리는 추후에
	//받은 쪽지함, 보낸쪽지함 처리
	React.useEffect(() => {
		setData(dummyData);
	}, []);
	const changeStatus = () => {
		received ? navigation.setOptions({title: '보낸 쪽지함'}) : navigation.setOptions({title: '받은 쪽지함'});
		setReceived(!received);
	};
	//Check Box On
	const showCheckBox = e => {
		console.log(`showCheckBox=>${showCheckBox}`);
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
	const onClickLabel = data => {
		navigation.push('UserProfile', {userobject: data});
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
	const deleteSelectedItem = () => {
		let copy = [...data];
		copy = copy.filter(e => e.checkBoxState != true);
		copy.map((v, i) => {
			// console.log('index=>' + i);
			v._index = i;
			v.checkBoxState = false;
		});
		setData(copy);
	};
	const onClickFollow = data => {
		console.log('data', data);
	};
	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.selectstat_view]}>
				<NoteSelectStat
					onSelectMode={e => showCheckBox(e)}
					onCancelSelectMode={e => hideCheckBox(e)}
					onSelectAllClick={selectAll}
					onDeleteSelectedItem={deleteSelectedItem}
					received={received}
					changeStatus={changeStatus}
				/>
				{/* <SelectStat /> */}
			</View>
			<View style={[styles.noteList, {height: null}]}>
				<NoteList
					data={data}
					checkBoxMode={checkBoxMode}
					onClickLabel={onClickLabel}
					onClickFollow={onClickFollow}
					onCheckBox={onCheckBox}
					routeName={route.name}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	noteList: {
		width: 654 * DP,
		// height: 1324 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#F2C2C2',
	},
});
