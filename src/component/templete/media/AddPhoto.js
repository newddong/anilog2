import React from 'react';
import {
	View,
	StyleSheet,
	Platform,
	PermissionsAndroid,
	Text,
	TouchableWithoutFeedback,
	Image,
	FlatList,
	NativeModules,
	Dimensions,
} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import CameraRoll from 'Root/module/CameraRoll';
// import { hasAndroidPermission } from './camerapermission';
// import { requestPermission, reqeustCameraPermission } from 'permission';
import LocalMedia from 'Molecules/media/LocalMedia';
import {Bracket48} from 'Atom/icon';
import FastImage from 'react-native-fast-image';
import Modal from 'Root/component/modal/Modal';
// import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Crop from 'Molecules/media/Crop';

export var exportUriList = []; //겔러리 속 사진들 로컬 주소
export var exportUri = {}; //겔러리 속 사진 로컬 주소

export default AddPhoto = props => {
	const limit = 5;
	const requestloading = 300;
	const navigation = useNavigation();
	const [isVideo, setVideo] = React.useState(false);
	const [photolist, setPhotoList] = React.useState([]);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const isSingle = props.route.name === 'SinglePhotoSelect';
	const [albumList, setAlbumList] = React.useState([]);
	const [album, setAlbum] = React.useState('');
	/**
	 * timeStamp, imageID를 이용하여 디바이스의 갤러리에 있는 미디어를 불러옴
	 *
	 *@param {number} timeStamp - 갤러리의 미디어를 불러올 기준 timeStamp (기본값 0)
	 *@param {String} imageID - 갤러리의 미디어를 불러올 기준 imageID (기본값 123456789)
	 *@param {number} request - 불러올 미디어의 숫자 (기본값 20)
	 *@param {string} type - 불러올 미디어의 타잎('Photos'|'All'|'Videos')
	 */
	const loadPhotosMilsec = (request = requestloading, timeStamp = 0, imageID = '123456789', type = 'Photos') => {
		console.log('아이디', imageID);
		let param = {
			first: request,
			toTime: timeStamp ? timeStamp * 1000 - 1 : 0,
			toID: imageID,
			assetType: type,
			include: ['playableDuration'],
			groupName: album,
		};
		if (Platform.OS == 'android') {
			delete param.fromTime;
			delete param.toTime;
		} else {
			delete param.toID;
		}
		CameraRoll.getPhotos(param)
			.then(photolistcallback)
			.catch(err => {
				// console.log('cameraroll error===>' + err);
			});
	};

	const photolistcallback = r => {
		// console.log('디바이스 사진 리스트', r);
		setPhotoList(photolist.concat(r.edges));
		// setSelectedPhoto(selectedPhoto);

		// let photoList = [...r.edges];
		// photoList.map((v, i) => {
		// 	photoList[i] = {
		// 		img_uri: v.node.image.uri,
		// 		state: false,
		// 	};
		// });
		// photoList.splice(0, 0, true); //목록 첫 인덱스는 Default Camera Icon (사진직접찍기 기능)
		// setPhotos(photoList);
	};

	/** 스크롤이 바닥에 닿을때 페이징 처리를 위한 함수 */
	const scrollReachBottom = () => {
		let lastID = photolist.length > 1 ? photolist[photolist.length - 1].node.imageID : '123456789';
		let timeStamp = photolist.length > 1 ? photolist[photolist.length - 1].node.timestamp : 0;
		console.log('스크롤이 바닥에 닿았습니다. ' + lastID + '이후의 사진을 로드합니다.');
		loadPhotosMilsec(requestloading, timeStamp, lastID);
	};

	//네이티브 모듈 테스트
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

	React.useEffect(()=>{
		console.log('앨범변경   '+album)
		let param = {
			first: requestloading,
			toTime: 0,
			toID: '123456789',
			assetType: 'Photos',
			include: ['playableDuration'],
			groupName: album,
		};
		if (Platform.OS == 'android') {
			delete param.fromTime;
			delete param.toTime;
		} else {
			delete param.toID;
		}
		CameraRoll.getPhotos(param)
			.then(r=>{
				setPhotoList(r.edges);

			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});
		
	},[album])

	const albumSelect = () => {
		Modal.popSelectBoxModal2(
			albumList,
			album => {setAlbum(album);Modal.close()},
			e => console.log('close', e),
			false,
			'사진첩 선택',
			Dimensions.get('window').height / 2,
		);
	};

	/** 퍼미션 처리, 사진을 불러오기 전 갤러리 접근 권한을 유저에게 요청 */
	React.useEffect(() => {
		console.log('최초 로드');
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

	React.useEffect(() => {
		CameraRoll.getAlbums({albumType: 'All', assetType: 'Photos'}).then(r => setAlbumList(r.map(v => v.title)));
	}, []);

	React.useEffect(() => {
		console.log('사진목록 변경', selectedPhoto);
		navigation.setParams({selectedPhoto: selectedPhoto});
	}, [selectedPhoto]);

	React.useEffect(() => {
		console.log('selectedPhoto', props.route.params);
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			setSelectedPhoto(props.route.params.selectedPhoto);
		}
	}, [props.route.params.selectedPhoto]);

	// React.useEffect(()=>{
	// 	if(props.route.params.selectedPhoto&&props.route.params.selectedPhoto.length>0){
	// 		setSelectedPhoto(selectedPhoto.concat(props.route.params.selectedPhoto));
	// 	}
	// },[photolist])

	const selectPhoto = photo => {
		console.log('photo select', photo);
		if (selectedPhoto.length >= limit) {
			Modal.alert('사진은 ' + limit + '개 까지 선택가능합니다.');
			return;
		}
		let obj = {};
		obj.uri = photo;
		if (isSingle) {
			setSelectedPhoto([obj]);
			// navigation.push('Crop',{cropImage:photo,prev:props.route.name,key:props.route.key});
		} else {
			setSelectedPhoto(selectedPhoto.concat(obj));
		}
	};

	const cancelPhoto = photo => {
		console.log('cancel select', photo);
		if (isSingle) {
			setSelectedPhoto([]);
		} else {
			setSelectedPhoto(selectedPhoto.filter(v => photo != (v.originUri ?? v.uri)));
		}
	};

	const renderList = ({item, index}) => {
		const isSelected = selectedPhoto.find(v => item.node.image.uri == (v.originUri ?? v.uri));
		const selectedindex = selectedPhoto.findIndex(v => item.node.image.uri == (v.originUri ?? v.uri)) + 1;
		// console.log('index:'+index+'   isselected:'+isSelected+'     selectedIndex:'+selectedindex);
		return (
			<LocalMedia
				data={item.node}
				isSingleSelection={isSingle}
				onSelect={selectPhoto}
				onCancel={cancelPhoto}
				index={selectedindex}
				selected={isSelected}
			/>
		);
	};

	const clickcheck = () => {
		// console.log(props.route.params);
		// console.log(exportUriList);
		// props.navigation.navigate(props.route.params?.navfrom,{})
		// props.navigation.navigate({ name: props.route.params.navfrom, params: { localSelectedImages: exportUriList[0] }, merge: true });
		// props.navigation.navigate({name: props.route.params?.navfrom, params: {image: exportUriList[0]}, merge: true});

		// let lastID = photolist.length > 1 ? photolist[photolist.length - 1].node.imageID : "123456789";
		// console.log('스크롤이 바닥에 닿았습니다. '+lastID+ '이후의 사진을 로드합니다.');
		// loadPhotosMilsec(15,lastID);
		console.log(selectedPhoto);
		// console.log(photolist);
	};

	const onCrop = (originImg, cropImg) => {
		if (originImg == cropImg) {
			delete selectedPhoto[selectedPhoto.length - 1].cropUri;
		} else {
			selectedPhoto[selectedPhoto.length - 1].cropUri = cropImg;
		}
	};

	return (
		<View style={lo.wrp_main}>
			{selectedPhoto[selectedPhoto.length - 1]?.isVideo ? (
				<View />
			) : (
				// <Video style={lo.box_img} source={{uri: selectedPhoto[selectedPhoto.length-1]?.uri}} muted />
				<View>
					{selectedPhoto.length > 0 ? (
						<Crop
							width={750 * DP}
							height={750 * DP}
							paddingHorizontal={0 * DP}
							paddingVertical={0 * DP}
							uri={selectedPhoto[selectedPhoto.length - 1].uri}
							onCrop={onCrop}
						/>
					) : (
						false
					)}
				</View>
			)}
			<View style={lo.box_title}>
				<TouchableWithoutFeedback onPress={albumSelect}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={txt.noto36}>{album.length > 0 ? album : '모든사진'}</Text>
						<View style={{paddingTop:10*DP}}>
						<Bracket48 /></View>
					</View>
				</TouchableWithoutFeedback>
				{isSingle && false && (
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto28b, txt.white]}>사진등록</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
			<FlatList
				getItemLayout={(data, index) => {
					return {length: 187 * DP, offset: 187 * DP * index, index};
				}}
				data={photolist}
				renderItem={renderList}
				extraData={selectedPhoto}
				keyExtractor={(item, index) => (index >= 8 ? item.node.image.uri : 'key' + index)}
				horizontal={false}
				numColumns={4}
				onEndReachedThreshold={0.6}
				onEndReached={scrollReachBottom}
				windowSize={5}
			/>
		</View>
	);
};

//안드로이드에서 FastImage를 사용하도록하는 커스텀 컴포넌트
const Img = React.forwardRef((props, ref) => {
	if (Platform.OS == 'ios') {
		return <Image {...props} ref={ref}></Image>;
	}
	if (Platform.OS == 'android') {
		return <FastImage {...props} ref={ref}></FastImage>;
	}
});

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
		width: 750 * DP,
		height: 102 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
		backgroundColor: '#fff',
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
