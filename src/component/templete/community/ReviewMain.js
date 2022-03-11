import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {BLACK} from 'Root/config/color';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';

export default ReviewMain = ({route, navigation}) => {
	const onPressAnimalFilter = filter => {
		switch (filter) {
			case 'dog':
				setFilterData({...filterData, dog: !filterData.dog});
				break;
			case 'cat':
				setFilterData({...filterData, cat: !filterData.cat});
				break;
			case 'another':
				setFilterData({...filterData, another: !filterData.another});
				break;
			case 'filter':
				setFilterData({...filterData, filter: !filterData.filter});
				break;
			default:
				break;
		}
	};
	const dummy = [{id: 1}, {id: 2}, {id: 3}];

	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		another: false,
		filter: false,
	});

	return (
		<View style={[style.container]}>
			<View style={[style.filter]}>
				<View style={[style.shadow_filter]}>
					{filterData.filter ? (
						<Filter60Filled onPress={() => onPressAnimalFilter('filter')} />
					) : (
						<Filter60Border onPress={() => onPressAnimalFilter('filter')} />
					)}
				</View>
				<View style={[style.animalFilter]}>
					<View style={[style.shadow]}>
						{filterData.dog ? (
							<Animal_dog onPress={() => onPressAnimalFilter('dog')} />
						) : (
							<Animal_dog_off onPress={() => onPressAnimalFilter('dog')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{filterData.cat ? (
							<Animal_cat onPress={() => onPressAnimalFilter('cat')} />
						) : (
							<Animal_cat_off onPress={() => onPressAnimalFilter('cat')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{filterData.another ? (
							<Animal_another onPress={() => onPressAnimalFilter('another')} />
						) : (
							<Animal_another_off onPress={() => onPressAnimalFilter('another')} />
						)}
					</View>
				</View>
			</View>
			<FlatList
				data={[{}]}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => {
					return (
						<View>
							<ReviewList items={dummy} />
						</View>
					);
				}}
			/>
			<View style={[style.write, style.shadow]}>
				<WriteBoard />
			</View>
		</View>
	);
};
ReviewMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 676 * DP,
		height: 60 * DP,
		marginTop: 30 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	animalFilter: {
		width: 396 * DP,
		marginLeft: 220 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
	},
	shadow_filter: {
		width: 60 * DP,
		height: 60 * DP,
		backgroundColor: 'white',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
		},
		borderRadius: 20 * DP,
	},
});
