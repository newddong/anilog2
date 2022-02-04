import React from 'react';
import {TextInput, View} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Atom/svgwrapper';
import {CancelInput, EyeIcon} from 'Asset/image';
import {GRAY, MAINCOLOR} from 'Root/config/color';
import DP from 'Root/config/dp';

export default FormTxtInput = React.forwardRef((props, ref) => {
	const [pass, setPass] = React.useState(props.password);
	const input = React.useRef();
	const clear = e => {
		if (ref) {
			ref.current.clear();
		} else {
			input.current.clear();
		}
		// ref.current.clear();
		e.nativeEvent.text = '';
		props.onChange(e);
		setClear(false);
	};
	const [showClear, setClear] = React.useState(false);
	const countTxt = e => {
		if (e.length > 0) {
			setClear(true);
		} else {
			setClear(false);
		}
	};
	const showpass = () => {
		setPass(!pass);
	};
	const handleChange = e => {
		props.onChange(e);
	};

	if (props.doFocus) {
		props.doFocus = () => {
			input.current.focus();
		};
	}
	const setRef = inputRef => {
		if (ref) {
			ref.current = inputRef;
		} else {
			input.current = inputRef;
		}
	};
	return (
		<View style={[props.style, {justifyContent: 'center'}]}>
			<TextInput
				style={props.inputStyle}
				placeholder={props.placeholder}
				placeholderTextColor={props.placeholderTextColor}
				onChange={handleChange}
				onChangeText={countTxt}
				onFocus={props.onFocus}
				multiline={props.multiline}
				onBlur={props.onBlur}
				ref={setRef}
				secureTextEntry={pass}
				value={props.value}
				defaultValue={props.defaultValue}
				maxLength={props.maxLength}
				onEndEditing={props.onEndEditing}></TextInput>

			{props.password && showClear && (
				<SvgWrap
					style={{width: 36 * DP, height: 24 * DP, position: 'absolute', right: 88 * DP}}
					onPress={showpass}
					svg={<EyeIcon fill={pass ? GRAY : MAINCOLOR} />}
				/>
			)}

			{showClear && (
				<SvgWrap hitboxStyle={{width: 52 * DP, height: 52 * DP, position: 'absolute', right: 20 * DP}} onPress={clear} svg={<CancelInput />} />
			)}
		</View>
	);
});

FormTxtInput.defaultProps = {
	password: false, //Form입력을 password 입력으로 전환, true이면 입력시 값이 보이지 않음
	value: null, //TextInput의 value
	onChange: e => {}, //TextInput의 onChange에 대응, onChange의 이벤트를 argument로 받음
	onFocus: () => {}, //포커스를 얻었을때 실행
	onBlur: () => {}, //포커스를 잃었을때 실행
	multiline: false, //다중행 입력을 활성
	placeholderTextColor: '#000', //placeholder의 글자색
	placeholder: '', //placeholder 텍스트
	inputStyle: {}, //TextInput의 스타일
	style: {}, //TextInput의 container View스타일
};
//maxLength, onEndEditing prop설명 추가 필요
//ref로 사용가능한 함수
//focus()
//clear()
//blur()
