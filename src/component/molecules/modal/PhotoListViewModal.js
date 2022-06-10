import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, TouchableOpacity} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Cross46} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import Swiper from 'react-native-swiper';
import Crop from 'Molecules/media/Crop';

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

	return (
		<View style={style.background}>
			<TouchableOpacity onPress={() => (props.onClose ? props.onClose() : Modal.close())} style={[style.crossMark]}>
				<View style={{backgroundColor:'yellow',width:120*DP,height:120*DP}}>
				<Cross46 />
				</View>
			</TouchableOpacity>
			<View style={[style.popUpWindow]}>
				<Swiper
					activeDotColor={APRI10}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
					scrollEnabled={true}
					ref={swiperRef}
					renderPagination={(index, total, context) => {
						// console.log('context', context);
						return props.photoList.length == 1 ? (
							<></>
						) : (
							<View
								style={{
									bottom: -50 * DP,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: 28 * props.photoList.length * DP,
									height: 24 * DP,
									flexDirection: 'row',
									position: 'absolute',
								}}>
								{props.photoList.map((data, idx) => {
									return (
										<View
											key={idx}
											style={[
												{
													alignSelf: 'center',
													width: 14 * DP,
													height: 14 * DP,
													backgroundColor: index == idx ? APRI10 : GRAY10,
													borderRadius: 50 * DP,
												},
											]}></View>
									);
								})}
							</View>
						);
					}}
					horizontal={true}>
					{props.photoList != undefined &&
						props.photoList.map((data, idx) => (

							<TouchableOpacity activeOpacity={1} onPress={() => props.onClose()} key={idx}>
                {/*<Image source={{uri: data}} style={style.photo} resizeMode={'contain'} />*/}
								{/* <Image source={{uri: data}} style={style.photo} resizeMode={'stretch'} /> */}
								<Crop uri={data} width={750*DP} height={1000*DP} isCrop={false} backgroundColor={'black'}/>

								<View style={[style.swiper_index]}>
									<Text style={[txt.roboto24, {color: 'white'}]}>
										{idx + 1}/{props.photoList.length}
									</Text>
								</View>
							</TouchableOpacity>
						))}
				</Swiper>
			</View>
		</View>
	);
};

PhotoListViewModal.defaultProps = {
	popUpMsg: 'popUp',
	onClose: () => Modal.close(),
};

const style = StyleSheet.create({
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
		marginBottom: 70 * DP,
	},
	popUpWindow: {
		width: 750 * DP,
		height: 1100 * DP,
		backgroundColor: WHITE,
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		width: 750 * DP,
		// height: 750 * DP,
		backgroundColor: 'black',
	},
});

export default PhotoListViewModal;
