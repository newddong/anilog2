import React from 'react';
import {Text, View} from 'react-native';
import {login_style, btn_style, temp_style, passwordReset_style} from 'Templete/style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default PasswordReset = props => {	
 
	return (
		<View style={login_style.wrp_main}>
			{/* (O)PasswordChecker	 */}
			<View style={[temp_style.passwordChecker, passwordReset_style.passwordChecker]}>
				<Text>(O)PasswordChecker</Text>
			</View>

            {/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, passwordReset_style.btn_w654]}>
				<Text>(A)Btn_w654</Text>
			</View>
		</View>
	);
};