import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
	CURRENT_PWD_INFO,
	CURRENT_PWD_TITLE,
	FORM_MATCHED_DESC,
	FORM_UNMATCHED_DESC,
	NEW_PWD_CHECK_TITLE,
	NEW_PWD_TITLE,
	PASSWORD_CHECK_MATCHED,
	PASSWORD_FORM_DESCRIPTION,
	PASSWORD_TITLE,
	PASSWORD_CHECK_TITLE,
	PASSWORD_UNMATCHED,
	PWD_CHECK_INFO,
	REQ_PASSWORD,
} from 'Root/i18n/msg';
import PasswordInput from 'Molecules/input/PasswordInput';
import {passwordChecker_style} from 'Organism/style_organism copy';
import DP from 'Root/config/dp';
import {MAINBLACK} from 'Root/config/color';
/**
 *
 * @param {{
 *isResetPwdMode: 'boolean / true일 경우 비밀번호 리셋 모드 - 3개의 input 출력, false일 경우 일반 비밀번호 설정 모드 - 2개의 input',
 *passwordValidator: 'void / 비밀번호 양식 확인 ',
 *passwordChecker: 'void / 비밀번호 더블체크 확인',
 *checkPresentPwd : 'void / 인자 - password 텍스트 비밀번호 변경 모드 => 현재 비밀번호 입력 발생 콜백함수 '  ,
 *pwdValid: 'boolean / 양식 통과 상태 ',,
 *presentPwdValid: 'boolean / 현재 비밀번호 값과 DB값의 일치 상태'
 *pwdCheck: 'boolean / 비밀번호 확인 통과 상태',
 *onPressClear: 'void 지우기 마크 클릭 콜백함수',
 *onChangePwd:'패스워드 입력이 바뀔때의 콜백'
 * }} props
 */
export default PasswordChecker = props => {
	const checkerRef = React.useRef();
	const passwordValue = React.useRef('');
	const passwordCheck = React.useRef('');
	const [firstRight, setFirstRight] = React.useState(false);
	//비밀번호 입력 콜백함수 or 새로운 비밀번호(암호 변경 모드일 경우) 입력 콜백함수
	const onChangePwd = pwd => {
		passwordValue.current = pwd; //불필요한 랜더링을 줄이기 위해 set을 쓰지않음
		props.onChangePwd(pwd);
	};

	//비밀번호 확인, 새로운 비밀번호 확인 입력 콜백
	const passwordChecker = pwdcheck => {
		passwordCheck.current = pwdcheck;
		props.passwordChecker(pwdcheck);
	};

	// Input 우측 지우기 마크 클릭 콜백함수
	const onPressClear = () => {
		passwordValue.current = '';
		passwordCheck.current = '';
		checkerRef.current.clear();
		props.onConfirmAndChecked && props.onConfirmAndChecked(false);
		//명령형으로 변경, 명령형은 리엑트에서 권장하지 않으나 특정 기능(패스워드 인풋의 클리어 버튼을 눌렸을 때 체크란의 입력 내용도 클리어하기 위한)만을
		//위한 Props를 선언하여 Input컴포넌트 내부에서 처리하게 되면 상위 레벨에서 동작을 파악하기 어려움(PasswordInput끼리의 로직은 PasswordInput내부보다는 상위 레벨에 위치)
		props.onPressClear(); //클리어 동작에 대한 알림을 부모가 처리해야할 필요가 있는지?
	};

	//비밀번호 확인의 지우기 버튼 클릭
	const onPressCheckClear = () => {
		passwordCheck.current = '';
		props.onConfirmAndChecked && props.onConfirmAndChecked(false);
	};

	//비밀번호 입력 형식 검사
	const passwordValidator = password => {
		let isValid = props.passwordValidator(password);
		let isMatch = password === passwordCheck.current;
		checkerRef.current.valid(passwordCheck.current);
		props.onConfirmAndChecked && props.onConfirmAndChecked(isValid && isMatch);
		if (isValid) {
			setFirstRight(true);
		} else {
			setFirstRight(false);
		}
		return isValid;
	};

	const passwordMatcher = pwdcheck => {
		// if (props?.firstValid) {
		let isValid = props.passwordValidator(passwordValue.current);
		let isMatch = passwordValue.current == pwdcheck;
		props.passwordChecker(pwdcheck);
		props.onConfirmAndChecked && props.onConfirmAndChecked(isValid && isMatch);
		// return isMatch && props?.firstValid;
		//TODO! 위의 비밀번호가 invalid하면 밑의것도 unmatched로 처리
		return isMatch;
		// } else {
		// 	let isValid = props.passwordValidator(passwordValue.current);
		// 	let isMatch = passwordValue.current == pwdcheck;
		// 	props.passwordChecker(pwdcheck);
		// 	props.onConfirmAndChecked && props.onConfirmAndChecked(isValid && isMatch);
		// 	return isMatch;
		// }
	};

	// 비밀번호 변경 루트 => 현재 암호 확인
	const compare_curr_pwd = pwd => {
		let isMatchedWithCurreunt = props.checkPresentPwd(pwd);
		return isMatchedWithCurreunt;
	};
	console.log('render');
	//props.isResetPwdMode가 true일 경우 pwdInput이 3개 출현 (현재암호 / 바꿀 암호 / 바꿀 암호 확인)
	return !props.isResetPwdMode ? (
		//비밀번호 처음 설정 루트로 온 경우 두가지 input
		<View style={[styles.container_initMode]}>
			<View style={[{marginBottom: 20 * DP}]}>
				<PasswordInput
					// title={PASSWORD_TITLE}
					title="비밀번호"
					// description={PASSWORD_FORM_DESCRIPTION}
					placeholder={REQ_PASSWORD}
					// information={'8~20자 영문, 숫자 특수문자(!@#$%^&*만 허용) 모두 포함'}
					information={''}
					alert_msg={FORM_UNMATCHED_DESC}
					confirm_msg={FORM_MATCHED_DESC}
					onChange={onChangePwd}
					validator={passwordValidator}
					// confirm={props.pwdValid} confirm은 validator의 값 반환여부에 따라 컴포넌트 내부에서 결정
					onClear={onPressClear}
					height={104}
					width={694}
				/>
			</View>
			<View style={[passwordChecker_style.passwordInput_doubleCheck]}>
				<PasswordInput
					title={PASSWORD_CHECK_TITLE}
					placeholder={PWD_CHECK_INFO}
					alert_msg={PASSWORD_UNMATCHED}
					confirm_msg={PASSWORD_CHECK_MATCHED}
					information={''}
					onChange={passwordChecker}
					validator={passwordMatcher}
					ref={checkerRef}
					onClear={onPressCheckClear}
					height={104}
					width={694}
				/>
			</View>
		</View>
	) : (
		//비밀번호 재설정 루트로 온 경우 세가지 PasswordInput
		<View style={[styles.container_resetMode]}>
			<View style={[passwordChecker_style.passwordInput_resetMode]}>
				<PasswordInput
					title={PASSWORD_TITLE}
					placeholder={CURRENT_PWD_TITLE}
					onChange={props.checkPresentPwd}
					confirm={props.presentPwdValid}
					alert_msg={PASSWORD_UNMATCHED}
					// confirm_msg={''}
					confirm_msg={PASSWORD_CHECK_MATCHED}
					// information={CURRENT_PWD_INFO}
					information=""
					validator={compare_curr_pwd}
					onClear={() => onPressClear('cur')}
					height={104}
					width={694}
				/>
			</View>
			<View style={[passwordChecker_style.passwordInput_resetMode]}>
				<PasswordInput
					title={NEW_PWD_TITLE}
					description={PASSWORD_FORM_DESCRIPTION}
					placeholder={NEW_PWD_TITLE}
					alert_msg={FORM_UNMATCHED_DESC}
					confirm_msg={FORM_MATCHED_DESC}
					information={''}
					onChange={onChangePwd}
					ref={passwordCheck}
					validator={passwordValidator}
					// confirm={props.pwdValid} confirm은 validator의 값 반환여부에 따라 컴포넌트 내부에서 결정
					onClear={onPressClear}
					height={104}
					width={694}
				/>
			</View>
			<View style={[passwordChecker_style.passwordInput_resetMode]}>
				<PasswordInput
					title={NEW_PWD_CHECK_TITLE}
					placeholder={NEW_PWD_CHECK_TITLE}
					information={PWD_CHECK_INFO}
					alert_msg={PASSWORD_UNMATCHED}
					confirm_msg={PASSWORD_CHECK_MATCHED}
					ref={checkerRef}
					onClear={onPressCheckClear}
					validator={passwordMatcher}
					height={104}
					width={694}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container_resetMode: {
		width: 694 * DP,
		height: 634 * DP,
		// backgroundColor: 'yellow',
	},
	container_initMode: {
		width: 694 * DP,
		// height: 406 * DP,
	},
});

PasswordChecker.defaultProps = {
	isResetPwdMode: false, // 일반 비밀번호 설정 모드로 호출? or 비밀번호 변경 모드
	passwordValidator: e => console.log('passwordchecker Default Validator : ' + e), // 비밀번호, 새로운 비밀번호 입력 콜백함수
	passwordChecker: e => console.log('passwordchecker Default passwordChecker : ' + e), // 비밀번호 확인, 새로운 비밀번화 확인(변경 모드) 입력 콜백함수
	checkPresentPwd: e => console.log('passwordchecker Default checkPresentPwd : ' + e), // 비밀번호 변경 모드일 떄 - 현재 비밀번호 값 입력 콜백함수,
	presentPwdValid: false, // 비밀번호 변경 모드에서 현재 비밀번호 입력값이 DB값과 일치하는지 T/F
	pwdValid: false, // 부모 컴포넌트에서 보내는 비밀번호, 새로운비밀번호의 입력값이 양식에 맞게 작성되었는지 T/F
	pwdCheck: false, // 부모 컴포넌트에서 보내는 비밀번호 확인, 새로운 비밀번호 확인란의 입력값이 위의 비밀번호 값과 정확히 일치하는지 T/F
	onPressClear: e => console.log('passwordchecker Default onPressClear : ' + e), //  지우기가 클릭되었을 경우
	onConfirmAndChecked: e => console.log('passwordchecker Default onConfirmAndChecked : ' + e), //validation 검사, 입력값 체크가 완료되었는지 부모 컴포넌트에 전달.
	onChangePwd: e => {},
};
