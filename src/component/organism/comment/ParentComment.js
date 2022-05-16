import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {organism_style, parentComment} from 'Organism/style_organism';
import {styles} from 'Atom/image/imageStyle';
import ChildCommentList from 'Organism/comment/ChildCommentList';
import UserLocationTimeLabel from 'Molecules/label/UserLocationTimeLabel';
import {
	Arrow_Down_GRAY10,
	Heart30_Border,
	Heart30_Filled,
	Meatball50_APRI10_Vertical,
	Meatball50_GRAY20_Vertical,
	ProfileDefaultImg,
	SecureIcon40,
} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {REPLY_MEATBALL_MENU, REPLY_MEATBALL_MENU_MY_REPLY, REPORT_MENU} from 'Root/i18n/msg';
import {GRAY10, GRAY20} from 'Root/config/color';
import {getChildCommentList} from 'Root/api/commentapi';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeComment} from 'Root/api/commentapi';
import {createReport} from 'Root/api/report';
import dp from 'Root/config/dp';

/**
 * 부모 댓글
 * @param {object} props - Props Object
 * @param {Object} props.data - 부모 comment data object
 * @param {void} props.onPressReplyBtn - 답글쓰기
 * @param {(id:string)=>void} props.onPressDelete - 댓글 삭제
 * @param {(id:string)=>void} props.onPressDeleteChild - 대댓글 삭제
 * @param {(data:object)=>void} props.onEdit - 댓글 수정
 * @param {(data:object)=>void} props.showChild - 답글 ~~개보기 클릭
 * @param {boolean} props.openChild - 자식 댓글 보이기 여부
 */
export default ParentComment = React.memo((props, ref) => {
	// console.log('ParentComment : ', props.parentComment.comment_writer_id.user_nickname, props.parentComment.comment_is_secure);
	// console.log('ParentComment : children_count', props.parentComment.comment_contents, props.parentComment.children_count);
	// console.log('parentComment props', props);
	const [data, setData] = React.useState(props.parentComment);
	const [child, setChild] = React.useState([]);
	const [likeCount, setLikeCount] = React.useState(0);
	const [likeState, setLikeState] = React.useState(false); //해당 댓글의 좋아요 상태 - 로그인 유저가 좋아요를 누른 기록이 있다면 filled , or border
	const [showChild, setShowChild] = React.useState(false); //해당 댓글의 답글들 출력 여부 Boolean
	const [meatball, setMeatball] = React.useState(false); // 해당 댓글의 미트볼 헤더 클릭 여부
	React.useEffect(() => {
		setData(props.parentComment);
		setLikeState(props.parentComment.comment_is_like);
		setLikeCount(props.parentComment.comment_like_count);
	}, [props.parentComment]);

	React.useEffect(() => {
		if (props.parentComment._id == props.parent) {
			showChildComment();
		}
		if (props.openChild) {
			//자식댓글을 여는 props
			showChildComment();
		}
	}, []);

	//대댓글 추가 시 콜백
	const addChildComment = newChildComment => {
		getChildCommentList(
			{
				commentobject_id: props.parentComment._id,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			result => {
				console.log('getChildCommentList', result.msg[0]);
				setChild(result.msg);
				!showChild && setShowChild(true);
			},
			error => {
				console.log(error);
			},
		);
	};

	//답글쓰기 클릭
	const onPressReplyBtn = () => {
		// console.log('대댓글 추가2');
		console.log('대댓글 추가 부모댓글 닉네임 : ', props.parentComment.comment_writer_id.user_nickname);
		props.onPressReplyBtn(props.parentComment, addChildComment);
	};

	const onCLickHeart = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setLikeState(!likeState);
			likeComment(
				{
					commentobject_id: props.parentComment._id,
					userobject_id: userGlobalObject.userInfo._id,
					is_like: !likeState,
				},
				({msg}) => {
					setLikeCount(msg.targetComment.comment_like_count);
				},
				error => {
					console.log(error);
				},
			);
			props.like && props.like(props.parentComment);
		}
	};

	//답글 ~개 보기 클릭
	const showChildComment = () => {
		getChildCommentList(
			{
				commentobject_id: props.parentComment._id,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			result => {
				// console.log('getChildCommentList', result.msg[0]);
				setChild(result.msg);
				setShowChild(!showChild);
				props.showChild();
			},
			error => {
				console.log(error);
			},
		);
	};

	//미트볼 -> 수정 클릭
	const onEdit = data => {
		// console.log('props.parentComment', props.parentComment);
		props.onEdit && props.onEdit(data, props.parentComment._id);
	};

	const onDelete = () => {
		props.onPressDelete(data._id);
	};

	const onPressDeleteChild = id => {
		props.onPressDeleteChild(id);
		setTimeout(() => {
			showChildComment();
		}, 200);
	};

	//좋아요 클릭
	const like = data => {
		props.like && props.like(data);
	};

	//미트볼 클릭
	const onPressMeatball = () => {
		meatballRef.current.measure((fx, fy, width, height, px, py) => {
			const isWriter = userGlobalObject.userInfo._id == data.comment_writer_id._id;
			if (isWriter) {
				Modal.popSelectBoxModal(
					REPLY_MEATBALL_MENU_MY_REPLY,
					selectedItem => {
						switch (selectedItem) {
							case '수정':
								onEdit(props.parentComment);
								break;
							case '삭제':
								onDelete();
								break;
							case '상태 변경':
								alert('상태 변경!');
								break;
							case '공유하기':
								alert('공유하기!');
								break;
							default:
								break;
						}
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			} else {
				Modal.popSelectBoxModal(
					REPLY_MEATBALL_MENU,
					selectedItem => {
						switch (selectedItem) {
							case '신고':
								Modal.close();
								if (userGlobalObject.userInfo.isPreviewMode) {
									setTimeout(() => {
										Modal.popLoginRequestModal(() => {
											props.navigation.navigate('Login');
										});
									}, 100);
								} else {
									setTimeout(() => {
										Modal.popOneBtnSelectModal(
											REPORT_MENU,
											'이 댓글을 신고 하시겠습니까?',
											selectedItem => {
												createReport(
													{
														report_target_object_id: data._id,
														report_target_object_type: 'commentsobjects',
														report_target_reason: selectedItem,
														report_is_delete: false,
													},
													result => {
														console.log('신고 완료', result);
														Modal.close();
														Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
													},
													err => {
														console.log('신고 err', err);
														Modal.close();
													},
												);
											},
											'신고',
										);
									}, 100);
								}

							case '수정':
								// alert('수정!');
								// navigation.navigate('FeedEdit',props.data);
								break;
							case '삭제':
								alert('삭제');
								break;
							default:
								break;
						}
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			}
		});
	};

	const isNotAuthorized = () => {
		let result = true;
		if (!data.comment_is_secure) {
			//비밀댓글이 아니라면 public
			result = false;
		} else if (userGlobalObject.userInfo._id == data.comment_writer_id._id) {
			//비밀댓글이지만 댓글의 작성자라면 public
			result = false;
		} else if (userGlobalObject.userInfo._id != data.comment_writer_id._id && userGlobalObject.userInfo._id == data.comment_feed_writer_id) {
			//댓글의 작성자는 아니지만 해당 피드의 작성자라면 public (차후 기획이 바뀐다면 피드 작성자도 볼 수 없다)
			result = false;
		}
		return result;
	};

	const meatballRef = React.useRef();
	const childrenCount = child.length > 0 ? child.length : props.parentComment.children_count;

	return (
		<View style={organism_style.parentComment}>
			{/* 유저프로필 라벨 및 Meatball  */}
			<View style={[organism_style.UserLocationTimeLabel_view_parentComment, {}]}>
				<View style={[parentComment.userLabelContainer, {}]} collapsable={false} ref={meatballRef}>
					<UserLocationTimeLabel data={data.comment_writer_id} time={data.comment_update_date} target={props.target} />
					{data.comment_is_secure ? (
						<View style={[parentComment.secureIcon, {justifyContent: 'center'}]}>
							<SecureIcon40 />
						</View>
					) : (
						<></>
					)}
				</View>
				<View style={[]}>
					{meatball ? <Meatball50_APRI10_Vertical onPress={onPressMeatball} /> : <Meatball50_GRAY20_Vertical onPress={onPressMeatball} />}
				</View>
			</View>
			{/* 댓글 Dummy 이미지 및 대댓글 목록 */}
			{data.comment_photo_uri == undefined || isNotAuthorized() ? ( //img_square_round_574
				<></>
			) : (
				<View style={[organism_style.img_square_round_574, parentComment.img_square_round]}>
					<Image style={[styles.img_square_round_574]} source={{uri: data.comment_photo_uri}} />
				</View>
			)}
			{/* 댓글 내용 */}
			{data.comment_is_delete ? (
				<View style={[parentComment.comment_contents]}>
					<Text style={[txt.noto26, {color: GRAY20}]}> 작성자에의해 삭제된 댓글 입니다.</Text>
				</View>
			) : (
				<View style={[parentComment.comment_contents]}>
					{isNotAuthorized() ? (
						<Text style={[txt.noto26, {}]}> 비밀 댓글 입니다.</Text>
					) : (
						<Text style={[txt.noto26]}>{data ? data.comment_contents : ''}</Text>
					)}
				</View>
			)}

			{isNotAuthorized() || data.comment_is_delete ? (
				<></>
			) : (
				<View style={[parentComment.likeReplyButton]}>
					{/* Data - 좋아요 상태 t/f */}
					<View style={[parentComment.heart30]}>
						{likeState ? <Heart30_Filled onPress={onCLickHeart} /> : <Heart30_Border onPress={onCLickHeart} />}
					</View>
					<View style={[parentComment.likeCount]}>
						{/* Data - 좋아요 숫자 */}
						<Text style={(txt.roboto24, parentComment.likeCountText)}>{likeCount}</Text>
					</View>
					<TouchableOpacity style={[parentComment.writeComment]} onPress={onPressReplyBtn}>
						<Text style={[txt.noto22, parentComment.writeCommentText]}>· 답글 쓰기</Text>
					</TouchableOpacity>
				</View>
			)}
			{/* {data.children_count > 0 && <Text style={[txt.noto24, {color: GRAY10}]}> 답글{data.children_count}개 보기 </Text>} */}
			{childrenCount > 0 && (
				<TouchableOpacity onPress={showChildComment} style={[parentComment.showChildComment]}>
					<Text style={[txt.noto22, {color: GRAY10}]}> 답글 {childrenCount}개 보기 </Text>
					<Arrow_Down_GRAY10 />
				</TouchableOpacity>
			)}
			{/* Data - 대댓글List */}
			{showChild ? (
				<View style={[organism_style.childCommentList, parentComment.img_square_round_574]}>
					<ChildCommentList items={child} showChildComment={showChildComment} onPressDeleteChild={onPressDeleteChild} onEdit={onEdit} like={like} />
				</View>
			) : (
				false
			)}
		</View>
	);
});

ParentComment.defaultProps = {
	onPressReplyBtn: e => console.log(e), //부모 댓글의 답글 쓰기 클릭 이벤트
	onPressDelete: () => {},
	onPressDeleteChild: () => {},
	showChild: () => {},
	openChild: false,
};
