import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from 'Templete/profile/Profile';
import FeedList from 'Templete/feed/FeedList';
import FeedListForHashTag from 'Templete/feed/FeedListForHashTag';
import FeedCommentList from 'Templete/feed/FeedCommentList';

import UserInfoDetailSettting from 'Templete/user/UserInfoDetailSettting';
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
import SaveFavorite from 'Templete/favorite/SaveFavorite';
import SaveAnimalRequest from 'Templete/protection/SaveAnimalRequest';
import FavoriteFeeds from 'Templete/favorite/FavoriteFeeds';
import AppliesRecord from 'Templete/my/AppliesRecord';
import ApplyAdoptionList from 'Templete/list/ApplyAdoptionList';
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
import ProtectApplicant from 'Templete/protection/ProtectApplicant';
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
import MeatBallHeader from 'Root/navigation/header/MeatBallHeader';
import SocialRelationTopTabNavigation from '../protection_stack/socialRelation_tab/SocialRelationTopTabNavigation';
import SendHeader from 'Root/navigation/header/SendHeader';
import SimpleHeader from 'Root/navigation/header/SimpleHeader';
import LogoHeader from 'Root/navigation/header/LogoHeader';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import {useNavigation} from '@react-navigation/core';
import userGlobalObject from 'Root/config/userGlobalObject';

const MyStack = createStackNavigator();

export default MyStackNavigation = props => {
	// console.log('MyStack', props.navigation);
	const [searchInput, setSearchInput] = React.useState();

	React.useEffect(() => {
		setSearchInput(props.route.params); //검색어 입력 전달
	}, [props.route.params]);

	return (
		<MyStack.Navigator initialRouteName={userGlobalObject.userInfo.user_type == 'shelter' ? 'ShelterMenu' : 'UserMenu'}>
			{/* // <MyStack.Navigator initialRouteName={'ShelterMenu'}> */}
			<MyStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <MeatBallHeader {...props} />, title: '피드 게시글'}} />
			<MyStack.Screen name="UserFeeds" component={FavoriteFeeds} options={{header: props => <SimpleHeader {...props} />, title: '내 게시글'}} />
			<MyStack.Screen name="HashFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '#반려동물'}} />
			<MyStack.Screen name="ProtectAnimalFeedList" component={FeedList} />
			<MyStack.Screen name="UserTagFeedList" component={FeedList} />
			<MyStack.Screen
				name="UserProfile"
				component={Profile}
				options={{header: props => <MeatBallHeader {...props} menu={['신고하기', '신고']} />, title: '프로필'}}
			/>
			<MyStack.Screen
				name="AnimalProtectRequestDetail"
				component={AnimalProtectRequestDetail}
				options={{header: props => <SimpleHeader {...props} />}}
			/>
			<MyStack.Screen
				name="FeedListForHashTag"
				component={FeedListForHashTag}
				options={{header: props => <SimpleHeader {...props} />, title: '#반려동물'}}
			/>
			<MyStack.Screen name="SocialRelation" component={SocialRelationTopTabNavigation} options={{header: props => <SimpleHeader {...props} />}} />
			<MyStack.Screen name="UserMenu" component={UserMenu} options={{header: props => <SimpleHeader {...props} />, title: 'MY'}} />
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
			<MyStack.Screen name="PetInfoSetting" component={PetInfoSetting} options={{header: props => <SimpleHeader {...props} />, title: ''}} />
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
			<MyStack.Screen name="SelectAccount" options={{header: props => <InputAndSearchHeader {...props} />, title: ''}}>
				{props => <SelectAccount {...props} input={searchInput} prevNav={props.route.params.prevNav} />}
			</MyStack.Screen>
			{/* <MyStack.Screen name="SelectAccount" component={SelectAccount} options={{header: props => <InputAndSearchHeader {...props} />}} /> */}
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
			<MyStack.Screen name="SaveFavorite" component={SaveFavorite} options={{header: props => <SimpleHeader {...props} />, title: '친구 즐겨찾기'}} />
			<MyStack.Screen
				name="UserSaveAnimalRequest"
				component={SaveAnimalRequest}
				options={{header: props => <SimpleHeader {...props} />, title: '보호요청 저장'}}
			/>
			<MyStack.Screen
				name="ShelterSaveAnimalRequest"
				component={SaveAnimalRequest}
				options={{header: props => <SimpleHeader {...props} />, title: '보호요청 저장'}}
			/>
			<MyStack.Screen
				name="FavoriteFeeds"
				component={FavoriteFeeds}
				options={{header: props => <SimpleHeader {...props} />, title: '피드 즐겨찾기'}}
			/>
			<MyStack.Screen name="FavoriteFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />, title: '즐겨찾기'}} />
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
			<MyStack.Screen name="SinglePhotoSelect" component={PhotoSelect} />

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
				name="ShelterProtectAnimalList"
				component={AidRequestManage}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 동물 목록'}}
			/>
			<MyStack.Screen
				name="ProtectApplyList"
				component={AidRequestManage}
				options={{header: props => <SimpleHeader {...props} />, title: '신청서 조회'}}
			/>
			<MyStack.Screen
				name="ProtectApplicant"
				component={ProtectApplicant}
				options={{header: props => <SimpleHeader {...props} />, title: '보호 활동 신청자'}}
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
		</MyStack.Navigator>
	);
};
