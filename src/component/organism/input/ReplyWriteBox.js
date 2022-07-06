import React, {useRef} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {APRI10, BLUE20, GRAY10, GRAY20, GRAY30, GRAY40, GRAY50, MAINBLACK, WHITE} from 'Root/config/color';
import {Cross46, Lock60_Border, Lock60_Filled, Photo60, Send60} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import SelectedMedia from 'Molecules/media/SelectedMedia';
import {feedCommentList} from 'Templete/style_templete';
import AniButton from 'Root/component/molecules/button/AniButton';
import DP from 'Root/config/dp';
import {btn_w120} from 'Root/component/atom/btn/btn_style';
import {txt} from 'Root/config/textstyle';
import PropsTypes, {any, array, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import {keyShow} from 'Root/component/molecules/input/usekeyboardbottom';
import comment_obj from 'Root/config/comment_obj';

/**
 * 댓글 작성 박스
 * @type {React.ForwardRefRenderFunction<?,ReplyWriteBoxProps>}
 *
 */
const ReplyWriteBox = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		focus: () => {
			inputRef.current.focus();
		},
		blur: () => {
			inputRef.current.blur();
		},
		clear: () => {
			onClear();
		},
	}));

	const [content, setContent] = React.useState('');
	const [photo, setPhoto] = React.useState('');
	const isChildComment = props.parentComment != '';

	React.useEffect(() => {
		if (props.editData) {
			// console.log('editData', props.editData.comment_contents);
			setContent(props.editData.comment_contents);
			setPhoto(props.editData.comment_photo_uri);
		}
	}, [props.editData]);

	const inputRef = useRef();

	const onWrite = () => {
		props.onWrite();
		setContent('');
		inputRef.current.clear && inputRef.current.clear();
	};

	const onDeleteImage = () => {
		props.onDeleteImage();
	};

	const onChangeText = text => {
		setContent(text);
		props.onChangeReplyInput(text);
	};

	const onPressReply = () => {
		props.onPressReply();
	};

	const onCancelChild = () => {
		Keyboard.dismiss();
		props.onCancelChild();
	};

	const onFocus = () => {
		setViewMode(false);
		props.onFocus && props.onFocus();
	};

	const onBlur = () => {
		setViewMode(true);
		props.onBlur && props.onBlur();
	};

	const [viewMode, setViewMode] = React.useState(false);

	const getParent = () => {
		if (isChildComment) {
			return (
				<View style={[style.parentComment_box, {}]}>
					<Text style={[txt.noto26b, {marginLeft: 10 * DP, paddingTop: 5 * DP}]}>
						{' '}
						{props.parentComment.comment_writer_id.user_nickname}
						<Text style={[txt.noto26]}>님에게 </Text>
					</Text>
					<TouchableOpacity activeOpacity={0.2} onPress={onCancelChild} style={style.crossMark}>
						<Cross46 />
					</TouchableOpacity>
				</View>
			);
		} else {
			return <View style={{height: 20 * DP}}></View>;
		}
	};

	if (props.isProtectRequest) {
		return (
			<View style={[style.commentBox_protect_request, {}]}>
				<TouchableOpacity onPress={onPressReply} style={[style.commentBox_protect_request_left]}>
					<Text style={[txt.noto28, style.replyTextInput_protect_request, {}]}>댓글입력</Text>
				</TouchableOpacity>
				<AniButton onPress={onPressReply} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'댓글'} titleFontStyle={24} />
			</View>
		);
	} else if (props.isMessage) {
		return (
			<View style={[style.commentBox, {flexDirection: 'row', paddingTop: 20 * DP}]}>
				<View style={[style.commentBox_top, {width: 550 * DP}, , {marginRight: 24 * DP}]}>
					<TextInput
						defaultValue={content == '' ? null : content}
						value={content == '' ? null : content}
						style={[style.replyTextInput]}
						multiline={true}
						placeholder={'메세지 입력..'}
						placeholderTextColor="#000000"
						onChangeText={onChangeText}
						onBlur={onBlur}
						ref={inputRef}
					/>
				</View>
				<AniButton onPress={onWrite} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'보내기'} titleFontStyle={24} />
			</View>
		);
	} else {
		return (
			<View style={[style.editComment, props.shadow ? style.shadow : style.shadow_off]}>
				{/* 키보드가 해제 모드 / 댓글 수정 모드 X / 대댓글 모드 X / 사진 X 일 경우에만 출력되는 댓글 스타일 */}
				{viewMode && !isChildComment && !props.editMode && photo == '' && photo.length == 0 ? (
					<>
						<View style={[style.commentBox_viewMode, {backgroundColor: isChildComment ? GRAY40 : WHITE}]}>
							<View style={[style.iconCont_viewMode]}>
								<Photo60 onPress={props.onAddPhoto} />
								<View style={{marginLeft: 10 * DP}}>
									{props.privateComment ? <Lock60_Filled onPress={props.onLockBtnClick} /> : <Lock60_Border onPress={props.onLockBtnClick} />}
								</View>
							</View>
							<View style={[style.commentBox_viewMode_input]}>
								<TextInput
									defaultValue={content == '' ? null : content}
									style={[style.replyTextInput, {width: 394 * DP}]}
									multiline={true}
									placeholder={'댓글입력'}
									placeholderTextColor="#767676"
									maxLength={80}
									onChangeText={onChangeText}
									onFocus={onFocus}
									onBlur={onBlur}
									ref={inputRef}
								/>
							</View>
							<View style={[style.commentBtn_viewMode, {marginLeft: 24 * DP}]}>
								<AniButton onPress={props.onWrite} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'댓글'} titleFontStyle={24} />
							</View>
						</View>
					</>
				) : photo && photo.length > 0 ? (
					<View style={[style.commentBox_photo]}>
						{getParent()}
						<View style={[style.commentBox_top_photo, {flexDirection: 'row'}]}>
							<View style={[style.commentBox_input_photo]}>
								<TextInput
									defaultValue={content == '' ? null : content}
									style={[style.replyTextInput_photo]}
									multiline={true}
									maxLength={80}
									placeholder={'댓글입력..'}
									onFocus={onFocus}
									onChangeText={onChangeText}
									onBlur={onBlur}
									ref={inputRef}
									placeholderTextColor="#767676"
								/>
							</View>
							<SelectedMedia media_uri={photo} layout={styles.img_square_round_190} onDelete={onDeleteImage} />
						</View>
						<CommentBoxBottom {...props} onWrite={onWrite} />
					</View>
				) : (
					<View style={[style.commentBox]}>
						{getParent()}
						<View style={[style.commentBox_top]}>
							<TextInput
								defaultValue={content == '' ? null : content}
								style={[style.replyTextInput]}
								multiline={true}
								placeholder={'댓글입력..'}
								placeholderTextColor="#767676"
								maxLength={80}
								onChangeText={onChangeText}
								onFocus={onFocus}
								onBlur={onBlur}
								ref={inputRef}
							/>
						</View>
						<CommentBoxBottom {...props} onWrite={onWrite} />
					</View>
				)}
			</View>
		);
	}
});

const CommentBoxBottom = props => {
	const getBtnTitle = () => {
		let result = '댓글';
		if (props.parentComment) {
			result = '답글';
		} else if (props.editData && props.editData._id) {
			result = '수정';
		}
		return result;
	};
	return (
		<View style={[style.commentBox_bottom]}>
			<View style={[style.commentBox_bottom_left]}>
				<Photo60 onPress={props.onAddPhoto} />
				{props.privateComment ? <Lock60_Filled onPress={props.onLockBtnClick} /> : <Lock60_Border onPress={props.onLockBtnClick} />}
			</View>
			<View style={[style.commentBox_bottom_right]}>
				<AniButton onPress={props.onWrite} btnLayout={btn_w120} btnStyle={'border'} btnTitle={getBtnTitle()} titleFontStyle={24} />
			</View>
		</View>
	);
};

const ReplyWriteBoxProps = {
	/** @type {boolean} 쪽지함에서의 호출 여부 */
	isMessage: bool,
	/** @type {boolean} 댓글 박스 그림자효과의 on Off default is 'true' */
	shadow: bool,
	/** @type {boolean} 보호요청 게시글에서의 호출 default */
	isProtectRequest: bool,
	/** @type {boolean} 비밀글 */
	privateComment: bool,
	/** @type {boolean} 키보드 출력 여부 */
	viewMode: bool,
	/** @type {()=>void} 답글쓰기 눌렀을 때 동작하는 콜백 */
	onPressReply: func,
	/** @type {()=>void} 댓글 버튼 눌렀을 때 동작하는 콜백 */
	onWrite: func,
	/** @type {()=>void} 댓글에서 이미지 삭제하였을 때 동작하는 콜백 */
	onDeleteImage: func,
	/** @type {()=>void} 댓글에서 이미지 추가하였을 때 동작하는 콜백 */
	onAddPhoto: func,
	/** @type {()=>void} 댓글박스 인풋 포커스 입력 콜백 */
	onFocus: func,
	/** @type {()=>void} 댓글박스 인풋 포커스 해제 콜백 */
	onBlur: func,
	/** @type {()=>void} 댓글박스 인풋 메시지 입력 콜백 */
	onChangeReplyInput: func,
	/** @type {()=>void} 댓글의 비밀댓글 여부 */
	onLockBtnClick: func,
	/** @type {()=>void} 댓글의 사진 리스트 */
	photo: array,
};
ReplyWriteBox.propTypes = ReplyWriteBoxProps;

ReplyWriteBox.defaultProps = {
	onLockBtnClick: e => console.log(e), // 비밀 댓글 클릭
	onAddPhoto: e => console.log(e), // 사진추가하기 버튼 클릭
	onChangeReplyInput: e => console.log(e), // 리플 Input 변경
	onFocusReplyBox: e => console.log(e), // 리플 Input 변경
	onDeleteImage: e => console.log(e),
	onWrite: e => console.log(e), // 보내기 클릭
	onPressReply: e => console.log(e), // 댓글입력(보호요청게시글일 경우) 클릭
	privateComment: false, // 비밀 댓글 상태 여부
	isMessage: false,
	shadow: true,
	viewMode: false,
	photo: [],
	parentComment: '',
	onCancelChild: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

const style = StyleSheet.create({
	editComment: {
		width: 750 * DP,
		backgroundColor: WHITE,
		bottom: 1,
		alignItems: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 2.65,
		shadowOffset: {
			width: 1 * DP,
			height: 1 * DP,
		},
		elevation: 2,
	},
	shadow_off: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.2,
		// shadowRadius: 2.65,
		// shadowOffset: {
		// 	width: 1 * DP,
		// 	height: 2 * DP,
		// },
		// elevation: 2,
	},
	replyTextInput: {
		width: 646 * DP,
		marginLeft: 20 * DP,
		fontSize: 28 * DP,
		paddingVertical: 0 * DP,
		includeFontPadding: false,
		color: MAINBLACK,
		// backgroundColor: 'yellow',
	},
	replyTextInput_photo: {
		width: 460 * DP,
		marginRight: 12 * DP,
		paddingVertical: 0,
		paddingHorizontal: 10 * DP,
		includeFontPadding: false,
		// color: MAINBLACK,
		// backgroundColor: 'pink',
	},
	replyTextInput_protect_request: {
		color: GRAY10,
	},
	commentBox_protect_request_left: {
		width: 550 * DP,
		height: 68 * DP,
		marginRight: 12 * DP,
		borderRadius: 24 * DP,
		justifyContent: 'center',
		paddingLeft: 25 * DP,
		// paddingTop: 5 * DP,
		backgroundColor: GRAY50,
	},
	commentBox: {
		width: 750 * DP,
		// paddingVertical: 28 * DP,
		paddingBottom: 10 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	commentBox_photo: {
		width: 750 * DP,
		paddingTop: 20 * DP,
		paddingBottom: 20 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
	},
	commentBox_protect_request: {
		width: 694 * DP,
		height: 68 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	commentBox_input_photo: {
		width: 492 * DP,
		height: 190 * DP,
		borderRadius: 30 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 20 * DP,
		// paddingVertical: 12 * DP,
		paddingVertical: 20 * DP,
		backgroundColor: GRAY50,
	},
	commentBox_top_photo: {
		width: 694 * DP,
		height: 190 * DP,
		borderRadius: 24 * DP,
		marginBottom: 12 * DP,
		// justifyContent: 'space-between',
	},
	commentBox_top: {
		width: 694 * DP,
		// maxHeight: 224 * DP,
		padding: 10 * DP,
		borderRadius: 24 * DP,
		marginBottom: 12 * DP,
		backgroundColor: GRAY50,
	},
	commentBox_bottom: {
		width: 694 * DP,
		height: 68 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	commentBox_bottom_left: {
		flexDirection: 'row',
	},
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	parentComment_box: {
		paddingBottom: 16 * DP,
		paddingLeft: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		justifyContent: 'center',
	},
	crossMark: {
		width: 60 * DP,
		height: 60 * DP,
		marginTop: 8 * DP,
		marginLeft: 20 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconCont_viewMode: {
		width: 118 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'red',
	},
	commentBox_viewMode: {
		width: 750 * DP,
		flexDirection: 'row',
		paddingVertical: 20 * DP,
		paddingHorizontal: 14 * DP,
		justifyContent: 'center',
		backgroundColor: WHITE,
	},
	commentBox_viewMode_input: {
		padding: 10 * DP,
		borderRadius: 24 * DP,
		marginBottom: 12 * DP,
		marginLeft: 26 * DP,
		backgroundColor: GRAY50,
		width: 428 * DP,
		// height: 68 * DP,
	},
});

export default ReplyWriteBox;
