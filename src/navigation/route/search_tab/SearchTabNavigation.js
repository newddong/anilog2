import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchFeedTabNavigation from './feed_tab/SearchFeedTabNavigation';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import SearchCommunityTabNavigation from './community_tab/SearchCommunityTabNavigation';
import {CommonActions} from '@react-navigation/native';

const SearchTabNav = createMaterialTopTabNavigator();

export default SearchTabNavigation = props => {
	// navigation.push('Search', {mother: 0, child: 1});
	// ㄴ 위와 같이 호출할 경우 mother는 상위TopTab의 Tab인덱스를, child는 하단TopTab의 인덱스를 설정해줄 수 있음.
	// const prevNav = props.route.params.prevNav;
	const [searchInput, setSearchInput] = React.useState('');

	const onClickUser = sendUserobject => {
		props.navigation.navigate('SearchTabUserProfile', {userobject: sendUserobject});
		// console.log('prevNav', prevNav);
		// console.log('sendUserobject', sendUserobject);
		// prevNav == 'ProtectionTab'
		// ? props.navigation.navigate('ProtectionTabUserProfile', {userobject: sendUserobject})
		// : props.navigation.navigate('FeedUserProfile', {userobject: sendUserobject});
		// props.onClickUser();
	};

	const searchTabLabelOption = {
		tabBarActiveTintColor: 'white',
		tabBarLabelStyle: [styles.tabbarLabelStyle],
		tabBarInactiveTintColor: GRAY10,
		tabBarPressColor: WHITE,
	};

	return (
		<SearchTabNav.Navigator
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			initialRouteName={'FEED'}
			optimizationsEnabled={true}>
			<SearchTabNav.Screen
				name="FEED"
				options={{
					title: '피드',
					...searchTabLabelOption,
				}}>
				{props => <SearchFeedTabNavigation {...props} onClickUser={onClickUser} />}
			</SearchTabNav.Screen>
			<SearchTabNav.Screen
				name="COMMUNITY"
				// component={Temp}
				options={{
					title: '커뮤니티',
					...searchTabLabelOption,
				}}>
				{props => <SearchCommunityTabNavigation {...props} />}
			</SearchTabNav.Screen>
		</SearchTabNav.Navigator>
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
