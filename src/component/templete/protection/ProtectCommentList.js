import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {createComment, deleteComment, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {GRAY10} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {useNavigation} from '@react-navigation/core';

export default ProtectCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const input = React.useRef();
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

	React.useEffect(() => {
		fetchData();
		props.route.params.showKeyboard ? input.current.focus() : false;

		if (props.route.params.edit != undefined) {
			input.current.focus();
			setEditMode(true);
			setEditData({...props.route.params.edit});
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
				const removeDelete = comments.msg.filter(e => e.comment_is_delete != true);
				setComments(removeDelete);
				// console.log('comments', comments);
			},
			err => console.log('err', err),
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

			// let param = {
			// 	comment_contents: editData.comment_contents, //내용
			// 	comment_is_secure: privateComment, //공개여부 테스트때 반영
			// };

			// if (parentComment) {
			// 	// console.log('parentComment ProtectComment ', parentComment);
			// 	param = {...param, commentobject_id: parentComment._id};
			// } else {
			// 	param = {...param, protect_request_object_id: data._id};
			// }

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
				// delete param.comment_is_secure;
				delete param.protect_request_object_id;
				console.log('param', param);
				console.log('privateComment', privateComment);
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
						getCommentListByProtectId(
							{
								protect_request_object_id: props.route.params.protectObject._id,
								request_number: 1000,
							},
							comments => {
								!parentComment && setComments([]); //댓글목록 초기화
								setComments(comments.msg.filter(e => e.comment_is_delete != true));
								parentComment && addChildCommentFn.current();
								setPrivateComment(false);
								setEditMode(false);
								// console.log('comments', comments);
								input.current.blur();
							},
							err => console.log(err),
						);
					},
					err => Modal.alert(err),
				);
			} else {
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
								!parentComment && setComments([]); //댓글목록 초기화
								setComments(comments.msg.filter(e => e.comment_is_delete != true));
								parentComment && addChildCommentFn.current();
								setPrivateComment(false);
								setEditMode(false);
								// console.log('comments', comments);
								input.current.blur();
							},
							err => console.log(err),
						);
					},
					err => Modal.alert(err),
				);
			}
		}
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setPrivateComment(!privateComment);
			!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
		}
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
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
		}
	};

	const onDeleteImage = () => {
		setEditData({...editData, comment_photo_uri: ''});
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = comment => {
		console.log('수정 데이터', comment.comment_is_secure);
		setEditMode(true);
		setPrivateComment(comment.comment_is_secure);
		setEditData({...comment});
		input.current.focus();
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

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
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
			input.current.focus();
			editComment || setEditComment(true);
			addChildCommentFn.current = addChildComment;
		}
	};

	const onClickShelterLabel = () => {
		navigation.push('UserProfile', {userobject: data.protect_request_writer_id});
	};

	const onReplyBtnLayout = e => {
		setReplyHeight(e.nativeEvent.layout.height);
	};

	const render = ({item, index}) => {
		if (index == 0)
			return (
				<View
					style={{
						justifyContent: 'flex-end',
						marginBottom: 20 * DP,
					}}>
					<Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>
				</View>
			);
		if (index > 0)
			return (
				<CommentList
					items={item}
					onPressReplyBtn={onReplyBtnClick}
					onEdit={onEdit}
					onPressDelete={onPressDelete}
					onPressDeleteChild={onPressDelete}
				/>
			);
	};

	const protectRequestContent = () => {
		return (
			<View style={[style.contentContainer]}>
				<View style={[style.content_container_label]}>
					<ShelterSmallLabel data={data.protect_request_writer_id} onClickLabel={onClickShelterLabel} />
				</View>
				<View style={[style.cotent_container_header]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>보호요청</Text>
					<Text style={[txt.noto32b, {}]}>{data.protect_request_title || ''}</Text>
				</View>
			</View>
		);
	};

	return (
		<View
			style={[
				{
					alignItems: 'center',
					flex: 1,
					backgroundColor: '#fff',
				},
			]}>
			<FlatList
				data={[{}, comments]}
				extraData={refresh}
				renderItem={render}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={protectRequestContent}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
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
	contentContainer: {
		width: 654 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		marginBottom: 20 * DP,
		// backgroundColor: 'lightblue',
	},
	cotent_container_header: {
		width: 654 * DP,
		marginTop: 20 * DP,
	},
	content_container_label: {
		width: 654 * DP,
		marginTop: 15 * DP,
		flexDirection: 'row',
	},
	cotent_container_info: {
		width: 654 * DP,
		marginBottom: 20 * DP,
	},
});
