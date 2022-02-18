import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InfoScreen from 'Organism/info/InfoScreen';
// import DropdownSelect from 'Root/component/molecules/DropdownSelect';

export default Temp = () => {
	return (
		<View style={{flex: 1}}>
			{/* <Text>커뮤니티는 이후 버전에 출시될 예정입니다.</Text> */}
			<InfoScreen />
			{/* <DropdownSelect/> */}
		</View>
	);
};
