import React from 'react';
import {txt} from 'Root/config/textstyle';
import { Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {useNavigation} from '@react-navigation/core';
import PasswordInput from 'Molecules/input/PasswordInput';
import InputWithSelect from 'Molecules/input/InputWithSelect';
import InputWithEmail from 'Molecules/input/InputWithEmail';
import { GRAY10 } from 'Root/config/color';
export default InputTest2 = props => {
	const navigation = useNavigation();
	const items = ['Feed', 'Feed2', 'Feed3'];
	const items2 = ['TAB_ACT', 'TAB_INACT'];
	const itemList = ['ITEM1', 'ITEM2', 'ITEM3', 'ITEM4'];
	const emailList = ['naver.com', 'nate.com', 'daum.net'];
	return (
		<View>
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
				<TouchableOpacity onPress={() => navigation.navigate('InputTest3')}>
					<View style={{width: 130, height: 50, backgroundColor: GRAY10}}>
						<Text style={{fontSize: 18}}>InputTest3</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* PasswordInput */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> PasswordInput </Text>
			<PasswordInput
				title={'title'}
				placeholder={'placeholder'}
				information={'information'}
				value={'value'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
			/>
			{/* InputWithEmail */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> InputWithEmail / 이메일란 한글자 이상- Border 바뀜</Text>
			<InputWithEmail itemList={emailList} placeholder={'placeholder'} value={null} defaultIndex={0} />
			{/* InputWithSelect */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> InputWithSelect </Text>
			<InputWithSelect itemList={itemList} placeholder={'placeholder'} value={null} defaultIndex={0} onChange={ e => console.log(e)} />
			
			{/* Password Input */}
		</View>
	);
};
