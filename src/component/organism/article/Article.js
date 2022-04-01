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
 * @param {()=>void)} props.onPressReply - 댓글 모두 보기 클릭
 * @param {()=>void)} props.onPressMeatball - 미트볼 클릭
 */
const Article = props => {
	const data = props.data;
	//댓글 더 보기 클릭
	const onPressReply = () => {
		props.onPressReply();
	};

	//좋아요 클릭
	const onPressLike = () => {
		console.log('onPressLike');
	};

	//즐겨찾기 클릭
	const onPressFavorite = () => {
		console.log('onPressFavorite');
	};

	//미트볼 클릭
	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	//게시글 클릭
	const onPressArticle = () => {
		props.onPressArticle();
	};

	//사진 클릭
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
				<ArticleContent
					data={data}
					onPressArticle={onPressArticle}
					onPressFavorite={onPressFavorite}
					onPressMeatball={onPressMeatball}
					route={props.route}
				/>
			</View>

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
	onPressReply: () => {},
	onPressMeatball: () => {},
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
