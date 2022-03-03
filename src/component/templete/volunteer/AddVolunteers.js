import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import AccountList from 'Organism/list/AccountList';
import {login_style, btn_style, temp_style, addVolunteers} from 'Templete/style_templete';
import {CommonActions} from '@react-navigation/native';
import Modal from 'Component/modal/Modal';
import {addUserToFamily, getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';

export default AddVolunteers = ({route, navigation}) => {
	console.log('route', route.params);
	const [searched_accountList, setSearched_accountList] = React.useState([]);
	const [selectedAccount, setSelectedAccount] = React.useState('');

	//돋보기 버튼 클릭 콜백
	const onSearch = input => {
		setSearched_accountList([]);
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
				//자기 아이디는 필터 실시
				let filtered = result.msg;
				let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
				removeMine == -1 ? false : filtered.splice(removeMine, 1);
				setSearched_accountList(filtered);
			},
			err => {
				console.log('err / getUserListByNick / AddFamilyAccount', err);
			},
		);
	};

	//검색어 Input값 변경 콜백
	const onChangeKeyword = input => {
		if (input != '') {
			onSearch(input);
		}
	};

	const onAccountClick = item => {
		console.log('onAccoitCLick');
		setSelectedAccount(item);
	};

	//초대하기 클릭
	const onCheckFamilyMembers = () => {
		// console.log('리스트 인원 수 체크 후 3인이 넘어갈때 초대하면 3인까지만 가능하다는 메세지 필요 ~  3인이 안되면 API로 추가 후 goback');
		const finalize = () => {
			navigation.navigate({
				name: 'ApplyVolunteer',
				params: {addedVolunteer: selectedAccount},
				merge: true,
			});
		};
		if (selectedAccount) {
			Modal.popTwoBtn('이 계정을 봉사활동자 목록에 \n 추가하시겠습니까?', '취소', '추가', () => Modal.close(), finalize);
		} else {
			Modal.popOneBtn('초대하실 계정을 선택해주세요.', '확인', () => Modal.close());
		}
	};

	const listEmptyComponent = () => {
		return (
			<View style={[addVolunteers.listEmptyContainer]}>
				<Text style={[txt.noto32]}>검색 결과가 없습니다.</Text>
			</View>
		);
	};

	return (
		<View style={[login_style.wrp_main, addVolunteers.container]}>
			<View style={[addVolunteers.inputWithSearchIcon]}>
				<InputWithSearchIcon onSearch={onSearch} onChange={onChangeKeyword} width={654} placeholder={'봉사 활동을 함께 할 계정을 검색해주세요.'} />
			</View>
			<ScrollView style={[addVolunteers.accountList]}>
				<AccountList items={searched_accountList} listEmptyComponent={listEmptyComponent} onClickLabel={onAccountClick} />
			</ScrollView>
			<View style={[btn_style.btn_w654, addVolunteers.btn_w654]}>
				<AniButton onPress={onCheckFamilyMembers} btnTitle={'봉사활동자 추가'} btnLayout={btn_w654} btnTheme={'shadow'} titleFontStyle={32} />
			</View>
		</View>
	);
};
