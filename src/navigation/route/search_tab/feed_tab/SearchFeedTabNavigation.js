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
import searchContext from 'Root/config/searchContext';

const SearchFeedTabNav = createMaterialTopTabNavigator();

export default SearchFeedTabNavigation = props => {
	const onClickUser = sendUserobject => {
		props.onClickUser(sendUserobject);
	};

	const routeName = getFocusedRouteNameFromRoute(props.route);

	React.useEffect(() => {
		searchContext.searchInfo.routeName = routeName;
	}, [routeName]);

	return (
		<SearchFeedTabNav.Navigator
			initialRouteName="SearchFeed"
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarLabelStyle: [txt.noto24, {color: GRAY10, textAlignVertical: 'center', marginTop: -20 * DP}],
				tabBarIndicatorStyle: {backgroundColor: APRI10},
			}}>
			<SearchFeedTabNav.Screen name="SearchFeed" options={{title: '게시글'}}>
				{props => <SearchFeed {...props} prevNav={props.prevNav} />}
			</SearchFeedTabNav.Screen>
			<SearchFeedTabNav.Screen name="SearchAccountA" options={{title: '계정'}}>
				{props => <SearchAccountA {...props} prevNav={props.prevNav} onClickUser={onClickUser} />}
			</SearchFeedTabNav.Screen>
			<SearchFeedTabNav.Screen name="SearchHashTag" options={{title: '해쉬태그'}}>
				{props => <SearchHashTag {...props} />}
			</SearchFeedTabNav.Screen>
		</SearchFeedTabNav.Navigator>
	);
};
