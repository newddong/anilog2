import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import ReviewBriefList from 'Root/component/organism/list/ReviewBriefList';
import {useNavigation} from '@react-navigation/core';
import ReviewContent from 'Root/component/organism/article/ReviewContent';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, getCommentListByCommunityId, getCommentListByFeedId, getCommentListByProtectId, updateComment} from 'Root/api/commentapi';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';

/**
 * 후기 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 */
export default ReviewDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.route.params.community_object);
	const [reviewList, setReviewList] = React.useState('false');
	const [comments, setComments] = React.useState([]);
	const [showMore, setShowMore] = React.useState(false);
	const scrollRef = React.useRef();
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
	// console.log('data', data);

	React.useEffect(() => {
		if (data.community_address.normal_address.address_name != '') {
			navigation.setOptions({title: `${data.community_address.normal_address.city} / ${data.community_address.normal_address.district}`});
		} else {
			navigation.setOptions({title: '후기 게시글'});
		}
		getComment();
		getCommunityList(
			{
				community_type: 'review',
			},
			result => {
				const res = result.msg.review.slice(0, 4);
				let removeThisReview = res.filter(e => e._id != data._id);
				console.log('removeThisReview', removeThisReview.length);
				setReviewList(removeThisReview);
			},
			err => {
				console.log('err / getCommunityList / ReviewDEtail : ', err);
			},
		);
	}, []);

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
			console.log('param', param);
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

	//미트볼 클릭
	const onPressMeatball = () => {
		const isMyArticle = userGlobalObject.userInfo._id == data.community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						navigation.push('CommunityEdit', {previous: data, isReview: true});
						break;
					case '삭제':
						Modal.close();
						setTimeout(() => {
							Modal.popTwoBtn(
								'정말로 이 게시글을 \n 삭제하시겠습니까?',
								'아니오',
								'네',
								() => Modal.close(),
								() => {
									updateAndDeleteCommunity(
										{
											community_object_id: data._id,
											community_is_delete: true,
										},
										result => {
											// console.log('result / updateAndDeleteCommunity / ArticleDetail : ', result.msg);
											Modal.close();
											setTimeout(() => {
												Modal.popNoBtn('게시글 삭제가 완료되었습니다.');
												setTimeout(() => {
													Modal.close();
													navigation.goBack();
												}, 600);
											}, 200);
										},
										err => {
											console.log('err / updateAndDeleteCommunity / ArticleDetail : ', err);
											Modal.alert(err);
										},
									);
								},
							);
						}, 200);
						break;
					case '신고':
						break;
					default:
						break;
				}
			},
			() => Modal.close(),
			false,
			false,
		);
	};

	//즐겨찾기 클릭
	const onPressFavorite = () => {
		alert('onPressFavorite');
	};

	//댓글 클릭
	const onPressReply = () => {
		// console.log('replyY', replyY);
		// scrollRef.current?.scrollToOffset({offset: (replyY.y - replyY.height) * DP, animated: true});
		navigation.push('CommunityCommentList', {community_object: data});
	};

	//카테고리 클릭
	const onPressLikeBriefItem = index => {
		alert('onPressLikeBriefItem');
	};

	//다른 후기 게시글 클릭
	const onPressReviewBrief = index => {
		navigation.push('ReviewDetail', {community_object: reviewList[index]});
	};

	if (reviewList == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					ref={scrollRef}
					// keyExtractor={({item, index}) => index}
					listKey={({item, index}) => index}
					showsVerticalScrollIndicator={false}
					onContentSizeChange={(width, height) => {
						if (showMore) {
							scrollRef.current.scrollToEnd();
						}
					}}
					renderItem={({item, index}) => {
						return (
							<View style={{alignItems: 'center', marginTop: 30 * DP}}>
								<ReviewContent data={data} onPressFavorite={onPressFavorite} onPressMeatball={onPressMeatball} />
								<View style={[style.separator]} />
								<View style={[style.commentList]}>
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
									<View style={[{marginTop: 20 * DP, marginBottom: 30 * DP}]}>
										{/* <ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} /> */}
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

								<View style={[style.reviewList]}>
									<Text style={[txt.noto24, {}]}>관련후기 게시글</Text>
									<ReviewBriefList
										items={reviewList}
										showMore={() => setShowMore(true)}
										onPressReview={onPressReviewBrief}
										onPressLike={onPressLikeBriefItem}
									/>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
};

ReviewDetail.defaultProps = {};

const style = StyleSheet.create({
	container: {
		// paddingVertical: 30 * DP,
		flex: 1,
		// alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	separator: {
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
		marginTop: 30 * DP,
	},
	commentList: {},
	replyWriteBox: {
		width: 694 * DP,
	},
	reviewList: {
		width: 654 * DP,
	},
	replyCountContainer: {
		width: 654 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	commentContainer: {
		alignItems: 'center',
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		// backgroundColor: 'yellow',
	},
});
