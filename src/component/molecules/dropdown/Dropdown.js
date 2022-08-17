import React from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';

/**
 * 인풋 크기 24
 * @type {React.ForwardRefRenderFunction<?,DropDownProps>}
 *
 */
const Dropdown = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		button: buttonref,
	}));

	const container = React.useRef();
	const isClick = React.useRef(false);

	const onPressOverride = () => {
		console.log('onPressOverride');
		click();
		props.buttonComponent.props.onPress();
		isClick.current = !isClick.current;
	};

	const onOpenOverride = () => {
		console.log('onOpenOverride');
		click();
		props.buttonComponent.props.onOpen();
	};
	const onCloseOverride = () => {
		if (props.animated) {
			setTimeout(() => {
				console.log('onCloseOverride / Animated');
				Modal.close();
				props.buttonComponent.props.onClose();
			}, 450);
		} else {
			console.log('onCloseOverride / NoneAnimated');
			Modal.close();
			props.buttonComponent.props.onClose();
		}
	};

	const closeDropdown = () => {
		console.log('closeDropDown');
		// Modal.close(); 시간차 애니메이션 효과를 주기 위한 주석처리
		buttonref.current && buttonref.current.press();
		props.buttonComponent.props.onClose();
	};

	const positionY = (py, height) => {
		if (props.alignBottom) {
			return py + height;
		} else {
			return py;
		}
	};

	const positionX = (px, width) => {
		if (props.horizontalOffset) {
			return px - props.horizontalOffset + width;
		} else {
			return px;
		}
	};

	const click = () => {
		!isClick.current &&
			container.current.measure((fx, fy, width, height, px, py) => {
				const dropdownList = React.cloneElement(props.dropdownList, {
					style: [
						{position: 'absolute', top: positionY(py, height), left: positionX(px, width), paddingBottom: 15 * DP},
						props.dropdownList.props.style,
						// {height: animatedHeight},
					],
				});
				Modal.popDrop(
					<TouchableWithoutFeedback onPress={closeDropdown}>
						<View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#fff0'}}>{dropdownList}</View>
					</TouchableWithoutFeedback>,
				);
			});
		isClick.current && Modal.close();
	};
	const buttonref = React.useRef();

	const button = React.cloneElement(props.buttonComponent, {
		...props.buttonComponent.props,
		onPress: onPressOverride,
		onClose: onCloseOverride,
		onOpen: onOpenOverride,
		ref: buttonref,
	});
	return (
		<View ref={container} onLayout={e => {}}>
			{button}
		</View>
	);
});

const DropdownProps = {
	/** @type {object} 입력창 제목(상단) */
	buttonComponent: object,
	/** @type {object} */
	dropdownList: object,
	/** @type {number} 수평 길이 */
	horizontalOffset: number,
	/** @type {boolean} 수평 정렬 여부 */
	alignBottom: Boolean,
};

Dropdown.propTypes = DropdownProps;
Dropdown.defaultProps = {
	dropdownList: <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'blue'}} />,
	buttonComponent: <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'white'}} />,
	alignBottom: false,
	horizontalOffset: 0,
};
export default Dropdown;
