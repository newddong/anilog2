import React from 'react';
import {Platform, Keyboard, StatusBar} from 'react-native';
import DP, {isNotch} from 'Screens/dp';

export function useKeyboardBottom() {
	const [keyboardY, setKeyboardY] = React.useState(0);

	const KeybordBorderLine = (() => {
		if (Platform.OS === 'ios') {
			return isNotch ? -34 : 0;
		} else if (Platform.OS === 'android') {
			return isNotch ? StatusBar.currentHeight : 0;
		}
	})();
	React.useEffect(() => {
		const didShow = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardY(e.endCoordinates.height + KeybordBorderLine);
		});
		const didHide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardY(0);
		});
		const willShow = Keyboard.addListener('keyboardWillShow', e => {
			setKeyboardY(e.endCoordinates.height + KeybordBorderLine);
		});
		const willHide = Keyboard.addListener('keyboardWillHide', e => {
			setKeyboardY(0);
		});

		return () => {
			if (Keyboard) {
				didShow.remove();
				didHide.remove();
				willShow.remove();
				willHide.remove();
				// Keyboard.removeAllListeners('keyboardDidShow');
				// Keyboard.removeAllListeners('keyboardDidHide');
				// Keyboard.removeAllListeners('keyboardWillShow');
				// Keyboard.removeAllListeners('keyboardWillHide');
				// Keyboard.removeAllListeners();
			}
		};
	}, []);

	return Platform.OS === 'ios' ? keyboardY : 0;
}
