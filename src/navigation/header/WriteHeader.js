import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

import Backbutton from 'Screens/header/icon_back.svg';
import DP from 'Root/config/dp';
import SvgWrapper from 'Atom/svgwrapper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {txt} from '../home/post/style_post';
// import { CommonActions } from '@react-navigation/native';
// import { useNavigationState } from '@react-navigation/native';
import {createPost, editPost} from 'Root/api/feedapi';
//deprecated
export default WriteHeader = ({navigation, route, options, back}) => {
	const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : route.name;
	const label_right_btn = route.name === 'photoTag' ? '완료' : '공유';

	const rightbtn = () => {
		if (route.name === 'photoTag') {
			navigation.goBack();
		} else if (route.name === 'editFeed') {
			console.log('editFeed    ====>    ' + JSON.stringify(route.params.editImages));
			let {_id, location, time, content} = route.params.editData;
			// console.log('editData ===> ' + JSON.stringify(scene.route.params.editData));
			// console.log('localSelectedImages ===> ' + JSON.stringify(scene.route.params.localSelectedImages));
			editPost(
				{
					post_id: _id,
					location: location,
					time: time,
					content: route.params.content,
					images: route.params.editImages,
				},
				result => {
					console.log('Edit Post ==> ' + JSON.stringify(result));
					alert('수정이 완료되었습니다.');
					navigation.navigate({name: route.params.navfrom, params: {update: true}, merge: true});
				},
			);
		} else {
			createPost(
				{
					imageList: route.params.localSelectedImages,
					location: '서울 마포구',
					time: '어느날',
					content: route.params.content,
				},
				result => {
					console.log('Create Post ==> ' + JSON.stringify(result));
					alert('업로드가 완료되었습니다.');
					navigation.navigate({name: route.params.navfrom, params: {update: true}, merge: true});
				},
			);
		}
	};

	return (
		<View style={[style.headerContainer]}>
			<TouchableWithoutFeedback onPress={navigation.goBack}>
				<View style={{width: 80 * DP, height: 80 * DP, justifyContent: 'center', alignItems: 'center'}}>
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
		// paddingHorizontal: 48 * DP,
		paddingLeft: 24 * DP,
		paddingRight: 48 * DP,
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
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
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
