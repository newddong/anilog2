import React from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';

/**
 * 실종제보 요약정보 올가니즘 컴포넌트
 * 'feed_type' 'missing' 'report' 시 사용됨.
 * @param {object} data - 실종제보 피드 정보 MissingAnimalDetail 또는 ReportDetail의 data
 * @param {string} missing_animal_species 실종 게시물의 실종 동물 종
 * @param {string} missing_animal_species_detail 실종 게시물의 실종 동물 품종
 * @param {string} missing_animal_sex 실종 게시물의 실종 동물 성별
 * @param {string} missing_animal_age 실종 게시물의 실종 동물 나이
 * @param {string} missing_animal_lost_location 실종 게시물의 실종 동물 실종위치
 * @param {string} missing_animal_contact 실종 게시물의 게시자 연락처
 * @param {string} missing_animal_features 실종 게시물의 실종 동물 특징
 * @param {string} missing_animal_date 실종 게시물의 실종일
 * @param {string} feed_type missing, report 로 실종 / 제보 분기 처리
 * @param {string} report_witness_date 제보 게시물의 제보 날짜
 * @param {string} report_witness_location 제보 게시물의 제보 위치
 * @returns 실종제보 요약정보 컴포넌트
 */
const MissingReportInfo = props => {
	const {
		missing_animal_species,
		missing_animal_species_detail,
		missing_animal_sex,
		missing_animal_age,
		missing_animal_lost_location,
		missing_animal_contact,
		missing_animal_features,
		missing_animal_date,
		feed_type,
		report_witness_date,
		report_witness_location,
	} = props.data;

	var newAnimalSex = '';
	//missing_animal_sex 문자열 처리
	switch (missing_animal_sex) {
		case 'male':
			newAnimalSex = '수컷';
			break;
		case 'female':
			newAnimalSex = '암컷';
			break;
		case 'unknown':
			newAnimalSex = '모름';
		default:
			newAnimalSex = '모름';
			break;
	}
	//MissingReportInfo 하나의 정보 컴포넌트
	const InfoOneLine = props => {
		return (
			<View style={{flexDirection: 'row', alignItems: 'flex-start', width: 606 * DP, marginBottom: 5 * DP}}>
				<View style={{width: 144 * DP, justifyContent: 'flex-start'}}>
					<Text style={style.missingTextMainColor}>{props.title}</Text>
				</View>
				<View style={{width: 462 * DP, justifyContent: 'flex-start'}}>
					<Text style={style.missingTextBlack}>{props.content}</Text>
				</View>
			</View>
		);
	};
	//
	if (feed_type == 'missing') {
		const newMissingDateText = missing_animal_date.toString().split('-');
		const newMissingDate = newMissingDateText[0] + '.' + newMissingDateText[1] + '.' + newMissingDateText[2].toString().substring(0, 2);
		return (
			<View style={style.container}>
				<InfoOneLine title="동물 분류 : " content={missing_animal_species + ' / ' + missing_animal_species_detail} />
				<InfoOneLine title="실종 날짜 : " content={newMissingDate} />
				<InfoOneLine title="성별/나이 : " content={newAnimalSex + ' / ' + missing_animal_age + '살'} />
				<InfoOneLine title="실종 위치 : " content={missing_animal_lost_location} />
				<InfoOneLine title="연  락  처 : " content={missing_animal_contact} />
				<InfoOneLine title="특       징 : " content={missing_animal_features} />
			</View>
		);
	} else if (feed_type == 'report') {
		console.log('ReportMissing Date', report_witness_date);
		//날짜 문자열 형식처리
		const newReportDateText = report_witness_date.toString().split('-');
		const newReportDate = newReportDateText[0] + '.' + newReportDateText[1] + '.' + newReportDateText[2].toString().substring(0, 2);
		return (
			<View style={style.container}>
				<InfoOneLine title="제보 날짜 : " content={newReportDate} />
				<InfoOneLine title="제보 장소 : " content={report_witness_location} />
			</View>
		);
	}
};

MissingReportInfo.defaultProps = {
	data: {
		missing_animal_species: '',
		missing_animal_species_detail: '',
		missing_animal_sex: '',
		missing_animal_age: '',
		missing_animal_lost_location: '',
		missing_animal_contact: '',
		missing_animal_features: '',
		feed_type: '',
	},
};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		// height: 488 * DP,
		borderColor: '#FFB6A5',
		borderWidth: 4 * DP,
		borderRadius: 15,
		paddingTop: 30 * DP,
		paddingLeft: 24 * DP,
		paddingBottom: 30 * DP,
	},
	missingTextMainColor: {
		fontSize: 30 * DP,
		color: '#FF9888',
	},
	missingTextBlack: {
		color: '#191919',
	},
	missingTextMainBox: {
		width: 144 * DP,
		height: 48 * DP,
	},
});

export default MissingReportInfo;
