import React from 'react';
import {Text, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import {BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

export default SimpleHeader = ({navigation, route, options, back}) => {
	// console.log('options', options);
	// console.log('route', route.params);
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text numberOfLines={1} style={[{flex: 1, textAlign: 'center', marginLeft: 30 * DP, marginRight: 80 * DP}, txt.roboto40b]}>
				{options.title ? options.title : route.params.title}
			</Text>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'flex-start',
		paddingHorizontal: 48 * DP,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
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
