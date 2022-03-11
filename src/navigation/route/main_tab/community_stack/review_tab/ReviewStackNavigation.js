import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';
import ReviewMain from 'Root/component/templete/community/ReviewMain';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import Profile from 'Root/component/templete/profile/Profile';

const ReviewStackNav = createStackNavigator();

export default ReviewStackNavigation = props => {
	// const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴
	React.useEffect(() => {
		props.sendRouteName(routeName != undefined ? routeName : 'ReviewMain');
	}, [routeName]);

	return (
		<ReviewStackNav.Navigator initialRouteName="ReviewMain" screenOptions={{headerShown: false}}>
			<ReviewStackNav.Screen
				name={'ReviewMain'}
				component={ReviewMain}
				options={({route}) => ({
					tabBarLabel: '후기',
				})}
			/>
			<ReviewStackNav.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ReviewStackNav.Screen
				name={'ReviewCommentList'}
				component={FeedCommentList}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ReviewStackNav.Screen
				name={'UserProfile'}
				component={Profile}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
		</ReviewStackNav.Navigator>
	);
};
