import React from 'react';

import {View, Text} from 'react-native';


export default StageBar = props => {

	return (
		<View style={{...props.style, flexDirection: 'row', alignItems: 'center'}}>
			{/* <View style={{backgroundColor: GRAY_BRIGHTEST, width: props.width, height: 16 * DP, borderRadius: 8 * DP, marginRight: 8 * DP}}> */}
			<View style={[props.backgroundBarStyle,{width: props.width,justifyContent:'center'}]}>
				<View
					style={[props.insideBarStyle,{width: (props.width / props.maxstage) * props.current}]}/>
			</View>
			<Text style={props.textStyle}>
				{props.current}/{props.maxstage}
			</Text>
		</View>
	);
};

//props
StageBar.defaultProps={
   style:{}, //전체 container style, text와 bar를 감싸는 view의 style
   backgroundBarStyle:{}, //배경이 되는 bar의 style, width props으로 너비결정됨
   insideBarStyle:{}, //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
   current:1, //현재 단계를 정의
   maxstage:1, //전체 단계를 정의
   width:0, //bar의 너비
   textStyle:{},//text의 스타일
}