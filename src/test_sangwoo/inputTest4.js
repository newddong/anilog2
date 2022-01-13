import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import DP from 'Root/config/dp';
import {useNavigation} from '@react-navigation/core';
import RadioBox from 'Root/component/molecules/RadioBox';
import { APRI10, GRAY10 } from 'Root/config/color';
import OnOffSwitch from 'Root/component/molecules/OnOffSwitch';
import Stagebar from 'Root/screens/common/stagebar';
export default InputTest4 = props => {
	const navigation = useNavigation();
	const itemList = ['ITEM1', 'ITEM2', 'ITEM3', 'ITEM4', 'Item5'];
	const itemList2 = ['예', '아니오'];
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
					<View style={{width: 130, height: 50, backgroundColor: GRAY10, }}>
						<Text style={{fontSize: 18}}>InputTest3</Text>
					</View>
				</TouchableOpacity>
			</View>
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Radio </Text>
			<RadioBox items={itemList} onSelect={e => console.log(e)} selectableNumber={3}/>
			<RadioBox items={itemList2} onSelect={e => console.log(e)} horizontal={true}/>
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> OnOffSwitch - disable </Text>
			<OnOffSwitch default={0} onSwtichOn={ e => console.log(e)} onSwtichOff={ e => console.log(e) }/>
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> StageBar - disable </Text>
			<Stagebar 
			style={{}} //전체 container style, text와 bar를 감싸는 view의 style
			backgroundBarStyle={{width:200, height:20*DP, backgroundColor:'white', borderRadius:20*DP, left:50, borderWidth:4*DP, borderColor:APRI10 }} //배경이 되는 bar의 style, width props으로 너비결정됨
			insideBarStyle={{width:40, height:20*DP, backgroundColor:APRI10, borderRadius:18*DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
			current={3} //현재 단계를 정의
			maxstage={5} //전체 단계를 정의
			width={200} //bar의 너비
			textStyle={[txt.noto24, {left:55}]}//text의 스타일
			/>
		</View>
	);
};

