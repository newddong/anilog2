import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK, LINK, WHITE, RED, GRAY_TXT_INPUT, GREEN} from 'Screens/color';
import {
	CHECK_VERIFYCATION_NUM1,
	COMPLETE_VERIFYCATION,
	BTN_CHECK,
	PET_ASSIGN,
} from 'Screens/msg';
import {DownBracketBlack, CancelInput, BtnWriteFeed, Progressbar_1_of_5} from 'Asset/image';
import blankProfile from 'Asset/image/blankProfile.png';
import {txt, lo, btn, form, tab, assign_profile} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import Stagebar from 'Screens/common/stagebar';
//todo:닉네임 체크 로직(서버랑)

export default Assign_pet_step1 = props => {
	const [existId, setExistId] = React.useState(false);
	const [checkNickName, setCheckNickName] = React.useState(false);

	const [match, setMatch] = React.useState(false);
	const [stat, setStat] = React.useState(0);
	const [data, setData] = React.useState({
		...props.route.params?.data,
		nickname: '',
	});

	const changeNickname = e => {
		setData({...data, nickname: e.nativeEvent.text});
	};

	const checkNickNameValidation = checkValue => {
		//  2 ~ 15자 한글, 영문, 숫자, '_' 포함 (어느 하나만 포함되어도 됨.OR 조건, 그 밖의 특수문자는 허용치 않음.)
		const regExp = /^[가-힣ㄱ-ㅎa-zA-Z0-9-]{2,15}$/;
		//console.log('닉네임 유효성 검사 :: ', regExp.test(checkValue))
		return regExp.test(checkValue);
	};

	const selectPhoto = () => {
		props.navigation.navigate('AddSinglePhoto', {title: '프로필 사진 선택', navfrom: 'Assign_pet_step1'});
	};

	const moveToNextStage = () => {
		props.navigation.push('Assign_pet_step2', {title: '반려동물 등록', petData: data, navfrom:props.route.params.navfrom});
	};

	React.useEffect(() => {
		console.log('data.nickname=>', data.nickname);
		result = checkNickNameValidation(data.nickname);
		setCheckNickName(result);
	}, [data]);

	React.useEffect(()=>{
		setData({...data,profileImgUri:props.route.params.localSelectedImages?.uri})
	},[props.route.params.localSelectedImages])

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<View style={lo.assign_profile}>
					
					<Stagebar
						style={assign_profile.container_stagebar}
						width={600 * DP}
						backgroundBarStyle={assign_profile.stagebar_backgroundBar}
						insideBarStyle={assign_profile.stagebar_insideBar}
						textStyle={[txt.roboto24, {color: GRAY}]}
						current={1}
						maxstage={3}
					/>

					{/* <Text style={[txt.noto24, txt.gray, {marginTop: 20 * DP, textAlign: 'center'}]}>{INTRODUCE_PROFILE}</Text> */}
					<Text style={[txt.noto24, txt.gray, {lineHeight: 36 * DP, marginTop: 12 * DP}]}>{PET_ASSIGN}</Text>
					<View style={[assign_profile.cntr_profile, {marginTop: 70 * DP}]}>
						<Image
							style={assign_profile.img_profile}
							source={data.profileImgUri?{uri:data.profileImgUri}:blankProfile}
							/>

						<TouchableWithoutFeedback onPress={selectPhoto}>
							<View style={assign_profile.btn_add}>
								<SvgWrapper style={{width: 92 * DP, height: 92 * DP}} svg={<BtnWriteFeed fill="#fff" />} />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>

				<View style={[lo.pass_form, {marginTop: 70 * DP}]}>
					{/* <Text style={[txt.noto24, {color: GRAY_PLACEHOLDER}]}>{PET_NAME}</Text> */}
					<FormTxtInput
						onChange={changeNickname}
						inputStyle={[txt.noto28, form.mobile_input]}
						placeholder={'닉네임을 입력하세요'}
						placeholderTextColor={GRAY_PLACEHOLDER}
						maxLength={15}></FormTxtInput>
				</View>

				{/* <View style={[lo.confirm_status, {borderTopColor: existId ? RED : GREEN}]}>
					<Text style={[txt.noto30, {color: existId ? RED : GREEN}]}>{existId ? '이미 사용중인 닉네임입니다.' : '사용이 가능한 닉네임입니다.'}</Text>
				</View> */}

				{data.nickname == undefined && <View style={[lo.confirm_status, {borderTopColor: GRAY_BRIGHT}]}></View>}
				{data.nickname != undefined && (
					<View style={[lo.confirm_status, {borderTopColor: checkNickName ? GREEN : RED}]}>
						<Text style={[txt.noto30, {color: checkNickName ? GREEN : RED}]}>
							{checkNickName
								? '사용 가능한 형식의 닉네임입니다.'
								: data.nickname.length === 0
								? '닉네임을 입력하세요'
								: '올바르지 않은 형식의 닉네임입니다.'}
						</Text>
					</View>
				)}
				{data.nickname?.length === 0 ? (
					<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
					</View>
				) : (
					<TouchableWithoutFeedback onPress={moveToNextStage}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
						</View>
					</TouchableWithoutFeedback>
				)}

				{/* <TouchableWithoutFeedback onPress={nextPet}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{'넘기기(임시)'}</Text>
					</View>
				</TouchableWithoutFeedback> */}

				{false && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>{COMPLETE_VERIFYCATION}</Text>
					</View>
				)}
				{false && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>{CHECK_VERIFYCATION_NUM1}</Text>
					</View>
				)}
				{stat === 1 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>아이디를 등록중입니다.</Text>
					</View>
				)}
				{stat === 2 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>등록이 완료되었습니다.</Text>
					</View>
				)}
			</View>
		</View>
	);
};

