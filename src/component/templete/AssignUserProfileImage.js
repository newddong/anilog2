import React from 'react';
import {Text, View, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w522} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input30 from 'Molecules/input/Input30';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {login_style, btn_style, temp_style, progressbar_style, assignUserProfileImage_style} from './style_templete';
import Modal from 'Component/modal/Modal';
import {launchImageLibrary} from 'react-native-image-picker';
import {assignUser, nicknameDuplicationCheck} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';

export default AssignUserProfileImage = props => {
	const [imgSelected, setImgSelected] = React.useState();
	const [nickname, setNickname] = React.useState('');
	const [confirmed, setConfirmed] = React.useState(false);

	const selectPhoto = () => {
		// props.navigation.push('SinglePhotoSelect');
		// launchImageLibrary(
		// 	{
		// 		mediaType: 'photo',
		// 		selectionLimit: 1,
		// 	},
		// 	responseObject => {
		// 		console.log('선택됨', responseObject);
		// 		responseObject.didCancel ? console.log('선택취소') : setImgSelected(responseObject.assets[responseObject.assets.length - 1].uri);
		// 	},
		// );
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setImgSelected(images.path);
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	//확인버튼
	const pressConfirm = () => {
		let params = {...props.route.params, user_nickname: nickname, user_profile_uri: imgSelected};
		nicknameDuplicationCheck(
			{user_nickname: params.user_nickname},
			result => {
				if (result.msg) {
					Modal.popOneBtn('이미 사용자가 있는 닉네임입니다.', '확인', () => Modal.close());
				} else {
					assign(params);
				}
			},
			error => {
				Modal.popOneBtn(error, '확인', () => Modal.close());
			},
		);
	};

	const assign = params => {
		Modal.popNoBtn('등록중입니다.');
		assignUser(
			params,
			successmsg => {
				Modal.close(); //NoBtn팝업 종료
				Modal.popTwoBtn(
					'회원가입이 완료되었습니다. 반려동물을 등록하시겠습니까?',
					'나중에 등록',
					'반려동물 등록',
					() => {
						Modal.close();
						//네비게이션 초기화, 로그인으로 이동
						props.navigation.reset({
							index: 0,
							routes: [{name: 'Login'}],
						});
					},
					() => {
						Modal.close();
						//네비게이션 초기화, 동물 등록으로 이동
						props.navigation.reset({
							index: 1,
							routes: [{name: 'Login'}, {name: 'AssignPetProfileImage', params: {userobject_id: successmsg.msg._id, previousRouteName: 'Login'}}],
						});
					},
				);
			},
			errormsg => {
				Modal.close();
				//에러메세지 표시
				Modal.popOneBtn(errormsg, '확인', () => {
					Modal.close();
				});
			},
		);
	};

	//중복 처리
	const checkDuplicateNickname = nick => {
		if (true) {
			return true;
		} else return false;
	};
	const onNicknameChange = text => {
		console.log('닉네임', text);
		setNickname(text);
	};

	//닉네임 Validation
	const nickName_validator = text => {
		// ('* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.');
		// var regExp = /^(?=.*\d)(?=.*[a-zA-Zㄱ-ㅎ가-힣])[0-9a-zA-Z]{1,15}$/;
		// var regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,15}$/;
		// var regExp = /^[a-z0-9_-]{2,10}$/ ;
		if (text) {
			var blank_pattern = /\s/g;
			let regExp = /^[가-힣a-zA-Z0-9_]{2,20}$/;
			let regExSpace = text.search(/\s/);
			console.log('regexSPa', regExSpace);
			return regExp.test(text) && checkDuplicateNickname(text) && !blank_pattern.test(text);
		} else {
			return false;
		}
	};

	const onNicknameValid = isValid => {
		console.log('onNicknameValid', isValid);
		setConfirmed(isValid);
	};

	//반려동물 등록 from 모달창 아직 미구현
	const goAssignPet = () => {
		console.log();
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'position'} contentContainerStyle={{alignItems: 'center'}}>
			{/* contentContainerStyle​ : The style of the content container (View) when behavior is 'position'. */}
			{/* Text Msg */}
			<View style={[temp_style.textMsg_AssignUserProfileImage, assignUserProfileImage_style.txt_msg]}>
				<Text style={[txt.noto24]}>프로필 사진과 닉네임은 나중에도 변경 할 수 있어요.</Text>
			</View>

			{/* (M)ProfileImageSelect */}
			<View style={[temp_style.profileImageSelect, assignUserProfileImage_style.profileImageSelect]}>
				<ProfileImageSelect onClick={selectPhoto} selectedImageUri={imgSelected} />
			</View>

			{/* (M)Input30 */}
			<View style={[temp_style.input30_assignUserProfileImage, assignUserProfileImage_style.input30]}>
				<Input30
					value={nickname}
					showTitle={true}
					title={'닉네임'}
					description={'* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.'}
					width={654}
					confirm_msg={'사용 가능한 닉네임입니다.'}
					alert_msg={'사용 불가능한 닉네임입니다.'}
					placeholder={'닉네임을 입력해주세요.'}
					validator={nickName_validator}
					onChange={onNicknameChange}
					onValid={onNicknameValid}
					confirm={nickName_validator}
					maxLength={15}
					showmsg
				/>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, assignUserProfileImage_style.btn_w654]}>
				{confirmed ? (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} btnTheme={'shadow'} btnLayout={btn_w522} onPress={pressConfirm} />
				) : (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} disable={true} btnLayout={btn_w522} />
				)}
			</View>
		</KeyboardAvoidingView>
	);
};
