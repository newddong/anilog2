import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchAccountA from 'Templete/search/SearchAccountA';
import SearchFeed from 'Templete/search/SearchFeed';
import SearchHashTag from 'Templete/search/SearchHashTag';
import TopTabNavigation_Border_Type2 from 'Organism/menu/TopTabNavigation_Border_Type2';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Profile from 'Root/component/templete/Profile';
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import {Dimensions} from 'react-native';

const SearchFeedTabNav = createMaterialTopTabNavigator();

export default SearchFeedTabNavigation = props => {
	const [searchInput, setSearchInput] = React.useState(); // 검색어 관련 State
	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(props.route);
	// console.log('getFocusedRouteNameFromRoute / SearchFeedTab', routeName);
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

	const menuItem = ['게시글', '계정', '태그'];
	const navName = ['SearchFeed', 'SearchAccountA', 'SearchHashTag'];

	const onClickUser = sendUserobject => {
		props.onClickUser(sendUserobject);
	};

	return (
		<SearchFeedTabNav.Navigator
			// initialRouteName={navName[props.defaultIndex]}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			// lazy={true}
			screenOptions={{lazy: true}}
			// tabBar={({state, descriptors, navigation, position}) => {
			// 	// console.log('navigation', navigation);
			// 	const onSelectTab = pressedTab => {
			// 		// console.log('press', state.routes[pressedTab].name);
			// 		navigation.navigate({
			// 			//현재 Tab state가 가지는 routes들 중 pressedTab 인덱스
			// 			name: state.routes[pressedTab].name,
			// 			merge: true,
			// 		});
			// 	};
			// 	return (
			// 		<TopTabNavigation_Border_Type2
			// 			items={menuItem}
			// 			onSelect={onSelectTab} // 현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
			// 			select={props.defaultIndex || 0} // gesture Handler(손가락으로 swipe)로 tab을 움직였을 시 자식까지 state를 연동시키기 위한 props
			// 			fontSize={24}
			// 			value={currentScreen}
			// 		/>
			// 	);
			// }}
		>
			{/* 게시글 */}
			<SearchFeedTabNav.Screen name="SearchFeed">{props => <SearchFeed {...props} />}</SearchFeedTabNav.Screen>
			{/* 계정 */}
			<SearchFeedTabNav.Screen name="SearchAccountA">
				{props => <SearchAccountA {...props} prevNav={props.prevNav} input={searchInput} onClickUser={onClickUser} />}
			</SearchFeedTabNav.Screen>
			{/* 태그 */}
			<SearchFeedTabNav.Screen name="SearchHashTag">{props => <SearchHashTag {...props} input={searchInput} />}</SearchFeedTabNav.Screen>
		</SearchFeedTabNav.Navigator>
	);
};
