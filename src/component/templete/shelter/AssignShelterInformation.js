import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, GRAY20, GRAY30, GRAY40, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import {login_style, btn_style, temp_style, progressbar_style, assignShelterInformation_style} from 'Templete/style_templete';
import InputWithSelect from 'Molecules/input/InputWithSelect';
import InputWithEmail from 'Molecules/input/InputWithEmail';
import {stagebar_style} from 'Organism/style_organism copy';
import {Calendar48_Border} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';
import StageBar from 'Molecules/info/Stagebar';
import {INITIAL_NUMBER} from 'Root/i18n/msg';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default AssignShelterInformation = props => {
	const [data, setData] = React.useState({
		...props.route.params.data,
		shelter_delegate_contact_number: '',
		user_email: '',
		shelter_homepage: '',
		shelter_foundation_date: '',
	});

	const [phoneConfirmed, setPhoneConfirmed] = React.useState(false);
	const [emailConfirmed, setEmailConfirmed] = React.useState(false);

	//확인버튼 클릭
	const goToNextStep = () => {
		console.log(data);
		props.navigation.push('CheckShelterPassword', data);
	};
	const number = `핸드폰 번호를 입력해 주세요 ('-'제외)`;
	React.useEffect(() => {
		console.log('이메일 정규식 체크', emailConfirmed);
		console.log('휴대전화 정규식 체크', phoneConfirmed);
	}, [phoneConfirmed, emailConfirmed]);

	//홈페이지
	const onChangeHp = hp => {
		// console.log(hp);
		setData({...data, shelter_homepage: hp});
	};

	//전화번호
	const onChangePhoneNumber = num => {
		setData({...data, shelter_delegate_contact_number: num});
	};

	//이메일
	const onChangeEmail = email => {
		// var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		// setEmailConfirmed(regEmail.test(email));
		setData({...data, user_email: email});
	};

	React.useEffect(() => {
		var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		setEmailConfirmed(regEmail.test(data.user_email));
	}, [data]);

	const onClearHomepage = () => {
		setData({...data, shelter_homepage: ''});
	};

	//설립일
	const onChangeDate = date => {
		// console.log(date);
		setData({...data, shelter_foundation_date: date});
	};

	const onValidEmail = isValid => {
		// console.log('isValid', isValid);
		// setEmailConfirmed(isValid);
	};

	const onValidPhoneNumber = isValid => {
		// let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		console.log('onValidPhoneNumber', data.shelter_delegate_contact_number.length >= 7);
		setPhoneConfirmed(9 < data.shelter_delegate_contact_number.length);
	};

	const phoneValidate = num => {
		return num.length >= 7;
	};

	const onPressDatePicker = () => {
		// console.log('dd');
		Modal.popSelectDateModal('보호소 설립일 선택', date => {
			console.log('date', date);
			setData({...data, shelter_foundation_date: date});
			Modal.close();
		});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[styles.stageBar, {marginTop: 20 * DP}]}>
				<StageBar
					backgroundBarStyle={styles.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					// insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={3} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={640 * DP} //bar의 너비
				/>
			</View>
			<View style={[styles.textMsg]}>
				<Text style={[txt.noto24]}>
					'<Text style={{color: 'red'}}>*</Text>'는 필수 입력해야하는 사항입니다.
				</Text>
			</View>
			{/* InputForm */}
			<View style={[styles.inputFormContainer]}>
				{/* (M)전화번호 */}
				<View style={[styles.inputWithSelect]}>
					{/* <InputWithSelect
						value={data.shelter_delegate_contact_number}
						placeholder={'전화번호 입력란'}
						title={'전화번호'}
						title_star={true}
						items={INITIAL_NUMBER}
						keyboardType={'number-pad'}
						validator={phoneValidate}
						onChange={onChangePhoneNumber}
						onValid={onValidPhoneNumber}
						confirm={phoneConfirmed}
						maxlength={8}
						width={420}
					/> */}
					<Input24
						showTitle={true}
						title={'전화번호'}
						title_star={true}
						width={694}
						height={104}
						placeholder={number}
						onChange={onChangePhoneNumber}
						onValid={onValidPhoneNumber}
						validator={phoneValidate}
						value={data.shelter_delegate_contact_number}
						confirm={phoneConfirmed}
						moreInfo={'*기재한 전화번호로 로그인이 가능합니다.'}
						// confirm

						// showMsg={true}
						alert_msg={'이름은 2자 이상으로 설정해주세요 '}
						confirm_msg={'양식에 맞는 이름입니다.'}
						maxLength={15}
					/>
					{/* <Text style={{color: GRAY10}}>*기재한 전화번호로 로그인이 가능합니다.</Text> */}
				</View>

				{/* (M)이메일 */}
				<View style={[temp_style.inputWithSelect_assignShelterInformation, assignShelterInformation_style.inputWithEmail]}>
					<InputWithEmail
						value={data.user_email}
						placeholder={'이메일을 입력해 주세요'}
						title={'E-mail'}
						title_star={false}
						width={367}
						onChange={onChangeEmail}
						onValid={onValidEmail}
					/>
				</View>

				{/* (M)홈페이지 */}
				<View style={[temp_style.inputWithSelect_assignShelterInformation, assignShelterInformation_style.input24A]}>
					<Input24
						value={data.shelter_homepage}
						title={'홈페이지'}
						placeholder={'http:// 주소를 입력해 주세요'}
						descriptionType={'none'}
						showHttp={true}
						width={694}
						height={104}
						showCrossMark={true}
						maxlength={80}
						onClear={onClearHomepage}
						onChange={onChangeHp}
					/>
				</View>

				{/* (M)설립일 */}
				<View style={[styles.datePicker_assignShelterInformation, assignShelterInformation_style.datePicker]}>
					{/* <DatePicker width={654} title={'설립일'} onDateChange={onChangeDate} future={false} /> */}
					<Text style={[txt.noto28]}>설립일</Text>
					<View style={[{flex: 1}]}>
						<TouchableOpacity style={[styles.datePickerContainer]} onPress={onPressDatePicker}>
							<Text style={[txt.noto32]}>{data.shelter_foundation_date ? data.shelter_foundation_date : '설립일을 지정해주세요.'}</Text>
							<Calendar48_Border />
						</TouchableOpacity>
					</View>
				</View>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, assignShelterInformation_style.btn_w654]}>
				{!phoneConfirmed ? (
					<AniButton btnTitle={'확인'} btnLayout={btn_w694_r30} disable titleFontStyle={32} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} btnLayout={btn_w694_r30} btnStyle={'border'} titleFontStyle={32} onPress={goToNextStep} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	stageBar: {
		width: 694 * DP,
		height: 32 * DP,
	},
	backgroundBar: {
		width: 640 * DP,
		height: 20 * DP,
		backgroundColor: 'white',
		borderRadius: 20 * DP,
		borderWidth: 4 * DP,
		// borderColor: APRI10,
		borderColor: MAINBLACK,
	},
	textMsg: {
		width: 694 * DP,
		marginTop: 12 * DP,
	},
	inputFormContainer: {
		width: 694 * DP,
		height: 700 * DP,
		marginTop: 84 * DP,
	},
	inputWithSelect: {
		width: 694 * DP,
		height: 144 * DP,
		justifyContent: 'space-between',
	},
	datePickerContainer: {
		width: 694 * DP,
		height: 104 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingVertical: 15 * DP,
		paddingHorizontal: 20 * DP,
		backgroundColor: '#FAFAFA',
		borderRadius: 30 * DP,
	},
	datePicker_assignShelterInformation: {
		width: 694 * DP,
		// height: 122 * DP,
		alignContent: 'center',
	},
});
