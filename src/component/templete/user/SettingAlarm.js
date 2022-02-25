import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
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
	const onSwtichOn = () => {};

	//계정 공개 여부 변경 Switch Off
	const onSwtichOff = () => {};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.everyAlarmContainer}>
					<View style={{flexDirection: 'row'}}>
						<View style={{width: 550 * DP}}>
							<Text style={[txt.noto32b, {color: APRI10}]}>전체 알림</Text>
						</View>
						<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
					</View>
				</View>
				<View style={styles.serviceAlarmContainer}>
					<Text style={[txt.noto32b, {color: GRAY10}]}>서비스별 알림</Text>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 30 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{FOLLWER_NEW_POST_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{FAVORITE_PROTECT_STATUS_CHANGE_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{PET_VACCIN_DATE_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
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
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{MY_POST_COMMENT_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{TAG_OR_FOLLOW_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={[styles.alarmDetailEachContainer, {marginTop: 24 * DP}]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>{MY_APPLY_STATUS_CHANGE_ALRAM}</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
				</View>
				<View style={styles.noticeAlarmContainer}>
					<View style={{flexDirection: 'row'}}>
						<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
							<Text style={[txt.noto32b, {color: GRAY10}]}>공지 알림</Text>
						</View>
						<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
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
