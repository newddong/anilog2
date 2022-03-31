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
	const gg = {
		__v: 0,
		_id: '624550cc06cdc2f33c14c8e8',
		community_address: {
			_id: '624550cc06cdc2f33c14c8e9',
			normal_address: {_id: '624550cc06cdc2f33c14c8eb', address_name: '서울 마포구 신수동 89-77 ', city: '서울', district: '마포구'},
			region: {_id: '624550cc06cdc2f33c14c8ec', latitude: '37.54872100000001', longitude: '126.93712499999995'},
			road_address: {_id: '624550cc06cdc2f33c14c8ea', address_name: '서울특별시 마포구 광성로4길 22-12 ', city: '서울', district: '마포구'},
		},
		community_animal_type: 'cat',
		community_comment_count: 0,
		community_content: '<div>vpdltusxm</div>',
		community_date: '2022-03-30T05:57:16.687Z',
		community_favorite_count: 0,
		community_free_type: '',
		community_interests: {
			interests_etc: [],
			interests_hospital: ['사료', '간식'],
			interests_interior: ['가구', '집 · 방석'],
			interests_location: {city: '서울', district: '마포구'},
			interests_review: ['다이어트 경험', '치료 경험'],
			interests_trip: ['펫 까페', '놀이터'],
		},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_title: '돌아와요 고양이',
		community_type: 'review',
		community_update_date: '2022-03-30T05:57:16.687Z',
		community_writer_id: {
			_id: '623b17ed400ac30b877dd7d9',
			user_nickname: '자네는고양이어딘가',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
		},
		type: 'CommunityObject',
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

	const image = imageList();

	const onPressReview = () => {
		props.onPressReview();
	};

	const onPressLike = () => {
		props.onPressLike();
	};

	return (
		<TouchableOpacity onPress={onPressReview} style={[style.container]}>
			<View style={[style.img]}>
				{image.length == 0 ? (
					<View style={[styles.img_square_round_186, style.reviewThumbnail_without_image]}>
						<Text style={[txt.noto36b]}>후기</Text>
					</View>
				) : (
					<Image style={[styles.img_square_round_186]} source={{uri: image[0]}} />
				)}
			</View>
			<View style={[style.content]}>
				<View style={[style.title]}>
					<View style={{flexDirection: 'row', width: 440 * DP}}>
						<Text style={[txt.noto30b, {flex: 1}]} numberOfLines={2} ellipsizeMode={'tail'}>
							{data.community_title}
						</Text>
					</View>
				</View>
				<View style={[style.locationTime]}>
					<Text style={[txt.noto26, {color: GRAY10}]}>
						{data.community_address.normal_address.address_name != ''
							? data.community_address.normal_address.city + ' ' + data.community_address.normal_address.district + '에서 ·'
							: ''}
					</Text>
					<Text style={[txt.noto26, {color: GRAY10, marginLeft: 5 * DP}]}>{getTimeLapsed(data.community_update_date)} </Text>
				</View>
				<View style={[style.footer]}>
					<View style={[style.nick]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> {data.community_writer_id.user_nickname}</Text>
					</View>
					<View style={[style.like]}>
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
		// backgroundColor: 'red',
	},
	img: {
		flex: 1,
	},
	content: {
		width: 456 * DP,
		height: 178 * DP,
		// backgroundColor: 'yellow',
	},
	title: {
		width: 456 * DP,
		height: 92 * DP,
		justifyContent: 'center',
		// backgroundColor: 'palegreen',
	},
	locationTime: {
		width: 456 * DP,
		height: 40 * DP,
		flexDirection: 'row',
		// backgroundColor: 'purple',
	},
	footer: {
		width: 456 * DP,
		height: 48 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	nick: {
		width: 340 * DP,
		height: 48 * DP,
		// backgroundColor: 'yellow',
	},
	like: {
		width: 116 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	reviewThumbnail_without_image: {
		borderColor: GRAY10,
		borderWidth: 4 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
