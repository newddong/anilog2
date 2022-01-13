import React from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginTemplete from 'Templete/LoginTemplete';

import AgreementCheck from 'Templete/AgreementCheck';
import UserPasswordCheck from 'Templete/UserPasswordCheck';
import AssignUserHabitation from 'Templete/AssignUserHabitation';
import AssignUserProfileImage from 'Templete/AssignUserProfileImage';

import ShelterCodeCheck from 'Templete/ShelterCodeCheck';
import ShelterAssignEntrance from 'Templete/ShelterAssignEntrance';
import AssignShelterAddress from 'Templete/AssignShelterAddress';
import AssignShelterInformation from 'Templete/AssignShelterInformation';
import CheckShelterPassword from 'Templete/CheckShelterPassword';
import AssignShelterProfileImage from 'Templete/AssignShelterProfileImage';

import ApplyCompanionA from 'Templete/ApplyCompanionA';
import ApplyCompanionB from 'Templete/ApplyCompanionB';
import ApplyCompanionC from 'Templete/ApplyCompanionC';
import ApplyCompanionD from 'Templete/ApplyCompanionD';
import ApplyDetails from 'Templete/ApplyDetails';

import ApplyVolunteer from 'Templete/ApplyVolunteer';
import FeedMediaTagEdit from 'Templete/FeedMediaTagEdit';
import FeedWrite from 'Templete/FeedWrite';
import LocationPicker from 'Templete/LocationPicker';

import PhotoSelect from 'Templete/PhotoSelect';
import AddPhoto from 'Templete/AddPhoto';
import AddPhotoHeader from 'Navigation/header/AddPhotoHeader';

import AddressSearch from 'Templete/AddressSearch';

import AssignPetProfileImage from 'Templete/AssignPetProfileImage';
import AssignPetInfoA from 'Templete/AssignPetInfoA';
import AssignPetInfoB from 'Templete/AssignPetInfoB';

import MainTabNavigation from './main_tab/MainTabNavigation';
import SearchTabNavigation from './search_tab/SearchTabNavigation';

import {PIC_SELECTION} from 'Root/i18n/msg';
import FeedListForHashTag from 'Root/component/templete/FeedListForHashTag';

import SimpleHeader from 'Navigation/header/SimpleHeader';
import SendHeader from '../header/SendHeader';
import UserVerification from 'Root/component/templete/UserVerification';
import FeedWriteHeader from 'Navigation/header/FeedWriteHeader';
import BookmarkHeader from 'Navigation/header/BookmarkHeader';

import TwoBtnModal from 'Molecules/modal/TwoBtnModal';
import OneBtnModal from 'Molecules/modal/OneBtnModal';
import NoBtnModal from 'Molecules/modal/NoBtnModal';
import RollingSelect from 'Molecules/select/RollingSelect';
import SelectModal from 'Molecules/modal/SelectModal';
import FeedAvartarSelect from 'Molecules/select/FeedAvartarSelect';
import KeyBoardInputBackGround from 'Molecules/KeyboardInputBackGround';

import Modal from 'Component/modal/Modal';
import Calendar from 'Root/test_sangwoo/calendar';
import InputAndSearchHeader from '../header/InputAndSearchHeader';
import LogoutView from 'Root/test_sangwoo/LogoutView';
import RequestLogin from 'Root/component/templete/RequestLogin';
import RadioSelectModal from 'Molecules/modal/RadioSelectModal';
import AddVolunteers from 'Root/component/templete/AddVolunteers';
import Calendar_Multiple from 'Root/component/molecules/Calendar_Multiple';
import InfoModal from 'Molecules/modal/InfoModal';
// import Camera from 'Root/component/templete/Camera';
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

	Modal.closeKeboard = () => {
		popIn(<KeyBoardInputBackGround />);
		!isPop && setPop(true);
	};

	Modal.alert = msg => {
		popIn(<OneBtnModal popUpMsg={msg} onOk={Modal.close} okMsg={'확인'} />);
		!isPop && setPop(true);
	};

	Modal.popRadioSelect = (items, selectMsg, exitMsg, onSelect, onExit) => {
		popIn(<RadioSelectModal items={items} selectMsg={selectMsg} exitMsg={exitMsg} onSelect={onSelect} onExit={onExit} />);
		!isPop && setPop(true);
	};

	Modal.popInfoModal = () => {
		popIn(<InfoModal />);
		!isPop && setPop(true);
	};

	// const openCalendar = () => {
	// 	console.log('openCale')
	// 	Modal.popCalendar(showCalendar, closeCalendar, date => onDateChange(date))
	// 	setShowCalendar(true);
	// };

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
