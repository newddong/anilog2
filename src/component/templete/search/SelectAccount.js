import React from 'react';
import {Text, View} from 'react-native';
import AccountList from 'Organism/list/AccountList';
import {login_style, selectAccount} from 'Templete/style_templete';
import {assignPet, getUserListByNickname, setPetStatus} from 'Root/api/userapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import dp from 'Root/config/dp';

export default SelectAccount = ({route, navigation}) => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		console.log('searchInput / SelectAccount', route.params.searchInput);
		if (route.params?.searchInput != '') {
			getUserListByNickname(
				{
					user_nickname: route.params.searchInput,
					request_number: '',
					userobject_id: '',
					user_type: 'user',
				},
				result => {
					// console.log('result / getUserListByUserNickname / SelectAccount  ', result.msg);

					setData(result.msg);
				},
				err => {
					console.log('err / getUserListByUserNickname / SelectAccount  ', err);
				},
			);
		}
	}, [route.params?.searchInput]);

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
					},
					result => {
						console.log('result / setPetStatus / SelectAccount  : ', result.msg);
					},
					err => {
						console.log('err / setPetStatus / SelectAccount  : ', err);
					},
				);
				// assignPet({ 입양 확정 시 입양예정자 계정에 pet추가하는 로직 추가 필요
				// 	userobject_id:item._id,
				// 	user_nickname
				// })
				setTimeout(() => {
					Modal.popCongratulationModal(route.params.userobject_id.user_nickname, route.params.userobject_id.user_profile_uri);
					setTimeout(() => {
						navigation.navigate({
							name: 'PetInfoSetting',
							params: {},
							merge: true,
						});
					}, 500);
				}, 300);
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
					<Text style={[txt.roboto32b, {paddingVertical: 30 * dp}]}>검색 결과가 없습니다.</Text>
				</View>
			)}
		</View>
	);
};
