import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, BLACK, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import ArticleMain from 'Root/component/templete/community/ArticleMain';
import ReviewMain from 'Root/component/templete/community/ReviewMain';

const CommunityTabNav = createMaterialTopTabNavigator();

export default CommunityMain = props => {
	// LogBox.ignoreAllLogs(); //로그 무시

	return (
		<CommunityTabNav.Navigator
			initialRouteName="ArticleMain"
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: 'black', height: 2 * DP},
				tabBarLabelStyle: [styles.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<CommunityTabNav.Screen
				name={'ArticleMain'}
				options={{
					tabBarLabel: '자유 게시판',
				}}>
				{props => <ArticleMain {...props} />}
			</CommunityTabNav.Screen>
			<CommunityTabNav.Screen
				name={'ReviewMain'}
				options={{
					tabBarLabel: '후기',
				}}>
				{props => <ReviewMain {...props} />}
			</CommunityTabNav.Screen>
		</CommunityTabNav.Navigator>
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
