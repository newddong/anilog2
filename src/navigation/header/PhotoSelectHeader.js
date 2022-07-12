import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, Platform} from 'react-native';

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
	const selectedPhoto = route.params.selectedPhoto || [];

	React.useEffect(() => {
		// console.log('헤더',route.params);
	}, [route.params]);

	const confirm = () => {
		console.log(route.params, selectedPhoto);
		if(selectedPhoto.some(v=>v.fileSize>30000000)){
			Modal.alert('30메가바이트 이상 동영상은\n편집버튼을 눌려 편집 해주세요');
			return;
		}


		if (prevRoute && selectedPhoto.length > 0) {
			console.log('compress img', selectedPhoto)
			let localFiles = selectedPhoto.filter(v => !v.uri.includes('http'));
			let localImageFiles = selectedPhoto.filter(v=>!v.uri.includes('http')&&v.type.includes('image')&&!v.uri.includes('gif'));
			let remoteFiles = selectedPhoto.filter(v => v.uri.includes('http'));
			if(localImageFiles.length>0){
				console.log('contain local image');
				CameraRoll.compressImage({
					imageFiles: localImageFiles.map(v =>{
						return v.uri;
					}),
					quality: 0.7,
					maxWidth: 1024,
					maxHeight: 1024,
				})
					.then(compressedImg => {
						console.log(compressedImg);
						localImageFiles.forEach((v,i,a)=>{
							if(v.cropUri){
								a[i].fileSize = compressedImg.assets[i].fileSize;
							}else{
								a[i].cropUri = compressedImg.assets[i].uri;
								a[i].fileSize = compressedImg.assets[i].fileSize;
							}
							
						})
						console.log(localImageFiles)

						selectedPhoto.forEach((v,i,a)=>{
							let img = localImageFiles.find(localImg=>localImg.uri==v.uri)
							if(img && a[i].cropUri){
								a[i].cropUri = img.cropUri;
								a[i].fileSize = img.fileSize;
							}
						})
						console.log(selectedPhoto)
						prevRoute &&
							prevKey &&
							navigation.navigate({
								name: prevRoute,
								key: prevKey,
								params: {
									selectedPhoto: selectedPhoto
								},
								merge: true,
							});
					})
					.catch(e => console.log('camerarollerr', e));
			}else{
				console.log('not contain local image');
				prevRoute && prevKey && navigation.navigate({name: prevRoute, key: prevKey, params: {selectedPhoto: selectedPhoto}, merge: true});	
			}
		} else {
			console.log('exit');
			prevRoute && prevKey && navigation.navigate({name: prevRoute, key: prevKey, params: {selectedPhoto: selectedPhoto}, merge: true});
		}
		// prevRoute && prevKey && navigation.navigate({name: prevRoute, key: prevKey, params: {selectedPhoto: selectedPhoto}, merge: true});
	};

	const test = () => {
		const Native = Platform.OS == 'ios' ? NativeModules.RNCCameraRoll : NativeModules.PhotoListModule;

		Native.compressImage({imageFiles: selectedPhoto, quality: 0.5, maxWidth: 750 * DP, maxHeight: 750 * DP})
			.then(r => console.log(r))
			.catch(err => {
				// console.log('cameraroll error===>' + err);
			});
		// navigation.push('Crop',{cropImage:selectedPhoto})
		console.log(selectedPhoto);
	};

	const [backPressed, setBackPressed] = React.useState(false);

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
		setBackPressed(true);
		if (!backPressed) {
			navigation.goBack();
		}
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity style={style.backButtonContainer} onPress={warnGoback}>
				<BackArrow32 />
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
