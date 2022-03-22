import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {btn_w654} from 'Atom/btn/btn_style';
import {Check50, Rect50_Border} from 'Atom/icon';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import Input30 from 'Molecules/input/Input30';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import Stagebar from 'Molecules/info/Stagebar';
import {stagebar_style} from 'Organism/style_organism copy';
import {login_style, btn_style, temp_style, progressbar_style, assignPetProfileImage_style} from 'Templete/style_templete';
import {launchImageLibrary} from 'react-native-image-picker';
import {checkProtectPet, getAnimalListNotRegisterWithCompanion, nicknameDuplicationCheck} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';

export default AssignPetProfileImage = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({
		user_profile_uri: '',
		user_nickname: '',
		pet_status: 'companion', //입양, 임시보호중인 동물일때는 초기값을 다르게 표기하도록(여기서는 임시보호, 반려동물 상태밖에 없음,입양된 동물은 더이상 정보수정 불가)
		pet_is_temp_protection: false,
		userobject_id: userGlobalObject.userInfo._id,
		previousRouteName: route.params?.previousRouteName,
	});
	const [confirmed, setConfirmed] = React.useState(false); // 닉네임 폼 Validator 통과 ?
	const [protect, setProtect] = React.useState(false); // 임시보호 동물 T/F
	const [isAdoptRegist, setIsAdoptRegist] = React.useState(false);

	const nicknameInput = React.useRef();

	React.useEffect(() => {
		getAnimalListNotRegisterWithCompanion(
			{},
			result => {
				// console.log('result / getAnimalListNotRegisterWithCompanion / AssignPetProfileImage : ', result.msg.length);
				if (result.msg != undefined) {
					if (result.msg.length == 1) {
						//한마리의 입양 임보 대기 동물이 있을 경우
						Modal.popAnimalToRegisterModal(
							result.msg,
							'새로 입양하시는 동물이 있습니다. \n 해당 동물을 등록하시겠습니까?',
							'등록',
							'아니오',
							() => {
								// console.log('Selected Object', result.msg[i]);
								const selectedAnimal = result.msg[0];
								const isProtect = selectedAnimal.protect_animal_status == 'protect'; //입양 임보 확정 동물이 임시보호인가?
								setIsAdoptRegist(true);
								setData({
									user_profile_uri: selectedAnimal.protect_animal_photo_uri_list[0],
									user_nickname: '',
									pet_status: isProtect ? 'protect' : 'companion',
									pet_is_temp_protection: isProtect ? true : false,
									pet_neutralization: selectedAnimal.protect_animal_neutralization,
									pet_sex: selectedAnimal.protect_animal_sex,
									pet_species: selectedAnimal.protect_animal_species,
									pet_species_detail: selectedAnimal.protect_animal_species_detail,
									pet_weight: selectedAnimal.protect_animal_weight,
									protect_act_protect_animal_id: selectedAnimal._id,
									protect_animal_status: isProtect ? 'registered_protect' : 'registered_adopt',
									userobject_id: userGlobalObject.userInfo._id,
									previousRouteName: route.params?.previousRouteName,
								});
								console.log('isProtect', isProtect);
								isProtect ? setProtect(true) : setProtect(false);
								nicknameInput.current.focus();
								Modal.close();
							},
							() => {
								Modal.close();
							},
						);
					} else if (result.msg.length > 1) {
						//두 개 이상의 입양 임보 대기 동물이 있을 경우
						Modal.popAnimalToRegisterModal(
							result.msg,
							'새로 입양하시는 동물들이 있습니다. \n 한 마리씩 등록 해주세요. \n 지금 등록하시겠습니까?',
							'등록',
							'아니오',
							i => {
								// console.log('Selected Object', result.msg[i]);
								const selectedAnimal = result.msg[i];
								const isProtect = selectedAnimal.protect_animal_status == 'protect'; //입양 임보 확정 동물이 임시보호인가?
								console.log('selectedAnimal.protect_animal_photo_uri_list[0]', selectedAnimal.protect_animal_photo_uri_list);

								setIsAdoptRegist(true);
								setData({
									user_profile_uri: selectedAnimal.protect_animal_photo_uri_list[0],
									user_nickname: '',
									pet_status: isProtect ? 'protect' : 'companion',
									pet_is_temp_protection: isProtect ? true : false,
									pet_neutralization: selectedAnimal.protect_animal_neutralization,
									pet_sex: selectedAnimal.protect_animal_sex,
									pet_species: selectedAnimal.protect_animal_species,
									pet_species_detail: selectedAnimal.protect_animal_species_detail,
									pet_weight: selectedAnimal.protect_animal_weight,
									protect_act_protect_animal_id: selectedAnimal._id,
									protect_animal_status: isProtect ? 'registered_protect' : 'registered_adopt',
									userobject_id: userGlobalObject.userInfo._id,
									previousRouteName: route.params?.previousRouteName,
								});
								console.log('isProtect', isProtect);
								isProtect ? setProtect(true) : setProtect(false);
								nicknameInput.current.focus();
								Modal.close();
							},
							() => {
								Modal.close();
							},
						);
					}
				}
			},
			err => {
				console.log('err / getAnimalListNotRegisterWithCompanion / AssignPetProfileImage  : ', err);
			},
		);
	}, []);

<<<<<<< HEAD:src/component/templete/pet/AssignPetProfileImage.js
	React.useEffect(() => {
		//추가로 등록할 반려동물이 있나요? 에서 '추가 등록'을 눌렀을 경우 저장되어 있는 state값을 지워야함
		if (route.params?.initialization) {
			console.log('Initialization');
			setData({
				user_profile_uri: '',
				user_nickname: '',
				pet_status: 'companion', //입양, 임시보호중인 동물일때는 초기값을 다르게 표기하도록(여기서는 임시보호, 반려동물 상태밖에 없음,입양된 동물은 더이상 정보수정 불가)
				pet_is_temp_protection: false,
				userobject_id: route.params?.userobject_id,
				previousRouteName: route.params?.previousRouteName,
			});
		}
	}, []);

	const nicknameInput = React.useRef();

=======
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/AssignPetProfileImage.js
	//닉네임 Validation
	const nickName_validator = text => {
		// ('* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.');
		let regExp = /^[\w\ㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
		let blank_pattern = /\s/g;
		console.log('nickname valid', regExp.test(text));
		return regExp.test(text) && !blank_pattern.test(text);
	};

	//임시보호 동물 체크박스 클릭(코드 보완 필요, 가독성이 좋지 않음)
	const onPressCheckBox = () => {
		setProtect(!protect);
		const petStatus = !protect ? 'protect' : 'companion';
		setData({...data, pet_status: petStatus, pet_is_temp_protection: !protect});
	};

	//프로필이미지 클릭 시 PhotoSelect로 이동
	const selectPhoto = () => {
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setData({...data, user_profile_uri: images.path || data.user_profile_uri});
				// console.log('AssignPetProfileImage', data);
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	const onNicknameChange = text => {
		setData({...data, user_nickname: text});
	};

	const onNicknameValid = isValid => {
		setConfirmed(isValid);
	};

	//확인클릭
	const goToNextStep = () => {
		// console.log('data', data);
		nicknameDuplicationCheck(
			{user_nickname: data.user_nickname},
			result => {
				if (result.msg) {
					Modal.popOneBtn('이미 사용자가 있는 닉네임입니다.', '확인', () => Modal.close());
				} else {
					navigation.push('AssignPetInfoA', {data: data, isAdoptRegist: isAdoptRegist});
				}
			},
			error => {
				Modal.popOneBtn(error, '확인', () => Modal.close());
			},
		);
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'position'} contentContainerStyle={{alignItems: 'center'}}>
			{/* contentContainerStyle​ : The style of the content container (View) when behavior is 'position'. */}
			<View style={[login_style.wrp_main, {flex: 1}]}>
				{/* (M)StageBar	 */}
				<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
					<Stagebar
						backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
						insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
						current={1} //현재 단계를 정의
						maxstage={3} //전체 단계를 정의
						width={600 * DP} //bar의 너비
					/>
				</View>

				{/* Text Msg */}
				<View style={[temp_style.textMsg_assignPetProfileImage, assignPetProfileImage_style.textMsg]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>반려동물 프로필의 대표 이미지가 될 사진과 이름을 알려주세요.</Text>
					<Text style={[txt.noto24, {color: GRAY10}]}>반려동물의 이름은 수정이 불가합니다.</Text>
				</View>

				{/* (M)ProfileImageSelect */}
				<View style={[temp_style.profileImageSelect, assignPetProfileImage_style.profileImageSelect]}>
					<ProfileImageSelect onClick={selectPhoto} selectedImageUri={data.user_profile_uri} />
				</View>

				{/* InputForm */}
				<View style={[temp_style.inputForm_assignPetProfileImage, assignPetProfileImage_style.inputForm]}>
					<View style={[temp_style.input30_assignPetProfileImage, {backgroundColor: 'white'}]}>
						<Input30
							value={data.user_nickname}
							showTitle={false}
							showmsg={false}
<<<<<<< HEAD:src/component/templete/pet/AssignPetProfileImage.js
							width={654}
=======
							width={350}
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/AssignPetProfileImage.js
							confirm_msg={'사용 가능한 닉네임입니다.'}
							alert_msg={'사용 불가능한 닉네임입니다.'}
							placeholder={'반려동물의 닉네임을 입력해주세요.'}
							validator={nickName_validator}
							onChange={onNicknameChange}
							onValid={onNicknameValid}
							ref={nicknameInput}
							maxLength={25}
						/>
					</View>

					<View style={[assignPetProfileImage_style.checkBox]}>
						<TouchableOpacity onPress={onPressCheckBox}>{protect ? <Check50 /> : <Rect50_Border />}</TouchableOpacity>
						<Text style={[txt.noto28, {marginLeft: 10 * DP, textAlignVertical: 'center'}]}>해당 동물은 임시보호 중인 동물입니다.</Text>
					</View>
				</View>

				{/* (A)Btn_w654 */}
				<View style={[assignPetProfileImage_style.btn_w654]}>
					{/* 닉네임 Validator를 통과하여야만 버튼이 활성화된다 */}
					{confirmed ? (
						<AniButton btnTitle={'확인'} btnStyle={'border'} btnLayout={btn_w654} titleFontStyle={32} onPress={goToNextStep} />
					) : (
						<AniButton btnTitle={'확인'} disable btnLayout={btn_w654} titleFontStyle={32} />
					)}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};
