import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions, Animated, Easing} from 'react-native';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';

/**
 * 드롭다운 형식의 메뉴 모달
 *
 * @param {Object} props - props object
 * @param {object} props.offset - 위치 정보
 * @param {object} props.menu - 출력될 메뉴 아이템
 * @param {(index:number)=>void} props.onPressMenu - 메뉴 아이템 클릭(클릭한 아이템 인덱스 반환)
 * @param {()=>void} props.onClose - 종료
 *
 */
const DropdownModal = props => {
	const animatedHeight = React.useRef(new Animated.Value(0)).current;
	const animatedOpacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.spring(animatedHeight, {
			duration: 400,
			toValue: (props.menu.length * 70 + 40) * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 400,
			toValue: 1,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const closeAnimation = () => {
		Animated.spring(animatedHeight, {
			toValue: 0,
			duration: 600,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 200,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setTimeout(() => {
			Modal.close();
		}, 400);
		props.onClose();
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={closeAnimation} style={style.background}>
			<Animated.View
				style={[
					style.popUpWindow,
					style.shadow,
					{
						position: 'absolute',
						right: props.offset.x + 10,
						top: props.offset.y + 48 * DP,
						justifyContent: 'space-between',
						height: animatedHeight,
						opacity: animatedOpacity,
					},
				]}>
				<TouchableOpacity activeOpacity={1} style={{paddingBottom: 15 * DP}}>
					{props.menu.map((v, i) => {
						return (
							<TouchableOpacity onPress={() => props.onPressMenu(i)} key={i}>
								<Text style={[txt.noto24, {height: 48 * DP, marginVertical: 10 * DP, width: 220 * DP, textAlign: 'center'}]}>{v}</Text>
							</TouchableOpacity>
						);
					})}
				</TouchableOpacity>
			</Animated.View>
		</TouchableOpacity>
	);
};

DropdownModal.defaultProps = {
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
	},
	popUpWindow: {
		width: 260 * DP,
		backgroundColor: WHITE,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20 * DP,
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
		elevation: 4,
	},
});

export default DropdownModal;
