import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import SvgWrapper from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {HomeIcon, PersonIcon} from 'Asset/image';
import {WHITE, MAINCOLOR, LINK, GRAY, RED} from '../color';
import {txt} from './style_assign';

export default Assign = props => {
	return (
		<View style={lo.wrp_main}>
			<View style={lo.cntr_btn}>
				<TouchableWithoutFeedback onPress={() => {props.navigation.push('AssignUser',{title:'회원가입'})}}>
					<View style={[btn.wrp_btn, btn.shadow, {backgroundColor: WHITE}]}>
						<Text style={[txt.noto24, {color: MAINCOLOR, marginTop: 16 * DP, marginBottom: 24 * DP}]}>회원가입</Text>
						<SvgWrapper style={btn.icon_size} svg={<PersonIcon fill={MAINCOLOR} />} />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => {props.navigation.push('AssignShelter',{title:'회원가입'})}}>
					<View style={[btn.wrp_btn, btn.shadow, {backgroundColor: MAINCOLOR}]}>
						<Text style={[txt.noto24, {color: WHITE, marginTop: 16 * DP, marginBottom: 24 * DP}]}>보호소</Text>

						<SvgWrapper style={btn.icon_size} svg={<HomeIcon fill={WHITE} />} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		paddingHorizontal: 48 * DP,
		backgroundColor: WHITE,
	},
	cntr_btn: {
		marginTop: 180 * DP,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

const btn = StyleSheet.create({
	wrp_btn: {
		width: 208 * DP,
		height: 208 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
	},
	icon_size: {
		width: 92 * DP,
		height: 92 * DP,
	},
	icon_home: {
		width: 104 * DP,
		height: 92 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1,
			height: 6,
		},
		elevation: 6,
	},
});

