import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {AlarmBadger48, Search48, BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {WHITE, APRI10} from 'Root/config/color';

export default ConfirmHeader = ({navigation, route, options, back}) => {
	const confirm = () => {
		// navigation.navigate('Search');
		alert('Confirm');
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={confirm}>
				<View style={style.buttonContainer}>
					<Text style={[txt.noto36b, {color: APRI10, lineHeight: 56 * DP}]}>확인</Text>
				</View>
			</TouchableOpacity>
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
		width: 67 * DP,
		marginBottom: 22 * DP,
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
		height: 66 * DP,
		justifyContent: 'center',
		// backgroundColor:'red',
		marginBottom: 18 * DP,
	},
});
