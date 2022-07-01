import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w522, btn_w522_r30} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import CheckBox from 'Root/component/molecules/select/CheckBox';
import Input24 from 'Root/component/molecules/input/Input24';
import PasswordInput from 'Root/component/molecules/input/PasswordInput';
import {login_style, btn_style} from '../style_templete';
import Modal from 'Component/modal/Modal';
import {userLogin} from 'Root/api/userapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userGlobalObj from 'Root/config/userGlobalObject';
import {createSettingPublic, getSettingPublic} from 'Root/api/settingpublic';
import {createNotice, getNotice} from 'Root/api/notice';
import DP from 'Root/config/dp';
import {useNavigation} from '@react-navigation/core';
import {NextMark, NextMark48, VerticalBar} from 'Root/component/atom/icon';

export default LoginTemplete = props => {
	const navigation = useNavigation();
	const [userSetting, setUserSetting] = React.useState();

	React.useEffect(() => {
		AsyncStorage.getItem('userSetting').then(setting => {
			if (setting) {
				console.log('셋팅 로드중', JSON.parse(setting));
				let userSetting = JSON.parse(setting);
				userSetting.password = '';
				setUserSetting(userSetting);
			} else {
				console.log('셋팅 로드 실패 초기값 사용', JSON.parse(setting));
				setUserSetting({
					isAutoLogin: false,
					isSaveId: false,
					id: '',
					password: '',
				});
			}
		});
	}, []);

	const tryToLogin = () => {
		Modal.popNoBtn('로그인을 요청합니다.');
		AsyncStorage.setItem('userSetting', JSON.stringify(userSetting));
		console.log('userSetting', userSetting);
		if (userSetting.id == '' && userSetting.password == '') {
			Modal.alert('로그인 정보를 입력해주세요.');
		} else if (userSetting.id == '' && userSetting.password != '') {
			Modal.alert('전화번호를 입력해주세요.');
		} else if (userSetting.id != '' && userSetting.password == '') {
			Modal.alert('비밀번호 입력해주세요.');
		} else {
			userLogin(
				{
					login_id: userSetting.id,
					login_password: userSetting.password,
				},
				userObject => {
					Modal.close();
					Modal.popNoBtn(userObject.msg.user_nickname + '님 \n로그인이 성공하였습니다.');

					if (!userObject.msg._id) {
						AsyncStorage.getItem('userInfo').then(user => {
							userGlobalObj.userInfo = JSON.parse(user);
						});
					} else {
						AsyncStorage.setItem('userInfo', JSON.stringify(userObject.msg));
						userGlobalObj.userInfo = userObject.msg;
					}
					Modal.close();
					getSettingPublic(
						{},
						result => {
							if (result.msg.length == []) {
								createSettingPublic(
									{},
									result => {
										console.log('SettingPublic 생성', result);
									},
									err => {
										'settingPublic 생성 err', err;
									},
								);
							}
						},
						err => {
							console.log('getSettingPublic err', err);
						},
					);
					getNotice(
						{},
						result => {
							if (result.msg.length == 0) {
								createNotice(
									{},
									result => {
										console.log('createNotice 생성', result);
									},
									err => {
										console.log('createNotice err', err);
									},
								);
							}
						},
						err => {
							console.log('getNotice err', err);
						},
					);
					if (navigation.getState().index != 0) {
						//로그인 유도 페이지에서 로그인이 된 경우 이전 페이지로 이동!
						// console.log('navigation.getState()', navigation.getState());
						navigation.navigate({key: navigation.getState().routes[0].key});
					} else {
						navigation.reset({routes: [{name: 'MainTab', params: userObject.msg.user_type}]});
					}
				},
				error => {
					console.log('error', error);
					Modal.close();
					if ((error = '유효하지 않은 비밀번호입니다.')) {
						Modal.alert('비밀번호가 일치하지 않습니다');
					} else {
						Modal.alert(error);
					}
				},
			);
		}
	};

	const moveToAssign = () => {
		navigation.push('AgreementCheck');
	};

	//보호소 코드 체크
	const moveToShelterCodeCheck = () => {
		navigation.push('ShelterCodeCheck');
	};

	const changePassword = () => {
		navigation.push('PasswordResetIdentification');
	};

	//자동로그인 박스 클릭
	const onCheckAutoLogin = state => {
		console.log('자동로그인', state);
		setUserSetting({...userSetting, isAutoLogin: state});
	};

	//아이디 저장 박스 클릭
	const onCheckSaveId = state => {
		console.log('아이디저장', state);
		setUserSetting({...userSetting, isSaveId: state});
	};

	//아이디 입력
	const onChangeId = id => {
		// console.log('유저 아이디 입력', id);
		// setId(id);
		setUserSetting({...userSetting, id: id});
	};

	//암호입력
	const onChangePassword = pwd => {
		// console.log('암호입력', pwd);
		// setPassword(pwd);
		setUserSetting({...userSetting, password: pwd});
	};

	//Password Text Input Validator
	const passwordValidator = text => {
		// console.log('Validator' + text);
		return true;
	};

	const moveToMainTab = () => {
		userGlobalObj.userInfo.isPreviewMode = true;
		AsyncStorage.removeItem('userSetting');
		navigation.reset({routes: [{name: 'MainTab'}]});
	};

	if (!userSetting) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
				<Text style={txt.roboto30b}>사용자 설정을 불러오는 중입니다.</Text>
			</View>
		);
	}
	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView scrollEnabled={false} contentContainerStyle={[loginTemplete_style.innerContainer]}>
				{/* 비로그인 둘러보기 */}
				<View style={loginTemplete_style.without_login}>
					{props.route.name == 'Login' ? (
						<TouchableOpacity onPress={moveToMainTab}>
							<View style={[loginTemplete_style.without_login_text]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>로그인 없이 둘러보기</Text>
								<View style={[loginTemplete_style.nextBtnView]}>
									<NextMark />
								</View>
							</View>
						</TouchableOpacity>
					) : (
						<View style={[loginTemplete_style.login_required_text, {marginTop: 40 * DP}]}>
							<Text style={[txt.noto24, {color: GRAY10}]}>로그인이 필요한 페이지입니다.</Text>
						</View>
					)}
				</View>
				{/* LoginForm */}
				<View style={[loginTemplete_style.loginForm]}>
					<View style={[loginTemplete_style.idInput]}>
						<Input24
							placeholder={'전화번호를 입력해주세요.'}
							keyboardType={'number-pad'}
							width={522}
							height={104}
							onChange={onChangeId}
							value={userSetting.id}
						/>
					</View>
					<View style={[loginTemplete_style.pwdInput]}>
						<PasswordInput
							placeholder={'비밀번호를 입력해주세요'}
							width={520}
							height={104}
							validator={passwordValidator}
							onChange={onChangePassword}
							information={''}
							alert_msg={''}
							confirm_msg={''}
						/>
					</View>
					<View style={[loginTemplete_style.checkBox_loginFormContainer]}>
						<View style={[loginTemplete_style.checkBox_loginForm]}>
							<View style={[loginTemplete_style.checkBoxContainer]}>
								<CheckBox value={'자동 로그인'} onCheck={onCheckAutoLogin} state={userSetting.isAutoLogin} txtSize={28} color={'black'} />
							</View>
							<View style={[loginTemplete_style.checkBoxContainer]}>
								<CheckBox value={'아이디저장'} onCheck={onCheckSaveId} state={userSetting.isSaveId} txtSize={28} color={'black'} />
							</View>
						</View>
					</View>
				</View>

				{/* 로그인버튼 */}
				<View style={[btn_style.btn_w522, loginTemplete_style.btn_w522_login]}>
					<AniButton btnLayout={btn_w522_r30} btnTitle={'로그인'} titleFontStyle={32} onPress={tryToLogin} />
				</View>
				{/* 회원가입 버튼 */}
				<View style={[btn_style.btn_w522, loginTemplete_style.btn_w522_assign]}>
					<AniButton btnLayout={btn_w522_r30} btnTitle={'회원 가입'} btnStyle={'border'} titleFontStyle={32} onPress={moveToAssign} />
				</View>
				{/* 보호소 등록 / 비밀번호재설정 */}
				<View style={[login_style.basic_info2, loginTemplete_style.basic_info]}>
					<TouchableOpacity onPress={moveToShelterCodeCheck}>
						<Text style={[txt.noto24, {color: GRAY10}, {marginRight: 60 * DP}, {width: 134 * DP}, {height: 40 * DP}]}>보호소 등록</Text>
					</TouchableOpacity>
					<VerticalBar />
					<TouchableOpacity onPress={changePassword}>
						<Text style={[txt.noto24, {color: GRAY10}, {marginLeft: 60 * DP}, {width: 170 * DP}, {height: 40 * DP}]}>비밀번호 재설정</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const loginTemplete_style = StyleSheet.create({
	passwordChecker: {
		width: 654 * DP,
		height: 406 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#A07A7A',
	},
	innerContainer: {
		// marginTop: 30,
		alignItems: 'center',
	},
	without_login: {
		width: 694 * DP,
		height: 216 * DP,
		marginTop: 30 * DP,
	},
	without_login_text: {
		width: 278 * DP,
		height: 50 * DP,
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	login_required_text: {
		alignSelf: 'center',
	},
	nextBtnView: {
		marginLeft: 20 * DP,
	},
	loginForm: {
		width: 522 * DP,
		height: 346 * DP,
	},
	idInput: {
		marginBottom: 20 * DP,
	},
	pwdInput: {},
	checkBox_loginFormContainer: {
		width: 450 * DP,
		height: 42 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	checkBox_loginForm: {
		width: 450 * DP,
		height: 42 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	checkBoxContainer: {
		marginTop: 10 * DP,
		// marginHorizontal: 20 * DP,
	},
	btn_w522_login: {
		marginTop: 92 * DP,
	},
	btn_w522_assign: {
		marginTop: 30 * DP,
	},
	basic_info: {
		marginTop: 50 * DP,
	},
	social_info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 38 * DP,
	},
	socialLogin_icon: {
		width: 80 * DP,
		height: 80 * DP,
	},
});
