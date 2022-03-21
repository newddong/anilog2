import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import ProfileImageSmall from 'Root/component/molecules/image/ProfileImageSmall';
import {dummy_userObject} from 'Root/config/dummyDate_json';
/**
 * 추천 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트
 * @param {()=>void)} props.onPressRecommendArticle - 추천 게시글 클릭
 */
const RecommendArticle = props => {
	const onPressRecommendArticle = () => {
		props.onPressRecommendArticle();
	};

	const article = () => {
		return (
			<TouchableOpacity onPress={onPressRecommendArticle} activeOpacity={0.7} style={[style.item]}>
				<View style={[style.userLabel]}>
					<ProfileImageSmall data={dummy_userObject[0]} size={46} />
					<Text style={[txt.noto24, {marginLeft: 24 * DP}]}>{dummy_userObject[0].user_nickname}</Text>
				</View>
				<View style={[style.article_content]}>
					<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={2}>
						입양하고 일주일 됐는데, 방금 첫 예방접종 하고 왔어 일주일 됐는데, 방금 첫 예방접종 하고 왔어 일주일 됐는데, 방금 첫 예방접종 하고 왔어
					</Text>
					<Text style={[txt.noto24, {color: GRAY20, marginTop: 16 * DP}]}>1분 전</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<Text style={[txt.noto36b]}>추천 게시글 </Text>
			</View>
			<View style={[style.content, style.shadow]}>
				{article()}
				<View style={[style.separatorLine]} />
				{article()}
			</View>
		</View>
	);
};

RecommendArticle.defaultProps = {
	onPressRecommendArticle: () => {},
};

export default RecommendArticle;
const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		padding: 48 * DP,
		paddingVertical: 40 * DP,
		// alignSelf: 'center',
	},
	header: {
		marginBottom: 24 * DP,
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.4,
		shadowRadius: 4,
		shadowOffset: {
			height: 2,
			width: 2 * DP,
		},
		elevation: 3,
	},
	content: {
		width: 654 * DP,
		// height: 606 * DP,
		borderRadius: 46 * DP,
		backgroundColor: WHITE,
		paddingVertical: 50 * DP,
		paddingHorizontal: 32 * DP,
	},
	item: {
		// backgroundColor: 'green',
	},
	imgBox: {
		width: 56 * DP,
		height: 56 * DP,
		borderRadius: 50,
	},
	userLabel: {
		flexDirection: 'row',
		// justifyContent:'center',
		alignItems: 'center',
	},
	article_content: {
		width: 518 * DP,
		marginTop: 8 * DP,
		alignSelf: 'flex-end',
	},
	separatorLine: {
		width: 590 * DP,
		height: 2 * DP,
		marginVertical: 35 * DP,
		backgroundColor: GRAY20,
	},
});
