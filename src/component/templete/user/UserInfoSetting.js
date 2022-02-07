import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import {GRAY10, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE, MODIFY_PROFILE} from 'Root/i18n/msg';
import {btn_w114, btn_w242} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY20, NextMark} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge194 from 'Molecules/image/ProfileImageLarge194';
import MyPetList from 'Organism/list/MyPetList';
import {login_style, btn_style, temp_style, userInfoSetting_style} from 'Templete/style_templete';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserInfoById, getUserProfile, updateUserIntroduction} from 'Root/api/userapi';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
export default UserInfoSetting = ({route}) => {
	// console.log('userInfoSetting', route);
	const navigation = useNavigation();
	const [data, setData] = React.useState({}); // 로그인 유저의 UserObject
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [modifyMode, setModifyMode] = React.useState(false);
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showMore, setShowMore] = React.useState();
	const modifyRef = React.useRef();
	const fetchData = () => {
		AsyncStorage.getItem('token', (err, res) => {
			getUserInfoById(
				{
					userobject_id: res,
				},
				userObject => {
					setData(userObject.msg);
					navigation.setOptions({title: userObject.msg.user_nickname});
					setTimeout(() => {
						setLoading(false);
					}, 500);
					console.log('result / getUserProfile / UserInfoSetting', userObject.msg.user_introduction);
				},
				err => {
					console.log('er', err);
					setTimeout(() => {
						setLoading(false);
					}, 500);
				},
			);
		});
	};
	React.useEffect(() => {
		// fetchData();
		navigation.addListener('focus', () => fetchData());
		//스크린 포커스, 프로필 변경이 있을 시 getUSerInfoById에 접속
	}, [route.params?.changedPhoto]);

	//프로필 변경을 통한 사진변경이 발생했을 경우 params로 해당 포토 uri를 받아오고 data에 적용
	React.useEffect(() => {
		if (route.params != undefined) {
			route.params.changedPhoto ? setData({...data, user_profile_uri: route.params.changedPhoto}) : null;
		}
	}, [route.params?.changedPhoto]);

	//소개란 수정모드
	React.useEffect(() => {
		modifyMode ? modifyRef.current.focus() : null;
	}, [modifyMode]);

	//상세 정보 클릭
	const onPressDetail = () => {
		navigation.push('UserInfoDetailSetting', data);
	};

	//프로필 변경 클릭
	const onPressModofyProfile = () => {
		navigation.push('ChangeUserProfileImage', {data: data, routeInfo: route});
	};

	// 나의 반려동물 -> 반려동물 등록
	const onPressAddPet = () => {
		navigation.push('AssignPetProfileImage', {userobject_id: data._id, previousRouteName: route.name});
	};

	//나의 반려동물 => 반려클릭
	const onClickCompanionLabel = myPetData => {
		console.log('myPetdata', myPetData);
		navigation.push('PetInfoSetting', {pet_id: myPetData._id, token: data});
	};

	//비밀번호 변경하기 클릭
	const onPressChangePwd = () => {
		navigation.push('ChangePassword', data.user_password);
	};

	//User_intro 수정 버튼 클릭
	const modify_userIntro = () => {
		setModifyMode(!modifyMode);
	};

	//수정 후 적용 버튼 클릭
	const modify_finalize = () => {
		setModifyMode(!modifyMode);
		updateUserIntroduction(
			{user_introduction: data.user_introduction},
			success => {
				console.log('introduction modify api', success);
			},
			err => {
				console.log('introduction modify api', err);
			},
		);
	};

	//수정 TextInput 콜백 함수
	const modifyIntroText = text => {
		setData({...data, user_introduction: text});
	};
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView>
					{/* step1 */}
					<View style={[temp_style.userInfoSetting_step1]}>
						<View style={[temp_style.profileImageLarge, userInfoSetting_style.profileImageLarge]}>
							{data._id != undefined && <ProfileImageLarge194 data={data} />}
						</View>
						<View style={[btn_style.btn_w242, userInfoSetting_style.btn_w242]}>
							<AniButton btnTitle={MODIFY_PROFILE} btnLayout={btn_w242} onPress={onPressModofyProfile} />
						</View>
					</View>
					{/* step2 - MyInfo */}
					<View style={[temp_style.userInfoSetting_step2]}>
						{/* 계정정보 */}
						<View style={[temp_style.accountInfo]}>
							<View style={[temp_style.title, userInfoSetting_style.title]}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>계정 정보</Text>
							</View>
							{/* 이메일, 비밀번호 변경하기*/}
							<View style={[temp_style.accountInfo_depth2]}>
								<View style={[temp_style.user_email_userInfoSetting, userInfoSetting_style.user_email]}>
									<Text style={[txt.roboto26]}>{data.user_nickname || ''}</Text>
								</View>
								<View style={[temp_style.changePassword_userInfoSetting, userInfoSetting_style.changePassword]}>
									<TouchableOpacity onPress={onPressChangePwd}>
										<Text style={[txt.noto24, {color: GRAY10}]}>비밀번호 변경하기</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={[temp_style.vertical_border]}></View>

						{/* 상세정보 */}
						<View style={[temp_style.detailInfo]}>
							<View style={[temp_style.title, userInfoSetting_style.title_detail]}>
								<TouchableOpacity onPress={onPressDetail}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>상세 정보</Text>
								</TouchableOpacity>
							</View>
							<View style={[temp_style.bracket48, userInfoSetting_style.bracket48]}>
								<NextMark onPress={onPressDetail} />
							</View>
						</View>
						<View style={[temp_style.vertical_border]}></View>

						{/* 소개 */}
						<View style={[temp_style.introduceInfo]}>
							<View style={[temp_style.introduceInfo_depth1]}>
								<View style={[temp_style.title, userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>소개</Text>
								</View>
								<View style={[btn_style.btn_w114, userInfoSetting_style.btn_w114]}>
									{modifyMode ? (
										<AniButton onPress={modify_finalize} btnTitle={'적용'} btnLayout={btn_w114} />
									) : (
										<AniButton onPress={modify_userIntro} btnTitle={'수정'} btnStyle={'border'} btnLayout={btn_w114} />
									)}
								</View>
							</View>
							<View style={[temp_style.userText_userInfoSetting, userInfoSetting_style.userText]}>
								{/* 소개란의 수정버튼을 누를 시 TextInput으로 변경 */}
								{modifyMode ? (
									<View style={[userInfoSetting_style.user_introModifyContainer]}>
										<TextInput
											onChangeText={modifyIntroText}
											style={[txt.noto24, userInfoSetting_style.user_intro_modifyMode]}
											defaultValue={data.user_introduction || ''}
											multiline={true}
											maxLength={500}
											ref={modifyRef}
											selectTextOnFocus
										/>
									</View>
								) : (
									<View style={{}}>
										<Text style={[txt.noto24, {color: GRAY10}]} ellipsizeMode={'tail'} numberOfLines={showMore ? null : 3}>
											{data.user_introduction || ''}
										</Text>
										{/* 더미 텍스트 삭제금지 */}
										<Text
											style={[txt.noto24, {position: 'absolute', opacity: 0, backgroundColor: 'red'}]}
											numberOfLines={null}
											onTextLayout={({nativeEvent: {lines}}) => {
												setNumOfLines(lines.length);
											}}>
											{data.user_introduction || ''}
										</Text>
										{/* 삭제금지 */}
										{numberOfLines > 3 ? (
											<TouchableOpacity
												onPress={() => setShowMore(!showMore)}
												style={{alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
												<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
												<Arrow_Down_GRAY20 />
											</TouchableOpacity>
										) : (
											<></>
										)}
									</View>
								)}
							</View>
						</View>
					</View>
					{/* step3 - MyPetList */}
					<View style={[temp_style.myPetList]}>
						<View style={[temp_style.myPetList_title]}>
							<View style={[temp_style.title_userInfoSetting, userInfoSetting_style.title_detail]}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>나의 반려동물</Text>
							</View>
						</View>
						<View style={[temp_style.myPetList_myPetList]}>
							<MyPetList items={data?.user_my_pets} onLabelClick={onClickCompanionLabel} addPet={onPressAddPet} />
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
};
