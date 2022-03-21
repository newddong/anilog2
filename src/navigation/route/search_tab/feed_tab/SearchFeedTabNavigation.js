import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchAccountA from 'Root/component/templete/search/SearchAccountA';
import SearchFeed from 'Root/component/templete/search/SearchFeed';
import SearchHashTag from 'Root/component/templete/search/SearchHashTag';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

const SearchFeedTabNav = createMaterialTopTabNavigator();

export default SearchFeedTabNavigation = props => {
	const [searchInput, setSearchInput] = React.useState(''); // 검색어 관련 State
	const routeName = getFocusedRouteNameFromRoute(props.route);

	const navName = ['SearchFeed', 'SearchAccountA', 'SearchHashTag'];

	React.useEffect(() => {
		// if (routeName == navName[0]) setCurrentScreen(0);
		// else if (routeName == navName[1]) setCurrentScreen(1);
		// else if (routeName == navName[2]) setCurrentScreen(2);
		// props.routeNameChild(routeName);
		props.navigation.setParams({routeName: routeName});
	}, [routeName]);

	React.useEffect(() => {
		//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감
		// console.log('props.input / FeedTabNavi', props.input);
		setSearchInput(props.input);
	}, [props.input]);

	const onClickUser = sendUserobject => {
		props.onClickUser(sendUserobject);
	};

	return (
		<SearchFeedTabNav.Navigator
			initialRouteName="SearchAccountA"
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarLabelStyle: [txt.noto24, {color: GRAY10, textAlignVertical: 'center', marginTop: -20 * DP}],
				tabBarIndicatorStyle: {backgroundColor: APRI10},
			}}>
			{/* 게시글 */}
			<SearchFeedTabNav.Screen name="SearchFeed" options={{title: '게시글'}}>
				{props => <SearchFeed {...props} />}
			</SearchFeedTabNav.Screen>
			{/* 계정 */}
			<SearchFeedTabNav.Screen name="SearchAccountA" options={{title: '계정'}}>
				{props => <SearchAccountA {...props} prevNav={props.prevNav} input={searchInput} onClickUser={onClickUser} />}
			</SearchFeedTabNav.Screen>
			{/* 태그 */}
			<SearchFeedTabNav.Screen name="SearchHashTag" options={{title: '해쉬태그'}}>
				{props => <SearchHashTag {...props} search={searchInput} />}
			</SearchFeedTabNav.Screen>
		</SearchFeedTabNav.Navigator>
	);
};
