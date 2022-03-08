import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import ArticleContent from './ArticleContent';
import ArticleThumnails from './ArticleThumnails';
import {Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
/**
 * 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 게시글 아이템 data
 */
export default Article = props => {
	return (
		<View style={[style.container]}>
			<View style={[style.content]}>
				<ArticleContent />
			</View>
			<View style={[style.thumbnail]}>
				<ArticleThumnails />
			</View>
			<View style={[style.likeComment]}>
				<View style={[style.like]}>
					<Like48_Border />
					<Text style={[txt.noto24, {color: GRAY10, marginLeft: 15 * DP}]}>109</Text>
				</View>
				<View style={[style.comment]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>댓글 6개 모두 보기</Text>
				</View>
			</View>
		</View>
	);
};

Article.defaultProps = {
	value: '',
	disable: false,
	onCheck: e => console.log(e),
};

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
