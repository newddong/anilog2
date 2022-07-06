import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
/**
 * 게시글 사진 썸네일 목록
 * @param {object} props - Props Object
 * @param {Object} props.photo_list - 사진 리스트
 * @param {void} props.onPressReviewContent - 사진 클릭
 */
export default ReviewThumbnail = props => {
	// console.log('props.photo_list', props.photo_list);
	const photos = props.photo_list;

	const onPressReviewContent = () => {
		props.onPressReviewContent();
	};

	const getThirdPhoto = () => {
		if (photos.length == 3) {
			return (
				<View style={[style.photo3_right_photo]}>
					<FastImage
						source={{uri: photos[2]}}
						style={[{flex: 1, borderBottomRightRadius: 30 * DP, backgroundColor: 'white'}]}
						resizeMode={'stretch'}
					/>
				</View>
			);
		} else {
			return (
				<View style={[style.photo3_right_photo]}>
					<FastImage source={{uri: photos[2]}} style={[style.photo3_right_photo, {borderBottomRightRadius: 30 * DP}]} resizeMode={'stretch'} />
					<View style={[style.photo3_right_opacity, {borderBottomRightRadius: 30 * DP}]}>
						<Text style={[txt.roboto32b, style.text]}>+ {photos.length - 3}</Text>
					</View>
				</View>
			);
		}
	};

	const content = () => {
		if (photos.length == 1) {
			return <FastImage source={{uri: photos[0]}} style={[style.photo_1]} />;
		} else if (photos.length == 2) {
			return (
				<View style={[style.photo_2_container]}>
					<FastImage
						source={{uri: photos[0]}}
						style={[style.photo_2, {borderTopLeftRadius: 30 * DP, borderBottomLeftRadius: 30 * DP}]}
						resizeMode={'stretch'}
					/>
					<FastImage
						source={{uri: photos[1]}}
						style={[style.photo_2, {borderTopRightRadius: 30 * DP, borderBottomRightRadius: 30 * DP}]}
						resizeMode={'stretch'}
					/>
				</View>
			);
		} else if (photos.length >= 3) {
			return (
				<View style={[style.photo_3_container]}>
					<FastImage
						source={{uri: photos[0]}}
						style={[style.photo3_first, {borderTopLeftRadius: 30 * DP, borderBottomLeftRadius: 30 * DP}]}
						resizeMode={'stretch'}
					/>
					<View style={[style.photo3_right]}>
						<FastImage source={{uri: photos[1]}} style={[style.photo3_right_photo, {borderTopRightRadius: 30 * DP}]} resizeMode={'stretch'} />
						{getThirdPhoto()}
					</View>
				</View>
			);
		}
	};

	return (
		<TouchableOpacity onPress={onPressReviewContent} activeOpacity={0.4} style={[style.container]}>
			{content()}
		</TouchableOpacity>
	);
};

ReviewThumbnail.defaultProps = {
	photo_list: [],
	onPressReviewContent: () => {},
};

const style = StyleSheet.create({
	container: {
		alignSelf: 'center',
		paddingVertical: 10 * DP,
	},
	photo_1: {
		width: 694 * DP,
		height: 334 * DP,
		borderRadius: 30 * DP,
	},
	photo_2_container: {
		width: 694 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	photo_2: {
		width: 344 * DP,
		height: 334 * DP,
	},
	photo_3_container: {
		width: 694 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'red',
	},
	photo3_first: {
		width: 378 * DP,
		height: 334 * DP,
	},
	photo3_right: {
		width: 310 * DP,
		marginLeft: 5 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	photo3_right_photo: {
		width: 310 * DP,
		height: 164 * DP,
		zIndex: 0,
	},
	photo3_right_photo_opacity: {
		width: 310 * DP,
		height: 164 * DP,
		zIndex: 1,
	},
	photo3_right_opacity: {
		width: 310 * DP,
		height: 164 * DP,
		backgroundColor: BLACK,
		opacity: 0.7,
		position: 'absolute',
		justifyContent: 'center',
	},
	text: {
		color: WHITE,
		alignSelf: 'center',
	},
});
