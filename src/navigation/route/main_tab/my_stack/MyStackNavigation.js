import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from 'Templete/profile/Profile';
import FeedList from 'Templete/feed/FeedList';
import FeedListForHashTag from 'Templete/feed/FeedListForHashTag';
import FeedCommentList from 'Templete/feed/FeedCommentList';

import UserInfoDetailSettting from 'Root/component/templete/user/UserInfoDetailSetting';
import UserMenu from 'Templete/user/UserMenu';
import UserInfoSetting from 'Templete/user/UserInfoSetting';
import ChangeUserProfileImage from 'Templete/user/ChangeUserProfileImage';
import ChangePassword from 'Templete/user/ChangePassword';
import VaccinationRecord from 'Templete/vaccination/VaccinationRecord';
import AnimalAdoption from 'Templete/protection/AnimalAdoption';
import PetInfoSetting from 'Templete/pet/PetInfoSetting';
import ChangePetProfileImage from 'Templete/pet/ChangePetProfileImage';
import SetPetInformation from 'Templete/pet/SetPetInformation';
import AddFamilyAccount from 'Templete/pet/AddFamilyAccount';
import AssignPetProfileImage from 'Templete/pet/AssignPetProfileImage';
import AssignPetInfoA from 'Templete/pet/AssignPetInfoA';
import AssignPetInfoB from 'Templete/pet/AssignPetInfoB';
import FavoriteUser from 'Root/component/templete/favorite/FavoriteUser';
import FavoriteFeeds from 'Templete/favorite/FavoriteFeeds';
import AppliesRecord from 'Templete/my/AppliesRecord';
import ApplyAdoptionList from 'Root/component/templete/protection/ApplyAdoptionList';
import ApplyDetails from 'Templete/protection/ApplyDetails';
import AnimalProtectList from 'Templete/protection/AnimalProtectList';
import AssignProtectAnimalImage from 'Templete/protection/AssignProtectAnimalImage';
import AssignProtectAnimalDate from 'Templete/protection/AssignProtectAnimalDate';
import AssignProtectAnimalInfo from 'Templete/protection/AssignProtectAnimalInfo';
import ShelterMenu from 'Templete/shelter/ShelterMenu';
import ShelterInfoSetting from 'Templete/shelter/ShelterInfoSetting';
import EditShelterInfo from 'Templete/shelter/EditShelterInfo';
import AidRequestAnimalList from 'Templete/protection/AidRequestAnimalList';
import WriteAidRequest from 'Templete/protection/WriteAidRequest';
import AidRequestManage from 'Templete/protection/AidRequestManage';
import ProtectApplyForm from 'Templete/protection/ProtectApplyForm';
import ShelterProtectRequests from 'Templete/shelter/ShelterProtectRequests';
import AnimalFromShelter from 'Templete/protection/AnimalFromShelter';
import AdoptorInformation from 'Templete/protection/AdoptorInformation';
import ManageVolunteer from 'Templete/volunteer/ManageVolunteer';
import ApplicationFormVolunteer from 'Templete/volunteer/ApplicationFormVolunteer';
import PhotoSelect from 'Templete/media/PhotoSelect';
import AnimalProtectRequestDetail from 'Templete/protection/AnimalProtectRequestDetail';
import SelectAccount from 'Templete/search/SelectAccount';
import ConfirmInputHeader from 'Navigation/header/ConfirmInputHeader';
import SaveButtonHeader from 'Navigation/header/SaveButtonHeader';
import SocialRelationTopTabNavigation from '../protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import SendHeader from 'Root/navigation/header/SendHeader';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import {useNavigation} from '@react-navigation/core';
import userGlobalObject from 'Root/config/userGlobalObject';
import SettingInformAsk from 'Templete/user/SettingInformAsk';
import SettingAccount from 'Templete/user/SettingAccount';
import SettingAlarm from 'Templete/user/SettingAlarm';
import SettingOpen from 'Templete/user/SettingOpen';
import ProtectionApplicationList from 'Root/component/templete/protection/ProtectionApplicationList';
import ProtectCommentList from 'Root/component/templete/protection/ProtectCommentList';
import AlarmAndSearchHeader from 'Root/navigation/header/AlarmAndSearchHeader';
import SimpleWithMeatballHeader from 'Root/navigation/header/SimpleWithMeatballHeader';
import EditAidRequest from 'Root/component/templete/protection/EditAidRequest';
import ReceivedMessage from 'Templete/user/ReceivedMessage';
import UserNotePage from 'Templete/user/UserNotePage';
import NoticeList from 'Templete/list/NoticeList';
import ServiceCenter from 'Templete/user/ServiceCenter';
import QnA from 'Root/component/templete/user/AskQuestion';
import CategoryHelp from 'Templete/user/CategoryHelp';
import ServiceCenterTopTabNavigation from './ServiceCenterTopTabNavigation';
import CategoryHelpTopTabNavigation from './CategoryHelpTopTabNavigation';
import TermsAndPolicy from 'Templete/user/TermsAndPolicy';
import FrequentAsked from 'Templete/user/FrequentAsked';
import FavoriteCommunity from 'Templete/favorite/FavoriteCommunity';
import FavoriteArticle from 'Templete/favorite/FavoriteArticle';
import FavoriteReview from 'Templete/favorite/FavoriteReview';
import FavoriteProtectRequest from 'Templete/favorite/FavoriteProtectRequest';
import AlarmList from 'Templete/list/AlarmList';
import AlarmCommentList from 'Organism/comment/AlarmCommentList';
import CommunityCommentList from 'Root/component/templete/community/CommunityCommentList';
import ArticleDetail from 'Root/component/templete/community/ArticleDetail';
import ReviewDetail from 'Root/component/templete/community/ReviewDetail';

import CommunityHeader from 'Root/navigation/header/CommunityHeader';

import MyHeader from 'Root/navigation/header/MyHeader';
import AddPhoto from 'Root/component/templete/media/AddPhoto';
import PhotoSelectHeader from 'Root/navigation/header/PhotoSelectHeader';
import ProfileHeader from 'Root/navigation/header/ProfileHeader';
import OpenSourceDetail from 'Templete/user/OpenSourceDetail';
import FeedWrite from 'Root/component/templete/feed/FeedWrite';
import FeedWriteHeader from 'Root/navigation/header/FeedWriteHeader';

const MyStack = createStackNavigator();
export default MyStackNavigation = props => {
	return (
		<MyStack.Navigator initialRouteName={userGlobalObject.userInfo.user_type == 'shelter' ? 'ShelterMenu' : 'UserMenu'}>
			{/* // <MyStack.Navigator initialRouteName={'ShelterMenu'}> */}
			<MyStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '피드 게시글'}} />
			<MyStack.Screen name="UserFeeds" component={FavoriteFeeds} options={{header: props => <SimpleHeader {...props} />, title: '내 게시글'}} />
			<MyStack.Screen name="HashFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '#반려동물'}} />
			<MyStack.Screen name="ProtectAnimalFeedList" component={FeedList} />
			<MyStack.Screen name="UserTagFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '프로필'}} />
			<MyStack.Screen name="UserProfile" component={Profile} options={{header: props => <ProfileHeader {...props} />, title: '프로필'}} />
			<MyStack.Screen
				name="AnimalProtectRequestDetail"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleWithMeatballHeader {...props} />}}
			/>
			<MyStack.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <SimpleHeader {...props} />, title: '#반려동물'}}
			/>
			<MyStack.Screen
				name="SocialRelation"
				component={SocialRelationTopTabNavigation}
				options={{header: props => <InputAndSearchHeader {...props} type={'social'} />}}
			/>
			<MyStack.Screen name="UserMenu" component={UserMenu} options={{header: props => <MyHeader {...props} />, title: 'MY'}} />
			<MyStack.Screen name="UserInfoSetting" component={UserInfoSetting} options={{header: props => <SimpleHeader {...props} />, title: ''}} />
			<MyStack.Screen
				name="ChangeUserProfileImage"
				component={ChangeUserProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<MyStack.Screen name="PhotoSelect" component={PhotoSelect} />
			<MyStack.Screen
				name="ChangePassword"
				component={ChangePassword}
				options={{header: props => <SimpleHeader {...props} />, title: '비밀번호 변경'}}
			/>
			<MyStack.Screen
				name="UserInfoDetailSetting"
				component={UserInfoDetailSettting}
				options={{header: props => <SaveButtonHeader {...props} />, title: '프로필 상세 정보'}}
			/>
			<MyStack.Screen name="PetInfoSetting" component={PetInfoSetting} options={{header: props => <MyHeader {...props} />, title: ''}} />
			<MyStack.Screen
				name="ChangePetProfileImage"
				component={ChangePetProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '프로필 변경'}}
			/>
			<MyStack.Screen
				name="SetPetInformation"
				component={SetPetInformation}
				options={{header: props => <SaveButtonHeader {...props} />, title: '반려동물 상세 정보'}}
			/>
			<MyStack.Screen
				name="VaccinationRecord"
				component={VaccinationRecord}
				options={{header: props => <SaveButtonHeader {...props} />, title: '접종 내역'}}
			/>
			<MyStack.Screen
				name="AddFamilyAccount"
				component={AddFamilyAccount}
				options={{header: props => <SimpleHeader {...props} />, title: '가족 계정 추가'}}
			/>
			<MyStack.Screen name="AnimalAdoption" component={AnimalAdoption} options={{header: props => <SimpleHeader {...props} />, title: '상태 변경'}} />
			<MyStack.Screen
				name="SelectAccount"
				component={SelectAccount}
				options={{header: props => <SimpleHeader {...props} />, title: '입양자 계정 찾기'}}
			/>
			<MyStack.Screen
				name="AssignPetProfileImage"
				component={AssignPetProfileImage}
				options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
			/>
			<MyStack.Screen
				name="AssignPetInfoA"
				component={AssignPetInfoA}
				options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
			/>
			<MyStack.Screen
				name="AssignPetInfoB"
				component={AssignPetInfoB}
				options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
			/>
			<MyStack.Screen name="FavoriteUser" component={FavoriteUser} options={{header: props => <SimpleHeader {...props} />, title: '즐겨찾은 친구'}} />
			<MyStack.Screen name="FeedCommentList" component={FeedCommentList} options={{header: props => <SimpleHeader {...props} />, title: '댓글'}} />
			<MyStack.Screen name="SinglePhotoSelect" component={AddPhoto} options={{header: props => <PhotoSelectHeader {...props} />, title: ''}} />
			<MyStack.Screen
				name="FavoriteFeeds"
				component={FavoriteFeeds}
				options={{header: props => <SimpleHeader {...props} />, title: '즐겨찾은 피드'}}
			/>
			<MyStack.Screen
				name="FavoriteFeedList"
				component={FeedList}
				options={{header: props => <SimpleHeader {...props} />, title: '즐겨찾기한 게시글'}}
			/>
			<MyStack.Screen name="TagMeFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />}} />
			<MyStack.Screen name="TagMeFeeds" component={FavoriteFeeds} options={{header: props => <SimpleHeader {...props} />, title: '나를 태그한 글'}} />
			<MyStack.Screen
				name="AnimalProtectList"
				component={AnimalProtectList}
				options={{header: props => <SimpleHeader {...props} />, title: '동물 보호 현황'}}
			/>
			<MyStack.Screen name="ShelterMenu" component={ShelterMenu} options={{header: props => <SimpleHeader {...props} />, title: 'MY'}} />
			<MyStack.Screen
				name="ShelterInfoSetting"
				component={ShelterInfoSetting}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 프로필'}}
			/>
			<MyStack.Screen
				name="EditShelterInfo"
				component={EditShelterInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 정보 수정'}}
			/>
			<MyStack.Screen
				name="AssignProtectAnimalImage"
				component={AssignProtectAnimalImage}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 등록'}}
			/>
			<MyStack.Screen
				name="AssignProtectAnimalDate"
				component={AssignProtectAnimalDate}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 등록'}}
			/>
			<MyStack.Screen
				name="AssignProtectAnimalType"
				component={AssignPetInfoA}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 등록'}}
			/>
			<MyStack.Screen
				name="AssignProtectAnimalAge"
				component={AssignProtectAnimalInfo}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 등록'}}
			/>
			<MyStack.Screen
				name="AidRequestAnimalList"
				component={AidRequestAnimalList}
				options={{header: props => <SimpleHeader {...props} />, title: '동물 보호 요청'}}
			/>
			<MyStack.Screen
				name="WriteAidRequest"
				component={WriteAidRequest}
				options={{header: props => <SendHeader {...props} />, title: '동물 보호 요청'}}
			/>
			<MyStack.Screen
				name="EditAidRequest"
				component={EditAidRequest}
				options={{header: props => <SendHeader {...props} />, title: '보호 요청 게시글 수정'}}
			/>
			<MyStack.Screen
				name="ShelterProtectAnimalList"
				component={AidRequestManage}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 목록'}}
			/>
			<MyStack.Screen
				name="ProtectionApplicationList"
				component={ProtectionApplicationList}
				options={{header: props => <SimpleHeader {...props} />, title: '신청서 조회'}}
			/>
			<MyStack.Screen
				name="ProtectApplyForm"
				component={ProtectApplyForm}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 활동 신청자'}}
			/>
			<MyStack.Screen
				name="AnimalFromShelter"
				component={AnimalFromShelter}
				options={{header: props => <SimpleHeader {...props} />, title: '우리 보호소 출신 동물'}}
			/>
			<MyStack.Screen
				name="AdoptorInformation"
				component={AdoptorInformation}
				options={{header: props => <SimpleHeader {...props} />, title: '입양처 정보'}}
			/>
			<MyStack.Screen
				name="ManageShelterVolunteer"
				component={ManageVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청서 관리'}}
			/>
			<MyStack.Screen
				name="ShelterVolunteerForm"
				component={ApplicationFormVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청서'}}
			/>
			<MyStack.Screen
				name="ShelterProtectRequests"
				component={ShelterProtectRequests}
				options={{header: props => <SimpleHeader {...props} />, title: '보호요청 게시글'}}
			/>
			<MyStack.Screen
				name="ProtectRequestManage"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleHeader {...props} />, title: '보호소 보호중인 동물 정보'}}
			/>
			<MyStack.Screen name="AppliesRecord" component={AppliesRecord} options={{header: props => <SimpleHeader {...props} />, title: '신청 내역'}} />
			<MyStack.Screen
				name="ApplyAdoptionList"
				component={ApplyAdoptionList}
				options={{header: props => <SimpleHeader {...props} />, title: '입양 신청 내역'}}
			/>
			<MyStack.Screen
				name="ApplyAdoptionDetails"
				component={ApplyDetails}
				options={{header: props => <SimpleHeader {...props} />, title: '입양 신청 내역'}}
			/>
			<MyStack.Screen
				name="ApplyTempProtectList"
				component={ApplyAdoptionList}
				options={{header: props => <SimpleHeader {...props} />, title: '임시보호 신청 내역'}}
			/>
			<MyStack.Screen
				name="ApplyTempProtectDetails"
				component={ApplyDetails}
				options={{header: props => <SimpleHeader {...props} />, title: '임시보호 신청 내역'}}
			/>
			<MyStack.Screen
				name="ManageUserVolunteer"
				component={ManageVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청'}}
			/>
			<MyStack.Screen
				name="UserVolunteerForm"
				component={ApplicationFormVolunteer}
				options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청서'}}
			/>
			<MyStack.Screen
				name="SettingInformAsk"
				component={SettingInformAsk}
				options={{header: props => <SimpleHeader {...props} />, title: '정보/문의'}}
			/>
			<MyStack.Screen
				name="ProtectCommentList"
				component={ProtectCommentList}
				options={{header: props => <SimpleHeader {...props} />, title: '댓글'}}
			/>
			<MyStack.Screen name="SettingAccount" component={SettingAccount} options={{header: props => <SimpleHeader {...props} />, title: '계정'}} />
			<MyStack.Screen name="SettingAlarm" component={SettingAlarm} options={{header: props => <SimpleHeader {...props} />, title: '알림'}} />
			<MyStack.Screen name="SettingOpen" component={SettingOpen} options={{header: props => <SimpleHeader {...props} />, title: '공개 설정'}} />
			<MyStack.Screen name="ReceivedMessage" component={ReceivedMessage} options={{header: props => <SimpleHeader {...props} />, title: '쪽지함'}} />
			{/* <MyStack.Screen name="UserNotePage" component={UserNotePage} options={{header: props => <SimpleHeader {...props} />, title: props.title}} /> */}

			<MyStack.Screen name="NoticeList" component={NoticeList} options={{header: props => <SimpleHeader {...props} />, title: '공지사항'}} />

			<MyStack.Screen name="ServiceCenter" component={ServiceCenter} options={{header: props => <SimpleHeader {...props} />, title: '고객 센터'}} />
			<MyStack.Screen name="CategoryHelp" component={CategoryHelp} options={{header: props => <AlarmAndSearchHeader {...props} />}} />
			<MyStack.Screen
				name="ServiceTab"
				component={ServiceCenterTopTabNavigation}
				options={{header: props => <SimpleHeader {...props} />, title: '문의 하기'}}
			/>
			<MyStack.Screen name="TermsAndPolicy" component={TermsAndPolicy} options={{header: props => <SimpleHeader {...props} />, title: '약관'}} />
			<MyStack.Screen
				name="CategoryHelpTab"
				component={CategoryHelpTopTabNavigation}
				options={{header: props => <InputAndSearchHeader {...props} type={'help'} />}}
			/>
			<MyStack.Screen
				name="FrequentAsked"
				component={FrequentAsked}
				options={{header: props => <SimpleHeader {...props} />, title: '자주 묻는 질문'}}
			/>
			<MyStack.Screen
				name="FavoriteCommunity"
				component={FavoriteCommunity}
				options={{header: props => <SimpleHeader {...props} />, title: '커뮤니티 즐겨찾기'}}
			/>
			<MyStack.Screen
				name="MyCommunity"
				component={FavoriteCommunity}
				options={{header: props => <SimpleHeader {...props} />, title: '나의 커뮤니티 글'}}
			/>
			<MyStack.Screen
				name="FavoriteArticle"
				component={FavoriteArticle}
				options={{header: props => <SimpleHeader {...props} />, title: '자유 게시글 즐겨찾기'}}
			/>
			<MyStack.Screen
				name="FavoriteReview"
				component={FavoriteReview}
				options={{header: props => <SimpleHeader {...props} />, title: '리뷰 즐겨찾기'}}
			/>
			<MyStack.Screen
				name="FavoriteProtectRequest"
				component={FavoriteProtectRequest}
				options={{header: props => <SimpleHeader {...props} />, title: '즐겨찾은 동물 보호 게시글'}}
			/>
			<MyStack.Screen name="MyArticle" component={FavoriteArticle} options={{header: props => <SimpleHeader {...props} />, title: '나의 자유글'}} />
			<MyStack.Screen name="MyReview" component={FavoriteReview} options={{header: props => <SimpleHeader {...props} />, title: '나의 리뷰'}} />
			<MyStack.Screen name="AlarmList" component={AlarmList} options={{header: props => <SimpleHeader {...props} />, title: '소식'}} />
			<MyStack.Screen name="AlarmCommentList" component={AlarmCommentList} options={{header: props => <SimpleHeader {...props} />}} />
			<MyStack.Screen
				name={'CommunityCommentList'}
				component={CommunityCommentList}
				options={({route}) => ({
					// headerShown: false,
					header: props => <SimpleHeader {...props} />,
					title: ' ',
				})}
			/>
			<MyStack.Screen
				name={'ArticleDetail'}
				component={ArticleDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <CommunityHeader {...props} />,
					title: ' ',
				})}
			/>
			<MyStack.Screen
				name={'ReviewDetail'}
				component={ReviewDetail}
				options={({route}) => ({
					headerShown: true,
					header: props => <CommunityHeader {...props} />,
					title: ' ',
				})}
			/>
			<MyStack.Screen
				name="OpenSourceDetail"
				component={OpenSourceDetail}
				options={{header: props => <SimpleHeader {...props} />, title: '오픈소스 라이선스'}}
			/>
		</MyStack.Navigator>
	);
};
