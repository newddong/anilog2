import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Article from '../article/Article';
import {GRAY30, GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import RecommendArticle from '../article/RecommendArticle';
import ArticleSummary from '../article/ArticleSummary';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {(data:object)=>void)} props.onPressArticle - 게시글 컨텐츠 클릭(사진 이외 영역)
 * @param {string} props.isSearch - 검색어
 */
const ArticleList = props => {
	const renderItem = (item, index) => {
		return <ArticleSummary data={item} isSearch={props.isSearch} onPressArticle={() => props.onPressArticle(index)} />;
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item._id}
				ListEmptyComponent={props.whenEmpty}
				// ItemSeparatorComponent={() => {
				// 	return <View style={{width: 654 * DP, height: 2 * DP, backgroundColor: GRAY30}} />;
				// }}
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
	onPressThumnails: () => {},
	onPressReply: () => {},
	isSearch: '',
};

export default ArticleList;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		// backgroundColor: 'red',
	},
});
