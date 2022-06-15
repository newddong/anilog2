import React from 'react';
import {txt} from 'Root/config/textstyle';
import {ActivityIndicator, BackHandler, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import ReviewBriefList from 'Root/component/organism/list/ReviewBriefList';
import {useNavigation} from '@react-navigation/core';
import ReviewContent from 'Root/component/organism/article/ReviewContent';
import {getCommunityByObjectId, getCommunityList, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, deleteComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import community_obj, {updateReview} from 'Root/config/community_obj';
import {NETWORK_ERROR, REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import {likeEtc} from 'Root/api/likeetc';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
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
	const [data, setData] = React.useState('false');
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
	const [showImgMode, setShowImgMode] = React.useState(false);
	const floatInput = React.useRef();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getReviewData();
		});
		// getReviewData();
		getComment();
		fetchCommunityList();
		if (props.route.params.searchInput != '') {
			setSearchInput(props.route.params.searchInput);
		}

		return () => {
			unsubscribe;
		};
	}, []);

	const backAction = () => {
		console.log('back', showImgMode);
		if (showImgMode) {
			Modal.close();
			setShowImgMode(false);
			return true;
		} else {
			return false;
		}
	};

	React.useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);
		return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, [showImgMode]);

	//커뮤니티 데이터
	const getReviewData = () => {
		getCommunityByObjectId(
			{
				community_object_id: props.route.params.community_object._id,
			},
			result => {
				console.log('ReviewDetail / getCommunityByObjectId / Result : ', result.status);
				setData(result.msg);
				navigation.setOptions({title: '', data: result.msg});
			},
			err => {
				console.log('err / getCommunityByObjectId / ReviewDetail ', err);
				if (err.includes('없습니다')) {
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => navigation.goBack());
				} else {
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => navigation.goBack());
				}
				setData('false');
			},
		);
	};

	//하단 리뷰
	const fetchCommunityList = () => {
		getCommunityList(
			{
				limit: 10000,
				community_type: 'review',
			},
			result => {
				const res = result.msg.review;
				const findIndex = res.findIndex(e => e._id == props.route.params.community_object._id);
				let list = [];
				const number_to_list = 4;
				if (res.length < number_to_list) {
					//전체글이 11 이하라면 그냥 바로 출력
					console.log('review.length < number_to_list', res.length < number_to_list);
					setReviewList(res);
				} else if (res.length - findIndex < number_to_list) {
					//현재 보고 있는 게시글이 전체 인덱스 중 10이하라면?
					console.log('findIndex < number_to_list');
					for (let ind = findIndex + 1; ind < res.length; ind++) {
						//이후 글만 차례로 출력
						list.push(res[ind]);
					}
				} else {
					for (let ind = findIndex + 1; ind < findIndex + number_to_list; ind++) {
						list.push(res[ind]);
					}
				}
				setReviewList(list);
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
				community_object_id: props.route.params.community_object._id,
				request_number: 1000,
			},
			comments => {
				// console.log('comments', comments.msg);
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				let dummyForBox = res[res.length - 1];
				res.push(dummyForBox);
				setComments(res);
				if (props.route.params && props.route.params.comment && res.length > 0) {
					setTimeout(() => {
						console.log('props.route.params.commen', props.route.params.comment);
						Platform.OS == 'android'
							? scrollRef.current.scrollToIndex({animated: true, index: 0, viewPosition: 0.5})
							: scrollRef.current.scrollToIndex({animated: true, index: 0, viewPosition: 0.5});
					}, 500);
				}
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
		input.current.blur();
		floatInput.current.focus();
		setReplyFocus(true);

		scrollToReplyBox();
	};

	const onBlur = () => {
		floatInput.current.focus();
		setReplyFocus(false);
	};

	const onFocus2 = () => {
		setReplyFocus(true);
		scrollToReplyBox();
	};

	const onBlur2 = () => {
		setReplyFocus(false);
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
			console.log('onAddphoto');
			props.navigation.push('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
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
		setParentComment(); // 수정모드로 전환시 기존의 답글쓰기 데이터 출력 취소
		scrollToReplyBox();
		setPrivateComment(comment.comment_is_secure);
	};

	const scrollToReplyBox = () => {
		if (Platform.OS == 'android') {
			// input.current?.focus();
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
					getReviewData(); //데이터 갱신
					updateReview(false, data._id, bool); //전역변수 갱신
				},
				err => console.log('err / favoriteEtc / ArticleDetail : ', err),
			);
		}
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
					updateReview(true, data._id, bool);
				},
				err => console.log('err / onPressLike / ReviewMain : ', err),
			);
		}
	};

	//하단 리뷰 리스트 좋아요 클릭
	const onPressLikeBriefItem = (bool, index) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			likeEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: reviewList[index]._id,
					is_like: bool,
				},
				result => {
					console.log('result / likeEtc / ReviewDetail : ', result.msg.likeEtc);
					fetchCommunityList();
					updateReview(true, reviewList[index]._id, bool); // 리뷰 메인 페이지 데이터 전역변수 최신화
				},
				err => {
					console.log(' err / likeEtc / ReviewDetail :', err);
				},
			);
		}
	};

	//다른 후기 게시글 클릭
	const onPressReviewBrief = index => {
		navigation.push('ReviewDetail', {community_object: reviewList[index], searchInput: searchInput});
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
	};

	//답글 보기 클릭 시 해당 인덱스의 댓글로 스크롤
	const showChild = index => {
		console.log('showChild', index);
		scrollRef.current.scrollToIndex({animated: true, index: index, viewPosition: 0});
	};

	//리뷰글 사진 이미지 클릭시 전체화면 뷰 출력
	const showImg = src => {
		setShowImgMode(true);
		Modal.popPhotoListViewModal([src], () => {
			setShowImgMode(false);
			Modal.close();
		});
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<ReviewContent data={data} searchInput={searchInput} showImg={showImg} />
				<View style={[style.separator]} />
				<View style={[style.like]}>
					<View style={[{flexDirection: 'row', width: 80 * DP, alignItems: 'center'}]}>
						{data.community_is_favorite ? (
							<FavoriteTag46_Filled onPress={() => onPressFavorite(false)} />
						) : (
							<FavoriteTag48_Border onPress={() => onPressFavorite(true)} />
						)}
						<Text style={[txt.noto24, {color: GRAY10, paddingTop: 6 * DP, marginLeft: 2 * DP, height: 48 * DP}]}>
							{data.community_favorite_count}
						</Text>
					</View>
					<View style={{flexDirection: 'row', width: 100 * DP, alignItems: 'center'}}>
						{data.community_is_like ? <Like48_Filled onPress={() => onPressLike(false)} /> : <Like48_Border onPress={() => onPressLike(true)} />}
						<Text style={[txt.noto24, {color: GRAY10, marginLeft: 10 * DP}]}>{data.community_like_count}</Text>
					</View>
					<View style={[style.commentList]}>
						{comments && comments.length > 0 ? <Text style={[txt.noto26, {textAlign: 'right'}]}> 댓글 {comments.length - 1}개</Text> : <></>}
					</View>
				</View>
			</View>
		);
	};

	const keyboardY = useKeyboardBottom(0 * DP);

	//하단 관련 리뷰 게시글
	const bottom = () => {
		if (reviewList == 'false') {
			return (
				<View style={{paddingVertical: 100 * DP}}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		} else {
			return (
				<View style={{alignItems: 'center'}}>
					<View style={[style.reviewList]}>
						<Text style={[txt.noto24, {}]}>관련 리뷰 더보기</Text>
						<ReviewBriefList
							items={reviewList}
							showMore={() => setShowMore(true)}
							onPressReview={onPressReviewBrief}
							onPressLike={onPressLikeBriefItem}
						/>
					</View>
					<View style={{height: keyboardY}}></View>
				</View>
			);
		}
	};

	const renderItem = ({item, index}) => {
		if (index == comments.length - 1) {
			return (
				<View style={[{marginTop: 0 * DP, marginBottom: 30 * DP, opacity: key > 0 || isReplyFocused ? 0 : 1}]}>
					{comments.length == 1 ? (
						<Text style={[txt.roboto26, {color: GRAY20, paddingVertical: 10 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>
					) : (
						<></>
					)}
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
						viewMode={true}
					/>
				</View>
			);
		} else
			return (
				<View style={[style.commentContainer]} key={item._id}>
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

	if (data == 'false' || comments == 'false') {
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
				<View style={{position: 'absolute', bottom: isReplyFocused ? key - 2 : 2000}}>
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={onChangeReplyInput}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						onDeleteImage={onDeleteImage}
						privateComment={privateComment}
						ref={floatInput}
						editData={editData}
						shadow={true}
						parentComment={parentComment}
						onCancelChild={onCancelChild}
						onFocus={onFocus2}
						onBlur={onBlur2}
					/>
				</View>
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
		width: 694 * DP,
		height: 2 * DP,
		backgroundColor: GRAY40,
		marginTop: 30 * DP,
	},
	commentList: {
		width: 480 * DP,
		// justifyContent: 'flex-end',
	},
	replyWriteBox: {
		width: 694 * DP,
	},
	reviewList: {
		width: 694 * DP,
		marginTop: 0 * DP,
		marginBottom: 30 * DP,
		// backgroundColor: 'red',
	},
	replyCountContainer: {
		alignItems: 'flex-end',
	},
	commentContainer: {
		alignItems: 'center',
	},
	like: {
		width: 694 * DP,
		marginBottom: 10 * DP,
		marginTop: 26 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'red',
	},
});
