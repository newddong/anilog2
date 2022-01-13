import React from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';

/**
 *
 * @param {{
 * buttonComponent : '',
 * dropdownList : '',
 * horizontalOffset : '',
 * }} props
 */
export default Dropdown = React.forwardRef((props,ref) => {
	React.useImperativeHandle(ref,()=>({
		button:buttonref
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
		console.log('onCloseOverride');
		Modal.close();
		props.buttonComponent.props.onClose();
	};

	const closeDropdown = () => {
		console.log('closeDropDown');
		Modal.close();
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

Dropdown.defaultProps = {
	dropdownList: <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'blue'}} />,
	buttonComponent: <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'white'}} />,
	alignBottom: false,
	horizontalOffset: 0,
};
