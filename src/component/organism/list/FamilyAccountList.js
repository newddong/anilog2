import React from 'react';
import {FlatList, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {Cross52} from 'Atom/icon';
import ProfileImageSmall from 'Molecules/image/ProfileImageSmall';
import {familyAccountList} from 'Organism/style_organism';

/**
 * 가족 계정 목록 
 *@param {void} props.itmes - 계정 목록 data
 *@param {void} props.onDeleteAccount - 계정 삭제 

 */
export default FamilyAccountList = props => {
	const renderItem = (item, index) => {
		return (
			<View style={[familyAccountList.itemContainer]}>
				<View style={[familyAccountList.profileImageSmall]}>
					<ProfileImageSmall data={item} />
				</View>
				<View style={[familyAccountList.userIDContainer]}>
					<Text style={[txt.roboto28b]}>{item.user_nickname}</Text>
				</View>
				<Cross52 onPress={() => props.onDeleteAccount(index)} style={[familyAccountList.cross52]} />
			</View>
		);
	};

	return (
		<ScrollView horizontal={false} contentContainerStyle={{flex: 0}}>
			<ScrollView horizontal={true} contentContainerStyle={{flex: 1}}>
				<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />
			</ScrollView>
		</ScrollView>
	);
};

FamilyAccountList.defaultProps = {
	onDeleteAccount: e => console.log('FamilAccoutList Delete', e),
};
