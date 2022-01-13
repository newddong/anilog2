import React from 'react';
import {Text, View} from 'react-native';
import {login_style, searchAccountB, temp_style} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default SearchAccountB = props => {
	return (
		<View contentContainerStyle={[login_style.wrp_main, searchAccountB.container]}>
			<View style={[temp_style.petAccountList, searchAccountB.petAccountList]}>
				<Text>(O)PetAccountList</Text>
			</View>
		</View>
	);
};
