import React from 'react';
import {Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {ADOPT, DEFAULT_ANIMAL_PROFILE, DEFAULT_PROFILE, DISCUSS, NEAR_RAINBOWBRIDGE, PROTECT, RESCUE} from 'Root/i18n/msg';
import {styles} from 'Atom/image/imageStyle';

/**
 * 동물 구조 임시보호 입양 관련 이미지
 * @param {object} props - Props Object
 * @param {string} props.img_uri - 이미지 Uri
 * @param {'rescue'|'discuss'|'nearrainbow'|'adopt'|'protect'} props.status - 동물의 보호활동 상태
 */
const RescueImage = props => {
	// console.log('props / RescueImage', props);
	const getStatusText = () => {
		switch (props.status) {
			case 'rescue':
				return RESCUE;
			case 'discuss':
				return DISCUSS;
			case 'nearrainbow':
				return NEAR_RAINBOWBRIDGE;
			case 'adopt':
				return ADOPT;
			case 'protect':
				return PROTECT;
			case 'complete':
				return ADOPT;
		}
	};
	return (
		<View style={styles.img_rect_654x542}>
			{props.img_uri.length == 0 ? (
				<Image source={{uri: DEFAULT_ANIMAL_PROFILE}} style={styles.img_rect_654x542} />
			) : (
				<Swiper
					// style={[styles.img_square_750x750]}
					activeDotColor="#FFB6A5"
					showsButtons={false}
					autoplay={false}
					loop={false}
					horizontal={true}>
					{props.img_uri.map((data, idx) => (
						<Image source={{uri: data}} style={styles.img_rect_654x542} key={idx} />
					))}
					{/* {getFeedIcon()} */}
				</Swiper>
			)}

			<View
				style={{
					width: 480 * DP,
					height: 64 * DP,
					opacity: 0.8,
					borderBottomLeftRadius: 30 * DP,
					backgroundColor: APRI10,
					position: 'absolute',
					right: 0,
				}}>
				<Text style={[txt.noto36, {textAlign: 'center', color: 'white'}]}>{getStatusText()}</Text>
			</View>
		</View>
	);
};

RescueImage.defaultProps = {
	status: 'rescue',
};

export default RescueImage;
