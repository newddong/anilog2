import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import ArticleThumnails from './ArticleThumnails';
import {useNavigation} from '@react-navigation/core';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
/**
 * 후기 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 * @param {()=>void} props.onPressReply - 댓글 모두 보기 클릭
 * @param {()=>void} props.onPressReviewContent - 리뷰 컨텐츠 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressLike - 좋아요 클릭
 * @param {()=>void} props.onPressUnlike - 좋아요 취소
 * @param {(bool:boolean)=>void} props.onPressFavorite - 즐겨찾기 클릭
 * @param {string} props.isSearch - 리뷰 컨텐츠 클릭
 */
export default Review = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const [moreCategory, setMoreCategory] = React.useState(false);

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const onPressCategory = category => {
		if (category == '접기') {
			setMoreCategory(false);
		} else {
			// alert(category);
		}
	};

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
								<TouchableOpacity
									onPress={() => (isLast ? setMoreCategory(true) : onPressCategory(v))}
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
								</TouchableOpacity>
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
								<TouchableOpacity
									onPress={() => onPressCategory(v)}
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
								</TouchableOpacity>
							);
						})}
					</View>
				);
			});
	};

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressLike = () => {
		props.onPressLike();
	};

	const onPressUnlike = () => {
		props.onPressUnlike();
	};

	const onPressFavorite = bool => {
		// alert('onPressFavorite');
		bool ? setData({...data, community_is_favorite: bool}) : setData({...data, community_is_favorite: bool});
		props.onPressFavorite(bool);
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

	const searchHighlight = data.community_title.split(new RegExp(`(${props.isSearch})`, 'gi'));

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={{flexDirection: 'row'}}>
				<View style={[style.header, {}]}>
					{getCategory()}
					<TouchableOpacity activeOpacity={0.6} onPress={onPressReviewContent}>
						<View style={[style.content]}>
							<Text style={[txt.noto32b]} numberOfLines={1}>
								{props.isSearch == '' || props.isSearch.length < 2
									? data.community_title
									: searchHighlight.map((part, i) =>
											part.toLowerCase() === props.isSearch.toLowerCase() ? (
												// <View style={{backgroundColor: 'red'}}>{part}</View>
												<Text key={i} style={{color: APRI10, fontWeight: 'bold', marginRight: 10 * DP}}>
													{part + ''}
												</Text>
											) : (
												<Text key={i} style={{color: BLACK, marginRight: 10 * DP}}>
													{part + ''}
												</Text>
											),
									  )}
							</Text>
							<View style={[style.profile]}>
								<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} />
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View style={[style.icon]}>
					{data.community_is_favorite ? (
						<FavoriteTag46_Filled onPress={() => onPressFavorite(false)} />
					) : (
						<FavoriteTag48_Border onPress={() => onPressFavorite(true)} />
					)}
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			{/* 리뷰 사진 썸네일 */}
			{imageList().length == 0 ? (
				<></>
			) : (
				<View style={[style.thumbnail, {}]}>
					<ArticleThumnails onPressReviewContent={onPressReviewContent} photo_list={imageList()} />
				</View>
			)}
			{/* 좋아요 및 댓글 모두 보기  */}
			<View style={[style.likeComment]}>
				<View style={[style.like]}>
					{data.community_is_like ? <Like48_Filled onPress={onPressUnlike} /> : <Like48_Border onPress={onPressLike} />}
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
	onPressMeatball: () => {},
	onPressLike: () => {},
	onPressFavorite: () => {},
	isSearch: '',
};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 24 * DP,
		alignSelf: 'center',
	},
	header: {
		width: 550 * DP,
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
		// marginTop: 20 * DP,
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
