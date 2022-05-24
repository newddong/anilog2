import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import {btn_w276} from 'Atom/btn/btn_style';
import ProtectedThumbnail from 'Molecules/media/ProtectedThumbnail';
import AniButton from 'Molecules/button/AniButton';
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
export default AnimalNeedHelp = React.memo(props => {
	// console.log('AnimalNeedHelp', props.data.protect_request_status);
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const [selected, setSelected] = React.useState(false);
	const [thumbnailData, setThumbnailData] = React.useState({});

	// 불러오는 db 필드명이 다르기에 일치시키기 위한 함수
	const checkthumbnailData = () => {
		let resultJSON = {};
		resultJSON._id = data._id;

		// 사진 필드는 변경 가능성 있음. 일단 썸네일 필드로 지정
		if (data.hasOwnProperty('protect_request_photo_thumbnail')) {
			resultJSON.img_uri = data.protect_request_photo_thumbnail;
		} else if (data.hasOwnProperty('protect_request_photos_uri')) {
			//보호 요청 썸네일
			resultJSON.img_uri = data.protect_request_photos_uri?.[0] || DEFAULT_ANIMAL_PROFILE;
		} else if (data.hasOwnProperty('feed_thumbnail')) {
			// 실종/제보 썸네일
			resultJSON.img_uri = data.feed_thumbnail;
		} else if (data.hasOwnProperty('protect_animal_photo_uri_list')) {
			resultJSON.img_uri = data.protect_animal_photo_uri_list[0] == undefined ? DEFAULT_ANIMAL_PROFILE : data.protect_animal_photo_uri_list[0];
		} else {
			//기본 썸네일 적용
			resultJSON.img_uri = DEFAULT_ANIMAL_PROFILE;
		}

		// 보호 동물의 데이터 일 경우 (세 필드 중에 하나라도 존재 하지 않는다면 API를 불러오는 함수 확인)
		if (data.hasOwnProperty('protect_animal_sex') && data.hasOwnProperty('protect_animal_status')) {
			// console.log('data.protect_animal_sex', data.protect_animal_sex);
			resultJSON.gender = data.protect_animal_sex;
			resultJSON.status =
				data.protect_request_status != undefined ? data.protect_request_status : data.protect_act_request_article_id.protect_request_status;
		} else if (data.hasOwnProperty('feed_type')) {
			// 실종/제보는 feed_type에서 동물 상태 얻어옴
			resultJSON.status = data.feed_type;
			if (data.hasOwnProperty('missing_animal_sex')) {
				resultJSON.gender = data.missing_animal_sex;
			} else if (data.hasOwnProperty('report_animal_sex')) {
				resultJSON.gender = data.report_animal_sex;
			}
		} else {
			resultJSON.gender = data.protect_animal_id?.protect_animal_sex;
			resultJSON.status = data.protect_request_status || data.protect_act_status;
			// 기타 다른 경우의 수가 있는지 추후 확인
		}
		setThumbnailData(resultJSON);
	};

	React.useEffect(() => {
		checkthumbnailData();
		setData(props.data);
	}, [props.data]);

	const checkSelected = () => {
		setSelected(!selected);
	};

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

	//입양자 정보 클릭
	const onPressAdoptorInfo = () => {
		props.onPressAdoptorInfo();
	};

	const onPressProtectRequest = () => {
		props.onPressProtectRequest();
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
		} else {
			date = data.protect_request_date;
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
				<View style={[animalNeedHelp.detail_lowerMenu, {width: props.selectMode ? 350 * DP : 410 * DP, justifyContent: 'center'}]}>
					{data.feed_type != 'missing' && data.feed_type != 'report' && (
						<View style={{justifyContent: 'space-between'}}>
							{/* 동물 종류 및 품종 */}
							<View style={[animalNeedHelp.lowerMenu_kindAndBreed]}>
								<Text style={[txt.noto34b]}>{data.protect_animal_species || ''}</Text>
								<Text style={[txt.noto28, animalNeedHelp.breedText]}>{data.protect_animal_species_detail || ''}</Text>
							</View>
							{/* 보호요청 관련 Details */}
							<View style={[animalNeedHelp.lowerMenu_helpDetail]}>
								<Text style={[txt.noto28]}>등&nbsp; 록&nbsp; 일 : {getParsedDate()}</Text>
								<Text style={[txt.noto28]} numberOfLines={1}>
									{/* 보호장소 : {data.protect_request_writer_id != null ? data.protect_request_writer_id.shelter_name : data.shelter_name} */}
									보호장소 : {data.user_nickname ? data.user_nickname : data.protect_request_writer_id.user_nickname}
								</Text>
								<Text style={[txt.noto28]} numberOfLines={1}>
									구조지역 :{' '}
									{data.protect_animal_rescue_location
										? data.protect_animal_rescue_location
										: data.protect_animal_id
										? data.protect_animal_id.protect_animal_rescue_location
										: '작성되지 않았습니다.'}
								</Text>
							</View>
						</View>
					)}
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
		<>
			<View style={[selected ? animalNeedHelp.container_seleted : animalNeedHelp.container, {}]}>
				<View style={[animalNeedHelp.container_basicInfo]}>
					{/* CheckBox */}
					{props.checkBoxMode ? (
						<View style={[animalNeedHelp.checkBoxContainer]}>
							<CheckBox
								state={props.isCheckAll}
								isDeleted={props.isDeleted}
								checkBoxState={data.checkBoxState}
								onCheck={() => props.onCheckBox(props.data.type == 'hash' ? props.data.keyword : props.data.user_nickname)}
							/>
						</View>
					) : null}
					<View style={[animalNeedHelp.protectedThumbnail_container]}>
						{/* Pet Thumbnail */}
						{/* {console.log(`AnimalNeedHelp:thumbnailData=>${JSON.stringify(thumbnailData)}`)} */}
						<ProtectedThumbnail data={thumbnailData} onLabelClick={(status, id) => props.onClickLabel(status, id)} />
					</View>
					{/* Pet Info */}
					{/* borderMode가 true일 경우에만 TouchableOpacity가 가능하도록 함. */}
					{props.borderMode ? (
						<TouchableOpacity onPress={checkSelected}>
							<View>{contents()}</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.2} onPress={() => props.onClickLabel(data.feed_type, data._id)}>
							<View>{contents()}</View>
						</TouchableOpacity>
					)}
					<View style={[animalNeedHelp.detail_upper_tag]}>
						{props.showFavorite ? (
							checkIsMyPost() ? (
								<></>
							) : data.is_favorite ? (
								<FavoriteTag48_Filled onPress={() => onPressFavoriteTag(false)} />
							) : (
								<FavoriteTag48_Border onPress={() => onPressFavoriteTag(true)} />
							)
						) : (
							<></>
						)}
					</View>
				</View>
				{props.borderMode == true
					? selected && (
							<View style={[animalNeedHelp.sideBtn_view]}>
								<AniButton btnLayout={[btn_w276]} btnTitle={'게시글 보기'} btnTheme={'shadow'} onPress={onPressProtectRequest} />
								<AniButton btnLayout={[btn_w276]} btnTitle={'입양처 보기'} btnTheme={'shadow'} onPress={onPressAdoptorInfo} />
							</View>
					  )
					: null}
			</View>
		</>
	);
});

AnimalNeedHelp.defaultProps = {
	selected: false,
	onClickLabel: e => {},
	onFavoriteTag: e => console.log(e),
	onPressAdoptorInfo: e => console.log('e'),
	isChecked: false,
	inActiveOpacity: false,
	showFavorite: true,
	selectMode: false,
};
