import React from 'react';
import {Platform, Keyboard, StatusBar} from 'react-native';
import DP, {isNotch} from 'Root/config/dp';

export function useKeyboardBottom(tabheight) {
	if (Platform.OS === 'android') return 0;
	const [KeyboardY, setKeyboardY] = React.useState(0);
	const KeyboardBorderLine = (() => {
		if (Platform.OS === 'ios') {
			return isNotch ? -34 : 0;
		} else if (Platform.OS === 'android') {
			return isNotch ? StatusBar.currentHeight : 0;
		}
	})();
	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			console.log('keyboarddidshow');
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			console.log('keyboarddidhide');
			setKeyboardY(0);
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			console.log('keyboardwillshow');
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			console.log('keyboardwillhide');
			setKeyboardY(0);
		});
		return () => {
			// Keyboard.removeAllListeners('keyboardDidShow');
			// Keyboard.removeAllListeners('keyboardDidHide');
			// Keyboard.removeAllListeners('keyboardWillShow');
			// Keyboard.removeAllListeners('keyboardWillHide');
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	});

	return KeyboardY;
}
