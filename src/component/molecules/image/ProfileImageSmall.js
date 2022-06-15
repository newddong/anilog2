import React from 'react';
import {View, Image} from 'react-native';
import {DEFAULT_ANIMAL_PROFILE, DEFAULT_PROFILE} from 'Root/i18n/msg';
import {
	HashLabel46,
	HashLabel60,
	HashLabel70,
	HashLabel76,
	HashLabel94,
	Paw30_APRI10,
	Paw30_Mixed,
	Paw30_YELL20,
	Private48,
	ProfileDefaultImg,
	Public48,
} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';

/**
 * 프로필이미지 소형(size 가변 - 94 76 70 60 46)
 * @param {object} props - Props Object
 * @param {object} props.data - 프로필 오브젝트
 * @param {94|76|70|60|46} props.size - 버튼 스타일 '94'|'76'|'70'|'60'|'46'
 */
const ProfileImageSmall = props => {
	// 유저의 프로필 이미지를 표시,  유저의 종류(일반유저, 반려동물, 보호소)와 상태(임시보호중,입양,공립,사립)에 따라 아이콘을 표시
	const petStatus = () => {
		switch (props.data.pet_status) {
			case 'companion':
				return <Paw30_APRI10 />;
			case 'protect':
				return <Paw30_YELL20 />;
			case 'adopt':
				return <Paw30_Mixed />;
			default:
				return <></>;
		}
	};

	//user_type에 따른 라벨 이미지 마크(입양/임보, 공립/사립) 추가 결정
	const userType = () => {
		switch (props.data.user_type) {
			case 'pet':
				return <View style={{position: 'absolute'}}>{petStatus()}</View>;
			case 'shelter':
				return <View style={{position: 'absolute', right: 0, bottom: 0}}>{props.data.shelter_type == 'public' ? <Public48 /> : <Private48 />}</View>;
			default:
				return <></>;
		}
	};

	const getSize = () => {
		switch (props.size) {
			case 94:
				return styles.img_round_94;
			case 76:
				return styles.img_round_76;
			case 70:
				return styles.img_round_70;
			case 60:
				return styles.img_round_60;
			case 46:
				return styles.img_round_46;
		}
	};

	//호출 용도가 해쉬리스트였을 경우 Hash아이콘 출력
	const getHash = () => {
		switch (props.size) {
			case 94:
				return <HashLabel94 />;
			case 76:
				return <HashLabel76 />;
			case 70:
				return <HashLabel70 />;
			case 60:
				return <HashLabel60 />;
			case 46:
				return <HashLabel46 />;
		}
	};

	return (
		<View>
			{props.data.user_type == 'hash' ? (
				getHash()
			) : props.data.user_profile_uri != undefined ? (
				<FastImage source={{uri: props.data.user_profile_uri}} style={getSize()} />
			) : (
				<ProfileDefaultImg size={getSize()} />
			)}
			{userType()}
		</View>
	);
};

ProfileImageSmall.defaultProps = {
	size: 94,
	data: {},
};
export default ProfileImageSmall;
