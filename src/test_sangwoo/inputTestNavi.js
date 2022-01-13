import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import InputTest1 from "./inputTest1";
import InputTest2 from './inputTest2'
import InputTest3 from "./inputTest3";
import InputTest4 from "./inputTest4";
export default InputTestNavi = () => {
    const InputTest = createStackNavigator()
    return(
            <InputTest.Navigator initialRouteName={"InputTest3"} screenOptions={{headerShown:false}}>
                <InputTest.Screen name="InputTest3" component={InputTest3} options={{headerShown:true}}/>
                <InputTest.Screen name="InputTest2" component={InputTest2}  options={{headerShown:true}}/>
                <InputTest.Screen name="InputTest1" component={InputTest1}  options={{headerShown:true}}/>
                <InputTest.Screen name="InputTest4" component={InputTest4}  options={{headerShown:true}}/>
            </InputTest.Navigator>
    )
}