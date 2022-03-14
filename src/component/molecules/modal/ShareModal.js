import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions, Animated, Easing} from 'react-native';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {Clip72, Email72, SocialKakao72} from 'Root/component/atom/icon';

/**
 * 공유하기 메뉴 모달
 *
 * @param {Object} props - props object
 * @param {object} props.offset - 위치 정보
 * @param {()=>void} props.onPressKakao - 카카오톡 클릭
 * @param {()=>void} props.onPressLinkCopy - 링크복사 클릭
 * @param {()=>void} props.onPressMsg - 메시지 클릭
 *
 */
const ShareModal = props => {
	const animatedHeight = React.useRef(new Animated.Value(0)).current;
	const animatedOpacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.timing(animatedHeight, {
			duration: 500,
			toValue: 384 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 500,
			toValue: 1,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const closeAnimation = () => {
		Animated.timing(animatedHeight, {
			toValue: 0,
			duration: 500,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 500,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => {
			Modal.close();
			props.onClose();
		});
	};

	const onPressKakao = () => {
		props.onPressKakao();
	};
	const onPressLinkCopy = () => {
		props.onPressLinkCopy();
	};
	const onPressMsg = () => {
		props.onPressMsg();
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={closeAnimation} style={style.background}>
			<Animated.View
				style={[
					style.popUpWindow,
					style.shadow,
					{
						position: 'absolute',
						right: 48 * DP,
						top: props.offset.y - 170 * DP,
						justifyContent: 'space-between',
						width: animatedHeight,
						opacity: animatedOpacity,
					},
				]}>
				<TouchableOpacity activeOpacity={1} style={{paddingBottom: 15 * DP}}>
					<View style={[style.inside]}>
						<TouchableOpacity onPress={onPressKakao} style={[style.socialItem]}>
							<SocialKakao72 />
							<Text style={[txt.noto22, {color: GRAY10}]}>카카오톡</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressLinkCopy} style={[style.socialItem]}>
							<Clip72 />
							<Text style={[txt.noto22, {color: GRAY10}]}>링크복사</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressMsg} style={[style.socialItem]}>
							<Email72 />
							<Text style={[txt.noto22, {color: GRAY10}]}>메시지</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</TouchableOpacity>
	);
};

ShareModal.defaultProps = {
	offset: {
		x: 25,
		y: 290,
	},
	okMsg: 'ok',
	onOk: () => {
		alert('OK');
	},
	onClose: () => {},
};

const style = StyleSheet.create({
	background: {
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	popUpWindow: {
		width: 384 * DP,
		height: 160 * DP,
		backgroundColor: WHITE,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40 * DP,
		paddingVertical: 24 * DP,
		borderRadius: 40 * DP,
		borderTopRightRadius: 0,
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
	shadow: {
		shadowColor: 'gray',
		shadowOffset: {
			width: 1,
			height: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 4.65 * DP,
		elevation: 2,
	},
	inside: {
		width: 324 * DP,
		flexDirection: 'row',
	},
	socialItem: {
		width: 92 * DP,
		height: 116 * DP,
		marginRight: 30 * DP,
		// backgroundColor: 'green',
	},
});

export default ShareModal;
