import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import AccountList from 'Organism/list/AccountList';
import {btn_style, addVolunteers} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import DP from 'Root/config/dp';

export default AddVolunteers = ({route, navigation}) => {
	// console.log('route', route.params);
	const [searched_accountList, setSearched_accountList] = React.useState([]);
	const [selectedAccount, setSelectedAccount] = React.useState('');
	const [searchInput, setSearchInput] = React.useState('');
	const [load, setLoad] = React.useState(false);

	React.useEffect(() => {
		if (searchInput != '') {
			//빈값 검색 막기
			search();
		} else if (searchInput == '') {
			//빈값일 경우 로딩 종료 및 리스트 초기화
			setSearched_accountList([]);
			setLoad(false);
		}
	}, [searchInput]);

	const search = () => {
		setSearched_accountList([]);
		getUserListByNickname(
			{
				user_nickname: searchInput,
				request_number: '',
				userobject_id: '',
				user_type: 'user',
			},
			result => {
				// console.log('result / getUserListByNick / AddFamilyccount', result.msg.length);
				//현재 usertype 조건이 안먹힘 - 클라이언트에서 필터 실시
				let filtered = result.msg;
				let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname); //자기 아이디는 필터 실시
				removeMine == -1 ? false : filtered.splice(removeMine, 1);
				setSearched_accountList(filtered);
				setLoad(false);
			},
			err => {
				console.log('err / getUserListByNick / AddFamilyAccount', err);
				setSearched_accountList([]);
				if (err.includes('검색 결과가 없습니')) {
					setSearched_accountList([]);
					setLoad(false);
				}
			},
		);
	};

	//검색어 Input값 변경 콜백
	const onChangeKeyword = input => {
		setLoad(true);
		setSearchInput(input);
	};

	const onAccountClick = item => {
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
			<View style={{width: 654 * DP}}>
				<ListEmptyInfo text={'검색 결과가 없습니다.'} />
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[addVolunteers.inputWithSearchIcon]}>
				<InputWithSearchIcon onSearch={search} onChange={onChangeKeyword} width={654} placeholder={'봉사 활동을 함께 할 계정을 검색해주세요.'} />
			</View>
			<ScrollView contentContainerStyle={[addVolunteers.accountList]}>
				{load ? (
					<Loading isModal={false} />
				) : (
					<AccountList items={searched_accountList} listEmptyComponent={listEmptyComponent} onClickLabel={onAccountClick} showCrossMark={false} />
				)}
			</ScrollView>
			<View style={[btn_style.btn_w654, addVolunteers.btn_w654]}>
				<AniButton onPress={onCheckFamilyMembers} btnTitle={'봉사활동자 추가'} btnLayout={btn_w654} btnTheme={'shadow'} titleFontStyle={32} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#fff',
	},
});
