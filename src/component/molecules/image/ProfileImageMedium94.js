import React from 'react';
import {View, Image} from 'react-native';
import {PET_STATUS_ADOPT, PET_STATUS_COMPANION, PET_STATUS_PROTECT, PRIVATE, PUBLIC} from 'Root/i18n/msg';
import {Private48, Public48, ProfileDefaultImg, Paw30_APRI10, Paw30_YELL20, Paw30_Mixed} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import {BLACK, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';

/**
 * 프로필이미지 120
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageMedium94 = props => {
	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시

	const petStatus = () => {
		switch (props.data.pet_status) {
			case PET_STATUS_COMPANION:
				return <Paw30_APRI10 />;
			case PET_STATUS_PROTECT:
				return <Paw30_YELL20 />;
			case PET_STATUS_ADOPT:
				return <Paw30_Mixed />;
			default:
				return <></>;
		}
	};

	const shelter_type = () => {
		// switch (props.data.shelter_type) {
		// 	case PUBLIC:
		// 		return <Public48 />;
		// 	case PRIVATE:
		// 		return <Private48 />;
		// 	default:
		// 		return <></>;
		// }
		return (
			<View
				style={{
					width: 62 * DP,
					height: 62 * DP,
					borderRadius: 20 * DP,
					backgroundColor: BLACK,
					justifyContent: 'center',
				}}>
				<Text style={[txt.noto26b, {color: WHITE, textAlignVertical: 'center', textAlign: 'center'}]}>
					{props.data.shelter_type == 'private' ? '사' : '공'}
				</Text>
			</View>
		);
	};

	const userType = () => {
		switch (props.data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute', bottom: 0, left: 0}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute'}}>{shelter_type()}</View>;
			default:
				return <></>;
		}
	};

	return (
		<View style={styles.img_round_94}>
			{props.data.user_profile_uri != undefined ? (
				<FastImage source={{uri: props.data.user_profile_uri}} style={styles.img_round_94} />
			) : (
				<ProfileDefaultImg size={styles.img_round_94} />
			)}
			{userType()}
		</View>
	);
};

ProfileImageMedium94.defaultProps = {};

export default ProfileImageMedium94;
