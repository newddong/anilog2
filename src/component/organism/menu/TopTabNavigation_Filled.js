import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10, GRAY40, WHITE} from 'Root/config/color';

import TabSelectFilled_Type3 from 'Molecules/tab/TabSelectFilled_Type3';
export default TopTabNavigation_Filled = props => {
	const [selected, setSelected] = React.useState(props.select ? props.select : 0);
	//선택된 Tab의 State를 True로 이외의 Tab은 False로
	const onSelect = index => {
		setSelected(index);
		props.onSelect(index);
	};

	React.useEffect(() => {
		setSelected(props.value);
	}, [props.value]);

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity
				onPress={() => onSelect(index)}
				style={{
					width: (750 * DP) / 2,
					height: 70 * DP,
					borderTopLeftRadius: 30 * DP,
					borderTopRightRadius: 30 * DP,
					backgroundColor: selected == index ? APRI10 : WHITE,
					justifyContent: 'center',
				}}>
				<Text
					style={[
						txt.noto30b,
						{
							color: selected == index ? WHITE : GRAY10,
							textAlign: 'center',
						},
					]}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={{backgroundColor: 'white'}}>
			<FlatList data={props.menu} renderItem={renderItem} horizontal={true} scrollEnabled={false} />
		</View>
	);
};
TabSelectFilled_Type3.defaultProps = {
	menu: [1, 2, 3], //FlatList에 담길 배열 정보
	onSelect: e => console.log(e), //Tab Press 이벤트
};
