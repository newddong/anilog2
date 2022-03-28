import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {feedCommentList, login_style} from 'Templete/style_templete';
import {createComment, getCommentListByFeedId, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20} from 'Root/config/color';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';

export default FeedCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	// console.log(props.route.name, '코멘트 리스트 네임');
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const keyboardY = useKeyboardBottom(0 * DP);
	const flatlist = React.useRef();
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents:'',
		comment_photo_uri:'',
	});


	React.useEffect(() => {
		if (props.route.name == 'FeedCommentList') {
			getCommentListByFeedId(
				{
					feedobject_id: props.route.params.feedobject._id,
					request_number: 1000,
					login_userobject_id: userGlobalObject.userInfo._id
				},
				comments => {
					setComments(comments.msg);
					console.log('comments', comments);
				},
				err => console.log('getCommentListByFeedId', err),
			);
		} else {
			getCommentListByFeedId(
				{
					feedobject_id: props.route.params.feedobject._id,
					request_number: 1000,
					login_userobject_id: userGlobalObject.userInfo._id
				},
				comments => {
					setComments(comments.msg);
					navigation.setOptions({title: '댓글 ' + comments.msg.length});
				},
				err => console.log('getCommentListByFeedId', err),
			);
		}
	}, []);

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_contents: editData.comment_contents, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
		};

		if(editData.comment_photo_uri&&editData.comment_photo_uri.length>0){
			param.comment_photo_uri = editData.comment_photo_uri;
		}

		if (props.route.name == 'FeedCommentList') {
			param = {...param, feedobject_id: props.route.params.feedobject._id};
		} else if (props.route.name == '동물보호요청') {
			param = {...param, protect_request_object_id: props.route.params.feedobject._id};
		}

		if (parentComment) {
			param = {...param, commentobject_id: parentComment};
		}
		if (editMode) {
			console.log('댓글편집', editData);
			updateComment(
				{
					...param,
					commentobject_id: editData._id,
					comment_photo_remove: !editData.comment_photo_uri ||  editData.comment_photo_uri == 0,
				},
				result => {
					console.log(result);
					setParentComment();
					setEditData({
						comment_contents:'',
						comment_photo_uri:''
					});
					if (props.route.name == 'FeedCommentList') {
						getCommentListByFeedId(
							{
								feedobject_id: props.route.params.feedobject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								setComments(comments.msg);
								parentComment && addChildCommentFn.current();
								console.log('comments', comments);
								input.current.blur();
								flatlist.current.scrollToOffset({offset: 0});
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
						comment_contents:'',
						comment_photo_uri:''
					});
					if (props.route.name == 'FeedCommentList') {
						getCommentListByFeedId(
							{
								feedobject_id: props.route.params.feedobject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								setComments(comments.msg);
								parentComment && addChildCommentFn.current();
								console.log('comments', comments);
								input.current.blur();
								flatlist.current.scrollToOffset({offset: 0});
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
		!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		console.log('onAddphoto')
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
		})
			.then(images => {
				console.log('onAddphoto Imagepicker', images);
				setEditData({...editData,comment_photo_uri:images.path});
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	const onDeleteImage = () => {
		console.log('onDelete Img')
		setEditData({...editData,comment_photo_uri:''});
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
	};

	const render = ({item, index}) => {
		if (index == 0)
			return (
				<View style={{justifyContent: 'flex-end', paddingBottom: 10 * DP, height: 60 * DP, backgroundColor: '#FFF', paddingHorizontal: 48 * DP}}>
					<Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>
				</View>
			);
		if (index > 0)
			return (
				<View style={{marginLeft: 48 * DP}}>
					<CommentList items={item} onPressReplyBtn={onReplyBtnClick} onEdit={onEdit} />
				</View>
			);
	};
	const currentPosition = React.useRef(0);
	const onScroll = e => {
		currentPosition.current = e.nativeEvent.contentOffset.y;
	};

	return (
		<View style={[login_style.wrp_main, feedCommentList.container]}>
			<FlatList
				data={[{}, comments]}
				extraData={refresh}
				renderItem={render}
				stickyHeaderIndices={[1]}
				ListHeaderComponent={<FeedContent data={props.route.params.feedobject} showAllContents={props.route.params.showAllContents} />}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
				onScroll={onScroll}
				ref={flatlist}
			/>
			{/* Parent Comment 혹은 Child Comment 에서 답글쓰기를 클릭할 시 화면 최하단에 등장 */}
			{/* 비로그인 유저일 경우 리플란이 안보이도록 처리 - 상우 */}
			{userGlobalObject.userInfo._id != '' && (editComment || props.route.name == 'FeedCommentList') ? (
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
			) : (
				false
			)}
		</View>
	);
};
//PR충돌로 인한 해결