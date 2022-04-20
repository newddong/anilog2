import React from 'react';
import {Text, View} from 'react-native';
import {EmptyIcon} from 'Root/component/atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
/**
 *
 *@param {{
 * items: 'Array / 피드 목록',
 * text: string,
 * paddingVertical : number
 * }} props
 */
export default ListEmptyInfo = props => {
	return (
		<View style={{paddingVertical: props.paddingVertical * DP, alignItems: 'center'}}>
			<EmptyIcon />
			<Text style={[txt.roboto28b, {marginTop: 10 * DP}]}>{props.text}</Text>
		</View>
	);
};
ListEmptyInfo.defaultProps = {
	text: '목록이 없습니다.',
	paddingVertical: 50,
};
