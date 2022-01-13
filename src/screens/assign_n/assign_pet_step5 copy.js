import React, {useState, useRef, Component} from 'react';
import {StyleSheet, Text, View,  TouchableWithoutFeedback, Animated, PanResponder, Dimensions} from 'react-native';
import {
	PanGestureHandler,
	TapGestureHandler,
	ScrollView,
	State,
	PanGestureHandlerGestureEvent,
	TapGestureHandlerStateChangeEvent,
	PanGestureHandlerStateChangeEvent,  
 } from 'react-native-gesture-handler'; 

import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR, WHITE} from 'Screens/color';
import {
	BTN_CHECK, REQ_NAME, REQ_PHONE_NUM, TAB_VERIFY_EMAIL, TAB_VERIFY_PHONE
	, ASSIGN_USER_DESCRIPTION
	, CHOICE_TYPE, PET_TYPE, PET_SEX, BTN_BACK, BTN_NEXT
	, REQ_VACCINE, COMPREHENSIVE_VACCINE, COVID, KENNEL_COUGH, RABIES
	, DISCLOSE, SKIP   
	} from 'Screens/msg';

import {Progressbar_5_of_5,CalendarIcon, Circle} from 'Asset/image';
import {txt, lo, btn, form, tab, tab_filled_color} from './style_assign';

export default Assign_pet_step5 = props => {
	const windowWidth =650*DP;
	const circleRadius = 30;
	const touchX = new Animated.Value(windowWidth / 2 - circleRadius);
	const translateX = useRef(Animated.add(touchX, new Animated.Value(-circleRadius))).current;			
	const [spot,setSpot] = React.useState(0);	

	const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {            
            x: touchX
          },
        },
      ],
      {useNativeDriver: true},
   );

	const onTapHandlerStateChange = (e)=> {		
		if (e.nativeEvent.oldState === State.ACTIVE) {
		  if(e.nativeEvent.x <= windowWidth/3)
		  {
			 touchX.setValue(30);
			 setSpot(30)
		  }
		  else if (e.nativeEvent.x > windowWidth/3 && e.nativeEvent.x <= windowWidth/2+50)
		  {
			 touchX.setValue(windowWidth/2+25);
			 setSpot(windowWidth/2+15);
		  }
		  else 
		  {
			  touchX.setValue(windowWidth);	
			  setSpot(windowWidth);		
			}
		  console.log("Touch nativeEvent.x:",e.nativeEvent.x)		  
		}
	 }

	const onPanHandlerStateChange= (e) => {
		console.log(e.nativeEvent);
		if (e.nativeEvent.oldState === State.ACTIVE) {		 
		  if(e.nativeEvent.x <= windowWidth/3)
		  {
			 touchX.setValue(30);
			 setSpot(30);
		  }
		  else if (e.nativeEvent.x > windowWidth/3 && e.nativeEvent.x <= windowWidth/2+50)
		  {
			 touchX.setValue(windowWidth/2+25);
			 setSpot(windowWidth/2+15);
		  }
		  else {
			  touchX.setValue(windowWidth);		 
			  setSpot(windowWidth);
			}
		  console.log("Pan nativeEvent.x:",e.nativeEvent.x)		  
		}
	}

	const confirmNum = () => {
		props.navigation.push('Assign_pet_step5', {title: '반려동물 등록', data:data});
	};

	const [data, setData] = React.useState({
		name: '',
		email: '',
		emailCompany: 'naver.com',
		userEmailCompany:null,
		phone: '',
	});

	// const rightGo = translateX.interpolator({
	// 	inputRange: [0, 300],
	// 	outputRange: [0, 300],
	//  })

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<SvgWrapper style={{width: 650 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<Progressbar_5_of_5/>} />
				<Text style={[txt.noto28,{marginBottom: 50 * DP}]}>{REQ_VACCINE}</Text>		
					<View style={{flexDirection:'row'}}>
							<Text style={[txt.noto28,{marginBottom: 5 * DP, marginLeft: 80 * DP}]}>{'1차'}</Text>	
							<Text style={[txt.noto28,{marginBottom: 5 * DP, marginLeft: 220 * DP}]}>{'2차'}</Text>	
							<Text style={[txt.noto28,{marginBottom: 5 * DP, marginLeft: 240 * DP}]}>{'3차'}</Text>	
					</View>						
					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28,{marginBottom: 50 * DP}]}>{COMPREHENSIVE_VACCINE}</Text>										
						<TapGestureHandler onHandlerStateChange={onTapHandlerStateChange} shouldCancelWhenOutside>	
							<Animated.View style={styles.wrapper}>
								<PanGestureHandler activeOffsetX={[-20, 20]}	onGestureEvent={onPanGestureEvent} onHandlerStateChange={onPanHandlerStateChange} shouldCancelWhenOutside>
									<Animated.View style={styles.horizontalBack}>
										{/* <Animated.View
											style={[
												styles.circleBack,
												{													
												transform: [
													{														
														scaleX: translateX,
													},
												],
												},
											]}
										/>							 */}																				
										<StickBar style={{position : "absolute"}} nowSpot={spot}/>										
										{/* <Animated.View
											style={[
												styles.circle,
												{
												transform: [
													{
														translateX: translateX,
													},
												],
												},
											]}
										/>		 */}
										
									</Animated.View>
								</PanGestureHandler>
							</Animated.View>
						</TapGestureHandler>
					</View>		

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 80 * DP}]}>{COVID}</Text>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 20 * DP}]}>kg</Text>						
					</View>	

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 80 * DP}]}>{KENNEL_COUGH}</Text>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 20 * DP}]}>kg</Text>						
					</View>

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 80 * DP}]}>{RABIES}</Text>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 20 * DP}]}>kg</Text>						
					</View>

					<View style={{flexDirection:'row'}}>
						<Text style={[txt.noto28, {marginTop: 30 * DP, marginRight: 80 * DP}]}>{DISCLOSE}</Text>						
					</View>
				
					<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:50 * DP}}>
						<TouchableWithoutFeedback onPress={props.navigation.goBack}>
							<View style={[btn.confirm_filled_empty_small, btn.shadow,{marginTop: 50 * DP,}]}>
								<Text style={[txt.noto32b, txt.MAINCOLOR]}>{BTN_BACK}</Text>
							</View>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback onPress={props.navigation.goBack}>
							<View style={[btn.confirm_filled_empty_small, btn.shadow,{marginTop: 50 * DP,}]}>
								<Text style={[txt.noto32b, txt.MAINCOLOR]}>{SKIP}</Text>
							</View>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback onPress={confirmNum}>
							<View style={[btn.confirm_filled_color_small, btn.shadow,{marginTop: 50 * DP,}]}>
								<Text style={[txt.noto32b, txt.white]}>{BTN_NEXT}</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>				
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: "center",
	  justifyContent: "center"
	},
	titleText: {
	  fontSize: 14,
	  lineHeight: 24,
	  fontWeight: "bold"
	},
	box: {
	  height: 30,
	  width: 30,
	  backgroundColor: MAINCOLOR,
	  borderRadius: 35
	},
	horizontalBack: {
		backgroundColor: '#ff0000',
		height: 30,
		justifyContent: 'center',
		marginVertical: 10,
		width: 650*DP,
		borderRadius: 35,
		borderWidth: 5 * DP,
		borderColor : MAINCOLOR,
		backgroundColor: WHITE,	
	 },	 
	 horizontalPan: {
		backgroundColor: '#FF9888',
		height: 30,
		justifyContent: 'center',
		// marginVertical: 10,
		borderRadius: 35,
	 },  
	 circleBack: {		
		borderRadius: 30,
		backgroundColor: '#FF9888',
		height: 25,		
		borderWidth: 3 * DP,
		borderColor : "#FF9888",		
		position : "absolute"
	 },
	 circle: {
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		height: 25,
		width: 25,
		borderWidth: 3 * DP,
		borderColor : "#FF9888",
		position : "absolute"
	 },
	 wrapper: {		
		flex: 1,
	 },
 });

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select ? tab_filled_color.btn_tab : tab_filled_color.btn_tab_notselected}>
				<Text style={props.select ? [txt.noto28b, {color: WHITE}] : [txt.noto28, {color: GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const StageBar = props => {
	return (
		<View style={{...props.style, flexDirection: 'row', alignItems: 'center'}}>
			<View style={{backgroundColor: GRAY_BRIGHTEST, width: props.width, height: 16 * DP, borderRadius: 8 * DP, marginRight: 8 * DP}}>
				<View
					style={{backgroundColor: MAINCOLOR, width: (props.width / props.maxstage) * props.current, height: 16 * DP, borderRadius: 8 * DP}}></View>
			</View>
			<Text style={[txt.roboto24, {color: GRAY}]}>
				{props.current}/{props.maxstage}
			</Text>
		</View>
	);
};

const StickBar = props => {
	return (
		<Animated.View  style={{...props.style, flexDirection: 'row'}}>
			<Animated.View style={{width:props.nowSpot, backgroundColor: MAINCOLOR, height: 50 * DP, borderRadius: 25 * DP}}/>
			<SvgWrapper style={{ width:40*DP, marginLeft:-50 * DP}} svg={<Circle/>}/>
		</Animated.View>
	);
};

										