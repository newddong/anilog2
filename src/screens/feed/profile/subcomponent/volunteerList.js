import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';


import VolunteerItem from './volunteerItem';

import DP from 'Screens/dp';

export default VolunteerList = ({data}) => {
	return (
		<>
			<Text style={{top: 36 * DP, left: 48 * DP, position: 'absolute'}}>현재 보호/후원 현황</Text>
			<ScrollView
				horizontal
				contentContainerStyle={[layout.volunteerList, {justifyContent: 'space-evenly'}]}>
				{data.map((e,i)=>
					<VolunteerItem data={e} key={i}/>)}
			</ScrollView>
		</>
	);
};

const layout = StyleSheet.create({
	volunteeractivity:{
		backgroundColor:'#FAFAF8',
		// backgroundColor:'yellow',
		width:'100%',
		height: 402*DP
	},
	volunteerList:{
		top:102*DP,
		// height: 260 * DP,
		marginHorizontal:0,
		// backgroundColor:'yellow'
	},
});