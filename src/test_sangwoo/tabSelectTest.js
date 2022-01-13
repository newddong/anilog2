import React from 'react';
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import TabSelectFilled_Type1 from 'Root/component/molecules/TabSelectFilled_Type1';
import TabSelectFilled_Type2 from 'Root/component/molecules/TabSelectFilled_Type2';
import TabSelectFilled_Type3 from 'Root/component/molecules/TabSelectFilled_Type3';
import TabSelectBorder_Type1 from 'Root/component/molecules/TabSelectBorder_Type1';
import TabSelectBorder_Type2 from 'Root/component/molecules/TabSelectBorder_Type2';
import TabSelectBorder_Type3 from 'Root/component/molecules/TabSelectBorder_Type3';
export default TabSelectTest = props => {
	const navigation = useNavigation();
	const items = ['Feed', 'Feed2', 'Feed3'];
	const items2 = ['TAB_ACT', 'TAB_INACT'];
	const itemList = ['ITEM1', 'ITEM2', 'ITEM3', 'ITEM4'];
	const emailList = ['naver.com', 'nate.com', 'daum.net'];
	return (
		<View>
			{/* TabSelectFilled_Type1 */}
			<View style={{marginTop: 20}} />
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectFilled_Type1 </Text>
			<TabSelectFilled_Type1 items={items} onSelect={e => alert(e)} />
			{/* TabSelectFilled_Type2 */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectFilled_Type2 </Text>
			<TabSelectFilled_Type2 items={items} onSelect={e => console.log(e)} />
			{/* TabSelectFilled_Type3 */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectFilled_Type3 </Text>
			<TabSelectFilled_Type3 items={items} onSelect={e => console.log(e)} />
			{/* TabSelectBorder_Type1*/}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectBorder_Type1 </Text>
			<TabSelectBorder_Type1 items={items2} onSelect={e => console.log(e)} />
			{/* TabSelectBorder_Type2*/}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectBorder_Type2</Text>
			<TabSelectBorder_Type2 items={itemList} onSelect={e => console.log(e)} />
			{/* TabSelectBorder_Type3*/}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> TabSelectBorder_Type3</Text>
			<TabSelectBorder_Type3 items={itemList} onSelect={e => console.log(e)} />
		</View>
	);
};
