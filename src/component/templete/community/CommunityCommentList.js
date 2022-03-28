import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {createComment, getCommentListByFeedId, getCommentListByProtectId} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';

export default CommunityCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [photo, setPhoto] = React.useState();
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const [content, setContent] = React.useState('');
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const data = props.route.params.feedobject;
	const keyboardY = useKeyboardBottom(0 * DP);

	React.useEffect(() => {
		getCommentListByFeedId(
			{
				feedobject_id: data,
				request_number: 1000,
			},
			comments => {
				setComments(comments.msg);
				// console.log('comments', comments);
			},
			err => console.log('err', err),
		);
	}, []);

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (content.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());
		let param = {
			comment_photo_uri: photo, //사진uri
			comment_contents: content, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
		};
		if (parentComment) {
			param = {...param, commentobject_id: parentComment};
		} else {
			param = {...param, protect_request_object_id: props.route.params.protectObject._id};
		}
		createComment(
			param,
			result => {
				console.log('createComment : ', result);
				setPhoto();
				setParentComment();
				setContent('');
				getCommentListByProtectId(
					{
						protect_request_object_id: props.route.params.protectObject._id,
						request_number: 1000,
					},
					comments => {
						!parentComment && setComments([]); //댓글목록 초기화
						setComments(comments.msg);
						parentComment && addChildCommentFn.current();
						console.log('comments', comments);
					},
					err => console.log('getCommentListByProtectId', err),
				);
			},
			err => Modal.alert(err),
		);
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
		})
			.then(images => {
				setPhoto(images.path);
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	const onDeleteImage = () => {
		setPhoto();
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setContent(text);
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		console.log('parentCommentId', parentCommentId);
		setParentComment(parentCommentId);
		input.current.focus();
		editComment || setEditComment(true);
		addChildCommentFn.current = addChildComment;
	};

	const [heightReply, setReplyHeight] = React.useState(0);
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
		if (index > 0) return <CommentList items={item} onPressReplyBtn={onReplyBtnClick} />;
	};

	const communityContent = () => {
		return (
			<View style={[style.contentContainer]}>
				<View style={[style.content_container_label]}></View>
				<View style={[style.cotent_container_header]}></View>
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
				ListHeaderComponent={communityContent}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
			/>
			{userGlobalObject.userInfo._id != '' && (editComment || props.route.name == 'ProtectCommentList') ? (
				<View style={{position: 'absolute', bottom: keyboardY}} onLayout={onReplyBtnLayout}>
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={onChangeReplyInput}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						onDeleteImage={onDeleteImage}
						privateComment={privateComment}
						photo={photo}
						ref={input}
					/>
				</View>
			) : (
				false
			)}
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
