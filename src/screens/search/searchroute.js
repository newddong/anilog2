import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import FeedRoute from './feed/feedroute';
import AidRequest from 'Screens/animalsaving/aidrequest/aidrequest';
import HealthMovie from './healthmovie/healthmovie';

import SearchHeader from './searchheader';
import SearchTabBar from './searchtabbar';
import SearchContext from './searchcontext';
import DP from 'Screens/dp';

const Searchtab = createMaterialTopTabNavigator();
const SearchStack = createStackNavigator();

export default SearchRoute = () => {
	const [input,setInput] = React.useState(false);
	return (
		<SearchContext.Provider value={{
			isInput:input,
			setInput:()=>{setInput(true)},
			releaseInput:()=>{setInput(false)},
		}}>
			<SearchStack.Navigator
				initialRouteName="Search"
				screenOptions={{
					headerMode:'screen',
					header: props => <SearchHeader {...props} />,
				}}>
				<SearchStack.Screen name="Search" component={SearchTab} />
			</SearchStack.Navigator>
		</SearchContext.Provider>
	);
};

const SearchTab = () => {
	return (
		<Searchtab.Navigator initialRouteName="Feed" tabBar={props => <SearchTabBar {...props} />} swipeEnabled={false}>
			<Searchtab.Screen name="Feed" component={FeedRoute} options={{tabBarLabel: '피드'}} />
			<Searchtab.Screen name="HealthMovie" component={HealthMovie} options={{tabBarLabel: '건강영상'}} />
			<Searchtab.Screen name="AidRequest" component={AidRequest} options={{tabBarLabel: '보호요청'}} />
		</Searchtab.Navigator>
	);
};

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 13,
		lineHeight: 36 * DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 15.5,
		lineHeight: 38 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 42 * DP,
	},
});
