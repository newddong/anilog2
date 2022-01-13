import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {AddItem92} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';
import {ProfileDefaultImg1, ProfileDefaultImg2, ProfileDefaultImg3} from 'Atom/icon';

/**
 * 프로필 이미지 컨테이너
 * @param {object} props - Props Object
 * @param {string} props.selectedImageUri - 버튼 제목목
 * @param {()=>void} props.onClick - 이미지 눌렸을때 동작하는 콜백,
 */
const ProfileImageSelect = props => {
	console.log('props', props);
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
			{props.selectedImageUri.length ? <Image style={styles.img_round_294} source={{uri: props.selectedImageUri}} /> : randomdefault()}
			<View style={{position: 'absolute', right: 0, bottom: 0, backgroundColor: '#ffffff', borderRadius: 50, opacity: 0.8, shadowOpacity: 0.2}}>
				<View style={{backgroundColor: 'black', borderRadius: 50, opacity: 0.4, shadowOpacity: 0.2}}>
					<AddItem92 />
				</View>
			</View>
		</TouchableOpacity>
	);
};

ProfileImageSelect.defaultProps = {
	selectedImageUri: '',
	onClick: e => console.log(e),
};
export default ProfileImageSelect;
