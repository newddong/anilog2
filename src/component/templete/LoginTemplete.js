import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w522} from '../atom/btn/btn_style';
import {Kakao_Icon, Naver_Icon, NextMark, Instagram_Icon, Facebook_Icon} from '../atom/icon';
import AniButton from '../molecules/AniButton';
import CheckBox from '../molecules/CheckBox';
import Input24 from '../molecules/Input24';
import PasswordInput from '../molecules/PasswordInput';
import {login_style, btn_style, loginTemplete_style} from './style_templete';
import Modal from 'Component/modal/Modal';
import {useLogin, userLogin} from 'Root/api/userapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userGlobalObj from 'Root/config/userGlobalObject';

export default LoginTemplete = props => {
	const [id, setId] = React.useState('');
	const [password, setPassword] = React.useState('');
	const tryToLogin = () => {
		Modal.popNoBtn('로그인을 요청합니다.');

		userLogin(
			{
				login_id: id,
				login_password: password,
			},
			userObject => {
				// console.log('userObject', userObject.msg);
				Modal.close();
				Modal.popNoBtn(userObject.msg.user_nickname + '님 \n로그인이 성공하였습니다.');
				AsyncStorage.setItem('token', userObject.msg._id || '');
				AsyncStorage.setItem('type', userObject.msg.user_type || '');

				if (!userObject.msg._id) {
					AsyncStorage.getItem('userInfo').then(user => {
						userGlobalObj.userInfo = JSON.parse(user);
					});
				} else {
					AsyncStorage.setItem('userInfo', JSON.stringify(userObject.msg));
					userGlobalObj.userInfo = userObject.msg;
				}
				setTimeout(() => {
					Modal.close();
					// props.navigation.navigate('MainTab', userObject.msg.user_type);
					props.navigation.reset({routes: [{name: 'MainTab', params: userObject.msg.user_type}]});
				}, 1000);
			},
			error => {
				Modal.close();
				Modal.popOneBtn(error, '확인', () => {
					Modal.close();
				});
			},
		);
	};

	const moveToAssign = () => {
		props.navigation.push('AgreementCheck');
	};

	//보호소 코드 체크
	const moveToShelterCodeCheck = () => {
		props.navigation.push('ShelterCodeCheck');
	};

	const findMyId = () => {};
	const changePassword = () => {};

	//자동로그인 박스 클릭
	const onCheckAutoLogin = state => {
		// console.log('자동로그인', state);
	};
	//아이디 저장 박스 클릭
	const onCheckSaveId = state => {
		// console.log('아이디저장', state);
	};

	//아이디 입력
	const onChangeId = id => {
		// console.log('유저 아이디 입력', id);
		setId(id);
	};

	//암호입력
	const onChangePassword = pwd => {
		// console.log('암호입력', pwd);
		setPassword(pwd);
	};

	//Password Text Input Validator
	const passwordValidator = text => {
		// console.log('Validator' + text);
		return true;
	};
	//Id Text Input Validator
	const idValidator = text => {
		console.log('Id Validator ' + text);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* confirm without login */}
			<View style={[loginTemplete_style.innerContainer]}>
				<View style={loginTemplete_style.without_login}>
					{/* <TouchableOpacity onPress={moveToMainTab}>
					<View style={[loginTemplete_style.without_login_text]}>
						<Text style={[txt.noto24, {color: GRAY10}]}>로그인 없이 둘러보기</Text>
						<View style={[loginTemplete_style.nextBtnView]}><NextMark /> </View>
					</View>
				</TouchableOpacity> */}
				</View>

				{/* LoginForm */}
				<View style={[loginTemplete_style.loginForm]}>
					<View style={[loginTemplete_style.idInput]}>
						<Input24 placeholder={'전화번호를 입력해주세요.'} keyboardType={'number-pad'} width={520} onChange={onChangeId} value={id} />
					</View>
					<View style={[loginTemplete_style.pwdInput]}>
						<PasswordInput
							placeholder={'비밀번호를 작성해주세요.'}
							width={520}
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
								<CheckBox value={'자동 로그인'} onCheck={onCheckAutoLogin} />
							</View>
							<View style={[loginTemplete_style.checkBoxContainer]}>
								<CheckBox value={'아이디저장'} onCheck={onCheckSaveId} />
							</View>
						</View>
					</View>
				</View>

				{/* Btn_w522 */}
				<View style={[btn_style.btn_w522, loginTemplete_style.btn_w522_login]}>
					<AniButton btnLayout={btn_w522} btnTitle={'로그인'} btnTheme={'shadow'} titleFontStyle={32} onPress={tryToLogin} />
				</View>

				{/* Btn_w522 */}
				<View style={[btn_style.btn_w522, loginTemplete_style.btn_w522_assign]}>
					<AniButton btnLayout={btn_w522} btnTitle={'회원가입'} btnStyle={'border'} btnTheme={'shadow'} titleFontStyle={32} onPress={moveToAssign} />
				</View>

				{/* basic info */}
				<View style={[login_style.basic_info, loginTemplete_style.basic_info]}>
					<TouchableOpacity onPress={moveToShelterCodeCheck}>
						<Text style={[txt.noto24, {color: GRAY20}]}> 보호소 등록</Text>
					</TouchableOpacity>
					<Text style={{color: GRAY20}}> | </Text>
					<TouchableOpacity onPress={findMyId}>
						<Text style={[txt.noto24, {color: GRAY20}]}> 내 계정 찾기 </Text>
					</TouchableOpacity>
					<Text style={{color: GRAY20}}> | </Text>
					<TouchableOpacity onPress={changePassword}>
						<Text style={[txt.noto24, {color: GRAY20}]}> 비밀번호 재설정</Text>
					</TouchableOpacity>
				</View>

				{/* social login */}
				{/* <View style={[login_style.social_info, loginTemplete_style.social_info]}>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Naver_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Kakao_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Instagram_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Facebook_Icon />
				</View>
			</View> */}
			</View>
		</View>
	);
};
