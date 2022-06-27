import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Arrow_Down_GRAY10} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

/**
 * 셀렉트 모달 View 컴포넌트
 * @param {object} props - Props Object
 * @param {string} props.value - 현재 선택 값
 * @param {string} props.defaultText - 디폴트 선택 값
 * @param {string} props.textColor - 텍스트 색깔
 * @param {number} props.width - 인풋 너비
 * @param {number} props.fontSize - 인풋 너비
 * @param {()=>void} props.onPressInput - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 * @param {boolean} props.noBorder - 하단 테두리
 * @param {height} props.height
 */
const SelectInput = props => {
	const onPressInput = () => {
		props.onPressInput();
	};

	const isDefault = props.defaultText == props.value;

	return (
		<TouchableOpacity
			onPress={onPressInput}
			style={[
				styles.container,
				{
					width: props.width * DP,
					borderBottomColor: props.noBorder ? WHITE : APRI10,
					height: props.height * DP,
					// borderBottomColor: isDefault ? GRAY30 : APRI10,
				},
			]}>
			<Text
				style={[
					txt.noto28,
					{
						fontSize: props.fontSize * DP,
						color: props.textColor,
						color: isDefault ? GRAY10 : BLACK,
						width: (props.width - 70) * DP,
						textAlign: 'center',
					},
				]}>
				{props.value}
			</Text>
			<View style={[{top: 4 * DP}]}>
				<Arrow_Down_GRAY10 />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		// height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FAFAFA',
		borderRadius: 30 * DP,
		// borderBottomColor: APRI10,
		// borderBottomWidth: 2 * DP,
		flexDirection: 'row',
	},
});

SelectInput.defaultProps = {
	width: 202,
	height: 82,
	textColor: 'black',
	value: 'Default',
	onPressInput: () => {},
	noBorder: false,
	fontSize: 28,
	defaultText: '',
};

export default SelectInput;
