import React from 'react';
import {View} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import TabSelectBorder_Type3 from 'Molecules/tab/TabSelectBorder_Type3';

export default TopTabNavigation_Border = props => {
	return (
		<View style={{borderTopColor: APRI10, backgroundColor: 'white'}}>
			<TabSelectBorder_Type3
				items={props.items}
				onSelect={pressedNum => props.onSelect(pressedNum)}
				select={props.select}
				fontSize={props.fontSize}
				value={props.value}
			/>
		</View>
	);
};

TopTabNavigation_Border.defaultProps = {
	items: [1, 2, 3],
	onSelect: e => console.log(e),
};
