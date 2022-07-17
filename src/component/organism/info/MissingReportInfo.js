import React from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
import HashText from 'Root/component/molecules/info/HashText';
import {APRI10, GRAY50} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

/**
 * 실종제보 요약정보 올가니즘 컴포넌트
 * 'feed_type' 'missing' 'report' 시 사용됨.
 * @param {object} props.data - 실종제보 피드 정보 MissingAnimalDetail 또는 ReportDetail의 data 객체
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
		feed_content,
	} = props.data;

	let newAnimalSex = '';
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

	const getAge = date => {
		let yr = date;
		let month = Math.floor((yr - Math.floor(yr)) * 12);
		let missingAnimalAge = '';
		if (yr >= 1) {
			missingAnimalAge = Math.floor(yr) + '살' + (month > 0 ? ' ' + month + '개월' : '');
		} else {
			missingAnimalAge = month + '개월';
		}
		return missingAnimalAge;
	};

	//MissingReportInfo 하나의 정보 컴포넌트
	const InfoOneLine = props => {
		const arr = props.title.split('');
		return (
			<View style={[style.infoOneLineCont]}>
				<View style={{width: 118 * DP, justifyContent: 'space-between', flexDirection: 'row'}}>
					{arr.map((v, i) => {
						return (
							<Text key={i} style={[txt.noto26b, {justifyContent: 'space-between', textAlign: 'justify'}]}>
								{v}
							</Text>
						);
					})}
					{/* <Text style={[txt.noto26b, {justifyContent: 'space-between', textAlign: 'justify'}]} numberOfLines={1}>
						{props.title}
					</Text> */}
				</View>
				<Text style={[txt.noto26b]}> : </Text>

				{props.isHash ? (
					<HashText style={[txt.noto28, {width: 482 * DP}]} byteOfLine={55} hide={true}>
						{props.content || '내용 없음'}
					</HashText>
				) : (
					<View style={{width: 482 * DP, justifyContent: 'center'}}>
						<Text style={[txt.noto28]}>{props.content}</Text>
					</View>
				)}
			</View>
		);
	};
	if (feed_type == 'missing') {
		const newMissingDateText = missing_animal_date.toString().split('-');
		const newMissingDate = newMissingDateText[0] + '.' + newMissingDateText[1] + '.' + newMissingDateText[2].toString().substring(0, 2);
		let splitAddress = missing_animal_lost_location.split('"');
		let newMissingLocation = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];
		return (
			<View style={style.container}>
				<InfoOneLine title="동물 분류" content={missing_animal_species + ' / ' + missing_animal_species_detail} />
				<InfoOneLine title="실종 날짜" content={newMissingDate} />
				<InfoOneLine title="성별/나이" content={newAnimalSex + ' / ' + getAge(missing_animal_age)} />
				<InfoOneLine title="실종 위치" content={newMissingLocation} />
				<InfoOneLine title="연락처" content={missing_animal_contact} />
				<InfoOneLine title="특징" content={missing_animal_features} />
			</View>
		);
	} else if (feed_type == 'report') {
		// console.log('ReportMissing Date', report_witness_date);
		//날짜 문자열 형식처리
		const newReportDateText = report_witness_date.toString().split('-');
		const newReportDate = newReportDateText[0] + '.' + newReportDateText[1] + '.' + newReportDateText[2].toString().substring(0, 2);
		return (
			<View style={style.container}>
				<InfoOneLine title="제보 날짜" content={newReportDate} />
				<InfoOneLine title="제보 장소" content={report_witness_location} />
				<InfoOneLine title="제보 내용" content={feed_content} isHash />
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
		width: 694 * DP,
		// borderWidth: 4 * DP,
		borderRadius: 40 * DP,
		backgroundColor: GRAY50,
		paddingVertical: 28 * DP,
		paddingHorizontal: 28 * DP,
		overflow: 'hidden',
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
	infoOneLineCont: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		minHeight: 40 * DP,
		width: 606 * DP,
		marginBottom: 5 * DP,
	},
});

export default MissingReportInfo;
