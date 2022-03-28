import React from 'react';
import {Text, View, TouchableWithoutFeedback, ViewPropTypes} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {socialInfoA} from 'Organism/style_organism copy';
import {useNavigation} from '@react-navigation/core';
import {count_to_K} from 'Root/util/stringutil';

export default SocialInfoA = props => {
	// console.log('SocialInfo', props);
	const navigation = useNavigation();

	const moveToSocialRelation = () => {
		navigation.push('SocialRelation', {userobject: props.data});
	};

	return (
		<View style={[socialInfoA.container]}>
			<TouchableWithoutFeedback onPress={moveToSocialRelation}>
				<View style={[socialInfoA.socialInfo]}>
					<Text style={[txt.roboto30b, socialInfoA.number]}>{count_to_K(props.data.user_upload_count)}</Text>
					<Text style={[txt.noto24, socialInfoA.title]}>업로드</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={moveToSocialRelation}>
				<View style={[socialInfoA.socialInfo]}>
					<Text style={[txt.roboto30b, socialInfoA.number]}>{count_to_K(props.data.user_follower_count)}</Text>
					<Text style={[txt.noto24, socialInfoA.title]}>팔로워</Text>
				</View>
			</TouchableWithoutFeedback>
			{props.data.user_type == 'pet' ? (
				<></>
			) : (
				<TouchableWithoutFeedback onPress={moveToSocialRelation}>
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
	followingCount: 0,
	followerCount: 0,
	uploadCount: 0,
};
