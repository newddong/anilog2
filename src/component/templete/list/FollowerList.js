import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {getFollows, getFollowers, unFollowUser, followUser} from 'Root/api/userapi';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';

/**
 * 팔로워 팔로우 목록
 * @param {object} props - Props Object
 * @param {object} props.followers - 팔로워 리스트
 * @param {object} props.follows - 팔로우 리스트
 * @param {void} props.resetProfileInfo - 프로필 정보 갱신
 * @param {(text:string)=>void} props.onChangeSearchInput - 프로필 정보 갱신
 */
export default FollowerList = props => {
	const navigation = useNavigation();
	const isFollowing = props.route.name != 'FollowingList';
	const isMyAccount = props.route.params.userobject._id == userGlobalObject.userInfo._id;
	// console.log(props.route.params.userobject._id);

	const onClickFollowBtn = item => {
		followUser(
			{
				follow_userobject_id: item._id,
			},
			result => {
				// console.log('result / followUser / FollwerList :', result.msg);
				props.resetProfileInfo();
			},
			err => {
				console.log('err / followUser  : ', err);
			},
		);
	};

	const onClickUnFollowBtn = item => {
		unFollowUser(
			{
				follow_userobject_id: item._id,
			},
			result => {
				// console.log('result / onClickUnFollowBtn / FollwerList : ', result.msg);
				props.resetProfileInfo();
			},
			err => {
				console.log('err / onClickUnFollowBtn / FollwerList', err);
			},
		);
	};

	const onClickAccount = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	const onChangeSearchInput = text => {
		// setSearchInput(text);
		props.onChangeSearchInput(text);
	};

	const onSearch = () => {
		console.log('');
	};

	return (
		<View style={[followerList.container]}>
			<ScrollView style={[{flex: 0}]}>
				<View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
					<InputWithSearchIcon onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
				</View>
				<View style={[{alignItems: 'center'}]}>
					{props.route.name != 'FollowingList' ? (
						<ControllableAccountList
							items={props.followers}
							showButtons={true}
							onClickAccount={onClickAccount}
							title={!isFollowing ? '' : '팔로잉'}
							onClickFollowBtn={onClickFollowBtn}
							onClickUnFollowBtn={onClickUnFollowBtn}
							showFollowStatusText={false}
						/>
					) : (
						<ControllableAccountList
							items={props.follows}
							showButtons={true}
							onClickAccount={onClickAccount}
							title={!isFollowing ? '' : '팔로잉'}
							onClickUnFollowBtn={onClickUnFollowBtn}
							onClickFollowBtn={onClickFollowBtn}
							showFollowStatusText={false}
						/>
					)}
				</View>
			</ScrollView>
			{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
		</View>
	);
};

FollowerList.defaultProps = {
	resetProfileInfo: () => {},
	onChangeSearchInput: () => {},
};
