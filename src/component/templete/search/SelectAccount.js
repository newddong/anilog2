import React from 'react';
import {Text, View} from 'react-native';
import AccountList from 'Organism/list/AccountList';
import {login_style, selectAccount} from 'Templete/style_templete';
import {assignPet, getUserListByNickname, setPetStatus} from 'Root/api/userapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import dp from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';

export default SelectAccount = ({route, navigation}) => {
	const [data, setData] = React.useState([]);
	const [searchInput, setSearchInput] = React.useState('');

	React.useEffect(() => {
		// if (route.params?.searchInput != '') {
		console.log('searchInput', searchInput);
		getUserListByNickname(
			{
				user_nickname: searchInput,
				request_number: '',
				userobject_id: '',
				user_type: 'user',
			},
			result => {
				// console.log('result / getUserListByUserNickname / SelectAccount  ', result.msg);
				Modal.close();
				let filtered = result.msg;
				let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
				removeMine == -1 ? false : filtered.splice(removeMine, 1);
				setData(filtered);
			},
			err => {
				console.log('err / getUserListByUserNickname / SelectAccount  ', err);
				Modal.close();
			},
		);
		// }
	}, [searchInput]);

	const onSelect = (item, index) => {
		console.log('props route params', route.userobject_id);
		Modal.popTwoBtn(
			`${item.user_nickname}님이 \n 입양예정자가 맞습니까?`,
			'취소',
			'예',
			() => Modal.close(),
			() => {
				//예
				Modal.close();
				setPetStatus(
					{
						userobject_id: route.params.userobject_id._id,
						pet_status: 'adopt',
						pet_adopter: item._id,
					},
					result => {
						console.log('result / setPetStatus / SelectAccount  : ', result.msg.pet_adopter);
						setTimeout(() => {
							Modal.popCongratulationModal(route.params.userobject_id.user_nickname, route.params.userobject_id.user_profile_uri);
							setTimeout(() => {
								navigation.navigate({
									name: 'PetInfoSetting',
									params: {},
									merge: true,
								});
							}, 1500);
						}, 300);
					},
					err => {
						console.log('err / setPetStatus / SelectAccount  : ', err);
					},
				);
			},
		);
	};

	const onChange = text => {
		// console.log('text', text);
		setSearchInput(text);
	};

	return (
		<View style={[login_style.wrp_main, selectAccount.container]}>
			<InputWithSearchIcon value={searchInput} onChange={onChange} width={654} placeholder={'닉네임을 검색해주세요.'} />
			{data.length > 0 ? (
				<View style={[selectAccount.accountList]}>
					<AccountList items={data} onSelect={onSelect} showCrossMark={false} />
				</View>
			) : (
				<View>
					<Text style={[txt.roboto32b, {paddingVertical: 30 * dp}]}>검색 결과가 없습니다.</Text>
				</View>
			)}
		</View>
	);
};
