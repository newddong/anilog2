import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {AddItem92, CrossNew92, Shelter294} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {ProfileDefaultImg1, ProfileDefaultImg2, ProfileDefaultImg3} from 'Atom/icon';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import {ProfileDefaultImg4} from 'Atom/icon';
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

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}

	const randomdefault = () => {
		const rand = [<ProfileDefaultImg1 />, <ProfileDefaultImg2 />, <ProfileDefaultImg3 />];
		return rand[getRandomInt(0, 3)];
	};

	return (
		<TouchableOpacity onPress={onClick} style={styles.img_round_294}>
			{/* ProfileImage uri가 null일 경우와 아닌 경우의 분기 */}
			{props.selectedImageUri.length ? (
				<Image style={styles.img_round_294} source={{uri: props.selectedImageUri}} />
			) : props.isShelter ? (
				<Shelter294 />
			) : (
				<ProfileDefaultImg4 />
			)}
			<View style={[style.shadowBtn]}>
				<View>
					{/* <AddItem92 /> */}
					<CrossNew92 />
				</View>
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
