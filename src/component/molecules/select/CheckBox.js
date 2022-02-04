import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import DP from 'Root/config/dp';
import {Check50, Rect48_GRAY30, Rect50_Border} from 'Atom/icon';
import {GRAY10, GRAY20} from 'Root/config/color';
/**
 *
 * @param {{
 * isCheck : boolean ,
 * value : 'string / CheckBox 우측 텍스트',
 * disable : 'boolean / 버튼 사용 가능 여부,
 * onCheck : '박스가 체크될 시 수행되는 callBack함수'
 * }} props
 */
export default CheckBox = props => {
	// console.log('props.checkBoxState ', props.index, props.checkBoxState);
	const [checked, setChecked] = React.useState(props.checkBoxState || false); //체크상태 여부 boolean isCheck값에 따라 초기상태 결정됨

	const onCheck = () => {
		setChecked(!checked);
	};

	React.useEffect(() => {
		// console.log('props.state===>', props.state);
		setChecked(props.state);
		props.onCheck(props.state);
	}, [props.state]);

	React.useEffect(() => {
		setChecked(false);
	}, [props.isDeleted]);

	React.useEffect(() => {
		// console.log('CheckBox state?', checked);
		props.onCheck(checked); //onCheck에 변화된 checked 값을 매개변수로 보냄
	}, [checked]);

	return (
		<View style={{flexDirection: 'row'}}>
			{/* {console.log('checked=>' + checked)} */}
			{props.disable ? <Rect48_GRAY30 /> : checked ? <Check50 onPress={onCheck} /> : <Rect50_Border onPress={onCheck} />}
			<Text
				style={[
					txt.noto24,
					{
						// 사용불가 boolean에 따른 style 적용
						color: props.disable ? GRAY20 : GRAY10,
						paddingLeft: 12 * DP,
						marginTop: 5 * DP,
					},
				]}>
				{props.value}
			</Text>
		</View>
	);
};

CheckBox.defaultProps = {
	value: '',
	disable: false,
	onCheck: e => console.log(e),
};
