import React from 'react';
import {FlatList, Platform, ScrollView, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl} from 'react-native';
import DailyAlarm from '../../organism/list/DailyAlarm';
import {GRAY10, GRAY20, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import {getNoticeUserList} from 'Root/api/noticeuser';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMemoBoxWithReceiveID, getUserProfile, setAlarmStatus} from 'Root/api/userapi';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {getFeedDetailById} from 'Root/api/feedapi';
import {getUserVolunteerActivityList, getVolunteerActivityById} from 'Root/api/volunteerapi';
import {getApplyDetailById, getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import {getAppliesRecord} from 'Root/api/protectapi';
import {getCommunityByObjectId} from 'Root/api/community';
import userGlobalObject from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import moment from 'moment';
import {day, NETWORK_ERROR} from 'Root/i18n/msg';

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
	const [navLoading, setNavLoading] = React.useState(false);
	const navigation = useNavigation();
	let count = 0;
	const [refreshing, setRefreshing] = React.useState(false);
	const navState = useNavigationState(state => state);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => getAlarmList());
	}, []);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => setNavLoading(false));
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		getAlarmList();
		setAlarmStatus(
			{user_object_id: userGlobalObject.userInfo?._id, user_alarm: false},
			result => {
				// console.log('setAlarmStatus result', result);
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
		let temp = [[], [], [], []];
		getNoticeUserList(
			{},
			result => {
				// console.log('result', result.msg);
				let today = moment();
				let tempNumber = 0;
				temp[0] = [...result.msg.today];
				temp[1] = [...result.msg.yesterday];
				for (let i in {...result.msg.thisweek}) {
					// console.log('IIII', result.msg.thisweek[i]);
					let days = result.msg.thisweek[i].notice_user_date;

					if (moment.duration(today.diff(days)).asDays() < 7) {
						temp[2].push(result.msg.thisweek[i]);
					} else {
						temp[3].push(result.msg.thisweek[i]);
					}
				}

				// temp[2] = [...result.msg.thisweek];
				// console.log('temp', temp[0].length, temp[1].length, temp[2].length);
				// console.log('temp', temp);
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
		console.log('target_object_type', data.target_object_type);
		setNavLoading(true);
		switch (data.target_object_type) {
			case 'FollowObject':
				getUserProfile(
					{userobject_id: data.notice_user_related_id._id},
					result => {
						setNavLoading(false);
						navigation.dispatch(
							CommonActions.navigate({
								name: 'UserProfile',
								params: {userobject: result.msg},
							}),
						);
					},
					err => {
						console.log('err', err);
						setNavLoading(false);
					},
				);

				break;
			case 'MemoBoxObject':
				getMemoBoxWithReceiveID(
					{user_object_id: data.notice_user_related_id._id},
					result => {
						console.log('result', result.msg.length);
						setNavLoading(false);
						if (result.msg.length > 0) {
							navigation.dispatch(
								CommonActions.navigate({
									name: 'UserNotePage',
									params: {title: data.notice_user_related_id.user_nickname, _id: data.notice_user_related_id._id},
								}),
							);
						} else {
							Modal.alert('이미 삭제된 쪽지입니다.');
						}
					},
					err => {
						console.log('err', err);
						setNavLoading(false);
						Modal.alert(NETWORK_ERROR);
					},
				);

				break;
			case 'FeedObject':
				// console.log('data.notice_object_type', data);
				if (data.notice_object_type == 'LikeFeedObject') {
					var selected = {_id: data.target_object};
					getUserProfile(
						{userobject_id: data.notice_user_receive_id},
						result => {
							// navigation.dispatch({
							// 	...CommonActions.reset({
							// 		index: 1,
							// 		routes: [{name: 'MainTab'}, {name: 'AlarmList'}, {name: 'UserFeedList', params: {userobject: result.msg, selected: selected}}],
							// 	}),
							// });
							console.log('result', result);
							if (result.msg.user_is_delete) {
								Modal.popOneBtn('탈퇴한 유저의 계정입니다.', '확인', () => Modal.close());
							} else {
								setNavLoading(false);
								navigation.dispatch(
									CommonActions.navigate({
										name: 'UserFeedList',
										params: {userobject: result.msg, selected: selected},
									}),
								);
							}
						},
						err => {
							setNavLoading(false);
							console.log('err / FeedObject', err);
						},
					);
				} else if (data.notice_object_type == 'CommentObject') {
					getFeedDetailById(
						{feedobject_id: data.target_object},
						result => {
							// console.log(navigation.getState());
							setNavLoading(false);
							navigation.dispatch(
								CommonActions.navigate({
									// name: 'FeedCommentList',
									name: 'AlarmCommentList',
									params: {
										feedobject: result.msg,
										showAllContents: true,
										showMedia: true,
										scroll: true,
										target: data.notice_object,
										parent: data?.notice_comment_parent,
									},
								}),
							);
						},
						err => {
							setNavLoading(false);
							console.log('getFeedDetail err', err);
							if (err.includes('없습니다')) {
								Modal.alert('이미 삭제된 게시글입니다.', Modal.close);
							}
						},
					);
				}
				break;
			case 'FeedUserTagObject':
				var selected = {_id: data.notice_object};
				// console.log('FeedUserTagObject data', data);
				getFeedDetailById(
					{feedobject_id: data.notice_object},
					result => {
						// console.log('result', result);
						navigation.dispatch(
							CommonActions.navigate({
								name: 'UserFeedList',
								params: {
									userobject: {_id: data.notice_user_related_id._id, user_nickname: data.notice_user_related_id.user_nickname},
									selected: selected,
								},
							}),
						);
					},
					err => {
						setNavLoading(false);
						console.log('getFeedDetail err', err);
						if (err.includes('없습니다')) {
							Modal.alert('이미 삭제된 게시글입니다.', Modal.close);
						}
					},
				);
				break;
			case 'VolunteerActivityApplicantObject':
				getUserVolunteerActivityList(
					{},
					result => {
						console.log('result', result.msg);
						let result_msg = result.msg;

						for (let i of result_msg) {
							if (i._id == data.target_object) {
								navigation.push('ShelterVolunteerForm', i);
							}
						}
					},
					err => {
						console.log('err', err);
						setNavLoading(false);
					},
				);
				break;
			case 'ProtectionActivityApplicantObject':
				getApplyDetailById(
					{protect_act_object_id: data.target_object},
					result => {
						setNavLoading(false);
						let result_msg = result.msg;
						result_msg.shelter_name = result.msg.proect_act_request_shelter_id.shelter_name;
						result_msg.protect_request_date = result.msg.protect_act_request_article_id.protect_request_date;
						result_msg.protect_animal_rescue_location = result.msg.protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location;
						result_msg.protect_request_photos_uri = result.msg.protect_act_request_article_id.protect_request_photos_uri;
						result_msg.isNotification = true;
						result_msg.approved_applicant = data.notice_approved_applicant;
						navigation.push('ApplyAdoptionDetails', result_msg);
					},
					err => {
						console.log('err', err);
						setNavLoading(false);
					},
				);
				break;
			case 'CommunityObject':
				console.log('data.target', data);
				getCommunityByObjectId(
					{community_object_id: data.target_object},
					result => {
						setNavLoading(false);
						// console.log('getCommunityByObjectId', result);
						if (result.msg.community_type == 'free') {
							navigation.navigate({key: result.msg._id, name: 'ArticleDetail', params: {community_object: result.msg, comment: true}});
						} else {
							// navigation.push('ReviewDetail', {community_object: result.msg});
							navigation.navigate({key: result.msg._id, name: 'ReviewDetail', params: {community_object: result.msg, comment: true}});
						}
					},
					err => {
						setNavLoading(false);
						console.log('err / CommunityObject', err);
						Modal.alert('이미 삭제된 게시물입니다.');
					},
				);
				break;
			case 'ProtectRequestObject':
				getProtectRequestByProtectRequestId(
					{protect_request_object_id: data.target_object},
					result => {
						setNavLoading(false);
						if (result.msg.protect_request_is_delete) {
							Modal.alert('이미 삭제된 보호요청 건입니다.');
						} else navigation.push('ProtectCommentList', {protectObject: result.msg, showKeyboard: false});
					},
					err => {
						setNavLoading(false);
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
		return (
			<DailyAlarm
				index={index}
				data={item}
				onLabelClick={onLabelClick}
				newNote={newNote}
				// newNote={true}
				isData={isData}
			/>
		);
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
					<View style={[styles.listContainer]}>
						<Text style={[{textAlign: 'center'}, {marginTop: 20 * DP}]}>소식이 없습니다.</Text>
					</View>
				) : (
					<View style={[styles.listContainer]}>
						<Text style={[txt.noto26, styles.textConinter]}>100개 이상의 알람은 자동 삭제됩니다.</Text>
						<FlatList
							data={data}
							renderItem={renderItem}
							showsVerticalScrollIndicator={false}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							style={[
								{marginTop: 16 * DP},
								// , {paddingBottom: 40 * DP}
							]}
							contentContainerStyle={[{paddingBottom: 150 * DP}]}
						/>
						{navLoading && (
							<View style={styles.loadingContainer}>
								<ActivityIndicator size={'large'} color={'white'} />
							</View>
						)}
					</View>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		minHeight: 1322 * DP,
		// height: 1400 * DP,
		// alignItems: 'center',
		flex: 1,
		backgroundColor: WHITE,
		// backgroundColor: 'red',
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
	listContainer: {
		// height: 1270 * DP,
		// height: 1345 * DP,
		// height: Platform.OS === 'ios' ? 1265 * DP : 1345 * DP,
		// backgroundColor: 'yellow',
		flex: 1,
	},
	textConinter: {
		height: 40 * DP,
		marginTop: 20 * DP,
		color: GRAY10,
		width: 694 * DP,
		paddingHorizontal: 28 * DP,
	},
	loadingContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		// opacity: 0.2,
		justifyContent: 'center',
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
