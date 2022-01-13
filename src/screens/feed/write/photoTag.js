import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	PermissionsAndroid,
	SafeAreaView,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Image,
	Alert, Animated, PanResponder
} from 'react-native';

import {CameraIconWhite, LocationPinIcon, PawIcon, DownBracketBlack, DownBracketGray} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {TabContext} from 'tabContext';
import CameraRoll from '@react-native-community/cameraroll';
import {hasAndroidPermission} from 'Screens/camera/camerapermission';
import {requestPermission, reqeustCameraPermission} from 'permission';
import Photos from 'Screens/camera/photos';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import PhotoTagItem from './phototagitem';

export const exportUriList = React.createRef([]); //겔러리 속 사진들 로컬 주소

export default PhotoTag = ({navigation,route}) => {
	const tabContext = React.useContext(TabContext);
	React.useEffect(() => {
		tabContext.tabVisible(false);
	}, []);

	const [items, setItems] = React.useState(route.params.selectedImages);

	const onMakeTag = (tag, uri) => {
		console.log(uri + '   make   '+ JSON.stringify(tag));
		items.forEach((v,i,a)=>{
			let newtag = {x:tag.x,y:tag.y,user:tag.user};
			if(v.uri===uri){
				a[i].tags?a[i].tags.push(newtag):a[i].tags=[newtag];
			}
		})
	}
	const onDeleteTag = (user, uri) => {
		console.log(uri + '   del   '+ JSON.stringify(user));
		items.forEach((v,i,a)=>{
			if(v.uri===uri){
				v.tags.forEach((v,i,a)=>{
					if(v.user._id===user._id){a.splice(i,1)}
				})
			}
		})
	}

	const renderItems = () => {
		return items.map((v,i)=>
			<PhotoTagItem style={lo.box_img} data={v} key={i} onMakeTag={onMakeTag} onDeleteTag={onDeleteTag} viewmode={false}/>);
	}
	const test = () => {
		console.log(JSON.stringify(items));
	}


	return (
		<View style={lo.wrp_main}>
			<View style={lo.box_img_tag}>
			<Swiper showsButtons={false} autoplay={false} loop={false} dot={<></>} activeDot={<></>}>
				{renderItems()}
			</Swiper>
			
			</View>
			<View style={lo.box_explain}>
				<Text style={txt.noto28r}>사진 속 인물이나 동물을 눌러 태그하세요</Text>
            <Text style={txt.noto28r}>다시 눌러 삭제가 가능합니다.</Text>
            <Text style={txt.noto28r}>누른 상태에서 움직이면 위치가 이동합니다.</Text>
				<TouchableWithoutFeedback onPress={test}>
				<View style={{height:80*DP,width:80*DP,backgroundColor:'green'}}></View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
   box_img_tag:{
      height: 750 * DP,
		backgroundColor: 'gray',
   },
	box_img: {
		height: 750 * DP,
		backgroundColor: 'gray',
	},
	box_explain: {
		// height: 102 * DP,
		justifyContent:'center',
		alignItems: 'center',
		paddingHorizontal: 48 * DP,
      flex:1,  
      // backgroundColor:'yellow'
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


const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 36 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 35 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	noto36r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 36 * DP,
		lineHeight: 56 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	gray: {
		color: '#767676',
	},
	pink: {
		color: '#FFB6A5',
	},
	white: {
		color: '#FFFFFF',
	},
});
