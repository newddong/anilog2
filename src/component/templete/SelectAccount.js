import React from 'react';
import {Text, View} from 'react-native';
import AccountList from '../organism_ksw/AccountList';
import {login_style, selectAccount} from './style_templete';
import {getUserListByNickname} from 'Root/api/userapi';

export default SelectAccount = ({route, navigation}) => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		console.log('searchInput / SelectAccount', route.params.searchInput);
		getUserListByNickname(
			{
				user_nickname: route.params.searchInput,
				user_type: 'user',
			},
			result => {
				console.log('result / getUserListByUserNickname / SelectAccount  ', result.msg);
				setData(result.msg);
			},
			err => {
				console.log('err / getUserListByUserNickname / SelectAccount  ', err);
			},
		);
	}, [route.params?.searchInput]);

	const onSelect = (item, index) => {
		Modal.popTwoBtn(
			`${item.user_nickname}님이 입양예정자가 맞습니까?`,
			'취소',
			'예',
			() => Modal.close(),
			() => {
				Modal.close();
				navigation.push('PetInfoSetting', {userobject_id: route.params.userobject_id});
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, selectAccount.container]}>
			<View style={[selectAccount.accountList]}>
				<AccountList items={data} onSelect={onSelect} />
			</View>
		</View>
	);
};
