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
	Lock60_Border,
	Lock60_Filled,
	Meatball50_APRI10_Vertical,
	Meatball50_GRAY20_Vertical,
	ProfileDefaultImg,
	SecureIcon40,
} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE, REPLY_MEATBALL_MENU, REPLY_MEATBALL_MENU_MY_REPLY, SETTING_COMMENT, SETTING_OWN_COMMENT} from 'Root/i18n/msg';
import {GRAY10} from 'Root/config/color';
import {getChildCommentList} from 'Root/api/commentapi';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';

/**
 *
 * @param {{
 * data : Object,
 * onPress_ChildComment_ReplyBtn : void,
 * onPressReplyBtn : void,
 * }} props
 */
export default ParentComment = React.memo((props, ref) => {
	// console.log('ParentComment : ', props.parentComment.comment_writer_id.user_nickname, props.parentComment.comment_is_secure);
	// console.log('ParentComment', props.parentComment.comment_is_secure);

	const [data, setData] = React.useState(props.parentComment);
	const [child, setChild] = React.useState([]);
	const [likeState, setLikeState] = React.useState(false); //해당 댓글의 좋아요 상태 - 로그인 유저가 좋아요를 누른 기록이 있다면 filled , or border
	const [isMyComment, setIsMyComment] = React.useState(false); //해당 댓글 작성자가 본인인지 여부 Boolean
	const [showChild, setShowChild] = React.useState(false); //해당 댓글의 답글들 출력 여부 Boolean
	const [meatball, setMeatball] = React.useState(false); // 해당 댓글의 미트볼 헤더 클릭 여부

	React.useEffect(() => {
		setData(props.parentComment);

		// console.log('parantCommnet data', data);
		//API 에서 해당 데이터가 들어온 후 재작업 예정.
		//댓글의 Writer와 로그인유저가 일치하는 경우 내 댓글 처리
		// AsyncStorage.getItem('token', (err, res) => {
		// 	res == data.comment_writer_id ? setIsMyComment(true) : setIsMyComment(false);
		// 	// data에 존재하는 좋아요를 클릭한 UserObejct _id들 중 로그인한 유저의 _id가 포함되어 있다면 좋아요 상태는 true, or false
		// 	const like = data.like_comment_user_id.includes(parseInt(res));
		// 	like ? setLikeState(true) : setLikeState(false);
		// });
	}, [props.parentComment]);

	const addChildComment = newChildComment => {
		// newChildComment.comment_writer_id = userGlobalObject.userInfo;
		// setChild([newChildComment].concat(child));
		// setShowChild(true);
		// console.log(newChildComment);
		console.log('대댓글 추가');
		getChildCommentList(
			{
				commentobject_id: props.parentComment._id,
			},
			result => {
				console.log(result.msg);
				setChild(result.msg);
				!showChild && setShowChild(true);
			},
			err => Modal.alert(err),
		);
	};

	const onPressReplyBtn = () => {
		console.log('대댓글 추가2');
		props.onPressReplyBtn(props.parentComment._id, addChildComment);
	};

	const onCLickHeart = () => {
		setLikeState(!likeState);
	};

	const showChildComment = () => {
		getChildCommentList(
			{
				commentobject_id: props.parentComment._id,
			},
			result => {
				console.log(result.msg);
				setChild(result.msg);
				setShowChild(!showChild);
			},
			err => Modal.alert(err),
		);
	};

	const onSelectReplyMeatballMenu = i => {};

	const onPressMeatball = () => {
		// console.log('meatballREf', meatballRef);
		meatballRef.current.measure((fx, fy, width, height, px, py) => {
			const isWriter = userGlobalObject.userInfo._id == data.comment_writer_id._id;
			console.log('px', px);
			console.log('py', py);
			if (isWriter) {
				Modal.popDropdownModal(
					{x: px, y: py},
					REPLY_MEATBALL_MENU_MY_REPLY,
					selectedItem => {
						alert(REPLY_MEATBALL_MENU_MY_REPLY[selectedItem]);
					},
					() => {
						console.log('meatball', meatball);
					},
				);
			} else {
				Modal.popDropdownModal(
					{x: px, y: py},
					REPLY_MEATBALL_MENU,
					selectedItem => {
						alert(REPLY_MEATBALL_MENU[selectedItem]);
					},
					() => {
						console.log('meatball', meatball);
					},
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
			//비밀댓글이면 댓글의 작성자는 아니지만 해당 피드의 작성자라면 public (차후 기획이 바뀐다면 피드 작성자도 볼 수 없다)
			result = false;
		} else {
			// console.log('result', result);
			return result;
		}
	};
	// userGlobalObject.userInfo._id == data.comment_writer_id &&

	const meatballRef = React.useRef();
	const childrenCount = child.length > 0 ? child.length : props.parentComment.children_count;
	return (
		<View style={organism_style.parentComment}>
			{/* 유저프로필 라벨 및 Meatball  */}
			<View style={[organism_style.UserLocationTimeLabel_view_parentComment, {}]}>
				<View style={[parentComment.userLabelContainer, {}]} collapsable={false} ref={meatballRef}>
					<UserLocationTimeLabel data={data.comment_writer_id} time={data.comment_update_date} />
					{isNotAuthorized() ? (
						<View style={[parentComment.secureIcon]}>
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
			<View style={[parentComment.comment_contents]}>
				{isNotAuthorized() ? (
					<Text style={[txt.noto26, {}]}> 비밀 댓글 입니다.</Text>
				) : (
					<Text style={[txt.noto26]}>{data ? data.comment_contents : ''}</Text>
				)}
			</View>
			{isNotAuthorized() ? (
				<></>
			) : (
				<View style={[parentComment.likeReplyButton]}>
					{/* Data - 좋아요 상태 t/f */}
					<View style={[parentComment.heart30]}>
						{likeState ? <Heart30_Filled onPress={onCLickHeart} /> : <Heart30_Border onPress={onCLickHeart} />}
					</View>
					<View style={[parentComment.likeCount]}>
						{/* Data - 좋아요 숫자 */}
						<Text style={(txt.roboto24, parentComment.likeCountText)}>{data ? data.comment_like_count : ''}</Text>
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
					<ChildCommentList items={child} showChildComment={showChildComment} />
				</View>
			) : (
				false
			)}
		</View>
	);
});

ParentComment.defaultProps = {
	onPressReplyBtn: e => console.log(e), //부모 댓글의 답글 쓰기 클릭 이벤트
	onPress_ChildComment_ReplyBtn: e => console.log(e), //자식 댓글의 답글 쓰기 클릭 이벤ㅌ
};
