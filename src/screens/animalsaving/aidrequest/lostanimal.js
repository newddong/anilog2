import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { MaleIcon,FemaleIcon } from 'Asset/image';
import DP from 'Screens/dp';
import {useNavigation} from '@react-navigation/native';

export default LostAnimal = () => {
	const nav = useNavigation();
	const svg_size = {width:'100%',height:'100%'};
	return (
					<View style={cnts.wrp_cnts}>
						<TouchableWithoutFeedback onPress={()=>{nav.push('MainScreen',{screen:'animalsave',params:{screen:'AidRequestDetail',params:{}}})}}>
						<View style={cnts.cntr_img_thumb}>
							<Image style={cnts.img_thumb} source={{uri:'https://image-notepet.akamaized.net/resize/620x-/seimage/20190222%2F88df4645d7d2a4d2ed42628d30cd83d0.jpg'}}/>
							<View style={cnts.icon_sex}>
								{/* <MaleIcon {...svg_size}/> */}
								<FemaleIcon {...svg_size}/>
							</View>
							<View style={cnts.img_blur}>
								<Text style={[txt.noto24rcjk, txt.white]}>입양가능</Text>
							</View>
						</View>
						</TouchableWithoutFeedback>
						<View style={cnts.cntr_contens}>
							<View style={cnts.cntr_btn_action}>
								<View style={cnts.btn_action}>
									<Text style={[txt.noto24rcjk,txt.gray,txt.aligncenter]}>임보요청</Text>
								</View>
								<View style={cnts.btn_action}>
									<Text style={[txt.noto24rcjk,txt.gray,txt.aligncenter]}>보호소</Text>
								</View>
							</View>
							<View style={cnts.grp_txt}>
								<View style={cnts.txt_type}>
									<Text style={[txt.noto30b, {marginRight: 18 * DP,height:'100%',width:88*DP}]}>고양이</Text>
									<Text style={[txt.noto28rcjk]}>코리안숏헤어</Text>
								</View>
								<Text style={[txt.noto24rcjk]}>등록일:2021-06-07</Text>
								<Text style={[txt.noto24rcjk]}>보호장소:경기도 광주시</Text>
								<Text style={[txt.noto24rcjk]}>구조지역:경기도 광주시</Text>
							</View>
						</View>
						
					</View>
	);
};

export const cnts = StyleSheet.create({
   wrp_cnts:{
      height:214*DP,
      width:'100%',
      marginVertical:20*DP,
      flexDirection:'row'
   },
   cntr_img_thumb:{
      justifyContent:'space-between'
   },
   img_thumb:{
      height:214*DP,
      width:214*DP,
      borderRadius:30*DP,
      borderBottomLeftRadius:18*DP,
      borderBottomRightRadius:18*DP,
      position:'absolute'
   },
   icon_sex:{
      width:48*DP,
      height:48*DP,
      borderRadius:48*DP,
      alignSelf:'flex-end',
      margin:10*DP,
   },
   img_blur:{
      width:214*DP,
      height:36*DP,
      borderRadius:18*DP,
      backgroundColor:'rgba(210,210,210,0.7)',
      alignItems:'center',
      justifyContent:'center'
   },
   cntr_contens:{
      flex:1,
      height:214*DP,
      marginLeft:30*DP
   },
   cntr_btn_action:{
      flexBasis:36*DP,
      marginBottom:18*DP,
      flexDirection:'row'
   },
   btn_action:{
      borderRadius:30*DP,
      borderWidth:2*DP,
      borderColor:'#707070',
      paddingHorizontal:30*DP,
      backgroundColor:'#FFFFFF',
      marginRight:6*DP,
   },
   grp_txt:{
      flex:1,
      justifyContent:'space-evenly'
   },
   txt_type:{
      flex:1,
      flexDirection:'row',
      alignItems:'center'
   },
   txt_info:{

   }
});


export const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 36*DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
	noto30b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize: 30*DP,
		lineHeight:46*DP
	},
	roboto30bold: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30*DP,
	},
   roboto24r:{
      fontFamily:'Roboto-Regular',
      fontSize: 24*DP,
      lineHeight: 30*DP,
   },
	roboto22r:{
		fontFamily:'Roboto-Regular',
      fontSize: 22*DP,
		lineHeight: 28*DP,
	},
	bold40: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 22*DP,
	},
	bold28: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 36*DP,
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
});