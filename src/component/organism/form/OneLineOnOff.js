import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import OnOffSwitchForSetting from 'Root/component/molecules/select/OnOffSwitchForSetting';
/**
 * 제목 + onOffSwitch 설정 객체 하나
 * @function OneOnOffLine
 * @param {object} data - 설정 정보가 담겨있는 object
 * @param {string} name - 설정의 제목 이름
 * @param {string} key - 설정 object의 onOffSwitch와 연결할 객체의 key
 * @param {functtion} switchButton - switch버튼 onPress함수
 */

const OneOnOffLine = props => {
	return (
		<View style={{flexDirection: 'row'}}>
			<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
				<Text style={[txt.noto28, {color: GRAY10}]}>{props.name}</Text>
			</View>
			<OnOffSwitchForSetting
				default={props.data[props.keys] || ''}
				onSwtichOff={() => props.switchButton(props.keys)}
				onSwtichOn={() => props.switchButton(props.keys)}
			/>
		</View>
	);
};

export default OneOnOffLine;
