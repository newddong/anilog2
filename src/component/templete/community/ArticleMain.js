import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK} from 'Root/config/color';
import {WriteBoard} from 'Root/component/atom/icon';

export default ArticleMain = ({route, navigation}) => {
	const dummy = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}];

	const onPressArticle = index => {
		// console.log('dummy', dummy[index]);
		navigation.push('ArticleDetail');
	};

	const onPressRecommendArticle = () => {
		navigation.push('ArticleDetail');
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => {
					return (
						<View>
							<ArticleList items={dummy} onPressArticle={onPressArticle} onPressRecommendArticle={onPressRecommendArticle} />
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
ArticleMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
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
});
