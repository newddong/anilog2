import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native';
import DP from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY40} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';
import {getCommunityByObjectId, getCommunityList, getCommunityListFreeByPageNumber, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, deleteComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import community_obj from 'Root/config/community_obj';
import {Arrow48, Arrow48_GRAY, FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {likeEtc} from 'Root/api/likeetc';
import {FREE_LIMIT_DETAIL, NETWORK_ERROR} from 'Root/i18n/msg';
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
	const [articleList, setArticleList] = React.useState('false'); //하단 리스트 출력
	const [total, setTotal] = React.useState(); //하단 리스트의 전체 게시글 수
	const [offset, setOffset] = React.useState(0); //하단 리스트의 현재 페이지
	const [page, setPage] = React.useState(0); //하단 리스트의 전체 페이지
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
		getArticleList(1);
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
	const getArticleList = (page, category) => {
		try {
			console.log('page', page);
			let params = {
				limit: FREE_LIMIT_DETAIL, //10
				page: page,
				target_object_id: props.route.params.community_object._id, //현재 상세 페이지를 기준으로 그 이후의 글을 가져오기 위한 파라미터
			};
			//자유글 타입 파라미터 추가 여부, 미선택 상태일 경우 파라미터 자체를 보내선 안됨
			if (props.route.params.type && props.route.params.type.length > 0) {
				params.community_free_type = props.route.params.type;
			}
			getCommunityListFreeByPageNumber(
				params,
				result => {
					console.log('result / getCommunityListFreeByPageNumber / ArticleDetail :', result.msg.length);
					const free = result.msg;
					setTotal(result.total_count);
					setArticleList(free);
					setOffset(page);
				},
				err => {
					console.log('err / getCommunityListFreeByPageNumber / ArticleDetail : ', err);
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
		} catch (err) {
			console.log('err', err);
		}
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
				if (err.includes('검색 결과가 없습니다')) {
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
								if (err.includes('검색 결과가 없습니다.')) {
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

	//사진 선택 완료 후 선택된 사진 useState
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

	//댓글의 사진 삭제 클릭
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
		navigation.push('ArticleDetail', {
			community_object: articleList[index],
			searchInput: searchInput,
			type: props.route.params.type ? props.route.params.type : '',
		});
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

	const onPressPage = page => {
		if (page != offset) {
			getArticleList(page);
		}
	};

	const paging = () => {
		if (articleList != 'false' && articleList.length != 0 && total != '') {
			let totalPage = Array(Math.floor(total / FREE_LIMIT_DETAIL) + 1)
				.fill()
				.map((_, i) => i + 1);
			if (total % FREE_LIMIT_DETAIL === 0) {
				totalPage.length--;
			}
			const perPageNum = 5;
			let slicedPage = [];
			console.log('page', page);
			console.log('total', total);

			console.log('totalPage', totalPage.length);
			console.log('Math.floor(totalPage.length / perPageNum)', Math.floor(totalPage.length / perPageNum));
			console.log('total % FREE_LIMIT_DETAIL === 0', total % FREE_LIMIT_DETAIL === 0);
			let isLastPage = page == Math.floor(totalPage.length / perPageNum);
			isLastPage = (page + 1) * FREE_LIMIT_DETAIL * perPageNum >= total;
			console.log('(page + 1) * FREE_LIMIT_DETAIL * perPageNum', (page + 1) * FREE_LIMIT_DETAIL * perPageNum);
			console.log('isLast ? ', isLastPage);
			if (isLastPage) {
				for (let i = page * perPageNum + 1; i <= totalPage.length; i++) {
					slicedPage.push(i);
				}
			} else {
				slicedPage = [page * perPageNum + 1, page * perPageNum + 2, page * perPageNum + 3, page * perPageNum + 4, page * perPageNum + 5];
			}
			return (
				<View style={[style.pagingCont]}>
					<View style={{transform: [{rotate: '180deg'}], marginTop: 2 * DP}}>
						{page == 0 ? (
							<Arrow48_GRAY />
						) : (
							<TouchableOpacity onPress={() => setPage(page - 1)} style={{padding: 14 * DP}}>
								<Arrow48 />
							</TouchableOpacity>
						)}
					</View>
					<View style={{width: 500 * DP, flexDirection: 'row'}}>
						{slicedPage.map((v, i) => {
							return (
								<TouchableOpacity activeOpacity={0.8} onPress={() => onPressPage(v)} style={{width: 100 * DP, alignItems: 'center'}} key={i}>
									<Text style={[txt.noto32, {color: offset == v ? BLACK : GRAY20}]}>{v}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					{isLastPage ? (
						<></>
					) : (
						<TouchableOpacity onPress={() => setPage(page + 1)} style={{padding: 14 * DP, marginTop: 2 * DP}}>
							<Arrow48 />
						</TouchableOpacity>
					)}
				</View>
			);
		}
	};

	const bottom = () => {
		const noMoreArticle = () => {
			return <Text style={[txt.noto28]}>다음 글이 없습니다.</Text>;
		};
		return (
			<View style={{alignItems: 'center'}}>
				{articleList != 'false' ? (
					<View style={{paddingBottom: 0 * DP}}>
						<ArticleList
							items={articleList}
							onPressArticle={onPressArticle} //게시글 내용 클릭
							currentDetail={data._id}
						/>
						{paging()}
					</View>
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
	pagingCont: {
		width: 634 * DP,
		paddingVertical: 60 * DP,
		paddingBottom: 180 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		// justifyContent: 'space-between',
		alignItems: 'center',
	},
});
