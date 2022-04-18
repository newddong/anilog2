import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
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

//AnimalProtectRequestDetail 호출 경로
// - ProtectRequestList(보호활동탭) , AnimalFromShelter(게시글보기) , AidRequestManage(게시글보기), AidRequestAnimalList(게시글 보기)

export default AnimalProtectRequestDetail = ({route}) => {
	// console.log('AnimalProtectRequestDetail', route.params.id);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [writersAnotherRequests, setWritersAnotherRequests] = React.useState('false'); //해당 게시글 작성자의 따른 보호요청게시글 목록
	const [commentDataList, setCommentDataList] = React.useState('false'); //comment list 정보
	const [isSharePressed, setIsSharePressed] = React.useState(false); //공유하기 클릭 여부
	const shareRef = React.useRef();
	const debug = false;
	const isShelter = userGlobalObject.userInfo.user_type == 'shelter';
	const isMyPost = data == 'false' ? false : data.protect_request_writer_id._id == userGlobalObject.userInfo._id;
	debug && console.log('AnimalProtectRequestDetail data:', data);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getProtectRequestObject();
			getCommnetList(); //댓글리스트 가져오기
		});
		return unsubscribe;
	}, []);

	//보호요청게시글의 정보 가져오기
	const getProtectRequestObject = async () => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.id,
			},
			async result => {
				// console.log('result /getProtectRequestByProtectRequestId / AnimalProtectRequestDetail : ', result.msg);
				// console.log('작성자의 즐겨찾기 수', result.msg);
				let res = result.msg;
				let checkfav = await isMyFavoriteShelter(res.protect_request_writer_id);
				res.protect_request_writer_id.is_favorite = checkfav;
				setData(res);
				navigation.setParams({...route.params, request_object: result.msg, isMissingOrReport: false});
				// props.navigation.setParams({...props.route.params, feed_content: feedText});
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
								console.log('result / getFavoriteEtcListByUserId / AnimalProtectRequestDetail  ', result.msg.length);
								let favoriteList = [];
								result.msg.map((v, i) => {
									favoriteList.push(v.favorite_etc_target_object_id._id);
								});
								console.log('내 즐겨찾기 리스트 : ', favoriteList);
								console.log('작성자 : ', writer_id._id);
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
				// console.log('result / getProtectRequestListByShelterId / AnimalProtectRequestDetail : ', result.msg);
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
				// console.log('result / setFavoriteEtc /  :', result.msg);
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

	//보호소 라벨 공유 클릭
	const onPressShare = e => {
		setIsSharePressed(!isSharePressed);
		shareRef.current.measure((fx, fy, width, height, px, py) => {
			Modal.popShareModal(
				{x: px, y: py},
				() => alert('kakao'),
				() => alert('link'),
				() => alert('msg'),
			);
		});
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

	//댓글 클릭
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

	const isLoaded = data == 'false' || writersAnotherRequests == 'false' || commentDataList == 'false';

	if (isLoaded) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main]}>
				<FlatList
					data={[{}]}
					// keyExtractor={({item, index}) => index}
					listKey={({item, index}) => index}
					renderItem={({item, index}) => {
						return (
							<View style={[animalProtectRequestDetail_style.container]}>
								{/* 임시보호 후보자 협의 중 사진 */}
								<View style={[temp_style.rescueImage]}>
									<RescueImage status={data.protect_request_status || 'adopt'} img_uri={data.protect_request_photos_uri} />
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
											<TouchableOpacity
												onPress={() => onPressShelterLabelFavorite(false)}
												style={[animalProtectRequestDetail_style.buttonItemContainer]}>
												<FavoriteTag48_Filled />
												<Text style={[txt.roboto24, {color: APRI10, alignSelf: 'center', textAlign: 'center'}]}>
													{data ? count_to_K(data.protect_request_writer_id.user_favorite_count) : ''}
												</Text>
											</TouchableOpacity>
										) : (
											<TouchableOpacity
												onPress={() => onPressShelterLabelFavorite(true)}
												style={[animalProtectRequestDetail_style.buttonItemContainer]}>
												<FavoriteTag48_Border />
												<Text style={[txt.roboto24, {color: GRAY10, alignSelf: 'center', textAlign: 'center'}]}>
													{data ? count_to_K(data.protect_request_writer_id.user_favorite_count) : ''}
												</Text>
											</TouchableOpacity>
										)}
										{/* <View ref={shareRef} collapsable={false}>
											<TouchableOpacity onPress={onPressShare} style={[animalProtectRequestDetail_style.buttonItemContainer]}>
												<Share48_Filled />
												<Text style={[txt.roboto24, {color: APRI10}]}>공유</Text>
											</TouchableOpacity>
										</View> */}
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
											onPressDelete={onPressDeleteReply}
										/>
									</View>
								</View>
								<View style={[animalProtectRequestDetail_style.replyWriteBox]}>
									<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
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
