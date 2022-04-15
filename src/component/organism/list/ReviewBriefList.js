import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReviewBriefItem from '../listitem/ReviewBriefItem';
import {GRAY10} from 'Root/config/color';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10} from 'Root/component/atom/icon';

/**
 * 후기 요약 컴포넌트 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {index:number} props.onPressReview - 리뷰 아이템 클릭
 * @param {index:number} props.onPressLike - 리뷰 아이템 좋아요 클릭
 */
const ReviewBriefList = props => {
	const [showMore, setShowMore] = React.useState(false);
	const scrollRef = React.useRef('');

	const items = showMore ? props.items : props.items.slice(0, 2);

	const onPressShowMore = () => {
		setShowMore(!showMore);
		!showMore ? props.showMore() : false;
	};

	const renderItem = (item, index) => {
		return (
			<View key={index} style={[style.listItem]}>
				<ReviewBriefItem data={item} onPressReview={() => props.onPressReview(index)} onPressLike={bool => props.onPressLike(bool, index)} />
			</View>
		);
	};
	return (
		<View style={[style.container]}>
			<ScrollView ref={scrollRef}>
				{items.map((v, i) => {
					return renderItem(v, i);
				})}
			</ScrollView>
			{props.items && props.items.length > 2 ? ( //아이템이 두 개 이상일 경우 더보기 출력
				<TouchableOpacity onPress={onPressShowMore} style={[style.showMore]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
					{!showMore ? <Arrow_Down_GRAY10 /> : <Arrow_Up_GRAY10 />}
				</TouchableOpacity>
			) : (
				<></>
			)}
		</View>
	);
};

ReviewBriefList.defaultProps = {
	onPressReview: () => {},
	onPressLike: () => {},
};

export default ReviewBriefList;

const style = StyleSheet.create({
	container: {
		paddingVertical: 30 * DP,
		alignItems: 'center',
	},
	listItem: {
		marginBottom: 40 * DP,
	},
	showMore: {
		width: 654 * DP,
		height: 48 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
});
