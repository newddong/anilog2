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
	, REQ_PET_TYPE_REG_NUM, ADOPTION_TYPE, PET_REG_NUM, REQ_INPUT_NUM
	} from 'Screens/msg';

import {DownBracketBlack,DownBracket,BtnWriteFeed,Progressbar_3_of_5} from 'Asset/image';
import {txt, lo, btn, form, tab, tab_filled_color} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import {layout, text, button, float_btn} from '../feed/profile/style_profile';

export default Assign_pet_step3 = props => {
	const [description, setDescription] = React.useState(ASSIGN_USER_DESCRIPTION);
	const [ui, setUI] = React.useState({mode: TAB_VERIFY_PHONE, description: true, checked: false});
	const [TELCO, setTelco] = React.useState('통신사 선택');
	const [EMAILCO, setEmailco] = React.useState('');

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
		props.navigation.push('Assign_pet_step4', {title: '반려동물 등록', data:data});
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
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<Progressbar_3_of_5/>} />
				<Text style={[txt.noto28,{marginBottom: 50 * DP}]}>{REQ_PET_TYPE_REG_NUM}</Text>
						
					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 50 * DP, marginRight: 80 * DP}]}>{ADOPTION_TYPE}</Text>
							<FormTxtInput
								inputStyle={[form.email_domain, txt.noto28,{width:410*DP}]}								
								placeholder={CHOICE_TYPE}
								placeholderTextColor={GRAY_PLACEHOLDER}
								onChange={emailCompany}
								value={EMAILCO}
							/>
							<Dropdown 
						
							style={[btn.followButton,btn.shadow,!data.isFollowed&&{backgroundColor:'#fff', width: 50*DP,marginBottom:30*DP,marginRight:20*DP}]}
							dropdownContainerStyle={[btn.followButtonDropDownWide,!data.isFollowed&&{backgroundColor:'#fff', width:400*DP},btn.shadow,{elevation:3}]}
							data={['유기 동물 입양','유기 동물 분양','온라인 신청 입양','지인 추천 입양', INPUT_DIRECT]}						
							dropItemTxtStyle={[txt.regular28cjk,data.isFollowed?txt.white:{color:'black'}]}
							listBackgroundStyle={[{height: 330 * DP,width:350* DP, marginTop:80*DP}]}
							listContainerStyle={{height:330*DP,justifyContent:'space-between',alignItems:'center'}}
							onSelect={(e)=>{selectEmailco(e)}} 
							onSelectNotClose={false}
							animation
							component={
								<>								
									<Text style={[txt.regular24cjk,data.isFollowed?txt.white:{color:'#000'}]}>{}</Text>
									<SvgWrapper style={[btn.followButtonBracketsize]} svg={<DownBracket fill={data.isFollowed?'#ff0000':'#000'}/>} />
								</>
							}
							/>
					</View>		

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 20 * DP}]}>{PET_REG_NUM}</Text>
							<FormTxtInput
								inputStyle={[form.email_domain, txt.noto28,{width:480*DP}]}								
								placeholder={REQ_INPUT_NUM}
								placeholderTextColor={GRAY_PLACEHOLDER}
							/>						
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
