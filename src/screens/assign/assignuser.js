import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR} from 'Screens/color';
import {CancelInput} from 'Asset/image';
import {BTN_CHECK, REQ_NAME, REQ_PHONE_NUM, TAB_VERIFY_EMAIL, TAB_VERIFY_PHONE, ASSIGN_USER_DESCRIPTION, REQ_EMAIL} from 'Screens/msg';
import {DownBracketBlack} from 'Asset/image';
import {txt, lo, btn, form, tab} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';

export default AssignUser = props => {
	const [description, setDescription] = React.useState(ASSIGN_USER_DESCRIPTION);
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
					<View style={(lo.cntr_txt_input, {marginBottom: 32 * DP})}>
						<FormTxtInput
							inputStyle={[form.input_name, txt.noto28, {marginBottom: 20 * DP}]}
							placeholder={REQ_NAME}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={namechange}></FormTxtInput>

						{ui.mode === TAB_VERIFY_PHONE && (
							<View style={form.input_mobile_email}>
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
					</View>
				</View>

				<TouchableWithoutFeedback onPress={check}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
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
