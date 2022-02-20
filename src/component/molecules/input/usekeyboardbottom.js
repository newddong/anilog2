import React from 'react';
import { Platform, Keyboard, StatusBar } from 'react-native';
import DP,{ isNotch } from 'Root/config/dp';

export function useKeyboardBottom(tabheight){
    const [KeyboardY, setKeyboardY] = React.useState(0);
    const KeyboardBorderLine = (()=>{
        if(Platform.OS === 'ios'){
            return isNotch ? -34 : 0;
        }else if(Platform.OS === 'android'){
            return isNotch ? StatusBar.currentHeight : 0;
        }
    })();
    React.useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',e=>{
            setKeyboardY(e.endCoordinates.height+KeyboardBorderLine-tabheight);
        });
        Keyboard.addListener('keyboardDidHide',e=>{
            setKeyboardY(0);
        });
        Keyboard.addListener('keyboardWillShow',e=>{
            setKeyboardY(e.endCoordinates.height+KeyboardBorderLine-tabheight);
        });
        Keyboard.addListener('keyboardWillHide',e=>{
            setKeyboardY(0);
        });
        return ()=>{
            // Keyboard.removeAllListeners('keyboardDidShow');
            // Keyboard.removeAllListeners('keyboardDidHide');
            // Keyboard.removeAllListeners('keyboardWillShow');
            // Keyboard.removeAllListeners('keyboardWillHide');
        }
    });

    return KeyboardY;
}
