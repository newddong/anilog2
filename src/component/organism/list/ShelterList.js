import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ShelterVerticalLabel from 'Organism/listitem/ShelterVerticalLabel';
import {shelterList} from 'Organism/style_organism copy';
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
