import React from 'react';
import {FlatList, Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {dummy_ActivationList} from 'Root/config/dummyDate_json';
import {txt} from 'Root/config/textstyle';
import {styles} from '../atom/image/imageStyle';
import InfoScreen from '../organism_ksw/InfoScreen';
import {activationList, login_style, temp_style} from './style_templete';
// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default ActivationList = props => {
	const boxClick = category => {
		console.log(category);
		props.navigation.push('ActivationDetail', category);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[activationList.activity]}>
				<View style={[activationList.activityNameContainer]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>{item.title}</Text>
				</View>
				<TouchableOpacity style={[activationList.activityImage]} onPress={() => boxClick(item)}>
					<Image source={{uri: item.image}} style={{flex: 1}} resizeMode={'stretch'} />
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View style={[login_style.wrp_main, activationList.container]}>
			{/* <FlatList data={dummy_ActivationList} renderItem={({item, index}) => renderItem(item, index)} /> */}
			<InfoScreen />
		</View>
	);
};
