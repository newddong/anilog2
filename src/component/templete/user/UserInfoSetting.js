import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE, MODIFY_PROFILE} from 'Root/i18n/msg';
import {btn_w114, btn_w194, btn_w242} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY20, NextMark} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge194 from 'Molecules/image/ProfileImageLarge194';
import MyPetList from 'Organism/list/MyPetList';
import {login_style, btn_style, temp_style, userInfoSetting_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserInfoById, getUserProfile, updateUserIntroduction} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';

// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
export default UserInfoSetting = ({route}) => {
	// console.log('userInfoSetting', route);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 로그인 유저의 UserObject
	const [modifyMode, setModifyMode] = React.useState(false);
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showMore, setShowMore] = React.useState();
	const modifyRef = React.useRef();

	const fetchData = () => {
		getUserInfoById(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			userObject => {
				// console.log('userObject', userObject);
				setData(userObject.msg);
				navigation.setOptions({title: userGlobalObject.userInfo.user_nickname});
			},
			err => {
				console.log('er', err);
			},
		);
	};

	React.useEffect(() => {
		navigation.addListener('focus', () => fetchData());
		navigation.addListener('blur', () => setModifyMode(false)); //소개글 수정모드 종료
		fetchData();
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
		navigation.push('PetInfoSetting', {pet_id: myPetData._id});
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
			{userobject_id: data._id, user_introduction: data.user_introduction},
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
		const breaks = text.split(/\r\n|\r|\n/).length;
		console.log('breaks', breaks);
		if (breaks > 15) {
			return;
		} else {
			setData({...data, user_introduction: text});
		}
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<KeyboardAvoidingView
				style={[login_style.wrp_main, {flex: 1}]}
				behavior={Platform.OS == 'ios' ? 'position' : 'height'}
				contentContainerStyle={{alignItems: 'center'}}>
				<ScrollView>
					{/* step1 */}
					<View style={[temp_style.userInfoSetting_step1]}>
						<View style={[temp_style.profileImageLarge, userInfoSetting_style.profileImageLarge]}>
							{data._id != undefined && <ProfileImageLarge194 data={data} />}
						</View>
						<View style={[btn_style.btn_w242, userInfoSetting_style.btn_w242]}>
							<AniButton btnTitle={MODIFY_PROFILE} btnStyle={'border'} btnLayout={btn_w194} onPress={onPressModofyProfile} />
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
									<Text style={[txt.roboto26, {maxWidth: 440 * DP}]} numberOfLines={1}>
										{data.user_nickname || ''}
									</Text>
								</View>
								<View style={[temp_style.changePassword_userInfoSetting, userInfoSetting_style.changePassword]}>
									<TouchableOpacity onPress={onPressChangePwd}>
										<Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>비밀번호 변경하기</Text>
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
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>
										소개 <Text style={[txt.noto22b, {color: GRAY20}]}> (최대 500자, 15줄)</Text>
									</Text>
								</View>
								<View style={[btn_style.btn_w114, userInfoSetting_style.btn_w114]}>
									{modifyMode ? (
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={modify_finalize}>
												<Text style={[txt.noto26, {color: GRAY10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>완료</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={modify_userIntro}>
												<Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text>
											</TouchableOpacity>
										</View>
									)}
								</View>
							</View>
							<View style={[temp_style.userText_userInfoSetting, userInfoSetting_style.userText]}>
								{/* 소개란의 수정버튼을 누를 시 TextInput으로 변경 */}
								{modifyMode ? (
									<View style={[userInfoSetting_style.user_introModifyContainer]}>
										<TextInput
											onChangeText={modifyIntroText}
											style={[txt.noto26, userInfoSetting_style.user_intro_modifyMode, {backgroundColor: GRAY40}]}
											defaultValue={data.user_introduction || ''}
											multiline={true}
											value={data.user_introduction}
											placeholder={'소개를 입력해주세요. (최대 500자, 15줄)'}
											maxLength={500}
											ref={modifyRef}
										/>
									</View>
								) : (
									<View style={{}}>
										<Text style={[txt.noto24]} ellipsizeMode={'tail'} numberOfLines={showMore ? null : 3}>
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
					<View style={[temp_style.vertical_border, {marginTop: 30 * DP}]}></View>

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
			</KeyboardAvoidingView>
		);
	}
};

const styles = StyleSheet.create({
	changeInfo: {
		width: 90 * DP,
		height: 64 * DP,
	},
});
