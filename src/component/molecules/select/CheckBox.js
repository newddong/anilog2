import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {Check42, Rect42_Border, Rect48_GRAY30} from 'Atom/icon';
import {MAINBLACK} from 'Root/config/color';

/**
 * 단일 체크박스 컴포넌트
 *
 * @param {object} props - Props Object
 * @param {boolean} props.disable - 선택 가능여부
 * @param {boolean} props.isCheck - 선택 상태
 * @param {boolean} props.state - 선택 상태
 * @param {string} props.value - 텍스트 라벨
 * @param {()=>void} props.onCheck - 체크 콜백
 */
export default CheckBox = props => {
	const [checked, setChecked] = React.useState(props.state); //체크상태 여부 boolean isCheck값에 따라 초기상태 결정됨

	const toggleCheck = () => {
		setChecked(!checked);
	};

	React.useEffect(() => {
		setChecked(props.state);
		props.onCheck(props.state);
	}, [props.state]);

	React.useEffect(() => {
		props.onCheck(checked); //onCheck에 변화된 checked 값을 매개변수로 보냄
	}, [checked]);

	return (
		<View style={[{flexDirection: 'row'}, {justifyContent: 'center'}]}>
			{props.disable ? <Rect48_GRAY30 /> : checked ? <Check42 onPress={toggleCheck} /> : <Rect42_Border onPress={toggleCheck} />}
			<Text
				style={[
					props.txtSize == 28 ? txt.noto28 : txt.noto24,
					{
						color: MAINBLACK,
						paddingLeft: 12 * DP,
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
