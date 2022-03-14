import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {Logo} from 'Asset/image';
import {AlarmBadger48, Search48, BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';

export default AlarmAndSearchHeader = ({navigation, route, options, back}) => {
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
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
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
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
		marginBottom: 26 * DP,
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
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		marginBottom: 8 * DP,
	},
});
