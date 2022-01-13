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
import { MaleIcon,FemaleIcon,DownBracketBlack } from 'Asset/image';

import {btn, cnts, lo, txt} from './style_aidrequest';
import LostAnimal from './lostanimal';
import DP from 'Screens/dp';
import dummydata from './aidrequestdata.json';

export default AidRequest = () => {
	const svg_size = {width:'100%',height:'100%'};
	return (
		<View style={lo.wrp_main}>
			<View style={lo.cntr_btn}>
				<View style={btn.wrp_btn}>
					<Text style={txt.noto28rcjk}>보호 지역</Text>
					<View style={btn.down}><DownBracketBlack {...svg_size}/></View>
				</View>
				<View style={btn.wrp_btn}>
					<Text style={txt.noto28rcjk}>동물 종류</Text>
					<View style={btn.down}><DownBracketBlack {...svg_size}/></View>
				</View>

			</View>
			<View style={lo.sctn_cnts}>
				<ScrollView>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
					<LostAnimal/>
				</ScrollView>
			</View>
		</View>
	);
};
