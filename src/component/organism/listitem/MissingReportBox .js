import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, Image, Platform} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../listitem/UserNote';
import OneAlarm from '../listitem/OneAlarm';
import {txt} from 'Root/config/textstyle';
import {BLACK, GRAY10, GRAY40, WHITE} from 'Root/config/color';
/**
 * 알람 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 데이터
 * @param {Int} props.index - 알림 데이터의 오늘, 어제, 이번주 (0,1,2)인덱스
 * @param {boolean} props.newNote - 사용자의 새로운 알람이 있다면 true 아니면 false
 * @param {boolean} props.isData - 오늘, 어제 , 이번주 각각의 array에 data가 있으면 true 없으면 false
 * @param {void} props.onClickLabel - 알림 라벨 클릭
 */
const stringList = ['오늘', '어제', '이번 주'];
const MissingReportBox = props => {
	// console.log('Daily Alarm props', props.data, props.index);
	// console.log('newNote', props.index == 0 && props.newNote);
	const [objCity, setObjCity] = React.useState('');
	React.useEffect(() => {
		try {
			let objCitys = JSON.parse(`${props.data?.missing_animal_lost_location}`);
			setObjCity(`${objCitys.city} ${objCitys.district}`);
		} catch (err) {
			// console.log('err', err);
		}
	}, []);

	return (
		<View style={[styles.content, styles.shadow]}>
			{props.data.feed_type == 'missing' ? (
				<View>
					<View style={[styles.absolute_missing]}>
						<Text style={[txt.noto28b, {color: '#FFFFFF'}, {textAlign: 'center'}, {margin: 6 * DP}]}>실종</Text>
					</View>
					<Image
						style={[styles.img_210]}
						source={{
							uri: props.data.feed_thumbnail,
						}}
					/>
					<View style={[styles.date_txt]}>
						<Text style={[txt.noto28b, {textAlign: 'center'}, {color: 'black'}]}>{props.data.missing_animal_date.slice(0, 9)} 실종</Text>
						<Text style={[txt.noto28b, {textAlign: 'center'}, {color: 'black'}]}>
							{props.data.missing_animal_species} / {props.data.missing_animal_age}살
						</Text>
						<Text style={[txt.noto26, {textAlign: 'center'}, {color: GRAY10}]} numberOfLines={1}>
							{objCity}
						</Text>
					</View>
				</View>
			) : (
				<View>
					<View style={[styles.absolute_report]}>
						<Text style={[txt.noto28b, {color: '#FFFFFF'}, {textAlign: 'center'}, {margin: 6 * DP}]}>제보</Text>
					</View>
					<Image
						style={[styles.img_210]}
						source={{
							uri: props.data.feed_thumbnail,
						}}
					/>
					<View style={[styles.date_txt]}>
						<Text style={[txt.noto28b, {textAlign: 'center'}, {color: 'black'}]} numberOfLines={1}>
							{props.data.report_witness_location}
						</Text>
						<Text style={[txt.noto26, {textAlign: 'center'}, {color: GRAY10}]} numberOfLines={2}>
							{props.data.feed_content || '내용 없음'}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 254 * DP,
		// height: 396 * DP,
		backgroundColor: WHITE,
		marginRight: 30 * DP,
		borderRadius: 30 * DP,
		shadowColor: BLACK,
		shadowOpacity: 0.4,
		shadowRadius: 4,
		shadowOffset: {
			height: 2,
			width: 2 * DP,
		},
		elevation: 3,
	},

	img_210: {
		marginTop: 24 * DP,
		width: 210 * DP,
		height: 210 * DP,
		borderRadius: 30 * DP,
		alignSelf: 'center',
		marginHorizontal: 22 * DP,
	},
	absolute_missing: {
		position: 'absolute',
		width: 96 * DP,
		height: 56 * DP,
		backgroundColor: 'red',
		alignSelf: 'center',
		zIndex: 1,
		elevation: 1,
		borderBottomEndRadius: 15 * DP,
		borderBottomStartRadius: 15 * DP,
		// right: 79 * DP,
		// left: 79 * DP,
	},
	absolute_report: {
		alignSelf: 'center',
		position: 'absolute',
		width: 96 * DP,
		height: 56 * DP,
		backgroundColor: '#FFD153',
		zIndex: 1,
		elevation: 1,
		borderBottomEndRadius: 15 * DP,
		borderBottomStartRadius: 15 * DP,
	},
	date_txt: {
		width: 210 * DP,
		// height: 44 * DP,
		alignSelf: 'center',
		marginTop: 10 * DP,
	},
	shadow: {
		width: 254 * DP,
		// height: 396 * DP,
		shadowColor: GRAY10,
		shadowOpacity: 0.4,
		shadowRadius: 4,
		shadowOffset: {
			height: 2,
			width: 2 * DP,
		},
		elevation: 3,
	},
	content: {
		width: 254 * DP,
		height: 396 * DP,
		borderRadius: 30 * DP,
		backgroundColor: WHITE,
		marginBottom: 10 * DP,
		// paddingVertical: 50 * DP,
		// paddingHorizontal: 32 * DP,
		marginRight: 30 * DP,
	},
});

MissingReportBox.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
};

export default React.memo(MissingReportBox);
