import userGlobalObject from 'Root/config/userGlobalObject';
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {APRI10, GRAY20, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE, IS_LEAVE_USER} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import {useNavigation} from '@react-navigation/native';
import {getTimeLapsed} from 'Root/util/dateutil';
import {FollwerOnly, Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, PrivateOnly, ProfileDefaultImg} from 'Atom/icon';
import moment from 'moment';
import Modal from 'Root/component/modal/Modal';
import FastImage from 'react-native-fast-image';

/**
 * 유저의 프로필 사진, 닉네임, 댓글 작성 날짜 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {date} props.time - Date 타입 정보
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 * @param {string} props.time_expression - 시간 표현 방식 ('date')
 */
const UserLocationTimeLabel = props => {
	const navigation = useNavigation();
	const isLoginUser = userGlobalObject.userInfo._id == props.data._id;
	const isMyPet =
		props.data.user_type == 'pet' && !userGlobalObject.userInfo.isPreviewMode && userGlobalObject.userInfo.user_my_pets.includes(props.data._id);

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
	const publicIcon = () => {
		if (props.publicType == 'private') {
			return <PrivateOnly />;
		} else if (props.publicType == 'follow') {
			return <FollwerOnly />;
		} else {
			return <></>;
		}
	};

	const onClickLabel = e => {
		if (props.empty) {
			Modal.alert(IS_LEAVE_USER);
		} else {
			if (props.onClickLabel) {
				props.onClickLabel(props.data);
			} else {
				navigation.navigate({key: props.data._id, name: 'UserProfile', params: {userobject: props.data}});
			}
		}
	};

	const getLocation = () => {
		let result = '';
		const location = props.location;
		// console.log('location', location);
		const detail = props.location.detail == undefined ? '' : '' + props.location.detail;
		if (location.road_address?.address_name == '') {
			result = '';
		} else if (
			location.road_address?.address_name == '도로명 주소가 없는 위치입니다. ' ||
			location.road_address?.address_name == 'undefined ' ||
			location.road_address?.city == undefined
		) {
			result = location.normal_address.city + ' ' + location.normal_address.district + ' ' + detail;
		} else {
			result = location.road_address.city + ' ' + location.road_address.district + ' ' + detail;
		}
		// console.log('result', result);
		return '· ' + result + '에서';
	};

	const getTime = () => {
		const dbDate = new Date(props.time);
		if (props.time_expression == '') {
			return props.time && getTimeLapsed(props.time);
		} else if (props.time_expression == 'full') {
			const year = dbDate.getFullYear();
			if (year == new Date().getFullYear()) {
				return moment(dbDate).format('MM.DD HH:mm');
			} else {
				return moment(dbDate).format('YY.MM.DD HH:mm');
			}
		} else if (props.time_expression == 'date') {
			return moment(dbDate).format('YYYY.MM.DD ');
		}
	};

	return (
		<TouchableOpacity onPress={onClickLabel}>
			<View style={[{flexDirection: 'row', alignItems: 'center'}]}>
				<>
					{props.data.user_profile_uri != undefined ? (
						<FastImage source={{uri: props.data.user_profile_uri}} style={props.isLarge ? styles.img_round_64 : styles.img_round_60} />
					) : (
						<ProfileDefaultImg size={props.isLarge ? styles.img_round_64 : styles.img_round_60} />
					)}
					<View style={{position: 'absolute', top: 8 * DP}}>
						{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
						{getStatusMark()}
					</View>
				</>

				<View style={{marginLeft: 20 * DP, height: 72 * DP}}>
					<View style={{flexDirection: 'row'}}>
						<Text
							style={[props.isLarge ? txt.noto30b : txt.roboto24, {color: isLoginUser ? APRI10 : BLACK, maxWidth: 500 * DP, lineHeight: 40 * DP}]}
							numberOfLines={1}>
							{props.data.user_nickname || '탈퇴한 계정입니다.'}
						</Text>

						<View
							style={[
								{
									justifyContent: 'center',
								},
							]}>
							{publicIcon()}
						</View>
					</View>
					<Text style={[props.isLarge ? txt.noto26 : txt.noto24, {lineHeight: 40 * DP, color: GRAY20, maxWidth: 470 * DP}]} numberOfLines={1}>
						{/* {address?.city} {address?.district} · {props.data.feed_type == undefined ? getCommentedTime() : props.data.comment_date} */}
						{getTime()} {props.location == undefined ? '' : getLocation()}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

UserLocationTimeLabel.defaultProps = {
	data: {
		user_address: {
			city: '',
			district: '',
		},
	},
	isLarge: false,
	time_expression: '',
};
export default UserLocationTimeLabel;
