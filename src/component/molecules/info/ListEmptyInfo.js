import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {EmptyIcon} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
import dp from 'Root/config/dp';
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
		<View style={{paddingVertical: 150 * dp, alignItems: 'center'}}>
			<EmptyIcon />
			<Text style={[txt.noto28]}>{props.text}</Text>
		</View>
	);
};
ListEmptyInfo.defaultProps = {
	text: '목록이 없습니다.',
};
