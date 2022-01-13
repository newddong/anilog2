import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

import Assign from 'Screens/assign/assign';
import AssignUser from 'Screens/assign/assignuser';
import AssignShelter from 'Screens/assign/assignshelter';
import VerifyUser from 'Screens/assign/verifyuser';
import VerifyEmail from 'Screens/assign/verifyemail';
import VerifyMobile from 'Screens/assign/verifymobile';
import VerifyPass from 'Screens/assign/verifypass';
import StackHeader from 'Screens/header/stackheader';
import AssingProfile from 'Screens/assign/assignprofile';
import FirtStage from 'Screens/assign/assingshelter1st';
import SecondStage from 'Screens/assign/assignshelter2nd';
import ThirdStage from 'Screens/assign/assignshelter3rd';
import Camera from 'Screens/camera/camera';

import Assign_pet_step1 from 'Screens/assign_n/assign_pet_step1';
import Assign_pet_step2 from 'Screens/assign_n/assign_pet_step2';
import Assign_pet_step3 from 'Screens/assign_n/assign_pet_step3';
import Assign_pet_step4 from 'Screens/assign_n/assign_pet_step4';
import Assign_pet_step5 from 'Screens/assign_n/assign_pet_step5';


const AssignStack = createStackNavigator();

export default AssignRoute = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
				<AssignStack.Navigator initialRouteName="Assign" 
					screenOptions={{header: (props) => <StackHeader {...props}/>,headerMode:'screen'}}
				>
					<AssignStack.Screen name="Assign" component={Assign}/>
					<AssignStack.Screen name="AssingProfile" component={AssingProfile}/>
					<AssignStack.Screen name="AssignShelter" component={AssignShelter}/>
					<AssignStack.Screen name="SecondStage" component={SecondStage}/>
					<AssignStack.Screen name="ThirdStage" component={ThirdStage}/>
					<AssignStack.Screen name="AssignUser" component={AssignUser}/>
					<AssignStack.Screen name="FirtStage" component={FirtStage}/>
					<AssignStack.Screen name="VerifyEmail" component={VerifyEmail}/>
					<AssignStack.Screen name="VerifyMobile" component={VerifyMobile}/>
					<AssignStack.Screen name="VerifyPass" component={VerifyPass}/>
               <AssignStack.Screen name="VerifyUser" component={VerifyUser} options={{headerShown:false}}/>
               <AssignStack.Screen name="camera" component={Camera}/>


					<AssignStack.Screen name="Assign_pet_step1" component={Assign_pet_step1}/>
					<AssignStack.Screen name="Assign_pet_step2" component={Assign_pet_step2}/>
					<AssignStack.Screen name="Assign_pet_step3" component={Assign_pet_step3}/>
					<AssignStack.Screen name="Assign_pet_step4" component={Assign_pet_step4}/>
					<AssignStack.Screen name="Assign_pet_step5" component={Assign_pet_step5}/>
					
				</AssignStack.Navigator>
		</SafeAreaView>
	);
};