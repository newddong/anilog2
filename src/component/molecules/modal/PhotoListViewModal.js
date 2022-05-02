import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, TouchableOpacity} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Congratulation, Cross46} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import ProfileImageLarge194 from '../image/ProfileImageLarge194';
import Swiper from 'react-native-swiper';
import {styles} from 'Root/component/atom/image/imageStyle';

/**
 * 임시보호 입양 확정 축하 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {string} props.photoList - 팝업 메시지
 *
 */
const PhotoListViewModal = props => {
	const swiperRef = React.useRef();

	return (
		<View style={style.background}>
			<TouchableOpacity onPress={() => Modal.close()} style={[style.crossMark]}>
				<Cross46 />
			</TouchableOpacity>
			<View style={[style.popUpWindow]}>
				<Swiper
					activeDotColor={APRI10}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
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
							<View key={idx}>
								<Image source={{uri: data}} style={style.photo} resizeMode={'contain'} />
								<View style={[style.swiper_index]}>
									<Text style={[txt.roboto24, {color: 'white'}]}>
										{idx + 1}/{props.photoList.length}
									</Text>
								</View>
							</View>
						))}
				</Swiper>
			</View>
		</View>
	);
};

PhotoListViewModal.defaultProps = {
	popUpMsg: 'popUp',
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
		marginBottom: 70 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	photo: {
		width: 750 * DP,
		height: 1100 * DP,
		backgroundColor: 'black',
	},
});

export default PhotoListViewModal;
