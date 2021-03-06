import React from 'react';
import {View, FlatList} from 'react-native';
import {organism_style} from 'Organism/style_organism';
import ChildComment from 'Organism/comment/ChildComment';
import {ChildCommentLinker} from 'Atom/icon';

/**
 *
 * @param {{
 * items: 'Array',
 * onPressReplyBtn : void,
 * }} props
 */
export default ChildCommentList = props => {
	// console.log(props.items);
	const renderItem = (item, index) => {
		return (
			<View style={[organism_style.childCommentList]}>
				<ChildCommentLinker />
				<ChildComment data={item} onPressReplyBtn={comment => props.onPressReplyBtn(comment)} />
			</View>
		);
	};
	console.log('rendered item length', props.items.length);
	return <FlatList data={props.items} extraData={props.items} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />;
};

ChildCommentList.defaultProps = {
	items: [],
	onPressReplyBtn: e => console.log(e),
};
