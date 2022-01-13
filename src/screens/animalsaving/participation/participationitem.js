import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import DP from 'Root/screens/dp';
import {useNavigation} from '@react-navigation/native';

export default ParticipationItem = (props) => {
   const nav = useNavigation();
	return (
      <TouchableWithoutFeedback onPress={()=>{nav.push('임시보호 참여하기')}}>
		<View style={item.wrp_item}>
			<Text style={[txt.noto28r,txt.gray,{marginBottom:10*DP}]}>{props.title}</Text>
			<View style={item.cntr_card}>
         <View style={item.card}></View>
         </View>
		</View>
      </TouchableWithoutFeedback>
	);
};
ParticipationItem.defaultProps={
   title:'제목을 입력하세요'
}


const item = StyleSheet.create({
	wrp_item: {
      marginBottom:30*DP
	},
	cntr_card: {
		backgroundColor: '#EDEDED',
		borderRadius: 30 * DP,
		borderBottomRightRadius: 0,
	},
	card: {
      height:204*DP
   },
});

const txt = StyleSheet.create({
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
   gray: {
		color: '#767676',
	},
});