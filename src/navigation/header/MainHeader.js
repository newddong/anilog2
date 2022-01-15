import React, {useState, useRef} from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Logo, AlarmIcon, SearchIcon, AnimalIcon} from 'Asset/image';
import DP from 'Root/config/dp';
import SvgWrapper, {SvgWrap} from 'Atom/svgwrapper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {MAINCOLOR} from 'Root/config/color';
//deprecated
export default MainHeader = ({navigation}) => {
	const clickLogo = () => {
		// alert('Logo!');
	};
	const clickSearch = () => {
		// navigation.navigate('Search');
		// alert('Search');
		alert('이후 버전에서 제공할 예정입니다!');
	};
	const clickAlarm = () => {
		alert('이후 버전에서 제공할 예정입니다!');
	};
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<SvgWrap style={style.logoContainer} onPress={clickLogo} svg={<Logo fill={MAINCOLOR} />} />
			<View style={style.buttonContainer}>
				<SvgWrap style={style.iconContainer} onPress={clickSearch} svg={<SearchIcon />} />

				<SvgWrap style={style.iconContainer} onPress={clickAlarm} svg={<AlarmIcon />} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		height: 132 * DP,
		flexDirection: 'row',
	},
	logoContainer: {
		marginLeft: 48 * DP,
		marginRight: 368 * DP,
		marginBottom: 34 * DP,
		width: 167 * DP,
		height: 74 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 30 * DP,
	},
	iconContainer: {
		width: 48 * DP,
		height: 48 * DP,
		marginRight: 16 * DP,
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
});
