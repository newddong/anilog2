import React from 'react';
import {Text, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
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
		console.log('props', props.data.user_type);
		navigation.push('SocialRelation', {userobject: props.data, initial: 'FollwerList'});
	};

	const onClickFollow = () => {
		navigation.push('SocialRelation', {userobject: props.data, initial: 'FollowingList'});
	};

	return (
		<View style={[style.container]}>
			<TouchableWithoutFeedback onPress={onClickUpload}>
				<View style={[style.socialInfo]}>
					<Text style={[txt.roboto34b]}>{count_to_K(props.data.user_upload_count)}</Text>
					<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 업로드</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onClickFollower}>
				<View style={[style.socialInfo]}>
					<Text style={[txt.roboto30b]}>{count_to_K(props.data.user_follower_count)}</Text>
					<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 팔로워</Text>
				</View>
			</TouchableWithoutFeedback>
			{props.data.user_type == 'pet' ? (
				<></>
			) : (
				<TouchableWithoutFeedback onPress={onClickFollow}>
					<View style={[style.socialInfo]}>
						<Text style={[txt.roboto30b]}>{count_to_K(props.data.user_follow_count)}</Text>
						<Text style={[txt.noto28, {marginBottom: 2 * DP}]}> 팔로잉</Text>
					</View>
				</TouchableWithoutFeedback>
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
