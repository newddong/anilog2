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
import ChangeUserProfileImage from 'Templete/user/ChangeUserProfileImage';
import FeedList from 'Templete/feed/FeedList';
import AlarmList from 'Templete/list/AlarmList';
import AlarmCommentList from 'Organism/comment/AlarmCommentList';
import UserNotePage from 'Templete/user/UserNotePage';
import EditShelterInfo from 'Root/component/templete/shelter/EditShelterInfo';

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

			{/* 알람용 */}
			<CommunityMainStackNavi.Screen name="AlarmList" component={AlarmList} options={{header: props => <SimpleHeader {...props} />, title: '소식'}} />
			<CommunityMainStackNavi.Screen name="AlarmCommentList" component={AlarmCommentList} options={{header: props => <SimpleHeader {...props} />}} />
			<CommunityMainStackNavi.Screen
				name="ShelterVolunteerForm"
				component={ApplicationFormVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청서'}}
			/>
			<CommunityMainStackNavi.Screen
				name="ApplyAdoptionDetails"
				component={ApplyDetails}
				options={{header: props => <SimpleHeader {...props} />, title: '입양 신청 내역'}}
			/>
			<CommunityMainStackNavi.Screen
				name="SetPetInformation"
				component={SetPetInformation}
				options={{header: props => <SaveButtonHeader {...props} />, title: '반려동물 상세 정보'}}
			/>
			<CommunityMainStackNavi.Screen name="UserNotePage" component={UserNotePage} options={{header: props => <SimpleHeader {...props} />}} />
			<CommunityMainStackNavi.Screen
				name="FeedCommentList"
				component={FeedCommentList}
				options={{header: props => <AlarmAndSearchHeader {...props} />}}
			<CommunityMainStackNavi.Screen
				name="EditShelterInfo"
				component={EditShelterInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 정보 수정'}}
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
