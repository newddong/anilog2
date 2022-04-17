import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import ParentComment from 'Organism/comment/ParentComment';
import DP from 'Root/config/dp';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import AniButton from 'Root/component/molecules/button/AniButton';

/**
 *
 * @param {{
 * items : '댓글 목록들',
 * onPress_ChildComment_ReplyBtn : void,
 * onPressReplyBtn : void,
 * onPressDelete: void,
 * onPressDeleteChild : void
 * }} props
 */
export default CommentList = props => {
	const like = data => {};

	const renderItem = ({item, index}) => {
		// console.log('CommentList', item);
		return (
			<ParentComment
				parentComment={item}
				onPressReplyBtn={props.onPressReplyBtn} // 부모 댓글의 답글쓰기 클릭 이벤트
				onEdit={props.onEdit}
				onPressDelete={props.onPressDelete}
				onPressDeleteChild={props.onPressDeleteChild}
				like={like}
			/>
		);
	};

	const scrollRef = React.useRef();

	const whenEmpty = () => {
		return (
			<View
				style={[
					{
						height: 70 * DP,
						width: 654 * DP,
						marginVertical: 30 * DP,
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 댓글이 없습니다.</Text>
			</View>
		);
	};

	const scrollTo = () => {
		scrollRef.current.scrollToIndex({animated: true, index: 1});
		// scrollRef.current.scrollToItem({
		// 	animated: true,
		// 	item: props.items[2],
		// 	viewPosition: 0.5,
		// });
	};

	return (
		<View
			style={{
				width: 654 * DP,
			}}>
			{/* <AniButton onPress={scrollTo} /> */}
			<FlatList
				listKey={({item, index}) => index}
				keyExtractor={(item, index) => index.toString()}
				nestedScrollEnabled
				data={props.items}
				renderItem={renderItem}
				ListEmptyComponent={whenEmpty}
				scrollEnabled={false}
				initialScrollIndex={2}
				stickyHeaderIndices={[0]}
				ref={scrollRef}
			/>
		</View>
	);
};

CommentList.defaultProps = {
	items: [],
	onPressReplyBtn: e => console.log(e),
	onPress_ChildComment_ReplyBtn: e => console.log(e),
	onPressDelete: () => {},
	onPressDeleteChild: () => {},
};
