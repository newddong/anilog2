import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, Image, Platform} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {BLACK, GRAY10, GRAY40, MAINBLACK, WHITE} from 'Root/config/color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
/**
 * 알람 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 알림 데이터
 * @param {Int} props.index - 알림 데이터의 오늘, 어제, 이번주 (0,1,2)인덱스
 * @param {boolean} props.newNote - 사용자의 새로운 알람이 있다면 true 아니면 false
 * @param {boolean} props.isData - 오늘, 어제 , 이번주 각각의 array에 data가 있으면 true 없으면 false
 * @param {void} props.onClickLabel - 알림 라벨 클릭
 */
const MissingReportBox = props => {
	// console.log('propsopsdo', props);
	const [objCity, setObjCity] = React.useState('');
	const navigation = useNavigation();
	// console.log(moment(props.data?.missing_animal_date).format('YY.MM.DD'));
	React.useEffect(() => {
		try {
			let objCitys = JSON.parse(`${props.data?.missing_animal_lost_location}`);
			setObjCity(`${objCitys.district}`);
		} catch (err) {
			// console.log('err', err);
		}
	}, []);
	const onLabelClick = () => {
		console.log('new MissingData', props.data);
		let sexValue = '';
		switch (props.data.feed_type) {
			case 'missing':
				switch (props.data.missing_animal_sex) {
					case 'male':
						sexValue = '남';
						break;
					case 'female':
						sexValue = '여';
						break;
					case 'unknown':
						sexValue = '성별모름';
						break;
				}
				const titleValue = props.data.missing_animal_species + '/' + props.data.missing_animal_species_detail + '/' + sexValue;
				navigation.navigate('MissingAnimalDetail', {title: titleValue, _id: props.data._id});
				break;
			case 'report':
				navigation.navigate('ReportDetail', {_id: props.data._id});
				break;
		}
	};
	return (
		<View style={[styles.content]}>
			<TouchableOpacity onPress={onLabelClick}>
				{props.data.feed_type == 'missing' ? (
					<View>
						<View style={[styles.absolute_missing]}>
							<Text style={[txt.noto20, {color: '#FFFFFF'}, {textAlign: 'center'}, {margin: 6 * DP}]}>실종</Text>
						</View>
						<Image
							style={[styles.img_156]}
							source={{
								uri: props.data.feed_thumbnail,
							}}
						/>
						<View style={[styles.date_txt]}>
							<Text style={[txt.roboto26, {textAlign: 'center'}, {color: MAINBLACK}, {height: 32 * DP}]}>
								{moment(props.data?.missing_animal_date).format('YY.MM.DD')}
							</Text>
							{/* <Text style={[txt.noto28b, {textAlign: 'center'}, {color: 'black'}]}>
								{props.data.missing_animal_species} / {props.data.missing_animal_age}살
							</Text> */}
							<Text style={[txt.noto26, {textAlign: 'center'}, {color: MAINBLACK}]} numberOfLines={1}>
								{objCity}
							</Text>
						</View>
					</View>
				) : (
					<View>
						<View style={[styles.absolute_report]}>
							<Text style={[txt.noto20, {color: MAINBLACK}, {textAlign: 'center'}, {margin: 6 * DP}]}>제보</Text>
						</View>
						<Image
							style={[styles.img_156]}
							source={{
								uri: props.data.feed_thumbnail,
							}}
						/>
						<View style={[styles.date_txt]}>
							<Text style={[txt.roboto26, {textAlign: 'center'}, {color: MAINBLACK}, {height: 32 * DP}]} numberOfLines={1}>
								{/* {props.data.report_witness_location} */}
								{moment(props.data.report_witness_date).format('YY.MM.DD')}
							</Text>
							<Text style={[txt.noto26, {textAlign: 'center'}, {color: MAINBLACK}]} numberOfLines={1}>
								{/* {props.data.feed_content || '내용 없음'} */}
								{props.data.report_witness_location.split(' ', 2)[1] || ''}
							</Text>
						</View>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 156 * DP,
		height: 248 * DP,
		// backgroundColor: WHITE,
		// backgroundColor: 'yellow',
		marginRight: 30 * DP,
		// borderRadius: 30 * DP,
	},

	img_156: {
		// marginTop: 24 * DP,
		width: 156 * DP,
		height: 156 * DP,
		borderRadius: 30 * DP,
		alignSelf: 'center',
		marginHorizontal: 22 * DP,
	},
	absolute_missing: {
		position: 'absolute',
		width: 73 * DP,
		height: 43 * DP,
		backgroundColor: 'red',
		alignSelf: 'flex-start',
		zIndex: 1,
		elevation: 1,
		borderTopLeftRadius: 30 * DP,
		borderBottomEndRadius: 15 * DP,
		borderBottomStartRadius: 15 * DP,
		// right: 79 * DP,
		// left: 79 * DP,
	},
	absolute_report: {
		alignSelf: 'flex-start',
		position: 'absolute',
		width: 73 * DP,
		height: 43 * DP,
		backgroundColor: '#FFD153',
		zIndex: 1,
		elevation: 1,
		borderTopLeftRadius: 30 * DP,
		borderBottomEndRadius: 15 * DP,
		borderBottomStartRadius: 15 * DP,
	},
	date_txt: {
		width: 210 * DP,
		// height: 44 * DP,
		alignSelf: 'center',
		marginTop: 20 * DP,
	},
	shadow: {
		width: 156 * DP,
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
		width: 156 * DP,
		height: 248 * DP,
		// borderRadius: 30 * DP,
		backgroundColor: WHITE,
		// marginBottom: 10 * DP,
		// paddingVertical: 50 * DP,
		// paddingHorizontal: 32 * DP,
		// marginLeft: 30 * DP,
		marginRight: 20 * DP,
		// marginLeft: 28 * DP,
	},
});

MissingReportBox.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	onCheckBox: e => console.log(e),
};

export default React.memo(MissingReportBox);
