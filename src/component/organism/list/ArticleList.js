import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Article from '../article/Article';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import {BLACK} from 'Root/config/color';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 */
export default ArticleList = props => {
	const renderItem = (item, index) => {
		return <Article />;
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.id}
				ListEmptyComponent={props.whenEmpty}
				listKey={({item, index}) => index}
				nestedScrollEnabled
			/>
		</View>
	);
};

ArticleList.defaultProps = {
	whenEmpty: () => {
		return <></>;
	},
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
