import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {Kakao, Naver, Instagram, Facebook, Xbutton, CheckedBtn, Bracket} from 'Asset/image';
import {layoutstyles, textstyles, buttonstyle, formstyles, verifyuser} from './style_login';
import SvgWrapper from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK} from 'Screens/color';
import {
	ASK_LOST_ID_PASS,
	ASK_USER,
	ASSIGN_USER,
	BTN_CHECK,
	FAIL_LOGIN_COUNT,
	FAIL_LOGIN_LOCK,
	FAIL_MSG,
	FIND_ID,
	FIND_PASS,
	LOGIN,
	LOGIN_AUTO,
	RECAPTCHA,
	REQ_NAME,
	REQ_PASSWORD,
	REQ_PHONE_NUM,
	REQ_PHONE_NUM_AND_EMAIL,
	SAVE_ID,
	TAB_VERIFY_EMAIL,
	TAB_VERIFY_PHONE,
	VERIFY_USER_DESCRIPTION_ID,
   VERIFY_USER_DESCRIPTION_PASS,
	WITHOUT_LOGIN,
} from 'Screens/msg';

export default VerifyUser = props => {
	const [autoLogin, setAutoLogin] = useState(false);
	const pressAutoLogin = () => {
		setAutoLogin(!autoLogin);
	};
	const [saveId, setSaveId] = useState(false);
	const pressSaveId = () => {
		setSaveId(!saveId);
	};

   const [tabClick,setTabClick] = React.useState(true);
   const [description,setDescription] = React.useState(VERIFY_USER_DESCRIPTION_ID);
   const tabSelect =(menu)=> () => {
      setTabClick(!tabClick);
      switch(menu){
         case TAB_VERIFY_PHONE:
            setDescription(VERIFY_USER_DESCRIPTION_ID);
            break;
         case TAB_VERIFY_EMAIL:
            setDescription(VERIFY_USER_DESCRIPTION_PASS);
            break;
      }
   };
   const check=()=>{
      props.navigation.goBack();
   };

	return (
		<View style={layoutstyles.container}>
			<View style={layoutstyles.contents}>
				<View style={verifyuser.tab}>
					<TabButton txt={TAB_VERIFY_PHONE} onPress={tabSelect(TAB_VERIFY_PHONE)} select={tabClick}/>
					<TabButton txt={TAB_VERIFY_EMAIL} onPress={tabSelect(TAB_VERIFY_EMAIL)} select={!tabClick}/>
				</View>
				<View style={verifyuser.container_msg}>
					<Text style={[textstyles.noto28, textstyles.center]}>{description}</Text>
				</View>

				<View style={layoutstyles.inputform}>
					<View style={(layoutstyles.textinputContainer, {marginBottom: 32 * DP})}>
						<TextInput style={[formstyles.id_input, textstyles.noto28]} placeholder={REQ_NAME} placeholderTextColor={GRAY_PLACEHOLDER}></TextInput>
						<TextInput
							style={[formstyles.pass_input, textstyles.noto28]}
							placeholder={REQ_PHONE_NUM}
							placeholderTextColor={GRAY_PLACEHOLDER}></TextInput>
					</View>
				</View>
            <TouchableWithoutFeedback onPress={check}>
				<View style={[buttonstyle.loginbutton, buttonstyle.shadow]}>
					<Text style={[textstyles.noto32b, textstyles.white]}>{BTN_CHECK}</Text>
				</View>
            </TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select?verifyuser.btn_tab:verifyuser.btn_tab_notselected}>
				<Text style={props.select?[textstyles.noto28b,{color:MAINCOLOR}]:[textstyles.noto28,{color:GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
