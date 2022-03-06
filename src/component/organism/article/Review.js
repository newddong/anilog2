import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
/**
 *
 * @param {{
 * isCheck : boolean ,
 * }} props
 */
export default Review = props => {
	const category = () => {
		return (
			<View style={[style.category]}>
				<Text style={[txt.noto24]}>애견카페</Text>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.categoryList]}>
					{category()}
					{category()}
				</View>
				<View style={[style.icon]}>
					<FavoriteTag46_Filled />
					<Meatball50_GRAY20_Horizontal />
				</View>
			</View>
		</View>
	);
};

Review.defaultProps = {};

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 24 * DP,
		alignSelf: 'center',
		backgroundColor: 'yellow',
	},
	header: {
		width: 654 * DP,
		header: 50 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'pink',
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
		width: 510 * DP,
		flexDirection: 'row',
	},
	icon: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
});
