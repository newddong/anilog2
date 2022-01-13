import React, {useRef} from 'react';

import {AppRegistry, StyleSheet, Text, View, TextInput, PanResponder} from 'react-native';

import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedStyle,
	useAnimatedProps,
	withTiming,
	withSpring,
} from 'react-native-reanimated';

export default Test = () => {
    const startingPosition = 100;
    const x = useSharedValue(startingPosition);
    const y = useSharedValue(startingPosition); 
    const ani = useAnimatedStyle(() => {
		return {
			transform: [{translateX:x.value},{translateY:y.value}]
		};
	});

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => {
				console.log('onStartShouldSetPanResponder');
				return true;
			},
			onStartShouldSetPanResponderCapture: (evt, gestureState) => {
				console.log('onStartShouldSetPanResponderCapture');
				return true;
			},
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				console.log('onMoveShouldSetPanResponder');
				return true;
			},
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
				console.log('onMoveShouldSetPanResponderCapture');
				return true;
			},
			onPanResponderGrant: (evt, gestureState) => {
				console.log('onPanResponderGrant');
                x.value = gestureState.x0;
                y.value = gestureState.y0;
			},
			onPanResponderMove: (evt, gestureState) => {
				console.log('onPanResponderMove'+ `${gestureState.numberActiveTouches}` );
                x.value =  gestureState.x0+gestureState.dx;
                y.value = gestureState.y0+gestureState.dy;
			},
			onPanResponderTerminationRequest: (evt, gestureState) => {
				console.log('onPanResponderTerminationRequest');
				return true;
			},
			onPanResponderRelease: (evt, gestureState) => {
				console.log('onPanResponderRelease');
			},
			onPanResponderTerminate: (evt, gestureState) => {
				console.log('onPanResponderTerminate');
			},
			onShouldBlockNativeResponder: (evt, gestureState) => {
				console.log('onShouldBlockNativeResponder');
				return true;
			},
		}),
	).current;

	return <View style={{flex: 1, backgroundColor: 'yellow',zIndex:1} }>
        <View style={{height:400,width:300,backgroundColor:'gray',position:'absolute',zIndex:80}}>
            <Animated.View style={[{height:30,width:30,backgroundColor:'green',position:'absolute',zIndex:100},ani]} {...panResponder.panHandlers}></Animated.View>
        </View>
        



    </View>;
};
