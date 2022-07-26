import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import Profile from 'Root/component/templete/profile/Profile';
import SearchTabNavigation from './SearchTabNavigation';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import FeedList from 'Root/component/templete/feed/FeedList';
import ChangeUserProfileImage from 'Root/component/templete/user/ChangeUserProfileImage';
import SocialRelationTopTabNavigation from '../main_tab/protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';
import FeedListForHashTag from 'Root/component/templete/feed/FeedListForHashTag';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import CommunityEdit from 'Root/component/templete/community/CommunityEdit';
import SendHeader from 'Root/navigation/header/SendHeader';
import SearchMap from 'Root/component/templete/search/SearchMap';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import UserInfoDetailSettting from 'Root/component/templete/user/UserInfoDetailSetting';
import SaveButtonHeader from 'Root/navigation/header/SaveButtonHeader';
import EditShelterInfo from 'Root/component/templete/shelter/EditShelterInfo';
import CommunityHeader from 'Root/navigation/header/CommunityHeader';
import ChangePetProfileImage from 'Root/component/templete/pet/ChangePetProfileImage';
import ProfileHeader from 'Root/navigation/header/ProfileHeader';
import AddPhoto from 'Root/component/templete/media/AddPhoto';
import PhotoSelectHeader from 'Root/navigation/header/PhotoSelectHeader';
import MissingAnimalDetail from 'Root/component/templete/missing/MissingAnimalDetail';
import SimpleWithMeatballHeader from 'Root/navigation/header/SimpleWithMeatballHeader';
import ReportDetail from 'Root/component/templete/missing/ReportDetail';

const SearchStackNav = createStackNavigator();

export default SearchMainStack = props => {
	return (
		<SearchStackNav.Navigator initialRouteName="SearchTab">
			<SearchStackNav.Screen
				name="SearchTab"
				options={{
					header: prop => <InputAndSearchHeader {...props} />,
					tabBarShowLabel: false,
				}}>
				{props => <SearchTabNavigation {...props} />}
			</SearchStackNav.Screen>
			<SearchStackNav.Screen name="UserProfile" component={Profile} options={{header: props => <ProfileHeader {...props} />, title: '피드 게시글'}} />
			<SearchStackNav.Screen
				name="UserFeedList"
				component={FeedList}
				options={{header: props => <SimpleHeader {...props} />, title: '피드 게시글'}}
			/>
			<SearchStackNav.Screen
				name={'UserTagFeedList'}
				component={FeedList}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: '프로필',
				})}
			/>
			<SearchStackNav.Screen
				name="ChangeUserProfileImage"
				component={ChangeUserProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<SearchStackNav.Screen
				name="ChangePetProfileImage"
				component={ChangePetProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<SearchStackNav.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <InputAndSearchHeader {...props} type={'social'} />}}
			/>
			<SearchStackNav.Screen
				name="FeedCommentList"
				component={FeedCommentList}
				options={{header: props => <SimpleHeader {...props} />, title: '댓글'}}
			/>
			<SearchStackNav.Screen name="SinglePhotoSelect" component={AddPhoto} options={{header: props => <PhotoSelectHeader {...props} />, title: ''}} />
			<SearchStackNav.Screen name="MultiPhotoSelect" component={AddPhoto} options={{header: props => <PhotoSelectHeader {...props} />, title: ''}} />
			<SearchStackNav.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <SimpleHeader {...props} />, title: '#해시태그'}}
			/>
			<SearchStackNav.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <CommunityHeader {...props} />,
					title: ' ',
				})}
			/>
			<SearchStackNav.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <CommunityHeader {...props} />,
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
			<SearchStackNav.Screen
				name="UserInfoDetailSetting"
				component={UserInfoDetailSettting}
				options={{header: props => <SaveButtonHeader {...props} />, title: '프로필 상세 정보'}}
			/>
			<SearchStackNav.Screen
				name="EditShelterInfo"
				component={EditShelterInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 정보 수정'}}
			/>
			<SearchStackNav.Screen name="HashFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: ''}} />
			<SearchStackNav.Screen name="ReportDetail" component={ReportDetail} options={{header: props => <SimpleWithMeatballHeader {...props} />}} />
			<SearchStackNav.Screen
				name="MissingAnimalDetail"
				component={MissingAnimalDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />}}
			/>
		</SearchStackNav.Navigator>
	);
};
