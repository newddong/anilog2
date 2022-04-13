import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {login_style, shelterMenu, temp_txt, temp_style, btn_style, userMenu_style} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/core';
import ProfileImageLarge160 from 'Molecules/image/ProfileImageLarge160';
import {txt} from 'Root/config/textstyle';
import SocialInfoB from 'Organism/info/SocialInfoB';
import {btn_w280, btn_w280x68} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, FloatAddArticle_128x68, FloatAddPet_128x68} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileMenu from 'Organism/menu/ProfileMenu';
import {Setting46, FavoriteTag48_Filled, Heart48_Filled, Paw46} from 'Atom/icon';
import {
	MANAGEMENT_OF_PROTECTED_ANIMAL,
	PROTECTED_ANIMAL,
	INQUERY_APPLICATION,
	FROM_MY_SHELTER,
	MANAGEMENT_OF_VOLUNTEER,
	FAVORITES,
	FRIENDS,
	PEED_CONTENTS,
	REQ_PROTECTION_SAVE,
	COMUNITY,
	MY_ACTIVITY_IN_SHELTER,
	MY_CONTENTS,
	TAGED_CONTENTS_FOR_ME,
	APPLICATION_HISTORY,
	UPLOADED_POST_FOR_REQ_PROTECTION,
	NOTE_LIST,
	SETTING,
	INFO_QUESTION,
	ACCOUNT,
	MODIFY_SHELTER_DATA,
	LOGOUT,
	INFO,
} from 'Root/i18n/msg';
import {GRAY10, GRAY40} from 'Root/config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getUserProfile} from 'Root/api/userapi';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';

export default ShelterMenu = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({}); //우선 userObject_Shelter 0번 추가
	const [showMoreIntro, setShowMoreIntro] = React.useState(false);
	const [introOriginLine, setIntroOriginLine] = React.useState(0);
	// console.log('introOriginLine', introOriginLine);
	React.useEffect(() => {
		const getInfo = () => {
			getUserProfile(
				{
					userobject_id: userGlobalObject.userInfo._id,
				},
				userObject => {
					// console.log('userObject/ ShelterMenu', userObject.msg);
					setData(userObject.msg);
					// Modal.close();
				},
				err => {
					console.log('err', err);
					// Modal.close();
				},
			);
		};
		const unsubscribe = navigation.addListener('focus', () => getInfo());
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		if (route.params?.pageToMove != undefined) {
			if (route.params.pageToMove == 'AssignProtectAnimalImage') {
				moveToAssignProtectAnimalImage();
			} else if (route.params.pageToMove == 'AidRequestAnimalList') {
				moveToAidRequestAnimalList();
			}
		}
	}, [route.params]);

	//보호소 정보 수정
	const moveToShelterInfoSetting = () => {
		navigation.push('ShelterInfoSetting', data._id);
	};

	//동물 추가
	const moveToAssignProtectAnimalImage = () => {
		navigation.push('AssignProtectAnimalImage');
	};

	//게시물 추가
	const moveToAidRequestAnimalList = () => {
		navigation.push('AidRequestAnimalList', data._id);
	};

	//로그아웃 기능
	const logout = () => {
		userLogout(
			1,
			e => {
				console.log('e', e);
				AsyncStorage.clear();
				alert('Logout 성공');
				navigation.reset({routes: [{name: 'Login'}]});
			},
			err => {
				console.log('err', err);
			},
		);
	};
	//더보기 state 바꾸기
	const changeShowMore = () => {
		setShowMoreIntro(!showMoreIntro);
	};

	//메뉴에 해당되는 네이게이션 이동
	const click_menu = item_menu => {
		switch (item_menu) {
			//--------------- 보호 동물 관리
			// 보호중인 동물
			case PROTECTED_ANIMAL:
				navigation.navigate('ShelterProtectAnimalList');
				break;
			// 신청서 조회
			case INQUERY_APPLICATION:
				navigation.navigate('ProtectionApplicationList');
				break;
			//나의 보호소 출신 동물
			case FROM_MY_SHELTER:
				navigation.push('AnimalFromShelter');
				break;
			//봉사활동 신청 관리
			case MANAGEMENT_OF_VOLUNTEER:
				navigation.push('ManageShelterVolunteer', data._id);
				break;
			//---------------즐겨찾기
			//친구
			case FRIENDS:
				navigation.push('SaveFavorite');
				break;
			//피드 게시글
			case PEED_CONTENTS:
				// Modal.popInfoModal();
				navigation.push('FavoriteFeeds', {token: data._id});
				break;
			//보호요청(저장)
			case REQ_PROTECTION_SAVE:
				navigation.push('FavoriteProtectRequest');
				break;
			//커뮤니티
			case COMUNITY:
				navigation.push('FavoriteCommunity');
				break;
			//-------------나의 활동
			//내 게시물
			case MY_CONTENTS:
				navigation.push('UserFeeds', {token: data._id});
				break;
			// 나를 태그한 글
			case TAGED_CONTENTS_FOR_ME:
				navigation.push('TagMeFeeds', {token: data._id});
				break;
			//신청내역
			case APPLICATION_HISTORY:
				navigation.push('AppliesRecord', data._id);
				break;
			// 보호 요청 올린 게시글
			case UPLOADED_POST_FOR_REQ_PROTECTION:
				navigation.push('ShelterProtectRequests');
				break;
			//커뮤니티
			case '커뮤니티 ':
				navigation.push('MyCommunity');
				break;
			// 신청내역
			case NOTE_LIST:
				navigation.push('ReceivedMessage', {token: data});
				break;
			//-------------- 설정
			//정보/문의
			case INFO_QUESTION:
				navigation.push('SettingInformAsk');
				break;
			// 계정
			case ACCOUNT:
				navigation.push('SettingAccount');
				break;
			//알림
			case INFO:
				navigation.push('SettingAlarm');
				break;
		}
	};

	React.useEffect(() => {
		console.log('introOriginLine', introOriginLine);
	}, [introOriginLine]);

	return (
		<ScrollView>
			<View style={(login_style.wrp_main, shelterMenu.container)}>
				<View style={[shelterMenu.shelterMenuStep1]}>
					{/* Shelter Info*/}
					<View style={[shelterMenu.shelterInfo]}>
						<View style={[shelterMenu.shelterInfo_container]}>
							<View style={[shelterMenu.shelterInfo_container_left]}>
								<View style={[temp_style.profileImageLarge]}>
									<ProfileImageLarge160 data={data} />
								</View>
							</View>
							<View style={[shelterMenu.shelterInfo_container_right]}>
								{/* 보호소 이름 */}
								<View style={[shelterMenu.shelterInfo_user_id]}>
									<Text style={txt.noto40b}>{data.user_nickname || ''}</Text>
								</View>
								{/* SocialInfo */}
								<View style={[shelterMenu.shelterInfo_contents, {marginTop: 18 * DP}]}>
									<SocialInfoB data={data} />
								</View>
							</View>
						</View>
					</View>
					{/* user_introduction */}
					{/* <View style={[temp_style.socialInfoB, shelterMenu.socialInfoB_4Items, {alignItems: 'center'}]}> */}
					<View style={{flexDirection: 'row', width: 654 * DP}}>
						{/* <SocialInfoB data={data} /> */}
						{/* 자기소개글의 본래 텍스트 라인수 체크를 위한 더미텍스트컴포넌트 삭제금지 */}
						<View style={[userMenu_style.introduceBox]}>
							<Text
								style={[txt.noto24, {position: 'absolute', opacity: 0}]}
								numberOfLines={null}
								onTextLayout={({nativeEvent: {lines}}) => {
									setIntroOriginLine(lines.length);
								}}>
								{data.user_introduction || ''}
							</Text>
							{/* 삭제금지 */}
							<Text numberOfLines={showMoreIntro ? 10 : 2} style={[txt.noto26]}>
								{data.user_introduction || '자기소개가 없습니다.'}
							</Text>
						</View>
						{/* 원래 introOriginLine < 3 ?이였지만 작동안해서 수정하였습니다. */}
						{introOriginLine < 1 ? (
							<></>
						) : showMoreIntro ? (
							<TouchableOpacity onPress={changeShowMore} style={[shelterMenu.showMore, {flex: 1}]}>
								<View style={[{flexDirection: 'row'}, {alignSelf: 'flex-end'}, {justifyContent: 'flex-end'}]}>
									<Text style={[txt.noto24, {color: GRAY10}, {alignSelf: 'flex-end'}]}>접기</Text>
									<Arrow_Up_GRAY20 />
								</View>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {flex: 1}]}>
								<View style={[{flexDirection: 'row'}, {alignSelf: 'flex-end'}, {justifyContent: 'flex-end'}]}>
									<Text style={[txt.noto24, {color: GRAY10}]}>펼치기</Text>
									<Arrow_Down_GRAY10 />
								</View>
							</TouchableOpacity>
						)}
					</View>

					<View style={[shelterMenu.btnView, {}]}>
						<View style={[btn_style.btn_w280, {alignItems: 'flex-start'}]}>
							<AniButton btnTitle={MODIFY_SHELTER_DATA} btnStyle={'border'} btnLayout={btn_w280x68} onPress={moveToShelterInfoSetting} />
						</View>

						<View style={[shelterMenu.btnView_floadAddPet_128x68]}>
							<FloatAddPet_128x68 onPress={moveToAssignProtectAnimalImage} />
						</View>

						<View style={[shelterMenu.btnView_floadArticle_128x68]}>
							<FloatAddArticle_128x68 onPress={moveToAidRequestAnimalList} />
						</View>
					</View>
					<View style={[shelterMenu.textView_height36]}>
						<Text style={[shelterMenu.text36, {marginRight: 37 * DP}]}>보호 동물 추가</Text>
						<Text style={[shelterMenu.text36, {marginRight: 7 * DP}]}>보호글 쓰기</Text>
					</View>
				</View>
				{/* 하단 메뉴 */}
				<View style={[shelterMenu.profileMenu1]}>
					<View style={[{borderBottomColor: GRAY40, borderBottomWidth: 10 * DP}]}>
						<ProfileMenu
							menuTitle={MANAGEMENT_OF_PROTECTED_ANIMAL}
							menuItems={[
								[PROTECTED_ANIMAL, INQUERY_APPLICATION],
								[FROM_MY_SHELTER, MANAGEMENT_OF_VOLUNTEER],
							]}
							onClick={click_menu}
							titleIcon={<Heart48_Filled />}
						/>
					</View>
				</View>
				<View style={[shelterMenu.profileMenu2]}>
					<View style={[{borderBottomColor: GRAY40, borderBottomWidth: 10 * DP}]}>
						<ProfileMenu
							menuTitle={FAVORITES}
							menuItems={[
								[FRIENDS, PEED_CONTENTS],
								[REQ_PROTECTION_SAVE, COMUNITY],
							]}
							onClick={click_menu}
							titleIcon={<FavoriteTag48_Filled />}
						/>
					</View>
				</View>
				<View style={[shelterMenu.profileMenu3]}>
					<View style={[{borderBottomColor: GRAY40, borderBottomWidth: 10 * DP}]}>
						<ProfileMenu
							menuTitle={MY_ACTIVITY_IN_SHELTER}
							menuItems={[[MY_CONTENTS, TAGED_CONTENTS_FOR_ME], ['커뮤니티 ', UPLOADED_POST_FOR_REQ_PROTECTION], [NOTE_LIST]]}
							onClick={click_menu}
							titleIcon={<Paw46 />}
						/>
					</View>
				</View>
				<View style={[shelterMenu.profileMenu4]}>
					<ProfileMenu menuTitle={SETTING} menuItems={[[INFO_QUESTION, ACCOUNT], [INFO]]} onClick={click_menu} titleIcon={<Setting46 />} />
				</View>
			</View>
		</ScrollView>
	);
};
