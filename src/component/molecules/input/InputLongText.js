import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY30} from 'Root/config/color';

/**
 * 대용량 인풋 컴포넌트
 * @param {object} props - Props Object
 * @param {string} props.placeholder - 인풋 PlaceHolder
 * @param {string} props.value - 인풋 값
 * @param {number} props.maxlength - 최대 글자 수 제한
 * @param {number} props.width - 박스 너비
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 */
const InputLongText = props => {
	const [content, setContent] = React.useState('');
	const inputRef = React.useRef();

	React.useEffect(() => {
		props.value != null ? setContent(props.value) : null;
	}, [props.value]);

	const blur = () => {
		inputRef.current.blur();
	};

	const focus = () => {
		inputRef.current.focus();
	};

	const clear = () => {
		inputRef.current.clear();
	};

	const onChange = text => {
		setContent(text);
		props.onChange(text);
	};

	return (
		<View style={{flexDirection: 'row'}}>
			<View
				style={{
					width: props.width * DP,
					height: 380 * DP,
					borderWidth: 2 * DP,
					borderRadius: 30 * DP,
					borderColor: content.length > 0 ? BLACK : GRAY30,
					alignItems: 'center',
					justifyContent: 'center',
					paddingHorizontal: 24 * DP,
				}}>
				<TextInput
					style={[
						txt.noto24,
						{
							width: (props.width - 48) * DP,
							height: 298 * DP,
							textAlignVertical: 'top',
						},
					]}
					onChangeText={onChange}
					placeholder={props.placeholder}
					placeholderTextColor="#767676"
					multiline={true}
					ref={inputRef}
					defaultValue={props.value}
					maxLength={props.maxlength}
				/>
				<View style={{width: 95 * DP, height: 30 * DP, alignSelf: 'flex-end'}}>
					<Text style={[txt.roboto24, {color: GRAY10}]}>
						{content.length}/{props.maxlength}
					</Text>
				</View>
			</View>
		</View>
	);
};
InputLongText.defaultProps = {
	placeholder: 'placeholder',
	value: null,
	maxlength: 500,
	onChange: e => console.log(e),
	width: 654,
};
export default InputLongText;
