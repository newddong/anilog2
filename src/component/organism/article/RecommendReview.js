import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, WHITE} from 'Root/config/color';
import ProfileImageSmall from 'Root/component/molecules/image/ProfileImageSmall';
import {getTimeLapsed} from 'Root/util/dateutil';
/**
 * 추천 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트
 * @param {(data:object)=>void)} props.onPressRecommendReview - 추천 게시글 클릭
 */
const RecommendReview = props => {
	const onPressRecommendReview = data => {
		props.onPressRecommendReview(data);
	};
	const first = props.data[0];
	const second = props.data[1];

	const recommendReview = data => {
		const imageList = () => {
			let imageList = [];
			let getImgTag = data.community_content.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
			if (getImgTag) {
				getImgTag.map((v, i) => {
					let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
					imageList.push(src[1]);
				});
			}
			return imageList;
		};
		return (
			<TouchableOpacity onPress={() => onPressRecommendReview(data)} activeOpacity={0.7} style={[{}]}>
				<View style={{flexDirection: 'row'}}>
					<View>
						<View style={[style.userLabel]}>
							<ProfileImageSmall data={data.community_writer_id} size={46} />
							<Text style={[txt.noto24, {marginLeft: 24 * DP}]}>{data.community_writer_id.user_nickname}</Text>
						</View>
						<View style={[style.article_content, {}]}>
							<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={2}>
								{data.community_content_without_html}
							</Text>
							<Text style={[txt.noto24, {color: GRAY20, marginTop: 16 * DP}]}>{getTimeLapsed(data.community_date)}</Text>
						</View>
					</View>
					{imageList().length == 0 ? (
						<Image style={[{width: 158 * DP, height: 158 * DP, borderRadius: 30 * DP}]} source={require('Atom/icon/document2.png')} />
					) : (
						<Image style={[{width: 158 * DP, height: 158 * DP, borderRadius: 30 * DP}]} source={{uri: imageList()[0]}} />
					)}
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
				{recommendReview(first)}
				<View style={[style.separatorLine]} />
				{recommendReview(second)}
			</View>
		</View>
	);
};

RecommendReview.defaultProps = {
	onPressRecommendReview: () => {},
};

export default RecommendReview;
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
		width: 376 * DP,
		marginTop: 8 * DP,
		marginLeft: 48 * DP,
		alignSelf: 'flex-end',
	},
	separatorLine: {
		width: 590 * DP,
		height: 2 * DP,
		marginVertical: 35 * DP,
		backgroundColor: GRAY20,
	},
});
