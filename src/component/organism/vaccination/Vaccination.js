import React from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View, FlatList} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {vaccination} from 'Organism/style_organism copy';
/**
 * 상단 탭 네비게이션 테두리 
 * @param {Array} props.data - 예방법종 데이터 
 * @param {string} props.title  -제목 / 매월, 매년, 3개월에 1회 접종 
 * @param {void} props.onDateChange  - 데이터 변경 콜백
 * 

 */
export default Vaccination = props => {
	// const testData = [
	// 	{
	// 		vacc_name: '심장사상충',
	// 		current_dueDate: '2011-11-24',
	// 		next_dueDate: '2021-11-24',
	// 	},
	// 	{ㄱ
	// 		vacc_name: '해장 사상충',
	// 		current_dueDate: '2011-11-24',
	// 		next_dueDate: '2021-11-24',
	// 	},
	// ];

	const [showCalendar, setShowCalendar] = React.useState(false);
	let _dummyData = [...props.data];
	let vaccName = '';
	let selectedDate = '';

	const onDateChange = date => {
		selectedDate = date;
		Modal.close();

		_dummyData.map((v, i) => {
			if (v.vacc_name == vaccName) {
				v.current_dueDate = selectedDate;
			}
		});
		props.onDateChange(_dummyData);
	};

	const closeCalendar = () => {
		Modal.close();
	};

	const openCalendar = e => {
		setShowCalendar(true);
		vaccName = e;
		Modal.popCalendar(showCalendar, closeCalendar, date => onDateChange(date));
	};

	const renderItem = (item, index) => {
		return (
			<View style={[vaccination.itemContainer]}>
				<View style={[vaccination.item_name]}>
					<Text style={[txt.noto30]}>{item.vacc_name}</Text>
				</View>
				<TouchableOpacity onPress={() => openCalendar(item.vacc_name)}>
					<View style={[vaccination.current_dueDate]}>
						<Text style={[txt.roboto28b, {color: 'white'}]}>{item.current_dueDate}</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={[vaccination.next_dueDate]}>
						<Text style={[txt.roboto28, {color: GRAY10}]}>{item.next_dueDate}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View style={[vaccination.container]}>
			<View style={[vaccination.insideContainer]}>
				<View style={[vaccination.titleContainer]}>
					<View style={[vaccination.title]}>
						<Text style={[txt.noto28, {color: APRI10}]}>{props.title}</Text>
					</View>
					<View style={[vaccination.titleMenu]}>
						<Text>이번 예정일</Text>
					</View>
					<View style={[vaccination.titleMenu]}>
						<Text>다음 예정일</Text>
					</View>
				</View>
				<ScrollView horizontal={false}>
					<ScrollView horizontal={true}>
						<FlatList
							data={_dummyData}
							renderItem={({item, index}) => renderItem(item, index)}
							keyExtractor={item => item.vacc_name}
							scrollEnabled={false}
						/>
					</ScrollView>
				</ScrollView>
			</View>
			<View style={[vaccination.separator]}></View>
		</View>
	);
};
