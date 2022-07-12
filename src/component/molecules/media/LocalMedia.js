import React from 'react';
import {Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Platform} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, WHITE} from 'Root/config/color';
import {Paw94x90, VideoGrad186} from 'Atom/icon';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import CameraRoll from 'Root/module/CameraRoll';
/**
 * 디바이스의 미디어 썸네일을 표시, 선택할때 사용하는 최소단위 컴포넌트
 *
 * @typedef {object} LocalMediaProps
 * @property {object} data - LocalMedia의 데이터
 * @property {boolean} data.state - 미디어의 상태(선택 여부)
 * @property {boolean} data.isVideo - 미디어가 동영상인지 여부
 * @property {string} data.group_name - 미디어의 그룹 이름
 * @property {number} data.timestamp - 미디어가 생성된 timestamp
 * @property {object} data.image - 미디어의 이미지 속성
 * @property {string} data.image.uri - 미디어의 uri
 * @property {number} data.image.playableDuration - 미디어 재생시간
 * @property {number} index - 선택 순서를 표시(다중 선택, isSingleSelection이 false일 때)
 * @property {boolean} isSingleSelection - 단일 선택일때(발자국 표시) true, 다중 선택일때(번호 표시) false
 * @property {(img_uri:string)=>void} onSelect - LocalMedia가 선택될때 콜백, 파일 경로를 넘겨줌
 * @property {(img_uri:string)=>void} onCancel - LocalMedia가 선택 취소될때 콜백, 파일 경로를 넘겨줌
 * @property {boolean} disable - true일때 선택 불가능
 */

/**
 * @type {React.FunctionComponent<LocalMediaProps>}
 *
 */
const LocalMedia = props => {
	const [duration, setDuration] = React.useState(0);
	const [isSelect, setSelected] = React.useState(false);
	const [fileSize, setFileSize] = React.useState(0);
	const isVideo = props.data.type?.includes('video');
	const isGif = props.data.image?.uri.includes('gif');
	const videoInfo = React.useRef({});

	React.useEffect(() => {
		setSelected(props.selected);
	}, [props.selected]);

	React.useEffect(() => {
		if (isVideo) {
			CameraRoll.getVideoAttributes(props.data.image.uri).then(r => {
				console.log('video attribute', r);
				videoInfo.current = Platform.OS=='ios'?r[0]:r;
				setDuration(Platform.OS=='ios'?r[0].duration:r.duration);
				setFileSize(Platform.OS=='ios'?r[0].fileSize:r.fileSize);
			}).catch(e=>console.log('video attribute error',e));
		}
	}, []);

	const onPressMedia = e => {
		if (isSelect) {
			setSelected(false);
			props.onCancel(props.data.image.uri);
		} else {
			let photo = {...props.data,fileSize:videoInfo.current.fileSize,image:{...props.data.image,videoUri:videoInfo.current.uri,fileSize:videoInfo.current.fileSize}}
			console.log('사진',photo)
			// setSelected(true);
			props.onSelect(photo, duration);
		}
	};

	const getStyleOfSelectedItem = React.useCallback(() => {
		return isSelect ? {borderWidth: 4 * DP, borderColor: APRI10, opacity: 0.6, backgroundColor: '#DDDDDD'} : {backgroundColor: '#DDDDDD'};
	}, [isSelect]);

	const getImageOfSelectedItem = React.useCallback(() => {
		if (props.isSingleSelection) {
			return (
				<View style={style.paw94}>
					<Paw94x90 />
				</View>
			);
			//다중선택
		} else {
			return (
				<View
					style={{
						width: 44 * DP,
						height: 44 * DP,
						position: 'absolute',
						borderRadius: 20 * DP,
						backgroundColor: APRI10,
						right: 18 * DP,
						top: 12 * DP,
						justifyContent: 'center',
					}}>
					<Text
						style={[
							txt.roboto24,
							{
								alignSelf: 'center',
								color: WHITE,
								lineHeight: 32 * DP,
							},
						]}>
						{props.index}
					</Text>
				</View>
			);
		}
	}, [props.index]);


	const getDuration = second => {
		let min = Math.floor(second / 60);
		let sec = Math.floor(second % 60);
		return (min == 0 ? '00' : min < 10 ? '0' + min : min) + ':' + (sec == 0 ? '00' : sec < 10 ? '0' + sec : sec);
	};

	const getFileSize = fileSize => {
		let mega = 0;
		let killo = 0;
		if(fileSize>=1000000){
			mega = Math.floor(fileSize/1000000)
			return mega+'mb';
		}else{
			killo = Math.floor(fileSize/1000);
			return killo+'kb';
		}
		 
	
	}
	// console.log('image',props.data.image)
	// if(props.data.type.includes('video')){
	// 	return (<Video style={getStyleOfSelectedItem()} source={{uri: props.data.image.uri}} muted paused/>);
	// }
	// return (
	// 		<FastImage source={{uri:props.data.image.uri,cache:FastImage.cacheControl.cacheOnly}} style={getStyleOfSelectedItem()}/>
	// );
	return (
		<TouchableOpacity
			onPress={onPressMedia}
			style={{width: 187 * DP, height: 187 * DP, paddingHorizontal: 1 * DP, paddingVertical: 1 * DP, backgroundColor: '#FFF'}}>
			{isVideo && Platform.OS == 'ios' ? (
				<Image
					renderToHardwareTextureAndroid
					progressiveRenderingEnabled
					source={{uri: props.data.image.uri, width: 100 * DP, height: 100 * DP}}
					style={[{width: 186 * DP, height: 186 * DP}, getStyleOfSelectedItem()]}
				/>
			) : (
				<FastImage
					renderToHardwareTextureAndroid
					progressiveRenderingEnabled
					source={{uri: props.data.image.uri, priority: isVideo ? FastImage.priority.normal : FastImage.priority.high}}
					style={[{width: 186 * DP, height: 186 * DP}, getStyleOfSelectedItem()]}
				/>
			)}
			{isSelect && getImageOfSelectedItem()}
			{isVideo && (
				<View style={{position:'absolute'}}>
					<VideoGrad186 />
					<Text style={[txt.roboto22, {color: WHITE, position: 'absolute', left: 10 * DP, bottom: 6 * DP}]}>{getDuration(duration)}</Text>
					<Text style={[txt.roboto22, {color: WHITE, position: 'absolute', right: 10 * DP, bottom: 6 * DP}]}>{getFileSize(fileSize)}</Text>
				</View>
			)}
			{!isVideo &&isGif && (
				<View style={{position:'absolute'}}>
					<VideoGrad186 />
					<Text style={[txt.roboto22, {color: WHITE, position: 'absolute', left: 10 * DP, bottom: 6 * DP}]}>GIF</Text>
				</View>
			)}
		</TouchableOpacity>
	);
	// isVideo = true 분기
};

LocalMedia.defaultProps = {
	data: {
		image: {
			uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
			playableDuration: 0,
		},
		timestamp: 0,
		group_name: 'Picture',
		isVideo: false,
		duration: null,
	},
	index: 1,
	disable: false,
	isSingleSelection: true,
	onSelect: e => console.log(e),
	onCancel: e => console.log(e),
};

const style = StyleSheet.create({
	paw94: {
		width: 94 * DP,
		height: 90 * DP,
		position: 'absolute',
		paddingVertical: 48 * DP,
		paddingHorizontal: 46 * DP,
	},
});

export default React.memo(LocalMedia);
