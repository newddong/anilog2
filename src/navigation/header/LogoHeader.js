import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Logo} from 'Asset/image';
import {AlarmBadger48, Search48} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';

export default LogoHeader = ({navigation, route, options, back}) => {
	const clickLogo = () => {
		// alert('Logo!');
	};
	const clickSearch = () => {
		navigation.navigate('Search', {mother: 0, child: 0, prevNav: route.name});
		// alert('이후 버전에서 제공할 예정입니다!');
	};
	const clickAlarm = () => {
		alert('이후 버전에서 제공할 예정입니다!');
	};
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<SvgWrap style={style.logoContainer} onPress={clickLogo} svg={<Logo fill={APRI10} />} />
			<View style={style.buttonContainer}>
				<Search48 onPress={clickSearch} />

				<AlarmBadger48 onPress={clickAlarm} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	logoContainer: {
		marginBottom: 26 * DP,
		width: 167 * DP,
		height: 74 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
		marginBottom: 26 * DP,
		backgroundColor: '#fff',
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
