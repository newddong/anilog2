import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from '../modal/Modal';
import {UpdateImg} from '../atom/icon';

/**
 * 한개 버튼을 띄우는 모달
 *
 * @param {Object} props - props object
 * @param {string} props.popUpMsg - 팝업 메시지
 * @param {string} props.okMsg - 확인 버튼 메시지
 * @param {()=>void} props.onOk - 확인 버튼 콜백
 *
 */
const InfoModal = props => {
	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<UpdateImg />
				<Text style={[txt.noto24, {color: GRAY10, marginVertical: 20 * DP}]}>업데이트 준비 중입니다!</Text>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={'확인'} onPress={() => Modal.close()} />
				</View>
			</View>
		</View>
	);
};

InfoModal.defaultProps = {
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
		width: 400 * DP,
		height: 400 * DP,
		backgroundColor: WHITE,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 40 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 20 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {},
});

export default InfoModal;
