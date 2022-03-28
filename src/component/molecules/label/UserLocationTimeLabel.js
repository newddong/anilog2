import userGlobalObject from 'Root/config/userGlobalObject';
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {APRI10, GRAY20, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import {useNavigation} from '@react-navigation/native';
import {getTimeLapsed} from 'Root/util/dateutil';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg} from 'Atom/icon';

/**
 * 유저의 프로필 사진, 닉네임, 댓글 작성 날짜 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserLocationTimeLabel = props => {
	// console.log('props Time :  ', props);
	const navigation = useNavigation();
	const isLoginUser = userGlobalObject.userInfo._id == props.data._id;

	const getStatusMark = () => {
		switch (props.data.pet_status) {
			case 'protect':
				return <Paw30_YELL20 />;
			case 'adopt':
				return <Paw30_Mixed />;
			case 'companion':
				return <Paw30_APRI10 />;
			default:
				return <></>;
		}
	};

	const onClickLabel = e => {
		navigation.push('UserProfile', {userobject: props.data});
	};

	// const address = Object.assign({}, props.data.user_address);
	return (
		<TouchableOpacity onPress={onClickLabel} style={{paddingBottom: 8 * DP}}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<>
					{props.data.user_profile_uri != undefined ? (
						<Image source={{uri: props.data.user_profile_uri}} style={props.isLarge ? styles.img_round_70 : styles.img_round_60} />
					) : (
						<ProfileDefaultImg size={props.isLarge ? styles.img_round_70 : styles.img_round_60} />
					)}
					<View style={{position: 'absolute', top: 0}}>
						{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
						{getStatusMark()}
					</View>
				</>

				<View style={{marginLeft: 20 * DP}}>
					<Text style={[props.isLarge ? txt.roboto32b : txt.roboto24, {color: isLoginUser ? APRI10 : BLACK}]} numberOfLines={1}>
						{props.data.user_nickname || ''}
					</Text>
					<Text style={[props.isLarge ? txt.noto26 : txt.noto24, {lineHeight: 36 * DP, color: GRAY20}]} numberOfLines={1}>
						{/* {address?.city} {address?.district} · {props.data.feed_type == undefined ? getCommentedTime() : props.data.comment_date} */}
						{props.time && getTimeLapsed(props.time)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

UserLocationTimeLabel.defaultProps = {
	onClickLabel: e => console.log(e),
	data: {
		user_address: {
			city: '',
			district: '',
		},
	},
	isLarge: false,
};
export default UserLocationTimeLabel;
