import React from 'react';
import {FlatList, View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import VolunteerItem from 'Organism/listitem/VolunteerItem';
import DP from 'Root/config/dp';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 봉사활동 Object
 * @param {(data:object)=>void} props.onClickLabel - 프로필 라벨 클릭
 * @param {(data:object)=>void} props.onClickItem - 아이템 클릭 클릭
 * @param {boolean} props.isShelterUser - 아이템 클릭 클릭
 * @param {boolean} props.showStatus - 봉사활동 신청 상태 출력 여부
 */
export default VolunteerItemList = props => {
	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => props.onClickItem(item)} style={[volunteerItemList.itemContainer]}>
				<VolunteerItem
					data={item}
					showStatus={props.showStatus}
					type={props.type}
					onClickLabel={() => props.onClickLabel(item)}
					isShelterUser={props.isShelterUser}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<View style={[volunteerItemList.container]}>
			<ScrollView horizontal={false} scrollEnabled={false} showsVerticalScrollIndicator={false}>
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
	showStatus: true,
};

const volunteerItemList = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
	},
	itemContainer: {
		width: 694 * DP,
		marginBottom: 40 * DP,
	},
});
