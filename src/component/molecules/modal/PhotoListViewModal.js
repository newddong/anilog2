import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, TouchableOpacity, BackHandler} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Cross46} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import Swiper from 'react-native-swiper';
import Crop from 'Molecules/media/Crop';
import ExpansionView from 'Molecules/media/ExpansionView';
import ImageView from 'react-native-image-viewing';

/**
 * 사진 전체화면 모드 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {string} props.photoList - 팝업 메시지
 * @param {()=>void} props.onClose - 종료
 *
 */
const PhotoListViewModal = props => {
	const swiperRef = React.useRef();
	const [swipe, setSwipe] = React.useState(true);
	const [showImgMode, setShowImgMode] = React.useState(true);
	const backAction = () => {
		console.log('backAction', showImgMode);
		if (showImgMode) {
			Modal.close();
			setShowImgMode(false);
			return true;
		} else {
			return false;
		}
	};

	React.useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);
		return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, [showImgMode]);

	const startMove = () => {
		console.log('startMove');
		setSwipe(false);
	}

	const endMove = () => {
		console.log('endMove');
		setSwipe(true);
	}
	const pagenation = (index, total, context) => {
		if (total <= 1) return false;
		return (
			<View style={[style.pagination,{bottom: 40 * DP}]}>
				<Text style={[txt.roboto24, {color: WHITE}]}>
					{index + 1}/{total}
				</Text>
			</View>
		);
	};

	return (
		<View style={style.background}>
			<TouchableOpacity style={[style.crossMark]} onPress={() => (props.onClose ? props.onClose() : Modal.close())}>
				<View style={{paddingLeft:20*DP}}>
					<Cross46 />
				</View>
			</TouchableOpacity>
			<ImageView
				images={props.photoList.map(v=>({uri:v}))}
				visible={true}
				onRequestClose={()=>{props.onClose()}}
			></ImageView>
			
			{/* <View style={[style.popUpWindow]}>
				<Swiper
					activeDotColor={APRI10}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
					scrollEnabled={false&&swipe}
					ref={swiperRef}
					renderPagination={pagenation}
					horizontal={true}>
					{props.photoList != undefined &&
						props.photoList.map((data, idx) => (
							<View key={idx}>
							<TouchableOpacity activeOpacity={1} onPress={() => props.onClose()} key={idx}>
								<ExpansionView 
									photo={{uri:data}} 
									width={750 * DP} 
									height={1100 * DP} 
									isCrop={true} 
									backgroundColor={'#FFF'} 
									onStartMove={startMove}
									onEndMove={endMove}
								/>
							</TouchableOpacity>
							</View>
						))}
				</Swiper>
			</View> */}
		</View>
	);
};

PhotoListViewModal.defaultProps = {
	popUpMsg: 'popUp',
	onClose: () => Modal.close(),
};

const style = StyleSheet.create({
	swiper_index: {
		backgroundColor: 'black',
	},
	background: {
		backgroundColor: 'black',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	crossMark: {
		alignSelf: 'flex-start',
		left: 30 * DP,
		position:'absolute',
		top:30*DP,
		width:150*DP,
		height:150*DP,
		left:0,
		// marginBottom: 70 * DP,
	},
	popUpWindow: {
		width: 750 * DP,
		height: 1100 * DP,
		// backgroundColor: WHITE,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		width: 750 * DP,
		// height: 750 * DP,
		backgroundColor: 'black',
	},
	pagination: {
		width: 76 * DP,
		height: 50 * DP,
		borderRadius: 25 * DP,
		backgroundColor: '#0008',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 28 * DP,
	},
});

export default PhotoListViewModal;
