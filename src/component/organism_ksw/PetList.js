import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {dummy_petList} from 'Root/config/dummyDate_json';
import {txt} from 'Root/config/textstyle';
import ProfileImageMedium120 from '../molecules/ProfileImageMedium120';
import {petList} from './style_organism';

export default PetList = props => {
	const renderItem = (item, index) => {
		return (
			<View style={[petList.itemContainer]}>
				<View style={[petList.petProfileImageMedium]}>
					<TouchableOpacity onPress={() => props.onClickLabel(item)}>
						<ProfileImageMedium120 data={item} />
					</TouchableOpacity>
				</View>

				<View style={[petList.petProfileInfo]}>
					<Text style={[txt.noto24, {color: GRAY10}]}> {item.user_nickname}</Text>
					<Text style={[txt.noto24, {color: GRAY10}]}>{item.pet_species_detail?item.pet_species_detail:''}</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={[petList.container]}>
			<View style={[petList.insideContainer]}>
				<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} horizontal={true} />
			</View>
		</View>
	);
};
PetList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
};
// ProfileImageMedium120 - props
// img_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg', //image uri
// 	userType: 'user', //required - 유저타입 pet user shelter
// 	shelterType: 'none', // public private
// 	petStatus: 'none', // normal protected adopted none
