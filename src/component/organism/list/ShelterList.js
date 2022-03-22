import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ShelterVerticalLabel from 'Organism/listitem/ShelterVerticalLabel';
<<<<<<< HEAD:src/component/organism/list/ShelterList.js
import {shelterList} from 'Organism/style_organism';
=======
import {shelterList} from 'Organism/style_organism copy';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/organism_ksw/ShelterList.js

export default ShelterList = props => {
	const renderItem = (item, index) => {
		// console.log('item', item);
		return (
			<View style={[shelterList.shelterLabel]}>
				<ShelterVerticalLabel data={item} onLabelClick={() => props.onShelterLabelClick(item)} />
			</View>
		);
	};
	return (
		<View style={[shelterList.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				horizontal={true}
				nestedScrollEnabled
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
ShelterList.defaultProps = {
	items: [],
	onShelterLabelClick: e => console.log(e),
};
