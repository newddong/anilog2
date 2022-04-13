import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AnimalInfo from 'Organism/listitem/AnimalInfo';
import {animalInfoList} from 'Organism/style_organism copy';
//동물 보호 현황 - From UserMenu / 관련 테이블 @ProtectAnimalObject / UserObject(pet)
export default AnimalInfoList = props => {
	const [data, setData] = React.useState(props.items);

	React.useEffect(() => {
		setData(props.items);
	}, [props.items]);

	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => props.onPressLabel(item, index)} style={[animalInfoList.itemContainer]}>
				<AnimalInfo data={item} onPressLabel={() => props.onPressLabel(item, index)} />
			</TouchableOpacity>
		);
	};

	return <FlatList data={data} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} ListEmptyComponent={props.whenEmpty} />;
};

AnimalInfoList.defaultProps = {
	onPressLabel: e => {},
	listEmpty: () => {
		return <></>;
	},
};
