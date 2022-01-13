import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ProfileImageMedium120 from '../molecules/ProfileImageMedium120';
import {ownerList} from './style_organism';

export default OwnerList = props => {
	const onClickLabel = item => {
		props.onClickLabel(item);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[ownerList.itemContainer]}>
				<View style={[ownerList.petProfileImageMedium]}>
					<TouchableOpacity onPress={() => onClickLabel(item)}>
						<ProfileImageMedium120 data={item} />
					</TouchableOpacity>
				</View>

				<View style={[ownerList.petProfileInfo]}>
					<Text style={[txt.noto24, {color: GRAY10}]}> {item.user_nickname}</Text>
				</View>
			</View>
		);
	};
	
	return (
		<View style={[ownerList.container]}>
			<View style={[ownerList.insideContainer]}>
				<ScrollView horizontal={false} contentContainerStyle={{flex: 0}}>
					<ScrollView horizontal={true} contentContainerStyle={{flex: 1}} scrollEnabled={false}>
						<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} horizontal={true} />
					</ScrollView>
				</ScrollView>
			</View>
		</View>
	);
};

OwnerList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
};
