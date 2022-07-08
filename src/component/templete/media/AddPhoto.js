import React from 'react';
import {
	View,
	StyleSheet,
	Platform,
	PermissionsAndroid,
	Text,
	TouchableWithoutFeedback,
	TouchableOpacity,
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
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Crop from 'Molecules/media/Crop';
import appConfig from 'Root/config/appConfig';
import PermissionIos from 'Root/module/PermissionIos';
import {PERMISSION_IOS_STATUS} from 'Root/module/PermissionIosStatics';
import VideoEditor from 'Root/module/VideoEditor.js';

export default AddPhoto = props => {
	const limit = 5;
	const requestloading = Platform.OS == 'android' ? 300 : 50;
	const navigation = useNavigation();
	const [photolist, setPhotoList] = React.useState([]);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const isSingle = props.route.name === 'SinglePhotoSelect';
	const [albumList, setAlbumList] = React.useState([]);
	const [album, setAlbum] = React.useState('');
	const flatlist = React.useRef();
	const lastIndex = React.useRef(0);
	const viewCount = 100;
	const [index, setIndex] = React.useState(0);
	/**
	 * timeStamp, imageID를 이용하여 디바이스의 갤러리에 있는 미디어를 불러옴
	 *
	 *@param {number} timeStamp - 갤러리의 미디어를 불러올 기준 timeStamp (기본값 0)
	 *@param {String} imageID - 갤러리의 미디어를 불러올 기준 imageID (기본값 123456789)
	 *@param {number} request - 불러올 미디어의 숫자 (기본값 20)
	 *@param {string} type - 불러올 미디어의 타잎('Photos'|'All'|'Videos')
	 */
	const loadPhotosMilsec = (request = requestloading, timeStamp = 0, imageID = '123456789', type = props.route.params.types ?? 'Photos') => {
		let param = {
			first: request,
			toTime: timeStamp ? timeStamp * 1000 - 1 : 0,
			toID: imageID,
			assetType: type,
			include: ['playableDuration'],
			groupName: album,
			groupTypes: 'all',
		};
		if (Platform.OS == 'android') {
			delete param.fromTime;
			delete param.toTime;
			delete param.groupTypes;
			delete param.include;
		} else {
			delete param.toID;
		}
		if (album.length == 0) {
			delete param.groupName;
			delete param.groupTypes;
		}

		let start = new Date();
		CameraRoll.getPhotos(param)
			.then(r => {
				photolistcallback(r);
				console.log('미디어 파일 로드 시간(ms)', new Date() - start);
			})
			.catch(err => {
				// console.log('cameraroll error===>' + err);
			});
	};
	const photolistcallback = r => {
		// setPhotoList(r.edges);
		setPhotoList(photolist.concat(r.edges));
	};

	/** 스크롤이 바닥에 닿을때 페이징 처리를 위한 함수 */
	const scrollReachBottom = () => {
		FastImage.clearMemoryCache();
		let last = photolist.length;
		// let blank = Array.from({length:last},v=>false)
		// setPhotoList(photolist.concat(props.route.params.localfiles.slice(last,last+300)))
		let timeStamp = Platform.OS == 'ios' ? photolist[last - 1].node.timestamp : 0;
		let imageID = Platform.OS == 'android' ? photolist[last - 1].node.imageID : '123456789';
		loadPhotosMilsec(requestloading, timeStamp, imageID);
	};

	const onMomentumscrollbegin = () => {
		// console.log('begin')
		FastImage.clearMemoryCache().then(() => console.log('clear'));
	};
	const onScroll = e => {
		// console.log(e.nativeEvent)
		// FastImage.clearMemoryCache();
		// if(Math.abs(e.nativeEvent.velocity.y)>10){
		// 	console.log('clear')
		// 	FastImage.clearMemoryCache();
		// }
	};

	const onViewableItemsChanged = React.useCallback((a, b) => {
		// console.log('view',a)
		// if(a.changed.length>30){
		// 	console.log('clear')
		// 	FastImage.clearMemoryCache();
		// }
	}, []);

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

		CameraRoll.getPhotos(param)
			.then(album => {
				setPhotoList(album.edges);
			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});
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
		FastImage.preload(photolist.map(v => ({uri: v.node.image.uri})));
		CameraRoll.getAlbums({albumType: 'All', assetType: 'All'}).then(r => setAlbumList(['모든사진'].concat(r.map(v => v.title))));
		if (Platform.OS === 'ios') {
			PermissionIos.checkPermission()
				.then(status => {
					console.log('사진접근권한 확인:', status);
					if (status == PERMISSION_IOS_STATUS.NotDetermined) {
						PermissionIos.requestPermission().then(statusAfterRequest => {
							console.log('권한 요청 후: ', statusAfterRequest);
							if (statusAfterRequest == PERMISSION_IOS_STATUS.Authorized) {
								loadPhotosMilsec();
							} else {
								//!!이미 권한 요청했는데 허가하지 않았으므로 사진추가 창을 닫아야 합니다. 이쪽에 사진추가 창 닫는 거 추가해주세요!
							}
						});
					} else if (status != PERMISSION_IOS_STATUS.Authorized) {
						PermissionIos.popupAlert(PermissionIos.getDefaultAlertParams());
						//!!설정에서 사용자가 변경했는지 다시 체크하기보다는 사진추가를 다시 누르게 하는 게 맞지 않을까 싶습니다. 이쪽에 사진추가 창 닫는 거 추가해주세요!
						//설정을 바꾸고 앱에 들어오면 자동으로 앱이 리로드되며 로그인 창으로 돌아가지만, 설정을 바꾸지 않으면 글쓰기 창에 남아있어야 합니다.
					} else {
						loadPhotosMilsec();
					}
				})
				.catch(err => {
					console.warn(err);
				});
		} else {
			try {
				console.log('안드로이드 OS확인');
				/** 외부 저장소 접근권한 */
				const isAllowExternalStorage = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
				PermissionsAndroid.check(isAllowExternalStorage).then(isPermit => {
					console.log('Write 권한 퍼미션', isPermit);
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
		navigation.setParams({selectedPhoto: selectedPhoto});
		console.log('선택사진 목록', selectedPhoto);
		// selectedPhoto.length>0?setIndex(selectedPhoto.length-1):setIndex(0);
		// 	let index = selectedPhoto.length>0&&photolist.findIndex(v=>v.node.image.uri==selectedPhoto[selectedPhoto.length-1].uri)/4;
		// 	index>0&&selectedPhoto.length>0&&flatlist.current.scrollToIndex({index:Math.floor(index)});
	}, [selectedPhoto]);

	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			setSelectedPhoto(props.route.params.selectedPhoto);
			setIndex(props.route.params.selectedPhoto.length - 1);
		}
	}, [props.route.params.selectedPhoto]);

	const selectPhoto = (photo, duration) => {
		// console.log('사진선택',photo,duration);
		if (selectedPhoto.length >= limit) {
			Modal.alert('사진은 최대 ' + limit + '장까지만 업로드 가능합니다.');
			return;
		}
		let obj = {};
		obj.uri = photo.image.uri;
		obj.videoUri = photo.image.videoUri;
		obj.isVideo = photo.type.includes('video');
		obj.duration = duration;
		if (isSingle) {
			setSelectedPhoto([obj]);
			// navigation.push('Crop',{cropImage:photo,prev:props.route.name,key:props.route.key});
		} else {
			setSelectedPhoto(selectedPhoto.concat(obj));
		}
		setIndex(selectedPhoto.length);
	};

	const cancelPhoto = photo => {
		console.log('cancel select', photo);
		if (isSingle) {
			setSelectedPhoto([]);
		} else {
			setSelectedPhoto(selectedPhoto.filter(v => photo != (v.originUri ?? v.uri)));
		}
		setIndex(selectedPhoto.length - 2);
	};

	const renderList = ({item, index}) => {
		const isSelected = selectedPhoto.some(v => item.node.image.uri == (v.originUri ?? v.uri));
		const selectedindex = isSelected && selectedPhoto.findIndex(v => item.node.image.uri == (v.originUri ?? v.uri)) + 1;
		// console.log('index:'+index+'   isselected:'+isSelected+'     selectedIndex:'+selectedindex);
		// console.log('item',index,isSelected)
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

	const keyExtractor = React.useCallback((item, index) => (item ? item.node.image.uri : 'null' + index), [photolist]);
	const getItemLayout = React.useCallback(
		(data, index) => {
			return {length: 187 * DP, offset: 187 * DP * index, index};
		},
		[photolist],
	);

	const onCrop = (originImg, cropImg) => {
		console.log(selectedPhoto);
		setSelectedPhoto(selectedPhoto.map((v,i)=>{
			if(v.uri==originImg){
				setIndex(i);
				return {...v,cropUri:cropImg}
			}else{
				return v;
			}
		}))
		
	};

	const next = () => {
		let idx = 0;
		if (selectedPhoto.length < 1) return;
		if (index + 1 > selectedPhoto.length - 1) {
			idx = photolist.findIndex(v => v.node.image.uri == (selectedPhoto[0].originUri ?? selectedPhoto[0].uri)) / 4;
			setIndex(0);
		} else {
			idx = photolist.findIndex(v => v.node.image.uri == (selectedPhoto[index + 1].originUri ?? selectedPhoto[index + 1].uri)) / 4;
			setIndex(index + 1);
		}
		if (idx < 0) return;
		flatlist.current.scrollToIndex({index: Math.floor(idx)});
	};
	const prev = () => {
		if (selectedPhoto.length < 1) return;
		let idx = selectedPhoto.length - 1;
		if (index - 1 < 0) {
			idx =
				photolist.findIndex(
					v => v.node.image.uri == (selectedPhoto[selectedPhoto.length - 1].originUri ?? selectedPhoto[selectedPhoto.length - 1].uri),
				) / 4;
			setIndex(selectedPhoto.length - 1);
		} else {
			idx = photolist.findIndex(v => v.node.image.uri == (selectedPhoto[index - 1].originUri ?? selectedPhoto[index - 1].uri)) / 4;
			setIndex(index - 1);
		}
		if (idx < 0) return;
		flatlist.current.scrollToIndex({index: Math.floor(idx)});
	};

	const videoEdit = () => {
		console.log(selectedPhoto[index]);
		let media = selectedPhoto[index];

		VideoEditor.unlockLicense();
		VideoEditor.openVideoEditor(media.videoUri ?? media.uri, media.duration, 15, 60, 'aniMov')
			.then(r => {
				console.log(r);
				media.videoUri = r.video;
				setSelectedPhoto([...selectedPhoto]);
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<View style={lo.wrp_main}>
			{selectedPhoto[index] ? (
				selectedPhoto[index].isVideo || selectedPhoto[index].is_video ? (
					<View>
						<Video
							style={{width: 750 * DP, height: 750 * DP, backgroundColor: '#000'}}
							source={{uri: selectedPhoto[index]?.videoUri ?? selectedPhoto[index]?.uri}}
							// source={{uri: selectedPhoto[index]?.videoUri}}
							muted
							resizeMode="contain"
						/>
						{selectedPhoto[index] && !selectedPhoto[index].uri.includes('gif') && !selectedPhoto[index].uri.includes('http') && (
							<View
								style={{position: 'absolute', width: 100 * DP, height: 100 * DP, backgroundColor: 'red', bottom: 0, right: 0}}
								onStartShouldSetResponder={() => true}
								onResponderGrant={() => {
									videoEdit();
								}}></View>
						)}
					</View>
				) : (
					<React.Fragment key={selectedPhoto.length+(selectedPhoto.reduce((a,c)=>{return a+c.cropUri?1:0},0))+index}>
						<Crop
							width={750 * DP}
							height={750 * DP}
							paddingHorizontal={0 * DP}
							paddingVertical={0 * DP}
							photo={selectedPhoto[index]}
							onCrop={onCrop}
						/>
					</React.Fragment>
				)
			) : (
				false
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
				{isSingle ||
					(true && (
						<TouchableWithoutFeedback onPress={clickcheck}>
							<View style={[btn.confirm_button, btn.shadow]}>
								<Text style={[txt.noto28b, txt.white]}>사진등록</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
				{/* {(
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto28b, txt.white]}>동영상</Text>
						</View>
					</TouchableWithoutFeedback>
				)} */}

				<TouchableOpacity onPress={prev}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto28b, txt.white]}>이전</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={next}>
					<View style={[btn.confirm_button, btn.shadow]}>
						<Text style={[txt.noto28b, txt.white]}>다음</Text>
					</View>
				</TouchableOpacity>
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
				windowSize={Platform.OS == 'ios' ? 3 : 1.5}
				maxToRenderPerBatch={30}
				updateCellsBatchingPeriod={0}
				initialNumToRender={30}
				removeClippedSubviews
				decelerationRate={0.7}
				ref={flatlist}
				viewabilityConfig={{minimumViewTime: 0, viewAreaCoveragePercentThreshold: 0}}
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
