import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {layoutstyles, textstyles, buttonstyle, formstyles, verifyuser} from './style_login';
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
	RESET_PASSWORD,
	TAB_VERIFY_PHONE,
	TAB_VERIFY_EMAIL,
	VERIFY_USER_DESCRIPTION_PASS,
	REQ_NAME,
	REQ_PHONE_NUM,
	INPUT_VERIFYCATION_NUM,
	REQUEST_VERIFYCATION,
	CHECK_VERIFYCATION,
	REQ_EMAIL,
	FINDED_ACCOUNT,
	VERIFYCATION_NULL,
} from 'Screens/msg';
import {DownBracketBlack, CancelInput} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import axios from 'axios';

export default Verifypass_step1 = props => {

	const [description, setDescription] = React.useState(VERIFY_USER_DESCRIPTION_PASS);
	const [ui, setUI] = React.useState({mode: TAB_VERIFY_PHONE, description: true, checked: false});

	// const completeAssign =() => {
	// 	// props.navigation.navigate('Assign');
	// 	//서버에 유저 추가 신청
	// 	//아이디 중복체크, 비밀번호 유효성 체크, 서버작업 필요
	// 	props.navigation.navigate('AssingProfile',{title: '프로필 등록',data:data});
	// 	/*axios.post('https://api.zoodoongi.net/user/add',{id:data.phone||data.email,password:data.password,name:data.name}).then(
	// 		(res)=>{
	// 			// console.log(res);
	// 			//성공후 이동
	// 			props.navigation.navigate('AssingProfile',{title: '프로필 등록',data:data});
	// 		}
	// 	)*/
	// }

	// const inputPwd =(e) => {
	// 	setData({...data,password:e.nativeEvent.text,input:e.nativeEvent.text});
	// }

	// const [data,setData] =React.useState({
	// 	...props.route.params.data,
	// 	password:'',
	// 	input:'',
	// 	check:'',
	// });
	
	// React.useEffect(()=>{
	// 	console.log(data);
	// 	if(data.input===data.check&&data.input.length>=8&&data.check.length>=8){
	// 		//유효성 검사 로직 필요
	// 		setMatch(true);
	// 	}else{
	// 		setMatch(true);
	// 	}
	// },[data])

	const [idCheck, setMatch] = React.useState(false);

	// const check = () => {
	// 	switch (ui.mode) {
	// 		case TAB_VERIFY_PHONE:
	// 			props.navigation.push('VerifyMobile', {title: TAB_VERIFY_PHONE, data: data});
	// 			break;
	// 		case TAB_VERIFY_EMAIL:
	// 			props.navigation.push('VerifyEmail', {title: TAB_VERIFY_EMAIL, data: data});
	// 			break;
	// 	}
	// };

	const confirmNum = () => {
		setTimeout(()=>{

			props.navigation.push('Verifypass_step2', {title: '비밀전호 재설정', data:data});
			//비밀번호 재설정 화면으로 넘어가기 위해서 팝업창 해제
			setMatch(false);
		},1500);
		console.log('confirmNum------')
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

	// const followBtnAnimation = useSharedValue(0);
	// const followBtnAniStyle = useAnimatedStyle(() => ({
	// 	height:(followBtnAnimation.value * 300 + 60)*DP
	// }));
	// const followBtnItemListStyle = useAnimatedStyle(()=>({
	// 	transform:[{scaleY:followBtnAnimation.value}]
	// }));
	// const followBtnBracketStyle = useAnimatedStyle(()=>({
	// 	transform:[{rotate:`${followBtnAnimation.value*180}deg`}]
	// }));

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
			
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
								{/* <View style={form.select_mobile}>
									<Text style={txt.roboto28}>선택</Text>
									<SvgWrap style={{height: 12 * DP, width: 20 * DP}} svg={<DownBracketBlack />} />
								</View> */}

								<FormTxtInput
									style={{width: '100%'}}
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
								{data.emailCompany === '직접입력' ? (
									<FormTxtInput
										inputStyle={[form.email_input, txt.noto28,{width:250*DP}]}
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
										style={form.select_email}
										dropdownContainerStyle={[btn.cntr_dropdown, {width: form.select_email.width}]}
										data={['직접입력', 'naver.com', 'daum.net', 'gmail.com']}
										onSelect={selectEmailCompany}
										dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
										dropItemTxtStyle={[txt.roboto28, {color: GRAY}]}
										dropDownStyle={{height: 350 * DP}}
										component={
											<>
												<Text style={[txt.roboto28, {color: GRAY}]}>{data.emailCompany}</Text>
												<SvgWrap style={{height: 12 * DP, width: 20 * DP}} svg={<DownBracketBlack />} />
											</>
										}
									/>									
								)}
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

				{/* 가입 정보가 확인 되었습니다. */}
				{idCheck&&(
					<View style={[verifyuser.msg_pop, buttonstyle.shadow]}>
						<Text style={[textstyles.noto30b, {color: GRAY}]}>{FINDED_ACCOUNT}</Text>
					</View>
				)}

				<TouchableWithoutFeedback onPress={confirmNum}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{CHECK_VERIFYCATION}</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);

	// return (
	// 	<View style={lo.wrp_main}>
	// 		<View style={lo.contents}>
				
	// 			<View style={[lo.pass_form, {marginTop: 70 * DP}]}>
	// 					<Text style={[txt.noto24,{color:GRAY_PLACEHOLDER}]}>{VERIFY_CONDITION}</Text>
						
	// 					<FormTxtInput onChange={inputPwd} password style={{marginBottom:20*DP}} inputStyle={[form.input_name,txt.noto28]} placeholder={REQ_PASSWORD} placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>
						
	// 					<Text style={[txt.noto30,{color:GRAY}]}>{CHECK_PASS}</Text>
	// 					<FormTxtInput 
	// 							onChange={checkPwd}
	// 							password
	// 							inputStyle={[txt.noto28,form.mobile_input]}
	// 							placeholder={REQ_PASSCHECK}
	// 							placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>
	// 			</View>

	// 			<View style={[lo.confirm_status,{borderTopColor:match?GREEN:RED}]}>
	// 				{!match&&<Text style={[txt.noto30,{color:RED}]}>{FAIL_PASS_CHECK}</Text>}
	// 			</View>

	// 			{!match?<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
	// 				<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
	// 			</View>:
	// 			<TouchableWithoutFeedback onPress={completeAssign}>
	// 				<View style={[btn.confirm_button, btn.shadow]}>
	// 					<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
	// 				</View>
	// 			</TouchableWithoutFeedback>}
				

	
	// 			{false&&<View style={[lo.msg_pop,btn.shadow]}>
	// 				<Text style={[txt.noto30b,{color:GRAY}]}>{COMPLETE_VERIFYCATION}</Text>
	// 			</View>}
	// 			{false&&<View style={[lo.msg_pop,btn.shadow]}>
	// 				<Text style={[txt.noto30b,{color:GRAY}]}>{CHECK_VERIFYCATION_NUM1}</Text>
	// 			</View>}

	// 		</View>
	// 	</View>
	// );
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
