import React from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import {login_style, btn_style, temp_style, progressbar_style, checkShelterPassword_style} from 'Templete/style_templete';
import PasswordChecker from 'Organism/form/PasswordChecker';
import {stagebar_style} from 'Organism/style_organism copy';
import StageBar from 'Molecules/info/Stagebar';
import {MAINBLACK} from 'Root/config/color';
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
		// 8~20자 사이의 영문 대소문자, 숫자, 특수문자(!@#$%^&*만 허용)를 포함
		var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
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
			<View style={[styles.stageBar, {marginTop: 20 * DP}]}>
				<StageBar
					backgroundBarStyle={styles.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					// insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={4} //현재 단계를 정의
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
			<View style={[temp_style.passwordChecker, checkShelterPassword_style.passwordChecker]}>
				<PasswordChecker onChangePwd={onChangePwd} passwordValidator={passwordValidator} onConfirmAndChecked={onConfirmAndChecked} />
			</View>

			<View style={[btn_style.btn_w694, checkShelterPassword_style.btn_w654]}>
				{pwdValid ? (
					<AniButton btnTitle={'확인'} btnStyle={'border'} btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} disable btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
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
});
