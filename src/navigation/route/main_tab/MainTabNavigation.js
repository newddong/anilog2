import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyStackNavigation from './my_stack/MyStackNavigation';
import FeedStackNavigation from './feed_stack/FeedStackNavigation';
import ProtectionStackNavigation from './protection_stack/ProtectionStackNavigation';
import BottomTab from 'Navigation/maintab/BottomTab';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SearchTabNavigation from '../search_tab/SearchTabNavigation';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import CommunityMain from './community_stack/CommunityMain';
import CommunityMainStack from './community_stack/CommunityMainStack';

const MainTabNav = createBottomTabNavigator();

export default MainTabNavigation = ({route, navigation}) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? '';
	// console.log('getFocusedRouteNameFromRoute / MainTab  : ', routeName);
<<<<<<< HEAD
=======
	const [current, setCurrent] = React.useState('ArticleMain');

>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
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

	//커뮤니티 텝에서 보내주는 route.name
	const sendRoute = route_name => {
		setCurrent(route_name);
	};

	//커뮤니티 탭 헤더 출력 여부 결정
	const getHeaderState = () => {
		switch (current) {
			case 'ArticleMain':
			case 'ReviewMain':
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
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '동물보호',
					tabBarHideOnKeyboard: true,
					header: props => false,
				})}
			/>
			<MainTabNav.Screen
				name="COMMUNITY"
				options={({route}) => ({
					tabBarVisible: getTabBarVisibility(route),
					tabBarLabel: '커뮤니티',
					tabBarHideOnKeyboard: true,
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
					header: props => <InputAndSearchHeader {...props} />,
					tabBarShowLabel: false,
<<<<<<< HEAD
					// headerShown: ,
=======
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
				}}>
				{props => <SearchTabNavigation {...props} />}
			</MainTabNav.Screen>
		</MainTabNav.Navigator>
	);
};
