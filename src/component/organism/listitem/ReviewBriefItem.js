import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10} from 'Root/config/color';
import {Like48_Border} from 'Root/component/atom/icon';

/**
 * 후기 요약 컴포넌트 아이템
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressReview - 리뷰 클릭 이벤트
 * @param {()=>void)} props.onPressLike - 좋아요 클릭 이벤트
 */
const ReviewBriefItem = props => {
	const onPressReview = () => {
		props.onPressReview();
	};

	const onPressLike = () => {
		props.onPressLike();
	};

	return (
		<TouchableOpacity onPress={onPressReview} style={[style.container]}>
			<View style={[style.img]}>
				<Image
					style={[styles.img_square_round_186]}
					source={{uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646633247529_9D4E02D9-50EB-4EC9-A05F-6F049C501DE6.jpg'}}
				/>
			</View>
			<View style={[style.content]}>
				<View style={[style.title]}>
					<View style={{flexDirection: 'row', width: 440 * DP}}>
						<Text style={[txt.noto30b, {flex: 1}]}>성동구 애견카페 '멍멍'존 후기 남겨주세요 하하xssdsdsdsdsdsdsdsdsds하</Text>
					</View>
				</View>
				<View style={[style.locationTime]}>
					<Text style={[txt.noto26, {color: GRAY10}]}>서울시 성동구에서 </Text>
					<Text style={[txt.noto26, {color: GRAY10}]}>· 2시간 전 </Text>
				</View>
				<View style={[style.footer]}>
					<View style={[style.nick]}>
						<Text style={[txt.noto26, {color: GRAY10}]}>user_nickname</Text>
					</View>
					<View style={[style.like]}>
						<Like48_Border onPress={onPressLike} />
						<Text style={[txt.noto26, {color: GRAY10, marginLeft: 12 * DP}]}>303</Text>
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
});
