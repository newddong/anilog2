import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import FollowerList from 'Root/component/templete/list/FollowerList';
import temp from './temp';

const CommunityTabNav = createMaterialTopTabNavigator();

export default CommunitiyTabNavigation = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴

	return (
		<CommunityTabNav.Navigator
			initialRouteName="temp"
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<CommunityTabNav.Screen
				name={'temp'}
				component={temp}
				initialLayout={{width: Dimensions.get('window').width}}
				// tabBar={props => <MyTabBar {...props} />}
				screenOptions={{
					lazy: true,
				}}
			/>
		</CommunityTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
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
