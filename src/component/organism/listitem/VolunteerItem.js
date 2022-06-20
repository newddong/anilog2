import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10, GRAY20, MAINBLACK, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ShelterLabel from 'Molecules/label/ShelterLabel';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import userGlobalObject from 'Root/config/userGlobalObject';
import FastImage from 'react-native-fast-image';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(data:object)=>void} props.onClickLabel - 프로필 라벨 클릭
 */
export default VolunteerItem = props => {
	const data = props.data;

	const parsing_wish_date = () => {
		let date = data.volunteer_wish_date[0];
		date = moment(date).format('YY.MM.DD');
		return date;
	};
	// console.log('props.type', data.volunteer_wish_date, props.type, data.volunteer_status);

	const getStatusText_notDone = () => {
		let text = '활동 예정';
		const findMyStatus = data.volunteer_accompany.findIndex(e => e.member._id == userGlobalObject.userInfo._id);
		if (userGlobalObject.userInfo.user_type == 'user') {
			data.volunteer_status == 'waiting' //보호소가 승락하지 않은 상태라면 '수락 대기중'
				? (text = '수락 대기중')
				: data.volunteer_accompany[findMyStatus].confirm == 'accept' // 보호소가 승락을 하였으면 사용자 계정의 승락여부에 따른 출력 텍스트 분기처리
				? (text = '활동 예정')
				: (text = '참여 거절');
		} else {
			data.volunteer_status == 'waiting' //보호소가 승락하지 않은 상태라면 '수락 대기중'
				? (text = '수락 대기중')
				: (text = '활동 예정');
		}
		return text;
	};

	const getStatusText_done = () => {
		//활동완료(done) : 봉사활동이 완료된 상태 [App에서의 표기 : '활동 완료']
		//신청거절(notaccept) : 보호소에서 거절 [App에서의 표기 : '취소(보호소)']
		//신청승인(accept) : 보호소에서 승인 [App에서의 표기 : '활동 예정' - 참여 인원은 본인이 승인했을 경우임. 거절하면 '활동 거절'로 표기]
		//보호소승인대기(waiting) : 참여 리더가 신청한 직후 상태   [App에서의 표기 : '승인 대기']
		//신청취소(cancel) : 참여 리더가 신청취소한 상태 [App에서의 표기 : '활동 취소']
		let text = '활동 완료';
		if (props.isShelterUser) {
			switch (data.volunteer_status) {
				case 'waiting':
					text = '만료';
					break;
				case 'notaccept':
					text = '신청거절';
					break;
				case 'cancel':
					text = '신청취소';
					break;
				case 'accept':
				case 'done':
					text = '활동 완료';
				default:
					break;
			}
		} else {
			switch (data.volunteer_status) {
				case 'waiting':
					text = '만료';
					break;
				case 'cancel':
					text = '활동 취소';
					break;
				case 'notaccept':
					text = '활동 거절';
				case 'accept':
				case 'done':
					text = '활동 완료';
				default:
					break;
			}
		}
		return text;
	};

	return (
		<View style={[style.container]}>
			{/* <View style={[style.labelContainer]}>
				{!props.isShelterUser ? (
					<ShelterLabel data={data} onClickLabel={() => props.onClickLabel()} />
				) : (
					<UserDescriptionLabel width={388} data={data.volunteer_accompany[0].member} onClickLabel={() => props.onClickLabel()} />
				)}
			</View> */}
			<TouchableOpacity activeOpacity={0.8} onPress={() => props.onShelterLabelClick(data)} style={[shelterList.shelterLabel]}>
				<View style={[shelterList.leftContainer]}>
					<View style={[{width: 158 * DP, height: 148 * DP}]}>
						<FastImage source={{uri: data.user_profile_uri}} style={shelterList.shelterImage} />
						<View style={[shelterList.shelterType]}>
							<Text style={[txt.noto22b, {color: WHITE, textAlignVertical: 'center', textAlign: 'center'}]}>
								{data.shelter_type == 'private' ? '사' : '공'}
							</Text>
						</View>
					</View>
				</View>
				<View style={[shelterList.rightContainer, {}]}>
					<Text style={[txt.roboto24, {color: GRAY10}]}>2022.05.01</Text>
					<Text style={[txt.noto30, {maxWidth: 380 * DP}]} numberOfLines={1}>
						{data.user_nickname}
					</Text>
					<View style={{flexDirection: 'row'}}>
						{data.volunteer_wish_date.map((v, i) => {
							return (
								<Text key={i} style={[txt.noto26]}>
									{i != 0 ? '/' : ''} {moment(v).format('YY.MM.DD')}
								</Text>
							);
						})}
					</View>
				</View>
			</TouchableOpacity>
			{props.nvName != 'ProtectApplicant' && props.showStatus ? (
				<View style={[style.expected_activityDate]}>
					{/* <Text style={[txt.roboto22, {color: GRAY20}]}>{parsing_wish_date()}</Text> */}
					<Text style={[txt.noto24, {color: GRAY20, marginTop: 5}]}>{props.type == 'done' ? getStatusText_done() : getStatusText_notDone()}</Text>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

VolunteerItem.defaultProps = {
	onClickLabel: e => console.log(e),
	showStatus: true,
};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		// height: 94 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	labelContainer: {
		width: 510 * DP,
		// backgroundColor: 'palegreen',
	},
	expected_activityDate: {
		// width: 112 * DP,
		// backgroundColor: 'yellow',
		height: 70 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
	},
});

const shelterList = StyleSheet.create({
	container: {
		width: 694 * DP,
		height: 160 * DP,
	},
	shelterLabel: {
		marginRight: 22 * DP,
		flexDirection: 'row',
	},
	leftContainer: {
		marginRight: 30 * DP,
	},
	shelterImage: {
		width: 148 * DP,
		height: 148 * DP,
		borderRadius: 100,
		alignSelf: 'flex-end',
	},
	shelterType: {
		width: 62 * DP,
		height: 62 * DP,
		borderRadius: 12 * DP,
		backgroundColor: MAINBLACK,
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	rightContainer: {},
});
