import React from 'react';
import {Animated} from 'react-native';
import WriteFeed from './writefeed';
import WriteHeader from './writeheader';
import AddPhoto from 'Screens/camera/addphoto';
import AddSinglePhoto from 'Screens/camera/addphoto';
import PhotoTag from './photoTag';
import UserList from '../user/uselist';
import SearchHeader from '../user/searchheader';

import {createStackNavigator} from '@react-navigation/stack';
import Camera from 'Screens/camera/camera';
import {forSlide} from 'Root/navigation/forslide';

const Stack = createStackNavigator();

export default WriteFeedRoute = () => {
	const tansitConf = {
		animation: 'timing',
		config: {
			duration: 300,
		},
	};
	return (
		<Stack.Navigator
			initialRouteName="writeFeed"
			screenOptions={{headerMode:'screen',
				header: props => <WriteHeader {...props} />,
			}}>
			<Stack.Screen
				name="writeFeed"
				component={WriteFeed}
				options={{headerTitle: '새 게시물', transitionSpec: {open: tansitConf, close: tansitConf}, cardStyleInterpolator: forSlide}}
			/>
			<Stack.Screen
				name="editFeed"
				component={WriteFeed}
				options={{headerTitle: '게시물 편집', transitionSpec: {open: tansitConf, close: tansitConf}, cardStyleInterpolator: forSlide}}
			/>
			<Stack.Screen
				name="photoTag"
				component={PhotoTag}
				options={{headerTitle: '태그하기', transitionSpec: {open: tansitConf, close: tansitConf}, cardStyleInterpolator: forSlide}}
			/>
			<Stack.Screen
				name="camera"
				component={Camera}
				options={{headerTitle: '카메라', transitionSpec: {open: tansitConf, close: tansitConf}, cardStyleInterpolator: forSlide}}
			/>
			<Stack.Screen
				name="userList"
				component={UserList}
				options={{
					header: props => <SearchHeader {...props} />,
					transitionSpec: {open: tansitConf, close: tansitConf},
					cardStyleInterpolator: forSlide,
				}}
			/>
		</Stack.Navigator>
	);
};
