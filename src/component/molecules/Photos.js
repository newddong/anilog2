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
} from 'react-native';
import PropsTypes, { arrayOf, bool, func, string } from 'prop-types';
import {CameraIconWhite} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import CameraRoll from '@react-native-community/cameraroll';
// import {hasAndroidPermission} from './camerapermission';
// import {requestPermission, reqeustCameraPermission} from 'permission';
import FastImage from 'react-native-fast-image';


/**
 * @type {React.FunctionComponent<PhotosProps>}
 */

const Photos = React.memo(
	(props => {
		const [isSelect, select] = React.useState(false);
		const [itemNum, setItemNum] = React.useState(0);
		const isVideo = props.data?.image?.playableDuration !== null;
		const current_number = React.useRef(0);
		const cursor = React.useRef(() => 'chrl');


		const number = React.useMemo(()=>props.selectedList?.findIndex((v)=>v.uri===props.data.image.uri)
		,[props.selectedList]);

		const selected = number+1>0;

		const handlePress = () => {
			console.log('handlePress');
			if (props.isCamera) {
				moveToCamera();
			} else {
				// if(props.isSingle){
				// 	props.onPress(props.data?.image.uri, isVideo, props.index, toggle)();
				// }else{
				// 	props.onPress(props.data?.image.uri, toggleselect, refreshItemNum, isVideo)();
				// }
				let selectedObj = {isVideo: props.data?.image?.playableDuration !== null, uri: props.data.image.uri};
				if (selected) {
					console.log('cancel');
					props.onCancel(selectedObj);
				} else {
					console.log('select');
					props.onSelect(selectedObj);
				}
			}
		};

		const moveToCamera = () => {
			props.navigation.push('camera', {title: '카메라'});
		};

		
		

		// console.log('photoimage   ' + JSON.stringify(props.data.image));
		return (
			<TouchableWithoutFeedback onPress={handlePress}>
				<View style={[photo.wrp_photo, {backgroundColor: '#EDEDED'}]}>
					{props.isCamera ? (
						<SvgWrapper style={{width: 70 * DP, height: 62 * DP}} svg={<CameraIconWhite />} />
					) : (
						<>
							{Platform.OS==='ios'?<Image style={selected ? photo.img_selected : photo.size_img} source={{uri: props.data.image.uri}} />:
							<FastImage style={selected ? photo.img_selected : photo.size_img} source={{uri: props.data.image.uri}} />}
							{selected && (
								<>
									{!props.isSingle && (
										<View style={photo.counter}>
											<Text style={[txt.roboto24r, txt.white]}>{number+1}</Text>
										</View>
									)}
									<View style={[photo.size_img, {backgroundColor: '#FFF', position: 'absolute', opacity: 0.4}]}></View>
								</>
							)}
						</>
					)}
					<View style={{position: 'absolute', left: 10 * DP, bottom: 6 * DP}}>
						<Text style={[txt.roboto22r, txt.white]}>{duration(props.data?.image?.playableDuration)}</Text>
					</View>
					{/* <SvgWrapper style={{width: 70 * DP, height: 62 * DP,position:'absolute'}} svg={<VideoPlayIcon fill='#fff'/>} /> */}
				</View>
			</TouchableWithoutFeedback>
		);
	}),
);

const duration = v => {
	if (!v) return null;
	let hour = parseInt(v / 3600);
	let min = parseInt((v % 3600) / 60);
	let sec = (v % 3600) % 60;

	return (min === 0 ? '00' : min) + ':' + (sec < 10 ? '0' + sec : sec);
};

const PhotosProps = {
	/** @type {boolean} 카메라 여부 */
	isCamera: bool,
	onPress: func,
	onSelect: func,
	onCancel: func,
	data: {img_uri:string},
	isSingle: bool,
	selectedList:arrayOf(string)
}

Photos.propTypes = PhotosProps;

Photos.defaultProps = {
	isCamera: false,
	onPress: () => {},
	onSelect: () => {},
	onCancel: () => {},
	data: {},
	isSingle: false,
	selectedList:[]
};

const photo = StyleSheet.create({
	wrp_photo: {
		height: 186 * DP,
		width: 186 * DP,
		marginBottom: 2 * DP,
		marginRight: 1.4 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	size_img: {
		height: 186 * DP,
		width: 186 * DP,
	},
	img_selected: {
		height: 182 * DP,
		width: 182 * DP,
		borderWidth: 4 * DP,
		borderColor: '#FFB6A5',
	},
	counter: {
		height: 44 * DP,
		width: 44 * DP,
		borderRadius: 22 * DP,
		backgroundColor: '#FFB6A5',
		position: 'absolute',
		right: 12 * DP,
		top: 12 * DP,
		opacity: 0.9,
		justifyContent: 'center',
		alignItems: 'center',
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
	roboto22r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 22 * DP,
		lineHeight: 28 * DP,
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

export default Photos;