import React from 'react';
import {Platform, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {APRI10, GRAY10, GRAY20, GRAY40, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {AddItem92, Arrow_Down_GRAY10, Arrow_Up_GRAY10, Cross52, Edit46, Home48Border, IconL, NextMark} from 'Atom/icon';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import PetImageLabel from 'Molecules/label/PetImageLabel';
import {login_style, petInfoSetting, setPetInformation, temp_style, userInfoSetting_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {getUserInfoById, removeUserFromFamily, updatePetDetailInformation} from 'Root/api/userapi';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import userGlobalObject from 'Root/config/userGlobalObject';
import {updateUserIntroduction} from 'Root/api/userapi';
import {familyAccountList_style} from 'Root/component/organism/style_organism copy';
import DP from 'Root/config/dp';
import {PET_KIND, WEIGHT_INPUT_FORM_INFO} from 'Root/i18n/msg';
import Loading from 'Root/component/molecules/modal/Loading';
import PetLabel148 from 'Root/component/molecules/label/PetLabel148';
import SelectInput from 'Root/component/molecules/button/SelectInput';
import KeyBoardInputBackGround from 'Root/component/molecules/input/KeyboardInputBackGround';
import TabSelectFilled_Type1 from 'Root/component/molecules/tab/TabSelectFilled_Type1';
import RadioBox from 'Root/component/molecules/select/RadioBox';
import DatePicker from 'Root/component/molecules/select/DatePicker';
import moment from 'moment';
import Input30 from 'Root/component/molecules/input/Input30';

//이 화면에 들어오면서 특정 _id를 API 연동으로 데이터를 가져 옴.
//이전 화면에서 모든 데이터를 가진 상태에서 들어오는 것이 아님.
//변수들은 모두 db 변수로 스네이크 형식으로 추후에 변경 필요.

export default PetInfoSetting = ({route, navigation}) => {
	console.log('PetInfoSetting / route.params', route.params);
	const [petData, setPetData] = React.useState('false'); // 현재 반려동물 프로필 데이터
	const [familyAccountList, setFamilyAccountList] = React.useState([]); //가족 계정 목록 데이터
	const [isChiefUser, setIsChiefUser] = React.useState(false);
	const [showMore, setShowmore] = React.useState(true); // 소개 더보기 클릭 여부
	const [editMode, setEditMode] = React.useState(false); // 소개 수정 클릭 여부
	const [kindEditMode, setKindEditMode] = React.useState(false); // 소개 수정 클릭 여부
	const [birthEditMode, setBirthEditMode] = React.useState(false);
	const [weightEditMode, setWeightEditMode] = React.useState(false);
	const [sexEditMode, setSexEditMode] = React.useState(false);
	const [introOriginLine, setIntroOriginLine] = React.useState(0);
	const scrollRef = React.useRef();
	const [userIntro_temp, setUserIntro_temp] = React.useState('');
	const modifyRef = React.useRef('');
	const [large, setLarge] = React.useState([]);
	const [sub, setSub] = React.useState([]);
	const [speices, setSpeices] = React.useState('');
	const [speicesIndex, setSpeicesIndex] = React.useState(0);
	const [kind, setKind] = React.useState('');
	const [petSex, setPetSex] = React.useState('');
	const [selectedBirthDate, setSelectedBirthDate] = React.useState('');
	const [btnOn, setBtnOn] = React.useState(true);
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setFamily();
			Modal.close();
		});
		navigation.addListener('blur', () => setEditMode(false));

		return unsubscribe;
	}, [familyAccountList]);

	//소개란 수정모드
	React.useEffect(() => {
		editMode ? modifyRef.current.focus() : null;
	}, [editMode]);

	React.useEffect(() => {
		console.log('펫 데이터 바뀜', petData);
	}, [petData]);

	const setFamily = () => {
		getUserInfoById(
			{userobject_id: route.params.pet_id},
			result => {
				console.log('result / GetUserInfoById / PetInfoSetting', result.msg);
				setFamilyAccountList(result.msg.pet_family);
				navigation.setOptions({title: result.msg.user_nickname});
				userGlobalObject.userInfo.user_nickname == result.msg.pet_family[0].user_nickname ? setIsChiefUser(true) : setIsChiefUser(false);
				setPetData(result.msg);
				// console.log('result . pet data', result.msg);
				setSpeices(result.msg.pet_species);
				setKind(result.msg.pet_species_detail);
			},
			err => {
				console.log('err / GetUserInfoById / PetInfosetting', err);
				Modal.popOneBtn(err, '뒤로 가기', () => navigation.goBack());
			},
		);
	};

	//계정정보 - '종' 변경하기 버튼 클릭
	const changePetInfo = async () => {
		Modal.popLoading(true);
		const petKind = await PET_KIND();
		Modal.close();
		// console.log('petKind', petKind);
		let category = {
			large: [],
			sub: [],
		};
		petKind.map((v, i) => {
			category.large.push(v.pet_species);
			category.sub.push(v.pet_species_detail);
		});
		Modal.popMultipleScrollBoxModal(
			category,
			'동물종 선택',
			(sel1, sel2) => {
				// console.log('sel', sel1, sel2);
				Modal.close();
				setTimeout(() => {
					Modal.popLoading(true);
					updatePetDetailInformation(
						{
							userobject_id: petData._id,
							pet_species: sel1,
							pet_species_detail: sel2,
						},
						result => {
							// console.log('updatePetDetailInformation / PetInfoSetting Result : ', result.msg);
							setPetData({...petData, pet_species: result.msg.pet_species, pet_species_detail: result.msg.pet_species_detail});
							Modal.close();
							setTimeout(() => {
								Modal.popNoBtn('반려동물의 정보가 성공적으로 \n 변경되었습니다.');
								setTimeout(() => {
									Modal.close();
								}, 1000);
							}, 100);
						},
						err => {
							console.log('updatePetDetailInformation / PetinfoSetting err : ', err);
							Modal.close();
						},
					);
				}, 100);
			},
			() => Modal.close(),
		);
	};

	//프로필 변경 버튼
	const changeProfile = () => {
		navigation.push('ChangePetProfileImage', petData);
	};

	//상세정보
	const goToSetPetInfo = () => {
		navigation.push('SetPetInformation', petData);
	};

	//접종 내역 버튼
	const goToVaccinationRecord = () => {
		navigation.push('VaccinationRecord', {userobject_id: petData._id});
	};

	//가족계정 추가 버튼
	const goToAddFamilyAccount = () => {
		if (!isChiefUser) {
			Modal.popOneBtn('가족계정 추가 / 삭제는 해당 반려동물을 \n 처음으로 등록한 유저만 가능합니다. ', '확 인', () => Modal.close());
		} else if (familyAccountList.length == 3) {
			Modal.popOneBtn('가족계정은 최대 3인까지 등록가능합니다!', '확 인', () => Modal.close());
		} else {
			navigation.push('AddFamilyAccount', {route_name: route.name, pet_id: petData._id});
		}
	};

	//가족계정 삭제 버튼
	const onDeleteFamilyAccount = index => {
		console.log('삭제 예정 가족계정 정보', familyAccountList[index]);
		removeUserFromFamily(
			{
				target_userobject_id: familyAccountList[index]._id,
				pet_userobject_id: petData._id,
			},
			result => {
				// console.log('reuslt / removeUserFromFamily / PetInfoSetting   : ', result.msg);
				let copy = [...familyAccountList];
				copy.splice(index, 1);
				setFamilyAccountList(copy);
			},
			err => {
				console.log('err / removeUserFromFamily / PetInfoSetting   : ', err);
			},
		);
	};

	//가족 계정의 프로필 라벨 클릭
	const onClickFamilyLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	//계정 공개 여부 변경 Switch On
	const onSwtichOn = () => {};

	//계정 공개 여부 변경 Switch Off
	const onSwtichOff = () => {};

	//반려동물 입양 상태 변경
	const goToAnimalAdoption = () => {
		navigation.push('AnimalAdoption', petData);
	};

	const showMoreIntro = () => {
		console.log('더보가ㅣ');
		setShowmore(!showMore);
	};

	//수정버튼 클릭
	const onPressModifyIntro = () => {
		scrollRef.current?.scrollTo({
			y: 300,
			animated: true,
		});
		setEditMode(!editMode);
	};

	//반려동물 소개란 수정후 완료 클릭
	const editPetInfo = () => {
		//현재 반려동물의 소개란을 바꾸는 aPI가 없는 상태
		setEditMode(!editMode);
		updateUserIntroduction(
			{userobject_id: petData._id, user_introduction: userIntro_temp},
			success => {
				console.log('updateUserIntroduction success', success);
				setFamily();
				scrollRef.current?.scrollTo({
					y: 0,
					animated: true,
				});
			},
			err => {
				console.log('introduction modify api', err);
			},
		);
	};
	const editKindInfo = () => {
		if (kindEditMode) {
			console.log('kind, species', kind, speices);
			updatePetDetailInformation(
				{
					userobject_id: petData._id,
					pet_species: speices,
					pet_species_detail: kind,
				},
				result => {
					// console.log('updatePetDetailInformation / PetInfoSetting Result : ', result.msg);
					setPetData({...petData, pet_species: result.msg.pet_species, pet_species_detail: result.msg.pet_species_detail});
					Modal.close();
					setTimeout(() => {
						Modal.popNoBtn('반려동물의 정보가 성공적으로 \n 변경되었습니다.');
						setTimeout(() => {
							Modal.close();
						}, 1000);
					}, 100);
				},
				err => {
					console.log('updatePetDetailInformation / PetinfoSetting err : ', err);
					Modal.close();
				},
			);
		}
		setKindEditMode(!kindEditMode);
	};
	const editSexInfo = () => {
		if (sexEditMode) {
			console.log('kind, species', kind, speices);
			updatePetDetailInformation(
				{
					userobject_id: petData._id,
					pet_sex: petData.pet_sex,
					pet_neutralization: petData.pet_neutralization,
				},
				result => {
					console.log('성별 변경 성공', result.msg);
					setPetData({...petData, pet_species: result.msg.pet_species, pet_species_detail: result.msg.pet_species_detail});
					Modal.close();
					setTimeout(() => {
						Modal.popNoBtn('반려동물의 정보가 성공적으로 \n 변경되었습니다.');
						setTimeout(() => {
							Modal.close();
						}, 1000);
					}, 100);
				},
				err => {
					console.log('updatePetDetailInformation / PetinfoSetting err : ', err);
					Modal.close();
				},
			);
		}
		setSexEditMode(!sexEditMode);
	};
	const editBirthInfo = () => {
		setBirthEditMode(!birthEditMode);
	};
	const editWeightInfo = () => {
		setWeightEditMode(!weightEditMode);
	};

	const onSelectSpecies = async (v, i) => {
		Modal.popLoading(true);
		const petKind = await PET_KIND();
		Modal.close();
		console.log('petKind', petKind);
		let category = {
			large: [],
			sub: [],
		};

		petKind.map((v, i) => {
			category.large.push(v.pet_species);
			category.sub.push(v.pet_species_detail);
		});
		console.log('categoy', category.large, category.sub);
		setSub(category.sub);
		// debug && console.log('city:', city[i]);
		Modal.popSelectScrollBoxModal(
			// [city],
			[category.large],
			'종 선택',
			selected => {
				// setData({...data, user_address: {...data.user_address, city: selected}});
				// getAddressList(
				// 	{city: selected},
				// 	districts => {
				// 		setDistrict(districts.msg);
				// 		// console.log()
				// 		debug && console.log('districts:', districts);
				// 		setData({...data, user_address: {...data.user_address, city: selected, district: districts.msg[0], neighbor: '동/읍을 선택'}});
				// 		Modal.close();
				// 	},
				// 	handleError,
				// );

				setSpeices(selected);
				console.log('종 고름', category.large.indexOf(selected));
				setSpeicesIndex(category.large.indexOf(selected));
				Modal.close();
			},
			// () => Modal.close(),
			// Modal.close(),
			// () => console.log('완료 눌림'),
		);
	};
	const onSelectKind = (v, i) => {
		Modal.popSelectScrollBoxModal(
			[sub[speicesIndex]],
			'품종 선택',
			selected => {
				// setData({...data, user_address: {...data.user_address, city: selected}});
				setKind(selected);
				console.log('selected');
				Modal.close();
			},
			() => Modal.close(),
		);
	};
	//업로드 및 팔로우 클릭
	const onClickUserInfo = () => {
		navigation.push('UserProfile', {userobject: petData});
	};
	// 소개란 반려동물 소개란 수정
	const modifyIntroText = text => {
		const breaks = text.split(/\r\n|\r|\n/).length;
		console.log('breaks', breaks);
		if (breaks > 15) {
			return;
		} else {
			setUserIntro_temp(text);
		}
	};

	const deleteAccount = () => {
		console.log('deleteAccount');
	};

	// ----상세 정보 수정 코드 SetPetInformation 에서 가지고옴 ---
	//생일 TypeParsing / 차후 정리 예정
	const parseBirth = () => {
		if (petData.pet_birthday && petData.pet_birthday.length < 15) {
			return petData.pet_birthday;
		} else if (petData.pet_birthday == undefined) {
			return '생일을 지정해주세요';
		} else {
			let date = moment(petData.pet_birthday).format('YYYY.MM.DD');
			date = date.toString();
			console.log('data', date);
			return date;
		}
	};

	//생녈월일 계산 함수
	const getBirthDate = () => {
		if (selectedBirthDate) {
			const today = new Date().getTime();
			let split = selectedBirthDate.split('.');
			const selectDate = new Date(split[0], split[1] - 1, split[2]);
			const duration = (today - selectDate.getTime()) / 1000;
			// console.log(duration / 86400); //하루단위
			const birthDate = () => {
				let year = parseInt(duration / 86400 / 365) + '년 ';
				let month = parseInt(((duration / 86400) % 365) / 30) + '개월';
				if (parseInt(duration / 86400 / 365) == 0) {
					year = '';
				}
				return year + month;
			};
			return <Text style={[txt.noto24]}>{birthDate()}</Text>;
		} else {
			<Text style={[txt.noto24]}></Text>;
		}
	};

	//생일이 지정되었을 때
	const onSelectBirthDate = date => {
		setSelectedBirthDate(date);
		setPetData({...petData, pet_birthday: date});
	};

	//체중 Input Value 바뀌었을 때
	const onChangeKg = kg => {
		setPetData({...petData, pet_weight: kg});
	};

	//체중
	const weigthValid = e => {
		var regExp = /^[0-9]{1,2}(\.[0-9]{0,1})?$/;
		// var regExp = /^[\D]{1,20}$/;
		setBtnOn(!regExp.test(e));
		return regExp.test(e);
	};

	//성별 변경 발생
	const onSexChange = e => {
		console.log('성별 바뀐', e);
		switch (e) {
			//male
			case 0:
				setPetData({...petData, pet_sex: 'male'});
				// setPetSex('male');
				break;
			//female
			case 1:
				setPetData({...petData, pet_sex: 'female'});
				// setPetSex('female');
				break;
			//unknown
			case 2:
				setPetData({...petData, pet_sex: 'unknown'});
				// setPetSex('unknown');
				break;
			default:
				setPetData({...petData, pet_sex: 'unknown'});
				break;
		}
		console.log('petSex', petSex);
	};

	const getPetSex = () => {
		// console.log('pet_sex', petData.pet_sex);
		switch (petData.pet_sex) {
			//male
			case 'male':
				return 0;

			//female
			case 'female':
				return 1;

			//unknown
			case 'unknown':
				return 2;
			default:
				return 2;
		}
	};
	const getSexNeuTralText = () => {
		let sex = '';
		let neutral = '';
		switch (petData.pet_sex) {
			case 'male':
				sex = '남아';
				break;
			//female
			case 'female':
				sex = '여아';
				break;
			//unknown
			case 'unknown':
				sex = '모름';
				break;
			default:
				break;
		}
		switch (petData.pet_neutralization) {
			case 'yes':
				neutral = '중성화 완';
				break;
			case 'no':
				neutral = '중성화 미완';
				break;
			case 'unknown':
				neutral = '중성화 모름';
				break;
			default:
				neutral = '중성화 모름';
				break;
		}
		return sex + ' / ' + neutral;
	};
	//중성화 선택
	const onSelectNeutralization = index => {
		console.log('index 중성화 선택', index);
		let neutralization = '';
		if (index == 0) {
			neutralization = 'yes';
		} else if (index == 1) {
			neutralization = 'no';
		} else if (index == 2) {
			neutralization = 'unknown';
		}
		setPetData({...petData, pet_neutralization: neutralization});
	};

	const getNeutralizationDefault = () => {
		let index = 0;
		switch (petData.pet_neutralization) {
			case 'yes':
				index = 0;
				break;
			case 'no':
				index = 1;
				break;
			case 'unknown':
				index = 2;
				break;
			default:
				break;
		}
		return index;
	};

	if (petData == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={[login_style.wrp_main, petInfoSetting.container]}>
				<ScrollView contentContainerStyle={{alignItems: 'center'}} ref={scrollRef}>
					{/* 프로필 컨테이너 */}
					<View style={[styles.profileContainer]}>
						<View style={[petInfoSetting.profileInside]}>
							{/* <TouchableOpacity onPress={changeProfile} activeOpacity={0.8} style={[petInfoSetting.petImageLabel, {}]}> */}
							<PetLabel148 data={petData} showNickname={false} />
							{/* <PetImageLabel data={petData} showNickname={false} onPressLabel={changeProfile} /> */}
							{/* <View style={[Platform.OS == 'ios' ? petInfoSetting.profileEditMark : petInfoSetting.profileEditMark_and]}> */}
							{/* <AddItem92 /> */}
							{/* </View> */}
							{/* </TouchableOpacity> */}

							<View style={[{marginLeft: 40 * DP}, {height: 148 * DP}, {justifyContent: 'center'}]}>
								<TouchableOpacity onPress={onClickUserInfo} style={[styles.user_id]}>
									<Text style={[txt.roboto46b, {alignItems: 'center'}, {marginRight: 5 * DP}]} numberOfLines={1}>
										{petData.user_nickname || ''}
									</Text>
									<Home48Border />
								</TouchableOpacity>
								{/* 업로드 팔로워 팔로잉 */}
								<View style={[{width: 462 * DP}, {marginTop: 20 * DP}]}>
									<SocialInfoB data={petData} />
								</View>
							</View>
							{/* <View style={[petInfoSetting.petInfoContainer, {}]}>
								<View style={[petInfoSetting.petInfo_topside]}>
									<View style={[petInfoSetting.petInfo_topside_item]}>
										<TouchableOpacity onPress={onClickUserInfo} activeOpacity={1} style={[petInfoSetting.petInfo_topside_upload]}>
											<Text style={[txt.roboto36b, {textAlign: 'center'}]}>{petData.user_upload_count}</Text>
											<Text style={[txt.noto24]}>업로드</Text>
										</TouchableOpacity>
									</View>
									<View style={[petInfoSetting.petInfo_topside_item]}>
										<TouchableOpacity onPress={onClickUserInfo} activeOpacity={1} style={[petInfoSetting.petInfo_topside_upload]}>
											<Text style={[txt.roboto36b, {textAlign: 'center'}]}>{petData.user_follower_count}</Text>
											<Text style={[txt.noto24]}>팔로워</Text>
										</TouchableOpacity>
									</View>
								</View>
								<View style={[petInfoSetting.petInfo_bottom, {}]}>
									<TouchableOpacity activeOpacity={0.8} onPress={onClickUserInfo}>
										<Text style={[txt.noto24b, {color: APRI10, textDecorationLine: 'underline', textAlign: 'right'}]}>프로필홈으로</Text>
									</TouchableOpacity>
								</View>
							</View> */}
						</View>
						<View style={{marginTop: 30 * DP, width: 694 * DP}}>
							<View style={[petInfoSetting.user_introBox, !showMore ? {height: null} : null]}>
								<Text numberOfLines={showMore ? 2 : 10} style={[txt.noto26, {color: MAINBLACK}]}>
									{petData.user_introduction || '반려동물 소개가 없습니다.'}
								</Text>
							</View>
							<View style={[petInfoSetting.user_introBox, {position: 'absolute', opacity: 0}]}>
								<Text
									onTextLayout={({nativeEvent: {lines}}) => {
										setIntroOriginLine(lines.length);
										// console.log('lines.length', lines.length);
									}}
									style={[txt.noto26, {color: MAINBLACK}]}>
									{petData.user_introduction || '반려동물 소개가 없습니다.'}
								</Text>
							</View>
							{introOriginLine < 2 ? (
								<></>
							) : (
								<TouchableOpacity onPress={showMoreIntro} style={[petInfoSetting.petInfo_bottom_showMore]}>
									{!showMore ? (
										<>
											<Text style={[txt.noto26, {color: GRAY10}]}>접기</Text>
											<Arrow_Up_GRAY10 />
										</>
									) : (
										<>
											<Text style={[txt.noto26, {color: GRAY10}]}>더보기</Text>
											<Arrow_Down_GRAY10 />
										</>
									)}
								</TouchableOpacity>
							)}
						</View>
					</View>
					<View style={[{height: 106 * DP}, {width: 750 * DP}, {borderBottomColor: GRAY40}, {borderBottomWidth: 2 * DP}, {alignItems: 'center'}]}>
						<TouchableOpacity onPress={changeProfile}>
							<Text style={[txt.noto30, styles.changeProfile]}>반려동물 프로필 사진 바꾸기</Text>
						</TouchableOpacity>
					</View>
					{/* 소개 */}
					<View style={[styles.container]}>
						<View style={[temp_style.introduceInfo_depth1]}>
							<View style={[userInfoSetting_style.title_detail]}>
								<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>
									소개
									{/* <Text style={[txt.noto22b, {color: GRAY20}]}> (최대 500자, 15줄)</Text> */}
								</Text>
							</View>
							<View style={[{alignItems: 'center'}, {marginLeft: 472 * DP}]}>
								{editMode ? (
									<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
										<TouchableOpacity onPress={editPetInfo}>
											<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
										</TouchableOpacity>
									</View>
								) : (
									<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
										<TouchableOpacity onPress={onPressModifyIntro}>
											{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
											<Edit46 />
										</TouchableOpacity>
									</View>
								)}
							</View>
						</View>
						<View style={[styles.petIntroduction]}>
							{editMode ? (
								<TextInput
									defaultValue={petData.user_introduction || ''}
									onChangeText={modifyIntroText}
									style={[txt.noto26, petInfoSetting.introInput]}
									value={userIntro_temp}
									placeholder={'반려동물 소개를 입력해주세요.(최대 500자, 15줄)'}
									multiline={true}
									maxLength={500}
									ref={modifyRef}
								/>
							) : (
								<Text style={[txt.noto26, {color: MAINBLACK}]} numberOfLines={15}>
									{petData.user_introduction || '자기소개가 없습니다.'}
									{/* {petData.user_introduction || '자기소개가 없습니다.'} */}
								</Text>
							)}
						</View>
					</View>
					{/* 계정정보 */}
					<View style={[styles.container]}>
						{kindEditMode ? (
							<View style={[styles.container]}>
								<View style={[{width: 750 * DP}, {height: 96 * DP}, {flexDirection: 'row'}]}>
									<View style={[userInfoSetting_style.title_detail]}>
										<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>종 / 품종</Text>
									</View>
									<View style={[{flexDirection: 'row'}]}>
										<View style={[{alignItems: 'center'}, {marginLeft: 474 * DP}]}>
											<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
												<TouchableOpacity onPress={editKindInfo}>
													<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
								<View style={[{}]}>
									<View style={[{marginBottom: 20 * DP}]}>
										<SelectInput width={694} height={104} value={speices} onPressInput={onSelectSpecies} />
									</View>
									<View style={[{marginBottom: 30 * DP}]}>
										<SelectInput width={694} height={104} value={kind} onPressInput={onSelectKind} />
									</View>
								</View>
							</View>
						) : (
							<View style={[{width: 750 * DP}, {flexDirection: 'row'}]}>
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>종 / 품종</Text>
								</View>
								<View style={[{flexDirection: 'row'}]}>
									<View style={[{width: 462 * DP}, {height: 96 * DP}, {justifyContent: 'center'}]}>
										<Text style={[txt.noto28, {color: MAINBLACK}]}>
											{petData.pet_species} / {petData.pet_species_detail || ''}
										</Text>
									</View>
									<View style={[{alignItems: 'center'}, {marginLeft: 12 * DP}]}>
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={editKindInfo}>
												{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
												<Edit46 />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						)}
					</View>

					{/* <View style={[petInfoSetting.petAccountInfo.container]}>
						<View style={[petInfoSetting.petAccountInfo.insideContainer]}>
							<View style={[petInfoSetting.petAccountInfo.accountInfo_header]}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>계정 정보</Text>
							</View>
							<View style={[petInfoSetting.petAccountInfo.information]}>
								<Text style={[txt.noto24, petInfoSetting.petAccountInfo.infoTitle]}>종</Text>
								<Text style={[txt.noto24, petInfoSetting.petAccountInfo.infoContent]}>{petData.pet_species}</Text>
								<TouchableOpacity onPress={changePetInfo} style={{position: 'absolute', right: 0}}>
									<Text style={[txt.noto24, petInfoSetting.petAccountInfo.infoContent]}>변경하기</Text>
								</TouchableOpacity>
							</View>
							<View style={[petInfoSetting.petAccountInfo.information]}>
								<Text style={[txt.noto24, petInfoSetting.petAccountInfo.infoTitle]}>품종</Text>
								<Text style={[txt.noto24, petInfoSetting.petAccountInfo.infoContent]}>{petData.pet_species_detail || ''}</Text>
							</View>
						</View>
					</View> */}
					{/* 상세정보 */}
					{/* <View style={[petInfoSetting.petProfileMenu.container]}>
						<View style={[petInfoSetting.petProfileMenu.insideContainer]}>
							<View style={[petInfoSetting.petProfileMenu.menuTitle]}>
								<TouchableOpacity onPress={goToSetPetInfo}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>상세 정보</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity onPress={goToSetPetInfo} style={[petInfoSetting.petProfileMenu.bracket50]}>
								<NextMark />
							</TouchableOpacity>
						</View>
					</View> */}

					{/* 접종내역 */}
					{/* <View style={[petInfoSetting.petProfileMenu.container]}>
						<View style={[petInfoSetting.petProfileMenu.insideContainer]}>
							<View style={[petInfoSetting.petProfileMenu.menuTitle]}>
								<TouchableOpacity onPress={goToVaccinationRecord}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>접종 내역</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity onPress={goToVaccinationRecord} style={[petInfoSetting.petProfileMenu.bracket50]}>
								<NextMark />
							</TouchableOpacity>
						</View>
					</View> */}
					{/* 성별 설정 */}
					<View style={[styles.container]}>
						{sexEditMode ? (
							<View style={[styles.container]}>
								<View style={[{width: 750 * DP}, {height: 96 * DP}, {flexDirection: 'row'}]}>
									<View style={[userInfoSetting_style.title_detail]}>
										<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>성별</Text>
									</View>
									<View style={[{flexDirection: 'row'}]}>
										<View style={[{alignItems: 'center'}, {marginLeft: 474 * DP}]}>
											<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
												<TouchableOpacity onPress={editSexInfo}>
													<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
								<View style={[{marginTop: 20 * DP}, {height: 82 * DP}]}>
									<TabSelectFilled_Type1 items={['남아', '여아', '모름']} width={222} defaultIndex={getPetSex()} onSelect={onSexChange} />
								</View>
								<View style={[{marginTop: 30 * DP}, {height: 46 * DP}, {marginBottom: 30 * DP}, {flexDirection: 'row'}]}>
									<View style={[{marginTop: 9 * DP}, {marginRight: 12 * DP}, {marginLeft: 20 * DP}]}>
										<IconL />
									</View>
									<Text style={[txt.noto30b]}>중성화</Text>
									<View style={[{marginLeft: 40 * DP}]}>
										<RadioBox items={['예', '아니오', '모름']} onSelect={onSelectNeutralization} defaultSelect={getNeutralizationDefault()} />
									</View>
								</View>
							</View>
						) : (
							<View style={[{width: 750 * DP}, {flexDirection: 'row'}]}>
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>성별</Text>
								</View>
								<View style={[{flexDirection: 'row'}]}>
									<View style={[{width: 462 * DP}, {height: 96 * DP}, {justifyContent: 'center'}]}>
										<Text style={[txt.noto28, {color: MAINBLACK}]}>{getSexNeuTralText()}</Text>
									</View>
									<View style={[{alignItems: 'center'}, {marginLeft: 12 * DP}]}>
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={editSexInfo}>
												{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
												<Edit46 />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						)}
					</View>
					{/* 생일 설정 */}
					<View style={[styles.container]}>
						{birthEditMode ? (
							<View style={[styles.container]}>
								<View style={[{width: 750 * DP}, {height: 96 * DP}, {flexDirection: 'row'}]}>
									<View style={[userInfoSetting_style.title_detail]}>
										<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>생일</Text>
									</View>
									<View style={[{flexDirection: 'row'}]}>
										<View style={[{alignItems: 'center'}, {marginLeft: 474 * DP}]}>
											<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
												<TouchableOpacity onPress={editBirthInfo}>
													<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
								<View style={[{height: 104 * DP, width: 694 * DP}, {marginBottom: 30 * DP}, {flexDirection: 'row'}]}>
									<DatePicker onDateChange={onSelectBirthDate} defaultDate={parseBirth()} width={562} future={false} height={104} />
									<View style={[{justifyContent: 'flex-end'}, {marginLeft: 12 * DP}]}>{getBirthDate()}</View>
								</View>
							</View>
						) : (
							<View style={[{width: 750 * DP}, {flexDirection: 'row'}]}>
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>생일</Text>
								</View>
								<View style={[{flexDirection: 'row'}]}>
									<View style={[{width: 462 * DP}, {height: 96 * DP}, {justifyContent: 'center'}]}>
										<Text style={[txt.noto28, {color: MAINBLACK}]}>{parseBirth()}</Text>
									</View>
									<View style={[{alignItems: 'center'}, {marginLeft: 12 * DP}]}>
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={editBirthInfo}>
												{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
												<Edit46 />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						)}
					</View>
					{/* 채중 설정 */}
					<View style={[styles.container]}>
						{weightEditMode ? (
							<View style={[styles.container]}>
								<View style={[{width: 750 * DP}, {height: 96 * DP}, {flexDirection: 'row'}]}>
									<View style={[userInfoSetting_style.title_detail]}>
										<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>체중</Text>
									</View>
									<View style={[{flexDirection: 'row'}]}>
										<View style={[{alignItems: 'center'}, {marginLeft: 474 * DP}]}>
											<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
												<TouchableOpacity onPress={editWeightInfo}>
													<Text style={[txt.noto26b, {color: APRI10}]}>저장</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
								{/* <View style={[{}]}> */}
								<View style={[{flexDirection: 'row'}, {marginBottom: 30 * DP}]}>
									<Input30
										alert_msg={WEIGHT_INPUT_FORM_INFO}
										description="info"
										showmsg={false}
										confirm={true}
										showTitle={false}
										width={694}
										height={104}
										placeholder={'몸무게 입력'}
										showCrossMark={false}
										onChange={onChangeKg}
										value={petData.pet_weight}
										validator={weigthValid}
										keyboardType={'numeric'}
										maxLength={4}
										confirm_msg=""
										defaultValue={petData.pet_weight}
										style={{textAlign: 'center'}}
									/>
									{/* <View style={[setPetInformation.kg]}>
									<Text style={[txt.noto28]}> kg </Text>
								</View> */}
									<View style={{position: 'absolute', right: 24 * DP, top: 20 * DP}}>
										<Text style={[txt.noto28, {}]}>kg</Text>
									</View>
								</View>
							</View>
						) : (
							// </View>
							<View style={[{width: 750 * DP}, {flexDirection: 'row'}]}>
								<View style={[userInfoSetting_style.title_detail]}>
									<Text style={[txt.noto30b, {color: MAINBLACK}, {width: 162 * DP}]}>체중</Text>
								</View>
								<View style={[{flexDirection: 'row'}]}>
									<View style={[{width: 462 * DP}, {height: 96 * DP}, {justifyContent: 'center'}]}>
										<Text style={[txt.noto28, {color: MAINBLACK}]}>{petData.pet_weight} kg</Text>
									</View>
									<View style={[{alignItems: 'center'}, {marginLeft: 12 * DP}]}>
										<View style={[styles.changeInfo, userInfoSetting_style.changePassword]}>
											<TouchableOpacity onPress={editWeightInfo}>
												{/* <Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text> */}
												<Edit46 />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						)}
					</View>

					{/* 가족 계정 추가 */}
					{/* 반려 동물 상태가 companion인 경우에만 보이도록 추후 변경 예정 */}
					{/* {data.pet_status == 'companion' && ( */}
					<View style={[petInfoSetting.familyAccountSetting.container]}>
						<View style={[{width: 750 * DP}, {paddingHorizontal: 28 * DP}]}>
							<View style={[styles.menuView]}>
								<View style={[{width: 182 * DP}, {height: 46 * DP}, {justifyContent: 'center'}]}>
									<TouchableOpacity onPress={goToAddFamilyAccount}>
										<Text style={[txt.noto30b, {color: MAINBLACK}]}>가족 계정 추가</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity onPress={goToAddFamilyAccount} style={[styles.bracket50, {alignContent: 'flex-end'}]}>
									<NextMark />
								</TouchableOpacity>
							</View>
							<View style={[styles.infoMessage]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>
									가족 계정으로 초대된 계정은 이 동물 게시글을 함께 관리합니다.{'\n'}최대 3인까지만 초대 가능합니다.
								</Text>
							</View>
							{/* 가족계정 리스트 */}
							<View style={[styles.familyContainer]}>
								{/* <FamilyAccountList items={familyAccountList} onDeleteAccount={onDeleteFamilyAccount} /> */}
								{familyAccountList.map((v, i) => {
									return (
										<View style={[styles.itemContainer]} key={i}>
											{/* <View style={[familyAccountList_style.profileImageSmall]}>
											<ProfileImageSmall data={v} />
										</View>
										<View style={[familyAccountList_style.userIDContainer]}>
											<Text style={[txt.roboto28b]}>{v.user_nickname}</Text>
										</View> */}
											<UserDescriptionLabel data={v} onClickLabel={onClickFamilyLabel} width={400} />
											{v.user_nickname == userGlobalObject.userInfo.user_nickname || !isChiefUser ? (
												<></>
											) : (
												<View style={{position: 'absolute', right: 5 * DP}}>
													<Cross52 onPress={() => onDeleteFamilyAccount(i)} style={[familyAccountList_style.cross52]} />
												</View>
											)}
										</View>
									);
								})}
							</View>
						</View>
					</View>
					{/* )} */}
					{/* 계정 공개 여부 변경 */}
					{/* <View style={[petInfoSetting.exposureSetting.container]}>
						<View style={[petInfoSetting.exposureSetting.insideContainer]}>
							<View style={[petInfoSetting.exposureSetting.menuView]}>
								<View style={[petInfoSetting.petProfileMenu.menuTitle]}>
									<Text style={[txt.noto30b, {color: GRAY10}]}>계정 공개 여부 변경</Text>
								</View>
							</View>
							<View style={[petInfoSetting.exposureSetting.privateSettingView]}>
								<View style={[petInfoSetting.exposureSetting.privateSettingMsg]}>
									<Text style={[txt.noto28, {color: GRAY10}]}>이 동물의 계정을 비공개로 전환합니다</Text>
								</View>
								<View style={[petInfoSetting.exposureSetting.privateSettingBtn]}>
									<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
								</View>
							</View>
						</View>
					</View> */}
					{/* 반려동물 입양 상태 변경 */}
					{petData.pet_status == 'protect' && ( //오로지 임보일때만 출력
						<View style={[petInfoSetting.changeAdoptionStatus.container]}>
							<View style={[petInfoSetting.familyAccountSetting.insideContainer]}>
								<View style={[petInfoSetting.familyAccountSetting.menuView]}>
									<View style={[petInfoSetting.petProfileMenu.menuTitle]}>
										<TouchableOpacity onPress={goToAnimalAdoption}>
											<Text style={[txt.noto30b, {color: GRAY10}]}>보호동물 입양 상태 변경</Text>
										</TouchableOpacity>
									</View>
									<TouchableOpacity onPress={goToAnimalAdoption} style={[petInfoSetting.changeAdoptionStatus.bracket50]}>
										<NextMark />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}
					{/* 계정 삭제 */}
					<View style={[styles.deleteContainer]}>
						<TouchableOpacity onPress={deleteAccount}>
							<Text style={[txt.noto30, {color: MAINBLACK}]}>반려동물 계정 삭제</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
};

PetInfoSetting.defaultProps = {};

const styles = StyleSheet.create({
	profileContainer: {
		width: 750 * DP,
		// height: 344 * DP,
		minHeight: 292 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 30 * DP,
		// paddingHorizontal: 28 * DP,
		// paddingHorizontal: 28 * DP,
		// backgroundColor: 'yellow',
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
	changeProfile: {
		color: APRI10,
		marginTop: 30 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY10,
	},
	menuTitle: {
		width: 162 * DP,
		height: 46 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	oneBlock: {
		width: 750 * DP,
		paddingHorizontal: 28 * DP,
		paddingVertical: 30 * DP,
	},
	petIntroduction: {
		width: 694 * DP,
		// marginTop: 20 * DP,
		alignItems: 'flex-start',
		marginBottom: 30 * DP,
		// backgroundColor: 'yellow',
	},
	container: {
		width: 750 * DP,
		// height: 130 * DP,
		// marginTop: 2 * DP,
		// paddingVertical: 40 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		// justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	familyContainer: {
		width: 750 * DP,
		// paddingHorizontal: 28 * DP,
		marginTop: 20 * DP,
	},
	itemContainer: {
		width: 750 * DP,
		height: 94 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bracket50: {
		width: 48 * DP,
		height: 48 * DP,
		// marginLeft: 214 * DP,
		padding: 22 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	infoMessage: {
		width: 750 * DP,
		// height: 68 * DP,
	},
	deleteContainer: {
		height: 136 * DP,
		width: 750 * DP,
		// backgroundColor: 'yellow',
		// marginTop: 10 * DP,
		borderTopColor: GRAY40,
		borderTopWidth: 10 * DP,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
