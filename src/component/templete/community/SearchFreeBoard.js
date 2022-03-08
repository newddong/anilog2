import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import Article from 'Root/component/organism/article/Article';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK} from 'Root/config/color';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import RecommendArticle from 'Root/component/organism/article/RecommendArticle';

export default SearchFreeBoard = ({route, navigation}) => {
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
					return (
						<View>
							<ArticleList items={dummy} />
							<RecommendArticle />
						</View>
					);
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
SearchFreeBoard.defaultProps = {};

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
