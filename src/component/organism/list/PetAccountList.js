import React from 'react';
import {FlatList, View} from 'react-native';
import {organism_style} from 'Organism/style_organism';
import PetLabel from 'Molecules/label/PetLabel';

/**
 * 반려동물 계정 리스트
 * @param {Array} props.items - 반려동물 리스트
 * @param {void} props.onLabelClick - 계정 선택 함수

 */

export default PetAccountList = props => {
	const onLabelClick = pet => {
		props.onLabelClick && props.onLabelClick(pet);
	};

	const renderItem = item => {
		return (
			<View style={[organism_style.petAccountList]}>
				<PetLabel data={item} onLabelClick={onLabelClick} />
			</View>
		);
	};

	return <FlatList data={props.items} renderItem={({item}) => renderItem(item)} />;
};
PetAccountList.defaultProps = {
	items: [],
	onLabelClick: item => {
		console.log('petId', item);
	},
};
