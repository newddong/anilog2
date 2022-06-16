import React from 'react';
import {FlatList, Text, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {BLACK, GRAY10, GRAY20, GRAY40, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w190} from 'Root/component/atom/btn/btn_style';
import {AddItem68Black, Cross46} from 'Root/component/atom/icon';
import AniButton from 'Root/component/molecules/button/AniButton';
import {useNavigation} from '@react-navigation/core';
import {INTEREST_ACT, INTEREST_REGION} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';
import {interestTagList} from 'Organism/style_organism copy';
/**
 *
 *@param {{
 * title: string,
 * items : 'List item ',
 * onDelete : void,
 * onPressAddBtn : void,
 * extra : boolean,
 * }} props
 */
export default InterestTagList = props => {
	// console.log('InterstTagList props', props);
	const navigation = useNavigation();
	const onDelete = index => {
		props.onDelete(index);
	};

	const onPressAddBtn = () => {
		props.onPressAddBtn();
	};

	const renderItem = (item, index) => {
		return (
			<View style={[styles.tagContainer]}>
				<Text style={[txt.noto28, {color: MAINBLACK, textAlign: 'center'}]}>{item}</Text>
				{/* <View style={[interestTagList.cross52]}>
					<Cross46 onPress={() => onDelete(index)} />
				</View> */}
			</View>
		);
	};
	const numColums = Math.ceil(props.items / 2);
	return (
		<View style={[styles.container]}>
			<View style={[styles.titleContainer]}>
				<Text style={[{width: 162 * DP}, {height: 46 * DP}, txt.noto30b, {color: MAINBLACK}]}>{props.title}</Text>
			</View>
			<View style={[styles.interestingTagList]}>
				{/* <AniButton onPress={onPressAddBtn} btnTitle={'추가하기'} btnLayout={btn_w190} btnTheme={'shadow'} btnStyle={'border'} /> */}
				<View>
					<TouchableOpacity onPress={onPressAddBtn}>
						<AddItem68Black />
					</TouchableOpacity>
				</View>

				<FlatList
					style={[{display: 'flex', flexWrap: 'wrap', marginLeft: 30 * DP}]}
					data={props.items}
					renderItem={({item, index}) => renderItem(item, index)}
					horizontal={true}
					extraData={props.extra}
					// numColumns={3}
				/>
			</View>
		</View>
	);
};

InterestTagList.defaultProps = {
	items: null,
	title: null,
	onDelete: e => console.log(e),
	onPressAddBtn: e => console.log(e),
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 194 * DP,
		paddingHorizontal: 28 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	title: {
		width: 226 * DP,
		height: 48 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	titleContainer: {
		width: 162 * DP,
		height: 46 * DP,
		marginTop: 30 * DP,
		flexDirection: 'row',
	},
	interestingTagList: {
		height: 102 * DP,
		width: 750 * DP,
		// marginLeft: 44 * DP,
		// paddingHorizontal: 28 * DP,
		marginTop: 20 * DP,
		flexDirection: 'row',
	},
	tagContainer: {
		height: 68 * DP,
		paddingHorizontal: 20 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: '#767676',
		marginRight: 15 * DP,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: BLACK,
	},
});
