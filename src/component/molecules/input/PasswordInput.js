import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View} from 'react-native';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import DP from 'Root/config/dp';
import {APRI10, GRAY20, GRAY30, GREEN, MAINBLACK, RED10} from 'Root/config/color';
import {Eye52_Black, Eye52_GRAY20} from 'Atom/icon';
import Input24 from 'Molecules/input/Input24';

/**
 * 비밀번호 입력
 * @type {React.ForwardRefRenderFunction<?,PasswordInputProps>}
 *
 */
const PasswordInput = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		blur: () => {
			inputRef.current.blur();
		},
		focus: () => {
			inputRef.current.focus();
		},
		clear: () => {
			inputRef.current.clear();
		},
		valid: text => {
			validator(text);
		},
	}));

	const [input, setInput] = React.useState(''); // 암호 input text state
	const [confirm, setConfirm] = React.useState(false); // 암호 validation state
	const [pwdSecureState, setPwdSecureState] = React.useState(true); // 암호 별표화 state
	const inputRef = React.useRef();

	//Input 하단 메시지 출력 분기
	const getMsg = () => {
		if (input.length == 0) {
			return <Text style={(txt.noto22, {color: GRAY20, lineHeight: 48 * DP})}>{props.information}</Text>;
		} else if (confirm == true) {
			return <Text style={(txt.noto22, {color: GREEN, lineHeight: 48 * DP})}>{props.confirm_msg}</Text>;
		} else if (confirm == false) {
			return <Text style={(txt.noto22, {color: RED10, lineHeight: 48 * DP})}>{props.alert_msg}</Text>;
		} else return false;
	};

	//Input Value Change Callback
	const onChange = text => {
		setInput(text);
		props.onChange && props.onChange(text);
		props.validator && validator(text); //부모에서 validator함수를 정의해주어야 validator를 실행
	};

	//Validator인데 onChange가 있는데 굳이 있어야 하는가 의문? onChange내부에 validator루틴을 넣을수 있도록 해서 사용자가 값을 입력시마다 validator가 true인지 false인지 판단하여
	//검증 로직을 외부(부모)에서 넣을수 있도록 함
	const validator = text => {
		// console.log('props.validator text', props.validator(text));
		let isValid = props.validator(text);
		props.onValid(isValid);
		setConfirm(isValid);
	};

	//비밀번호 보이기 설정
	const onShowPassword = () => {
		setPwdSecureState(!pwdSecureState);
		props.onShowPassword();
	};

	return (
		<View style={{flexDirection: 'row'}}>
			<View style={{}}>
				{/* 모든 text에 fontPadding false 적용 잊지말것 */}
				{/* parent에서 title이 props로 명시되어 있지 않을 경우 'title' string 으로 받음. */}
				<View style={props.title == null ? {flexDirection: 'row', height: 0} : {flexDirection: 'row'}}>
					{props.title != '' && props.title != 'title' && <Text style={[txt.noto28, {color: MAINBLACK, lineHeight: 40 * DP}]}> {props.title} </Text>}
					{/* Description 아래는 height 90으로 고정 */}
					{/* 하단테두리는 2px, APRI설정 */}

					{/* Title 우측 description. props에서 받아오는 경우 출력, or null */}
					{props.description != null ? <Text style={[txt.noto24, {color: GRAY20, position: 'absolute', right: 0}]}>*{props.description}</Text> : null}
				</View>

				<View
					style={[
						props.height ? {height: props.height * DP} : {height: 82 * DP},

						{
							flexDirection: 'row',
							alignItems: 'center',
						},
					]}>
					<Input24
						ref={inputRef}
						maxlength={25}
						placeholder={props.placeholder}
						onChange={onChange}
						width={props.width}
						value={input}
						height={props?.height}
						// showMsg={true}
						secureTextEntry={pwdSecureState} //암호 별모양 표시 boolean
					/>
					{/* /* X버튼은 TextInput과 28px 차이, 최하단 View테두리와는 14px 차이, 텍스트 길이가 1 이상일 경우에만 보여짐(입력값이 없을때 보여질 필요 없음) */}
					{input.length > 0 && (
						<View style={{position: 'absolute', right: 50 * DP, flexDirection: 'row'}}>
							<View style={{marginRight: 20 * DP}}>
								{pwdSecureState ? <Eye52_GRAY20 onPress={onShowPassword} /> : <Eye52_Black onPress={onShowPassword} />}
							</View>
						</View>
					)}
				</View>
				{getMsg()}
			</View>
		</View>
	);
});

const PasswordInputProps = {
	/** @type {string} 비밀번호란 상단 타이틀 */
	title: string,
	/** @type {string} placeholder  */
	placeholder: string,
	/** @type {string} confirm state가 'normal'일 경우 출력될 하단 메시지  */
	information: string,
	/** @type {string} pwd input 값   */
	value: string,
	/** @type {string}  confrim state가 false일 경우 출력될 하단 메시지 */
	alert_msg: string,
	/** @type {boolean} confirm의 T/F  */
	confirm: bool,
	/** @type {string}  confirm state가 true일 경우 출력될 하단 메시지 */
	confirm_msg: string,
	/** @type {(value:string)=>void} pwd input 값이 변할 때마다 수행되는 함수 */
	onChange: func,
	/** @type {()=>void} X마크로 input값을 clear할 때마다 수행되는 함수, 지우기 버튼(X) 클릭 Callback */
	onClear: func,
	/** @type {(pwd:string)=>void} 눈마크를 Press하여 별표(*)화된 pwd값을 보이게 할 경우 수행되는 함수,Password 보이기 설정 Callback */
	onShowPassword: func,
	/** @type {string} 암호 포맷에 관한 설명, title 우측에 붙는다 */
	description: string,
	/** @type {number} 패스워드 입력폼 너비 */
	width: number,
	/** @type {(pwd:string)=>boolean} return 값이 boolean인 함수, T/F상태에 따라 confirm이 바뀜*/
	validator: func,
	/** @type {(result:boolean)=>void} validator가 실행될 때마다 발생하는 콜백함수, validator의 결과값을 매개변수로 통보*/
	onValid: func,
};

PasswordInput.propTypes = PasswordInputProps;

PasswordInput.defaultProps = {
	title: 'title', //비밀번호란 상단 타이틀
	placeholder: 'placeholder', //placeholder
	information: 'information', // confirm state가 'normal'일 경우 출력될 하단 메시지
	value: null, // pwd input 값
	alert_msg: 'alert_msg', // confrim state가 false일 경우 출력될 하단 메시지
	confirm: false,
	confirm_msg: 'confirm_msg', // confirm state가 true일 경우 출력될 하단 메시지
	onChange: e => console.log('onChange' + e), // pwd input 값이 변할 때마다 수행되는 함수
	onClear: e => console.log('PasswordInput onClear : ' + e), // X마크로 input값을 clear할 때마다 수행되는 함수
	onShowPassword: e => console.log('PasswordInput onShowPassword' + e), // 눈마크를 Press하여 별표(*)화된 pwd값을 보이게 할 경우 수행되는 함수
	description: null, // 암호 포맷에 관한 설명, title 우측에 붙는다
	width: 654,
	validator: e => false,
	onValid: isValid => {},
};

export default PasswordInput;
