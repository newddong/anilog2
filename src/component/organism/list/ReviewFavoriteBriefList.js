import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Check42, Check50, EmptyIcon, Rect42_Border, Rect50_Border} from 'Root/component/atom/icon';
import ReviewFavoriteBriefItem from '../listitem/ReviewFavoriteBriefItem';
import DP from 'Root/config/dp';

/**
 * 후기 요약 컴포넌트 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {index:number} props.onPressReview - 리뷰 아이템 클릭
 * @param {index:number} props.onPressLike - 리뷰 아이템 좋아요 클릭
 * @param {index:number} props.onPressUnlike - 리뷰 아이템 좋아요 취소
 * @param {(index:number, bool:boolean)=>void} props.onPressCheck - 체크박스 클릭
 * @param {boolean} props.selectMode - 선택모드
 * @param {boolean} props.onCheckBox - 선택모드
 * @param {()=>void)} props.onEndReached - 하단 스크롤 도착 콜백
 */
const ReviewFavoriteBriefList = props => {
	const onPressToggle = (index, bool) => {
		props.onPressCheck(index, bool);
	};

	const renderItem = (item, index) => {
		// console.log('ind', item.community_title, item.height, item.offset, item.community_title);
		return (
			<View key={index} style={[style.listItem, {}]}>
				{props.selectMode ? (
					<View style={{justifyContent: 'center', marginRight: 20 * DP}}>
						{item.checkBoxState ? (
							<Check42 onPress={() => onPressToggle(index, false)} />
						) : (
							<Rect42_Border onPress={() => onPressToggle(index, true)} />
						)}
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
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: data[index].height, offset: data[index].offset, index: index};
				}}
				ListEmptyComponent={props.whenEmpty}
				onEndReachedThreshold={0.6}
				onEndReached={() => props.onEndReached()}
			/>
		</View>
	);
};

ReviewFavoriteBriefList.defaultProps = {
	onPressReview: () => {},
	onPressLike: () => {},
	onPressUnlike: () => {},
	onCheckBox: () => {},
	onPressCheck: () => {},
	onEndReached: () => {},
};

export default ReviewFavoriteBriefList;

const style = StyleSheet.create({
	container: {
		paddingHorizontal: 28 * DP,
		paddingVertical: 30 * DP,
		alignItems: 'center',
	},
	listItem: {
		width: 694 * DP,
		paddingBottom: 40 * DP,
		flexDirection: 'row',
	},
	showMore: {
		width: 694 * DP,
		height: 48 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
});
