import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';

/**
 * 팝업 드롭다운
 * @param {object} props - Props Object
 * @param {string} props.okMsg - 확인 메시지
 * @param {string} props.popUpMsg - 메시지
 * @param {()=>void} props.onOk - 확인 버튼 클릭 시 동작하는 콜백
 */
const PopupSelect = props => {
	const pressOk = () => {
		// props.onOk();
		Modal.close();
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>{props.popUpMsg}</Text>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.okMsg} onPress={pressOk} />
				</View>
			</View>
		</View>
	);
};

PopupSelect.defaultProps = {
	popUpMsg: 'popUp',
	noMsg: 'cancel',
	yesMsg: 'ok',
	onNo: () => {
		alert('NO');
	},
	onYes: () => {
		alert('YES');
	},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0002',
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	popUpWindow: {
		width: '100%',
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
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

export default PopupSelect;
