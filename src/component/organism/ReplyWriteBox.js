import React, {useRef} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {Lock60_Border, Lock60_Filled, Photo60, Send60} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import SelectedMedia from 'Molecules/media/SelectedMedia';
import {feedCommentList} from '../templete/style_templete';
/**
 * @param {{
 * onLockBtnClick : void ,
 * onChangeReplyInput : void,
 * onAddPhoto : void,
 * onDeleteImage : 'void / 댓글창에서 추가한 사진 삭제 버튼 클릭',
 * onWrite : void,
 * onFocusReplyBox : void,
 * privateComment : 'boolean / 비밀글 여부',
 * isProtectRequest : 'boolean / 보호요청 게시글에서의 호출',
 * photo : 'Array / 사진 목록',
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

	const inputRef = useRef();

	const onWrite = () => {
		props.onWrite();
		inputRef.current.clear();
	};

	const onDeleteImage = () => {
		props.onDeleteImage();
	};

	if (props.isProtectRequest) {
		return (
			<View style={[feedCommentList.editCommentFromRequest]}>
				{/* 사진 추가를 통해서 받아온 사진이 한 개 이상인 경우 */}
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<TextInput
						style={[feedCommentList.InputFromProtectRequest]}
						placeholder={'댓글 입력'}
						placeholderTextColor={GRAY10}
						onChangeText={props.onChangeReplyInput}
						ref={inputRef}
					/>
					<Send60 onPress={onWrite} />
				</View>
			</View>
		);
	} else {
		return (
			<View style={[props.photo.length > 0 ? feedCommentList.editComment : feedCommentList.editComment_photoAdded]}>
				{/* 사진 추가를 통해서 받아온 사진이 한 개 이상인 경우 */}
				{props.photo.length > 0 ? (
					<View style={[styles.img_square_round_606]}>
						{/* <Image source={{ uri: props.photo[0] }} style={styles.img_square_round_606} /> */}
						<SelectedMedia media_uri={props.photo} layout={styles.img_square_round_606} onDelete={onDeleteImage} />
					</View>
				) : (
					false
				)}
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					{/* {props.privateComment ? <Lock60_Filled onPress={() => props.onLockBtnClick()} /> : <Lock60_Border onPress={() => props.onLockBtnClick()} />} */}
					<Photo60 onPress={() => props.onAddPhoto()} />
					<TextInput style={[feedCommentList.replyTextInput]} onChangeText={props.onChangeReplyInput} ref={inputRef} />
					<Send60 onPress={onWrite} />
				</View>
			</View>
		);
	}
});

ReplyWriteBox.defaultProps = {
	onLockBtnClick: e => console.log(e), // 비밀 댓글 클릭
	onAddPhoto: e => console.log(e), // 사진추가하기 버튼 클릭
	onChangeReplyInput: e => console.log(e), // 리플 Input 변경
	onFocusReplyBox: e => console.log(e), // 리플 Input 변경
	onDeleteImage: e => console.log(e),
	onWrite: e => console.log(e), // 보내기 클릭
	privateComment: false, // 비밀 댓글 상태 여부
	photo: [],
};
