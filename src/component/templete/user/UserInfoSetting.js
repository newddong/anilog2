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
import {GRAY10, GRAY40, APRI10, GRAY20, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {
	AVAILABLE_NICK,
	INTEREST_ACT,
	INTEREST_REGION,
	DEFAULT_PROFILE,
	NEW_NICK_REQUEST,
	NEW_NICK_TITLE,
	NICKNAME_FORM,
	PREVIOUS_NICK_TITLE,
	UNAVAILABLE_NICK,
	MODIFY_PROFILE,
} from 'Root/i18n/msg';
import {btn_w114, btn_w194, btn_w242} from 'Atom/btn/btn_style';
import {Arrow_Down_GRAY20, Edit46, NextMark} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge194 from 'Molecules/image/ProfileImageLarge194';
import MyPetList from 'Organism/list/MyPetList';
import {login_style, btn_style, temp_style, userInfoSetting_style, userInfoDetailSettting_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserInfoById, getUserProfile, updateUserIntroduction} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';
import ProfileImageMedium140 from 'Root/component/molecules/image/ProfileImageMedium140';
import ProfileImageMedium148 from 'Root/component/molecules/image/ProfileImageMedium148';
import {getInterestsList} from 'Root/api/interestsapi';
import Input24 from 'Molecules/input/Input24';
import {updateUserInformation, nicknameDuplicationCheck} from 'Root/api/userapi';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
export default UserInfoSetting = ({route}) => {
	// console.log('userInfoSetting', route);
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 로그인 유저의 UserObject
	const [modifyMode, setModifyMode] = React.useState(false);
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showMore, setShowMore] = React.useState();
	const [nickNameEdit, setNickNameEdit] = React.useState(false);
	const [userDataLoaded, setUserDataLoaded] = React.useState(false);
	const modifyRef = React.useRef();
	const userData = userGlobalObject.userInfo;
	const [newNick, setNewNick] = React.useState(data?.user_nickname);
	const [validateted, setValidated] = React.useState(false);
	const [confirmed, setConfirmed] = React.useState(false);
	const [duplicated, setDuplicated] = React.useState(false);
	//관심목록
	const [locationInterest, setLocationInterest] = React.useState([]);
	const [contentInterest, setContentInterest] = React.useState([]);
	const [interestList, setInterestList] = React.useState();
	const [interestLoaded, setInterestLoaded] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	const fetchData = () => {
		getUserInfoById(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			userObject => {
				// console.log('userObject', userObject);
				setData(userObject.msg);
				// console.log('userObject.msg', userObject.msg);
				setUserDataLoaded(true);
				navigation.setOptions({title: userGlobalObject.userInfo.user_nickname});
			},
			err => {
				console.log('er', err);
			},
		);
	};
	let temp = [];
	React.useEffect(() => {
		if (userDataLoaded) {
			getInterestsList({}, interests => {
				setInterestList(interests.msg);
				setInterestLoaded(true);
			});
			if (data.user_interests) {
				const getContentInteres = Object.entries(data.user_interests).map(content => {
					// console.log('ohhh', content);
					if (content[0] != 'interests_location' && content[0] != '_id') {
						Object.entries(content[1]).map(contents => {
							// console.log('contents', contents[1]);
							temp.push(contents[1]);
						});
					}
				});
			}
			setContentInterest(temp);
			setLocationInterest(data.user_interests.interests_location);
			// setLoaded(true);
		}
	}, [userDataLoaded]);
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
		// navigation.push('ChangeUserProfileImage', {data: data, routeInfo: route});
		navigation.push('SinglePhotoSelect', {prev: {name: route.name, key: route.key}});
	};

	// 나의 반려동물 -> 반려동물 등록
	const onPressAddPet = () => {
		navigation.push('AssignPetProfileImage', {userobject_id: data._id, previousRouteName: route.name});
	};

	//나의 반려동물 => 반려클릭
	// const onClickCompanionLabel = myPetData => {
	// 	navigation.push('PetInfoSetting', {pet_id: myPetData._id});
	// };

	//비밀번호 변경하기 클릭
	// const onPressChangePwd = () => {
	// 	navigation.push('ChangePassword', data.user_password);
	// };

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
	const onPressAddInterestLocation = () => {
		Modal.popInterestTagModal(
			'Location',
			locationInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setLocationInterest,
		);
	};
	const onPressAddInterestActivation = () => {
		console.log(contentInterest);
		Modal.popInterestTagModal(
			'Activity',
			contentInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setContentInterest,
		);
	};
	const onDeleteInterestRegion = index => {
		let copy = locationInterest;
		copy.splice(index, 1);
		setLocationInterest(copy);
		setRefresh(!refresh);
	};

	//관심활동 태그 X마크 삭제 클릭
	const onDeleteInterestAct = index => {
		let copy = contentInterest;
		copy.splice(index, 1);
		console.log('copy', copy);
		setContentInterest(copy);
		setRefresh(!refresh);
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
	const modifyNickNameButton = () => {
		if (nickNameEdit) {
			console.log('닉네임 저장되어야함');
			updateUserInformation(
				{
					userobject_id: data._id,
					user_nickname: newNick == '' ? data.user_nickname : newNick,
				},
				success => {
					// Modal.close();
					if (data.user_type == 'user') {
						setNewNick(newNick);
						userGlobalObject.userInfo.user_nickname = newNick;
						userGlobalObject.userInfo.user_profile_uri = data.user_profile_uri;
					}
					// navigation.navigate({
					// 	name: route.params.routeInfo.name,
					// 	key: route.params.routeInfo.key,
					// 	params: {changedPhoto: data.user_profile_uri},
					// 	merge: true,
					// });
				},
				// console.log('userObject', userObject);
				err => {
					Modal.close();
					console.log('err', err);
				},
			);
		}
		setNickNameEdit(!nickNameEdit);
	};

	const nickName_validator = text => {
		setNewNick(text);
	};
	//중복 처리
	const checkDuplicateNickname = nick => {
		nicknameDuplicationCheck(
			{user_nickname: nick},
			isDuplicated => {
				setDuplicated(isDuplicated.msg);
			},

			err => {
				console.log('duplicated check', err);
			},
		);
	};
	const validateNewNick = nick => {
		let regExp = /^[가-힣a-zA-Z0-9_]{2,20}$/;
		setValidated(regExp.test(nick));
		if (userGlobalObject.userInfo.user_type == 'user') {
			console.log('닉네임중복인가? ', checkDuplicateNickname(nick));
			return regExp.test(nick) && !checkDuplicateNickname(nick);
		} else {
			return regExp.test(nick);
		}
	};
	const onValidName = isValid => {
		setConfirmed(isValid);
	};
	//새 닉네임 지우기 마크 클릭
	const onClearNickname = () => {
		setConfirmed(false);
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
						<View style={[styles.profileImageLarge]}>{data._id != undefined && <ProfileImageMedium148 data={data} />}</View>
						<View style={[styles.textBox]}>
							<TouchableOpacity style={[{alignItems: 'center'}]} onPress={onPressModofyProfile}>
								<Text style={[txt.noto30, {color: APRI10}]}>프로필 사진 바꾸기</Text>
							</TouchableOpacity>
							{/* <AniButton btnTitle={MODIFY_PROFILE} btnStyle={'border'} btnLayout={btn_w194} onPress={onPressModofyProfile} /> */}
						</View>
					</View>
					{/* step2 - MyInfo */}
					{nickNameEdit ? (
						<View>
							<View style={[styles.modifyNickName]}>
								<Text style={[txt.noto30b, {width: 162 * DP}]}>닉네임</Text>
								<Text style={[txt.noto28, {width: 462 * DP}]}></Text>
								<TouchableOpacity style={[{alignItems: 'flex-end'}, {marginLeft: 12 * DP}]} onPress={modifyNickNameButton}>
									<Text>저장</Text>
								</TouchableOpacity>
							</View>
							<View style={[styles.nickNameInput]}>
								<Input24
									onChange={nickName_validator}
									validator={validateNewNick}
									defaultValue={data.user_nickname}
									onValid={onValidName}
									value={newNick}
									// title={NEW_NICK_TITLE}
									descriptionType={'info'}
									info={NICKNAME_FORM}
									placeholder={NEW_NICK_REQUEST}
									showMsg={true}
									// showMsg={false}
									alert_msg={UNAVAILABLE_NICK}
									confirm_msg={AVAILABLE_NICK}
									width={694}
									height={104}
									onClear={onClearNickname}
									maxlength={20}
								/>
							</View>
						</View>
					) : (
						<View style={[styles.first]}>
							<Text style={[txt.noto30b, {width: 162 * DP}]}>닉네임</Text>
							<Text style={[txt.noto28, {width: 462 * DP}]}>{data.user_nickname || ''}</Text>
							<TouchableOpacity style={[{alignItems: 'flex-end'}, {marginLeft: 12 * DP}]} onPress={modifyNickNameButton}>
								<Edit46 />
							</TouchableOpacity>
						</View>
					)}

					<View style={[temp_style.userInfoSetting_step2]}>
						{/* <View style={[temp_style.accountInfo]}>
							<View style={[temp_style.title, userInfoSetting_style.title]}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>계정 정보</Text>
							</View>
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
						<View style={[temp_style.vertical_border]}></View> */}

						{/* 상세정보 */}
						{/* <View style={[temp_style.detailInfo]}>
							<View style={[temp_style.title, userInfoSetting_style.title_detail]}>
								<TouchableOpacity onPress={onPressDetail}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>상세 정보</Text>
								</TouchableOpacity>
							</View>
							<View style={[temp_style.bracket48, userInfoSetting_style.bracket48]}>
								<NextMark onPress={onPressDetail} />
							</View>
						</View>
						<View style={[temp_style.vertical_border]}></View> */}

						{/* /* 소개 */}
						<View style={[temp_style.introduceInfo]}>
							<View style={[temp_style.introduceInfo_depth1]}>
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>
										소개
										{/* <Text style={[txt.noto22b, {color: GRAY20}]}> (최대 500자, 15줄)</Text> */}
									</Text>
								</View>
								<View style={[{alignItems: 'center'}, {marginLeft: 472 * DP}]}>
									{modifyMode ? (
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={modify_finalize}>
												<Text style={[txt.noto26, {color: GRAY10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>저장</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={modify_userIntro}>
												{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
												<Edit46 />
											</TouchableOpacity>
										</View>
									)}
								</View>
							</View>
							<View style={[{width: 750 * DP}, {paddingHorizontal: 24 * DP}]}>
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
					<View style={[styles.first]}>
						<Text style={[txt.noto30b, {width: 162 * DP}]}>핸드폰 번호</Text>
						<Text style={[txt.noto28, {width: 462 * DP}]}>{userData.user_phone_number || ''}</Text>
						{/* <TouchableOpacity style={[{alignItems: 'flex-end'}, {marginLeft: 12 * DP}]}>
							<Edit46 />
						</TouchableOpacity> */}
					</View>
					<View style={[styles.first]}>
						<Text style={[txt.noto30b, {width: 162 * DP}]}>나의 지역</Text>
						<Text style={[txt.noto28, {width: 462 * DP}]}>{data.user_address.district || ''}</Text>
						<TouchableOpacity style={[{alignItems: 'flex-end'}, {marginLeft: 12 * DP}]}>
							<Edit46 />
						</TouchableOpacity>
					</View>
					<View style={[userInfoDetailSettting_style.interestTagList]}>
						<InterestTagList
							onPressAddBtn={onPressAddInterestLocation}
							title={INTEREST_REGION}
							// items={data.user_interests.location || []}
							items={locationInterest || []}
							onDelete={onDeleteInterestRegion}
							extra={refresh}
						/>
					</View>
					<View style={[userInfoDetailSettting_style.interestTagList]}>
						<InterestTagList
							onPressAddBtn={onPressAddInterestActivation}
							title={INTEREST_ACT}
							items={contentInterest || []}
							onDelete={onDeleteInterestAct}
							extra={refresh}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
};

const styles = StyleSheet.create({
	changeInfo: {
		// width: 90 * DP,
		height: 46 * DP,
		// backgroundColor: 'red',
	},
	profileImageLarge: {
		width: 148 * DP,
		height: 148 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 34 * DP,
		// backgroundColor: '#D1E7F1',
	},
	textBox: {
		width: 330 * DP,
		height: 46 * DP,
		marginTop: 10 * DP,
		alignContent: 'center',
		alignSelf: 'center',
	},
	first: {
		width: 750 * DP,
		height: 105 * DP,
		paddingHorizontal: 28 * DP,
		flexDirection: 'row',
		// justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		// backgroundColor: 'red',
	},
	second: {
		width: 750 * DP,
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	modifyNickName: {
		width: 750 * DP,
		// height: 105 * DP,
		paddingHorizontal: 28 * DP,
		flexDirection: 'row',
		// justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30 * DP,
		// borderBottomColor: GRAY40,
		// borderBottomWidth: 2 * DP,
	},
	nickNameInput: {
		width: 750 * DP,
		paddingHorizontal: 28 * DP,
		marginTop: 20 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		// marginBottom: 30 * DP,
		paddingBottom: 30 * DP,
	},
});
