import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ProfileImageMedium120 from 'Molecules/image/ProfileImageMedium120';
import {ProfileDefaultImg} from 'Root/component/atom/icon';
import {styles} from 'Root/component/atom/image/imageStyle';

export default OwnerList = props => {
	const onClickLabel = item => {
		props.onClickLabel(item);
	};

	const renderItem = ({item, index}) => {
		return (
			<View style={[style.itemContainer]}>
				<View style={[style.petProfileImageMedium]}>
					<TouchableOpacity onPress={() => onClickLabel(item)}>
						<ProfileImageMedium120 data={item} />
					</TouchableOpacity>
				</View>

				<View style={[style.petProfileInfo]}>
					<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={2}>
						{item.user_nickname}
					</Text>
				</View>
			</View>
		);
	};

	const noOwner = () => {
		return (
			<View style={[style.itemContainer]}>
				<View style={[style.petProfileImageMedium]}>
					<ProfileDefaultImg size={styles.img_round_120} />
				</View>

				<View style={[style.petProfileInfo]}>
					<Text style={[txt.noto24, {color: GRAY10}]} numberOfLines={2}>
						탈퇴한 계정입니다.
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={[style.container, {}]}>
			<View style={[style.insideContainer]}>
				<FlatList data={props.items} renderItem={renderItem} horizontal={true} ListEmptyComponent={noOwner} />
			</View>
		</View>
	);
};

OwnerList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e),
};

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 220 * DP,
		paddingBottom: 20 * DP,
		justifyContent: 'center',
	},
	insideContainer: {
		width: 750 * DP,
		marginLeft: 30 * DP,
		marginRight: 22 * DP,
	},
	itemContainer: {
		width: 152 * DP,
		// height: 172 * DP,
		marginRight: 30 * DP,
		alignItems: 'center',
	},
	petProfileImageMedium: {
		width: 120 * DP,
		height: 120 * DP,
	},
	petProfileInfo: {
		width: 152 * DP,
		// maxHeight: 80 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
