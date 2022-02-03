import React from 'react';

import {Text, View, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Stagebar from 'Molecules/info/Stagebar';
import PasswordChecker from 'Organism/form/PasswordChecker';
import {stagebar_style} from 'Organism/style_organism';
import {login_style, btn_style, temp_style, progressbar_style, userPasswordCheck} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default UserPasswordCheck = props => {
	const [pwdValid, setPwdValid] = React.useState(false); // 비밀번호 양식 체크 (8자이상~~)
	console.log('UserPasswordCheck', props);
	const user_data = React.useRef({
		...props.route.params,
		user_password: '',
	}).current;

	// 확인 버튼 클릭
	const goToNextStep = () => {
		// setData({ ...data, user_password: pwd });
		props.navigation.push('AssignUserHabitation', user_data);
	};

	const onChangePwd = pwd => {
		console.log('onChangePwd    ' + pwd);
		user_data.user_password = pwd;
	}; //오로지 인풋값 변화만을 감지, validation 로직과는 분리

	//암호 양식(템플릿 레벨에서 정의, T/F값을 반환하여 양식 통과여부를 결정)
	const passwordValidator = pwd => {
		// '최소 8자 이상(~30자 이하), 영문과 숫자만 입력 가능합니다.'
		var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/;
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
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={3} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
				/>
			</View>

			{/* (O)PasswordChecker */}
			<View style={[temp_style.passwordChecker, userPasswordCheck.passwordChecker]}>
				<PasswordChecker
					onChangePwd={onChangePwd}
					passwordValidator={passwordValidator}
					onConfirmAndChecked={onConfirmAndChecked}
					isResetPwdMode={false}
				/>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, userPasswordCheck.btn_w654]}>
				{pwdValid ? (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} btnTheme={'shadow'} btnLayout={btn_w654} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} disable={true} btnLayout={btn_w654} />
				)}
			</View>
		</KeyboardAvoidingView>
	);
};
