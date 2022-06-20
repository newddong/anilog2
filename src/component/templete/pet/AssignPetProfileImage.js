import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, TouchableOpacity, Keyboard, StyleSheet, ScrollView, Platform} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {AVAILABLE_NICK, PET_NICKNAME_FORM} from 'Root/i18n/msg';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import {Check42, Check50, Rect42_Border, Rect50_Border} from 'Atom/icon';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import Stagebar from 'Molecules/info/Stagebar';
import {stagebar_style} from 'Organism/style_organism copy';
import {temp_style, progressbar_style} from 'Templete/style_templete';
import {getAnimalListNotRegisterWithCompanion, nicknameDuplicationCheck} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Input24 from 'Root/component/molecules/input/Input24';
import protect_obj from 'Root/config/protect_obj';

export default AssignPetProfileImage = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({
		user_profile_uri: '',
		user_nickname: '',
		pet_status: 'companion', //입양, 임시보호중인 동물일때는 초기값을 다르게 표기하도록(여기서는 임시보호, 반려동물 상태밖에 없음,입양된 동물은 더이상 정보수정 불가)
		pet_is_temp_protection: false,
		userobject_id: route.params.userobject_id ? route.params.userobject_id : userGlobalObject.userInfo._id,
		previousRouteName: route.params?.previousRouteName,
	});
	const [confirmed, setConfirmed] = React.useState(false); // 닉네임 폼 Validator 통과 ?
	const [protect, setProtect] = React.useState(false); // 임시보호 동물 T/F
	const [isAdoptRegist, setIsAdoptRegist] = React.useState(false);

	const nicknameInput = React.useRef();

	React.useEffect(() => {
		if (userGlobalObject.userInfo._id != '') {
			getAnimalListNotRegisterWithCompanion(
				{},
				result => {
					console.log('result / getAnimalListNotRegisterWithCompanion / AssignPetProfileImage : ', result.msg.length);
					if (result.msg != undefined) {
						console.log('protect_obj.isAdoptMsgShowed', protect_obj.isAdoptMsgShowed);
						if (result.msg.length == 1 && !protect_obj.isAdoptMsgShowed) {
							//한마리의 입양 임보 대기 동물이 있을 경우
							protect_obj.isAdoptMsgShowed = true;
							Modal.popAnimalToRegisterModal(
								result.msg,
								'새로 입양하시는 동물이 있습니다. \n 해당 동물을 등록하시겠습니까?',
								'등록',
								'아니오',
								() => {
									const selectedAnimal = result.msg[0];
									const isProtect = selectedAnimal.protect_animal_status == 'protect'; //입양 임보 확정 동물이 임시보호인가?
									setIsAdoptRegist(true);
									setData({
										user_profile: selectedAnimal.protect_animal_photo_uri_list[0],
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
									setIsAdoptRegist(true);
									setData({
										user_profile: selectedAnimal.protect_animal_photo_uri_list[0],
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
		}
	}, []);

	//닉네임 Validation
	const nickName_validator = text => {
		let regExp = /^[가-힣a-zA-Z0-9_]{1,20}$/;
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

	React.useEffect(() => {
		if (route.params.selectedPhoto && route.params.selectedPhoto.length > 0) {
			console.log(route.params);
			let selected = route.params.selectedPhoto[0];
			setData({...data, user_profile_uri: (selected.cropUri ?? selected.uri) || data.user_profile_uri});
		}
	}, [route.params?.selectedPhoto]);

	//프로필이미지 클릭 시 PhotoSelect로 이동
	const selectPhoto = () => {
		navigation.push('SinglePhotoSelect', {prev: {name: route.name, key: route.key}});
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
					console.log('data', data);
					navigation.push('AssignPetInfoA', {data: data, isAdoptRegist: isAdoptRegist});
				}
				protect_obj.isAdoptMsgShowed = false;
			},
			error => {
				Modal.popOneBtn(error, '확인', () => Modal.close());
			},
		);
	};

	const [key, setKey] = React.useState(false);

	React.useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => {
			setKey(true);
		});
		Keyboard.addListener('keyboardDidHide', () => {
			setKey(false);
		});
		Keyboard.addListener('keyboardWillShow', () => {
			setKey(true);
		});
		Keyboard.addListener('keyboardWillHide', () => {
			setKey(false);
		});
	}, []);

	console.log('data.user_profile_uri', data.user_profile_uri);

	return (
		<View style={{alignItems: 'center', flex: 1, backgroundColor: '#fff'}}>
			<ScrollView contentContainerStyle={[{alignItems: 'center', bottom: key ? 100 * DP : 0}]} showsVerticalScrollIndicator={false}>
				<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
					<Stagebar
						backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
						insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
						current={1} //현재 단계를 정의
						maxstage={3} //전체 단계를 정의
						width={640 * DP} //bar의 너비
					/>
				</View>
				<View style={[assignPetProfileImage_style.textMsg]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>{`반려동물 프로필의 대표 이미지가 될 사진과 이름을 알려주세요. `}</Text>
					<Text style={[txt.noto24, {color: 'red'}]}>{`반려동물의 이름은 수정이 불가합니다. `}</Text>
				</View>
				<View style={[assignPetProfileImage_style.profileImageSelect]}>
					<ProfileImageSelect onClick={selectPhoto} selectedImageUri={data.user_profile_uri} />
				</View>
				<View style={[assignPetProfileImage_style.inputForm]}>
					<View style={[]}>
						<Input24
							value={data.user_nickname}
							width={694}
							confirm_msg={AVAILABLE_NICK}
							alert_msg={PET_NICKNAME_FORM}
							placeholder={'반려동물의 닉네임을 입력해주세요.'}
							validator={nickName_validator}
							onChange={onNicknameChange}
							onValid={onNicknameValid}
							ref={nicknameInput}
							showMsg
							maxlength={20}
							height={104}
						/>
					</View>
					<View style={[assignPetProfileImage_style.checkBox]}>
						<TouchableOpacity onPress={onPressCheckBox}>{protect ? <Check42 /> : <Rect42_Border />}</TouchableOpacity>
						<Text style={[txt.noto28, {textAlignVertical: 'center', marginLeft: 12 * DP}]}> 해당 동물은 임시보호 중인 동물입니다.</Text>
					</View>
				</View>
				<View style={[assignPetProfileImage_style.btn_w654]}>
					{confirmed ? (
						<AniButton btnTitle={'확인'} btnStyle={'border'} btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
					) : (
						<AniButton btnTitle={'확인'} disable btnLayout={btn_w694_r30} titleFontStyle={32} />
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const assignPetProfileImage_style = StyleSheet.create({
	textMsg: {
		marginTop: 12 * DP,
		width: 694 * DP,
		justifyContent: 'center',
	},
	profileImageSelect: {
		width: 294 * DP,
		height: 294 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50 * DP,
	},
	inputForm: {
		marginTop: 94 * DP,
	},
	btn_w654: {
		marginTop: 68 * DP,
	},
	input30: {
		marginTop: 110 * DP,
	},
	checkBox: {
		flexDirection: 'row',
		marginTop: 10 * DP,
		width: 694 * DP,
		alignSelf: 'flex-start',
		// backgroundColor: 'red',
	},
});
