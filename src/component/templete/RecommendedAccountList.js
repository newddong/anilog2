import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import {Write94} from '../atom/icon';
import InputWithSearchIcon from '../molecules/InputWithSearchIcon';
import ControllableAccountList from '../organism_ksw/ControllableAccountList';
import {followerList} from './style_templete';
import {getUserListByNickname} from 'Root/api/userapi';

export default RecommendedAccountList = ({route, navigation}) => {
	const [searchInput, setSearchInput] = React.useState('');
	const [recommendList, setRecommendList] = React.useState([]);
	const onWrite = () => {
		console.log('Onwrite');
	};
	const onChangeSearchInput = text => {
		console.log('text', text);
	};

	const onSearch = () => {
		console.log('Search Start');
	};

	React.useEffect(() => {
		getUserListByNickname(
			{
				user_nickname: '',
				request_number: 999,
			},
			result => {
				setRecommendList(result.msg);
			},
			err => {
				Modal.alert(error);
			},
		);
	}, []);

	const onClickAccount = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	return (
		<View style={followerList.container}>
			<ScrollView contentContainerStyle={followerList.insideContainer}>
				<View style={[followerList.inputWitchSearch]}>
					<InputWithSearchIcon onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
				</View>
				<View style={[followerList.accountList_step1]}>
					<ControllableAccountList items={recommendList} onClickAccount={onClickAccount} showCrossMark={true} />
				</View>
			</ScrollView>
			<View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View>
		</View>
	);
};
