import React from 'react';
import {Image, Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView, TextInput, Keyboard, FlatList, Platform} from 'react-native';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {GliderIcon, PictureIcon} from 'Asset/image';
import {LikeIcon, LikeUncheckedIcon, CommentIcon, CommentReplyIcon, DeleteImage} from 'Asset/image';
import Comment from './comment';
import PostContents from './postcontents';
import {useKeyboardBottom} from './usekeyboardbottom';
import {TabContext} from 'tabContext';
import {getCommentList, createComment, modifyComment} from '../../../../api/feedapi';
import FormTxtInput from 'Screens/common/formtxtinput';
import {text} from '../../profile/style_profile';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

export default CommentList = props => {
	const tab = React.useContext(TabContext);
	const [data, setData] = React.useState({commentList: [], liked: []});

	const keyboardY = useKeyboardBottom();
	const [isInput, setInput] = React.useState(false);
	const inputForm = React.createRef();
	const reply = React.useRef({id: undefined, subComments: undefined, setSubComments: undefined});
	const setComment = React.useRef();
	const [editComment, setEditComment] = React.useState({content: undefined, images: [], _id: undefined});

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', e => {
			tab.tabVisible(false);
		});
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('blur', e => {
			tab.tabVisible(true);
		});

		return unsubscribe;
	}, []);

	React.useEffect(() => {
		getCommentList(
			{
				post_id: props.route.params.data._id,
			},
			(comments, liked) => {
				setData({commentList: comments, liked: liked});
			},
		);
	}, []);

	React.useEffect(() => {
		setEditComment({...editComment, images: [props.route.params.localSelectedImages]});
	}, [props.route.params]);

	const writeComment = () => {
		if (editComment.content.length === 0) {
			alert('댓글을 입력하세요');
		} else {
			if (editComment._id === undefined) {
				createComment(
					{
						post_id: props.route.params.data._id,
						parent_id: reply.current.id,
						comment: editComment.content,
						image: editComment.images[0]?.uri,
					},
					(newComment, user) => {
						console.log(newComment);
						let comment = {...newComment, user: user};
						if (!reply.current.id) {
							setData({commentList: [comment, ...data.commentList], liked: data.liked});
						} else {
							reply.current.setSubComments({
								commentList: [comment, ...reply.current.subComments.commentList],
								liked: reply.current.subComments.liked,
							});
						}
						setEditComment({content: '', images: []});
						setInput(false);
						Keyboard.dismiss();
						reply.current.id = undefined;
					},
				);
			} else {
				modifyComment(
					{
						comment_id: editComment._id,
						comment: editComment.content,
						images: editComment.images[0].uri,
					},
					(result, user) => {
						setComment.current({...result, user: user});
						setEditComment({content: '', images: []});
						setInput(false);
						Keyboard.dismiss();
						reply.current.id = undefined;
					},
				);
			}

			inputForm.current.clear();
		}
	};
	const changeText = e => {
		setEditComment({...editComment, content: e.nativeEvent.text});
	};

	const showInput = () => {
		setInput(true);
		inputForm.current.focus();
	};
	const closeInput = () => {
		setEditComment({content: '', images: [], _id: ''});
		setInput(false);
		inputForm.current.blur();
	};
	const writeReply = (id, subComments, setSubComments) => {
		reply.current.id = id;
		reply.current.subComments = subComments;
		reply.current.setSubComments = setSubComments;
		showInput();
	};

	const selectPhoto = () => {
		props.navigation.push('AddSinglePhoto', {navfrom: 'CommentList'});
	};

	const deletePhoto = () => {
		setEditComment({...editComment, images: []});
	};

	const edit = (comment, setFn) => {
		// console.log(comment)
		setComment.current = setFn;
		setEditComment({content: comment.comment, images: [{uri: comment.images[0]}], _id: comment._id});
		showInput();
	};

	return (
		<View style={{flex: 1}}>
			<View style={layout.cntr_postContent}>
				<PostContents data={props.route.params.data} />
			</View>
			<View style={layout.cntr_commentList}>
				<View style={layout.cntr_listheader}>
					<TouchableWithoutFeedback>
						<View style={{height: 80 * DP}}>
							<Text style={[txt.noto28, txt.gray, {lineHeight: 48 * DP}]}>댓글 더 보기</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={showInput}>
						<View style={{height: 80 * DP}}>
							<Text style={[txt.noto28, txt.gray, {lineHeight: 48 * DP}]}>{isInput ? '댓글 작성중' : '댓글 작성'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<View style={layout.sctn_comment}>
					<FlatList
						data={data.commentList}
						extraData={data.commentList}
						keyExtractor={(item, index) => item._id}
						renderItem={({item}) => <Comment data={item} liked={data.liked?.includes(item._id)} writeReply={writeReply} requestEdit={edit} />}
					/>
				</View>
			</View>

			<View style={[writecomment.cntr_writecomment, writecomment.shadow, {transform: [{translateY: !isInput ? 2000 * DP : 0}]}]}>
				<TouchableWithoutFeedback onPress={closeInput}>
					<View style={{flex: 1}} />
				</TouchableWithoutFeedback>
				<View style={[writecomment.cntr_input, writecomment.shadow, {bottom: keyboardY}]}>
					{editComment.images[0] && (
						<View style={writecomment.cntr_image}>
							<Image style={writecomment.image} source={{uri: editComment.images[0].uri}} />
							<SvgWrap style={writecomment.btn_image_delete} svg={<DeleteImage fill="#fff" />} onPress={deletePhoto} />
						</View>
					)}
					<View style={{flexDirection: 'row'}}>
						<FormTxtInput
							inputStyle={[txt.noto24r, txt.dimmergray, writecomment.form_input]}
							placeholder={'댓글 쓰기'}
							onChange={changeText}
							ref={inputForm}
							value={editComment.content}
						/>
						<SvgWrap
							hitboxStyle={writecomment.btn_commit_comment_hitbox}
							style={writecomment.btn_commit_comment}
							onPress={selectPhoto}
							svg={<PictureIcon fill="#FFB6A5" />}
						/>
						<SvgWrap
							hitboxStyle={writecomment.btn_commit_comment_hitbox}
							style={writecomment.btn_commit_comment}
							onPress={writeComment}
							svg={<GliderIcon fill="#FFB6A5" />}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export const writecomment = StyleSheet.create({
	cntr_writecomment: {
		height: '100%',
		width: '100%',
		position: 'absolute',
	},
	cntr_input: {
		width: '100%',
		backgroundColor: '#FFF',
		paddingHorizontal: 48 * DP,
		alignItems: 'center',
	},
	cntr_image: {
		marginTop: 60 * DP,
	},
	image: {
		height: 606 * DP,
		width: 606 * DP,
		borderRadius: 30 * DP,
	},
	btn_image_delete: {
		position: 'absolute',
		top: 20 * DP,
		right: 30 * DP,
		width: 62 * DP,
		height: 62 * DP,
		opacity: 0.7,
	},
	btn_commit_comment: {
		width: 38 * DP,
		height: 38 * DP,
	},
	btn_commit_comment_hitbox: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5 * DP,
	},

	form_input: {
		width: 500 * DP,
		height: 90 * DP,
		borderWidth: 0 * DP,
		paddingLeft: 20 * DP,
		paddingVertical: 0 * DP,
		marginRight: 20 * DP,
		includeFontPadding: false,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 8,
	},
});

export const layout = StyleSheet.create({
	cntr_postContent: {
		height: 330 * DP,
		width: '100%',
		paddingTop: 40 * DP,
		backgroundColor: '#fff',
		marginBottom: 2 * DP,
		// borderBottomWidth:2*DP,
		// borderColor:'#DBDBDB'
	},
	cntr_commentList: {
		flex: 1,
		// width: '100%',
		// backgroundColor: 'green',
		// opacity: 0.7,
	},
	cntr_listheader: {
		height: 100 * DP,
		backgroundColor: '#fff',
		flexDirection: 'row',
		paddingHorizontal: 48 * DP,
		paddingVertical: 28 * DP,
		justifyContent: 'space-between',
	},
	shadowEffect: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 8,
	},
	sctn_comment: {
		backgroundColor: '#FFF',
		paddingHorizontal: 48 * DP,
		flex: 1,
	},
});

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 36 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
	},
	noto28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 35 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 36 * DP,
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	dimmergray: {
		color: '#999999',
	},
	white: {
		color: '#FFFFFF',
	},
});
