import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {Calendar48_Border} from 'Atom/icon';
<<<<<<< HEAD:src/component/molecules/select/DatePicker.js
import {APRI10, BLACK, GRAY20} from 'Root/config/color';
=======
import {APRI10, BLACK, GRAY10, GRAY20} from 'Root/config/color';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/molecules/DatePicker.js
import Modal from 'Component/modal/Modal';
import {object} from 'prop-types';

/**
 * 날짜 선택 인풋
 * @param {object} props - Props Object
 * @param {string} props.defaultDate - ex) 2021.05.01  처음 설정되어 있는 날짜
 * @param {string} props.title - 제목
 * @param {boolean} props.disable - 버튼 활성화 여부
 * @param {number} props.width - 전체 DatePicker의 너비 (default = 520 *DP )
 * @param {boolean} props.past - 이전날짜 선택 불가 모드 (default = true)
 * @param {boolean} props.future - 이전날짜 선택 불가 모드 (default = true)
 * @param {(title:string)=>void} props.onDateChange - 달력에서 날짜가 선택되었을 때 실행되는 콜백. 날짜정보를 반환함
 * @param {()=>void} props.canOpenCalendar - 달력 출력 여부 판정
 * @param {boolean} props.multiple - 다중선택 모드 여부
 * @param {object} props.previous - 다중선택 모드일 경우 이전 선택 리스트 배열
 * @param {number} props.maxLength - 다중선택 모드일 경우 선택가능 수
 */
const DatePicker = props => {
	const [showCalendar, setShowCalendar] = React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState(props.defaultDate ? props.defaultDate : '눌러서 지정해주세요!');

	const onDateChange = date => {
		setSelectedDate(date);
		Modal.close();
		props.onDateChange(date);
	};

	const closeCalendar = () => {
		// console.log('close');
		Modal.close();
	};

	const openCalendar = () => {
		// console.log('openCale');
		if (props.canOpenCalendar()) {
			props.multiple
				? Modal.popCalendar(
						showCalendar,
						closeCalendar,
						date => onDateChange(date),
						props.past,
						props.future,
						props.multiple,
						props.previous,
						props.maxLength,
				  )
				: Modal.popCalendar(showCalendar, closeCalendar, date => onDateChange(date), props.past, props.future);
			setShowCalendar(true);
		}
	};

	return (
		<TouchableOpacity
			onPress={openCalendar}
			style={{
				width: props.width * DP,
				height: 82 * DP,
			}}>
			{props.title != '' && props.title != 'title' && (
				<View style={{flexDirection: 'row'}}>
					<Text style={[txt.noto24, {color: APRI10}]}> {props.title}</Text>
				</View>
			)}
			<View
				style={{
					borderBottomColor: APRI10,
					borderBottomWidth: 2 * DP,
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<Text
					style={[
						txt.roboto32,
						{
							lineHeight: 44 * DP,
							paddingLeft: 14 * DP,
							paddingVertical: 18 * DP, // Value와 최상위 View와의 paddingVertical 16px
<<<<<<< HEAD:src/component/molecules/select/DatePicker.js
							color: selectedDate == '눌러서 지정해주세요!' ? GRAY20 : BLACK,
=======
							color: selectedDate == '눌러서 지정해주세요!' ? GRAY10 : BLACK,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/molecules/DatePicker.js
						},
					]}>
					{typeof selectedDate === 'object' ? '눌러서 지정해주세요!' : selectedDate}
				</Text>
				<View style={{position: 'absolute', right: 15 * DP}}>
					<Calendar48_Border />
				</View>
			</View>
		</TouchableOpacity>
	);
};
DatePicker.defaultProps = {
	width: 520, //전체 DatePicker의 너비
	title: 'title',
	onDateChange: e => console.log(e),
	canOpenCalendar: e => {
		return true;
	},
	past: true,
	maxLength: 3,
};

export default DatePicker;
