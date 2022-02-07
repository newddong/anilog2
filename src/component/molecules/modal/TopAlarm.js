import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Animated, Easing} from 'react-native';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {Cross24_Filled} from 'Root/component/atom/icon';

/**
 * 한개 버튼을 띄우는 모달
 *
 * @param {Object} props - props object
 * @param {string} props.data - 알람 메시지에 들어갈 데이터 오브젝트(달, 펫 닉네임, 필요한 백신접종 내역)
 * @param {void} props.onClose - 모달 닫기 버튼 클릭 콜백
 *
 */
const TopAlarm = props => {
	const data = props.data;

	React.useEffect(() => {
		Animated.timing(animatedHeight, {
			duration: 500,
			toValue: Platform.OS === 'ios' ? 68 * DP : null,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const animatedHeight = React.useRef(new Animated.Value(-50)).current;

	const interpolatedHeight = animatedHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 100],
	});

	const pressX = () => {
		Animated.timing(animatedHeight, {
			duration: 500,
			toValue: -50,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setTimeout(() => {
			Modal.close();
		}, 550);
		props.onClose();
	};

	return (
		<View style={style.background}>
			<Animated.View
				style={[
					style.popUpWindow,
					{
						top: interpolatedHeight,
					},
				]}>
				<Text style={[txt.noto28b, style.textStyle]}>
					{data.month || '1'}월은 {data.user_nickname}(님)의 <Text style={{color: APRI10}}>{data.vacc}</Text> 접종날입니다.{' '}
				</Text>
				<Cross24_Filled onPress={() => pressX()} />
			</Animated.View>
		</View>
	);
};

TopAlarm.defaultProps = {
	onClose: () => {},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: Platform.OS == 'ios' ? null : null, //배경색을 지정하면 바깥쪽 클릭이 안되고 지정을 안하면 바깥쪽 클릭이 가능해지는 현상 발견
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		// justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 690 * DP,
		// height: 112 * DP,
		opacity: 1,
		backgroundColor: WHITE,
		paddingVertical: 30 * DP,
		paddingHorizontal: 48 * DP,
		borderRadius: 40 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	textStyle: {
		height: 44 * DP,
	},
});

export default TopAlarm;
