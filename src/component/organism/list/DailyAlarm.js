import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../listitem/UserNote';
import OneAlarm from '../listitem/OneAlarm';
import {txt} from 'Root/config/textstyle';
import {GRAY40} from 'Root/config/color';

/**
 * 알람 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 데이터
 * @param {void} props.onClickLabel - 알림 라벨 클릭
 */
const stringList = ['오늘', '어제', '이번 주'];
const DailyAlarm = props => {
	console.log('Daily Alarm props', props.data, props.index);
	const renderItem = ({item, index}) => {
		console.log('item', item);
		return (
			<View style={[accountHashList.userAccount]}>
				<OneAlarm
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
				/>
			</View>
		);
	};

	return (
		<View style={[styles.container]}>
			<Text style={[txt.noto30, {marginLeft: 48 * DP}, {marginBottom: 20 * DP}]}>{stringList[props.index]}</Text>
			<FlatList
				style={[styles.listContainer]}
				data={props.data}
				keyExtractor={item => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 40 * DP,
		width: 750 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		// alignItems: 'center',
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
	listContainer: {
		flex: 1,
	},
});

DailyAlarm.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default DailyAlarm;
