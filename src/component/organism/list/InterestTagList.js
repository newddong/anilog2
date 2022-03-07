import React from 'react';
import {FlatList, Text, View, ScrollView} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w190} from 'Root/component/atom/btn/btn_style';
import {Cross46} from 'Root/component/atom/icon';
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
			<View style={[interestTagList.tagContainer]}>
				<Text style={[txt.noto28, {color: GRAY20, textAlign: 'center'}]}>{item}</Text>
				<View style={[interestTagList.cross52]}>
					<Cross46 onPress={() => onDelete(index)} />
				</View>
			</View>
		);
	};
	const numColums = Math.ceil(props.items / 2);
	return (
		<View style={[interestTagList.container]}>
			<View style={[interestTagList.titleContainer]}>
				<View style={[interestTagList.title]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>{props.title}</Text>
				</View>
				<View style={[interestTagList.btn_w226]}>
					<AniButton onPress={onPressAddBtn} btnTitle={'추가하기'} btnLayout={btn_w190} btnTheme={'shadow'} btnStyle={'border'} />
				</View>
			</View>
			<View style={[interestTagList.interestingTagList]}>
				<FlatList
					style={[{display: 'flex', flexWrap: 'wrap'}]}
					data={props.items}
					renderItem={({item, index}) => renderItem(item, index)}
					horizontal={true}
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
