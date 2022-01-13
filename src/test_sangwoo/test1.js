import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import IconTest from './iconTest'
import ImageStyleTest from './imageStyleTest'
import LabelTest from './labelTest'
export default Test1 = () => {
    const Test1 = createStackNavigator()
    return(
            <Test1.Navigator screenOptions={{headerShown:false}} initialRouteName={"ImageStyle"}>
                <Test1.Screen name="Icon" component={IconTest} />
                <Test1.Screen name="ImageStyle" component={ImageStyleTest}/>
                <Test1.Screen name="Label" component={LabelTest}/>
            </Test1.Navigator>
    )
}