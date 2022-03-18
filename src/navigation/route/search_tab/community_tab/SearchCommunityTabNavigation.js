import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchAccountA from 'Root/component/templete/search/SearchAccountA';
import SearchFeed from 'Root/component/templete/search/SearchFeed';
import SearchHashTag from 'Root/component/templete/search/SearchHashTag';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import SearchFreeBoard from 'Root/component/templete/search/SearchFreeBoard';
import SearchReview from 'Root/component/templete/search/SearchReview';
import SearchMarket from 'Root/component/templete/search/SearchMarket';

const SearchCommunityTabNav = createMaterialTopTabNavigator();

export default SearchCommunityTabNavigation = props => {
	const [searchInput, setSearchInput] = React.useState(''); // 검색어 관련 State

	React.useEffect(() => {
		setSearchInput(props.input);
	}, [props.input]);

	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴

	const tabbarLabel = arg => {
		let result = {
			fontFamily: 'NotoSansKR-Bold',
			fontSize: 28 * DP,
			includeFontPadding: false,
			marginTop: -20 * DP,
			color: routeName == arg ? APRI10 : GRAY10,
		};
		return result;
	};

	return (
		<SearchCommunityTabNav.Navigator
			initialRouteName="SearchFreeBoard"
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: APRI10},
			}}>
			{/* 게시글 */}
			<SearchCommunityTabNav.Screen
				name="SearchFreeBoard"
				options={{
					title: '자유 게시글',
					tabBarLabelStyle: [tabbarLabel('SearchFreeBoard')],
				}}>
				{props => <SearchFreeBoard input={searchInput} {...props} />}
			</SearchCommunityTabNav.Screen>
			{/* 계정 */}
			<SearchCommunityTabNav.Screen
				name="SearchReview"
				options={{
					title: '후기',
					tabBarLabelStyle: [tabbarLabel('SearchReview')],
				}}>
				{props => <SearchReview {...props} input={searchInput} />}
			</SearchCommunityTabNav.Screen>
			{/* 태그 */}
			<SearchCommunityTabNav.Screen
				name="SearchMarket"
				options={{
					title: '마켓',
					tabBarLabelStyle: [tabbarLabel('SearchTag')],
				}}>
				{props => <SearchMarket {...props} search={searchInput} />}
			</SearchCommunityTabNav.Screen>
		</SearchCommunityTabNav.Navigator>
	);
};
