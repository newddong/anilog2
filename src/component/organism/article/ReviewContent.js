import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, LocationGray, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
/**
 * 후기 세부 페이지
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 */
export default ReviewContent = props => {
	const category = () => {
		return (
			<View style={[style.category]}>
				<Text style={[txt.noto24]}>애견카페</Text>
			</View>
		);
	};
	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header]}>
				<View style={[style.title]}>
					<Text style={[txt.noto32b]} numberOfLines={1}>
						성동구 애견카페 '멍멍존' 후기
					</Text>
					<View style={[style.icon]}>
						<FavoriteTag46_Filled />
						<Meatball50_GRAY20_Horizontal />
					</View>
				</View>
				<View style={[style.label]}>
					<UserLocationTimeLabel />
				</View>
			</View>
			{/* 리뷰 컨텐츠 */}
			<View style={[style.reviewText]}></View>

			{/* 리뷰 부가 정보  */}
			<View style={[style.footer]}>
				<View style={[style.location]}>
					<LocationGray />
					<Text style={[txt.noto26b, {color: GRAY10, marginLeft: 10 * DP}]}>서울시 성동구 115-64 멍멍동 왈왈길 멍멍존</Text>
				</View>
				<View style={[style.categoryList]}>{category()}</View>
			</View>
		</View>
	);
};

ReviewContent.defaultProps = {};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 24 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	header: {
		width: 654 * DP,
		header: 50 * DP,
		// backgroundColor: 'pink',
	},
	title: {
		flexDirection: 'row',
		width: 654 * DP,
		header: 50 * DP,
		justifyContent: 'space-between',
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	label: {
		marginTop: 12 * DP,
		// backgroundColor: 'red',
	},
	reviewText: {
		width: 654 * DP,
		height: 600 * DP, //추후 제거 예정
		backgroundColor: 'yellow',
		marginTop: 20 * DP,
	},
	footer: {
		marginTop: 20 * DP,
		width: 654 * DP,
		height: 88 * DP,
		// backgroundColor: 'palegreen',
	},
	location: {
		width: 654 * DP,
		// height: 40 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 654 * DP,
		marginTop: 10 * DP,
		flexDirection: 'row',
	},
});
