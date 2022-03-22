import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Article from '../article/Article';
import {GRAY30} from 'Root/config/color';
import DP from 'Root/config/dp';
import RecommendArticle from '../article/RecommendArticle';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {(index:number)=>void)} props.onPressArticle - 게시글 컨텐츠 클릭(사진 이외 영역)
 * @param {(index:number)=>void)} props.onPressRecommendArticle - 추천게시글 클릭
 * @param {(index:number)=>void)} props.onPressReply - 댓글 모두 보기 클릭
 * @param {(index:number)=>void)} props.onPressThumnails - 사진 썸네일 클릭
 */
const ArticleList = props => {
	const renderItem = (item, index) => {
		if (index % 5 == 2) {
			//추천게시글 출력 로직 추후 개선 예정
			return <RecommendArticle onPressRecommendArticle={props.onPressRecommendArticle} />;
		} else
			return (
				<Article
					onPressArticle={() => props.onPressArticle(index)} //게시글 컨텐츠 클릭
					onPressReply={() => props.onPressReply(index)} //댓글 모두 보기 클릭
					onPressThumnails={() => props.onPressThumnails(index)} //사진 썸네일 클릭
				/>
			);
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
	onPressThumnails: () => {},
	onPressReply: () => {},
};

export default ArticleList;

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
