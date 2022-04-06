import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReviewMain from 'Root/component/templete/community/ReviewMain';

const ReviewStackNav = createStackNavigator();

export default ReviewStackNavigation = props => {
	return (
		<ReviewStackNav.Navigator initialRouteName="ReviewMain" screenOptions={{headerShown: false}}>
			<ReviewStackNav.Screen
				name={'ReviewMain'}
				component={ReviewMain}
				options={({route}) => ({
					tabBarLabel: '리뷰',
				})}
			/>
		</ReviewStackNav.Navigator>
	);
};
