import React from 'react';
import {ScrollView, View} from 'react-native';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import AccountList from 'Root/component/organism/list/AccountList';
import {login_style, temp_style, addFamilyAccount_style} from 'Templete/style_templete';
import Modal from 'Root/component/modal/Modal';
import {addUserToFamily, getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';

export default AddFamilyAccount = ({route, navigation}) => {
	// console.log('route', route.params);
	const [searched_accountList, setSearched_accountList] = React.useState([]);

	//돋보기 버튼 클릭 콜백
	const onSearch = input => {
		//검색어로 api 연결 후 결과 리스트로 ~
		console.log(`keyword=>${input}`);
		setSearched_accountList([]);
		Modal.popNoBtn('검색 중... 잠시만 기다려주세요');
		getUserListByNickname(
			{
				user_nickname: input,
				request_number: '',
				userobject_id: '',
				user_type: 'user',
			},
			result => {
				// console.log('result / getUserListByNick / AddFamilyccount', result.msg);
				//현재 usertype 조건이 안먹힘 - 클라이언트에서 필터 실시
				let filtered = [];
				result.msg.map((v, i) => {
					v.user_type == 'user' ? filtered.push(v) : false;
				});
				//자기 아이디는 필터 실시
				let removeMine = filtered.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
				removeMine == -1 ? false : filtered.splice(removeMine, 1);
				setSearched_accountList(filtered);
				Modal.close();
			},
			err => {
				console.log('err / getUserListByNick / AddFamilyAccount', err);
				Modal.close();
				if (err == '검색 결과가 없습니다.') {
					Modal.popNoBtn('검색 결과가 없습니다.');

					setTimeout(() => {
						Modal.close();
					}, 1500);
				}
			},
		);
	};

	//검색어 Input값 변경 콜백
	const onChangeKeyword = input => {
		console.log('input', input);
	};

	const onAccountClick = item => {
		console.log('onAccoitCLick');
		const onConfirm = () => {
			// setSelectedAccount(item);
			onCheckFamilyMembers(item);
			Modal.close();
		};
		Modal.popAddFamilyModal(
			item,
			() => onConfirm(),
			() => Modal.close(),
		);
	};

	//초대하기 클릭
	const onCheckFamilyMembers = item => {
		console.log('item', item);
		// console.log('리스트 인원 수 체크 후 3인이 넘어갈때 초대하면 3인까지만 가능하다는 메세지 필요 ~  3인이 안되면 API로 추가 후 goback');
		addUserToFamily(
			{
				userobject_id: route.params.pet_id,
				family_userobject_id: item._id,
			},
			result => {
				console.log('result / addUserToFamily / AddFamilyAccount    :  ', result);
				Modal.close();
				navigation.navigate({
					name: 'PetInfoSetting',
					params: {addedAccount: result.msg},
					merge: true,
				});
			},
			err => {
				console.log('err / addUserToFamily / AddFamilyAccount   :  ', err);
				if (err == '반려동물 끼리는 가족이 될 수 없습니다.') {
					Modal.close();
					Modal.popOneBtn('반려동물 끼리는 가족이 될 수 없습니다.', '확인', () => Modal.close());
				}
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, addFamilyAccount_style.container]}>
			<View style={[temp_style.inputWithSearchIcon, addFamilyAccount_style.inputWithSearchIcon]}>
				<InputWithSearchIcon onSearch={onSearch} onChange={onChangeKeyword} width={654} placeholder={'가족 계정을 검색해주세요.'} />
			</View>

			<ScrollView style={[addFamilyAccount_style.accountList]}>
				<AccountList items={searched_accountList} onClickLabel={onAccountClick} />
			</ScrollView>
			{/* UI 변경으로 인한 주석처리 */}
			{/* <View style={[btn_style.btn_w654, addFamilyAccount_style.btn_w654]}>
				<AniButton onPress={onCheckFamilyMembers} btnTitle={'초대하기'} btnLayout={btn_w654} btnTheme={'shadow'} titleFontStyle={32} />
			</View> */}
		</View>
	);
};
