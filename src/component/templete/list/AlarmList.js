import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../../organism/listitem/UserNote';
import DailyAlarm from '../../organism/list/DailyAlarm';
import {WHITE} from 'Root/config/color';
import {getNoticeUserList} from 'Root/api/noticeuser';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {temp_inputLongText} from 'Root/i18n/msg';
import {lo} from '../style_address';
import {getUserProfile} from 'Root/api/userapi';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const AlarmList = props => {
	const [checkBoxMode, setCheckBoxMode] = React.useState(true);
	const [newNote, setNewNote] = React.useState(false);
	const [data, setData] = React.useState();
	const [isEmpty, setIsEmpty] = React.useState();
	const [loading, setLoading] = React.useState(true);
	let count = 0;
	const [refreshing, setRefreshing] = React.useState(false);
	console.log('props', props);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(1000).then(() => getAlarmList());
	}, []);

	React.useEffect(() => {
		getAlarmList();
	}, []);
	const getAlarmList = () => {
		let asyncAlarm;
		AsyncStorage.getItem('AlarmList', (err, result) => {
			asyncAlarm = result;
		});
		let temp = [[], [], []];
		getNoticeUserList(
			{},
			result => {
				console.log('result', result.msg);
				temp[0] = [...result.msg.today];
				temp[1] = [...result.msg.yesterday];
				temp[2] = [...result.msg.thisweek];
				console.log('temp', temp[0].length, temp[1].length, temp[2].length);
				setData(temp);
				if (!_.isEqual(JSON.stringify(result.msg), asyncAlarm)) {
					AsyncStorage.setItem('AlarmList', JSON.stringify(result.msg));
					// console.log(asyncAlarm, '둘이 다르다');
					setNewNote(true);
				}
				setIsEmpty(_.isEmpty(temp[0]) && _.isEmpty(temp[1]) && _.isEmpty(temp[2]));
				setLoading(false);
				setRefreshing(false);
			},
			err => {
				console.log('getNoticeUserList err', err);
			},
		);
	};
	const onLabelClick = data => {
		console.log(data.notice_user_collection, data, 'zz');
		switch (data.notice_user_collection) {
			case 'comment':
				break;
			case 'follow':
				getUserProfile(
					{userobject_id: data.notice_user_related_id._id},
					result => {
						console.log('result', result.msg);
						props.navigation.navigate('UserProfile', {userobject: result.msg});
					},
					err => {
						console.log('err', err);
					},
				);
				// navigation.navigate('UserProfile', {userobject: data.notice_user_related_id});
				// props.navigation.push('UserProfile', {userobject: data.notice_user_related_id});
				break;
		}
	};

	const renderItem = ({item, index}) => {
		// console.log('item', item);
		let isData;
		if (item.length != 0 && count == 0) {
			isData = true;
			count++;
		} else {
			isData = false;
		}
		return <DailyAlarm index={index} data={item} onLabelClick={item => onLabelClick(item)} newNote={newNote} isData={isData} />;
	};
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[styles.container]}>
				{isEmpty ? (
					<View>
						<Text style={[{textAlign: 'center'}]}>소식이 없습니다.</Text>
					</View>
				) : (
					<FlatList
						data={data}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					/>
				)}
			</View>
		);
	}
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
	// onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default AlarmList;
