import React from 'react';
import TwoBtnModal from 'Molecules/modal/TwoBtnModal';
import OneBtnModal from 'Molecules/modal/OneBtnModal';
import NoBtnModal from 'Molecules/modal/NoBtnModal';
import RollingSelect from 'Molecules/select/RollingSelect';
import FeedAvartarSelect from 'Molecules/select/FeedAvartarSelect';
import KeyBoardInputBackGround from 'Molecules/input/KeyboardInputBackGround';

import Modal from 'Component/modal/Modal';

import Calendar from 'Molecules/calendar/calendar';
import RadioSelectModal from 'Molecules/modal/RadioSelectModal';
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
import InterestTagModal from 'Root/component/molecules/modal/InterestTagModal';
import AvatarSelectModal from 'Root/component/molecules/modal/AvatarSelectModal';
import InformationModal from 'Root/component/molecules/modal/InformationModal';
import MessageModal from 'Root/component/molecules/modal/MessageModal';
import DropdownModal from 'Root/component/molecules/modal/DropdownModal';
import ShareModal from 'Root/component/molecules/modal/ShareModal';
import SelectMultipleScrollBoxModal from 'Root/component/molecules/modal/SelectMultipleScrollBoxModal';
import AddFamilyModal from 'Root/component/molecules/modal/AddFamilyModal';
import CongratulationModal from 'Root/component/molecules/modal/CongratulationModal';
import AdoptionInfoModal from 'Root/component/molecules/modal/AdoptionInfoModal';
import AdoptionInfoModalWithOneBtn from 'Root/component/molecules/modal/AdoptionInfoModalWithOneBtn';
import AnimalToRegisterModal from 'Root/component/molecules/modal/AnimalToRegisterModal';
import PhotoListViewModal from 'Root/component/molecules/modal/PhotoListViewModal';
import Loading from 'Root/component/molecules/modal/Loading';
import AvatarSelectFromWriteModal from 'Root/component/molecules/modal/AvatarSelectFromWriteModal';
import LoginRequestModal from 'Root/component/molecules/modal/LoginRequestModal';
import ReviewFilterModal from 'Root/component/molecules/modal/ReviewFilterModal';
import ProtectRequestFilterModal from 'Root/component/molecules/modal/ProtectRequestFilterModal';
import NetworkErrorModal from 'Root/component/molecules/modal/NetworkErrorModal';
import UrgentBtnModal from 'Root/component/molecules/modal/UrgentBtnModal';

export function useModal() {
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
	Modal.popTwoBtn = (msg, noMsg, yesMsg, onNo, onYes, onClose) => {
		popIn(<TwoBtnModal popUpMsg={msg} onNo={onNo} onYes={onYes} noMsg={noMsg} yesMsg={yesMsg} onClose={onClose} />);
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

	Modal.popCalendar = (visible, onOff, date, past, future, multiple, previous, maxLength) => {
		// console.log('Multi', multiple);
		multiple
			? popIn(
					<Calendar_Multiple
						modalOn={visible}
						modalOff={onOff}
						selectDate={date}
						past={past}
						future={future}
						previous={previous}
						maxLength={maxLength}
					/>,
			  )
			: popIn(<Calendar modalOn={visible} modalOff={onOff} selectDate={date} past={past} future={future} previous={previous} />);
		!isPop && setPop(true);
	};

	Modal.rollingSelect = (title, items = [''], onSelect, onCancel = Modal.close) => {
		popIn(<RollingSelect title={title} items={items} onSelect={onSelect} onCancel={onCancel} />);
		!isPop && setPop(true);
	};

	Modal.feedAvartarSelect = (onSelectPet, onOk, okButtonnMsg) => {
		popIn(<FeedAvartarSelect onSelectPet={onSelectPet} onOk={onOk} okButtonnMsg={okButtonnMsg} />);
		!isPop && setPop(true);
	};

	Modal.popAvatarSelectModal = (onSelectPet, okButtonnMsg, isWriteMode) => {
		popIn(<AvatarSelectModal onSelectPet={onSelectPet} okButtonnMsg={okButtonnMsg} isWriteMode={isWriteMode} />);
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

	Modal.popRadioSelect = (offset, items, current, title, onSelect, onClose) => {
		popIn(<RadioSelectModal offset={offset} items={items} current={current} title={title} onSelect={onSelect} onClose={onClose} />);
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

	Modal.popMultipleScrollBoxModal = (data, header, onSelect, onClose) => {
		popIn(<SelectMultipleScrollBoxModal data={data} header={header} onSelect={onSelect} onClose={onClose} />);
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

	Modal.popSelectBoxModal2 = (data, onSelect, onClose, headerRoof, headerTitle, height) => {
		popIn(
			<SelectBoxModal
				data={data}
				onSelect={onSelect}
				onClose={onClose}
				headerRoof={headerRoof}
				headerTitle={headerTitle}
				scrollEnabled={true}
				boxHeight={height}
			/>,
		);
		!isPop && setPop(true);
	};

	Modal.popInformationModal = (data, onClose, onPressEdit) => {
		popIn(<InformationModal data={data} onClose={onClose} onPressEdit={onPressEdit} />);
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

	Modal.popAdoptionInfoModal = (data, msg, yesMsg, noMsg, onYes, onNo) => {
		popIn(<AdoptionInfoModal msg={msg} yesMsg={yesMsg} noMsg={noMsg} data={data} onYes={onYes} onNo={onNo} />);
		!isPop && setPop(true);
	};

	Modal.popAnimalToRegisterModal = (data, msg, yesMsg, noMsg, onYes, onNo) => {
		popIn(<AnimalToRegisterModal msg={msg} yesMsg={yesMsg} noMsg={noMsg} data={data} onYes={onYes} onNo={onNo} />);
		!isPop && setPop(true);
	};

	Modal.popAdoptionInfoModalWithOneBtn = (data, yesMsg, onYes) => {
		popIn(<AdoptionInfoModalWithOneBtn yesMsg={yesMsg} data={data} onYes={onYes} />);
		!isPop && setPop(true);
	};

	Modal.popSocialModal = (onPressKakao, onPressLinkCopy, onPressMsg) => {
		popIn(<SocialModal onPressKakao={onPressKakao} onPressLinkCopy={onPressLinkCopy} onPressMsg={onPressMsg} />);
		!isPop && setPop(true);
	};

	Modal.popInterestTagModal = (category, data, onSave, onClose, setState) => {
		popIn(<InterestTagModal category={category} data={data} onSave={onSave} onClose={onClose} setState={setState} />);
		!isPop && setPop(true);
	};

	Modal.popReviewFilterModal = (category, data, onSave, onClose, setState) => {
		popIn(<ReviewFilterModal category={category} data={data} onSave={onSave} onClose={onClose} setState={setState} />);
		!isPop && setPop(true);
	};

	Modal.popMessageModal = (receiver, onSend, onClose) => {
		popIn(<MessageModal receiver={receiver} onSend={onSend} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popDropdownModal = (offset, menu, onPressMenu, onClose) => {
		popIn(<DropdownModal offset={offset} menu={menu} onPressMenu={onPressMenu} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popShareModal = (offset, onPressKakao, onPressLinkCopy, onPressMsg) => {
		popIn(<ShareModal offset={offset} onPressKakao={onPressKakao} onPressLinkCopy={onPressLinkCopy} onPressMsg={onPressMsg} />);
		!isPop && setPop(true);
	};

	Modal.popCongratulationModal = (pet_nickname, user_profile_uri) => {
		popIn(<CongratulationModal pet_nickname={pet_nickname} user_profile_uri={user_profile_uri} />);
		!isPop && setPop(true);
	};

	Modal.popPhotoListViewModal = (photoList, onClose) => {
		popIn(<PhotoListViewModal photoList={photoList} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popLoading = (isModal, timeout) => {
		popIn(<Loading isModal={isModal} timeout={timeout} />);
		!isPop && setPop(true);
	};

	Modal.popAvatarSelectFromWriteModal = (onSelectPet, onClose) => {
		popIn(<AvatarSelectFromWriteModal onSelectPet={onSelectPet} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popLoginRequestModal = onOk => {
		popIn(<LoginRequestModal onOk={onOk} />);
		!isPop && setPop(true);
	};

	Modal.popProtectRequestFilterModal = (previous, onConfirm, onClose) => {
		popIn(<ProtectRequestFilterModal previous={previous} onConfirm={onConfirm} onClose={onClose} />);
		!isPop && setPop(true);
	};

	Modal.popNetworkErrorModal = msg => {
		popIn(<NetworkErrorModal msg={msg} />);
		!isPop && setPop(true);
	};

	Modal.popUrgentBtnModal = (onReport, onMissing, layout) => {
		popIn(<UrgentBtnModal onReport={onReport} onMissing={onMissing} layout={layout} />);
		!isPop && setPop(true);
	};

	return [isPop, popupComponent];
}
