import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import ReviewStackNavigation from './review_tab/ReviewStackNavigation';
import ArticleStackNavigation from './article_stack/ArticleStackNavigation';
import {LogBox} from 'react-native';

const CommunityTabNav = createMaterialTopTabNavigator();

export default CommunityMain = props => {
	LogBox.ignoreAllLogs(); //로그 무시

	return (
		<CommunityTabNav.Navigator
			initialRouteName="ArticleStackNavigation"
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
				tabBarActiveTintColor: WHITE,
				tabBarLabelStyle: [styles.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<CommunityTabNav.Screen
				name={'ArticleStackNavigation'}
				options={{
					tabBarLabel: '자유 게시판',
				}}>
				{props => <ArticleStackNavigation {...props} />}
			</CommunityTabNav.Screen>
			<CommunityTabNav.Screen
				name={'ReviewStackNavigation'}
				options={{
					tabBarLabel: '후기',
				}}>
				{props => <ReviewStackNavigation {...props} />}
			</CommunityTabNav.Screen>
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
