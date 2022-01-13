import React from 'react';

import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Dimensions} from 'react-native';
import {styles} from './calendarStyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {day} from 'Root/i18n/msg';
import {txt} from 'Root/config/textstyle';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import {NextMark} from 'Root/component/atom/icon';
import YearDropDown from 'Molecules/dropdown/YearDropDown';
import AniButton from 'Molecules/button/AniButton';

const Calendar = props => {
	const HEIGHT = Dimensions.get('screen').height;

	// console.log('props', props.future);
	const BG = 'yellow';

	const [getMoment, setMoment] = React.useState(moment()); //현재 시각 정보

	const today = getMoment;
	const firstWeek = today.clone().startOf('month').week(); //현재 날짜 정보가 가지는 month의 첫째 주 정보를 가져온다
	const lastWeek =
		today.clone().endOf('month').week() === 1 //현재날짜 정보가 가지는 month의 마지막 주 정보를 가져온다
			? 53 //12월 마지막째 주가 그 해의 52번째 주를 넘겨서 1로 되었을 때는 이를 53으로 인식시켜야한다.
			: today.clone().endOf('month').week();

	const modalOff = () => {
		props.modalOff();
	};

	const onSelectDate = date => {
		props.selectDate(date.format('yyyy.MM.DD'));
	};

	const years = () => {
		let years = [];
		let this_year = new Date().getFullYear();
		if (props.past) {
			for (let i = 0; i < 40; i++) {
				const year_to_String = JSON.stringify(this_year + 4 - i);
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
				<View style={styles.dateContainer}>
					{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
						.fill(0)
						.map((data, index) => {
							//result에는 해당 날짜를 하나씩 붙여간다.
							let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
							// console.log("days console : "+days.date())
							if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
								//정확히 오늘 날짜와 일치하는 date
								return (
									<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={styles.today}>
										<View
											style={{
												width: 66 * DP,
												height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
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
								return (
									<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={styles.days_this_month}>
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
									<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={styles.today}>
										<View
											style={{
												width: 66 * DP,
												height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<Text style={[txt.roboto28b, {color: BLACK, lineHeight: 66 * DP}]}>{days.format('D')}</Text>
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
												height: 116 * DP,
												alignItems: 'center',
												justifyContent: 'center',
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

	const calendarArr = () => {
		//달력 각 Booth에 들어갈 날짜정보
		let result = [];
		let week = firstWeek;
		for (week; week <= lastWeek; week++) {
			//첫째주부터 마지막째 주까지 반복해서 7개씩 흩뿌린다
			result = result.concat(
				//날짜 정보를 하나씩 추가해간다.
				<TouchableWithoutFeedback key={week} onPress={() => {}}>
					{days_selectableMode(week)}
				</TouchableWithoutFeedback>,
			);
		}
		return result;
	};

	return (
		<TouchableWithoutFeedback>
			<View style={[styles.outside, {height: HEIGHT}]}>
				<View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, backgroundColor: WHITE}}>
					<YearDropDown menu={years()} defaultIndex={4} index={getMoment.year()} onSelect={onSelectYear} />
					<View style={[styles.headerCont, {}]}>
						<TouchableOpacity
							style={styles.changeMonthBtn}
							onPress={() => {
								setMoment(getMoment.clone().subtract(1, 'month'));
							}}>
							<View style={[styles.monthConatiner]}>
								<Text style={[txt.roboto32b, {color: GRAY20, marginRight: 12 * DP}]}>{getMoment.clone().subtract(1, 'month').month() + 1}</Text>
								<View style={{transform: [{rotate: '180deg'}]}}>
									<NextMark />
								</View>
							</View>
						</TouchableOpacity>
						<TouchableWithoutFeedback style={styles.changeMonthBtn}>
							<Text style={[txt.roboto32b, {justifyContent: 'center', textAlign: 'center', width: 130, paddingTop: 20 * DP}]}>
								{today.format('MM')}
							</Text>
						</TouchableWithoutFeedback>
						<TouchableOpacity
							style={styles.changeMonthBtn}
							onPress={() => {
								setMoment(getMoment.clone().add(1, 'month'));
							}}>
							<View style={[styles.monthConatiner]}>
								<NextMark />
								<Text style={[txt.roboto32b, {color: GRAY20, marginLeft: 15 * DP}]}>{getMoment.clone().add(1, 'month').month() + 1}</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{backgroundColor: APRI10, width: '100%', height: 2 * DP}} />
					<View style={styles.daysCont}>
						{Array(7)
							.fill(day) //월화수목금토일 정보
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
					<View style={{marginTop: 15 * DP, marginBottom: 5 * DP}}>{calendarArr()}</View>
					{/* 모달바깥쪽 클릭이 modalOFF로 처리되게끔 한 View 목록 */}

					<View style={{backgroundColor: APRI10, width: '100%', height: 2 * DP, marginBottom: 20}} />

					<AniButton btnTitle={'나가기'} onPress={modalOff}></AniButton>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
export default Calendar;
