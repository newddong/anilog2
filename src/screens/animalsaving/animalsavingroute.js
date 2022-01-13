import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MyActivity from './myactivity/myactivity';
import Participation from './participation/participation';
import AidRequest from './aidrequest/aidrequest';
import MainHeader from 'Screens/header/mainheader';
import ParticipationDetail from './participation/participationdetail';
import AidRequestDetail from './aidrequest/aidrequestdetail';
import AidRequestForm from './aidrequest/aidrequestform';
import DP from 'Screens/dp';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


export default AnimalSavingRoute = () => {
	return (
		<Stack.Navigator initialRouteName="AnimalSavingHome" screenOptions={{headerMode:'screen'}}>
			<Stack.Screen
				name="AnimalSavingHome"
				component={AnimalSavingHome}
				options={{header: (props) => <MainHeader {...props}/>}}
			/>
			<Stack.Screen
				name="임시보호 참여하기"
				component={ParticipationDetail}
			/>
			<Stack.Screen
				name="AidRequestDetail"
				component={AidRequestDetail}
			/>
			<Stack.Screen
				name="보호 활동 신청"
				component={AidRequestForm}
			/>

		</Stack.Navigator>
	);
};

const AnimalSavingHome = () => {
	return (
		<Tab.Navigator initialRouteName="Request" screenOptions={{
			labelStyle:txt.noto30b,
			activeTintColor:'#FFB6A5',
			inactiveTintColor:'#767676',
			tabStyle:{height:90*DP},
			indicatorStyle:{backgroundColor:"#FFB6A5"}
		}}>
			<Tab.Screen name="AidRequest" component={AidRequest} options={{tabBarLabel:({color})=>(<Text style={[txt.noto30b,{color:color}]}>보호요청</Text>)}}/>
			<Tab.Screen name="MyActivity" component={MyActivity} options={{tabBarLabel:({color})=>(<Text style={[txt.noto30b,{color:color}]}>내활동</Text>)}}/>
			<Tab.Screen name="Participation" component={Participation} options={{tabBarLabel:({color})=>(<Text style={[txt.noto30b,{color:color}]}>참여방법</Text>)}}/>
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
	noto30b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize:30*DP,
		lineHeight:46*DP
	},
})