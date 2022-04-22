import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {BackHandler, ScrollView, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AVAILABLE_NICK, DEFAULT_PROFILE, NEW_NICK_REQUEST, NEW_NICK_TITLE, NICKNAME_FORM, PREVIOUS_NICK_TITLE, UNAVAILABLE_NICK} from 'Root/i18n/msg';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {login_style, btn_style, temp_style, changeUserProfileImage_style} from 'Templete/style_templete';
// import {nicknameDuplicationCheck} from 'Root/api/usermenuapi';
import {updateUserInformation, nicknameDuplicationCheck} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';

export default ChangeUserProfileImage = ({route}) => {
	// console.log('route / Profile', route.params);
	const [data, setData] = React.useState(route.params.data);
	const [newNick, setNewNick] = React.useState(route.params.data.user_nickname);
	const navigation = useNavigation();
	const [confirmed, setConfirmed] = React.useState(false);
	const [duplicated, setDuplicated] = React.useState(false);
	const [validateted, setValidated] = React.useState(false);

	const onConfirmed = () => {
		console.log('duplic', duplicated);
		if (duplicated) {
			Modal.popOneBtn('중복된 닉네임 입니다.', '확인', Modal.close);
		}
		if (!duplicated) {
			Modal.popNoBtn('프로필을 바꾸는 중입니다.');
			updateUserInformation(
				{
					userobject_id: data._id,
					user_nickname: newNick == '' ? data.user_nickname : newNick,
					// user_nickname: newNick,
					user_profile_uri: data.user_profile_uri,
				},
				success => {
					Modal.close();
					navigation.navigate({
						name: route.params.routeInfo.name,
						key: route.params.routeInfo.key,
						params: {changedPhoto: data.user_profile_uri},
						merge: true,
					});
				},
				// console.log('userObject', userObject);
				err => {
					Modal.close();

					console.log('err', err);
				},
			);
		}
	};

	const selectPhoto = () => {
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setData({...data, user_profile_uri: images.path || data.user_profile_uri});
				userGlobalObject.userInfo.user_profile_uri = images.path;
				setConfirmed(true);
				Modal.close();
			})
			.catch(err => console.log('err / ImageOpenPicker / ChangeUserProfile', err));
		Modal.close();
	};

	//중복 처리
	const checkDuplicateNickname = nick => {
		nicknameDuplicationCheck(
			{user_nickname: nick},
			isDuplicated => {
				setDuplicated(isDuplicated.msg);
			},

			err => {
				console.log('duplicated check', err);
			},
		);
	};

	//닉네임 Validation
	const nickName_validator = text => {
		setNewNick(text);
	};

	//새 닉네임 지우기 마크 클릭
	const onClearNickname = () => {
		setConfirmed(false);
	};

	//닉네임 Validation 결과 == isValid에 따른 확인버튼 활성화 여부 결정
	const onValidName = isValid => {
		setConfirmed(isValid);
	};

	const validateNewNick = nick => {
		let regExp = /^[가-힣a-zA-Z0-9_]{2,20}$/;
		setValidated(regExp.test(nick));
		return regExp.test(nick) && !checkDuplicateNickname(nick);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView contentContainerStyle={{alignItems: 'center'}}>
				<View style={[temp_style.profileImageSelect, changeUserProfileImage_style.profileImageSelect]}>
					<ProfileImageSelect selectedImageUri={data.user_profile_uri} onClick={selectPhoto} />
				</View>
				<View style={[temp_style.profileNicknameChange, changeUserProfileImage_style.profileNicknameChange]}>
					{/* 기존 닉네임 */}
					<View style={[temp_style.input24_changeUserProfileImage, changeUserProfileImage_style.input24]}>
						<Input24
							title={PREVIOUS_NICK_TITLE}
							value={data.user_nickname || ''}
							defaultValue={data.user_nickname}
							width={654}
							descriptionType={'none'}
							editable={false}
							showCrossMark={false}
						/>
					</View>
					{/* 새닉네임 */}
					<View style={[temp_style.input24_changeUserProfileImage]}>
						<Input24
							onChange={nickName_validator}
							validator={validateNewNick}
							defaultValue={data.user_nickname}
							onValid={onValidName}
							value={newNick}
							title={NEW_NICK_TITLE}
							descriptionType={'info'}
							info={NICKNAME_FORM}
							placeholder={NEW_NICK_REQUEST}
							showMsg={true}
							// showMsg={false}
							alert_msg={UNAVAILABLE_NICK}
							confirm_msg={AVAILABLE_NICK}
							width={654}
							onClear={onClearNickname}
						/>
					</View>
				</View>
				{/* 확인버튼 */}
				<View style={[btn_style.btn_w654, changeUserProfileImage_style.btn_w654]}>
					{confirmed ? (
						<AniButton
							onPress={onConfirmed}
							btnStyle={'border'}
							btnTitle={'확인'}
							titleFontStyle={32}
							btnLayout={btn_w654}
							// disable={confirmed ? false : true}
						/>
					) : (
						<AniButton
							onPress={onConfirmed}
							btnTitle={'확인'}
							titleFontStyle={32}
							btnLayout={btn_w654}
							disable
							// disable={confirmed ? false : true}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};
ChangeUserProfileImage.defaultProps = {
	previous_nickname: 'Previous Nickname',
};
