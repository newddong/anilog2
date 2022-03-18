import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {BLACK} from 'Root/config/color';
import InfoScreen from 'Root/component/organism/info/InfoScreen';

export default SearchMarket = ({route, navigation}) => {
	return (
		<View style={[style.container]}>
			<InfoScreen />
		</View>
	);
};
SearchMarket.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	animalFilter: {
		position: 'absolute',
		width: 396 * DP,
		height: 60 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: {
			height: 2,
			width: 2,
		},
		elevation: 3,
	},
});
