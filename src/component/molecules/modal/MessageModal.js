import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions, TextInput, Keyboard, StatusBar} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w136, btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10, GRAY20, GRAY40, OPACITY90} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {useKeyboardBottom} from '../input/usekeyboardbottom';

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
	const [KeyboardY, setKeyboardY] = React.useState(0);
	const [msg, setMsg] = React.useState('');

	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardY(120 * DP);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardY(0);
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			setKeyboardY(120 * DP);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			setKeyboardY(0);
		});
		return () => {
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	});

	const onSend = () => {
		props.onSend(msg);
	};
	const pressNo = () => {
		Modal.close();
	};

	const onChangeMsg = text => {
		setMsg(text);
	};

	const onTouchOutSide = () => {
		if (KeyboardY > 0) {
			console.log('KeyboardY', KeyboardY);
			Keyboard.dismiss();
		} else {
			Modal.close();
		}
	};

	return (
		<TouchableOpacity onPress={onTouchOutSide} activeOpacity={1} style={style.background}>
			<TouchableOpacity
				activeOpacity={1}
				style={[
					style.popUpWindow,
					style.shadow,
					{
						bottom: Platform.OS == 'ios' ? KeyboardY : null,
					},
				]}>
				<View style={[{flexDirection: 'row'}]}>
					<Text style={[txt.noto28, style.receiver]} numberOfLines={1}>
						받는이 :
					</Text>
					<Text style={[txt.noto28, style.receiver, {marginLeft: 14 * DP}]} numberOfLines={1}>
						{props.receiver}
					</Text>
				</View>

				<View style={[style.inputLongText]}>
					<TextInput onChangeText={onChangeMsg} style={[txt.noto28, style.textInput]} placeholder={'내용입력...'} maxLength={400} multiline={true} />
					<Text style={[txt.noto24, {color: GRAY20, alignSelf: 'flex-end'}]}>{msg.length} / 400 </Text>
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w136} titleFontStyle={24} btnStyle={'border'} btnTitle={'취소'} onPress={pressNo} />
					<AniButton btnLayout={btn_w136} titleFontStyle={24} btnStyle={'border'} btnTitle={'보내기'} onPress={onSend} />
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
		width: 694 * DP,
		height: 578 * DP,
		// backgroundColor: GRAY40,
		backgroundColor: OPACITY90,
		paddingTop: 40 * DP,
		paddingBottom: 40 * DP,
		paddingHorizontal: 30 * DP,
		borderRadius: 50 * DP,
	},
	receiver: {
		// marginBottom: 30 * DP,
		// textAlign: 'center',
		height: 46 * DP,
	},
	inputLongText: {
		width: 602 * DP,
		height: 328 * DP,
		marginTop: 24 * DP,
		borderRadius: 30 * DP,
		// borderColor: APRI10,
		// borderWidth: 2 * DP,
		padding: 24 * DP,
		backgroundColor: WHITE,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
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
		paddingHorizontal: 16 * DP,
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
