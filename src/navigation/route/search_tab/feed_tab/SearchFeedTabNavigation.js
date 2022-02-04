import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchAccountA from 'Templete/search/SearchAccountA';
import SearchFeed from 'Templete/search/SearchFeed';
import SearchHashTag from 'Templete/search/SearchHashTag';
import TopTabNavigation_Border_Type2 from 'Organism/menu/TopTabNavigation_Border_Type2';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import {Animated, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {APRI10, GRAY10, GRAY20, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

const SearchFeedTabNav = createMaterialTopTabNavigator();

export default SearchFeedTabNavigation = props => {
	const [searchInput, setSearchInput] = React.useState(); // 검색어 관련 State
	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(props.route);
	console.log('getFocusedRouteNameFromRoute / SearchFeedTab', routeName);
	const tabbarTitle = () => {
		switch (routeName) {
			case 'SearchFeed':
				return '피드';
				break;
			case 'SearchAccountA':
				return '계정';
				break;
			case 'SearchHashTag':
				return '해쉬태그';
				break;
			default:
				break;
		}
	};
	React.useEffect(() => {
		if (routeName == navName[0]) setCurrentScreen(0);
		else if (routeName == navName[1]) setCurrentScreen(1);
		else if (routeName == navName[2]) setCurrentScreen(2);
		props.routeNameChild(routeName);
		// props.navigation.setOptions({childName: routeName});
	}, [routeName]);

	React.useEffect(() => {
		//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감
		setSearchInput(props.input);
	}, [props.input]);

	const navName = ['SearchFeed', 'SearchAccountA', 'SearchHashTag'];

	const onClickUser = sendUserobject => {
		props.onClickUser(sendUserobject);
	};

	return (
		<SearchFeedTabNav.Navigator
			// initialRouteName={navName[props.defaultIndex]}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			lazy={true}
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarLabelStyle: [txt.noto24, {color: GRAY10, textAlignVertical: 'center', marginTop: -20 * DP}],
				tabBarIndicatorStyle: {backgroundColor: APRI10},
			}}>
			{/* 게시글 */}
			<SearchFeedTabNav.Screen name="SearchFeed" options={{title: '피드'}}>
				{props => <SearchFeed {...props} />}
			</SearchFeedTabNav.Screen>
			{/* 계정 */}
			<SearchFeedTabNav.Screen name="SearchAccountA" options={{title: '계정'}}>
				{props => <SearchAccountA {...props} prevNav={props.prevNav} input={searchInput} onClickUser={onClickUser} />}
			</SearchFeedTabNav.Screen>
			{/* 태그 */}
			<SearchFeedTabNav.Screen name="SearchHashTag" options={{title: '해쉬태그'}}>
				{props => <SearchHashTag {...props} input={searchInput} />}
			</SearchFeedTabNav.Screen>
		</SearchFeedTabNav.Navigator>
	);
};
