import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FeedList from 'Templete/feed/FeedList';
import Profile from 'Templete/profile/Profile';
import FeedListForHashTag from 'Templete/feed/FeedListForHashTag';
import FeedCommentList from 'Templete/feed/FeedCommentList';
import AnimalProtectRequestDetail from 'Templete/protection/AnimalProtectRequestDetail';

import LogoHeader from 'Navigation/header/LogoHeader';
import MeatBallHeader from 'Navigation/header/MeatBallHeader';
import AlarmAndSearchHeader from 'Navigation/header/AlarmAndSearchHeader';
import BookmarkHeader from 'Navigation/header/BookmarkHeader';
import SocialRelationTopTabNavigation from '../protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import SimpleHeader from 'Navigation/header/SimpleHeader';
import ChangeUserProfileImage from 'Root/component/templete/user/ChangeUserProfileImage';
import SetPetInformation from 'Root/component/templete/pet/SetPetInformation';

const FeedStack = createStackNavigator();

export default FeedStackNavigation = () => {
	return (
		<FeedStack.Navigator initialRouteName="MainHomeFeedList">
			<FeedStack.Screen name="MainHomeFeedList" component={FeedList} options={{header: props => <LogoHeader {...props} />}} />
			<FeedStack.Screen name="UserProfile" component={Profile} options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필'}}
			/>
			<FeedStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen name="HashFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen name="ProtectAnimalFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen name="UserTagFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen
				name="AnimalProtectRequestDetail"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleHeader {...props} />}}
			/>
			<FeedStack.Screen
				name="FeedCommentList"
				component={FeedCommentList}
				options={{header: props => <AlarmAndSearchHeader {...props} />, title: '몰라'}}
			/>
			<FeedStack.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <BookmarkHeader {...props} />, title: '#해시태그'}}
			/>
			<FeedStack.Screen name="FeedUserProfile" component={Profile} options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen
				name="ChangeUserProfileImage"
				component={ChangeUserProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<FeedStack.Screen
				name="SetPetInformation"
				component={SetPetInformation}
				options={{header: props => <SaveButtonHeader {...props} />, title: '반려동물 상세 정보'}}
			/>
		</FeedStack.Navigator>
	);
};
