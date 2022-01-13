import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import Dropdown from 'Molecules/Dropdown';
import {btn_w280, btn_w226} from 'Atom/btn/btn_style';
import {APRI10, APRI20, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import MeatBallButton from 'Root/component/molecules/MeatBallButton';

/**
 *
 * @param {{
 * menu : Array,
 * disable : boolean,
 * onOpen : Function,
 * onClose : Function,
 * onSelect : Function,
 * }} props
 */
const MeatBallDropdown = props => {
	const onOpen = () => {
		props.onOpen();
	};

	const onClose = () => {
		props.onClose();
		Modal.close();
	};
	const onSelect = (v, i) => {
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};
	const dropdown = React.useRef();
	return (
		<Dropdown
			// buttonComponent={<ActionButton {...props} initState={false} noStateChange />}
			alignBottom
			ref={dropdown}
			horizontalOffset={320 * DP}
			buttonComponent={<MeatBallButton {...props} initState={false} />}
			dropdownList={
				<View>
					<TouchableWithoutFeedback>
						{/*부모의 터치 이벤트를 dropdownList로 오지 않도록 차단 더 세련된 방법을 찾아야함*/}
						<View style={[style.dropdownList, style.shadow]}>
							{props.menu.map((v, i) => (
								<TouchableWithoutFeedback onPress={() => onSelect(v, i)} key={i}>
									<View style={{width: 320 * DP, marginVertical: 15 * DP}}>
										<Text
											style={[
												txt.noto24b,
												{
													fontSize: props.titleFontStyle * DP,
													textAlign: 'center',
												},
											]}>
											{v}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							))}
						</View>
					</TouchableWithoutFeedback>
				</View>
			}
		/>
	);
};

MeatBallDropdown.defaultProps = {
	disable: false, // 버튼탭 사용불가 상태 boolean
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	btnStyle: 'border', // 버튼스타일 filled border noBorder
	onOpen: e => console.log('MeatBallDropdown onOpen Default'),
	onClose: e => console.log('MeatBallDropdown onClose Default'),
	onSelect: (v, i) => console.log(i + ':' + v),
	menu: [],
	horizontal: true,
};

const style = StyleSheet.create({
	dropdownList: {
		backgroundColor: WHITE,
		borderRadius: 40 * DP,
		borderTopRightRadius: 0,
		alignItems: 'center',
		paddingVertical: 25 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});
export default MeatBallDropdown;
