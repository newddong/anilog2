import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {socialInfoB} from 'Organism/style_organism copy';
import {useNavigation} from '@react-navigation/native';
export default SocialInfoB = props => {
	const navigation = useNavigation();

	const moveToSocialRelation = () => {
		navigation.push('SocialRelation', {userobject: props.data});
	};
	const onPressUpload = () => {
		console.log('fjeji');
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
		<View style={[styles.container]}>
			<View style={[styles.socialInfo]}>
				<TouchableWithoutFeedback onPress={onPressUpload}>
					<Text style={[txt.roboto34b]}>{count_to_K(props.data.user_upload_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto28, socialInfoB.title]}>업로드</Text>
			</View>
			<View style={[styles.socialInfo]}>
				<TouchableWithoutFeedback onPress={moveToSocialRelation}>
					<Text style={[txt.roboto34b]}>{count_to_K(props.data.user_follower_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto28, socialInfoB.title]}>팔로워</Text>
			</View>
			<View style={[styles.socialInfo]}>
				<TouchableWithoutFeedback onPress={moveToSocialRelation}>
					<Text style={[txt.roboto34b]}>{count_to_K(props.data.user_follow_count)}</Text>
				</TouchableWithoutFeedback>
				<Text style={[txt.noto28, socialInfoB.title]}>팔로잉</Text>
			</View>
			{props.donationMode ? (
				<View style={[styles.socialInfo]}>
					<Text style={[txt.roboto34b]}>3</Text>
					<Text style={[txt.noto28, socialInfoB.title]}>후원</Text>
				</View>
			) : null}
		</View>
	);
};

SocialInfoB.defaultProps = {
	donationMode: false,
};

const styles = StyleSheet.create({
	container: {
		// width: 500 * DP,
		width: 462 * DP,
		height: 46 * DP,
		flexDirection: 'row',
		alignItems: 'stretch',
		// alignItems: 'flex-start',
		// backgroundColor: 'red',
	},
	socialInfo: {
		width: 154 * DP,
		height: 46 * DP,
		flexDirection: 'row',
		// marginRight: 60 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		marginLeft: -13.5 * DP,
		alignSelf: 'center',
		width: 130 * DP,
		height: 50 * DP,
		textAlign: 'center',
		// backgroundColor: 'yellow',
	},
});
