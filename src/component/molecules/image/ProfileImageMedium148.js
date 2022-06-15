import React from 'react';
import {View, Image, Text} from 'react-native';
import {Paw62_APRI10, Paw62_YELL20, Paw62_Mixed, ProfileDefaultImg} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import DP from 'Root/config/dp';
import {BLACK, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import FastImage from 'react-native-fast-image';

/**
 * 프로필이미지 140
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트 (UserObject - pet , shelter_type)
 */
const ProfileImageMedium148 = props => {
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
				return <Paw62_APRI10 />;
			case 'protect':
				return <Paw62_YELL20 />;
			case 'adopt':
				return <Paw62_Mixed />;
			default:
				return <></>;
		}
	};

	const userType = () => {
		switch (data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute', left: 0, bottom: 0}}>{petStatus()}</View>;
			case 'shelter':
				return (
					<View
						style={{
							position: 'absolute',
							bottom: 0,
							width: 62 * DP,
							height: 62 * DP,
							borderRadius: 20 * DP,
							backgroundColor: BLACK,
							justifyContent: 'center',
						}}>
						<Text style={[txt.noto26b, {color: WHITE, textAlignVertical: 'center', textAlign: 'center'}]}>
							{data.shelter_type == 'private' ? '사' : '공'}
						</Text>
					</View>
				);
			default:
				return <></>;
		}
	};

	return (
		<View style={styles.img_round_148}>
			{data.user_profile_uri ? (
				<FastImage source={{uri: data.user_profile_uri}} style={styles.img_round_148} />
			) : (
				<ProfileDefaultImg size={styles.img_round_148} />
			)}
			{userType()}
		</View>
	);
};

ProfileImageMedium148.defaultProps = {};
export default ProfileImageMedium148;
