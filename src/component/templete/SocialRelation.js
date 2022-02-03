import React from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {socialRelation, login_style, temp_style} from './style_templete';
import {useNavigation} from '@react-navigation/core';
import TopTabNavigation_Border from 'Organism/menu/TopTabNavigation_Border';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import {Write94} from 'Atom/icon';
import SocialRelationTopTabNavigation from 'Root/navigation/route/main_tab/protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import {linkedAccountList} from './style_templete';
import {followerList} from './style_templete';

export default SocialRelation = props => {
	const [showRecommendList, setShowRecommendList] = React.useState(false);
	const [tabState, setTabState] = React.useState(0);

	//Dummy Data
	const getFlat = item => {
		return (
			<View>
				<Text>{item}</Text>
				<Text>{item}</Text>
			</View>
		);
	};

	const navigation = useNavigation();
	const moveToSocialRelation = () => {
		navigation.push('UserProfile');
	};

	const onWrite = () => {
		console.log(`SocialRelation:onWrite()-test`);
		props.navigation.push('FeedWrite');
	};

	const onSelectTab = e => {
		console.log(`SocialRelation:onSelectTab()-${e}`);
		setTabState(e);
	};

	const number_of_accounts_followed_together = 15; // 함께아는사람 숫자,  현재 더미데이타
	const number_of_follower = 623; // 해당 계정의 팔로워 숫자,  현재 더미데이타
	const number_of_following = 1029; // 해당 계정의 팔로윙 숫자,  현재 더미데이타
	const tabBarItems = [
		number_of_accounts_followed_together + ' 함께 아는 사람',
		number_of_follower + ' 팔로워',
		number_of_following + ' 팔로잉',
		'추천',
	];
	return (
		<View style={[login_style.wrp_main, socialRelation.container]}>
			<View style={[temp_style.topTabNavigation_border, socialRelation.topTabNavigation]}>
				<TopTabNavigation_Border
					items={tabBarItems} //Tab에 출력될 Label 배열
					onSelect={e => onSelectTab(e)} // 현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
					// select={state.index} // gesture Handler(손가락으로 swipe)로 tab을 움직였을 시 자식까지 state를 연동시키기 위한 props
					fontSize={24}
				/>
			</View>
			{/* (M)inputWithSearchIcon */}
			<View style={[temp_style.inputWithSearchIcon, socialRelation.inputWithSearchIcon]}>
				<InputWithSearchIcon></InputWithSearchIcon>
			</View>

			{tabState == 0 && (
				<View style={linkedAccountList.container}>
					<ScrollView contentContainerStyle={linkedAccountList.insideContainer}>
						<View style={[linkedAccountList.accountList_step1]}>
							<ControllableAccountList title={'팔로워'} />
						</View>
						<View style={[linkedAccountList.accountList_step2]}>
							<ControllableAccountList title={'추천'} showCrossMark={true} />
						</View>
					</ScrollView>
				</View>
			)}

			{tabState == 1 && (
				<View style={followerList.container}>
					<ScrollView contentContainerStyle={followerList.insideContainer}>
						<View style={[followerList.accountList_step1]}>
							<ControllableAccountList showCrossMark={false} showCheckBox={false} />
						</View>
					</ScrollView>
				</View>
			)}

			{tabState == 2 && (
				<View style={followerList.container}>
					<ScrollView contentContainerStyle={followerList.insideContainer}>
						<View style={[followerList.accountList_step1]}>
							<ControllableAccountList showCrossMark={false} showCheckBox={false} />
						</View>
					</ScrollView>
				</View>
			)}

			{tabState == 3 && (
				<View style={followerList.container}>
					<ScrollView contentContainerStyle={followerList.insideContainer}>
						<View style={[followerList.accountList_step1]}>
							<ControllableAccountList showCrossMark={true} />
						</View>
					</ScrollView>
				</View>
			)}

			{/* Floating Btn */}
			<View style={[temp_style.floatingBtn, socialRelation.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View>
		</View>
	);
};
