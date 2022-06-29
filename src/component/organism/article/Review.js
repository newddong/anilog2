import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {Comment48, FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import {useNavigation} from '@react-navigation/core';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {getTimeLapsed} from 'Root/util/dateutil';
import ReviewThumbnail from './ReviewThumbnail';
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

	//상위 컴포넌트에서 갱신이 이뤄졌을 시 Review에서도 갱신
	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	//카테고리 접기 클릭
	const onPressCategory = category => {
		if (category == '접기') {
			setMoreCategory(false);
		}
	};

	//카테고리 출력
	const getCategory = (v, i) => {
		// console.log('data', data.community_interests);
		let category_sum_list = [];
		if (data.community_interests.hasOwnProperty('interests_group1')) {
			data.community_interests.interests_group1 && data.community_interests.interests_group1.map(v => category_sum_list.push(v));
			data.community_interests.interests_etc && data.community_interests.interests_etc.map(v => category_sum_list.push(v));
			data.community_interests.interests_group2 && data.community_interests.interests_group2.map(v => category_sum_list.push(v));
			data.community_interests.interests_group3 && data.community_interests.interests_group3.map(v => category_sum_list.push(v));
		} else {
			data.community_interests.interests_trip && data.community_interests.interests_trip.map(v => category_sum_list.push(v));
			data.community_interests.interests_etc && data.community_interests.interests_etc.map(v => category_sum_list.push(v));
			data.community_interests.interests_hospital && data.community_interests.interests_hospital.map(v => category_sum_list.push(v));
			data.community_interests.interests_review && data.community_interests.interests_review.map(v => category_sum_list.push(v));
			data.community_interests.interests_interior && data.community_interests.interests_interior.map(v => category_sum_list.push(v));
		}

		if (category_sum_list.length > 3) {
			category_sum_list.push('접기');
		}
		// category_sum_list.push('테스트');
		const page = Math.floor(category_sum_list.length / 2) + 1;
		let arr = [];
		arr.length = page;
		arr.fill([], 0, page);
		let newArr = [];
		let totalWidth = 0;
		let index = 0;
		category_sum_list.map((val, ind) => {
			const split = val.split('');
			split.map((syl, i) => {
				let add = 0;
				switch (syl) {
					case '/':
						add = 20;
						break;
					case ' ':
						add = 10;
						break;
					default:
						add = 20;
						break;
				}
				totalWidth = totalWidth + add * DP;
			});
			if (totalWidth > 600 * DP) {
				// console.log('totalWidth', totalWidth);
				newArr.push({group: index + 1, item: val});
				totalWidth = 0;
				++index;
			} else {
				// console.log('totalWidth', totalWidth, val);
				newArr.push({group: index, item: val});
			}
			totalWidth = totalWidth + 70 * DP;
		});
		let categoryArr = [];
		categoryArr.length = index + 1;
		categoryArr.fill([]);
		categoryArr.map((val, ind) => {
			categoryArr[ind] = newArr.filter(e => e.group === ind);
		});
		if (category_sum_list.length > 3 && !moreCategory && categoryArr.length > 0) {
			return (
				<View style={{flexDirection: 'row', width: 694 * DP}}>
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
								activeOpacity={1}
								style={[
									style.category,
									{backgroundColor: WHITE, borderColor: isLast ? GRAY10 : GRAY30, marginVertical: 5 * DP, width: isLast ? 100 * DP : null},
								]}>
								<Text style={[txt.noto24, {color: GRAY10, paddingHorizontal: 10 * DP, textAlign: 'center'}]}>{v.item}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			);
		} else {
			return categoryArr.map((val, ind) => {
				return (
					<View key={ind} style={{flexDirection: 'row', width: 694 * DP}}>
						{val.map((v, i) => {
							const isLast = v.item == '접기';
							return (
								<TouchableOpacity
									onPress={() => (isLast ? setMoreCategory(!true) : onPressCategory(v.item))}
									key={i}
									// onLayout={e => console.log('e', v.item, (e.nativeEvent.layout.width * 1) / DP)}
									activeOpacity={1}
									style={[style.category, {backgroundColor: isLast ? GRAY10 : WHITE, borderColor: isLast ? GRAY10 : GRAY30, marginVertical: 5 * DP}]}>
									<Text style={[txt.noto24, {color: isLast ? WHITE : GRAY10, paddingHorizontal: 10 * DP}]}>{v.item}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				);
			});
		}
	};

	//좋아요 클릭
	const onPressLike = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			setData({...data, community_is_like: bool, community_like_count: bool ? ++data.community_like_count : --data.community_like_count});
			bool ? props.onPressLike() : props.onPressUnlike();
		}
	};

	//즐겨찾기 클릭
	const onPressFavorite = bool => {
		// alert('onPressFavorite');
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			bool ? setData({...data, community_is_favorite: bool}) : setData({...data, community_is_favorite: bool});
			props.onPressFavorite(bool);
		}
	};

	//댓글 아이콘 클릭
	const onPressReply = () => {
		props.onPressReply();
	};

	//리뷰 아이템 클릭
	const onPressReviewContent = () => {
		props.onPressReviewContent();
	};

	//해당 리뷰글에 이미지uri 리스트 반환 함수
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

	const searchHighlight = data.community_title.split(new RegExp(`(${props.isSearch})`, 'gi')); //제목 안에 검색어와 일치하는 부분을 split 하는 정규식

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
				<View style={[style.header, {}]}>
					<TouchableOpacity activeOpacity={0.6} onPress={onPressReviewContent}>
						<View style={[style.content]}>
							<Text style={[txt.noto32]} numberOfLines={1}>
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
										style.user_nickname,
										txt.noto28,
										{color: data.community_writer_id && data.community_writer_id._id == userGlobalObject.userInfo._id ? APRI10 : GRAY10},
									]}>
									{data.community_writer_id ? data.community_writer_id?.user_nickname : ''}
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
				</View>
			</View>
			{/* 리뷰 사진 썸네일 */}
			{imageList().length == 0 ? (
				<></>
			) : (
				<View style={[style.thumbnail, {}]}>
					<ReviewThumbnail onPressReviewContent={onPressReviewContent} photo_list={imageList()} />
				</View>
			)}
			{/* 카테고리 */}
			{getCategory()}
			{/* 좋아요 및 댓글 모두 보기  */}
			<View style={[style.likeComment, {alignItems: 'center'}]}>
				<View style={[style.like]}>
					{data.community_is_like ? <Like48_Filled onPress={() => onPressLike(false)} /> : <Like48_Border onPress={() => onPressLike(true)} />}
					<Text style={[txt.noto24, {color: GRAY10, marginLeft: 6 * DP}]}>{data.community_like_count}</Text>
				</View>
				<TouchableOpacity onPress={onPressReply} activeOpacity={0.8} style={[style.like, {marginLeft: 20 * DP}]}>
					<Comment48 />
					<Text style={[txt.noto24, {color: GRAY10, marginLeft: 6 * DP}]}>{data.community_comment_count}</Text>
				</TouchableOpacity>
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
		width: 694 * DP,
		paddingVertical: 30 * DP,
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	header: {
		width: 640 * DP,
		// backgroundColor: 'red',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 10 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		minHeight: 65 * DP,
	},
	profile: {
		marginTop: 10 * DP,
		width: 694 * DP,
		// backgroundColor: 'red',
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		// marginTop: 10 * DP,
	},
	content: {},
	thumbnail: {
		// marginTop: 8 * DP,
	},
	likeComment: {
		width: 694 * DP,
		marginTop: 20 * DP,
		flexDirection: 'row',
	},
	like: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	comment: {
		// backgroundColor: 'yellow',
	},
	user_nickname: {
		height: 48 * DP,
		alignSelf: 'flex-start',
	},
});
