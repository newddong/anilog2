import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, Like48_Border, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import ArticleThumnails from './ArticleThumnails';
import {useNavigation} from '@react-navigation/core';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
/**
 * 후기 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 * @param {()=>void} props.onPressReply - 댓글 모두 보기 클릭
 * @param {()=>void} props.onPressReviewContent - 리뷰 컨텐츠 클릭
 */
export default Review = props => {
	const navigation = useNavigation();
	const data = props.data;
	const [moreCategory, setMoreCategory] = React.useState(false);

	const getCategory = (v, i) => {
		let category_sum_list = [];
		data.community_interests.interests_trip.map(v => category_sum_list.push(v));
		data.community_interests.interests_etc.map(v => category_sum_list.push(v));
		data.community_interests.interests_hospital.map(v => category_sum_list.push(v));
		data.community_interests.interests_review.map(v => category_sum_list.push(v));
		data.community_interests.interests_interior.map(v => category_sum_list.push(v));
		if (category_sum_list.length > 3) {
			category_sum_list.push('접기');
		}
		// category_sum_list.push('테스트');
		const page = Math.floor(category_sum_list.length / 4) + 1;
		let arr = [];
		arr.length = page;
		arr.fill('a', 0, page);

		if (category_sum_list.length > 3 && !moreCategory) {
			arr = ['a'];
			return arr.map((value, index) => {
				let sliced = category_sum_list.slice(0, 3);
				sliced.push('+' + (category_sum_list.length - 4));
				return (
					<View key={index} style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							const isLast = v == '+' + (category_sum_list.length - 4);
							return (
								<View
									key={i}
									activeOpacity={0.7}
									style={[
										style.category,
										{
											backgroundColor: WHITE,
											borderColor: isLast ? GRAY10 : BLACK,
										},
									]}>
									<Text
										style={[
											txt.noto24,
											{
												color: isLast ? GRAY10 : BLACK,
											},
										]}>
										{v}
									</Text>
								</View>
							);
						})}
					</View>
				);
			});
		} else
			return arr.map((value, index) => {
				let sliced = category_sum_list.slice(index * 4, (index + 1) * 4);
				return (
					<View key={index} style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							const isLast = v == '접기';
							return (
								<View
									key={i}
									activeOpacity={0.7}
									style={[
										style.category,
										{
											backgroundColor: isLast ? GRAY20 : WHITE,
											borderColor: isLast ? GRAY40 : BLACK,
										},
									]}>
									<Text
										style={[
											txt.noto24,
											{
												color: isLast ? WHITE : BLACK,
											},
										]}>
										{v}
									</Text>
								</View>
							);
						})}
					</View>
				);
			});
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

	const onPressReviewContent = () => {
		props.onPressReviewContent();
	};

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
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={{flexDirection: 'row'}}>
				<View style={[style.header]}>
					{getCategory()}
					<TouchableOpacity activeOpacity={0.6} onPress={onPressReviewContent}>
						<View style={[style.content]}>
							<Text style={[txt.noto32b]} numberOfLines={1}>
								{data.community_title}
							</Text>
							<View style={[style.profile]}>
								<UserLocationTimeLabel data={data.community_writer_id} time={data.community_update_date} />
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View style={[style.icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			{/* 리뷰 컨텐츠 */}
			<TouchableOpacity>
				{/* 리뷰 사진 썸네일 */}
				<View style={[style.thumbnail]}>
					<ArticleThumnails onPressReviewContent={onPressReviewContent} photo_list={imageList()} />
				</View>
			</TouchableOpacity>
			{/* 좋아요 및 댓글 모두 보기  */}
			<View style={[style.likeComment]}>
				<View style={[style.like]}>
					<Like48_Border onPress={onPressLike} />
					<Text style={[txt.noto24, {color: GRAY10, marginLeft: 15 * DP}]}>{data.community_like_count}</Text>
				</View>
				<View style={[style.comment]}>
					<Text onPress={onPressReply} style={[txt.noto24, {color: GRAY10}]}>
						{data.community_comment_count == 0 ? '댓글 쓰기' : `댓글 ${data.community_comment_count}개 모두 보기 `}
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
	},
	header: {
		width: 550 * DP,
		header: 50 * DP,
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 15 * DP,
		paddingVertical: 2 * DP,
		// backgroundColor: 'yellow',
	},
	categoryList: {
		width: 510 * DP,
		minHeight: 65 * DP,
	},
	profile: {
		marginTop: 10 * DP,
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
	},
	content: {
		// top: -8 * DP,
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
