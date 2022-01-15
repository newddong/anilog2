import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import DP from 'Root/config/dp';
// import { RNCamera } from 'react-native-camera';

export default Camera = () => {
    const camera = React.useRef();
    const takePicture = async () => {
        if (camera.current) {
            const options = { quality: 1, base64: false, writeExif: true };
            const data = await camera.current.takePictureAsync(options);
            CameraRoll.save(data.uri);
            console.log(data);
        }
    };

    return (
        <View style={style.wrp_main}>
            <View style={style.view_camera}>
                {/* <RNCamera
                    ref={(ref) => { camera.current = ref }}
                    style={style.view_camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}

                >



                </RNCamera> */}
            </View>

            <TouchableWithoutFeedback onPress={takePicture}>
                <View style={style.btn_camera}>
                    <Text>카메라</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};


const style = StyleSheet.create({
    wrp_main: {
        flex: 1,
        // backgroundColor: 'red',
    },
    view_camera: {
        flex: 0.7,
    },
    btn_camera: {
        top: 20 * DP,
        height: 200 * DP,
        backgroundColor: 'yellow'
    }
})
Camera.defaultProps = {

}