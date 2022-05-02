import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import AccountList from 'Root/component/organism/list/AccountList';
import {temp_style, addFamilyAccount_style} from 'Templete/style_templete';
import Modal from 'Root/component/modal/Modal';
import {addUserToFamily, getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {EmptyIcon} from 'Root/component/atom/icon';
import dp from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';

export default AddFamilyAccount = ({route, navigation}) => {
	// console.log('route', route.params);
	const [searched_accountList, setSearched_accountList] = React.useState([]);
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
				// console.log('result / getUserListByNick / AddFamilyccount', result.msg);
				//현재 usertype 조건이 안먹힘 - 클라이언트에서 필터 실시
				let filtered = result.msg;
				let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
				removeMine == -1 ? false : filtered.splice(removeMine, 1);
				setSearched_accountList(filtered);
				setLoad(false);
			},
			err => {
				console.log('err / getUserListByNick / AddFamilyAccount', err);
				setSearched_accountList([]);
				if (err == '검색 결과가 없습니다.') {
					Modal.close();
					setSearched_accountList([]);
					setLoad(false);
				}
			},
		);
	};

	const onSearch = input => {
		setSearched_accountList([]);
	};

	//검색어 Input값 변경 콜백
	const onChangeKeyword = input => {
		setLoad(true);
		setSearchInput(input);
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
		// console.log('리스트 인원 수 체크 후 3인이 넘어갈때 초대하면 3인까지만 가능하다는 메세지 필요 ~  3인이 안되면 API로 추가 후 goback');
		Modal.close();
		setTimeout(() => {
			Modal.popLoading();
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
		}, 100);
	};

	const listEmptyComponent = () => {
		return (
			<View style={[addFamilyAccount_style.listEmptyContainer]}>
				<EmptyIcon />
				<Text style={[txt.roboto30b, {marginTop: 10 * dp}]}>검색 결과가 없습니다.</Text>
			</View>
		);
	};

	return (
		<View style={[addFamilyAccount_style.container]}>
			<View style={[temp_style.inputWithSearchIcon, addFamilyAccount_style.inputWithSearchIcon]}>
				<InputWithSearchIcon onSearch={search} onChange={onChangeKeyword} width={654} placeholder={'가족 계정을 검색해주세요.'} />
			</View>

			<ScrollView style={[addFamilyAccount_style.accountList]}>
				{load ? (
					<Loading isModal={false} />
				) : (
					<AccountList items={searched_accountList} showCrossMark={false} listEmptyComponent={listEmptyComponent} onClickLabel={onAccountClick} />
				)}
			</ScrollView>
		</View>
	);
};
