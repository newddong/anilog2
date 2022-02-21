import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY30, RED10} from 'Root/config/color';
/**
 * 테두리가 둥근 인풋 컴포넌트
 * @param {object} props - Props Object
 * @param {string} props.title - 인풋 상단의 제목
 * @param {string} props.placeholder - 인풋의 PlaceHolder
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 * @param {number} props.maxLength - 인풋의 길이 제한값
 */
const InputBalloon = React.forwardRef((props,ref) => {
	React.useImperativeHandle(ref, () => ({
		focus: () => {
			inputRef.current.focus();
		},
		blur: () => {
			inputRef.current.blur();
		},
		clear: () => {
			inputRef.current.clear();
		},
		measureLayout:(containerRef,callback,failcallback)=>{
			inputRef.current.measureLayout(
				containerRef,callback,failcallback
			)
		},
	}));
	const inputRef = React.useRef();
	const [text, setText] = React.useState('');

	const blur = () => {
		inputRef.current.blur();
	};

	const focus = () => {
		inputRef.current.focus();
	};

	const clear = () => {
		inputRef.current.clear();
	};

	const onChange = txt => {
		props.onChange(txt);
		setText(txt);
	};

	return (
		<View style={{width: 654 * DP}}>
			<Text style={[txt.noto24, {color: APRI10, lineHeight: 34 * DP}]}>
				{/* Title을 props로 받을 것인지 Input으로 컴포넌트 내에서 처리할 것인지 확인 필요 */}
				{props.title}
			</Text>
			<View
				style={{
					color: RED10,
					width: 654 * DP,
					height: 264 * DP,
					marginTop: 12 * DP,
					borderRadius: 30 * DP,
					borderWidth: 2 * DP,
					borderColor: APRI10,
					padding: 24 * DP,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<TextInput
					style={[txt.noto24, {width: 606 * DP, height: 182 * DP, textAlignVertical: 'top'}]}
					onChangeText={text => onChange(text)}
					placeholder={props.placeholder}
					multiline={true}
					ref={inputRef}
					maxLength={props.maxLength}
					onPressIn={props.onPressIn}
				/>
				<Text style={[txt.roboto24, {color: GRAY10, alignSelf: 'flex-end'}]}> {text.length} /200</Text>
			</View>
		</View>
	);
});
InputBalloon.defaultProps = {
	placeholder: 'placeholder',
	value: 'value',
	title: 'title',
	maxLength: 300,
	onChange: e => console.log(e),
};
export default InputBalloon;
