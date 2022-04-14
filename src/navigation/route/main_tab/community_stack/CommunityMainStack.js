import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {createStackNavigator} from '@react-navigation/stack';
import CommunityMain from './CommunityMain';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import Profile from 'Root/component/templete/profile/Profile';
import CommunityWrite from 'Root/component/templete/community/CommunityWrite';
import SendHeader from 'Root/navigation/header/SendHeader';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';
import SearchMap from 'Root/component/templete/search/SearchMap';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import WriteEditorTest from 'Root/component/templete/community/WriteEditorTest';
import ReviewStackNavigation from './review_tab/ReviewStackNavigation';
import {getFocusedRouteNameFromRoute, useNavigation} from '@react-navigation/core';
import CommunityEdit from 'Root/component/templete/community/CommunityEdit';
import ChangeUserProfileImage from 'Root/component/templete/user/ChangeUserProfileImage';
import FeedList from 'Root/component/templete/feed/FeedList';

const CommunityMainStackNavi = createStackNavigator();

export default CommunityMainStack = props => {
	// console.log('CommunityMainStack', props.route);
	const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'CommunityMain';

	React.useEffect(() => {
		props.sendRoute(routeName);
	}, [routeName]);

	return (
		<CommunityMainStackNavi.Navigator initialRouteName="CommunityMain">
			<CommunityMainStackNavi.Screen
				name="CommunityMain"
				component={CommunityMain}
				options={({route, navigation}) => ({
					header: props => <LogoHeader {...props} />,
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'UserProfile'}
				component={Profile}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name="AddressSearchWeb"
				component={AddressSearchPage}
				options={{header: props => <SimpleHeader {...props} />, title: '주소 설정'}}
			/>
			<CommunityMainStackNavi.Screen
				name="WriteEditorTest"
				component={WriteEditorTest}
				options={{header: props => <SimpleHeader {...props} />, title: 'WriteEditorTest'}}
			/>
			<CommunityMainStackNavi.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'CommunityWrite'}
				component={CommunityWrite}
				options={({route}) => ({
					header: props => <SendHeader {...props} />,
					title: '',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'CommunityEdit'}
				component={CommunityEdit}
				options={({route}) => ({
					header: props => <SendHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'CommunityCommentList'}
				component={CommunityCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'SearchMap'}
				component={SearchMap}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '주소 검색',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'SocialRelation'}
				component={SocialRelationTopTabNavigation}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '주소 검색',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'ChangeUserProfileImage'}
				component={ChangeUserProfileImage}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '프로필 수정',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'UserFeedList'}
				component={FeedList}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '프로필',
				})}
			/>
			<CommunityMainStackNavi.Screen
				name={'UserTagFeedList'}
				component={FeedList}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '프로필',
				})}
			/>
		</CommunityMainStackNavi.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontSize: 30 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
