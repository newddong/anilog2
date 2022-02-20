import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {feedCommentList, login_style} from 'Templete/style_templete';
import {createComment, getCommentListByFeedId, getCommentListByProtectId} from 'Root/api/commentapi';
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
	const [photo, setPhoto] = React.useState();
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const [content, setContent] = React.useState('');
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const keyboardY = useKeyboardBottom(150*DP);

	React.useEffect(() => {
		if (props.route.name == 'FeedCommentList') {
			getCommentListByFeedId(
				{
					feedobject_id: props.route.params.feedobject._id,
					request_number: 1000,
				},
				comments => {
					setComments(comments.msg);
					console.log('comments', comments);
				},
				err => console.log(err),
			);
		}
	}, []);

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (content.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_photo_uri: photo, //사진uri
			comment_contents: content, //내용
			// comment_is_secure: privateComment, //공개여부 테스트때 반영
		};
		if (props.route.name == 'FeedCommentList') {
			param = {...param, feedobject_id: props.route.params.feedobject._id};
		} else if (props.route.name == '동물보호요청') {
			param = {...param, protect_request_object_id: props.route.params.feedobject._id};
		}

		if (parentComment) {
			param = {...param, commentobject_id: parentComment};
		}
		createComment(
			param,
			result => {
				console.log(result);
				setPhoto();
				setParentComment();
				setContent('');
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
						},
						err => console.log(err),
					);
				}
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
		console.log(parentCommentId);
		setParentComment(parentCommentId);
		input.current.focus();
		editComment || setEditComment(true);
		addChildCommentFn.current = addChildComment;
	};

	const render = ({item, index}) => {
		if (index == 0)
			return (
				<View style={{justifyContent: 'flex-end', paddingBottom: 10 * DP, height: 60 * DP, backgroundColor: '#FFF', paddingHorizontal: 48 * DP}}>
					<Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>
				</View>
			);
		if (index > 0) return <CommentList items={item} onPressReplyBtn={onReplyBtnClick} />;
	};
	return (
		<View style={[login_style.wrp_main, feedCommentList.container]}>
			<FlatList
				data={[{}, comments]}
				extraData={refresh}
				renderItem={render}
				stickyHeaderIndices={[1]}
				ListHeaderComponent={<FeedContent data={props.route.params.feedobject} showAllContents={props.route.params.showAllContents} />}
			/>
			{/* Parent Comment 혹은 Child Comment 에서 답글쓰기를 클릭할 시 화면 최하단에 등장 */}
			{/* 비로그인 유저일 경우 리플란이 안보이도록 처리 - 상우 */}
			{userGlobalObject.userInfo._id != '' && (editComment || props.route.name == 'FeedCommentList') ? (
				<View style={{position:'absolute',bottom:keyboardY}}>
				<ReplyWriteBox
					onAddPhoto={onAddPhoto}
					onChangeReplyInput={onChangeReplyInput}
					onLockBtnClick={onLockBtnClick}
					onWrite={onWrite}
					onDeleteImage={onDeleteImage}
					privateComment={privateComment}
					photo={photo}
					ref={input}
				/></View>
			) : (
				false
			)}
		</View>
	);
};
