import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ChildComment from 'Organism/comment/ChildComment';
import {ChildCommentLinker} from 'Atom/icon';
import {GRAY40, WHITE} from 'Root/config/color';

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

	console.log('Child editData', props.editData);

	const renderItem = ({item, index}) => {
		return (
			<View style={[style.childCommentList, {backgroundColor: props.editData && props.editData._id == item._id ? GRAY40 : WHITE}]}>
				<ChildCommentLinker />
				<ChildComment data={item} onEdit={onEdit} like={like} onPressDeleteChild={props.onPressDeleteChild} />
			</View>
		);
	};
	return <FlatList data={props.items} extraData={props.items} renderItem={renderItem} scrollEnabled={false} />;
};

ChildCommentList.defaultProps = {
	items: [],
	onPressReplyBtn: e => console.log(e),
	onPressDeleteChild: () => {},
};

export default ChildCommentList;

const style = StyleSheet.create({
	childCommentList: {
		width: 614 * DP,
		paddingVertical: 20 * DP,
		flexDirection: 'row',
	},
});
