import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from 'Templete/profile/Profile';
import FeedList from 'Templete/feed/FeedList';
import AnimalProtectRequestDetail from 'Templete/protection/AnimalProtectRequestDetail';
import FeedListForHashTag from 'Templete/feed/FeedListForHashTag';
import FeedCommentList from 'Templete/feed/FeedCommentList';
import MissingAnimalDetail from 'Templete/missing/MissingAnimalDetail';
import ReportDetail from 'Templete/missing/ReportDetail';
import ActivationDetail from 'Templete/protection/ActivationDetail';
import SocialRelationTopTabNavigation from './socialRelation_tab/SocialRelationTopTabNavigation';
import ProtectionTopTabNavigation from './protection_tab/ProtectionTopTabNavigation';
import AlarmAndSearchHeader from 'Root/navigation/header/AlarmAndSearchHeader';

const ProtectionStack = createStackNavigator();

export default ProtectionStackNavigation = () => {
	return (
		<ProtectionStack.Navigator initialRouteName="ProtectionTab">
			<ProtectionStack.Screen name="ProtectionTab" component={ProtectionTopTabNavigation} options={{header: props => <LogoHeader {...props} />}} />
			<ProtectionStack.Screen name="UserProfile" component={Profile} options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}} />
			<ProtectionStack.Screen name="SocialRelationTopTab" component={SocialRelationTopTabNavigation} />
			<ProtectionStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />}} />
			<ProtectionStack.Screen name="HashFeedList" component={FeedList} />
			<ProtectionStack.Screen name="ProtectAnimalFeedList" component={FeedList} />
			<ProtectionStack.Screen name="UserTagFeedList" component={FeedList} />
			<ProtectionStack.Screen
				name="AnimalProtectRequestDetail"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleHeader {...props} />}}
			/>
			<ProtectionStack.Screen name="FeedListForHashTag" component={FeedListForHashTag} />
			<ProtectionStack.Screen name="FeedCommentList" component={FeedCommentList} options={{header: props => <AlarmAndSearchHeader {...props} />}} />
			<ProtectionStack.Screen name="MissingAnimalDetail" component={MissingAnimalDetail} options={{header: props => <MeatBallHeader {...props} />}} />
			<ProtectionStack.Screen
				name="ReportDetail"
				component={ReportDetail}
				options={{header: props => <MeatBallHeader {...props} />, title: '제보글'}}
			/>
			<ProtectionStack.Screen name="ActivationDetail" component={ActivationDetail} />
			<ProtectionStack.Screen
				name="ProtectionTabUserProfile"
				component={Profile}
				options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}}
			/>
		</ProtectionStack.Navigator>
	);
};
