import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {ArticleIcon, NextMark, ReviewIcon} from 'Root/component/atom/icon';
import {getCommunityListByUserId} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {getFavoriteEtcListByUserId} from 'Root/api/favoriteetc';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {APRI10, GRAY10, GRAY40} from 'Root/config/color';
import FavoriteArticle from './FavoriteArticle';
import FavoriteReview from './FavoriteReview';

const CommunityTopTabNav = createMaterialTopTabNavigator();

//즐겨찾기한 커뮤니티 조회
export default FavoriteCommunity = ({route}) => {
	const navigation = useNavigation();
	const isFavorite = route.name == 'FavoriteCommunity';
	const [review, setReview] = React.useState('false');
	const [article, setArticle] = React.useState('false');
	// console.log('route.name', route.name);

	React.useEffect(() => {
		isFavorite ? navigation.setOptions({title: '커뮤니티 즐겨찾기'}) : navigation.setOptions({title: '나의 커뮤니티'});
		const unsubscribe = navigation.addListener('focus', () => {
			!isFavorite
				? getCommunityListByUserId(
						{
							limit: 1000,
							page: 1,
							userobject_id: userGlobalObject.userInfo._id,
							community_type: 'all',
						},
						result => {
							// console.log('result / getCommunityListByUserId / free', result.msg.free.length);
							// console.log('result / getCommunityListByUserId / review', result.msg.review.length);
							const free = result.msg.free.filter(
								e => e.community_writer_id != null && e.community_writer_id.user_nickname == userGlobalObject.userInfo.user_nickname,
							);
							const review = result.msg.review.filter(
								e => e.community_writer_id != null && e.community_writer_id.user_nickname == userGlobalObject.userInfo.user_nickname,
							);
							console.log('free', free.length);
							console.log('review', review.length);
							setReview(review);
							setArticle(free);
						},
						err => {
							console.log('err / getCommunityListByUserId / FavoriteCommunity : ', err);
							if (err.includes('code 500')) {
								setReview([]);
								setArticle([]);
								setTimeout(() => {
									Modal.alert(NETWORK_ERROR);
								}, 500);
							} else if (err.includes('없습니다')) {
								setReview([]);
								setArticle([]);
							}
						},
				  )
				: getFavoriteEtcListByUserId(
						{
							userobject_id: userGlobalObject.userInfo._id,
							collectionName: 'communityobjects',
						},
						result => {
							console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg.length);
							let reviewCont = [];
							let articleCont = [];
							result.msg.map((v, i) => {
								v.favorite_etc_target_object_id.community_is_favorite = true;
								if (v.favorite_etc_target_object_id.community_type == 'review') {
									reviewCont.push(v.favorite_etc_target_object_id);
								} else articleCont.push(v.favorite_etc_target_object_id);
							});
							setReview(reviewCont);
							setArticle(articleCont);
						},
						err => {
							console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
							if (err.includes('code 500')) {
								setReview([]);
								setArticle([]);
								setTimeout(() => {
									Modal.alert(NETWORK_ERROR);
								}, 500);
							} else if (err.includes('없습니다')) {
								setReview([]);
								setArticle([]);
							}
						},
				  );
		});
		return unsubscribe;
	}, []);

	const onPressArticle = () => {
		isFavorite ? navigation.push('FavoriteArticle', article) : navigation.push('MyArticle', article);
	};
	const onPressReview = () => {
		isFavorite ? navigation.push('FavoriteReview', review) : navigation.push('MyReview', review);
	};

	return (
		// <View style={[style.container]}>
		// 	<View style={[style.inside]}>
		// 		<TouchableOpacity onPress={onPressArticle} style={[style.type]}>
		// 			<View style={[style.title]}>
		// 				<ArticleIcon />
		// 				<Text style={[txt.noto30b]}>{'    '}자유 게시글</Text>
		// 				<Text style={[txt.noto28]}> · {article.length}개</Text>
		// 			</View>
		// 			<View style={[style.nextBtn]}>
		// 				<NextMark />
		// 			</View>
		// 		</TouchableOpacity>
		// 		<TouchableOpacity onPress={onPressReview} style={[style.type]}>
		// 			<View style={[style.title]}>
		// 				<ReviewIcon />
		// 				<Text style={[txt.noto30b]}>{'    '}리뷰</Text>
		// 				<Text style={[txt.noto28]}> · {review.length}개</Text>
		// 			</View>
		// 			<View style={[style.nextBtn]}>
		// 				<NextMark />
		// 			</View>
		// 		</TouchableOpacity>
		// 	</View>
		// </View>
		<CommunityTopTabNav.Navigator
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: 'black', height: 6 * DP},
				tabBarLabelStyle: [style.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				lazy: true,
				tabBarStyle: {
					borderBottomWidth: 2 * DP,
					// borderTopWidth: 2 * DP,
					borderBottomColor: GRAY40,
					elevation: 0,
				},
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			<CommunityTopTabNav.Screen
				name={'ArticleMain'}
				options={{
					tabBarLabel: '자유 게시판',
				}}>
				{props => <FavoriteArticle {...props} isFavorite={isFavorite} article={article} />}
			</CommunityTopTabNav.Screen>
			<CommunityTopTabNav.Screen
				name={'ReviewMain'}
				options={{
					tabBarLabel: '리뷰',
				}}>
				{props => <FavoriteReview {...props} isFavorite={isFavorite} review={review} />}
			</CommunityTopTabNav.Screen>
		</CommunityTopTabNav.Navigator>
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
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
