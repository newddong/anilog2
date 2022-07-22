import React, {useCallback} from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import OneAlarm from '../listitem/OneAlarm';
import {txt} from 'Root/config/textstyle';
import {GRAY40} from 'Root/config/color';

/**
 * 알람 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 데이터
 * @param {Int} props.index - 알림 데이터의 오늘, 어제, 이번주 (0,1,2)인덱스
 * @param {boolean} props.newNote - 사용자의 새로운 알람이 있다면 true 아니면 false
 * @param {boolean} props.isData - 오늘, 어제 , 이번주 각각의 array에 data가 있으면 true 없으면 false
 * @param {void} props.onClickLabel - 알림 라벨 클릭
 */
const stringList = ['오늘', '어제', '이번 주', '지난 알람'];
const DailyAlarm = props => {
	const ITEM_HEIGHT = 134 * DP;
	// console.log('Daily Alarm props', props.data, props.index);
	// console.log('newNote', props.index == 0 && props.newNote);
	const renderItem = ({item, index}) => {
		// console.log('item', item);
		return (
			// <View style={[accountHashList.userAccount]}>
			<OneAlarm
				data={item}
				onLabelClick={item => props.onLabelClick(item)}
				newNote={props.newNote}
				// newNote={true}
				index={index}
				isData={props.isData}
			/>
			// </View>
		);
	};
	const getItemLayout = useCallback(
		(data, index) => ({
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}),
		[],
	);
	if (props.data.length == 0) {
		return <></>;
	} else {
		return (
			<View style={[styles.container]}>
				<Text style={[txt.noto26b, {marginLeft: 28 * DP}, {marginBottom: 20 * DP}]}>{stringList[props.index]}</Text>
				<FlatList
					style={[styles.listContainer]}
					data={props.data}
					keyExtractor={item => item._id}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					getItemLayout={getItemLayout}
				/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		// marginTop: 16 * DP,
		width: 750 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		flexGrow: 0,
		flex: 1,
		// alignItems: 'center',
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		// height: 134 * DP,
		marginBottom: 40 * DP,
	},
	listContainer: {
		// flexGrow: 0,
		flex: 1,
	},
});

DailyAlarm.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default React.memo(DailyAlarm);
