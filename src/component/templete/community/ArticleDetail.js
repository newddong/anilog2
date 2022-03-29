import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import userGlobalObject from 'Root/config/userGlobalObject';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';
import {dum} from 'Root/config/dummyDate_json';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {getCommentListByFeedId} from 'Root/api/commentapi';
import {useNavigation} from '@react-navigation/core';

/**
 * 자유게시글 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 자유 게시글 오브젝트
 */
export default ArticleDetail = props => {
	const navigation = useNavigation();
	// const [data, setData] = React.useState(props.route.params.community_object);
	const data = props.route.params.community_object;
	const [comments, setComments] = React.useState([]);

	React.useEffect(() => {
		getComment();
	}, []);

	const onPressMeatball = () => {
		Modal.popSelectBoxModal(
			['수정', '삭제'],
			select => {
				alert(select);
				if (select == '수정') {
				}
			},
			() => Modal.close(),
			false,
			false,
		);
	};

	const onPressLike = () => {
		alert('onPressLike');
	};

	//사진클릭
	const onPressPhotos = () => {
		Modal.popPhotoListViewModal(dummy);
	};

	const getComment = () => {
		getCommentListByFeedId(
			{
				feedobject_id: '6230138e889aa22e10624a36',
				request_number: 1000,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				setComments(comments.msg);
				// console.log('comments', comments);
			},
			err => console.log('getCommentListByFeedId', err),
		);
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// console.log('dummy', dummy[index]);
		navigation.push('ArticleDetail', {community_object: dum[index]});
	};

	const onPressReply = arg => {
		navigation.push('ArticleCommentList', {feedobject: {_id: '6230138e889aa22e10624a36'}});
	};

	const freeBoardContent = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<Article data={data} onPressThumnails={onPressPhotos} onPressMeatball={onPressMeatball} route={props.route.name} />
				<View style={[style.separator]} />
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[{alignItems: 'center', paddingBottom: 40 * DP}]}>
				<FlatList
					data={[{}]}
					renderItem={({item, index}) => {
						return (
							<View style={[{width: 750 * DP, alignItems: 'center'}]}>
								{comments && comments.length > 0 ? (
									<TouchableOpacity onPress={onPressReply} style={[style.replyCountContainer]}>
										<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개 모두 보기</Text>
									</TouchableOpacity>
								) : (
									<></>
								)}
								<View style={[{}]}>
									<CommentList items={comments && comments.length > 4 ? comments.slice(0, 4) : comments} onPressReplyBtn={onPressReply} />
								</View>
								<View style={[{marginTop: 40 * DP, marginBottom: 80 * DP}]}>
									<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
								</View>
								<ArticleList
									items={dum}
									onPressArticle={onPressArticle} //게시글 내용 클릭
								/>
							</View>
						);
					}}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={freeBoardContent}
					// ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
				/>
			</View>
		</View>
	);
};

ArticleDetail.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignSelf: 'center',
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 50 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		alignSelf: 'flex-start',
		marginTop: 12 * DP,
	},
	hashText: {
		width: 634 * DP,
		marginTop: 10 * DP,
	},
	replyCountContainer: {
		width: 474 * DP,
		alignItems: 'flex-end',
		alignSelf: 'flex-end',
		marginRight: 48 * DP,
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	footer: {
		// flex: 1,
		width: 150 * DP,
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	separator: {
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
	},
});

const dummy = [
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
];
