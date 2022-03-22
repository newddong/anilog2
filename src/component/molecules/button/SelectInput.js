import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Arrow_Down_GRAY10} from 'Root/component/atom/icon';
import {APRI10, GRAY20, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

/**
 * 셀렉트 모달 View 컴포넌트
 * @param {object} props - Props Object
 * @param {value} props.value - 현재 선택 값
 * @param {string} props.textColor - 텍스트 색깔
 * @param {number} props.width - 인풋 너비
<<<<<<< HEAD
 * @param {()=>void} props.onPressInput - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
=======
 * @param {number} props.fontSize - 인풋 너비
 * @param {()=>void} props.onPressInput - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 * @param {boolean} props.noBorder - 하단 테두리
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
 */
const SelectInput = props => {
	const onPressInput = () => {
		props.onPressInput();
	};

	return (
<<<<<<< HEAD
		<TouchableOpacity onPress={onPressInput} style={[styles.container, {width: props.width * DP}]}>
=======
		<TouchableOpacity
			onPress={onPressInput}
			style={[
				styles.container,
				{
					width: props.width * DP,
					borderBottomColor: props.noBorder ? WHITE : APRI10,
					// backgroundColor: 'yellow',
				},
			]}>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
			<Text
				style={[
					txt.noto28,
					{
<<<<<<< HEAD
						color: props.textColor,
						width: (props.width - 70) * DP,
						textAlign: 'center',
=======
						fontSize: props.fontSize * DP,
						color: props.textColor,
						width: (props.width - 70) * DP,
						textAlign: 'center',
						// backgroundColor: 'red',
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
					},
				]}>
				{props.value}
			</Text>
<<<<<<< HEAD
			<Arrow_Down_GRAY10 />
=======
			<View style={[{top: 4 * DP}]}>
				<Arrow_Down_GRAY10 />
			</View>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		flexDirection: 'row',
	},
});

SelectInput.defaultProps = {
	width: 202,
	textColor: 'black',
	value: 'Default',
	onPressInput: () => {},
<<<<<<< HEAD
=======
	noBorder: false,
	fontSize: 28,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
};

export default SelectInput;
