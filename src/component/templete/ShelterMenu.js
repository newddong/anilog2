import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {login_style, shelterMenu, temp_txt, temp_style, btn_style} from './style_templete';
import {useNavigation} from '@react-navigation/core';
import ProfileImageLarge160 from '../molecules/ProfileImageLarge160';
import {txt} from 'Root/config/textstyle';
import SocialInfoB from '../organism_ksw/SocialInfoB';
import {btn_w280} from '../atom/btn/btn_style';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, FloatAddPet_126x92} from '../atom/icon';
import {FloatAddArticle_126x92} from '../atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileMenu from '../organism_ksw/ProfileMenu';
import {Setting46, FavoriteTag48_Filled, Heart48_Filled, Paw46} from '../atom/icon';
import {_dummy_VolunteerActivityApplicant, _dummy_userObject_user} from 'Root/config/dummy_data_hjs';
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
} from 'Root/i18n/msg';
import {GRAY10} from 'Root/config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from 'Root/api/userapi';
import {userLogout} from 'Root/api/userapi';

export default ShelterMenu = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({}); //우선 userObject_Shelter 0번 추가
	const [showMoreIntro, setShowMoreIntro] = React.useState(false);
	const [introOriginLine, setIntroOriginLine] = React.useState(0);
	React.useEffect(() => {
		const getInfo = () => {
			AsyncStorage.getItem('token', async (err, res) => {
				// Modal.popNoBtn('Loading');
				getUserProfile(
					{
						userobject_id: res,
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
			});
		};
		const unsubscribe = navigation.addListener('focus', () => getInfo());

		return unsubscribe;
	}, []);

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

	//메뉴에 해당되는 네이게이션 이동
	const click_menu = item_menu => {
		switch (item_menu) {
			//--------------- 보호 동물 관리
			// 보호중인 동물
			case PROTECTED_ANIMAL:
				navigation.navigate('ShelterProtectAnimalList', {nav: 'ShelterProtectAnimalList', token: data._id});
				break;
			// 신청서 조회
			case INQUERY_APPLICATION:
				navigation.navigate('ProtectApplyList', {nav: 'ProtectApplyList', token: data._id, shelter_name: data.shelter_name});
				break;
			//나의 보호소 출신 동물
			case FROM_MY_SHELTER:
				//listType: 'original'- 클릭시 해당 UserProfile로 go, 'twoBtn' - 클릭시 외곽 선 표출, , 'checkBox' - 해당 페이지에서 바로 체크박스 표출
				navigation.push('AnimalFromShelter', data._id);
				break;
			//봉사활동 신청 관리
			case MANAGEMENT_OF_VOLUNTEER:
				navigation.push('ManageShelterVolunteer');
				break;
			//---------------즐겨찾기
			//친구
			case FRIENDS:
				// navigation.push('SaveFavorite');
				Modal.popInfoModal();
				break;
			//피드 게시글
			case PEED_CONTENTS:
				Modal.popInfoModal();
				// navigation.push('FavoriteFeeds', {token: data._id});
				break;
			//보호요청(저장)
			case REQ_PROTECTION_SAVE:
				//listType: 'original'- 클릭시 해당 UserProfile로 go, 'twoBtn' - 클릭시 외곽 선 표출, , 'checkBox' - 해당 페이지에서 선택하기 시 체크박스 표출
				// navigation.push('ShelterSaveAnimalRequest');
				Modal.popInfoModal();
				break;
			//커뮤니티
			case COMUNITY:
				Modal.popInfoModal();
				break;
			//-------------나의 활동
			//내 게시물
			case MY_CONTENTS:
				navigation.push('UserFeeds', {token: data._id});
				break;
			// 나를 태그한 글
			case TAGED_CONTENTS_FOR_ME:
				// navigation.push('TagMeFeeds', {token: data._id});
				Modal.popInfoModal();
				break;
			//신청내역
			case APPLICATION_HISTORY:
				Modal.popInfoModal();
				break;
			// 보호 요청 올린 게시글
			case UPLOADED_POST_FOR_REQ_PROTECTION:
				//보호요청 게시글 스크린 필요 데이터 : ShelterProtectAnimalObject.protect_animal_writer_id == userData._id가 일치하는 것을 검색해야한다
				navigation.push('ShelterProtectRequests', data._id);
				break;
			//커뮤니티
			case COMUNITY:
				Modal.popInfoModal();
				break;
			// 신청내역
			case NOTE_LIST:
				Modal.popInfoModal();
				break;
			//-------------- 설정
			//정보/문의
			case INFO_QUESTION:
				Modal.popInfoModal();
				break;
			// 계정
			case ACCOUNT:
				Modal.popInfoModal();
				break;
			//로그아웃
			case LOGOUT:
				logout();
				break;
		}
	};

	React.useEffect(() => {
		console.log('introOriginLine', introOriginLine);
	}, [introOriginLine]);

	return (
		<View style={(login_style.wrp_main, shelterMenu.container)}>
			<ScrollView style={{backgroundColor: '#FFF'}}>
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
									<Text style={txt.noto36b}>{data.user_nickname || ''}</Text>
								</View>
								{/* user_introduction */}
								<View style={[shelterMenu.shelterInfo_contents]}>
									{/* 자기소개글의 본래 텍스트 라인수 체크를 위한 더미텍스트컴포넌트 삭제금지 */}
									<Text
										style={[txt.noto24, {position: 'absolute', opacity: 0, backgroundColor: 'red'}]}
										numberOfLines={null}
										onTextLayout={({nativeEvent: {lines}}) => {
											setIntroOriginLine(lines.length);
										}}>
										{data.user_introduction || ''}
									</Text>
									{/* 삭제금지 */}
									<Text numberOfLines={showMoreIntro ? 10 : 2} style={[txt.noto24, {color: GRAY10}]}>
										{data.user_introduction || '자기소개가 없습니다.'}
									</Text>
									{introOriginLine < 3 ? (
										<></>
									) : showMoreIntro ? (
										<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {}]}>
											<Text style={[txt.noto24, {color: GRAY10}]}>접기</Text>
											<Arrow_Up_GRAY20 />
										</TouchableOpacity>
									) : (
										<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {}]}>
											<Text style={[txt.noto24, {color: GRAY10}]}>펼치기</Text>
											<Arrow_Down_GRAY10 />
										</TouchableOpacity>
									)}
								</View>
							</View>
						</View>
					</View>
					{/* SocialInfo */}
					<View style={[temp_style.socialInfoB, shelterMenu.socialInfoB_4Items]}>
						<SocialInfoB data={data} />
					</View>

					<View style={[shelterMenu.btnView, {}]}>
						<View style={[btn_style.btn_w280]}>
							<AniButton btnTitle={MODIFY_SHELTER_DATA} btnStyle={'border'} btnLayout={btn_w280} onPress={moveToShelterInfoSetting} />
						</View>

						<View style={[shelterMenu.btnView_floadAddPet_126x92]}>
							<FloatAddPet_126x92 onPress={moveToAssignProtectAnimalImage}></FloatAddPet_126x92>
						</View>

						<View style={[shelterMenu.btnView_floadArticle_126x92]}>
							<FloatAddArticle_126x92 onPress={moveToAidRequestAnimalList}></FloatAddArticle_126x92>
						</View>
					</View>
				</View>
				{/* 하단 메뉴 */}
				<View style={[shelterMenu.profileMenu1]}>
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
				<View style={[shelterMenu.profileMenu2]}>
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
				<View style={[shelterMenu.profileMenu3]}>
					<ProfileMenu
						menuTitle={MY_ACTIVITY_IN_SHELTER}
						menuItems={[
							[MY_CONTENTS, TAGED_CONTENTS_FOR_ME],
							[APPLICATION_HISTORY, UPLOADED_POST_FOR_REQ_PROTECTION],
							[COMUNITY, NOTE_LIST],
						]}
						onClick={click_menu}
						titleIcon={<Paw46 />}
					/>
				</View>
				<View style={[shelterMenu.profileMenu4]}>
					<ProfileMenu
						menuTitle={SETTING}
						menuItems={[
							[INFO_QUESTION, ACCOUNT],
							[, LOGOUT],
						]}
						onClick={click_menu}
						titleIcon={<Setting46 />}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const t = {
	_id: '61b9eba4185a4f69d5981ad6',
	feedList: [[Object], [Object], [Object], [Object], [Object], [Object], [Object]],
	user_denied: false,
	user_follow_count: 0,
	user_follower_count: 0,
	user_introduction: '',
	user_my_pets: [],
	user_nickname: '상우 보호소',
	user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1639574436056_DWG_KIA_logo.png',
	user_type: 'shelter',
	user_upload_count: 0,
};
