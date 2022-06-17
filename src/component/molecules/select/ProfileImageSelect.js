import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from 'Atom/image/imageStyle';
import {CrossNew92, Shelter294, ProfileDefaultImg, ProfileDefaultImg4} from 'Atom/icon';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, WHITE} from 'Root/config/color';
import FastImage from 'react-native-fast-image';
/**
 * 프로필 이미지 컨테이너
 * @param {object} props - Props Object
 * @param {string} props.selectedImageUri - 버튼 제목목
 * @param {()=>void} props.onClick - 이미지 눌렸을때 동작하는 콜백,
 */
const ProfileImageSelect = props => {
	// console.log('props', props);
	const onClick = e => {
		props.onClick();
	};

	return (
		<TouchableOpacity onPress={onClick} style={styles.img_round_294}>
			{/* ProfileImage uri가 null일 경우와 아닌 경우의 분기 */}
			{props.selectedImageUri ? (
				props.selectedImageUri.includes('http') ? (
					<FastImage style={styles.img_round_294} source={{uri: props.selectedImageUri}} />
				) : (
					<Image style={styles.img_round_294} source={{uri: props.selectedImageUri}} />
				)
			) : props.isShelter ? (
				<Shelter294 />
			) : props.user == 'user' ? (
				<ProfileDefaultImg4 />
			) : (
				<ProfileDefaultImg size={styles.img_round_294} />
			)}
			<View style={[style.shadowBtn]}>
				<CrossNew92 />
			</View>
		</TouchableOpacity>
	);
};

ProfileImageSelect.defaultProps = {
	selectedImageUri: '',
	onClick: e => console.log(e),
};

const style = StyleSheet.create({
	shadow: {
		backgroundColor: GRAY10,
		borderRadius: 50 * DP,
		opacity: 0.8,
		shadowOpacity: 0.4,
		elevation: 5,
	},
	shadow_and: {
		backgroundColor: WHITE,
		borderRadius: 50 * DP,
		opacity: 0.8,
		elevation: 5,
	},
	shadowBtn: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		opacity: 1,
	},
});
export default ProfileImageSelect;
