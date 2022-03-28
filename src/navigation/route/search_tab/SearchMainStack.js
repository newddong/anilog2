import React from 'react';
import {StyleSheet} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {createStackNavigator} from '@react-navigation/stack';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import Profile from 'Root/component/templete/profile/Profile';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import SearchTabNavigation from './SearchTabNavigation';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import FeedList from 'Root/component/templete/feed/FeedList';
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import ChangeUserProfileImage from 'Root/component/templete/user/ChangeUserProfileImage';
import SocialRelationTopTabNavigation from '../main_tab/protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';
import AlarmAndSearchHeader from 'Root/navigation/header/AlarmAndSearchHeader';
import FeedListForHashTag from 'Root/component/templete/feed/FeedListForHashTag';
import BookmarkHeader from 'Root/navigation/header/BookmarkHeader';

const SearchStackNav = createStackNavigator();

export default SearchMainStack = props => {
	return (
		<SearchStackNav.Navigator initialRouteName="SearchTab">
			<SearchStackNav.Screen
				name="SearchTab"
				options={{
					header: props => <InputAndSearchHeader {...props} />,
					tabBarShowLabel: false,
				}}>
				{props => <SearchTabNavigation {...props} />}
			</SearchStackNav.Screen>
			<SearchStackNav.Screen
				name="UserProfile"
				component={Profile}
				options={({route, navigation}) => ({
					header: props => <SimpleHeader {...props} />,
				})}
			/>
			<SearchStackNav.Screen
				name="UserFeedList"
				component={FeedList}
				options={{header: props => <MeatBallHeader {...props} />, title: '피드 게시글'}}
			/>
			<SearchStackNav.Screen
				name="ChangeUserProfileImage"
				component={ChangeUserProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<SearchStackNav.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필'}}
			/>
			<SearchStackNav.Screen
				name="FeedCommentList"
				component={FeedCommentList}
				options={{header: props => <AlarmAndSearchHeader {...props} />, title: '몰라'}}
			/>
			<SearchStackNav.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <BookmarkHeader {...props} />, title: '#해시태그'}}
			/>
			<SearchStackNav.Screen name="HashFeedList" component={FeedList} />
		</SearchStackNav.Navigator>
	);
};
