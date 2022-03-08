import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20} from 'Root/config/color';
import {Arrow_Down_GRAY10, FavoriteTag46_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 */
export default ArticleContent = props => {
	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b]}>우리 강아지 매기</Text>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled />
					<Meatball50_GRAY20_Horizontal />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel />
			</View>
			<View
				style={[
					style.hashText,
					{
						height: 86 * DP,
					},
				]}>
				<Text>우리 #둥이 는 언제나 #창가 에 앉아있기를 좋아하는거같다. 다른 강아지들은 높은곳을 무서워한다는데ㅋㅋㅋ 정말 신...</Text>
			</View>
			<View style={[style.footer]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
				<Arrow_Down_GRAY10 />
			</View>
		</View>
	);
};

ArticleContent.defaultProps = {};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 50 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		marginTop: 12 * DP,
	},
	hashText: {
		marginTop: 10 * DP,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});
