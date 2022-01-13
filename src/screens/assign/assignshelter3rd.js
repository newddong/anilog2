import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Modal } from 'react-native';

import { Bracket, DownBracketBlack } from 'Asset/image';
import DP from 'Screens/dp';
import { SvgWrap } from 'Screens/svgwrapper';
import { BLACK, GRAY, GRAY_PLACEHOLDER, GRAY_BRIGHT, MAINCOLOR, GRAY_BRIGHTEST, RED } from '../color';
import FormTxtInput from 'Screens/common/formtxtinput';
import { lo, txt, form, btn } from './style_assign';
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
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StageBar } from './assignshelter';
import axios from 'axios';

export default ThirdStage = props => {
	const [layout, setLayout] = React.useState({});
	const [data, setData] = React.useState({
		...props.route.params?.data,
		homepageUri: '',
		foundationData: { year: '연도', month: '월', day: '일' },
	});
	const selectYear = item => {
		console.log(item);
		setData({ ...data, foundationData: { ...data.foundationData, year: item } });
	};
	const selectMonth = item => {
		setData({ ...data, foundationData: { ...data.foundationData, month: item } });
	};
	const selectDay = item => {
		setData({ ...data, foundationData: { ...data.foundationData, day: item } });
	};
	const homepageInput = (e) => {
		setData({ ...data, homepageUri: e.nativeEvent.text });
	}

	const [btnActive, setBtnActive] = React.useState(true);

	const goNext = () => {
		console.log(data);
		//서버에 유저 추가 신청
		//아이디 중복체크, 비밀번호 유효성 체크, 서버작업 필요
		axios.post('https://api.zoodoongi.net/user/add', {
			userType: 'shelter',
			shelter_name: data.shelter_name,
			shelter_addr: data.shelter_addr + ' ' + data.shelter_addr_detail,
			shelter_phone: data.area_code + '-' + data.userPhoneNum,
			shelter_email: data.userEmail + '@' + (data.userEmailCompany !== null ? data.userEmailCompany : data.emailCompany),
			shelter_url: data.homepageUri,
			shelter_foundation_date: new Date(data.foundationData.year, data.foundationData.month - 1, data.foundationData.day),
		}).then(res => {
			console.log(res);
			// 성공후 이동
			props.navigation.navigate('Login');
		});
	};

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<StageBar style={{ marginTop: 30 * DP, marginBottom: 78 * DP }} width={600 * DP} current={3} maxstage={3} />
				<View style={[lo.shelter_form, { marginBottom: 70 * DP }]}>
					<View style={{ marginBottom: 80 * DP }}>
						<Text style={[txt.noto30, { color: GRAY }]}>{SHELTER_HOMEPAGE}</Text>
						<FormTxtInput
							style={{ marginBottom: 20 * DP }}
							inputStyle={[form.input_shelter_code, txt.noto28]}
							placeholder={REQ_SHELTER_URI}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={homepageInput}
						/>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 * DP, justifyContent: 'space-between' }}>
						<Text style={[txt.noto30, { color: GRAY }]}>{SHELTER_DATE_FOUNDATION}</Text>

						<Dropdown
							style={[{ width: 172 * DP, height: 48 * DP }, btn.dropdown]}
							dropdownContainerStyle={[btn.cntr_dropdown, { width: 172 * DP }]}
							data={Array.from({ length: 75 }, (v, i) => i + 1950).reverse()}
							onSelect={selectYear}
							dropItemStyle={{ marginVertical: 3 * DP, paddingHorizontal: 30 * DP }}
							dropItemTxtStyle={[txt.roboto28, { color: 'black' }]}
							dropDownStyle={{ height: 350 * DP }}
							component={
								<>
									<Text style={txt.noto24}>{data.foundationData.year}</Text>
									<SvgWrap style={{ height: 12 * DP, width: 20 * DP }} svg={<DownBracketBlack />} />
								</>
							}
						/>

						<Dropdown
							style={[{ width: 144 * DP, height: 48 * DP }, btn.dropdown]}
							dropdownContainerStyle={[btn.cntr_dropdown, { width: 144 * DP }]}
							data={Array.from({ length: 12 }, (v, i) => i + 1)}
							onSelect={selectMonth}
							dropItemStyle={{ marginVertical: 3 * DP, paddingHorizontal: 30 * DP }}
							dropItemTxtStyle={[txt.roboto28, { color: 'black' }]}
							dropDownStyle={{ height: 350 * DP }}
							component={
								<>
									<Text style={txt.noto24}>{data.foundationData.month}</Text>
									<SvgWrap style={{ height: 12 * DP, width: 20 * DP }} svg={<DownBracketBlack />} />
								</>
							}
						/>
						<Dropdown
							style={[{ width: 144 * DP, height: 48 * DP }, btn.dropdown]}
							dropdownContainerStyle={[btn.cntr_dropdown, { width: 144 * DP }]}
							data={Array.from({ length: 31 }, (v, i) => i + 1)}
							onSelect={selectDay}
							dropItemStyle={{ marginVertical: 3 * DP, paddingHorizontal: 30 * DP }}
							dropItemTxtStyle={[txt.roboto28, { color: 'black' }]}
							dropDownStyle={{ height: 350 * DP }}
							component={
								<>
									<Text style={txt.noto24}>{data.foundationData.day}</Text>
									<SvgWrap style={{ height: 12 * DP, width: 20 * DP }} svg={<DownBracketBlack />} />
								</>
							}
						/>
					</View>
				</View>
				{!btnActive ? (
					<View style={[btn.confirm_button, { backgroundColor: GRAY_BRIGHT }, btn.shadow]}>
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
