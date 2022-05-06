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
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import CommunityEdit from 'Root/component/templete/community/CommunityEdit';
import SendHeader from 'Root/navigation/header/SendHeader';
import SearchMap from 'Root/component/templete/search/SearchMap';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';

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
			<SearchStackNav.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<SearchStackNav.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<SearchStackNav.Screen
				name={'CommunityEdit'}
				component={CommunityEdit}
				options={({route}) => ({
					header: props => <SendHeader {...props} />,
					title: '리뷰 수정',
				})}
			/>
			<SearchStackNav.Screen
				name={'CommunityCommentList'}
				component={CommunityCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<SearchStackNav.Screen
				name={'SearchMap'}
				component={SearchMap}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '주소 검색',
				})}
			/>
			<SearchStackNav.Screen
				name="AddressSearchPage"
				component={AddressSearchPage}
				options={{header: props => <SimpleHeader {...props} />, title: '주소 설정'}}
			/>
			<SearchStackNav.Screen name="HashFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: ''}} />
		</SearchStackNav.Navigator>
	);
};
