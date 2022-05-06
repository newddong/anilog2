import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {getNotice, updateNotice} from 'Root/api/notice';
import {
	FAVORITE_PROTECT_STATUS_CHANGE_ALRAM,
	FOLLWER_NEW_POST_ALRAM,
	MY_APPLY_STATUS_CHANGE_ALRAM,
	MY_POST_ALRAM,
	MY_POST_COMMENT_ALRAM,
	NEW_FOLLOWER,
	PET_VACCIN_DATE_ALRAM,
	TAG_OR_FOLLOW_ALRAM,
} from 'Root/i18n/msg';
import OneLineOnOff from 'Organism/form/OneLineOnOff';
import OnOffSwitchForSetting from 'Root/component/molecules/select/OnOffSwitchForSetting';
export default SettingAlarm = ({route}) => {
	const [alarm, setAlarm] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const [apiPost, setApiPost] = React.useState(false);
	const [onCount, setOnCount] = React.useState(0);
	React.useEffect(() => {
		console.log('count', onCount);
	}, [onCount]);
	React.useEffect(() => {
		getNotice(
			{},
			noticeObject => {
				let temp = noticeObject.msg[0];
				let tempInt = 0;
				delete temp._id;
				delete temp.notice_update_date;
				delete temp.notice_user_id;
				delete temp.__v;
				// console.log('temp', temp);
				if (temp.notice_all) {
					setOnCount(7);
				} else {
					for (let i of Object.values(temp)) {
						console.log('iii', i);
						if (i == true) {
							tempInt++;
						}
					}
				}
				setOnCount(tempInt);
				setAlarm(temp);
				setLoading(false);
			},

			err => {
				console.log('er', err);
			},
		);
	}, []);
	React.useEffect(() => {
		if (!loading) {
			updateNotice(
				alarm,
				callback => {
					console.log('updateNotice', callback);
				},

				err => {
					console.log('er', err);
				},
			);
		}
	}, [alarm, loading]);

	const onSwtichAll = () => {
		//전체 알람이 true이면
		if (alarm.notice_all) {
			setAlarm(prevState => ({
				...prevState,
				notice_all: false,
				notice_follow: false,
				notice_memobox: false,
				notice_pet_vaccination: false,
				notice_my_post: false,
				notice_tag: false,
				notice_my_applicant: false,
				notice_alarm: false,
			}));
			setOnCount(0);
			// setApiPost(!apiPost);1
		} else {
			setAlarm(prevState => ({
				...prevState,
				notice_all: true,
				notice_follow: true,
				notice_memobox: true,
				notice_pet_vaccination: true,
				notice_my_post: true,
				notice_tag: true,
				notice_my_applicant: true,
				notice_alarm: true,
			}));
			setOnCount(8);
			// setApiPost(!apiPost);
		}
	};

	const switchButton = keys => {
		const tempObject = {...alarm};
		tempObject[keys] = !tempObject[keys];
		setAlarm(tempObject);
		if (alarm[keys]) {
			setOnCount(onCount - 1);
			setAlarm(prevState => ({
				...prevState,
				notice_all: false,
			}));
		} else {
			onCount == 7
				? setAlarm(prevState => ({
						...prevState,
						notice_all: true,
				  }))
				: null;
			setOnCount(onCount + 1);
		}
	};

	if (loading) {
		return <View></View>;
	} else {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.everyAlarmContainer}>
						<View style={{flexDirection: 'row'}}>
							<View style={{width: 550 * DP}}>
								<Text style={[txt.noto32b, {color: APRI10}]}>전체 알림</Text>
							</View>
							<OnOffSwitchForSetting default={alarm.notice_all} keys="notice_all" onSwtichOff={onSwtichAll} onSwtichOn={onSwtichAll} />
						</View>
					</View>
					<View style={styles.serviceAlarmContainer}>
						<Text style={[txt.noto32b, {color: GRAY10}]}>서비스별 알림</Text>
						{/* <View style={[styles.alarmDetailEachContainer, {marginTop: 30 * DP}]}>
							<OneLineOnOff data={alarm} name={FOLLWER_NEW_POST_ALRAM} keys="notice_newfollower" switchButton={switchButton} />
						</View> */}

						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<OneLineOnOff data={alarm} name={PET_VACCIN_DATE_ALRAM} keys="notice_pet_vaccination" switchButton={switchButton} />
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<OneLineOnOff data={alarm} name={'쪽지 수신 알림'} keys="notice_memobox" switchButton={switchButton} />
						</View>
					</View>
					<View style={styles.activityAlarmContainer}>
						<Text style={[txt.noto32b, {color: GRAY10}]}>내 활동 알림</Text>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 30 * DP}]}>
							<OneLineOnOff data={alarm} name={NEW_FOLLOWER} keys="notice_follow" switchButton={switchButton} />
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<OneLineOnOff data={alarm} name={MY_POST_COMMENT_ALRAM} keys="notice_my_post" switchButton={switchButton} />
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<OneLineOnOff data={alarm} name={TAG_OR_FOLLOW_ALRAM} keys="notice_tag" switchButton={switchButton} />
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<OneLineOnOff data={alarm} name={MY_APPLY_STATUS_CHANGE_ALRAM} keys="notice_my_applicant" switchButton={switchButton} />
						</View>
					</View>
					<View style={styles.noticeAlarmContainer}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto32b, {color: GRAY10}]}>공지 알림</Text>
							</View>
							<OnOffSwitchForSetting
								default={alarm.notice_alarm || ''}
								onSwtichOff={() => switchButton('notice_alarm')}
								onSwtichOn={() => switchButton('notice_alarm')}
							/>
						</View>
					</View>
				</View>
				{/* <Text>{onCount}</Text> */}
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 938 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	everyAlarmContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		justifyContent: 'center',
	},
	serviceAlarmContainer: {
		height: 270 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		justifyContent: 'center',
	},
	activityAlarmContainer: {
		height: 406 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		justifyContent: 'center',
	},
	noticeAlarmContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		alignContent: 'center',
		justifyContent: 'center',
	},
	alarmDetailEachContainer: {
		width: 654 * DP,
		height: 44 * DP,
	},
});
