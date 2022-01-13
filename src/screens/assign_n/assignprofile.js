import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK, LINK, WHITE, RED, GRAY_TXT_INPUT, GREEN} from 'Screens/color';
import {
	CHECK_VERIFYCATION_NUM1,
	COMPLETE_VERIFYCATION,
	COMPLETE_ASSIGN,
	VERIFY_CONDITION,
	CHECK_PASS,
	REQ_PASSWORD,
	REQ_PASSCHECK,
	FAIL_PASS_CHECK,
	INTRODUCE_PROFILE,
	DEFINE_NICK_NAME,
	NICK_NAME
} from 'Screens/msg';
import {DownBracketBlack, CancelInput, BtnWriteFeed} from 'Asset/image';
import blankProfile from 'Asset/image/blankProfile.png';
import {txt, lo, btn, form, tab, assign_profile} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serveruri, cookieReset} from 'Screens/server';
import axios from 'axios';
//todo:닉네임 체크 로직(서버랑)

export default AssingProfile = props => {
	const [existId, setExistId] = React.useState(false);
	const [checkNickName, setCheckNickName] = React.useState(false);

	const [match, setMatch] = React.useState(false);
	const [stat, setStat]  = React.useState(0);	
	const completeAssign = () => {
		setStat(1);
		console.log(data);
		// props.navigation.navigate('Assign');
		// 서버에 유저 추가 신청
		// 아이디 중복체크, 비밀번호 유효성 체크, 서버작업 필요
		let form = new FormData();
		form.append('id',data.phone!==''?data.phone:(data.email+'@'+(data.userEmailCompany===null?data.emailCompany:data.userEmailCompany)));
		form.append('password',data.password);
		form.append('name',data.name);
		form.append('nickname',data.nickname);
		form.append('userType','user');
		form.append('idType',data.mobilecompany?'mobile':'email');
		form.append('mobilecompany',data.mobilecompany);
		form.append('imgfile',{
			name: props.route.params?.image,
			type: 'image/jpeg',
			uri: props.route.params?.image
		});
		axios.post(serveruri+'/user/add',form,{
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
			.then(res => {
			console.log(res);
			// 성공후 이동
			setStat(2);
			setTimeout(()=>{props.navigation.navigate('Login')},2000);
		});
	};

	const [data, setData] = React.useState({
		...props.route.params?.data,
	});

	const changeNickname = (e) => {
		setData({...data, nickname:e.nativeEvent.text})
	}

	const checkNickNameValidation =(checkValue) => {		
		//  2 ~ 15자 한글, 영문, 숫자, '_' 포함 (어느 하나만 포함되어도 됨.OR 조건, 그 밖의 특수문자는 허용치 않음.)		
		const regExp = /^[가-힣ㄱ-ㅎa-zA-Z0-9_-]{2,15}$/;			
		//console.log('닉네임 유효성 검사 :: ', regExp.test(checkValue))
		return regExp.test(checkValue)
	}

	const selectPhoto = () => {
		props.navigation.navigate('AddSinglePhoto',{title:'프로필 사진 선택',navfrom:'AssingProfile'});
	}

	React.useEffect(()=>{
		console.log("data.nickname=>",data.nickname);	
		result = checkNickNameValidation(data.nickname)		
		setCheckNickName(result)
	},[data])

	const nextPet = () => {
		props.navigation.push('Assign_pet_step1', {title: '반려동물 등록', data:data});
	};

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<View style={lo.assign_profile}>
					{/* <Text style={[txt.noto24, txt.gray, {marginTop: 20 * DP, textAlign: 'center'}]}>{INTRODUCE_PROFILE}</Text> */}
					<Text style={[txt.noto24, txt.gray, {marginTop: 30 * DP, textAlign: 'center'}]}>{INTRODUCE_PROFILE}</Text>
					<View style={[assign_profile.cntr_profile, {marginTop: 20 * DP}]}>
						<Image
							style={assign_profile.img_profile}
							source={props.route.params.image?{
								// uri: 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_327/7ae22985-90e8-44c3-a1d6-ee470ddc9073.jpg',
								uri: props.route.params.image
							}:blankProfile}></Image>

						<TouchableWithoutFeedback
							onPress={selectPhoto}>
							<View style={assign_profile.btn_add}>
								<SvgWrapper style={{width: 92 * DP, height: 92 * DP}} svg={<BtnWriteFeed fill="#fff" />} />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>

				<View style={[lo.pass_form, {marginTop: -60 * DP}]}>
					<Text style={[txt.noto30b, {color: MAINCOLOR, lineHeight: 40 * DP}]}>{NICK_NAME}</Text>
					<Text style={[txt.noto24, {color: GRAY_PLACEHOLDER}]}>{DEFINE_NICK_NAME}</Text>
					<FormTxtInput
						onChange={changeNickname}
						inputStyle={[txt.noto28, form.mobile_input]}
						placeholder={'닉네임을 입력하세요'}
						placeholderTextColor={GRAY_PLACEHOLDER}
						maxLength={15}
					></FormTxtInput>
				</View>

				{/* <View style={[lo.confirm_status, {borderTopColor: existId ? RED : GREEN}]}>
					<Text style={[txt.noto30, {color: existId ? RED : GREEN}]}>{existId ? '이미 사용중인 닉네임입니다.' : '사용이 가능한 닉네임입니다.'}</Text>
				</View> */}

				{data.nickname ==undefined&&
					<View style={[lo.confirm_status, {borderTopColor: GRAY_BRIGHT}]}></View>
				}
				{data.nickname !=undefined&&
					<View style={[lo.confirm_status, {borderTopColor: checkNickName ? GREEN  : RED }]}>
						<Text style={[txt.noto30, {color: checkNickName ? GREEN  : RED}]}>{checkNickName ? '사용 가능한 형식의 닉네임입니다.':'올바르지 않은 형식의 닉네임입니다.'}</Text>
					</View> 
				}			
				{stat!==0 ? (
					<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{COMPLETE_ASSIGN}</Text>
					</View>
				) : (
					<TouchableWithoutFeedback onPress={completeAssign}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{COMPLETE_ASSIGN}</Text>
						</View>
					</TouchableWithoutFeedback>
				)}

				<TouchableWithoutFeedback onPress={nextPet}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{'넘기기(임시)'}</Text>
					</View>
				</TouchableWithoutFeedback>

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
				{stat===1 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>아이디를 등록중입니다.</Text>
					</View>
				)}
				{stat===2 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>등록이 완료되었습니다.</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select ? tab.btn_tab : tab.btn_tab_notselected}>
				<Text style={props.select ? [txt.noto28b, {color: MAINCOLOR}] : [txt.noto28, {color: GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
