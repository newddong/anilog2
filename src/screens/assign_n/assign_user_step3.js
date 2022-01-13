import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper from 'Screens/svgwrapper';
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
	BTN_CHECK,
	PASSWORD,
	CHECK_PASSWORD_CONFIG
} from 'Screens/msg';
import {DownBracketBlack, CancelInput, ProgressbarAssign_3} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import axios from 'axios';

export default VerifyPass = props => {

	const [match, setMatch] = React.useState(false);	
	
	//비밀번호 textinput으로 포커스 이동하기 위해 선언
	const inputPwdRef = useRef(null);	

	const completeAssign =() => {
		// props.navigation.navigate('Assign');
		//서버에 유저 추가 신청
		//아이디 중복체크, 비밀번호 유효성 체크, 서버작업 필요
		props.navigation.navigate('AssingProfile',{title: '프로필 등록',data:data});
		/*axios.post('https://api.zoodoongi.net/user/add',{id:data.phone||data.email,password:data.password,name:data.name}).then(
			(res)=>{
				// console.log(res);
				//성공후 이동
				props.navigation.navigate('AssingProfile',{title: '프로필 등록',data:data});
			}
		)*/
	}

	const inputPwd =(e) => {
		setData({...data,password:e.nativeEvent.text,input:e.nativeEvent.text});	
	}

	const checkPwd =(e) => {
		setData({...data,check:e.nativeEvent.text});	
	}

	const checkPassValidation =(checkValue) => {		
		//  8 ~ 15자 영문, 숫자 조합 (둘다 포함되어야 함.AND 조건)
		// const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/
		
		//  8 ~ 15자 영문, 숫자 조합 (둘중 하나만 포함되어도 됨.OR 조건)
		const regExp = /^[A-Za-z0-9]{8,15}$/;			
		// console.log('비밀번호 유효성 검사 :: ', regExp.test(checkValue))
		return regExp.test(checkValue)
	}

	//비밀번호 입력란 포커스를 벗어날 경우 유효성 체크
	const checkFocusOutStep1 = (e) => {		
		validCheck = checkPassValidation(e.nativeEvent.text)

		if (validCheck != true) 
		{
			alert(CHECK_PASSWORD_CONFIG);
			// 유효성 체크 실패시 비밀번호 입력란으로 포커스 이동
			inputPwdRef.current.focus();
		}
	}

	const [data,setData] =React.useState({
		...props.route.params.data,
		password:'', //비밀번호 값(input값과 일치)
		input:'', //비밀번호 값
		check:'', //비밀번호 확인 값
	});
		
	React.useEffect(()=>{
		// console.log(data);
		if(data.input!='' && data.input==data.check){	
			setMatch(true);
		}else{
			setMatch(false);
		}
	},[data])

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<ProgressbarAssign_3/>} />
				<View style={[lo.pass_form, {marginTop: 70 * DP}]}>
						
						<Text style={[txt.noto24,{color:MAINCOLOR}]}>{PASSWORD}</Text>						
						{ <FormTxtInput
							onChange={inputPwd}
							password
							style={{marginBottom:20*DP}}
							inputStyle={[form.input_name,txt.noto28]}
							placeholder={REQ_PASSWORD}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onEndEditing={checkFocusOutStep1}
							maxLength={15}
							ref={inputPwdRef}
						></FormTxtInput> }
						<Text style={[txt.noto24,{color:GRAY_PLACEHOLDER}]}>{VERIFY_CONDITION}</Text>
						
						<Text style={[txt.noto24,{color:MAINCOLOR, marginTop: 80 * DP}]}>{CHECK_PASS}</Text>
						{/* 비밀번호 확인란은 유효성 검사 필요 없음. 비밀번호 입력란과 일치 여부만 확인 */}
						<FormTxtInput 
							onChange={checkPwd}								
							password
							inputStyle={[form.input_name,txt.noto28]}
							placeholder={REQ_PASSCHECK}
							placeholderTextColor={GRAY_PLACEHOLDER}							
							maxLength={15} 							
						></FormTxtInput>
				</View>

				{/* 비밀번호 입력란과 비밀번호 확인란 모두 공란일 경우 */}
				{data.input==''&&data.check==''&&
					<View style={[lo.confirm_status, {borderTopColor: GRAY_BRIGHT}]}></View>
				}

				{/* 비밀번호 입력란이 공란이 아닐경우 */}
				{data.input!=''&&	
					<View style={[lo.confirm_status,{borderTopColor:match?GREEN:RED}]}>
				{/* 비밀번호가 일치하지 않고 비밀번호 입력, 확인란 모두 데이터가 있을 경우 */}
						{!match&&data.input!=''&&data.check!=''&&<Text style={[txt.noto24,{color:RED}]}>{FAIL_PASS_CHECK}</Text>}
					</View>
				}
				
				{!match?<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
					<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
				</View>:
				<TouchableWithoutFeedback onPress={completeAssign}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
					</View>
				</TouchableWithoutFeedback>}

				<TouchableWithoutFeedback onPress={completeAssign}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{'넘기기(임시)'}</Text>
					</View>
				</TouchableWithoutFeedback>
					
				{false&&<View style={[lo.msg_pop,btn.shadow]}>
					<Text style={[txt.noto30b,{color:GRAY}]}>{COMPLETE_VERIFYCATION}</Text>
				</View>}
				{false&&<View style={[lo.msg_pop,btn.shadow]}>
					<Text style={[txt.noto30b,{color:GRAY}]}>{CHECK_VERIFYCATION_NUM1}</Text>
				</View>}

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
