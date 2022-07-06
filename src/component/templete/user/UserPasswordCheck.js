import React from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import StageBar from 'Molecules/info/Stagebar';
import PasswordChecker from 'Organism/form/PasswordChecker';
import {stagebar_style} from 'Organism/style_organism copy';
import {login_style, btn_style, temp_style, progressbar_style, userPasswordCheck} from 'Templete/style_templete';
import {MAINBLACK} from 'Root/config/color';

export default UserPasswordCheck = props => {
	const [pwdValid, setPwdValid] = React.useState(false); // 비밀번호 양식 체크 (8자이상~~)
	const [firstPwdValid, setFirstPwdValid] = React.useState(false);
	// console.log('UserPasswordCheck', props);
	const user_data = React.useRef({
		...props.route.params,
		user_password: '',
	}).current;

	// 확인 버튼 클릭
	const goToNextStep = () => {
		// setData({ ...data, user_password: pwd });
		props.navigation.navigate('AssignUserHabitation', user_data);
	};

	const onChangePwd = pwd => {
		console.log('onChangePwd    ' + pwd);
		user_data.user_password = pwd;
	}; //오로지 인풋값 변화만을 감지, validation 로직과는 분리

	//암호 양식(템플릿 레벨에서 정의, T/F값을 반환하여 양식 통과여부를 결정)
	const passwordValidator = pwd => {
		// '최소 8자 이상(~20자 이하), 영문과 숫자만 입력 가능합니다.'
		// 8~20자 사이의 영문 대소문자, 숫자, 특수문자(!@#$%^&*만 허용)를 포함
		var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		setFirstPwdValid(regExp.test(pwd));
		return regExp.test(pwd);
	};

	//패스워드 검증이 완료됨
	const onConfirmAndChecked = finished => {
		// console.log('check    '+finished);
		setPwdValid(finished);
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'padding'}>
			{/* (M)StageBar	 */}
			<View style={[styles.stageBar, progressbar_style.stageBar]}>
				<StageBar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={3} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={640 * DP} //bar의 너비
				/>
			</View>
			<View style={[{alignItems: 'center'}]}>
				<Text style={[{textAlign: 'center'}, txt.noto30, {marginTop: 105 * DP}]}>*최소 8자 이상,</Text>
				<Text style={([{textAlign: 'center'}], txt.noto30)}>영문과 숫자, 특수문자 ( ! @ # $ % ^ & * )가 </Text>
				<Text style={([{textAlign: 'center'}], txt.noto30)}>포함되어야 합니다.</Text>
			</View>
			{/* (O)PasswordChecker */}
			<View style={[styles.passwordChecker, {marginTop: 52 * DP}]}>
				<PasswordChecker
					onChangePwd={onChangePwd}
					passwordValidator={passwordValidator}
					onConfirmAndChecked={onConfirmAndChecked}
					isResetPwdMode={false}
					firstValid={firstPwdValid}
				/>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w694, userPasswordCheck.btn_w654]}>
				{pwdValid ? (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} width={694} btnStyle={'border'} btnLayout={btn_w694_r30} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} width={694} disable={true} btnLayout={btn_w694_r30} />
				)}
			</View>
		</KeyboardAvoidingView>
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
	passwordChecker: {
		width: 694 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
