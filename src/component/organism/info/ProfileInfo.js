import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Linking} from 'react-native';
import {BLUE20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w280, btn_w280x68} from 'Atom/btn/btn_style';
import {Bracket48, FloatAddArticle_128x68, FloatAddPet_126x92, FloatAddPet_128x68} from 'Atom/icon';
import ActionButton from 'Molecules/button/ActionButton';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge160 from 'Molecules/image/ProfileImageLarge160';
import SocialInfoA from 'Organism/info/SocialInfoA';
import {FOLLOWER_MENU, FOLLOWER_PET_MENU, NORMAL, PET, SHELTER} from 'Root/i18n/msg';
import ProfileDropdown from 'Molecules/dropdown/ProfileDropdown';
import {organism_style, profileInfo_style} from 'Organism/style_organism';
import Modal from 'Root/component/modal/Modal';
import {followUser, unFollowUser} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import SelectInput from 'Root/component/molecules/button/SelectInput';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import {FloatAddArticle_126x92} from 'Atom/icon';
import {useNavigation} from '@react-navigation/core';
import {setFavoriteEtc} from 'Root/api/favoriteetc';

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
 */
const ProfileInfo = props => {
	const [data, setData] = React.useState(props.data);
	const navigation = useNavigation();
	// console.log('')
	const [showMore, setShowMore] = React.useState(false); // 프로필 Description 우측 더보기 클릭 State
	const [ownerListState, setOwnerListState] = React.useState(false); // userType이 Pet일 경우 반려인계정 출력 여부 T/F
	const [companionListState, setCompanionListState] = React.useState(false); // userType이 User일 경우 반렫동물 리스트 출력 여부 T/F
	const [into_height, setIntro_height] = React.useState(0); //user_introduction 의 길이 => 길이에 따른 '더보기' 버튼 출력 여부 결정

	const isOwner = userGlobalObject.userInfo.user_my_pets.includes(data._id);
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
					btnStyle={companionListState ? 'filled' : 'border'}
					titleFontStyle={26}
					btnLayout={btn_w280x68}
					onOpen={showCompanion}
					onClose={hideCompanion}
				/>
			);
		} else {
			if (userGlobalObject.userInfo._id == data._id) {
				//보호소 프로필이며 자기 계정인 경우
				return (
					<View style={[profileInfo_style.shelterButtonContainer]}>
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
	const onPressFollow = () => {
		props.onPressFollow();
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
				data.user_nickname + '님을 \n 즐겨찾기 등록하시겠습니까?',
				'아니오',
				'등 록',
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
		const FOLLOWER_MENU = [data.is_favorite ? '즐겨찾기 취소' : '즐겨찾기 추가', '소식 받기', '차단', '팔로우 취소'];
		const FOLLOWER_PET_MENU = [data.is_favorite ? '즐겨찾기 취소' : '즐겨찾기 추가', , '소식 받기', '차단', '팔로우 취소', '입양하기'];
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
		if (data.user_type == 'shelter' && data.shelter_address != undefined) {
			return (
				<View style={[profileInfo_style.shelter_info_container]}>
					<Text style={[txt.noto28, {color: GRAY10}]}>{data.shelter_address.brief}</Text>
					<Text onPress={onPressShelterContact} style={[txt.noto28, {color: BLUE20, textDecorationLine: 'underline'}]}>
						{autoHyphen(data.shelter_delegate_contact_number)}
					</Text>
				</View>
			);
		} else {
			return <></>;
		}
	};

	return (
		<View style={organism_style.profileInfo_main}>
			{/* 프로필 INFO */}
			<View style={[organism_style.profileImageLarge_view_profileInfo]}>
				<View style={[organism_style.profileImageLarge_profileInfo, profileInfo_style.profileImageLarge]}>
					<ProfileImageLarge160 data={props.data} />
				</View>
				<View style={[organism_style.socialInfo_profileInfo, profileInfo_style.socialInfo]}>
					<SocialInfoA data={data} />
				</View>
			</View>

			{/* user_introduction 높이정보를 얻기 위한 더미 ScrollView / 투명도 설정으로 화면에는 출력이 되지 않음 */}
			<ScrollView onLayout={onLayout} style={{position: 'absolute', opacity: 0}}>
				<Text ellipsizeMode={'tail'} numberOfLines={showMore ? null : 2} style={[txt.noto24, profileInfo_style.content_expanded]}>
					{data.user_introduction}
				</Text>
			</ScrollView>

			<View style={[organism_style.content_view_profileInfo, profileInfo_style.content_view]}>
				<Text
					ellipsizeMode={'tail'}
					numberOfLines={showMore ? null : 2}
					style={[txt.noto24, showMore ? profileInfo_style.content_expanded : profileInfo_style.content]}>
					{data.user_introduction != '' ? data.user_introduction : '유저 인트로 소개글입니다. 현재는 비어있습니다.'}
				</Text>
				{into_height > 50 * DP ? (
					<TouchableOpacity onPress={onPressShowMore} style={[organism_style.addMore_profileInfo, profileInfo_style.addMore]}>
						<View style={{flexDirection: 'row'}}>
							<Text style={[txt.noto24, {color: GRAY10, top: 2}]}>{showMore ? '접기' : '더보기'} </Text>
							<View style={[showMore ? {transform: [{rotate: '180deg'}]} : null]}>
								<Bracket48 />
							</View>
						</View>
					</TouchableOpacity>
				) : (
					<></>
				)}
			</View>
			{/* 보호소 계정 프로필의 주소 및 연락처 정보 */}
			{getShelterInfo()}

			{/* 프로필 관련 버튼 */}
			<View style={[organism_style.btn_w280_view_profileInfo, profileInfo_style.btn_w280_view]}>
				<View style={[organism_style.btn_w280_profileInfo]}>
					{userGlobalObject.userInfo._id == data._id ? ( //본인 계정이라면 프로필 수정 버튼
						<AniButton onPress={onPressEditProfile} btnTitle={'프로필 수정'} btnStyle={'border'} titleFontStyle={26} btnLayout={btn_w280x68} />
					) : data.is_follow ? ( // 타인 계정이며 팔로우 중이라면 '팔로우 중' OR '팔로우'
						<ArrowDownButton btnTitle={'팔로우 중'} btnLayout={btn_w280x68} onPress={onPressFollowingSetting} />
					) : (
						<AniButton onPress={onPressFollow} btnTitle={'팔로우'} btnStyle={'border'} titleFontStyle={26} btnLayout={btn_w280x68} />
					)}
				</View>
				<View style={[]}>{getButton()}</View>
			</View>
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
};
export default ProfileInfo;
