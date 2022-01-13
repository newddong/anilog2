import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Modal} from 'react-native';

import {Bracket, DownBracketBlack} from 'Asset/image';
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
	BTN_NEXT,
	REQ_CODE_NOUN,
} from 'Screens/msg';
import Dropdown from 'Screens/common/dropdown';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const ShelterContext = React.createContext({
	code:'',
	shelter_name:'',
	shelter_addr:'',
	shelter_addr_detail:'',
	shelter_phone_num:'',
	shelter_area_code:'',
	shelter_email:'',
	shelter_email_company:'',
	shelter_homepage:'',
	sheleter_foundation_year:'',
	sheleter_foundation_month:'',
	sheleter_foundation_day:'',
});
export default AssignShelter = props => {
	const [btnActive, setBtnActive] = React.useState(true);
	const codeconfirmed = () => {
		props.navigation.push('Assign_shelter_step1', {title: '보호소 등록'});
	};

	return (
		<ShelterContext.Provider
			value={{
				code:'',
			}}
		>
			<View style={lo.wrp_main}>
				<View style={lo.contents}>
					<View style={lo.sctn_shelter_first}>

						{/* 발급받은 코드를 입력해 주세요. */}
						<Text style={[txt.noto28, {marginTop: 216 * DP, marginBottom: 115 * DP}]}>{REQ_CODE_DESCRIPTION}</Text>
						{/* 코드 입력 */}
						<View style={lo.shelter_form}>
							<FormTxtInput
								style={{marginBottom: 20 * DP}}
								inputStyle={[form.input_shelter_code, txt.noto28]}
								placeholder={REQ_CODE_NOUN}
								placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>
						</View>
						
						{/* 보호소 등록을 하고 싶으신가요? */}
						<TouchableWithoutFeedback onPress={() => alert('준비중입니다.')}>
						<View style={form.shelter_assign_inquiry}>
							<Text style={[txt.noto24, txt.gray, {marginRight: 15 * DP}]}>{ASK_SHELTER_ASSIGN}</Text>
							<Text style={[txt.noto24b, {color: BLACK}]}>{INQUIRY}</Text>
							<SvgWrap style={{width: 30 * DP, height: 30 * DP}} svg={<Bracket fill={BLACK} />} />
						</View>
						</TouchableWithoutFeedback>

					</View>

					{!btnActive ? (
						<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{BTN_NEXT}</Text>
						</View>
					) : (
						// 다음 버튼
						<TouchableWithoutFeedback onPress={codeconfirmed}>
							<View style={[btn.confirm_button, btn.shadow]}>
								<Text style={[txt.noto32b, txt.white]}>{BTN_NEXT}</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>
			</View>
		</ShelterContext.Provider>
	);
};

export const StageBar = props => {
	return (
		<View style={{...props.style, flexDirection: 'row', alignItems: 'center'}}>
			<View style={{backgroundColor: GRAY_BRIGHTEST, width: props.width, height: 16 * DP, borderRadius: 8 * DP, marginRight: 8 * DP}}>
				<View
					style={{backgroundColor: MAINCOLOR, width: (props.width / props.maxstage) * props.current, height: 16 * DP, borderRadius: 8 * DP}}></View>
			</View>
			<Text style={[txt.roboto24, {color: GRAY}]}>
				{props.current}/{props.maxstage}
			</Text>
		</View>
	);
};
