import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import ReviewBriefList from 'Root/component/organism/list/ReviewBriefList';
import {useNavigation} from '@react-navigation/core';
import ReviewContent from 'Root/component/organism/article/ReviewContent';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, deleteComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import community_obj from 'Root/config/community_obj';
import {NETWORK_ERROR, REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import {likeEtc} from 'Root/api/likeetc';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {ScrollView} from 'react-native';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';

/**
 * 후기 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 */
export default ReviewDetail = props => {
	const key = useKeyboardBottom(0);
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.route.params.community_object);
	const [searchInput, setSearchInput] = React.useState('');
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
	const commentListHeight = React.useRef(100);
	const floatInput = React.useRef();

	React.useEffect(() => {
		if (data.community_address.normal_address.address_name != '') {
			navigation.setOptions({title: `${data.community_address.normal_address.city} / ${data.community_address.normal_address.district}`});
		} else {
			navigation.setOptions({title: '리뷰'});
		}
		getComment();
		fetchCommunityList();
		const unsubscribe = navigation.addListener('focus', () => {
			//다른 탭(ex - My 탭의 즐겨찾기한 커뮤니티 목록에서 들어온 경우)에서의 호출
			if (community_obj.object.hasOwnProperty('_id')) {
				if (community_obj.object._id != data._id) {
					//현재 보고 있는 페이지와 다른 게시글이 호출된 경우
					navigation.push('ReviewDetail', {community_object: community_obj.object}); //해당 게시글 상세로 이동
				}
			}
		});
		navigation.addListener('blur', () => {
			community_obj.object = {};
			community_obj.pageToMove = '';
			community_obj.object.initial = true;
		});
		if (props.route.params.searchInput != '') {
			setSearchInput(props.route.params.searchInput);
		}
		return unsubscribe;
	}, []);

	const fetchCommunityList = () => {
		getCommunityList(
			{
				community_type: 'review',
			},
			result => {
				const res = result.msg.review.slice(0, 4);
				let removeThisReview = res.filter(e => e._id != data._id);
				setReviewList(removeThisReview);
			},
			err => {
				console.log('err / getCommunityList / ReviewDEtail : ', err);
				if (err.includes('code 500')) {
					setData([]);
					setTimeout(() => {
						Modal.alert(NETWORK_ERROR);
					}, 500);
				} else if (err.includes('없습니다')) {
					setData([]);
				}
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		// console.log('edt', editData);
		if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_contents: editData.comment_contents, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
			community_object_id: data._id,
		};

		if (editData.comment_photo_uri && editData.comment_photo_uri.length > 0) {
			param.comment_photo_uri = editData.comment_photo_uri;
		} else {
			param.comment_photo_remove = true;
		}
		param.comment_photo_uri = editData.comment_photo_uri == '' ? 'https:// ' : editData.comment_photo_uri;

		if (parentComment) {
			//대댓글일 경우 해당 부모 댓글에 대한 댓글을 추가
			param = {...param, commentobject_id: parentComment._id};
		} else {
			//부모댓글에 쓰는 경우가 아니라면 community 게시글에 대한 댓글을 추가
			param = {...param, community_object_id: data._id};
		}

		if (editMode) {
			// console.log('댓글편집', editData);
			let whichComment = '';
			comments.map((v, i) => {
				if (v._id == editData._id) {
					whichComment = i;
				}
			});
			updateComment(
				{
					...param,
					commentobject_id: editData._id,
					// comment_photo_remove: !editData.comment_photo_uri || editData.comment_photo_uri == 0,
				},
				result => {
					// console.log(result);
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
							let dummyForBox = res[res.length - 1];
							res.push(dummyForBox);
							setComments(res);
							// parentComment && addChildCommentFn.current();
							setPrivateComment(false);
							setEditMode(false);
							// console.log('comments', comments);
							setTimeout(() => {
								// scrollRef.current.scrollToIndex({animated: true, index: whichComment});
								scrollRef.current.scrollToIndex({animated: true, index: whichComment == '' ? editData.parent : whichComment, viewPosition: 0.5});
							}, 500);
							Modal.close();
						},
						err => {
							console.log('getCommentListByCommunityId', err);
							if (err == '검색 결과가 없습니다.') {
								setComments([{}]);
							}
							Modal.close();
						},
					);
				},
				err => Modal.alert(err),
			);
		} else {
			let whichParent = '';
			if (parentComment) {
				comments.map((v, i) => {
					if (v._id == param.commentobject_id) {
						whichParent = i;
					}
				});
			}
			// console.log('whichParent', whichParent);
			createComment(
				param,
				result => {
					// console.log(result);
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
							let dummyForBox = res[res.length - 1];
							res.push(dummyForBox);
							setComments(res);
							parentComment && addChildCommentFn.current();
							input.current.blur();
							setPrivateComment(false);
							setEditMode(false); // console.log('comments', comments);
							setTimeout(() => {
								whichParent == ''
									? scrollRef.current.scrollToIndex({animated: true, index: 0})
									: scrollRef.current.scrollToIndex({animated: true, index: whichParent - 1});
							}, 500);
							Modal.close();
						},
						err => {
							console.log('getCommentListByCommunityId', err);
							if (err == '검색 결과가 없습니다.') {
								setComments([{}]);
							}
							Modal.close();
						},
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
				// console.log('comments', comments.msg);
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				let dummyForBox = res[res.length - 1];
				res.push(dummyForBox);
				setComments(res);
				Modal.close();
			},
			err => {
				console.log('getCommentListByCommunityId', err);
				Modal.close();
				if (err == '검색 결과가 없습니다.') {
					setComments([{}]);
				}
			},
		);
	};

	const [isReplyFocused, setReplyFocus] = React.useState(false);
	const onFocus = () => {
		console.log('onFocus');
		Platform.OS == 'android' && setReplyFocus(true);
		scrollToReplyBox();
	};

	const onBlur = () => {
		Platform.OS == 'android' && setReplyFocus(false);
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

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
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
		}
	};

	const onDeleteImage = () => {
		setEditData({...editData, comment_photo_uri: ''});
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			input.current?.focus();
			setParentComment(parentCommentId);
			editComment || setEditComment(true);
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
			addChildCommentFn.current = addChildComment;
			// input.current?.focus();
			scrollToReplyBox();
		}
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent) => {
		setEditMode(true);
		const findParentIndex = comments.findIndex(e => e._id == parent);
		setEditData({...comment, parent: findParentIndex});
		scrollToReplyBox();
		setPrivateComment(comment.comment_is_secure);
	};

	const scrollToReplyBox = () => {
		if (Platform.OS == 'android') {
			input.current?.focus();
			scrollRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 1, viewOffset: 0});
			// setTimeout(() => {
			// 	scrollRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 1, viewOffset: 0});
			// }, 200);
		} else {
			scrollRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 0.5, viewOffset: 0});
		}
	};

	//댓글 대댓글 삭제
	const onPressDelete = id => {
		Modal.popLoading(true);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg.comment_is_delete);
				getComment();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
			},
		);
	};

	//미트볼 클릭
	const onPressMeatball = () => {
		const isMyArticle = userGlobalObject.userInfo._id == data.community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						navigation.push('CommunityEdit', {previous: data, isReview: true, isSearch: props.route.params.searchInput});
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
						Modal.close();
						if (userGlobalObject.userInfo.isPreviewMode) {
							setTimeout(() => {
								Modal.popLoginRequestModal(() => {
									navigation.navigate('Login');
								});
							}, 100);
						} else {
							setTimeout(() => {
								Modal.popOneBtnSelectModal(
									REPORT_MENU,
									'이 게시물을 신고 하시겠습니까?',
									selectedItem => {
										createReport(
											{
												report_target_object_id: data._id,
												report_target_object_type: 'communityobjects',
												report_target_reason: selectedItem,
												report_is_delete: false,
											},
											result => {
												console.log('신고 완료', result);
												Modal.close();
												Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
											},
											err => {
												Modal.close();
												if (err == '이미 신고되었습니다.') {
													Modal.popOneBtn('이미 신고하셨습니다.', '확인', () => Modal.close());
												}
											},
										);
									},
									'신고',
								);
							}, 200);
						}
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
	const onPressFavorite = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setFavoriteEtc(
				{
					collectionName: 'communityobjects',
					target_object_id: data._id,
					is_favorite: bool,
				},
				result => {
					console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc);
				},
				err => console.log('err / favoriteEtc / ArticleDetail : ', err),
			);
		}
	};

	//하단 리뷰 리스트 좋아요 클릭
	const onPressLikeBriefItem = (bool, index) => {
		likeEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: reviewList[index]._id,
				is_like: bool,
			},
			result => {
				console.log('result / likeEtc / ReviewDetail : ', result.msg.likeEtc);
				fetchCommunityList();
			},
			err => {
				console.log(' err / likeEtc / ReviewDetail :', err);
			},
		);
	};

	//다른 후기 게시글 클릭
	const onPressReviewBrief = index => {
		navigation.push('ReviewDetail', {community_object: reviewList[index], searchInput: searchInput});
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
	};

	const onLayoutCommentList = e => {
		commentListHeight.current = e.nativeEvent.layout.height;
	};

	const showChild = index => {
		console.log('showChild', index);
		scrollRef.current.scrollToIndex({animated: true, index: index, viewPosition: 0});
	};

	//좋아요 클릭
	const onPressLike = bool => {
		console.log('bool', bool);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			likeEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: data._id,
					is_like: bool,
				},
				result => {
					console.log('result/ onPressLike / ReviewMain : ', result.msg.targetPost);
					setData({...data, community_is_like: bool, community_like_count: bool ? ++data.community_like_count : --data.community_like_count});
				},
				err => console.log('err / onPressLike / ReviewMain : ', err),
			);
		}
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<ReviewContent data={data} onPressFavorite={onPressFavorite} onPressMeatball={onPressMeatball} searchInput={searchInput} />
				<View style={[style.separator]} />
				<View style={[style.like, {}]}>
					<View style={{flexDirection: 'row', width: 100 * DP, alignItems: 'center'}}>
						{data.community_is_like ? <Like48_Filled onPress={() => onPressLike(false)} /> : <Like48_Border onPress={() => onPressLike(true)} />}
						<Text style={[txt.noto24, {color: GRAY10, marginLeft: 15 * DP}]}>{data.community_like_count}</Text>
					</View>
					<View style={[style.commentList]}>
						{comments && comments.length > 0 ? (
							<View style={[style.replyCountContainer, {alignSelf: 'center', alignItems: 'flex-start'}]}>
								<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length - 1}개</Text>
							</View>
						) : (
							<></>
						)}
					</View>
				</View>
			</View>
		);
	};

	const bottom = () => {
		return (
			<View style={{alignItems: 'center'}}>
				{/* <View style={[{width: 654 * DP, height: 2 * DP, backgroundColor: GRAY40}]} /> */}
				<View style={[style.reviewList]}>
					<Text style={[txt.noto24, {}]}>관련 리뷰 게시글</Text>
					<ReviewBriefList
						items={reviewList}
						showMore={() => setShowMore(true)}
						onPressReview={onPressReviewBrief}
						onPressLike={onPressLikeBriefItem}
					/>
				</View>
			</View>
		);
	};

	const renderItem = ({item, index}) => {
		if (index == comments.length - 1) {
			return (
				<View style={[{marginTop: 0 * DP, marginBottom: 30 * DP, opacity: key > 0 || isReplyFocused ? 0 : 1}]}>
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={onChangeReplyInput}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						onDeleteImage={onDeleteImage}
						privateComment={privateComment}
						ref={input}
						editData={editData}
						shadow={false}
						parentComment={parentComment}
						onCancelChild={onCancelChild}
						onFocus={onFocus}
						onBlur={onBlur}
					/>
				</View>
			);
		} else
			return (
				<View style={[style.commentContainer]} key={item._id} onLayout={onLayoutCommentList}>
					<ParentComment
						parentComment={item}
						onPressReplyBtn={onReplyBtnClick} // 부모 댓글의 답글쓰기 클릭 이벤트
						onEdit={onEdit}
						onPressDelete={onPressDelete}
						onPressDeleteChild={onPressDelete}
						showChild={() => showChild(index)}
					/>
				</View>
			);
	};

	const listEmpty = () => {
		return <Text style={[txt.roboto28b, {color: GRAY10, paddingVertical: 40 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>;
	};

	if (reviewList == 'false' || comments == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={comments}
					ref={scrollRef}
					listKey={({item, index}) => index}
					ListHeaderComponent={header()}
					ListFooterComponent={bottom()}
					ListEmptyComponent={listEmpty}
					showsVerticalScrollIndicator={false}
					keyboardDismissMode={'none'}
					renderItem={renderItem}
					removeClippedSubviews={false}
					onScrollToIndexFailed={err => {
						setTimeout(() => {
							if (comments.length !== 0 && scrollRef !== null) {
								scrollRef.current.scrollToIndex({index: err.index != -1 ? err.index : 0, animated: true, viewPosition: 0});
							}
						}, 200);
					}}
					scrollToOverflowEnabled={true} // Just put in here
				/>
				{(key > 0 || isReplyFocused) && (
					<View style={{position: 'absolute', bottom: key - 2}}>
						<ReplyWriteBox
							onAddPhoto={onAddPhoto}
							onChangeReplyInput={onChangeReplyInput}
							onLockBtnClick={onLockBtnClick}
							onWrite={onWrite}
							onDeleteImage={onDeleteImage}
							privateComment={privateComment}
							ref={floatInput}
							editData={editData}
							shadow={false}
							parentComment={parentComment}
							onCancelChild={onCancelChild}
							onFocus={onFocus}
							onBlur={onBlur}
						/>
					</View>
				)}
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
		backgroundColor: GRAY40,
		marginTop: 30 * DP,
	},
	commentList: {},
	replyWriteBox: {
		width: 694 * DP,
	},
	reviewList: {
		width: 654 * DP,
		marginTop: 30 * DP,
		marginBottom: 30 * DP,
	},
	replyCountContainer: {
		// width: 654 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	commentContainer: {
		alignItems: 'center',
	},
	like: {
		width: 654 * DP,
		paddingVertical: 10 * DP,
		marginBottom: 10 * DP,
		marginTop: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
