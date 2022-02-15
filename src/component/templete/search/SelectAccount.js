import React from 'react';
import {Text, View} from 'react-native';
import AccountList from 'Organism/list/AccountList';
import {login_style, selectAccount} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';

export default SelectAccount = ({route, navigation}) => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		console.log('searchInput / SelectAccount', route.params.searchInput);
		getUserListByNickname(
			{
				user_nickname: route.params.searchInput,
				request_number: '',
				userobject_id: '',
				user_type: 'user',
			},
			result => {
				console.log('result / getUserListByUserNickname / SelectAccount  ', result.msg);
				let userList = []; //입양이 가능한 일반 유저 계정 컨테이너
				result.msg.map((v, i) => {
					if (v.user_type == 'user' && v._id != userGlobalObject.userInfo._id) {
						userList.push(v);
					}
				});
				setData(userList);
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
			{data.length > 0 ? (
				<View style={[selectAccount.accountList]}>
					<AccountList items={data} onSelect={onSelect} />
				</View>
			) : (
				<View>
					<Text style={[txt.noto28]}>검색 결과가 없습니다.</Text>
				</View>
			)}
		</View>
	);
};
