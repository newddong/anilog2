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
	password: false, //Form????????? password ???????????? ??????, true?????? ????????? ?????? ????????? ??????
	value: null, //TextInput??? value
	onChange: e => {}, //TextInput??? onChange??? ??????, onChange??? ???????????? argument??? ??????
	onFocus: () => {}, //???????????? ???????????? ??????
	onBlur: () => {}, //???????????? ???????????? ??????
	multiline: false, //????????? ????????? ??????
	placeholderTextColor: '#000', //placeholder??? ?????????
	placeholder: '', //placeholder ?????????
	inputStyle: {}, //TextInput??? ?????????
	style: {}, //TextInput??? container View?????????
};
//maxLength, onEndEditing prop?????? ?????? ??????
//ref??? ??????????????? ??????
//focus()
//clear()
//blur()
