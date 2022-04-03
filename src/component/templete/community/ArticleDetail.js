import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';
import {dum} from 'Root/config/dummyDate_json';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';
import {getCommentListByCommunityId} from 'Root/api/commentapi';
import {getCommunityList} from 'Root/api/community';

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
	const [articleList, setArticleList] = React.useState([]);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getComment();
			getArticleList();
		});
		navigation.setOptions({title: '자유 게시글'});
		// getComment();
		return unsubscribe;
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

	const getArticleList = () => {
		getCommunityList(
			{
				community_type: 'free',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg.free);
				setArticleList(result.msg.free);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				Modal.alert(err);
			},
		);
	};

	const getComment = () => {
		getCommentListByCommunityId(
			{
				community_object_id: data._id,
				request_number: 1000,
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

	const onPressReply = () => {
		navigation.push('CommunityCommentList', {community_object: data});
	};

	const freeBoardContent = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<Article data={data} onPressMeatball={onPressMeatball} route={props.route.name} />
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
								<View style={[style.commentContainer]}>
									<CommentList items={comments && comments.length > 3 ? comments.slice(0, 3) : comments} onPressReplyBtn={onPressReply} />
								</View>
								<View style={[{marginTop: 40 * DP, marginBottom: 80 * DP}]}>
									<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
								</View>
								<ArticleList
									items={articleList}
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
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		// backgroundColor: 'yellow',
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
