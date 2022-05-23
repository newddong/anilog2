import React from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid, Text, TouchableWithoutFeedback, Image, FlatList, NativeModules} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
// import CameraRoll from '@react-native-community/cameraroll';
import CameraRoll from 'Root/module/CameraRoll';
// import { hasAndroidPermission } from './camerapermission';
// import { requestPermission, reqeustCameraPermission } from 'permission';
import LocalMedia from 'Molecules/media/LocalMedia';
import {Bracket48} from 'Atom/icon';
// import FastImage from 'react-native-fast-image';
// import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

export var exportUriList = []; //겔러리 속 사진들 로컬 주소
export var exportUri = {}; //겔러리 속 사진 로컬 주소

export default AddPhoto = props => {
	const navigation = useNavigation();
	const [isVideo, setVideo] = React.useState(false);
	const [photolist, setPhotoList] = React.useState([
		{
			node: {
				location: null,
				modified: 123456789.066,
				group_name: 'Pictures',
				timestamp: 123456789.067,
				type: 'image/jpeg',
				image: {
					fileSize: null,
					filename: null,
					playableDuration: null,
					height: null,
					width: null,
					uri: 'http://src.hidoc.co.kr/image/lib/2016/7/21/20160721160807763_0.jpg',
				},
				imageID:"0"
			},
		},
	]);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const isSingle = props.route.name === 'SinglePhotoSelect';

	/**
	 * timeStamp, imageID를 이용하여 디바이스의 갤러리에 있는 미디어를 불러옴
	 *
	 *@param {number} timeStamp - 갤러리의 미디어를 불러올 기준 timeStamp (기본값 0)
	 *@param {String} imageID - 갤러리의 미디어를 불러올 기준 imageID (기본값 123456789)
	 *@param {number} request - 불러올 미디어의 숫자 (기본값 20)
	 *@param {string} type - 불러올 미디어의 타잎('Photos'|'All'|'Videos')
	 */
	const loadPhotosMilsec = (request = 5, timeStamp = 0, imageID = "123456789", type = 'Photos') => {
		console.log('아이디',imageID);
		let param = {
			first: request,
			toTime: timeStamp?timeStamp * 1000 - 1:0,
			toID: imageID,
			assetType: type,
			include: ['playableDuration'],
		};
		if(Platform.OS=='android'){
			delete param.fromTime;
			delete param.toTime;
		}else{
			delete param.toID;
		}
		CameraRoll.getPhotos(param)
			.then(photolistcallback)
			.catch(err=>{
				// console.log('cameraroll error===>' + err);
		})
	};

	const photolistcallback = (r) => {
		console.log('디바이스 사진 리스트', r);
				setPhotoList(photolist.concat(r.edges));
				setSelectedPhoto(selectedPhoto);

				let photoList = [...r.edges];
				photoList.map((v, i) => {
					photoList[i] = {
						img_uri: v.node.image.uri,
						state: false,
					};
				});
				photoList.splice(0, 0, true); //목록 첫 인덱스는 Default Camera Icon (사진직접찍기 기능)
				setPhotos(photoList);
	}


	/** 스크롤이 바닥에 닿을때 페이징 처리를 위한 함수 */
	const scrollReachBottom = () => {
		// loadPhotos(page.current);
		// console.log('scrolllist bottom   ' + JSON.stringify(photolist));
		let lastID = photolist.length > 1 ? photolist[photolist.length - 1].node.imageID : "123456789";
		let timeStamp = photolist.length > 1 ? photolist[photolist.length - 1].node.timestamp : 0;
		console.log('스크롤이 바닥에 닿았습니다. '+lastID+ '이후의 사진을 로드합니다.');
		loadPhotosMilsec(15,timeStamp,lastID);
	};

	//네이티브 모듈 테스트
	const test = () => {
		const Native = Platform.OS=='ios'?NativeModules.RNCCameraRoll:NativeModules.PhotoListModule;		


		// Native.compressImage({imageFiles:selectedPhoto,quality:0.5,maxWidth:750*DP, maxHeight:750*DP})
		// 	.then(r=>console.log(r))
		// 	.catch(err => {
		// 	// console.log('cameraroll error===>' + err);
		// 	});
		navigation.push('Crop',{cropImage:selectedPhoto})
		console.log(selectedPhoto);


	};

	/** 이전 페이지에서 이미 선택한 사진이 있을 경우 선택한 것으로 표시 */
	// React.useEffect(() => {
	// 	exportUriList.splice(0);
	// 	if (props.route.params?.selectedImages?.length > 0) {
	// 		console.log('선택한 이미지가 있음');
	// 		exportUriList = props.route.params.selectedImages;
	// 		setSelectedPhoto(props.route.params.selectedImages.map(v => v));
	// 	} else {
	// 		console.log('선택한 이미지가 없음');
	// 		setSelectedPhoto([]);
	// 	}
	// }, []);

	/** 퍼미션 처리, 사진을 불러오기 전 갤러리 접근 권한을 유저에게 요청 */
	React.useEffect(() => {
		console.log('최초 로드')
		if (Platform.OS === 'ios') {
			loadPhotosMilsec();
		} else {
			try {
				console.log('안드로이드 OS확인');
				/** 외부 저장소 접근권한 */
				const isAllowExternalStorage = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

				PermissionsAndroid.check(isAllowExternalStorage).then(isPermit => {
					if (isPermit) {
						console.log('사진접근권한 허용확인');
						loadPhotosMilsec();
					} else {
						PermissionsAndroid.request(isAllowExternalStorage).then(permission => {
							console.log(permission);
							if (permission === 'granted') {
								console.log('저장공간 접근권한 확인');
								loadPhotosMilsec();
							} else {
								alert('기기의 사진 접근권한을 허용해 주세요');
							}
						});
					}
				});
			} catch (err) {
				console.warn(err);
			}
		}
	}, []);

	// React.useEffect(() => {
	// 	props.navigation.addListener('focus', () => {
	// 		// loadPhotos();
	// 		loadPhotosMilsec();
	// 	});
	// });

	const selectPhoto = photo => {
		if (isSingle) {
			exportUriList.splice(0);
			exportUriList.push(photo);
			setSelectedPhoto(exportUriList.map(v => v));
			return;
		}
		exportUriList.push(photo);
		setSelectedPhoto(exportUriList.map(v => v));
	};

	const cancelPhoto = photo => {
		if (isSingle) {
			exportUriList.splice(0);
			setSelectedPhoto(exportUriList.map(v => v));
			return;
		}
		exportUriList.forEach((v, i, a) => {
			if (v.uri === photo.uri) a.splice(i, 1);
		});
		setSelectedPhoto(exportUriList.map(v => v));
	};

	const renderList = ({item, index}) => {
		// if (index === 0) {
		// 	return <Photos isSingle={isSingle} isCamera navigation={props.navigation} />;
		// } else {
		// 	return <Photos isSingle={isSingle} data={item.node} onSelect={selectPhoto} onCancel={cancelPhoto} selectedList={selectedPhoto} />
		// }
		return (
			// <Photos isCamera={false} isSingle={isSingle} data={item.node} onSelect={selectPhoto} onCancel={cancelPhoto} selectedList={selectedPhoto} />
			<LocalMedia data={item.node} isSingleSelection={isSingle} onSelect={selectPhoto} onCancel={cancelPhoto} index={0} />
		);
		return (
			<View>
				<Text>{index}</Text>
			</View>
		);
	};

	const clickcheck = () => {
		// console.log(props.route.params);
		// console.log(exportUriList);
		// props.navigation.navigate(props.route.params?.navfrom,{})
		// props.navigation.navigate({ name: props.route.params.navfrom, params: { localSelectedImages: exportUriList[0] }, merge: true });
		// props.navigation.navigate({name: props.route.params?.navfrom, params: {image: exportUriList[0]}, merge: true});
		
		let lastID = photolist.length > 1 ? photolist[photolist.length - 1].node.imageID : "123456789";
		console.log('스크롤이 바닥에 닿았습니다. '+lastID+ '이후의 사진을 로드합니다.');
		loadPhotosMilsec(15,lastID);

		console.log(photolist);
	};

	return (
		<View style={lo.wrp_main}>
			{selectedPhoto[selectedPhoto.length - 1]?.isVideo ? (
				<View />
			) : (
				// <Video style={lo.box_img} source={{uri: selectedPhoto[selectedPhoto.length-1]?.uri}} muted />
				<Image style={[lo.box_img,{height:300*DP}]} source={{uri: selectedPhoto[selectedPhoto.length - 1]?.uri}} />
			)}
			<View style={lo.box_title}>
				<TouchableWithoutFeedback onPress={test}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={txt.noto36}>최근 항목</Text>
						<Bracket48 />
					</View>
				</TouchableWithoutFeedback>
				{isSingle && (
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto28b, txt.white]}>사진등록</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
			<FlatList
				contentContainerStyle={lo.box_photolist}
				data={photolist}
				renderItem={renderList}
				extraData={selectedPhoto}
				// columnWrapperStyle={{backgroundColor:'green',borderColor:'red',borderWidth:3*DP}}
				keyExtractor={(item,index) => index+item.node.timestamp+item.node?.image.uri}
				// keyExtractor={item => item.node.timestamp}
				horizontal={false}
				numColumns={4}
				onEndReachedThreshold={0.1}
				onEndReached={scrollReachBottom}
				// initialNumToRender={20}
				windowSize={6}
			/>
		</View>
	);
};

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	box_img: {
		height: 750 * DP,
		backgroundColor: 'gray',
	},
	box_title: {
		height: 102 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	box_photolist: {
		// flexDirection: 'row',

		justifyContent: 'space-between',
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

const btn = StyleSheet.create({
	confirm_button: {
		height: 70 * DP,
		width: 120 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		backgroundColor: APRI10,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		elevation: 2,
	},
});
