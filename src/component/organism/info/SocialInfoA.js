import React from 'react';
import {Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import {count_to_K} from 'Root/util/stringutil';
import DP from 'Root/config/dp';
/**
 * 유저 팔로워 팔로잉 업로드 숫자 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 게시글 아이템 data
 * @param {()=>void)} props.onClickUpload - 업로드 클릭
 */
const SocialInfoA = props => {
	// console.log('SocialInfo', props);
	const navigation = useNavigation();

	const onClickUpload = () => {
		props.onClickUpload();
	};

	const onClickFollower = () => {
		if (props.data.user_type == 'pet') {
			navigation.navigate({
				key: props.data._id + 'PetFollowerList',
				name: 'PetFollowerList',
				params: {userobject: props.data, title: props.data.user_follower_count},
			});
		} else
			navigation.navigate({
				key: props.data._id + 'SocailRelation',
				name: 'SocialRelation',
				params: {userobject: props.data, initial: 'FollowerList'},
			});
	};

	const onClickFollow = () => {
		navigation.navigate({key: props.data._id + 'SocailRelation', name: 'SocialRelation', params: {userobject: props.data, initial: 'FollowingList'}});
	};

	return (
		<View style={[style.container]}>
			<TouchableOpacity onPress={onClickUpload}>
				<View style={[style.socialInfo]}>
					<Text style={[txt.roboto34b]}>{count_to_K(props.data.user_upload_count)}</Text>
					<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 업로드</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={onClickFollower}>
				<View style={[style.socialInfo]}>
					<Text style={[txt.roboto30b]}>{count_to_K(props.data.user_follower_count)}</Text>
					<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 팔로워</Text>
				</View>
			</TouchableOpacity>
			{props.data.user_type == 'pet' ? (
				<></>
			) : (
				<TouchableOpacity onPress={onClickFollow}>
					<View style={[style.socialInfo]}>
						<Text style={[txt.roboto30b]}>{count_to_K(props.data.user_follow_count)}</Text>
						<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 팔로잉</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

SocialInfoA.defaultProps = {
	onClickUpload: () => {},
};

export default SocialInfoA;

const style = StyleSheet.create({
	container: {
		width: 474 * DP,
		height: 68 * DP,
		flexDirection: 'row',
	},
	socialInfo: {
		height: 68 * DP,
		marginRight: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
