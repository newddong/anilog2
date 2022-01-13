import React from 'react';
import {View, Image} from 'react-native';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {
	Paw48_Mixed,
	Paw48_YELL20,
	Paw48_APRI10,
	Private62,
	Public62,
	ProfileDefaultImg1_194,
	ProfileDefaultImg2_194,
	ProfileDefaultImg3_194,
} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';

/**
 * 프로필이미지 194
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageLarge194 = props => {
	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시
	const petStatus = () => {
		switch (props.data.pet_status) {
			case 'normal':
				return <Paw48_APRI10 />;
			case 'protected':
				return <Paw48_YELL20 />;
			case 'adopted':
				return <Paw48_Mixed />;
			default:
				return <></>;
		}
	};
	const shelter_type = () => {
		switch (props.data.shelter_type) {
			case 'public':
				return <Public62 />;
			case 'private':
				return <Private62 />;
			default:
				return <></>;
		}
	};
	const userType = () => {
		switch (props.data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute'}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute', right: 0, bottom: 0}}>{shelter_type()}</View>;
			default:
				return <></>;
		}
	};

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}

	const randomdefault = () => {
		const rand = [<ProfileDefaultImg1_194 />, <ProfileDefaultImg2_194 />, <ProfileDefaultImg3_194 />];

		return rand[getRandomInt(0, 3)];
	};

	return (
		<View style={styles.img_round_194}>
			{props.data.user_profile_uri != undefined ? (
				<>
					<Image source={{uri: props.data.user_profile_uri}} style={styles.img_round_194} />
					{userType()}
				</>
			) : (
				randomdefault()
			)}
		</View>
	);
};

ProfileImageLarge194.defaultProps = {};
export default ProfileImageLarge194;
