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
 */
const ReviewBriefList = props => {
	const [showMore, setShowMore] = React.useState(false);

	const renderItem = (item, index) => {
		return (
			<View style={[style.listItem]}>
				<ReviewBriefItem />
			</View>
		);
	};
	return (
		<View style={[style.container]}>
			<FlatList
				data={showMore ? props.items : props.items.slice(0, 2)}
				renderItem={({item, index}) => renderItem(item, index)}
				keyExtractor={item => item.id}
			/>
			{props.items && props.items.length > 2 ? (
				<TouchableOpacity onPress={() => setShowMore(!showMore)} style={[style.showMore]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
					{!showMore ? <Arrow_Down_GRAY10 /> : <Arrow_Up_GRAY10 />}
				</TouchableOpacity>
			) : (
				<></>
			)}
		</View>
	);
};

ReviewBriefList.defaultProps = {};

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