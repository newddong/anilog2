import React from 'react';
import {View, TouchableWithoutFeedback, ScrollView, Text, FlatList, Animated, Easing} from 'react-native';
import {getProtectRequestListByShelterId, getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {getUserProfile} from 'Root/api/userapi';
import {NORMAL, PET, SHELTER} from 'Root/i18n/msg';
import {Message94, Write94} from 'Atom/icon';
import TabSelectFilled_Type2 from 'Molecules/tab/TabSelectFilled_Type2';
import ProfileInfo from 'Organism/info/ProfileInfo';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import OwnerList from 'Organism/list/OwnerList';
import PetList from 'Organism/list/PetList';
import {login_style, profile, temp_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import InfoScreen from 'Organism/info/InfoScreen';
<<<<<<< HEAD:src/component/templete/profile/Profile.js
=======
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {getFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/Profile.js

export default Profile = ({route, navigation}) => {
	const [data, setData] = React.useState({...route.params?.userobject, feedList: []}); //라벨을 클릭한 유저의 userObject data
	const [feedList, setFeedList] = React.useState([]);
	const [tabMenuSelected, setTabMenuSelected] = React.useState(0); //프로필 Tab의 선택상태
	const [showOwnerState, setShowOwnerState] = React.useState(false); // 현재 로드되어 있는 profile의 userType이 Pet인 경우 반려인 계정 리스트의 출력 여부
	const [showCompanion, setShowCompanion] = React.useState(false); // User계정이 반려동물버튼을 클릭
	// console.log('tabMenuselc', tabMenuSelected);
	React.useEffect(() => {
		if (route.params && route.params.userobject) {
			// console.log('getUserProfile', route.params.userobject);
			getUserProfile(
				{
					userobject_id: route.params.userobject._id,
				},
				result => {
					navigation.setOptions({title: result.msg.user_nickname, data: result.msg});
					setData(result.msg);
					// console.log('getUserProfileResult', result.msg);
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
	}, []);

	React.useEffect(()=>{
		switch (tabMenuSelected) {
			case 0:
				getFeedListByUserId(
					{ userobject_id: route.params.userobject._id},
					result=> {
						console.log('유저의 피드 리스트', result);
						setFeedList(result.msg);
					},
					err => {
						console.log(err);
						setFeedList([]);
					}
				)
				break;
			case 1:
				getUserTaggedFeedList(
					{ userobject_id: route.params.userobject._id},
					result=> {
						console.log('유저의 태그된 피드 리스트', result);
						setFeedList(result.msg);
					},
					err => {
						console.log(err);
						setFeedList([]);
					}
				)
				break;
			default:
				break;
		}


	},[tabMenuSelected])

	//프로필의 피드탭의 피드 썸네일 클릭
	const onClick_Thumbnail_FeedTab = (index, item) => {
		navigation.push('UserFeedList', {userobject: data, selected: item});
	};

	//프로필의 태그탭의 피드 썸네일 클릭
	const onClick_Thumbnail_TagTab = (index, item) => {
		navigation.push('UserTagFeedList', {userobject: data, selected: item});
	};

	//프로필의 보호활동 탭의 피드 썸네일 클릭
	const onClick_Thumbnail_ProtectTab = () => {
		navigation.push('ProtectAnimalFeedList');
	};

	//보호소프로필의 피드 및 태그 탭 썸네일 클릭xx
	const onClick_FeedThumbnail_ShelterProfile = () => {};

	//보호소프로필의 봉사활동 클릭
	const onClick_Volunteer_ShelterProfile = () => {
		const userType = userGlobalObject.userInfo.user_type;
		if (userType == 'shelter') {
			Modal.popOneBtn('보호소 계정은 봉사활동을 \n 신청하실 수 없습니다.', '확인', () => Modal.close());
		} else {
			navigation.push('ApplyVolunteer', {token: data._id});
		}
	};

	//피드글작성 버튼 클릭(액션버튼)
	const moveToFeedWrite = () => {
		navigation.push('FeedWrite', {feedType: 'Feed'});
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
		navigation.push('UserProfile', {userobject: item});
	};

	const onClickProtectPet = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	const onPressSendMsg = () => {
		alert('sendMsg');
	};

	const onPressAddPetBtn = () => {
		alert('AddPet');
	};

	const onPressAddArticleBtn = () => {
		alert('addArticle');
	};

<<<<<<< HEAD:src/component/templete/profile/Profile.js
=======
	const petListEmptyComponent = () => {
		return (
			<View style={[profile.listEmpty, {}]}>
				<Text style={[txt.noto28, {color: GRAY10}]}>아직 등록된 반려동물이 없네요.</Text>
			</View>
		);
	};

	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	const onShowCompanion = () => {
		setShowCompanion(true);
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 212 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	const onHideCompanion = () => {
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => setShowCompanion(false));
	};

	const onShowOwnerBtnClick = () => {
		setShowOwnerState(true);
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 212 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};
	const onHideOwnerBtnClick = () => {
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => setShowOwnerState(false));
	};

>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/Profile.js
	//userType이 PET이며 Tab의 반려인계정이 Open으로 설정이 되어 있는 경우
	const showPetOrOwnerList = () => {
		if (data.user_type == PET && showOwnerState) {
			// 반려인 계정
			return (
				<Animated.View
					style={[
						profile.petList,
						{
							height: animatedHeight,
						},
					]}>
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

	const userProfileInfo = () => {
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
					/>
				</View>
				{showPetOrOwnerList()}
			</>
		);
	};

	//TabSelect 하단 AccountList
	const showTabContent = () => {
		const whenFeedThumbnailEmpty = () => {
			return (
				<View style={[profile.whenFeedThumbnailEmpty]}>
					<Text style={[txt.roboto32b]}>피드 게시물이 없습니다.</Text>
				</View>
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
			if (data.user_type != SHELTER) {
				if (tabMenuSelected == 0) {
					return <FeedThumbnailList items={item} whenEmpty={whenFeedThumbnailEmpty} onClickThumnail={onClick_Thumbnail_FeedTab} />;
				} 
				else if(tabMenuSelected == 1){
					return <FeedThumbnailList items={item} whenEmpty={whenFeedThumbnailEmpty} onClickThumnail={onClick_Thumbnail_TagTab} />;
				}
				else {
					return <InfoScreen />;
				}
			} else {
				if (tabMenuSelected != 2) {
					return <FeedThumbnailList items={item} whenEmpty={whenFeedThumbnailEmpty} onClickThumnail={onClick_Thumbnail_FeedTab} />;
					// return <InfoScreen />;
				} else {
					return <InfoScreen />;
				}
			}
		};

		return (
			<View style={[profile.feedListContainer]}>
				<FlatList
					data={[{},feedList]}
					renderItem={renderItem}
					keyExtractor={(item, index) => index + ''}
					ListHeaderComponent={userProfileInfo()}
					stickyHeaderIndices={[1]}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	};

	// 유저타입에 따라 다른 탭 아이템 출력
	const getTabSelectList = () => {
		return data.user_type == PET ? (
			<TabSelectFilled_Type2 items={['피드', '태그']} onSelect={onSelectTabMenu} />
		) : (
			<TabSelectFilled_Type2 items={['피드', '태그', '커뮤니티']} onSelect={onSelectTabMenu} />
		);
	};

	return (
		<View style={[login_style.wrp_main, profile.container]}>
			{showTabContent()}
			{userGlobalObject.userInfo && (
<<<<<<< HEAD:src/component/templete/profile/Profile.js
				<View style={[temp_style.floatingBtn, profile.floatingBtn]}>
					{data.user_type == 'pet' ? <Message94 onPress={onPressSendMsg} /> : <Write94 onPress={moveToFeedWrite} />}
				</View>
=======
				<View style={[{width: 94 * DP}, {height: 94 * DP}, profile.floatingBtn, {alignItems: 'center'}, {justifyContent: 'center'}]}>
					{data.user_type == 'pet' ? <Message94 onPress={onPressSendMsg} /> : <Write94 onPress={moveToFeedWrite} />}
				</View>
				// <View style={[temp_style.floatingBtn, profile.floatingBtn, {alignItems: 'center'}, {justifyContent: 'center'}, {backgroundColor: 'yellow'}]}>
				// 	{data.user_type == 'pet' ? <Message94 onPress={onPressSendMsg} /> : <Write94 onPress={moveToFeedWrite} />}
				// </View>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/Profile.js
			)}
		</View>
	);
};
