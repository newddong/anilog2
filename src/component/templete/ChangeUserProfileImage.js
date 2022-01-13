import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AVAILABLE_NICK, DEFAULT_PROFILE, NEW_NICK_REQUEST, NEW_NICK_TITLE, NICKNAME_FORM, PREVIOUS_NICK_TITLE, UNAVAILABLE_NICK} from 'Root/i18n/msg';
import {btn_w654} from '../atom/btn/btn_style';
import AniButton from '../molecules/AniButton';
import Input24 from '../molecules/Input24';
import ProfileImageSelect from '../molecules/ProfileImageSelect';
import {login_style, btn_style, temp_style, changeUserProfileImage_style} from './style_templete';
// import {nicknameDuplicationCheck} from 'Root/api/usermenuapi';
import {updateUserInformation, nicknameDuplicationCheck} from 'Root/api/userapi';
import Modal from '../modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';

export default ChangeUserProfileImage = ({route}) => {
	// console.log('route / Profile', route.params);
	// console.log('changeUser', route.params.data);
	const [data, setData] = React.useState(route.params.data);
	const [newNick, setNewNick] = React.useState(route.params.data.user_nickname);
	const navigation = useNavigation();
	const [confirmed, setConfirmed] = React.useState(false);
	const [duplicated, setDuplicated] = React.useState(false);
	const [validateted, setValidated] = React.useState(false);
	// const [changed, setChanged] = React.useState(false);

	// React.useEffect(() => {}, [changed]);

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
					// setChanged(true);
					// console.log('profileChange success', success);
					Modal.close();
					// navigation.goBack();
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
		// navigation.dispatch(
		// 	CommonActions.reset({
		// 		index: 1,
		// 		routes: [
		// 			{name: 'UserMenu'},
		// 			{
		// 				name: 'UserInfoSetting',
		// 				params: {changedPhoto: data.user_profile_uri},
		// 			},
		// 		],
		// 	}),
		// );
	};

	const selectPhoto = () => {
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setData({...data, user_profile_uri: images.path || data.user_profile_uri});
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
		// ('* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.');
		// 영문자, 소문자, 숫자, "-","_" 로만 구성된 길이 2~10자리 사이의 문자열
		// checkDuplicateNickname(newNick);
		console.log('Dup', duplicated);
		let regExp = /^[가-힣a-zA-Z0-9_]{2,20}$/;
		setValidated(regExp.test(nick));
		// checkDuplicateNickname(nick);
		// console.log('is duplicated?', nick, regExp.test(newNick), duplicated);
		return regExp.test(nick) && !checkDuplicateNickname(nick);
		// return regExp.test(nick);
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
					<AniButton onPress={onConfirmed} btnTitle={'확인'} titleFontStyle={32} btnLayout={btn_w654} disable={confirmed ? false : true} />
				</View>
			</ScrollView>
		</View>
	);
};
ChangeUserProfileImage.defaultProps = {
	previous_nickname: 'Previous Nickname',
};
