import React from 'react';
import {FlatList, View, ScrollView, TouchableOpacity} from 'react-native';
import {volunteerItemList} from 'Organism/style_organism';
import VolunteerItem from 'Organism/listitem/VolunteerItem';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 봉사활동 Object
 * @param {(data:object)=>void} props.onClickLabel - 프로필 라벨 클릭
 * @param {(data:object)=>void} props.onClickItem - 아이템 클릭 클릭
 */
export default VolunteerItemList = props => {
	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => props.onClickItem(item)} style={[volunteerItemList.itemContainer]}>
				<VolunteerItem data={item} type={props.type} onClickLabel={() => props.onClickLabel(item)} />
			</TouchableOpacity>
		);
	};

	return (
		<View style={[volunteerItemList.container]}>
			<ScrollView horizontal={false}>
				<ScrollView horizontal={true} scrollEnabled={false}>
					<FlatList
						data={props.items}
						renderItem={({item, index}) => renderItem(item, index)}
						scrollEnabled={false}
						ListEmptyComponent={props.whenEmpty}
					/>
				</ScrollView>
			</ScrollView>
		</View>
	);
};

VolunteerItemList.defaultProps = {
	onClickItem: e => console.log(e),
};
