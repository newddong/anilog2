import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, Like48_Border, LocationGray, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import ArticleThumnails from 'Root/component/organism/article/ArticleThumnails';
import userGlobalObject from 'Root/config/userGlobalObject';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';

/**
 * 후기 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data-
 */
export default ArticleDetail = props => {
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [photo, setPhoto] = React.useState();
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const [content, setContent] = React.useState('');
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	// const data = props.route.params.protectObject;
	const keyboardY = useKeyboardBottom(0 * DP);

	const onPressMeatball = () => {
		alert('onPressMeatball');
	};

	const onPressLike = () => {
		alert('onPressLike');
	};

	//사진클릭
	const onPressPhotos = () => {
		Modal.popPhotoListViewModal(dummy);
	};

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
						paddingVertical: 30 * DP,
					}}>
					<Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>
				</View>
			);
		if (index > 0) return <CommentList items={item} onPressReplyBtn={onReplyBtnClick} />;
	};

	const freeBoardContent = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<Article onPressThumnails={onPressPhotos} route={props.route.name} />
				<View style={[style.separator]} />
				<View style={[style.articleCommentList]}>{/* <CommentList /> */}</View>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}, comments]}
				extraData={refresh}
				renderItem={render}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={freeBoardContent}
				ListFooterComponent={<View style={{height: heightReply + keyboardY}}></View>}
			/>
			{userGlobalObject.userInfo._id != '' ? (
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

ArticleDetail.defaultProps = {};

const style = StyleSheet.create({
	container: {
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
		backgroundColor: GRAY20,
	},
	articleCommentList: {
		// backgroundColor: 'red',
	},
});

const dummy = [
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
	'https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/b3/22/85/5bb32285000ed2738de6.jpg',
];
