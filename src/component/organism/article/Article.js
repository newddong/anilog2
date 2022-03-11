import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import ArticleContent from './ArticleContent';
import ArticleThumnails from './ArticleThumnails';
import {Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
/**
 * 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 게시글 아이템 data
 * @param {()=>void)} props.onPressArticle - 게시글 아이템 클릭
 * @param {()=>void)} props.onPressThumnails - 게시글 사진 클릭
 */
const Article = props => {
	//댓글 더 보기 클릭
	const onPressReply = () => {
		alert('onPressReply ');
	};

	//좋아요 클릭
	const onPressLike = () => {
		console.log('onPressLike');
	};

	const onPressFavorite = () => {
		console.log('onPressFavorite');
	};

	const onPressMeatball = () => {
		console.log('onPressMeatball');
	};

	const onPressArticle = () => {
		props.onPressArticle();
	};

	const onPressThumnails = () => {
		props.onPressThumnails();
	};

	const dummy = [
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
		'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	];

	return (
		<View style={[style.container]}>
			<View style={[style.content]}>
				<ArticleContent onPressArticle={onPressArticle} onPressFavorite={onPressFavorite} onPressMeatball={onPressMeatball} route={props.route} />
			</View>
			<TouchableOpacity onPress={onPressThumnails} activeOpacity={0.7} style={[style.thumbnail]}>
				<ArticleThumnails photo_list={dummy} />
			</TouchableOpacity>
			{props.route == 'ArticleDetail' ? (
				<></>
			) : (
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
			)}
		</View>
	);
};

Article.defaultProps = {
	onPressArticle: () => {},
	onPressThumnails: () => {},
	route: undefined,
};

export default Article;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 30 * DP,
		alignSelf: 'center',
	},
	content: {
		marginBottom: 5 * DP,
	},
	thumbnail: {},
	likeComment: {
		marginTop: 20 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 654 * DP,
		height: 48 * DP,
	},
	like: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	comment: {
		// backgroundColor: 'yellow',
	},
});
