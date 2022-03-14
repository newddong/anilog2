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
	PET_VACCIN_DATE_ALRAM,
	TAG_OR_FOLLOW_ALRAM,
} from 'Root/i18n/msg';
export default SettingAlarm = ({route}) => {
	const [alarm, setAlarm] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const [apiPost, setApiPost] = React.useState(false);
	React.useEffect(() => {
		getNotice(
			{},
			noticeObject => {
				var temp = noticeObject.msg[0];

				delete temp._id;
				delete temp.notice_update_date;
				delete temp.notice_user_id;
				delete temp.__v;
				// console.log('temp', temp);
				setAlarm(noticeObject.msg[0]);
				setLoading(false);
			},

			err => {
				console.log('er', err);
			},
		);
	}, []);
	React.useEffect(() => {
		console.log('alarm', alarm, apiPost);
		updateNotice(
			{...alarm},
			callback => {
				console.log('updateNotice', callback);
			},

			err => {
				console.log('er', err);
			},
		);
	}, [alarm]);

	const onSwtichAll = () => {
		//전체 알람이 true이면
		if (alarm.notice_all) {
			setAlarm(prevState => ({
				...prevState,
				notice_all: false,
				notice_newfollower: false,
				notice_favorite_protect_request: false,
				notice_pet_vaccination: false,
				notice_my_post: false,
				notice_comment_on_my_post: false,
				notice_tag_follower: false,
				notice_my_applicant: false,
				notice_alarm: false,
			}));
			// setApiPost(!apiPost);
		} else {
			setAlarm(prevState => ({
				...prevState,
				notice_all: true,
				notice_newfollower: true,
				notice_favorite_protect_request: true,
				notice_pet_vaccination: true,
				notice_my_post: true,
				notice_comment_on_my_post: true,
				notice_tag_follower: true,
				notice_my_applicant: true,
				notice_alarm: true,
			}));
			// setApiPost(!apiPost);
		}
	};
	const onSwtichFollower = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_newfollower: !prevState.notice_newfollower,
		}));
		// setApiPost(!apiPost);
	};
	const onSwtichProtectStatus = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_favorite_protect_request: !prevState.notice_favorite_protect_request,
		}));
		// setApiPost(!apiPost);
	};
	const onSwtichPetVaccine = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_pet_vaccination: !prevState.notice_pet_vaccination,
		}));
		setApiPost(!apiPost);
	};
	const onSwtichMyPost = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_my_post: !prevState.notice_my_post,
		}));
		setApiPost(!apiPost);
	};
	const onSwtichMyPostComment = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_comment_on_my_post: !prevState.notice_comment_on_my_post,
		}));
		// setApiPost(!apiPost);
	};
	const onSwtichMyTagFollow = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_tag_follower: !prevState.notice_tag_follower,
		}));
		// setApiPost(!apiPost);
	};
	const onSwtichApplyStatus = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_my_applicant: !prevState.notice_my_applicant,
		}));
		setApiPost(!apiPost);
	};
	const onSwtichNotice = () => {
		setAlarm(prevState => ({
			...prevState,
			notice_alarm: !prevState.notice_alarm,
		}));
		setApiPost(!apiPost);
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
							<OnOffSwitch onSwtichOff={onSwtichAll} onSwtichOn={onSwtichAll} />
						</View>
					</View>
					<View style={styles.serviceAlarmContainer}>
						<Text style={[txt.noto32b, {color: GRAY10}]}>서비스별 알림</Text>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 30 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{FOLLWER_NEW_POST_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_newfollower || ''} onSwtichOff={onSwtichFollower} onSwtichOn={onSwtichFollower} />
							</View>
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{FAVORITE_PROTECT_STATUS_CHANGE_ALRAM}</Text>
								</View>
								<OnOffSwitch
									default={alarm.notice_favorite_protect_request || ''}
									onSwtichOff={onSwtichProtectStatus}
									onSwtichOn={onSwtichProtectStatus}
								/>
							</View>
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{PET_VACCIN_DATE_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_pet_vaccination || ''} onSwtichOff={onSwtichPetVaccine} onSwtichOn={onSwtichPetVaccine} />
							</View>
						</View>
					</View>
					<View style={styles.activityAlarmContainer}>
						<Text style={[txt.noto32b, {color: GRAY10}]}>내 활동 알림</Text>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 30 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{MY_POST_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_my_post || ''} onSwtichOff={onSwtichMyPost} onSwtichOn={onSwtichMyPost} />
							</View>
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{MY_POST_COMMENT_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_comment_on_my_post || ''} onSwtichOff={onSwtichMyPostComment} onSwtichOn={onSwtichMyPostComment} />
							</View>
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{TAG_OR_FOLLOW_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_tag_follower || ''} onSwtichOff={onSwtichMyTagFollow} onSwtichOn={onSwtichMyTagFollow} />
							</View>
						</View>
						<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>{MY_APPLY_STATUS_CHANGE_ALRAM}</Text>
								</View>
								<OnOffSwitch default={alarm.notice_my_applicant || ''} onSwtichOff={onSwtichApplyStatus} onSwtichOn={onSwtichApplyStatus} />
							</View>
						</View>
					</View>
					<View style={styles.noticeAlarmContainer}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto32b, {color: GRAY10}]}>공지 알림</Text>
							</View>
							<OnOffSwitch default={alarm.notice_alarm || ''} onSwtichOff={onSwtichNotice} onSwtichOn={onSwtichNotice} />
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 1006 * DP,
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
		height: 338 * DP,
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
