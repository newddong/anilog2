import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import ArticleThumnails from './ArticleThumnails';
import {useNavigation} from '@react-navigation/core';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {getTimeLapsed} from 'Root/util/dateutil';
import {TouchableOpacity} from 'react-native-gesture-handler';
import community_obj from 'Root/config/community_obj';
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
export default Review = React.memo(props => {
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
		arr.fill([], 0, page);
		let newArr = [];
		let totalWidth = 0;
		let index = 0;
		category_sum_list.map((val, ind) => {
			totalWidth = totalWidth + 20 + val.length * 10;
			if (totalWidth < 280) {
				// console.log('totalWidth', totalWidth);
				newArr.push({group: index, item: val});
			} else {
				newArr.push({group: index + 1, item: val});
				totalWidth = 0;
				++index;
			}
		});
		let categoryArr = [];
		categoryArr.length = index + 1;
		categoryArr.fill([]);
		categoryArr.map((val, ind) => {
			categoryArr[ind] = newArr.filter(e => e.group === ind);
		});
		if (category_sum_list.length > 3 && !moreCategory && categoryArr.length > 0) {
			return (
				<View style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
					{categoryArr[0].map((v, i) => {
						// const isLast = v.item == '+' + (category_sum_list.length - 4);
						let isLast = false;
						if (i == categoryArr[0].length - 1) {
							isLast = true;
							v.item = '+' + (category_sum_list.length - categoryArr[0].length);
						}
						if (v.item == '+' + 0) {
							return <View key={i}></View>;
						}
						return (
							<TouchableOpacity
								onPress={() => (isLast ? setMoreCategory(true) : onPressCategory(v.item))}
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
									{v.item}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			);
		} else {
			return categoryArr.map((val, ind) => {
				return (
					<View key={ind} style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{val.map((v, i) => {
							const isLast = v.item == '접기';
							return (
								<TouchableOpacity
									onPress={() => (isLast ? setMoreCategory(!true) : onPressCategory(v.item))}
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
										{v.item}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				);
			});
		}
	};

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressLike = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setData({...data, community_is_like: true, community_like_count: ++data.community_like_count});
			props.onPressLike();
		}
	};

	const onPressUnlike = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			props.onPressUnlike();
			setData({...data, community_is_like: false, community_like_count: --data.community_like_count});
		}
	};

	const onPressFavorite = bool => {
		// alert('onPressFavorite');
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			bool ? setData({...data, community_is_favorite: bool}) : setData({...data, community_is_favorite: bool});
			props.onPressFavorite(bool);
		}
	};

	const onPressReply = () => {
		if (data.community_comment_count == 0) {
			if (userGlobalObject.userInfo.isPreviewMode) {
				Modal.popLoginRequestModal(() => {
					navigation.navigate('Login');
				});
			} else {
				props.onPressReply();
			}
		} else {
			props.onPressReply();
		}
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

	const onLayout = e => {
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		const d = e.nativeEvent.layout.height * (1 / DP);
		console.log(' : height', e.nativeEvent.layout.height);
		console.log('data.height', data.height);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	};

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
							<View activeOpacity={0.8} style={[style.profile, {}]}>
								<Text
									style={[
										txt.roboto24,
										{
											flex: 1,
											alignSelf: 'flex-start',
											color: data.community_writer_id && data.community_writer_id._id == userGlobalObject.userInfo._id ? APRI10 : BLACK,
										},
									]}>
									{data.community_writer_id?.user_nickname}{' '}
								</Text>
								<Text style={[txt.noto24, {color: GRAY10}]}>{getTimeLapsed(data.community_date)}</Text>
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
					{data.community_writer_id ? <Meatball50_GRAY20_Horizontal onPress={onPressMeatball} /> : <></>}
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
});

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
		// backgroundColor: 'red',
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
		marginTop: 10 * DP,
		// justifyContent: 'space-between',
	},
	content: {
		// top: -8 * DP,
		// backgroundColor: 'palegreen',
	},
	thumbnail: {
		// marginTop: 8 * DP,
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
