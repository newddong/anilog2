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
import {getUserProfile, setAlarmStatus} from 'Root/api/userapi';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {getFeedDetailById, getMissingReportList} from 'Root/api/feedapi';
import {getUserVolunteerActivityList, getVolunteerActivityById} from 'Root/api/volunteerapi';
import {getApplyDetailById, getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import {getAppliesRecord} from 'Root/api/protectapi';
import {getCommunityByObjectId} from 'Root/api/community';
import userGlobalObject from 'Root/config/userGlobalObject';
import MissingReportBox from 'Root/component/organism/listitem/MissingReportBox ';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const NewMissingReportList = props => {
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const navigation = useNavigation();
	const [refreshing, setRefreshing] = React.useState(false);
	const navState = useNavigationState(state => state);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(1000).then(() => getAlarmList());
	}, []);

	React.useEffect(() => {
		fetchMissingAndReport();
		return () => setLoading(false);
	}, []);

	const fetchMissingAndReport = () => {
		getMissingReportList(
			{request_number: 10},
			result => {
				// console.log('result', result.msg[0]);
				setLoading(false);
				setData(result.msg);
			},
			err => {
				console.log('getMissingReportList err', err);
			},
		);
	};

	React.useEffect(() => {}, []);

	const onLabelClick = data => {
		console.log('aa', data);
	};

	const renderItem = ({item, index}) => {
		// console.log('item', item);

		return <MissingReportBox index={index} data={item} onLabelClick={onLabelClick} />;
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
				<FlatList data={data} renderItem={renderItem} showsHorizontalScrollIndicator={false} horizontal={true} />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		width: 643 * DP,
		// height: 396 * DP,
		// alignItems: 'center',
		backgroundColor: WHITE,
		marginTop: 20 * DP,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

NewMissingReportList.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
};

export default React.memo(NewMissingReportList);
