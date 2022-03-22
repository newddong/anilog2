import React from 'react';
import {StyleSheet, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK} from 'Root/config/color';
import {WriteBoard} from 'Root/component/atom/icon';

export default ArticleMain = ({route, navigation}) => {
	const dummy = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}];

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// console.log('dummy', dummy[index]);
		navigation.push('ArticleDetail');
	};

	//추천 게시글 아이템 클릭
	const onPressRecommendArticle = () => {
		navigation.push('ArticleDetail');
	};

	// 댓글 모두보기 클릭
	const onPressReply = index => {
		navigation.push('ArticleCommentList', {feedobject: {_id: '62262a16d38ae5f3c51390d6'}});
	};

	//글쓰기
	const onPressWrite = () => {
		navigation.push('CommunityWrite', {isReview: false});
		// navigation.push('WriteEditorTest');
	};

	return (
		<View style={[style.container]}>
			<ArticleList
				items={dummy}
				onPressArticle={onPressArticle} //게시글 내용 클릭
				onPressThumnails={onPressArticle} //게시글 사진 썸네일 클릭 - 메인페이지에선 게시글 상세로 이동
				onPressReply={onPressReply} //댓글 모두보기 클릭
				onPressRecommendArticle={onPressRecommendArticle} //추천 게시글 아이템 클릭
			/>
			<View style={[style.write, style.shadow]}>
				<WriteBoard onPress={onPressWrite} />
			</View>
		</View>
	);
};
ArticleMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
	},
});
