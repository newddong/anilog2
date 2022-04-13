import React, {useRef} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {BLUE10, BLUE20, GRAY10} from 'Root/config/color';
import {Lock60_Border, Lock60_Filled, Photo60, Send60} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import SelectedMedia from 'Molecules/media/SelectedMedia';
import {feedCommentList} from 'Templete/style_templete';
import AniButton from 'Root/component/molecules/button/AniButton';
import DP from 'Root/config/dp';
import {btn_w116, btn_w120} from 'Root/component/atom/btn/btn_style';
import {txt} from 'Root/config/textstyle';
/**
 * @param {{
 * onLockBtnClick : void ,
 * onChangeReplyInput : void,
 * onAddPhoto : void,
 * onDeleteImage : 'void / 댓글창에서 추가한 사진 삭제 버튼 클릭',
 * onWrite : void,
 * onFocusReplyBox : void,
 * onPressReply : void,
 * privateComment : 'boolean / 비밀글 여부',
 * isProtectRequest : 'boolean / 보호요청 게시글에서의 호출',
 * photo : 'Array / 사진 목록',
 * isMessage : 'boolean' /쪽지함에서의 호출,
 * shadow : 'boolean' / 그림자 효과 on off,
 * parentComment: 'object',
 * }} props
 */

export default ReplyWriteBox = React.forwardRef((props, ref) => {
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
	const [parentNickWidth, setParentNickWidth] = React.useState(0);

	React.useEffect(() => {
		if (props.editData) {
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

	const onLayout = e => {
		console.log('e', e.nativeEvent.layout.width);
		setParentNickWidth(e.nativeEvent.layout.width);
	};

	const getParent = () => {
		if (isChildComment) {
			return (
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text onLayout={onLayout} style={[txt.noto26, {color: BLUE20, marginLeft: 10 * DP, paddingTop: 5 * DP}]}>
						{' '}
						@{props.parentComment.comment_writer_id.user_nickname}
						{'  '}
					</Text>
					{/* <Text style={[txt.noto22, {color: BLUE20, paddingTop: 10 * DP}]}>{'  '}취소</Text> */}
					<View style={{marginTop: 8 * DP}}>
						<AniButton
							btnStyle={'border'}
							onPress={props.onCancelChild}
							btnLayout={{paddingHorizontal: 10 * DP, height: 35 * DP, borderRadius: 20 * DP}}
							titleFontStyle={18}
							btnTitle={'답글취소'}
						/>
					</View>
				</View>
			);
		} else {
			return <></>;
		}
	};

	if (props.isProtectRequest) {
		return (
			<View style={[feedCommentList.commentBox_protect_request]}>
				<TouchableOpacity activeOpacity={0.6} onPress={onPressReply} style={[feedCommentList.commentBox_protect_request_left]}>
					<Text style={[txt.noto26, feedCommentList.replyTextInput_protect_request, {}]} ref={inputRef}>
						댓글입력
					</Text>
				</TouchableOpacity>
				<AniButton onPress={onPressReply} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'댓글'} titleFontStyle={24} />
			</View>
		);
	} else if (props.isMessage) {
		return (
			<View style={[feedCommentList.commentBox, {flexDirection: 'row'}]}>
				<View style={[feedCommentList.commentBox_top, {width: 550 * DP}, , {marginRight: 24 * DP}]}>
					<TextInput
						defaultValue={content == '' ? null : content}
						style={[feedCommentList.replyTextInput]}
						multiline={true}
						placeholder={'메세지 입력..'}
						onChangeText={onChangeText}
						onFocus={props.onFocus}
						ref={inputRef}
					/>
				</View>
				<AniButton onPress={onWrite} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'보내기'} titleFontStyle={24} />
			</View>
		);
	} else {
		return (
			<View style={[feedCommentList.editComment, props.shadow ? feedCommentList.shadow : feedCommentList.shadow_off]}>
				{/* 사진 추가를 통해서 받아온 사진이 한 개 이상인 경우 */}
				{photo && photo.length > 0 ? (
					<View style={[feedCommentList.commentBox_photo]}>
						<View style={[feedCommentList.commentBox_top_photo, {flexDirection: 'row'}]}>
							<View style={[feedCommentList.commentBox_input_photo]}>
								<TextInput
									defaultValue={content == '' ? null : content}
									style={[feedCommentList.replyTextInput_photo]}
									multiline={true}
									placeholder={'댓글입력..'}
									onChangeText={onChangeText}
									onFocus={props.onFocus}
									ref={inputRef}
								/>
							</View>

							<SelectedMedia media_uri={photo} layout={styles.img_square_round_190} onDelete={onDeleteImage} />
						</View>
						<CommentBoxBottom {...props} onWrite={onWrite} />
					</View>
				) : (
					<View style={[feedCommentList.commentBox]}>
						<View style={[feedCommentList.commentBox_top]}>
							{/* {getParent()} */}
							<TextInput
								defaultValue={content == '' ? null : content}
								style={[feedCommentList.replyTextInput, {}]}
								multiline={true}
								placeholder={'댓글입력..'}
								onChangeText={onChangeText}
								ref={inputRef}></TextInput>
						</View>
						<CommentBoxBottom {...props} onWrite={onWrite} />
					</View>
				)}
			</View>
		);
	}
});

const CommentBoxBottom = props => {
	return (
		<View style={[feedCommentList.commentBox_bottom]}>
			<View style={[feedCommentList.commentBox_bottom_left]}>
				{props.privateComment ? <Lock60_Filled onPress={props.onLockBtnClick} /> : <Lock60_Border onPress={props.onLockBtnClick} />}
				<Photo60 onPress={props.onAddPhoto} />
			</View>
			<View style={[feedCommentList.commentBox_bottom_right]}>
				<AniButton onPress={props.onWrite} btnLayout={btn_w120} btnStyle={'border'} btnTitle={'댓글'} titleFontStyle={24} />
			</View>
			{/* <Send60 onPress={onWrite} /> */}
		</View>
	);
};

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
	photo: [],
	parentComment: '',
	onCancelChild: () => {},
};
