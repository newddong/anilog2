import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ReviewBriefItem from '../listitem/ReviewBriefItem';
import {GRAY10} from 'Root/config/color';
import {Arrow_Down_GRAY10} from 'Root/component/atom/icon';

/**
 * 후기 요약 컴포넌트 리스트
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 */
export default ReviewBriefList = props => {
	const dummy = [1, 2, 3];
	return (
		<ScrollView contentContainerStyle={[style.container]}>
			{dummy.map((v, i) => {
				return (
					<View style={[style.listItem]}>
						<ReviewBriefItem key={i} />
					</View>
				);
			})}
			<View style={[style.showMore]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
				<Arrow_Down_GRAY10 />
			</View>
		</ScrollView>
	);
};

ReviewBriefList.defaultProps = {};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
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
