import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLUE20, GRAY10, GRAY20} from 'Root/config/color';
import {animalProtectRequestDetail_style, temp_style} from 'Root/component/templete/style_templete';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 */
const ProtectAnimalInfoBox = props => {
	const data = props.data;
	// console.log('data', data);

	return (
		<View style={[styles.rescueSummary]}>
			<View style={[styles.rescueSummary_insideContainer]}>
				<View style={[styles.rescueSummary_insideItem]}>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>분류</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_species : ''}
					</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>품종</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_species_detail : ''}
					</Text>
					<Text style={[txt.noto24, animalProtectRequestDetail_style.rescueSummary_insideItem_category]}>성별</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? (data.protect_animal_id.protect_animal_sex == 'male' ? '수컷' : '암컷') : ''}
					</Text>
				</View>
				<View style={[styles.rescueSummary_insideItem]}>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>예상연령</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_estimate_age : ''}
					</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>체중</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_weight : ''} kg
					</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>중성화</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content]}>
						{data.protect_animal_id ? (data.protect_animal_id.protect_animal_neutralization == 'yes' ? 'O' : 'X') : ''}
					</Text>
				</View>
				<View style={[styles.rescueSummary_insideItem]}>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_category]}>발견장소</Text>
					<Text style={[txt.noto24, styles.rescueSummary_insideItem_content, {maxWidth: 500 * DP}]}>
						{data.protect_animal_id ? data.protect_animal_id.protect_animal_rescue_location : ''}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rescueSummary: {
		marginTop: 28 * DP,
		zIndex: -1,
		width: 654 * DP,
		borderWidth: 4 * DP,
		borderColor: APRI10,
		borderRadius: 40 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rescueSummary_insideContainer: {
		width: 594 * DP,
		paddingVertical: 20 * DP,
	},
	rescueSummary_insideItem: {
		width: 594 * DP,
		// height: 36 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	rescueSummary_insideItem_category: {
		marginRight: 10 * DP,
		color: GRAY20,
	},
	rescueSummary_insideItem_content: {
		marginRight: 50 * DP,
	},
});

export default ProtectAnimalInfoBox;
