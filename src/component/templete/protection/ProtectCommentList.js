import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import CommentList from 'Organism/comment/CommentList';
import ReplyWriteBox from 'Organism/input/ReplyWriteBox';
import {animalProtectRequestDetail_style, feedCommentList, login_style, temp_style} from 'Templete/style_templete';
import {createComment, getCommentListByFeedId, getCommentListByProtectId} from 'Root/api/commentapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Component/modal/Modal';
import ImagePicker from 'react-native-image-crop-picker';
import userGlobalObject from 'Root/config/userGlobalObject';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {FavoriteTag48_Filled, Share48_Filled} from 'Root/component/atom/icon';
import {count_to_K} from 'Root/util/stringutil';
import ProtectAnimalInfoBox from 'Root/component/organism/info/ProtectAnimalInfoBox';

export default ProtectCommentList = props => {
	// console.log('props.showAllContents', props.route.params.showAllContents);
	// console.log(props.route.name, '코멘트 리스트 네임');
	const navigation = useNavigation();
	const [editComment, setEditComment] = React.useState(false); //답글 쓰기 클릭 state
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [photo, setPhoto] = React.useState();
	const [comments, setComments] = React.useState([]);
	const [parentComment, setParentComment] = React.useState();
	const [content, setContent] = React.useState('');
	const input = React.useRef();
	const addChildCommentFn = React.useRef(() => {});
	const [refresh, setRefresh] = React.useState(true);
	const data = props.route.params.protectObject;
	// console.log('보호 요청 게시글', data);
	React.useEffect(() => {
		// console.log('보효요청게시글', props.route.params.protectObject._id);
		getCommentListByProtectId(
			{
				protect_request_object_id: data,
				request_number: 1000,
			},
			comments => {
				setComments(comments.msg);
				// console.log('comments', comments);
			},
			err => console.log('err', err),
		);
	}, []);

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		if (content.trim() == '') return Modal.popOneBtn('댓글을 입력하세요.', '확인', () => Modal.close());

		let param = {
			comment_photo_uri: photo, //사진uri
			comment_contents: content, //내용
			comment_is_secure: privateComment, //공개여부 테스트때 반영
		};
		if (parentComment) {
			param = {...param, commentobject_id: parentComment};
		} else {
			param = {...param, protect_request_object_id: props.route.params.protectObject._id};
		}
		createComment(
			param,
			result => {
				console.log('createComment : ', result);
				setPhoto();
				setParentComment();
				setContent('');
				getCommentListByProtectId(
					{
						protect_request_object_id: props.route.params.protectObject._id,
						request_number: 1000,
					},
					comments => {
						!parentComment && setComments([]); //댓글목록 초기화
						setComments(comments.msg);
						parentComment && addChildCommentFn.current();
						console.log('comments', comments);
					},
					err => console.log('getCommentListByProtectId', err),
				);
			},
			err => Modal.alert(err),
		);
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
		})
			.then(images => {
				setPhoto(images.path);
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	const onDeleteImage = () => {
		setPhoto();
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setContent(text);
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = (parentCommentId, addChildComment) => {
		console.log('parentCommentId', parentCommentId);
		setParentComment(parentCommentId);
		input.current.focus();
		editComment || setEditComment(true);
		addChildCommentFn.current = addChildComment;
	};

	const onClickShelterLabel = () => {
		console.log('ddd');
	};

	//보호요청 더보기의 리스트 중 한 아이템의 좋아요 태그 클릭
	const onPressFavoriteTag = (item, index) => {
		console.log('FavoriteTag', index, item);
	};

	//보호요청 게시글 작성 보호소 라벨의 좋아요 태그 클릭
	const onPressShelterLabelFavorite = () => {
		console.log('d');
	};
	//보호소 라벨 공유 클릭
	const onPressShare = e => {
		Modal.popSocialModal(
			() => alert('kakao'),
			() => alert('Link'),
			() => alert('link'),
		);
	};

	const render = ({item, index}) => {
		if (index == 0)
			return (
				<View
					style={{
						justifyContent: 'flex-end',
						marginBottom: 20 * DP,
					}}>
					<Text style={[txt.noto26, {color: GRAY10}]}>댓글 {comments.length}개 </Text>
				</View>
			);
		if (index > 0) return <CommentList items={item} onPressReplyBtn={onReplyBtnClick} />;
	};

	const protectRequestContent = () => {
		return (
			<View style={[style.contentContainer]}>
				<View style={[style.content_container_label]}>
					<ShelterSmallLabel data={data.protect_request_writer_id} onClickLabel={onClickShelterLabel} />
					<View style={[temp_style.button_animalProtectRequestDetail]}>
						<TouchableOpacity onPress={onPressShelterLabelFavorite} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
							<FavoriteTag48_Filled />
							<Text style={[txt.roboto24, {color: APRI10, alignSelf: 'center', textAlign: 'center'}]}>
								{data ? count_to_K(data.protect_request_writer_id.user_follow_count) : ''}
							</Text>
						</TouchableOpacity>
						<View collapsable={false}>
							<TouchableOpacity onPress={onPressShare} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
								<Share48_Filled />
								<Text style={[txt.roboto24, {color: APRI10}]}>공유</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={[style.cotent_container_header]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>보호요청</Text>
					<Text style={[txt.noto32b, {}]}>{data.protect_request_title || ''}</Text>
				</View>
				<View style={[style.cotent_container_info]}>
					<ProtectAnimalInfoBox data={data} />
				</View>
			</View>
		);
	};

	return (
		<View
			style={[
				{
					alignItems: 'center',
					flex: 1,
				},
			]}>
			<FlatList
				data={[{}, comments]}
				extraData={refresh}
				renderItem={render}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={protectRequestContent}
			/>
			{userGlobalObject.userInfo._id != '' && (editComment || props.route.name == 'ProtectCommentList') ? (
				<ReplyWriteBox
					onAddPhoto={onAddPhoto}
					onChangeReplyInput={onChangeReplyInput}
					onLockBtnClick={onLockBtnClick}
					onWrite={onWrite}
					onDeleteImage={onDeleteImage}
					privateComment={privateComment}
					photo={photo}
					ref={input}
				/>
			) : (
				false
			)}
		</View>
	);
};

const style = StyleSheet.create({
	contentContainer: {
		width: 654 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		// backgroundColor: 'lightblue',
	},
	cotent_container_header: {
		width: 654 * DP,
		marginTop: 20 * DP,
	},
	content_container_label: {
		width: 654 * DP,
		marginTop: 15 * DP,
		flexDirection: 'row',
	},
	cotent_container_info: {
		width: 654 * DP,
		marginBottom: 20 * DP,
	},
});
