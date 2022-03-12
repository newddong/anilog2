import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Article from '../article/Article';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import {BLACK, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import RecommendArticle from '../article/RecommendArticle';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {()=>void)} props.onPressArticle - 게시글 컨텐츠 클릭(사진 이외 영역)
 * @param {()=>void)} props.onPressRecommendArticle - 추천게시글 클릭
 */
const ArticleList = props => {
	const renderItem = (item, index) => {
		if (index % 5 == 2) {
			return <RecommendArticle onPressRecommendArticle={props.onPressRecommendArticle} />;
		} else return <Article onPressArticle={() => props.onPressArticle(index)} onPressThumnails={() => props.onPressArticle(index)} />;
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.id}
				ListEmptyComponent={props.whenEmpty}
				ItemSeparatorComponent={() => {
					return <View style={{width: 654 * DP, height: 2 * DP, backgroundColor: GRAY30}} />;
				}}
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
	onPressArticle: () => {},
	onPressRecommendArticle: () => {},
};

export default ArticleList;

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
