import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReviewBriefItem from '../listitem/ReviewBriefItem';
import {GRAY10} from 'Root/config/color';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10} from 'Root/component/atom/icon';
import ReviewFavoriteBriefItem from '../listitem/ReviewFavoriteBriefItem';
import CheckBox from 'Root/component/molecules/select/CheckBox';

/**
 * 후기 요약 컴포넌트 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {index:number} props.onPressReview - 리뷰 아이템 클릭
 * @param {index:number} props.onPressLike - 리뷰 아이템 좋아요 클릭
 * @param {index:number} props.onPressUnlike - 리뷰 아이템 좋아요 취소
 * @param {boolean} props.selectMode - 선택모드
 * @param {boolean} props.onCheckBox - 선택모드
 */
const ReviewFavoriteBriefList = props => {
	const renderItem = (item, index) => {
		return (
			<View key={index} style={[style.listItem, {}]}>
				{props.selectMode ? (
					<View style={{justifyContent: 'center', marginRight: 20 * DP}}>
						<CheckBox state={item.checkBoxState} onCheck={() => props.onCheckBox(index)} />
					</View>
				) : (
					<></>
				)}
				<ReviewFavoriteBriefItem
					data={item}
					selectMode={props.selectMode}
					onPressReview={() => props.onPressReview(index)}
					onPressLike={() => props.onPressLike(index)}
					onPressUnlike={() => props.onPressUnlike(index)}
				/>
			</View>
		);
	};
	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				listKey={({item, index}) => index}
				keyExtractor={item => item._id}
				hori
			/>
		</View>
	);
};

ReviewFavoriteBriefList.defaultProps = {
	onPressReview: () => {},
	onPressLike: () => {},
	onPressUnlike: () => {},
	onCheckBox: () => {},
};

export default ReviewFavoriteBriefList;

const style = StyleSheet.create({
	container: {
		paddingHorizontal: 48 * DP,
		paddingVertical: 30 * DP,
		alignItems: 'center',
	},
	listItem: {
		marginBottom: 60 * DP,
		flexDirection: 'row',
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
