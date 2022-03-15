import {useNavigation} from '@react-navigation/core';
import React, {component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, RefreshControl} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {getSettingPublic, updateSettingPublic} from 'Root/api/settingpublic';
import {INFO_QUESTION} from 'Root/i18n/msg';
import FastImage from 'react-native-fast-image';
import {useState} from 'react/cjs/react.production.min';

export default SettingOpen = ({route}) => {
	const [openObject, setOpenObject] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const [onCount, setOnCount] = React.useState(0);
	const [send, setSend] = React.useState(false);
	console.log('onCount', onCount);
	React.useEffect(() => {
		getSettingPublic(
			{},
			noticeObject => {
				var temp = noticeObject.msg[0];
				console.log('noticeObject', noticeObject.msg[0]);
				delete temp._id;
				delete temp.setting_public_update_date;
				delete temp.setting_public_user_id;
				delete temp.__v;
				console.log('temp', temp);
				if (temp.setting_public_all) {
					setOnCount(3);
				}
				setOpenObject(temp);
				setLoading(false);
			},

			err => {
				console.log('err', err);
			},
		);
	}, []);

	React.useEffect(() => {
		console.log('openObject', openObject);
		// console.log('type of Open', typeof openObject, typeof openObject.setting_public_all);
		updateSettingPublic(
			{
				setting_public_all: false,
				setting_public_my_feed: true,
				setting_public_my_tag_post: false,
				setting_public_community_post: false,
			},

			callback => {
				console.log('success callback', callback);
			},
			err => {
				console.log('err', err);
			},
		);
	}, [openObject]);
	// const postApi = () => {
	// 	console.log('postApi', openObject);
	// 	updateSettingPublic(
	// 		{
	// 			setting_public_all: openObject.setting_public_all,
	// 			setting_public_my_feed: openObject.setting_public_my_feed,
	// 			setting_public_my_tag_post: openObject.setting_public_my_tag_post,
	// 			setting_public_community_post: openObject.setting_public_community_post,
	// 		},
	// 		callback => {
	// 			console.log('success callback', callback);
	// 		},
	// 		err => {
	// 			console.log('err', err);
	// 		},
	// 	);
	// };

	const onSwtichAll = () => {
		if (openObject.setting_public_all) {
			setOpenObject(prevState => ({
				...prevState,
				setting_public_all: false,
				setting_public_my_feed: false,
				setting_public_my_tag_post: false,
				setting_public_community_post: false,
			}));
			setOnCount(0);
		} else {
			setOpenObject(prevState => ({
				...prevState,
				setting_public_all: true,
				setting_public_my_feed: true,
				setting_public_my_tag_post: true,
				setting_public_community_post: true,
			}));
			setOnCount(3);
		}
		// setSend(!send);
		// postApi();
	};
	const switchButton = keys => {
		if (keys) {
			setOnCount(onCount - 1);
			setOpenObject(prevState => ({
				...prevState,
				setting_public_all: false,
			}));
		} else {
			onCount == 2
				? setOpenObject(prevState => ({
						...prevState,
						setting_public_all: true,
				  }))
				: null;
			setOnCount(onCount + 1);
		}
	};
	const onSwtichMyFeed = () => {
		switchButton(openObject.setting_public_my_feed);

		setOpenObject(prevState => ({
			...prevState,
			setting_public_my_feed: !prevState.setting_public_my_feed,
		}));
		// setSend(!send);
		// postApi();
	};

	const onSwtichMyTagPost = () => {
		switchButton(openObject.setting_public_my_tag_post);
		setOpenObject(prevState => ({
			...prevState,
			setting_public_my_tag_post: !prevState.setting_public_my_tag_post,
		}));
		// setSend(!send);
		// postApi();
	};
	const onSwtichMyCommunityPost = () => {
		switchButton(openObject.setting_public_community_post);
		setOpenObject(prevState => ({
			...prevState,
			setting_public_community_post: !prevState.setting_public_community_post,
		}));
		// setSend(!send);
		// postApi();
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.openFullyContainer}>
						<View style={{width: 550 * DP}}>
							<Text style={[txt.noto32b, {color: APRI10}]}>전체 공개</Text>
						</View>
						<OnOffSwitch default={openObject.setting_public_all} onSwtichOff={onSwtichAll} onSwtichOn={onSwtichAll} />
					</View>
					<View style={[styles.openDetailContainer]}>
						<View style={{flexDirection: 'row'}}>
							<View style={styles.openDetailEachContainer}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>내 피드 비공개</Text>
								</View>
								<OnOffSwitch default={openObject.setting_public_my_feed} onSwtichOff={onSwtichMyFeed} onSwtichOn={onSwtichMyFeed} />
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.openDetailEachContainer, {marginTop: 24 * DP}]}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>내 태그 게시글 비공개</Text>
								</View>
								<OnOffSwitch default={openObject.setting_public_my_tag_post} onSwtichOff={onSwtichMyTagPost} onSwtichOn={onSwtichMyTagPost} />
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.openDetailEachContainer, {marginTop: 24 * DP}]}>
								<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>내 커뮤니티 게시글 비공개</Text>
								</View>
								<OnOffSwitch
									default={openObject.setting_public_community_post}
									onSwtichOff={onSwtichMyCommunityPost}
									onSwtichOn={onSwtichMyCommunityPost}
								/>
							</View>
						</View>
					</View>
					<Text>{`${onCount}`}</Text>
					<Text>{JSON.stringify(openObject)} </Text>
				</View>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 390 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	openFullyContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	openDetailContainer: {
		height: 260 * DP,
		paddingLeft: 48 * DP,
		justifyContent: 'center',
	},
	openDetailEachContainer: {
		width: 654 * DP,
		height: 44 * DP,
		flexDirection: 'row',
	},
});
