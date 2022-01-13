import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK} from 'Screens/color';
import {CancelInput} from 'Asset/image';
import {BTN_CHECK, REQ_NAME, REQ_PHONE_NUM, TAB_VERIFY_EMAIL, TAB_VERIFY_PHONE, ASSIGN_USER_DESCRIPTION, REQ_EMAIL, BTN_NEXT} from 'Screens/msg';
import {DownBracketBlack, ProgressbarAssign_1,CheckedBtn, Horizon} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import {layoutstyles, textstyles, buttonstyle, formstyles} from '../login_n/style_login';

export default Assign_user_step1 = props => {
	const [description, setDescription] = React.useState(ASSIGN_USER_DESCRIPTION);
	const [ui, setUI] = React.useState({mode: TAB_VERIFY_PHONE, description: true, checked: false});
	const [allCheck, setAllCheck] = useState(true);
	const [checkBox1, setCheck1] = useState(true);
	const [checkBox2, setCheck2] = useState(true);
	const [checkBox3, setCheck3] = useState(true);
	const [checkBox4, setCheck4] = useState(true);
	const [checkBox5, setCheck5] = useState(true);
	const [checkBox6, setCheck6] = useState(true);

	const tabSelect = menu => () => {        
		switch (menu) {
			case TAB_VERIFY_PHONE:
				setUI({...ui, mode: TAB_VERIFY_PHONE});
				break;
			case TAB_VERIFY_EMAIL:
				setUI({...ui, mode: TAB_VERIFY_EMAIL});
				break;
		}
	};

	const check = () => {
		switch (ui.mode) {
			case TAB_VERIFY_PHONE:
				props.navigation.push('VerifyMobile', {title: TAB_VERIFY_PHONE, data: data});
				break;
			case TAB_VERIFY_EMAIL:
				props.navigation.push('VerifyEmail', {title: TAB_VERIFY_EMAIL, data: data});
				break;
		}
	};

	const moveToAssignUserStep2 = () => {		
		props.navigation.push('AssignRoute', {screen: 'Assign_user_step2', params: {title: '회원가입'}});		
	};

	const [data, setData] = React.useState({
		name: '',
		email: '',
		emailCompany: 'naver.com',
		userEmailCompany:null,
		phone: '',
	});

	const phonenum = e => {
		setData({...data, phone: e.nativeEvent.text});
	};
	const email = e => {
		setData({...data, email: e.nativeEvent.text});
	};
	const namechange = e => {
		setData({...data, name: e.nativeEvent.text});
	};

	const selectEmailCompany = item => {
		setData({...data, emailCompany: item});
	};

	const emailCompany = e => {
		setData({...data, userEmailCompany: e.nativeEvent.text});
	}

	const checkAll = () => {
		console.log("-----------checkAll")
		setAllCheck(!allCheck)
		if(allCheck!=true)
		{
			setCheck1(true)
			setCheck2(true)
			setCheck3(true)
			setCheck4(true)
			setCheck5(true)
			setCheck6(true)
		}
		else{
			setCheck1(false)
			setCheck2(false)
			setCheck3(false)
			setCheck4(false)
			setCheck5(false)
			setCheck6(false)

		}		
	};

	const check1 = () => {
		setCheck1(!checkBox1)
		if(checkBox1==true) setAllCheck(false)		
	};

	const check2 = () => {
		setCheck2(!checkBox2)
		if(checkBox2==true) setAllCheck(false)		
	};

	const check3 = () => {
		setCheck3(!checkBox3)
		if(checkBox3==true) setAllCheck(false)
	};

	const check4 = () => {
		setCheck4(!checkBox4)
		if(checkBox4==true) setAllCheck(false)
	};

	const check5 = () => {
		setCheck5(!checkBox5)
		if(checkBox5==true) setAllCheck(false)
	};

	const check6 = () => {
		setCheck6(!checkBox6)
		if(checkBox6==true) setAllCheck(false)
	};

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>							
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP}} svg={<ProgressbarAssign_1 />} />

				<View style={[styles.checkboxContainer, {flexDirection: "column", alignItems:'flex-start', marginTop: 20 * DP}]}>
					<CheckBtn onPress={checkAll} btn_txt={'아래 항목에 전체 동의 합니다.'} isCheck={allCheck} />		
					<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginTop: 20 * DP, marginBottom: 20 * DP}} svg={<Horizon/>} />
      		</View>

				<View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check1} btn_txt={'본인은 만 19세 이상입니다.(필수)'} isCheck={checkBox1} />	
      		</View>

				<View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check2} btn_txt={'서비스 이용약관 동의 (필수)'} isCheck={checkBox2} />	
					<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
							<Text style={[textstyles.noto28b, {color: '#999999', alignItems:'flex-end'}]}>{'보기'}</Text>
					</TouchableWithoutFeedback>
      		</View>

				<View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check3} btn_txt={'개인정보 수집 이용약관 동의 (필수)'} isCheck={checkBox3} />				
					<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
							<Text style={[textstyles.noto28b, {color: '#999999', alignItems:'flex-end'}]}>{'보기'}</Text>
					</TouchableWithoutFeedback>
      		</View>
		
				 <View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check4} btn_txt={'위치기반서비스 이용약관 동의 (필수)'} isCheck={checkBox4} />					
					<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
							<Text style={[textstyles.noto28b, {color: '#999999', alignItems:'flex-end'}]}>{'보기'}</Text>
					</TouchableWithoutFeedback>
      		</View>

				<View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check5} btn_txt={'기부내역 이용약관 동의 (필수)'} isCheck={checkBox5} />				
					<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
							<Text style={[textstyles.noto28b, {color: '#999999', alignItems:'flex-end'}]}>{'보기'}</Text>
					</TouchableWithoutFeedback>
      		</View>

				<View style={[styles.checkboxContainer, {justifyContent: "space-between"}]}>
					<CheckBtn onPress={check6} btn_txt={'이벤트 및 마케팅 정보 수신 동의 (선택)'} isCheck={checkBox6} />								
					<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
							<Text style={[textstyles.noto28b, {color: '#999999', alignItems:'flex-end'}]}>{'보기'}</Text>
					</TouchableWithoutFeedback>
      		</View>

				{/* <View style={lo.tab}>
					<CheckBox
						disabled={false}
						value={toggleCheckBox}
						onValueChange={(newValue) => setToggleCheckBox(newValue)}
						tintColors={{ true: '#FF9888', false: 'black' }}
						/>
					<Text style={txt.roboto28}>아래 항목에 전체 동의 합니다.\n</Text>
				</View>

				{ui.description && (
					<View style={lo.msg}>
						<Text style={[txt.noto28, txt.center]}>'추후 체크박스 기입'</Text>
					</View>
				)}	

				<View style={lo.form}> 
	
				</View>*/}

				<TouchableWithoutFeedback onPress={moveToAssignUserStep2}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_NEXT}</Text>
					</View>
				</TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: "center",
	  justifyContent: "center",
	},
	checkboxContainer: {
	  flexDirection: "row",
	  marginBottom: 20,
	},
	checkbox: {
	  alignSelf: "center",
	},
	label: {
	  margin: 8,
	},
 });

 const CheckBtn = props => {
	return (
		<View style={buttonstyle.autologinButton}>
			<TouchableWithoutFeedback onPress={props.onPress}>
				{props.isCheck ? (
					<View style={buttonstyle.checkedButton}>
						<SvgWrapper style={buttonstyle.checkedButton} svg={<CheckedBtn />} />
					</View>
				) : (
					<View style={buttonstyle.notcheckButton} />
				)}
			</TouchableWithoutFeedback>
			<Text style={[textstyles.noto28, {color: SLIGHT_BLACK, marginBottom: 6 * DP}]}>{props.btn_txt}</Text>
		</View>
	);
};