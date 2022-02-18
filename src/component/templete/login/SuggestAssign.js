import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {login_style, btn_style, suggestAssign_style} from '../style_templete';
import {txt} from 'Root/config/textstyle';
import {NONE_OF_YOUR_ACCOUNTS} from 'Root/i18n/msg';
import {GRAY10, GRAY20} from 'Root/config/color';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w522} from 'Atom/btn/btn_style';

export default SuggestAssign = props => {
	const onPressConfirm = () => {
		props.navigation.push('AgreementCheck');
	};

	//보호소 등록
	const moveToShelterCodeCheck = () => {
		props.navigation.push('ShelterCodeCheck');
	};

	//내 계정 찾기
	const findMyId = () => {
		props.navigation.push('FindAccount');
	};

	//비밀번호 재설정
	const changePassword = () => {
		props.navigation.push('PasswordResetIdentification');
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.infoMsgBox]}>
				<Text style={[txt.noto30, txt.center, {color: GRAY10}]}>{NONE_OF_YOUR_ACCOUNTS}</Text>
			</View>
			<View style={[btn_style.btn_w522, styles.btn_w522]}>
				<AniButton onPress={onPressConfirm} btnTitle={'회원 가입'} btnStyle={'border'} btnLayout={btn_w522} titleFontStyle={32} />
			</View>
			<View style={[login_style.basic_info, styles.basic_info]}>
				<TouchableOpacity onPress={moveToShelterCodeCheck}>
					<Text style={[txt.noto24, {color: GRAY20}]}> 보호소 등록</Text>
				</TouchableOpacity>
				<Text style={{color: GRAY20}}> | </Text>
				<TouchableOpacity onPress={findMyId}>
					<Text style={[txt.noto24, {color: GRAY20}]}> 내 계정 찾기 </Text>
				</TouchableOpacity>
				<Text style={{color: GRAY20}}> | </Text>
				<TouchableOpacity onPress={changePassword}>
					<Text style={[txt.noto24, {color: GRAY20}]}> 비밀번호 재설정</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		flex: 1,
	},
	infoMsgBox: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 220 * DP,
	},
	verification: {
		marginTop: 80 * DP,
	},
	btnBox: {
		marginTop: 110 * DP,
	},
	btn_w522: {
		marginTop: 110 * DP,
	},
	basic_info: {
		marginTop: 32 * DP,
	},
	social_info: {
		marginTop: 38 * DP,
	},
});
