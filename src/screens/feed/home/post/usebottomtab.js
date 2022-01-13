import React from 'react';
import {Platform,Keyboard, StatusBar} from 'react-native';
import DP, {isNotch} from 'Screens/dp';

export function useBottomTab(props) {
   
   useEffect(() => {
		const unsubscribe = props.navigation.addListener('blur', e => {
			props.tabVisible(true);
		});
		return unsubscribe;
	}, [props.navigation]);
   
}