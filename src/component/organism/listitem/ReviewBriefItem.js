import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10} from 'Root/config/color';
import {Like48_Border} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';

/**
 * 후기 요약 컴포넌트 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressReview - 리뷰 클릭 이벤트
 * @param {()=>void)} props.onPressLike - 좋아요 클릭 이벤트
 */
const ReviewBriefItem = props => {
	const data = props.data;

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

	const onPressReview = () => {
		props.onPressReview();
	};

	const onPressLike = () => {
		props.onPressLike();
	};

	return (
		<TouchableOpacity onPress={onPressReview} style={[style.container]}>
			{image.length == 0 ? (
				<></>
			) : (
				<View style={[style.img]}>
					<Image style={[styles.img_square_round_186]} source={{uri: image[0]}} />
				</View>
			)}
			<View style={[style.content]}>
				<View style={[style.title, {width: image.length == 0 ? 654 * DP : null}]}>
					<View style={{flexDirection: 'row'}}>
						<Text style={[txt.noto32b, {}]} numberOfLines={2} ellipsizeMode={'tail'}>
							{data.community_title}
						</Text>
					</View>
				</View>
				<View style={[style.locationTime, {}]}>
					<Text style={[txt.noto26, {color: GRAY10}]}>
						{data.community_address.normal_address.address_name != ''
							? data.community_address.normal_address.city + ' ' + data.community_address.normal_address.district + '에서 ·'
							: ''}
					</Text>
					<Text style={[txt.noto26, {color: GRAY10, marginLeft: 5 * DP}]}>{getTimeLapsed(data.community_date)} </Text>
				</View>
				<View style={[style.footer]}>
					<View style={[style.nick]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> {data.community_writer_id.user_nickname}</Text>
					</View>
					<View style={[style.like, {width: image.length == 0 ? 300 * DP : 116 * DP, justifyContent: 'flex-end'}]}>
						<Like48_Border onPress={onPressLike} />
						<Text style={[txt.noto26, {color: GRAY10, marginLeft: 12 * DP}]}>{data.community_like_count}</Text>
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
		width: 654 * DP,
		height: 186 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
	},
	img: {
		flex: 1,
	},
	content: {
		width: 456 * DP,
	},
	title: {
		height: 92 * DP,
		justifyContent: 'center',
	},
	locationTime: {
		width: 456 * DP,
		height: 40 * DP,
		flexDirection: 'row',
	},
	footer: {
		width: 456 * DP,
		height: 48 * DP,
		marginTop: 8 * DP,
		flexDirection: 'row',
		alignItems: 'center',
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
});
