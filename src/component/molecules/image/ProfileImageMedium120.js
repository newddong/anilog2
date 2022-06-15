import React from 'react';
import {View, Image} from 'react-native';
import {DEFAULT_PROFILE, PET_STATUS_ADOPT, PET_STATUS_COMPANION, PET_STATUS_PROTECT, PRIVATE, PUBLIC} from 'Root/i18n/msg';
import {Paw48_Mixed, Paw48_YELL20, Paw48_APRI10, Private48, Public48, ProfileDefaultImg} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import dp from 'Root/config/dp';
import FastImage from 'react-native-fast-image';

/**
 * 프로필이미지 120
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageMedium120 = props => {
	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시

	const petStatus = () => {
		switch (props.data.pet_status) {
			case PET_STATUS_COMPANION:
				return <Paw48_APRI10 />;
			case PET_STATUS_PROTECT:
				return <Paw48_YELL20 />;
			case PET_STATUS_ADOPT:
				return <Paw48_Mixed />;
			default:
				return <></>;
		}
	};

	const shelter_type = () => {
		switch (props.data.shelter_type) {
			case PUBLIC:
				return <Public48 />;
			case PRIVATE:
				return <Private48 />;
			default:
				return <></>;
		}
	};

	const userType = () => {
		switch (props.data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute'}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute'}}>{shelter_type()}</View>;
			default:
				return <></>;
		}
	};

	return (
		<View style={styles.img_round_120}>
			{props.data.user_profile_uri != undefined ? (
				<FastImage source={{uri: props.data.user_profile_uri}} style={styles.img_round_120} />
			) : (
				<ProfileDefaultImg size={styles.img_round_120} />
			)}
			{userType()}
		</View>
	);
};

ProfileImageMedium120.defaultProps = {};

export default ProfileImageMedium120;
