import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import {useNavigationState} from '@react-navigation/native';
import SearchContext from '../searchcontext';
import {HashIcon, BtnX, PhotoGradient,DownBracketBlack} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import FeedList from 'Screens/feed/profile/subcomponent/feedlist';
import profiledata from 'Screens/feed/profile/profiledata.json';
import {SearchItem} from './searchlist';

export default TempShelter = props => {
	return <SearchContext.Consumer>{({isInput}) => <Inside {...props} isInput={isInput} />}</SearchContext.Consumer>;
};

const Inside = ({isInput,route}) => {
   const arr = Array.from({length:10},(_,i)=>i);
	return (
		<View style={list.wrap_main}>
         <View style={list.box_list}>
         <Text style={[txt.noto24r,txt.gray,{marginTop:40*DP}]}>최근 본 임시 보호 동물</Text>
			<ScrollView contentContainerStyle={{paddingTop:40*DP}}>
				<SearchItem border={false} xbtn={!isInput} status={true}/>
				<SearchItem border={true} xbtn={!isInput} status={true}/>
			</ScrollView>
         </View>
         <View style={[list.btn_more,list.shadow]}><Text style={txt.noto28r}>최근 본 임보 정보 더 보기</Text>
         <SvgWrapper style={list.icon_more} svg={<DownBracketBlack/>}/>
         </View>
         <FeedList data={profiledata.profile.feeds}/>

		</View>
	);
};

const list = StyleSheet.create({
	wrap_main: {
		flex: 1,
		backgroundColor: '#fff',
      
	},
   box_list:{
      paddingHorizontal:48*DP,
   },
   box_feed:{

   },
   btn_more:{
      marginBottom:70*DP,
      marginTop:30*DP,
      width:520*DP,
      height:59*DP,
      borderRadius:60*DP,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      alignSelf:'center'
   },
   icon_more:{
      width:20*DP,
      height:12*DP,
      marginLeft:12*DP,
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
});

const item = StyleSheet.create({
	wrap_item: {
		height: 100 * DP,
		flexDirection: 'row',
		marginBottom: 40 * DP,
		alignItems: 'center',
	},
	icon_hash: {
		width: 90 * DP,
		height: 90 * DP,
	},
	icon_x: {
		width: 22 * DP,
		height: 22 * DP,
	},
	img_photo: {
		width: 94 * DP,
		height: 94 * DP,
		borderRadius: 50 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	img_bordered: {
		width: 86 * DP,
		height: 86 * DP,
		borderRadius: 50 * DP,
	},
	box_txt: {
		marginLeft: 19 * DP,
		flex: 1,
		justifyContent: 'center',
	},
});

const txt = StyleSheet.create({
	noto22r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 22 * DP,
		lineHeight: 32 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 44 * DP,
		letterSpacing: -1 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	noto30r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	roboto28b: {
		fontFamily: 'Roboto-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	gray: {
		color: '#767676',
	},
});
