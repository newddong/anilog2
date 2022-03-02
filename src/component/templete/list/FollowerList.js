import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {getFollows, getFollowers} from 'Root/api/userapi';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';

export default FollowerList = ({route, navigation}) => {
	const [searchInput, setSearchInput] = React.useState('');
	const [myFollower, setMyFollower] = React.useState([]); // 팔로워리스트 현재 빈 값

	const onClickAccount = item => {
		// console.log('item', item);
		navigation.push('UserProfile', {userobject: item});
	};

	const onChangeSearchInput = text => {
		setSearchInput(text);
	};

	const onSearch = () => {
		console.log('');
	};

	React.useEffect(() => {
		if (route.name == 'FollowerList') {
			getFollowers(
				{
					userobject_id: route.params.userobject._id,
					user_nickname: input,
				},
				result => {
					setMyFollower(result.msg.map(v => v.follower_id));
				},
				err => {
					console.log('getFollowers / error / FollwerList : ', err);
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
					console.log('getFollows / error / FollwerList : ', err);
				},
			);
		}
	}, []);

	return (
		<View style={[followerList.container]}>
			<ScrollView style={[{flex: 0}]}>
				<View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
					<InputWithSearchIcon onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
				</View>
				<View style={[{alignItems: 'center'}]}>
					<ControllableAccountList items={myFollower} onClickAccount={onClickAccount} title={route.name == 'FollowerList' ? '팔로워' : '팔로잉'} />
				</View>
			</ScrollView>
			{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
		</View>
	);
};
