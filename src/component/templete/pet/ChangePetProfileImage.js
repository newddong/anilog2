import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {AVAILABLE_NICK, NEW_NICK_REQUEST, UNAVAILABLE_NICK, PREVIOUS_NICK_TITLE, NEW_NICK_TITLE, NICKNAME_FORM} from 'Root/i18n/msg';
import {btn_w654} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {login_style, btn_style, temp_style, changePetProfileImage_style, changeUserProfileImage_style} from 'Templete/style_templete';
import ImagePicker from 'react-native-image-crop-picker';
import {nicknameDuplicationCheck, updateUserInformation} from 'Root/api/userapi';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';

export default ChangePetProfileImage = props => {
	const navigation = useNavigation();
	const [petData, setPetData] = React.useState(props.route.params);
	const [newNick, setNewNick] = React.useState('');
	const [confirmed, setConfirmed] = React.useState(false);
	const selectPhoto = () => {
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

	let regExp = /^[가-힣a-zA-Z0-9_]{2,20}$/;

	const validateNewNick = nick => {
		return regExp.test(nick);
	};

	const onPressConfirm = () => {
		nicknameDuplicationCheck(
			{user_nickname: newNick},
			result => {
				if (result.msg) {
					Modal.alert('중복된 닉네임이 있습니다.');
				} else {
					Modal.popNoBtn('프로필을 바꾸는 중입니다.');

					updateUserInformation(
						{
							userobject_id: petData._id,
							user_nickname: newNick == '' ? petData.user_nickname : newNick,
							// user_nickname: newNick,
							user_profile_uri: petData.user_profile_uri,
						},
						success => {
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
				}
			},
			error => {
				Modal.popOneBtn(error, '확인', () => Modal.close());
			},
		);
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'position'} contentContainerStyle={{alignItems: 'center'}}>
			<View style={[temp_style.profileImageSelect, changePetProfileImage_style.ProfileImageSelect]}>
				<ProfileImageSelect onClick={selectPhoto} selectedImageUri={petData.user_profile_uri} />
			</View>

			<View style={[changePetProfileImage_style.input30]}>
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
					<Input24
						onChange={nickName_validator}
						validator={validateNewNick}
						onValid={onValidName}
						value={newNick}
						defaultValue={petData.user_nickname}
						title={NEW_NICK_TITLE}
						descriptionType={'none'}
						placeholder={NEW_NICK_REQUEST}
						showMsg={true}
						alert_msg={NICKNAME_FORM}
						confirm_msg={''}
						width={654}
						onClear={onClearNickname}
					/>
				</View>
			</View>

			<View style={[changePetProfileImage_style.btn_w654]}>
			{/* {confirmed && dupCheck ? ( */}
				{confirmed ? (
					<AniButton
						onPress={onPressConfirm}
						// disable={confirmed ? false : true}
						btnStyle={'border'}
						btnTitle={'확인'}
						titleFontStyle={32}
						btnLayout={btn_w654}
					/>
				) : (
					<AniButton onPress={onPressConfirm} disable btnTitle={'확인'} titleFontStyle={32} btnLayout={btn_w654} />
				)}
			</View>
		</KeyboardAvoidingView>
	);
};
