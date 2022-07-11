import React from 'react';
import {
	Animated,
	PanResponder,
	View,
	Text,
	Platform,
	Button,
	ScrollView,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	PixelRatio,
} from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import {Crop72} from 'Root/component/atom/icon';

const ExpansionView = prop => {
	const WIDTH = prop.width || 750 * DP;
	const HEIGHT = prop.height || 750 * DP;
	const PADDINGVERTICAL = prop.paddingVertical || 0;
	const PADDINGLHORIZONTAL = prop.paddingHorizontal || 0;
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const imgLayout = React.useRef({width: WIDTH, height: HEIGHT}).current;
	const initDistance = React.useRef(0);
    const initCenter = React.useRef({x:0,y:0}).current;
	const [cropUri, setCropUri] = React.useState();
	// const [imgUri, setImgUri] = React.useState(prop.uri);
	const [photo, setPhoto] = React.useState(prop.photo);
	const [imgDimension, setImgDimension] = React.useState({width: WIDTH, height: HEIGHT});
	const isPinch = React.useRef(false);
	const [resizeMode, setResizeMode] = React.useState('stretch');

	let mounted = true;
	React.useEffect(() => {
		return () => {
			mounted = false;
		};
	}, []);

	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: ({nativeEvent},state) => {
                if(nativeEvent.touches.length>1){
                    isPinch.current = true;
                    let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
                    initDistance.current = getDistance(pos1, pos2);
                    let center = getCenter(pos1, pos2);
                    initCenter.x = center.x;
                    initCenter.y = center.y;
                    pan.setOffset({x: panPrev.x, y: panPrev.y});
                }else{
                    isPinch.current = false;
                    pan.setValue({x:panPrev.x,y:panPrev.y})
                }
                console.log('grant')
                prop.onStartMove&&prop.onStartMove();
			},
			onPanResponderStart: ({nativeEvent},state) => {
				if(nativeEvent.identifier>1){
                    isPinch.current = true;
                }else{
                    isPinch.current = false;
                }
                console.log('start')
                prop.onStartMove&&prop.onStartMove();
			},
			onPanResponderMove: ({nativeEvent},state) => {
				if(isPinch.current&&nativeEvent.touches.length>1){
                    let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
                    let center = getCenter(pos1, pos2);
                    scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
                    pan.setValue({x:panPrev.x+center.x-initCenter.x, y:panPrev.y+center.y-initCenter.y})
                }else{
                    pan.setValue({x:state.dx+panPrev.x, y: state.dy+panPrev.y})
                }
                console.log(nativeEvent, state)  
			},
			onPanResponderRelease: ({nativeEvent},state) => {
				if(isPinch.current){
                    isPinch.current = false;
                    scalePrev.current = scale._value;
                }else{
                    panPrev.x = pan.x._value;
                    panPrev.y = pan.y._value;
                }
                
                prop.onEndMove&&prop.onEndMove();
			},
			onPanResponderTerminate: () => {
				console.log('terminate');
			},
		}),
	).current;

	React.useEffect(() => {
			// Image.getSize(photo.uri, setInitDimension);
	}, [photo]);


	const returnOriginal = () => {
	
		prop.onCrop && prop.onCrop(photo.uri, photo.uri);
	};
	return (
		<View style={{width: WIDTH, height: HEIGHT}}>
			<Animated.View
				style={{
					width: imgDimension.width,
					height: imgDimension.height,
					alignItems: 'center',
					backgroundColor: prop.backgroundColor,
					transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}],
				}}
				{...panResponder.panHandlers}>
				<Image style={{width: imgDimension.width, height: imgDimension.height}} source={{uri: photo.cropUri ?? photo.uri}} resizeMode={resizeMode} />
			</Animated.View>
			{
				<TouchableWithoutFeedback onPress={returnOriginal}>
					<View
						style={{
							position: 'absolute',
							bottom: 30 * DP,
							right: 30 * DP,
							width: 150 * DP,
							height: 150 * DP,
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
						}}>
						<Crop72 />
					</View>
				</TouchableWithoutFeedback>
			}
		</View>
	);
};

ExpansionView.defaultProps = {
	isCrop: true,
	backgroundColor: '#fff',
};

function getDistance(pos1, pos2) {
	let dx = pos1.x - pos2.x;
	let dy = pos1.y - pos2.y;
	let square = dx ** 2 + dy ** 2;
	return Math.sqrt(square);
}

function getCenter(pos1, pos2) {
    let x = pos1.x + pos2.x;
    let y = pos1.y + pos2.y;
    return ({x:x/2,y:y/2})
}

export default ExpansionView;
