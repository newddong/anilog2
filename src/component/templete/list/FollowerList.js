import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {getFollows, getFollowers} from 'Root/api/userapi';

export default FollowerList = ({route, navigation}) => {
	const [searchInput, setSearchInput] = React.useState('');
	const [myFollower, setMyFollower] = React.useState(); // 팔로워리스트 현재 빈 값

	const onClickAccount = item => {
		// console.log('item', item);
		navigation.push('UserProfile', {userobject: item});
	};

	React.useEffect(() => {
		if (route.name == 'FollowerList') {
			getFollowers(
				{
					userobject_id: route.params.userobject._id,
				},
				result => {
					setMyFollower(result.msg.map(v => v.follower_id));
				},
				err => {
					Modal.alert(error);
				},
			);
		}
		if (route.name == 'FollowingList') {
			getFollows(
				{
					userobject_id: route.params.userobject._id,
				},
				result => {
					setMyFollower(result.msg.map(v => v.follow_id));
				},
				err => {
					Modal.alert(error);
				},
			);
		}
	}, []);

	React.useEffect(() => {
		console.log('팔로워 리스트', myFollower);
	}, [myFollower]);

	return (
		<View style={[followerList.container]}>
			<ScrollView style={[{flex: 0}]}>
				{/* <View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
					<InputWithSearchIcon onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
				</View> */}
				<View style={[{alignItems: 'center'}]}>
					<ScrollView horizontal={false} style={{flex: 0}}>
						<ScrollView horizontal={true} style={{flex: 1}}>
							<ControllableAccountList
								items={myFollower}
								onClickAccount={onClickAccount}
								title={route.name == 'FollowerList' ? '팔로워' : '팔로잉'}
							/>
						</ScrollView>
					</ScrollView>
				</View>
			</ScrollView>
			{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
		</View>
	);
};
