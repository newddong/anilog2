import React, {useState, useRef, Component} from 'react';
import {StyleSheet, Text, View,  TouchableWithoutFeedback, Animated, PanResponder, Dimensions} from 'react-native';
import {
	PanGestureHandler,
	TapGestureHandler,
	State, 
 } from 'react-native-gesture-handler'; 

import DP from 'Screens/dp';
import {BLACK, MAINCOLOR, WHITE} from 'Screens/color';
import {Circle} from 'Asset/image';

export default RangeSlider = React.forwardRef((props, ref) => {
	const windowWidth = props.width;
	const circleRadius = 30;
   // const circleInitValue = 55*DP;
	const circleInitValue = 0;
   const totalStep = props.totalStep;
   console.log("totalStep:", totalStep);
   console.log("windowWidth:", windowWidth);
   const per_value = windowWidth/totalStep; //구간당 단위 값
   const stop_array = [];
	// const touchX = new Animated.Value(windowWidth / 2 - circleRadius);
   const touchX = new Animated.Value(circleInitValue);
	const translateX = useRef(Animated.add(touchX, new Animated.Value(-circleRadius))).current;			
	const [spot,setSpot] = React.useState(circleInitValue);	

   const calc_spot = (touch_value) => {
		//step_value : 구간 값. (width가 200이고 2차 까지 나타낼 경우 0구간:0 , 1구간:100, 2구간:200)
		//tolerance : 허용오차 (step_value 값이 100 이라면 tolerance는 (+-)50)	
		//위 조건에서 사용자가 x값 125에 터치할 경우 최종 step_value는 100이 됨. (1구간 허용오차 범위내에 터치 했으므로)
		//위 조건의 각 구간의 허용오차 범위 : -50 <= 0구간 < 50, 50 <= 1구간 < 150 , 150 <= 2구간 < 250

		tolerance  = per_value/2
		for(i = 0; i<=totalStep; i++)
		{	
			step_value = per_value * i;
			//mark 지점에서 오차만큼 터치 됐을 때 구간 값 리턴	
			if( touch_value <= (step_value + tolerance) && touch_value > (step_value - tolerance))
			{
				//0구간일 경우에는 기본값이 적용 되어야 원을
				if ( i == 0 ) step_value = circleInitValue;
				else if (i == totalStep ) step_value = step_value - circleInitValue + circleRadius/4;

				return step_value;
			}
		}
   }

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
         result = calc_spot(e.nativeEvent.x)

			console.log("result:",result);
         touchX.setValue(result);

			//circle이 그래프의 끝에 다다를때의 최대치는 width
			if(windowWidth<result) result = windowWidth;
         	setSpot(result);

         //   if(e.nativeEvent.x <= windowWidth/3)
         //   {
         // 	 touchX.setValue(circleInitValue);
         // 	 setSpot(circleInitValue)
         //   }
         //   else if (e.nativeEvent.x > windowWidth/3 && e.nativeEvent.x <= windowWidth/2+50)
         //   {
         // 	 touchX.setValue(windowWidth/2+25);
         // 	 setSpot(windowWidth/2+15);
         //   }
         //   else 
         //   {
         // 	  touchX.setValue(windowWidth);	
         // 	  setSpot(windowWidth);		
         // 	}
         console.log("Touch nativeEvent.x:",e.nativeEvent.x)		  
		}
	 }

	const onPanHandlerStateChange= (e) => {
		console.log(e.nativeEvent);
		if (e.nativeEvent.oldState === State.ACTIVE) {	

			result = calc_spot(e.nativeEvent.x)
         touchX.setValue(result);

			if(windowWidth<result) result = windowWidth;
         setSpot(result);

		//   if(e.nativeEvent.x <= windowWidth/3)
		//   {
		// 	 touchX.setValue(circleInitValue);
		// 	 setSpot(circleInitValue);
		//   }
		//   else if (e.nativeEvent.x > windowWidth/3 && e.nativeEvent.x <= windowWidth/2+50)
		//   {
		// 	 touchX.setValue(windowWidth/2+25);
		// 	 setSpot(windowWidth/2+15);
		//   }
		//   else {
		// 	  touchX.setValue(windowWidth);		 
		// 	  setSpot(windowWidth);
		// 	}
		  console.log("Pan nativeEvent.x:",e.nativeEvent.x)		  
		}
	}

	return (							
            <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange} shouldCancelWhenOutside>	
               <Animated.View style={styles.wrapper}>
                  <PanGestureHandler activeOffsetX={[-20, 20]}	onGestureEvent={onPanGestureEvent} onHandlerStateChange={onPanHandlerStateChange} shouldCancelWhenOutside>
                     <Animated.View style={[styles.horizontalBack]}>
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
	);
});

const styles = StyleSheet.create({
	horizontalBack: {
		backgroundColor: WHITE,	
		height: 30,
		justifyContent: 'center',		
		borderRadius: 35,
		borderWidth: 5 * DP,
		borderColor : MAINCOLOR,		
		width : 500 * DP
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
		// flex: 1,
		width:500*DP,
	 },
 });

const StickBar = props => {
	return (
		<Animated.View  style={{...props.style, flexDirection: 'row'}}>			
				
				{props.nowSpot==0 &&
				<Animated.View style={{flexDirection:'row'}}>
					<Animated.View style={{width:props.nowSpot+26, backgroundColor: "#FF9888", height: 50 * DP, borderRadius: 25 * DP}}/>
					<SvgWrapper style={{width:40*DP, marginLeft:-45*DP}} svg={<Circle/>}/>
				</Animated.View>
				}
				{props.nowSpot!=0 && 
				<Animated.View style={{flexDirection:'row'}}>
					<Animated.View style={{width:props.nowSpot-2, backgroundColor: "#FF9888", height: 50 * DP, borderRadius: 25 * DP, marginLeft:-3*DP}}/>
					<SvgWrapper style={{ width:40*DP, marginLeft:-45*DP}} svg={<Circle/>}/>				
				</Animated.View>
				}
		</Animated.View>
	);
};

										