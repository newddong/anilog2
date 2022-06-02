import React from 'react';
import {Animated, PanResponder, View, Text,Platform, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import { getFavoriteFeedListByUserId } from 'Root/api/feedapi';

export default Crop = prop => {
	const WIDTH = prop.width||750*DP;
	const HEIGHT = prop.height||750*DP;
	const PADDINGVERTICAL = prop.paddingVertical||75*DP;
	const PADDINGLHORIZONTAL = prop.paddingHorizontal||75*DP;
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const imgLayout = React.useRef({width:WIDTH,height:HEIGHT}).current;
	const initDistance = React.useRef(0);
	const [cropUri, setCropUri] = React.useState();
	const [imgUri, setImgUri] = React.useState();
	const [imgDimension, setImgDimension] = React.useState({width:WIDTH,height:HEIGHT});
	const isPinch = React.useRef(false);
	
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
					console.log('pinchstart  x:'+nativeEvent.locationX+'  y:'+nativeEvent.locationY);
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
					console.log('pinchmove[0]  x:'+nativeEvent.touches[0].locationX+'  y:'+nativeEvent.touches[0].locationY);
					console.log('pinchmove[1]  x:'+nativeEvent.touches[1].locationX+'  y:'+nativeEvent.touches[1].locationY);
					pan.setValue({x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY});
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
					return;
				}else{
					if(isPinch.current)return;
					console.log('move  x:'+nativeEvent.locationX+'  y:'+nativeEvent.locationY,nativeEvent);
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
		imgUri&&Image.getSize(imgUri,(w,h)=>{
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
		});


	},[imgUri])


	React.useEffect(() => {
		setImgUri(prop.route.params.cropImage);
	},[prop.route.params]);
    
	
	
	const bluerect = React.useRef();
    const image = React.useRef();
	const test1 = () => {
		image.current.measure((x,y,width,height,px,py)=>{
			console.log('x:'+x+'  y:'+y+'  w:'+width+'  h:'+height+'  px:'+px+'  py:'+py);
			console.log('w: '+imgLayout.width*scalePrev.current + '  h: '+ imgLayout.height*scalePrev.current);
		}
		);
	};

    const test2 =() => {
		Image.getSize(imgUri,(w,h)=>console.log(w+' : '+h))
    }

    const test3 =() => {
		console.log('crop!')
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
				setCropUri(r.uri);
			});
		})

        
    }


    const test4 =() => {
		console.log('scale',scalePrev.current);
		console.log('move: ',panPrev);
		console.log('ani',pan);
		let dim = {height:imgLayout.height*scalePrev.current,width:imgLayout.width*scalePrev.current};
		console.log('dimension',dim);
		console.log('setvalue',imgDimension);
    }

	const test5 =() => {
		CameraRoll.getAlbums({
			assetType:'Photos',
			albumType:'SmartAlbum'
		}).then(r=>console.log(r));
    }

	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<View style={{width: WIDTH, flexBasis: HEIGHT, backgroundColor: '#fff'}}>
            <View style={{position:'absolute',top:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:WIDTH - 2*PADDINGLHORIZONTAL, height:HEIGHT - 2*PADDINGVERTICAL,backgroundColor:'#fff'}} ref={bluerect}/>
				<Animated.View style={{width: imgDimension.width, height: imgDimension.height,alignItems:'center',backgroundColor:'#fff',transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}]}} {...panResponder.panHandlers}>
					{imgUri&&<Img
						style={{ width: imgDimension.width, height: imgDimension.height}}
						source={{uri: imgUri}}
						resizeMode={'stretch'}
						ref={image}
					/>}
				</Animated.View>
				<View style={{backgroundColor:'#fff',width:WIDTH,height:WIDTH}}>
					<View style={{backgroundColor:'#fff',marginTop:PADDINGVERTICAL,width:WIDTH - 2*PADDINGLHORIZONTAL,marginLeft:PADDINGLHORIZONTAL,height:HEIGHT - 2*PADDINGVERTICAL
				,transform:[{scale:1}]
				}}>
					</View>
				</View>
                <View style={{position:'absolute',top:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:WIDTH - 2*PADDINGLHORIZONTAL, height:4*DP,backgroundColor:'black'}}/>
                <View style={{position:'absolute',top:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:4*DP, height:HEIGHT - 2*PADDINGVERTICAL,backgroundColor:'black'}}/>
                <View style={{position:'absolute',bottom:PADDINGVERTICAL,left:PADDINGLHORIZONTAL,width:WIDTH - 2*PADDINGLHORIZONTAL, height:4*DP,backgroundColor:'black'}}/>
                <View style={{position:'absolute',top:PADDINGVERTICAL,right:PADDINGLHORIZONTAL,width:4*DP, height:HEIGHT - 2*PADDINGVERTICAL,backgroundColor:'black'}}/>
			</View>
			{true?<View style={{backgroundColor: '#fff', width: 750 * DP, flex: 1}}>
				<View style={{flexDirection: 'row'}}>
					<TouchableWithoutFeedback onPress={test1}>
						<View style={{width: 150, height: 30, marginVertical: 10, marginHorizontal: 10, backgroundColor: 'yellow'}}>
							<Text>이미지 위치 표시</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={test2}>
						<View style={{width: 150, height: 30, marginVertical: 10, backgroundColor: 'yellow'}}>
							<Text>이미지 사이즈 픽셀단위</Text>
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
							<Text>이동 결과</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={{flexDirection: 'row'}}>
					<TouchableWithoutFeedback onPress={test5}>
						<View style={{width: 150, height: 30, marginVertical: 10, marginHorizontal: 10, backgroundColor: 'yellow'}}>
							<Text>앨범 목록 불러오기</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={test4}>
						<View style={{width: 150, height: 30, marginVertical: 10, backgroundColor: 'yellow'}}>
							<Text>이동 결과</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{<Img source={{uri:cropUri||imgUri}} style={{marginLeft:10,marginTop:10,backgroundColor:'red',width:150,height:150}} resizeMode={'contain'}/>}
			</View>:
			<View style={{backgroundColor: '#fff', width: 750 * DP, flex: 1,justifyContent:'center',alignItems:'center'}}>
			<View style={{flexDirection: 'row'}}>
					<TouchableWithoutFeedback onPress={test3}>
						<View style={{width: 250, height: 50, marginVertical: 10, marginHorizontal: 10, backgroundColor: 'yellow'}}>
							<Text>크롭 테스트</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			{/* {<Img source={{uri:cropUri||imgUri}} style={{marginLeft:10,marginTop:10,width:180,height:180}} resizeMode={'contain'}/>} */}
		</View>
			
			}
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