import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10, GRAY30, WHITE} from 'Root/config/color';
import {Comment48, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {count_to_K} from 'Root/util/stringutil';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';

/**
 * 후기 요약 컴포넌트 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressReview - 리뷰 클릭 이벤트
 * @param {()=>void)} props.onPressLike - 좋아요 클릭 이벤트
 */
const ReviewBriefItem = props => {
	const [data, setData] = React.useState(props.data);
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

	const image = imageList();
	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const onPressReview = () => {
		props.onPressReview();
	};

	const onPressLike = bool => {
		props.onPressLike(bool);
		// setData({...data, community_is_like: bool});
	};

	const getCategory = (v, i) => {
		// console.log('data.community_interests', data.community_interests);
		let category_sum_list = [];
		if (data.community_interests.hasOwnProperty('interests_group1')) {
			data.community_interests.interests_group1.map(v => category_sum_list.push(v));
			data.community_interests.interests_etc.map(v => category_sum_list.push(v));
			data.community_interests.interests_group2.map(v => category_sum_list.push(v));
			data.community_interests.interests_group3.map(v => category_sum_list.push(v));
			// item.community_interests.interests_interior.map(v => category_sum_list.push(v));
		} else {
			data.community_interests.interests_trip.map(v => category_sum_list.push(v));
			data.community_interests.interests_etc.map(v => category_sum_list.push(v));
			data.community_interests.interests_hospital.map(v => category_sum_list.push(v));
			data.community_interests.interests_review.map(v => category_sum_list.push(v));
			data.community_interests.interests_interior.map(v => category_sum_list.push(v));
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
			if (totalWidth < (image.length == 0 ? 520 * DP : 320 * DP)) {
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
		if (categoryArr.length > 0) {
			return (
				<View style={{flexDirection: 'row', width: 694 * DP}}>
					{categoryArr[0].map((v, i) => {
						let isLast = false;
						if (i == categoryArr[0].length - 1 && categoryArr.length > 1) {
							isLast = true;
							v.item = '+' + (category_sum_list.length - categoryArr[0].length + 1);
						}
						if (v.item == '+' + 0) {
							return <View key={i}></View>;
						}
						return (
							<View
								key={i}
								style={[style.category, {backgroundColor: WHITE, borderColor: isLast ? GRAY10 : GRAY30, width: isLast ? 100 * DP : null}]}>
								<Text style={[txt.noto24, {color: GRAY10, paddingHorizontal: 10 * DP, textAlign: 'center'}]}>{v.item}</Text>
							</View>
						);
					})}
				</View>
			);
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.4} onPress={onPressReview} style={[style.container]}>
			{image.length == 0 ? (
				<></>
			) : (
				<View style={[styles.img_square_round_186, {marginRight: 16 * DP}]}>
					<FastImage style={[styles.img_square_round_186]} source={{uri: image[0]}} />
				</View>
			)}
			<View style={[style.content, {width: image.length == 0 ? 694 * DP : 478 * DP}]}>
				<View style={[style.title, {maxWidth: image.length == 0 ? 694 * DP : 478 * DP}]}>
					<Text style={[txt.noto32b, {}]} numberOfLines={1}>
						{data.community_title}
					</Text>
				</View>
				<View style={[style.locationTime]}>
					<Text style={[txt.noto26, {color: GRAY10}]}>
						{data.community_address.normal_address.address_name != ''
							? data.community_address.normal_address.city + ' ' + data.community_address.normal_address.district + '에서 ·'
							: ''}
					</Text>
					<Text style={[txt.noto26, {color: GRAY10, marginLeft: 5 * DP}]}>{getTimeLapsed(data.community_date)} </Text>
				</View>
				<View style={[style.categoryCont, {}]}>{getCategory()}</View>
				<View style={[style.footer, {}]}>
					{/* {data.community_writer_id ? (
						<View style={[style.nick]}>
							<Text style={[txt.noto26, {color: GRAY10, width: image.length == 0 ? 580 * DP : 330 * DP, backgroundColor: 'red'}]} numberOfLines={1}>
								{' '}
								{data.community_writer_id.user_nickname}
							</Text>
						</View>
					) : (
						<></>
					)} */}
					<View style={[style.like]}>
						{data.community_is_like ? (
							<TouchableOpacity onPress={() => onPressLike(false)} style={{justifyContent: 'center'}}>
								<Like48_Filled />
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => onPressLike(true)} style={{justifyContent: 'center'}}>
								<Like48_Border />
							</TouchableOpacity>
						)}
						<Text style={[txt.noto26, {color: GRAY10}]}> {count_to_K(data.community_like_count)} </Text>
					</View>
					<View style={[style.like, {marginLeft: 30 * DP}]}>
						<Comment48 />
						<Text style={[txt.noto26, {color: GRAY10}]}> {count_to_K(data.community_comment_count)} </Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

ReviewBriefItem.defaultProps = {
	onPressReview: () => {},
	onPressLike: () => {},
};

export default ReviewBriefItem;

const style = StyleSheet.create({
	container: {
		width: 694 * DP,
		height: 186 * DP,
		marginBottom: 40 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
	},
	img: {
		flex: 1,
	},
	content: {
		flex: 1,
		height: 186 * DP,
		// backgroundColor: 'red',
	},
	title: {
		height: 44 * DP,
		justifyContent: 'center',
	},
	locationTime: {
		height: 40 * DP,
		flexDirection: 'row',
	},
	footer: {
		height: 48 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
	},
	nick: {
		// width: 340 * DP,
		height: 48 * DP,
	},
	like: {
		// width: 116 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	reviewThumbnail_without_image: {
		borderColor: GRAY10,
		borderWidth: 4 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoryCont: {
		height: 54 * DP,
		justifyContent: 'center',
		// backgroundColor: 'blue',
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
});
