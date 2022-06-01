import React from 'react';
import {View, Text, FlatList, Animated, Easing} from 'react-native';
import {followUser, getUserProfile, unFollowUser} from 'Root/api/userapi';
import {COMMUNITY_PROFILE_LIMIT, FREE_LIMIT, NETWORK_ERROR, NORMAL, PET, REVIEW_LIMIT, SHELTER} from 'Root/i18n/msg';
import {EmptyIcon, Message94, Write94} from 'Atom/icon';
import TabSelectFilled_Type2 from 'Molecules/tab/TabSelectFilled_Type2';
import ProfileInfo from 'Organism/info/ProfileInfo';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import OwnerList from 'Organism/list/OwnerList';
import PetList from 'Organism/list/PetList';
import {login_style, profile, temp_style, buttonstyle} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import InfoScreen from 'Organism/info/InfoScreen';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
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

export default Profile = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({...route.params?.userobject, feedList: []}); //라벨을 클릭한 유저의 userObject data
	const [feedList, setFeedList] = React.useState([]);
	const [commList, setCommList] = React.useState('false');
	const [protectList, setProtectList] = React.useState('false');
	const [tabMenuSelected, setTabMenuSelected] = React.useState(0); //프로필 Tab의 선택상태
	const [showOwnerState, setShowOwnerState] = React.useState(false); // 현재 로드되어 있는 profile의 userType이 Pet인 경우 반려인 계정 리스트의 출력 여부
	const [showCompanion, setShowCompanion] = React.useState(true); // User계정이 반려동물버튼을 클릭
	const flatlist = React.useRef();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
			if (data.user_type == 'user') {
				fetchCommunity();
				console.log('user focus profile');
			} else if (data.user_type == 'shelter') {
				fetchProtectRequest();
			}
		});
		return unsubscribe;
	}, []);

	const fetchData = () => {
		if (route.params && route.params.userobject) {
			getUserProfile(
				{
					userobject_id: route.params.userobject._id,
				},
				result => {
					navigation.setOptions({title: result.msg.user_nickname, data: result.msg});
					setData(result.msg);
					// console.log('getUserProfile is_Favorite ', result.msg);
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
				userobject_id: route.params.userobject._id,
				community_type: 'all',
				// limit: 10000,
				// page: offset,
			},
			result => {
				console.log('result / getCommunityListuser , free ', result.msg.free.length);
				console.log('result / getCommunityListuser , review ', result.msg.review.length);
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

	const fetchProtectRequest = () => {
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: data._id,
				protect_request_status: 'all',
				protect_request_object_id: '',
				request_number: 5,
			},
			result => {
				// console.log('result / getProtectRequestListByShelterId / AnimalFromShelter', result.msg[0]);
				setProtectList(result.msg);
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalFromShelter', err);
				setProtectList([]);
			},
		);
	};

	React.useEffect(() => {
		switch (tabMenuSelected) {
			case 0:
				getFeedListByUserId(
					{userobject_id: route.params.userobject._id},
					result => {
						// console.log('유저의 피드 리스트', result);
						setFeedList(result.msg);
					},
					err => {
						console.log('getFeedListByUserId err ', err);
						setFeedList([]);
					},
				);
				break;
			case 1:
				getUserTaggedFeedList(
					{userobject_id: route.params.userobject._id},
					result => {
						// console.log('유저의 태그된 피드 리스트', result);
						setFeedList(result.msg);
					},
					err => {
						console.log('getUserTaggedFeedList err', err);
						setFeedList([]);
					},
				);
				break;
			default:
				break;
		}
	}, [tabMenuSelected]);

	//프로필의 피드탭의 피드 썸네일 클릭
	const onClick_Thumbnail_FeedTab = (index, item) => {
		navigation.push('UserFeedList', {userobject: data, selected: item});
		// console.log('data and item', data, item);
	};

	//프로필의 태그탭의 피드 썸네일 클릭
	const onClick_Thumbnail_TagTab = (index, item) => {
		navigation.push('UserTagFeedList', {userobject: data, selected: item});
	};

	//보호소프로필의 봉사활동 클릭
	const onClick_Volunteer_ShelterProfile = () => {
		const userType = userGlobalObject.userInfo.user_type;
		if (userType == 'shelter') {
			Modal.popOneBtn('보호소 계정은 봉사활동을 \n 신청하실 수 없습니다.', '확인', () => Modal.close());
		} else {
			console.log('data', data);
			if (!data.user_contacted) {
				Modal.alert('정식 애니로그 등록된 \n 보호소가 아닙니다!');
			} else {
				navigation.push('ApplyVolunteer', {token: data._id});
			}
		}
	};

	//피드글작성 버튼 클릭(액션버튼)
	const moveToFeedWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
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

	const onClickProtectPet = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	const onPressSendMsg = (_id, name) => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
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

	const petListEmptyComponent = () => {
		return (
			<View style={[profile.listEmpty, {}]}>
				<Text style={[txt.noto28, {color: GRAY10}]}>아직 등록된 반려동물이 없네요.</Text>
			</View>
		);
	};

	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	const onShowCompanion = () => {
		console.log('show');
		setShowCompanion(true);
		animationOpen();
	};

	const onHideCompanion = () => {
		console.log('hide');
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 0,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => setShowCompanion(false));
	};

	const onShowOwnerBtnClick = () => {
		setShowOwnerState(true);
		animationOpen();
	};
	const onHideOwnerBtnClick = () => {
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 0,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => setShowOwnerState(false));
	};

	const animationOpen = () => {
		Animated.timing(animatedHeight, {
			duration: 400,
			toValue: 212 * DP,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	const onClickUpload = () => {
		// console.log('onClickUpload');
		flatlist.current.scrollToIndex({animated: true, index: 1, viewPosition: 0});
	};

	//userType이 PET이며 Tab의 반려인계정이 Open으로 설정이 되어 있는 경우
	const showPetOrOwnerList = () => {
		if (data.user_type == PET && showOwnerState) {
			// 반려인 계정
			return (
				<Animated.View style={[profile.petList, {height: animatedHeight}]}>
					<OwnerList items={data.pet_family} onClickLabel={onClickOwnerLabel} />
				</Animated.View>
			);
			//반려동물
		} else if (data.user_type == NORMAL && showCompanion) {
			return (
				<Animated.View
					style={[
						profile.petList,
						{
							height: animatedHeight,
						},
					]}>
					<PetList items={data.user_my_pets} onClickLabel={onClickMyCompanion} ListEmptyComponent={petListEmptyComponent} />
				</Animated.View>
			);
		}
	};

	//프로필 수정 버튼 클릭(본인 계정일 경우만 가능)
	const onPressEditProfile = () => {
		navigation.push('ChangeUserProfileImage', {data: data, routeInfo: route});
	};

	const onPressFollow = () => {
		followUser(
			{
				follow_userobject_id: data._id,
			},
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
						{
							follow_userobject_id: data._id,
						},
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

	const userProfileInfo = () => {
		if (data.is_follow == undefined) {
			return <Loading isModal={false} />;
		} else
			return (
				<>
					<View style={[profile.profileInfo]}>
						<ProfileInfo
							data={data}
							showMyPet={e => alert(e)}
							volunteerBtnClick={() => navigation.push('ApplyVolunteer')}
							adoptionBtnClick={() => navigation.push('ApplyAnimalAdoptionA')}
							onShowOwnerBtnClick={onShowOwnerBtnClick}
							onHideOwnerBtnClick={onHideOwnerBtnClick}
							onShowCompanion={onShowCompanion}
							onHideCompanion={onHideCompanion}
							onPressVolunteer={onClick_Volunteer_ShelterProfile}
							onPressAddPetBtn={onPressAddPetBtn}
							onPressAddArticleBtn={onPressAddArticleBtn}
							onPressEditProfile={onPressEditProfile}
							onPressUnFollow={onPressUnFollow}
							onPressFollow={onPressFollow}
							onClickUpload={onClickUpload}
						/>
					</View>
					{showPetOrOwnerList()}
				</>
			);
	};

	//프로필의 보호활동 탭의 피드 썸네일 클릭
	const onClickProtect = (status, id, item) => {
		console.log('onClickProtect', item);
		// navigation.push('ProtectAnimalFeedList');
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

	//TabSelect 하단 출력 리스트 컴포넌트
	const showTabContent = () => {
		const whenFeedThumbnailEmpty = text => {
			return <ListEmptyInfo text={text} />;
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
				return (
					<View style={[temp_style.tabSelectFilled_Type2]}>
						{getTabSelectList()}
						{/* {tabMenuSelected == 2 && data.user_type != SHELTER && <ProtectedPetList data={data} onClickLabel={onClickProtectPet} />} */}
						{/* 보호활동 하는 반려동물들 */}
					</View>
				);
			}
			if (data.user_type == 'user') {
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
						return <Loading isModal={false} />;
					} else
						return (
							<FlatList
								data={protectList}
								renderItem={renderProtect}
								ListEmptyComponent={whenFeedThumbnailEmpty('현재 보호중인 동물이 없습니다.')}
								style={{paddingVertical: 20 * DP}}
							/>
						);
				}
			}
		};

		return (
			<View style={[profile.feedListContainer]}>
				<FlatList
					data={[{}, feedList]}
					renderItem={renderItem}
					keyExtractor={(item, index) => index + ''}
					ListHeaderComponent={userProfileInfo()}
					stickyHeaderIndices={[1]}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}
					ref={flatlist}
				/>
			</View>
		);
	};

	// 유저타입에 따라 다른 탭 아이템 출력
	const getTabSelectList = () => {
		if (data.user_type == 'user') {
			return <TabSelectFilled_Type2 items={['피드', '태그', '커뮤니티']} onSelect={onSelectTabMenu} />;
		}
		return data.user_type == PET ? (
			<TabSelectFilled_Type2 items={['피드', '태그']} onSelect={onSelectTabMenu} />
		) : (
			<TabSelectFilled_Type2 items={['피드', '태그', '보호동물']} onSelect={onSelectTabMenu} />
		);
	};
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
					<>
						<Loading isModal={false} />
					</>
				)}
			</View>
		);
	} else {
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
								<View style={[buttonstyle.writeButton, buttonstyle.shadow]}>
									<Message94 onPress={() => onPressSendMsg(data._id, data.user_nickname)} />
								</View>
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
			</View>
		);
	}
};
