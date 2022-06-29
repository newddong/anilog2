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
import appConfig from 'Root/config/appConfig';

export var exportUriList = []; //겔러리 속 사진들 로컬 주소
export var exportUri = {}; //겔러리 속 사진 로컬 주소

export default AddPhoto = props => {
	const limit = 5;
	const requestloading = Platform.OS == 'android' ? 100000 : 50;
	const navigation = useNavigation();
	const [isVideo, setVideo] = React.useState(false);
	// const [photolist, setPhotoList] = React.useState(props.route.params.localfiles.slice(0,100));
	const [photolist, setPhotoList] = React.useState(appConfig.medias);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const isSingle = props.route.name === 'SinglePhotoSelect';
	const [albumList, setAlbumList] = React.useState([]);
	const [album, setAlbum] = React.useState('');
	const flatlist = React.useRef();
	const lastIndex = React.useRef(0);
	const viewCount = 100;
	/**
	 * timeStamp, imageID를 이용하여 디바이스의 갤러리에 있는 미디어를 불러옴
	 *
	 *@param {number} timeStamp - 갤러리의 미디어를 불러올 기준 timeStamp (기본값 0)
	 *@param {String} imageID - 갤러리의 미디어를 불러올 기준 imageID (기본값 123456789)
	 *@param {number} request - 불러올 미디어의 숫자 (기본값 20)
	 *@param {string} type - 불러올 미디어의 타잎('Photos'|'All'|'Videos')
	 */
	const loadPhotosMilsec = (request = requestloading, timeStamp = 0, imageID = '123456789', type = 'All') => {
		// console.log('아이디', imageID);
		let param = {
			first: request,
			toTime: timeStamp ? timeStamp * 1000 - 1 : 0,
			toID: imageID,
			assetType: type,
			include: ['playableDuration'],
			groupName: album,
			groupTypes: 'album',
		};
		if (Platform.OS == 'android') {
			delete param.fromTime;
			delete param.toTime;
			delete param.groupTypes;
		} else {
			delete param.toID;
		}
		if (album.length == 0) {
			delete param.groupName;
			delete param.groupTypes;
		}
		delete param.include;
		let start = new Date();
		// console.time('loadphoto')
		// CameraRoll.getPhotos(param)
		// 	.then((r)=>{
		// 		setPhotoList(r.edges);
		// 		console.log(new Date()-start);
		// 	})
		// 	.catch(err => {
		// 		// console.log('cameraroll error===>' + err);
		// 	});
	};



	const mediaList = React.useRef([]);
	const photolistcallback = r => {
		setPhotoList(r.edges);
		mediaList.current = r.edges;
		// console.log('로드 완료',r.edges , mediaList);
		// console.timeEnd('loadphoto')
	};

	/** 스크롤이 바닥에 닿을때 페이징 처리를 위한 함수 */
	const scrollReachBottom = () => {
		// FastImage.clearMemoryCache();
		// let last = photolist.length;
		// let blank = Array.from({length:last},v=>false)
		// setPhotoList(photolist.concat(props.route.params.localfiles.slice(last,last+300)))
	};

	const onMomentumscrollbegin = () => {
		// console.log('begin')
		FastImage.clearMemoryCache().then(()=>console.log('clear'));
	}
	const onScroll =e => {
		// console.log(e.nativeEvent)
		// FastImage.clearMemoryCache();
		// if(Math.abs(e.nativeEvent.velocity.y)>10){
		// 	console.log('clear')
		// 	FastImage.clearMemoryCache();
		// }
	}

	const onViewableItemsChanged = React.useCallback((a,b) => {
		// console.log('view',a)
		// if(a.changed.length>30){
		// 	console.log('clear')
		// 	FastImage.clearMemoryCache();
		// }
	},[]);

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

	React.useEffect(() => {
		console.log('앨범변경   ' + album);
		let param = {
			first: requestloading,
			toTime: 0,
			toID: '123456789',
			assetType: 'Photos',
			include: ['playableDuration'],
			groupName: album,
			groupTypes: 'album',
		};
		if (Platform.OS == 'android') {
			delete param.fromTime;
			delete param.toTime;
			delete param.groupTypes;
		} else {
			delete param.toID;
		}
		if (album.length == 0) {
			delete param.groupName;
			delete param.groupTypes;
		}
		/*
		CameraRoll.getPhotos(param)
			.then(album => {
				// setPhotoList([...album.edges]);
				// setPhotoList(album.edges);
				// console.log(album);
			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});*/
	}, [album]);

	const albumSelect = () => {
		Modal.popSelectBoxModal2(
			albumList,
			album => {
				setAlbum(album == '모든사진' ? '' : album);
				Modal.close();
			},
			e => console.log('close', e),
			false,
			'사진첩 선택',
			500 * DP,
		);
	};

	/** 퍼미션 처리, 사진을 불러오기 전 갤러리 접근 권한을 유저에게 요청 */
	React.useEffect(() => {
		console.log('최초 로드');
		CameraRoll.getAlbums({albumType: 'All', assetType: 'All'}).then(r => setAlbumList(['모든사진'].concat(r.map(v => v.title))));
		if (Platform.OS === 'ios') {
			loadPhotosMilsec(40);
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
		console.log('사진목록 변경', selectedPhoto);
		navigation.setParams({selectedPhoto: selectedPhoto});
		selectedPhoto.length>0&&flatlist.current.scrollToIndex({index:Math.floor(photolist.findIndex(v=>v.node.image.uri==selectedPhoto[selectedPhoto.length-1].uri)/4)});
	}, [selectedPhoto]);

	React.useEffect(() => {
		
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			console.log('ddd',selectedPhoto)
			setSelectedPhoto(props.route.params.selectedPhoto);
		}
	}, [props.route.params.selectedPhoto]);
	const selectPhoto = React.useCallback(photo => {
		// console.log(photolist.findIndex(v=>v.node.image.uri==photo));
		console.log(photo);
		
		if (selectedPhoto.length >= limit) {
			Modal.alert('사진은 최대 ' + limit + '장까지만 업로드 가능합니다.');
			return;
		}
		let obj = {};
		obj.uri = photo;
		if (isSingle) {
			setSelectedPhoto([obj]);
			// navigation.push('Crop',{cropImage:photo,prev:props.route.name,key:props.route.key});
		} else {
			console.log('ddd2',selectedPhoto)
			
			setSelectedPhoto(selectedPhoto.concat(obj));
		}

	},[selectedPhoto])

	const cancelPhoto = photo => {
		console.log('cancel select', photo);
		if (isSingle) {
			setSelectedPhoto([]);
		} else {
			setSelectedPhoto(selectedPhoto.filter(v => photo != (v.originUri ?? v.uri)));
		}
	}

	const renderList = React.useCallback(({item, index}) => {
		const isSelected = selectedPhoto.find(v => item.node.image.uri == (v.originUri ?? v.uri));
		const selectedindex = isSelected&&(selectedPhoto.findIndex(v => item.node.image.uri == (v.originUri ?? v.uri)) + 1);
		// console.log('index:'+index+'   isselected:'+isSelected+'     selectedIndex:'+selectedindex);
		if(!true)return <View style={{width:186*DP,height:186*DP,backgroundColor:'red',marginHorizontal:1*DP,marginVertical:1*DP}}/>;
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
	},[photolist,selectedPhoto]);

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

	const loadVideo = () => {

	}

	const keyExtractor = React.useCallback((item, index) =>item? index >= 8 ? item.node.image.uri : 'key' + index:'null'+index,[photolist])
	const getItemLayout = React.useCallback((data, index) => {
		return {length: 187 * DP, offset: 187 * DP * index, index};
	},[photolist])
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
						<View style={{paddingTop: 10 * DP}}>
							<Bracket48 />
						</View>
					</View>
				</TouchableWithoutFeedback>
				{isSingle && false && (
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto28b, txt.white]}>사진등록</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
				{(
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto28b, txt.white]}>동영상</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
			<FlatList
				getItemLayout={getItemLayout}
				data={photolist}
				renderItem={renderList}
				extraData={selectedPhoto}
				keyExtractor={keyExtractor}
				horizontal={false}
				numColumns={4}
				onEndReachedThreshold={0.6}
				onEndReached={scrollReachBottom}
				onMomentumScrollBegin={onMomentumscrollbegin}
				windowSize={2}
				maxToRenderPerBatch={100}
				updateCellsBatchingPeriod={1}
				initialNumToRender={100}
				removeClippedSubviews
				decelerationRate={0.8}
				ref={flatlist}
				viewabilityConfig={{minimumViewTime:0,viewAreaCoveragePercentThreshold:0}}
				onViewableItemsChanged={onViewableItemsChanged}
				onScroll={onScroll}
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
