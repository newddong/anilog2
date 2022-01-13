import React from 'react';
import {Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {APRI10, RED10} from 'Root/config/color';
import NormalDropDown from './NormalDropDown';
import Input24 from 'Molecules/input/Input24';

/**
 * 드롭다운이 추가된 인풋 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.items - 드롭다운 목록
 * @param {string} props.placeholder - 인풋의 Placeholder
 * @param {string} props.defaultValue - 인풋의 초기 값 (기존 데이터 출력용)
 * @param {string} props.value - 인풋 값
 * @param {string} props.title - 인풋 상단의 제목
 * @param {string} props.alert_msg - 인풋 값의 Validator 미통과 결과 출력
 * @param {'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad'} props.keyboardType - 버튼 테마 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad'
 * @param {'star' | 'info' | 'none' } props.descriptionType - 인풋의 DescriptionType 테마 'star' | 'info' | 'none'  / Default = 'none'
 * @param {boolean} props.title_star - 제목 부분의 별표(강조용) 출력 여부 Default=false
 * @param {number} props.defaultIndex - 드롭 다운의 초기값 인덱스
 * @param {number} props.width - 인풋 너비(드롭다운은 제외) , default=200
 * @param {string} props.delimiter - 드롭다운 결과값과 인풋 값과의 구분문자
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 시 동작하는 콜백, 인풋 반환
 * @param {()=>void} props.onClear - 지우기 버튼 클릭 시 동작하는 콜백, 제목 반환환
 * @param {(item)=>void} props.onSelectDropDown - 드롭다운 항목이 선택되었을 때 동작하는 콜백, 선택된 Object 반환
 * @param {(boolean)=>void} props.onValid - 인풋의 Validator 통과 여부 / boolean 반환
 * @param {()=>boolean} props.validator -
 *
 */
const InputWithSelect = props => {
	const [dropdownVal, setDropdownVal] = React.useState(props.items ? props.items[props.defaultIndex] : '');
	const [input, setInput] = React.useState(props.defaultValue || '');
	const inputRef = React.useRef();

	const onChange = text => {
		props.onChange(dropdownVal + props.delimiter + text);
		setInput(text);
	};

	const onSelectDropDown = (v, i) => {
		// console.log('드롭다운 선택확인 ', v, i);
		props.onChange(v + props.delimiter + input);
		setDropdownVal(v);
	};

	const validator = text => {
		return props.validator(text) ? props.validator(text) : false;
	};

	const onValid = isValid => {
		// console.log('isValud', isValid);
		props.onValid(isValid);
	};

	return (
		<View style={{height: 82 * DP, maxWidth: 654 * DP}}>
			{props.title != null ? (
				<View style={{flexDirection: 'row'}}>
					<Text style={[txt.noto24, {color: APRI10}]}>{props.title}</Text>
					<Text style={[txt.noto24, {color: RED10, marginLeft: 30 * DP}]}>{props.title_star ? '*' : null}</Text>
					<Text style={[txt.noto24, {color: RED10, marginLeft: 30 * DP}]}>{props.alert_msg}</Text>
				</View>
			) : null}
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<NormalDropDown menu={props.items} width={200} defaultIndex={props.defaultIndex ? props.defaultIndex : 0} onSelect={onSelectDropDown} />
				<View style={{marginLeft: 20 * DP}}>
					<Input24
						placeholder={props.placeholder}
						value={input}
						ref={inputRef}
						keyboardType={props.keyboardType}
						confirm={props.confirm}
						confirm_msg={props.confirm_msg}
						showMsg={props.showMsg}
						// defaultValue={props.defaultValue}
						onChange={onChange}
						validator={validator}
						onValid={onValid}
						width={props.width || 450}
					/>
				</View>
			</View>
		</View>
	);
};
InputWithSelect.defaultProps = {
	placeholder: 'placeholder',
	items: ['default1', 'default2', 'default3', 'test3', 'test5'],
	defaultIndex: 0, // props로 받은 itemList의 디폴트 인덱스
	value: '',
	showMsg: false,
	title: '',
	title_star: false,
	alert_msg: '',
	onChange: e => console.log('InputWithSelect Default onChange   ', e),
	onClear: e => console.log('InputWithSelect Default onClear   ', e),
	onSelectDropDown: e => console.log('InputWithSelect Default onSelectDropDown   ', e),
	onValid: e => {},
	validator: e => {
		return true;
	},
	width: 454,
	keyboardType: 'default',
	delimiter: '',
};

export default InputWithSelect;
