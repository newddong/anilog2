import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import ProfileImageMedium94 from 'Root/component/molecules/image/ProfileImageMedium94';

export default UserListHorizon = props => {
	const renderItem = (item, index) => {
		return (
			<View style={[style.itemContainer]}>
				<View style={[style.petProfileImageMedium]}>
					<TouchableOpacity onPress={() => props.onClickLabel(item)}>
						<ProfileImageMedium94 data={item} />
					</TouchableOpacity>
				</View>
				{props.items && index == props.items.length - 1 ? <View style={{width: 300 * DP, height: 68 * DP}} /> : <></>}
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				ListEmptyComponent={props.ListEmptyComponent}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	itemContainer: {
		paddingRight: 36 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
	},
	petProfileImageMedium: {
		width: 94 * DP,
		height: 94 * DP,
	},
});

UserListHorizon.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
	ListEmptyComponent: e => {
		return <></>;
	},
};
