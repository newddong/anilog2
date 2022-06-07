import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, StyleSheet} from 'react-native';
import {APRI10, GRAY10, GRAY20, GRAY30, MAINBLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Atom/btn/btn_style';
import {Arrow48} from 'Root/component/atom/icon';
/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {string} props.btnTitle - 버튼 제목목
 * @param {string} props.direction - 방향
 * @param {(title:string)=>void} props.onPress - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const ArrowButton = ({direction, onPress}) => {
	const getDirect = () => {
		if (direction == 'back') {
			return '180deg';
		} else return '0deg';
	};

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[style.container]}>
			{direction == 'back' ? (
				<>
					<View
						style={{
							transform: [{rotate: getDirect()}],
							width: 30 * DP,
						}}>
						<Arrow48 />
					</View>
					<Text style={[txt.noto24, {marginBottom: 4 * DP}]}>뒤로 </Text>
				</>
			) : (
				<>
					<Text style={[txt.noto24, {marginBottom: 4 * DP}]}>다음 </Text>
					<View
						style={{
							transform: [{rotate: getDirect()}],
							width: 30 * DP,
						}}>
						<Arrow48 />
					</View>
				</>
			)}
		</TouchableOpacity>
	);
};

ArrowButton.defaultProps = {
	btnTitle: 'title', //버튼의 제목
	direction: 'forward',
	onPress: e => console.log(e), // 버튼을 탭했을때 발생하는 콜백
};

const style = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: 162 * DP,
		height: 70 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		paddingVertical: 10 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ArrowButton;
