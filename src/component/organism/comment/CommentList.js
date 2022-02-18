import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import ParentComment from 'Organism/comment/ParentComment';
import DP from 'Root/config/dp';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';

/**
 *
 * @param {{
 * items : '댓글 목록들',
 * onPress_ChildComment_ReplyBtn : void,
 * onPressReplyBtn : void,
 * }} props
 */
export default CommentList = props => {
	console.log('length', props.items.length);
	const renderItem = ({item, index}) => {
		// console.log('CommentList', item);
		return (
			<ParentComment
				parentComment={item}
				onPressReplyBtn={props.onPressReplyBtn} // 부모 댓글의 답글쓰기 클릭 이벤트
			/>
		);
	};

	const whenEmpty = () => {
		return (
			<View
				style={[
					{
						height: 100 * DP,
						width: 654 * DP,
						// backgroundColor: 'red',
						paddingVertical: 30 * DP,
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: 30 * DP,
					},
				]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 댓글이 없습니다.</Text>
			</View>
		);
	};

	return (
		<View
			style={{
				width: 654 * DP,
				// backgroundColor: 'red',
			}}>
			<FlatList data={props.items} renderItem={renderItem} ListEmptyComponent={whenEmpty} scrollEnabled={false} stickyHeaderIndices={[0]} />
		</View>
	);
};

CommentList.defaultProps = {
	items: [],
	onPressReplyBtn: e => console.log(e),
	onPress_ChildComment_ReplyBtn: e => console.log(e),
};
