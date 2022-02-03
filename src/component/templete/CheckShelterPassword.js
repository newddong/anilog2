import React from 'react';
import {Text, View, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Stagebar from 'Molecules/info/Stagebar';
import {login_style, btn_style, temp_style, progressbar_style, checkShelterPassword_style} from './style_templete';
import PasswordChecker from 'Organism/form/PasswordChecker';
import {stagebar_style} from 'Organism/style_organism';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default CheckShelterPassword = props => {
	const [data, setData] = React.useState({
		...props.route.params,
		user_password: '',
	});

	const [pwdValid, setPwdValid] = React.useState(false); // 비밀번호 양식 체크 (8자이상~~)

	//확인클릭
	const goToNextStep = () => {
		//비밀번호 양식 체크 , 더블 체크 통과를 해야 goToNextStep 함수를 실행시킬 수 있음
		// setData({...data, user_password: pwd});
		props.navigation.push('AssignShelterProfileImage', data);
	};

	//암호 양식
	const passwordValidator = pwd => {
		console.log(pwd);
		// '최소 8자 이상(~30자 이하), 영문과 숫자만 입력 가능합니다.'
		var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/;
		return regExp.test(pwd);
	};

	const onChangePwd = pwd => {
		setData({...data, user_password: pwd});
	};

	const onConfirmAndChecked = isConfirm => {
		setPwdValid(isConfirm);
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'padding'}>
			{/* (M)StageBar	 */}
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={4} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
				/>
			</View>

			{/* (O)PasswordChecker */}
			<View style={[temp_style.passwordChecker, checkShelterPassword_style.passwordChecker]}>
				<PasswordChecker onChangePwd={onChangePwd} passwordValidator={passwordValidator} onConfirmAndChecked={onConfirmAndChecked} />
			</View>

			<View style={[btn_style.btn_w654, checkShelterPassword_style.btn_w654]}>
				<AniButton btnTitle={'확인'} disable={!pwdValid} btnLayout={btn_w654} titleFontStyle={32} onPress={goToNextStep} />
			</View>
		</KeyboardAvoidingView>
	);
};
