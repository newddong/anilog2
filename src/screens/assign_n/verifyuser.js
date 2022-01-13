import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {Kakao, Naver, Instagram, Facebook, Xbutton, CheckedBtn, Bracket,DownBracketBlack} from 'Asset/image';
import {layoutstyles, textstyles, buttonstyle, formstyles, verifyuser} from './style_login';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK} from 'Screens/color';
import {EXIST_ACCOUNT} from 'Screens/msg';
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
	REQ_EMAIL,
	INPUT_VERIFYCATION_NUM,
	REQUEST_VERIFYCATION,
	CONFIRM_MY_ACCOUNT,
	INQUERY_ACCOUNT,
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
	const [ui, setUI] = React.useState({mode: TAB_VERIFY_PHONE, description: true, checked: false});

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

   // const [tabClick,setTabClick] = React.useState(true);
   // const [description,setDescription] = React.useState(VERIFY_USER_DESCRIPTION_ID);
   // const tabSelect =(menu)=> () => {
   //    setTabClick(!tabClick);
   //    switch(menu){
   //       case TAB_VERIFY_PHONE:
   //          setDescription(VERIFY_USER_DESCRIPTION_ID);
   //          break;
   //       case TAB_VERIFY_EMAIL:
   //          setDescription(VERIFY_USER_DESCRIPTION_PASS);
   //          break;
   //    }
   // };

	const [idCheck, setMatch] = React.useState(false);

   const check=() => {		
		setTimeout(()=>{props.navigation.goBack();},2000); 		
		console.log('check------')
		setMatch(true)
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

	return (
		<View style={layoutstyles.container}>
			<View style={layoutstyles.contents}>
				<View style={verifyuser.tab}>
					<TabButton txt={TAB_VERIFY_PHONE} onPress={tabSelect(TAB_VERIFY_PHONE)} select={ui.mode === TAB_VERIFY_PHONE} />
					<TabButton txt={TAB_VERIFY_EMAIL} onPress={tabSelect(TAB_VERIFY_EMAIL)} select={ui.mode === TAB_VERIFY_EMAIL} />
				</View>
				<View style={verifyuser.container_msg}>
					<Text style={[textstyles.noto28, textstyles.center]}>{INQUERY_ACCOUNT}</Text>
				</View>

				{/* <View style={layoutstyles.inputform}>
					<View style={(layoutstyles.textinputContainer, {marginBottom: 32 * DP})}>
						<TextInput style={[formstyles.id_input, textstyles.noto28]} placeholder={REQ_NAME} placeholderTextColor={GRAY_PLACEHOLDER}></TextInput>
						<TextInput
							style={[formstyles.pass_input, textstyles.noto28]}
							placeholder={REQ_PHONE_NUM}
							placeholderTextColor={GRAY_PLACEHOLDER}></TextInput>
					</View>
				</View> */}

				<View style={layoutstyles.inputform}>
					<View style={(layoutstyles.textinputContainer, {marginBottom: 12 * DP})}>

						{/* 이름을 입력해 주세요. */}
						<FormTxtInput
							inputStyle={[verifyuser.input_name, textstyles.noto28, {marginBottom: 20 * DP}]}
							placeholder={REQ_NAME}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={namechange}></FormTxtInput>

						{/* 휴대폰 인증 */}
						{ui.mode === TAB_VERIFY_PHONE && (
							<View style={verifyuser.input_mobile_phone}>	
								<FormTxtInput
									style={{width: '100%'}}
									inputStyle={[verifyuser.mobile_input, textstyles.noto28]}
									placeholder={REQ_PHONE_NUM}
									placeholderTextColor={GRAY_PLACEHOLDER}
									onChange={phonenum}></FormTxtInput>	
							</View>							
						)}

						{/* 이메일 인증 */}
						{ui.mode === TAB_VERIFY_EMAIL && (
							<View style={verifyuser.input_mobile_email}>
								<FormTxtInput
									inputStyle={[verifyuser.email_input, textstyles.noto28]}
									placeholder={REQ_EMAIL}
									placeholderTextColor={GRAY_PLACEHOLDER}
									onChange={email}></FormTxtInput>
								<Text style={textstyles.roboto28}>@</Text>
								{data.emailCompany === '직접입력' ? (
									<FormTxtInput
										inputStyle={[verifyuser.email_input, textstyles.noto28,{width:250*DP}]}
										placeholder={'naver.com'}
										placeholderTextColor={GRAY_PLACEHOLDER}
										onChange={emailCompany}
									/>
								) : (
								// 	<Dropdown
								// 	// style={{marginRight:70*DP}}
								// 	style={[button.followButton,button.shadow,!data.isFollowed&&{backgroundColor:'#fff'}]}
								// 	dropdownContainerStyle={[button.followButtonDropDown,!data.isFollowed&&{backgroundColor:'#fff'},button.shadow,{elevation:3},followBtnAniStyle]}
								// 	data={['SKT', 'KT', 'LG U+', '알뜰폰']}
								// 	// onSelect={selectAreaCode}
								// 	dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
								// 	dropItemTxtStyle={[text.regular28cjk,data.isFollowed?text.white:{color:'black'}]}
								// 	listBackgroundStyle={[{height: 240 * DP,marginTop:60*DP},followBtnItemListStyle]}
								// 	listContainerStyle={{height:240*DP,justifyContent:'space-between',alignItems:'center'}}
								// 	onSelect={(e)=>{alert(e)}}
								// 	onSelectNotClose={true}
								// 	onOpen={()=>{followBtnAnimation.value=withSpring(1,{duration:300})}}
								// 	onClose={()=>{followBtnAnimation.value=withTiming(0,{duration:300})}}
								// 	animation
								// 	component={
								// 		<>
								// 			<Text style={[text.regular24cjk,data.isFollowed?text.white:{color:'#000'}]}>{data.isFollowed?'팔로우 중':'팔로우'}</Text>
								// 			<SvgWrapper style={[button.followButtonBracketsize,followBtnBracketStyle]} svg={<DownBracket fill={data.isFollowed?'#fff':'#000'}/>} />
								// 		</>
								// 	}
								// />

								<Dropdown
										style={verifyuser.select_email}
										dropdownContainerStyle={[buttonstyle.cntr_dropdown, {width: verifyuser.select_email.width}]}
										data={['직접입력', 'naver.com', 'daum.net', 'gmail.com']}
										onSelect={selectEmailCompany}
										dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
										dropItemTxtStyle={[textstyles.roboto28, {color: GRAY}]}
										dropDownStyle={{height: 350 * DP}}
										component={
											<>
												<Text style={[textstyles.roboto28, {color: GRAY}]}>{data.emailCompany}</Text>
												<SvgWrap style={{height: 12 * DP, width: 20 * DP}} svg={<DownBracketBlack />} />
											</>
										}
									/>								
								)}									

							</View>
						)}

							<View style={verifyuser.verifycation_mobile_group}>
									{/*추후 TextInput에 keyboardType = 'numeric' 속성 넣어서 숫자만 입력, 입력 가능한 자릿수 제한 할 것*/}
										<FormTxtInput
											style={{width: '40%'}}
											inputStyle={[verifyuser.verify_number, textstyles.noto28]}									
											placeholder={INPUT_VERIFYCATION_NUM}
											placeholderTextColor={GRAY_PLACEHOLDER}
											onChange={phonenum}></FormTxtInput>		

										<FormTxtInput
											style={{width: '20%'}}
											inputStyle={[verifyuser.verify_time, textstyles.noto28]}									
											placeholder={'05:00'}
											placeholderTextColor={GRAY_PLACEHOLDER}
											onChange={phonenum}></FormTxtInput>		

										<TouchableWithoutFeedback onPress={() => alert('준비중입니다.\n인증 확인을 눌러주세요.')}>
											<View style={[buttonstyle.re_verify_button, buttonstyle.shadow, {width: '40%'}]}>
												<Text style={[textstyles.noto32b, textstyles.white]}>{REQUEST_VERIFYCATION}</Text>
											</View>
										</TouchableWithoutFeedback>
									</View>

					</View>
				</View>

				{/* 이 계정은 이미 가입이 되어있습니다.\n잠시 뒤에 로그인 페이지로 넘어갑니다. */}
				{idCheck&&(
					<View style={[verifyuser.msg_pop, buttonstyle.shadow]}>
						<Text style={[textstyles.noto30b, {color: GRAY}]}>{EXIST_ACCOUNT}</Text>
					</View>
				)}

            <TouchableWithoutFeedback onPress={check}>
				<View style={[buttonstyle.loginbutton, buttonstyle.shadow]}>
					<Text style={[textstyles.noto32b, textstyles.white]}>{CONFIRM_MY_ACCOUNT}</Text>
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
