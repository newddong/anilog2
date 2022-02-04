import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
/**
 *
 *@param {{
 * items: 'Array / 피드 목록',
 * text: string,
 * selectMode : boolean
 * }} props
 */
export default ListEmptyInfo = props => {
	return (
		<View style={{marginTop: 50}}>
			<Text style={[txt.roboto30b, {color: GRAY10, textAlign: 'center'}]}>{props.text}</Text>
		</View>
	);
};
ListEmptyInfo.defaultProps = {};
