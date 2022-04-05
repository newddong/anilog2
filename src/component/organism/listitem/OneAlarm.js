import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import {userAccount} from 'Organism/style_organism copy';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {GRAY10, APRI10, BLACK, APRI20, WHITE} from 'Root/config/color';
import {getTimeLapsed} from 'Root/util/dateutil';
import {ProfileDefaultImg} from 'Root/component/atom/icon';
/**
 * 알람 객체
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 아이템 데이터
 * @param {void} props.onLabelClick - 알림 라벨 클릭
 * @param {boolean} props.newNote - 사용자의 새로운 알람이 있다면 true 아니면 false
  * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)

 */
const OneAlarm = props => {
	// console.log('UserAccount item', props.data);
	const [isNewNote, setIsNewNote] = React.useState(false);
	const data = props.data;
	const [value, setValue] = React.useState(0);
	console.log('props', props);
	console.log('newNote', props.newNote, props.index);
	// console.log('time', data.memobox_date);
	const colors = ['#FF9888', WHITE];
	React.useEffect(() => {
		if (props.index == 0 && props.isData && props.newNote) {
			setIsNewNote(true);
		}
	}, []);
	React.useEffect(() => {
		let timer = setTimeout(() => {
			setValue(1);
			clearTimeout(timer);
		}, 2000);
		// clearTimeout(timer);
	}, []);
	console.log('OneAlarm props', data);
	return (
		<View style={[isNewNote ? [styles.yescontainer, {backgroundColor: colors[value]}] : styles.container]}>
			<TouchableOpacity onPress={() => props.onLabelClick(data)}>
				{data.notice_user_related_id.user_profile_uri ? (
					<View style={[styles.userAlarmContainer]}>
						<Image source={{uri: data.notice_user_related_id.user_profile_uri}} style={[styles.img_round_94]} />
						<Text style={[styles.messageContainer, txt.noto26]}>{data.notice_user_contents_kor}</Text>
						<View style={[{justifyContent: 'flex-end'}]}>
							<View style={styles.timeBeforeContainer}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{data.notice_user_date && getTimeLapsed(data.notice_user_date)}</Text>
							</View>
						</View>
					</View>
				) : (
					<View style={[styles.userAlarmContainer]}>
						<Text style={[styles.noProfileMessage, txt.noto26]}>{data.notice_user_contents_kor}</Text>
						<View style={[{justifyContent: 'flex-end'}]}>
							<View style={styles.timeBeforeContainer}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{data.notice_user_date && getTimeLapsed(data.notice_user_date)}</Text>
							</View>
						</View>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {width: 690 * DP, height: 134 * DP, justifyContent: 'center', marginLeft: 30 * DP, borderRadius: 30 * DP},
	yescontainer: {
		width: 690 * DP,
		height: 134 * DP,
		justifyContent: 'center',
		marginLeft: 30 * DP,
		borderRadius: 30 * DP,
		// backgroundColor: colors[value],
	},
	userAlarmContainer: {
		width: 654 * DP,
		// height: 94 * DP,
		flexDirection: 'row',
		marginLeft: 18 * DP,
		// backgroundColor: '#F2C2C2',
		// backgroundColor: 'yellow',
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
		// width: 110 * DP,
		height: 44 * DP,
		// backgroundColor: 'yellow',
		// marginRight: 48 * DP,
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
