import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getFollows, getUserListByNickname} from 'Root/api/userapi';
import AccountHashList from 'Organism/list/AccountHashList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';

//즐겨찾기 친구
export default SaveFavorite = props => {
	const navigation = useNavigation();
	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	const [data, setData] = React.useState('false');
	let selectCNT = React.useRef(0);

	React.useEffect(() => {
		getUserListByNickname(
			{
				user_nickname: '이',
				user_type: '',
				userobject_id: '',
				request_number: 10,
			},
			result => {
				// console.log('result / getUserListByNick / SaveFavorite  : ', result.msg.slice(0, 2));
				result.msg.map((v, i) => {
					console.log('i', i, v.follow);
				});
				let res = result.msg;

				setData(res);
			},
			err => {
				console.log('err', err);
			},
		);
	}, []);

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

	// 선택하기 => 선택 삭제 클릭 (API 데이터 불러온 뒤 다시 수정할 것. - 실제로 ID를 API로 넘긴 후 데이터를 다시 가져와서 표출 해야함.)
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

	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
	};

	const onClickFollow = data => {
		console.log('data', data);
	};

	const onClickLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	const onClickHash = data => {
		navigation.push('FeedListForHashTag', data);
	};

	if (data == 'false') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
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
