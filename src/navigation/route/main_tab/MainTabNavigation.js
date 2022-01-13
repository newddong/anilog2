import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyStackNavigation from './my_stack/MyStackNavigation';
import FeedStackNavigation from './feed_stack/FeedStackNavigation';
import ProtectionStackNavigation from './protection_stack/ProtectionStackNavigation';
import Temp from './community_stack/temp';
import BottomTab from 'Navigation/maintab/BottomTab';
import {FEED, REQ_ANIMAL, VIDEO, MY} from 'Root/i18n/msg';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SearchTabNavigation from '../search_tab/SearchTabNavigation';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import {SearchContext} from 'Root/config/searchContext';

const MainTabNav = createBottomTabNavigator();

export default MainTabNavigation = ({route, navigation}) => {
	// const [headerOff, setHeaderOff] = React.useState(false);
	// React.useEffect(() => {
	// 	console.log('searchContext / MainTab  :   ', searchContext.routeName);
	// 	// searchContext.routeName == 'SearchFeed' ? setHeaderOff(true) : setHeaderOff(false);
	// }, [searchContext.routeName]);
	const routeName = getFocusedRouteNameFromRoute(route) ?? '';
	console.log('getFocusedRouteNameFromRoute / MainTab  : ', routeName);
	const getTabBarVisibility = route => {
		switch (routeName) {
			case 'AnimalProtectRequestDetail':
			case 'ShelterInfoSetting':
			case 'UserInfoSetting':
			case 'FeedCommentList':
				// case 'Search':
				return false;
				break;
			default:
				break;
		}
		return true;
	};

	return (
		<MainTabNav.Navigator initialRouteName={'FEED'} tabBar={props => <BottomTab {...props} />}>
			<MainTabNav.Screen
				name="FEED"
				component={FeedStackNavigation}
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '피드',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}
			/>
			<MainTabNav.Screen
				name="PROTECTION"
				component={ProtectionStackNavigation}
				// options={{tabBarLabel: '동물보호', tabBarHideOnKeyboard: true, header: props => false}}
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '동물보호',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}
			/>
			<MainTabNav.Screen name="COMMUNITY" component={Temp} options={{header: props => <SimpleHeader {...props} />, title: '커뮤니티'}} />

			<MainTabNav.Screen
				name="MY"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: 'MY',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}>
				{/* // options={{tabBarLabel: 'MY', header: props => false}}> */}
				{props => <MyStackNavigation {...props} user_type={route.params} />}
			</MainTabNav.Screen>
			<MainTabNav.Screen
				name="Search"
				options={{
					header: props => <InputAndSearchHeader {...props} />,
					tabBarShowLabel: false,
					// headerShown: !headerOff,
				}}>
				{props => <SearchTabNavigation {...props} user_type={route.params} />}
			</MainTabNav.Screen>
		</MainTabNav.Navigator>
	);
};
