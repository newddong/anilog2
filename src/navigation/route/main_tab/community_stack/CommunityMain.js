import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {Dimensions, StyleSheet, View} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import ReviewStackNavigation from './review_tab/ReviewStackNavigation';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import ArticleStackNavigation from './article_stack/ArticleStackNavigation';

const CommunityTabNav = createMaterialTopTabNavigator();

export default CommunityMain = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴
	const [stackRouteName, setStackRouteName] = React.useState('');
	const sendRoute = route => {
		setStackRouteName(route);
	};

	const getTabBarVisibility = () => {
		// console.log('route', route);
		props.sendRoute(stackRouteName);
		switch (stackRouteName) {
			case 'ArticleMain':
			case 'ReviewMain':
				return true;
				break;
			default:
				break;
		}
		return false;
	};

	return (
		<>
			{/* {getTabBarVisibility() ? <LogoHeader /> : <></>} */}
			<CommunityTabNav.Navigator
				initialRouteName="ArticleStackNavigation"
				screenOptions={{
					tabBarItemStyle: {height: 70 * DP},
					tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
					lazy: true,
				}}
				initialLayout={{width: Dimensions.get('window').width}}
				optimizationsEnabled={true}>
				<CommunityTabNav.Screen
					name={'ArticleStackNavigation'}
					options={({route}) => ({
						tabBarStyle: {display: getTabBarVisibility() ? 'flex' : 'none'},
						tabBarLabel: '자유 게시판',
						tabBarActiveTintColor: APRI10,
						tabBarLabelStyle: [
							txt.noto30b,
							styles.tabbarLabelStyle,
							{color: routeName == 'ArticleStackNavigation' || routeName == undefined ? WHITE : GRAY10},
						],
						swipeEnabled: !getTabBarVisibility() ? false : true,
						header: props => <LogoHeader />,
					})}>
					{props => <ArticleStackNavigation {...props} sendRouteName={sendRoute} />}
				</CommunityTabNav.Screen>
				<CommunityTabNav.Screen
					name={'ReviewStackNavigation'}
					options={({route}) => ({
						tabBarStyle: {display: getTabBarVisibility() ? 'flex' : 'none'},
						tabBarLabel: '후기',
						tabBarLabelStyle: [txt.noto30b, styles.tabbarLabelStyle, {color: routeName == 'ReviewStackNavigation' ? WHITE : GRAY10}],
						swipeEnabled: !getTabBarVisibility() ? false : true,
						header: props => <LogoHeader />,
					})}>
					{props => <ReviewStackNavigation {...props} sendRouteName={sendRoute} />}
				</CommunityTabNav.Screen>
			</CommunityTabNav.Navigator>
		</>
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