import React from 'react';
import {Text, View} from 'react-native';
import { TAB_VERIFY_PHONE, TAB_VERIFY_EMAIL,INQUERY_ACCOUNT, PHONEVERI_AND_EMAIL_VERI, BTN_W654} from 'Root/i18n/msg';
import TabSelectBorder_Type1 from 'Molecules/tab/TabSelectBorder_Type1';
import {login_style, btn_style, findAccount_style} from 'Templete/style_templete';
import {txt}  from 'Root/config/textstyle';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default FindAccount = props => {	
    const tabArray = [TAB_VERIFY_PHONE, TAB_VERIFY_EMAIL];
  
	return (
		<View style={login_style.wrp_main}>
			{/* (M)TabSelectBorder_Type1 */}
			<View style={findAccount_style.tabSelectBorder_type1}></View>
				<TabSelectBorder_Type1 items={tabArray} onSelect={e => console.log(e.tabName)}/> 	

			{/* Text Massage	 */}
            <View style={login_style.txt_msg}>				 
				<Text style={[txt.noto28, txt.center]}>{INQUERY_ACCOUNT}</Text>
			</View>		

			{/* (O)PhoneNumVerification	 */}
			<View style={login_style.verification}>
				<Text>{PHONEVERI_AND_EMAIL_VERI}</Text>
			</View>
			
			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>
				<Text>{BTN_W654}</Text>
			</View>	
		</View>
	);
};