import React from 'react';
import {txt} from 'Root/config/textstyle';
import {View, TouchableOpacity, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {Cross24_Filled, Cross48, Search48} from 'Atom/icon';
/**
 * 검색 기능이 추가된 인풋 컴포넌트
 * @param {object} props - Props Object
 * @param {string} props.value - 인풋 값
 * @param {string} props.placeholder - 인풋의 PlaceHolder
 * @param {number} props.width - 인풋의 전체 너비
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경시 동작하는 콜백, 인풋 반환환
 * @param {(input:string)=>void} props.onSearch - 검색버튼을 눌렸을때 동작하는 콜백, 저장된 인풋을 반환
 * @param {()=>void} props.onClear - 지우기 버튼(X) 클릭시 동작하는 콜백
 * @param {()=>void} props.onFocus - 포커스 콜백
 * @param {()=>void} props.onBlur - 인풋 포커스 해제 콜백
 * @param {boolean} props.showCrossMark - X마크 출력 여부
 */
const InputWithSearchIcon = React.forwardRef((props, ref) => {
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
	}));
	const [input, setInput] = React.useState('');
	const inputRef = React.useRef();
	//인풋 값 변경 콜백
	const onChange = text => {
		setInput(text);
		props.onChange(text);
	};

	//지우기 마크 클릭 콜백
	const onClear = () => {
		inputRef.current.clear();
		props.onClear();
		setInput('');
	};

	//돋보기 버튼 클릭 콜백
	const onSearch = () => {
		props.onSearch(input);
		blur();
	};

	//인풋 포커스가 해제되었을 때 콜백
	const blur = () => {
		props.onBlur();
		inputRef.current.blur();
	};

	//인풋 포커스가 적용되었을 때 콜백
	const focus = () => {
		props.onFocus();
		inputRef.current.focus();
	};

	return (
		<View style={{flexDirection: 'row', backgroundColor: '#FAFAFA', height: 104 * DP, borderRadius: 30 * DP}}>
			{/* 하단테두리는 2px, APRI설정 */}
			<View
				style={{
					height: 104 * DP,
					// borderBottomWidth: 2 * DP,
					// borderBottomColor: input.length == 0 ? GRAY30 : APRI10,
					width: props.width * DP,
					alignItems: 'center',
					flexDirection: 'row',
				}}>
				<TextInput
					// value={props.value}
					onSubmitEditing={onSearch}
					onChangeText={text => onChange(text)}
					placeholder={props.placeholder}
					placeholderTextColor={'#999999'}
					ref={inputRef}
					value={props.value}
					onFocus={focus}
					onBlur={blur}
					style={[
						txt.roboto28,
						{
							paddingLeft: 24 * DP,
							// lineHeight: 48 * DP,
							// backgroundColor: 'red',
							width: (props.width - 150) * DP,
						},
					]}
				/>
				<View style={{flexDirection: 'row', position: 'absolute', alignItems: 'center', right: 0}}>
					{props.showCrossMark ? input.length == 0 ? <></> : <Cross24_Filled onPress={onClear} /> : <></>}
					{/* SearchIcon은 X 마크와 14px 차이 */}
					<TouchableOpacity onPress={onSearch} style={{marginHorizontal: 20 * DP}}>
						<Search48 />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
});
InputWithSearchIcon.defaultProps = {
	value: '',
	placeholder: 'placeholder',
	width: 654, //전체View Width
	onChange: e => console.log(e),
	onSearch: e => console.log(e),
	onClear: e => console.log(e),
	onFocus: () => {},
	onBlur: () => {},
	showCrossMark: true,
};

export default InputWithSearchIcon;
