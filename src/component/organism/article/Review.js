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

	const onPressCategory = category => {
		if (category == '접기') {
			setMoreCategory(false);
		} else {
			alert(category);
		}
	};

	const getCategory = (v, i) => {
		let category_sum_list = [];
		data.community_interests.interests_trip.map(v => category_sum_list.push(v));
		data.community_interests.interests_etc.map(v => category_sum_list.push(v));
		data.community_interests.interests_hospital.map(v => category_sum_list.push(v));
		data.community_interests.interests_review.map(v => category_sum_list.push(v));
		data.community_interests.interests_interior.map(v => category_sum_list.push(v));
		category_sum_list.push('접기');
		// category_sum_list.push('테스트');
		const page = Math.floor(category_sum_list.length / 4) + 1;
		let arr = [];
		arr.length = page;
		arr.fill('a', 0, page);

		if (category_sum_list.length > 3 && !moreCategory) {
			arr = ['a'];
			return arr.map((v, i) => {
				let sliced = category_sum_list.slice(0, 3);
				sliced.push('+' + (category_sum_list.length - 3));
				return (
					<View style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							const isLast = v == '+' + (category_sum_list.length - 3);
							return (
								<TouchableOpacity
									key={i}
									onPress={() => (isLast ? setMoreCategory(true) : onPressCategory(v))}
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
			return arr.map((v, i) => {
				let sliced = category_sum_list.slice(i * 4, (i + 1) * 4);
				return (
					<View style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							const isLast = v == '접기';
							return (
								<TouchableOpacity
									key={i}
									onPress={() => onPressCategory(v)}
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

	const moveToReviewDetail = () => {
		props.onPressReviewContent();
	};

	// console.log(props.data);
	const h = {
		__v: 0,
		_id: '624459d006cdc2f33c14c2e9',
		community_address: {
			_id: '624459d006cdc2f33c14c2ea',
			normal_address: {_id: '624459d006cdc2f33c14c2ec', address_name: '서울 마포구 신수동 85-26 ', city: '서울', district: '마포구'},
			region: {_id: '624459d006cdc2f33c14c2ed', latitude: '37.5494302442039', longitude: '126.93828089693083'},
			road_address: {_id: '624459d006cdc2f33c14c2eb', address_name: '서울특별시 마포구 백범로10길 32(신수동) '},
		},
		community_animal_type: 'cat',
		community_comment_count: 0,
		community_content:
			'<p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648646513485_15C242F1-6556-4585-84D4-5963D89A5FD8.jpg" height="450px" width="300px" style="border-radius:15px; margin: 0 auto 4px; "></p><p>개인소통은 컨텐츠 끝나고 더 많이 하겠습니다~</p>',
		community_date: '2022-03-30T05:57:16.687Z',
		community_favorite_count: 0,
		community_free_type: '',
		community_interests: {
			interests_etc: [],
			interests_hospital: [],
			interests_interior: ['노즈워크/장난감'],
			interests_review: [],
			interests_trip: ['펫 까페', '놀이터'],
		},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_title: 'Title ',
		community_type: 'review',
		community_update_date: '2022-03-30T05:57:16.687Z',
		community_writer_id: {
			_id: '623b17ed400ac30b877dd7d9',
			user_nickname: '자네는고양이어딘가',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
		},
		type: 'CommunityObject',
	};

	// console.log('match2', match3);
	const mat3 = [
		'<img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648657043751_7F3C2D6B-02DC-446F-A961-59427DD2D401.png" id="image" height="450px" width="300px" style="border-radius:15px; margin: 0 auto 4px; ">',
		'<img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648657044016_25FA7831-D55E-4F63-A686-4155D766BA30.jpg" id="image" height="450px" width="300px" style="border-radius:15px; margin: 0 auto 4px; ">',
	];

	const imageList = () => {
		let imageList = [];
		let getImgTag = data.community_content.match(/<img[\w\W]+?\/?>/g);
		getImgTag.map((v, i) => {
			let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i);
			// console.log(i, src[1]);
			imageList.push(src[1]);
		});
		console.log('imageList', imageList);
		return imageList;
	};

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header]}>
				<View style={[style.categoryList]}>{getCategory()}</View>
				<View style={[style.icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			{/* 리뷰 컨텐츠 */}
			<TouchableOpacity onPress={moveToReviewDetail}>
				<View style={[style.content]}>
					<Text style={[txt.noto32b]} numberOfLines={1}>
						{data.community_title}
					</Text>
					<View style={[style.profile]}>
						<UserLocationTimeLabel data={data.community_writer_id} time={data.community_update_date} />
					</View>
				</View>
				{/* 리뷰 사진 썸네일 */}
				<View style={[style.thumbnail]}>
					<ArticleThumnails photo_list={imageList()} />
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
		// backgroundColor: 'yellow',
	},
	header: {
		width: 654 * DP,
		header: 50 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'pink',
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
		// backgroundColor: 'yellow',
		// flexDirection: 'row',
	},
	profile: {
		marginTop: 10 * DP,
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
	},
	content: {
		width: 654 * DP,
		height: 130 * DP,
		// marginTop: 6 * DP,
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

const dummy = [
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
];
