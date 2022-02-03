import React from 'react';
import {View, TouchableWithoutFeedback, ScrollView, Text, FlatList} from 'react-native';
import {getProtectRequestListByShelterId, getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {getUserProfile} from 'Root/api/userapi';
import {NORMAL, PET, SHELTER} from 'Root/i18n/msg';
import {Write94} from 'Atom/icon';
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

export default Profile = ({route, navigation}) => {
	const [data, setData] = React.useState({...route.params?.userobject, feedList: []}); //라벨을 클릭한 유저의 userObject data
	const [tabMenuSelected, setTabMenuSelected] = React.useState(0); //프로필 Tab의 선택상태
	const [showOwnerState, setShowOwnerState] = React.useState(false); // 현재 로드되어 있는 profile의 userType이 Pet인 경우 반려인 계정 리스트의 출력 여부
	const [showCompanion, setShowCompanion] = React.useState(false); // User계정이 반려동물버튼을 클릭
	const [protectActList, setProtectActList] = React.useState([]);
	// console.log('tabMenuselc', tabMenuSelected);
	React.useEffect(() => {
		if (route.params && route.params.userobject) {
			// console.log('getUserProfile', route.params.userobject);
			getUserProfile(
				{
					userobject_id: route.params.userobject._id,
				},
				result => {
					navigation.setOptions({title: result.msg.user_nickname});
					setData(result.msg);
					console.log('getUserProfileResult', result.msg);
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

	//보호소 프로필일 경우 보호요청 게시글 목록을 조회
	React.useEffect(() => {
		if (data.user_type == 'shelter') {
			const unsubscribe = navigation.addListener('focus', () => {
				getProtectRequestListByShelterId(
					{
						shelter_userobject_id: data._id,
						request_number: 10,
						protect_request_object_id: null,
						protect_request_status: 'rescue',
					},
					result => {
						setProtectActList(result.msg);
					},
					err => {},
				);
			});
			return unsubscribe;
		}
	}, [navigation]);

	//펫 프로필일 경우 반려인 계정을 조회
	React.useEffect(() => {}, []);

	//프로필의 피드탭의 피드 썸네일 클릭
	const onClick_Thumbnail_FeedTab = (index, item) => {
		// console.log('userobject', data.feedList);s
		// console.log('selected', item);
		navigation.push('UserFeedList', {userobject: data, selected: item});
	};

	//프로필의 태그탭의 피드 썸네일 클릭
	const onClick_Thumbnail_TagTab = () => {
		navigation.push('UserTagFeedList');
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

	//보호소프로필의 보호활동 탭의 피드 썸네일 클릭
	const onClickProtectAnimal = (status, user_id, item) => {
		let sexValue = '';

		switch (item.protect_animal_id?.protect_animal_sex || item.protect_animal_sex) {
			case 'male':
				sexValue = '남';
				break;
			case 'female':
				sexValue = '여';
				break;
			case 'male':
				sexValue = '성별모름';
				break;
		}
		// navigation.push('AnimalProtectRequestDetail', {item: item, list: protectActList});
		const titleValue = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + sexValue;

		navigation.navigate('AnimalProtectRequestDetail', {item: item, list: protectActList, title: titleValue});
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

	//userType이 PET이며 Tab의 반려인계정이 Open으로 설정이 되어 있는 경우
	const showPetOrOwnerList = () => {
		if (data.user_type == PET && showOwnerState) {
			// 반려인 계정

			return (
				<View style={[profile.petList]}>
					<OwnerList items={data.pet_family} onClickLabel={onClickOwnerLabel} />
				</View>
			);
			//반려동물
		} else if (data.user_type == NORMAL && showCompanion) {
			return (
				<View style={[profile.petList]}>
					<PetList items={data.user_my_pets} onClickLabel={onClickMyCompanion} />
				</View>
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
						onShowOwnerBtnClick={() => setShowOwnerState(true)}
						onHideOwnerBtnClick={() => setShowOwnerState(false)}
						onShowCompanion={() => setShowCompanion(true)}
						onHideCompanion={() => setShowCompanion(false)}
						onPressVolunteer={onClick_Volunteer_ShelterProfile}
					/>
				</View>
				{showPetOrOwnerList()}
			</>
		);
	};

	//TabSelect 하단 AccountList
	const showTabContent = () => {
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
					return <FeedThumbnailList items={item} onClickThumnail={onClick_Thumbnail_FeedTab} />;
				} else {
					return <InfoScreen />;
				}
			} else {
				if (tabMenuSelected != 2) {
					return <FeedThumbnailList items={item} onClickThumnail={onClick_Thumbnail_FeedTab} />;
					// return <InfoScreen />;
				} else {
					return (
						// <InfoScreen />
						<View style={[profile.animalNeedHelpList]}>
							<AnimalNeedHelpList data={protectActList} onClickLabel={onClickProtectAnimal} />
						</View>
					);
				}
			}
		};

		return (
			<View style={[profile.feedListContainer]}>
				<FlatList
					data={[{}, data.feedList]} //테스트 나중에 data.feedList로 변경해야함
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
			<TabSelectFilled_Type2 items={['피드', '태그', '보호활동']} onSelect={onSelectTabMenu} />
		);
	};

	return (
		<View style={[login_style.wrp_main, profile.container]}>
			{showTabContent()}
			{userGlobalObject.userInfo && (
				<TouchableWithoutFeedback onPress={moveToFeedWrite}>
					<View style={[temp_style.floatingBtn, profile.floatingBtn]}>
						<Write94 />
					</View>
				</TouchableWithoutFeedback>
			)}
		</View>
	);
};
