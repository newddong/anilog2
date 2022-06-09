import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY40} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';
import {getCommunityByObjectId, getCommunityList, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, deleteComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import community_obj from 'Root/config/community_obj';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {likeEtc} from 'Root/api/likeetc';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';
/**
 * 자유게시글 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 자유 게시글 오브젝트
 */
export default ArticleDetail = props => {
	const key = useKeyboardBottom(0);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [searchInput, setSearchInput] = React.useState('');
	const [comments, setComments] = React.useState('false');
	const [articleList, setArticleList] = React.useState('false');
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [parentComment, setParentComment] = React.useState(); //대댓글을 쓰는 경우 해당 댓글의 id container
	const input = React.useRef();
	const floatInput = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});
	community_obj.current = data._id;
	const flatListRef = React.useRef();
	const commentListHeight = React.useRef(100);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			//다른 탭(ex - My 탭의 즐겨찾기한 커뮤니티 목록에서 들어온 경우)에서의 호출
			getArticleData();
		});
		getComment();
		getArticleList();
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		if (props.route.params.searchInput != '') {
			console.log('props.route.params.searchInput', props.route.params.searchInput);
			setSearchInput(props.route.params.searchInput);
		}
	}, [props.route.params]);

	//커뮤니티 데이터
	const getArticleData = () => {
		getCommunityByObjectId(
			{
				community_object_id: props.route.params.community_object._id,
			},
			result => {
				console.log('ArticleDetail / getCommunityByObjectId / Result', result.status);
				setData(result.msg);
				switch (result.msg.community_free_type) {
					case 'talk':
						navigation.setOptions({title: '잡담', data: result.msg});
						break;
					case 'question':
						navigation.setOptions({title: '질문', data: result.msg});
						break;
					case 'meeting':
						navigation.setOptions({title: '모임', data: result.msg});
						break;
					default:
				}
			},
			err => {
				console.log('err / getCommunityByObjectId / ArticleDetail ', err);
				setData('false');
			},
		);
	};

	//페이지 하단에 출력될 자유게시글 목록 api(페이징 필요)
	const getArticleList = () => {
		getCommunityList(
			{
				limit: 10000,
				community_type: 'free',
				community_free_type: 'all',
			},
			result => {
				// console.log('result / getCommunityList / ArticleDetail :', result.msg.free.length);
				const free = result.msg.free;
				const findIndex = result.msg.free.findIndex(e => e._id == props.route.params.community_object._id);
				let list = [];
				if (free.length < 11) {
					//전체글이 11 이하라면 그냥 바로 출력
					console.log('free.length < 11', free.length < 11);
					setArticleList(free);
				} else if (free.length - findIndex < 11) {
					//현재 보고 있는 게시글이 전체 인덱스 중 10이하라면?
					console.log('findIndex < 11');
					for (let ind = findIndex + 1; ind < free.length - 1; ind++) {
						//이후 글만 차례로 출력
						list.push(free[ind]);
					}
					setArticleList(list);
				} else {
					for (let ind = findIndex + 1; ind < findIndex + 11; ind++) {
						list.push(free[ind]);
					}
					setArticleList(list);
				}
			},
			err => {
				console.log('err / getCommunityList / ArticleDetail : ', err);
				if (err.includes('code 500')) {
					setArticleList([]);
					setTimeout(() => {
						Modal.alert(NETWORK_ERROR);
					}, 500);
				} else if (err.includes('없습니다')) {
					setArticleList([]);
				}
			},
		);
	};

	//해당 자유게시글의 댓글을 받아온다
	const getComment = () => {
		getCommentListByCommunityId(
			{
				community_object_id: props.route.params.community_object._id,
				request_number: 1000,
			},
			comments => {
				// console.log('comments', comments);
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				let dummyForBox = res[res.length - 1];
				res.push(dummyForBox);
				setComments(res);
			},
			err => {
				console.log('getCommentListByCommunityId', err);
				if (err == '검색 결과가 없습니다.') {
					setComments([{}]);
				} else if (err.includes('code 500')) {
					Modal.popNetworkErrorModal('네트워크 오류로 댓글 정보를 \n 받아오는데 실패하였습니다.');
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
				// console.log('editData', editData.parent);
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
								parentComment && addChildCommentFn.current();
								setPrivateComment(false);
								setEditMode(false); // console.log('comments', comments);
								Modal.close();
								setTimeout(() => {
									console.log('whichComment', whichComment);
									flatListRef.current.scrollToIndex({animated: true, index: whichComment == '' ? editData.parent : whichComment, viewPosition: 0.5});
								}, 500);
							},
							err => {
								console.log('getCommentListByCommunityId', err);
								if (err == '검색 결과가 없습니다.') {
									setComments([{}]);
								}
							},
						);
					},
					err => Modal.alert(err),
				);
			} else {
				let whichParent = '';
				if (parentComment) {
					whichParent = comments.findIndex(e => e._id == param.commentobject_id);
				}
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
								setPrivateComment(false);
								setEditMode(false); // console.log('comments', comments);
								Modal.close();
								setTimeout(() => {
									whichParent == ''
										? flatListRef.current.scrollToIndex({animated: true, index: 0, viewPosition: 0.5})
										: flatListRef.current.scrollToIndex({animated: true, index: whichParent, viewPosition: 1});
								}, 500);
								input.current.blur();
							},
							err => {
								console.log('getCommentListByCommunityId', err);
								if (err == '검색 결과가 없습니다.') {
									setComments([{}]);
								}
							},
						);
					},
					err => {
						console.log('err', err);
						Modal.close();
					},
				);
			}
		}
	};
	const [isReplyFocused, setReplyFocus] = React.useState(false);
	const onFocus = () => {
		input.current.blur();
		floatInput.current.focus();
		setReplyFocus(true);
		scrollToReplyBox();
	};
	const onFocus3 = () => {
		setReplyFocus(true);
		scrollToReplyBox();
	};
	const onBlur = () => {
		floatInput.current.focus();
		setReplyFocus(false);
	};

	const onBlur3 = () => {
		setReplyFocus(false);
		if (editMode) {
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
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

	// 대댓글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			// console.log('대댓글 쓰기 버튼 클릭 : ', parentCommentId.comment_writer_id.user_nickname);
			input.current?.focus();
			setParentComment(parentCommentId);
			editComment || setEditComment(true);
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
			addChildCommentFn.current = addChildComment;
			scrollToReplyBox();
		}
	};

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent) => {
		// console.log('수정 데이터', comment);
		setEditMode(true);
		setParentComment(); // 수정모드로 전환시 기존의 답글쓰기 데이터 출력 취소
		const findParentIndex = comments.findIndex(e => e._id == parent);
		setEditData({...comment, parent: findParentIndex});
		setPrivateComment(comment.comment_is_secure);
		input.current?.focus();
		scrollToReplyBox();
	};

	//수정이나 답글쓰기 눌렀을 때 스크롤 함수
	const scrollToReplyBox = () => {
		if (Platform.OS == 'android') {
			// input.current?.focus();
			flatListRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 1, viewOffset: 0});
			// setTimeout(() => {
			// 	flatListRef.current.scrollToIndex({animated: true, index: comments.length - 1, viewPosition: 1, viewOffset: 0});
			// }, 200);
		} else {
			flatListRef.current.scrollToIndex({animated: false, index: comments.length - 1, viewPosition: 0.5, viewOffset: 0});
		}
	};

	//답글 더보기 클릭
	const showChild = index => {
		flatListRef.current.scrollToIndex({animated: true, index: index, viewPosition: 0, viewOffset: 0});
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		console.log('searchInput', searchInput);
		navigation.push('ArticleDetail', {community_object: articleList[index], searchInput: searchInput});
	};

	//댓글 모두보기 클릭
	const onPressReply = () => {
		navigation.push('CommunityCommentList', {community_object: data});
	};

	//즐겨찾기 클릭
	const onPressFavorite = bool => {
		setFavoriteEtc(
			{
				collectionName: 'communityobjects',
				target_object_id: data._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc);
				getArticleData();
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
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
				Modal.close();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
				Modal.close();
			},
		);
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
					// setData({...data, community_like_count: bool ? data.community_like_count++ : data.community_like_count--});
				},
				err => {
					console.log('err / onPressLike / ReviewMain : ', err);
					setData({...data, community_is_like: bool, community_like_count: bool ? ++data.community_like_count : --data.community_like_count});
				},
			);
		}
	};

	const onLayoutCommentList = e => {
		commentListHeight.current = e.nativeEvent.layout.height;
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<Article data={data} route={props.route.name} searchInput={searchInput} />
				<View style={[{width: 694 * DP, height: 2 * DP, backgroundColor: GRAY40}]} />
				<View style={[style.like, {}]}>
					<View style={[style.header_icon, {}]}>
						{data.community_is_favorite ? (
							<FavoriteTag46_Filled onPress={() => onPressFavorite(false)} />
						) : (
							<FavoriteTag48_Border onPress={() => onPressFavorite(true)} />
						)}
						<Text style={[txt.noto24, {color: GRAY10, paddingTop: 6 * DP, marginLeft: 2 * DP, height: 48 * DP}]}>
							{data.community_favorite_count}
						</Text>
					</View>
					<View style={[style.header_icon, {}]}>
						{data.community_is_like ? <Like48_Filled onPress={() => onPressLike(false)} /> : <Like48_Border onPress={() => onPressLike(true)} />}
						<Text style={[txt.noto24, {color: GRAY10, paddingTop: 6 * DP, marginLeft: 8 * DP, height: 48 * DP}]}>{data.community_like_count}</Text>
					</View>
					{comments && comments.length > 0 ? (
						<View style={[{alignItems: 'flex-end', width: 494 * DP}]}>
							<Text style={[txt.noto26]}> 댓글 {comments.length - 1}개</Text>
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
		);
	};

	const bottom = () => {
		const noMoreArticle = () => {
			return <Text style={[txt.noto28]}>다음 글이 없습니다.</Text>;
		};
		return (
			<View style={{alignItems: 'center'}}>
				{articleList != 'false' ? (
					<ArticleList
						items={articleList}
						onPressArticle={onPressArticle} //게시글 내용 클릭
						whenEmpty={noMoreArticle}
					/>
				) : (
					<View style={{paddingVertical: 100 * DP}}>
						<ActivityIndicator size={'large'} />
					</View>
				)}
			</View>
		);
	};

	const renderItem = ({item, index}) => {
		console.log('comments.length ', comments.length);
		if (index == comments.length - 1) {
			return (
				<>
					{comments.length == 1 ? (
						<Text style={[txt.roboto26, {color: GRAY20, paddingVertical: 20 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>
					) : (
						<></>
					)}
					<View style={[{marginTop: 0 * DP, marginBottom: 10 * DP, opacity: key > 0 || isReplyFocused ? 0 : 1}]}>
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
						<View style={[style.separator]} />
					</View>
				</>
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

	if (comments == 'false' || data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={comments}
					ref={flatListRef}
					listKey={({item, index}) => index}
					ListHeaderComponent={header()}
					ListFooterComponent={bottom()}
					showsVerticalScrollIndicator={false}
					renderItem={renderItem}
					onScrollToIndexFailed={err => {
						setTimeout(() => {
							if (comments.length !== 0 && flatListRef !== null) {
								flatListRef.current.scrollToIndex({index: err.index != -1 ? err.index : 0, animated: true, viewPosition: 0});
							}
						}, 200);
					}}
					removeClippedSubviews={false}
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
						onFocus={onFocus3}
						onBlur={onBlur3}
					/>
				</View>
			</View>
		);
};

ArticleDetail.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignSelf: 'center',
		alignItems: 'center',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		flexDirection: 'row',
		width: 80 * DP,
		alignItems: 'center',
	},
	profile: {
		alignSelf: 'flex-start',
		marginTop: 12 * DP,
	},
	hashText: {
		width: 634 * DP,
		marginTop: 10 * DP,
	},
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
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
		width: 750 * DP,
		height: 10 * DP,
		backgroundColor: GRAY40,
	},
	like: {
		width: 694 * DP,
		paddingVertical: 10 * DP,
		marginBottom: 10 * DP,
		marginTop: 20 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
	},
});
