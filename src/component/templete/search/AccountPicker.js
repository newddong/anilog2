import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import Modal from 'Component/modal/Modal';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {login_style, searchAccountA} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {useNavigationState} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export default AccountPicker = props => {
	const navState = useNavigationState(state => state);
	const [searchedList, setSearchedList] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		let nickname = navState.routes[navState.index].params?.searchInput;
		console.log('닉네임', nickname);
		if (!nickname) {
			setSearchedList([]);
			console.log('useEffect 종료');
			return;
		}
		if (nickname) {
			// let nickname = navState.routes[navState.index].params.searchInput+'';
			// console.log('상태 변화', navState, nickname);
			setLoading(true);
			getUserListByNickname(
				{
					user_nickname: nickname,
					// request_number: 99,
					user_type: '',
				},
				result => {
					console.log('결과', result.msg.length);
					setSearchedList(result.msg);
					setLoading(false);
				},
				err => {
					console.log('에러', err);
					if (err.includes('없습니다.')) {
						setSearchedList([]);
					}
					setLoading(false);
				},
			);
		}
	}, [navState]);

	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		// console.log(props.navigation.getState())
		let navState = props.navigation.getState();
		let previousRoute = navState.routes[navState.index - 1];

		props.navigation.dispatch({
			...CommonActions.setParams({taggedAccount: item}),
			source: previousRoute.key,
		});
		// props.navigation.setParams({a:item})
		props.navigation.goBack();
		// props.navigation.navigate('UserProfile', {userobject: sendUserobject});
		// props.onClickUser(sendUserobject);
		// navigation.reset({index: 0, route: {name: 'UserProfile', params: {userobject: sendUserobject}}});
	};

	return (
		<View style={[searchAccountA.container]}>
			<ScrollView style={[searchAccountA.listContainer]}>
				<ControllableAccountList items={searchedList} onClickAccount={onClickAccount} showButtons={false} />
			</ScrollView>
			{loading && (
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
					<ActivityIndicator size={'large'} color={'black'} />
				</View>
			)}
		</View>
	);
};
