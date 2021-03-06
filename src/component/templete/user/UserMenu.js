import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {
	ACCOUNT,
	ANIMAL_PROTECTION_STATE,
	APPLICATION_HISTORY,
	COMUNITY,
	DEFAULT_PROFILE,
	FAVORITES,
	FRIENDS,
	INFO,
	INFO_QUESTION,
	MY_ACTIVITY_IN_SHELTER,
	MY_COMPANION,
	MY_CONTENTS,
	MY_INFO_MODIFY,
	NOTE_LIST,
	PEED_CONTENTS,
	PROTECTION_REQUEST,
	SETTING,
	TAGED_CONTENTS_FOR_ME,
	LOGOUT,
} from 'Root/i18n/msg';
import {btn_w280, btn_w280x68} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, FavoriteTag48_Filled, Paw46, Paw48_APRI10, Setting46} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge194 from 'Molecules/image/ProfileImageLarge194';
import ProfileMenu from 'Organism/menu/ProfileMenu';
import SocialInfoB from 'Organism/info/SocialInfoB';
import {login_style, shelterMenu, temp_style, userMenu_style} from 'Templete/style_templete';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserProfile} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';
import {userLogout} from 'Root/api/userapi';
import {useIsFocused} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';

export default UserMenu = props => {
	// console.log('UserMenu Props', props);
	const navigation = useNavigation();
	const ifFoucsed = useIsFocused();
	const [data, setData] = React.useState({}); //우선 userObject 0번 추가
	const [showMoreIntro, setShowMoreIntro] = React.useState(false);

	//토큰에 로그인한 유저의 _id를 저장
	React.useEffect(() => {
		//자동로그인 이외의 기능에는 AsyncStorage를 사용해서 토큰을 불러오지 않음
		//메모리의 userObject를 이용해서 권한을 파악할것임
		if (userGlobalObject.userInfo._id == '') {
			navigation.navigate('Login');
		}
	}, []);

	React.useEffect(() => {
		getUserProfile(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			userObject => {
				// console.log('user', userObject.msg.user_my_pets);
				setData(userObject.msg);
			},

			err => {
				console.log('er', err);
			},
		);
	}, [ifFoucsed]); //원래 navigation이였음

	// 나의 반려동물 버튼 클릭
	const onPressMyCompanion = () => {
		// console.log('data my pet', data.user_my_pets);
		if (data.user_my_pets.length == 0) {
			Modal.popTwoBtn(
				'아직 등록하신 반려동물이 없습니다. \n 등록하러 가시겠습니까?',
				'아니오',
				'네',
				() => Modal.close(),
				() => {
					navigation.push('AssignPetProfileImage', {userobject_id: data._id, previousRouteName: 'UserInfoSetting'});
					Modal.close();
				},
			);
		} else {
			Modal.popAvatarSelectModal(
				selectedPet => {
					// console.log('selected', selectedPet);
					navigation.push('PetInfoSetting', {pet_id: selectedPet._id, token: data}); //data에 있는 userObject를 토대로 해당 유저의 반려동물을 검색해서 보내야함
					Modal.close();
				},
				'확인',
				false,
			);
		}
	};

	const onPressMyName = () => {
		navigation.push('UserProfile', {userobject: data});
	};

	// 내 정보 수정 클릭
	const onPressModifyMyInfo = () => {
		navigation.push('UserInfoSetting', {token: data._id}); //userObject
	};

	//로그아웃 기능
	const logout = () => {
		userLogout(
			1,
			e => {
				console.log('e', e);
				userGlobalObject.userInfo = {};
				alert('Logout 성공');
				navigation.reset({routes: [{name: 'Login'}]});
			},
			err => {
				console.log('err', err);
			},
		);
	};

	//하단 메뉴 클릭
	const menuClick = menuItem => {
		switch (menuItem) {
			case '친구':
				// Modal.popInfoModal();
				navigation.push('SaveFavorite'); // FollowObject
				break;
			case '피드 게시글':
				// alert('업데이트 예정입니다');
				// Modal.popInfoModal();
				navigation.push('FavoriteFeeds', {token: data}); // FavoriteFeedObject
				break;
			case '보호 요청(저장)':
				// navigation.push('UserSaveAnimalRequest'); // BookmarkProtectRequestObject
				Modal.popInfoModal();
				break;
			case '내 게시글':
				navigation.push('UserFeeds', {token: data});
				break;
			case '나를 태그한 글':
				Modal.popInfoModal();
				// navigation.push('TagMeFeeds', {token: data});
				break;
			case '신청 내역':
				navigation.push('AppliesRecord', data._id); // ShelterProtectAnimalObject
				break;
			case '동물 보호 현황':
				navigation.push('AnimalProtectList', data._id); //ProtectAnimalObject
				break;
			case '쪽지함':
				Modal.popInfoModal();
				break;
			case '정보/문의':
				Modal.popInfoModal();
				break;
			case '커뮤니티':
				Modal.popInfoModal();
				break;
			case '계정':
				Modal.popInfoModal();
				break;
			case '알림':
				Modal.popInfoModal();
				break;
			case '로그아웃':
				logout();
				break;
		}
		// navigation.push('me')
	};

	return (
		<ScrollView>
			<View style={[login_style.wrp_main, userMenu_style.container]}>
				{/* 유저 프로필 정보 */}
				<View style={[userMenu_style.userMenu_step1]}>
					<View style={[temp_style.userInfo, userMenu_style.userInfo]}>
						<View style={[temp_style.profileImageLarge, userMenu_style.profileImageLarge]}>
							{data._id != undefined && <ProfileImageLarge194 data={data} />}
						</View>

						<View style={{marginLeft: 52 * DP}}>
							<TouchableOpacity onPress={onPressMyName} style={[userMenu_style.user_id]}>
								<Text style={[txt.roboto40b]}>{data.user_nickname || ''}</Text>
							</TouchableOpacity>
							{/* 업로드 팔로워 팔로잉 */}
							<View style={[userMenu_style.contents, {marginTop: 18 * DP}, {alignItems: 'flex-start'}]}>
								<SocialInfoB data={data} />
							</View>
						</View>
					</View>

					<View style={{flexDirection: 'row', width: 654 * DP}}>
						<View style={[userMenu_style.introduceBox, {alignSelf: 'flex-start'}]}>
							{/* <SocialInfoB data={data} /> */}
							{data._id != undefined && (
								<Text numberOfLines={showMoreIntro ? 10 : 2} style={[txt.noto26]}>
									{data.user_introduction || '자기소개가 없습니다.'}
								</Text>
							)}
						</View>
						{data._id != undefined && showMoreIntro ? (
							<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {flex: 1}]}>
								<View style={[{flexDirection: 'row'}, {alignSelf: 'flex-end'}, {justifyContent: 'flex-end'}]}>
									<Text style={[txt.noto24, {color: GRAY10}, {alignSelf: 'flex-end'}]}>접기</Text>
									<Arrow_Up_GRAY20 />
								</View>
							</TouchableOpacity>
						) : data._id != undefined ? (
							<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {flex: 1}]}>
								<View style={[{flexDirection: 'row'}, {alignSelf: 'flex-end'}, {justifyContent: 'flex-end'}]}>
									<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
									<Arrow_Down_GRAY10 />
								</View>
							</TouchableOpacity>
						) : null}
					</View>

					{/* 내 정보 수정 버튼*/}
					<View style={[userMenu_style.btn_w280_view]}>
						<View style={[userMenu_style.btn_w280]}>
							<AniButton btnLayout={btn_w280x68} btnStyle={'border'} btnTheme={'shadow'} btnTitle={MY_INFO_MODIFY} onPress={onPressModifyMyInfo} />
						</View>

						{/* 나의 반려동물 버튼 */}
						<View style={[userMenu_style.btn_w280]}>
							{data.user_my_pets?.length == 0 ? (
								<AniButton btnLayout={btn_w280x68} disable btnTitle={MY_COMPANION} />
							) : (
								<AniButton btnLayout={btn_w280x68} btnStyle={'border'} btnTheme={'shadow'} btnTitle={MY_COMPANION} onPress={onPressMyCompanion} />
							)}
						</View>
					</View>
				</View>

				{/* 하단 메뉴 */}
				<View style={[temp_style.userMenu_step2, userMenu_style.horizontalLine]}>
					<ProfileMenu
						menuTitle={FAVORITES}
						menuItems={[
							[FRIENDS, PEED_CONTENTS],
							[PROTECTION_REQUEST, COMUNITY],
						]}
						onClick={menuClick}
						titleIcon={<FavoriteTag48_Filled />}
					/>
					<ProfileMenu
						menuTitle={MY_ACTIVITY_IN_SHELTER}
						menuItems={[
							[MY_CONTENTS, TAGED_CONTENTS_FOR_ME],
							[APPLICATION_HISTORY, ANIMAL_PROTECTION_STATE],
							[COMUNITY, NOTE_LIST],
						]}
						onClick={menuClick}
						titleIcon={<Paw46 />}
					/>
					<ProfileMenu
						menuTitle={SETTING}
						menuItems={[
							[INFO_QUESTION, ACCOUNT],
							[INFO, LOGOUT],
						]}
						onClick={menuClick}
						titleIcon={<Setting46 />}
					/>
				</View>
			</View>
		</ScrollView>
	);
};
