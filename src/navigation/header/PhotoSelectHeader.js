import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {AlarmBadger48, Search48, BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {WHITE, APRI10} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import CameraRoll from 'Root/module/CameraRoll';

export default PhotoSelectHeader = ({navigation, route, options, back}) => {
	const navState = navigation.getState();
	const prevRoute = route.params.prev?.name;
	const prevKey = route.params.prev?.key;
	const selectedPhoto = route.params.selectedPhoto||[];
	const confirm = () => {
		console.log(route.params);
		if(prevRoute&&selectedPhoto.length>1){
			CameraRoll.compressImage({
				imageFiles:selectedPhoto,quality:0.7,maxWidth:1024, maxHeight:1024
			}).then(compressedImg=>
				prevRoute&&prevKey&&navigation.navigate({name:prevRoute,key:prevKey,
				params:{selectedPhoto: compressedImg},merge:true})
			)
		}
		prevRoute&&prevKey&&navigation.navigate({name:prevRoute,key:prevKey,
		params:{selectedPhoto: selectedPhoto},merge:true});
		// alert('Confirm');
	};

	const test = () => {
		const Native = Platform.OS=='ios'?NativeModules.RNCCameraRoll:NativeModules.PhotoListModule;		


		Native.compressImage({imageFiles:selectedPhoto,quality:0.5,maxWidth:750*DP, maxHeight:750*DP})
			.then(r=>console.log(r))
			.catch(err => {
			// console.log('cameraroll error===>' + err);
			});
		// navigation.push('Crop',{cropImage:selectedPhoto})
		console.log(selectedPhoto);


	};

	const warnGoback = () => {
		// if (count > 0) {
		// 	Modal.popTwoBtn(
		// 		'진행사항이 취소됩니다.',
		// 		'취소',
		// 		'확인',
		// 		() => {
		// 			Modal.close();
		// 		},
		// 		() => {
		// 			Modal.close();
		// 			navigation.goBack();
		// 		},
		// 	);
		// } else {
		// 	navigation.goBack();
		// }
        navigation.goBack();
	};
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={warnGoback}>
				<View style={style.backButtonContainer}>
					<BackArrow32 />
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={confirm}>
				<View style={style.buttonContainer}>
					<Text style={[txt.noto36b, {color: APRI10, lineHeight: 56 * DP}]}>확인</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 67 * DP,
		marginBottom: 22 * DP,
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
	backButtonContainer: {
		width: 80 * DP,
		height: 66 * DP,
		justifyContent: 'center',
		// backgroundColor:'red',
		marginBottom: 18 * DP,
	},
});
