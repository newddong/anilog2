import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchFeedTabNavigation from './feed_tab/SearchFeedTabNavigation';
import Temp from 'Navigation/route/main_tab/community_stack/temp';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';

const SearchTabNav = createMaterialTopTabNavigator();

export default SearchTabNavigation = props => {
	// navigation.push('Search', {mother: 0, child: 1});
	// ㄴ 위와 같이 호출할 경우 mother는 상위TopTab의 Tab인덱스를, child는 하단TopTab의 인덱스를 설정해줄 수 있음.
	const prevNav = props.route.params.prevNav;
	const childTab = props.route.params.child; //
	const [searchInput, setSearchInput] = React.useState();
	const navName = ['FEED', 'COMMUNITY'];
	//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감

	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const [currentChild, setCurrentChild] = React.useState('SearchFeed'); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴

	React.useEffect(() => {
		if (routeName == navName[0]) setCurrentScreen(0);
		else if (routeName == navName[1]) setCurrentScreen(1);
		else if (routeName == navName[2]) setCurrentScreen(2);
		props.navigation.setParams({routeName: routeName});
	}, [routeName]);

	React.useEffect(() => {
		setSearchInput(props.route.params);
	}, [props.route.params]);

	//하단 SearchFeedTabNavigation에서 스크린이 바뀔 때 호출
	const routeNameChanged = v => {
		// console.log('routeNameChanged / SearchTabNavigation  : ', v);
		// navigation.setOptions({childName: routeName});
		//헤더에 현재 보고있는 피드 - [게시글 , 계정, 태그] 스크린 정보를 송신
		props.navigation.setParams({routeName: v});
		setCurrentChild(v);
	};

	const onClickUser = sendUserobject => {
		// console.log('prevNav', prevNav);
		// console.log('sendUserobject', sendUserobject);
		prevNav == 'ProtectionTab'
			? props.navigation.navigate('ProtectionTabUserProfile', {userobject: sendUserobject})
			: props.navigation.navigate('FeedUserProfile', {userobject: sendUserobject});
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
				{props => (
					<SearchFeedTabNavigation
						{...props}
						input={searchInput}
						routeNameChild={routeNameChanged}
						prevNav={prevNav}
						routeName={currentChild}
						onClickUser={onClickUser}
						defaultIndex={childTab ? childTab : 0}
					/>
				)}
			</SearchTabNav.Screen>
			<SearchTabNav.Screen
				name="COMMUNITY"
				component={Temp}
				options={{
					title: '커뮤니티',
					...searchTabLabelOption,
				}}
			/>
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
