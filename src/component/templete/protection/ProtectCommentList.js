import React from 'react';
import {Text, View, FlatList, StyleSheet, Platform, Keyboard} from 'react-native';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {createComment, deleteComment, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10, GRAY40, WHITE} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {useNavigation} from '@react-navigation/core';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import Loading from 'Root/component/molecules/modal/Loading';
import {feedCommentList} from '../style_templete';

export default ProtectCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const input = React.useRef();
	const flatlist = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const data = props.route.params.protectObject;
	const [heightReply, setReplyHeight] = React.useState(0); //키보드 리플박스 높이
	const keyboardY = useKeyboardBottom(0 * DP);
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});
	const [childOpenList, setChildOpenList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetchData();
		props.route.params.showKeyboard
			? setTimeout(() => {
					input.current.focus();
			  }, 200)
			: false;

		if (props.route.params.edit != undefined) {
			setEditMode(true);
			setEditData({...props.route.params.edit});
			if (props.route.params.edit.isChild) {
				let copy = [...childOpenList];
				copy.push(props.route.params.edit.comment_index);
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
		getCommentListByProtectId(
			{
				protect_request_object_id: data,
				request_number: 1000,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
				setIsLoading(false);
				if (props.route.params.edit != undefined) {
					scrollToReply(props.route.params.edit.comment_index || 0);
				} else if (props.route.params.reply != undefined) {
					setParentComment(props.route.params.reply);
					scrollToReply(props.route.params.reply.comment_index || 0);
				}
				// console.log('comments', comments);
			},
			err => {
				console.log('err', err);
				setIsLoading(false);
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

			if (parentComment) {
				// console.log('parentComment ProtectComment ', parentComment);
				param = {...param, commentobject_id: parentComment._id};
			} else {
				param = {...param, protect_request_object_id: data._id};
			}

			if (editMode) {
				let whichComment = comments.findIndex(e => e._id == editData._id);
				delete param.protect_request_object_id;
				updateComment(
					{
						...param,
						commentobject_id: editData._id,
					},
					result => {
						setParentComment();
						setEditData({
							comment_contents: '',
							comment_photo_uri: '',
						});
						getCommentListByProtectId(
							{
								protect_request_object_id: props.route.params.protectObject._id,
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
								setTimeout(() => {
									console.log('whichComment', whichComment);
									console.log('editData.parent', editData.parent);
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
							err => console.log(err),
						);
					},
					err => console.log(err),
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
						getCommentListByProtectId(
							{
								protect_request_object_id: props.route.params.protectObject._id,
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
								setTimeout(() => {
									console.log('whichParent', whichParent);
									whichParent == '' || whichParent == -1
										? flatlist.current.scrollToIndex({animated: true, index: 0, viewPosition: 0})
										: flatlist.current.scrollToIndex({animated: true, index: whichParent, viewPosition: 0});
								}, 500);
							},
							err => console.log(err),
						);
					},
					err => console.log(err),
				);
			}
		}
	};

	//페이지 상단 보호소 프로필 클릭
	const onClickShelterLabel = () => {
		navigation.push('UserProfile', {userobject: data.protect_request_writer_id});
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setPrivateComment(!privateComment);
			!privateComment ? Modal.popNoBtn('비밀댓글로 설정되었습니다.') : Modal.popNoBtn('댓글이 공개설정되었습니다.');
			setTimeout(() => {
				Modal.close();
			}, 1000);
		}
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
		setKeyboardVisible(false);
		setEditMode(false);
		setEditData({
			comment_contents: '',
			comment_photo_uri: '',
		});
	};

	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			let selected = props.route.params.selectedPhoto[0];
			setEditData({...editData, comment_photo_uri: selected.cropUri ?? selected.uri});
		}
	}, [props.route.params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			props.navigation.push('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
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

	const onDeleteImage = () => {
		setEditData({...editData, comment_photo_uri: ''});
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent) => {
		// console.log('수정 데이터', comment.comment_is_secure);
		const findParentIndex = comments.findIndex(e => e._id == parent);
		setEditMode(true);
		setPrivateComment(comment.comment_is_secure);
		setParentComment(); // 수정모드로 전환시
		setEditData({...comment, parent: findParentIndex});
		setTimeout(() => {
			input.current.focus();
		}, 200);
		scrollToReply(findParentIndex);
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

	//댓글 삭제
	const onPressDelete = id => {
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg);
				fetchData();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
			},
		);
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			// console.log('parentCommentId', parentCommentId);
			setParentComment(parentCommentId);
			const findParentIndex = comments.findIndex(e => e._id == parentCommentId._id);
			input.current.focus();
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

	//답글 더보기 클릭
	const showChild = index => {
		scrollToReply(index);
	};

	const onReplyBtnLayout = e => {
		setReplyHeight(e.nativeEvent.layout.height);
	};

	const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

	React.useEffect(() => {
		if (!isKeyboardVisible) {
			if (editMode) {
				//키보드가 해제될 때, 수정모드일 때는 모든 데이터를 초기화, 댓글 및 대댓글 작성 상태는 유지
				setEditData({
					comment_contents: '',
					comment_photo_uri: '',
				});
				setPrivateComment(false);
				setEditMode(false);
			}
		}
	}, [isKeyboardVisible]);

	//댓글 수정 => 키보드 해제시 수정모드가 종료되도록 적용
	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardVisible(true);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardVisible(false);
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			setKeyboardVisible(true);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			setKeyboardVisible(false);
		});
		return () => {
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	}, []);

	const render = ({item, index}) => {
		const isOpen = childOpenList.includes(index);
		if (isOpen) {
			console.log('isOpen', index, isOpen);
		}
		//수정 혹은 답글쓰기 때, 대상 부모 댓글의 배경색을 바꾸는 함수
		const getBgColor = () => {
			let result = WHITE;
			if (editMode && editData.parent == index && editData._id == item._id) {
				result = GRAY40;
			} else if (parentComment && parentComment._id == item._id) {
				result = GRAY40;
			}
			return result;
		};
		return (
			<View style={[feedCommentList.commentContainer, {backgroundColor: getBgColor(), alignItems: 'center', width: 750 * DP}]} key={item._id}>
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

	const header = () => {
		return (
			<View style={[style.contentContainer]}>
				<View style={[style.content_container_label]}>
					<ShelterSmallLabel data={data.protect_request_writer_id} onClickLabel={onClickShelterLabel} />
				</View>
				<View style={[style.cotent_container_header]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>보호요청</Text>
					<Text style={[txt.noto32b, {}]}>{data.protect_request_title || ''}</Text>
				</View>
				<View style={{height: 2 * DP, width: 694 * DP, backgroundColor: GRAY40, marginVertical: 30 * DP}}></View>
				<View style={{alignItems: 'flex-end', width: 694 * DP}}>
					{comments.length == 0 ? <></> : <Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>}
				</View>
			</View>
		);
	};

	return (
		<View style={[{alignItems: 'center', flex: 1, backgroundColor: '#fff'}]}>
			<FlatList
				data={comments}
				ref={flatlist}
				extraData={refresh}
				renderItem={render}
				showsVerticalScrollIndicator={false}
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
			/>
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
					parentComment={parentComment}
					onCancelChild={onCancelChild}
					viewMode={!isKeyboardVisible}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	contentContainer: {
		width: 750 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		marginBottom: 20 * DP,
		// backgroundColor: 'lightblue',
	},
	cotent_container_header: {
		width: 694 * DP,
		marginTop: 20 * DP,
	},
	content_container_label: {
		width: 694 * DP,
		marginTop: 15 * DP,
		flexDirection: 'row',
	},
	cotent_container_info: {
		width: 694 * DP,
		marginBottom: 20 * DP,
	},
});
