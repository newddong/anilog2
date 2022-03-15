import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Atom/btn/btn_style';
import {Cross46, Cross52} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import LocalMedia from 'Molecules/media/LocalMedia';
import {interestTagList, myPetList} from 'Organism/style_organism';

export default MediaSelect = props => {
	const testData = [1, 2, 3];

	const renderItem = item => {
		return <LocalMedia isSingleSelection={false} />;
	};

	return <FlatList data={testData} renderItem={({item}) => renderItem(item)} numColumns={4} />;
};
