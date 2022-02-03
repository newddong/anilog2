import {useNavigation} from '@react-navigation/core';
import {duration} from 'moment';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {getUserListByNickname} from 'Root/api/userapi';
import {dummy_AccountHashList, dummy_accountList, dummy_userObject} from 'Root/config/dummyDate_json';
import AccountHashList from 'Organism/list/AccountHashList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style, saveFavorite} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default SaveFavorite = props => {
	const navigation = useNavigation();
	//계정 좌측 CheckBox 디스플레이 여부
	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	//checkBox On
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	let selectCNT = React.useRef(0);

	React.useEffect(() => {
		getUserListByNickname(
			{
				user_nickname: '이',
				user_type: 'pet',
				userobject_id: '',
				request_number: 10,
			},
			res => {
				res.msg.map((v, i) => {
					res.msg[i].type = v.user_type;
					res.msg[i].user_nickname = v.user_nickname;
					res.msg[i].user_profile_uri = v.user_profile_uri;
					res.msg[i].text_intro = v.user_introduction;
					res.msg[i]._id = v._id;
				});
				setData(res.msg);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
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
		console.log('삭제시작');
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
		// console.log(index);
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
		// set_dummyData(copy);
	};

	const onClickFollow = data => {
		console.log('data', data);
	};
	const onClickLabel = data => {
		console.log('data', data);
		navigation.push('UserProfile', {userobject: data});
	};
	const onClickHash = data => {
		console.log('data', data);
		navigation.push('FeedListForHashTag', data);
	};

	if (loading) {
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
				<View style={[saveFavorite.accountHashList, {height: null}]}>
					<AccountHashList
						data={data}
						checkBoxMode={checkBoxMode}
						onClickLabel={onClickLabel}
						onClickHash={onClickHash}
						onClickFollow={onClickFollow}
						onCheckBox={onCheckBox}
						routeName={props.route.name}
					/>
				</View>
			</View>
		);
	}
};
