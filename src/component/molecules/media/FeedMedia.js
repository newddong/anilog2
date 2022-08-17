import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Blur694} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, RED10, WHITE} from 'Root/config/color';
import Swiper from 'react-native-swiper';
import PhotoTagItem from 'Organism/feed/PhotoTagItem';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import feed_obj from 'Root/config/feed_obj';

/**
 * 피드의 사진 및 동영상 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data -  피드 오브젝트
 * @param {(object)=>void} props.onPressPhoto - 사진 선택 콜백
 */
export default FeedMedia = props => {
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
		_id,
	} = props.data;

	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const emergency_title = feed_type == 'report' ? '제보' : feed_type == 'missing' ? '실종' : '';
	const contentParsing = feed_content.replace(/(&[#|@]){2}(.*?)%&%.*?(&[#|@]){2}/g, '$2');

	let newMissingDate = '';
	let newMissingAddress = '';

	React.useEffect(() => {
		try {
			const unsubscribe = navigation.addListener('focus', () => {
				const findIndex = feed_obj.list.findIndex(e => e._id == props.data._id);
				const isEditedList = feed_obj.edited_list.map(v => v._id).includes(props.data._id);
				if (findIndex != -1 && isEditedList) {
					const edited_index = feed_obj.edited_list.findIndex(e => e._id == _id);
					setData(feed_obj.edited_list[edited_index]);
				}
			});
			return unsubscribe;
		} catch (err) {
			console.log('err', err);
		}
	}, []);

	if (feed_type == 'missing') {
		try {
			const newMissingDateText = missing_animal_date.toString().split('-');
			newMissingDate = newMissingDateText[0] + '.' + newMissingDateText[1] + '.' + newMissingDateText[2].toString().substring(0, 2);
			// splitAddress = missing_animal_lost_location.split('"');
			// newMissingAddress = splitAddress[11];
			if (typeof missing_animal_lost_location == 'object') {
				newMissingAddress = missing_animal_lost_location?.city + ' ' + missing_animal_lost_location?.district;
			} else {
				const parsed = JSON.parse(missing_animal_lost_location);
				newMissingAddress = parsed?.city + ' ' + parsed?.district;
			}
		} catch (err) {
			console.log('err', err);
		}
	}
	if (feed_type == 'report') {
		try {
			let newMissingDateText = report_witness_date.toString().split('-');
			if (newMissingDateText && newMissingDateText.length == 3) {
				newMissingDate = newMissingDateText[0] + '.' + newMissingDateText[1] + '.' + newMissingDateText[2].toString().substring(0, 2);
			} else {
				newMissingDate = report_witness_date;
			}
		} catch (err) {
			console.log('err', err);
		}
	}

	const onPressPhoto = uri => {
		console.log(feed_medias);
		let list = feed_medias.filter(v => !v.is_video && v.media_uri != uri);
		Modal.popPhotoListViewModal([uri].concat(list.map(v => v.media_uri)), () => Modal.close());
	};

	const onPressImg = () => {
		props.onPressPhoto();
	};

	const swiperRef = React.useRef();
	const pagenation = (index, total, context) => {
		if (total <= 1) return false;
		return (
			<View style={[style.pagination, feed_type == 'missing' || feed_type == 'report' ? {top: 40 * DP} : {bottom: 40 * DP}]}>
				<Text style={[txt.roboto24, {color: WHITE}]}>
					{index + 1}/{total}
				</Text>
			</View>
		);
	};
	const [swiperIndex, setSwiperIndex] = React.useState(0);
	const indexChange = index => {
		console.log('index', index);
		setSwiperIndex(index);
	};

	return (
		<View style={{height: 734 * DP}}>
			<View style={{height: 734 * DP}}>
				{/* Swiper Container View */}
				<Swiper
					activeDotColor={APRI10}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
					ref={swiperRef}
					renderPagination={pagenation}
					onIndexChanged={indexChange}
					horizontal={true}>
					{data.feed_medias.map((data, idx) => {
						return (
							<React.Fragment key={idx}>
								<PhotoTagItem
									style={[styles.img_square_round_694]}
									uri={data.media_uri}
									data={data}
									taglist={data.tags}
									onShow={props.isView && (idx == swiperIndex || feed_medias.length == 0)}
									key={idx}
									viewmode={true}
									onPressPhoto={onPressPhoto}
								/>
								{feed_type == 'missing' || feed_type == 'report' ? (
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={onPressImg}
										style={{bottom: 19 * DP, width: 750 * DP, height: 694 * DP, position: 'absolute', alignItems: 'center'}}>
										<Blur694 />
									</TouchableOpacity>
								) : (
									false
								)}
							</React.Fragment>
						);
					})}
					{/* {getFeedIcon()} */}
				</Swiper>
			</View>
			{feed_type == 'missing' || feed_type == 'report' ? (
				<View style={[style.emergency_title, {backgroundColor: feed_type == 'missing' ? RED10 : '#FFD153'}]}>
					<Text style={[txt.noto40b, {color: WHITE}]}>{emergency_title}</Text>
				</View>
			) : (
				false
			)}
			{feed_type == 'missing' ? (
				<TouchableOpacity onPress={onPressImg} style={[style.emergency_background, {}]}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1}}>
							<Text style={[txt.roboto38b, {color: 'white', lineHeight: 62 * DP}]} numberOfLines={3}>
								{missing_animal_species + ' / ' + missing_animal_species_detail}
							</Text>
						</View>
						{/* <View style={{flex: 1}}>
							<Text style={[txt.roboto40b, {color: 'white'}, {textAlign: 'right'}, {paddingRight: 38 * DP}]}>
								{phoneFomatter(missing_animal_contact)}
							</Text>
						</View> */}
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={style.missing_date_age_container}>
							<Text style={[txt.noto32, {color: 'white'}]}>실종 날짜: {newMissingDate}</Text>
							<Text style={[txt.noto32, {color: 'white'}]}>실종 장소: {newMissingAddress}</Text>
						</View>
					</View>
				</TouchableOpacity>
			) : (
				false
			)}
			{feed_type == 'report' ? (
				<TouchableOpacity onPress={onPressImg} style={[style.emergency_background]}>
					<View style={[{flexDirection: 'column'}]}>
						<Text style={[txt.roboto38b, {color: 'white', lineHeight: 62 * DP}]} numberOfLines={1}>
							{data.report_witness_location}
						</Text>
						<View style={[style.report_date_container]}>
							<Text style={[txt.noto32, {color: 'white'}]}>제보 날짜: {newMissingDate}</Text>
						</View>
						<View style={style.report_detail_container}>
							<Text style={[txt.noto32, {color: 'white', lineHeight: 45 * DP}]} numberOfLines={2}>
								{contentParsing}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			) : (
				false
			)}
		</View>
	);
};

FeedMedia.defaultProps = {
	onPressPhoto: () => {},
};

const style = StyleSheet.create({
	pagination: {
		width: 76 * DP,
		height: 50 * DP,
		borderRadius: 25 * DP,
		backgroundColor: '#0008',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 48 * DP,
	},
	emergency_title: {
		width: 164 * DP,
		height: 82 * DP,
		position: 'absolute',
		paddingBottom: 10 * DP,
		borderBottomLeftRadius: 20 * DP,
		borderBottomRightRadius: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		left: 293 * DP,
		top: 20 * DP,
	},
	emergency_background: {
		width: 750 * DP,
		paddingHorizontal: 28 * DP,
		// height: 214 * DP,
		// backgroundColor: '#0009',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		// zIndex: 0,
		paddingVertical: 20 * DP,
		paddingHorizontal: 52 * DP,
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
	missing_date_age_container: {
		// width: 192 * DP,
		height: 126 * DP,
		paddingBottom: 24 * DP,
		justifyContent: 'space-between',
	},
	missing_detail_container: {
		width: 500 * DP,
		height: 114 * DP,
		paddingLeft: 10 * DP,
		paddingRight: 52 * DP,
	},
	report_date_container: {
		height: 48 * DP,
		marginBottom: 4 * DP,
	},
	report_location_container: {
		height: 80 * DP,
		width: 468 * DP,
		paddingTop: 16 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},

	report_detail_container: {
		paddingBottom: 24 * DP,
	},
});
