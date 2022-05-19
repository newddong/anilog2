import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList, Keyboard, Platform, ActivityIndicator, Animated} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {feedCommentList, login_style} from 'Templete/style_templete';
import {createComment, deleteComment, getCommentListByFeedId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import Loading from 'Root/component/molecules/modal/Loading';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {deleteFeed} from 'Root/api/feedapi';

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
		comment_contents: '',
		comment_photo_uri: '',
	});
	const [isLoading, setIsLoading] = React.useState(true);
	const [childOpenList, setChildOpenList] = React.useState([]);

	React.useEffect(() => {
		if (props.route.name == 'FeedCommentList') {
			fetchData();
		} else {
			getCommentListByFeedId(
				{
					feedobject_id: props.route.params.feedobject._id,
					request_number: 1000,
					login_userobject_id: userGlobalObject.userInfo._id,
				},
				comments => {
					setComments(comments.msg);
					navigation.setOptions({title: '댓글 ' + comments.msg.length});
				},
				err => {
					console.log('getCommentListByFeedId', err);
				},
			);
		}
		props.route.params.showKeyboard
			? setTimeout(() => {
					input.current.focus();
			  }, 200)
			: false;

		if (props.route.params.edit != undefined) {
			// 실종,제보에서 댓글 수정 클릭시 수정데이터 덮어씌우고 스크롤 수행
			setEditMode(true);
			setEditData({...props.route.params.edit});
			if (props.route.params.edit.isChild) {
				let copy = [...childOpenList];
				copy.push(props.route.params.edit.comment_index);
				console.log('copy', copy);
				setChildOpenList(copy);
			}
			setTimeout(() => {
				input.current.focus();
			}, 200);
		} else if (props.route.params.reply != undefined) {
			console.log('props.route.params.reply', props.route.params.reply.comment_index);
			let copy = [...childOpenList];
			copy.push(props.route.params.reply.comment_index);
			setChildOpenList(copy);
			setTimeout(() => {
				input.current.focus();
			}, 200);
		}
	}, []);

	const fetchData = () => {
		getCommentListByFeedId(
			{
				feedobject_id: props.route.params.feedobject._id,
				request_number: 1000,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				console.log('getCommentListByFeedId', comments.msg.length);
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
				setIsLoading(false);
				if (props.route.params.edit != undefined) {
					scrollToReply(props.route.params.edit.comment_index || 0);
				} else if (props.route.params.reply != undefined) {
					setParentComment(props.route.params.reply);
					scrollToReply(props.route.params.reply.comment_index || 0);
				}
				// console.log('getCommentListByFeedId / result', comments);
			},
			err => {
				console.log('getCommentListByFeedId', err);
				setIsLoading(false);
				if (err == '검색 결과가 없습니다.') {
					setComments([]);
				}
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());
			Modal.popLoading(true);

			let param = {
				comment_contents: editData.comment_contents, //내용
				comment_is_secure: privateComment, //공개여부 테스트때 반영
			};

			if (editData.comment_photo_uri && editData.comment_photo_uri.length > 0) {
				param.comment_photo_uri = editData.comment_photo_uri;
			} else {
				param.comment_photo_remove = true;
			}
			param.comment_photo_uri = editData.comment_photo_uri == '' ? 'https:// ' : editData.comment_photo_uri;

			if (props.route.name == 'FeedCommentList') {
				param = {...param, feedobject_id: props.route.params.feedobject._id};
			} else if (props.route.name == '동물보호요청') {
				param = {...param, protect_request_object_id: props.route.params.feedobject._id};
			}

			if (parentComment) {
				param = {...param, commentobject_id: parentComment._id};
			}

			if (editMode) {
				let whichComment = comments.findIndex(e => e._id == editData._id);
				delete param.comment_is_secure;
				updateComment(
					{
						...param,
						comment_is_secure: privateComment,
						commentobject_id: editData._id,
					},
					result => {
						// console.log(result);
						setParentComment();
						setEditData({
							comment_contents: '',
							comment_photo_uri: '',
						});
						if (props.route.name == 'FeedCommentList') {
							getCommentListByFeedId(
								{
									feedobject_id: props.route.params.feedobject._id,
									request_number: 1000,
								},
								comments => {
									// console.log('comments', comments);
									!parentComment && setComments([]); //댓글목록 초기화
									let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
									setComments(res);
									parentComment && addChildCommentFn.current();
									setPrivateComment(false);
									setEditMode(false);
									input.current.blur();
									Modal.close();
									setTimeout(() => {
										flatlist.current.scrollToIndex({animated: true, index: whichComment == -1 ? editData.parent : whichComment, viewPosition: 0.5});
									}, 500);
									setTimeout(() => {
										if (whichComment == -1) {
											let copy = [...childOpenList];
											copy.push(editData.parent);
											console.log('copy', copy);
											setChildOpenList(copy);
										}
									}, 200);
								},
								err => {
									console.log(err);
									Modal.close();
								},
							);
						}
					},
					err => Modal.alert('updateComment' + err),
				);
			} else {
				let whichParent = '';
				if (parentComment) {
					whichParent = comments.findIndex(e => e._id == param.commentobject_id);
				}
				createComment(
					param,
					result => {
						setParentComment();
						setEditData({
							comment_contents: '',
							comment_photo_uri: '',
						});
						if (props.route.name == 'FeedCommentList') {
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
									setPrivateComment(false);
									setEditMode(false);
									// console.log('comments', comments);
									input.current.blur();
									Modal.close();
									setTimeout(() => {
										whichParent == '' || whichParent == -1
											? flatlist.current.scrollToIndex({animated: true, index: 0, viewPosition: 0.5})
											: flatlist.current.scrollToIndex({animated: true, index: whichParent, viewPosition: 1});
									}, 500);
								},
								err => {
									console.log(err);
									Modal.close();
								},
							);
						}
					},
					err => Modal.alert('createComment' + err),
				);
			}
		}
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		// setEditData({...editData, comment_is_secure: !editData.comment_is_secure});
		setPrivateComment(!privateComment);
		!privateComment ? Modal.popNoBtn('비밀댓글로 설정되었습니다.') : Modal.popNoBtn('댓글이 공개설정되었습니다.');
		setTimeout(() => {
			Modal.close();
		}, 1000);
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

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
	};

	//댓글 사진을 취소할 때(X마크 클릭)
	const onDeleteImage = () => {
		console.log('onDelete Img');
		setEditData({...editData, comment_photo_uri: ''});
	};

	//댓글 미트볼 -> 삭제클릭
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

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		// console.log('onReplyBtnClick : ', parentCommentId);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setParentComment(parentCommentId);
			const findParentIndex = comments.findIndex(e => e._id == parentCommentId._id);
			input.current.focus();
			// console.log('findParentIndex', findParentIndex);
			scrollToReply(findParentIndex);
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
			editComment || setEditComment(true);
			addChildCommentFn.current = addChildComment;
		}
	};

	//특정 댓글로 스크롤 이동 함수
	const scrollToReply = i => {
		if (Platform.OS == 'ios') {
			setTimeout(() => {
				flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
			}, 200);
		} else {
			flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
		}
	};

	//답글 더보기 클릭
	const showChild = index => {
		scrollToReply(index);
	};

	const [heightReply, setReplyHeight] = React.useState(0);

	const onReplyBtnLayout = e => {
		setReplyHeight(e.nativeEvent.layout.height);
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent) => {
		// console.log('수정 데이터', comment.comment_is_secure);
		const findParentIndex = comments.findIndex(e => e._id == parent);
		setEditMode(true);
		setParentComment(); // 수정모드로 전환시
		setPrivateComment(comment.comment_is_secure);
		setEditData({...comment, parent: findParentIndex});
		setTimeout(() => {
			input.current.focus();
		}, 200);
		scrollToReply(findParentIndex);
	};

	//미트볼의 삭제버튼을 클릭
	const deleteFeedItem = id => {
		Modal.close();
		setTimeout(() => {
			Modal.popLoading(true);
			deleteFeed(
				{feed_object_id: id},
				result => {
					// console.log('result / DeleteFeed / FeedContent : ', result.msg);
					Modal.close();
					if (props.navigation.getState().routes[0].name == 'ProtectionTab') {
						navigation.navigate('ProtectionTab');
					} else {
						console.log(props.navigation.getState().routes);
						navigation.goBack();
					}
				},
				err => {
					console.log('err / DeleteFeed / FeedContent : ', err);
					Modal.close();
					setTimeout(() => {
						Modal.alert('네트워크 오류입니다.');
					}, 100);
				},
			);
		}, 100);
	};

	//댓글 수정 => 키보드 해제시 수정모드가 종료되도록 적용
	React.useEffect(() => {
		const cancelEditMode = () => {
			setPrivateComment(false);
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
		};
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			cancelEditMode();
		});
		return () => {
			didhide.remove();
		};
	}, []);

	const header = () => {
		return (
			<>
				<FeedContent
					data={props.route.params.feedobject}
					deleteFeed={deleteFeedItem}
					showAllContents={props.route.params.showAllContents}
					routeName={props.route.name}
				/>
				<View style={[{width: 654 * DP, height: 2 * DP, marginTop: 10 * DP, backgroundColor: GRAY40, alignSelf: 'center'}]} />
				<View style={[{width: 654 * DP, alignSelf: 'center', marginTop: 20 * DP}]}>
					{comments.length == 0 ? <></> : <Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개</Text>}
				</View>
			</>
		);
	};

	const renderItem = ({item, index}) => {
		const isOpen = childOpenList.includes(index);

		//수정 혹은 답글쓰기 때, 대상 부모 댓글의 배경색을 바꾸는 함수
		const getBgColor = () => {
			let result = WHITE;
			if (editMode && editData.parent == index) {
				result = GRAY40;
			} else if (parentComment && parentComment._id == item._id) {
				result = GRAY40;
			}
			return result;
		};

		return (
			<View style={[feedCommentList.commentContainer, {backgroundColor: getBgColor()}]} key={item._id}>
				<ParentComment
					parentComment={item}
					onPressReplyBtn={onReplyBtnClick} // 부모 댓글의 답글쓰기 클릭 이벤트
					onEdit={onEdit}
					onPressDelete={onPressDelete}
					onPressDeleteChild={onPressDelete}
					showChild={() => showChild(index)}
					openChild={isOpen}
				/>
			</View>
		);
	};

	return (
		<View style={[login_style.wrp_main, feedCommentList.container]}>
			<FlatList
				data={comments}
				extraData={refresh}
				renderItem={renderItem}
				listKey={({item, index}) => index}
				removeClippedSubviews={false}
				ListHeaderComponent={header()}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
				ListEmptyComponent={
					isLoading ? (
						<Loading isModal={false} />
					) : (
						<Text style={[txt.roboto28b, {color: GRAY10, paddingVertical: 40 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>
					)
				}
				onScrollToIndexFailed={err => {
					setTimeout(() => {
						if (comments.length !== 0 && flatlist !== null) {
							flatlist.current.scrollToIndex({index: err.index != -1 ? err.index : 0, animated: true, viewPosition: 0});
						}
					}, 200);
				}}
				ref={flatlist}
			/>
			{/* Parent Comment 혹은 Child Comment 에서 답글쓰기를 클릭할 시 화면 최하단에 등장 */}
			{/* 비로그인 유저일 경우 리플란이 안보이도록 처리 - 상우 */}
			{userGlobalObject.userInfo._id != '' && (editComment || props.route.name == 'FeedCommentList') ? (
				<View style={{position: 'absolute', bottom: keyboardY - 2}} onLayout={onReplyBtnLayout}>
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={onChangeReplyInput}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						onDeleteImage={onDeleteImage}
						privateComment={privateComment}
						ref={input}
						editData={editData}
						parentComment={editMode ? '' : parentComment} //댓글 수정모드일 때 부모댓글 정보를 막는다
						onCancelChild={onCancelChild}
					/>
				</View>
			) : (
				false
			)}
		</View>
	);
};
