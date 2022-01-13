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
import {lo,txt} from './style_participation';
import DP from 'Screens/dp';
import ParticipationItem from './participationitem';

export default Participation = () => {
	return (
		<View style={lo.wrp_main}>
			<ScrollView style={{flex:1}} contentContainerStyle={{paddingTop:70*DP}}>
				
				<ParticipationItem title="임시보호 참여하기"/>
				<ParticipationItem title="소액 후원하기"/>
				<ParticipationItem title="임시보호 가이드 댕댕이 편"/>
				<ParticipationItem title="임시보호 참여하기"/>
				<ParticipationItem title="소액 후원하기"/>
				<ParticipationItem title="임시보호 가이드 댕댕이 편"/>
				<ParticipationItem title="임시보호 참여하기"/>
				<ParticipationItem title="소액 후원하기"/>
				<ParticipationItem title="임시보호 가이드 댕댕이 편"/>
				<ParticipationItem title="임시보호 참여하기"/>
				<ParticipationItem title="소액 후원하기"/>
				<ParticipationItem title="임시보호 가이드 댕댕이 편"/>
				
			</ScrollView>
		</View>
	);
};
