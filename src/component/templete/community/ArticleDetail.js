import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Keyboard} from 'react-native';
import DP, {isNotch} from 'Root/config/dp';
import {BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
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
import {count_to_K} from 'Root/util/stringutil';
import comment_obj from 'Root/config/comment_obj';
/**
 * 자유게시글 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 자유 게시글 오브젝트
 */
export default ArticleDetail = props => {
	const key = useKeyboardBottom(0);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); //자유상세글 데이터 object
	const [searchInput, setSearchInput] = React.useState(''); //검색탭의 검색키워드 String
	const [comments, setComments] = React.useState('false'); //댓글
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

	//검색탭에서 검색어가 있을 경우 searchInput state에 저장
	React.useEffect(() => {
		if (props.route.params.searchInput != '') {
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
				if (err.includes('code 500')) {
					Modal.popOneBtn(NETWORK_ERROR, '확인', navigation.goBack);
				} else {
					setData('false');
				}
			},
		);
	};

	//페이지 하단에 출력될 자유게시글 목록 api(페이징 필요)
	const getArticleList = (page, category) => {
		try {
			// console.log('page', page);
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
					// console.log('result / getCommunityListFreeByPageNumber / ArticleDetail :', result.msg.length);
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
	const getComment = parent => {
		getCommentListByCommunityId(
			{
				community_object_id: props.route.params.community_object._id,
				request_number: 1000,
			},
			comments => {
				// console.log('comments', comments);
				let res = comments.msg.filter(e => !e.comment_is_delete || e.children_count != 0);
				let dummyForBox = res[res.length - 1];
				if (parent) {
					const findIndex = res.findIndex(e => e._id == parent._id);
					console.log('find', findIndex);
					res.map((v, i) => {
						res[i].isDeleted = i == findIndex ? true : false;
					});
				} else {
					res.map((v, i) => {
						res[i].isDeleted = false;
					});
				}
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
		Keyboard.dismiss();
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());
			// Modal.popLoading(true);
			try {
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

				//댓글 수정을 확정
				if (editMode) {
					let whichComment = comments.findIndex(v => v._id == editData._id) == -1 ? '' : comments.findIndex(v => v._id == editData._id); //부모댓글
					console.log('par', param, editData._id, editData.comment_contents);
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
									if (editData.parent != undefined && editData.children_count == 0) {
										res.map((v, i) => {
											res[i].isEdited = i == editData.parent ? true : false;
										});
									} else {
										res.map((v, i) => {
											res[i].isEdited = false;
										});
									}
									res.push(dummyForBox);
									setComments(res);
									parentComment && addChildCommentFn.current();
									setPrivateComment(false);
									setEditMode(false);
									Modal.close();
									setTimeout(() => {
										flatListRef.current.scrollToIndex({
											animated: true,
											index: whichComment == '' ? editData.parent : whichComment ? whichComment : 0,
											viewPosition: 0,
										});
									}, 300);
								},
								err => {
									console.log('getCommentListByCommunityId', err);
									if (err.includes('검색 결과가 없습니다.')) {
										setComments([{}]);
									}
								},
							);
						},
						err => {
							Modal.alert(err);
							console.log('err', err);
						},
					);
				} else {
					let whichParent = '';
					if (parentComment) {
						whichParent = comments.findIndex(e => e._id == param.commentobject_id);
					}
					console.log('param', param);
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
									setTimeout(() => {
										flatListRef.current.scrollToIndex({
											animated: true,
											index: whichParent != '' ? whichParent : 0,
											viewPosition: whichParent != '' ? 0.5 : 0,
										});
									}, 500);
									Modal.close();
								},
								err => {
									console.log('getCommentListByCommunityId', err);
									if (err.includes('없습니다')) {
										setComments([{}]);
									}
									Modal.close();
								},
							);
						},
						err => {
							console.log('err', err);
							Modal.close();
						},
					);
				}
			} catch (err) {
				console.log('err', err);
			}
		}
	};

	const [isReplyFocused, setReplyFocus] = React.useState(false);

	//템플릿 중간에 있는 댓글입력창이 우선 포커싱
	const onFocus = () => {
		// input.current.blur(); //바로 포커싱 해제
		floatInput.current.focus(); //이후 키보드와 일체화된 댓글입력창 Focus처리
		// setReplyFocus(true);
	};

	//키보드와 일체화된 댓글입력창의 포커스
	const onFocus3 = () => {
		setReplyFocus(true); //미들 댓글입력창의 투명화와 컴포넌트 bottom 2000 처리
	};

	//템플릿 중간에 있는 댓글입력창의 포커싱해제 콜백
	const onBlur = () => {
		// floatInput.current.focus();
		// setReplyFocus(false);
	};

	//키보드와 일체화된 댓글입력창의 포커싱해제 콜백
	const onBlur3 = () => {
		setReplyFocus(false); //미들 댓글입력창의 투명화 해제와 컴포넌트 bottom 0 처리
		setEditMode(false); //키보드가 사라지면 수정모드도 해제
		setEditData({comment_contents: '', comment_photo_uri: ''}); //수정데이터 제거
		setParentComment(); //선택된 부모댓글 데이터가 있다면 제거
	};

	//사진 선택 완료 후 선택된 사진 useState
	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			let selected = props.route.params.selectedPhoto[0];
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
				floatInput.current?.focus();
			}, 200);
		}
	}, [props.route.params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			editMode ? (comment_obj.editData = editData) : false;
			parentComment ? (comment_obj.parentComment = parentComment) : false;
			props.navigation.push('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
		}
	};

	//댓글의 사진 삭제 클릭
	const onDeleteImage = () => {
		setEditData({...editData, comment_photo_uri: ''});
		setTimeout(() => {
			floatInput.current?.focus();
		}, 200);
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

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setEditData({...editData, comment_contents: text});
	};

	// 대댓글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			// console.log('대댓글 쓰기 버튼 클릭 : ', parentCommentId.comment_writer_id.user_nickname);
			setParentComment(parentCommentId);
			editComment || setEditComment(true);
			setEditMode(false); //수정모드 해제
			setEditData({comment_contents: '', comment_photo_uri: ''}); //수정데이터 비우기
			addChildCommentFn.current = addChildComment;
			const findIndex = comments.findIndex(e => e._id == parentCommentId._id); //대상 부모댓글의 인덱스
			let offset = 0;
			if (parentCommentId.comment_photo_uri) {
				offset = Platform.OS == 'android' ? 266 * DP : 314 * DP; //부모댓글이 사진을 포함한다면 scrollOffset 조정
			}
			setTimeout(() => {
				floatInput.current?.focus();
			}, 200);
			scrollTo(findIndex, offset);
		}
	};

	//수정을 누르면 동작
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
		scrollTo(findParentIndex, viewOffset); //스크롤 시작
		setTimeout(() => {
			floatInput.current?.focus(); //키보드와 일체화된 댓글 입력창 포커싱 시작
		}, 200);
	};

	//댓글 인덱스로 스크롤 함수
	const scrollTo = (i, offset) => {
		console.log('scrollTo 호출 부모인덱스 : ', i, '자식 offset', offset);
		setTimeout(
			() => {
				flatListRef.current.scrollToIndex({
					animated: true,
					index: i != -1 ? i : 0,
					viewPosition: 0,
					viewOffset: offset ? -offset : 0,
				});
			},
			Platform.OS == 'android' ? 300 : 0,
		);
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

	//즐겨찾기 클릭
	const onPressFavorite = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
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
					getArticleData();
				},
				err => console.log('err / favoriteEtc / ArticleDetail : ', err),
			);
		}
	};

	//댓글 대댓글 삭제
	const onPressDelete = (id, parent) => {
		Modal.popLoading(true);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				// console.log('result / delectComment / ArticleDetail : ', result.msg);
				getComment(parent);
				Modal.close();
			},
			err => {
				console.log(' err / deleteComment / ArticleDetail : ', err);
				Modal.close();
			},
		);
	};

	//좋아요 클릭
	const onPressLike = bool => {
		console.log('bool', bool);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			likeEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: data._id,
					is_like: bool,
				},
				result => {
					console.log('result/ onPressLike / ArticleDetail : ', result.msg.targetPost);
					setData({...data, community_is_like: bool, community_like_count: bool ? ++data.community_like_count : --data.community_like_count});
					// setData({...data, community_like_count: bool ? data.community_like_count++ : data.community_like_count--});
				},
				err => {
					console.log('err / onPressLike / ArticleDetail : ', err);
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
							{count_to_K(data.community_favorite_count)}
						</Text>
					</View>
					<View style={[style.header_icon, {marginLeft: 20 * DP}]}>
						{data.community_is_like ? <Like48_Filled onPress={() => onPressLike(false)} /> : <Like48_Border onPress={() => onPressLike(true)} />}
						<Text style={[txt.noto24, {color: GRAY10, paddingTop: 6 * DP, marginLeft: 8 * DP, height: 48 * DP}]}>
							{count_to_K(data.community_like_count)}
						</Text>
					</View>
					{comments && comments.length > 0 ? (
						<View style={[{position: 'absolute', right: 0}]}>
							<Text style={[txt.noto26]}> 댓글 {comments.length - 1}개</Text>
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
		);
	};

	//하단의 페이징 클릭 이동
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
			// console.log('totalPage', totalPage.length);
			// console.log('Math.floor(totalPage.length / perPageNum)', Math.floor(totalPage.length / perPageNum));
			// console.log('total % FREE_LIMIT_DETAIL === 0', total % FREE_LIMIT_DETAIL === 0);
			let isLastPage = page == Math.floor(totalPage.length / perPageNum);
			isLastPage = (page + 1) * FREE_LIMIT_DETAIL * perPageNum >= total;
			// console.log('(page + 1) * FREE_LIMIT_DETAIL * perPageNum', (page + 1) * FREE_LIMIT_DETAIL * perPageNum);
			// console.log('isLast ? ', isLastPage);
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
					<View style={{width: 500 * DP, flexDirection: 'row', justifyContent: 'center'}}>
						{slicedPage.map((v, i) => {
							return (
								<TouchableOpacity activeOpacity={0.8} onPress={() => onPressPage(v)} style={{width: 100 * DP, alignItems: 'center'}} key={i}>
									<Text style={[txt.noto32, {color: offset == v ? BLACK : GRAY20}]}>{v}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					{isLastPage ? (
						<Arrow48_GRAY />
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
		return (
			<View style={{alignItems: 'center'}}>
				<View style={[style.separator]} />

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
		if (index == comments.length - 1) {
			return (
				<>
					{comments.length == 1 && (
						<Text style={[txt.roboto26, {color: GRAY20, paddingVertical: 20 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>
					)}
					<View
						style={[
							{marginBottom: isReplyFocused ? 20 * DP : 10 * DP, opacity: key > 0 || isReplyFocused ? 0 : 1, maxHeight: isReplyFocused ? 0 : null},
						]}>
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
				</>
			);
		} else
			return (
				<View style={[style.commentContainer, {backgroundColor: getBgColor()}]} key={item._id} onLayout={onLayoutCommentList}>
					<ParentComment
						parentComment={item}
						onPressReplyBtn={onReplyBtnClick} // 부모 댓글의 답글쓰기 클릭 이벤트
						onEdit={onEdit}
						onPressDelete={onPressDelete}
						onPressDeleteChild={onPressDelete}
						showChild={() => showChild(index)}
						editData={editData}
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
					extraData={comments}
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
					// removeClippedSubviews={false}
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
		width: 104 * DP,
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
		// paddingBottom: 10 * DP,
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
		marginBottom: 20 * DP,
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
