import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProtectRequestList from 'Templete/protection/ProtectRequestList';
import MissingReportList from 'Templete/missing/MissingReportList';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';

const ProtectionTab = createMaterialTopTabNavigator();

export default ProtectionTopTabNavigation = ({route, navigation}) => {
	return (
		<ProtectionTab.Navigator
			initialRouteName="ProtectRequestList"
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: 'black', height: 2 * DP},
				tabBarLabelStyle: [styles.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				// swipeEnabled: false,
				// lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<ProtectionTab.Screen
				name="ProtectRequestList"
				component={ProtectRequestList}
				options={{
					tabBarLabel: '보호 요청',
				}}
			/>
			{/* <ProtectionTab.Screen name="ActivationList" component={ActivationList} /> */}
			<ProtectionTab.Screen
				name={'MissingReportList'}
				component={MissingReportList}
				options={{
					tabBarLabel: '실종/제보',
				}}
			/>
		</ProtectionTab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
