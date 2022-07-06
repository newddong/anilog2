import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, TouchableOpacity, View, FlatList, Platform, StyleSheet, Linking} from 'react-native';
import RescueImage from 'Root/component/molecules/image/RescueImage';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10, GRAY20, GRAY30, GRAY40, MAINBLACK, WHITE} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import DP from 'Root/config/dp';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import moment from 'moment';
import {deleteComment, getCommentListByProtectId} from 'Root/api/commentapi';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import ProtectAnimalInfoBox from 'Root/component/organism/info/ProtectAnimalInfoBox';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import {getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import Loading from 'Root/component/molecules/modal/Loading';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import {DEFAULT_PROFILE, NETWORK_ERROR, NOT_REGISTERED_SHELTER, PROTECT_REQUEST_DETAIL_LIMIT, UNAVAILABLE_REQUEST_STATUS} from 'Root/i18n/msg';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {updateProtect} from 'Root/config/protect_obj';
import {Phone54, PhoneIcon, ProfileDefaultImg} from 'Root/component/atom/icon';

//AnimalProtectRequestDetail 호출 경로
// - ProtectRequestList(보호활동탭) , AnimalFromShelter(게시글보기) , AidRequestManage(게시글보기), AidRequestAnimalList(게시글 보기)
export default AnimalProtectRequestDetail = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [writersAnotherRequests, setWritersAnotherRequests] = React.useState('false'); //해당 게시글 작성자의 따른 보호요청게시글 목록
	const [comments, setComments] = React.useState('false'); //comment list 정보
	const [offset, setOffset] = React.useState(1);
	const [pressed, setPressed] = React.useState(false);
	const isShelter = userGlobalObject.userInfo.user_type == 'shelter';
	const flatlist = React.useRef();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getProtectRequestObject();
			getCommnetList(); //댓글리스트 가져오기
			setPressed(false);
		});
		return unsubscribe;
	}, []);

	// 상태변경시 헤더에서 reset 파라미터를 true 변경 => 게시글 정보 갱신을 위한 api 재접속
	React.useEffect(() => {
		if (route.params.reset) {
			getProtectRequestObject();
		}
	}, [route.params]);

	//보호요청게시글의 정보 가져오기
	const getProtectRequestObject = () => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.id,
			},
			result => {
				// console.log('result /AnimalProtectRequestDetail / getProtectRequestByProtectRequestId /  : ', result.msg.protect_request_writer_id);
				let res = result.msg;
				setData(res);
				navigation.setParams({...route.params, request_object: result.msg, isMissingOrReport: false, reset: false});
				getProtectRequestList(result.msg); //API에서 받아온 보호요청게시글의 작성자 _id를 토대로, 작성자의 다른 보호요청게시글을 받아옴
			},
			err => {
				// getProtectRequestListByShelterId
				console.log('err / getProtectRequestByProtectRequestId / AnimalProtectRequestDetail : ', err);
				if (err == '검색 결과가 없습니다.') {
					Modal.popOneBtn('이미 삭제된 요청건입니다.', '확 인', () => {
						navigation.goBack();
					});
				} else if (err.includes('Network') || err.includes('code 500')) {
					Modal.popOneBtn(NETWORK_ERROR, '확 인', () => {
						navigation.goBack();
					});
				}
			},
		);
	};

	//보호소의 다른 보호 요청게시글 불러오기
	const getProtectRequestList = request => {
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: request.protect_request_writer_id._id,
				protect_request_status: 'rescue', //하단 리스트
				limit: PROTECT_REQUEST_DETAIL_LIMIT,
				page: offset,
			},
			result => {
				console.log('result / getProtectRequestListByShelterId / AnimalProtectRequestDetail : ', result.total_count);
				//현재 보고 있는 보호요청게시글의 작성자(보호소)의 모든 보호요청게시글이 담겨 있는 writersAnotherRequests
				//그러나 현재 보고 있는 보호요청게시글은 해당 리스트에 출력이 되어서는 안됨 => Filter처리
				const res = result.msg;
				// console.log('res.length', res.length);
				if (writersAnotherRequests != 'false') {
					console.log('temp lenth', [...writersAnotherRequests, ...res].length);
					// const removeThis = [...writersAnotherRequests, ...res].filter(e => e._id != request._id);
					setWritersAnotherRequests([...writersAnotherRequests, ...res]);
				} else {
					// const removeThis = res.filter(e => e._id != request._id);
					setWritersAnotherRequests(res);
				}
				setOffset(offset + 1);
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalProtectRequestDetail : ', err);
				if (err == '검색 결과가 없습니다.') {
					setWritersAnotherRequests([]);
				}
			},
		);
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', writersAnotherRequests.length % (PROTECT_REQUEST_DETAIL_LIMIT - 1));
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (writersAnotherRequests.length % PROTECT_REQUEST_DETAIL_LIMIT == 0) {
			getProtectRequestList(data);
		}
	};

	//댓글 목록 불러오기
	const getCommnetList = () => {
		getCommentListByProtectId(
			{
				protect_request_object_id: route.params.id,
				commentobject_id: '',
				request_number: 2,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			comments => {
				comments.msg.map((v, i) => {
					//1depth를 올려준다.
					comments.msg[i].user_address = comments.msg[i].comment_writer_id.user_address;
					comments.msg[i].user_profile_uri = comments.msg[i].comment_writer_id.user_profile_uri;
					comments.msg[i].user_nickname = comments.msg[i].comment_writer_id.user_nickname;
					comments.msg[i].comment_date = moment(JSON.stringify(comments.msg[i].comment_date).replace(/\"/g, '')).format('YYYY.MM.DD hh:mm:ss');
					//일반 피드글과 구분하기 위해 feed_type 속성 추가 (다른 템플릿들과 시간 표기가 달라서 실종/제보에만 feed_type을 추가하고 시간 표기시 해당 속성 존재 여부만 판단)
					comments.msg[i].feed_type = 'report';
				});

				//댓글과 대댓글 작업 (부모 댓글과 자식 댓글 그룹 형성- 부모 댓글에서 부모의 childArray 속성에 자식 댓글 속성들을 추가)
				//부모 댓글은 실제 삭제불가하며 필드로 삭제 여부 값 형성 필요. (네이버나 다음 까페에서도 대댓글 존재시 댓글은 삭제해도 댓글 자리는 존재하고 그 밑으로 대댓글 그대로 노출됨)
				let commentArray = [];
				let tempComment = comments.msg;

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
				let res = commentArray.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
				//댓글이 출력이 안되는 현상 발견으로 비동기 처리
			},
			err => {
				console.log(`Comment errcallback:${JSON.stringify(err)}`);
				if (err.includes('code 500')) {
					Modal.alert('네트워크 오류로 댓글목록을 불러오지 못했습니다. 지속적으로 발생할 경우 고객센터로 문의해주세요.');
				}
				setComments([]);
			},
		);
	};

	//보호요청 더보기의 Thumnail클릭
	const onClick_ProtectedThumbLabel = (status, user_id, item) => {
		try {
			setPressed(true);
			if (!pressed) {
				if (route.name == 'ProtectRequestManage') {
					// console.log('ProtectRequestManage');
					const animal_sex_toString = item.protect_animal_id.protect_animal_sex == 'female' ? '여' : '남';
					const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + animal_sex_toString;
					navigation.navigate('ProtectRequestManage', {id: item._id, title: title});
				} else {
					let title = item.protect_animal_species;
					if (!item.protect_animal_species_detail) {
						title = item.protect_animal_species;
					} else {
						title = item.protect_animal_species + '/' + item.protect_animal_species_detail;
					}
					navigation.navigate({
						key: item._id + new Date().getTime(),
						name: 'AnimalProtectRequestDetail',
						params: {id: item._id, title: title, writer: item.protect_request_writer_id._id},
					});
				}
			}
		} catch (err) {
			console.log('onClick_ProtectedThumbLabel', err);
		}
	};

	//보호요청 더보기의 리스트 중 한 아이템의 즐겨찾기 태그 클릭
	const onPressFavoriteTag = (bool, index) => {
		setFavoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: writersAnotherRequests[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / setFavoriteEtc /  :', result.msg.favoriteEtc);
				updateProtect(writersAnotherRequests[index]._id, bool);
			},
			err => {
				console.log('err / setFavoriteEtc / : ', err);
				if (err.includes('code 500')) {
					Modal.alert(NETWORK_ERROR);
				}
			},
		);
	};

	//사진 썸네일 클릭
	const onPressReqeustPhoto = () => {
		Modal.popPhotoListViewModal(data.protect_request_photos_uri, () => Modal.close());
	};

	//임시보호 버튼 클릭
	const onPressProtectRequest = () => {
		if (!data.protect_request_writer_id.user_contacted) {
		} else {
			navigation.navigate('ApplyProtectActivityA', {protect_request_pet_data: data});
		}
	};

	//입양하기 버튼 클릭
	const onPressAdoptionRequest = () => {
		if (!data.protect_request_writer_id.user_contacted) {
		} else {
			navigation.navigate('ApplyAnimalAdoptionA', {protect_request_pet_data: data});
		}
	};

	//전화연결
	const connectPhoneCall = () => {
		Modal.popTwoBtn(`${data.protect_request_writer_id.user_nickname}님의 \n 전화로 연결하시겠습니까?`, '아니오', '확 인', Modal.close, () => {
			Linking.openURL(`tel:${data.protect_request_writer_id.shelter_delegate_contact_number}`);
		});
	};

	//보호소 프로필 클릭
	const onClickShelterLabel = data => {
		navigation.navigate({key: data._id, name: 'UserProfile', params: {userobject: data}});
	};

	//댓글 클릭
	const onPressReply = comment => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			navigation.navigate('ProtectCommentList', {protectObject: data, showKeyboard: true, reply: comment});
		}
	};

	//댓글 모두보기 클릭
	const moveToCommentPage = () => {
		if (userGlobalObject.userInfo.isPreviewMode && comments.length == 0) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			navigation.navigate('ProtectCommentList', {protectObject: data, showKeyboard: true});
		}
	};

	//댓글 삭제 클릭
	const onPressDeleteReply = id => {
		console.log('id', id);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg);
				getCommnetList();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
				if (err.includes('code 500')) {
					Modal.alert(NETWORK_ERROR);
				}
			},
		);
	};

	//답글 더보기 클릭
	const showChild = index => {
		// scrollToReply(index);
		flatlist.current.scrollToIndex({animated: true, index: index, viewPosition: 0});
	};

	//댓글 수정 클릭
	const onEdit = (comment, parent, child) => {
		let comment_obj = comment; //수정할 댓글의 오브젝트 정보
		const findParentIndex = comments.findIndex(e => e._id == parent._id); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
		const isChild = comments.findIndex(e => e._id == comment._id) == -1; // 수정하려는 댓글이 자식댓글인지 여부
		let viewOffset = 0; //자식댓글이 존재할 경우 내려갈 offSet 수치
		console.log('childIndex', child);
		if (child.findIndex != undefined && child.findIndex != -1) {
			//대댓글의 수정 분기
			viewOffset = 160 * (child.findIndex + 1) * DP; //수정할 대상 대댓글의 인덱스만큼 scrollOffset 조정
			viewOffset = viewOffset + 540 * child.hasPhoto * DP; //수정할 대상 대댓글 이전에 사진을 포함한 대댓글이 있을 경우 사진 개수 및 크기만큼 scrollOffSet 조정
			comment.comment_photo_uri ? (viewOffset = viewOffset + 360 * DP) : false; //수정할 대상 대댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffSet 조정
		}
		if (parent.comment_photo_uri) {
			//대상 대댓글의 부모댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffset 조정
			Platform.OS == 'android' ? (viewOffset = viewOffset + 340 * DP) : (viewOffset = viewOffset + 406 * DP);
		}
		comment_obj.isChild = isChild;
		comment_obj.comment_index = findParentIndex;
		comment_obj.viewOffset = viewOffset;
		navigation.navigate('ProtectCommentList', {protectObject: data, edit: comment});
	};

	const shouldHideProtectAct = () => {
		return UNAVAILABLE_REQUEST_STATUS.includes(data.protect_request_status);
	};

	const ITEM_HEIGHT = 266 * DP;
	const keyExtractor = React.useCallback(item => item._id.toString(), []);
	const getItemLayout = React.useCallback(
		(data, index) =>
			!data[index]
				? {length: 0, offset: 0, index: index}
				: {
						length: ITEM_HEIGHT,
						offset: ITEM_HEIGHT * index,
						index,
				  },
		[],
	);

	//페이지 하단 보호요청 게시글 listEmptyComponent
	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center', paddingTop: 20 * DP}}>
				{/* 임시보호 후보자 협의 중 사진 */}
				<View style={[style.rescueImage]}>
					{data.protect_request_photos_uri ? (
						<RescueImage
							onPressReqeustPhoto={onPressReqeustPhoto}
							status={data.protect_request_status || 'adopt'}
							img_uri={data.protect_request_photos_uri}
						/>
					) : (
						<ProfileDefaultImg size={{width: 694 * DP, heighy: 694 * DP}} />
					)}
				</View>
				{/* <View style={[style.requestProtect_view]}>
					<Text style={[txt.noto24, style.requestProtect, {color: GRAY10}]}>보호요청</Text>
				</View>
				<View style={[style.rescueContentTitle]}>
					<Text style={[txt.noto28b]}>{data.protect_request_title || ''}</Text>
				</View> */}
				<View style={[style.shelterSmallLabel_view_animalProtectRequestDetail]}>
					{data.protect_request_writer_id ? <ShelterSmallLabel data={data.protect_request_writer_id} onClickLabel={onClickShelterLabel} /> : <></>}
				</View>
				<ProtectAnimalInfoBox data={data} />
				<View style={[style.rescueText]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>특이사항</Text>
					<Text style={[txt.noto28]}>{data.protect_request_content || ''}</Text>
				</View>

				{comments && comments.length > 0 ? (
					<TouchableOpacity onPress={moveToCommentPage} style={[style.replyCountContainer]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> 댓글 {comments.length}개 모두 보기</Text>
					</TouchableOpacity>
				) : (
					<></>
				)}
			</View>
		);
	};

	const renderItem = ({item, index}) => {
		return (
			<View style={{alignItems: 'center'}}>
				<ParentComment
					parentComment={item}
					onPressReplyBtn={onPressReply} // 부모 댓글의 답글쓰기 클릭 이벤트
					onEdit={onEdit} // 수정 클릭
					onPressDelete={onPressDeleteReply}
					showChild={() => showChild(index)}
				/>
			</View>
		);
	};

	//보호요청 더보기 및 댓글 입력란
	const footer = () => {
		const renderOtherRequest = ({item, index}) => {
			return (
				<ProtectRequest
					data={item}
					onClickLabel={(status, id) => onClick_ProtectedThumbLabel(status, id, item)}
					onFavoriteTag={e => onPressFavoriteTag(e, index)}
				/>
			);
		};
		const removeThis = writersAnotherRequests.filter(e => e._id != data._id);

		return (
			<View style={{alignItems: 'center', paddingBottom: 50 * DP}}>
				<View style={[style.replyWriteBox]}>
					<ReplyWriteBox onPressReply={moveToCommentPage} onWrite={onPressReply} isProtectRequest={true} />
				</View>
				<View style={[style.addMoreRequest_view]}>
					<Text style={[txt.noto24]}>
						<Text style={[txt.noto24]}>{data.protect_request_writer_id.user_nickname}</Text>의 게시글 더보기
					</Text>
				</View>
				<View style={[style.accountList]}>
					<FlatList
						data={removeThis}
						renderItem={renderOtherRequest}
						keyExtractor={keyExtractor}
						getItemLayout={getItemLayout}
						style={{backgroundColor: '#fff'}}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={whenEmpty}
						onEndReached={onEndReached}
						onEndReachedThreshold={0.6}
					/>
				</View>
			</View>
		);
	};

	const isLoaded = data == 'false' || writersAnotherRequests == 'false' || comments == 'false'; // 데이터 수신 여부
	const shouldShowBottomButton = isShelter || shouldHideProtectAct() || userGlobalObject.userInfo.isPreviewMode; //하단의 임시보호 신청, 입양 신청 버튼 출력할지 여부

	if (isLoaded) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.wrap]}>
				<FlatList
					data={comments && comments.length > 2 ? comments.slice(0, 2) : comments}
					renderItem={renderItem}
					ListHeaderComponent={header()}
					ListFooterComponent={footer()}
					ListEmptyComponent={<Text style={[txt.roboto28b, {color: GRAY10, paddingVertical: 40 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>}
					style={{marginBottom: shouldShowBottomButton ? 0 : 100 * DP}}
					ref={flatlist}
					listKey={({item, index}) => index}
					showsVerticalScrollIndicator={false}
				/>
				{shouldShowBottomButton ? (
					//보호소메뉴에서 자신의 보호요청게시글을 보는 경우 or 작성자 본인인 경우에는 임보/입양 버튼이 출력이 안됨
					<></>
				) : (
					<View style={[style.btnContainer]}>
						{/* <AniButton onPress={onPressProtectRequest} btnTitle={'임시보호 신청'} btnStyle={'border'} btnLayout={btn_w276} titleFontStyle={30} /> */}
						{/* <AniButton onPress={onPressAdoptionRequest} btnTitle={'입양 신청'} btnLayout={btn_w276} titleFontStyle={30} /> */}
						<TouchableOpacity onPress={onPressProtectRequest} activeOpacity={0.8} style={[style.protectBtn]}>
							<Text style={[txt.noto32, {color: data.protect_request_writer_id.user_contacted ? MAINBLACK : GRAY30}]}>임시보호 문의</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressAdoptionRequest} activeOpacity={0.8} style={[style.protectBtn]}>
							<Text style={[txt.noto32, {color: data.protect_request_writer_id.user_contacted ? MAINBLACK : GRAY30}]}>입양 문의</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={connectPhoneCall} activeOpacity={0.8} style={[style.phoneBtn]}>
							<Phone54 />
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
};

AnimalProtectRequestDetail.defaultProps = {};

const style = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	container: {
		width: 750 * DP,
		alignItems: 'center',
		paddingBottom: 40 * DP,
	},
	requestProtect: {
		marginTop: 30 * DP,
		backgroundColor: '#F29797',
	},
	rescueSummary: {
		marginTop: 28 * DP,
		zIndex: -1,
	},
	rescueText: {
		width: 694 * DP,
		marginTop: 20 * DP,
		paddingBottom: 40 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY40,
	},
	floatingBtnAapply: {
		position: 'absolute',
		bottom: 0 * DP,
	},
	rescueSummary_insideContainer: {
		width: 594 * DP,
		height: 128 * DP,
	},
	rescueSummary_insideItem: {
		width: 594 * DP,
		height: 36 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	rescueSummary_insideItem_category: {
		marginRight: 10 * DP,
		color: GRAY20,
	},
	rescueSummary_insideItem_content: {
		marginRight: 50 * DP,
	},
	editComment: {
		width: 694 * DP,
		height: 108 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: WHITE,
		bottom: 0,
	},
	bottomContainer: {
		width: 750 * DP,
		height: 100 * DP,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		position: 'absolute',
		flexDirection: 'row',
		bottom: 70 * DP,
		paddingHorizontal: 60 * DP,
	},
	buttonItemContainer: {
		width: 64 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
		marginLeft: 6 * DP,
	},
	btnContainer: {
		width: 750 * DP,
		height: 138 * DP,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 0 * DP,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24 * DP,
		justifyContent: 'space-between',
		shadowColor: '#000000',
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 2 * DP,
			height: 2 * DP,
		},
		elevation: 4,
		paddingTop: 20 * DP,
		paddingBottom: 20 * DP,
	},
	shareDropDown: {
		width: 384 * DP,
		height: 184 * DP,
		position: 'absolute',
		right: 0,
		top: 80 * DP,
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderTopEndRadius: 0,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		paddingLeft: 60 * DP,
		shadowOffset: {
			height: 5 * DP,
		},
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 4.67,
		elevation: 3,
	},
	socialItem: {
		width: 92 * DP,
		height: 116 * DP,
		marginRight: 40 * DP,
	},
	requestProtect: {
		width: 95 * DP,
		height: 36 * DP,
		marginTop: 30 * DP,
	},
	replyWriteBox: {
		width: 694 * DP,
		paddingVertical: 20 * DP,
		// backgroundColor: 'lightblue',
	},
	addMore_profileInfo: {
		alignItems: 'flex-end',
		flexDirection: 'row',
	},
	replyContainer: {
		// width: 654 * DP,
		// width: 750 * DP,
	},
	accountList: {
		paddingVertical: 20 * DP,
	},
	replyCountContainer: {
		width: 694 * DP,
		alignItems: 'flex-end',
		alignSelf: 'flex-end',
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	addMoreRequest_view: {
		width: 694 * DP,
		marginTop: 40 * DP,
	},
	rescueImage: {},
	requestProtect_view: {
		width: 694 * DP,
		height: 67 * DP,
	},
	rescueContentTitle: {
		width: 694 * DP,
		marginBottom: 30 * DP,
	},
	shelterSmallLabel_view_animalProtectRequestDetail: {
		flexDirection: 'row',
		marginVertical: 20 * DP,
		width: 694 * DP,
		height: 88 * DP,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	protectBtn: {
		width: 280 * DP,
		height: 98 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY30,
		borderWidth: 2 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	phoneBtn: {
		width: 98 * DP,
		height: 98 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY30,
		borderWidth: 2 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
