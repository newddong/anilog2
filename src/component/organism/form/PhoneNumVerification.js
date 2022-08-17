import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {APRI10, GRAY10, GREEN, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {mobile_carrier} from 'Root/i18n/msg';
import {btn_w226} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import Input30 from 'Molecules/input/Input30';
import InputTimeLimit from 'Molecules/input/InputTimeLimit';
import InputWithSelect from 'Molecules/input/InputWithSelect';
import {btn_style, temp_style} from 'Templete/style_templete';
import {phoneNumVerification} from 'Organism/style_organism copy';
import DP from 'Root/config/dp';
import {style} from 'Root/component/templete/protection/EditAidRequest';
import Input24 from 'Root/component/molecules/input/Input24';
/**
 *

 * @param {object} props.asyncConfirm - 인증 여부
 * @param {boolean} props.failed - 인증 failed -인증 실패시 true
 * @param {void} props.mobileNumValidator - 전화번호 형식 확인
 * @param {void} props.nameValidator - 이름 형식 확인
 * @param {void} props.onMobileCompanyInputChange - 통신사 입력
 * @param {void} props.onNameInputChange - 이름 입력
 * @param {void} props.onPhoneNumberInputChange - 전화번호 입력
 * @param {void} props.onValid - 이름 전화번호 통신사 유효 확인
 * @param {void} props.onVerificatiionNumberChange - 인증번호 입력
 * @param {void} props.requestReVerification - 재인증
 * @param {void} props.requestVerification - 인증
 * @param {void} props.verifyNumValidator - 인증번호 유효확인
 * @param {object} props.userData - 사용자 정보
 * @param {boolean} props.phoneVerified - 전화번호 인증 여부 true - 성공
 * @param {boolean} props.presentPwdValid - 현재 비밀번호 값과 DB값의 일치 상태
 * @param {boolean} props.pwdCheck - 비밀번호 확인 통과 상태
 *
 *
 */
export default PhoneNumVerification = props => {
	// const [timeOut, setTimeOut] = React.useState(false);
	// const [timeLimit, setTimeLimit] = React.useState({limit: props.verifyTimeLimit});
	// const [validMobile, setValidMobile] = React.useState(false);
	// const [validVerifyNum, setValidVerifyNum] = React.useState(false);
	const [userName, setUserName] = React.useState('');
	const validMobile = React.useRef(false);
	const validVerifyNum = React.useRef(false);
	const [validName, setValidName] = React.useState(false);
	const [validPhone, setValidPhone] = React.useState(false);
	console.log('PhonenUmverification props', props);
	// const onEndTimer = () => {
	// 	setTimeOut(true);
	// };
	// const requestReVerification = () => {
	// 	if (!validMobile.current) {
	// 		Modal.popOneBtn('휴대전화번호를 먼저 입력해주세요.', '확인', () => Modal.close());
	// 	} else {
	// 		setTimeOut(false);
	// 		setTimeLimit({limit: props.verifyTimeLimit});
	// 		props.requestReVerification();
	// 	}
	// };
	// const requestVerification = () => {
	// 	console.log('validMobile', validMobile);
	// 	if (!validMobile.current) {
	// 		Modal.popOneBtn('휴대전화번호를 먼저 입력해주세요.', '확인', () => Modal.close());
	// 	} else {
	// 		props.requestVerification();
	// 	}
	// };

	const onNameInputChange = text => {
		setUserName(text);
		props.onNameInputChange(text);
	};
	const onPhoneNumberInputChange = number => {
		props.onPhoneNumberInputChange(number);
	};
	const onMobileCompanyInputChange = (company, index) => {
		props.onMobileCompanyInputChange(company, index);
	};
	const onVerificationNumberChange = verified_num => {
		props.onVerificationNumberChange(verified_num);
	};

	const onValidMobileNum = isValid => {
		// console.log('onValidMobileNum', isValid);
		setValidPhone(isValid);
		validMobile.current = isValid;
		props.onValid && props.onValid(isValid && validVerifyNum.current && props.asyncConfirm.isConfirm && validName);
	};

	const mobileValidator = mobileNum => {
		let isValid = props.mobileNumValidator && props.mobileNumValidator(mobileNum); //휴대폰 번호 검증
		return isValid;
	};

	const onValidVerifyNum = isValid => {
		validVerifyNum.current = isValid;
		props.onValid && props.onValid(isValid && validMobile.current && props.asyncConfirm.isConfirm && validName);
	};
	const verifyNumValidator = verifyNum => {
		let isValid = props.verifyNumValidator && props.verifyNumValidator(verifyNum); //인증 번호 검증
		return isValid;
	};

	const nameValidator = name => {
		let isValid = props.nameValidator && props.nameValidator(name); //휴대폰 번호 검증
		return isValid;
		// return name.length > 0;
	};

	const onValidName = isValid => {
		setValidName(isValid);
	};

	React.useEffect(() => {
		// console.log('plzz valid', validName, validMobile.current, validPhone);
		if (validName && validPhone) {
			props.onValid(true);
		}
	}, [userName, validPhone]);

	React.useEffect(() => {
		let isValid = validVerifyNum.current && validMobile.current && props.asyncConfirm.isConfirm && validName;
		// console.log('isValid', isValid);
		if (!isValid) {
			// !validVerifyNum.current ? console.log('validVerifyNum.current') : null;
			!validMobile.current ? console.log('validMobile.current') : null;
			// !props.asyncConfirm.isConfirm ? console.log('props.asyncConfirm.isConfirm') : null;
			// !validName ? console.log('validName') : null;
		}
		props.onValid && props.onValid(isValid);
	}, [validVerifyNum, validName, validMobile, props.asyncConfirm]);

	// React.useEffect(() => {
	// 	setTimeLimit({...timeLimit, limit: props.verifyTimeLimit});
	// 	console.log('시간 재설정');
	// }, [props.verifyTimeLimit]);

	return (
		<View style={[styles.container]}>
			<View style={[styles.input30]}>
				<Input24
					showTitle={false}
					width={694}
					height={104}
					placeholder={'이름을 입력해주세요'}
					onChange={onNameInputChange}
					onValid={onValidName}
					validator={nameValidator}
					value={userName}
					confirm={nameValidator}
					alert_msg={'이름은 2자 이상으로 설정해주세요 '}
					confirm_msg={'양식에 맞는 이름입니다.'}
					maxLength={15}
				/>
			</View>
			<View
				style={[
					styles.inputWithSelect,
					{justifyContent: 'flex-start'},
					{alignItems: 'flex-start'},
					{flexDirection: 'row'},
					// {backgroundColor: 'yellow'},
				]}>
				<InputWithSelect
					width={492}
					items={mobile_carrier}
					delimiter="|"
					placeholder={'핸드폰 번호를 입력해주세요 (-제외)'}
					onChange={onPhoneNumberInputChange}
					onSelectDropDown={onMobileCompanyInputChange}
					onValid={onValidMobileNum}
					validator={mobileValidator}
					maxlength={12}
					// showMsg={true}
					// confirm_msg={'휴대전화 양식과 일치합니다.'}
					keyboardType="numeric"
					verified={props?.phoneVerified}
				/>
			</View>
			{/* <View style={[{flexDirection: 'row'}, {marginTop: 14 * DP}]}>
				{props.failed ? (
					<View style={[{position: 'absolute', right: 0, bottom: -15}]}>
						<TouchableOpacity onPress={props.requestVerification}>
							<Text style={[txt.noto28b, {color: APRI10}, {textDecorationLine: 'underline'}]}>재인증</Text>
						</TouchableOpacity>
					</View>
				) : (
					<Text style={[txt.noto24, {color: GRAY10}, {marginLeft: 200 * DP}]}>입력한 내용이 인증창이 뜰 시 자동 입력됩니다.</Text>
				)}
			
			</View> */}

			{/* {validPhone ? (
				<Text style={[txt.noto26, phoneNumVerification.phoneNumValidPassedText, {color: GREEN}]}>휴대전화번호 양식과 일치합니다. </Text>
			) : (
				<Text style={[txt.noto26, phoneNumVerification.phoneNumValidPassedText]}>휴대전화번호 양식에 맞춰주세요.</Text>
				<Text style={[txt.noto26, phoneNumVerification.phoneNumValidPassedText]}>휴대전화번호 양식에 맞춰주세요.</Text>
			)} */}
		</View>
	);
};

PhoneNumVerification.defaultProps = {
	onNameInputChange: e => console.log(e),
	requestReVerification: e => console.log(e),
	requestVerification: e => console.log(e),
	onPhoneNumberInputChange: e => console.log(e),
	onVerificationNumberChange: e => console.log(e),
	onMobileCompanyInputChange: e => console.log(e),
	asyncConfirm: true,
};
const styles = StyleSheet.create({
	inputWithSelect: {
		width: 694 * DP,
		// height: 122 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	// input30: {
	// 	height: 104 * DP,
	// 	marginBottom: 60 * DP,
	// },
	input30: {
		width: 694 * DP,
		height: 104 * DP,
		marginBottom: 20 * DP,

		// backgroundColor: '#DEB5B5',
	},
	container: {
		width: 694 * DP,
		// height: 402 * DP, //UX 변경으로 인한 주석처리 (22.02.03 - 상우)
		backgroundColor: WHITE,
	},
});
