import React from 'react';
import {Text, View} from 'react-native';
import {btn_w654} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import PasswordChecker from 'Organism/form/PasswordChecker';
import {login_style, btn_style, temp_style, passwordReset_style} from 'Templete/style_templete';
import {changeUserPassword} from 'Root/api/userapi';
import {updateUserPassword} from 'Root/api/userapi';
// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default PasswordReset = ({route, navigation}) => {
	const [confirmed, setConfirmed] = React.useState(false);
	const [pwd, setPwd] = React.useState(); // 바꿀 비밀번호
	const [prevpwd, setprepwd] = React.useState(); //현재 비밀번호
	const [pwdValid, setPwdValid] = React.useState(false); // 비밀번호 양식 체크 (8자이상~~)
	const [pwdCheck, setPwdCheck] = React.useState(false); // 비밀번호 더블 체크 통과 여부
	const [presentPwdValid, setPresentPwdValid] = React.useState(true); // 현재 비밀번호 입력값이 실제 DB와 일치하는지 여부
	const [valid, setValid] = React.useState(false);
	console.log('PassworRest', route);

	React.useEffect(() => {
		console.log('pwd', pwd);
		console.log('prevpwd', prevpwd);
		console.log('ddd', pwd && pwdCheck);
		setValid(pwd && pwdCheck);
	}, [pwd, prevpwd]);

	//현재 비밀번호, 새로운 비밀번호의 양식, 새로운 비밀번호 확인 모두 통과 시 확인 버튼이 활성화
	React.useEffect(() => {
		console.log('pwd', pwd);
		// console.log('pre', presentPwdValid);
		// console.log('double', pwdCheck);
		// console.log('form', pwdValid);
		presentPwdValid && pwdCheck && pwdValid ? setConfirmed(true) : setConfirmed(false);
	}, [presentPwdValid, pwdCheck, pwdValid]);

	//암호 양식
	const passwordValidator = pwd => {
		// 8~20자 사이의 영문 대소문자, 숫자, 특수문자(!@#$%^&*만 허용)를 포함
		var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		if (regExp.test(pwd)) {
			setPwd(pwd);
			setPwdValid(true);
			return true;
		} else {
			setPwdValid(false);
			return false;
		}
	};
	//비밀번호 더블체크, 비밀번호와 비밀번호 확인이 일치하며, 비밀번호 작성양식에도 통과한 경우에만 pwdCheck값이 True
	const passwordChecker = pwd_double => {
		// console.log('%%%%%%%%%', pwd_double);
		pwd == pwd_double && pwdValid ? setPwdCheck(true) : setPwdCheck(false);
	};

	//현재 비밀번호 입력값이 실제 DB와 일치하는지 여부
	const checkPresentPwd = pwd => {
		setprepwd(pwd);
		// console.log('input now pwd', pwd);
		// if (pwd == route.params) {
		// 	setPresentPwdValid(true);
		// 	return true;
		// } else {
		// 	setPresentPwdValid(false);
		// 	return false;
		// }
		return true;
	};

	//지우기버튼
	const onPressClear = kind => {
		//kind = 패스워드 입력 종류 (현재 암호, 새로운 암호, 암호 체크 등)
		if (kind == 'cur') {
			setPresentPwdValid(false);
		} else if (kind == 'new') {
			setPwdCheck('');
			setPwdValid(false);
		} else if (kind == 'check') {
			setPwdCheck(false);
		}
	};

	const onChangePwd = pwd => {
		// console.log('onChangePwd    ' + pwd);
		// user_data.user_password = pwd;
	}; //오로지 인풋값 변화만을 감지, validation 로직과는 분리

	//확인 버튼 클릭 => 최종 확인 모달에서 확인버튼 다시 클릭 => DB접근 Update 예정
	const changeFinalize = () => {
		// Modal.close();
		console.log('파라미터들', route.params, pwd);
		//changePassword 가 아닌 reset Password api가있어야된다.
		updateUserPassword(
			{userobject_id: route.params, new_password: pwd},
			success => {
				console.log('success', success);
				Modal.popNoBtn('비밀번호 설정이 완료되었습니다.');
				setTimeout(() => {
					Modal.close();
					navigation.navigate('Login');
				}, 1000);
			},
			err => {
				alert('비밀번호를 다시 입력해주세요.');
				console.log('er', err);
			},
		);
	};

	// const onPressConfirm = () => {};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.passwordChecker, passwordReset_style.passwordChecker]}>
				<PasswordChecker
					passwordValidator={pwd => passwordValidator(pwd)}
					passwordChecker={pwd => passwordChecker(pwd)}
					checkPresentPwd={pwd => checkPresentPwd(pwd)}
					pwdValid={pwdValid}
					pwdCheck={pwdCheck}
					onPressClear={kind => onPressClear(kind)}
					onChangePwd={pwd => onChangePwd(pwd)}
					presentPwdValid={presentPwdValid}
				/>
			</View>

			<View style={[btn_style.btn_w654, passwordReset_style.btn_w654]}>
				<AniButton onPress={changeFinalize} btnTitle={'확인'} btnLayout={btn_w654} titleFontStyle={32} disable={!pwdCheck} />
			</View>
		</View>
	);
};
