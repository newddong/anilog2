import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {Dimensions, StyleSheet, View} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {createStackNavigator} from '@react-navigation/stack';
import CommunityMain from './CommunityMain';

import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ArticleMain from 'Root/component/templete/community/ArticleMain';
import Profile from 'Root/component/templete/profile/Profile';
import ArticleCommentList from 'Root/component/templete/community/ArticleCommentList';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';
import CommunityWrite from 'Root/component/templete/community/CommunityWrite';
import SendHeader from 'Root/navigation/header/SendHeader';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import KakaoMap from 'Root/component/templete/search/SearchMap';
import WriteEditorTest from 'Root/component/templete/community/WriteEditorTest';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';
import SearchMap from 'Root/component/templete/search/SearchMap';

const CommunityMainStackNavi = createStackNavigator();

export default CommunityMainStack = props => {
	return (
		<CommunityMainStackNavi.Navigator initialRouteName="CommunityMain">
			<CommunityMainStackNavi.Screen
				name="CommunityMain"
				component={CommunityMain}
				options={({route, navigation}) => ({
					header: props => <LogoHeader {...props} />,
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'ArticleCommentList'}
				component={FeedCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'UserProfile'}
				component={Profile}
				options={({route}) => ({
					headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name="AddressSearchPage"
				component={AddressSearchPage}
				options={{header: props => <SimpleHeader {...props} />, title: '주소 설정'}}
			/>
			<CommunityMainStackNavi.Screen
				name="WriteEditorTest"
				component={WriteEditorTest}
				options={{header: props => <SimpleHeader {...props} />, title: 'WriteEditorTest'}}
			/>

			<CommunityMainStackNavi.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'ReviewCommentList'}
				component={FeedCommentList}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
		</CommunityMainStackNavi.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontSize: 30 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
