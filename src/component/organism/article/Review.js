import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, Like48_Border, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
import ArticleThumnails from './ArticleThumnails';
import {useNavigation} from '@react-navigation/core';
/**
 * 후기 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 * @param {()=>void} props.onPressReply - 댓글 모두 보기 클릭
 * @param {()=>void} props.onPressReviewContent - 리뷰 컨텐츠 클릭
 */
export default Review = props => {
	const navigation = useNavigation();
	const onPressCategory = category => {
		alert(category);
	};

	const category = v => {
		return (
			<TouchableOpacity onPress={() => onPressCategory(v)} activeOpacity={0.7} style={[style.category]}>
				<Text style={[txt.noto24]}>{v}</Text>
			</TouchableOpacity>
		);
	};

	const onPressMeatball = () => {
		alert('onPressMeatball');
	};

	const onPressLike = () => {
		alert('onPressLike');
	};

	const onPressFavorite = () => {
		alert('onPressFavorite');
	};

	const onPressReply = () => {
		props.onPressReply();
	};

	const category_dummy = ['애견카페', '애견호텔', '애견놀이터'];

	const moveToReviewDetail = () => {
		props.onPressReviewContent();
	};

	const dummy = [
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	];

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header]}>
				<View style={[style.categoryList]}>
					{category_dummy.map((v, i) => {
						return <View key={i}>{category(v)}</View>;
					})}
				</View>
				<View style={[style.icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			{/* 리뷰 컨텐츠 */}
			<TouchableOpacity onPress={moveToReviewDetail}>
				<View style={[style.content]}>
					<Text style={[txt.noto32b]} numberOfLines={1}>
						성동구 애견카페 '멍멍존' 후기
					</Text>
					<Text style={[txt.roboto28]} numberOfLines={1}>
						user_nickname
					</Text>
					<Text style={[txt.noto26, {color: GRAY10}]} numberOfLines={1}>
						2022.01.02
					</Text>
				</View>
				{/* 리뷰 사진 썸네일 */}
				<View style={[style.thumbnail]}>
					<ArticleThumnails photo_list={dummy} />
				</View>
			</TouchableOpacity>
			{/* 좋아요 및 댓글 모두 보기  */}
			<View style={[style.likeComment]}>
				<View style={[style.like]}>
					<Like48_Border onPress={onPressLike} />
					<Text style={[txt.noto24, {color: GRAY10, marginLeft: 15 * DP}]}>109</Text>
				</View>
				<View style={[style.comment]}>
					<Text onPress={onPressReply} style={[txt.noto24, {color: GRAY10}]}>
						댓글 6개 모두 보기
					</Text>
				</View>
			</View>
		</View>
	);
};

Review.defaultProps = {
	onPressReply: () => {},
	onPressReviewContent: () => {},
};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 24 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	header: {
		width: 654 * DP,
		header: 50 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'pink',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		flexDirection: 'row',
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	content: {
		width: 654 * DP,
		height: 130 * DP,
		marginTop: 6 * DP,
		// backgroundColor: 'palegreen',
	},
	thumbnail: {
		marginTop: 8 * DP,
	},
	likeComment: {
		marginTop: 20 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 654 * DP,
		// height: 48 * DP,
	},
	like: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	comment: {
		// backgroundColor: 'yellow',
	},
});
