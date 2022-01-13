import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {ASSIGN_PET} from 'Root/i18n/msg';
import {Add_Pet} from '../atom/icon';

/**
 * 버튼 컴포넌트트
 * @param {void} props.onAdd - 버튼을 눌렸을때 동작하는 콜백,
 */
const AddPet = props => {
	const onAdd = e => {
		props.onAdd();
	};

	return (
		<View style={{width: 180 * DP, height: 270 * DP, justifyContent: 'center', alignItems: 'center'}}>
			<TouchableOpacity onPress={onAdd}>
				<Add_Pet />
			</TouchableOpacity>
			<Text style={[txt.noto24, {color: APRI10, textAlign: 'center', width: 160 * DP, height: 80 * DP, marginTop: 10 * DP}]}>{ASSIGN_PET}</Text>
		</View>
	);
};

AddPet.defaultProps = {
	onAdd: e => console.log(e),
};

export default AddPet;
