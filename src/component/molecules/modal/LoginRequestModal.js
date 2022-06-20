import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {NextMark} from 'Root/component/atom/icon';

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
		<TouchableOpacity activeOpacity={0.9} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={0.9} style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>로그인이 필요한 활동입니다.</Text>
				<View style={style.buttonContainer}>
					<AniButton onPress={pressOk} activeOpacity={0.6} btnLayout={btn_w226} btnStyle={'border'} btnTitle={'로그인'} />
				</View>
				<TouchableOpacity onPress={() => Modal.close()} style={style.footer}>
					<Text style={[txt.noto24, {color: GRAY10, marginRight: 20 * DP}]}> 로그인 없이 볼게요{'   '}</Text>
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
		height: 304 * DP,
		backgroundColor: WHITE,
		opacity: 0.9,
		paddingTop: 40 * DP,
		// paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 30 * DP,
		textAlign: 'center',
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		padding: 20 * DP,
		height: 130 * DP,
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
