import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import ProtectedThumbnail from 'Molecules/media/ProtectedThumbnail';
import {FavoriteTag48_Border, FavoriteTag48_Filled} from 'Atom/icon';
import {DEFAULT_ANIMAL_PROFILE} from 'Root/i18n/msg';
import {animalNeedHelp} from 'Organism/style_organism copy';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import DP from 'Root/config/dp';

/**
 *
 *@param {{
 *data: 'data object',
 *onClickLabel: 'void / Label클릭 콜백함수 '
 *onFavoriteTag : 'void / 즐겨찾기 태그 깃발 클릭 ',
 *borderMode : 'boolean / 테두리 및 입양처보기, 게시글보기 모드 ',
 *onCheckBox : 'boolean / CheckBox 보이기',
 *onPressAdoptorInfo : 'boolean / HashClick Callback',
 *onPressProtectRequest : 'void / 테두리 모드 게시글보기 클릭',
 *onPressReporter : 'void / 제보 게시글의 제보자 닉네임 클릭',
 *inActiveOpacity : 'boolean / 클릭 애니메이션 여부 default false',
 *showFavorite : 'boolean / 즐겨찾기 아이콘 출력 여부 default true',
 *selectMode : 'boolean / 즐겨찾기 해제 모드 여부 default true',
 * }} props
 */
export default MissingReportItem = React.memo(props => {
	// console.log('AnimalNeedHelp', props.data.protect_request_status);
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const thumbnailData = {
		status: data.feed_type,
		_id: data._id,
		img_uri: data.feed_thumbnail ? data.feed_thumbnail : DEFAULT_ANIMAL_PROFILE,
		gender: data.missing_animal_sex,
	};

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	//우상단 즐겨찾기 깃발 아이콘 클릭 콜백
	const onPressFavoriteTag = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			props.onFavoriteTag(bool);
			setData({...data, is_favorite: bool});
		}
	};
	const getParsedDate = () => {
		let date = '';
		if (data.feed_type == 'missing') {
			// var splitAddress = data.missing_animal_date.split('-');
			// console.log('missing getParedDate', splitAddress);
			date = data.missing_animal_date;
		} else if (data.feed_type == 'report') {
			date = data.report_witness_date;
			// console.log('report date', date);
		}
		if (date != undefined && date.length > 15) {
			date = moment(date).format('YYYY-MM-DD');
			return date;
		}
		return date;
	};

	const getParsedSex = () => {
		let sexData = data.missing_animal_sex;
		switch (sexData) {
			case 'female':
				return '여';
			case 'male':
				return '남';
			default:
				return '모름';
		}
	};
	const getParsedAddress = () => {
		let address = data.missing_animal_lost_location;
		let splitAddress = address.split('"');
		let newMissingLocation = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];
		return newMissingLocation;
	};

	const checkIsMyPost = () => {
		let result = false;
		const isProtectRqeust = data.type != 'FeedObject'; //보호요청게시글 여부
		if (isProtectRqeust) {
			if (data.protect_request_writer_id) {
				result = data.protect_request_writer_id._id == userGlobalObject.userInfo._id;
			}
		} else {
			result = data.feed_writer_id == userGlobalObject.userInfo._id;
		}
		return result;
	};

	const contents = () => {
		return (
			<View style={[animalNeedHelp.detailContainer]}>
				<View style={[animalNeedHelp.detail_lowerMenu, {width: 410 * DP}]}>
					{data.feed_type == 'missing' && (
						<>
							{/* 동물 종류 및 품종 */}
							<View style={[animalNeedHelp.lowerMenu_kindAndBreed]}>
								<Text style={[txt.noto34b, {}]}>{data.missing_animal_species || ''}</Text>
								<Text style={[txt.noto28b, {}, animalNeedHelp.breedText]} numberOfLines={1}>
									{data.missing_animal_species_detail || ''}
								</Text>
							</View>
							{/* 실종/제보 관련 Details */}
							<View style={[animalNeedHelp.lowerMenu_helpDetail]}>
								{/* <Text style={[txt.noto24, {color: RED10}]}>실종일: {data.missing_animal_date || ''}</Text> */}
								<Text style={[txt.noto28b]} numberOfLines={1}>
									실종일: {getParsedDate()}
								</Text>
								<Text style={[txt.noto28b, {}]}>
									나이:{data.missing_animal_age + '살' || ''} / 성별: {getParsedSex()}
									{/* {data.missing_animal_sex} */}
								</Text>
								<Text style={[txt.noto28, {width: 408 * DP}]} numberOfLines={1}>
									실종위치: {getParsedAddress() || ''}
								</Text>
								<Text style={[txt.noto28]} numberOfLines={1}>
									특징: {data.missing_animal_features || ''}
								</Text>
							</View>
						</>
					)}
					{data.feed_type == 'report' && (
						<>
							{/* 제보 / 제보위치 / 특징 */}
							{/* 동물 종류 및 품종 */}
							<View style={[animalNeedHelp.lowerMenu_kindAndBreed]}>
								<Text style={[txt.noto34b]}>{data.report_animal_species == '동물종류' ? '' : data.report_animal_species || ''}</Text>
							</View>
							{/* 실종/제보 관련 Details */}
							<View style={[animalNeedHelp.lowerMenu_helpDetail]}>
								<Text style={[txt.noto28b]}>제보일: {getParsedDate()}</Text>
								<Text style={[txt.noto28, {width: 408 * DP}]} numberOfLines={1}>
									제보 위치: {data.report_witness_location || ''}
								</Text>
								<Text style={[txt.noto28, {width: 408 * DP}]} numberOfLines={2}>
									제보 내용: {data.feed_content}
								</Text>
							</View>
						</>
					)}
				</View>
			</View>
		);
	};

	return (
		<View style={[animalNeedHelp.container, {height: 244 * DP}]}>
			<View style={[animalNeedHelp.container_basicInfo]}>
				<View style={[animalNeedHelp.protectedThumbnail_container]}>
					<ProtectedThumbnail data={thumbnailData} onLabelClick={(status, id) => props.onClickLabel(status, id)} />
				</View>
				<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.2} onPress={() => props.onClickLabel(data.feed_type, data._id)}>
					<View>{contents()}</View>
				</TouchableOpacity>
				<View style={[animalNeedHelp.detail_upper_tag]}>
					{checkIsMyPost() ? (
						<></>
					) : data.is_favorite ? (
						<FavoriteTag48_Filled onPress={() => onPressFavoriteTag(false)} />
					) : (
						<FavoriteTag48_Border onPress={() => onPressFavoriteTag(true)} />
					)}
				</View>
			</View>
		</View>
	);
});

MissingReportItem.defaultProps = {
	selected: false,
	onClickLabel: e => {},
	onFavoriteTag: e => console.log(e),
	onPressAdoptorInfo: e => console.log('e'),
	isChecked: false,
	inActiveOpacity: false,
	showFavorite: true,
	selectMode: false,
};
