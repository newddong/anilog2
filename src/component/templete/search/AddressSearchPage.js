import React from 'react';
import {Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';
import Postcode from '@actbase/react-daum-postcode';

export default AddressSearchPage = props => {
	console.log('props', props.route);
	const onSelectData = data => {
		console.log('data', data);
		props.navigation.navigate({
			name: props.route.params.prevRoute,
			params: {addr: data},
			merge: true,
		});
	};

	return (
		<View style={[styles.container]}>
			<Postcode style={{width: 654 * DP, height: 800, alignSelf: 'center'}} onSelected={data => onSelectData(data)} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#FFF',
	},
	infoMsg: {
		flexDirection: 'row',
	},
});
