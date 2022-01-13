import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
} from 'react-native';
import BtnBackground from './btnbackground.svg';
import DP from 'Screens/dp';

export default RequestBtn = () => {
	const svg_size = {width: '100%', height: '100%'};
	return (
			<View style={[btn.wrp_btn, btn.shadow]}>
				<View style={[btn.btn_background]}>
					<BtnBackground {...svg_size} />
				</View>
				<Text style={[txt.noto28b,txt.white]}>보호 요청 하기</Text>
			</View>
	);
};

const txt = StyleSheet.create({
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 36*DP,
	},
	white:{
		color: '#FFFFFF',
		
	},
});

const btn = StyleSheet.create({
   wrp_btn:{
      width:300*DP,
      height:60*DP,
      borderRadius:30*DP,
      justifyContent:'center',
      alignItems:'center'
   },
   btn_background:{
     width:'100%',
     height:'100%',
     position:'absolute',
   },
   shadow:{
		shadowColor: '#707070',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation:8,
	}
   
});