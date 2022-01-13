import React, {useState} from 'react';
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
	BTN_CHECK
} from 'Screens/msg';
import {DownBracketBlack, CancelInput, ProgressbarAssign_3} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import axios from 'axios';

export default VerifyPass = props => {

	const [match, setMatch] = React.useState(false);


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

	const [data,setData] =React.useState({
		...props.route.params.data,
		password:'',
		input:'',
		check:'',
	});
	
	React.useEffect(()=>{
		console.log(data);
		if(data.input===data.check&&data.input.length>=8&&data.check.length>=8){
			//유효성 검사 로직 필요
			setMatch(true);
		}else{
			setMatch(true);
		}
	},[data])

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<ProgressbarAssign_3/>} />
				<View style={[lo.pass_form, {marginTop: 70 * DP}]}>
						<Text style={[txt.noto24,{color:GRAY_PLACEHOLDER}]}>{VERIFY_CONDITION}</Text>						
						<FormTxtInput onChange={inputPwd} password style={{marginBottom:100*DP}} inputStyle={[form.input_name,txt.noto28]} placeholder={REQ_PASSWORD} placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>

						{/* 비밀번호 확인 */}
						<Text style={[txt.noto30,{color:GRAY}]}>{CHECK_PASS}</Text>
						<FormTxtInput 
								onChange={checkPwd}
								password
								inputStyle={[txt.noto28,form.mobile_input]}
								placeholder={REQ_PASSCHECK}
								placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>
				</View>
				
				<View style={[lo.confirm_status,{borderTopColor:match?GREEN:RED}]}>
					{!match&&<Text style={[txt.noto30,{color:RED}]}>{FAIL_PASS_CHECK}</Text>}
				</View>

				{!match?<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
					<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
				</View>:
				<TouchableWithoutFeedback onPress={completeAssign}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
					</View>
				</TouchableWithoutFeedback>}
					
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
