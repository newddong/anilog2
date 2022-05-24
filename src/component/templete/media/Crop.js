import React from 'react';
import {Animated, PanResponder, View, Text, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';

export default Crop = prop => {
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panStart = React.useRef({x: 0, y: 0}).current;
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const initDistance = React.useRef(1);
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: ({nativeEvent}) => {
				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					initDistance.current = getDistance(pos1, pos2);
					return;
				}
				pan.setOffset({x: panPrev.x - nativeEvent.pageX, y: panPrev.y - nativeEvent.pageY});
			},
			onPanResponderMove: ({nativeEvent}) => {
				// console.log(nativeEvent);
				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
					return;
				}
				pan.setValue({x: nativeEvent.pageX, y: nativeEvent.pageY});
			},
			onPanResponderRelease: ({nativeEvent}) => {
				if (nativeEvent.changedTouches.length > 1) {
					scalePrev.current = scale._value;
					return;
				}
				panPrev.x = pan.x._value + pan.x._offset;
				panPrev.y = pan.y._value + pan.y._offset;
				// console.log(pan);
			},
		}),
	).current;

	const panResponder1 = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => false,
		}),
	);

	React.useEffect(() => {
		// console.log(prop.route.params);
	});
    const bluerect = React.useRef();
    const image = React.useRef();
	const test1 = () => {
		image.current.measure((x,y,width,height,px,py)=>{console.log('x:'+x+'  y:'+y+'  w:'+width+'  h:'+height+'  px:'+px+'  py:'+py)})
	};

    const test2 =() => {

    }

    const test3 =() => {
        
    }
    const test4 =() => {
        
    }
	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<View style={{width: 750 * DP, flexBasis: 750 * DP, backgroundColor: 'green'}}>
            <View style={{position:'absolute',top:75*DP,left:75*DP,width:600*DP, height:600*DP,backgroundColor:'blue'}} ref={bluerect}/>
				<Animated.View style={{transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}]}} {...panResponder.panHandlers} ref={image}>
					<Image
						style={{backgroundColor: 'yellow', width: 750 * DP, height: 750 * DP}}
						source={{uri: prop.route.params.cropImage[0]}}
						resizeMode={'center'}
					/>
				</Animated.View>
                <View style={{position:'absolute',top:75*DP,left:75*DP,width:600*DP, height:4*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',top:75*DP,left:75*DP,width:4*DP, height:600*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',bottom:75*DP,left:75*DP,width:600*DP, height:4*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',top:75*DP,right:75*DP,width:4*DP, height:600*DP,backgroundColor:'red'}}/>
			</View>
			<View style={{backgroundColor: '#fff', width: 750 * DP, flex: 1}}>
				<View style={{flexDirection: 'row'}}>
					<TouchableWithoutFeedback onPress={test1}>
						<View style={{width: 150, height: 30, marginVertical: 10, marginHorizontal: 10, backgroundColor: 'yellow'}}>
							<Text>크롭 테스트</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={test2}>
						<View style={{width: 150, height: 30, marginVertical: 10, backgroundColor: 'yellow'}}>
							<Text>크롭 테스트</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={{flexDirection: 'row'}}>
					<TouchableWithoutFeedback onPress={test3}>
						<View style={{width: 150, height: 30, marginVertical: 10, marginHorizontal: 10, backgroundColor: 'yellow'}}>
							<Text>크롭 테스트</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={test4}>
						<View style={{width: 150, height: 30, marginVertical: 10, backgroundColor: 'yellow'}}>
							<Text>크롭 테스트</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

function getDistance(pos1, pos2) {
	let dx = pos1.x - pos2.x;
	let dy = pos1.y - pos2.y;
	let square = dx ** 2 + dy ** 2;
	return Math.sqrt(square);
}
