import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TabSelectBorder_Type1 from 'Root/component/molecules/TabSelectBorder_Type1';
import {login_style, btn_style, suggestAssign_style } from './style_templete';
import {txt}  from 'Root/config/textstyle';
import { NONE_OF_YOUR_ACCOUNTS} from 'Root/i18n/msg';

export default SuggestAssign = props => {	    
	return (
		<View style={login_style.wrp_main}>	
			{/* Text Massage	 */}
            <View style={suggestAssign_style.txt_msg}>				 
				<Text style={[txt.noto28, txt.center]}>{NONE_OF_YOUR_ACCOUNTS}</Text>
			</View>	

			{/* (A)Btn_w522 */}
			<View style={[btn_style.btn_w522, suggestAssign_style.btn_w522]}>				 
				<Text>(A)Btn_w522</Text>
			</View>	

			{/* basic info */}
			<View style={[login_style.basic_info, suggestAssign_style.basic_info]}>				 
				<Text>보호소 등록  |  내 계정 찾기  |  비밀번호 재설정</Text>
			</View>	

			{/* social login */}
			<View style={[login_style.social_info, suggestAssign_style.social_info]}>				 
				<Text>소셜아이디로 로그인</Text>
			</View>	

		</View>
	);
};