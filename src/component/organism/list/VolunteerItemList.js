import React from 'react';
import {FlatList, View, ScrollView, TouchableOpacity} from 'react-native';
import VolunteerItem from 'Organism/listitem/VolunteerItem';
import {volunteerItemList} from 'Organism/style_organism copy';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 봉사활동 Object
 * @param {(data:object)=>void} props.onClickLabel - 프로필 라벨 클릭
 * @param {(data:object)=>void} props.onClickItem - 아이템 클릭 클릭
 * @param {boolean} props.isShelterUser - 아이템 클릭 클릭
 */
export default VolunteerItemList = props => {
	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => props.onClickItem(item)} style={[volunteerItemList.itemContainer]}>
				<VolunteerItem data={item} type={props.type} onClickLabel={() => props.onClickLabel(item)} isShelterUser={props.isShelterUser} />
			</TouchableOpacity>
		);
	};

	return (
		<View style={[volunteerItemList.container]}>
			<ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
				<ScrollView horizontal={true} scrollEnabled={false}>
					<FlatList
						data={props.items}
						renderItem={({item, index}) => renderItem(item, index)}
						scrollEnabled={false}
						ListEmptyComponent={props.whenEmpty}
						showsVerticalScrollIndicator={false}
					/>
				</ScrollView>
			</ScrollView>
		</View>
	);
};

VolunteerItemList.defaultProps = {
	onClickItem: e => console.log(e),
	isShelterUser: false,
};
