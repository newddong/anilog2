import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import {userAccount} from 'Organism/style_organism copy';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {GRAY10, APRI10, BLACK} from 'Root/config/color';
import {getTimeLapsed} from 'Root/util/dateutil';
import {ProfileDefaultImg} from 'Root/component/atom/icon';
/**
 * 알람 객체
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 아이템 데이터
 * @param {void} props.onLabelClick - 알림 라벨 클릭

 */
const OneAlarm = props => {
	// console.log('UserAccount item', props.data);
	const data = props.data;
	// console.log('time', data.memobox_date);
	console.log('OneAlarm props', data);

	return (
		<View style={[styles.container]}>
			<TouchableOpacity onPress={() => props.onLabelClick(data)}>
				{data.opponent_user_profile_uri ? (
					<View style={[styles.userAlarmContainer]}>
						<Image source={{uri: data.opponent_user_profile_uri}} style={[styles.img_round_94]} />
						<Text style={[styles.messageContainer, txt.noto26]}>{data.alarm_contents}</Text>
						<View style={[{justifyContent: 'flex-end'}]}>
							<View style={styles.timeBeforeContainer}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{data.alarm_date && getTimeLapsed(data.alarm_date)}</Text>
							</View>
						</View>
					</View>
				) : (
					<View style={[styles.userAlarmContainer]}>
						<Text style={[styles.noProfileMessage, txt.noto26]}>{data.alarm_contents}</Text>
						<View style={[{justifyContent: 'flex-end'}]}>
							<View style={styles.timeBeforeContainer}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{data.alarm_date && getTimeLapsed(data.alarm_date)}</Text>
							</View>
						</View>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {width: 654 * DP, height: 82 * DP},
	userAlarmContainer: {
		width: 654 * DP,
		// height: 94 * DP,
		flexDirection: 'row',
		marginLeft: 48 * DP,
		// backgroundColor: '#F2C2C2',
	},

	img_round_94: {
		width: 94 * DP,
		height: 94 * DP,
		borderRadius: 500,
	},
	noProfileMessage: {
		width: 566 * DP,
		height: 82 * DP,
	},
	messageContainer: {width: 442 * DP, height: 82 * DP, marginLeft: 30 * DP, marginTop: 6 * DP},

	timeBeforeContainer: {
		width: 110 * DP,
		height: 44 * DP,
		// backgroundColor: 'yellow',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});

UserAccount.defaultProps = {
	onLabelClick: e => console.log(e),
	onClickFollow: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false,
	checkBoxState: false,
	showFollowBtn: false,
};

export default OneAlarm;
