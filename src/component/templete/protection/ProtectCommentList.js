import React from 'react';
import {Text, View, FlatList, StyleSheet, Platform, Keyboard, ActivityIndicator} from 'react-native';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {createComment, deleteComment, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10, GRAY40, WHITE} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {KeyBoardEvent, useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {useNavigation} from '@react-navigation/core';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {NETWORK_ERROR, REGISTERING_COMMENT} from 'Root/i18n/msg';

export default ProtectCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const [refresh, setRefresh] = React.useState(true);
	const [heightReply, setReplyHeight] = React.useState(0); //키보드 리플박스 높이
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [childOpenList, setChildOpenList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [editData, setEditData] = React.useState({comment_contents: '', comment_photo_uri: ''});
	const input = React.useRef();
	const flatlist = React.useRef();
	const replyFromDetailRef = React.useRef(true); //실종,제보 상세글에서 답글쓰기를 누르고 왔을 경우 대상 댓글 스타일 적용 여부
	const editFromDetailRef = React.useRef(true); //실종,제보 상세글에서 수정을 누르고 왔을 경우 대상 댓글 스타일 적용 여부
	const addChildCommentFn = React.useRef(() => {});
	const data = props.route.params.protectObject;
	const keyboardY = useKeyboardBottom(0 * DP);
	const params = props.route.params;

	React.useEffect(() => {
		fetchData();
		params.showKeyboard
			? setTimeout(() => {
					input.current.focus();
			  }, 200)
			: false;

		// 실종,제보에서 댓글 수정 클릭시 수정데이터 덮어씌우고 스크롤 수행
		if (params.edit && editFromDetailRef) {
			// console.log('params.edit', params.edit);
			setEditMode(true);
			setEditData({...params.edit, parent: params.edit.comment_index});
			if (params.edit.isChild) {
				let copy = [...childOpenList];
				copy.push(params.edit.comment_index);
				setChildOpenList(copy);
			}
		}
	}, []);

	const fetchData = parent => {
		getCommentListByProtectId(
			{
				protect_request_object_id: data,
				request_number: 1000,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				if (parent) {
					const findIndex = res.findIndex(e => e._id == parent._id); //댓글 삭제 후
					res.map((v, i) => {
						res[i].isDeleted = i == findIndex ? true : false;
					});
				} else {
					res.map((v, i) => {
						res[i].isDeleted = false;
					});
				}

				setComments(res);
				setIsLoading(false);
				if (params.edit && editFromDetailRef) {
					// console.log('params.edit', params.edit.comment_contents);
					scrollToReply(params.edit.comment_index || 0, params.edit.viewOffset, 'fetchData');
					editFromDetailRef.current = false;
					setTimeout(() => {
						input.current.focus();
					}, 200);
				}
			},
			err => {
				console.log('err', err);
				setIsLoading(false);
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		input.current.blur();
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());
			Modal.popNoBtn(REGISTERING_COMMENT);

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
				param = {...param, commentobject_id: parentComment._id};
			} else {
				param = {...param, protect_request_object_id: data._id};
			}

			if (editMode) {
				console.log('editMode', param);
				let whichComment = comments.findIndex(e => e._id == editData._id);
				delete param.protect_request_object_id;
				updateComment(
					{
						...param,
						commentobject_id: editData._id,
					},
					result => {
						setParentComment();
						setEditData({comment_contents: '', comment_photo_uri: ''});
						getCommentListByProtectId(
							{
								protect_request_object_id: params.protectObject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
								if (editData.parent != undefined && editData.children_count == 0) {
									res.map((v, i) => {
										res[i].isEdited = i == editData.parent ? true : false;
									});
								} else {
									res.map((v, i) => {
										res[i].isEdited = false;
									});
								}
								setComments(res);
								res.map((v, i) => {
									console.log('i', i, v.comment_is_like);
								});
								setPrivateComment(false);
								setEditMode(false);
								// console.log('editData.parent', editData.parent, 'whichComment', whichComment);
								scrollToReply(whichComment == -1 ? editData.parent || 0 : whichComment, 0, 'updateComment');
								parentComment && addChildCommentFn.current();
								Modal.close();
							},
							err => {
								console.log('getCommentListByProtectId / err / ProtectCommentList :', err);
								Modal.close();
							},
						);
					},
					err => {
						console.log('updateComment / err / ProtectCommentList :', err);
						Modal.close();
					},
				);
			} else {
				let whichParent = '';
				if (parentComment) {
					whichParent = comments.findIndex(e => e._id == param.commentobject_id);
				}
				console.log('createMode', param);
				createComment(
					param,
					result => {
						setParentComment();
						setEditData({comment_contents: '', comment_photo_uri: ''});
						getCommentListByProtectId(
							{
								protect_request_object_id: params.protectObject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
								setComments(res);
								setPrivateComment(false);
								setEditMode(false);
								setTimeout(() => {
									flatlist.current?.scrollToIndex({
										animated: true,
										index: whichParent != '' ? whichParent : 0,
										viewPosition: whichParent != '' ? 0 : 0,
									});
								}, 500);
								parentComment && addChildCommentFn.current();
								Modal.close();
							},
							err => {
								Modal.close();
								setTimeout(() => {
									Modal.alert(NETWORK_ERROR);
								}, 200);
								console.log('getCommentListByProtectId err ', err);
							},
						);
					},
					err => {
						Modal.close();
						setTimeout(() => {
							Modal.alert(NETWORK_ERROR);
						}, 200);
						console.log('createComment err ', err);
					},
				);
			}
		}
	};

	//페이지 상단 보호소 프로필 클릭
	const onClickShelterLabel = () => {
		navigation.navigate({key: data.protect_request_writer_id._id, name: 'UserProfile', params: {userobject: data.protect_request_writer_id}});
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

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
		setKeyboardVisible(false);
		setEditMode(false);
		setEditData({comment_contents: '', comment_photo_uri: ''});
	};

	React.useEffect(() => {
		if (params.selectedPhoto && params.selectedPhoto.length > 0) {
			let selected = params.selectedPhoto[0];
			const checkEdit = comment_obj.editData._id != ''; //전역변수에 저장된 수정데이터가 있을 경우 수정데이터(editData)에 선택한 사진을 저장
			if (checkEdit) {
				setEditMode(true);
				setEditData({...comment_obj.editData, comment_photo_uri: selected.cropUri ?? selected.uri});
			} else {
				setEditData({...editData, comment_photo_uri: selected.cropUri ?? selected.uri});
			}
			//전역변수에 저장된 부모댓글 데이터가 있을 경우 부모댓글 다시 지정
			if (comment_obj.parentComment && comment_obj.parentComment._id != '') {
				setParentComment(comment_obj.parentComment);
			}
			//수정 데이터 전역변수 초기화
			comment_obj.editData = {comment_contents: '', comment_photo_uri: '', _id: ''};
			//부모 댓글 데이터 전역변수 초기화
			comment_obj.parentComment = {comment_contents: '', comment_photo_uri: '', _id: ''};
			setTimeout(() => {
				input.current?.focus();
			}, 200);
		}
	}, [params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			editMode ? (comment_obj.editData = editData) : false;
			parentComment ? (comment_obj.parentComment = parentComment) : false;
			props.navigation.navigate('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
		}
	};

	//댓글 인덱스로 스크롤 함수
	const scrollToReply = (i, offset, from) => {
		console.log('from', from, 'scrollTo 호출 부모인덱스 : ', i, '자식 offset', offset);
		setTimeout(
			() => {
				flatlist.current.scrollToIndex({
					animated: true,
					index: i != -1 ? i : 0,
					viewPosition: 0,
					viewOffset: offset ? -offset : 0,
				});
			},
			Platform.OS == 'android' ? 300 : 300,
		);
	};

	const onDeleteImage = () => {
		setEditData({...editData, comment_photo_uri: ''});
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent, child) => {
		// console.log('수정 데이터', comment);
		setEditMode(true); //수정모드 시작
		setParentComment(); // 답글쓰기 모드는 해제
		const findParentIndex = comments.findIndex(e => e._id == parent._id); //부모댓글의 인덱스
		let viewOffset = 0; //자식댓글이 존재할 경우 내려갈 offSet 수치
		console.log('childIndex', child);
		if (child.findIndex != undefined && child.findIndex != -1) {
			//대댓글의 수정 분기
			viewOffset = 160 * (child.findIndex + 1) * DP; //수정할 대상 대댓글의 인덱스만큼 scrollOffset 조정
			viewOffset = viewOffset + 540 * child.hasPhoto * DP; //수정할 대상 대댓글 이전에 사진을 포함한 대댓글이 있을 경우 사진 개수 및 크기만큼 scrollOffSet 조정
			comment.comment_photo_uri ? (viewOffset = viewOffset + 360 * DP) : false; //수정할 대상 대댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffSet 조정
		}
		if (parent.comment_photo_uri) {
			//대상 대댓글의 부모댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffset 조정
			Platform.OS == 'android' ? (viewOffset = viewOffset + 340 * DP) : (viewOffset = viewOffset + 406 * DP);
		}
		setEditData({...comment, parent: findParentIndex}); //수정 데이터 입력 및 부모댓글의 인덱스 전달
		setPrivateComment(comment.comment_is_secure); //댓글입력창의 비밀댓글 모드 갱신
		scrollToReply(findParentIndex, viewOffset, 'onEdit'); //스크롤 시작
		setTimeout(() => {
			input.current?.focus(); //키보드와 일체화된 댓글 입력창 포커싱 시작
		}, 200);
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

	//댓글 삭제
	const onPressDelete = (id, parent) => {
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg);
				fetchData(parent);
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
				navigation.navigate('LoginRequired');
			});
		} else {
			setParentComment(parentCommentId);
			editComment || setEditComment(true);
			setEditMode(false); //수정모드 해제
			setEditData({comment_contents: '', comment_photo_uri: ''}); //수정 데이터 배우기
			const findParentIndex = comments.findIndex(e => e._id == parentCommentId._id); //대상 부모댓글의 인덱스
			let offset = 0;
			if (parentCommentId.comment_photo_uri) {
				offset = Platform.OS == 'android' ? 266 * DP : 314 * DP; //부모댓글이 사진을 포함한다면 scrollOffset 조정
			}
			setTimeout(() => {
				input.current?.focus();
			}, 200);
			scrollToReply(findParentIndex, offset, 'onReply');
			addChildCommentFn.current = addChildComment;
		}
	};

	const [isScrolled, setIsScrolled] = React.useState(false);
	//답글 더보기 클릭
	const showChild = index => {
		!params.edit || isScrolled ? scrollToReply(index, 0, 'showChild') : setIsScrolled(true);
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
	KeyBoardEvent(
		() => {
			setTimeout(() => {
				setKeyboardVisible(true);
			}, 200);
		},
		() => {
			setKeyboardVisible(false);
		},
	);

	const render = ({item, index}) => {
		const isOpen = childOpenList.includes(index);
		const replyFromDetail = replyFromDetailRef.current && params.reply && index == comments.findIndex(e => e._id == params.reply._id);
		replyFromDetail ? (replyFromDetailRef.current = false) : false; //첫 마운트 이후에는 음영처리 취소
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
			<View style={[style.commentContainer, {backgroundColor: getBgColor(), alignItems: 'center', width: 750 * DP}]} key={item._id}>
				<ParentComment
					parentComment={item}
					onPressReplyBtn={onReplyBtnClick} // 부모 댓글의 답글쓰기 클릭 이벤트
					onEdit={onEdit}
					onPressDelete={onPressDelete}
					onPressDeleteChild={onPressDelete}
					showChild={() => showChild(index)}
					openChild={isOpen}
					editData={editData} //현재 수정 데이터
					replyFromDetail={replyFromDetail} //실종,제보 상세의 댓글리스트에서 답글쓰기가 눌렸을 경우
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
						<View style={{paddingTop: 200 * DP}}>
							<ActivityIndicator size={'large'} color={'black'} />
						</View>
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
		marginBottom: 10 * DP,
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
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
});
