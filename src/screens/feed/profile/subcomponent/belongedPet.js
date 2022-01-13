import React from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight,Platform} from 'react-native';

import {
	HeartEmptyIcon,
	HeartIcon,
} from 'Asset/image';

import DP from 'Screens/dp';
import { text } from '../style_profile';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';

export default BelongedPet = ({data}) => {
	const nav = useNavigation();
	const route = useRoute();

	const moveToPetProfile = () => {
		// console.log(data);
		nav.push('PetProfile', {user_id: data._id,user_nickname:data.nickname});//petId
	};

	return (
		<TouchableHighlight onPress={moveToPetProfile}>
			<View style={layout.petItems}>
				{Platform.OS==='ios'?<Image style={layout.petItemPhoto} source={{uri:data.profileImgUri}}/>:
				<FastImage style={layout.petItemPhoto} source={{uri:data.profileImgUri}}/>}
				<View style={layout.petItemHeart}>
					{data.heart ? (
						<HeartIcon width="100%" height="100%" />
					) : (
						<HeartEmptyIcon width="100%" height="100%" />
					)}
				</View>
				<Text style={[text.regular24cjk, text.gray,{textAlign:'center',width:200*DP}]}>{data.nickname}/{data.age}살</Text>
				<Text style={[text.regular24cjk, text.gray,{textAlign:'center',width:200*DP}]}>{data.animalKindDetail}</Text>
			</View>
		</TouchableHighlight>
	);
};


const layout = StyleSheet.create({
	petItems:{
		width:152*DP,
		height:196*DP,
		marginHorizontal:15*DP,
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'red'
	},
	petItemPhoto:{
		width:120*DP,
		height:120*DP,
		borderRadius:120*DP,
		// backgroundColor:'green'
	},
	petItemHeart:{
		width:48*DP,
		height:48*DP,
		position:'absolute',
		right:16*DP,
	},
});