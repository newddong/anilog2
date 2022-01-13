import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Private30, Public30} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';
import {APRI10, BLACK, GRAY10, GRAY20} from 'Root/config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import moment from 'moment';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(user_id:number)=>void} props.onClickLabel - 보호소 UserObject
 */
const ShelterSmallLabel = props => {
	const [validation, setValidation] = React.useState(false);
	const data = props.data;
	//user_nickname Text 색깔 조건부적용을 위한 세션아이디 비교
	React.useEffect(() => {
		AsyncStorage.getItem('token', (err, res) => {
			data.user_id == res ? setValidation(true) : false; //일치한다면 Validation True로 nickname text color를 바꿈
		});
	});

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
		// console.log(date);

		date = moment(date).format('YYYY-MM-DD');
		return date;
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				<Image source={{uri: data.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_72} />
				<View style={{position: 'absolute', right: 0, bottom: 0}}>{getStatusMark()}</View>
			</TouchableOpacity>
			<View style={{marginLeft: 10 * DP, maxWidth: 440 * DP}}>
				<Text style={[txt.noto24b, {color: validation ? APRI10 : GRAY10}]} numberOfLines={1} ellipsizeMode="tail">
					{data.shelter_name} / {data.shelter_address.brief}
				</Text>
				{data.shelter_foundation_date != null || data.shelter_foundation_date != undefined ? (
					<Text style={[txt.noto24, {color: GRAY20}]} numberOfLines={1} ellipsizeMode="tail">
						{getFoundationDate()}
					</Text>
				) : (
					<></>
				)}
			</View>
		</View>
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
