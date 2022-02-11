import React from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet} from 'react-native';
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

import TwoBtnModal from 'Molecules/modal/TwoBtnModal';
import OneBtnModal from 'Molecules/modal/OneBtnModal';
import NoBtnModal from 'Molecules/modal/NoBtnModal';
import RollingSelect from 'Molecules/select/RollingSelect';
import SelectModal from 'Molecules/modal/SelectModal';
import FeedAvartarSelect from 'Molecules/select/FeedAvartarSelect';
import KeyBoardInputBackGround from 'Molecules/input/KeyboardInputBackGround';

import Modal from 'Component/modal/Modal';
import Calendar from 'Molecules/calendar/calendar';
import InputAndSearchHeader from '../header/InputAndSearchHeader';
import RequestLogin from 'Templete/login/RequestLogin';
import RadioSelectModal from 'Molecules/modal/RadioSelectModal';
import AddVolunteers from 'Root/component/templete/volunteer/AddVolunteers';
import Calendar_Multiple from 'Root/component/molecules/calendar/Calendar_Multiple';
import ProtectedPetDetailModal from 'Root/component/molecules/modal/ProtectedPetDetailModal';
import InfoModal from 'Root/component/molecules/modal/InfoModal';
import AnimalInfoModal from 'Root/component/molecules/modal/AnimalInfoModal';
import SelectBoxModal from 'Root/component/molecules/modal/SelectBoxModal';
import SelectDateModal from 'Root/component/molecules/modal/SelectDateModal';
import SelectScrollBoxModal from 'Root/component/molecules/modal/SelectScrollBoxModal';
import SocialModal from 'Root/component/molecules/modal/SocialModal';
import TopAlarm from 'Root/component/molecules/modal/TopAlarm';
import TwoButtonSelectModal from 'Root/component/molecules/modal/TwoButtonSelectModal';
import OneButtonSelectModal from 'Root/component/molecules/modal/OneButtonSelectModal';
import FindAccount from 'Root/component/templete/user/FindAccount';
import SuggestAssign from 'Root/component/templete/login/SuggestAssign';
import PasswordResetIdentification from 'Root/component/templete/login/PasswordResetIdentification';
import PasswordReset from 'Root/component/templete/user/PasswordReset';
import AddressSearchPage from 'Root/component/templete/search/AddressSearchPage';
import InterestTagModal from 'Root/component/molecules/modal/InterestTagModal';
import AvatarSelectModal from 'Root/component/molecules/modal/AvatarSelectModal';
// import Camera from 'Root/component/templete/Camera';
// import Camera from 'Templete/media/Camera';
const RootStack = createStackNavigator();

export default RootStackNavigation = () => {
	const [isPop, setPop] = React.useState(false);
	const [popupComponent, setPopupComponent] = React.useState([]);

	/**
	 * 컴포넌트를 모달 스택에 넣음
	 *
	 * @param {React.FC} Component - 팝업할 컴포넌트
	 * @return void
	 */

	const popIn = Component => {
		const component = React.cloneElement(Component, {key: popupComponent.length});
		setPopupComponent([...popupComponent, component]);
	};

	Modal.close = () => {
		popupComponent.pop();
		setPopupComponent([...popupComponent]);
		popupComponent.length === 0 && setPop(false);
	};
	Modal.popTwoBtn = (msg, noMsg, yesMsg, onNo, onYes) => {
		popIn(<TwoBtnModal popUpMsg={msg} onNo={onNo} onYes={onYes} noMsg={noMsg} yesMsg={yesMsg} />);
		!isPop && setPop(true);
	};

	Modal.popNoBtn = msg => {
		popIn(<NoBtnModal popUpMsg={msg} />);
		!isPop && setPop(true);
	};

	Modal.popOneBtn = (msg, okMsg, onOk) => {
		popIn(<OneBtnModal popUpMsg={msg} onOk={onOk} okMsg={okMsg} />);
		!isPop && setPop(true);
	};

	Modal.popDrop = component => {
		popIn(component);
		!isPop && setPop(true);
	};

	Modal.popCalendar = (visible, onOff, date, past, future, multiple) => {
		console.log('Multi', multiple);
		multiple
			? popIn(<Calendar_Multiple modalOn={visible} modalOff={onOff} selectDate={date} past={past} future={future} />)
			: popIn(<Calendar modalOn={visible} modalOff={onOff} selectDate={date} past={past} future={future} />);
		!isPop && setPop(true);
	};

	Modal.rollingSelect = (title, items = [''], onSelect, onCancel = Modal.close) => {
		popIn(<RollingSelect title={title} items={items} onSelect={onSelect} onCancel={onCancel} />);
		!isPop && setPop(true);
	};

	Modal.popSelect = (primaryItems, secondaryItems, onOk, okButtonnMsg) => {
		popIn(<SelectModal primaryItems={primaryItems} secondaryItems={secondaryItems} onOk={onOk} okButtonnMsg={okButtonnMsg} popUpMsg={'선택 모달'} />);
		!isPop && setPop(true);
	};

	Modal.feedAvartarSelect = (onSelectPet, onOk, okButtonnMsg) => {
		popIn(<FeedAvartarSelect onSelectPet={onSelectPet} onOk={onOk} okButtonnMsg={okButtonnMsg} />);
		!isPop && setPop(true);
	};

	Modal.popAvatarSelectModal = (onSelectPet, okButtonnMsg, isBtnMode) => {
		popIn(<AvatarSelectModal onSelectPet={onSelectPet} okButtonnMsg={okButtonnMsg} isBtnMode={isBtnMode} />);
		!isPop && setPop(true);
	};

	Modal.closeKeboard = () => {
		popIn(<KeyBoardInputBackGround />);
		!isPop && setPop(true);
	};

	Modal.alert = msg => {
		popIn(<OneBtnModal popUpMsg={msg} onOk={Modal.close} okMsg={'확인'} />);
		!isPop && setPop(true);
	};

	Modal.popRadioSelect = (items, title, onSelect) => {
		popIn(<RadioSelectModal items={items} title={title} onSelect={onSelect} />);
		!isPop && setPop(true);
	};

	Modal.popInfoModal = () => {
		popIn(<InfoModal />);
		!isPop && setPop(true);
	};

	Modal.popProtectPetDetails = (data, onOk, onClose) => {
		popIn(<ProtectedPetDetailModal data={data} onOk={onOk} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popSelectScrollBoxModal = (data, header, onSelect, onClose) => {
		popIn(<SelectScrollBoxModal data={data} header={header} onSelect={onSelect} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popSelectDateModal = (header, onSelect) => {
		popIn(<SelectDateModal header={header} onSelect={onSelect} />);
		!isPop && setPop(true);
	};

	Modal.popSelectBoxModal = (data, onSelect, onClose, headerRoof, headerTitle) => {
		popIn(<SelectBoxModal data={data} onSelect={onSelect} onClose={onClose} headerRoof={headerRoof} headerTitle={headerTitle} />);
		!isPop && setPop(true);
	};

	Modal.popInformationModal = (data, onClose) => {
		popIn(<InformationModal data={data} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popAddFamilyModal = (data, onYes, onNo) => {
		popIn(<AddFamilyModal data={data} onYes={onYes} onNo={onNo} />);
		!isPop && setPop(true);
	};

	Modal.popTwoBtnSelectModal = (data, msg, onYes, onNo, noMsg, yesMsg) => {
		popIn(<TwoButtonSelectModal data={data} msg={msg} onYes={onYes} onNo={onNo} noMsg={noMsg} yesMsg={yesMsg} />);
		!isPop && setPop(true);
	};

	Modal.popOneBtnSelectModal = (data, msg, onYes, yesMsg) => {
		popIn(<OneButtonSelectModal data={data} msg={msg} onYes={onYes} yesMsg={yesMsg} />);
		!isPop && setPop(true);
	};

	Modal.popTopAlarm = (data, onClose) => {
		popIn(<TopAlarm data={data} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popAnimalInfoModal = (data, onPressAdoptorInfo, onPressReqeustInfo) => {
		popIn(<AnimalInfoModal data={data} onPressAdoptorInfo={onPressAdoptorInfo} onPressReqeustInfo={onPressReqeustInfo} />);
		!isPop && setPop(true);
	};

	Modal.popAdoptionInfoModal = (data, onYes, onNo) => {
		popIn(<AdoptionInfoModal data={data} onYes={onYes} onNo={onNo} />);
		!isPop && setPop(true);
	};

	Modal.popSocialModal = (onPressKakao, onPressLinkCopy, onPressMsg) => {
		popIn(<SocialModal onPressKakao={onPressKakao} onPressLinkCopy={onPressLinkCopy} onPressMsg={onPressMsg} />);
		!isPop && setPop(true);
	};

	Modal.popInterestTagModal = (data, onSave, onClose) => {
		popIn(<InterestTagModal data={data} onSave={onSave} onClose={onClose} />);
		!isPop && setPop(true);
	};

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
					<RootStack.Screen name="RequestLogin" component={RequestLogin} />
				</RootStack.Navigator>
			</NavigationContainer>

			{isPop && <View style={popup.popupBackground}>{popupComponent}</View>}
			{/* <View style={{backgroundColor:'red',width:80,height:80}}></View> */}
		</SafeAreaView>
	);
};

const popup = StyleSheet.create({
	popupBackground: {
		height: '100%',
		width: '100%',
		position: 'absolute',
	},
});
