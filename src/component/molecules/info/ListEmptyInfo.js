import React from 'react';
import {Text, View} from 'react-native';
import {EmptyIcon} from 'Root/component/atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {number} props.paddingVertical - 상단 마진 수치
 * @param {string} props.text - 출력 텍스트
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
