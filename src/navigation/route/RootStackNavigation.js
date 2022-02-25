import React from 'react';
import {SafeAreaView, View, Dimensions, Text, StyleSheet} from 'react-native';
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
import AddPhoto from 'Templete/media/AddPhoto';
import AddressSearch from 'Templete/search/AddressSearch';
import AssignPetProfileImage from 'Templete/pet/AssignPetProfileImage';
import AssignPetInfoA from 'Templete/pet/AssignPetInfoA';
import AssignPetInfoB from 'Templete/pet/AssignPetInfoB';

import MainTabNavigation from './main_tab/MainTabNavigation';
import SearchTabNavigation from './search_tab/SearchTabNavigation';

import {PIC_SELECTION} from 'Root/i18n/msg';
import FeedList from 'Templete/feed/FeedListForHashTag';

import SimpleHeader from 'Navigation/header/SimpleHeader';
import SendHeader from '../header/SendHeader';
import UserVerification from 'Templete/user/UserVerification';
import FeedWriteHeader from 'Navigation/header/FeedWriteHeader';
import BookmarkHeader from 'Navigation/header/BookmarkHeader';

import Modal from 'Component/modal/Modal';
import InputAndSearchHeader from '../header/InputAndSearchHeader';
import RequestLogin from 'Templete/login/RequestLogin';
import AddVolunteers from 'Root/component/templete/volunteer/AddVolunteers';
import FindAccount from 'Root/component/templete/user/FindAccount';
import SuggestAssign from 'Root/component/templete/login/SuggestAssign';
import PasswordResetIdentification from 'Root/component/templete/login/PasswordResetIdentification';
import PasswordReset from 'Root/component/templete/user/PasswordReset';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import GeoLocationAPI from 'Root/component/templete/search/GeoLocationSearch';
import GeoLocationSearch from 'Root/component/templete/search/GeoLocationSearch';

import {useModal} from './useModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Camera from 'Root/component/templete/Camera';
// import Camera from 'Templete/media/Camera';
const RootStack = createStackNavigator();

export default RootStackNavigation = () => {

	const [isPop, popupComponent] = useModal();
	const [isAutoLogin, setAutoLogin] = React.useState(false);

	React.useEffect(() => {
		AsyncStorage.getItem('userSetting', (err, result) => {
			if (result) {
				console.log('오토로그인', result);
				setAutoLogin(false);
			}
			console.log('오토', result)
		});
	},[]);

	if (isAutoLogin) {
		return (
			<SafeAreaView>
				<Text>자동로그인중</Text>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={{flex: 1}}>
				<NavigationContainer
					onStateChange={() => {
						Modal.close();
					}}>
					<RootStack.Navigator initialRouteName="Login">
						{/* <RootStack.Screen name="MainTab" component={MainTabNavigation} options={{header: props => <LogoutView {...props} />}} /> */}
						<RootStack.Screen name="MainTab" component={MainTabNavigation} options={{headerShown: false}} />
						<RootStack.Screen name="Login" component={LoginTemplete} options={{headerShown: false}} />

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
							name="FindAccount"
							component={FindAccount}
							options={{header: props => <SimpleHeader {...props} />, title: '내 계정 찾기'}}
						/>
						<RootStack.Screen
							name="SuggestAssign"
							component={SuggestAssign}
							options={{header: props => <SimpleHeader {...props} />, title: '내 계정 찾기'}}
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
						<RootStack.Screen name="FeedMediaTagEdit" component={FeedMediaTagEdit} />
						<RootStack.Screen
							name="FeedWrite"
							component={FeedWrite}
							options={{header: props => <FeedWriteHeader {...props} />, title: '게시물 작성'}}
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
						<RootStack.Screen name="LocationPicker" component={LocationPicker} />

						{/* 카메라 관련 기능은 네이티브 모듈이 안정화 혹은 자체 개발이 될때까지 추가 보류 */}
						{/* <RootStack.Screen name="SinglePhotoSelect" component={PhotoSelect} /> */}
						{/* <RootStack.Screen name="SinglePhotoSelect" component={AddPhoto} /> */}
						{/* <RootStack.Screen name="MultiPhotoSelect" component={PhotoSelect} /> */}
						<RootStack.Screen name="MultiPhotoSelect" component={AddPhoto} />
						{/* 카메라 컴포넌트 임시 추가 */}
						<RootStack.Screen name="FeedListForHashTag" component={FeedListForHashTag} options={{header: props => <BookmarkHeader {...props} />}} />

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
						<RootStack.Screen name="RequestLogin" component={RequestLogin} />
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
