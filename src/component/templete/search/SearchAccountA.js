import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import Modal from 'Component/modal/Modal';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {login_style, searchAccountA} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';

export default SearchAccountA = props => {
	// console.log('SearchAccountA', props.route.name);
	//검색이벤트 발생 시 props.input의 값이 바뀌고 검색을 실시
	const navigation = useNavigation();
	const [searchedList, setSearchedList] = React.useState('false');

	React.useEffect(() => {
		console.log('props.input', props.input);
		if (props.input != null) {
			// const inputData = props.input.searchIn
			//검색 로직에 대해선 아직 미구현이므로 닉네임과 검색Input이 정확히 일치하는 Account Array를 userList로 반환
			if (props.input.searchInput != undefined) {
				setSearchedList([]);
				getUserListByNickname(
					{
						user_nickname: props.input.searchInput,
						request_number: '',
						userobject_id: '',
						user_type: 'user',
					},
					result => {
						// console.log('result / getUserListByNick / SearchAccountA', result.msg);
						let filtered = result.msg;
						let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
						removeMine == -1 ? false : filtered.splice(removeMine, 1);
						setSearchedList(filtered);
					},
					err => {
						console.log('err / getUserListByNick / SearchAccountA', err);
						setSearchedList(err);
					},
				);
			}
		} else {
			null;
		}
	}, [props.input]);

	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		let sendUserobject = {_id: item._id};
		props.onClickUser(sendUserobject);
	};

	return (
		<View style={[searchAccountA.container]}>
			{searchedList != 'false' ? (
				<ScrollView>
					<ControllableAccountList items={searchedList} onClickAccount={onClickAccount} showButtons={false} />
				</ScrollView>
			) : (
				<Loading isModal={false} />
			)}
		</View>
	);
};
