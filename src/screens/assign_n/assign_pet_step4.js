import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR, WHITE} from 'Screens/color';
import {
	BTN_CHECK, REQ_NAME, REQ_PHONE_NUM, TAB_VERIFY_EMAIL, TAB_VERIFY_PHONE
	, ASSIGN_USER_DESCRIPTION, REQ_EMAIL, CHECK_VERIFYCATION, REQUEST_VERIFYCATION, INPUT_VERIFYCATION_NUM
	, EMAIL_NAVER, EMAIL_DAUM, EMAIL_KAKAO, EMAIL_NATE, EMAIL_GMAIL
	, INPUT_DIRECT, INPUT_DOMAIN, MALE, FEMALE, PET_TYPE_SEX
	, CHOICE_TYPE, PET_TYPE, PET_SEX, BTN_BACK, BTN_NEXT
	, BIRTH, WEIGHT, NEUTERING, YES, NO
	, UNAWARENESS, REQ_BIRTH_WEIGHT, INPUT_WEIGHT
	} from 'Screens/msg';

import {DownBracketBlack,DownBracket,BtnWriteFeed,Progressbar_4_of_5,CalendarIcon} from 'Asset/image';
import {txt, lo, btn, form, tab, tab_filled_color} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import {layout, text, button, float_btn} from '../feed/profile/style_profile';

export default Assign_pet_step4 = props => {
	const [description, setDescription] = React.useState(ASSIGN_USER_DESCRIPTION);
	const [ui, setUI] = React.useState({mode: TAB_VERIFY_PHONE, description: true, checked: false});
	const [TELCO, setTelco] = React.useState('통신사 선택');
	const [EMAILCO, setEmailco] = React.useState('');
	const [checkRadio, setCheckRadio] = useState(1);

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

	const confirmNum = () => {
		props.navigation.push('Assign_pet_step5', {title: '반려동물 등록', data:data});
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




	const selectTelco = e => {
		setTelco(e);
	};

	const selectEmailco = e => {
		if (e==INPUT_DIRECT) setEmailco('');
		else setEmailco(e);
	};
	

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<Progressbar_4_of_5/>} />
				<Text style={[txt.noto28,{marginBottom: 50 * DP}]}>{REQ_BIRTH_WEIGHT}</Text>
						
					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 50 * DP, marginRight: 80 * DP,marginBottom: 80 * DP}]}>{BIRTH}</Text>						
							<FormTxtInput
								inputStyle={[form.email_domain, txt.noto28, {marginBottom: 20 * DP, width: 420 * DP}]}
								placeholder={'캘린더를 선택해서 기입해 주세요.'}
								placeholderTextColor={GRAY_PLACEHOLDER}							
							/>						
							<SvgWrap style={{width: 60 * DP, height: 60 * DP, alignItems:'center',marginTop: 30 * DP}} svg={<CalendarIcon/>}  onPress={() => alert('준비중입니다.')}/>
					</View>		

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 80 * DP}]}>{WEIGHT}</Text>
						<FormTxtInput
							inputStyle={[form.email_domain, txt.noto28,{width:420*DP}]}								
							placeholder={INPUT_WEIGHT}
							placeholderTextColor={GRAY_PLACEHOLDER}
						/>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 20 * DP}]}>kg</Text>						
					</View>	

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 80 * DP, marginRight: 60 * DP}]}>{NEUTERING}</Text>						
						<View style={[form.select_life,{marginTop: 80 * DP}]}>		
							<TouchableWithoutFeedback
								onPress={() => {setCheckRadio(1);}}>
								<View style={[form.select_option,{marginRight:50*DP}]}>
									{checkRadio == 1 && (<View style={form.btn_selected_radio}><View style={form.btn_radio_center} /></View>)}
									{checkRadio != 1 && (<View style={form.btn_radio}></View>)}							
									<Text style={[txt.noto24, {color: 'black'}]}>{YES}</Text>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => {setCheckRadio(2);}}>
								<View style={[form.select_option,{marginRight:50*DP}]}>
									{checkRadio == 2 && (<View style={form.btn_selected_radio}><View style={form.btn_radio_center} /></View>)}
									{checkRadio != 2 && (<View style={form.btn_radio}></View>)}
									<Text style={[txt.noto24, {color: 'black'}]}>{NO}</Text>	
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => {setCheckRadio(3);}}>
								<View style={[form.select_option]}>
									{checkRadio == 3 && (<View style={form.btn_selected_radio}><View style={form.btn_radio_center} /></View>)}
									{checkRadio != 3 && (<View style={form.btn_radio}></View>)}	
									<Text style={[txt.noto24, {color: 'black'}]}>{UNAWARENESS}</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>						
					</View>	
				
					<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:50 * DP}}>
						<TouchableWithoutFeedback onPress={props.navigation.goBack}>
							<View style={[btn.confirm_filled_empty, btn.shadow,{marginTop: 50 * DP,}]}>
								<Text style={[txt.noto32b, txt.MAINCOLOR]}>{BTN_BACK}</Text>
							</View>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback onPress={confirmNum}>
							<View style={[btn.confirm_filled_color, btn.shadow,{marginTop: 50 * DP,}]}>
								<Text style={[txt.noto32b, txt.white]}>{BTN_NEXT}</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>				
			</View>
		</View>
	);
};

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select ? tab_filled_color.btn_tab : tab_filled_color.btn_tab_notselected}>
				<Text style={props.select ? [txt.noto28b, {color: WHITE}] : [txt.noto28, {color: GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
