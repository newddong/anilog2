import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Animated, TouchableOpacity} from 'react-native';
import {GRAY30} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';

/**
 * 네트워크 오류 알림 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {string} props.msg - 메시지
 *
 */
const NetworkErrorModal = props => {
	React.useEffect(() => {
		Animated.timing(animatedOpacity, {
			duration: 500,
			toValue: 1,
			useNativeDriver: false,
		}).start();
		setTimeout(() => {
			Animated.timing(animatedOpacity, {
				duration: 500,
				toValue: 0,
				useNativeDriver: false,
			}).start(({finished}) => {
				Modal.close();
			});
		}, 4000);
	}, []);

	const animatedOpacity = React.useRef(new Animated.Value(0)).current;

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={[style.background]}>
			<Animated.View style={[style.popUpWindow, {opacity: animatedOpacity}]}>
				<Text style={[txt.noto26]}>{props.msg}</Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

NetworkErrorModal.defaultProps = {
	msg: '네트워크 오류입니다.',
};

const style = StyleSheet.create({
	background: {
		// backgroundColor: '#0009',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'center',
	},
	popUpWindow: {
		width: 654 * DP,
		height: 110 * DP,
		backgroundColor: GRAY30,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default NetworkErrorModal;
