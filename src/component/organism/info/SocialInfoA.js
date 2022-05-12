import React from 'react';
import {Text, View, TouchableWithoutFeedback, ViewPropTypes} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {socialInfoA} from 'Organism/style_organism copy';
import {useNavigation} from '@react-navigation/core';
import {count_to_K} from 'Root/util/stringutil';
/**
 * 유저 팔로워 팔로잉 업로드 숫자 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 게시글 아이템 data
 * @param {()=>void)} props.onClickUpload - 업로드 클릭
 */
const SocialInfoA = props => {
	// console.log('SocialInfo', props);
	const navigation = useNavigation();

	const moveToSocialRelation = () => {
		navigation.push('SocialRelation', {userobject: props.data});
	};

	const onClickUpload = () => {
		props.onClickUpload();
	};

	const onClickFollower = () => {
		navigation.push('SocialRelation', {userobject: props.data, initial: 'FollwerList'});
	};

	const onClickFollow = () => {
		navigation.push('SocialRelation', {userobject: props.data, initial: 'FollowingList'});
	};

	return (
		<View style={[socialInfoA.container]}>
			<TouchableWithoutFeedback onPress={onClickUpload}>
				<View style={[socialInfoA.socialInfo]}>
					<Text style={[txt.roboto30b, socialInfoA.number]}>{count_to_K(props.data.user_upload_count)}</Text>
					<Text style={[txt.noto24, socialInfoA.title]}>업로드</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onClickFollower}>
				<View style={[socialInfoA.socialInfo]}>
					<Text style={[txt.roboto30b, socialInfoA.number]}>{count_to_K(props.data.user_follower_count)}</Text>
					<Text style={[txt.noto24, socialInfoA.title]}>팔로워</Text>
				</View>
			</TouchableWithoutFeedback>
			{props.data.user_type == 'pet' ? (
				<></>
			) : (
				<TouchableWithoutFeedback onPress={onClickFollow}>
					<View style={[socialInfoA.socialInfo]}>
						<Text style={[txt.roboto30b, socialInfoA.number]}>{count_to_K(props.data.user_follow_count)}</Text>
						<Text style={[txt.noto24, socialInfoA.title]}>팔로잉</Text>
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
