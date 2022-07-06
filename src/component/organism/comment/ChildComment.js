import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Heart30_Border, Heart30_Filled, Meatball50_GRAY20_Vertical, Report30, SecureIcon40} from 'Atom/icon';
import {REPLY_MEATBALL_MENU_MY_REPLY} from 'Root/i18n/msg';
import {styles} from 'Atom/image/imageStyle';
import UserTimeLabel from 'Molecules/label/UserTimeLabel';
import {useNavigation} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeComment} from 'Root/api/commentapi';
import {REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import Modal from 'Root/component/modal/Modal';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import {count_to_K} from 'Root/util/stringutil';
/**
 * 자식 댓글
 * @param {object} props - Props Object
 * @param {Object} props.data -  comment data object
 * @param {Object} props.parent - 부모 comment data object
 * @param {(id:string)=>void} props.onPressDeleteChild - 대댓글 삭제
 * @param {(data:object)=>void} props.onEdit - 대댓글 수정
 */
const ChildComment = props => {
	const [data, setData] = React.useState(props.data);
	const [likeCount, setLikeCount] = React.useState(0);
	const [likeState, setLikeState] = React.useState(false);
	const [meatball, setMeatball] = React.useState(false); // 해당 댓글의 미트볼 헤더 클릭 여부

	const navigation = useNavigation();
	React.useEffect(() => {
		setData(props.data);
		setLikeState(props.data.comment_is_like);
		setLikeCount(props.data.comment_like_count);
	}, [props.data]);

	const onCLickHeart = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			setLikeState(!likeState);
			likeComment(
				{
					commentobject_id: props.data._id,
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
			props.like && props.like(props.data);
		}
	};

	//대댓글의 미트볼 클릭
	const onPressMeatball = () => {
		console.log('comment_writer_id', data.comment_writer_id);
		if (data.comment_writer_id) {
			const isWriter = userGlobalObject.userInfo._id == data.comment_writer_id._id;
			if (isWriter) {
				Modal.popSelectBoxModal(
					REPLY_MEATBALL_MENU_MY_REPLY,
					selectedItem => {
						switch (selectedItem) {
							case '수정':
								props.onEdit && props.onEdit(data);
								break;
							case '삭제':
								props.onPressDeleteChild(data._id);
								break;
							default:
								break;
							case '상태 변경':
								alert('상태 변경!');
								break;
							case '공유하기':
								alert('공유하기!');
								break;
						}
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			}
		}
	};

	const onPressReplyPhoto = src => {
		Modal.popPhotoListViewModal([src], Modal.close);
	};

	const reportComment = () => {
		Modal.close();
		if (userGlobalObject.userInfo.isPreviewMode) {
			setTimeout(() => {
				Modal.popLoginRequestModal(() => {
					navigation.navigate('LoginRequired');
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
								Modal.popOneBtn('이 댓글은 신고 되었습니다.', '확인', () => Modal.close());
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
			}, 100);
		}
	};

	const onDeleteChild = () => {
		Modal.popTwoBtn('댓글을 삭제하시겠습니까?', '아니오', '네', Modal.close, () => {
			props.onPressDeleteChild(data._id);
			Modal.close();
		});
	};

	const isMyComment = userGlobalObject.userInfo._id == data.comment_writer_id._id;

	//비밀댓글일 경우 public 여부 판별
	const isNotAuthorized = () => {
		if (props.parent && props.parent.comment_writer_id._id == userGlobalObject.userInfo._id) {
			//부모댓글의 작성자는 볼 수 있음
			return false;
		} else if (!data.comment_is_secure || isMyComment) {
			//비밀댓글이 아니라면 public
			return false;
		} else {
			return true;
		}
	};

	const onLabelClick = userObject => {
		navigation.navigate({key: userObject._id, name: 'UserProfile', params: {userobject: userObject}});
	};

	return (
		<View style={[childComment.container]}>
			<View style={[childComment.profileContainer]}>
				<View style={[childComment.userTimeLabel]}>
					{data ? (
						<View style={{flexDirection: 'row'}}>
							<UserTimeLabel data={data} onLabelClick={onLabelClick} />
							{data.comment_is_secure ? (
								<View style={[{top: -6 * DP, marginLeft: 6 * DP}]}>
									<SecureIcon40 />
								</View>
							) : (
								<></>
							)}
						</View>
					) : (
						<UserTimeLabel data={data} empty={true} />
					)}
				</View>

				{/* {data.comment_writer_id && isMyComment ? (
					<View style={[childComment.meatBall50_vertical]}>
						{meatball ? <Meatball50_APRI10_Vertical onPress={onPressMeatball} /> : <Meatball50_GRAY20_Vertical onPress={onPressMeatball} />}
					</View>
				) : (
					<></>
				)} */}
			</View>
			{/* 해당 대댓글이 photo_uri를 가지고 있는 경우만 IMage 출력 */}
			{data.comment_photo_uri != null && !isNotAuthorized() ? (
				<TouchableOpacity onPress={() => onPressReplyPhoto(data.comment_photo_uri)} activeOpacity={0.4} style={[childComment.img_square_round_484]}>
					{data.comment_photo_uri.includes('http') ? (
						<FastImage style={[styles.img_square_round_544]} source={{uri: data.comment_photo_uri}} />
					) : (
						<Image style={[styles.img_square_round_544]} source={{uri: data.comment_photo_uri}} />
					)}
				</TouchableOpacity>
			) : (
				<></>
			)}
			{/* 댓글 텍스트 */}
			<View style={[childComment.commentContainer]}>
				{isNotAuthorized() ? (
					<Text style={[txt.noto26, {}]}> 비밀 댓글 입니다.</Text>
				) : (
					<Text style={[txt.noto24]}>{data ? data.comment_contents : ''}</Text>
				)}
			</View>
			{/* 좋아요 버튼, 좋아요 숫자 , 답글쓰기 컨테이너 */}
			<View style={[childComment.likeReplyButton, {}]}>
				{isNotAuthorized() ? (
					<></>
				) : (
					<>
						{isMyComment ? (
							<View style={{flexDirection: 'row'}}>
								<TouchableOpacity onPress={onDeleteChild}>
									<Text style={[txt.noto24, {color: GRAY10}]}> 삭제 · </Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => props.onEdit && props.onEdit(data)}>
									<Text style={[txt.noto24, {color: GRAY10}]}> 수정 · </Text>
								</TouchableOpacity>
							</View>
						) : (
							<TouchableOpacity onPress={reportComment} style={[{flexDirection: 'row'}]}>
								<Report30 />
								<Text style={[txt.noto24, {color: GRAY10}]}> 신고 · </Text>
							</TouchableOpacity>
						)}
						{likeState ? <Heart30_Filled onPress={onCLickHeart} /> : <Heart30_Border onPress={onCLickHeart} />}
						<View style={[childComment.likeCount]}>
							<Text style={(txt.roboto24, childComment.likeCountText)}>{count_to_K(likeCount)}</Text>
						</View>
					</>
				)}
			</View>
		</View>
	);
};

ChildComment.defaultProps = {
	data: {
		img: false,
		comment: '개',
		likecount: 80,
	},
	onPressDeleteChild: () => {},
};

export default ChildComment;

export const childComment = StyleSheet.create({
	container: {
		width: 604 * DP,
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	profileContainer: {
		width: 604 * DP,
		height: 50 * DP,
		// marginBottom: 10 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	commentMark: {
		width: 14 * DP,
		height: 14 * DP,
		borderLeftWidth: 2 * DP,
		borderBottomWidth: 2 * DP,
		borderLeftColor: GRAY10,
		borderBottomColor: GRAY10,
	},
	userTimeLabel: {
		width: 488 * DP,
		height: 46 * DP,
		marginLeft: 10 * DP,
		// backgroundColor: 'red',
	},
	meatBall50_vertical: {
		width: 50 * DP,
		height: 50 * DP,
		// marginLeft: 58 * DP,
	},
	img_square_round_484: {
		alignSelf: 'flex-end',
		marginBottom: 12 * DP,
	},
	commentContainer: {
		width: 528 * DP,
		marginLeft: 60 * DP,
		marginBottom: 4 * DP,
	},
	commentText: {},
	likeReplyButton: {
		// width: 222 * DP,
		// height: 34 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	heart30: {
		width: 30 * DP,
		height: 30 * DP,
	},
	likeCount: {
		// width: 30 * DP,
		height: 30 * DP,
		marginLeft: 6 * DP,
	},
	likeCountText: {
		color: GRAY10,
		textAlignVertical: 'center',
		textAlign: 'center',
		lineHeight: 34 * DP,
	},
	writeComment: {
		width: 130 * DP,
		height: 34 * DP,
	},
	writeCommentText: {
		color: GRAY20,
		includeFontPadding: false,
	},
});
