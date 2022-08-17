import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {socialInfoB} from 'Organism/style_organism copy';
import {useNavigation} from '@react-navigation/native';
export default SocialInfoB = props => {
	const navigation = useNavigation();
	const moveToSocialRelation = initial => {
		navigation.navigate('SocialRelation', {userobject: props.data, initial: initial});
	};
	const onPressUpload = () => {
		navigation.navigate('UserProfile', {userobject: props.data});
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
			<TouchableOpacity onPress={onPressUpload} style={[styles.socialInfo]}>
				<Text style={[txt.roboto34b, styles.number]}>{count_to_K(props.data.user_upload_count)}</Text>
				<Text style={[txt.noto28, styles.title]}>업로드</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => moveToSocialRelation('FollowerList')} style={[styles.socialInfo]}>
				<Text style={[txt.roboto34b, styles.number]}>{count_to_K(props.data.user_follower_count)}</Text>
				<Text style={[txt.noto28, styles.title]}>팔로워</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => moveToSocialRelation('FollowingList')} style={[styles.socialInfo]}>
				<Text style={[txt.roboto34b, styles.number]}>{count_to_K(props.data.user_follow_count)}</Text>
				<Text style={[txt.noto28, styles.title]}>팔로잉</Text>
			</TouchableOpacity>
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
		// width: 130 * DP,
		height: 46 * DP,
		textAlign: 'center',
		// backgroundColor: 'yellow',
		alignItems: 'center',
	},
	title: {
		alignSelf: 'stretch',
		height: 46 * DP,
		width: 82 * DP,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		// alignContent: 'flex-start',
		// backgroundColor: 'purple',
	},
});
