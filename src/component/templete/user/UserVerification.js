import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import StageBar from 'Molecules/info/Stagebar';
import PhoneNumVerification from 'Organism/form/PhoneNumVerification';
import {stagebar_style} from 'Organism/style_organism copy';
import {login_style, btn_style, temp_style, progressbar_style, userAssign} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// DropDown 컴포넌트 해결될 시 props처리와 data처리 추가해야함
// 이메일부분 삭제 컨펌 나면 삭제 실시 예정

export default UserVerification = props => {
	console.log('-UserVerification-');
	const user_data = React.useRef({
		...props.route.params,
		user_name: 'name',
		user_phone_number: '',
		user_mobile_company: '',
	}).current;

	const [tabState, setTabState] = React.useState(0);
	const [verified, setVerified] = React.useState(false);
	const [verified_num, setVerified_num] = React.useState();
	const [time, setTime] = React.useState(0);
	const [async, setAsync] = React.useState({isConfirm: false});
	const [token, setToken] = React.useState();
	const [loaded, setLoaded] = React.useState(false);
	const [impid, setImpid] = React.useState();
	const navigation = useNavigation();
	const goToNextStep = () => {
		console.log(user_data);
		props.navigation.push('UserPasswordCheck', user_data);
	};
	React.useEffect(() => {
		if (props.route.params.response) {
			console.log('props changed', props);
			const response = props.route.params.response;

			if (response.success) {
				console.log('imp_uid', response.imp_uid);
				setVerified(true);
				setImpid(response.imp_uid);
				getToken();
			}
		}
	}, [props]);
	React.useEffect(() => {
		if (loaded) {
			getCertifications(impid);
		}
	}, [loaded]);

	async function getToken() {
		try {
			const response = await axios({
				url: 'https://api.iamport.kr/users/getToken',
				method: 'post', // POST method
				headers: {'Content-Type': 'application/json'}, // "Content-Type": "application/json"
				data: {
					imp_key: '8427182330724644', // REST API키
					imp_secret: '7a968900ca1ae8e30ec448bf9c5f7b0716424e80f8c5aea716f88b8a01453efe9498764041c35122', // REST API Secret
				},
			});
			setToken(response.data.response);
			setLoaded(true);
		} catch (e) {
			console.log('getToken err', e);
		}
	}
	async function getCertifications(imp_key) {
		console.log('imp_key, token', imp_key, token);
		console.log('url', `https://api.iamport.kr/certifications/${imp_key}`);
		try {
			const response = await axios({
				url: `https://api.iamport.kr/certifications/${imp_key}`, // imp_uid 전달
				method: 'get', // GET method
				headers: {Authorization: token.access_token}, // 인증 토큰 Authorization header에 추가
			});
			const certificationInfo = response.data.response;
			console.log('certificationInfo', certificationInfo);
		} catch (e) {
			console.log('getCertificataions err', e);
		}
	}

	const changeTabState = state => {
		setTabState(state);
	};
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

	const verificationRequest = () => {
		console.log('인증요청');

		// setTime(30);
		// setTimeout(() => {
		// 	setAsync({isConfirm: true});
		// }, 500);
		//번호 인증 요청(비동기)
		// let user_carrier = '';
		// console.log('인증요청 눌림', user_data);
		// switch (user_data.user_mobile_company) {
		// 	case 'SK텔레콤':
		// 		user_carrier = 'SKT';
		// 		break;
		// 	case 'KT':
		// 		user_carrier = 'KTF';
		// 		break;
		// 	case 'LG U+':
		// 		user_carrier = 'LGT';
		// 		break;
		// 	case '알뜰폰':
		// 		user_carrier = 'MVNO';
		// 		break;
		// }
		const data = {
			params: {
				// merchant_uid: merchantUid,
				carrier: '',
				name: user_data.name,
				phone: user_data.user_phone_number,
			},
		};
		navigation.navigate('Certification', {data: data});
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
		return text.length > 2;
		//휴대폰 인증함수
	};

	const verifyNumValidator = verifyNum => {
		return verifyNum.length > 2;
		//인증번호 입력 인증함수(여기서는 true를 반환해도 번호인증요청에서 false가 되면 통과하지 못하므로 return true를 해도 상관없음)
	};

	const onVaild = isValid => {
		setVerified(isValid);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView>
				{/* (M)StageBar	 */}
				<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
					<StageBar
						backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
						insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
						current={2} //현재 단계를 정의
						maxstage={4} //전체 단계를 정의
						width={600 * DP} //bar의 너비
					/>
				</View>
				<View style={[temp_style.textMassageLeftTop]}>
					<Text style={userAssign.textMessageInside}>휴대폰 번호로 가입이 가능합니다.</Text>
				</View>
				{/* <View style={[temp_style.phoneNumVerification]}>
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
					/>
				</View> */}
				{/* (A)Btn_w654 */}
				{verified ? (
					<AniButton btnTitle="인증 완료" btnLayout={btn_w654} titleFontStyle={32} onPress={verificationRequest} disable={true} />
				) : (
					<AniButton btnTitle="인증 하기" btnLayout={btn_w654} btnStyle={'border'} titleFontStyle={32} onPress={verificationRequest} />
				)}

				<View style={[btn_style.btn_w654, userAssign.btn_w654]}>
					{verified ? (
						<AniButton btnTitle={'다음 단계로'} btnLayout={btn_w654} btnStyle={'border'} titleFontStyle={32} onPress={goToNextStep} />
					) : (
						<AniButton btnTitle={'인증 확인'} btnLayout={btn_w654} disable={true} titleFontStyle={32} onPress={goToNextStep} />
					)}
				</View>
			</ScrollView>
		</View>
	);
};
