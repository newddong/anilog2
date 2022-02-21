import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Animated, Easing, ActivityIndicator,FlatList} from 'react-native';
import {btn_w226, btn_w276} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import {login_style, temp_style, accountPicker, animalProtectRequestDetail_style} from '../style_templete';
import RescueImage from 'Root/component/molecules/image/RescueImage';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {BackArrow32, Bracket48, Clip72, Email72, FavoriteTag48_Filled, Share48_Filled, SocialKakao72} from 'Atom/icon';
import DP from 'Root/config/dp';
import CommentList from 'Root/component/organism/comment/CommentList';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import {dummy_CommentObject} from 'Root/config/dummyDate_json';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import moment from 'moment';
import {getCommentListByProtectId} from 'Root/api/commentapi';
import {createComment} from 'Root/api/commentapi';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {profileInfo_style} from 'Root/component/organism/style_organism';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProtectAnimalInfoBox from 'Root/component/organism/info/ProtectAnimalInfoBox';

//AnimalProtectRequestDetail 호출 경로
// - ProtectRequestList(보호활동탭) , AnimalFromShelter(게시글보기) , Profile(보호활동)

export default AnimalProtectRequestDetail = ({route}) => {
	// console.log('AnimalProtectRequestDetail', route.params.item.protect_request_status);

	const navigation = useNavigation();
	// 보호소 data는 ShelterSmallLabel에서 사용,  보호동물 Data는 RescueSummary, 임시보호 신청, 입양 신청 등에서 사용됨
	const data = route.params ? route.params.item : ''; // ProtectRequestObject, ShelterProtectAnimalObject 정보가 담겨 있는 상태
	const [writersAnotherRequests, setWritersAnotherRequests] = React.useState(route.params.list ? route.params.list : []); //해당 게시글 작성자의 따른 보호요청게시글 목록
	const [loading, setLoading] = React.useState(true); //로딩상태
	const [editComment, setEditComment] = React.useState(true); // 댓글 쓰기 클릭
	const [privateComment, setPrivateComment] = React.useState(false); // 팝업된 댓글창에서 비밀글 상태
	const [photo, setPhoto] = React.useState(); // PhotoSelect에서 가져온 Photo uri
	const [replyData, setReplyData] = React.useState();
	const [showMore, setShowMore] = React.useState(false); //더보기 클릭 State
	const [commentDataList, setCommentDataList] = React.useState(); //comment list 정보
	const [writeCommentData, setWriteCommentData] = React.useState(); //입력한 댓글 정보
	const [replyPressed, setReplyPressed] = React.useState(false);
	const [token, setToken] = React.useState();
	const [content, setContent] = React.useState('');
	const [parentComment, setParentComment] = React.useState();
	const [isShelter, setIsShelter] = React.useState(false);
	const [isSharePressed, setIsSharePressed] = React.useState(false);
	const shareRef = React.useRef();
	const debug = false;

	debug && console.log('AnimalProtectRequestDetail data:', data);

	React.useEffect(() => {
		//현재 보고 있는 보호요청게시글의 작성자(보호소)의 모든 보호요청게시글이 담겨 있는 writersAnotherRequests
		//그러나 현재 보고 있는 보호요청게시글은 해당 리스트에 출력이 되어서는 안됨 => Filter처리
		const filteredList = writersAnotherRequests.filter(e => e._id != data._id);
		setWritersAnotherRequests(filteredList);

		//보고있는 요청글의 작성자가 로그인한 계정과 일치한다면 입양 / 임보 버튼이 나와서는 안됨
		const user_type = userGlobalObject.userInfo.user_type;
		user_type == 'shelter' ? setIsShelter(true) : setIsShelter(false);
	}, []);

	//대댓글 달기 버튼 누르면 대댓글 작성
	React.useEffect(() => {
		if (replyPressed == true) {
			createComment(
				{...writeCommentData},

				callback => {
					debug && console.log('write commnet success', callback);
					getCommnetList();
				},
				err => {
					console.log('write comment error', err);
				},
			);
			// setWriteCommentData();
			delete writeCommentData.comment_photo_uri;
			onDeleteImage();
			setEditComment(!editComment);
			setReplyPressed(false);
		}
	}, [replyPressed]);

	//댓글 목록 불러오기
	const getCommnetList = () => {
		getCommentListByProtectId(
			{
				protect_request_object_id: data._id,
				commentobject_id: '',
				request_number: 1000,
			},
			commentdata => {
				debug && console.log('AnimalProtectRequestDetail / getCommentListByProtectId:', commentdata.msg);
				commentdata.msg.map((v, i) => {
					//1depth를 올려준다.
					commentdata.msg[i].user_address = commentdata.msg[i].comment_writer_id.user_address;
					commentdata.msg[i].user_profile_uri = commentdata.msg[i].comment_writer_id.user_profile_uri;
					commentdata.msg[i].user_nickname = commentdata.msg[i].comment_writer_id.user_nickname;
					commentdata.msg[i].comment_date = moment(JSON.stringify(commentdata.msg[i].comment_date).replace(/\"/g, '')).format('YYYY.MM.DD hh:mm:ss');
					//일반 피드글과 구분하기 위해 feed_type 속성 추가 (다른 템플릿들과 시간 표기가 달라서 실종/제보에만 feed_type을 추가하고 시간 표기시 해당 속성 존재 여부만 판단)
					commentdata.msg[i].feed_type = 'report';
				});

				//댓글과 대댓글 작업 (부모 댓글과 자식 댓글 그룹 형성- 부모 댓글에서 부모의 childArray 속성에 자식 댓글 속성들을 추가)
				//부모 댓글은 실제 삭제불가하며 필드로 삭제 여부 값 형성 필요. (네이버나 다음 까페에서도 대댓글 존재시 댓글은 삭제해도 댓글 자리는 존재하고 그 밑으로 대댓글 그대로 노출됨)
				let commentArray = [];
				let tempComment = commentdata.msg;

				tempComment.map((v, i) => {
					// comment_parent가 없으면 일반 댓글
					if (v.comment_parent == undefined) {
						commentArray.push(v);
						//push한 JSON에 대댓글이 달릴 수 있으므로 childArray 배열 속성을 추가.
						commentArray[commentArray.length - 1].childArray = [];
					} else if (v.comment_parent != undefined && v.comment_parent != '') {
						//부모 댓글값이 존재할 경우 대댓글임, 원래 댓글의 childArray 배열에 push 함.
						for (let j = 0; j < commentArray.length; j++) {
							if (commentArray[j]._id == v.comment_parent) {
								commentArray[j].childArray.push(v);
								break;
							}
						}
					}
				});
				// console.log(`commentArray -${JSON.stringify(commentArray)}`);
				console.log('commentArray', commentArray.length);
				setCommentDataList(commentArray);
				//댓글이 출력이 안되는 현상 발견으로 비동기 처리
				setLoading(false);
				debug && console.log('commentArray refresh', commentArray);
			},
			errcallback => {
				//댓글이 출력이 안되는 현상 발견으로 비동기 처리
				setLoading(false);
				console.log(`Comment errcallback:${JSON.stringify(errcallback)}`);
			},
		);
	};

	//댓글 불러오기 (상단의 useEffect와 합칠지는 추후 결정)
	React.useEffect(() => {
		// console.log(' - AnimalProtectRequestDetail getCommnetList -');
		getCommnetList();
	}, []);

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		Modal.popOneBtn('아직 댓글 기능을 제공하지 않습니다.', '확인', () => Modal.close());
		return;
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? Modal.alert('비밀댓글로 설정되었습니다.') : Modal.alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		Modal.popOneBtn('아직 기능을 제공하지 않습니다.', '확인', () => Modal.close());
		return;
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setContent(text);
	};

	// 답글 쓰기 버튼 클릭 콜백함수
	const onReplyBtnClick = parentCommentId => {
		console.log(parentCommentId);
		setParentComment(parentCommentId);
		input.current.focus();
		editComment || setEditComment(true);
	};

	// 자식 답글에서 답글쓰기 버튼 클릭 콜백함수
	const onChildReplyBtnClick = comment => {
		setEditComment(!editComment);
	};

	// 답글 이미지 등록 후 지우기 버튼 클릭 콜백함수
	const onDeleteImage = () => {
		setPhoto([]);
	};

	//더보기 클릭
	const onPressShowMore = () => {
		setShowMore(!showMore);
	};

	//보호요청 더보기의 Thumnail클릭
	const onClick_ProtectedThumbLabel = (status, user_id, item) => {
		if (route.name == 'ProtectRequestManage') {
			// console.log('ProtectRequestManage');
			const animal_sex_toString = item.protect_animal_id.protect_animal_sex == 'female' ? '여' : '남';
			const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + animal_sex_toString;
			navigation.push('ProtectRequestManage', {item: item, list: route.params.list, title: title});
		} else {
			console.log('AnimalProtectRequestDetail', item);
			const animal_sex_toString = item.protect_animal_id.protect_animal_sex == 'female' ? '여' : '남';
			const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + animal_sex_toString;
			navigation.push('AnimalProtectRequestDetail', {item: item, list: route.params.list, title: title});
		}
	};

	//좋아요 숫자 출력 함수
	const count_to_K = cnt => {
		if (cnt > 1000000) {
			let count = (cnt / 1000000).toFixed(0) + 'm';
			return count;
		} else if (cnt > 1000) {
			let count = (cnt / 1000).toFixed(0) + 'k';
			return count;
		} else {
			return cnt;
		}
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
		setIsSharePressed(!isSharePressed);
		// console.log('ref', shareRef.current.offset);
		shareRef.current.measure((fx, fy, width, height, px, py) => {
			console.log('px', px);
			console.log('py', py);
			Modal.popShareModal(
				{x: px, y: py},
				() => alert('kakao'),
				() => alert('link'),
				() => alert('msg'),
			);
		});
	};

	//댓글 리스트 표출 개수 제어
	const checkDataLength = () => {
		let tempList = [];
		if (!showMore) {
			if (dummy_CommentObject.length > 2) {
				tempList = [...dummy_CommentObject.slice(0, 2)];
				return tempList;
			} else return dummy_CommentObject;
		} else return dummy_CommentObject;
	};

	//임시보호 버튼 클릭
	const onPressProtectRequest = () => {
		navigation.push('ApplyProtectActivityA', {protect_request_pet_data: data});
	};

	//입양하기 버튼 클릭
	const onPressAdoptionRequest = () => {
		navigation.push('ApplyAnimalAdoptionA', {protect_request_pet_data: data});
	};

	const onClickShelterLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	const onPressReply = async () => {
		AsyncStorage.getItem('sid', (err, res) => {
			console.log('res', res);
			if (res == null) {
				Modal.popNoBtn('로그인이 필요합니다.');
				setTimeout(() => {
					Modal.close();
				}, 1500);
			} else {
				navigation.push('ProtectCommentList', {protectObject: data});
			}
		});
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}
	return (
		<View style={[login_style.wrp_main]}>
			<FlatList
				data={[{}]}
				keyExtractor={({item,index})=>index}
				listKey={({item,index})=>index}
				renderItem={({item, index}) => {
					return (
						<View style={[animalProtectRequestDetail_style.container]}>
							{/* 임시보호 후보자 협의 중 사진 */}
							<View style={[temp_style.rescueImage]}>
								<RescueImage status={data.protect_request_status || 'adopt'} img_uri={data.protect_request_photos_uri || DEFAULT_PROFILE} />
							</View>
							<View style={[temp_style.requestProtect_view]}>
								<Text style={[txt.noto24, temp_style.requestProtect, {color: GRAY10}]}>보호요청</Text>
							</View>
							{/* RescueContentTitle */}
							<View style={[temp_style.rescueContentTitle]}>
								<Text style={[txt.noto28b]}>{data.protect_request_title || ''}</Text>
							</View>
							{/* 보호소 라벨 */}
							<View style={[temp_style.shelterSmallLabel_view_animalProtectRequestDetail]}>
								<View style={[temp_style.shelterSmallLabel_animalProtectRequestDetail]}>
									<ShelterSmallLabel data={data.protect_request_writer_id} onClickLabel={onClickShelterLabel} />
								</View>
								<View style={[temp_style.button_animalProtectRequestDetail]}>
									<TouchableOpacity onPress={onPressShelterLabelFavorite} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
										<FavoriteTag48_Filled />
										<Text style={[txt.roboto24, {color: APRI10, alignSelf: 'center', textAlign: 'center'}]}>
											{data ? count_to_K(data.protect_request_writer_id.user_follow_count) : ''}
										</Text>
									</TouchableOpacity>
									<View ref={shareRef} collapsable={false}>
										<TouchableOpacity onPress={onPressShare} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
											<Share48_Filled />
											<Text style={[txt.roboto24, {color: APRI10}]}>공유</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<ProtectAnimalInfoBox data={data} />

							<View style={[animalProtectRequestDetail_style.rescueText]}>
								<Text style={[txt.noto24]}>{data.protect_request_content || ''}</Text>
							</View>
							{/* {console.log('commentDataList.length', commentDataList.length)} */}
							<View style={[animalProtectRequestDetail_style.replyContainer, {}]}>
								{commentDataList && commentDataList.length > 0 ? (
									<TouchableOpacity onPress={onPressReply} style={[animalProtectRequestDetail_style.replyCountContainer]}>
										<Text style={[txt.noto28, {color: GRAY10}]}> 댓글 {commentDataList.length}개 모두 보기</Text>
									</TouchableOpacity>
								) : (
									<></>
								)}
								<View style={[temp_style.commentList]}>
									<CommentList
										items={commentDataList && commentDataList.length > 2 ? commentDataList.slice(0, 2) : commentDataList}
										onPressReplyBtn={onPressReply}
										onPress_ChildComment_ReplyBtn={comment => onChildReplyBtnClick(comment)}
									/>
								</View>
							</View>
							<View style={[animalProtectRequestDetail_style.replyWriteBox]}>
								{editComment && <ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />}
							</View>
							{/* 보호요청 더 보기addMoreRequest */}
							<View style={[temp_style.addMoreRequest_view]}>
								<Text style={[txt.noto24, temp_style.addMoreRequest, {color: GRAY20}]}>보호요청 더보기</Text>
							</View>

							{/* AnimalNeedHelpList */}
							<View style={[animalProtectRequestDetail_style.accountList]}>
								<AnimalNeedHelpList data={writersAnotherRequests} onClickLabel={onClick_ProtectedThumbLabel} onFavoriteTag={onPressFavoriteTag} />
							</View>
							{/* 보호소 계정이 나의 보호요청 게시글을 통해 들어왔을 경우 버튼 출력 X */}
						</View>
					);
				}}
			/>
			{isShelter || data.protect_request_status == 'complete' ? (
				//보호소메뉴에서 자신의 보호요청게시글을 보는 경우 or 작성자 본인인 경우에는 임보/입양 버튼이 출력이 안됨
				<></>
			) : (
				<View style={[animalProtectRequestDetail_style.btnContainer]}>
					<AniButton onPress={onPressProtectRequest} btnTitle={'임시보호 신청'} btnStyle={'border'} btnLayout={btn_w276} titleFontStyle={30} />
					<AniButton onPress={onPressAdoptionRequest} btnTitle={'입양 신청'} btnLayout={btn_w276} titleFontStyle={30} />
				</View>
			)}
		</View>
	);
};

AnimalProtectRequestDetail.defaultProps = {};
