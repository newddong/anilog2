import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
/**
 *
 * @param {{
 * isCheck : boolean ,
 * }} props
 */
export default ArticleThumnails = props => {
	const getThirdPhoto = () => {
		if (dummy.length == 3) {
			return (
				<View style={[style.photo3_right_photo]}>
					<Image source={{uri: dummy[2]}} style={[{flex: 1}]} />
				</View>
			);
		} else {
			return (
				<View style={[style.photo3_right_photo]}>
					<Image source={{uri: dummy[2]}} style={[style.photo3_right_photo]} />
					<View style={[style.photo3_right_opacity]}>
						<Text style={[txt.roboto32b, style.text]}>+ {dummy.length - 3}</Text>
					</View>
				</View>
			);
		}
	};

	const content = () => {
		console.log('dummy.length', dummy.length);
		if (dummy.length == 1) {
			return <Image source={{uri: dummy[0]}} style={[style.photo_1]} />;
		} else if (dummy.length == 2) {
			return (
				<View style={[style.photo_2_container]}>
					<Image source={{uri: dummy[0]}} style={[style.photo_2]} />
					<Image source={{uri: dummy[1]}} style={[style.photo_2]} />
				</View>
			);
		} else if (dummy.length >= 3) {
			return (
				<View style={[style.photo_3_container]}>
					<Image source={{uri: dummy[0]}} style={[style.photo3_first]} />
					<View style={[style.photo3_right]}>
						<Image source={{uri: dummy[1]}} style={[style.photo3_right_photo]} />
						{getThirdPhoto()}
					</View>
				</View>
			);
		}
	};

	return (
		<View style={[style.container]}>
			<View style={[style.content]}>{content()}</View>
		</View>
	);
};

ArticleThumnails.defaultProps = {};

const dummy = [
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
];

const style = StyleSheet.create({
	container: {
		alignSelf: 'center',
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
