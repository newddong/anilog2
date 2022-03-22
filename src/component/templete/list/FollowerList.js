import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {getFollows, getFollowers, unFollowUser} from 'Root/api/userapi';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import userGlobalObject from 'Root/config/userGlobalObject';

export default FollowerList = ({route, navigation}) => {
	const [searchInput, setSearchInput] = React.useState('');
	const [myFollower, setMyFollower] = React.useState([]); // 팔로워리스트 현재 빈 값
	const isMyAccount = route.params.userobject._id == userGlobalObject.userInfo._id;

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

	const getFollower = () => {
		getFollowers(
			{
				userobject_id: route.params.userobject._id,
				user_nickname: searchInput,
			},
			result => {
				console.log('result / getFollowers / ', result.msg.length);
				setMyFollower(result.msg.map(v => v.follower_id));
			},
			err => {
				console.log('getFollowers / error / FollwerList : ', err);
			},
		);
	};

	React.useEffect(() => {
		if (route.name == 'FollowingList') {
			getFollower();
		}
		if (route.name == 'FollowerList') {
			getFollows(
				{
					userobject_id: route.params.userobject._id,
					user_nickname: searchInput,
				},
				result => {
					console.log('result / getFollows / ', result.msg.length);
					setMyFollower(result.msg.map(v => v.follow_id));
				},
				err => {
					console.log('getFollows / error / FollwerList : ', err);
				},
			);
		}
	}, [searchInput]);
	// 61d2de63c0f179ccd5ba5887
	const onClickUnFollowBtn = item => {
		console.log('item', item._id);
		unFollowUser(
			{
				follow_userobject_id: item._id,
			},
			result => {
				console.log('result / onClickUnFollowBtn / FollwerList : ', result.msg);
				getFollower();
			},
			err => {
				console.log('err / onClickUnFollowBtn / FollwerList', err);
			},
		);
	};

	return (
		<View style={[followerList.container]}>
			<ScrollView style={[{flex: 0}]}>
				<View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
					<InputWithSearchIcon onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
				</View>
				<View style={[{alignItems: 'center'}]}>
					<ControllableAccountList
						items={myFollower}
						showButtons={true}
						onClickAccount={onClickAccount}
						title={route.name == 'FollowerList' ? '팔로워' : '팔로잉'}
						onClickUnFollowBtn={onClickUnFollowBtn}
					/>
				</View>
			</ScrollView>
			{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
		</View>
	);
};
