import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ControllableHashTag from './ControllableHashTag';
import {controllableHashTagList} from './style_organism';

export default ControllableHashTagList = props => {
	const _dummyData = [
		{
			keyword: '#KEYWORD',
			keywordBold: true,
			count: 'Count한 게시물',
		},
		{
			keyword: '#KEYWORD',
			keywordBold: false,
			count: 'Count한 게시물2',
		},
		{
			keyword: '#KEYWORD',
			keywordBold: true,
			count: 'Count한 게시물3',
		},
	];
	const renderItem = (item, index) => {
		return <ControllableHashTag data={item} />;
	};

	return (
		<View style={controllableHashTagList.container}>
			<View style={[controllableHashTagList.title]}>
				<Text>title</Text>
			</View>
			<FlatList data={_dummyData} renderItem={({item, index}) => renderItem(item, index)} />
		</View>
	);
};
