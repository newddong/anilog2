import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import ProtectedThumbnail from 'Molecules/media/ProtectedThumbnail';
import {FavoriteTag48_Border, FavoriteTag48_Filled} from 'Atom/icon';
import {animalNeedHelp} from 'Organism/style_organism copy';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import DP from 'Root/config/dp';
import {DEFAULT_ANIMAL_PROFILE} from 'Root/i18n/msg';

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
export default ProtectRequest = React.memo(props => {
	// console.log('AnimalNeedHelp', props.data.protect_request_status);
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const {
		_id,
		feed_type,
		protect_request_status,
		protect_request_photos_uri,
		protect_animal_sex,
		is_favorite,
		notice_day,
		protect_request_date,
		protect_request_writer_id, // {user_nickname,_id }
		protect_animal_species,
		protect_animal_species_detail,
		protect_animal_id, //protect_animal_rescue_location
	} = props.data;

	const thumbnailData = {
		status: data.protect_request_status,
		_id: data._id,
		img_uri: data.protect_request_photos_uri && data.protect_request_photos_uri[0] ? data.protect_request_photos_uri[0] : DEFAULT_ANIMAL_PROFILE,
		gender: data.protect_animal_sex,
		notice_day: data.notice_day,
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
		date = data.protect_request_date;
		if (date != undefined && date.length > 15) {
			date = moment(date).format('YYYY-MM-DD');
			return date;
		}
		return date;
	};

	const checkIsMyPost = () => {
		let result = false;
		if (data.protect_request_writer_id) {
			result = data.protect_request_writer_id._id == userGlobalObject.userInfo._id;
		}
		return result;
	};

	const contents = () => {
		return (
			<View style={[animalNeedHelp.detailContainer, {width: props.selectMode ? 320 * DP : 380 * DP}]}>
				<View style={[animalNeedHelp.detail_lowerMenu, {justifyContent: 'center'}]}>
					<View style={{justifyContent: 'space-between'}}>
						{/* 동물 종류 및 품종 */}
						<View style={[animalNeedHelp.lowerMenu_kindAndBreed]}>
							<Text style={[txt.noto34b]}>{data.protect_animal_species || ''}</Text>
							<Text style={[txt.noto28, animalNeedHelp.breedText]} numberOfLines={1}>
								{data.protect_animal_species_detail || ''}
							</Text>
						</View>
						{/* 보호요청 관련 Details */}
						<View style={[animalNeedHelp.lowerMenu_helpDetail]}>
							<Text style={[txt.noto28]}>등&nbsp; 록&nbsp; 일 : {getParsedDate()}</Text>
							<Text style={[txt.noto28, {maxWidth: props.selectMode ? 320 * DP : 380 * DP}]} numberOfLines={1}>
								{/* 보호장소 :{' '}
								{data.protect_request_writer_id.user_nickname
									? data.protect_request_writer_id.user_nickname
									: data.protect_animal_id.protect_animal_rescue_location} */}
								{/* 보호장소 : {data.protect_request_writer_id != null ? data.protect_request_writer_id.shelter_name : data.shelter_name} */}
								보호장소 : {data.protect_request_writer_id.user_nickname}
							</Text>
							<Text style={[txt.noto28, {maxWidth: props.selectMode ? 320 * DP : 380 * DP}]} numberOfLines={1}>
								구조지역 :{' '}
								{data.protect_animal_id.protect_animal_rescue_location
									? data.protect_animal_id.protect_animal_rescue_location
									: '작성되지 않았습니다.'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	if (!data) {
		return <></>;
	} else
		return (
			<>
				<View style={[animalNeedHelp.container, {height: 244 * DP}]}>
					<View style={[animalNeedHelp.container_basicInfo]}>
						<View style={[animalNeedHelp.protectedThumbnail_container]}>
							<ProtectedThumbnail
								data={thumbnailData}
								inActiveOpacity={props.inActiveOpacity}
								onLabelClick={(status, id) => props.onClickLabel(status, id)}
							/>
						</View>
						<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.6} onPress={() => props.onClickLabel(data.feed_type, data._id)}>
							<View>{contents()}</View>
						</TouchableOpacity>
						<View style={[animalNeedHelp.detail_upper_tag]}>
							{!props.showFavorite || checkIsMyPost() ? (
								<></>
							) : data.is_favorite ? (
								<FavoriteTag48_Filled onPress={() => onPressFavoriteTag(false)} />
							) : (
								<FavoriteTag48_Border onPress={() => onPressFavoriteTag(true)} />
							)}
						</View>
					</View>
				</View>
			</>
		);
});

ProtectRequest.defaultProps = {
	selected: false,
	onClickLabel: e => {},
	onFavoriteTag: e => console.log(e),
	onPressAdoptorInfo: e => console.log('e'),
	isChecked: false,
	inActiveOpacity: false,
	showFavorite: true,
	selectMode: false,
};
