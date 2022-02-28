import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Modal from 'Component/modal/Modal';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {login_style, searchAccountA} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import { useNavigationState } from '@react-navigation/native';

export default AccountPicker = props => {
    const navState = useNavigationState(state=>state);
	const [searchedList, setSearchedList] = React.useState([]);

    React.useEffect(()=>{
        // console.log('상태 변화',navState,  navState.routes[navState.index].params.searchInput);
        if(navState.routes[navState.index].params){
            Modal.popNoBtn('검색 중... 잠시만 기다려주세요');
            getUserListByNickname(
                {
                    user_nickname: navState.routes[navState.index].params.searchInput,
                    request_number: '',
                    userobject_id: null,
                    user_type: 'user',
                },
                result => {
                    console.log('검색 결과',result);
                    let filtered = [];
                    result.msg.map((v, i) => {
                        v.user_type == 'user' ? filtered.push(v) : false;
                    });
                    let removeMine = filtered.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
                    removeMine == -1 ? false : filtered.splice(removeMine, 1);
                    setSearchedList(filtered);
                    Modal.close();
                },
                err => {
                    console.log('err / getUserListByNick / SearchAccountA', err);
                    Modal.close();
                    if (err == '검색 결과가 없습니다.') {
                        Modal.popNoBtn('검색 결과가 없습니다.');

                        setTimeout(() => {
                            Modal.close();
                        }, 500);
                    }
                },
            );
        }

    },[navState])


	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		// console.log('click item', item);
		let sendUserobject = {_id: item._id};
		// props.navigation.navigate('UserProfile', {userobject: sendUserobject});
		// props.onClickUser(sendUserobject);
		// navigation.reset({index: 0, route: {name: 'UserProfile', params: {userobject: sendUserobject}}});
	};

	return (
		<View style={[searchAccountA.container]}>
			<View style={[searchAccountA.listContainer]}>
				{/* <View style={[{height: 38 * DP, alignSelf: 'flex-start'}]}>
					<Text style={({fontSize: 24 * DP}, {marginLeft: 48 * DP})}>최근 본 계정</Text>
				</View> */}

				<ControllableAccountList items={searchedList} onClickAccount={onClickAccount} showButtons={false} />
			</View>
		</View>
	);
};
