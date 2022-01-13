import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {ImageList48, VideoPlay48, VideoPlay_Feed} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';
import {BLACK, RED10, WHITE} from 'Root/config/color';
import Swiper from 'react-native-swiper';

/**
 *
 * @param {{
 *	onSelect: 'Callback',
 * }} props
 */
export default FeedMedia = props => {
	const [contentLayout, setContentLayout] = React.useState({height: 214 * DP, width: 0});

	const {
		feed_content,
		feed_thumbnail,
		feed_medias,
		feed_location,
		feed_date,
		feed_update_date,
		feed_type,
		feed_is_protect_diary,
		feed_recent_comment,
		missing_animal_species,
		missing_animal_species_detail,
		missing_animal_sex,
		missing_animal_age,
		missing_animal_lost_location,
		missing_animal_contact,
		missing_animal_features,
		missing_animal_date,
		report_witness_date,
		report_witness_location,
		report_animal_species,
		report_animal_species_detail,
		report_animal_sex,
		report_animal_age,
		report_animal_contact,
		report_animal_features,
		feed_like_count,
		feed_favorite_count,
		feed_comment_count,
		feed_writer_id,
		feed_avatar_id,
	} = props.data;

	const emergency_title = feed_type == 'report' ? '제보' : feed_type == 'missing' ? '실종' : '';
	const isEmergency = feed_type == 'report' || feed_type == 'missing';
	const animal_species = missing_animal_species || report_animal_species;
	const species_detail = missing_animal_species_detail || report_animal_species_detail;
	const animal_species_detail = species_detail?.includes('un') || !species_detail ? '' : ' / ' + species_detail;
	const emergency_location = missing_animal_lost_location || report_witness_location;
	// console.log(props.data.medias);

	const onSelect = () => {
		props.onSelect(props.data.feed_id);
		// setSelected(!selected);
	};

	const getFeedIcon = () => {
		//data.medias의 값들 중 video형식의 media가 하나 이상 존재하는 경우
		if (feed_medias.some(v => v.isVideo == 'video')) {
			return (
				<View style={{position: 'absolute', top: 290 * DP, left: 328 * DP}}>
					<VideoPlay_Feed />
				</View>
			);
			//data.medias 배열의 길이가 1개 이상인 경우
		} else if (feed_medias.length > 1) {
			return (
				<View style={{position: 'absolute', top: 20 * DP, left: 20 * DP}}>
					<ImageList48 />
				</View>
			);
		} else return false;
	};

	return (
		<View>
			{/* Select된 상태일 때 불투명도 40% 적용 및 배경색  Black */}
			<View style={{backgroundColor: BLACK}}>
				<Swiper
					// style={[styles.img_square_750x750]}
					activeDotColor="#FFB6A5"
					showsButtons={false}
					autoplay={false}
					loop={false}
					horizontal={true}>
					{feed_medias.map((data, idx) => (
						<Image source={{uri: data.media_uri}} style={styles.img_square_750x750} key={idx} />
					))}
					{/* {getFeedIcon()} */}
				</Swiper>
			</View>
			{feed_type == 'missing' || feed_type == 'report' ? (
				<View style={style.emergency_title}>
					<Text style={[txt.noto40b, {color: WHITE}]}>{emergency_title}</Text>
				</View>
			) : (
				false
			)}
			{isEmergency ? (
				<View style={[style.emergency_background, {paddingVertical: 20 * DP, paddingHorizontal: 48 * DP, height: null}]}>
					<View style={style.emergency_info_container}>
						<View style={{flexDirection: 'row'}}>
							<Text style={[txt.roboto34b, {color: 'white'}]} numberOfLines={3}>
								{animal_species + animal_species_detail}
							</Text>
						</View>
						<View style={{marginLeft: 20 * DP, flex: 1}}>
							<Text style={[txt.roboto34b, {color: 'white'}]} numberOfLines={2}>
								{emergency_location}
							</Text>
						</View>
					</View>
					<View style={{flex: 1}}>
						<Text style={[txt.roboto24, {color: 'white', marginTop: 20 * DP}]} numberOfLines={3} ellipsizeMode="tail">
							{report_animal_features}
						</Text>
					</View>
				</View>
			) : (
				false
			)}
		</View>
	);
};

FeedMedia.defaultProps = {
	//
	data: {
		feed_id: null,
		isVideo: false,
		medias: [1, 2, 3, 4],
		alert_title: 'alert_msg',
		emergency: false,
	},

	onSelect: e => console.log(e),
	img_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
};

const style = StyleSheet.create({
	emergency_title: {
		width: 164 * DP,
		height: 82 * DP,
		position: 'absolute',
		backgroundColor: RED10,
		paddingBottom: 10 * DP,
		borderBottomLeftRadius: 20 * DP,
		borderBottomRightRadius: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		right: 10,
		top: 0,
	},
	emergency_background: {
		width: 750 * DP,
		// height: 214 * DP,
		backgroundColor: '#0009',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		zIndex: 0,
	},
	emergency_info_txt: {
		color: 'white',
		marginLeft: 40 * DP,
		width: 468 * DP,
		height: 80 * DP,
	},
	emergency_info_container: {
		flexDirection: 'row',
	},
});
