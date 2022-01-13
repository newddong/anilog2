import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Paw62_APRI10, Paw62_Mixed, Paw62_YELL20, ProfileDefaultImg} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.data - PetImageLabel 데이터 오브젝트
 */
const PetImageLabel = props => {
	// 반려동물의 프로필 이미지를 표시, 상태(임시보호중,입양)에 따라 아이콘을 표시
	const petStatus = () => {
		switch (props.data.pet_status) {
			case 'protect':
				return <Paw62_YELL20 />;
			case 'adopt':
				return <Paw62_Mixed />;
			default:
				return <Paw62_APRI10 />;
		}
	};

	const onPressLabel = () => {
		props.onPressLabel();
	};
	return (
		<TouchableOpacity onPress={onPressLabel} style={{width: 180 * DP, height: 180 * DP}}>
			{props.data.user_profile_uri != undefined ? (
				<Image
					source={{
						uri: props.data.user_profile_uri,
					}}
					style={styles.img_round_180}
				/>
			) : (
				<ProfileDefaultImg size={{width: 180 * DP, height: 180 * DP}} />
			)}

			<View style={{position: 'absolute'}}>{petStatus()}</View>
			{props.showNickname ? <Text style={[txt.noto28, {color: GRAY10, textAlign: 'center'}]}>{props.data.user_nickname}</Text> : <></>}
		</TouchableOpacity>
	);
};

PetImageLabel.defaultProps = {
	onPressLabel: e => {},
	showNickname: true,
};
export default PetImageLabel;
