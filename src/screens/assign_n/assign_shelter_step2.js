import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Modal} from 'react-native';

import {Bracket, DownBracketBlack,ProgressbarAssign_2,CalendarIcon} from 'Asset/image';
import DP from 'Screens/dp';
import {SvgWrap} from 'Screens/svgwrapper';
import {BLACK, GRAY, GRAY_PLACEHOLDER, GRAY_BRIGHT, MAINCOLOR, GRAY_BRIGHTEST, RED} from '../color';
import FormTxtInput from 'Screens/common/formtxtinput';
import {lo, txt, form, btn} from './style_assign';
import {
	BTN_CHECK,
	INQUIRY,
	REQ_CODE,
	REQ_CODE_DESCRIPTION,
	ASK_SHELTER_ASSIGN,
	COMPLETE_ASSIGN,
	SHELTER_NAME,
	SHELTER_ADDRESS,
	REQ_SHELTER_NAME,
	REQ_SHELTER_ADDRESS,
	REQ_DETAIL_ADDRESS,
	SHELTER_PHONE_NUM,
	SHELTER_EMAIL,
	SHELTER_HOMEPAGE,
	SHELTER_DATE_FOUNDATION,
	REQ_SHELTER_URI,
	REQ_SHELTER_PHONE,
} from 'Screens/msg';
import Dropdown from 'Screens/common/dropdown';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StageBar} from './assignshelter';

export default SecondStage = props => {
	const [data, setData] = React.useState({
      ...props.route.params?.data,
		area_code: '02',
		userEmailCompany: null,
      userEmail:null,
      userPhoneNum:null,
		emailCompany: 'naver.com',
		homepage: 'http://'
	});

	const emailCompany = e => {
		setData({...data, userEmailCompany: e.nativeEvent.text});
	};

	const selectEmailCompany = item => {
		setData({...data, emailCompany: item});
	};

	const selectAreaCode = item => {
		setData({...data, area_code: item});
	};

   const emailInput = (e) => {
      setData({...data, userEmail: e.nativeEvent.text});
   }

   const phonenumInput = (e) => {
      setData({...data, userPhoneNum: e.nativeEvent.text});
   }

   const [btnActive, setBtnActive] = React.useState(true);

   const goNext =()=>{
      console.log(data);
      props.navigation.push('Assign_shelter_step3',{title: '보호소 등록',data:data});
   }

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				{/* <StageBar style={{marginTop: 30 * DP, marginBottom: 78 * DP}} width={600 * DP} current={2} maxstage={3} /> */}
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginBottom: 78 * DP}} svg={<ProgressbarAssign_2/>} />
				<View style={[lo.shelter_form, {marginBottom: 70 * DP}]}>
					<View style={{marginBottom: 50 * DP}}>
						<Text style={[txt.noto30, {color: MAINCOLOR}]}>
							{SHELTER_PHONE_NUM}
							<Text style={{color: RED}}> * 등록한 전화번호로 로그인이 가능합니다.</Text>
						</Text>
						<View style={{flexDirection: 'row'}}>
							<Dropdown
								style={[form.input_shelter_code, {flexDirection: 'row', width: '30%', alignItems: 'center', justifyContent: 'space-around'}]}
								dropdownContainerStyle={[btn.cntr_dropdown, {width: 150 * DP, backgroundColor: form.input_shelter_code.backgroundColor}]}
								data={['02', '051', '031', '032']}
								onSelect={selectAreaCode}
								dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
								dropItemTxtStyle={[txt.roboto28]}
								dropDownStyle={{height: 300 * DP}}
								component={
									<>
										<Text style={txt.roboto28}>{data.area_code}</Text>
										<SvgWrap style={{height: 12 * DP, width: 20 * DP}} svg={<DownBracketBlack />} />
									</>
								}
							/>
							<FormTxtInput
								style={{marginBottom: 1 * DP,  width: '70%'}}
								inputStyle={[form.input_shelter_code, txt.noto28]}
								placeholder={REQ_SHELTER_PHONE}
								placeholderTextColor={GRAY_PLACEHOLDER}
                        onChange={phonenumInput}
							/>
						</View>
					</View>
					<Text style={[txt.noto30, {color: MAINCOLOR}]}>
						{SHELTER_EMAIL}
						<Text style={{color: RED}}>*</Text>
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10 * DP}}>
						<FormTxtInput
							style={{width: 300 * DP}}
							inputStyle={[form.input_shelter_code, txt.noto28]}
							placeholder={SHELTER_EMAIL}
							placeholderTextColor={GRAY_PLACEHOLDER}
                     onChange={emailInput}
						/>
						<Text style={[form.input_shelter_code, txt.noto28, {width: 90 * DP}]}>@</Text>

						{data.emailCompany === '직접입력' ? (
							<FormTxtInput
								inputStyle={[form.email_input, txt.noto28, {width: 250 * DP}]}
								placeholder={'naver.com'}
								placeholderTextColor={GRAY_PLACEHOLDER}
								value={data.userEmailCompany}
								onChange={emailCompany}
							/>
						) : (
							<Dropdown
								style={[form.input_shelter_code, {flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around'}]}
								dropdownContainerStyle={[btn.cntr_dropdown, {width: 260 * DP, backgroundColor: form.input_shelter_code.backgroundColor}]}
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
					<View style={{flexDirection: 'column', marginTop: 30 * DP}}>
						<Text style={[txt.noto30, {color: MAINCOLOR}]}>
							{'홈페이지'}
							<Text style={{color: RED}}>*</Text>
						</Text>
						<FormTxtInput
							inputStyle={[form.input_name, txt.noto28, {marginBottom: 20 * DP}]}
							placeholder={'홈페이지'}
							placeholderTextColor={GRAY_PLACEHOLDER}
							value={'http://'}
							></FormTxtInput>						
					</View>
					<View style={{flexDirection: 'column', marginTop: 30 * DP}}>
						<Text style={[txt.noto30, {color: MAINCOLOR}]}>
							{'설립일'}
							<Text style={{color: RED}}>*</Text>
						</Text>
						<View style={{flexDirection: 'row'}}>
							<FormTxtInput
								inputStyle={[form.input_name, txt.noto28, {marginBottom: 20 * DP, width: 600 * DP}]}
								placeholder={'캘린더를 선택해서 기입해 주세요.'}
								placeholderTextColor={GRAY_PLACEHOLDER}							
								>
							</FormTxtInput>
							<SvgWrap style={{width: 60 * DP, height: 60 * DP, alignItems:'center'}} svg={<CalendarIcon/>}  onPress={() => alert('준비중입니다.')}/>												
						</View>				
					</View>
				</View>
            {!btnActive ? (
					<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
					</View>
				) : (
					<TouchableWithoutFeedback onPress={goNext}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
		</View>
	);
};
