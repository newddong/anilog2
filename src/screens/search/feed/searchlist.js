import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import {useNavigationState} from '@react-navigation/native';
import SearchContext from '../searchcontext';
import {HashIcon, BtnX, PhotoGradient} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';

export default SearchList = props => {
	return <SearchContext.Consumer>{({isInput}) => <Inside {...props} isInput={isInput} />}</SearchContext.Consumer>;
};

const Inside = ({isInput,route}) => {
   const arr = Array.from({length:6},(_,i)=>i);
	return (
		<View style={list.wrap_main}>
         {!isInput&&<Text style={[txt.noto24r,txt.gray,{marginTop:40*DP}]}>최근 {route?.params?.itemId}</Text>}
			<ScrollView contentContainerStyle={{paddingTop:40*DP}}>
				{arr.map((_,i)=><SearchItem ishash={i%2===0} border={i%3===0} xbtn={!isInput} status={i%3===0} key={Math.random()}/>)}
			</ScrollView>
		</View>
	);
};

export const SearchItem = props => {
	return (
		<View style={item.wrap_item}>
			{props.ishash ? (
				<>
					<SvgWrapper style={item.icon_hash} svg={<HashIcon />} />
					<View style={item.box_txt}>
						<Text style={[txt.noto28r, txt.gray]}>#중성화수술</Text>
					</View>
				</>
			) : (
				<>
					<View style={item.img_photo}>
						{props.border&&<SvgWrapper style={[item.img_photo, {position: 'absolute'}]} svg={<PhotoGradient />} />}
						<Image style={[props.border?item.img_bordered:item.img_photo]} source={{uri: 'https://blog.kakaocdn.net/dn/bvkdnK/btqD2u3oK3k/kx1ZSi2qwPgfe8DyFlhv30/img.jpg'}} />
					</View>
					<View style={item.box_txt}>
						<Text style={txt.noto28b}>qwerqwer</Text>
						<Text style={[txt.noto24r, txt.gray,{letterSpacing:-2*DP}]}>포메라니안/2살/여자예요. 복실복실 기야운 우리 비비...</Text>
						{props.status&&<Text style={[txt.noto22r, {lineHeight: 32 * DP}, txt.gray]}>팔로우중</Text>}
					</View>
				</>
			)}
			{props.xbtn&&<SvgWrapper style={item.icon_x} svg={<BtnX fill="#767676" />} />}
		</View>
	);
};

SearchItem.defaultProps = {
	ishash: false,
   border: false,
   xbtn: false,
   status: false,
};

const list = StyleSheet.create({
	wrap_main: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 48 * DP,
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
