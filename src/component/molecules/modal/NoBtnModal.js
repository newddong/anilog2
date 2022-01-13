import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet,Platform,Dimensions } from 'react-native';
import { WHITE, GRAY10 } from 'Root/config/color';
import { txt } from 'Root/config/textstyle';
import DP from 'Root/config/dp';


/**
 * 버튼이 없는 모달
 * 
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 * 
 * @param {Object} props - props object 
 * @param {string} props.popUpMsg - 팝업 메시지
 * 
 */
const NoBtnModal = props => {


    return (
        <View style={style.background}>
            <View style={[style.popUpWindow, style.shadow]}>
                <Text style={[txt.noto28, style.msg]}>{props.popUpMsg}</Text>
            </View>
        </View>
    );
}

NoBtnModal.defaultProps = {
    popUpMsg: 'popUp',
}

const style = StyleSheet.create({
    background: {
        backgroundColor: '#0009',
        height:Platform.OS=='ios'?Dimensions.get('window').height:'100%',
        width:Platform.OS=='ios'?Dimensions.get('window').width:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUpWindow: {
        width: 614 * DP,
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 * DP,
        minHeight: 170 * DP,
    },
    msg: {
        // marginBottom: 30 * DP,
        // marginTop: 30 * DP,
        maxWidth: 466 * DP, // 상우 추가
        padding: 40 * DP, // 상우 추가
        textAlignVertical: 'center',
        color: GRAY10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    }
});

export default NoBtnModal;