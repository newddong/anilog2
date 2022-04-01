import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
/**
 * 게시글 사진 썸네일 목록
 * @param {object} props - Props Object
 * @param {Object} props.photo_list - 사진 리스트
 */
export default ArticleThumnails = props => {
	// console.log('props.photo_list', props.photo_list);
	const photos = props.photo_list;

	const getThirdPhoto = () => {
		if (photos.length == 3) {
			return (
				<View style={[style.photo3_right_photo]}>
					<Image source={{uri: photos[2]}} style={[{flex: 1}]} resizeMode={'contain'} />
				</View>
			);
		} else {
			return (
				<View style={[style.photo3_right_photo]}>
					<Image source={{uri: photos[2]}} style={[style.photo3_right_photo]} resizeMode={'contain'} />
					<View style={[style.photo3_right_opacity]}>
						<Text style={[txt.roboto32b, style.text]}>+ {photos.length - 3}</Text>
					</View>
				</View>
			);
		}
	};

	const content = () => {
		if (photos.length == 1) {
			return <Image source={{uri: photos[0]}} style={[style.photo_1]} />;
		} else if (photos.length == 2) {
			return (
				<View style={[style.photo_2_container]}>
					<Image source={{uri: photos[0]}} style={[style.photo_2]} />
					<Image source={{uri: photos[1]}} style={[style.photo_2]} />
				</View>
			);
		} else if (photos.length >= 3) {
			return (
				<View style={[style.photo_3_container]}>
					<Image source={{uri: photos[0]}} style={[style.photo3_first]} />
					<View style={[style.photo3_right]}>
						<Image source={{uri: photos[1]}} style={[style.photo3_right_photo]} />
						{getThirdPhoto()}
					</View>
				</View>
			);
		}
	};

	return <View style={[style.container]}>{content()}</View>;
};

ArticleThumnails.defaultProps = {
	photo_list: [],
};

const style = StyleSheet.create({
	container: {
		alignSelf: 'center',
		paddingVertical: 30 * DP,
	},
	photo_1: {
		width: 654 * DP,
		height: 334 * DP,
	},
	photo_2_container: {
		width: 654 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	photo_2: {
		width: 324 * DP,
		height: 334 * DP,
	},
	photo_3_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	photo3_first: {
		width: 370 * DP,
		height: 334 * DP,
	},
	photo3_right: {
		width: 278 * DP,
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	photo3_right_photo: {
		width: 278 * DP,
		height: 164 * DP,
		zIndex: 0,
	},
	photo3_right_photo_opacity: {
		width: 278 * DP,
		height: 164 * DP,
		zIndex: 1,
	},
	photo3_right_opacity: {
		width: 278 * DP,
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
