import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useRef} from 'react';
import {Text, View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {
	ACCOUNT,
	ANIMAL_PROTECTION_STATE,
	APPLICATION_HISTORY,
	COMUNITY,
	FAVORITES,
	FRIENDS,
	INFO,
	INFO_QUESTION,
	MY_ACTIVITY_IN_SHELTER,
	MY_CONTENTS,
	MY_INFO_MODIFY,
	NOTE_LIST,
	PEED_CONTENTS,
	PROTECTION_REQUEST,
	SETTING,
	TAGED_CONTENTS_FOR_ME,
	OPENSETTING,
	APPSETTING,
} from 'Root/i18n/msg';
import {btn_w694_r30} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, FavoriteTag48_Border, Home48Border, Paw46_border, Setting46_border} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileMenu from 'Organism/menu/ProfileMenu';
import SocialInfoB from 'Organism/info/SocialInfoB';
import {login_style, shelterMenu, temp_style, userMenu_style} from 'Templete/style_templete';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserProfile} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';
import {useIsFocused} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';
import {GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import ProfileImageMedium148 from 'Root/component/molecules/image/ProfileImageMedium148';
import Loading from 'Root/component/molecules/modal/Loading';
import HashText from 'Root/component/molecules/info/HashText';
export default UserMenu = props => {
	// console.log('UserMenu Props', props);
	const navigation = useNavigation();
	const ifFoucsed = useIsFocused();
	const [data, setData] = React.useState('false'); //우선 userObject 0번 추가
	const [showMoreIntro, setShowMoreIntro] = React.useState(false);
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showInfo, setShowInfo] = React.useState(false);
	const [into_height, setIntro_height] = React.useState(0); //user_introduction 의 길이 => 길이에 따른 '더보기' 버튼 출력 여부 결정
	const [showMore, setShowMore] = React.useState(false);
	//토큰에 로그인한 유저의 _id를 저장
	React.useEffect(() => {
		//자동로그인 이외의 기능에는 AsyncStorage를 사용해서 토큰을 불러오지 않음
		//메모리의 userObject를 이용해서 권한을 파악할것임
		if (userGlobalObject.userInfo._id == '') {
			navigation.navigate('Login');
		}
	}, []);
	// console.log('numberOF lines', numberOfLines);
	React.useEffect(() => {
		getUserProfile(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			userObject => {
				// console.log('user', userObject.msg.user_my_pets);
				setData(userObject.msg);
				console.log('userObjedt intro', userObject.msg.user_introduction.replace(/[\r\n]/gm, ''));
			},

			err => {
				console.log('er', err);
			},
		);
	}, [ifFoucsed]); //원래 navigation이였음

	// 나의 반려동물 버튼 클릭
	const onPressMyCompanion = () => {
		// console.log('data my pet', data.user_my_pets);
		if (data.user_my_pets && data.user_my_pets.length == 0) {
			Modal.popTwoBtn(
				'아직 등록하신 반려동물이 없습니다. \n 등록하러 가시겠습니까?',
				'아니오',
				'네',
				() => Modal.close(),
				() => {
					navigation.navigate('AssignPetProfileImage', {userobject_id: data._id, previousRouteName: 'UserInfoSetting'});
					Modal.close();
				},
			);
		} else {
			Modal.popAvatarSelectModal(
				selectedPet => {
					// console.log('selected', selectedPet);
					navigation.navigate('PetInfoSetting', {pet_id: selectedPet._id}); //data에 있는 userObject를 토대로 해당 유저의 반려동물을 검색해서 보내야함
					Modal.close();
				},
				'확인',
				false,
			);
		}
	};

	const onPressMyName = () => {
		navigation.navigate({key: data._id, name: 'UserProfile', params: {userobject: data}});
	};

	// 내 정보 수정 클릭
	const onPressModifyMyInfo = () => {
		navigation.navigate('UserInfoSetting', {token: data._id}); //userObject
	};
	const onLayout = e => {
		setIntro_height(e.nativeEvent.layout.height);
	};
	//더보기 클릭
	const onPressShowMore = () => {
		setShowMore(!showMore);
	};

	//하단 메뉴 클릭
	const menuClick = menuItem => {
		switch (menuItem) {
			case FRIENDS: //친구 즐겨찾기
				navigation.navigate('FavoriteUser'); // FollowObject
				break;
			case PEED_CONTENTS: //피드게시글
				navigation.navigate('FavoriteFeeds', {token: data}); // FavoriteFeedObject
				break;
			case COMUNITY: //즐겨찾기한 커뮤니티
				navigation.navigate('FavoriteCommunity');
				break;
			case PROTECTION_REQUEST: //보호요청(저장)
				navigation.navigate('FavoriteProtectRequest');
				break;
			case '내 게시글': //내 게시글
				navigation.navigate('UserFeeds');
				break;
			case TAGED_CONTENTS_FOR_ME: //나를 태그한 글
				navigation.navigate('TagMeFeeds', {token: data});
				break;
			case APPLICATION_HISTORY: //신청 내역
				navigation.navigate('AppliesRecord', data._id); // ShelterProtectAnimalObject
				break;
			case ANIMAL_PROTECTION_STATE: // 동물 보호 현황
				navigation.navigate('AnimalProtectList', data._id); //ProtectAnimalObject
				break;
			case NOTE_LIST: // 쪽지함
				navigation.navigate({key: 'ReceivedMessage', name: 'ReceivedMessage', params: {token: data}});
				break;
			case INFO_QUESTION: //정보 문의
				navigation.navigate('SettingInformAsk');
				break;
			case '커뮤니티 ': //나의 활동 커뮤니티
				navigation.navigate('MyCommunity');
				break;
			case ACCOUNT: //계정
				navigation.navigate('SettingAccount');
				break;
			case APPSETTING:
				navigation.navigate('SettingAlarm');
				break;
			case INFO: //알림
				navigation.navigate('SettingAlarm');
				break;
			case OPENSETTING: //공개설정
				navigation.navigate('SettingOpen');
				break;
		}
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<ScrollView>
				<View style={[login_style.wrp_main, userMenu_style.container]}>
					{/* 유저 프로필 정보 */}
					<View style={[styles.userMenu_step1]}>
						<View style={[styles.userInfo, {flexDirection: 'row'}, {marginTop: 30 * DP}]}>
							<View style={[styles.profileImageLarge]}>{data._id != undefined && <ProfileImageMedium148 data={data} />}</View>

							<View style={[{marginLeft: 40 * DP}, {height: 148 * DP}, {justifyContent: 'center'}]}>
								<TouchableOpacity onPress={onPressMyName} style={[styles.user_id]}>
									<Text style={[txt.roboto46b, {alignItems: 'center'}, {marginRight: 5 * DP}, {maxWidth: 470 * DP}]} numberOfLines={1}>
										{data.user_nickname || ''}
									</Text>
									<Home48Border />
								</TouchableOpacity>
								{/* 업로드 팔로워 팔로잉 */}
								<View style={[{width: 462 * DP}, {marginTop: 20 * DP}]}>
									<SocialInfoB data={data} />
								</View>
							</View>
						</View>

						<View style={{flexDirection: 'row', width: 694 * DP}}>
							{/* <View style={[styles.introduceBox, {alignSelf: 'flex-start'}]}> */}
							{/* {data._id != undefined && (
									<Text numberOfLines={!showMoreIntro ? 15 : 2} style={[txt.noto26]}>
										 <Text numberOfLines={showInfo ? 15 : 1} style={[txt.noto26]} onTextLayout={onTextLayout}>
										{data.user_introduction || '자기소개가 없습니다.'}
									</Text>
								)} */}
							<ScrollView onLayout={onLayout} style={{position: 'absolute', opacity: 0}}>
								{/* <Text ellipsizeMode={'tail'} numberOfLines={showMore ? null : 2} style={[txt.noto26, styles.intro_expanded]}>
									{data.user_introduction}
								</Text> */}
							</ScrollView>
							{/* 유저 소개글  */}
							<View style={[styles.userIntroCont]}>
								<HashText style={[txt.noto26]} byteOfLine={55}>
									{data.user_introduction != '' ? data.user_introduction : '유저 인트로 소개글입니다. 현재는 비어있습니다.'}
								</HashText>
							</View>
							{/* </View> */}

							{/* 더미 텍스트 삭제금지 */}
							{/* <Text
								style={[txt.noto24, {position: 'absolute', opacity: 0, backgroundColor: 'red'}]}
								numberOfLines={null}
								onTextLayout={({nativeEvent: {lines}}) => {
									console.log('lines.length', lines.length);
									// setNumOfLines(lines.length);
								}}>
								{data.user_introduction || ''}
							</Text> */}
							{/* 유저 소개란 - 2줄 이상일 경우 더보기/접기 컴포넌트 출력 */}
							{/* {numberOfLines > 2 ? (
								!showMoreIntro ? (
									<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {flex: 1}]}>
										<View style={[userMenu_style.showMoreContainer, {}]}>
											<Text style={[txt.noto24, {color: GRAY10}]}>접기</Text>
											<Arrow_Up_GRAY20 />
										</View>
									</TouchableOpacity>
								) : data._id != undefined ? (
									<TouchableOpacity onPress={() => setShowMoreIntro(!showMoreIntro)} style={[shelterMenu.showMore, {flex: 1}]}>
										<View style={[userMenu_style.showMoreContainer]}>
											<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
											<Arrow_Down_GRAY10 />
										</View>
									</TouchableOpacity>
								) : null
							) : (
								<></>
							)} */}
						</View>

						{/* 내 정보 수정 버튼*/}
						<View style={[styles.btn_w694_view]}>
							<View style={[styles.btn_w694]}>
								<AniButton
									btnLayout={btn_w694_r30}
									btnStyle={'border'}
									btnTheme={'shadow'}
									btnTitle={MY_INFO_MODIFY}
									height={104}
									titleFontStyle={32}
									onPress={onPressModifyMyInfo}
								/>
							</View>

							{/* 나의 반려동물 버튼 */}
							{/* <View style={[userMenu_style.btn_w280]}>
							{data.user_my_pets?.length == 0 ? (
								<AniButton btnLayout={btn_w280x68} disable btnTitle={MY_COMPANION} />
							) : (
								<AniButton btnLayout={btn_w280x68} btnStyle={'border'} btnTheme={'shadow'} btnTitle={MY_COMPANION} onPress={onPressMyCompanion} />
							)}
						</View> */}
						</View>
					</View>

					{/* 하단 메뉴 */}
					<View style={[temp_style.userMenu_step2, userMenu_style.horizontalLine]}>
						{/* <View style={[{borderBottomColor: GRAY40, borderBottomWidth: 10 * DP}]}> */}
						{/* <View> */}
						<ProfileMenu
							menuTitle={FAVORITES}
							menuItems={[
								[FRIENDS, PROTECTION_REQUEST],
								[PEED_CONTENTS, COMUNITY],
							]}
							onClick={menuClick}
							titleIcon={<FavoriteTag48_Border />}
						/>
						{/* </View> */}
						{/* </View> */}
						<View>
							<View>
								<ProfileMenu
									menuTitle={MY_ACTIVITY_IN_SHELTER}
									menuItems={[
										[MY_CONTENTS, TAGED_CONTENTS_FOR_ME],
										[APPLICATION_HISTORY, ANIMAL_PROTECTION_STATE],
										['커뮤니티 ', NOTE_LIST],
									]}
									onClick={menuClick}
									titleIcon={<Paw46_border />}
								/>
							</View>
						</View>
						<View>
							<View>
								<ProfileMenu
									menuTitle={SETTING}
									menuItems={[[APPSETTING, ACCOUNT], [INFO_QUESTION]]}
									onClick={menuClick}
									titleIcon={<Setting46_border />}
									noBottom={true}
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		);
};

const styles = StyleSheet.create({
	userInfo: {
		width: 694 * DP,
		// height: 194 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#BCC0DC',
	},
	userMenu_step1: {
		width: 750 * DP,
		// height: 508 * DP,
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		// backgroundColor: '#6F9B85',
	},
	profileImageLarge: {
		width: 148 * DP,
		height: 148 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
		// alignItems: 'flex-start',
		// backgroundColor: '#D1E7F1',
	},
	user_id: {
		// width: 420 * DP,
		height: 68 * DP,
		// marginTop: 44 * DP,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		// backgroundColor: 'red',
	},
	introduceBox: {
		marginTop: 30 * DP,
		flexDirection: 'row',
		marginLeft: 20 * DP,
		width: 528 * DP,
		// backgroundColor: 'red',
	},
	btn_w694: {
		flexDirection: 'row',
		// marginRight: 50 * DP,
		width: 694 * DP,
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#BF9547',
	},
	btn_w694_view: {
		flexDirection: 'row',
		marginVertical: 40 * DP,
		width: 694 * DP,
		alignItems: 'center',
	},
	intro_expanded: {
		width: 568 * DP,
	},
	userIntroCont: {
		flexDirection: 'row',
		width: 694 * DP,
		marginTop: 20 * DP,
		// backgroundColor: 'red',
	},
});
