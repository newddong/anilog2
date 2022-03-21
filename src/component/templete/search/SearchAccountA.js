import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {searchAccountA} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import searchContext from 'Root/config/searchContext';

export default SearchAccountA = React.memo((props, ref) => {
	// console.log('SearchAccountA', props.route.name);
	//검색이벤트 발생 시 props.input의 값이 바뀌고 검색을 실시
	const [searchedList, setSearchedList] = React.useState('false');

	React.useEffect(() => {
		console.log('SearchInput / SearchAccountA ', searchContext.searchInfo.searchInput);
		if (searchContext.searchInfo.searchInput != 'false') {
			setSearchedList('false');
			getUserListByNickname(
				{
					user_nickname: searchContext.searchInfo.searchInput,
					request_number: '',
					userobject_id: '',
					user_type: 'user',
				},
				result => {
					let filtered = result.msg;
					let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
					removeMine == -1 ? false : filtered.splice(removeMine, 1);
					setSearchedList(filtered);
				},
				err => {
					console.log('err / getUserListByNick / SearchAccountA', err);
					if (err == '검색 결과가 없습니다.') {
						setSearchedList([]);
					}
				},
			);
		}
	}, [searchContext.searchInfo.searchInput]);

	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		let sendUserobject = {_id: item._id};
		props.onClickUser(sendUserobject);
	};

	return (
		<View style={[searchAccountA.container]}>
			{searchedList == 'false' ? (
				<Loading isModal={false} />
			) : (
				<ScrollView>
					<ControllableAccountList items={searchedList} onClickAccount={onClickAccount} showButtons={false} />
				</ScrollView>
			)}
		</View>
	);
});
