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
 * @param {()=>void} props.onEndReached - 스크롤 최하단 콜백
 * @param {string} props.isSearch - 리뷰 컨텐츠 클릭
 */
export default ReviewList = props => {
	const items = props.items;
	const [data, setData] = React.useState('false');

	React.useEffect(() => {
		if (items && items.length != 0) {
			setData(
				items
					.map((v, i, a) => {
						let height = 128 * (1 / DP);
						let arr = [];
						const review_category_list = arr.concat(
							v.community_interests.interests_review,
							v.community_interests.interests_trip,
							v.community_interests.interests_etc,
							v.community_interests.interests_hospital,
							v.community_interests.interests_interior,
						);
						//사진이 없으며 카테고리 선택도 없는 경우
						if (!v.community_is_attached_file && review_category_list && review_category_list.length == 0) {
							height = 266;
							//사진은 있지만 카테고리 선택이 없는 경우
						} else if (v.community_is_attached_file && review_category_list && review_category_list.length == 0) {
							height = 620;
							//사진과 카테고리 선택 모두 있는 경우
						} else if (v.community_is_attached_file && review_category_list && review_category_list.length != 0) {
							height = 673;
						} else if (!v.community_is_attached_file && review_category_list && review_category_list.length != 0) {
							//사진은 없지만 카테고리가 있는 경우
							height = 320;
						}
						return {...v, height: height * DP}; // ItemSeparator Componenet Height 2 추가
					})
					.map((v, i, a) => {
						let offset = a.slice(0, i).reduce((prev, current) => {
							return current.height + prev;
						}, 0);
						return {
							...v,
							offset: offset,
						};
					}),
			);
		} else {
			setData([]);
		}
	}, [items]);

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

	const recommend = () => {
		if (props.recommend && props.recommend.length != 0) {
			return <RecommendReview data={props.recommend} onPressRecommendReview={data => props.onPressRecommendReview(data)} />;
		} else return <></>;
	};

	if (data == 'false') {
		return <></>;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={data}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					scr
					keyExtractor={item => item._id}
					getItemLayout={(data, index) => {
						if (!data[index]) return {length: 0, offset: 0, index: index};
						return {length: data[index].height, offset: data[index].offset, index: index};
					}}
					ListEmptyComponent={props.whenEmpty}
					ItemSeparatorComponent={() => {
						return <View style={{width: 694 * DP, height: 2 * DP, backgroundColor: GRAY30, alignSelf: 'center'}} />;
					}}
					ListHeaderComponent={recommend}
					listKey={({item, index}) => index}
					nestedScrollEnabled
					windowSize={5}
					onEndReached={() => {
						props.onEndReached();
					}}
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
	onEndReached: () => {},
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
