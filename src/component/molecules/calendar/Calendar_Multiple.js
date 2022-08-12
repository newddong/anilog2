import React from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Dimensions, StyleSheet, Animated} from 'react-native';
import moment from 'moment';
import DP from 'Root/config/dp';
import {day} from 'Root/i18n/msg';
import {txt} from 'Root/config/textstyle';
import {WHITE, APRI10, BLACK, GRAY10, GRAY20, GRAY30, MIDNIGHT_BLUE, BLUE10, RED10} from 'Root/config/color';
import {ArrowMarkForCalendar, NextMark} from 'Root/component/atom/icon';
import AniButton from '../button/AniButton';
import {btn_w116, btn_w92} from 'Root/component/atom/btn/btn_style';
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
const Calendar_Multiple = props => {
	const HEIGHT = Dimensions.get('screen').height;

	const [getMoment, setMoment] = React.useState(moment()); //현재 시각 정보
	const [selectedDates, setSelectedDates] = React.useState([]); //선택된 날짜 목록
	const [isMaximum, setIsMaximum] = React.useState(false); //선택가능 숫자 초과 선택 여부
	const [errorMsg, setErrorMsg] = React.useState();
	const animatedOpacity = React.useRef(new Animated.Value(0)).current;
	const today = getMoment;
	const firstWeek = today.clone().startOf('month').week(); //현재 날짜 정보가 가지는 month의 첫째 주 정보를 가져온다
	const lastWeek =
		today.clone().endOf('month').week() === 1 //현재날짜 정보가 가지는 month의 마지막 주 정보를 가져온다
			? 53 //12월 마지막째 주가 그 해의 52번째 주를 넘겨서 1로 되었을 때는 이를 53으로 인식시켜야한다.
			: today.clone().endOf('month').week();

	//선택완료
	const confirm = () => {
		props.modalOff();
		props.selectDate(selectedDates);
	};

	//취소버튼
	const modalOff = () => {
		props.modalOff();
	};

	React.useEffect(() => {
		if (props.previous.length > 0) {
			setSelectedDates(props.previous);
		}
	}, []);

	React.useEffect(() => {
		if (isMaximum) {
			Animated.timing(animatedOpacity, {
				duration: 300,
				toValue: 1,
				useNativeDriver: false,
			}).start();
		} else if (!isMaximum) {
			Animated.timing(animatedOpacity, {
				duration: 300,
				toValue: 0,
				useNativeDriver: false,
			}).start();
		}
	}, [isMaximum]);

	//날짜 선택
	const onSelectDate = date => {
		const dateFormat = date.format('yyyy.MM.DD');
		if (selectedDates.some(e => e == dateFormat)) {
			let copy = [...selectedDates];
			const filtered = copy.filter(e => e != dateFormat);
			// console.log('filtered', filtered);
			setSelectedDates(filtered);
		} else if (selectedDates.length + 1 > props.maxLength) {
			setErrorMsg(props.maxLength + '일 이상의 선택은 불가합니다.');
			setIsMaximum(true);
		} else {
			let copy = [...selectedDates];
			copy.push(dateFormat);
			setSelectedDates(copy);
		}
	};

	//이전날짜 클릭
	const onPressPrevious = () => {
		setErrorMsg('오늘 날짜 기준으로 이전의 날짜만 \n 선택이 가능합니다.');
		setIsMaximum(true);
	};

	const days_selectableMode = week => {
		return (
			<View style={styles.dateContainer}>
				{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
					.fill(0)
					.map((data, index) => {
						//result에는 해당 날짜를 하나씩 붙여간다.
						let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
						// console.log("days console : "+days.date())
						if (moment() < days) {
							const isOneofSelectedDates = selectedDates.some(e => e == days.format('yyyy.MM.DD'));

							return (
								<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={[styles.today]}>
									<View
										style={{
											width: 66 * DP,
											height: 66 * DP,
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: isOneofSelectedDates ? APRI10 : 'white',
											borderRadius: 40 * DP,
										}}>
										<Text style={[txt.roboto28b, {color: isOneofSelectedDates ? WHITE : 'black', lineHeight: 66 * DP}]}>{days.format('D')}</Text>
									</View>
								</TouchableOpacity>
							);
						} else {
							//미래의 날짜들
							return (
								<TouchableOpacity onPress={onPressPrevious} activeOpacity={0.4} key={index} style={styles.days_this_month}>
									<Text style={[txt.roboto28, {color: GRAY20}]}>{days.format('D')}</Text>
								</TouchableOpacity>
							);
						}
					})}
			</View>
		);
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
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={[styles.outside, {height: HEIGHT}]}>
			<TouchableOpacity activeOpacity={1} style={[styles.inside]}>
				{/* 년도 */}
				<Text style={[txt.roboto28b, {color: GRAY10, marginRight: 7 * DP}]}> {today.format('YYYY')}</Text>
				{/* 월 변경 */}
				<View style={[styles.headerCont, {}]}>
					{/* 지난달 */}
					<TouchableOpacity
						style={[styles.changeMonthBtn]}
						onPress={() => {
							setMoment(getMoment.clone().subtract(1, 'month'));
						}}>
						<View style={[styles.monthConatiner]}>
							<Text style={[txt.roboto32b, {color: GRAY20, marginRight: 50 * DP}]}>{getMoment.clone().subtract(1, 'month').month() + 1}</Text>
							<View style={{transform: [{rotate: '0deg'}]}}>
								<ArrowMarkForCalendar />
							</View>
						</View>
					</TouchableOpacity>
					{/* 현재월 */}
					<View style={[styles.changeMonthBtn, {width: 160 * DP, marginHorizontal: 20 * DP}]}>
						<Text style={[txt.roboto32b, {justifyContent: 'center', textAlign: 'center', width: 130, paddingTop: 20 * DP}]}>
							{today.format('MM')}
						</Text>
					</View>
					{/* 다음달 */}
					<TouchableOpacity
						style={styles.changeMonthBtn}
						onPress={() => {
							setMoment(getMoment.clone().add(1, 'month'));
						}}>
						<View style={[styles.monthConatiner]}>
							<View style={{transform: [{rotate: '180deg'}]}}>
								<ArrowMarkForCalendar />
							</View>
							<Text style={[txt.roboto32b, {color: GRAY20, marginLeft: 50 * DP}]}>{getMoment.clone().add(1, 'month').month() + 1}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{backgroundColor: APRI10, width: '100%', height: 2 * DP}} />
				{/* 일  */}
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
				<View style={[styles.daysContainer]}>{calendarArr()}</View>
				{/* 모달바깥쪽 클릭이 modalOFF로 처리되게끔 한 View 목록 */}

				<View style={styles.lineStyle} />
				{/* 하단 버튼  */}
				<View style={[styles.bottom_btnContainer]}>
					<AniButton btnTitle={'취소'} btnLayout={btn_w92} btnStyle={'border'} onPress={modalOff}></AniButton>
					<AniButton btnTitle={'선택완료'} btnLayout={btn_w116} onPress={confirm}></AniButton>
				</View>
			</TouchableOpacity>
			{/* 3개 이상 선택 시 출력되는 컴포넌트 */}
			{isMaximum ? (
				<Animated.View style={[styles.infoContainer, styles.shadow, {opacity: animatedOpacity}]}>
					<Text style={[{color: GRAY10, textAlign: 'center'}]}>{errorMsg}</Text>
					<View style={[styles.infoBtnContainer, {alignItems: 'center', marginTop: 50 * DP}]}>
						<AniButton btnTitle={'확인'} btnStyle={'border'} onPress={() => setIsMaximum(!isMaximum)} />
					</View>
				</Animated.View>
			) : (
				<></>
			)}
		</TouchableOpacity>
	);
};

Calendar_Multiple.defaultProps = {};

export default Calendar_Multiple;

const styles = StyleSheet.create({
	outside: {
		// marginTop: 200 * DP,
		// borderRadius: 40 * DP,
		// height: '100%',
		//
		justifyContent: 'center',
		backgroundColor: '#0009',
	},
	inside: {
		// marginVertical: 100 * DP,
		width: 654 * DP,
		paddingVertical: 30 * DP,
		marginBottom: 100 * DP,
		// backgroundColor: RED10,
		shadowColor: '#fff',
		shadowRadius: 4.65,
		shadowOffset: {
			width: 2 * DP,
			height: 2 * DP,
		},
		elevation: 2,
		shadowOpacity: 0.3,
		borderRadius: 40 * DP,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
	},
	calendarContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		backgroundColor: BLUE10,
		alignItems: 'center',
	},
	headerCont: {
		// backgroundColor: BLUE10,
		flexDirection: 'row',
		alignSelf: 'center',
		// alignItems:'center'
	},
	headerText: {
		fontSize: 58 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		color: MIDNIGHT_BLUE,
		textAlign: 'center',
	},
	monthConatiner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 120 * DP,
		height: 80 * DP,
	},
	changeMonthBtn: {
		alignItems: 'center',
		alignSelf: 'center',
		width: 120 * DP,
		height: 80 * DP,
		// backgroundColor: 'red',
		// marginHorizontal: 40 * DP,
	},
	changeMonthText: {
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 50 * DP,
		color: MIDNIGHT_BLUE,
	},
	changeMonthText_unavailable: {
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 50 * DP,
		color: '#dcdcdc',
		opacity: 1,
	},
	daysContainer: {
		marginTop: 15 * DP,
		marginBottom: 5 * DP,
		height: 580 * DP,
		// backgroundColor: 'yellow',
	},
	dateContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		// marginTop: 50 * DP,
		// backgroundColor: 'pink',
	},
	daysCont: {
		marginTop: 20 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	daysView: {
		width: 94 * DP,
		height: 54 * DP,
		marginBottom: -20 * DP,
		paddingTop: 16 * DP,
		opacity: 0.7,
	},
	daysText: {
		fontSize: 30 * DP,
		alignSelf: 'center',
	},
	weekend: {
		fontSize: 30 * DP,
		color: 'red',
		textAlign: 'center',
	},

	days_not_this_month: {
		width: 70 * DP,
		height: 70 * DP,
	},
	days_not_this_month_text: {
		alignSelf: 'center',
		opacity: 0.5,
	},
	days_this_month: {
		width: 94 * DP,
		height: 95 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	today: {
		width: 94 * DP,
		height: 95 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},

	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: 'black',
		shadowOpacity: 0.4,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	infoContainer: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		// top: 460 * DP,
		width: 614 * DP,
		height: 280 * DP,
		backgroundColor: 'white',
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	lineStyle: {
		backgroundColor: APRI10,
		width: '100%',
		height: 2 * DP,
		marginBottom: 40 * DP,
	},
	bottom_btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: 654 * DP,
	},
});
