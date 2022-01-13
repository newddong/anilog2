import React from 'react';
<<<<<<< HEAD:src/component/molecules/MeatBallDropdown.js
import {View, TouchableWithoutFeedback, Text, StyleSheet, Animated, Easing} from 'react-native';
import Dropdown from 'Molecules/Dropdown';
import {WHITE} from 'Root/config/color';
=======
import {View, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import Dropdown from 'Molecules/dropdown/Dropdown';
import {btn_w280, btn_w226} from 'Atom/btn/btn_style';
import {APRI10, APRI20, WHITE} from 'Root/config/color';
>>>>>>> d635673fc899603860bb55ede7a5818ebcc9d5fc:src/component/molecules/dropdown/MeatBallDropdown.js
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import MeatBallButton from 'Molecules/button/MeatBallButton';

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
	const animatedHeight = React.useRef(new Animated.Value(0)).current;
	const [expanded, setExpanded] = React.useState(false);

	const closeAnimation = () => {
		console.log('CloseAnimation called');
		Animated.timing(animatedHeight, {
			toValue: 0,
			duration: 450,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setExpanded(false);
	};

	const onOpen = () => {
		Animated.timing(animatedHeight, {
			duration: 500,
			toValue: 252 * DP,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setExpanded(true);
		// props.onOpen();
	};

	const onClose = () => {
		// props.onClose();
		closeAnimation();
		// Modal.close();
	};
	const onSelect = (v, i) => {
		closeAnimation();
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};
	const dropdown = React.useRef();

	const interpolatedHeight = animatedHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 150],
	});

	return (
		<Dropdown
			alignBottom
			ref={dropdown}
			animated={true}
			horizontalOffset={320 * DP}
			buttonComponent={<MeatBallButton {...props} initState={expanded} onOpen={onOpen} onClose={onClose} noStateChange />}
			dropdownList={
				<Animated.ScrollView
					style={{
						height: interpolatedHeight,
					}}>
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
				</Animated.ScrollView>
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
