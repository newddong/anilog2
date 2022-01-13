import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import BelongedPet from './belongedPet';

import DP from 'Screens/dp';

export default BelongedPetList = props => {
	return (
		<View style={{backgroundColor:'#FAFAF8'}}>
			<ScrollView horizontal style={[layout.petlist]} contentContainerStyle={{alignItems: 'center', justifyContent: 'space-evenly'}}>
				{props.data.map((e, i) => (
					<BelongedPet data={e} key={i} />
				))}
			</ScrollView>
		</View>
	);
};

const layout = StyleSheet.create({
	petlist: {
		top: 0 * DP,
		height: 220 * DP,
		marginHorizontal: 0,
	},
});
