import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import InputTimeLimit from 'Molecules/input/InputTimeLimit';
import DropdownSelect from 'Molecules/dropdown/DropdownSelect';
import DatePicker from 'Root/component/molecules/DatePicker';
import CheckBox from 'Root/component/molecules/CheckBox';
import { GRAY10 } from 'Root/config/color';
export default InputTest2 = props => {
	const navigation = useNavigation();
	const itemList = ['ITEM1', 'ITEM2', 'ITEM3', 'ITEM4'];
	return (
		<ScrollView>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest1')}>
					<View style={{width: 130, height: 50, backgroundColor: 'yellow'}}>
						<Text style={{fontSize: 18}}>InputTest1</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest2')}>
					<View style={{width: 130, height: 50, backgroundColor: 'powderblue'}}>
						<Text style={{fontSize: 18}}>InputTest2</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest4')}>
					<View style={{width: 130, height: 50, backgroundColor: GRAY10}}>
						<Text style={{fontSize: 18}}>InputTest4</Text>
					</View>
				</TouchableOpacity>
			</View>
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> InputTimeLimit - </Text>
			<InputTimeLimit placeholder={'placeholder'} value={null} timelimit={10} alert_msg={'alert_msg'} timeout_msg={'timeout_msg'} />

			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> DropdownSelect - </Text>
			<DropdownSelect itemList={itemList} value={null} defaultIndex={0} />
			<DropdownSelect itemList={itemList} value={null} defaultIndex={1} />

			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> DatePicker - </Text>
			<DatePicker />

			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> CheckBox - </Text>
			<CheckBox value={'value'} disable={false} />
			
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> CheckBox - disable </Text>
			<CheckBox value={'value'} disable={true} />
		</ScrollView>
	);
};
