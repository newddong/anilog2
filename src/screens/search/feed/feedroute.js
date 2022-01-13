import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import FeedSearchList from './feedsearchlist';
import SearchList from './searchlist';
import FeedTabbar from '../feedtabbar';
import TempShelter from './tempshelter';

import DP from 'Screens/dp';

const Tab = createMaterialTopTabNavigator();
const SearchStack = createStackNavigator();

export default FeedRoute = () => {
	return (
      <Tab.Navigator initialRouteName='recommend' tabBar={(props)=><FeedTabbar {...props}/>}
      >
         <Tab.Screen name='recommend' component={FeedSearchList} options={{tabBarLabel:'추천'}} initialParams={{ itemId: '추천' }}/>
         <Tab.Screen name='profiles' component={SearchList} options={{tabBarLabel:'계정'}} initialParams={{ itemId: '본 계정' }}/>
         <Tab.Screen name='tags' component={SearchList} options={{tabBarLabel:'테그'}} initialParams={{ itemId: '검색한 테그' }}/>
         <Tab.Screen name='diary' component={TempShelter} options={{tabBarLabel:'임보일기'}} initialParams={{ itemId: '임보일기' }}/>

      </Tab.Navigator>
		
	);
};

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 36*DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
   noto28b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize:30*DP,
		lineHeight:38*DP
	},
	noto30b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize:30*DP,
		lineHeight:42*DP
	},
})