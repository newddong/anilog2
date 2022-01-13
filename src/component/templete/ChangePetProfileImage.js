import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AVAILABLE_NICK, NEW_NICK_REQUEST, UNAVAILABLE_NICK, PREVIOUS_NICK_TITLE, NEW_NICK_TITLE} from 'Root/i18n/msg';
import {btn_w654} from 'Atom/btn/btn_style';
import Modal from '../modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {login_style, btn_style, temp_style, changePetProfileImage_style, changeUserProfileImage_style} from './style_templete';
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserInformation} from 'Root/api/userapi';

export default ChangePetProfileImage = props => {
	const navigation = useNavigation();
	const [petData, setPetData] = React.useState(props.route.params);

	const [newNick, setNewNick] = React.useState('');
	const [confirmed, setConfirmed] = React.useState(false);

	const onConfirmed = () => {
		navigation.goBack();
	};

	const selectPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		// launchImageLibrary(
		// 	{
		// 		mediaType: 'photo',
		// 		selectionLimit: 1,
		// 	},
		// 	responseObject => {
		// 		console.log('선택됨', responseObject);
		// 		responseObject.didCancel
		// 			? console.log('선택취소')
		// 			: setPetData({...petData, user_profile_uri: responseObject.assets[responseObject.assets.length - 1].uri || petData.user_profile_uri});
		// 	},
		// );
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setPetData({...petData, user_profile_uri: images.path || petData.user_profile_uri});
				setConfirmed(true);
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};
	console.log('petDetail', props.route.params);
	//중복 처리
	const checkDuplicateNickname = nick => {
		const result = true;
		return result;
	};

	//닉네임 Validation
	const nickName_validator = text => {
		setNewNick(text);
	};

	//새 닉네임 지우기 마크 클릭
	const onClearNickname = () => {
		setConfirmed(false);
	};

	const onValidName = isValid => {
		setConfirmed(isValid);
	};

	const validateNewNick = nick => {
		console.log('nic', nick);
		// ('* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.');
		// 영문자, 소문자, 숫자, "-","_" 로만 구성된 길이 2~10자리 사이의 문자열
		let regExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9_-]{2,15}$/;
		return regExp.test(nick) && checkDuplicateNickname(nick);
	};
	const onPressConfirm = () => {
		console.log('props.nv', props.navigation);
		// Modal.popNoBtn('잠시만 기다려주세요.');
		// setTimeout(() => {
		// 	Modal.close();
		// 	Modal.popNoBtn('프로필 변경이 완료되었습니다!');
		// }, 1000);
		// setTimeout(() => {
		// 	Modal.close();
		// 	navigation.goBack();
		// }, 3000);
		Modal.popNoBtn('프로필을 바꾸는 중입니다.');
		updateUserInformation(
			{
				userobject_id: petData._id,
				user_nickname: newNick == '' ? petData.user_nickname : newNick,
				// user_nickname: newNick,
				user_profile_uri: petData.user_profile_uri,
			},
			success => {
				// setChanged(true);
				console.log('profileChange success', success);
				Modal.close();
				navigation.goBack();
			},
			// console.log('userObject', userObject);
			err => {
				Modal.close();

				console.log('err', err);
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.profileImageSelect, changePetProfileImage_style.ProfileImageSelect]}>
				<ProfileImageSelect onClick={selectPhoto} selectedImageUri={petData.user_profile_uri} />
			</View>

			<View style={[temp_style.input30_changePetProfileImage, changePetProfileImage_style.input30]}>
				{/* 기존 닉네임 */}
				<View style={[temp_style.input24_changeUserProfileImage, changeUserProfileImage_style.input24]}>
					<Input24
						title={PREVIOUS_NICK_TITLE}
						value={petData.user_nickname || ''}
						defaultValue={props.route.params.user_nickname}
						width={654}
						descriptionType={'none'}
						editable={false}
						placeholder=""
						showCrossMark={false}
					/>
				</View>
				<View style={[temp_style.input24_changeUserProfileImage]}>
					{/* <Input24
						onChange={text => nickName_validator(text)}
						validator={validateNewNick}
						onValid={onValidName}
						value={newNick}
						placeholder={NEW_NICK_REQUEST}
						showMsg={true}
						alert_msg={UNAVAILABLE_NICK}
						confirm_msg={AVAILABLE_NICK}
						width={654}
						onClear={onClearNickname}
					/> */}
					<Input24
						onChange={nickName_validator}
						validator={validateNewNick}
						onValid={onValidName}
						value={newNick}
						title={NEW_NICK_TITLE}
						descriptionType={'none'}
						placeholder={NEW_NICK_REQUEST}
						showMsg={true}
						alert_msg={UNAVAILABLE_NICK}
						confirm_msg={AVAILABLE_NICK}
						width={654}
						onClear={onClearNickname}
					/>
				</View>
			</View>

			<View style={[btn_style.btn_w654, changePetProfileImage_style.btn_w654, {paddingTop: 25}]}>
				<AniButton
					onPress={onPressConfirm}
					disable={confirmed ? false : true}
					btnTitle={'확인'}
					btnTheme={'shadow'}
					titleFontStyle={32}
					btnLayout={btn_w654}
				/>
			</View>
		</View>
	);
};
