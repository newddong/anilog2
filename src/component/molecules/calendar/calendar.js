import React from 'react';

import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Dimensions} from 'react-native';
import {styles} from './calendarStyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {day} from 'Root/i18n/msg';
import {txt} from 'Root/config/textstyle';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, GRAY50, WHITE} from 'Root/config/color';
import {ArrowMarkForCalendar, NextMark} from 'Root/component/atom/icon';
import YearDropDown from 'Molecules/dropdown/YearDropDown';
import AniButton from 'Molecules/button/AniButton';
import Modal from 'Root/component/modal/Modal';

/**
 * 달력 선택창을 모달로 띄우는 함수
 * @param {boolean} visible - 달력 모달 열기 true/false
 * @param {()=>void} onOff - 달력 모달 닫기 콜백
 * @param {(moment.Moment)=>void} date - 날짜 선택 반환값(Date타입)
 * @param {boolean} past - 과거 날짜만 선택가능
 * @param {boolean} future - 미래 날짜만 선택가능
 * @param {boolean} multiple - 다중선택 가능
 * @param {object} previous - 다중선택일 경우 기존의 선택 리스트
 * @param {number} props.maxLength - 다중선택 모드일 경우 선택가능 수
 */
const Calendar = props => {
	const [getMoment, setMoment] = React.useState(moment()); //현재 시각 정보
	const [selectedDate, setSelectedDate] = React.useState(props.previous ? props.previous[0] : '');

	const today = getMoment;
	const firstWeek = today.clone().startOf('month').week(); //현재 날짜 정보가 가지는 month의 첫째 주 정보를 가져온다
	const lastWeek =
		today.clone().endOf('month').week() === 1 //현재날짜 정보가 가지는 month의 마지막 주 정보를 가져온다
			? 53 //12월 마지막째 주가 그 해의 52번째 주를 넘겨서 1로 되었을 때는 이를 53으로 인식시켜야한다.
			: today.clone().endOf('month').week();

	const modalOff = () => {
		props.modalOff();
	};

	const onPressConfirm = () => {
		if (selectedDate === '') {
			Modal.close();
		} else {
			props.selectDate(selectedDate);
		}
	};

	const onSelectDate = date => {
		setSelectedDate(date.format('yyyy.MM.DD'));
	};

	const years = () => {
		let years = [];
		let this_year = new Date().getFullYear();
		// console.log('props.future', props.future);
		// console.log('props.past', props.past);
		if (props.past) {
			for (let i = 0; i < 40; i++) {
				const year_to_String = JSON.stringify(this_year - i);
				years.push(year_to_String);
			}
			return years;
		} else {
			for (let i = 0; i < 5; i++) {
				const year_to_String = JSON.stringify(this_year + i);
				years.push(year_to_String);
				years.sort(function (a, b) {
					return b - a;
				});
			}
			return years;
		}
	};

	const onSelectYear = y => {
		setMoment(getMoment.clone().subtract(getMoment.local().year() - y, 'year'));
	};

	const days_selectableMode = week => {
		if (props.past && props.future) {
			return (
				<View style={[styles.dateContainer]}>
					{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
						.fill(0)
						.map((data, index) => {
							//result에는 해당 날짜를 하나씩 붙여간다.
							let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
							// console.log("days console : "+days.date())
							if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
								//정확히 오늘 날짜와 일치하는 date
								return (
									<TouchableOpacity
										onPress={() => onSelectDate(days)}
										key={index}
										style={[styles.today, {backgroundColor: selectedDate == days.format('yyyy.MM.DD') ? APRI10 : WHITE}]}>
										<View
											style={{
												width: 66 * DP,
												// height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
												// backgroundColor: 'red',
											}}>
											<Text style={[txt.roboto28b, {color: WHITE, lineHeight: 66 * DP, backgroundColor: APRI10}]}>{days.format('D')}</Text>
										</View>
									</TouchableOpacity>
								);
							} else if (days.format('MM') !== today.format('MM')) {
								//이번달이 아니지만 달력에 출력된 dates
								return (
									<View key={index} style={styles.days_this_month}>
										<Text style={[txt.roboto28, {color: GRAY20}]}>{days.format('D')}</Text>
									</View>
								);
							} else {
								//이외의 이번달 날짜들은 하얀색으로 출력
								console.log('selectedDate', selectedDate);
								console.log('days.format', days.format('yyyy.MM.DD'));
								return (
									<TouchableOpacity
										onPress={() => onSelectDate(days)}
										key={index}
										style={[styles.days_this_month, {backgroundColor: selectedDate == days.format('yyyy.MM.DD') ? APRI10 : WHITE}]}>
										<Text style={[txt.roboto28, {}]}>{days.format('D')}</Text>
									</TouchableOpacity>
								);
							}
						})}
				</View>
			);
		} else if (!props.future && props.past) {
			return (
				<View style={styles.dateContainer}>
					{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
						.fill(0)
						.map((data, index) => {
							//result에는 해당 날짜를 하나씩 붙여간다.
							let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
							if (moment() > days) {
								return (
									<TouchableOpacity
										onPress={() => onSelectDate(days)}
										key={index}
										style={[styles.today, selectedDate == days.format('yyyy.MM.DD') ? {backgroundColor: APRI10, borderRadius: 100} : {}]}>
										<View
											style={{
												width: 66 * DP,
												// height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
												// backgroundColor: 'red',
											}}>
											<Text style={[txt.roboto28b, {color: selectedDate == days.format('yyyy.MM.DD') ? WHITE : BLACK, lineHeight: 66 * DP}]}>
												{days.format('D')}
											</Text>
										</View>
									</TouchableOpacity>
								);
							} else {
								// 과거날짜일 경우
								return (
									<View key={index} style={styles.days_this_month}>
										<Text style={[txt.roboto28, {color: GRAY20}]}>{days.format('D')}</Text>
									</View>
								);
							}
						})}
				</View>
			);
		} else {
			return (
				<View style={styles.dateContainer}>
					{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
						.fill(0)
						.map((data, index) => {
							//result에는 해당 날짜를 하나씩 붙여간다.
							let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
							// console.log("days console : "+days.date())
							if (moment() < days) {
								return (
									<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={styles.today}>
										<View
											style={{
												width: 66 * DP,
												// height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
												// backgroundColor: 'red',
											}}>
											<Text style={[txt.roboto28b, {color: BLACK, lineHeight: 66 * DP}]}>{days.format('D')}</Text>
										</View>
									</TouchableOpacity>
								);
							} else {
								//미래의 날짜들
								return (
									<View key={index} style={styles.days_this_month}>
										<Text style={[txt.roboto28, {color: GRAY20}]}>{days.format('D')}</Text>
									</View>
								);
							}
						})}
				</View>
			);
		}
	};

	const nextMonth = () => {
		if (props.future == false) {
			if (getMoment.clone().add(1, 'month').year() > moment().year()) {
				Alert.alert('과거 날짜만 선택가능합니다.');
			} else {
				setMoment(getMoment.clone().add(1, 'month'));
			}
		}
	};

	const calendarArr = () => {
		//달력 각 Booth에 들어갈 날짜정보
		let result = [];
		let week = firstWeek;
		for (week; week <= lastWeek; week++) {
			//첫째주부터 마지막째 주까지 반복해서 7개씩 흩뿌린다
			result = result.concat(
				//날짜 정보를 하나씩 추가해간다.
				<View key={week} onPress={() => {}}>
					{days_selectableMode(week)}
				</View>,
			);
		}
		return result;
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={[styles.background]}>
			<TouchableOpacity activeOpacity={1} style={[styles.outside]}>
				<View style={[styles.inside]}>
					{/* 년도 */}
					<YearDropDown menu={years()} defaultIndex={4} index={getMoment.year()} onSelect={onSelectYear} />
					{/* 월선택 */}
					<View style={[styles.headerCont, {}]}>
						<TouchableOpacity
							style={styles.changeMonthBtn}
							onPress={() => {
								setMoment(getMoment.clone().subtract(1, 'month'));
							}}>
							<View style={[styles.monthConatiner, {}]}>
								<Text style={[txt.roboto32b, {color: GRAY20, marginRight: 12 * DP}]}>{getMoment.clone().subtract(1, 'month').month() + 1}</Text>
								<View style={[styles.arrowMarkContainer, {transform: [{rotate: '0deg'}]}]}>
									<ArrowMarkForCalendar />
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.currentMonthContainer}>
							<Text style={[txt.roboto32b, {}]}>{today.format('MM')}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.changeMonthBtn} onPress={nextMonth}>
							<View style={[styles.monthConatiner]}>
								<View style={[styles.arrowMarkContainer, {transform: [{rotate: '180deg'}]}]}>
									<ArrowMarkForCalendar />
								</View>
								<Text style={[txt.roboto32b, {color: GRAY20, marginLeft: 15 * DP}]}>{getMoment.clone().add(1, 'month').month() + 1}</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{backgroundColor: GRAY10, width: '100%', height: 2 * DP}} />
					{/* 월화수목금토일 정보 */}
					<View style={styles.daysCont}>
						{Array(7)
							.fill(day)
							.map((data, index) => {
								//data가 없으면 안되는구나.
								return (
									<View key={index} style={styles.daysView}>
										<Text
											style={
												[txt.roboto24, index == 0 ? styles.weekend : styles.daysText]
												//일요일 토요일은 빨간색 글자로 출력
											}>
											{day[index]}
										</Text>
									</View>
								);
							})}
					</View>
					{/* 일자 컴포넌트 */}
					<View style={{marginTop: 15 * DP, marginBottom: 5 * DP}}>{calendarArr()}</View>
				</View>
				{/* 하단 나가기 버튼 */}
				<View style={[styles.btnCont]}>
					<AniButton btnTitle={'취소'} btnStyle={'border'} btnLayout={{width: 136 * DP, borderRadius: 40 * DP, height: 70 * DP}} onPress={modalOff} />
					{selectedDate == '' ? (
						<View
							style={{
								width: 136 * DP,
								borderRadius: 40 * DP,
								height: 70 * DP,
								borderColor: GRAY30,
								borderWidth: 2 * DP,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Text style={[txt.noto26, {color: GRAY20}]}>완료</Text>
						</View>
					) : (
						<AniButton btnTitle={'완료'} btnLayout={{width: 136 * DP, borderRadius: 40 * DP, height: 70 * DP}} onPress={onPressConfirm} />
					)}
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};
export default Calendar;
Calendar.defaultProps = {};
