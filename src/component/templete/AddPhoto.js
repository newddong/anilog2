import React from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid, Text, TouchableWithoutFeedback, Image, FlatList} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import CameraRoll from '@react-native-community/cameraroll';
// import { hasAndroidPermission } from './camerapermission';
// import { requestPermission, reqeustCameraPermission } from 'permission';
import Photos from 'Molecules/Photos';
import LocalMedia from 'Molecules/LocalMedia';
import {DownBracketBlack} from 'Asset/image';
import SvgWrapper from 'Screens/svgwrapper';
import {Bracket48} from '../atom/icon';
// import FastImage from 'react-native-fast-image';
// import Video from 'react-native-video';

export var exportUriList = []; //겔러리 속 사진들 로컬 주소
export var exportUri = {}; //겔러리 속 사진 로컬 주소

export default AddPhoto = props => {
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
			},
		},
	]);
	const [selectedPhoto, setSelectedPhoto] = React.useState([]);
	const isSingle = props.route.name === 'SinglePhotoSelect';

	/**
	 * timeStamp를 이용하여 디바이스의 갤러리에 있는 미디어를 불러옴
	 *
	 *@param {number} timeStamp - 갤러리의 미디어를 불러올 기준 timeStamp (기본값 0)
	 *@param {number} request - 불러올 미디어의 숫자 (기본값 20)
	 *@param {string} type - 불러올 미디어의 타잎('Photos'|'All'|'Videos')
	 */
	const loadPhotosMilsec = (request = 99, timeStamp = 0, type = 'All') => {
		CameraRoll.getPhotos({
			first: request,
			toTime: timeStamp ? timeStamp * 1000 - 1 : 0,
			assetType: type,
			include: ['playableDuration'],
		})
			.then(r => {
				console.log('디바이스 사진 리스트', JSON.stringify(r));
				// console.log('photolist  '+ JSON.stringify(r));
				// setPhotoList(photolist.concat(r.edges));
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
				console.log('포토리스트', JSON.stringify(photoList));
				setPhotos(photoList);
			})
			.catch(err => {
				console.log('cameraroll error===>' + err);
			});
	};

	/** 스크롤이 바닥에 닿을때 페이징 처리를 위한 함수 */
	const scrollReachBottom = () => {
		// loadPhotos(page.current);
		console.log('scrolllist bottom   ' + JSON.stringify(photolist));
		let timeStamp = photolist.length > 0 ? photolist[photolist.length - 1].node.timestamp : 0;
		loadPhotosMilsec(timeStamp);
	};

	const test = () => {
		// console.log(props.route.params);
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
		if (Platform.OS === 'ios') {
			loadPhotosMilsec();
		} else {
			try {
				/** 외부 저장소 접근권한 */
				const isAllowExternalStorage = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

				PermissionsAndroid.check(isAllowExternalStorage).then(isPermit => {
					if (isPermit) {
						loadPhotosMilsec();
					} else {
						PermissionsAndroid.request(isAllowExternalStorage).then(permission => {
							console.log(permission);
							if (permission === 'granted') {
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
		console.log(JSON.stringify(photolist));
	};

	return (
		<View style={lo.wrp_main}>
			{selectedPhoto[selectedPhoto.length - 1]?.isVideo ? (
				<View />
			) : (
				// <Video style={lo.box_img} source={{uri: selectedPhoto[selectedPhoto.length-1]?.uri}} muted />
				<Image style={lo.box_img} source={{uri: selectedPhoto[selectedPhoto.length - 1]?.uri}} />
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
				keyExtractor={item => item.node?.image.uri}
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
