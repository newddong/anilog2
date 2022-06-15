import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {feedCommentList, login_style} from 'Templete/style_templete';
import {createComment, getCommentListByCommunityId, getCommentListByFeedId, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {useNavigation} from '@react-navigation/core';
import {deleteComment} from 'Root/api/commentapi';
import {SafeAreaView} from 'react-native-safe-area-context';

const AlarmCommentList = props => {
	// console.log('AlarmCommentList props', props.route.params);
	const navigation = useNavigation();
	const [comments, setComments] = React.useState(false);
	const [commentsLoaded, setCommentsLoaded] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState('');
	const [articleList, setArticleList] = React.useState([]);
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [parentComment, setParentComment] = React.useState(); //대댓글을 쓰는 경우 해당 댓글의 id container
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});
	const [moveToIndex, setMoveToIndex] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const flatListRef = React.useRef();
	const keyboardY = useKeyboardBottom(0 * DP);
	const commentListHeight = React.useRef(100);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		console.log('getCommentList by ', props.route.params.feedobject._id);
		getCommentListByFeedId(
			{
				feedobject_id: props.route.params.feedobject._id,
				request_number: 1000,
				// login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
				setCommentsLoaded(true);
				console.log('comments', comments);
			},
			err => console.log('getCommentListByFeedId', err),
		);
	};

	React.useEffect(() => {
		if (commentsLoaded) {
			comments.forEach((current, index) => {
				// console.log('current', current);
				if (props.route.params.parent) {
					if (current._id == props.route.params.parent) {
						console.log('targeted', current._id, props.route.params.target, index);
						setMoveToIndex(index);
						setTimeout(
							() =>
								flatListRef.current.scrollToIndex(
									{
										animated: true,
										// index: comments.length - index - 1,
										index: index,
									},
									console.log('index 번째로 이동', index),
								),

							500,
						);
					}
				} else {
					if (current._id == props.route.params.target) {
						console.log('targeted', current._id, props.route.params.target, index);
						setMoveToIndex(index);
						setTimeout(
							() =>
								flatListRef.current.scrollToIndex(
									{
										animated: true,
										// index: comments.length - index - 1,
										index: index,
									},
									console.log('index 번째로 이동', index),
								),

							500,
						);
					}
				}
			});
		}

		setLoading(false);
	}, [commentsLoaded]);

	const onPressDelete = id => {
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg.comment_is_delete);
				fetchData();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_contents: editData.comment_contents, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
		};

		if (editData.comment_photo_uri && editData.comment_photo_uri.length > 0) {
			param.comment_photo_uri = editData.comment_photo_uri;
		} else {
			param.comment_photo_remove = true;
		}
		console.log('porps.routename', props.route.name);
		// if (props.route.name == 'FeedCommentList') {
		// 	param = {...param, feedobject_id: props.route.params.feedobject._id};
		// } else if (props.route.name == '동물보호요청') {
		// 	param = {...param, protect_request_object_id: props.route.params.feedobject._id};
		// }
		param = {...param, feedobject_id: props.route.params.feedobject._id};
		if (parentComment) {
			param = {...param, commentobject_id: parentComment._id};
		}

		if (editMode) {
			console.log('댓글편집', editData);
			updateComment(
				{
					...param,
					commentobject_id: editData._id,
				},
				result => {
					console.log(result);
					setParentComment();
					setEditData({
						comment_contents: '',
						comment_photo_uri: '',
					});
					// if (props.route.name == 'FeedCommentList') {
					if (props.route.name == 'AlarmCommentList') {
						getCommentListByFeedId(
							{
								feedobject_id: props.route.params.feedobject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
								setComments(res);
								parentComment && addChildCommentFn.current();
								console.log('comments', comments);
								setPrivateComment(false);
								input.current.blur();
								flatListRef.current.scrollToOffset({offset: 0});
							},
							err => console.log(err),
						);
					}
				},
				err => Modal.alert(err),
			);
		} else {
			createComment(
				param,
				result => {
					console.log(result);
					setParentComment();
					setEditData({
						comment_contents: '',
						comment_photo_uri: '',
					});
					if (props.route.name == 'AlarmCommentList') {
						// if (props.route.name == 'FeedCommentList') {
						getCommentListByFeedId(
							{
								feedobject_id: props.route.params.feedobject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
								setComments(res);
								parentComment && addChildCommentFn.current();
								console.log('comments', comments);
								setPrivateComment(false);
								input.current.blur();
								flatListRef.current.scrollToOffset({offset: 0});
							},
							err => console.log(err),
						);
					}
				},
				err => Modal.alert(err),
			);
		}
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? Modal.popNoBtn('비밀댓글로 설정되었습니다.') : Modal.popNoBtn('댓글이 공개설정되었습니다.');
		setTimeout(() => {
			Modal.close();
		}, 1000);
	};

	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			let selected = props.route.params.selectedPhoto[0];
			setEditData({...editData, comment_photo_uri: selected.cropUri ?? selected.uri});
		}
	}, [props.route.params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		console.log('onAddphoto');
		props.navigation.push('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
	};

	const onDeleteImage = () => {
		console.log('onDelete Img');
		setEditData({...editData, comment_photo_uri: ''});
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		console.log('onChangeReplyInput : ', text);
		setEditData({...editData, comment_contents: text});
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			console.log('onReplyBtnClick : ', parentCommentId);
			setParentComment(parentCommentId);
			input.current.focus();
			editComment || setEditComment(true);
			addChildCommentFn.current = addChildComment;
			// scrollToReplyBox();
			// setPlaceholder('답글입력..');
		}
	};

	const [heightReply, setReplyHeight] = React.useState(0);
	const onReplyBtnLayout = e => {
		console.log('onReplyBtnLayout');
		setReplyHeight(e.nativeEvent.layout.height);
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = comment => {
		console.log('수정 데이터', comment);
		setEditMode(true);
		setEditData({...comment});
		// scrollToReplyBox();
	};
	const scrollToReplyBox = () => {
		flatListRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 0});
		setTimeout(() => {
			input.current?.focus();
		}, 500);
	};
	const renderItem = ({item, index}) => {
		// return item;
		return (
			<View style={[style.commentContainer]} key={item._id} onLayout={onLayoutCommentList}>
				<ParentComment
					parentComment={item}
					onPressReplyBtn={onReplyBtnClick} // 부모 댓글의 답글쓰기 클릭 이벤트
					onEdit={onEdit}
					onPressDelete={onPressDelete}
					onPressDeleteChild={onPressDelete}
					target={props.route.params.target}
					parent={props.route.params.parent}
				/>
			</View>
		);
	};
	const onLayoutCommentList = e => {
		commentListHeight.current = e.nativeEvent.layout.height;
	};
	const Header = () => {
		return (
			<View>
				<FeedContent data={props.route.params.feedobject} showAllContents={true} />

				<View style={[style.replyCountContainer, {alignSelf: 'center', alignItems: 'flex-start'}]}>
					<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개</Text>
				</View>
			</View>
		);
	};

	const Bottom = () => {
		return (
			<View>
				<View style={{height: heightReply + keyboardY}}></View>
				<View style={{position: 'absolute', bottom: keyboardY}} onLayout={onReplyBtnLayout}>
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={onChangeReplyInput}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						onDeleteImage={onDeleteImage}
						privateComment={privateComment}
						ref={input}
						editData={editData}
						shadow={false}
						parentComment={parentComment}
					/>
				</View>
			</View>
		);
	};

	// const components = [header(), commentBox()];
	return (
		<View style={[login_style.wrp_main, feedCommentList.container]}>
			<Header />

			<FlatList
				data={comments}
				renderItem={renderItem}
				listKey={({item, index}) => index}
				// ListHeaderComponent={Header}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
				// ListFooterComponent={Bottom}
				ref={flatListRef}
				showsVerticalScrollIndicator={false}
			/>
			<View style={{position: 'absolute', bottom: keyboardY}} onLayout={onReplyBtnLayout}>
				<ReplyWriteBox
					onAddPhoto={onAddPhoto}
					onChangeReplyInput={onChangeReplyInput}
					onLockBtnClick={onLockBtnClick}
					onWrite={onWrite}
					onDeleteImage={onDeleteImage}
					privateComment={privateComment}
					ref={input}
					editData={editData}
				/>
			</View>
		</View>
	);
};

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
		width: 654 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		alignItems: 'center',
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
	like: {
		width: 654 * DP,
		paddingVertical: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default AlarmCommentList;
