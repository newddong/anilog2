import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {ArticleIcon, NextMark, ReviewIcon} from 'Root/component/atom/icon';
import {getCommunityListByUserId} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {getFavoriteEtcListByUserId} from 'Root/api/favoriteect';

//즐겨찾기한 커뮤니티 조회
export default FavoriteCommunity = ({route}) => {
	const navigation = useNavigation();
	const isFavorite = route.name == 'FavoriteCommunity';
	const [review, setReview] = React.useState('false');
	const [article, setArticle] = React.useState('false');

	React.useEffect(() => {
		!isFavorite
			? getCommunityListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
						community_type: 'all',
					},
					result => {
						console.log('result / getCommunityListByUserId / FavoriteCommunity', result.msg.free.length);
						console.log('result / getCommunityListByUserId / FavoriteCommunity', result.msg.review.length);
						setReview(result.msg.review);
						setArticle(result.msg.free);
					},
					err => {
						console.log('err / getCommunityListByUserId / FavoriteCommunity : ', err);
						setReview([]);
						setArticle([]);
					},
			  )
			: getFavoriteEtcListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
						collectionName: 'communityobjects',
					},
					result => {
						// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg);
						let reviewCont = [];
						let articleCont = [];
						result.msg.map((v, i) => {
							v.favorite_etc_post_id.community_is_favorite = true;
							if (v.favorite_etc_post_id.community_type == 'review') {
								reviewCont.push(v.favorite_etc_post_id);
							} else articleCont.push(v.favorite_etc_post_id);
						});
						setReview(reviewCont);
						setArticle(articleCont);
					},
					err => {
						console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
					},
			  );
	}, []);

	const onPressArticle = () => {
		isFavorite ? navigation.push('FavoriteArticle', article) : navigation.push('MyArticle', article);
	};
	const onPressReview = () => {
		isFavorite ? navigation.push('FavoriteReview', review) : navigation.push('MyReview', review);
	};

	if (review == 'false' && article == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<View style={[style.inside]}>
					<TouchableOpacity onPress={onPressArticle} style={[style.type]}>
						<View style={[style.title]}>
							<ArticleIcon />
							<Text style={[txt.noto30b]}>{'    '}자유 게시글</Text>
							<Text style={[txt.noto28]}> · {article.length}개</Text>
						</View>
						<View style={[style.nextBtn]}>
							<NextMark />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressReview} style={[style.type]}>
						<View style={[style.title]}>
							<ReviewIcon />
							<Text style={[txt.noto30b]}>{'    '}리뷰</Text>
							<Text style={[txt.noto28]}> · {review.length}개</Text>
						</View>
						<View style={[style.nextBtn]}>
							<NextMark />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		// backgroundColor: '#fff',
		flex: 1,
	},
	inside: {
		width: 750 * DP,
		marginTop: 10 * DP,
		// height: 394 * DP,
	},
	type: {
		width: 750 * DP,
		height: 132 * DP,
		paddingHorizontal: 48 * DP,
		paddingVertical: 30 * DP,
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 5 * DP,
		backgroundColor: 'white',
	},
	title: {
		width: 630 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	nextBtn: {
		width: 40 * DP,
		height: 55 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
