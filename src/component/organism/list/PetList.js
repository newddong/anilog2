import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ProfileImageMedium120 from 'Molecules/image/ProfileImageMedium120';
import {petList} from 'Organism/style_organism copy';
import DP from 'Root/config/dp';

export default PetList = props => {
	const renderItem = (item, index) => {
		return (
			<View style={[style.itemContainer]}>
				<View style={[style.petProfileImageMedium]}>
					<TouchableOpacity onPress={() => props.onClickLabel(item)}>
						<ProfileImageMedium120 data={item} />
					</TouchableOpacity>
				</View>

				<View style={[style.petProfileInfo, {}]}>
					<Text style={[txt.noto24, {color: GRAY10, maxWidth: 140 * DP}]} numberOfLines={1}>
						{item.user_nickname}
					</Text>
					<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={1}>
						{item.pet_species_detail ? item.pet_species_detail : ''}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[style.insideContainer]}>
				<FlatList
					data={props.items}
					renderItem={({item, index}) => renderItem(item, index)}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={props.ListEmptyComponent}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		// height: 220 * DP,
		paddingBottom: 20 * DP,
		justifyContent: 'center',
	},
	insideContainer: {
		width: 750 * DP,
		paddingHorizontal: 30 * DP,
		marginRight: 22 * DP,
	},
	itemContainer: {
		// width: 152 * DP,
		// height: 196 * DP,
		marginRight: 30 * DP,
		alignItems: 'center',
	},
	petProfileImageMedium: {
		width: 120 * DP,
		height: 120 * DP,
	},
	petProfileInfo: {
		alignItems: 'center',
	},
});

PetList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	ListEmptyComponent: e => {
		return <></>;
	},
};
