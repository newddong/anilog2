import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {INQUERY_ACCOUNT} from 'Root/i18n/msg';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import PhoneNumVerification from 'Root/component/organism/form/PhoneNumVerification';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w654} from 'Atom/btn/btn_style';
import Modal from 'Root/component/modal/Modal';
import {GRAY10} from 'Root/config/color';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default FindAccount = props => {
	const onPressConfirm = () => {
		const confirm = false;
		if (confirm) {
			Modal.popNoBtn('이 계정은 이미 가입이 되어있습니다. \n 잠시 뒤에 로그인 페이지로 넘어갑니다.');
			setTimeout(() => {
				Modal.close();
				props.navigation.navigate('Login');
			}, 1000);
		} else {
			props.navigation.navigate('SuggestAssign');
		}
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.infoMsgBox]}>
				<Text style={[txt.noto30, txt.center, {color: GRAY10}]}>{INQUERY_ACCOUNT}</Text>
			</View>

			<View style={[styles.verification]}>
				<PhoneNumVerification />
			</View>

			<View style={[styles.btnBox]}>
				<AniButton onPress={onPressConfirm} btnTitle={'인증 확인'} btnStyle={'border'} btnLayout={btn_w654} titleFontStyle={32} />
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
		marginTop: 108 * DP,
	},
	verification: {
		marginTop: 80 * DP,
	},
	btnBox: {
		marginTop: 110 * DP,
	},
});
