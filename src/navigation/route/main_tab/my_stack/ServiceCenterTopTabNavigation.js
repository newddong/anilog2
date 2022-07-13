import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Dimensions} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import AskQuestion from 'Templete/user/AskQuestion';
import AskedQuestion from 'Templete/user/AskedQuestion';
import {GRAY10, GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
const ServiceCenterTab = createMaterialTopTabNavigator();

const ServiceCenterTopTabNavigation = ({route, navigation}) => {
	const tabList = ['문의하기', '문의 내역'];
	const navName = ['AskQestion', 'AskedQestion'];
	//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감

	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(route);

	React.useEffect(() => {
		if (routeName == navName[0]) setCurrentScreen(0);
		else if (routeName == navName[1]) setCurrentScreen(1);
	}, [routeName]);

	return (
		<ServiceCenterTab.Navigator
			initialRouteName="AskQestion"
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: 'black', height: 6 * DP},
				tabBarLabelStyle: [style.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				lazy: true,
				tabBarStyle: {
					borderBottomWidth: 2 * DP,
					// borderTopWidth: 2 * DP,
					borderBottomColor: GRAY40,
					elevation: 0,
				},
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<ServiceCenterTab.Screen
				name="AskQuestion"
				component={AskQuestion}
				options={{header: props => <SimpleHeader {...props} />, title: '문의사항', tabBarLabel: '문의하기'}}
			/>
			<ServiceCenterTab.Screen
				name="AskedList"
				component={AskedQuestion}
				options={{header: props => <SimpleHeader {...props} />, title: '문의사항', tabBarLabel: '문의 내역'}}
			/>
		</ServiceCenterTab.Navigator>
	);
};

export default ServiceCenterTopTabNavigation;

const style = StyleSheet.create({
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		marginTop: -20 * DP,
	},
});
