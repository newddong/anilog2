import React from 'react';
import {SafeAreaView, View, Dimensions, Text, StyleSheet, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginTemplete from 'Templete/login/LoginTemplete';

import AgreementCheck from 'Templete/user/AgreementCheck';
import UserPasswordCheck from 'Templete/user/UserPasswordCheck';
import AssignUserHabitation from 'Templete/user/AssignUserHabitation';
import AssignUserProfileImage from 'Templete/user/AssignUserProfileImage';

import ShelterCodeCheck from 'Templete/shelter/ShelterCodeCheck';
import ShelterAssignEntrance from 'Templete/shelter/ShelterAssignEntrance';
import AssignShelterAddress from 'Templete/shelter/AssignShelterAddress';
import AssignShelterInformation from 'Templete/shelter/AssignShelterInformation';
import CheckShelterPassword from 'Templete/shelter/CheckShelterPassword';
import AssignShelterProfileImage from 'Templete/shelter/AssignShelterProfileImage';

import ApplyCompanionA from 'Templete/pet/ApplyCompanionA';
import ApplyCompanionB from 'Templete/pet/ApplyCompanionB';
import ApplyCompanionC from 'Templete/pet/ApplyCompanionC';
import ApplyCompanionD from 'Templete/pet/ApplyCompanionD';
import ApplyDetails from 'Templete/protection/ApplyDetails';

import ApplyVolunteer from 'Templete/volunteer/ApplyVolunteer';
import FeedMediaTagEdit from 'Templete/feed/FeedMediaTagEdit';
import FeedWrite from 'Templete/feed/FeedWrite';
import LocationPicker from 'Templete/search/LocationPicker';

import PhotoSelect from 'Templete/media/PhotoSelect';
import Crop from 'Templete/media/Crop';
import AddPhoto from 'Templete/media/AddPhoto';
import AddressSearch from 'Templete/search/AddressSearch';
import AssignPetProfileImage from 'Templete/pet/AssignPetProfileImage';
import AssignPetInfoA from 'Templete/pet/AssignPetInfoA';
import AssignPetInfoB from 'Templete/pet/AssignPetInfoB';

import MainTabNavigation from './main_tab/MainTabNavigation';
import SearchTabNavigation from './search_tab/SearchTabNavigation';
import AccountPicker from 'Templete/search/AccountPicker';

import {PIC_SELECTION} from 'Root/i18n/msg';

import SimpleHeader from 'Navigation/header/SimpleHeader';
import SendHeader from '../header/SendHeader';
import UserVerification from 'Templete/user/UserVerification';
import FeedWriteHeader from 'Navigation/header/FeedWriteHeader';
import BookmarkHeader from 'Navigation/header/BookmarkHeader';
import ConfirmHeader from 'Navigation/header/ConfirmHeader';
import PhotoSelectHeader from 'Navigation/header/PhotoSelectHeader';
import CropHeader from 'Navigation/header/CropHeader';

import Modal from 'Component/modal/Modal';
import InputAndSearchHeader from 'Root/navigation/header/InputAndSearchHeader';
import RequestLogin from 'Templete/login/RequestLogin';
import AddVolunteers from 'Root/component/templete/volunteer/AddVolunteers';
import PasswordResetIdentification from 'Root/component/templete/login/PasswordResetIdentification';
import PasswordReset from 'Root/component/templete/user/PasswordReset';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import GeoLocationSearch from 'Root/component/templete/search/GeoLocationSearch';

import {useModal} from './useModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import SearchMap from 'Root/component/templete/search/SearchMap';
import Profile from 'Templete/profile/Profile';
import UserNotePage from 'Templete/user/UserNotePage';
import FeedList from 'Templete/feed/FeedList';
import TermsAndPolicy from 'Root/component/templete/user/TermsAndPolicy';
import Certification from 'Root/component/templete/login/Certification';
import ShelterAsk from 'Root/component/templete/shelter/ShelterAsk';
import ReportDetail from 'Root/component/templete/missing/ReportDetail';
import MissingAnimalDetail from 'Root/component/templete/missing/MissingAnimalDetail';
import SimpleWithMeatballHeader from '../header/SimpleWithMeatballHeader';
import ProfileHeader from '../header/ProfileHeader';
import FollowerList from 'Root/component/templete/list/FollowerList';
import PetFollowerList from 'Root/component/templete/list/PetFollowerList';
import FeedCommentList from 'Root/component/templete/feed/FeedCommentList';

const RootStack = createStackNavigator();

export default RootStackNavigation = () => {
	const [isPop, popupComponent] = useModal();
	const [isLoading, setLoading] = React.useState(true);
	const [initialRouteName, setInitialRouteName] = React.useState('Login');
	LogBox.ignoreLogs(['ViewPropTypes will be removed', 'ColorPropType will be removed', 'EdgeInsetsPropType', 'PointPropType']);

	React.useEffect(() => {
		AsyncStorage.getItem('userSetting', (err, userSetting) => {
			if (!userSetting) {
				setLoading(false);
				return;
			}
			let setting = JSON.parse(userSetting);
			if (setting.isAutoLogin == true) {
				userLogin(
					{
						login_id: setting.id,
						login_password: setting.password,
					},
					userObject => {
						if (!userObject.msg._id) {
							AsyncStorage.getItem('userInfo').then(user => {
								userGlobalObj.userInfo = JSON.parse(user);
							});
						} else {
							AsyncStorage.setItem('userInfo', JSON.stringify(userObject.msg));
							userGlobalObj.userInfo = userObject.msg;
						}
						setInitialRouteName('MainTab');
						setLoading(false);
					},
					error => {
						alert(error);
						setLoading(false);
					},
				);

				// setLoading(false);
			} else {
				setInitialRouteName('Login');
				setLoading(false);
			}
		});
	}, []);

	if (isLoading) {
		return <SafeAreaView></SafeAreaView>;
	} else {
		return (
			<SafeAreaView style={{flex: 1}}>
				<NavigationContainer
					onStateChange={() => {
						Modal.close();
					}}>
					<RootStack.Navigator initialRouteName={initialRouteName}>
						{/* <RootStack.Screen name="MainTab" component={MainTabNavigation} options={{header: props => <LogoutView {...props} />}} /> */}
						<RootStack.Screen name="MainTab" component={MainTabNavigation} options={{headerShown: false}} />
						<RootStack.Screen name="Login" component={LoginTemplete} options={{headerShown: false}} />
						<RootStack.Screen name="LoginRequired" component={LoginTemplete} options={{header: props => <SimpleHeader {...props} />, title: ' '}} />

						<RootStack.Screen
							name="AgreementCheck"
							component={AgreementCheck}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입'}}
						/>
						<RootStack.Screen
							name="UserVerification"
							component={UserVerification}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입'}}
						/>
						{/* <RootStack.Screen name="UserAssignEmail" component={UserAssignEmail} /> */}
						<RootStack.Screen
							name="UserPasswordCheck"
							component={UserPasswordCheck}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입'}}
						/>
						<RootStack.Screen
							name="AssignUserHabitation"
							component={AssignUserHabitation}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입'}}
						/>
						<RootStack.Screen
							name="AssignUserProfileImage"
							component={AssignUserProfileImage}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입'}}
						/>

						<RootStack.Screen
							name="ShelterCodeCheck"
							component={ShelterCodeCheck}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="ShelterAssignEntrance"
							component={ShelterAssignEntrance}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="AssignShelterAddress"
							component={AssignShelterAddress}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="AssignShelterInformation"
							component={AssignShelterInformation}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="CheckShelterPassword"
							component={CheckShelterPassword}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="AssignShelterProfileImage"
							component={AssignShelterProfileImage}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 등록'}}
						/>
						<RootStack.Screen
							name="PasswordResetIdentification"
							component={PasswordResetIdentification}
							options={{header: props => <SimpleHeader {...props} />, title: '비밀번호 재설정'}}
						/>
						<RootStack.Screen
							name="PasswordReset"
							component={PasswordReset}
							options={{header: props => <SimpleHeader {...props} />, title: '비밀번호 재설정'}}
						/>

						<RootStack.Screen name="ApplyProtectActivityA" component={ApplyCompanionA} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyProtectActivityB" component={ApplyCompanionB} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyProtectActivityC" component={ApplyCompanionC} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyProtectActivityD" component={ApplyCompanionD} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyProtectActivityE" component={ApplyDetails} options={{header: props => <SimpleHeader {...props} />}} />

						<RootStack.Screen name="ApplyAnimalAdoptionA" component={ApplyCompanionA} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyAnimalAdoptionB" component={ApplyCompanionB} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyAnimalAdoptionC" component={ApplyCompanionC} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyAnimalAdoptionD" component={ApplyCompanionD} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="ApplyAnimalAdoptionE" component={ApplyDetails} options={{header: props => <SimpleHeader {...props} />}} />

						<RootStack.Screen
							name="ApplyVolunteer"
							component={ApplyVolunteer}
							options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 신청'}}
						/>
						<RootStack.Screen
							name="AddVolunteers"
							component={AddVolunteers}
							options={{header: props => <SimpleHeader {...props} />, title: '봉사활동 계정 추가'}}
						/>
						<RootStack.Screen
							name="FeedMediaTagEdit"
							component={FeedMediaTagEdit}
							options={{header: props => <ConfirmHeader {...props} />, title: ''}}
						/>
						<RootStack.Screen
							name="FeedWrite"
							component={FeedWrite}
							options={{header: props => <FeedWriteHeader {...props} />, title: '게시물 작성'}}
						/>
						<RootStack.Screen
							name="FeedEdit"
							component={FeedWrite}
							options={{header: props => <FeedWriteHeader {...props} />, title: '게시물 수정'}}
						/>
						<RootStack.Screen
							name="FeedMissingWrite"
							component={FeedWrite}
							options={{header: props => <FeedWriteHeader {...props} />, title: '실종 게시물'}}
						/>
						<RootStack.Screen
							name="FeedReportWrite"
							component={FeedWrite}
							options={{header: props => <FeedWriteHeader {...props} />, title: '제보 게시물'}}
						/>
						<RootStack.Screen
							name="FeedLocationPicker"
							component={LocationPicker}
							options={{header: props => <InputAndSearchHeader {...props} type={'location'} />}}
						/>
						<RootStack.Screen
							name="CommunityLocationPicker"
							component={LocationPicker}
							options={{header: props => <InputAndSearchHeader {...props} type={'location'} />}}
						/>

						{/* 카메라 관련 기능은 네이티브 모듈이 안정화 혹은 자체 개발이 될때까지 추가 보류 */}
						{/* <RootStack.Screen name="SinglePhotoSelect" component={PhotoSelect} /> */}
						<RootStack.Screen
							name="SinglePhotoSelect"
							component={AddPhoto}
							options={{header: props => <PhotoSelectHeader {...props} />, title: ''}}
						/>
						{/* <RootStack.Screen name="MultiPhotoSelect" component={PhotoSelect} /> */}
						<RootStack.Screen name="MultiPhotoSelect" component={AddPhoto} options={{header: props => <PhotoSelectHeader {...props} />, title: ''}} />
						{/* 카메라 컴포넌트 임시 추가 */}
						<RootStack.Screen name="FeedListForHashTag" component={FeedListForHashTag} options={{header: props => <SimpleHeader {...props} />}} />
						{/* 이미지 크롭 화면 */}
						<RootStack.Screen name="Crop" component={Crop} options={{header: props => <SimpleHeader {...props} />, title: '사진 자르기'}} />
						<RootStack.Screen
							name="AssignPetProfileImage"
							component={AssignPetProfileImage}
							options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
						/>
						<RootStack.Screen
							name="AssignPetInfoA"
							component={AssignPetInfoA}
							options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
						/>
						<RootStack.Screen
							name="AssignPetInfoB"
							component={AssignPetInfoB}
							options={{header: props => <SimpleHeader {...props} />, title: '반려동물 등록'}}
						/>

						<RootStack.Screen
							name="AddressSearch"
							component={AddressSearch}
							options={{header: props => <SimpleHeader {...props} />, title: '주소 검색'}}
						/>
						<RootStack.Screen
							name="AddressSearchPage"
							component={AddressSearchPage}
							options={{header: props => <SimpleHeader {...props} />, title: '주소 검색'}}
						/>
						<RootStack.Screen
							name="GeoLocation"
							component={GeoLocationSearch}
							options={{header: props => <SimpleHeader {...props} />, title: '주소 검색'}}
						/>
						<RootStack.Screen
							name="RequestLogin"
							component={RequestLogin}
							options={{header: props => <SimpleHeader {...props} />, title: '회원가입 '}}
						/>
						<RootStack.Screen name="UserList" options={{header: props => <InputAndSearchHeader {...props} />, title: '계정'}}>
							{props => <AccountPicker {...props} /*prevNav={props.prevNav} input={searchInput} onClickUser={onClickUser}*/ />}
						</RootStack.Screen>
						<RootStack.Screen name="Profile" component={Profile} options={{header: props => <ProfileHeader {...props} />, title: '프로필'}} />
						<RootStack.Screen name="UserNotePage" component={UserNotePage} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen name="UserFeedList" component={FeedList} options={{header: props => <SimpleHeader {...props} />}} />
						<RootStack.Screen
							name="TermsAndPolicy"
							component={TermsAndPolicy}
							options={{header: props => <SimpleHeader {...props} />, title: '약관'}}
						/>
						<RootStack.Screen
							name={'FeedSearchMap'}
							component={SearchMap}
							options={({route}) => ({
								header: props => <SimpleHeader {...props} />,
								title: '위치 추가',
							})}
						/>
						<RootStack.Screen
							name="FeedAddressSearchWeb"
							component={AddressSearchPage}
							options={{header: props => <SimpleHeader {...props} />, title: '주소 설정'}}
						/>
						<RootStack.Screen
							name="Certification"
							component={Certification}
							options={{header: props => <SimpleHeader {...props} />, title: '사용자 인증'}}
						/>
						<RootStack.Screen
							name="ShelterAsk"
							component={ShelterAsk}
							options={{header: props => <SimpleHeader {...props} />, title: '보호소 문의하기'}}
						/>
						<RootStack.Screen
							name="MissingAnimalDetail"
							component={MissingAnimalDetail}
							options={{header: props => <SimpleWithMeatballHeader {...props} />}}
						/>
						<RootStack.Screen
							name="ReportDetail"
							component={ReportDetail}
							options={{header: props => <SimpleWithMeatballHeader {...props} />, title: '제보글'}}
						/>
						{/* <RootStack.Screen
							name="FeedCommentList"
							component={FeedCommentList}
							options={{header: props => <SimpleHeader {...props} />, title: '댓글'}}
						/> */}
						<RootStack.Screen
							name="FeedCommentList"
							component={FeedCommentList}
							options={{header: props => <SimpleHeader {...props} />, title: '댓글'}}
						/>
						<RootStack.Screen
							name="PetFollowerList"
							component={PetFollowerList}
							options={{header: props => <SimpleHeader {...props} />, title: ' '}}
						/>
					</RootStack.Navigator>
				</NavigationContainer>
				{isPop && <View style={popup.popupBackground}>{popupComponent}</View>}
				{/* <View style={{backgroundColor:'red',width:80,height:80}}></View> */}
			</SafeAreaView>
		);
	}
};

const popup = StyleSheet.create({
	popupBackground: {
		height: '100%',
		width: '100%',
		position: 'absolute',
	},
});
