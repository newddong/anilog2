import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedList from 'Templete/feed/FeedList';
import Profile from 'Templete/profile/Profile';
import FeedListForHashTag from 'Templete/feed/FeedListForHashTag';
import FeedCommentList from 'Templete/feed/FeedCommentList';
import AnimalProtectRequestDetail from 'Templete/protection/AnimalProtectRequestDetail';
import LogoHeader from 'Navigation/header/LogoHeader';
import SocialRelationTopTabNavigation from '../protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import SimpleHeader from 'Navigation/header/SimpleHeader';
import ChangeUserProfileImage from 'Root/component/templete/user/ChangeUserProfileImage';
import AlarmList from 'Root/component/templete/list/AlarmList';
import AlarmCommentList from 'Root/component/organism/comment/AlarmCommentList';
import SetPetInformation from 'Root/component/templete/pet/SetPetInformation';
import EditShelterInfo from 'Root/component/templete/shelter/EditShelterInfo';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import ProtectCommentList from 'Root/component/templete/protection/ProtectCommentList';
import UserInfoDetailSettting from 'Root/component/templete/user/UserInfoDetailSetting';
import MissingAnimalDetail from 'Templete/missing/MissingAnimalDetail';
import ReportDetail from 'Templete/missing/ReportDetail';
import SimpleWithMeatballHeader from 'Root/navigation/header/SimpleWithMeatballHeader';
import CommunityHeader from 'Root/navigation/header/CommunityHeader';
import ChangePetProfileImage from 'Root/component/templete/pet/ChangePetProfileImage';
import ProfileHeader from 'Root/navigation/header/ProfileHeader';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import AddPhoto from 'Root/component/templete/media/AddPhoto';
import PhotoSelectHeader from 'Root/navigation/header/PhotoSelectHeader';
import FeedWrite from 'Root/component/templete/feed/FeedWrite';
import FeedWriteHeader from 'Root/navigation/header/FeedWriteHeader';
const FeedStack = createStackNavigator();

export default FeedStackNavigation = props => {
	const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'MainHomeFeedList';
	React.useEffect(() => {
		props.sendRoute(routeName);
	}, [routeName]);
	return (
		<FeedStack.Navigator initialRouteName="MainHomeFeedList">
			<FeedStack.Screen name="MainHomeFeedList" component={FeedList} options={{header: props => <LogoHeader {...props} />}} />
			<FeedStack.Screen name="UserProfile" component={Profile} options={{header: props => <ProfileHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <InputAndSearchHeader {...props} type={'social'} />}}
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
			<FeedStack.Screen name="FeedCommentList" component={FeedCommentList} options={{header: props => <SimpleHeader {...props} />, title: '댓글'}} />
			<FeedStack.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <SimpleHeader {...props} />, title: '#해시태그'}}
			/>
			<FeedStack.Screen name="FeedUserProfile" component={Profile} options={{header: props => <ProfileHeader {...props} />, title: '프로필'}} />
			<FeedStack.Screen
				name="ChangeUserProfileImage"
				component={ChangeUserProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<FeedStack.Screen
				name="ChangePetProfileImage"
				component={ChangePetProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<FeedStack.Screen name="AlarmList" component={AlarmList} options={{header: props => <SimpleHeader {...props} />, title: '소식'}} />
			<FeedStack.Screen
				name="AlarmCommentList"
				component={AlarmCommentList}
				options={{header: props => <SimpleHeader {...props} />, title: '댓글'}}
			/>
			<FeedStack.Screen
				name={'CommunityCommentList'}
				component={CommunityCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: '댓글',
				})}
			/>
			<FeedStack.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <CommunityHeader {...props} />,
					title: ' ',
				})}
			/>
			<FeedStack.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					header: props => <CommunityHeader {...props} />,
					title: ' ',
				})}
			/>
			<FeedStack.Screen
				name="ShelterVolunteerForm"
				component={ApplicationFormVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청서'}}
			/>
			<FeedStack.Screen
				name="ApplyAdoptionDetails"
				component={ApplyDetails}
				options={{header: props => <SimpleHeader {...props} />, title: '입양 신청 내역'}}
			/>
			<FeedStack.Screen
				name="SetPetInformation"
				component={SetPetInformation}
				options={{header: props => <SaveButtonHeader {...props} />, title: '반려동물 상세 정보'}}
			/>
			<FeedStack.Screen
				name="EditShelterInfo"
				component={EditShelterInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 정보 수정'}}
			/>
			<FeedStack.Screen
				name="UserInfoDetailSetting"
				component={UserInfoDetailSettting}
				options={{header: props => <SaveButtonHeader {...props} />, title: '프로필 상세 정보'}}
			/>
			<FeedStack.Screen name="ProtectCommentList" component={ProtectCommentList} options={{header: props => <SimpleHeader {...props} />}} />
			<FeedStack.Screen
				name="MissingAnimalDetail"
				component={MissingAnimalDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />}}
			/>
			<FeedStack.Screen name="ReportDetail" component={ReportDetail} options={{header: props => <SimpleWithMeatballHeader {...props} />}} />
			<FeedStack.Screen name="SinglePhotoSelect" component={AddPhoto} options={{header: props => <PhotoSelectHeader {...props} />, title: ''}} />
		</FeedStack.Navigator>
	);
};
