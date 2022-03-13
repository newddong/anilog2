import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ArticleMain from 'Root/component/templete/community/ArticleMain';
import Profile from 'Root/component/templete/profile/Profile';
import ArticleCommentList from 'Root/component/templete/community/ArticleCommentList';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';
import CommunityWrite from 'Root/component/templete/community/CommunityWrite';
import SendHeader from 'Root/navigation/header/SendHeader';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';

const ArticleStackNav = createStackNavigator();

export default ArticleStackNavigation = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route); //현재 활성화되어 있는 스크린의 이름을 받아옴
	React.useEffect(() => {
		props.sendRouteName(routeName != undefined ? routeName : 'ArticleMain');
	}, [routeName]);

	return (
		<ArticleStackNav.Navigator initialRouteName="ArticleMain" screenOptions={{}}>
			<ArticleStackNav.Screen
				name={'ArticleMain'}
				component={ArticleMain}
				options={({route}) => ({
					headerShown: false,
				})}
			/>
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
				name={'ArticleCommentList'}
				component={FeedCommentList}
				options={({route}) => ({
					headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ArticleStackNav.Screen
				name={'UserProfile'}
				component={Profile}
				options={({route}) => ({
					headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ArticleStackNav.Screen
				name={'CommunityWrite'}
				component={CommunityWrite}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SendHeader {...props} />,
					title: '',
				})}
			/>
			<ArticleStackNav.Screen
				name="AddressSearchPage"
				component={AddressSearchPage}
				options={{header: props => <SimpleHeader {...props} />, title: '주소 검색'}}
			/>
		</ArticleStackNav.Navigator>
	);
};
