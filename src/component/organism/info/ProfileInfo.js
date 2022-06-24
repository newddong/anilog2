import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Linking, StyleSheet, FlatList} from 'react-native';
import {BLUE20, GRAY10, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w176, btn_w280x68} from 'Atom/btn/btn_style';
import {Bracket48, FloatAddArticle_128x68, FloatAddPet_128x68} from 'Atom/icon';
import ActionButton from 'Molecules/button/ActionButton';
import AniButton from 'Molecules/button/AniButton';
import SocialInfoA from 'Organism/info/SocialInfoA';
import {NORMAL, PET} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';
import {unFollowUser} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ProfileImageMedium148 from 'Root/component/molecules/image/ProfileImageMedium148';
import DP from 'Root/config/dp';
import UserListHorizon from '../list/UserListHorizon';
import HashText from 'Molecules/info/HashText';

/**
 * 프로필 템플릿 상단의 유저 정보
 * @param {object} props - Props Object
 * @param {object} props.data - ex) 2021.05.01  처음 설정되어 있는 날짜
 * @param {()=>void)} props.onPressVolunteer - 봉사활동 신청 버튼 클릭
 * @param {()=>void} props.onShowOwnerBtnClick - 반려인 버튼 열기 클릭
 * @param {()=>void} props.onHideOwnerBtnClick - 반려인 버튼 닫기 클릭
 * @param {()=>void} props.onShowCompanion - 반려동물 열기 클릭
 * @param {()=>void} props.onHideCompanion - 반려동물 닫기 클릭
 * @param {()=>void} props.adoptionBtnClick - 입양 버튼(삭제예정)
 * @param {()=>void} props.onPressAddPetBtn - 보호소 계정(계정 주인)의 보호동물 추가 버튼 클릭
 * @param {()=>void} props.onPressAddArticleBtn - 보호소 계정(계정 주인)의 보호요청 게시글 추가 버튼 클릭
 * @param {()=>void} props.onPressEditProfile - 일반 혹은 보호소 계정(계정 주인)의 프로필 수정 버튼 클릭
 * @param {()=>void} props.onPressUnFollow - 팔로우 중 버튼 클릭 =>  팔로우취소 버튼 클릭
 * @param {()=>void} props.onPressFollow - 팔로우 버튼 클릭
 * @param {()=>void} props.onClickUpload - 프로필 상단 업로드 클릭
 * @param {()=>void} props.onClickMyCompanion - 펫 프로필 클릭
 * @param {()=>void} props.onClickOwnerLabel - 반려인 프로필 클릭
 */
const ProfileInfo = props => {
	const [data, setData] = React.useState(props.data);
	const [showMore, setShowMore] = React.useState(false); // 프로필 Description 우측 더보기 클릭 State
	const [ownerListState, setOwnerListState] = React.useState(false); // userType이 Pet일 경우 반려인계정 출력 여부 T/F
	const [companionListState, setCompanionListState] = React.useState(true); // userType이 User일 경우 반렫동물 리스트 출력 여부 T/F
	const [into_height, setIntro_height] = React.useState(0); //user_introduction 의 길이 => 길이에 따른 '더보기' 버튼 출력 여부 결정
	React.useEffect(() => {
		if (data.user_type == 'user') {
			showCompanion();
		}
	}, []);

	//더보기 클릭
	const onPressShowMore = () => {
		setShowMore(!showMore);
	};

	//반려인 계정 보이기
	const showOwner = () => {
		setOwnerListState(true);
		props.onShowOwnerBtnClick();
	};
	//반려인 계정 숨기기
	const hideOwner = () => {
		setOwnerListState(false);
		props.onHideOwnerBtnClick();
	};

	//보호소 계정의 봉사활동 버튼 클릭
	const onPressVolunteer = () => {
		props.onPressVolunteer();
	};

	// 펫 계정 => 입양하기 버튼 클릭
	const onPressAdoption = () => {
		props.adoptionBtnClick();
	};

	//유저 계정 => 반려동물 액션버튼 오픈
	const showCompanion = () => {
		setCompanionListState(true);
		props.onShowCompanion();
	};

	//유저 계정 => 반려동물 액션버튼 클로즈
	const hideCompanion = () => {
		setCompanionListState(false);
		props.onHideCompanion();
	};

	const onLayout = e => {
		setIntro_height(e.nativeEvent.layout.height);
	};

	const onPressAddPetBtn = () => {
		props.onPressAddPetBtn();
	};
	const onPressAddArticleBtn = () => {
		props.onPressAddArticleBtn();
	};

	// props.data의 유저타입에 따라 다른 버튼이 출력
	// NORMAL - [팔로우, 반려동물] / PET - [팔로우, 반려인계정 OR 입양하기] / SHELTER - [팔로우, 봉사활동 ]
	const getButton = () => {
		if (data.user_type == PET) {
			if (data.pet_status == 'protected') {
				return <AniButton btnTitle={'입양 하기'} btnStyle={'border'} titleFontStyle={30} btnLayout={btn_w280x68} onPress={onPressAdoption} />;
			} else
				return (
					<ActionButton
						btnTitle={'반려인'}
						btnStyle={ownerListState ? 'filled' : 'border'}
						titleFontStyle={26}
						btnLayout={btn_w280x68}
						onOpen={showOwner}
						onClose={hideOwner}
					/>
				);
		} else if (data.user_type == NORMAL) {
			return (
				<ActionButton
					btnTitle={'반려동물'}
					initState={true}
					btnStyle={companionListState ? 'filled' : 'border'}
					titleFontStyle={26}
					btnLayout={btn_w280x68}
					onOpen={showCompanion}
					onClose={hideCompanion}
				/>
			);
		} else {
			if (!userGlobalObject.userInfo.isPreviewMode && userGlobalObject.userInfo._id == data._id) {
				//보호소 프로필이며 자기 계정인 경우
				return (
					<View style={[style.shelterButtonContainer]}>
						<FloatAddPet_128x68 onPress={onPressAddPetBtn} />
						<FloatAddArticle_128x68 onPress={onPressAddArticleBtn} />
					</View>
				);
			} else {
				return <AniButton btnTitle={'봉사활동 신청'} btnStyle={'border'} titleFontStyle={26} btnLayout={btn_w280x68} onPress={onPressVolunteer} />;
			}
		}
	};

	//현재 프로필의 유저를 팔로우한다.
	const onPressFollow = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			props.onPressFollow();
			// setData({...data, is_follow: !data.is_follow});
		}
	};

	const socialAction = (v, i) => {
		console.log('socialAction', v, i);
		switch (i) {
			case 3:
				unFollowUser(
					{follow_userobject_id: data._id},
					result => {
						setData({...data, is_follow: !result.msg.follow_is_delete, user_follower_count: data.user_follower_count - 1});
					},
					error => Modal.alert(error),
				);
				break;

			default:
				break;
		}
	};

	//즐겨찾기 onOff
	const doFavorite = bool => {
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				bool ? data.user_nickname + '님을 \n 즐겨찾기 등록하시겠습니까?' : data.user_nickname + '님을 \n 즐겨찾기 취소하시겠습니까?',
				'아니오',
				'확 인',
				() => Modal.close(),
				() => {
					Modal.close();
					setTimeout(() => {
						setFavoriteEtc(
							{
								collectionName: 'userobjects',
								target_object_id: data._id,
								is_favorite: bool,
							},
							result => {
								console.log('result / favoriteEtc / profileInfo : ', result.msg.favoriteEtc);
								Modal.close();
								setTimeout(() => {
									Modal.popNoBtn(bool ? '즐겨찾기 등록이 \n 완료되었습니다.' : '즐겨찾기 취소가 \n 완료되었습니다.');
									setTimeout(() => {
										Modal.close();
										setData({...data, is_favorite: bool});
									}, 500);
								}, 200);
							},
							err => {
								console.log('err / favoriteEtc / profileInfo : ', err);
							},
						);
					}, 200);
				},
			);
		}, 200);
	};

	const onPressFollowingSetting = () => {
		let isProtectingPet = data.pet_status == 'protect' || userGlobalObject.userInfo.user_my_pets.includes(data._id);
		const FOLLOWER_MENU = [data.is_favorite ? '즐겨찾기 취소' : '즐겨찾기 추가', '팔로우 취소'];
		const FOLLOWER_PET_MENU = [data.is_favorite ? '즐겨찾기 취소' : '즐겨찾기 추가', '팔로우 취소'];
		Modal.popSelectBoxModal(
			isProtectingPet ? FOLLOWER_PET_MENU : FOLLOWER_MENU,
			selectedItem => {
				switch (selectedItem) {
					case '즐겨찾기 추가':
						doFavorite(true);
						break;
					case '즐겨찾기 취소':
						doFavorite(false);
						break;
					case '소식 받기':
						console.log('소식받기');
						break;
					case '차단':
						console.log('차단');
						break;
					case '팔로우 취소':
						Modal.close();
						props.onPressUnFollow();
						break;
					default:
						break;
				}
			},
			() => Modal.close(),
			true,
			'팔로우 중',
		);
	};

	const onClickUpload = () => {
		props.onClickUpload();
	};

	const onPressEditProfile = () => {
		props.onPressEditProfile();
	};

	const onPressShelterContact = () => {
		Linking.openURL(`tel:${data.shelter_delegate_contact_number}`);
	};

	const autoHyphen = target => {
		let hyphened = target.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
		return hyphened;
	};

	const getShelterInfo = () => {
		if (data.shelter_address != undefined) {
			return (
				<View style={[style.shelter_info_container]}>
					<Text style={[txt.noto26, {}]}>{data.shelter_address.brief}</Text>
					<Text onPress={onPressShelterContact} numberOfLines={2} style={[txt.noto26, {color: BLUE20, textDecorationLine: 'underline'}]}>
						{autoHyphen(data.shelter_delegate_contact_number)}
					</Text>
				</View>
			);
		} else {
			return <></>;
		}
	};

	//유저타입 - 유저 => 반려동물 리스트에서 항목 클릭
	const onClickMyCompanion = item => {
		props.onClickMyCompanion(item);
	};

	//유저타입 - 유저 => 반려동물 리스트에서 항목 클릭
	const onClickOwnerLabel = item => {
		props.onClickOwnerLabel(item);
	};

	//대상 계정이 반려동물 계정이며 나의 펫인지 여부
	const isMyPet = () => {
		let result = false;
		if (data.user_type == 'pet' && data.pet_family.length != 0 && data.pet_family[0]._id == userGlobalObject.userInfo._id) {
			result = true;
		}
		return result;
	};

	const getShelterButton = () => {
		if (data.user_type == 'shelter' && !userGlobalObject.userInfo.isPreviewMode && userGlobalObject.userInfo._id == data._id) {
			return (
				<View style={[style.shelterButtonContainer]}>
					<FloatAddPet_128x68 onPress={onPressAddPetBtn} />
					<FloatAddArticle_128x68 onPress={onPressAddArticleBtn} />
				</View>
			);
		}
	};

	const isUserProfile = data.user_type == 'user';

	// 팔로워 팔로잉 정보 우측의 버튼 출력
	const getProfileButton = () => {
		//비로그인 모드일 시 미출력
		if (userGlobalObject.userInfo.isPreviewMode) {
			return <></>;
		} else if (userGlobalObject.userInfo._id == data._id || isMyPet()) {
			//내 아이디 혹은 나의 반려동물의 프로필일 경우 '프로필 수정'버튼 출력
			return (
				<View style={{justifyContent: 'flex-end'}}>
					<AniButton onPress={onPressEditProfile} btnTitle={'프로필 수정'} btnStyle={'border'} titleFontStyle={26} btnLayout={btn_w176} />
				</View>
			);
		} else {
			//타 사용자 계정일 경우 팔로우 상태에 따른 버튼 분기 처리
			if (data.is_follow) {
				return (
					<ArrowDownButton onPress={onPressFollowingSetting} btnTitle={'팔로우 중'} btnStyle={'filled'} titleFontStyle={24} btnLayout={btn_w176} />
				);
			} else {
				return <AniButton onPress={() => onPressFollow(true)} btnTitle={'팔로우'} btnStyle={'border'} titleFontStyle={26} btnLayout={btn_w176} />;
			}
		}
	};

	const header = () => {
		if (data.user_type == 'pet') {
			return (
				<View style={[style.petProfile]}>
					<View style={{marginRight: 40 * DP}}>
						<ProfileImageMedium148 data={props.data} />
					</View>
					<UserListHorizon items={data.pet_family} onClickLabel={onClickOwnerLabel} />
				</View>
			);
		} else if (data.user_type == 'user') {
			return (
				<View style={[style.profile]}>
					<View style={{marginRight: 40 * DP}}>
						<ProfileImageMedium148 data={props.data} />
					</View>
					<UserListHorizon items={data.user_my_pets} onClickLabel={onClickMyCompanion} />
				</View>
			);
		} else {
			return (
				<View style={[style.shelterProfile, {alignItems: 'center'}]}>
					<View style={{marginRight: 40 * DP}}>
						<ProfileImageMedium148 data={props.data} />
					</View>
					{getShelterInfo()}
				</View>
			);
		}
	};

	return (
		<View style={[style.profileInfo_main]}>
			{/* 프로필 INFO */}
			{header()}
			{/* user_introduction 높이정보를 얻기 위한 더미 ScrollView / 투명도 설정으로 화면에는 출력이 되지 않음 */}
			<ScrollView onLayout={onLayout} style={{position: 'absolute', opacity: 0}}>
				<Text ellipsizeMode={'tail'} numberOfLines={showMore ? null : 2} style={[txt.noto26, style.intro_expanded]}>
					{data.user_introduction}
				</Text>
			</ScrollView>
			{/* 유저 소개글  */}
			<View style={[style.userIntroCont]}>
				<HashText
					style={[txt.noto26]}
					byteOfLine={60}
					>
					{data.user_introduction != '' ? data.user_introduction : '유저 인트로 소개글입니다. 현재는 비어있습니다.'}
				</HashText>
			</View>
			<View style={[style.footer, {flexDirection: 'row'}]}>
				<View>
					<SocialInfoA data={data} onClickUpload={onClickUpload} />
					{getShelterButton()}
				</View>
				{getProfileButton()}
			</View>
			{/* 보호소 계정 프로필의 주소 및 연락처 정보 */}
		</View>
	);
};
ProfileInfo.defaultProps = {
	volunteerBtnClick: e => {},
	adoptionBtnClick: e => {},
	onShowOwnerBtnClick: e => {},
	onHideOwnerBtnClick: e => {},
	onShowCompanion: e => {},
	onHideCompanion: e => {},
	onPressAddPetBtn: e => {},
	onPressAddArticleBtn: e => {},
	onPressEditProfile: () => {},
	onPressFollow: () => {},
	onPressUnFollow: () => {},
	onClickUpload: () => {},
	onClickMyCompanion: () => {},
	onClickOwnerLabel: () => {},
};
export default ProfileInfo;

const style = StyleSheet.create({
	profileInfo_main: {
		width: 750 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		// height: 416 * DP,
	},
	profile: {
		flexDirection: 'row',
		width: 722 * DP,
		height: 148 * DP,
		marginTop: 10 * DP,
		marginLeft: 28 * DP,
		// backgroundColor: 'red',
	},
	petProfile: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 148 * DP,
		marginTop: 10 * DP,
		// backgroundColor: 'red',
	},
	shelterProfile: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 148 * DP,
		marginTop: 10 * DP,
	},
	footer: {
		width: 694 * DP,
		// height: 68 * DP,
		marginTop: 20 * DP,
		marginBottom: 30 * DP,
		justifyContent: 'space-between',
	},
	userIntroCont: {
		flexDirection: 'row',
		width: 694 * DP,
		marginTop: 20 * DP,
		// backgroundColor: 'red',
	},
	userIntroCont_pet: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 20 * DP,
	},
	addMore_profileInfo: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginLeft: 4 * DP,
	},
	intro: {
		width: 568 * DP,
		height: 80 * DP,
	},
	intro_expanded: {
		width: 568 * DP,
	},

	buttonContainer: {
		width: 292 * DP,
		height: 68 * DP,
	},
	shelter_info_container: {
		width: 466 * DP,
		height: 76 * DP,
		// backgroundColor: 'red',
	},
	shelterButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 270 * DP,
	},
});
