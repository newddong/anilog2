import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import DP from 'Root/config/dp';
import {RadioChecked38, RadioUnchecked38} from 'Atom/icon';

/**
 * 단일 라디오 박스
 * @param {object} props - Props Object
 * @param {void} props.onPress - 선택 콜백
 * @param {boolean} props.selected - 선택 여부
 * @param {string} props.children - 라디오 아이템 텍스트
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.style - 스타일
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.textStyle - 텍스트 스타일
 */
const RadioBoxItem = props => {
	const defaultStyle = {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'};
	const style = Array.isArray(props.style) ? [...props.style, defaultStyle] : {...props.style, ...defaultStyle};
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={style}>
				<View style={{marginRight: 12 * DP}}>{props.selected ? <RadioChecked38 /> : <RadioUnchecked38 />}</View>
				<Text style={Array.isArray(props.textStyle) ? [...props.textStyle] : {...props.textStyle}}>{props.children}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
RadioBoxItem.defaultProps = {
	horizontal: true,
	width: 550 * DP,
};

export default RadioBoxItem;
