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
	const CROPBOXWIDTH = prop.cropboxwidth || 0;
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const imgLayout = React.useRef({width: WIDTH, height: HEIGHT}).current;
	const initDistance = React.useRef(0);
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
			onPanResponderGrant: ({nativeEvent}) => {

				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					isPinch.current = true;
					initDistance.current = getDistance(pos1, pos2);
					pan.setOffset({
						x: panPrev.x - (nativeEvent.touches[0].pageX + nativeEvent.touches[1].pageX) / 2,
						y: panPrev.y - (nativeEvent.touches[0].pageY + nativeEvent.touches[1].pageY) / 2,
					});
				} else {
					pan.setOffset({x: panPrev.x - nativeEvent.pageX, y: panPrev.y - nativeEvent.pageY});
				}
                prop.onStartMove&&prop.onStartMove();
			},
			onPanResponderStart: ({nativeEvent}) => {
                
				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					isPinch.current = true;
					initDistance.current = getDistance(pos1, pos2);
					pan.setOffset({
						x: panPrev.x - (nativeEvent.touches[0].pageX + nativeEvent.touches[1].pageX) / 2,
						y: panPrev.y - (nativeEvent.touches[0].pageY + nativeEvent.touches[1].pageY) / 2,
					});
				} else {
					pan.setOffset({x: panPrev.x - nativeEvent.pageX, y: panPrev.y - nativeEvent.pageY});
				}
                prop.onStartMove&&prop.onStartMove();
			},
			onPanResponderMove: ({nativeEvent},state) => {
				if (nativeEvent.touches.length > 1 && initDistance.current != 0 && isPinch.current) {
					pan.setValue({
						x: (nativeEvent.touches[0].pageX + nativeEvent.touches[1].pageX) / 2,
						y: (nativeEvent.touches[0].pageY + nativeEvent.touches[1].pageY) / 2,
					});
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
				} else {
					let w = (imgLayout.width * (1 - scale._value)) / 2;
					let h = (imgLayout.height * (1 - scale._value)) / 2;
                    let x = nativeEvent.pageX;
                    let y = nativeEvent.pageY;
                    console.log('dimension', w, h, pan.x._value+pan.x._offset , y)
                    if(pan.x._value + pan.x._offset + w>= PADDINGLHORIZONTAL){
                        x = 0 - w - pan.x._offset;
                        y = nativeEvent.pageY;
                        console.log('left move end')
                    }



                    if(pan.x._value + pan.x._offset + imgLayout.width - w <= WIDTH - PADDINGLHORIZONTAL){
                        x = WIDTH - PADDINGLHORIZONTAL - imgLayout.width - w - pan.x._offset;
                        y=nativeEvent.pageY
                        console.log('right move end')
                    }
					// else if (pan.x._value + pan.x._offset + imgLayout.width > WIDTH - PADDINGLHORIZONTAL + w) {
						// pan.setValue({x: PADDINGLHORIZONTAL-w-pan.x._offset, y: nativeEvent.pageY});
						// pan.setValue({x: WIDTH-PADDINGLHORIZONTAL+w-imgLayout.width-pan.x._offset, y: nativeEvent.pageY});
						// return;
					// }

					// else if (panPrev.x < PADDINGLHORIZONTAL - w) {
						// pan.setValue({x: WIDTH-PADDINGLHORIZONTAL+w-imgLayout.width-pan.x._offset, y: nativeEvent.pageY});
						// pan.setValue({x: PADDINGLHORIZONTAL-w-pan.x._offset, y: nativeEvent.pageY});
						// return;
					// }
                    // else{
                    //     x=nativeEvent.pageX;
                    //     y=nativeEvent.pageY;
                    //     console.log('left move not end')
                    // }
					// if(panPrev.y+imgLayout.height<=HEIGHT-PADDINGVERTICAL+h){
					// 	return;
					// }
					// else{
					// 	if(panPrev.y>=PADDINGVERTICAL-h){
					// 		return;
					// 	}
					// }
					// let w = imgLayout.width * (1-scalePrev.current)/2;
					// let h = imgLayout.height * (1-scalePrev.current)/2;
                    pan.setValue({x:x,y:y});
				}
			},
			onPanResponderRelease: ({nativeEvent}) => {
				let w = 0;
				let h = 0;
				let stickToLeft = (dx) => {
					pan.setValue({x: PADDINGLHORIZONTAL - dx - pan.x._offset, y: panPrev.y - pan.y._offset});
					panPrev.x = PADDINGLHORIZONTAL - dx;
					console.log('stickToLeft');
				};
				let stickToRight = (dx) => {
					pan.setValue({x: WIDTH - PADDINGLHORIZONTAL + dx - imgLayout.width - pan.x._offset, y: panPrev.y - pan.y._offset});
					panPrev.x = WIDTH - PADDINGLHORIZONTAL - imgLayout.width + dx;
					console.log('stickToRight');
				};

                let horizontalCenter = () => {
                    pan.setValue({x: PADDINGLHORIZONTAL + (WIDTH - imgLayout.width * scalePrev.current) / 2 - pan.x._offset, y: panPrev.y - pan.y._offset});
					panPrev.x = PADDINGLHORIZONTAL + (WIDTH - imgLayout.width * scalePrev.current) / 2
					console.log('horizontalCenter', panPrev.x, imgLayout.width, scalePrev.current);
                }

				let stickToTop = (dy) => {
					pan.setValue({x: panPrev.x - pan.x._offset, y: PADDINGVERTICAL - dy - pan.y._offset});
					panPrev.y = PADDINGVERTICAL - dy;
					console.log('stickToTop');
				};
				let stickToBottom = (dy) => {
					pan.setValue({x: panPrev.x - pan.x._offset, y: HEIGHT - PADDINGVERTICAL + dy - imgLayout.height - pan.y._offset});
					panPrev.y = HEIGHT - PADDINGVERTICAL - imgLayout.height + dy;
					console.log('stickToBottom');
				};

                let verticalCenter = () => {
                    pan.setValue({x: panPrev.x - pan.x._offset, y: PADDINGVERTICAL + (HEIGHT - imgLayout.height * scalePrev.current) /2  - pan.y._offset});
					panPrev.y = PADDINGVERTICAL + (HEIGHT - imgLayout.height * scalePrev.current) /2;
					console.log('stickToTop');
                }

				if (nativeEvent.changedTouches.length > 1 || initDistance.current != 0) {
					console.log('pinch end', pan);
					isPinch.current = false;
					w = imgLayout.width * scale._value;
					h = imgLayout.height * scale._value;
					if (w > h) {
						if (h < HEIGHT - 2 * PADDINGVERTICAL) {
							scalePrev.current = (HEIGHT - 2 * PADDINGVERTICAL) / imgLayout.height;
							scale.setValue(scalePrev.current);
						} else {
							scalePrev.current = scale._value;
						}
					} else {
						if (w < WIDTH - 2 * PADDINGLHORIZONTAL) {
							scalePrev.current = (WIDTH - 2 * PADDINGLHORIZONTAL) / imgLayout.width;
							scale.setValue(scalePrev.current);
						} else {
							scalePrev.current = scale._value;
						}
					}

					w = (imgLayout.width * (1 - scalePrev.current)) / 2;
					h = (imgLayout.height * (1 - scalePrev.current)) / 2;

					if (panPrev.x + imgLayout.width <= WIDTH - PADDINGLHORIZONTAL + w) {
						stickToRight(w);
					} else {
						if (panPrev.x >= PADDINGLHORIZONTAL - w) {
							stickToLeft(w);
						}
					}
					if (panPrev.y + imgLayout.height <= HEIGHT - PADDINGVERTICAL + h) {
						stickToBottom(h);
					} else {
						if (panPrev.y >= PADDINGVERTICAL - h) {
							stickToTop(h);
						}
					}
					panPrev.x = pan.x._value + pan.x._offset;
					panPrev.y = pan.y._value + pan.y._offset;
					initDistance.current = 0;
				} else {
					console.log('move end');
					panPrev.x = pan.x._value + pan.x._offset;
					panPrev.y = pan.y._value + pan.y._offset;

					w = (imgLayout.width * (1 - scalePrev.current)) / 2; //왼쪽 오른쪽 여백
					h = (imgLayout.height * (1 - scalePrev.current)) / 2; //위 아래 여백
                    
                    if(imgLayout.width * scalePrev.current < WIDTH - PADDINGLHORIZONTAL){
                        horizontalCenter();
                    }
					// else if (panPrev.x + imgLayout.width < WIDTH - PADDINGLHORIZONTAL + w) {
					// 	stickToRight(w);
					// }
					// else if (panPrev.x > PADDINGLHORIZONTAL - w) {
					// 	stickToLeft(w);
					// }

                    if(imgLayout.height * scalePrev.current < HEIGHT - PADDINGVERTICAL){
                        verticalCenter();
                    }
					else if (panPrev.y + imgLayout.height < HEIGHT - PADDINGVERTICAL + h) {
						stickToBottom(h);
					}
					else if (panPrev.y > PADDINGVERTICAL - h) {
						stickToTop(h);
					}
				}
                prop.onEndMove&&prop.onEndMove();
			},
			onPanResponderTerminate: () => {
				console.log('terminate');
			},
		}),
	).current;

	React.useEffect(() => {
			Image.getSize(photo.uri, setInitDimension);
	}, [photo]);

	const setInitDimension = (w, h) => {
		if (!mounted) return;
		pan.setOffset({x: 0, y: 0});
		scale.setValue(1);
		let newImgWidth = 0;
		let newImgHeight = 0;
		let initPositionX = 0;
		let initPositionY = 0;

		if (w > h) {
			newImgWidth = WIDTH;
			newImgHeight = (WIDTH * h) / w;
			initPositionY = (HEIGHT - newImgHeight) / 2;
			if (newImgHeight >= HEIGHT) {
				newImgHeight = HEIGHT;
				newImgWidth = (HEIGHT * w) / h;
				initPositionX = (WIDTH - newImgWidth) / 2;
				initPositionY = 0;
			}
		}

		if (h > w) {
			newImgWidth = (HEIGHT * w) / h;
			newImgHeight = HEIGHT;
			initPositionX = (WIDTH - newImgWidth) / 2;
			if (newImgWidth >= WIDTH) {
				newImgHeight = (WIDTH * h) / w;
				newImgWidth = WIDTH;
				initPositionY = (HEIGHT - newImgHeight) / 2;
				initPositionX = 0;
			}
		}

		if (h == w) {
			newImgWidth = WIDTH;
			newImgHeight = WIDTH;
			initPositionY = (HEIGHT - newImgHeight) / 2;
			if (newImgHeight >= HEIGHT) {
				newImgHeight = HEIGHT;
				newImgWidth = HEIGHT;
				initPositionX = (WIDTH - newImgWidth) / 2;
				initPositionY = 0;
			}
		}
		imgLayout.width = newImgWidth;
		imgLayout.height = newImgHeight;
		panPrev.x = initPositionX;
		panPrev.y = initPositionY;
		pan.setValue(panPrev);
		mounted &&
			setImgDimension({
				width: newImgWidth,
				height: newImgHeight,
			});
		scalePrev.current = 1;
	};

	// React.useEffect(() => {
	// 	console.log('photo', prop.photo);
	// 	setPhoto({...prop.photo});
	// }, [prop.photo]);

	const returnOriginal = () => {
		let p = {...photo};
		delete p.cropUri;
		setPhoto(p);
		setResizeMode('stretch');
		setImgDimension({width: WIDTH, height: HEIGHT});
		panPrev.x = 0;
		panPrev.y = 0;
		scalePrev.current = 1;
		imgLayout.width = WIDTH;
		imgLayout.height = HEIGHT;
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

export default ExpansionView;
