import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
/**
 * 추천 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트
 */
export default RecommendArticle = props => {
	const article = () => {
		return (
			<View style={[style.item]}>
				<View style={[style.userLabel]}>
					<Image
						style={[style.imgBox]}
						source={{
							uri: 'https://img.huffingtonpost.com/asset/618cc2d026000093123cdf98.jpg?cache=xQWtHHJF1a&ops=scalefit_720_noupscale&format=webp',
						}}
					/>
					<Text style={[txt.noto24, {marginLeft: 24 * DP}]}>sssjm012</Text>
				</View>
				<View style={[style.article_content]}>
					<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={2}>
						입양하고 일주일 됐는데, 방금 첫 예방접종 하고 왔어 일주일 됐는데, 방금 첫 예방접종 하고 왔어 일주일 됐는데, 방금 첫 예방접종 하고 왔어
					</Text>
					<Text style={[txt.noto24, {color: GRAY20, marginTop: 16 * DP}]}>1분 전</Text>
				</View>
			</View>
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

RecommendArticle.defaultProps = {};

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
		backgroundColor: BLACK,
	},
});
