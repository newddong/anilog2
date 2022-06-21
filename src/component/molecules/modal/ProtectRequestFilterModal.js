import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, Animated, TextInput, Alert, Easing, Image} from 'react-native';
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10, GRAY20, BLACK, MIDNIGHT_BLUE, GRAY40, GRAY30, RED10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {Check50, PhoneIcon, Rect50_Border, ArrowMarkForCalendar, Cross46, Hyhpen, Check42, Rect42_Border} from 'Atom/icon';
import {day, PROTECT_LOCATION} from 'Root/i18n/msg';
import YearDropDown from 'Molecules/dropdown/YearDropDown';
import Modal from 'Root/component/modal/Modal';
import moment from 'moment';
import {getShelterInfo} from 'Root/api/protectapi';
import AnimalButton from '../button/AnimalButton';

/**
 * 버튼 한 개의 셀렉트 모달창
 *
 * @param {Object} props - props object
 * @param {Object} props.previous - 기존 필터 정보
 * @param {(filterData:object)=>void} props.onConfirm - 완료 버튼 클릭
 * @param {()=>void} props.onClose -  바깥쪽 클릭 콜백
 *
 */
const ProtectRequestFilterModal = props => {
	const today = moment();
	const current_date = moment().format('YY.MM.DD');
	const [data, setData] = React.useState({
		city: '',
		shelter_list: [],
		shleter_label: '모든 보호소',
		from: today.clone().subtract(1, 'month').format('YY.MM.DD'),
		to: current_date,
		dog: false,
		cat: false,
		etc: false,
	});

	const [shelterData, setShelterData] = React.useState('false');
	const [startDateOpen, setStartDateOpen] = React.useState(false); //시작일
	const [endDateOpen, setEndDateOpen] = React.useState(false); //종료일
	const [regionOpen, setRegionOpen] = React.useState(false); // 지역
	const [shelterOpen, setShelterOpen] = React.useState(false); // 보호소

	const animatedStartDate = React.useRef(new Animated.Value(0)).current; // 시작일
	const animatedEndDate = React.useRef(new Animated.Value(0)).current; // 종료일
	const animatedRegion = React.useRef(new Animated.Value(0)).current; // 지역
	const animatedShelter = React.useRef(new Animated.Value(0)).current; // 보호소

	React.useEffect(() => {
		console.log('previous', props.previous);
		setData({
			...props.previous,
			from: props.previous.from != '' ? props.previous.from : today.clone().subtract(1, 'month').format('YY.MM.DD'),
			to: props.previous.to != '' ? props.previous.to : current_date,
		});
		getShleterData(props.previous.city ? props.previous.city : 'all');
	}, []);

	const getShleterData = city => {
		getShelterInfo(
			{city: city == '모든 지역' ? 'all' : city},
			result => {
				console.log('result / getShelterInfo / ProtectRequestFilterModal ', result.msg.length);
				let shelter_list = result.msg.map(
					v =>
						(v = {
							user_nickname: v.user_nickname,
							_id: v._id,
							shelter_address: v.shelter_address,
							shelter_delegate_contact_number: v.shelter_delegate_contact_number,
							state: false,
						}),
				);
				setShelterData(shelter_list);
				// console.log('shelter_list', shelter_list.slice(50, 52));
			},
			err => {
				console.log('err / getShelterInfo / ProtectRequestFilterModal', err);
			},
		);
	};

	//애니메이션 처리
	const animate = (type, value) => {
		// console.log('animateCalendar', type, 'value : ', value);
		Animated.timing(type, {
			duration: 200,
			toValue: value,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	React.useEffect(() => {
		startDateOpen ? animate(animatedStartDate, 1) : animate(animatedStartDate, 0);
	}, [startDateOpen]);

	React.useEffect(() => {
		endDateOpen ? animate(animatedEndDate, 1) : animate(animatedEndDate, 0);
	}, [endDateOpen]);

	React.useEffect(() => {
		regionOpen ? animate(animatedRegion, 465 * DP) : animate(animatedRegion, 0);
	}, [regionOpen]);

	React.useEffect(() => {
		shelterOpen ? animate(animatedShelter, 951 * DP) : animate(animatedShelter, 0);
		// shelterOpen ? animate(animatedMainHeight, 500 * DP) : animate(animatedMainHeight, 784 * DP);
	}, [shelterOpen]);

	//최종 완료 버튼 클릭
	const onConfrim = () => {
		if (startDateOpen || endDateOpen || regionOpen || shelterOpen) {
			setStartDateOpen(false);
			setEndDateOpen(false);
			setRegionOpen(false);
			setShelterOpen(false);
		} else {
			props.onConfirm(data);
			Modal.close();
		}
	};

	//메인 모달 우상단 X마크 클릭
	const closeModal = () => {
		Modal.close();
	};

	//개 고양이 그외 버튼 필터 클릭
	const onPressAnimalFilter = filter => {
		switch (filter) {
			case 'dog':
				setData({...data, dog: !data.dog});
				break;
			case 'cat':
				setData({...data, cat: !data.cat});
				break;
			case 'etc':
				setData({...data, etc: !data.etc});
				break;
			default:
				break;
		}
	};

	//모달 바깥쪽 영역 클릭
	const onPressOutSide = () => {
		console.log('onPressOutSide');
		if (startDateOpen || endDateOpen || regionOpen || shelterOpen) {
			setStartDateOpen(false);
			setEndDateOpen(false);
			setRegionOpen(false);
			setShelterOpen(false);
		} else {
			Modal.close();
		}
	};

	//모달의 메인 박스 클릭
	const onPressMainContainer = () => {
		console.log('onPressMainContainer');
		if (regionOpen || shelterOpen) {
			setRegionOpen(false);
			setShelterOpen(false);
		}
	};

	//날짜 선택 클릭(시작일/종료일)
	const onPressDuration = type => {
		console.log('타입 클릭', type);
		if (!regionOpen && !shelterOpen) {
			type == 'to' ? setEndDateOpen(true) : setStartDateOpen(true);
		} else {
			setRegionOpen(false);
			setShelterOpen(false);
		}
	};

	//날짜 선택
	const onSelectDate = (date, type) => {
		// console.log('날짜 및 타입 ', date, type);
		type == 'to' ? setEndDateOpen(false) : setStartDateOpen(false);
		if (type == 'to') {
			let split_to = date.split('.');
			let split_from = data.from.split('.');
			const toDate = new Date(split_to[0], split_to[1] - 1, split_to[2]);
			const fromDate = new Date(split_from[0], split_from[1] - 1, split_from[2]);
			if (toDate.getTime() < fromDate.getTime()) {
				setData({...data, to: data.from, from: date});
			} else {
				setData({...data, to: date});
			}
		} else {
			let split_to = data.to.split('.');
			let split_from = date.split('.');
			const toDate = new Date(split_to[0], split_to[1] - 1, split_to[2]);
			const fromDate = new Date(split_from[0], split_from[1] - 1, split_from[2]);
			if (toDate.getTime() < fromDate.getTime()) {
				setData({...data, from: data.to, to: date});
			} else {
				setData({...data, from: date});
			}
		}
	};

	//달력 컴포넌트 종료
	const closeCalendar = type => {
		console.log('closeStartDate');
		type == 'to' ? setEndDateOpen(false) : setStartDateOpen(false);
	};

	//지역 버튼 클릭
	const onPressRegion = () => {
		setShelterOpen(false);
		setRegionOpen(!regionOpen);
	};

	//보호소 버튼 클릭
	const onPressShelter = () => {
		setRegionOpen(false);
		setShelterOpen(!shelterOpen);
	};

	//지역 선택 모달 닫기
	const onCloseBottomBox = () => {
		setRegionOpen(false);
	};

	//지역 선택 모달의 완료 버튼 클릭
	const onSelectRegion = value => {
		setData({...data, city: value, shelter_list: [], shleter_label: '모든 보호소'});
		getShleterData(value);
		setRegionOpen(false);
	};

	//보호소 선택 모달의 완료 버튼 클릭
	const onSelectShelterList = value => {
		// console.log('onSelectShelterList', value);
		let label = '모든 보호소';
		if (value[0]) {
			if (value.length == 1) {
				label = value[0].user_nickname;
			} else {
				label = value[0].user_nickname + ' 외 ' + (value.length - 1) + '개';
			}
		}
		setData({...data, shelter_list: value, shleter_label: label});
		setShelterOpen(false);
	};

	//필터 초기화
	const onPressInitialize = () => {
		if (startDateOpen || endDateOpen || regionOpen || shelterOpen) {
			setStartDateOpen(false);
			setEndDateOpen(false);
			setRegionOpen(false);
			setShelterOpen(false);
		} else {
			setData({
				city: '',
				shelter_list: [],
				shleter_label: '모든 보호소',
				from: today.clone().subtract(1, 'month').format('YY.MM.DD'),
				to: current_date,
				dog: false,
				cat: false,
				etc: false,
			});
		}
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={onPressOutSide} style={[style.background]}>
			{/* 상단 선택영역  */}
			{shelterOpen ? (
				<></>
			) : (
				<TouchableOpacity onPress={onPressMainContainer} activeOpacity={1} style={[style.popUpWindow, style.shadow, {}]}>
					<View style={{flexDirection: 'row', width: 654 * DP, paddingHorizontal: 34 * DP, justifyContent: 'space-between'}}>
						{/* <AniButton
							btnTitle={'필터 초기화'}
							onPress={onPressInitialize}
							btnStyle={'border'}
							btnLayout={{width: 160 * DP, height: 50 * DP, borderRadius: 30 * DP}}
						/> */}
						<TouchableOpacity onPress={onPressInitialize} activeOpacity={0.8}>
							<Text style={[txt.noto26b, {color: APRI10}]}>초기화</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6} onPress={closeModal} style={[{alignSelf: 'flex-end'}]}>
							<Cross46 />
						</TouchableOpacity>
					</View>
					{/* 기간필터 */}
					<View style={[style.durationCont]}>
						<Text style={[txt.noto28]}>기간</Text>
						<TouchableOpacity onPress={() => onPressDuration('from')} activeOpacity={0.6} style={[style.durationItem]}>
							<Text style={[txt.noto28, {color: data.from == '시작일' ? GRAY20 : BLACK}]}>{data.from == '시작일' ? '시작일' : data.from}</Text>
						</TouchableOpacity>
						<View style={[style.hyphen]}>
							<Hyhpen />
						</View>
						<TouchableOpacity activeOpacity={0.8} onPress={() => onPressDuration('to')} style={[style.durationItem, {marginLeft: 0 * DP}]}>
							<Text style={[txt.noto28, {color: data.to == '종료일' ? GRAY20 : BLACK}]}> {data.to == '종료일' ? '종료일' : data.to}</Text>
						</TouchableOpacity>
					</View>
					{/* 지역 필터 */}
					<TouchableOpacity onPress={onPressRegion} activeOpacity={0.8} style={[style.dropdownContainer, {}]}>
						<Text style={[txt.noto26]}>{data.city == '' ? '모든 지역' : data.city}</Text>
						<View style={[style.arrowMark]}>
							<ArrowMarkForCalendar />
						</View>
					</TouchableOpacity>
					{/* 보호소 필터 */}
					<TouchableOpacity onPress={onPressShelter} activeOpacity={0.8} style={[style.dropdownContainer]}>
						<Text style={[txt.noto26, {maxWidth: 320 * DP}]} numberOfLines={1}>
							{data.shelter_list.length == 0 ? '모든 보호소' : data.shleter_label}
						</Text>
						<View activeOpacity={0.8} style={style.arrowMark}>
							<ArrowMarkForCalendar />
						</View>
					</TouchableOpacity>
					{/* 동물종류 필터 */}
					<View style={[style.animalFilter]}>
						<View style={[]}>
							{!data.dog ? (
								<AnimalButton type={'dog'} on={false} onPress={() => onPressAnimalFilter('dog')} />
							) : (
								<AnimalButton type={'dog'} on={true} onPress={() => onPressAnimalFilter('dog')} />
							)}
						</View>
						<View style={[]}>
							{/* {!data.cat ? <Animal_cat onPress={() => onPressAnimalFilter('cat')} /> : <Animal_cat_off onPress={() => onPressAnimalFilter('cat')} />} */}
							{!data.cat ? (
								<AnimalButton type={'cat'} on={false} onPress={() => onPressAnimalFilter('cat')} />
							) : (
								<AnimalButton type={'cat'} on={true} onPress={() => onPressAnimalFilter('cat')} />
							)}
						</View>
						<View style={[]}>
							{!data.etc ? (
								<AnimalButton type={'another'} on={false} onPress={() => onPressAnimalFilter('etc')} />
							) : (
								<AnimalButton type={'another'} on={true} onPress={() => onPressAnimalFilter('etc')} />
							)}
						</View>
					</View>

					<View style={style.buttonContainer}>
						<AniButton
							btnLayout={{width: 226 * DP, height: 70 * DP, borderRadius: 30 * DP}}
							btnStyle={'border'}
							btnTitle={'완료'}
							onPress={onConfrim}
						/>
					</View>
				</TouchableOpacity>
			)}
			{/* 하단 스크롤뷰 영역 */}
			{/* 시작일 */}
			{startDateOpen ? (
				<Animated.View style={[style.calendarCont, {}]}>
					<CalendarInFilter
						previous={data.from}
						to={data.to}
						selectDate={val => onSelectDate(val, 'from')}
						modalOff={() => closeCalendar('from')}
						future={false}
						past={true}
					/>
				</Animated.View>
			) : (
				<></>
			)}
			{/* 종료일 */}
			{endDateOpen ? (
				<Animated.View style={[style.calendarCont, {}]}>
					<CalendarInFilter
						previous={data.to}
						from={data.from}
						selectDate={val => onSelectDate(val, 'to')}
						modalOff={() => closeCalendar('to')}
						future={false}
						past={true}
					/>
				</Animated.View>
			) : (
				<></>
			)}
			{/* 지역 */}
			<Animated.View style={[style.downScrollSelectContainer, {height: animatedRegion, zIndex: 2}]}>
				<ScrollSelectBox data={PROTECT_LOCATION} onSelectRegion={onSelectRegion} onCloseBottomBox={onCloseBottomBox} />
			</Animated.View>
			{/* 보호소 */}
			{shelterData == 'false' ? (
				<></>
			) : (
				<Animated.View style={[style.shelterSelectContainer, {height: animatedShelter}]}>
					<ShelterSelectBox data={shelterData} onConfirm={onSelectShelterList} onCloseBottomBox={onCloseBottomBox} />
				</Animated.View>
			)}
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 654 * DP,
		height: 784 * DP,
		backgroundColor: 'white',
		alignItems: 'center',
		paddingTop: 34 * DP,
		paddingBottom: 32 * DP,
		paddingHorizontal: 36 * DP,
		borderRadius: 40 * DP,
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
		// backgroundColor: 'yellow',
	},
	durationCont: {
		flexDirection: 'row',
		width: 478 * DP,
		height: 82 * DP,
		marginTop: 30 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	durationItem: {
		marginLeft: 20 * DP,
		width: 198 * DP,
		height: 68 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY30,
		borderWidth: 2 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'lightblue',
	},
	hyphen: {
		height: 82 * DP,
		width: 36 * DP,
		marginHorizontal: 4 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'lightpink',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	shadow_filter: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 22 * DP,
	},
	animalFilter: {
		width: 440 * DP,
		marginTop: 60 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	buttonContainer: {
		marginTop: 78 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
	},
	arrowMark: {
		transform: [{rotate: '270deg'}],
		alignSelf: 'center',
		position: 'absolute',
		right: 40 * DP,
	},
	dropdownContainer: {
		width: 478 * DP,
		height: 68 * DP,
		borderRadius: 40 * DP,
		marginTop: 60 * DP,
		backgroundColor: WHITE,
		borderColor: GRAY30,
		borderWidth: 2 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedItem: {
		width: 514 * DP,
		height: 48 * DP,
		alignItems: 'center',
	},
	dropdownIcon: {
		width: 48 * DP,
		height: 48 * DP,
	},
	directInputStyle: {
		backgroundColor: '#ffffff',
		width: 562 * DP,
		height: 166 * DP,
		marginBottom: 20 * DP,
		borderRadius: 20 * DP,
		paddingLeft: 20 * DP,
	},
	downScrollSelectContainer: {
		position: 'absolute',
		bottom: 0,
		width: 750 * DP,
		height: 476 * DP,
		justifyContent: 'flex-end',
	},
	shelterSelectContainer: {
		position: 'absolute',
		bottom: 0,
		width: 750 * DP,
		height: 951 * DP,
		justifyContent: 'flex-end',
	},
	header: {
		width: 750 * DP,
		flexDirection: 'row',
		backgroundColor: GRAY30,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	shelterSelectHeader: {
		width: 750 * DP,
		flexDirection: 'row',
		backgroundColor: GRAY30,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	list: {
		width: 750 * DP,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 666 * DP,
		height: 70 * DP,
		borderRadius: 30 * DP,
	},
	calendarCont: {
		width: 654 * DP,
		height: 968 * DP,
		position: 'absolute',
		alignSelf: 'center',
	},
	shelterItemCont: {
		width: 750 * DP,
		height: 142 * DP,
		paddingVertical: 20 * DP,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	shelterInfo: {
		width: 600 * DP,
		alignSelf: 'center',
		justifyContent: 'center',
		// backgroundColor: 'palegreen',
	},
});

const CalendarInFilter = props => {
	const [getMoment, setMoment] = React.useState(moment()); //현재 시각 정보
	const [selectedDate, setSelectedDate] = React.useState(props.previous ? props.previous : '');

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
			// Modal.close();
			props.modalOff();
		} else {
			props.selectDate(selectedDate);
		}
	};

	const onSelectDate = date => {
		console.log('date', date.format('YY.MM.DD'));
		setSelectedDate(date.format('YY.MM.DD'));
	};

	const years = () => {
		let years = [];
		let this_year = new Date().getFullYear();
		if (props.past) {
			for (let i = 0; i < 10; i++) {
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
		return (
			<View style={calendar_style.dateContainer}>
				{Array(7) //today를 기준으로 조회한 이번 달의 첫째 주부터 마지막 주까지 Array
					.fill(0)
					.map((data, index) => {
						//result에는 해당 날짜를 하나씩 붙여간다.
						let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성 - index값에  day정보
						// console.log('days', new Date(days).getDay());
						const getDayColor = () => {
							let color = BLACK;
							if (selectedDate == days.format('YY.MM.DD')) {
								color = WHITE;
							} else if (moment(days).day() == 0) {
								color = RED10;
							}
							return color;
						};
						if (moment() > days) {
							return (
								<TouchableOpacity onPress={() => onSelectDate(days)} key={index} style={[calendar_style.today]}>
									<View
										style={[
											{width: 66 * DP, alignItems: 'center', justifyContent: 'center'},
											selectedDate == days.format('YY.MM.DD') ? {backgroundColor: APRI10, borderRadius: 100 * DP} : {},
										]}>
										<Text style={[txt.roboto28b, {color: getDayColor(), lineHeight: 66 * DP}]}>{days.format('D')}</Text>
									</View>
								</TouchableOpacity>
							);
						} else {
							// 과거날짜일 경우
							return (
								<View key={index} style={calendar_style.days_this_month}>
									<Text style={[txt.roboto28, {color: GRAY20}]}>{days.format('D')}</Text>
								</View>
							);
						}
					})}
			</View>
		);
	};

	const nextMonth = () => {
		if (getMoment.clone().add(1, 'month').year() > moment().year()) {
			Alert.alert('과거 날짜만 선택가능합니다.');
		} else {
			setMoment(getMoment.clone().add(1, 'month'));
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
		<TouchableOpacity activeOpacity={1} style={[calendar_style.outside]}>
			<View style={[calendar_style.inside]}>
				{/* 년도 */}
				<YearDropDown menu={years()} defaultIndex={4} index={getMoment.year()} onSelect={onSelectYear} />
				{/* 월선택 */}
				<View style={[calendar_style.headerCont, {}]}>
					<TouchableOpacity
						style={calendar_style.changeMonthBtn}
						onPress={() => {
							setMoment(getMoment.clone().subtract(1, 'month'));
						}}>
						<View style={[calendar_style.monthConatiner, {}]}>
							<Text style={[txt.roboto32b, {color: GRAY20, marginRight: 12 * DP}]}>{getMoment.clone().subtract(1, 'month').month() + 1}</Text>
							<View style={[calendar_style.arrowMarkContainer, {transform: [{rotate: '0deg'}]}]}>
								<ArrowMarkForCalendar />
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} style={calendar_style.currentMonthContainer}>
						<Text style={[txt.roboto32b, {}]}>{today.format('MM')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={calendar_style.changeMonthBtn} onPress={nextMonth}>
						<View style={[calendar_style.monthConatiner]}>
							<View style={[calendar_style.arrowMarkContainer, {transform: [{rotate: '180deg'}]}]}>
								<ArrowMarkForCalendar />
							</View>
							<Text style={[txt.roboto32b, {color: GRAY20, marginLeft: 15 * DP}]}>{getMoment.clone().add(1, 'month').month() + 1}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{backgroundColor: GRAY10, width: '100%', height: 2 * DP}} />
				{/* 월화수목금토일 정보 */}
				<View style={calendar_style.daysCont}>
					{Array(7)
						.fill(day)
						.map((data, index) => {
							//data가 없으면 안되는구나.
							return (
								<View key={index} style={calendar_style.daysView}>
									<Text
										style={
											[txt.roboto24, index == 0 ? calendar_style.weekend : calendar_style.daysText]
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
			<View style={[calendar_style.btnCont]}>
				<AniButton btnTitle={'취소'} btnStyle={'border'} btnLayout={{width: 136 * DP, borderRadius: 40 * DP, height: 70 * DP}} onPress={modalOff} />
				<AniButton btnTitle={'완료'} btnLayout={{width: 136 * DP, borderRadius: 40 * DP, height: 70 * DP}} onPress={onPressConfirm} />
			</View>
		</TouchableOpacity>
	);
};

const ScrollSelectBox = props => {
	const [data, setData] = React.useState(props.data);
	const [selectedItem, setSelectedItem] = React.useState(2);

	const padding = '';

	const getData = () => {
		let init = [padding, padding];
		const newArr = init.concat(data);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};

	const onScroll = event => {
		// console.log('event', event.nativeEvent.contentOffset);
		let y = event.nativeEvent.contentOffset.y;
		let focused = Math.floor(y / (69 * DP));
		if (focused < 1) {
			setSelectedItem(2);
		} else {
			if (focused >= data.length) {
				// 마지막 배열을 넘어서서 스크롤을 할 경우 마지막으로 자동 회귀
				console.log('focused', focused);
				setSelectedItem(data.length + 1);
			} else {
				setSelectedItem(focused + 2);
			}
		}
	};

	const getTextColor = index => {
		const abs = Math.abs(index - selectedItem);
		if (abs >= 2) {
			return GRAY20;
		} else if (abs == 1) {
			return GRAY10;
		} else {
			return BLACK;
		}
	};

	const onClose = () => {
		props.onCloseBottomBox();
	};

	//하단 드롭다운에서 완료 버튼 클릭
	const onSelectRegion = () => {
		console.log('data[selectedItem - 2]', data[selectedItem - 2]);
		props.onSelectRegion(data[selectedItem - 2]);
	};

	return (
		<>
			<TouchableOpacity activeOpacity={1} style={[style.header]}>
				<Text onPress={onClose} style={[txt.noto30, {paddingVertical: 22 * DP}]}>
					취소
				</Text>
				<TouchableOpacity onPress={onSelectRegion}>
					<Text style={[txt.noto30b]}>완료</Text>
				</TouchableOpacity>
			</TouchableOpacity>
			<View style={[style.list, {}]}>
				<FlatList
					data={getData()}
					onScroll={onScroll}
					showsVerticalScrollIndicator={false}
					renderItem={({item, index}) => {
						return (
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => setSelectedItem(index)}
								key={index}
								style={[style.listItem, index == selectedItem && item != padding ? {backgroundColor: GRAY30} : null]}>
								<Text style={[txt.roboto34, {color: getTextColor(index), fontSize: 32 * DP}]}>{item}</Text>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</>
	);
};

const ShelterSelectBox = React.memo(props => {
	const [data, setData] = React.useState(props.data.filter(e => e.user_nickname != undefined));

	React.useEffect(() => {
		setData(props.data.filter(e => e.user_nickname != undefined));
	}, [props.data]);

	//체크박스 선택
	const onSelect = i => {
		console.log('i', i);
		let temp = [...data];
		temp[i].state = !temp[i].state;
		setData(temp);
	};

	const onConfirm = () => {
		let list = data.filter(e => e.state);
		console.log('보호소 선택 완료', list);
		props.onConfirm(list);
	};

	const ITEM_HEIGHT = 142 * DP;
	const keyExtractor = React.useCallback(item => item._id.toString(), []);
	const getItemLayout = React.useCallback(
		(data, index) =>
			!data[index]
				? {length: 0, offset: 0, index: index}
				: {
						length: ITEM_HEIGHT,
						offset: ITEM_HEIGHT * index + 2 * DP,
						index,
				  },
		[],
	);

	const render = ({item, index}) => {
		// console.log('ind', index, item);
		const checked = item.state;
		return (
			<>
				<TouchableOpacity onPress={() => onSelect(index)} style={[style.shelterItemCont, {}]} activeOpacity={0.6}>
					<View style={[style.shelterInfo]}>
						<Text style={[txt.noto30]}>{item.user_nickname || ''}</Text>
						<Text style={[txt.roboto26, {color: GRAY10, maxWidth: 654 * DP}]} numberOfLines={1}>
							{item.shelter_address.brief || '주소 미등록 상태입니다.'}
						</Text>
						<View style={{flexDirection: 'row'}}>
							<PhoneIcon />
							<Text style={[txt.roboto26, {marginLeft: 12 * DP, color: GRAY10}]}>
								{item.shelter_delegate_contact_number || '전화번호 미등록 상태입니다.'}
							</Text>
						</View>
					</View>
					<View>{checked ? <Check42 onPress={() => onSelect(index)} /> : <Rect42_Border onPress={() => onSelect(index)} />}</View>
				</TouchableOpacity>
				{index == data.length - 1 ? <View style={[{width: 750 * DP, height: 100 * DP}]} /> : <></>}
			</>
		);
	};

	return (
		<>
			<TouchableOpacity activeOpacity={1} style={[style.shelterSelectHeader, style.shadow]}>
				<Text style={[txt.noto30, {paddingVertical: 22 * DP}]}>보호소 선택</Text>
				<TouchableOpacity onPress={onConfirm}>
					<Text style={[txt.noto30b, {marginRight: 10 * DP}]}>완료</Text>
				</TouchableOpacity>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={1} style={[{flex: 1, alignItems: 'center', backgroundColor: 'white'}]}>
				<FlatList
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={render}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					windowSize={5}
					ListEmptyComponent={<ListEmptyInfo text={'해당 지역에 위치한 보호소가 없습니다.'} />}
					ItemSeparatorComponent={() => {
						return <View style={{width: 654 * DP, height: 2 * DP, backgroundColor: GRAY30, alignSelf: 'center'}} />;
					}}
				/>
			</TouchableOpacity>
		</>
	);
});

ProtectRequestFilterModal.defaultProps = {
	yesMsg: 'ok',
	onYes: () => {
		alert('YES');
	},
	fontSize: 34,
};

const calendar_style = StyleSheet.create({
	outside: {
		width: 694 * DP,
		height: 1000 * DP,
		borderRadius: 50 * DP,
		alignSelf: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	inside: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30 * DP,
		// backgroundColor: WHITE,
	},
	headerCont: {
		// backgroundColor: BLUE10,
		width: 402 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
	},
	monthConatiner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80 * DP,
		height: 80 * DP,
		// backgroundColor: 'red',
	},
	currentMonthContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 80 * DP,
		height: 80 * DP,
		// backgroundColor: 'red',
	},
	arrowMarkContainer: {
		width: 48 * DP,
		height: 48 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	yearCont: {
		flexDirection: 'row',
	},
	popUpWindow: {
		alignItems: 'center',
	},
	changeMonthBtn: {
		alignItems: 'center',
		alignSelf: 'center',
		width: 80 * DP,
		height: 80 * DP,
		marginHorizontal: 40 * DP,
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
	dateContainer: {
		flexDirection: 'row',
		// alignSelf: 'center',
		justifyContent: 'space-between',
		// marginTop: 50 * DP,
		// backgroundColor: 'pink',
	},
	daysCont: {
		flexDirection: 'row',
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	daysView: {
		width: 94 * DP,
		height: 54 * DP,
		// marginBottom: -20 * DP,
		paddingTop: 16 * DP,
		opacity: 0.7,
	},
	daysText: {
		fontSize: 30 * DP,
		alignSelf: 'center',
	},
	weekend: {
		fontSize: 30 * DP,
		fontWeight: 'bold',
		color: RED10,
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
		height: 96 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	today: {
		width: 94 * DP,
		height: 96 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'yellow',
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
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	btnCont: {
		width: 604 * DP,
		alignSelf: 'center',
		marginBottom: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ProtectRequestFilterModal;
