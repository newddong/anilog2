import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ArticleMain from 'Root/component/templete/community/ArticleMain';
import Profile from 'Root/component/templete/profile/Profile';

const ArticleStackNav = createStackNavigator();

export default ArticleStackNavigation = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴
	React.useEffect(() => {
		props.sendRouteName(routeName != undefined ? routeName : 'ArticleMain');
	}, [routeName]);

	return (
		<ArticleStackNav.Navigator initialRouteName="ArticleMain" screenOptions={{headerShown: false}}>
			<ArticleStackNav.Screen name={'ArticleMain'} component={ArticleMain} />
			<ArticleStackNav.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ArticleStackNav.Screen
				name={'UserProfile'}
				component={Profile}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
		</ArticleStackNav.Navigator>
	);
};
