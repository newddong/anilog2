import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import HashLabel from '../molecules/HashLabel';
import {hashTagList, organism_style} from './style_organism';

/**
 *
 *@param {{
 * items : 'List item ',
 * onDelete : void,
 * }} props
 */
export default HashTagList = props => {
	// console.log('propsddd', props.items);

	const renderItem = (item, index) => {
		// console.log('item', item);
		return (
			<View style={[hashTagList.container]}>
				<HashLabel keyword={item.hashtag_keyword} count={item.hashtag_feed_id.length} />
			</View>
		);
	};

	return (
		<ScrollView horizontal={false} contentContainerStyle={{flex: 0}}>
			<ScrollView horizontal={true} contentContainerStyle={{flex: 1}} scrollEnabled={false}>
				<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />
			</ScrollView>
		</ScrollView>
	);
};

HashTagList.defaultProps = {
	items: [],
};
