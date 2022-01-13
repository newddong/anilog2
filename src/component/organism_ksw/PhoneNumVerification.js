import React from 'react';
import {Text, View} from 'react-native';
import {GREEN} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {mobile_carrier} from 'Root/i18n/msg';
import {btn_w226} from '../atom/btn/btn_style';
import Modal from '../modal/Modal';
import AniButton from '../molecules/AniButton';
import Input30 from '../molecules/Input30';
import InputTimeLimit from '../molecules/InputTimeLimit';
import InputWithSelect from '../molecules/InputWithSelect';
import {btn_style, temp_style} from '../templete/style_templete';
import {phoneNumVerification} from './style_organism';

/**
 *
 *@param {{
 *requestVerification: void,
 *requestReVerification: void,
 *onNameInputChange: void,
 *onPhoneNumberInputChange: void,
 *onVerificationNumberChange: void,
 * }} props
 */
export default PhoneNumVerification = props => {
	const [timeOut, setTimeOut] = React.useState(false);
	const [timeLimit, setTimeLimit] = React.useState({limit: props.verifyTimeLimit});
	const [userName, setUserName] = React.useState('');
	// const [validMobile, setValidMobile] = React.useState(false);
	const validMobile = React.useRef(false);
	const validVerifyNum = React.useRef(false);
	const [validName, setValidName] = React.useState(false);
	const [validPhone, setValidPhone] = React.useState(false);
	// const [validVerifyNum, setValidVerifyNum] = React.useState(false);
	const onEndTimer = () => {
		setTimeOut(true);
	};
	const requestReVerification = () => {
		if (!validMobile.current) {
			Modal.popOneBtn('휴대전화번호를 먼저 입력해주세요.', '확인', () => Modal.close());
		} else {
			setTimeOut(false);
			setTimeLimit({limit: props.verifyTimeLimit});
			props.requestReVerification();
		}
	};
	const requestVerification = () => {
		console.log('validMobile', validMobile);
		if (!validMobile.current) {
			Modal.popOneBtn('휴대전화번호를 먼저 입력해주세요.', '확인', () => Modal.close());
		} else {
			props.requestVerification();
		}
	};
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
		let isValid = validVerifyNum.current && validMobile.current && props.asyncConfirm.isConfirm && validName;
		if (!isValid) {
			// !validVerifyNum.current ? console.log('validVerifyNum.current') : null;
			!validMobile.current ? console.log('validMobile.current') : null;
			// !props.asyncConfirm.isConfirm ? console.log('props.asyncConfirm.isConfirm') : null;
			// !validName ? console.log('validName') : null;
		}
		props.onValid && props.onValid(isValid);
	}, [validVerifyNum, validName, validMobile, props.asyncConfirm]);

	React.useEffect(() => {
		setTimeLimit({...timeLimit, limit: props.verifyTimeLimit});
		console.log('시간 재설정');
	}, [props.verifyTimeLimit]);

	return (
		<View style={[phoneNumVerification.container]}>
			<View style={[temp_style.input30, phoneNumVerification.input30]}>
				<Input30
					showTitle={false}
					width={654}
					placeholder={'이름 입력'}
					onChange={onNameInputChange}
					onValid={onValidName}
					validator={nameValidator}
					value={userName}
					confirm={nameValidator}
					// confirm
					showmsg
					alert_msg={'이름은 2자 이상으로 설정해주세요 '}
					confirm_msg={'양식에 맞는 이름입니다.'}
				/>
			</View>
			<View style={[temp_style.inputWithSelect, phoneNumVerification.inputWithSelect]}>
				<InputWithSelect
					width={654}
					items={mobile_carrier}
					delimiter="|"
					placeholder={'휴대폰 번호 입력(-제외)'}
					onChange={onPhoneNumberInputChange}
					onSelectDropDown={onMobileCompanyInputChange}
					onValid={onValidMobileNum}
					validator={mobileValidator}
					// showMsg
					// confirm_msg={'휴대전화 양식과 일치합니다.'}
					keyboardType="numeric"
				/>
			</View>
			{validPhone ? (
				<Text style={[txt.noto26, phoneNumVerification.phoneNumValidPassedText, {color: GREEN}]}>휴대전화번호 양식과 일치합니다. </Text>
			) : (
				<Text style={[txt.noto26, phoneNumVerification.phoneNumValidPassedText]}>휴대전화번호 양식에 맞춰주세요.</Text>
			)}

			<View style={[phoneNumVerification.inputTimeLimitContainer]}>
				<View style={[phoneNumVerification.inputTimeLimit]}>
					<InputTimeLimit
						width={400}
						timelimit={timeLimit}
						onEndTimer={onEndTimer}
						onChange={onVerificationNumberChange}
						placeholder={'인증번호 입력'}
						timeout_msg={'인증 가능한 시간이 초과되었습니다.'}
						// alert_msg={'인증번호가 일치하지 않습니다.'}
						alert_msg={'3글자 이상 문자 입력 후 인증 요청을 눌러주세요.'}
						validator={verifyNumValidator}
						onValid={onValidVerifyNum}
					/>
				</View>
				<View style={[btn_style.btn_w226, phoneNumVerification.btn_w226]}>
					{timeOut ? (
						<AniButton btnTitle={'인증 재요청'} btnStyle={'border'} onPress={requestReVerification} />
					) : (
						<AniButton btnTitle={'인증 요청'} onPress={requestVerification} />
					)}
				</View>
			</View>
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
