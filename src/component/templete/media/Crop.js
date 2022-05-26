import React from 'react';
import {Animated, PanResponder, View, Text,Platform, Button, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';

export default Crop = prop => {
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const scalePrev = React.useRef(1);
	const panStart = React.useRef({x: 0, y: 0}).current;
	const panPrev = React.useRef({x: 0, y: 0}).current;
	const imgLayout = React.useRef({width:1,height:1}).current;
	const initDistance = React.useRef(0);
	const [cropUri, setCropUri] = React.useState();
	const [imgUri, setImgUri] = React.useState();
	const [imgDimension, setImgDimension] = React.useState({width:750*DP,height:750*DP});
	
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
			onPanResponderStart:({nativeEvent})=>{
				if (nativeEvent.touches.length > 1) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					initDistance.current = getDistance(pos1, pos2);
				}
			},	
			onPanResponderMove: ({nativeEvent}) => {
				if (nativeEvent.touches.length > 1 &&initDistance.current!=0) {
					let pos1 = {x: nativeEvent.touches[0].pageX, y: nativeEvent.touches[0].pageY};
					let pos2 = {x: nativeEvent.touches[1].pageX, y: nativeEvent.touches[1].pageY};
					scale.setValue((scalePrev.current * getDistance(pos1, pos2)) / initDistance.current);
					return;
				}
				pan.setValue({x: nativeEvent.pageX, y: nativeEvent.pageY});
			},
			onPanResponderRelease: ({nativeEvent}) => {
				let w = 0;
				let h = 0;
				let stickToLeft = () => {
					Animated.spring(
						pan,{toValue:{x:75*DP-w-pan.x._offset,y:panPrev.y-pan.y._offset},speed:50,useNativeDriver:false}
					).start();
					panPrev.x = 75*DP-w;
				};
				let stickToRight = () => {
					Animated.spring(
						pan,{toValue:{x:675*DP+w-imgLayout.width-pan.x._offset,y:panPrev.y-pan.y._offset},speed:50,useNativeDriver:false}
					).start();
					panPrev.x = 675*DP-imgLayout.width+w;
				};
				let stickToTop = () => {
					Animated.spring(
						pan,{toValue:{x:panPrev.x-pan.x._offset,y:75*DP-h-pan.y._offset},speed:50,useNativeDriver:false}
					).start();
					panPrev.y = 75*DP-h;
				};
				let stickToBottom = () => {
					Animated.spring(
						pan,{toValue:{x:panPrev.x-pan.x._offset,y:675*DP+h-imgLayout.height-pan.y._offset},speed:50,useNativeDriver:false}
					).start();
					panPrev.y = 675*DP-imgLayout.height+h;
				};


				console.log(nativeEvent);
				if (nativeEvent.changedTouches.length > 1 || initDistance.current !=0) {
					console.log('pinch end');
					w = imgLayout.width*scale._value;
					h = imgLayout.height*scale._value;

					if(w>h){
						if(h<600*DP){
							scalePrev.current = 600*DP/imgLayout.height;
							scale.setValue(scalePrev.current);
						}
						else{
							scalePrev.current = scale._value;
						}
					}
					else{
						if(w<600*DP){
							scalePrev.current = 600*DP/imgLayout.width;
							scale.setValue(scalePrev.current);
						}
						else{
							scalePrev.current = scale._value;
						}
					}

					w = imgLayout.width * (1-scalePrev.current)/2;
					h = imgLayout.height * (1-scalePrev.current)/2;

					if(panPrev.x+imgLayout.width<675*DP+w){
						stickToRight();
					}
					else{
						if(panPrev.x>75*DP-w){
							stickToLeft();
						}
					}
					if(panPrev.y+imgLayout.height<675*DP+h){
						stickToBottom();
					}
					else{
						if(panPrev.y>75*DP-h){
							stickToTop();
						}
					}


					initDistance.current =0;
				}
				else{
					console.log('move end');
					panPrev.x = pan.x._value + pan.x._offset;
					panPrev.y = pan.y._value + pan.y._offset;
					
					w = imgLayout.width * (1-scalePrev.current)/2;
					h = imgLayout.height * (1-scalePrev.current)/2;
					
					if(panPrev.x+imgLayout.width<675*DP+w){
						stickToRight();
					}
					
					if(panPrev.x>75*DP-w){
						stickToLeft();
					}
					
					if(panPrev.y+imgLayout.height<675*DP+h){
						stickToBottom();
					}
					if(panPrev.y>75*DP-h){
						stickToTop();
					}
					
				}
			},
		}),
	).current;

	React.useEffect(()=>{
		imgUri&&Image.getSize(imgUri,(w,h)=>{
			if(w>h){
				let newWidth = (w/h)*750*DP;
				let initPositionX = (750*DP - newWidth)/2;
				panPrev.x = initPositionX;
				pan.setValue({x:initPositionX,y:0});
				imgLayout.width = newWidth;
				imgLayout.height = 750*DP;
				setImgDimension({
					width: newWidth,
					height: 750*DP
				});
			}
			if(h>=w){
				let newHeight = (h/w)*750*DP;
				let initPositionY = (750*DP-newHeight)/2;
				panPrev.y = initPositionY;
				pan.setValue({x:0,y:initPositionY});
				imgLayout.width = 750*DP;
				imgLayout.height = newHeight;
				setImgDimension({
					width: 750*DP,
					height: newHeight
				});
			}
		});


	},[imgUri])


	React.useEffect(() => {
		setImgUri(prop.route.params.cropImage[0]);
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
			let desW =Math.round(600*DP*wRatio);
			let desH = Math.round(600*DP*hRatio);
			
			let offX = Math.abs(panPrev.x+imgLayout.width * (1-scalePrev.current)/2-75*DP)*wRatio;
			let offY = Math.abs(panPrev.y+imgLayout.height * (1-scalePrev.current)/2-75*DP)*hRatio;
			console.log('crop!   offX:'+Math.round(offX)+'   offY:'+Math.round(offY)+'   desW:'+desW+'   desH:'+desH);
			CameraRoll.cropImage({
				uri:imgUri,
				destHeight:desH,
				destWidth:desW,
				offsetX:Math.round(offX),
				offsetY:Math.round(offY),
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
	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<View style={{width: 750 * DP, flexBasis: 750 * DP, backgroundColor: 'green'}}>
            <View style={{position:'absolute',top:75*DP,left:75*DP,width:600*DP, height:600*DP,backgroundColor:'blue'}} ref={bluerect}/>
				<Animated.View style={{width: imgDimension.width, height: imgDimension.height,alignItems:'center',backgroundColor:'red',transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}]}} {...panResponder.panHandlers}>
					{imgUri&&<Img
						style={{ width: imgDimension.width, height: imgDimension.height}}
						source={{uri: imgUri}}
						resizeMode={'contain'}
						ref={image}
					/>}
				</Animated.View>
				<View style={{backgroundColor:'green',width:750*DP,height:750*DP}}>
					<View style={{backgroundColor:'yellow',marginTop:75*DP,width:600*DP,marginLeft:75*DP,height:600*DP
				,transform:[{scale:1}]
				}}>
					</View>
				</View>
                <View style={{position:'absolute',top:75*DP,left:75*DP,width:600*DP, height:4*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',top:75*DP,left:75*DP,width:4*DP, height:600*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',bottom:75*DP,left:75*DP,width:600*DP, height:4*DP,backgroundColor:'red'}}/>
                <View style={{position:'absolute',top:75*DP,right:75*DP,width:4*DP, height:600*DP,backgroundColor:'red'}}/>
			</View>
			<View style={{backgroundColor: '#fff', width: 750 * DP, flex: 1}}>
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
				{<Img source={{uri:cropUri||imgUri}} style={{marginLeft:10,marginTop:10,width:180,height:180}} resizeMode={'contain'}/>}
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

//안드로이드에서 FastImage를 사용하도록하는 커스텀 컴포넌트
const Img =React.forwardRef((props,ref) => {
	if(Platform.OS=='ios'){
		return <Image {...props} ref={ref}></Image>

	}
	if(Platform.OS=='android'){
		return <FastImage {...props} ref={ref}></FastImage>
	}
})