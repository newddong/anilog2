import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLUE20, GRAY10, GRAY20, GRAY50} from 'Root/config/color';
import {animalProtectRequestDetail_style, temp_style} from 'Root/component/templete/style_templete';
import moment from 'moment';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 */
const ProtectAnimalInfoBox = props => {
	const data = props.data;
	// console.log('ProtectAnimalInfoBox', data);
	const parseDateToString = date => {
		let str = moment(date).format('YY.MM.DD');
		return str;
	};
	const getGender = () => {
		data.protect_animal_id ? (data.protect_animal_id.protect_animal_sex == 'male' ? '수컷' : '암컷') : '';
		let gender = '모름';
		if (data.protect_animal_id) {
			switch (data.protect_animal_id.protect_animal_sex) {
				case 'male':
					gender = '수컷';
					break;
				case 'female':
					gender = '암컷';
					break;
				default:
					gender = '모름';
					break;
			}
		}
		return gender;
	};

	return (
		<View style={[styles.rescueSummary]}>
			<View style={[styles.rescueSummary_insideContainer]}>
				{/* 공고번호 */}
				{data.protect_animal_noticeNo ? (
					<View style={[styles.rescueSummary_insideItem]}>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>공고번호</Text>
						<Text style={[txt.noto28]}>{data.protect_animal_noticeNo ? data.protect_animal_noticeNo : ''}</Text>
					</View>
				) : (
					<></>
				)}
				{/* 공고일자 */}
				{data.protect_request_notice_sdt && data.protect_request_notice_edt ? (
					<View style={[styles.rescueSummary_insideItem]}>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>공고일자</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>
							{parseDateToString(data.protect_request_notice_sdt)} ~ {parseDateToString(data.protect_request_notice_edt)}
						</Text>
					</View>
				) : (
					<></>
				)}
				<View style={[styles.rescueSummary_insideItem]}>
					<View style={{flexDirection: 'row', alignItems: 'center', width: 490 * DP}}>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>분류</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>
							{data.protect_animal_id ? data.protect_animal_id.protect_animal_species : ''}
						</Text>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>품종</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content, {}]}>
							{data.protect_animal_id ? data.protect_animal_id.protect_animal_species_detail : ''}
						</Text>
					</View>
					<Text style={[txt.noto24, animalProtectRequestDetail_style.rescueSummary_insideItem_category, {}]}>성별</Text>
					<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>{getGender()}</Text>
				</View>
				<View style={[styles.rescueSummary_insideItem, {justifyContent: 'space-between'}]}>
					<View style={{flexDirection: 'row', alignItems: 'center', width: 490 * DP}}>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>예상연령</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>
							{data.protect_animal_id ? data.protect_animal_id.protect_animal_estimate_age : ''}
						</Text>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>체중</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>
							{data.protect_animal_id ? data.protect_animal_id.protect_animal_weight : ''} kg
						</Text>
					</View>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={[txt.noto24, styles.rescueSummary_insideItem_category, {}]}>중성화</Text>
						<Text style={[txt.noto28, styles.rescueSummary_insideItem_content]}>
							{data.protect_animal_id ? (data.protect_animal_id.protect_animal_neutralization == 'yes' ? 'O' : 'X') : ''}
						</Text>
					</View>
				</View>
				<View style={[styles.rescueSummary_insideItem]}>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>발견장소</Text>
					<Text style={[txt.noto28, styles.rescueSummary_insideItem_content, {maxWidth: 500 * DP}]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_rescue_location : ''}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rescueSummary: {
		zIndex: -1,
		width: 694 * DP,
		borderRadius: 40 * DP,
		backgroundColor: GRAY50,
		paddingVertical: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rescueSummary_insideContainer: {
		width: 634 * DP,
	},
	rescueSummary_insideItem: {
		width: 634 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rescueSummary_insideItem_category: {
		marginRight: 10 * DP,
		color: GRAY20,
	},
	rescueSummary_insideItem_content: {
		marginRight: 70 * DP,
	},
});

export default ProtectAnimalInfoBox;
