import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BLACK, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import Review from '../article/Review';

/**
 * 후기 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {(index:number)} props.onPressReply - 댓글 모두 보기 클릭
 * @param {(index:number)} props.onPressReviewContent - 리뷰 컨텐츠 클릭
 */
export default ReviewList = props => {
	const renderItem = (item, index) => {
		return <Review data={item} onPressReviewContent={() => props.onPressReviewContent(index)} onPressReply={() => props.onPressReply(index)} />;
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={props.items}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.id}
				ListEmptyComponent={props.whenEmpty}
				ItemSeparatorComponent={() => {
					return <View style={{width: 654 * DP, height: 2 * DP, backgroundColor: GRAY30}} />;
				}}
				listKey={({item, index}) => index}
				nestedScrollEnabled
			/>
		</View>
	);
};

ReviewList.defaultProps = {
	whenEmpty: () => {
		return <></>;
	},
	onPressReply: () => {},
	onPressReviewContent: () => {},
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
});
