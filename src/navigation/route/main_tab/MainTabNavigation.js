import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyStackNavigation from './my_stack/MyStackNavigation';
import FeedStackNavigation from './feed_stack/FeedStackNavigation';
import ProtectionStackNavigation from './protection_stack/ProtectionStackNavigation';
import BottomTab from 'Navigation/maintab/BottomTab';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import CommunityMainStack from './community_stack/CommunityMainStack';
import SearchMainStack from '../search_tab/SearchMainStack';
const MainTabNav = createBottomTabNavigator();

export default MainTabNavigation = ({route, navigation}) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? '';
	// console.log('getFocusedRouteNameFromRoute / MainTab  : ', routeName);
	const [current, setCurrent] = React.useState('FEED');

	const getTabBarVisibility = route => {
		switch (current) {
			case 'CommunityWrite':
			case 'CommunityEdit':
			case 'ShelterInfoSetting':
			case 'UserInfoSetting':
			case 'AddressSearchWeb':
				// case 'FeedCommentList':
				// case 'AnimalProtectRequestDetail':
				// case 'MissingAnimalDetail':
				// case 'ReportDetail':
				// case 'ArticleDetail':
				// case 'ReviewDetail':
				// case 'Search':
				return false;
			default:
				break;
		}
		return true;
	};

	//커뮤니티 텝에서 보내주는 route.name
	const sendRoute = route_name => {
		console.log('route_name', route_name);
		setCurrent(route_name);
	};

	return (
		<MainTabNav.Navigator initialRouteName={'FEED'} tabBar={props => <BottomTab {...props} />}>
			<MainTabNav.Screen
				name="FEED"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '피드',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}>
				{props => <FeedStackNavigation {...props} sendRoute={sendRoute} />}
			</MainTabNav.Screen>
			<MainTabNav.Screen
				name="PROTECTION"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '동물보호',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}>
				{props => <ProtectionStackNavigation {...props} sendRoute={sendRoute} />}
			</MainTabNav.Screen>
			<MainTabNav.Screen
				name="COMMUNITY"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '커뮤니티',
					tabBarHideOnKeyboard: true,
					// unmountOnBlur: true,
					// header: props => (!getHeaderState() ? <LogoHeader {...props} /> : <></>),
					header: props => false,
				})}>
				{props => <CommunityMainStack {...props} sendRoute={sendRoute} />}
			</MainTabNav.Screen>
			<MainTabNav.Screen
				name="MY"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: 'MY',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}>
				{props => <MyStackNavigation {...props} user_type={route.params} />}
			</MainTabNav.Screen>
			<MainTabNav.Screen
				name="Search"
				options={{
					tabBarShowLabel: false,
					header: props => false,
					tabBarVisible: false,
				}}>
				{props => <SearchMainStack {...props} />}
			</MainTabNav.Screen>
		</MainTabNav.Navigator>
	);
};
