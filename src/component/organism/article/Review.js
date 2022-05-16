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
		console.log('props.data at Review ', props.data);
		const t = {
			__v: 0,
			_id: '62676586c6d79fe039fa97bb',
			community_address: {
				_id: '62676586c6d79fe039fa97bc',
				normal_address: {_id: '62676586c6d79fe039fa97be', address_name: '', city: '', district: ''},
				region: {_id: '62676586c6d79fe039fa97bf', latitude: '', longitude: ''},
				road_address: {_id: '62676586c6d79fe039fa97bd', address_name: '', city: '', district: ''},
			},
			community_comment_count: 9,
			community_content: '<div>삭제예정</div>',
			community_content_without_html: '삭제예정',
			community_date: '2022-04-26T03:22:46.923Z',
			community_favorite_count: 2,
			community_interests: {
				interests_etc: [],
				interests_hospital: [],
				interests_interior: [],
				interests_location: {city: '', district: ''},
				interests_review: [],
				interests_trip: [],
			},
			community_is_attached_file: false,
			community_is_delete: false,
			community_is_favorite: true,
			community_is_recomment: false,
			community_is_temporary: false,
			community_like_count: 3,
			community_recent_comment: {comment_contents: 'ㅋㅋㅋㅋ', comment_id: '627bd80d9bb7f9adc9355169', comment_user_nickname: '몽키'},
			community_title: '삭제 예정	',
			community_type: 'review',
			community_update_date: '2022-04-26T03:24:11.223Z',
			community_writer_id: {
				__v: 4,
				_id: '6256bf50d6ffa0fefe0387c9',
				pet_family: [],
				shelter_address: {brief: '대구', detail: '자치리'},
				shelter_delegate_contact_number: '01096447777',
				shelter_foundation_date: '2019-03-01T00:00:00.000Z',
				shelter_homepage: 'Ccc',
				shelter_name: '도톨보호소',
				shelter_type: 'private',
				type: 'UserObject',
				user_agreement: {
					is_donation_info: false,
					is_location_service_info: false,
					is_marketting_info: false,
					is_over_fourteen: false,
					is_personal_info: false,
					is_service: false,
				},
				user_denied: false,
				user_email: 'lanad01@naver.com',
				user_favorite_count: 1,
				user_follow_count: 13,
				user_follower_count: 6,
				user_interests: {
					interests_activity: [Array],
					interests_beauty: [Array],
					interests_food: [Array],
					interests_health: [Array],
					interests_location: [Array],
				},
				user_introduction: '',
				user_is_verified_email: false,
				user_is_verified_phone_number: false,
				user_my_pets: [],
				user_name: '도톨보호소',
				user_nickname: '도톨보호소',
				user_password: '12',
				user_phone_number: '37',
				user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1650339943071_D630B1BC-548F-4110-8482-BBD441982CA8.jpg',
				user_register_date: '2022-04-13T12:17:20.315Z',
				user_type: 'shelter',
				user_update_date: '2022-04-13T12:17:20.315Z',
				user_upload_count: 40,
			},
			is_favorite: true,
			is_follow: true,
			is_like: undefined,
			type: 'CommunityObject',
		};
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

	const onPressProfile = () => {
		navigation.push('UserProfile', {userobject: data.community_writer_id});
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
							<View activeOpacity={0.8} style={[style.profile, {}]}>
								{/* <UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} time_expression={'date'} /> */}
								<Text
									onPress={onPressProfile}
									style={[
										txt.roboto24,
										{flex: 1, alignSelf: 'flex-start', color: data.community_writer_id._id == userGlobalObject.userInfo._id ? APRI10 : BLACK},
									]}>
									{data.community_writer_id.user_nickname}{' '}
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
