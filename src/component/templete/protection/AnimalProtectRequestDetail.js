import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, TouchableOpacity, View, FlatList, Platform} from 'react-native';
import {btn_w276} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import {login_style, temp_style, animalProtectRequestDetail_style} from '../style_templete';
import RescueImage from 'Root/component/molecules/image/RescueImage';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import ShelterSmallLabel from 'Root/component/molecules/label/ShelterSmallLabel';
import {FavoriteTag48_Border, FavoriteTag48_Filled, Share48_Filled} from 'Atom/icon';
import DP from 'Root/config/dp';
import CommentList from 'Root/component/organism/comment/CommentList';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import moment from 'moment';
import {deleteComment, getCommentListByProtectId} from 'Root/api/commentapi';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProtectAnimalInfoBox from 'Root/component/organism/info/ProtectAnimalInfoBox';
import {count_to_K} from 'Root/util/stringutil';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import {getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import Loading from 'Root/component/molecules/modal/Loading';
import {getFavoriteEtcListByUserId, setFavoriteEtc} from 'Root/api/favoriteetc';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ParentComment from 'Root/component/organism/comment/ParentComment';

//AnimalProtectRequestDetail 호출 경로
// - ProtectRequestList(보호활동탭) , AnimalFromShelter(게시글보기) , AidRequestManage(게시글보기), AidRequestAnimalList(게시글 보기)

export default AnimalProtectRequestDetail = ({route}) => {
	// console.log('AnimalProtectRequestDetail', route.params.id);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [writersAnotherRequests, setWritersAnotherRequests] = React.useState('false'); //해당 게시글 작성자의 따른 보호요청게시글 목록
	const [commentDataList, setCommentDataList] = React.useState('false'); //comment list 정보
	const debug = false;
	const isShelter = userGlobalObject.userInfo.user_type == 'shelter';
	const isMyPost = data == 'false' ? false : data.protect_request_writer_id._id == userGlobalObject.userInfo._id;
	const flatlist = React.useRef();
	debug && console.log('AnimalProtectRequestDetail data:', data);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getProtectRequestObject();
			getCommnetList(); //댓글리스트 가져오기
		});
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		if (!route.params.reset) {
		} else {
			getProtectRequestObject(); // 상태변경시 헤더에서 reset 파라미터를 true 변경 => 게시글 정보 갱신을 위한 api 재접속
		}
	}, [route.params]);

	//보호요청게시글의 정보 가져오기
	const getProtectRequestObject = async () => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.id,
			},
			async result => {
				// console.log('result /AnimalProtectRequestDetail / getProtectRequestByProtectRequestId /  : ', result.msg.protect_request_writer_id);
				const ee = {
					__v: 0,
					_id: '627bdcf6eb81e68c65d15ee1',
					is_favorite: false,
					user_contacted: false,
					user_denied: false,
					user_email: '',
					user_favorite_count: 0,
					user_follow_count: 0,
					user_follower_count: 0,
					user_interests: {interests_activity: [], interests_beauty: [], interests_food: [], interests_health: [], interests_location: []},
					user_introduction: '강동리본센터07041637350',
					user_is_verified_email: false,
					user_is_verified_phone_number: false,
					user_my_pets: [],
					user_name: '강동리본센터',
					user_nickname: '강동리본센터',
					user_password: '59nzzxms',
					user_phone_number: '07041637350',
					user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652351934385_6346cd21-25e7-4fa3-be06-ec7ddd85c880.jpg',
					user_register_date: '2022-05-11T15:57:42.195Z',
					user_type: 'shelter',
					user_update_date: '2022-05-11T15:57:42.195Z',
					user_upload_count: 0,
				};
				// console.log('작성자의 즐겨찾기 수', result.msg);
				let res = result.msg;
				// let checkfav = await isMyFavoriteShelter(res.protect_request_writer_id);
				// res.protect_request_writer_id.is_favorite = checkfav;
				setData(res);
				navigation.setParams({...route.params, request_object: result.msg, isMissingOrReport: false, reset: false});
				getProtectRequestList(result.msg.protect_request_writer_id._id); //API에서 받아온 보호요청게시글의 작성자 _id를 토대로, 작성자의 다른 보호요청게시글을 받아옴
			},
			err => {
				// getProtectRequestListByShelterId
				console.log('err / getProtectRequestByProtectRequestId / AnimalProtectRequestDetail : ', err);
				if (err == '검색 결과가 없습니다.') {
					Modal.popOneBtn('이미 삭제된 요청건입니다.', '확 인', () => {
						navigation.goBack();
					});
				}
			},
		);
	};

	//보호요청 게시글 작성자가 나의 즐겨찾기 대상에 포함이 되는지 여부
	const isMyFavoriteShelter = async writer_id => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			return false;
		} else {
			const checkFav = () => {
				return new Promise((resolve, reject) => {
					try {
						getFavoriteEtcListByUserId(
							{
								userobject_id: userGlobalObject.userInfo._id,
								collectionName: 'userobjects',
							},
							result => {
								// console.log('result / getFavoriteEtcListByUserId / AnimalProtectRequestDetail  ', result.msg.length);
								let favoriteList = [];
								result.msg.map((v, i) => {
									favoriteList.push(v.favorite_etc_target_object_id._id);
								});
								let res = favoriteList.includes(writer_id._id);
								resolve(res);
							},
							err => {
								console.log('err / getFavoriteEtcListByUserId / AnimalProtectRequestDetail ', err);
							},
						);
					} catch {
						console.log('err');
					}
				});
			};
			const result = await checkFav();
			console.log('result', result);
			return result;
		}
	};

	//보호소의 다른 보호 요청게시글 불러오기
	const getProtectRequestList = id => {
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: id,
				protect_request_object_id: '',
				request_number: 5,
				protect_request_status: 'all', //하단 리스트
			},
			result => {
				// console.log('result / getProtectRequestListByShelterId / AnimalProtectRequestDetail : ', result.msg[0]);
				//현재 보고 있는 보호요청게시글의 작성자(보호소)의 모든 보호요청게시글이 담겨 있는 writersAnotherRequests
				//그러나 현재 보고 있는 보호요청게시글은 해당 리스트에 출력이 되어서는 안됨 => Filter처리
				const filteredList = result.msg.filter(e => e._id != route.params.id);
				setWritersAnotherRequests(filteredList);
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalProtectRequestDetail : ', err);
				if (err == '검색 결과가 없습니다.') {
					setWritersAnotherRequests([]);
				}
			},
		);
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
			commentdata => {
				// debug && console.log('AnimalProtectRequestDetail / getCommentListByProtectId:', commentdata.msg);
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
				const removeDelete = commentArray.filter(e => e.comment_is_delete != true);
				setCommentDataList(removeDelete);
				//댓글이 출력이 안되는 현상 발견으로 비동기 처리
				debug && console.log('commentArray refresh', commentArray);
			},
			err => {
				console.log(`Comment errcallback:${JSON.stringify(err)}`);
				setCommentDataList([]);
			},
		);
	};

	//보호요청 더보기의 Thumnail클릭
	const onClick_ProtectedThumbLabel = (status, user_id, item) => {
		if (route.name == 'ProtectRequestManage') {
			// console.log('ProtectRequestManage');
			const animal_sex_toString = item.protect_animal_id.protect_animal_sex == 'female' ? '여' : '남';
			const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + animal_sex_toString;
			navigation.push('ProtectRequestManage', {id: item._id, title: title});
		} else {
			// console.log('AnimalProtectRequestDetail', item);
			const animal_sex_toString = item.protect_animal_id.protect_animal_sex == 'female' ? '여' : '남';
			const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + animal_sex_toString;
			navigation.push('AnimalProtectRequestDetail', {id: item._id, title: title, writer: item.protect_request_writer_id._id});
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
			},
			err => {
				console.log('err / setFavoriteEtc / : ', err);
			},
		);
	};

	//보호요청 게시글 작성 보호소 라벨의 즐겨찾기 태그 클릭
	const onPressShelterLabelFavorite = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setFavoriteEtc(
				{
					collectionName: 'userobjects',
					target_object_id: data.protect_request_writer_id._id,
					is_favorite: bool,
				},
				result => {
					console.log('result / favoriteEtc / AnimalProtectRequestDetail : ', result.msg.favoriteEtc);
					getProtectRequestObject();
					setData({...data});
				},
				err => {
					console.log('err / favoriteEtc / AnimalProtectRequestDetail : ', err);
				},
			);
		}
	};

	const onPressReqeustPhoto = () => {
		console.log('v', data.protect_request_photos_uri);
		Modal.popPhotoListViewModal(data.protect_request_photos_uri);
	};

	//임시보호 버튼 클릭
	const onPressProtectRequest = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			console.log('data.protect_request_writer_id.user_contacted', data.protect_request_writer_id.user_contacted);
			if (!data.protect_request_writer_id.user_contacted) {
				Modal.alert('정식 애니로그 등록된 \n 보호소가 아닙니다!');
			} else {
				navigation.push('ApplyProtectActivityA', {protect_request_pet_data: data});
			}
		}
	};

	//입양하기 버튼 클릭
	const onPressAdoptionRequest = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			console.log('data.protect_request_writer_id.user_contacted', data.protect_request_writer_id.user_contacted);
			if (!data.protect_request_writer_id.user_contacted) {
				Modal.alert('정식 애니로그 등록된 \n 보호소가 아닙니다!');
			} else {
				navigation.push('ApplyAnimalAdoptionA', {protect_request_pet_data: data});
			}
		}
	};

	//보호소 프로필 클릭
	const onClickShelterLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	//특정 댓글로 스크롤 이동 함수
	const scrollToReply = i => {
		if (Platform.OS == 'ios') {
			setTimeout(() => {
				flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
			}, 200);
		} else {
			flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
		}
	};

	//댓글 클릭
	const onPressReply = comment => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			const findParentIndex = commentDataList.findIndex(e => e._id == comment._id); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
			let comment_obj = comment;
			comment_obj.comment_index = findParentIndex;
			navigation.push('ProtectCommentList', {protectObject: data, showKeyboard: true, reply: comment_obj});
		}
	};

	//댓글 모두보기 클릭
	const moveToCommentPage = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.push('ProtectCommentList', {protectObject: data, showKeyboard: true});
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
			},
		);
	};

	//답글 더보기 클릭
	const showChild = index => {
		// scrollToReply(index);
		flatlist.current.scrollToIndex({animated: true, index: index, viewPosition: 0.5});
	};

	//댓글 수정 클릭
	const onEdit = (comment, parent) => {
		// console.log('comment', comment);
		let comment_obj = comment; //수정할 댓글의 오브젝트 정보
		const findParentIndex = commentDataList.findIndex(e => e._id == parent); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
		const isChild = commentDataList.findIndex(e => e._id == comment._id) == -1; // 수정하려는 댓글이 자식댓글인지 여부
		comment_obj.isChild = isChild;
		comment_obj.comment_index = findParentIndex;
		console.log('findParentIndex', findParentIndex);
		navigation.push('ProtectCommentList', {protectObject: data, edit: comment});
	};

	//페이지 하단 보호요청 게시글 listEmptyComponent
	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				{/* 임시보호 후보자 협의 중 사진 */}
				<View style={[temp_style.rescueImage]}>
					<RescueImage
						onPressReqeustPhoto={onPressReqeustPhoto}
						status={data.protect_request_status || 'adopt'}
						img_uri={data.protect_request_photos_uri}
					/>
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
						{isMyPost ? (
							<></>
						) : data.protect_request_writer_id.is_favorite ? (
							<TouchableOpacity onPress={() => onPressShelterLabelFavorite(false)} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
								<FavoriteTag48_Filled />
								<Text style={[txt.roboto24, {color: APRI10, alignSelf: 'center', textAlign: 'center'}]}>
									{data ? count_to_K(data.protect_request_writer_id.user_favorite_count) : ''}
								</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => onPressShelterLabelFavorite(true)} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
								<FavoriteTag48_Border />
								<Text style={[txt.roboto24, {color: GRAY10, alignSelf: 'center', textAlign: 'center'}]}>
									{data ? count_to_K(data.protect_request_writer_id.user_favorite_count) : ''}
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
				<ProtectAnimalInfoBox data={data} />

				<View style={[animalProtectRequestDetail_style.rescueText]}>
					<Text style={[txt.noto24]}>{data.protect_request_content || ''}</Text>
				</View>

				{commentDataList && commentDataList.length > 0 ? (
					<TouchableOpacity onPress={moveToCommentPage} style={[animalProtectRequestDetail_style.replyCountContainer]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> 댓글 {commentDataList.length}개 모두 보기</Text>
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
		return (
			<View style={{alignItems: 'center', paddingBottom: 50 * DP}}>
				<View style={[animalProtectRequestDetail_style.replyWriteBox]}>
					<ReplyWriteBox onPressReply={moveToCommentPage} onWrite={onPressReply} isProtectRequest={true} />
				</View>
				<View style={[temp_style.addMoreRequest_view]}>
					<Text style={[txt.noto24, temp_style.addMoreRequest, {color: GRAY20}]}>
						{data.protect_request_writer_id.user_nickname}님의 보호요청 더보기
					</Text>
				</View>
				<View style={[animalProtectRequestDetail_style.accountList]}>
					<AnimalNeedHelpList
						data={writersAnotherRequests}
						onClickLabel={onClick_ProtectedThumbLabel}
						onFavoriteTag={onPressFavoriteTag}
						whenEmpty={whenEmpty}
					/>
				</View>
			</View>
		);
	};

	const isLoaded = data == 'false' || writersAnotherRequests == 'false' || commentDataList == 'false';

	if (isLoaded) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main]}>
				<FlatList
					data={commentDataList && commentDataList.length > 2 ? commentDataList.slice(0, 2) : commentDataList}
					ref={flatlist}
					listKey={({item, index}) => index}
					ListHeaderComponent={header()}
					renderItem={renderItem}
					ListFooterComponent={footer()}
					ListEmptyComponent={<Text style={[txt.roboto28b, {color: GRAY10, paddingVertical: 40 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>}
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
