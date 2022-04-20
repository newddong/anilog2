import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Write94} from 'Atom/icon';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {getUserListByNickname} from 'Root/api/userapi';

export default RecommendedAccountList = ({route, navigation}) => {
	const [recommendList, setRecommendList] = React.useState([]);
	const onWrite = () => {
		console.log('Onwrite');
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
				console.log(err);
			},
		);
	}, []);

	const onClickAccount = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	return (
		<View style={followerList.container}>
			<View style={[followerList.accountList_step1]}>
				<ControllableAccountList items={recommendList} onClickAccount={onClickAccount} showCrossMark={true} />
			</View>
			{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
		</View>
	);
};
