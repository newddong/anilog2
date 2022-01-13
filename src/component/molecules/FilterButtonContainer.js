import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from '../atom/btn/btn_style';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10} from '../atom/icon';

/**
 *
 *@param {{
 *items : 'Array',
 *btnTitle: string,
 *titleFontSize: number,
 *btnLayout: '버튼 레이아웃 ex) btn_w226',
 *onOn: '버튼 On Callback',
 *onOff:'버튼 Off Callback',
 * }} props
 */
export default FilterButtonContainer = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		press: () => {
			onPress();
		},
	}));
	// Dropdown 화살표의 state - True일 경우 opened 상태 / False일 경우 closed 상태
	const [btnStatus, setBtnStatus] = React.useState(false);

	const onPress = () => {
		console.log('DropdownSelect onPress');
		// setBtnStatus(!btnStatus);
		// Modal.popupSelect();
		(btnStatus && (onClose() || true)) || onOpen();
	};
	const onOpen = () => {
		console.log('DropdownSelect onOpen');
		setBtnStatus(true);
		props.onOpen();
	};

	const onClose = () => {
		console.log('DropdownSelect onClose');
		setBtnStatus(false);
		props.onClose();
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					props.btnLayout,
					{
						borderWidth: 4 * DP,
						borderColor: GRAY10,
						width: props.width ? props.width * DP : null,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}>
				<Text
					style={[
						txt.noto24,
						{
							color: GRAY10,
							marginRight: 20 * DP,
						},
					]}>
					{props.value}
				</Text>
				<View style={{position: 'absolute', right: 10 * DP}}>{btnStatus ? <Arrow_Up_GRAY10 /> : <Arrow_Down_GRAY10 />}</View>
			</View>
		</TouchableOpacity>
	);
});

FilterButtonContainer.defaultProps = {
	btnTitle: 'title',
	titleFontSize: 24,
	btnLayout: null,
	onOn: e => console.log(e),
	onOff: e => console.log(e),
};
