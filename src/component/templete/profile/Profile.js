import React from 'react';
import {View, Text, FlatList, Animated, Easing, ActivityIndicator} from 'react-native';
import {followUser, getUserProfile, unFollowUser} from 'Root/api/userapi';
import {NETWORK_ERROR, NORMAL, NOT_REGISTERED_SHELTER, PET, PROTECT_REQUEST_DETAIL_LIMIT, THUMNAIL_LIMIT} from 'Root/i18n/msg';
import {Message94, Write94} from 'Atom/icon';
import ProfileTabSelect from 'Root/component/molecules/tab/ProfileTabSelect';
import ProfileInfo from 'Organism/info/ProfileInfo';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import {login_style, profile, temp_style, buttonstyle} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {getFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import CommunityList from '../community/CommunityList';
import {getCommunityListByUserId} from 'Root/api/community';
import {createMemoBox} from 'Root/api/userapi';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import {updateProtect} from 'Root/config/protect_obj';
import {styles} from 'Root/component/atom/image/imageStyle';

export default Profile = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({...route.params?.userobject, feedList: []}); //라벨을 클릭한 유저의 userObject data
	const [feedList, setFeedList] = React.useState('false');
	const [feedTotal, setFeedTotal] = React.useState();
	const [commList, setCommList] = React.useState('false');
	const [protectList, setProtectList] = React.useState('false');
	const [offset, setOffset] = React.useState(1); //커뮤니티 페이지
	const [loading, setLoading] = React.useState(false);
	const flatlist = React.useRef();
	const userId = route.params.userobject._id; //현재 보고있는 프로필 대상의 _id
	const [tabMenuSelected, setTabMenuSelected] = React.useState(0); //프로필 Tab의 선택상태

	React.useEffect(() => {
		//페이지 포커스 시 프로필 데이터 및 하단 탭 데이터 갱신
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
			if (data.user_type == 'user') {
				fetchCommunity();
			} else if (data.user_type == 'shelter') {
				fetchProtectRequest();
			}
		});
		return unsubscribe;
	}, []);

	//유저프로필 데이터 수신
	const fetchData = () => {
		if (route.params && route.params.userobject) {
			getUserProfile(
				{userobject_id: userId},
				result => {
					navigation.setOptions({title: result.msg.user_nickname, data: result.msg});
					setData(result.msg);
					console.log('getUserProfile is_Favorite ', result.msg.is_follow);
				},
				err => {
					Modal.popOneBtn(err, '확인', () => {
						Modal.close();
						navigation.goBack();
					});
				},
			);
		} else {
			Modal.popOneBtn('존재하지 않는 유저입니다.', '확인', () => {
				Modal.close();
				navigation.goBack();
			});
		}
	};

	//유저 프로필일 경우 하단의 커뮤니티 탭
	const fetchCommunity = () => {
		getCommunityListByUserId(
			{
				userobject_id: userId,
				community_type: 'all',
			},
			result => {
				// console.log('result / getCommunityListuser , free ', result.msg.free.length);
				// console.log('result / getCommunityListuser , review ', result.msg.review.length);
				setCommList(result.msg);
			},
			err => {
				if (err.includes('code 500')) {
					setCommList({free: [], review: []});
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => {
						Modal.close();
						navigation.goBack();
					});
				} else if (err.includes('없습니다')) {
					setCommList({free: [], review: []});
				}
			},
		);
	};

	//보호소 프로필일 경우 하단의 보호동물 탭
	const fetchProtectRequest = () => {
		setLoading(true);
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: data._id,
				protect_request_status: 'all',
				protect_request_object_id: '',
				limit: PROTECT_REQUEST_DETAIL_LIMIT,
				page: offset,
			},
			result => {
				// console.log('result / getProtectRequestListByShelterId / AnimalFromShelter', result.msg.length);
				const res = result.msg;
				console.log('getProtectRequestListByShelterId / res.length', res.length);
				if (protectList != 'false') {
					console.log('temp lenth', [...protectList, ...res].length);
					setProtectList([...protectList, ...res]);
				} else {
					setProtectList(res);
					setTabMenuSelected(2);
				}
				setOffset(offset + 1);
				setLoading(false);
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalFromShelter', err);
				setProtectList([]);
				setLoading(false);
			},
		);
	};

	//하단의 피드, 태그 탭 썸네일 데이터 수신
	const getFeedList = (i, refresh) => {
		setLoading(true);
		let params = {
			userobject_id: userId,
			limit: THUMNAIL_LIMIT,
		};
		//첫 페이지 호출이 아닌 경우
		if (!refresh && feedList.length != 0) {
			params.target_object_id = feedList[feedList.length - 1]._id;
			params.order_value = 'next';
		}
		switch (i) {
			case 0:
				console.log('params', params);
				getFeedListByUserId(
					params,
					result => {
						console.log('result / getFeedListByUserId ', result.msg.length);
						//처음 api 호출 혹은 리프레쉬(탭변경)인 경우 리턴값을 그대로 set
						if (refresh || feedList.length == 0) {
							setFeedList(result.msg);
						} else {
							//다음 페이지를 호출한 경우 기존 값에 추가된 result 추가
							console.log('page 합산', [...feedList, ...result.msg].length);
							setFeedList([...feedList, ...result.msg]);
						}
						setFeedTotal(result.total_count); // 토탈카운트 갱신
						setLoading(false); //로딩종료
					},
					err => {
						console.log('getFeedListByUserId err ', err);
						setFeedList([]);
						setLoading(false);
					},
				);
				break;
			case 1:
				getUserTaggedFeedList(
					params,
					result => {
						// console.log('result / getUserTaggedFeedList : ', result.msg[1]);
						if (refresh || feedList.length == 0) {
							setFeedList(result.msg.map(v => v.usertag_feed_id));
						} else {
							//다음 페이지를 호출한 경우 기존 값에 추가된 result 추가
							console.log('page 합산', [...feedList, ...result.msg].length);
							setFeedList([...feedList, ...result.msg.map(v => v.usertag_feed_id)]);
						}
						setFeedTotal(result.total_count); // 토탈카운트 갱신
						setLoading(false); //로딩종료
					},
					err => {
						console.log('getUserTaggedFeedList err', err);
						setLoading(false); //로딩종료
						if (err.includes('code 500')) {
							Modal.popNetworkErrorModal('정보를 불러오는데에 실패하였습니다.\n 잠시후 다시 이용해주세요. ');
						}
						setFeedList([]);
					},
				);
				break;
			default:
				break;
		}
	};

	const onEndReached = i => {
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
		if (i == 0 || i == 1) {
			console.log('feedList.length', feedList.length, feedTotal);
			if (feedList.length != feedTotal) {
				getFeedList(i);
			}
		} else if (protectList.length % PROTECT_REQUEST_DETAIL_LIMIT == 0) {
			//보호소프로필인 경우 보호동물탭
			console.log('EndReached', protectList.length % PROTECT_REQUEST_DETAIL_LIMIT);
			fetchProtectRequest();
		}
	};

	//프로필 하단 탭 선택 콜백
	React.useEffect(() => {
		if (tabMenuSelected == 0 || tabMenuSelected == 1) {
			getFeedList(tabMenuSelected, true);
		}
	}, [tabMenuSelected]);

	//프로필의 피드탭의 피드 썸네일 클릭
	const onClick_Thumbnail_FeedTab = (index, item) => {
		navigation.push('UserFeedList', {userobject: data, selected: item, index: index});
	};

	//프로필의 태그탭의 피드 썸네일 클릭
	const onClick_Thumbnail_TagTab = (index, item) => {
		navigation.push('UserTagFeedList', {userobject: data, selected: item, index: index});
	};

	//보호소프로필의 봉사활동 클릭
	const onClick_Volunteer_ShelterProfile = () => {
		const userType = userGlobalObject.userInfo.user_type;
		if (userType == 'shelter') {
			Modal.popOneBtn('보호소 계정은 봉사활동을 \n 신청하실 수 없습니다.', '확인', () => Modal.close());
		} else {
			// console.log('data', data);
			if (!data.user_contacted) {
				Modal.alert(NOT_REGISTERED_SHELTER);
			} else {
				navigation.push('ApplyVolunteer', {token: data._id});
			}
		}
	};

	//피드글작성 버튼 클릭(액션버튼)
	const moveToFeedWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else if (userGlobalObject.userInfo.user_type == 'user') {
			Modal.popAvatarSelectFromWriteModal(obj => {
				userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed', feed_avatar_id: obj});
			});
		} else {
			userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed'});
		}
		// navigation.push('FeedWrite', {feedType: 'Feed'});
	};

	//액션버튼 하단 탭 메뉴 클릭 콜백함수
	const onSelectTabMenu = (item, index) => {
		setTabMenuSelected(index);
	};

	//유저타입 - 펫 => 반려인 계정에서 가족계정의 이미지 라벨을 클릭
	const onClickOwnerLabel = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	//유저타입 - 유저 => 반려동물 리스트에서 항목 클릭
	const onClickMyCompanion = item => {
		console.log('route.name', route.name);
		navigation.push('UserProfile', {userobject: item});
	};

	//쪽지 전송
	const onPressSendMsg = (_id, name) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			setTimeout(() => {
				Modal.popMessageModal(
					name,
					msg => {
						createMemoBox(
							{memobox_receive_id: _id, memobox_contents: msg},
							result => {
								console.log('message sent success', result);
								Modal.popOneBtn('쪽지 전송하였습니다.', '확인', () => Modal.close());
							},
							err => {
								console.log('message sent err', err);
							},
						);
						console.log('msg', msg);
						Modal.close();
					},
					() => alert('나가기'),
				);
			}, 100);
		}
	};

	//보호 동물 추가
	const onPressAddPetBtn = () => {
		navigation.navigate('MY', {screen: 'ShelterMenu', params: {pageToMove: 'AssignProtectAnimalImage'}});
	};

	//보호 요청게시물 추가
	const onPressAddArticleBtn = () => {
		navigation.navigate('MY', {screen: 'ShelterMenu', params: {pageToMove: 'AidRequestAnimalList'}});
		// navigation.navigate('MY', {screen: 'AidRequestAnimalList', params: data._id});
	};

	//업로드 클릭
	const onClickUpload = () => {
		// console.log('onClickUpload');
		flatlist.current.scrollToIndex({animated: true, index: 1, viewPosition: 0});
	};

	//프로필 수정 버튼 클릭(본인 계정일 경우만 가능)
	const onPressEditProfile = () => {
		if (data.user_type == 'user') {
			navigation.push('ChangeUserProfileImage', {data: data, routeInfo: route});
		} else {
			// navigation.push('ChangeUserProfileImage', {data: data, routeInfo: route});
			navigation.push('ChangePetProfileImage', data);
		}
	};

	const onPressFollow = () => {
		console.log('data._id', data._id);
		followUser(
			{follow_userobject_id: data._id},
			result => {
				console.log('result / followUser / Profile :', result.msg);
				setData('');
				fetchData();
			},
			err => {
				console.log('err / followUser / err', err);
			},
		);
	};

	const onPressUnFollow = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				'정말로 팔로우를 \n 취소하시겠습니까?',
				'아니오',
				'예',
				() => Modal.close(),
				() => {
					unFollowUser(
						{follow_userobject_id: data._id},
						result => {
							console.log('result / unFollowUser / Profile :', result.msg);
							setData('');
							fetchData();
							Modal.close();
						},
						err => {
							console.log('err / unFollowUser / err', err);
						},
					);
				},
			);
		}, 200);
	};

	//프로필의 보호활동 탭의 피드 썸네일 클릭
	const onClickProtect = (status, id, item) => {
		console.log('onClickProtect', item);
		let gender = '남';
		switch (item.protect_animal_sex) {
			case 'male':
				gender = '남';
				break;
			case 'female':
				gender = '여';
				break;
			case 'male':
				gender = '성별모름';
				break;
		}
		const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + gender;
		navigation.push('AnimalProtectRequestDetail', {id: item._id, title: title, writer: item.protect_request_writer_id._id});
	};

	//보호소프로필의 보호요청게시글 즐겨찾기 클릭
	const onOff_FavoriteTag = (bool, index) => {
		setFavoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: protectList[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / Profile : ', result.msg.favoriteEtc);
				updateProtect(protectList[index]._id, bool);
			},
			err => console.log('err / favoriteEtc / Profile : ', err),
		);
	};

	// 유저타입에 따라 다른 탭 아이템 출력
	const getTabSelectList = () => {
		if (data.user_type == 'user') {
			return <ProfileTabSelect items={['피드', '태그', '커뮤니티']} onSelect={onSelectTabMenu} />;
		}
		return data.user_type == PET ? (
			<ProfileTabSelect items={['피드', '태그']} onSelect={onSelectTabMenu} />
		) : (
			<ProfileTabSelect items={['피드', '태그', '보호동물']} onSelect={onSelectTabMenu} defaultIndex={2} />
		);
	};

	//프로필 상단 유저 정보
	const userProfileInfo = () => {
		return (
			<>
				<View style={[profile.profileInfo, {}]}>
					<ProfileInfo
						data={data}
						showMyPet={e => alert(e)}
						volunteerBtnClick={() => navigation.push('ApplyVolunteer')}
						adoptionBtnClick={() => navigation.push('ApplyAnimalAdoptionA')}
						onPressVolunteer={onClick_Volunteer_ShelterProfile}
						onPressAddPetBtn={onPressAddPetBtn}
						onPressAddArticleBtn={onPressAddArticleBtn}
						onPressEditProfile={onPressEditProfile}
						onPressUnFollow={onPressUnFollow}
						onPressFollow={onPressFollow}
						onClickUpload={onClickUpload}
						onClickMyCompanion={onClickMyCompanion}
						onClickOwnerLabel={onClickOwnerLabel}
					/>
				</View>
			</>
		);
	};

	//TabSelect 하단 출력 리스트 컴포넌트
	const showTabContent = () => {
		const whenFeedThumbnailEmpty = text => {
			return <ListEmptyInfo paddingVertical={100 * DP} text={text} />;
		};
		const renderProtect = ({item, index}) => {
			return (
				<ProtectRequest
					data={item}
					onClickLabel={(status, id) => onClickProtect(status, id, item)}
					onFavoriteTag={e => onOff_FavoriteTag(e, index)}
				/>
			);
		};

		const renderItem = ({item, index}) => {
			if (index == 0) {
				return <View style={[temp_style.tabSelectFilled_Type2, {marginBottom: 10 * DP}]}>{getTabSelectList()}</View>;
			}
			if (data.user_type == 'user') {
				if (tabMenuSelected == 0) {
					return (
						<FeedThumbnailList
							items={item}
							whenEmpty={whenFeedThumbnailEmpty('피드 게시물이 없습니다.')}
							onClickThumnail={onClick_Thumbnail_FeedTab}
							onEndReached={() => onEndReached(tabMenuSelected)}
						/>
					);
				} else if (tabMenuSelected == 1) {
					return (
						<FeedThumbnailList
							items={item}
							whenEmpty={whenFeedThumbnailEmpty('태그된 게시물이 없습니다.')}
							onClickThumnail={onClick_Thumbnail_TagTab}
							onEndReached={() => onEndReached(tabMenuSelected)}
						/>
					);
				} else {
					return <CommunityList data={commList} user_id={route.params.userobject._id} />;
				}
			} else if (data.user_type == 'pet') {
				if (tabMenuSelected != 2) {
					return (
						<FeedThumbnailList
							items={item}
							whenEmpty={whenFeedThumbnailEmpty('피드 게시물이 없습니다.')}
							onClickThumnail={onClick_Thumbnail_FeedTab}
						/>
					);
				}
			} else {
				if (tabMenuSelected == 0) {
					return (
						<FeedThumbnailList
							items={item}
							whenEmpty={whenFeedThumbnailEmpty('피드 게시물이 없습니다.')}
							onClickThumnail={onClick_Thumbnail_FeedTab}
						/>
					);
				} else if (tabMenuSelected == 1) {
					return (
						<FeedThumbnailList
							items={item}
							whenEmpty={whenFeedThumbnailEmpty('태그된 게시물이 없습니다.')}
							onClickThumnail={onClick_Thumbnail_TagTab}
						/>
					);
				} else {
					if (protectList == 'false') {
						return (
							<View style={[styles.loadingContainer, {}]}>
								<ActivityIndicator size="large" color={APRI10} />
							</View>
						);
					} else
						return (
							<FlatList
								data={protectList}
								renderItem={renderProtect}
								ListEmptyComponent={whenFeedThumbnailEmpty('현재 보호중인 동물이 없습니다.')}
								style={{paddingVertical: protectList && protectList.length == 0 ? 0 : 20 * DP}}
								onEndReached={onEndReached}
							/>
						);
				}
			}
		};
		if (feedList == 'false' || data.is_follow == undefined) {
			return (
				<View style={[styles.loadingContainer, {}]}>
					<ActivityIndicator size="large" color={APRI10} />
				</View>
			);
		} else
			return (
				<View style={[profile.feedListContainer]}>
					<FlatList
						data={[{}, feedList]}
						renderItem={renderItem}
						keyExtractor={(item, index) => index + ''}
						ListHeaderComponent={userProfileInfo()}
						nestedScrollEnabled
						showsVerticalScrollIndicator={false}
						ref={flatlist}
					/>
				</View>
			);
	};

	//프로필 대상이 반려동물 계정
	if (data.user_type == 'pet') {
		return (
			<View style={[login_style.wrp_main, profile.container]}>
				{data != '' ? (
					<>
						{showTabContent()}
						<View style={[temp_style.floatingBtn, profile.floatingBtn, {alignItems: 'center', justifyContent: 'center'}]}>
							<Write94 onPress={moveToFeedWrite} />
						</View>
					</>
				) : (
					<Loading isModal={false} />
				)}
			</View>
		);
	} else {
		//프로필 대상이 사용자 계정
		return (
			<View style={[login_style.wrp_main, profile.container]}>
				{data != '' ? (
					<>
						{showTabContent()}
						{userGlobalObject.userInfo._id == data._id ? (
							<View style={[temp_style.floatingBtn, profile.floatingBtn, {alignItems: 'center', justifyContent: 'center'}]}>
								<Write94 onPress={moveToFeedWrite} />
							</View>
						) : (
							<View style={[temp_style.floatingTwoBtn, profile.floatingBtn, {alignItems: 'center', justifyContent: 'center'}]}>
								{/* <View style={[buttonstyle.writeButton, buttonstyle.shadow]}>
									<Message94 onPress={() => onPressSendMsg(data._id, data.user_nickname)} />
								</View> */}
								<View style={[buttonstyle.writeButton, buttonstyle.shadow]}>
									<Write94 onPress={moveToFeedWrite} />
								</View>
							</View>
						)}
					</>
				) : (
					<>
						<Loading isModal={false} />
					</>
				)}
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={APRI10} />
					</View>
				) : (
					<></>
				)}
			</View>
		);
	}
};
