import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR} from 'Screens/color';
import {
	BTN_CHECK, REQ_NAME, REQ_PHONE_NUM, TAB_VERIFY_EMAIL, TAB_VERIFY_PHONE
	, ASSIGN_USER_DESCRIPTION, REQ_EMAIL, CHECK_VERIFYCATION, REQUEST_VERIFYCATION, INPUT_VERIFYCATION_NUM
	, EMAIL_NAVER, EMAIL_DAUM, EMAIL_KAKAO, EMAIL_NATE, EMAIL_GMAIL
	, INPUT_DIRECT, INPUT_DOMAIN
	} from 'Screens/msg';
import {DownBracketBlack,DownBracket,BtnWriteFeed,ProgressbarAssign_2, CancelInput} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import {layout, text, button, float_btn} from '../feed/profile/style_profile';

export default Assign_user_step2 = props => {
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
		props.navigation.push('Assign_user_step3', {title: '회원가입', data:data});
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

	const followBtnAnimationTelco = useSharedValue(0);
	const followBtnAniStyleTelco = useAnimatedStyle(() => ({
		height:(followBtnAnimationTelco.value * 280 + 60)*DP
	}));

	const followBtnBracketStyleTelco = useAnimatedStyle(()=>({
		transform:[{rotate:`${followBtnAnimationTelco.value*180}deg`}]
	}));

	const followBtnItemListStyleTelco = useAnimatedStyle(()=>({
		transform:[{scaleY:followBtnAnimationTelco.value}]
	}));

	const followBtnAnimationEmail = useSharedValue(0);
	const followBtnAniStyleEmail = useAnimatedStyle(() => ({
		height:(followBtnAnimationEmail.value * 420 + 60)*DP
	}));

	const followBtnBracketStyleEmail = useAnimatedStyle(()=>({
		transform:[{rotate:`${followBtnAnimationEmail.value*180}deg`}]
	}));

	const followBtnItemListStyleEmail = useAnimatedStyle(()=>({
		transform:[{scaleY:followBtnAnimationEmail.value}]
	}));


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
			<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<ProgressbarAssign_2/>} />
				<View style={lo.tab}>
					<TabButton txt={TAB_VERIFY_PHONE} onPress={tabSelect(TAB_VERIFY_PHONE)} select={ui.mode === TAB_VERIFY_PHONE} />
					<TabButton txt={TAB_VERIFY_EMAIL} onPress={tabSelect(TAB_VERIFY_EMAIL)} select={ui.mode === TAB_VERIFY_EMAIL} />
				</View>

				{ui.description && (
					<View style={lo.msg}>
						<Text style={[txt.noto28, txt.center]}>{description}</Text>
					</View>
				)}

				<View style={lo.form}>
					<View style={(lo.cntr_txt_input, {marginBottom: 12 * DP})}>
						<FormTxtInput
							inputStyle={[form.input_name, txt.noto28, {marginBottom: 20 * DP}]}
							placeholder={REQ_NAME}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={namechange}></FormTxtInput>

						{ui.mode === TAB_VERIFY_PHONE && (
							<View style={form.input_mobile_phone}>
 							<Dropdown 
								// style={{marginRight:70*DP}}
								style={[btn.followButton,btn.shadow,!data.isFollowed&&{backgroundColor:'#fff', width: 220*DP,marginBottom:40*DP}]}
								dropdownContainerStyle={[btn.followButtonDropDown,!data.isFollowed&&{backgroundColor:'#fff', width:220*DP},btn.shadow,{elevation:3},followBtnAniStyleTelco]}
								data={['SKT', 'KT', 'LG U+', '알뜰폰']}
								// onSelect={selectAreaCode}
								// dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
								dropItemTxtStyle={[txt.regular28cjk,data.isFollowed?txt.white:{color:'black'}]}
								listBackgroundStyle={[{height:230 * DP,width:50, marginTop:50*DP},followBtnItemListStyleTelco]}
								listContainerStyle={{height:230*DP,justifyContent:'space-between',alignItems:'center'}}
								// onSelect={(e)=>{alert(e)}}
								onSelect={(e)=>{selectTelco(e)}} 
								onSelectNotClose={false}
								onOpen={()=>{followBtnAnimationTelco.value=withSpring(1,{duration:300})}}
								onClose={()=>{followBtnAnimationTelco.value=withTiming(0,{duration:300})}}
								animation
								component={
									<>
										{/* <Text style={[text.regular24cjk,data.isFollowed?text.white:{color:'#000'}]}>{data.isFollowed?'팔로우 중':'팔로우2323'}</Text> */}
										<Text style={[txt.regular24cjk,data.isFollowed?txt.white:{color:'#000'}]}>{TELCO}</Text>
										<SvgWrapper style={[btn.followButtonBracketsize,followBtnBracketStyleTelco]} svg={<DownBracket fill={data.isFollowed?'#fff':'#000'}/>} />
									</>
								}
							/>
								<FormTxtInput
									style={{width: 390*DP}}
									inputStyle={[form.mobile_input, txt.noto28]}
									placeholder={REQ_PHONE_NUM}
									placeholderTextColor={GRAY_PLACEHOLDER}
									onChange={phonenum}></FormTxtInput>					
						
							</View>							
						)}

						{ui.mode === TAB_VERIFY_EMAIL && (
							<View style={form.input_mobile_email}>
								<FormTxtInput
									inputStyle={[form.email_input, txt.noto28]}
									placeholder={REQ_EMAIL}
									placeholderTextColor={GRAY_PLACEHOLDER}
									onChange={email}></FormTxtInput>
								<Text style={txt.roboto28}>@</Text>
								{/* {data.emailCompany === '직접입력' ? ( */}
							
									<View style={{flexDirection:'row'}}>
										<FormTxtInput
											inputStyle={[form.email_domain, txt.noto28,{width:250*DP}]}
											// placeholder={'naver.com'}
											placeholder={INPUT_DOMAIN}
											placeholderTextColor={GRAY_PLACEHOLDER}
											onChange={emailCompany}
											value={EMAILCO}
										/>
										<Dropdown 
										// style={{marginRight:70*DP}}
										style={[btn.followButton,btn.shadow,!data.isFollowed&&{backgroundColor:'#fff', width: 50*DP,marginBottom:30*DP}]}
										dropdownContainerStyle={[btn.followButtonDropDownEmpty,!data.isFollowed&&{backgroundColor:'#fff', width:240*DP},btn.shadow,{elevation:3},followBtnAniStyleEmail]}
										data={[EMAIL_NAVER, EMAIL_DAUM, EMAIL_KAKAO, EMAIL_NATE, EMAIL_GMAIL, INPUT_DIRECT]}
										// onSelect={selectAreaCode}
										// dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
										dropItemTxtStyle={[txt.regular28cjk,data.isFollowed?txt.white:{color:'black'}]}
										listBackgroundStyle={[{height: 330 * DP,width:150* DP, marginTop:80*DP},followBtnItemListStyleEmail]}
										listContainerStyle={{height:330*DP,justifyContent:'space-between',alignItems:'center'}}
										// onSelect={(e)=>{alert(e)}}
										onSelect={(e)=>{selectEmailco(e)}} 
										onSelectNotClose={false}
										onOpen={()=>{followBtnAnimationEmail.value=withSpring(1,{duration:300})}}
										onClose={()=>{followBtnAnimationEmail.value=withTiming(0,{duration:300})}}
										animation
										component={
											<>
												{/* <Text style={[text.regular24cjk,data.isFollowed?text.white:{color:'#000'}]}>{data.isFollowed?'팔로우 중':'팔로우2323'}</Text> */}
												<Text style={[txt.regular24cjk,data.isFollowed?txt.white:{color:'#000'}]}>{}</Text>
												<SvgWrapper style={[btn.followButtonBracketsize,followBtnBracketStyleEmail]} svg={<DownBracket fill={data.isFollowed?'#ff0000':'#000'}/>} />
											</>
										}
										/>
									</View>
							</View>
						)}

							<View style={form.verifycation_mobile_group}>
									{/*추후 TextInput에 keyboardType = 'numeric' 속성 넣어서 숫자만 입력, 입력 가능한 자릿수 제한 할 것*/}
										<FormTxtInput
											style={{width: '40%'}}
											inputStyle={[form.verify_number, txt.noto28]}									
											placeholder={INPUT_VERIFYCATION_NUM}
											placeholderTextColor={GRAY_PLACEHOLDER}
											onChange={phonenum}></FormTxtInput>		

										<FormTxtInput
											style={{width: '20%'}}
											inputStyle={[form.verify_time, txt.noto28]}									
											placeholder={'05:00'}
											placeholderTextColor={GRAY_PLACEHOLDER}
											onChange={phonenum}></FormTxtInput>		

										<TouchableWithoutFeedback onPress={() => alert('준비중입니다.\n인증 확인을 눌러주세요.')}>
											<View style={[btn.re_verify_button, btn.shadow]}>
												<Text style={[txt.noto32b, txt.white]}>{REQUEST_VERIFYCATION}</Text>
											</View>
										</TouchableWithoutFeedback>
									</View>

					</View>
				</View>

				<TouchableWithoutFeedback onPress={confirmNum}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{CHECK_VERIFYCATION}</Text>
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
