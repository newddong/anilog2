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
	Alert
} from 'react-native';

import {DeleteImage, CameraIconWhite, LocationPinIcon, PawIcon, DownBracketBlack, DownBracketGray} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {TabContext} from 'tabContext';
import CameraRoll from '@react-native-community/cameraroll';
import {hasAndroidPermission} from 'Screens/camera/camerapermission';
import {requestPermission, reqeustCameraPermission} from 'permission';
import Photos from 'Screens/camera/photos';
import FastImage from 'react-native-fast-image';
import {txt} from 'Root/screens/textstyle';
import Swiper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';
import Tag from './tag';
import axios from 'axios';
import {serveruri, cookieReset} from 'Screens/server';

export default PhotoTagItem = ({style, data, onMakeTag, onDeleteTag, viewmode}) => {
	const [tags, setTags] = React.useState(data.tags?data.tags:[]);
	const [showTags, setShowTags] =React.useState(!viewmode);
	const nav = useNavigation();
	const route = useRoute();
	const clickedPost = React.useRef({x: -1, y: -1});

	const makeTag = e => {
		// console.log(e.nativeEvent);
		clickedPost.current = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
		!viewmode&&nav.push('userList', {navfrom: route.name});
	};

	const deleteTag = user => {
		// console.log('delete');
		// console.log(user);
		// console.log(tags);
		onDeleteTag&&onDeleteTag(user, data.uri);
		setTags(tags.filter(v => v.user._id !== user._id));
	};

	React.useEffect(() => {
		if(clickedPost.current.x<0||clickedPost.current.y<0)return;

		if (route.params?.selectedUser) {
			let newTag = {x: clickedPost.current.x, y: clickedPost.current.y, user: route.params.selectedUser};
			setTags(
				tags.filter(v=>v.user._id!==route.params.selectedUser._id)
					.concat(newTag)
			);
			clickedPost.current = {x:-1,y:-1};
			onMakeTag&&onMakeTag(newTag, data.uri);
		}
	}, [route]);

	const test = async () => {
		console.log(tags);
		setShowTags(!showTags);
		// let a =  await axios.post(serveruri + '/user/test', {array: tags});
		// console.log(a);

	}

	const endTagmove = (e) => {
		// console.log(e);
		tags.forEach((v,i,a)=>{
			if(v.user._id===e.user._id)a.splice(i,1,e);
		});
	}
	const [backgroundLayout, setBackgroundLayout] = React.useState({width:750*DP,height:750*DP});
	const onLayout = (e) => {
		setBackgroundLayout(e.nativeEvent.layout);
	}

	return (
		<TouchableWithoutFeedback onPress={makeTag}>
			<View style={style} onLayout={onLayout}>
				{Platform.OS==='ios'?<Image style={style} source={{uri: data.uri}}/>
				:<FastImage style={style} source={{uri: data.uri}}/>}
					{tags?.map((v, i) => (
						showTags&&<Tag pos={v} key={i} user={v.user} onDelete={deleteTag} onEnd={endTagmove} viewmode={viewmode} backgroundLayout={backgroundLayout}/>
					))}
				<TouchableWithoutFeedback onPress={test}>
						<View style={{width:100*DP,height:100*DP,backgroundColor:'red',position:'absolute'}} />
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	);
};

PhotoTagItem.defaultProps = {
	style: {},
	data: {},
	index: 0,
	viewmode:false,
};
