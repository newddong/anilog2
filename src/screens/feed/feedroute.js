import React, {useState} from 'react';
import {Animated} from 'react-native';

import Profile from './profile/profile';
import FeedList from './home/feedlist';
import WriteFeed from './write/writefeed';
import WriteFeedRoute from './write/writefeedroute';
import MainHeader from 'Screens/header/mainheader';
import ProfileHeader from 'Root/screens/feed/profile/profileheader';
import CommentList from './home/post/commentlist';

import {createStackNavigator} from '@react-navigation/stack';
import {forSlide} from 'Root/navigation/forslide';

const Stack = createStackNavigator();

export default FeedRoute = () => {
	const tansitConf = {
		animation: 'timing',
		config: {
			duration: 300,
		},
	};
	return (
		<Stack.Navigator initialRouteName="FeedListHome" screenOptions={{headerMode:'screen'}}>
			<Stack.Screen name="FeedListHome" component={FeedList} options={{header: props => <MainHeader {...props} />}} />
			<Stack.Screen
				name="FeedListUser"
				component={FeedList}
				options={{
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
				}}
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{
					header: props => <ProfileHeader {...props} />,
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
				}}
			/>
			<Stack.Screen
				name="PetProfile"
				component={Profile}
				options={{
					header: props => <ProfileHeader {...props} />,
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
				}}
			/>
			<Stack.Screen
				name="WriteFeed"
				component={WriteFeedRoute}
				options={{
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
					// cardStyleInterpolator: ({current}) => ({cardStyle: {transform: [{translateX: current.progress}]}}),
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="CommentList"
				component={CommentList}
				options={{
					title:'댓글보기',
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
				}}
			/>
		</Stack.Navigator>
	);
};
