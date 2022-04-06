import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {ArticleIcon, NextMark, ReviewIcon} from 'Root/component/atom/icon';

//즐겨찾기한 커뮤니티 조회
export default FavoriteCommunity = ({route}) => {
	const navigation = useNavigation();

	return (
		<View style={[style.container]}>
			<View style={[style.inside]}>
				<TouchableOpacity onPress={() => navigation.push('FavoriteArticle')} style={[style.type]}>
					<View style={[style.title]}>
						<ArticleIcon />
						<Text style={[txt.noto30b]}>{'    '}자유 게시글</Text>
						<Text style={[txt.noto28]}> · 13개</Text>
					</View>
					<View style={[style.nextBtn]}>
						<NextMark />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.push('FavoriteReview')} style={[style.type]}>
					<View style={[style.title]}>
						<ReviewIcon />
						<Text style={[txt.noto30b]}>{'    '}리뷰</Text>
						<Text style={[txt.noto28]}> · 13개</Text>
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
