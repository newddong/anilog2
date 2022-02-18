import React from "react";
import {View,TouchableWithoutFeedback, Keyboard} from 'react-native';
import Modal from "Component/modal/Modal";



const KeyBoardInputBackGround = props => {


    const close = ()=>{
        Modal.close();
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={close}>
        <View style={{flex:1}}>

        </View>
        </TouchableWithoutFeedback>
    );
}


export default KeyBoardInputBackGround;