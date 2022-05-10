import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {login_style, temp_style, shelterInfoSetting} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/core';
import {btn_w114, btn_w194, btn_w242} from 'Atom/btn/btn_style';
import ProfileImageLarge160 from 'Molecules/image/ProfileImageLarge160';
import {txt} from 'Root/config/textstyle';
import AniButton from 'Molecules/button/AniButton';
import {GRAY10, APRI10, GRAY40} from 'Root/config/color';
import {getUserInfoById, updateUserIntroduction} from 'Root/api/userapi';
import {TextInput} from 'react-native';
import moment from 'moment';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20, ProfileDefaultImg} from 'Atom/icon';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';

export default ShelterInfoSetting = ({route}) => {
	// console.log('ShelterInfoSetting', route.params);
	const navigation = useNavigation();
	const [data, setData] = React.useState({});
	const [modifyMode, setModifyMode] = React.useState(false); //소개라 수정모드
	const [intro_modified, setIntro_modified] = React.useState(''); //수정된 소개란 텍스트
	const [numberOfLines, setNumOfLines] = React.useState();
	const [showMore, setShowMore] = React.useState(false);
	const modifyRef = React.useRef();

	const fetchData = () => {
		getUserInfoById(
			{userobject_id: route.params},
			result => {
				// console.log('result / getUserInfoById / ShelterInfoSetting   : ', result.msg.user_email);
				setData(result.msg);
			},
			err => {
				console.log('err / getUserInfoById', err);
			},
		);
	};
	//해당 스크린 포커스시 API접속
	React.useEffect(() => {
		fetchData();
		navigation.addListener('focus', () => fetchData());
		navigation.addListener('blur', () => setModifyMode(false));
	}, []);

	//소개란 수정모드
	React.useEffect(() => {
		modifyMode ? modifyRef.current.focus() : null;
	}, [modifyMode]);

	//프로필변경
	const moveToChangeUserProfileImage = () => {
		navigation.push('ChangeUserProfileImage', {routeInfo: route, data: data});
	};

	//비밀번호 변경
	const moveToChangePassword = () => {
		navigation.push('ChangePassword');
	};

	//상세 정보 변경
	const moveToEditShelterInfo = () => {
		navigation.push('EditShelterInfo', {data: data});
	};

	//User_intro 수정 버튼 클릭
	const modify_userIntro = () => {
		setModifyMode(!modifyMode);
	};

	//수정 후 적용 버튼 클릭
	const modify_finalize = () => {
		setModifyMode(!modifyMode);
		setData({...data, user_introduction: intro_modified});
		console.log('intro', intro_modified, typeof intro_modified);
		updateUserIntroduction(
			{userobject_id: userGlobalObject.userInfo._id, user_introduction: intro_modified},
			success => {
				console.log('suceess', success);
			},
			err => {
				console.log('er', err);
			},
		);
	};

	//설립일 Date타입 치환
	const getParsedFoundationDate = () => {
		let date = data.shelter_foundation_date;
		if (date) {
			date = moment(date).format('YYYY-MM-DD');
			return date;
		} else {
			return '미등록 상태입니다.';
		}
	};

	//수정 TextInput 콜백 함수
	const modifyIntroText = text => {
		const breaks = text.split(/\r\n|\r|\n/).length;
		console.log('breaks', breaks);
		if (breaks > 15) {
			return;
		} else {
			setIntro_modified(text);
		}
	};
	//더보기 state 바꾸기
	const changeShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<ScrollView contentContainerStyle={[shelterInfoSetting.container]}>
			<View style={[login_style.wrp_main]}>
				{/* 프로필 이미지 및 프로필 변경 */}
				<View style={[shelterInfoSetting.shelterInfoSetting_step1]}>
					<View style={[temp_style.profileImageLarge]}>
						<ProfileImageLarge160 data={data} />
					</View>

					<View style={[shelterInfoSetting.btn_w242]}>
						<AniButton btnTitle={'프로필 변경'} btnLayout={btn_w194} btnStyle={'border'} onPress={moveToChangeUserProfileImage} />
					</View>
				</View>
				<View style={[shelterInfoSetting.shelterInfoSetting_step2]}>
					{/* 계정정보 */}
					<View style={[temp_style.accountInfo_shelterInfoSetting_view]}>
						<View style={shelterInfoSetting.accountInfo}>
							<Text style={[txt.noto30b, {color: GRAY10}]}>계정정보</Text>
						</View>
						<View style={[temp_style.accountInfo_email_shelterInfoSetting_view, shelterInfoSetting.email_view]}>
							<Text style={[txt.roboto26, {maxWidth: 440 * DP}]} numberOfLines={1}>
								{data.user_nickname}
							</Text>
							<TouchableOpacity onPress={moveToChangePassword}>
								<Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>비밀번호 변경하기</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/* 보호소 소개 */}
					<View style={[temp_style.vertical_border]}></View>
					<View style={[temp_style.introduce_shelterInfoSetting_view]}>
						<View style={[temp_style.title_shelterInfoSetting_view]}>
							<View style={temp_style.title_shelterInfoSetting}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>보호소 소개</Text>
							</View>
							<View style={[shelterInfoSetting.btn_w114]}>
								{modifyMode ? (
									// <AniButton onPress={modify_finalize} btnTitle={'적용'} btnLayout={btn_w114} />
									<TouchableOpacity onPress={modify_finalize}>
										<Text style={[txt.noto26, {color: GRAY10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>완료</Text>
									</TouchableOpacity>
								) : (
									<TouchableOpacity onPress={modify_userIntro}>
										<Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text>
									</TouchableOpacity>
									// <AniButton onPress={modify_userIntro} btnTitle={'수정'} btnStyle={'border'} btnLayout={btn_w114} />
								)}
							</View>
						</View>
						{/* 소개란 */}
						<View style={[temp_style.userText_userInfoSetting, shelterInfoSetting.userIntroCont]}>
							{/* 소개란의 수정버튼을 누를 시 TextInput으로 변경 */}
							{modifyMode ? (
								<View style={[shelterInfoSetting.modificationTextCont]}>
									<TextInput
										onChangeText={modifyIntroText}
										style={[txt.noto26, shelterInfoSetting.modificationTextInput, {backgroundColor: GRAY40}]}
										defaultValue={data.user_introduction || ''}
										value={intro_modified}
										placeholder={'보호소 소개를 입력해주세요. (최대 500자, 15줄)'}
										multiline={true}
										maxLength={500}
										ref={modifyRef}
										// selectTextOnFocus
									/>
								</View>
							) : (
								<View style={{}}>
									<Text style={[txt.noto26, {color: GRAY10}]} ellipsizeMode={'tail'} numberOfLines={showMore ? null : 3}>
										{data.user_introduction || '소개란이 비어있습니다.'}
									</Text>
									<Text
										style={[txt.noto24, {position: 'absolute', opacity: 0, backgroundColor: 'red'}]}
										onTextLayout={({nativeEvent: {lines}}) => {
											setNumOfLines(lines.length);
										}}>
										{data.user_introduction || '소개란이 비어있습니다.'}
									</Text>
									{numberOfLines > 3 ? (
										<TouchableOpacity
											onPress={changeShowMore}
											style={{alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
											<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
											{!showMore ? <Arrow_Down_GRAY20 /> : <Arrow_Up_GRAY20 />}
										</TouchableOpacity>
									) : (
										<></>
									)}
								</View>
							)}
						</View>
					</View>
					{/* 보호소 정보 */}
					<View style={[temp_style.vertical_border]}></View>
					<View style={[temp_style.introduce_infoSetting_view]}>
						<View style={temp_style.shlterInfo__shelterInfoSetting_view}>
							<View style={temp_style.title_shelterInfoSetting}>
								<Text style={[txt.noto30b, {color: GRAY10}]}>보호소 정보</Text>
							</View>
							<View style={shelterInfoSetting.btn_w114}>
								<TouchableOpacity onPress={moveToEditShelterInfo}>
									<Text style={[txt.noto26, {color: APRI10}, {fontWeight: 'bold'}, {textDecorationLine: 'underline'}]}>수정</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={temp_style.title_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>보호소</Text>
							</View>
							<View style={temp_style.littleContents}>
								<Text style={[txt.noto28]} numberOfLines={1}>
									{data.user_nickname}
								</Text>
							</View>
						</View>
						<View style={temp_style.address_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>주소</Text>
							</View>
							<View style={temp_style.addressContents}>
								<Text style={[txt.noto28]}>{data.shelter_address ? data.shelter_address.brief + ' ' + data.shelter_address.detail + ' ' : ''}</Text>
							</View>
						</View>
						<View style={temp_style.title_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>전화번호</Text>
							</View>
							<View style={temp_style.littleContents}>
								<Text style={[txt.noto28]}>{data.shelter_delegate_contact_number}</Text>
							</View>
						</View>
						<View style={temp_style.title_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>E-mail</Text>
							</View>
							<View style={temp_style.littleContents}>
								<Text style={[txt.noto28]}>{data.user_email}</Text>
							</View>
						</View>
						<View style={temp_style.title_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>홈페이지</Text>
							</View>
							<View style={temp_style.littleContents}>
								<Text style={[txt.noto28]}>{data.shelter_homepage || '미등록 상태입니다.'}</Text>
							</View>
						</View>
						<View style={temp_style.title_type_shelterInfoSetting_view}>
							<View style={temp_style.littleTitle}>
								<Text style={[txt.noto30, {color: GRAY10}]}>설립일</Text>
							</View>
							<View style={temp_style.littleContents}>
								<Text style={[txt.noto28]}>{getParsedFoundationDate()}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
