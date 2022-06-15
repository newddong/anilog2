import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TextInput} from 'react-native';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY30, GRAY50, RED10} from 'Root/config/color';

/**
 * 인풋 벌룬
 * @type {React.ForwardRefRenderFunction<?,InputBalloonProps>}
 *
 */
const InputBalloon = React.forwardRef((props, ref) => {
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
		measureLayout: (containerRef, callback, failcallback) => {
			inputRef.current.measureLayout(containerRef, callback, failcallback);
		},
	}));
	const inputRef = React.useRef();
	const [text, setText] = React.useState('');

	React.useEffect(() => {
		setText(props.defaultValue);
	}, [props.defaultValue]);

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
		<View style={{width: 694 * DP,marginTop:12*DP}}>
			{props.title == '' ? (
				<></>
			) : (
				<Text style={[txt.noto24, {color: APRI10, lineHeight: 34 * DP}]}>
					{/* Title을 props로 받을 것인지 Input으로 컴포넌트 내에서 처리할 것인지 확인 필요 */}
					{props.title}
				</Text>
			)}

			<View
				style={{
					color: RED10,
					width: 694 * DP,
					height: 264 * DP,
					borderRadius: 30 * DP,
					paddingHorizontal:24*DP,
					backgroundColor: GRAY50,
					paddingTop: 24 * DP,
					alignItems: 'center',
					// justifyContent: 'center',
				}}>
				<TextInput
					style={[txt.noto28, {textAlignVertical: 'top'}]}
					onChangeText={text => onChange(text)}
					placeholder={props.placeholder}
					multiline={true}
					ref={inputRef}
					maxLength={props.maxLength}
					placeholderTextColor={GRAY10}
					onPressIn={props.onPressIn}
					value={props.defaultValue}
				/>
				{props.showLimit&&<Text style={[txt.roboto24, {color: GRAY10, alignSelf: 'flex-end'}]}> {text.length} /200</Text>}
			</View>
		</View>
	);
});
InputBalloon.defaultProps = {
	placeholder: 'placeholder',
	value: 'value',
	title: '',
	maxLength: 300,
	onChange: e => console.log(e),
	defaultValue: '',
	showLimit: true,
};
const InputBalloonProps = {
	/** @type {string} 인풋 타이틀 */
	title: string,
	/** @type {string} 텍스트 초기 상태 */
	placeholder: string,
	/** @type {string} 텍스트 디폴트 */
	defaultValue: string,
	/** @type {()=>void)} 텍스트 변경 콜백 */
	onChange: func,
	/** @type {number} 최대 길이 */
	maxLength: number,
};

InputBalloon.propTypes = InputBalloonProps;
export default InputBalloon;
