import React from 'react';
import {View, Image} from 'react-native';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Paw48_Mixed, Paw48_YELL20, Paw48_APRI10, Private48, Public48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';

/**
 * 프로필이미지 140
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageMedium148 = props => {
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
				return <Public48 />;
			case 'private':
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
		<View style={styles.img_round_148}>
			<Image source={{uri: props.data.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_148} />
			{userType()}
		</View>
	);
};

ProfileImageMedium148.defaultProps = {};
export default ProfileImageMedium148;
