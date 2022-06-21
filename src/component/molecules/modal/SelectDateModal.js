import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList} from 'react-native';
import {WHITE, GRAY20, APRI20, GRAY30, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {CALENDAR_DAY, CALENDAR_MONTH, CALENDAR_YEAR} from 'Root/i18n/msg';
import moment from 'moment';

/**
 * 날짜 셀렉트 스크롤 박스 모달
 *
 * @param {Object} props - props object
 * @param {()=>void} props.onSelect - 등록 버튼 콜백
 *
 */
const SelectDateModal = props => {
	const [year, setYear] = React.useState(2);
	const [month, setMonth] = React.useState(2);
	const [day, setDay] = React.useState(2);
	const padding = '';

	const onSelect = () => {
		let selectedYear = CALENDAR_YEAR()[year];
		let selectedMonth = CALENDAR_MONTH[month];
		let selectedDay = '';
		const days31 = ['1', '3', '5', '7', '8', '10', '12'];
		const days30 = ['4', '6', '9', '11'];

		if (days31.includes(CALENDAR_MONTH[month])) {
			selectedDay = CALENDAR_DAY().day31[day];
		} else if (days30.includes(CALENDAR_MONTH[month])) {
			selectedDay = CALENDAR_DAY().day30[day];
		} else {
			selectedDay = CALENDAR_DAY().day29[day];
		}
		const selectedDate = moment(new Date(selectedYear, selectedMonth - 1, selectedDay)).format('YYYY-MM-DD');
		props.onSelect(selectedDate);
	};

	const onScrollYear = (event, i) => {
		// console.log('event', event.nativeEvent.contentOffset);
		let y = event.nativeEvent.contentOffset.y;
		let focused = Math.floor(y / (68 * DP));
		// console.log('foucsed', focused);
		if (focused < 1) {
			setYear(2);
		} else {
			setYear(focused + 2);
		}
	};

	const onScrollMonth = (event, i) => {
		// console.log('event', event.nativeEvent.contentOffset);
		let y = event.nativeEvent.contentOffset.y;
		let focused = Math.floor(y / (69 * DP));
		console.log('foucsed', focused);
		if (focused < 1) {
			setMonth(2);
		} else {
			setMonth(focused + 2);
		}
	};
	const onScrollDay = (event, i) => {
		// console.log('event', event.nativeEvent.contentOffset);
		let y = event.nativeEvent.contentOffset.y;
		let focused = Math.floor(y / (66 * DP));
		console.log('foucsed', focused);
		if (focused < 1) {
			setDay(2);
		} else {
			setDay(focused + 2);
		}
	};

	const getDays = () => {
		const days31 = ['1', '3', '5', '7', '8', '10', '12'];
		const days30 = ['4', '6', '9', '11'];
		if (days31.includes(CALENDAR_MONTH[month])) {
			return CALENDAR_DAY().day31;
		} else if (days30.includes(CALENDAR_MONTH[month])) {
			return CALENDAR_DAY().day30;
		} else {
			if (Math.abs((CALENDAR_YEAR()[year] - 2020) % 4) == 0) {
				return CALENDAR_DAY().day29;
			} else return CALENDAR_DAY().day28;
		}
	};

	return (
		<View style={style.background}>
			<TouchableWithoutFeedback onPress={() => Modal.close()}>
				<View style={{width: 750 * DP, height: 700}} />
			</TouchableWithoutFeedback>
			<View style={style.popUpWindow}>
				<View style={style.header}>
					<Text style={[txt.noto30b]}>{props.header}</Text>
					<TouchableOpacity onPress={onSelect}>
						<Text style={[txt.noto30b]}>완료</Text>
					</TouchableOpacity>
				</View>
				<View style={style.scrollContainer}>
					<View style={[style.list, {}]}>
						<FlatList
							data={CALENDAR_YEAR()}
							onScroll={onScrollYear}
							showsVerticalScrollIndicator={false}
							renderItem={({item, index}) => {
								return (
									<TouchableWithoutFeedback key={index} onPress={() => setYear(index)}>
										<View
											key={index}
											style={[index == year && item != padding ? {backgroundColor: GRAY30} : null, style.listItem, {width: 250 * DP}]}>
											<Text style={[txt.roboto34, {color: item == padding ? GRAY20 : BLACK}]}>{item == padding ? item : item + '년'}</Text>
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
					</View>
					<View style={[style.list, {justifyContent: 'center'}]}>
						<FlatList
							data={CALENDAR_MONTH}
							onScroll={onScrollMonth}
							// scrollTo
							showsVerticalScrollIndicator={false}
							renderItem={({item, index}) => {
								return (
									<TouchableWithoutFeedback key={index} onPress={() => setMonth(index)}>
										<View key={index} style={[style.listItem, index == month && item != '' ? {backgroundColor: GRAY30} : null, {width: 188 * DP}]}>
											<Text style={[txt.roboto34, {color: item == padding ? GRAY20 : BLACK}]}>{item == '' ? item : item + '월'}</Text>
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
						{/* <View style={[{position: 'absolute', backgroundColor: APRI10, width: 188 * DP, height: 70 * DP, alignSelf: 'center', zIndex: -1}]}></View> */}
					</View>
					<View style={[style.list, {}]}>
						<FlatList
							data={getDays()}
							onScroll={onScrollDay}
							showsVerticalScrollIndicator={false}
							renderItem={({item, index}) => {
								return (
									<TouchableWithoutFeedback key={index} onPress={() => setDay(index)}>
										<View key={index} style={[style.listItem, index == day && item != '' ? {backgroundColor: GRAY30} : null, {width: 188 * DP}]}>
											<Text style={[txt.roboto34, {color: item == padding ? GRAY20 : BLACK}]}>{item == '' ? item : item + '일'}</Text>
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

SelectDateModal.defaultProps = {
	header: 'popUp',
	onSelect: () => {},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 750 * DP,
		height: 476 * DP,
		// backgroundColor: 'yellow',
		paddingBottom: 52 * DP,
		// paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
		alignItems: 'center',
	},
	header: {
		width: 750 * DP,
		height: 88 * DP,
		flexDirection: 'row',
		backgroundColor: GRAY30,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	scrollContainer: {
		flexDirection: 'row',
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: WHITE,
	},
	list: {
		// width: 750 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'center',
		// width: 666 * DP,
		height: 70 * DP,
		borderRadius: 20 * DP,
	},
});

export default SelectDateModal;
