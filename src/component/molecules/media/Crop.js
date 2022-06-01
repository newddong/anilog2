import React from 'react';
import {Animated, PanResponder, View, Text,Platform, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import { Crop72 } from 'Root/component/atom/icon';

export default Crop = prop => {
	const WIDTH = prop.width||750*DP;
	const HEIGHT = prop.height||750*DP;
	const PADDINGVERTICAL = prop.paddingVertical||0;
	const PADDINGLHORIZONTAL = prop.paddingHorizontal||0;
    const CROPBOXWIDTH = prop.cropboxwidth||0;
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const imgLayout = React.useRef({width:WIDTH,height:HEIGHT}).current;
	const initDistance = React.useRef(0);
	const [cropUri, setCropUri] = React.useState();
	const [imgUri, setImgUri] = React.useState(prop.uri);
	const [imgDimension, setImgDimension] = React.useState({width:WIDTH,height:HEIGHT});
	const isPinch = React.useRef(false);
    const [isCropped, setIsCrop] = React.useState(false);
	
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: ({nativeEvent}) => {
				
				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					isPinch.current = true;
					initDistance.current = getDistance(pos1, pos2);
					return;
				}else{
					pan.setOffset({x: panPrev.x - nativeEvent.pageX, y: panPrev.y - nativeEvent.pageY});

				}
			},
			onPanResponderStart:({nativeEvent})=>{
				
				if (nativeEvent.touches.length > 1) {
					// console.log('pinchstart  x:'+nativeEvent.locationX+'  y:'+nativeEvent.locationY);
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					isPinch.current = true;
					initDistance.current = getDistance(pos1, pos2);
					return;
				}else{
					pan.setOffset({x: panPrev.x - nativeEvent.pageX, y: panPrev.y - nativeEvent.pageY});

				}
			},	
			onPanResponderMove: ({nativeEvent}) => {
               
				if (nativeEvent.touches.length > 1 &&initDistance.current!=0) {
					// console.log('pinchmove[0]  x:'+nativeEvent.touches[0].locationX+'  y:'+nativeEvent.touches[0].locationY);
					// console.log('pinchmove[1]  x:'+nativeEvent.touches[1].locationX+'  y:'+nativeEvent.touches[1].locationY);
					pan.setValue({x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY});
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
					return;
				}else{
					if(isPinch.current)return;
                    let w = imgLayout.width * (1-scalePrev.current)/2;
                    let h = imgLayout.height * (1-scalePrev.current)/2;
					// console.log('move  x:'+nativeEvent.locationX+'  y:'+nativeEvent.locationY,nativeEvent);
					pan.setValue({x: nativeEvent.pageX, y: nativeEvent.pageY});
				}
			},
			onPanResponderRelease: ({nativeEvent}) => {
				let w = 0;
				let h = 0;
				let stickToLeft = () => {
					// Animated.spring(
					// 	pan,{toValue:{x:PADDINGLHORIZONTAL-w-pan.x._offset,y:panPrev.y-pan.y._offset},speed:50,useNativeDriver:false}
					// ).start();
					pan.setValue({x:PADDINGLHORIZONTAL-w-pan.x._offset,y:panPrev.y-pan.y._offset});
					panPrev.x = PADDINGLHORIZONTAL-w;
					console.log('stickToLeft');
				};
				let stickToRight = () => {
					// Animated.spring(
					// 	pan,{toValue:{x:WIDTH-PADDINGLHORIZONTAL+w-imgLayout.width-pan.x._offset,y:panPrev.y-pan.y._offset},speed:50,useNativeDriver:false}
					// ).start();
					pan.setValue({x:WIDTH-PADDINGLHORIZONTAL+w-imgLayout.width-pan.x._offset,y:panPrev.y-pan.y._offset});
					panPrev.x = WIDTH-PADDINGLHORIZONTAL-imgLayout.width+w;
					console.log('stickToRight');
				};
				let stickToTop = () => {
					// Animated.spring(
					// 	pan,{toValue:{x:panPrev.x-pan.x._offset,y:PADDINGVERTICAL-h-pan.y._offset},speed:50,useNativeDriver:false}
					// ).start();
                    pan.setValue({x:panPrev.x-pan.x._offset,y:PADDINGVERTICAL-h-pan.y._offset});
					panPrev.y = PADDINGVERTICAL-h;
					console.log('stickToTop');
				};
				let stickToBottom = () => {
					// Animated.spring(
					// 	pan,{toValue:{x:panPrev.x-pan.x._offset,y:HEIGHT-PADDINGVERTICAL+h-imgLayout.height-pan.y._offset},speed:50,useNativeDriver:false}
					// ).start();
                    pan.setValue({x:panPrev.x-pan.x._offset,y:HEIGHT-PADDINGVERTICAL+h-imgLayout.height-pan.y._offset});
					panPrev.y = HEIGHT-PADDINGVERTICAL-imgLayout.height+h;
					console.log('stickToBottom');
				};


				console.log(nativeEvent);
				if (nativeEvent.changedTouches.length > 1 || initDistance.current !=0) {
					console.log('pinch end',pan);
					isPinch.current = false;
					w = imgLayout.width*scale._value;
					h = imgLayout.height*scale._value;
					if(w>h){
						if(h<HEIGHT-2*PADDINGVERTICAL){
							scalePrev.current = (HEIGHT-2*PADDINGVERTICAL)/imgLayout.height;
							scale.setValue(scalePrev.current);
						}
						else{
							scalePrev.current = scale._value;
						}
					}
					else{
						if(w<WIDTH-2*PADDINGLHORIZONTAL){
							scalePrev.current = (WIDTH-2*PADDINGLHORIZONTAL)/imgLayout.width;
							scale.setValue(scalePrev.current);
						}
						else{
							scalePrev.current = scale._value;
						}
					}

					w = imgLayout.width * (1-scalePrev.current)/2;
					h = imgLayout.height * (1-scalePrev.current)/2;

					if(panPrev.x+imgLayout.width<=WIDTH-PADDINGLHORIZONTAL+w){
						stickToRight();
					}
					else{
						if(panPrev.x>=PADDINGLHORIZONTAL-w){
							stickToLeft();
						}
					}
					if(panPrev.y+imgLayout.height<=HEIGHT-PADDINGVERTICAL+h){
						stickToBottom();
					}
					else{
						if(panPrev.y>=PADDINGVERTICAL-h){
							stickToTop();
						}
					}
					panPrev.x = pan.x._value + pan.x._offset;
					panPrev.y = pan.y._value + pan.y._offset;
					
					initDistance.current =0;
				}
				else{
					console.log('move end');
					panPrev.x = pan.x._value + pan.x._offset;
					panPrev.y = pan.y._value + pan.y._offset;
					
					w = imgLayout.width * (1-scalePrev.current)/2;
					h = imgLayout.height * (1-scalePrev.current)/2;
					
					if(panPrev.x+imgLayout.width<WIDTH-PADDINGLHORIZONTAL+w){
						stickToRight();
					}
					
					if(panPrev.x>PADDINGLHORIZONTAL-w){
						stickToLeft();
					}
					
					if(panPrev.y+imgLayout.height<HEIGHT-PADDINGVERTICAL+h){
						stickToBottom();
					}
					if(panPrev.y>PADDINGVERTICAL-h){
						stickToTop();
					}
					
				}
			},
			onPanResponderTerminate:()=>{
				console.log('terminate');
			}
		}),
	).current;

	React.useEffect(()=>{
		imgUri&&Image.getSize(imgUri,setInitDimension);


	},[imgUri])
	
    const setInitDimension = (w,h)=>{
        pan.setOffset({x:0,y:0});
        scale.setValue(1);
        if(w>h){
            let newWidth = (w/h)*WIDTH;
            let initPositionX = (WIDTH - newWidth)/2;
            panPrev.x = initPositionX;
            
            pan.setValue({x:initPositionX,y:0});
            imgLayout.width = newWidth;
            imgLayout.height = HEIGHT;
            setImgDimension({
                width: newWidth,
                height: HEIGHT
            });
        }
        if(h>=w){
            let newHeight = (h/w)*HEIGHT;
            let initPositionY = (HEIGHT-newHeight)/2;
            panPrev.y = initPositionY;
            pan.setValue({x:0,y:initPositionY});
            imgLayout.width = WIDTH;
            imgLayout.height = newHeight;
            setImgDimension({
                width: WIDTH,
                height: newHeight
            });
        }
        scalePrev.current = 1;
    }


    React.useEffect(()=>{
        setImgUri(prop.uri);
    },[prop.uri])


    const crop =() => {
		console.log('crop!')
        if(!isCropped){
            Image.getSize(imgUri,(originW,originH)=>{
                let wRatio = originW/(imgLayout.width*scalePrev.current);
                let hRatio = originH/(imgLayout.height*scalePrev.current);
                let desW =Math.round((WIDTH-2*PADDINGLHORIZONTAL)*wRatio);
                let desH = Math.round((HEIGHT-2*PADDINGVERTICAL)*hRatio);
                
                let offX = Math.abs(panPrev.x+imgLayout.width * (1-scalePrev.current)/2-PADDINGLHORIZONTAL)*wRatio;
                let offY = Math.abs(panPrev.y+imgLayout.height * (1-scalePrev.current)/2-PADDINGVERTICAL)*hRatio;
                console.log('crop!   offX:'+Math.round(offX)+'   offY:'+Math.round(offY)+'   desW:'+desW+'   desH:'+desH);
                CameraRoll.cropImage({
                    uri:imgUri,
                    destHeight:desH,
                    destWidth:desW,
                    offsetX:Math.floor(offX),
                    offsetY:Math.floor(offY),
                    imgWidth:originW,
                    imgHeight:originH
                })
                .then((r)=>{
                    console.log(r);
                    // setCropUri(r.uri);
                    setImgUri(r.uri);
                    setIsCrop(true);
                    setInitDimension(r.width,r.height);
                    prop.onCrop&&prop.onCrop(prop.uri,r.uri);
                });
            })
        }
        else{
            setImgUri(prop.uri);
            setIsCrop(false);
            prop.onCrop&&prop.onCrop(prop.uri,prop.uri);
        }
        
    }

	return (
        <View style={{width: WIDTH, height: HEIGHT, backgroundColor: '#fff'}}>
            <Animated.View style={{width: imgDimension.width, height: imgDimension.height,alignItems:'center',backgroundColor:'#fff',transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}]}} {...panResponder.panHandlers}>
                {imgUri&&<Img
                    style={{ width: imgDimension.width, height: imgDimension.height}}
                    source={{uri: imgUri}}
                    resizeMode={'stretch'}
                />}
            </Animated.View>
            <View style={{position:'absolute',top:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:WIDTH - 2*PADDINGLHORIZONTAL, height:CROPBOXWIDTH,backgroundColor:'black'}}/>
            <View style={{position:'absolute',top:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:CROPBOXWIDTH, height:HEIGHT - 2*PADDINGVERTICAL,backgroundColor:'black'}}/>
            <View style={{position:'absolute',bottom:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:WIDTH - 2*PADDINGLHORIZONTAL, height:CROPBOXWIDTH,backgroundColor:'black'}}/>
            <View style={{position:'absolute',top:PADDINGVERTICAL,right:PADDINGLHORIZONTAL,width:CROPBOXWIDTH, height:HEIGHT - 2*PADDINGVERTICAL,backgroundColor:'black'}}/>
            <TouchableWithoutFeedback onPress={crop}>
                <View style={{position:'absolute',bottom:30*DP,right:30*DP,width:100*DP,height:100*DP,justifyContent:'flex-end',alignItems:'flex-end'}}>
                    <Crop72 />
                </View>
            </TouchableWithoutFeedback>
        </View>
	);
};

function getDistance(pos1, pos2) {
	let dx = pos1.x - pos2.x;
	let dy = pos1.y - pos2.y;
	let square = dx ** 2 + dy ** 2;
	return Math.sqrt(square);
}

//안드로이드에서 FastImage를 사용하도록하는 커스텀 컴포넌트
const Img =React.forwardRef((props,ref) => {
	if(Platform.OS=='ios'){
		return <Image {...props} ref={ref}></Image>

	}
	if(Platform.OS=='android'){
		return <FastImage {...props} ref={ref}></FastImage>
	}
})