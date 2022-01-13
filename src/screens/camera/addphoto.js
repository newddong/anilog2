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
	Alert,
	FlatList,
} from 'react-native';
import { BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK, LINK, WHITE, RED, GRAY_TXT_INPUT } from 'Screens/color';
import { CameraIconWhite, LocationPinIcon, PawIcon, DownBracketBlack, DownBracketGray } from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import { TabContext } from 'tabContext';
import CameraRoll from '@react-native-community/cameraroll';
import { hasAndroidPermission } from './camerapermission';
import { requestPermission, reqeustCameraPermission } from 'permission';
import Photos from './photos';
import FastImage from 'react-native-fast-image';
// import Video from 'react-native-video';

export var exportUriList = []; //겔러리 속 사진들 로컬 주소
export var exportUri = {}; //겔러리 속 사진 로컬 주소

export default AddPhoto = props => {
	return <TabContext.Consumer>{({ tabVisible }) => <AddPhotoInner tabVisible={tabVisible} {...props} />}</TabContext.Consumer>;
};

const AddPhotoInner = props => {
	const count = React.useRef({ count: 0, cursor: 0, subscriber: [] }).current;
	const uriList = React.useRef([]).current; //겔러리 속 사진들 로컬 주소
	const page = React.useRef(0);
	const selectedUri = React.useRef(); //겔러리 속 사진들 로컬 주소
	const lasttoggle = React.useRef(() => { });

	const [isVideo, setVideo] = React.useState(false);
	const [photolist, setPhotoList] = React.useState([{ node: { uri: '' } }]);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const [last_selected_uri, setLastSelectedUri] = React.useState('');
	const isSingle = props.route.name === 'AddSinglePhoto';

	const loadPhotos = page_info => {
		const RequestNum = 200;
		CameraRoll.getPhotos({
			first: RequestNum,
			after: page_info ? page_info.end_cursor : '0',
			assetType: 'All',
			include: ['playableDuration'],
		})
			.then(r => {
				page.current = r.page_info;
				console.log('photolist  ' + JSON.stringify(r));
				setPhotoList(photolist.concat(r.edges));
			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});
	};

	const loadPhotosMilsec = (lastTimeStamp) => {
		const RequestNum = 100;
		console.log('lasttimestamp       ' + lastTimeStamp);
		CameraRoll.getPhotos({
			first: RequestNum,
			toTime: lastTimeStamp ? (lastTimeStamp - 1) * 1000 : 0,
			assetType: 'All',
			include: ['playableDuration'],
		})
			.then(r => {
				page.current = r.page_info;
				// console.log('photolist  '+ JSON.stringify(r));
				setPhotoList(photolist.concat(r.edges));
			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});
	}

	const scrollReachBottom = () => {
		// loadPhotos(page.current);
		console.log('scrolllist bottom   ' + JSON.stringify(photolist));

		loadPhotosMilsec(photolist[photolist.length - 1].node.timestamp);
	};
	const test = () => {
		// console.log(props.route.params);
		console.log(selectedPhoto);
	};

	React.useEffect(() => {
		exportUriList.splice(0);
		if (props.route.params.selectedImages?.length > 0) {
			console.log('선택한 이미지가 있음');
			exportUriList = props.route.params.selectedImages;
			setSelectedPhoto(props.route.params.selectedImages.map(v => v));
		} else {
			console.log('선택한 이미지가 없음');
			setSelectedPhoto([]);
		}
		props.tabVisible(false);
	}, []);

	React.useEffect(() => {
		if (Platform.OS === 'ios') {
			// loadPhotos();
			loadPhotosMilsec();
		} else {
			try {
				const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
				PermissionsAndroid.check(permission).then(isPermit => {
					if (isPermit) {
						// loadPhotos();
						loadPhotosMilsec();
					} else {
						PermissionsAndroid.request(permission).then(result => {
							console.log(result);
							if (result === 'granted') {
								// loadPhotos();
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
		props.navigation.addListener('focus', () => {
			// loadPhotos();
			loadPhotosMilsec();
		});
	});

	const renderList = ({ item, index }) => {
		if (index === 0) {
			return <Photos isSingle={isSingle} isCamera navigation={props.navigation} />;
		} else {
			// return <Photos isSingle={isSingle} data={item.node} onPress={isSingle ? singleitemClick : itemClick} index={index} />
			return <Photos isSingle={isSingle} data={item.node} onSelect={selectPhoto} onCancel={cancelPhoto} selectedList={selectedPhoto} />
		}
	};

	const selectPhoto = (photo) => {
		if (isSingle) {
			exportUriList.splice(0);
			exportUriList.push(photo);
			setSelectedPhoto(exportUriList.map(v => v));
			return;
		}
		exportUriList.push(photo);
		setSelectedPhoto(exportUriList.map(v => v));
	}

	const cancelPhoto = (photo) => {
		if (isSingle) {
			exportUriList.splice(0);
			setSelectedPhoto(exportUriList.map(v => v));
			return;
		}
		exportUriList.forEach((v, i, a) => {
			if (v.uri === photo.uri) a.splice(i, 1);
		});
		setSelectedPhoto(exportUriList.map(v => v));
	}

	const clickcheck = () => {
		// console.log(props.route.params);
		// console.log(exportUriList);
		// props.navigation.navigate(props.route.params?.navfrom,{})
		props.navigation.navigate({ name: props.route.params.navfrom, params: { localSelectedImages: exportUriList[0] }, merge: true });
		// props.navigation.navigate({name: props.route.params?.navfrom, params: {image: exportUriList[0]}, merge: true});
	};

	return (
		<View style={lo.wrp_main}>
			{selectedPhoto[selectedPhoto.length - 1]?.isVideo ? (
				<View />
				// <Video style={lo.box_img} source={{uri: selectedPhoto[selectedPhoto.length-1]?.uri}} muted />
			) : (
				<Image style={lo.box_img} source={{ uri: selectedPhoto[selectedPhoto.length - 1]?.uri }} />
			)}
			<View style={lo.box_title}>
				<TouchableWithoutFeedback onPress={test}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={txt.noto36r}>최근 항목</Text>
						<SvgWrapper style={{ height: 12 * DP, width: 20 * DP, marginLeft: 14 * DP }} svg={<DownBracketBlack />} />
					</View>
				</TouchableWithoutFeedback>
				{isSingle && (
					<TouchableWithoutFeedback onPress={clickcheck}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>사진등록</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
			<FlatList
				contentContainerStyle={lo.box_photolist}
				data={photolist}
				renderItem={renderList}
				extraData={selectedPhoto}
				// keyExtractor={item => item.node?.image.uri}
				keyExtractor={item => item.node.timestamp}
				horizontal={false}
				numColumns={4}
				onEndReachedThreshold={0.6}
				onEndReached={scrollReachBottom}
				initialNumToRender={20}
				windowSize={3}

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
		// flexWrap: 'wrap',
		// justifyContent: 'space-between',
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
		backgroundColor: MAINCOLOR,
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
