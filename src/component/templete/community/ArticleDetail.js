import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import Modal from 'Root/component/modal/Modal';
import Article from 'Root/component/organism/article/Article';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';
import {getCommunityList, updateAndDeleteCommunity} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {createComment, getCommentListByCommunityId, updateComment} from 'Root/api/commentapi';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import community_obj from 'Root/config/community_obj';
import {favoriteEtc} from 'Root/api/favoriteetc';
import {Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import {likeEtc} from 'Root/api/likeetc';
import {REPORT_MENU} from 'Root/i18n/msg';

/**
 * 자유게시글 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 자유 게시글 오브젝트
 */
export default ArticleDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.route.params.community_object);
	const [searchInput, setSearchInput] = React.useState('');
	const [comments, setComments] = React.useState('false');
	const [articleList, setArticleList] = React.useState([]);
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [parentComment, setParentComment] = React.useState(); //대댓글을 쓰는 경우 해당 댓글의 id container
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [editMode, setEditMode] = React.useState(false); //댓글 편집 모드
	const [editData, setEditData] = React.useState({
		comment_contents: '',
		comment_photo_uri: '',
	});
	community_obj.current = data._id;

	React.useEffect(() => {
		setData(props.route.params.community_object);
		if (props.route.params.searchInput != '') {
			console.log('props.route.params.searchInput', props.route.params.searchInput);
			setSearchInput(props.route.params.searchInput);
		}
	}, [props.route.params]);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			//다른 탭(ex - My 탭의 즐겨찾기한 커뮤니티 목록에서 들어온 경우)에서의 호출
			let lines = [];
			if (data.community_content.includes('<span')) {
				const parsingSpan = data.community_content.replaceAll('<span', '<div');
				const parsingSpan2 = parsingSpan.replaceAll('</span>', '</div>');
				let matches = parsingSpan2.match(/<div\b(?:(R)|(?:(?!<\/?div).))*<\/div>/gm);
				// console.log('matched', matches);
				matches.map((v, i) => {
					// let remove = v.match(/<div\b(?:(R)|(?:(?!<\/?div).))*<\/div>/gm);
					let getImgTag = v.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
					console.log('v', i, v);
					const remove = v.match(/<div[^>]+>([^<]+?)<\/div>/);
					console.log('remove', remove, i);
					if (getImgTag) {
						let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
						lines.push({image: src[1]});
					} else {
						if (remove != undefined) {
							lines.push(remove[1]);
						}
					}
				});
				data.contents = lines;
			} else {
				let matches = data.community_content.match(/<div\b(?:(R)|(?:(?!<\/?div).))*<\/div>/gm);
				matches.map((v, i) => {
					let remove = v.match(/\<div\>(.+)\<\/div\>/);
					let getImgTag = v.match(/<img[\w\W]+?\/?>/g);
					// console.log('remove', i, remove, 'v', v);
					if (getImgTag) {
						let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
						// console.log('src', src);
						lines.push({image: src[1]});
					} else {
						if (remove != undefined) {
							lines.push(remove[1]);
						}
					}
				});
				data.contents = lines;
			}

			if (community_obj.object.hasOwnProperty('_id')) {
				if (community_obj.object._id != data._id) {
					//현재 보고 있는 페이지와 다른 게시글이 호출된 경우
					console.log('보고 있는 페이지와 다른 게시글이 호출된 경우');
					navigation.push('ArticleDetail', {community_object: community_obj.object}); //해당 게시글 상세로 이동
				}
			}
		});
		navigation.addListener('blur', () => {
			community_obj.object = {};
			community_obj.pageToMove = '';
			community_obj.object.initial = true;
		});
		getComment();
		getArticleList();
		navigation.setOptions({title: '자유 게시글'});
		return unsubscribe;
	}, []);

	//페이지 하단에 출력될 자유게시글 목록 api(페이징 필요)
	const getArticleList = () => {
		getCommunityList(
			{
				community_type: 'free',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg.free);
				const free = result.msg.free;
				if (free.length < 6) {
					//전체글이 6개 이하라면 그냥 바로 출력
					setArticleList(free);
				} else {
					let temp = [];
					free.map((e, i) => {
						const arg_date = new Date(e.community_date).getTime();
						const this_date = new Date(data.community_date).getTime();
						this_date > arg_date ? temp.push(e) : false;
					});
					if (temp.length > 5) {
						//전체글이 6개 이상이며 이전의 작성글도 6개 미만이라면 그 이전의 글을 모두 긁어온다
						setArticleList(temp);
					} else {
						//전체글이 6개 이상이지만 해당 작성글 작성일자보다 이전의 작성글이 6개 이하라면 그 이후의 글도 긁어온다.
						let near = [];
						let index = free.findIndex(function (item, i) {
							return item._id === data._id;
						});
						const remain = free.length - index;
						for (let ind = index - (6 - remain); ind < index + remain; ind++) {
							free[ind]._id != data._id ? near.push(free[ind]) : false;
						}
						setArticleList(near);
					}
				}
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				Modal.alert(err);
			},
		);
	};

	//해당 자유게시글의 댓글을 받아온다
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
			setComments([]),
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (editData.comment_contents.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_contents: editData.comment_contents, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
			community_object_id: data._id,
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

	//제목 우측 미트볼 클릭
	const onPressMeatball = () => {
		const isMyArticle = userGlobalObject.userInfo._id == data.community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						navigation.push('CommunityEdit', {previous: data, isReview: false});
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
						setTimeout(() => {
							Modal.popOneBtnSelectModal(
								REPORT_MENU,
								'이 게시물을 신고 하시겠습니까?',
								selectedItem => {
									alert(selectedItem);
								},
								'신고',
							);
						}, 200);
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

	//미트볼, 수정을 누르면 동작
	const onEdit = comment => {
		console.log('수정 데이터', comment);
		setEditMode(true);
		setEditData({...comment});
		input.current?.focus();
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// console.log('articleList[index]', articleList[index]);
		navigation.push('ArticleDetail', {community_object: articleList[index]});
	};

	//댓글 모두보기 클릭
	const onPressReply = () => {
		navigation.push('CommunityCommentList', {community_object: data});
	};

	//즐겨찾기 클릭
	const onPressFavorite = bool => {
		favoriteEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg);
				// setData({...data, })
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
	};

	//좋아요 클릭
	const onPressLike = bool => {
		console.log('bool', bool);
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
			err => console.log('err / onPressLike / ReviewMain : ', err),
		);
	};

	if (comments == 'false' || data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<View style={[{alignItems: 'center', paddingBottom: 40 * DP}]}>
					<FlatList
						data={[{}]}
						listKey={({item, index}) => index}
						renderItem={({item, index}) => {
							return (
								<View style={[{width: 750 * DP, alignItems: 'center'}]}>
									<View style={{alignItems: 'center'}}>
										<Article
											data={data}
											onPressMeatball={onPressMeatball}
											onPressFavorite={onPressFavorite}
											route={props.route.name}
											searchInput={searchInput}
										/>
										<View style={[style.like, {}]}>
											{data.community_is_like ? (
												<Like48_Filled onPress={() => onPressLike(false)} />
											) : (
												<Like48_Border onPress={() => onPressLike(true)} />
											)}
											<Text style={[txt.noto24, {color: GRAY10, marginLeft: 15 * DP}]}>{data.community_like_count}</Text>
										</View>
										<View style={[style.separator]} />
									</View>
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
									<View style={[{marginTop: 40 * DP, marginBottom: 80 * DP}]}>
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
										/>
									</View>
									<ArticleList
										items={articleList}
										onPressArticle={onPressArticle} //게시글 내용 클릭
									/>
								</View>
							);
						}}
						showsVerticalScrollIndicator={false}
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
	replyCountContainer: {
		width: 654 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
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
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
	},
	like: {
		width: 654 * DP,
		paddingVertical: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
