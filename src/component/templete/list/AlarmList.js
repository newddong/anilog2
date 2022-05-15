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
import {getFeedDetailById} from 'Root/api/feedapi';
import {getUserVolunteerActivityList, getVolunteerActivityById} from 'Root/api/volunteerapi';
import {getApplyDetailById, getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import {getAppliesRecord} from 'Root/api/protectapi';
import {getCommunityByObjectId} from 'Root/api/community';
import userGlobalObject from 'Root/config/userGlobalObject';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const AlarmList = props => {
	const [checkBoxMode, setCheckBoxMode] = React.useState(true);
	// const [newNote, setNewNote] = React.useState(false);
	const [newNote, setNewNote] = React.useState(props.route.params.isNewAlarm);

	const [data, setData] = React.useState();
	const [isEmpty, setIsEmpty] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const navigation = useNavigation();
	let count = 0;
	const [refreshing, setRefreshing] = React.useState(false);
	const navState = useNavigationState(state => state);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(1000).then(() => getAlarmList());
	}, []);

	React.useEffect(() => {
		getAlarmList();
		setAlarmStatus(
			{user_object_id: userGlobalObject.userInfo?._id, user_alarm: false},
			result => {
				console.log('setAlarmStatus result', result);
			},
			err => {
				console.log('setAlarmStatus err', err);
			},
		);
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
				// if (!_.isEqual(JSON.stringify(result.msg), asyncAlarm)) {
				// 	AsyncStorage.setItem('AlarmList', JSON.stringify(result.msg));
				// 	// console.log(asyncAlarm, '둘이 다르다');
				// 	setNewNote(true);
				// }
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
		console.log('aa', data.target_object_type, data);
		let navState = props.navigation.getState();
		// console.log('navState', navState);

		switch (data.target_object_type) {
			case 'comment':
				break;
			case 'FollowObject':
				getUserProfile(
					{userobject_id: data.notice_user_related_id._id},
					result => {
						console.log('result', result.msg);
						// navigation.dispatch({
						// 	...CommonActions.reset({
						// 		index: 1,
						// 		routes: [{name: 'MainTab'}, {name: 'AlarmList'}, {name: 'Profile', params: {userobject: result.msg}}],
						// 	}),
						// });
						navigation.dispatch(
							CommonActions.navigate({
								name: 'UserProfile',
								params: {userobject: result.msg},
							}),
						);
					},
					err => {
						console.log('err', err);
					},
				);

				break;
			case 'MemoBoxObject':
				navigation.dispatch(
					CommonActions.navigate({
						name: 'UserNotePage',
						params: {title: data.notice_user_related_id.user_nickname, _id: data.notice_user_related_id._id},
					}),
				);
				break;
			case 'FeedObject':
				if (data.notice_object_type == 'LikeFeedObject') {
					var selected = {_id: data.target_object};
					getUserProfile({userobject_id: data.notice_user_receive_id}, result => {
						// navigation.dispatch({
						// 	...CommonActions.reset({
						// 		index: 1,
						// 		routes: [{name: 'MainTab'}, {name: 'AlarmList'}, {name: 'UserFeedList', params: {userobject: result.msg, selected: selected}}],
						// 	}),
						// });
						navigation.dispatch(
							CommonActions.navigate({
								name: 'UserFeedList',
								params: {userobject: result.msg, selected: selected},
							}),
						);
					});
				} else if (data.notice_object_type == 'CommentObject') {
					getFeedDetailById(
						{feedobject_id: data.target_object},
						result => {
							navigation.dispatch(
								CommonActions.navigate({
									// name: 'FeedCommentList',
									name: 'AlarmCommentList',
									params: {
										feedobject: result.msg,
										showAllContents: true,
										scroll: true,
										target: data.notice_object,
										parent: data?.notice_comment_parent,
									},
								}),
							);
						},
						err => {
							console.log('getFeedDetail err', err);
						},
					);
				}
				break;
			case 'FeedUserTagObject':
				var selected = {_id: data.target_object};
				console.log('selected', selected);
				getUserProfile({userobject_id: data.notice_user_related_id._id}, result => {
					navigation.dispatch(
						CommonActions.navigate({
							name: 'UserFeedList',
							params: {userobject: result.msg, selected: selected},
						}),
					);
				});
				break;
			case 'VolunteerActivityApplicantObject':
				getUserVolunteerActivityList({}, result => {
					console.log('result', result.msg);
					let result_msg = result.msg;

					for (let i of result_msg) {
						if (i._id == data.target_object) {
							navigation.push('ShelterVolunteerForm', i);
						}
					}
				});
				break;
			case 'ProtectionActivityApplicantObject':
				getApplyDetailById({protect_act_object_id: data.target_object}, result => {
					let result_msg = result.msg;
					result_msg.shelter_name = result.msg.proect_act_request_shelter_id.shelter_name;
					result_msg.protect_request_date = result.msg.protect_act_request_article_id.protect_request_date;
					result_msg.protect_animal_rescue_location = result.msg.protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location;
					result_msg.protect_request_photos_uri = result.msg.protect_act_request_article_id.protect_request_photos_uri;
					result_msg.isNotification = true;
					result_msg.approved_applicant = data.notice_approved_applicant;
					navigation.push('ApplyAdoptionDetails', result_msg);
				});

				break;
			case 'CommunityObject':
				console.log('data.target', data.target_object);
				getCommunityByObjectId(
					{community_object_id: data.target_object},
					result => {
						console.log('getCommunityByObjectId', result);
						if (result.msg.community_type == 'free') {
							navigation.push('ArticleDetail', {community_object: result.msg});
						} else {
							navigation.push('ReviewDetail', {community_object: result.msg});
						}
					},
					err => {
						console.log('err', err);
					},
				);
				break;
			case 'ProtectRequestObject':
				getProtectRequestByProtectRequestId(
					{protect_request_object_id: data.target_object},
					result => {
						console.log('result', result.msg);
						navigation.push('ProtectCommentList', {protectObject: result.msg, showKeyboard: false});
					},
					err => {
						console.log('getProtectRequestByProtectRequestId err', err);
					},
				);
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
		return <DailyAlarm index={index} data={item} onLabelClick={onLabelClick} newNote={newNote} isData={isData} />;
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

export default React.memo(AlarmList);
