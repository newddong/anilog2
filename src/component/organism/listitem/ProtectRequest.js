import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
import {APRI10, GRAY10} from 'Root/config/color';

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
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const {
		_id,
		protect_request_status,
		protect_request_photos_uri,
		protect_animal_sex,
		notice_day,
		is_favorite,
		protect_request_date,
		protect_request_notice_sdt,
		protect_request_notice_edt,
		protect_request_writer_id, // {user_nickname, _id }
		protect_animal_species,
		protect_animal_species_detail,
		protect_animal_id, //protect_animal_rescue_location
	} = props.data;

	const thumbnailData = {
		status: data.protect_request_status,
		_id: data._id,
		img_uri: data.protect_request_photo_thumbnail && data.protect_request_photo_thumbnail,
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

	const contents = () => {
		return (
			<View style={[style.detailContainer, {width: props.selectMode ? 320 * DP : 380 * DP}]}>
				<View style={[style.detail_lowerMenu, {justifyContent: 'center'}]}>
					<View style={{justifyContent: 'space-between'}}>
						{/* 동물 종류 및 품종 */}
						<View style={[style.lowerMenu_kindAndBreed]}>
							<Text style={[txt.noto34b]}>{data.protect_animal_species || ''}</Text>
							<Text style={[txt.noto28, style.breedText]} numberOfLines={1}>
								{data.protect_animal_species_detail || ''}
							</Text>
							{/* <Text style={{color: 'red'}}> {props.index}</Text> */}
						</View>
						{/* 보호요청 관련 Details */}
						<View style={[style.lowerMenu_helpDetail]}>
							<Text style={[txt.noto28]}>
								공고일자 :{' '}
								{moment(data.protect_request_notice_sdt).format('YY.MM.DD') + '~' + moment(data.protect_request_notice_edt).format('YY.MM.DD')}
							</Text>
							<Text style={[txt.noto28]}>등&nbsp; 록&nbsp; 일 : {getParsedDate()}</Text>
							<Text style={[txt.noto28, {maxWidth: props.selectMode ? 320 * DP : 380 * DP}]} numberOfLines={1}>
								보호장소 : {data.protect_request_writer_id ? data.protect_request_writer_id.user_nickname : ''}
							</Text>
							<Text style={[txt.noto28, {maxWidth: props.selectMode ? 320 * DP : 380 * DP}]} numberOfLines={1}>
								구조지역 : {data.protect_animal_id ? data.protect_animal_id.protect_animal_rescue_location : '작성되지 않았습니다.'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	return (
		<>
			<View style={[style.container, {height: 266 * DP}]}>
				<View style={[style.container_basicInfo]}>
					<View style={[style.protectedThumbnail_container]}>
						<ProtectedThumbnail
							data={thumbnailData}
							inActiveOpacity={props.inActiveOpacity}
							onLabelClick={(status, id) => props.onClickLabel(status, id)}
						/>
					</View>
					<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.6} onPress={() => props.onClickLabel()}>
						<View>{contents()}</View>
					</TouchableOpacity>
					<View style={[style.detail_upper_tag]}>
						{data.is_favorite ? (
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

const style = StyleSheet.create({
	container: {
		// width: 654 * DP,
		// height: 214 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		item_bracket: '#FF00FF',
	},
	protectedThumbnail_container: {
		width: 226 * DP,
		height: 226 * DP,
	},
	gender: {
		width: 48 * DP,
		height: 48 * DP,
		position: 'absolute',
		right: 10 * DP,
		top: 10 * DP,
	},
	detailContainer: {
		width: 380 * DP,
		height: 214 * DP,
		marginLeft: 30 * DP,
		// marginTop: 10 * DP,
	},
	detail_upper_petStateContainer: {
		height: 38 * DP,
		flexDirection: 'row',
	},
	detail_upper_petState: {
		height: 38 * DP,
		borderRadius: 12 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY10,
		paddingHorizontal: 10 * DP,
		marginRight: 12 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	detail_upper_tag: {
		width: 48 * DP,
		height: 48 * DP,
	},
	detail_lowerMenu: {
		width: 410 * DP,
		height: 214 * DP,
		paddingVertical: 4 * DP,
	},
	lowerMenu_kindAndBreed: {
		height: 50 * DP,
		// justifyContent: 'center',
		marginBottom: -5 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	breedText: {
		alignSelf: 'center',
		marginLeft: 20 * DP,
		maxWidth: 250 * DP,
	},
	lowerMenu_helpDetail: {
		// height: 38 * DP,
		// marginTop: 10 * DP,
		// backgroundColor: 'yellow',
	},
	container_basicInfo: {
		flexDirection: 'row',
		// backgroundColor: '#FF00FF',
	},
});
