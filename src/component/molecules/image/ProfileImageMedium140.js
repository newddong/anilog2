import React from 'react';
import {View, Image} from 'react-native';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Paw48_Mixed, Paw48_YELL20, Paw48_APRI10, Private48, Public48, ProfileDefaultImg} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';

/**
 * 프로필이미지 140
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageMedium140 = props => {
	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시
	const data = {
		pet_status: (props.data && props.data.pet_status) || 'companion',
		shelter_type: (props.data && props.data.shelter_type) || 'public',
		user_type: (props.data && props.data.user_type) || 'user',
		user_profile_uri: (props.data && props.data.user_profile_uri) || '',
	};

	const petStatus = () => {
		switch (data.pet_status) {
			case 'companion':
				return <Paw48_APRI10 />;
			case 'protect':
				return <Paw48_YELL20 />;
			case 'adopt':
				return <Paw48_Mixed />;
			default:
				return <></>;
		}
	};

	const shelter_type = () => {
		switch (data.shelter_type) {
			case 'public':
				return <Public48 />;
			case 'private':
				return <Private48 />;
			default:
				return <></>;
		}
	};

	const userType = () => {
		switch (data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute'}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute'}}>{shelter_type()}</View>;
			default:
				return <></>;
		}
	};

	return (
		<View style={styles.img_round_140}>
			{data.user_profile_uri ? (
				<FastImage source={{uri: data.user_profile_uri}} style={styles.img_round_140} />
			) : (
				<ProfileDefaultImg size={styles.img_round_140} />
			)}
			{userType()}
		</View>
	);
};

ProfileImageMedium140.defaultProps = {};
export default ProfileImageMedium140;
