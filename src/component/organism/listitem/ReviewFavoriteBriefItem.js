import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10} from 'Root/config/color';
import {Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import moment from 'moment';

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
	const data = props.data;
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
		console.log('data.community_is_like', data.community_is_like);
		setIsLike(data.community_is_like);
	}, []);

	// console.log('data.community_is_like', data.community_is_like, data.community_title);

	const image = imageList();

	const onPressReview = () => {
		props.selectMode ? false : props.onPressReview();
	};

	const onPressLike = () => {
		setIsLike(true);
		props.onPressLike();
	};

	const onPressUnlike = () => {
		setIsLike(false);
		props.onPressUnlike();
	};

	const getDate = () => {
		return moment(data.community_date).format('YYYY.MM.DD');
	};

	const getCategory = () => {
		if (!data.community_interests.hasOwnProperty('interests_trip')) {
			return <></>;
		} else {
			let category_sum_list = [];
			data.community_interests.interests_trip.map(v => category_sum_list.push(v));
			data.community_interests.interests_etc.map(v => category_sum_list.push(v));
			data.community_interests.interests_hospital.map(v => category_sum_list.push(v));
			data.community_interests.interests_review.map(v => category_sum_list.push(v));
			data.community_interests.interests_interior.map(v => category_sum_list.push(v));
			let filter = [];
			if (props.selectMode) {
				filter = category_sum_list.length > 2 ? category_sum_list.slice(0, 3) : category_sum_list;
			} else {
				filter = category_sum_list.length > 2 ? category_sum_list.slice(0, 4) : category_sum_list;
			}
			return filter.map((v, i) => {
				if (category_sum_list.length > 2) {
					if (i != filter.length - 1) {
						return (
							<View key={i} style={[style.category]}>
								<Text style={[txt.noto26]}>{v}</Text>
							</View>
						);
					} else
						return (
							<Text key={i} style={[txt.noto24]}>
								+ {category_sum_list.length - (props.selectMode ? 2 : 2)}
							</Text>
						);
				} else {
					return (
						<View key={i} style={[style.category]}>
							<Text style={[txt.noto26]}>{v}</Text>
						</View>
					);
				}
			});
		}
	};

	return (
		<TouchableOpacity
			onPress={onPressReview}
			activeOpacity={props.selectMode ? 1 : 0.6}
			style={[
				style.container,
				{
					width: imageList().length == 0 ? (props.selectMode ? 555 * DP : 654 * DP) : props.selectMode ? 555 * DP : 654 * DP,
					// backgroundColor: 'red',
				},
			]}>
			{image.length == 0 ? (
				<></>
			) : (
				<View style={[style.img]}>
					<Image style={{borderRadius: 0, width: 186 * DP, height: 186 * DP}} source={{uri: image[0]}} />
				</View>
			)}
			<View style={[style.content]}>
				<Text
					style={[
						txt.noto32b,
						{
							width: imageList().length == 0 ? (props.selectMode ? 555 * DP : 654 * DP) : props.selectMode ? 360 * DP : 456 * DP,
						},
					]}
					numberOfLines={2}
					ellipsizeMode={'tail'}>
					{data.community_title}
				</Text>
				<View style={[style.locationTime, {}]}>{getCategory()}</View>
				<View
					style={[
						style.footer,
						{
							width: imageList().length != 0 ? (props.selectMode ? 350 * DP : 445 * DP) : props.selectMode ? 540 * DP : 640 * DP,
							// backgroundColor: 'yellow',
						},
					]}>
					<View style={[style.community_date]}>
						<Text style={[txt.roboto26, {color: GRAY10}]}>{getDate()}</Text>
					</View>
					<View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
						{isLike ? <Like48_Filled onPress={onPressUnlike} /> : <Like48_Border onPress={onPressLike} />}
						<Text style={[txt.noto26, {color: GRAY10, marginLeft: 12 * DP}]}>{data.community_like_count}</Text>
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
		// backgroundColor: 'yellow',
	},
	img: {
		// flex: 1,
	},
	content: {
		justifyContent: 'space-between',
		marginLeft: 15 * DP,
	},
	title: {},
	locationTime: {
		// width: 456 * DP,
		// height: 40 * DP,
		marginTop: 8 * DP,
		flexDirection: 'row',
	},
	footer: {
		// width: 456 * DP,
		height: 48 * DP,
		marginTop: 8 * DP,
		flexDirection: 'row',
		// alignItems: 'center',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
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
		// height: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 15 * DP,
		paddingVertical: 2 * DP,
		// backgroundColor: 'yellow',
	},
});
