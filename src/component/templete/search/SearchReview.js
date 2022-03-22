import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {BLACK} from 'Root/config/color';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';

export default SearchReview = ({route, navigation}) => {
	const onPressAnimalFilter = filter => {
		alert(filter);
	};
	const dummy = [{id: 1}, {id: 2}, {id: 3}];

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => {
					return <ReviewList items={dummy} />;
				}}
			/>
			<View style={[style.animalFilter, style.shadow]}>
				<Animal_dog onPress={() => onPressAnimalFilter('dog')} />
				<Animal_cat onPress={() => onPressAnimalFilter('cat')} />
				<Animal_another onPress={() => onPressAnimalFilter('all')} />
			</View>
		</View>
	);
};
SearchReview.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	animalFilter: {
		position: 'absolute',
		width: 396 * DP,
		height: 60 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: {
			height: 2,
			width: 2,
		},
		elevation: 3,
	},
});
