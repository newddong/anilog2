import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {createComment, deleteComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20} from 'Root/config/color';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import community_obj from 'Root/config/community_obj';
import Loading from 'Root/component/molecules/modal/Loading';
import AniButton from 'Root/component/molecules/button/AniButton';

export default CommunityCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	// console.log(props.route.name, '코멘트 리스트 네임');
	const data = props.route.params.community_object;
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [comments, setComments] = React.useState('false');
	const [parentComment, setParentComment] = React.useState();
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const keyboardY = useKeyboardBottom(0 * DP);
	const flatlist = React.useRef();
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});

	React.useEffect(() => {
		fetchData();
		navigation.setOptions({title: '댓글 쓰기'});
	}, []);

	const fetchData = () => {
		getCommentListByCommunityId(
			{
				community_object_id: data._id,
				request_number: 1000,
			},
			comments => {
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
				// console.log('comments', comments);
				Modal.close();
			},
			err => {
				console.log('err / getCommentListByCommunityId', err);
				if (err == '검색 결과가 없습니다.') {
					setComments([]);
				}
				Modal.close();
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_contents: editData.comment_contents, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
			community_object_id: data._id,
		};

		// if (editData.comment_photo_uri && editData.comment_photo_uri.length > 0) {
		// 	param.comment_photo_uri = editData.comment_photo_uri;
		// }

		if (editData.comment_photo_uri && editData.comment_photo_uri.length > 0) {
			param.comment_photo_uri = editData.comment_photo_uri;
		} else {
			param.comment_photo_remove = true;
		}
		param.comment_photo_uri = editData.comment_photo_uri == '' ? 'https:// ' : editData.comment_photo_uri;

		if (parentComment) {
			param = {...param, commentobject_id: parentComment._id};
		}
		if (editMode) {
			console.log('댓글편집', editData);
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
							let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
							setComments(res);
							parentComment && addChildCommentFn.current();
							setPrivateComment(false);
							setEditMode(false);
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
							let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
							setComments(res);
							parentComment && addChildCommentFn.current();
							setPrivateComment(false);
							setEditMode(false);
							input.current.blur();
							flatlist.current.scrollToOffset({offset: 0});
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
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			setPrivateComment(!privateComment);
			!privateComment ? Modal.popNoBtn('비밀댓글로 설정되었습니다.') : Modal.popNoBtn('댓글이 공개설정되었습니다.');
			setTimeout(() => {
				Modal.close();
			}, 1000);
		}
	};

	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			let selected = props.route.params.selectedPhoto[0];
			setEditData({...editData, comment_photo_uri: selected.cropUri ?? selected.uri});
		}
	}, [props.route.params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			console.log('onAddphoto');
			props.navigation.push('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
			// ImagePicker.openPicker({
			// 	compressImageQuality: 0.8,
			// 	cropping: true,
			// })
			// 	.then(images => {
			// 		console.log('onAddphoto Imagepicker', images);
			// 		setEditData({...editData, comment_photo_uri: images.path});
			// 		Modal.close();
			// 	})
			// 	.catch(err => console.log(err + ''));
			// Modal.close();
		}
	};

	const onDeleteImage = () => {
		console.log('onDelete Img');
		setEditData({...editData, comment_photo_uri: ''});
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
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
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
			editComment || setEditComment(true);
			addChildCommentFn.current = addChildComment;
		}
	};

	const [heightReply, setReplyHeight] = React.useState(0);
	const onReplyBtnLayout = e => {
		console.log('onReplyBtnLayout');
		setReplyHeight(e.nativeEvent.layout.height);
	};

	//댓글 대댓글 삭제
	const onPressDelete = id => {
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				// console.log('result / delectComment / ProtectCommentList : ', result.msg.comment_is_delete);
				Modal.popLoading();
				fetchData();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
			},
		);
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = comment => {
		console.log('수정 데이터', comment.comment_is_secure);
		setEditMode(true);
		setParentComment(); // 수정모드로 전환시 기존의 답글쓰기 데이터 출력 취소
		setPrivateComment(comment.comment_is_secure);
		setEditData({...comment});
		input.current.focus();
	};

	const render = ({item, index}) => {
		if (index == 0)
			return (
				<View style={[style.commentLength]}>
					{comments.length == 0 ? <></> : <Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>}
				</View>
			);
		if (index > 0)
			return (
				<View style={{marginLeft: 20 * DP, paddingBottom: 50 * DP}}>
					<CommentList
						items={item}
						onPressReplyBtn={onReplyBtnClick}
						onEdit={onEdit}
						onPressDelete={onPressDelete}
						onPressDeleteChild={onPressDelete}
					/>
				</View>
			);
	};
	const currentPosition = React.useRef(0);
	const onScroll = e => {
		currentPosition.current = e.nativeEvent.contentOffset.y;
	};

	const scrollToD = () => {
		flatlist.current.scrollToIndex({index: 1, animated: true});
	};

	return (
		<View style={[style.container]}>
			{/* <AniButton onPress={scrollToD} /> */}
			{comments == 'false' ? (
				<Loading isModal={false} />
			) : (
				<FlatList
					data={[{}, comments]}
					extraData={refresh}
					renderItem={render}
					// stickyHeaderIndices={[1]}
					ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
					onScroll={onScroll}
					ref={flatlist}
					showsVerticalScrollIndicator={false}
				/>
			)}
			{/* Parent Comment 혹은 Child Comment 에서 답글쓰기를 클릭할 시 화면 최하단에 등장 */}
			{/* 비로그인 유저일 경우 리플란이 안보이도록 처리 - 상우 */}
			{userGlobalObject.userInfo._id != '' ? (
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
						parentComment={parentComment}
						onCancelChild={onCancelChild}
					/>
				</View>
			) : (
				false
			)}
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		// backgroundColor: 'yellow',
	},
	commentLength: {
		justifyContent: 'flex-end',
		paddingBottom: 20 * DP,
		height: 60 * DP,
		paddingHorizontal: 22 * DP,
		// backgroundColor: 'yellow',
	},
});
