import React from 'react';
import {FlatList, Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {GRAY10, APRI10} from 'Root/config/color';
import {dummy_ActivationList} from 'Root/config/dummyDate_json';
import {txt} from 'Root/config/textstyle';
import {styles} from '../atom/image/imageStyle';
import {activationList, login_style, temp_style} from '../templete/style_templete';
import {Ready_for_updating} from '../atom/icon';

export default InfoScreen = props => {
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

			{/* <Image source={require('../../assets/imageFile/infoImage.png')} style={[styles.img_square_round_410, {marginBottom: 20}]} /> */}
			<View style={[activationList.activityUpdating]}>
				<Ready_for_updating></Ready_for_updating>
				<Text style={[txt.roboto28b, {color: APRI10, textAlign: 'center'}]}>업데이트 준비 중입니다!</Text>
			</View>
		</View>
	);
};
