import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SelectedMediaTest from './selectedMediaTest';
import FeedThumbNailTest from './thumbNailTest';
import ProfileImageSelectTest from './profileImageSelectTest';
import Test1 from './test1';
import InputTestNavi from './inputTestNavi';
import ButtonTest from './buttonTest';
import TagTest from './TagTest';
import TabSelectTest from './tabSelectTest';
import TempleteTestNavi from './templeteTestNavi';
import OrganismTestNavi from './OrganismTestNavi';
import OrganismTestNavi_ksw from './OrganismTestNavi_ksw';
import MyStackNavigation from 'Root/navigation/route/main_tab/my_stack/MyStackNavigation';
export default TestNavi = () => {
	const TestStack = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<TestStack.Navigator initialRouteName={'MyStackNavigation'}>
				<TestStack.Screen name="InputTest" component={InputTestNavi} options={{headerShown: false}} />
				<TestStack.Screen name="TabTest" component={TabSelectTest} />

				<TestStack.Screen name="Icon,img,label" component={Test1} />
				<TestStack.Screen name="SelectedMedia/LocalMedial/CameraLink" component={SelectedMediaTest} />
				<TestStack.Screen name="Thumbnail Test" component={FeedThumbNailTest} />
				<TestStack.Screen name="ProfileImage Select/Large Test  " component={ProfileImageSelectTest} />
				<TestStack.Screen name="Tag Test" component={TagTest} />
				<TestStack.Screen name="ButtonTest" component={ButtonTest} />
				<TestStack.Screen name="TempleteTestNavi" component={TempleteTestNavi} options={{headerShown: false, tabBarVisible: false}} />
				<TestStack.Screen name="MyStackNavigation" component={MyStackNavigation} options={{headerShown: false, tabBarVisible: false}} />
				<TestStack.Screen name="OrganismTestNavi" component={OrganismTestNavi} options={{headerShown: false, tabBarVisible: false}} />
				<TestStack.Screen name="OrganismTestNavi_ksw" component={OrganismTestNavi_ksw} options={{headerShown: false, tabBarVisible: false}} />
			</TestStack.Navigator>
		</NavigationContainer>
	);
};
