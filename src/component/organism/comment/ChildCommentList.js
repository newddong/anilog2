import React from 'react';
import {View, FlatList} from 'react-native';
import {organism_style} from 'Organism/style_organism';
import ChildComment from 'Organism/comment/ChildComment';
import {ChildCommentLinker} from 'Atom/icon';

/**
 * 자식 댓글 리스트
 * @param {object} props - Props Object
 * @param {Object} props.items - 대댓글 리스트
 * @param {(id:string)=>void} props.onPressDeleteChild - 대댓글 삭제
 * @param {(data:object)=>void} props.onEdit - 대댓글 수정
 */
const ChildCommentList = props => {
	const onEdit = data => {
		props.onEdit && props.onEdit(data);
	};

	const like = data => {
		props.like && props.like(data);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[organism_style.childCommentList]}>
				<ChildCommentLinker />
				<ChildComment data={item} onEdit={onEdit} like={like} onPressDeleteChild={props.onPressDeleteChild} />
			</View>
		);
	};
	return <FlatList data={props.items} extraData={props.items} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />;
};

ChildCommentList.defaultProps = {
	items: [],
	onPressReplyBtn: e => console.log(e),
	onPressDeleteChild: () => {},
};

export default ChildCommentList;
