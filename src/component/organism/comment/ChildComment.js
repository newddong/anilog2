import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Heart30_Border, Heart30_Filled, Meatball50_GRAY20_Vertical} from 'Atom/icon';
import {DEFAULT_PROFILE, REPLY_MEATBALL_MENU, REPLY_MEATBALL_MENU_MY_REPLY} from 'Root/i18n/msg';
import {styles} from 'Atom/image/imageStyle';
import UserTimeLabel from 'Molecules/label/UserTimeLabel';
import {useNavigation} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';
import {likeComment} from 'Root/api/commentapi';
import {REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import Modal from 'Root/component/modal/Modal';
/**
 * 자식 댓글
 * @param {object} props - Props Object
 * @param {Object} props.data - 부모 comment data object
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
				navigation.navigate('Login');
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
		} else {
			//작성자가 아닐 시 신고만 출력
			Modal.popSelectBoxModal(
				REPLY_MEATBALL_MENU,
				selectedItem => {
					switch (selectedItem) {
						case '신고':
							// alert('신고');
							Modal.close();
							console.log('data', data);
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
	};

	return (
		<View style={[childComment.container]}>
			<View style={[childComment.profileContainer]}>
				<View style={[childComment.userTimeLabel]}>
					<UserTimeLabel data={data || null} onLabelClick={userobject => navigation.push('UserProfile', {userobject: userobject})} />
				</View>
				<View style={[childComment.meatBall50_vertical]}>
					{meatball ? <Meatball50_APRI10_Vertical onPress={onPressMeatball} /> : <Meatball50_GRAY20_Vertical onPress={onPressMeatball} />}
				</View>
			</View>
			{/* 해당 대댓글이 photo_uri를 가지고 있는 경우만 IMage 출력 */}
			{data.comment_photo_uri != null ? (
				<View style={[childComment.img_square_round_484]}>
					<Image style={[styles.img_square_round_484]} source={{uri: data ? data.comment_photo_uri : DEFAULT_PROFILE}} />
				</View>
			) : (
				<></>
			)}
			{/* 댓글 텍스트 */}
			<View style={[childComment.commentContainer]}>
				<Text style={[txt.noto24]}>{data ? data.comment_contents : ''}</Text>
			</View>
			{/* 좋아요 버튼, 좋아요 숫자 , 답글쓰기 컨테이너 */}
			<View style={[childComment.likeReplyButton]}>
				<View style={[childComment.heart30]}>
					{likeState ? <Heart30_Filled onPress={onCLickHeart} /> : <Heart30_Border onPress={onCLickHeart} />}
				</View>
				<View style={[childComment.likeCount]}>
					<Text style={(txt.roboto24, childComment.likeCountText)}>{likeCount}</Text>
				</View>
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
		width: 574 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	profileContainer: {
		width: 574 * DP,
		height: 50 * DP,
		// marginBottom: 10 * DP,
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
		width: 442 * DP,
		height: 46 * DP,
		marginLeft: 10 * DP,
	},
	meatBall50_vertical: {
		width: 50 * DP,
		height: 50 * DP,
		marginLeft: 58 * DP,
	},
	img_square_round_484: {
		alignSelf: 'flex-end',
		marginBottom: 12 * DP,
	},
	commentContainer: {
		width: 484 * DP,
		marginLeft: 90 * DP,
		marginBottom: 4 * DP,
	},
	commentText: {},
	likeReplyButton: {
		// width: 222 * DP,
		height: 34 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	heart30: {
		width: 30 * DP,
		height: 30 * DP,
	},
	likeCount: {
		width: 50 * DP,
		height: 30 * DP,
		marginLeft: 12 * DP,
	},
	likeCountText: {
		color: GRAY10,
		textAlignVertical: 'center',
		textAlign: 'center',
		lineHeight: 30 * DP,
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
