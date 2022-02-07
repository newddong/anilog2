import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Root/component/atom/btn/btn_style';
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
 * }} props
 */
export default InterestTagList = props => {
	// console.log('InterstTagList props', props);
	const navigation = useNavigation();
	const onDelete = index => {
		props.onDelete(index);
	};

	const onPressAddBtn = () => {
		if (props.title == INTEREST_REGION) {
			navigation.push('LocationPicker');
		} else if (props.title == INTEREST_ACT) {
			console.log('Interest Act');
			Modal.popInterestTagModal(
				'',
				() => alert('저장'),
				() => Modal.close(),
			);
		}
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

	return (
		<View style={[interestTagList.container]}>
			<View style={[interestTagList.titleContainer]}>
				<View style={[interestTagList.title]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>{props.title}</Text>
				</View>
				<View style={[interestTagList.btn_w226]}>
					<AniButton onPress={onPressAddBtn} btnTitle={'추가하기'} btnLayout={btn_w226} btnTheme={'shadow'} />
				</View>
			</View>
			<View style={[interestTagList.interestingTagList]}>
				<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} horizontal={true} />
			</View>
		</View>
	);
};

InterestTagList.defaultProps = {
	items: null,
	title: null,
	onDelete: e => console.log(e),
};
