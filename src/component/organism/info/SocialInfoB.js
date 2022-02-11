import React from 'react';
import {Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {socialInfoB} from 'Organism/style_organism copy';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
export default SocialInfoB = props => {
	const navigation = useNavigation();

	const moveToSocialRelation = () => {
		navigation.push('SocialRelation', {userobject: props.data});
	};
	const onPressUpload = () => {
		navigation.push('UserProfile', {userobject: props.data});
	};
	const count_to_K = cnt => {
		if (cnt > 1000000) {
			let count = (cnt / 1000000).toFixed(0) + 'm';
			return count;
		} else if (cnt > 1000) {
			let count = (cnt / 1000).toFixed(1) + 'k';
			return count;
		} else {
			return cnt;
		}
	};

	return (
		<View style={[socialInfoB.container]}>
			<View style={[socialInfoB.socialInfo]}>
				<TouchableWithoutFeedback onPress={onPressUpload}>
					<Text style={[txt.roboto40b, socialInfoB.number]}>{count_to_K(props.data.user_upload_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto24, socialInfoB.title]}>업로드</Text>
			</View>
			<View style={[socialInfoB.socialInfo]}>
				<TouchableWithoutFeedback onPress={moveToSocialRelation}>
					<Text style={[txt.roboto40b, socialInfoB.number]}>{count_to_K(props.data.user_follower_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto28, socialInfoB.title]}>팔로워</Text>
			</View>
			<View style={[socialInfoB.socialInfo]}>
				<TouchableWithoutFeedback onPress={moveToSocialRelation}>
					<Text style={[txt.roboto40b, socialInfoB.number]}>{count_to_K(props.data.user_follow_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto28, socialInfoB.title]}>팔로잉</Text>
			</View>
			{props.donationMode ? (
				<View style={[socialInfoB.socialInfo]}>
					<Text style={[txt.roboto40b, socialInfoB.number]}>3</Text>
					<Text style={[txt.noto28, socialInfoB.title]}>후원</Text>
				</View>
			) : null}
		</View>
	);
};

SocialInfoB.defaultProps = {
	donationMode: false,
};
