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
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import ImagePicker from 'react-native-image-crop-picker';

/**
 * 자유게시글 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 자유 게시글 오브젝트
 */
export default ArticleDetail = props => {
	const navigation = useNavigation();
	// const [data, setData] = React.useState(props.route.params.community_object);
	const data = props.route.params.community_object;
	const [comments, setComments] = React.useState('false');
	const [articleList, setArticleList] = React.useState([]);
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [parentComment, setParentComment] = React.useState();
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});

	React.useEffect(() => {
		getComment();
		getArticleList();
		navigation.setOptions({title: '자유 게시글'});
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
			setComments([]),
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
		}

		if (parentComment) {
			//대댓글일 경우 해당 부모 댓글에 대한 댓글을 추가
			param = {...param, commentobject_id: parentComment};
		} else {
			//부모댓글에 쓰는 경우가 아니라면 community 게시글에 대한 댓글을 추가
			param = {...param, community_object_id: data._id};
		}

		if (editMode) {
			updateComment(
				{
					...param,
					commentobject_id: editData._id,
					comment_photo_remove: !editData.comment_photo_uri || editData.comment_photo_uri == 0,
				},
				result => {
					console.log(result);
					setParentComment();
					setEditData({
						comment_contents: '',
						comment_photo_uri: '',
					});
					getCommentListByCommunityId(
						{
							community_object_id: data._id,
							request_number: 1000,
						},
						comments => {
							!parentComment && setComments([]); //댓글목록 초기화
							setComments(comments.msg);
							parentComment && addChildCommentFn.current();
							// console.log('comments', comments);
						},
						err => console.log('getCommentListByFeedId', err),
					);
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
					getCommentListByCommunityId(
						{
							community_object_id: data._id,
							request_number: 1000,
						},
						comments => {
							!parentComment && setComments([]); //댓글목록 초기화
							setComments(comments.msg);
							parentComment && addChildCommentFn.current();
							console.log('comments', comments);
							input.current.blur();
							// scrollRef.current.scrollToOffset({offset: 0});
						},
						err => console.log('getCommentListByFeedId', err),
					);
				},
				err => Modal.alert(err),
			);
		}
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		console.log('onAddphoto');
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
		})
			.then(images => {
				console.log('onAddphoto Imagepicker', images);
				setEditData({...editData, comment_photo_uri: images.path});
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
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
		console.log('onReplyBtnClick : ', parentCommentId);
		setParentComment(parentCommentId);
		input.current.focus();
		editComment || setEditComment(true);
		addChildCommentFn.current = addChildComment;
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = comment => {
		console.log('수정 데이터', comment);
		setEditMode(true);
		setEditData({...comment});
		input.current?.focus();
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// console.log('dummy', dummy[index]);
		navigation.push('ArticleDetail', {community_object: dum[index]});
	};

	const onPressReply = () => {
		navigation.push('CommunityCommentList', {community_object: data});
	};

	const freeBoardContent = () => {};

	if (comments == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<View style={[{alignItems: 'center', paddingBottom: 40 * DP}]}>
					<FlatList
						data={[{}]}
						listKey={({item, index}) => index}
						renderItem={({item, index}) => {
							return (
								<View style={[{width: 750 * DP, alignItems: 'center'}]}>
									<View style={{alignItems: 'center'}}>
										<Article data={data} onPressMeatball={onPressMeatball} route={props.route.name} />
										<View style={[style.separator]} />
									</View>
									{comments && comments.length > 0 ? (
										<TouchableOpacity onPress={onPressReply} style={[style.replyCountContainer]}>
											<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개 모두 보기</Text>
										</TouchableOpacity>
									) : (
										<View style={[style.replyCountContainer, {alignSelf: 'center', alignItems: 'flex-start'}]}>
											<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개</Text>
										</View>
									)}
									<View style={[style.commentContainer]}>
										<CommentList items={comments} onPressReplyBtn={onReplyBtnClick} onEdit={onEdit} />
									</View>
									<View style={[{marginTop: 40 * DP, marginBottom: 80 * DP}]}>
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
									<ArticleList
										items={articleList}
										onPressArticle={onPressArticle} //게시글 내용 클릭
									/>
								</View>
							);
						}}
						showsVerticalScrollIndicator={false}
						// ListHeaderComponent={freeBoardContent}
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
		width: 654 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
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
