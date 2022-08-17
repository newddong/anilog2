import React from 'react';
import {Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {Check42, Rect42_Border, Rect48_GRAY30} from 'Atom/icon';

/**
 * 체크박스, 그룹지정 가능함
 *
 * @param {object} props - Props Object
 * @param {boolean} props.disable - 선택 가능여부
 * @param {boolean} props.isCheck - 초기 선택 상태
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.textStyle - 텍스트 스타일
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.style - 컨테이너 스타일
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 */
export default CheckBoxItem = props => {
	const [checked, setChecked] = React.useState(props.isCheck || false); //체크상태 여부 boolean isCheck값에 따라 초기상태 결정됨

	const toggleCheck = () => {
		setChecked(!checked);
	};

	React.useEffect(() => {
		props.onCheck(checked); //onCheck에 변화된 checked 값을 매개변수로 보냄
	}, [checked]);

	const defaultStyle = {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'};
	const style = Array.isArray(props.style) ? [...props.style, defaultStyle] : {...props.style, ...defaultStyle};

	return (
		<View style={style}>
			{props.disable ? <Rect48_GRAY30 /> : checked ? <Check42 onPress={toggleCheck} /> : <Rect42_Border onPress={toggleCheck} />}
			<Text style={Array.isArray(props.textStyle) ? [...props.textStyle, {marginLeft: 12 * DP}] : {...props.textStyle, marginLeft: 12 * DP}}>
				{props.children}
			</Text>
		</View>
	);
};

CheckBoxItem.defaultProps = {
	disable: false,
	onCheck: e => console.log(e),
};
