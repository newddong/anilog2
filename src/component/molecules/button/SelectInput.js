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
 * @param {()=>void} props.onPressInput - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const SelectInput = props => {
	const onPressInput = () => {
		props.onPressInput();
	};

	return (
		<TouchableOpacity onPress={onPressInput} style={[styles.container, {width: props.width * DP}]}>
			<Text
				style={[
					txt.noto28,
					{
						color: props.textColor,
						width: (props.width - 70) * DP,
						textAlign: 'center',
					},
				]}>
				{props.value}
			</Text>
			<Arrow_Down_GRAY10 />
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
};

export default SelectInput;
