import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../../organism/listitem/UserNote';
import DailyAlarm from '../../organism/list/DailyAlarm';
import {WHITE} from 'Root/config/color';

const dummyData = [
	[
		{
			alarm_contents: '알람내용입니다.',
			alarm_date: '2022-03-30T02:49:35.501Z',
			alarm_receive_id: '623b17ed400ac30b877dd7d9',
			opponent_user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
			__v: 0,
			_id: '6243c53fe8fde95d3b021a44',
		},
		{
			alarm_contents: '알람내용입니다22.',
			alarm_date: '2022-03-30T02:51:35.501Z',
			alarm_receive_id: '623b17ed400ac30b877dd7d9',
			opponent_user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
			__v: 0,
			_id: '6243c53fe8fde95d3b021a446',
		},
	],
	[
		{
			alarm_contents: '와우222',
			alarm_date: '2022-03-29T02:57:51.748Z',
			alarm_receive_id: '61d2de63c0f179ccd5ba5887',
			opponent_user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1647932305390_C0975042-AE19-4AF5-955F-F7EC597A67CB.jpg',
			__v: 0,
			_id: '624275afd1eff95f7778ba53',
		},
	],
	[
		{
			alarm_contents: '그냥 텍스트',
			alarm_date: '2022-03-29T02:58:51.748Z',
			alarm_receive_id: '61d2de63c0f179ccd5ba5887',
			__v: 0,
			_id: '624275afd1eff95f7778ba55',
		},
	],
];
const AlarmList = props => {
	console.log('NoteList props', props.data);
	const renderItem = ({item, index}) => {
		console.log('item', item);
		return (
			<DailyAlarm
				index={index}
				data={item}
				checkBoxMode={props.checkBoxMode}
				onLabelClick={item => props.onClickLabel(item)}
				onCheckBox={e => props.onCheckBox(e, index)}
			/>
		);
	};

	return (
		<View style={[styles.container]}>
			<FlatList data={dummyData} renderItem={renderItem} showsVerticalScrollIndicator={false} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		minHeight: 1322 * DP,
		// alignItems: 'center',
		backgroundColor: WHITE,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

AlarmList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default AlarmList;
