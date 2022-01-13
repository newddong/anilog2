import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {login_style, btn_style, temp_style, progressbar_style, userAssign} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default UserAssignEmail = props => {
	const moveToUserPasswordCheck = () => {
		props.navigation.push('UserPasswordCheck');
	};
	return (
		<View style={login_style.wrp_main}>
			{/* (M)StageBar	 */}
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Text>(M)StageBar</Text>
			</View>

			{/* (M)TabSelectBorder_Type1 */}
			<View style={[temp_style.tabSelectBorder_Type1, userAssign.tabSelectBorder_Type1]}>
				<Text>(M)TabSelectBorder_Type1</Text>
			</View>

			{/* Text Massage	 */}
			<View style={temp_style.textMassage}>
				<Text>Text Massage</Text>
			</View>

			{/* (O)PhoneNumVerification	 */}
			<View style={temp_style.phoneNumVerification}>
				<Text>(O)PhoneNumVerification</Text>
			</View>

			{/* (A)Btn_w654 */}
			<TouchableWithoutFeedback onPress={moveToUserPasswordCheck}>
				<View style={[btn_style.btn_w654, userAssign.btn_w654]}>
					<Text>(A)Btn_w654(이메일 인증완료)</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};
