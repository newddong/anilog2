import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10, GRAY30} from 'Root/config/color';
import {Comment48, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import moment from 'moment';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';

/**
 * 후기 요약 컴포넌트 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressReview - 리뷰 클릭 이벤트
 * @param {()=>void)} props.onPressLike - 좋아요 클릭 이벤트
 * @param {()=>void)} props.onPressUnlike - 좋아요 취소
 * @param {boolean)} props.selectMode - 체크 박스 모드 여부
 */
const ReviewFavoriteBriefItem = props => {
	const [data, setData] = React.useState(props.data);
	const [isLike, setIsLike] = React.useState(false);
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

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	React.useEffect(() => {
		setIsLike(data.community_is_like);
	}, [data.community_is_like]);

	const image = imageList();

	const onPressReview = () => {
		props.onPressReview();
	};

	const onPressLike = () => {
		setIsLike(true);
		setData({...data, community_like_count: ++data.community_like_count});
		props.onPressLike();
	};

	const onPressUnlike = () => {
		setIsLike(false);
		setData({...data, community_like_count: --data.community_like_count});
		props.onPressUnlike();
	};

	const getDate = () => {
		if (data.community_address.normal_address.city == '') {
			return getTimeLapsed(data.community_date);
		} else
			return (
				data.community_address.normal_address.city +
				' ' +
				data.community_address.normal_address.district +
				'에서 · ' +
				// moment(data.community_date).format('YYYY.MM.DD')
				getTimeLapsed(data.community_date)
			);
	};

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
	const getCategory = () => {
		if (!data.community_interests.hasOwnProperty('interests_trip')) {
			return <></>;
		} else {
			let filter = [];
			if (props.selectMode) {
				filter = category_sum_list.length > 2 ? category_sum_list.slice(0, 2) : category_sum_list;
			} else {
				filter = category_sum_list.length > 2 ? category_sum_list.slice(0, 3) : category_sum_list;
			}
			return filter.map((v, i) => {
				if (category_sum_list.length > 2) {
					if (i != filter.length - 1) {
						return (
							<View key={i} style={[style.category]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{v}</Text>
							</View>
						);
					} else
						return (
							<Text key={i} style={[style.categoryPlus, txt.noto24, {color: GRAY10}]}>
								+ {category_sum_list.length - (props.selectMode ? 1 : 2)}
							</Text>
						);
				} else {
					return (
						<View key={i} style={[style.category]}>
							<Text style={[txt.noto24, {color: GRAY10}]}>{v}</Text>
						</View>
					);
				}
			});
		}
	};

	return (
		<TouchableOpacity onPress={onPressReview} activeOpacity={props.selectMode ? 1 : 0.6} style={[style.container, {}]}>
			{image.length == 0 ? (
				<></>
			) : (
				<View style={[style.img]}>
					<FastImage style={{borderRadius: 30 * DP, width: 186 * DP, height: 186 * DP}} source={{uri: image[0]}} />
				</View>
			)}
			<View style={[style.content, {marginLeft: imageList().length != 0 ? 20 * DP : 0}]}>
				<Text
					style={[
						txt.noto28b,
						{
							width: imageList().length == 0 ? (props.selectMode ? 632 * DP : 694 * DP) : props.selectMode ? 422 * DP : 494 * DP,
						},
					]}
					numberOfLines={category_sum_list && category_sum_list.length == 0 ? 2 : 1}
					ellipsizeMode={'tail'}>
					{data.community_title}
				</Text>
				<Text style={[txt.noto26, {color: GRAY10}]}>{getDate()}</Text>
				<View style={[style.locationTime, {}]}>{getCategory()}</View>
				<View style={[style.footer]}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						{isLike ? <Like48_Filled onPress={onPressUnlike} /> : <Like48_Border onPress={onPressLike} />}
						<Text style={[txt.noto26, {color: GRAY10, marginLeft: 6 * DP, marginRight: 20 * DP}]}>{data.community_like_count}</Text>
						<Comment48 />
						<Text style={[txt.noto26, {color: GRAY10, marginLeft: 6 * DP}]}>{data.community_comment_count}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

ReviewFavoriteBriefItem.defaultProps = {
	onPressReview: () => {},
	onPressLike: () => {},
	onPressUnlike: () => {},
	selectMode: false,
};

export default ReviewFavoriteBriefItem;

const style = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 186 * DP,
	},
	img: {
		// flex: 1,
	},
	content: {
		// justifyContent: 'space-between',
	},
	title: {},
	locationTime: {
		marginTop: 4 * DP,
		flexDirection: 'row',
		// height: 56 * DP,
	},
	footer: {
		position: 'absolute',
		bottom: 0,
	},
	nick: {
		width: 340 * DP,
		height: 48 * DP,
	},
	like: {
		width: 116 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	reviewThumbnail_without_image: {
		borderColor: GRAY10,
		borderWidth: 4 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	category: {
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		marginRight: 12 * DP,
		paddingHorizontal: 15 * DP,
		paddingVertical: 2 * DP,
	},
	categoryPlus: {
		borderWidth: 2 * DP,
		borderColor: GRAY10,
		borderRadius: 10 * DP,
		paddingHorizontal: 20 * DP,
		paddingVertical: 2 * DP,
	},
	community_date: {
		// backgroundColor: 'red',
	},
});
