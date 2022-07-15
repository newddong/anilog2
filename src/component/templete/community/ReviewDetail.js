import React from 'react';
import {txt} from 'Root/config/textstyle';
import {ActivityIndicator, FlatList, Keyboard, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30, GRAY40, WHITE} from 'Root/config/color';
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
import {NETWORK_ERROR, REGISTERING_COMMENT, REPORT_MENU} from 'Root/i18n/msg';
import {likeEtc} from 'Root/api/likeetc';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';
import comment_obj from 'Root/config/comment_obj';
import {count_to_K} from 'Root/util/stringutil';

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
	const flatListRef = React.useRef();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [parentComment, setParentComment] = React.useState();
	const [moveToCommentArea, setMoveToCommentArea] = React.useState(false); //리뷰 메인페이지에서 댓글 아이콘 클릭으로 진입 시 댓글 영역으로 이동, 첫 이동 이후 호출금지
	const addChildCommentFn = React.useRef(() => {});
	const [refreshing, setRefreshing] = React.useState(false); //위로 스크롤 시도 => 리프레싱
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});
	const floatInput = React.useRef();
	const input = React.useRef();
	const params = props.route.params;

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getReviewData();
			setPressed(false);
		});
		// getReviewData();
		getComment();
		fetchCommunityList();
		return unsubscribe;
	}, []);

	//검색탭에서 검색어가 있을 경우 searchInput state에 저장
	React.useEffect(() => {
		if (params.searchInput != '') {
			setSearchInput(params.searchInput);
		}
	}, [params]);

	React.useEffect(() => {
		if (reviewList != 'false' && reviewList.length) {
			reviewList.map((v, i) => {
				const find = community_obj.review.findIndex(e => e._id == v._id);
				if (find == -1) {
					//현 메모리에 저장되어 있지않은 피드아이템만 추가
					community_obj.review.push(v);
				}
			});
		}
	}, [reviewList]);

	//커뮤니티 데이터
	const getReviewData = () => {
		getCommunityByObjectId(
			{
				community_object_id: params.community_object._id,
			},
			result => {
				console.log('ReviewDetail / getCommunityByObjectId / Result : ', result.status);
				setData(result.msg);
				navigation.setOptions({title: '', data: result.msg});
			},
			err => {
				console.log('err / getCommunityByObjectId / ReviewDetail ', err);
				if (err.includes('없습니다')) {
					Modal.popOneBtn('이미 삭제된 게시글입니다.', '확인', () => navigation.goBack());
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
				const res = result.msg;
				const findIndex = res.findIndex(e => e._id == params.community_object._id);
				let list = [];
				const number_to_list = 6;
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
		Keyboard.dismiss();
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			floatInput.current?.blur();
			if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());
			Modal.popNoBtn(REGISTERING_COMMENT);
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
				let whichComment = comments.findIndex(v => v._id == editData._id) == -1 ? '' : comments.findIndex(v => v._id == editData._id); //부모댓글
				console.log('수정모드 -  파라미터 :', param);
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
								setPrivateComment(false);
								setEditMode(false);
								setTimeout(() => {
									flatListRef.current.scrollToIndex({
										animated: true,
										index: whichComment == '' ? editData.parent : whichComment ? whichComment : 0,
										viewPosition: 0,
									});
								}, 500);
								setReplyFocus(false);
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
					err => {
						Modal.close();
						setTimeout(() => {
							Modal.alert(NETWORK_ERROR);
						}, 200);
						console.log('updateComment  err', err);
					},
				);
			} else {
				let whichParent = '';
				if (parentComment) {
					whichParent = comments.findIndex(e => e._id == param.commentobject_id);
				}
				console.log('create', param);
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
								floatInput.current?.blur();
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
						Modal.close();
						setTimeout(() => {
							Modal.alert(NETWORK_ERROR);
							console.log('err', err);
						}, 200);
					},
				);
			}
		}
	};

	//댓글리스트 받아오기 (페이지 진입 및 댓글 삭제시 호출)
	const getComment = parent => {
		getCommentListByCommunityId(
			{
				community_object_id: params.community_object._id,
				request_number: 1000,
			},
			comments => {
				// console.log('comments', comments.msg);
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
				if (params && params.comment && res.length > 0 && !moveToCommentArea) {
					setMoveToCommentArea(true);
					setTimeout(() => {
						console.log('댓글 영역으로 이동', params.comment);
						Platform.OS == 'android'
							? flatListRef.current?.scrollToIndex({animated: true, index: 0, viewPosition: 0.5})
							: flatListRef.current?.scrollToIndex({animated: true, index: 0, viewPosition: 0.5});
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
		setReplyFocus(false);
	};

	//키보드와 일체화된 댓글입력창의 포커싱해제 콜백
	const onBlur3 = () => {
		setReplyFocus(false); ////미들 댓글입력창의 투명화 해제와 컴포넌트 bottom 0 처리
		setEditData({comment_contents: '', comment_photo_uri: ''}); //수정데이터 제거
		setEditMode(false); //키보드가 사라지면 수정모드도 해제
		setParentComment(); //선택된 부모댓글 데이터가 있다면 제거
	};

	//사진 선택 완료 후 선택된 사진 useState
	React.useEffect(() => {
		if (params.selectedPhoto && params.selectedPhoto.length > 0) {
			let selected = params.selectedPhoto[0];
			const checkEdit = comment_obj.editData._id != '' || comment_obj.editData.comment_contents != ''; //전역변수에 저장된 수정데이터가 있을 경우 수정데이터(editData)에 선택한 사진을 저장
			console.log('checkEdit', comment_obj.editData);
			if (checkEdit) {
				comment_obj.editData.isEditMode ? setEditMode(true) : false; //수정모드 부활
				setEditData({...comment_obj.editData, comment_photo_uri: selected.cropUri ?? selected.uri}); //수정데이터 부활
			} else {
				setEditMode(false);
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
			setReplyFocus(false);
		}
	}, [params?.selectedPhoto]);

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			editData.comment_contents ? (comment_obj.editData.comment_contents = editData.comment_contents) : false;
			editMode ? (comment_obj.editData = {...editData, isEditMode: true}) : false;
			parentComment ? (comment_obj.parentComment = parentComment) : false;
			navigation.navigate('SinglePhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
		}
	};

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

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			setParentComment(parentCommentId);
			editComment || setEditComment(true);
			setEditMode(false);
			setEditData({
				comment_contents: '',
				comment_photo_uri: '',
			});
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

	//미트볼, 수정을 누르면 동작
	const onEdit = (comment, parent, child) => {
		setEditMode(true);
		setParentComment(); // 수정모드로 전환시 기존의 답글쓰기 데이터 출력 취소
		const findParentIndex = comments.findIndex(e => e._id == parent._id); //부모댓글의 인덱스
		let viewOffset = 0; //자식댓글이 존재할 경우 내려갈 offSet 수치
		console.log('childIndex', child);
		if (child.findIndex != undefined && child.findIndex != -1) {
			viewOffset = 160 * (child.findIndex + 1) * DP;
			viewOffset = viewOffset + 540 * child.hasPhoto * DP;
			comment.comment_photo_uri ? (viewOffset = viewOffset + 360 * DP) : false;
		}
		if (parent.comment_photo_uri) {
			Platform.OS == 'android' ? (viewOffset = viewOffset + 320 * DP) : (viewOffset = viewOffset + 360 * DP);
		}
		setEditData({...comment, parent: findParentIndex});
		setPrivateComment(comment.comment_is_secure);
		scrollTo(findParentIndex, viewOffset);
		setTimeout(() => {
			floatInput.current?.focus();
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

	//댓글 대댓글 삭제
	const onPressDelete = (id, parent) => {
		Modal.popLoading(true);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg.comment_is_delete);
				getComment(parent);
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
					console.log('result/ onPressLike / ReviewMain : ', result.msg.targetPost);
					setData({...data, community_is_like: bool, community_like_count: bool ? ++data.community_like_count : --data.community_like_count});
					updateReview(true, data._id, bool, result.msg.targetPost.community_like_count);
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
					console.log('result / likeEtc / ReviewDetail : ', result.msg.targetPost);
					fetchCommunityList();
					updateReview(true, reviewList[index]._id, bool, result.msg.targetPost.community_like_count); // 리뷰 메인 페이지 데이터 전역변수 최신화
				},
				err => {
					console.log(' err / likeEtc / ReviewDetail :', err);
				},
			);
		}
	};

	const [pressed, setPressed] = React.useState(false);

	//다른 후기 게시글 클릭
	const onPressReviewBrief = index => {
		setPressed(true);
		if (!pressed) {
			console.log('ha', `ReviewDetail-${reviewList[index]._id + new Date().getTime()}`);
			navigation.navigate({
				key: `ReviewDetail-${reviewList[index]._id + new Date().getTime()}`,
				name: 'ReviewDetail',
				params: {
					community_object: reviewList[index],
					searchInput: searchInput,
				},
			});
		}
		// navigation.push('ReviewDetail', {community_object: reviewList[index], searchInput: searchInput});
	};

	//답글 쓰기 후 댓글 작성자 우측 답글취소 버튼 클릭
	const onCancelChild = () => {
		setParentComment();
	};

	//답글 보기 클릭 시 해당 인덱스의 댓글로 스크롤
	const showChild = index => {
		flatListRef.current.scrollToIndex({animated: true, index: index, viewPosition: 0});
	};

	//리뷰글 사진 이미지 클릭시 전체화면 뷰 출력
	const showImg = src => {
		Modal.popPhotoListViewModal([src], () => {
			Modal.close();
		});
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	React.useEffect(() => {
		refreshing ? getComment() : false;
	}, [refreshing]);

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<ReviewContent data={data} searchInput={searchInput} showImg={showImg} />
				<View style={[style.separator]} />
				<View style={[style.like]}>
					<TouchableOpacity
						onPress={() => onPressFavorite(data.community_is_favorite ? false : true)}
						style={[{flexDirection: 'row', minWidth: 80 * DP, alignItems: 'center'}]}>
						{data.community_is_favorite ? <FavoriteTag46_Filled /> : <FavoriteTag48_Border />}
						<Text style={[txt.noto24, {color: GRAY10, paddingTop: 6 * DP, marginLeft: 2 * DP, height: 48 * DP}]}>
							{count_to_K(data.community_favorite_count)}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onPressLike(data.community_is_like ? false : true)}
						style={{flexDirection: 'row', minWidth: 100 * DP, alignItems: 'center'}}>
						{data.community_is_like ? <Like48_Filled /> : <Like48_Border />}
						<Text style={[txt.noto24, {color: GRAY10, marginLeft: 10 * DP}]}>{count_to_K(data.community_like_count)}</Text>
					</TouchableOpacity>
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
						<Text style={[txt.noto24, {}]}>리뷰 더보기</Text>
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
				<View style={[{marginBottom: 30 * DP, opacity: key > 0 || isReplyFocused ? 0 : 1, maxHeight: isReplyFocused ? 0 : null}]}>
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
						// editData={editData}
						shadow={false}
						// parentComment={parentComment}
						onCancelChild={onCancelChild}
						onFocus={onFocus}
						onBlur={onBlur}
						viewMode={true}
					/>
				</View>
			);
		} else
			return (
				<View style={[style.commentContainer, {backgroundColor: getBgColor()}]} key={item._id}>
					<ParentComment
						writer={data.community_writer_id}
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
					ref={flatListRef}
					listKey={({item, index}) => index}
					ListHeaderComponent={header()}
					ListFooterComponent={bottom()}
					ListEmptyComponent={listEmpty}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					showsVerticalScrollIndicator={false}
					// keyboardDismissMode={'none'}
					renderItem={renderItem}
					// removeClippedSubviews={false}
					onScrollToIndexFailed={err => {
						setTimeout(() => {
							if (comments.length !== 0 && flatListRef !== null) {
								flatListRef.current.scrollToIndex({index: err.index != -1 ? err.index : 0, animated: true, viewPosition: 0});
							}
						}, 200);
					}}
					// scrollToOverflowEnabled={true}
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
						shadow={true}
						parentComment={parentComment}
						onCancelChild={onCancelChild}
						onFocus={onFocus3}
						onBlur={onBlur3}
						editData={editData}
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
