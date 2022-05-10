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
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import SimpleWithMeatballHeader from 'Root/navigation/header/SimpleWithMeatballHeader';
import ProtectCommentList from 'Templete/protection/ProtectCommentList';
import EditAidRequest from 'Templete/protection/EditAidRequest';
import AlarmList from 'Templete/list/AlarmList';
import AlarmCommentList from 'Organism/comment/AlarmCommentList';
import UserNotePage from 'Templete/user/UserNotePage';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import EditShelterInfo from 'Root/component/templete/shelter/EditShelterInfo';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import SearchMainStack from '../../search_tab/SearchMainStack';

const ProtectionStack = createStackNavigator();

export default ProtectionStackNavigation = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'ProtectionTab';
	React.useEffect(() => {
		props.sendRoute(routeName);
	}, [routeName]);

	return (
		<ProtectionStack.Navigator initialRouteName="ProtectionTab">
			<ProtectionStack.Screen name="ProtectionTab" component={ProtectionTopTabNavigation} options={{header: props => <LogoHeader {...props} />}} />
			<ProtectionStack.Screen name="UserProfile" component={Profile} options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}} />
			<ProtectionStack.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필'}}
			/>
			<ProtectionStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />}} />
			<ProtectionStack.Screen name="HashFeedList" component={FeedList} />
			<ProtectionStack.Screen name="ProtectAnimalFeedList" component={FeedList} />
			<ProtectionStack.Screen name="UserTagFeedList" component={FeedList} />
			<ProtectionStack.Screen
				name="AnimalProtectRequestDetail"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />}}
			/>
			<ProtectionStack.Screen
				name="EditAidRequest"
				component={EditAidRequest}
				options={{header: props => <SendHeader {...props} />, title: '보호 요청 게시글 수정'}}
			/>
			<ProtectionStack.Screen name="FeedListForHashTag" component={FeedListForHashTag} />
			<ProtectionStack.Screen name="FeedCommentList" component={FeedCommentList} options={{header: props => <AlarmAndSearchHeader {...props} />}} />
			<ProtectionStack.Screen
				name="ProtectCommentList"
				component={ProtectCommentList}
				options={{header: props => <AlarmAndSearchHeader {...props} />}}
			/>
			<ProtectionStack.Screen
				name="MissingAnimalDetail"
				component={MissingAnimalDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />}}
			/>
			<ProtectionStack.Screen
				name="ReportDetail"
				component={ReportDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />, title: '제보글'}}
			/>
			<ProtectionStack.Screen name="ActivationDetail" component={ActivationDetail} />
			<ProtectionStack.Screen
				name="ProtectionTabUserProfile"
				component={Profile}
				options={{header: props => <MeatBallHeader {...props} />, title: '프로필'}}
			/>
			<ProtectionStack.Screen
				name={'CommunityCommentList'}
				component={CommunityCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			{/* 알람용 */}
			<ProtectionStack.Screen name="AlarmList" component={AlarmList} options={{header: props => <SimpleHeader {...props} />, title: '소식'}} />
			<ProtectionStack.Screen name="AlarmCommentList" component={AlarmCommentList} options={{header: props => <SimpleHeader {...props} />}} />
			<ProtectionStack.Screen name="UserNotePage" component={UserNotePage} options={{header: props => <SimpleHeader {...props} />}} />
			<ProtectionStack.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ProtectionStack.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<ProtectionStack.Screen
				name="EditShelterInfo"
				component={EditShelterInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 정보 수정'}}
			/>
		</ProtectionStack.Navigator>
	);
};
