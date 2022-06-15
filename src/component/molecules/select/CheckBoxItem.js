import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import DP from 'Root/config/dp';
import {Check42, Check50, Rect42_Border, Rect48_GRAY30, Rect50_Border} from 'Atom/icon';
import {GRAY10, GRAY20, MAINBLACK} from 'Root/config/color';
import {findAccount_style} from 'Root/component/templete/style_templete';


/**
 * 체크박스, 그룹지정 가능함
 *
 * @param {object} props - Props Object
 * @param {boolean} props.disable - 선택 가능여부
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.textStyle - 텍스트 스타일
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.style - 컨테이너 스타일
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 */
export default CheckBoxItem = props => {
	const [checked, setChecked] = React.useState(false); //체크상태 여부 boolean isCheck값에 따라 초기상태 결정됨

	const toggleCheck = () => {
		setChecked(!checked);
	};

	React.useEffect(() => {
		props.onCheck(checked); //onCheck에 변화된 checked 값을 매개변수로 보냄
	}, [checked]);

    const defaultStyle = {flexDirection:'row',alignItems:'center',justifyContent:'center'};
    const style = Array.isArray(props.style)?[...props.style,defaultStyle]:{...props.style,...defaultStyle};

	return (
		<View style={style}>
			{props.disable ? <Rect48_GRAY30 /> : checked ? <Check42 onPress={toggleCheck} /> : <Rect42_Border onPress={toggleCheck} />}
			<Text style={Array.isArray(props.textStyle)?[...props.textStyle,{marginLeft:12*DP}]:{...props.textStyle,marginLeft:12*DP}}>
				{props.children}
			</Text>
		</View>
	);
};

CheckBoxItem.defaultProps = {
	disable: false,
	onCheck: e => console.log(e),
};
