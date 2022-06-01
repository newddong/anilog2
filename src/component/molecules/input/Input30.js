import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {BLACK, APRI10, GRAY10, GRAY20, GRAY30, RED10, GREEN} from 'Root/config/color';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import {Cross24_Filled, Cross52} from 'Atom/icon';
import {TouchableOpacity} from 'react-native';

/**
 * 인풋 크기 30
 * @type {React.ForwardRefRenderFunction<?,Input30Props>}
 *
 */
const Input30 = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		focus: () => {
			inputRef.current.focus();
		},
		blur: () => {
			inputRef.current.blur();
		},
		clear: () => {
			onClear();
		},
	}));
	const [input, setInput] = React.useState(props.defaultValue ? props.defaultValue : '');
	const [confirmed, setConfirmed] = React.useState(input == '' ? false : true); //Confirm Msg 출력 Boolean
	const inputRef = React.useRef();

	// Input 값 변동 콜백
	const onChange = text => {
		// validator(text);
		setInput(text);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		props.validator && validator(text);
		props.onChange && props.onChange(text);
	};

	const validator = text => {
		let isValid = props.validator(text);
		// console.log('isValid / Text', text);
		// console.log('isValid', isValid);
		setConfirmed(isValid);
		props.onValid && props.onValid(isValid);
	};

	const getMsg = () => {
		if (props.showmsg) {
			if (props.value == undefined || props.value.length == 0) {
				return false;
			} else if (confirmed) {
				return <Text style={(txt.noto22, {color: GREEN, lineHeight: 48 * DP})}>{props.confirm_msg}</Text>;
			} else if (!confirmed) {
				return <Text style={(txt.noto22, {color: RED10, lineHeight: 48 * DP})}>{props.alert_msg}</Text>;
			}
		}
	};

	const onClear = () => {
		inputRef.current.clear();
		//지우기에서도 onChange에 빈 값을 넣어주어야 부모의 Confirmed값이 false로 바뀐다
		//부모는 onChange로 넘어오는 값을 통해 Validator를 수행하기 때문
		// setInput('');
		setConfirmed(false);
		props.onValid && props.onValid(false);
		props.onChange('');
		props.onClear();
	};

	const onFocus = () => {
		Modal.closeKeboard();
		props.onFocus && props.onFocus();
	};
	const showTitle = () => {
		return props.showTitle ? (
			<View>
				<Text style={[txt.noto30b, {color: APRI10}]}> {props.title} </Text>
				<Text style={[txt.noto22, {color: GRAY20}]}> {props.description} </Text>
			</View>
		) : (
			false
		);
	};

	return (
		<View style={{flexDirection: 'row'}}>
			<View>
				{/* 하단테두리 2px이 있기 때문에 inputValue와 82px가 차이가 나도 -2한 80값을 height로 줌 */}
				{showTitle()}
				<View
					style={[
						props.height ? {height: props.height * DP} : {height: 80 * DP},
						{
							backgroundColor: '#FAFAFA',
							borderRadius: 30 * DP,
							// borderBottomWidth: 2 * DP,
							// borderBottomColor: input == undefined || input.length == 0 ? GRAY30 : APRI10,
							// borderBottomColor: props.value == undefined || props.value.length == 0 ? GRAY30 : APRI10,
							flexDirection: 'row',
							alignItems: 'center',
						},
					]}>
					<TextInput
						ref={inputRef}
						onChangeText={onChange}
						placeholder={props.placeholder}
						value={input}
						onFocus={onFocus}
						// value={props.value}
						editable={props.editable}
						placeholderTextColor={GRAY10}
						defaultValue={props.defaultValue}
						keyboardType={props.keyboardType}
						maxLength={props.maxLength}
						style={[
							txt.roboto28,
							{
								//TextInput과 바깥 View와의 거리 24px, lineHeight는 Text View크기와 일치
								paddingLeft: 16 * DP,
								textAlignVertical: 'bottom',
								color: confirmed ? BLACK : RED10,
								// width: props.width * DP,
								// width: props.width ? props.width - 46 * DP : null,
								width: props.width ? props.width * DP : null,
								// textAlign: 'center',
							},
						]}
					/>
					{/* {input.length > 0 ? ( */}
					{props.value.length > 0 && props.showCrossMark ? (
						<TouchableOpacity onPress={onClear} style={{position: 'absolute', right: 20 * DP, alignItems: 'center', width: 66 * DP, height: 40 * DP}}>
							<Cross24_Filled />
						</TouchableOpacity>
					) : (
						false
					)}
				</View>
				{getMsg()}
			</View>
		</View>
	);
});

const Input30Props = {
	/** @type {boolean} 제목 표시여부*/
	showTitle: bool,
	/** @type {string} showTitle True일 시 출력되는 inputTitle */
	title: string,
	/** @type {string} 플레이스홀더 */
	placeholder: string,
	/** @type {string}  showTitle True일 시 출력되는 안내메시지*/
	description: string,
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
	/** @type {number} 글자수제한 */
	maxLength: number,
	/** @type {boolean} 하단의 경고/확인 메세지를 표시할지 여부를 결정 */
	showmsg: bool,
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
	/** @type {boolean} 인터넷 주소를 입력할때 http표시 */
	showHttp: bool,
	/** @type {()=>boolean} true/false를 반환하는 입력 양식 검증함수 */
	validator: func,
	/** @type {(result:boolean)=>void} validator가 실행될 때마다 발생하는 콜백함수, validator의 결과값을 매개변수로 통보*/
	onValid: func,
	/** @type {string} 인풋 키보드 타잎 default|number-pad|decimal-pad|numeric|email-address|phone-pad 다른 속성은 RN공식문서 참조 */
	keyboardType: string,
};

Input30.propTypes = Input30Props;

Input30.defaultProps = {
	showTitle: true, // true - title과 description 출력 , false - 미출력
	title: 'title',
	description: 'description',
	placeholder: 'placeholder',
	value: 'value',
	showmsg: true,
	alert_msg: 'alert_msg',
	confirm_msg: 'confirm_msg',
	showCrossMark: true,
	editable: true,
	onClear: e => console.log(e),
	onChange: e => console.log(e),
	validator: e => console.log('Input30 default validator', e),
	onValid: e => console.log('Input30 default onValid ', e),
	width: 300, // TextInput 너비,
	keyboardType: 'default',
};

export default Input30;
