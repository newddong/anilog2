import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {APRI10, BLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {ADOPT, DISCUSS, NEAR_RAINBOWBRIDGE, PROTECT, RESCUE} from 'Root/i18n/msg';
import {styles} from 'Atom/image/imageStyle';
import {RainbowBridge} from 'Root/component/atom/icon';

/**
 * 동물 구조 임시보호 입양 관련 이미지
 * @param {object} props - Props Object
 * @param {string} props.img_uri - 이미지 Uri
 * @param {'rescue'|'discuss'|'nearrainbow'|'adopt'|'protect'} props.status - 동물의 보호활동 상태
 * @param {()=>void)} props.onPressReqeustPhoto - 보호 게시글 이미지 클릭시
 */
const RescueImage = props => {
	// console.log('props / RescueImage', props.status);
	const getStatusText = () => {
		switch (props.status) {
			case 'rescue':
				return RESCUE;
			case 'found':
				return '주인 찾음';
			case 'complete':
				return ADOPT;
			case 'discuss':
			case undefined:
				return DISCUSS;
			case 'rainbowbridge':
				return '';
			case 'nearrainbow':
			case 'rainbowbridge_euthanasia':
				return '무지개다리';
			case 'adopt':
				return ADOPT;
			case 'protect':
				return PROTECT;
			default:
				return DISCUSS;
		}
	};
	return (
		<View style={[styles.img_rect_654x542, {zIndex: -2}]}>
			<Swiper showsPagination={false} autoplay={false} loop={false} horizontal={true}>
				{props.img_uri != undefined &&
					props.img_uri.map((data, idx) => (
						<TouchableOpacity activeOpacity={0.8} onPress={() => props.onPressReqeustPhoto()} key={idx}>
							<Image onP source={{uri: data}} style={styles.img_rect_654x542} />
							<View style={[style.swiper_index]}>
								<Text style={[txt.roboto24, {color: 'white'}]}>
									{idx + 1}/{props.img_uri.length}
								</Text>
							</View>
						</TouchableOpacity>
					))}
			</Swiper>
			{props.status != 'rainbowbridge' ? (
				<></>
			) : (
				<View style={[style.rainbow, styles.img_rect_654x542]}>
					<RainbowBridge />
				</View>
			)}
			{props.status != 'rainbowbridge' ? (
				<View style={[style.status_text]}>
					<Text style={[txt.noto36, {textAlign: 'center', color: 'white'}]}>{getStatusText()}</Text>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

RescueImage.defaultProps = {
	status: 'rescue',
	onPressReqeustPhoto: () => {},
};

const style = StyleSheet.create({
	swiper_index: {
		position: 'absolute',
		borderRadius: 24 * DP,
		width: 76 * DP,
		height: 50 * DP,
		backgroundColor: 'black',
		opacity: 0.6,
		right: 20 * DP,
		bottom: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	status_text: {
		width: 480 * DP,
		height: 64 * DP,
		opacity: 0.8,
		borderBottomLeftRadius: 30 * DP,
		backgroundColor: APRI10,
		position: 'absolute',
		right: 0,
	},
	rainbow: {
		position: 'absolute',
		backgroundColor: BLACK,
		opacity: 0.8,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default RescueImage;
