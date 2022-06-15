import React from 'react';
import {View, Image, Text} from 'react-native';
import {Paw48_Mixed, Paw48_YELL20, Paw48_APRI10, Private62, Public62, ProfileDefaultImg} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';

/**
 * 프로필 이미지 160
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageLarge160 = props => {
	const profile_data = props.data
		? props.data
		: {
				user_type: 'user',
				pet_status: 'companion',
				shelter_type: 'private',
		  };
	// console.log('PrifleImageLabel / Props Data ' + JSON.stringify(profile_data.user_profile_uri));

	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시
	const petStatus = () => {
		switch (profile_data.pet_status) {
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
		switch (profile_data.shelter_type) {
			case 'public':
				return <Public62 />;
			case 'private':
				return <Private62 />;
			default:
				return <></>;
		}
	};

	const userType = () => {
		switch (profile_data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute'}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute', right: 0, bottom: 0}}>{shelter_type()}</View>;
			default:
				return <></>;
		}
	};
	return (
		<View style={styles.img_round_160}>
			{profile_data.user_profile_uri ? (
				<>
					<FastImage source={{uri: profile_data.user_profile_uri}} style={styles.img_round_160} />
					{userType()}
				</>
			) : (
				<>
					<ProfileDefaultImg size={styles.img_round_160} />
					{userType()}
				</>
			)}
		</View>
	);
};

ProfileImageLarge160.defaultProps = {};
export default ProfileImageLarge160;
