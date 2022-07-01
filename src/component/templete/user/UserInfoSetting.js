import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
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
import {login_style, temp_style, userInfoDetailSettting_style, userInfoSetting_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
// import {getUserProfile} from 'Root/api/usermenuapi';
import {getUserInfoById, getUserProfile, updateUserDetailInformation, updateUserIntroduction} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';
import ProfileImageMedium148 from 'Root/component/molecules/image/ProfileImageMedium148';
import {getInterestsList} from 'Root/api/interestsapi';
import Input24 from 'Molecules/input/Input24';
import {updateUserInformation, nicknameDuplicationCheck} from 'Root/api/userapi';
import SelectInput from 'Root/component/molecules/button/SelectInput';
import {getAddressList} from 'Root/api/address';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import {lo} from '../style_address';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
export default UserInfoSetting = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); // 로그인 유저의 UserObject
	const [modifyMode, setModifyMode] = React.useState(false);
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showMore, setShowMore] = React.useState();
	const [nickNameEdit, setNickNameEdit] = React.useState(false);
	const [locationEdit, setLocationEdit] = React.useState(false);
	const [userDataLoaded, setUserDataLoaded] = React.useState(false);
	const modifyRef = React.useRef();
	const userData = userGlobalObject.userInfo;
	const [newNick, setNewNick] = React.useState(data.user_nickname);
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
	// React.useEffect(() => {
	// 	getAddressList(
	// 		{},
	// 		cities => {
	// 			setCity(cities.msg), handleError;
	// 		},
	// 		err => Modal.alert(err),
	// 	);
	// 	getAddressList(
	// 		{city: data.user_address?.city},
	// 		districts => {
	// 			setDistrict(districts.msg), handleError;
	// 		},
	// 		err => Modal.alert(err),
	// 	);
	// }, []);
	let temp = [];
	React.useEffect(() => {
		if (userDataLoaded) {
			// getInterestsList({}, interests => {
			// 	setInterestList(interests.msg);
			// 	setInterestLoaded(true);
			// });
			getCommonCodeDynamicQuery(
				{
					common_code_c_name: 'communityobjects',
					common_code_language: 'kor',
					common_code_out_type: 'interests',
				},
				result => {
					let temp = [];
					console.log('common code result', result);
					for (const key in result.msg) {
						let temp2 = {};
						temp2[key] = result.msg[key].definition;
						temp.push(temp2);
					}
					console.log('temptemptmep', temp);
					setInterestList(result.msg);
					setInterestLoaded(true);
				},
				err => {
					console.log('common code err', err);
				},
			);

			if (data.user_interests) {
				const getContentInteres = Object.entries(data.user_interests).map(content => {
					console.log('ohhh', content);
					if (content[0] != 'interests_location' && content[0] != '_id') {
						Object.entries(content[1]).map(contents => {
							console.log('contents', contents);
							temp.push(contents[1]);
						});
					}
				});
			}
			console.log('for 문 끝남', temp);
			setContentInterest(temp);
			setLocationInterest(data.user_interests.interests_location);
			// setLoaded(true);
			getAddresses();
		}
	}, [userDataLoaded]);
	React.useEffect(() => {
		navigation.addListener('focus', () => fetchData());
		navigation.addListener('blur', () => setModifyMode(false)); //소개글 수정모드 종료
		fetchData();
		//스크린 포커스, 프로필 변경이 있을 시 getUSerInfoById에 접속
	}, [route.params?.selectedPhoto]);

	//프로필 변경을 통한 사진변경이 발생했을 경우 params로 해당 포토 uri를 받아오고 data에 적용
	React.useEffect(() => {
		if (route.params != undefined && route.params.selectedPhoto != undefined) {
			// route.params.selectedPhoto ? setData({...data, user_profile_uri: route.params.selectedPhoto[0].uri}) : null;
			try {
				userGlobalObject.userInfo.user_profile_uri = route.params.selectedPhoto[0].cropUri ?? route.params.selectedPhoto[0].uri;
			} catch (err) {
				console.log('err', err);
			}
			updateUserInformation(
				{
					userobject_id: userGlobalObject.userInfo._id,
					user_profile_uri: route.params.selectedPhoto[0].cropUri ?? route.params.selectedPhoto[0].uri,
					user_nickname: userGlobalObject.userInfo.user_nickname,
				},
				r => {
					// console.log('사진변경결과', r.msg);
					setData({...r.msg});
					userGlobalObject.userInfo.user_profile_uri = r.msg.user_profile_uri;
				},
				e => console.log('err', e),
			);
			// console.log('사진 변경ehl', route.params.selectedPhoto[0].uri, userGlobalObject);
		}
		// console.log('사진 변경', route.params);
	}, [route.params?.selectedPhoto]);

	//소개란 수정모드
	React.useEffect(() => {
		modifyMode ? modifyRef.current.focus() : null;
	}, [modifyMode]);
	//변경된 locationObject와 contentInterest를 저장형식에 맞게 파싱
	React.useEffect(() => {
		if (interestLoaded) {
			// console.log('바뀐 contentInterst 목록', contentInterest);

			let tempObject = {};
			for (const key in interestList) {
				console.log('keys', key);
				tempObject[key] = interestList[key].definition;
			}
			console.log('tempObject', tempObject);
			for (let props of contentInterest) {
				console.log('props props interestList', props, contentInterest, interestList);
				///TODO props로 넘어온 list의 값을 interestList에서 찾아서 interest_etc :[어쩌고] 이런식으러 만들어서 넘겨줘야함.
				// const getKey = Object.entries(interestList[0]).map(content => {
				const getKey = Object.entries(interestList).map(content => {
					console.log('hihihi', content, props);
					console.log('interestListList', interestList);
					if (content[1].definition.includes(props)) {
						// console.log('hohohoho', props, content[0]);
						// setContentSendObject((contentSendObejct[content[0]] = props));
						if (temp[content[0]]) {
							temp[content[0]].push(props);
						} else {
							temp[content[0]] = [props];
						}

						console.log('temp', temp);
					}
				});
			}
			let locationObject = {interests_location: locationInterest};
			Object.assign(locationObject, temp);
			console.log('locationObejct에 assign', locationObject, data.user_address);
			setData(prevState => ({
				...prevState,
				user_interests: locationObject,
			}));
			updateUserDetailInformation(
				{
					user_interests: locationObject,

					// user_address: data.user_address,
				},

				result => {
					console.log('result / updateUserDetailInformation / SaveButtonHeader   : ', result);
					// setTimeout(() => {
					// Modal.close();
					// navigation.goBack();
					// }, 200);
				},
				err => {
					console.log('err / updateUserDetailInformation / SaveButtonHeader    :  ', err);
					Modal.close();
				},
			);
		}
		// console.log('setData', data.user_interests);
	}, [refresh, locationInterest, contentInterest]);
	// React.useEffect(() => {
	// 	console.log('data.user_interest 바뀜 -> 변경', data.user_interests);
	// 	updateUserDetailInformation(
	// 		{
	// 			user_interests: data.user_interests,
	// 		},

	// 		result => {
	// 			console.log('result / updateUserDetailInformation / SaveButtonHeader   : ', result);
	// 			// setTimeout(() => {
	// 			// Modal.close();
	// 			// navigation.goBack();
	// 			// }, 200);
	// 		},
	// 		err => {
	// 			console.log('err / updateUserDetailInformation / SaveButtonHeader    :  ', err);
	// 			Modal.close();
	// 		},
	// 	);
	// }, [data.user_interests]);
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
	//지역 모달에 사용될 지역정보 얻어오기
	const getAddresses = () => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg), handleError;
			},
			err => Modal.alert(err),
		);
		getAddressList(
			{city: data.user_address?.city},
			districts => {
				setDistrict(districts.msg), handleError;
			},
			err => Modal.alert(err),
		);
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
		console.log('contentInterest', contentInterest);
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

	const validateNewNick = nick => {
		let regExp = /^[가-힣a-zA-Z0-9_]{2,12}$/;
		let emojExp = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

		setValidated(regExp.test(nick));
		if (userGlobalObject.userInfo.user_type == 'user') {
			console.log('닉네임중복인가? ', checkDuplicateNickname(nick));
			return regExp.test(nick) && !checkDuplicateNickname(nick) && !emojExp.test(nick);
		} else {
			return regExp.test(nick) && !emojExp.test(nick);
		}
	};
	const onValidName = isValid => {
		setConfirmed(isValid);
	};
	//새 닉네임 지우기 마크 클릭
	const onClearNickname = () => {
		setConfirmed(false);
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

	const [city, setCity] = React.useState([userData.user_address.city]);
	const [district, setDistrict] = React.useState([userData.user_address.district]);
	const onSelectCity = (v, i) => {
		Modal.popSelectScrollBoxModal(
			[city],
			'광역시,도 선택',
			selected => {
				// setData({...data, user_address: {...data.user_address, city: selected}});
				getAddressList(
					{city: selected},
					districts => {
						setDistrict(districts.msg);
						// console.log()
						setData({...data, user_address: {...data.user_address, city: selected, district: districts.msg[0]}});
						Modal.close();
					},
					handleError,
				);
			},
			() => Modal.close(),
		);
	};
	const onSelectDistrict = () => {
		Modal.popSelectScrollBoxModal(
			[district],
			'시,군,구를 선택',
			selected => {
				getAddressList(
					{city: data.user_address.city, district: selected},
					// neighbor => {
					// 	setDistrict(neighbor.msg);
					// 	setData({...data, user_address: {...data.user_address, city: data.user_address.city, district: selected}});
					// 	Modal.close();
					// },
					district => {
						setDistrict(district.msg);
						setData({...data, user_address: {...data.user_address, city: data.user_address.city, district: selected}});
						Modal.close();
					},
					handleError,
				);
			},
			() => Modal.close(),
		);
	};
	//닉네임 수정 버튼 함수
	const modifyNickNameButton = () => {
		if (nickNameEdit) {
			console.log('닉네임 수정되어야함');
			updateUserInformation(
				{
					userobject_id: data._id,
					user_nickname: newNick == '' ? data.user_nickname : newNick,
				},
				success => {
					if (data.user_type == 'user') {
						setNewNick(newNick);
						userGlobalObject.userInfo.user_nickname = newNick;
						userGlobalObject.userInfo.user_profile_uri = data.user_profile_uri;
					}
				},
				err => {
					Modal.close();
					console.log('err', err);
				},
			);
		}
		setNickNameEdit(!nickNameEdit);
		data.user_nickname = newNick;
		navigation.setOptions({title: newNick});
	};

	//나의 지역 수정 함수
	const modifyLocation = () => {
		if (locationEdit) {
			console.log('나의 지역이 수정되어야함', data.user_address);
			updateUserDetailInformation({
				userobject_id: data._id,
				user_address: {city: data.user_address.city, district: data.user_address.district},
			}),
				success => {
					console.log('나의 지역 변경 잘됨');
				};
		}
		setLocationEdit(!locationEdit);
	};

	const handleError = error => {
		Modal.popOneBtn(error, '확인', () => Modal.close());
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
									<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
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
								<Text>*띄어쓰기 없이 2자 이상 15자 이내의 한글, 영문, 숫자, '_' 의 입력만 가능합니다.</Text>
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
						</View> */}
						<View style={[temp_style.vertical_border]}></View>

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
												<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
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
					{locationEdit ? (
						<View>
							<View style={[styles.editLocation]}>
								<Text style={[txt.noto30b, {width: 162 * DP}]}>나의 지역</Text>
								{/* <Text style={[txt.noto28, {width: 462 * DP}]}>
									{data.user_address.city} {data.user_address.district || ''}
								</Text> */}
								<TouchableOpacity onPress={modifyLocation} style={[{alignItems: 'flex-end'}, {marginLeft: 474 * DP}]}>
									<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
								</TouchableOpacity>
							</View>
							<View style={[styles.addressSelect]}>
								<View style={[{marginRight: 20 * DP}]}>
									<SelectInput
										onPressInput={onSelectCity}
										width={284}
										height={108}
										value={data.user_address.city || ''}
										// value={'시,도'}
										noBorder={true}
										fontSize={28}
									/>
								</View>
								<View>
									<SelectInput
										onPressInput={onSelectDistrict}
										width={284}
										height={108}
										value={data.user_address.district}
										// value={'시,군,구'}
										noBorder={true}
										fontSize={28}
									/>
								</View>
							</View>
						</View>
					) : (
						<View style={[styles.first]}>
							<Text style={[txt.noto30b, {width: 162 * DP}]}>나의 지역</Text>
							<Text style={[txt.noto28, {width: 462 * DP}]}>
								{data.user_address.city} {data.user_address.district || ''}
							</Text>
							<TouchableOpacity onPress={modifyLocation} style={[{alignItems: 'flex-end'}, {marginLeft: 12 * DP}]}>
								<Edit46 />
							</TouchableOpacity>
						</View>
					)}
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
	editLocation: {
		width: 750 * DP,
		// height: 105 * DP,
		minHeight: 105 * DP,
		paddingHorizontal: 28 * DP,
		flexDirection: 'row',
		// justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	addressSelect: {
		flexDirection: 'row',
		width: 750 * DP,
		// backgroundColor: 'yellow',
		paddingHorizontal: 28 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		paddingBottom: 20 * DP,
	},
});
