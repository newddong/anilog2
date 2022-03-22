import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ArticleMain from 'Root/component/templete/community/ArticleMain';

const ArticleStackNav = createStackNavigator();

export default ArticleStackNavigation = props => {
	return (
		<ArticleStackNav.Navigator initialRouteName="ArticleMain" screenOptions={{}}>
			<ArticleStackNav.Screen
				name={'ArticleMain'}
				component={ArticleMain}
				options={({route}) => ({
					headerShown: false,
				})}
			/>
		</ArticleStackNav.Navigator>
	);
};
