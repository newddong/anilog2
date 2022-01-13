import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

import Backbutton from 'Screens/header/icon_back.svg';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {exportUriList, exportUri} from 'Screens/camera/addphoto';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serveruri, cookieReset} from 'Screens/server';
import axios from 'axios';

export default AddPhotoHeader = ({navigation, route, options, back}) => {
	const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : route.name;
	const label_right_btn = '선택';

	const rightbtn = () => {
      switch(route.name){
         case 'AddPhoto':
            navigation.navigate({name: route.params.navfrom, params: {localSelectedImages: exportUriList}, merge: true});
            break;
         case 'AddSinglePhoto':
            navigation.navigate({name: route.params.navfrom, params: {localSelectedImages: exportUriList[0]}, merge: true});
      }
		//exportUriList의 객체 유형 {isVideo:Boolean, uri:String}
	};

	return (
		<View style={[style.headerContainer]}>
			<TouchableWithoutFeedback onPress={navigation.goBack}>
				<View style={{width: 62 * DP, height: 62 * DP, justifyContent: 'center'}}>
					<SvgWrapper style={{width: 32 * DP, height: 32 * DP}} svg={<Backbutton />} />
				</View>
			</TouchableWithoutFeedback>
			<View style={style.cntr_title}>
				<Text style={txt.noto40b}>{title}</Text>
			</View>
			<TouchableWithoutFeedback onPress={rightbtn}>
				<View style={style.rightbtn}>
					<Text style={[txt.noto40b, style.blue]}>{label_right_btn}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 132 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		// justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	cntr_title: {
		marginLeft: 34 * DP,
		width: 478 * DP,
		alignItems: 'center',
	},
	backbutton: {
		fontSize: 100 * DP,
	},
	rightbtn: {
		width: 150 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
		lineHeight: 60 * DP,
		includeFontPadding: false,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 48 * DP,
	},
	blue: {
		color: '#007EEC',
	},
});


const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 38*DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
	roboto30b: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30*DP,
	},
   roboto24r:{
      fontFamily:'Roboto-Regular',
      fontSize: 24*DP,
      lineHeight: 30*DP,
   }, 
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40*DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
	aligncenter: {
		textAlign: 'center',
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	white:{
		color: '#FFFFFF',
		
	},
   red:{
      color:'red'
   }
	
});
