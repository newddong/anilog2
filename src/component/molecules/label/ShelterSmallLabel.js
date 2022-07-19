import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, MAINBLACK} from 'Root/config/color';
import {Private30, ProfileDefaultImg, Public30} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import userGlobalObj from 'Root/config/userGlobalObject';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(user_id:number)=>void} props.onClickLabel - 보호소 UserObject
 */
const ShelterSmallLabel = props => {
	const data = props.data;
	//user_nickname Text 색깔 조건부적용을 위한 세션아이디 비교
	const isLoginUser = data._id == userGlobalObj.userInfo._id;

	const getStatusMark = () => {
		switch (data.shelter_type) {
			case 'public':
				return <Public30 />;
			case 'private':
				return <Private30 />;
			default:
				return <></>;
		}
	};

	const onClickLabel = e => {
		props.onClickLabel(props.data);
	};

	const getFoundationDate = () => {
		let date = data.shelter_foundation_date;
		date = moment(date).format('YYYY-MM-DD');
		return date;
	};

	return (
		<TouchableOpacity onPress={onClickLabel} style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				{data.user_profile_uri ? (
					<FastImage source={{uri: data.user_profile_uri}} style={styles.img_round_72} />
				) : (
					<ProfileDefaultImg size={styles.img_round_72} />
				)}
				<View style={{position: 'absolute', right: 0, bottom: 0}}>{getStatusMark()}</View>
			</TouchableOpacity>
			<View style={{marginLeft: 30 * DP, maxWidth: 580 * DP}}>
				<Text style={[txt.noto30b, {color: isLoginUser ? APRI10 : MAINBLACK}]} numberOfLines={1} ellipsizeMode="tail">
					{data.user_nickname} / {data.shelter_address.brief}
				</Text>
				{data.shelter_foundation_date != null || data.shelter_foundation_date != undefined ? (
					<Text style={[txt.noto24, {color: GRAY20}]} numberOfLines={1} ellipsizeMode="tail">
						{getFoundationDate()}
					</Text>
				) : (
					<></>
				)}
			</View>
		</TouchableOpacity>
	);
};

ShelterSmallLabel.defaultProps = {
	data: {
		user_type: 'shelter',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '아름보호소', //보호소 이름
		shelter_address: {
			city: '서울시', //시,도
			district: '마포구', //군,구
			neighbor: '용강동 89-77', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-9645-0422', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2021-11-07', //보호소 설립일
	},
	onClickLabel: e => console.log(e),
};

export default ShelterSmallLabel;
