import React from 'react';
import {Animated,PanResponder, View, Text, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';


export default Crop = (prop) => {
    const pan = React.useRef(new Animated.ValueXY({x:0,y:0})).current;

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder:()=>true,
            onPanResponderGrant:({nativeEvent})=>{
                console.log('grant',nativeEvent)
            },
            onPanResponderMove:({nativeEvent})=>{
                console.log(nativeEvent);
                pan.setValue({x:nativeEvent.pageX,y:nativeEvent.pageY});
            },
            onPanResponderRelease: () => {

            }
        })
    ).current

    const panResponder1 = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder:()=>false
        })
    )

    React.useEffect(()=>{
        console.log(prop.route.params);
    })

	


    return <View>
        <Animated.View >
            <Animated.View style={{transform:pan.getTranslateTransform()}} {...panResponder.panHandlers}>
            <Image style={{width:750*DP,height:750*DP}} source={{uri:prop.route.params.cropImage[0]}} resizeMode={'center'}/>
            </Animated.View>
        </Animated.View>
        <Text>크롭 테스트</Text>
    </View>


}


function getDistance(pos1, pos2){
    let dx = pos1.x - pos2.x; 
    let dy = pos1.y - pos2.y;
    let square = dx**2 + dy**2
    return Math.sqrt(square);
}