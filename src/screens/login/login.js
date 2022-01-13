import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {Kakao, Naver, Instagram, Facebook, Xbutton, CheckedBtn, Bracket} from 'Asset/image';
import {layoutstyles, textstyles, buttonstyle, formstyles} from './style_login';
import {layout} from '../feed/profile/style_profile';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_PLACEHOLDER, SLIGHT_BLACK} from 'Screens/color';
import {
	ASK_LOST_ID_PASS,
	ASK_USER,
	ASSIGN_USER,
	FAIL_LOGIN_COUNT,
	FAIL_LOGIN_LOCK,
	FAIL_MSG,
	FIND_ID,
	FIND_PASS,
	LOGIN,
	LOGIN_AUTO,
	RECAPTCHA,
	REQ_PASSWORD,
	REQ_PHONE_NUM_AND_EMAIL,
	SAVE_ID,
	WITHOUT_LOGIN,
} from 'Screens/msg';
import FormTxtInput from 'Screens/common/formtxtinput';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serveruri, cookieReset} from 'Screens/server';

export const loginInfo = {
	user_id: '',
};

export default Login = props => {
	React.useEffect(() => {
		const getItem = async () => {
			let token = await AsyncStorage.getItem('token');
			if (token) {
				try {
					await cookieReset(token);

					let loginResult = await axios.post(serveruri + '/auth/login', {id: data.id, password: data.password});
					console.log(loginResult);
					if (loginResult.data.status === 200) {
						let cookie = await CookieManager.get(serveruri);
						await AsyncStorage.setItem('token', cookie['connect.sid'].value);
						loginInfo.user_id = loginResult.data.user_id;
						setTimeout(moveToHome, 1500);
					} else if (loginResult.data.status === 403) {
						alert('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요');
					} else {
						alert(loginResult.data.msg);
					}
				} catch (err) {
					alert(err);
				}
			}
		};
		getItem();
	}, []);

	const [autoLogin, setAutoLogin] = useState(false);
	const pressAutoLogin = () => {
		setAutoLogin(!autoLogin);
	};
	const [saveId, setSaveId] = useState(false);
	const pressSaveId = () => {
		setSaveId(!saveId);
	};
	const moveToFindId = () => {
		props.navigation.navigate('AssignRoute', {screen: 'VerifyUser'});
	};
	const moveToAssignUser = () => {
		props.navigation.push('AssignRoute', {screen: 'Assign', params: {title: '회원가입'}});
	};
	const moveToHome = () => {
		props.navigation.replace('MainScreen');
	};

	const login = async () => {
		console.log('try to login');
		// axios.post('https://api.zoodoongi.net/login',{id:data.id,password:data.password}).then(
		try {
			let token = await AsyncStorage.getItem('token');
			if (token) {
				await cookieReset(token);
			}
			let loginResult = await axios.post(serveruri + '/auth/login', {id: data.id, password: data.password});
			console.log('Login Result ====> ' + JSON.stringify(loginResult));
			if (loginResult.data.status === 200) {
				let cookie = await CookieManager.get(serveruri);
				await AsyncStorage.setItem('token', cookie['connect.sid'].value);
				loginInfo.user_id = loginResult.data.user_id;
				alert(loginResult.data.msg + '님 로그인 성공');
				setTimeout(moveToHome, 1500);
			} else if (loginResult.data.status === 403) {
				alert('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요');
			} else {
				alert(loginResult.data.msg);
			}
		} catch (err) {
			alert(err);
		}
	};

	const [data, setData] = React.useState({
		id: '',
		password: '',
	});
	const idChange = e => {
		setData({...data, id: e.nativeEvent.text});
	};
	const passwordChange = e => {
		setData({...data, password: e.nativeEvent.text});
	};

	const naverlogin = async e => {
		await CookieManager.clearAll();
		await CookieManager.set(serveruri, {
			name: 'connect.sid',
			value: await AsyncStorage.getItem('test'),
			path: '/',
		});
		// await CookieManager.set('http://10.0.2.2:3000',
		// 	'connect.sid=s%3AjbSSeI_frl2J97s5jNcbeSBIc4xiUcru.mkIV2Qedt5WSbtq%2FS1VIcwxJMjAI54%2FJUxiO%2FOdJEvM')
		const result = await axios.get(serveruri + `/auth/test?profile=${data.id}`);
		// {headers:{'rewz':'connect.sid=s%3AbQuYknCfnmoBp8iVaWgF_ViMxesHrRFD.5w02F0iUfHXxc71pbaCOfbdkWLGJgLgjOKMA7L30qs0'},withCredentials:true}

		// );
		console.log('testapi결과 ' + JSON.stringify(result));
		const r = await CookieManager.get(serveruri);
		await AsyncStorage.setItem('test', r['connect.sid'].value);
		console.log(r['connect.sid'].value);
		alert(result.data['connect.sid']);

		// axios.get(`http://10.0.2.2:3000/login/test?profile=${data.id}`).then(
		// 	(result) => {
		// 		console.log('testapi결과 '+JSON.stringify(result));
		// 		alert(result.data['connect.sid']);
		// 	}
		// )
	};

	const kakaologin = async e => {
		try {
			let token = await AsyncStorage.getItem('token');
			await cookieReset(token);

			let loginResult = await axios.post(serveruri + '/post/test', {test: ['b', 'c', 'd']});
			console.log(loginResult);
		} catch (err) {
			alert(err);
		}
	};

	return (
		<View style={layoutstyles.container}>
			<View style={layoutstyles.contents}>
				<TouchableWithoutFeedback onPress={moveToHome}>
					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 188 * DP, marginBottom: 70 * DP}}>
						<Text style={[textstyles.noto24, {color: GRAY}]}>{WITHOUT_LOGIN}</Text>
						<SvgWrapper style={{width: 50 * DP, height: 50 * DP}} svg={<Bracket fill={GRAY} />} />
					</View>
				</TouchableWithoutFeedback>

				<View style={layoutstyles.inputform}>
					<View style={(layoutstyles.textinputContainer, {marginBottom: 32 * DP})}>
						<FormTxtInput
							inputStyle={[formstyles.id_input, textstyles.noto28]}
							placeholder={REQ_PHONE_NUM_AND_EMAIL}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={idChange}></FormTxtInput>
						<FormTxtInput
							inputStyle={[formstyles.pass_input, textstyles.noto28]}
							placeholder={REQ_PASSWORD}
							placeholderTextColor={GRAY_PLACEHOLDER}
							onChange={passwordChange}
							password></FormTxtInput>
					</View>
					{false && (
						<View style={formstyles.fail_msg}>
							<Text style={[textstyles.noto28, textstyles.red]}>{FAIL_MSG}</Text>
						</View>
					)}
					{false && (
						<View style={formstyles.fail_description}>
							<Text style={[textstyles.noto28, textstyles.red]}>{FAIL_LOGIN_COUNT}</Text>
							<Text style={[textstyles.noto28, textstyles.gray]}>{FAIL_LOGIN_LOCK}</Text>
						</View>
					)}
					{false && (
						<View style={layoutstyles.container_recaptcha}>
							<View style={layoutstyles.recaptcha}>
								<Text>ReCaptcha</Text>
							</View>
							<TextInput
								style={[formstyles.pass_input, textstyles.noto28]}
								placeholder={RECAPTCHA}
								placeholderTextColor={GRAY_PLACEHOLDER}></TextInput>
						</View>
					)}

					<View style={layoutstyles.autologinContainer}>
						<CheckBtn onPress={pressAutoLogin} btn_txt={LOGIN_AUTO} isCheck={autoLogin} />
						<CheckBtn onPress={pressSaveId} btn_txt={SAVE_ID} isCheck={saveId} />
					</View>
				</View>
				<TouchableWithoutFeedback onPress={login}>
					<View style={[buttonstyle.loginbutton, buttonstyle.shadow]}>
						<Text style={[textstyles.noto32b, textstyles.white]}>{LOGIN}</Text>
					</View>
				</TouchableWithoutFeedback>

				<View style={layoutstyles.socialLinkContainer}>
					<SvgWrap style={buttonstyle.socialAppsButton} svg={<Naver />} onPress={naverlogin} />
					<SvgWrap style={buttonstyle.socialAppsButton} svg={<Kakao />} onPress={kakaologin} />
					<SvgWrap style={buttonstyle.socialAppsButton} svg={<Instagram />} />
					<SvgWrap style={buttonstyle.socialAppsButton} svg={<Facebook />} />
				</View>

				<View style={layoutstyles.suggestion}>
					<TouchableWithoutFeedback onPress={moveToFindId}>
						<Text style={textstyles.noto24}>
							{ASK_LOST_ID_PASS} <Text style={textstyles.link}>{FIND_ID}</Text> 또는 <Text style={textstyles.link}>{FIND_PASS}</Text>
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={moveToAssignUser}>
						<View style={{flexDirection: 'row'}}>
							<Text style={textstyles.noto24}>
								<Text style={textstyles.gray}>{ASK_USER}</Text> {ASSIGN_USER}
							</Text>
							<SvgWrapper style={{width: 26 * DP, height: 40 * DP}} svg={<Bracket fill={BLACK} />} />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

const CheckBtn = props => {
	return (
		<View style={buttonstyle.autologinButton}>
			<TouchableWithoutFeedback onPress={props.onPress}>
				{props.isCheck ? (
					<View style={buttonstyle.checkedButton}>
						<SvgWrapper style={buttonstyle.checkedButton} svg={<CheckedBtn />} />
					</View>
				) : (
					<View style={buttonstyle.notcheckButton} />
				)}
			</TouchableWithoutFeedback>
			<Text style={[textstyles.noto28, {color: SLIGHT_BLACK, marginBottom: 6 * DP}]}>{props.btn_txt}</Text>
		</View>
	);
};
