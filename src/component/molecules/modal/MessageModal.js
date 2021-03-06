import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions, TextInput} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import InputLongText from '../input/InputLongText';
import Modal from 'Root/component/modal/Modal';

/**
 * 두 버튼을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {()=>void} props.receiver - 카카오톡 클릭
 * @param {(msg:string)=>void} props.onSend - 링크복사 클릭
 * @param {()=>void} props.onClose - 메시지 클릭
 *
 */
const MessageModal = props => {
	const [msg, setMsg] = React.useState('');

	const onSend = () => {
		props.onSend(msg);
	};
	const pressNo = () => {
		Modal.close();
	};

	const onChangeMsg = text => {
		setMsg(text);
	};

	return (
		<TouchableOpacity onPress={() => Modal.close()} activeOpacity={1} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.receiver]}>받는이 : {props.receiver}</Text>
				<View style={[style.inputLongText]}>
					<TextInput onChangeText={onChangeMsg} style={[txt.noto24, style.textInput]} placeholder={'내용입력...'} maxLength={400} multiline={true} />
					<Text style={[txt.noto24, {color: GRAY20, alignSelf: 'flex-end'}]}>{msg.length} / 400 </Text>
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnStyle={'border'} btnTitle={'취소'} onPress={pressNo} />
					<AniButton btnTitle={'보내기'} onPress={onSend} />
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

MessageModal.defaultProps = {
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
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 654 * DP,
		height: 590 * DP,
		backgroundColor: WHITE,
		paddingTop: 50 * DP,
		paddingBottom: 40 * DP,
		paddingHorizontal: 26 * DP,
		borderRadius: 50 * DP,
	},
	receiver: {
		// marginBottom: 30 * DP,
		// textAlign: 'center',
	},
	inputLongText: {
		width: 602 * DP,
		height: 328 * DP,
		marginTop: 24 * DP,
		borderRadius: 30 * DP,
		borderColor: APRI10,
		borderWidth: 2 * DP,
		padding: 24 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: 558 * DP,
		height: 255 * DP,
		padding: 24 * DP,
		textAlign: 'left',
		textAlignVertical: 'top',
		// backgroundColor: 'lightblue',
	},
	buttonContainer: {
		marginTop: 32 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
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

export default MessageModal;
