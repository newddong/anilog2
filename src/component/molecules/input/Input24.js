import React from 'react';
import {txt} from 'Root/config/textstyle';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import {Text, View, TextInput, Platform} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, GRAY30, GRAY40, GREEN, RED10} from 'Root/config/color';
import {Cross46, Eye52_APRI10, Eye52_GRAY20} from 'Atom/icon';
import Modal from 'Component/modal/Modal';
/**
 * 인풋 크기 24
 * @type {React.ForwardRefRenderFunction<?,Input24Props>}
 *
 */
const Input24 = React.forwardRef((props, ref) => {
	// console.log('props', props);
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
	// const [input, setInput] = React.useState('');
	const [confirm, setConfirm] = React.useState(false);
	const inputRef = React.useRef();

	React.useEffect(() => {
		validator(props.value);
		props.onChange && props.onChange(props.value);
	}, [props.value]);

	React.useEffect(() => {
		if (props.defaultValue != null) {
			// console.log('defaultValue', props.defaultValue);
			onChange(props.defaultValue);
		}
	}, [props.defaultValue]);

	//Validator 조건확인이 안되었기에 테스트용으로 입력된 텍스트가
	// 10자 이상일 때 confirmed가 되도록 작성
	const validator = text => {
		let isValid = props.validator(text);
		props.onValid && props.onValid(isValid);
		setConfirm(isValid);
	};

	const setBorderColor = () => {
		// if (input.length == 0) {
		if (props.value.length == 0) {
			return GRAY30;
		} else return confirm ? APRI10 : GRAY30;
	};

	const onChange = text => {
		// setInput(text);
		props.validator && validator(text);
		props.onChange && props.onChange(text);
	};

	const onFocus = () => {
		Modal.closeKeboard();
		// inputRef.current.clear();
		props.onFocus();
	};

	const onBlur = () => {
		props.onBlur();
	};

	const onClear = () => {
		inputRef.current.clear();
		// props.showHttp ? setInput('http://') : setInput(''); Input24보다 더 상위 레벨에서 사용용
		props.onValid && props.onValid(false);
		props.onChange('');
		props.onClear();
	};

	const getDescription = () => {
		if (props.descriptionType == 'info') {
			return <Text style={[txt.noto22, {color: GRAY10, marginLeft: 20 * DP}]}> *{props.info} </Text>;
		} else if (props.descriptionType == 'star') {
			return <Text style={[txt.noto28, {color: RED10, marginLeft: 40 * DP}]}>*</Text>;
		} else if (props.descriptionType == 'none') {
			return <></>;
		}
	};

	const getMsg = () => {
		if (props.showMsg) {
			// if (input.length == 0) {
			if (props.value == undefined || props.value.length == 0) {
				// return <Text style={(txt.noto22, {color: RED10, lineHeight: 36 * DP})}></Text>;
				return false;
			} else {
				return confirm ? (
					<Text style={(txt.noto22, {color: GREEN, lineHeight: 36 * DP})}>{props.confirm_msg}</Text>
				) : (
					<Text style={(txt.noto22, {color: RED10, lineHeight: 36 * DP})}>{props.alert_msg}</Text>
				);
			}
		}
	};

	return (
		<View style={[props.width && {width: props.width * DP}, {flexDirection: 'column'}]} onLayout={props.onLayout}>
			{/* width props를 입력하지 않을 경우 Input컴포넌트의 부모의 width를 따라 넓이가 정해지도록 수정*/}
			{/* height 를 title과 alert_msg가 없을 때에는 공간을 차지하지 않도록 가변이 되도록 style을 수정*/}

			{/* {console.log(typeof props.title)} */}
			{/* {console.log('props.title=' + props.title + props.width)} */}
			{/* parent에서 title이 props로 명시되어 있지 않을 경우 'title' string 으로 받음. */}
			{props.title != '' && props.title != 'title' && (
				<View style={{flexDirection: 'row'}}>
					<Text style={[txt.noto24, {color: APRI10}]}> {props.title}</Text>
					{getDescription()}
				</View>
			)}
			{/* 하단테두리 2px이 있기 때문에 inputValue와 82px가 차이가 나도 -2한 80값을 height로 줌 */}
			<View
				style={{
					height: 80 * DP,
					borderBottomWidth: 2 * DP,
					borderBottomColor: setBorderColor(),
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<TextInput
					ref={inputRef}
					onChangeText={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					value={props.value}
					placeholder={props.placeholder}
					placeholderTextColor={GRAY10}
					defaultValue={props.defaultValue || null}
					editable={props.editable}
					keyboardType={props.keyboardType}
					secureTextEntry={props.secureTextEntry}
					maxLength={props.maxlength}
					numberOfLines={props.numberOfLines}
					multiline={props.multiline}
					autoCapitalize={'none'}
					style={[
						txt.noto28,
						props.style,
						{
							width: props.width ? props.width * DP - 46 * DP : null,
							paddingLeft: 24 * DP,
							height: '100%', //ios에서 안드로이드와 동작 일치시키기 위함
							lineHeight: 44 * DP,
							// minWidth: 300 * DP,
						},
					]}
					onPressIn={props.onPressIn}
				/>
				{props.value.length > 0 && props.showCrossMark ? (
					<View style={{position: 'absolute', right: 0}}>
						<Cross46 onPress={onClear} />
					</View>
				) : (
					false
				)}
			</View>
			{getMsg()}
		</View>
	);
});

const Input24Props = {
	/** @type {string} 입력창 제목(상단) */
	title: string,
	/** @type {string} 플레이스홀더 */
	placeholder: string,
	/** @type {string} 표시 설정 ('star'|'info'|'none') */
	descriptionType: string,
	/** @type {string} 입력창에 입력된 값 */
	value: string,
	/** @type {string} 경고 메세지(입력창 하단에 붉게 표시, valdator가 false를 반환했을 때) */
	alert_msg: string,
	/** @type {string} 확인 메세지(입력창 하단에 녹색 표시, validator가 true를 반환했을 때) */
	confirm_msg: string,
	/** @type {string} 인포 메세지 */
	info: string,
	/** @type {number} 입력창 너비 */
	width: number,
	/** @type {number} 최대 글자수 */
	maxlength: number,
	/** @type {boolean} 하단의 경고/확인 메세지를 표시할지 여부를 결정 */
	showMsg: bool,
	/** @type {object}  입력창의 스타일 */
	style: object,
	/** @type {string} 입력창의 기본값, 기본값을 사용하기보다는 제어 컴포넌트를 사용하는것을 권장 */
	defaultValue: string,
	/** @type {boolean} Text Input의 Editable */
	editable: bool,
	/** @type {boolean} 입력창 초기화 아이콘 표시여부(글자수가 1개 이상일때 자동으로 표시) */
	showCrossMark: bool,
	/** @type {()=>void} 입력값이 바뀔때 발생하는 콜백 */
	onChange: func,
	/** @type {()=>void} 초기화 버튼 클릭시 발생하는 콜백 */
	onClear: func,
	/** @type {()=>void} 인풋이 포커스 되었을 때 발생하는 콜백 */
	onFocus: func,
	/** @type {()=>void} 인풋이 포커스 해제되었을 때 발생하는 콜백 */
	onBlur: func,
	/** @type {boolean} 인터넷 주소를 입력할때 http표시 */
	showHttp: bool,
	/** @type {()=>boolean} true/false를 반환하는 입력 양식 검증함수 */
	validator: func,
	/** @type {(result:boolean)=>void} validator가 실행될 때마다 발생하는 콜백함수, validator의 결과값을 매개변수로 통보*/
	onValid: func,
	/** @type {string} 인풋 키보드 타잎 default|number-pad|decimal-pad|numeric|email-address|phone-pad 다른 속성은 RN공식문서 참조 */
	keyboardType: string,
	/** @type {boolean} 암호 문자열의 경우 *로 가림*/
	secureTextEntry: bool,
};

Input24.propTypes = Input24Props;

Input24.defaultProps = {
	title: 'title', // input title
	placeholder: 'placeholder',
	descriptionType: 'star', // star , info , none - title 오른쪽 description을 별표형식 / Info형식 구분
	value: '',
	showMsg: false,
	alert_msg: 'alert_msg',
	confirm_msg: 'confirm_msg',
	editable: true,
	info: null, //
	numberOfLines: 1,
	multiline: false,
	defaultValue: null, // 기존 아이디 등 DefaultValue가 필요한 경우에 대한 처리
	showCrossMark: true, //Input 최우측 X마크(지우기마크) 출력 여부
	showHttp: false, //AssignShelterInformation에서 http:// 인풋 좌측에 놓기 위한 props
	onClear: e => {},
	onChange: e => {},
	validator: () => {
		return true;
	},
	onValid: e => {},
	onFocus: e => {},
	onBlur: e => {},
	keyboardType: 'default',
	secureTextEntry: false,
};

export default Input24;
