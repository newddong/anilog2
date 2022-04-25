import React from 'react';
import {Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, Dimensions, ScrollView} from 'react-native';
import DP from 'Root/config/dp';
import Postcode from '@actbase/react-daum-postcode';

export default AddressSearchPage = props => {
	// console.log('props', props.route);
	const onSelectData = data => {
		// console.log('data', data);
		props.navigation.navigate({
			name: props.route.params.prevRoute,
			params: {addr: data},
			merge: true,
		});
	};

	return (
		<ScrollView contentContainerStyle={[styles.container]}>
			<Postcode style={{width: 750 * DP, minHeight: 1500 * DP, alignSelf: 'center'}} onSelected={data => onSelectData(data)} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#FFF',
		// paddingVertical: 150 * DP,
	},
	infoMsg: {
		flexDirection: 'row',
	},
});
