import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BLACK, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import Review from '../article/Review';
import RecommendReview from '../article/RecommendReview';

/**
 * 후기 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {object} props.recommend - 추천 리뷰글
 * @param {(index:number)=>void} props.onPressReply - 댓글 모두 보기 클릭
 * @param {(index:number)=>void} props.onPressReviewContent - 리뷰 컨텐츠 클릭
 * @param {(index:number)=>void} props.onPressLike - 좋아요 클릭
 * @param {(index:number)=>void} props.onPressUnlike - 좋아요 취소
 * @param {(data:object)=>void} props.onPressRecommendReview - 추천 게시글 클릭
 * @param {(bool:boolean)=>void} props.onPressFavorite - 즐겨찾기 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {string} props.isSearch - 리뷰 컨텐츠 클릭
 */
export default ReviewList = props => {
	const renderItem = ({item, index}) => {
		return (
			<Review
				data={item}
				isSearch={props.isSearch}
				onPressReviewContent={() => props.onPressReviewContent(index)}
				onPressReply={() => props.onPressReply(index)}
				onPressMeatball={() => props.onPressMeatball(index)}
				onPressLike={() => props.onPressLike(index)}
				onPressUnlike={() => props.onPressUnlike(index)}
				onPressFavorite={bool => props.onPressFavorite(index, bool)}
			/>
		);
	};

	return (
		<View style={[style.container]}>
			{props.recommend?.length > 0 ? (
				<RecommendReview data={props.recommend} onPressRecommendReview={data => props.onPressRecommendReview(data)} />
			) : (
				<></>
			)}
			<FlatList
				data={props.items}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item._id}
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

ReviewList.defaultProps = {
	whenEmpty: () => {
		return <></>;
	},
	onPressReply: () => {},
	onPressReviewContent: () => {},
	onPressLike: () => {},
	onPressUnlike: () => {},
	onPressFavorite: () => {},
	onPressRecommendArticle: () => {},
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
