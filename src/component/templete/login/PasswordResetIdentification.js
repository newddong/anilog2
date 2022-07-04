import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w694_r30} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import PhoneNumVerification from 'Root/component/organism/form/PhoneNumVerification';
import {useNavigation} from '@react-navigation/native';
import {btn_style, login_style} from '../style_templete';
import {userLogin} from 'Root/api/userapi';
import {getUserAccountCount} from 'Root/api/userapi';
export default PasswordResetIdentification = props => {
	const [name, setName] = React.useState('');
	const [mobile_number, setMobile_number] = React.useState('');

	const user_data = React.useRef({
		...props.route.params,
		user_name: 'name',
		user_phone_number: '',
		user_mobile_company: '',
	}).current;
	const [verified, setVerified] = React.useState(false); //입력값 verifiled boolean
	const [time, setTime] = React.useState(0);
	const [async, setAsync] = React.useState({isConfirm: false});
	const [token, setToken] = React.useState();
	const [loaded, setLoaded] = React.useState(false);
	const [impid, setImpid] = React.useState();
	const [failed, setFailed] = React.useState(false); // 인증 실패 boolean
	const [phoneVerified, setPhoneVerified] = React.useState(false); //핸드폰 번호 인증 완료
	const navigation = useNavigation();

	const onPressConfirm = () => {
		// const confirmed = true;
		props.navigation.navigate('PasswordReset', user_data.user_phone_number);
		// if (confirmed) {
		// 	props.navigation.push('PasswordReset', '121212');
		// } else {
		// 	Modal.popOneBtn('이 정보로 가입한 계정이 없습니다.' + name + ' / ' + mobile_number, '확인', () => Modal.close());
		// }
	};

	/////
	React.useEffect(() => {
		// console.log('props changed', props);
		if (props.route.params?.response) {
			const response = props.route.params.response;
			if (response.success == 'true') {
				console.log('imp_uid', response.imp_uid);
				setFailed(false);
				// setPhoneVerified(true);
				setImpid(response.imp_uid);
				userLogin(
					{login_id: user_data.user_phone_number, login_password: '0'},
					result => {
						console.log('result', result.msg);
					},
					err => {
						console.log('err', err);
						if (err.msg == '등록된 유저가 없습니다') {
							Modal.popOneBtn('이 정보로 가입한 계정이 없습니다.', '확인', () => Modal.close());
							navigation.goBack();
						} else {
							setPhoneVerified(true);
						}
					},
				);
			}
			// 인증에 실패했을때
			else {
				setFailed(true);
			}
		}
	}, [props]);

	const onVerificationNumberChange = num => {
		console.log(num);
		setVerified_num(num);
	};
	const onNameInputChange = name => {
		user_data.user_name = name;
		console.log(name);
	};
	const onPhoneNumberInputChange = phone_num => {
		console.log('Userverification onPhoneNumberInputChange      ', phone_num);
		let phoneNum = phone_num.split('|');
		user_data.user_phone_number = phoneNum[1];
		user_data.user_mobile_company = phoneNum[0];
	};
	const onMobileCompanyInputChange = (company, index) => {
		console.log('Userverification onMobileCompanyInputChange      ', company, index);
		user_data.user_mobile_company = company;
	};
	const notUser = () => {
		getUserAccountCount(
			{user_phone_number: user_data.user_phone_number},
			result => {
				console.log('getUserAccountCount result', result);
				if (result.msg == 0) {
					console.log('계정 없음');
					// Modal.popTwoBtn(
					// 	'해당 전화번호로 가입된 계정이 없습니다',
					// 	'회원가입 하기',
					// 	'확인',
					// 	() => {
					// 		console.log('login');
					// 		navigation.navigate('AgreementCheck');
					// 	},
					// 	() => {
					// 		Modal.close();
					// 	},
					// );
					Modal.popOneBtn('이 정보로 가입한 계정이 없습니다.', '확인', () => {
						Modal.close();
					});
				} else {
					verificationRequest();
				}
			},
			err => {
				console.log('getUserAccountCount result', err);
			},
		);
	};
	const verificationRequest = () => {
		console.log('인증요청');

		let user_carrier = '';
		console.log('인증요청 눌림', user_data);
		switch (user_data.user_mobile_company) {
			case 'SK텔레콤':
				user_carrier = 'SKT';
				break;
			case 'KT':
				user_carrier = 'KTF';
				break;
			case 'LG U+':
				user_carrier = 'LGT';
				break;
			case '알뜰폰':
				user_carrier = 'MVNO';
				break;
		}
		const data = {
			params: {
				// merchant_uid: merchantUid,
				carrier: user_carrier,
				name: user_data.user_name,
				phone: user_data.user_phone_number,
			},
		};
		// navigation.navigate('Certification', {data: data, navigationName: 'PasswordResetIdentification'});
		navigation.navigate('Certification', {data: data, navigationName: 'PasswordReset', user_data: user_data.user_phone_number});
	};

	const reVerificationRequest = () => {
		console.log('인증요청재설정');
		setTime(30);
		//인증번호 재설정
	};

	const nameValidator = name => {
		// let regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
		let regExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9_-]{2,20}$/;
		let pattern = /\s/g;
		// console.log('trimmed:' + trimmed.length);
		// console.log('regex', !pattern.test(trimmed) && regExp.test(trimmed));
		return !pattern.test(name) && regExp.test(name);
	};

	const mobileNumValidator = text => {
		// console.log('text', text);
		// console.log('상단 폼 체크 : ', text.length > 6);
		return text.length == 11;
		//휴대폰 인증함수
	};

	const verifyNumValidator = verifyNum => {
		return verifyNum.length > 2;
		//인증번호 입력 인증함수(여기서는 true를 반환해도 번호인증요청에서 false가 되면 통과하지 못하므로 return true를 해도 상관없음)
	};

	const onVaild = isValid => {
		console.log('isValid', isValid, verified);
		setVerified(isValid);
	};

	return (
		<ScrollView contentContainerStyle={[login_style.wrp_main, {flex: 1}]}>
			{/* <View style={[styles.container, {flex: 1}]}> */}
			<View style={[styles.infoMessageBox, {marginBottom: 136 * DP}]}>
				<Text style={[txt.noto30, {color: MAINBLACK, textAlign: 'center'}]}>회원가입시 등록한 정보로 {'\n'} 비밀번호를 재설정 할 수 있습니다.</Text>
			</View>
			{/* <View style={[styles.nameInputBox]}>
				<Input30
					width={654}
					onChange={onChangeName}
					showCrossMark={false}
					showTitle={false}
					showmsg={false}
					placeholder={'회원가입시 등록한 계정의 이름을 적어주세요.'}
				/>
			</View>

			<View style={[styles.phoneInput]}>
				<InputWithSelect items={mobile_carrier} width={400} onChange={onChangeMobile} placeholder={'회원가입시 등록한 번호 입력'} />
			</View> */}
			{/* <View style={[{marginTop: 10 * DP}, {backgroundColor: 'yellow'}, {alignItems: ''}]}> */}

			{/* </View> */}

			{/* <View style={[styles.buttonContainer]}>
				<AniButton onPress={onPressConfirm} btnTitle={'확인'} btnStyle={'border'} btnLayout={btn_w654} titleFontStyle={32} />
			</View> */}
			<View style={[styles.phoneNumVerification]}>
				{/* <View> */}
				<PhoneNumVerification
					requestVerification={verificationRequest}
					requestReVerification={reVerificationRequest}
					onVerificationNumberChange={onVerificationNumberChange}
					onNameInputChange={onNameInputChange}
					onPhoneNumberInputChange={onPhoneNumberInputChange}
					onMobileCompanyInputChange={onMobileCompanyInputChange}
					mobileNumValidator={mobileNumValidator}
					verifyNumValidator={verifyNumValidator}
					nameValidator={nameValidator}
					onValid={onVaild}
					verifyTimeLimit={time}
					asyncConfirm={async}
					userData={user_data}
					failed={failed}
					phoneVerified={phoneVerified}
				/>
			</View>

			<View style={[btn_style.btn_w694, {marginTop: 120 * DP}]}>
				{phoneVerified ? (
					<AniButton btnTitle={'다음'} btnLayout={btn_w694_r30} btnStyle={'border'} titleFontStyle={32} onPress={onPressConfirm} />
				) : verified ? (
					<AniButton btnTitle={'인증하기'} btnLayout={btn_w694_r30} btnStyle={'border'} disable={false} titleFontStyle={32} onPress={notUser} />
				) : (
					<AniButton
						btnTitle={'인증하기'}
						btnLayout={btn_w694_r30}
						btnStyle={'border'}
						disable={true}
						titleFontStyle={32}
						onPress={verificationRequest}
					/>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#FFF',
	},
	infoMessageBox: {
		// width: 414 * DP,
		height: 94 * DP,
		marginTop: 158 * DP,
		alignItems: 'center',
	},
	nameInputBox: {
		marginTop: 80 * DP,
	},
	phoneInput: {
		marginTop: 60 * DP,
	},
	buttonContainer: {
		marginTop: 110 * DP,
	},
	phoneNumVerification: {
		width: 694 * DP,
	},
});
