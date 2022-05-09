import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {NextMark} from 'Root/component/atom/icon';
import {useNavigation} from '@react-navigation/core';

/**
 * 한개 버튼을 띄우는 모달
 *
 * @param {Object} props - props object
 * @param {string} props.popUpMsg - 팝업 메시지
 * @param {()=>void} props.onOk - 확인 버튼 콜백
 *
 */
const LoginRequestModal = props => {
	const pressOk = () => {
		props.onOk();
		Modal.close();
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>로그인이 필요한 활동입니다.</Text>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'로그인'} onPress={pressOk} />
				</View>
				<TouchableOpacity
					onPress={() => Modal.close()}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						alignSelf: 'center',
						padding: 20 * DP,
					}}>
					<Text style={[txt.noto24, {color: GRAY10}]}> 로그인 없이 볼게요.{'   '}</Text>
					<NextMark />
				</TouchableOpacity>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

LoginRequestModal.defaultProps = {
	popUpMsg: 'popUp',
	okMsg: 'ok',
	onOk: () => {
		alert('OK');
	},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 614 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});

export default LoginRequestModal;
