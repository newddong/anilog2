import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w226, btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import Stagebar from 'Molecules/info/Stagebar';
import AddressInput from 'Organism/input/AddressInput';
import {addressInput, stagebar_style} from 'Organism/style_organism';
import {applyCompanionA, btn_style, login_style, temp_style} from 'Templete/style_templete';

// 참조 DB테이블 :
// ProtectionActivityApplicantObject - [ ApplyCompanion A,B,C,D,E 에 걸쳐 Write 해나갈 Data]
// UserObject - 해당 임시보호 및 입양 요청글을 올린 보호소의 정보
// ShelterProtectAnimalObject - 유저가 클릭한 동물의 정보가 들어있는 테이블 [ 입양 및 임시보호 Data Write가 완료된 뒤 ApplyDetail에서 보여질 대상 동물 관련 Data]

export default ApplyCompanionA = ({route}) => {
	const navigation = useNavigation();
	const isProtect = route.name == 'ApplyProtectActivityA'; //임시보호 신청여부 , false일 경우 자동으로 입양모드 전환
	const [confirmed, setConfirmed] = React.useState(false);
	const [phoneNumFormCheck, setPhoneNumFormCheck] = React.useState(false);
	const [data, setData] = React.useState({
		protect_act_type: isProtect ? 'protect' : 'adopt',
		protect_act_address: {
			city: '',
			district: '',
			neighbor: '',
			brief: '',
			detail: '',
		},

		protect_act_phone_number: '',
		protect_request_pet_data: '',
	});
	React.useEffect(() => {
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
	}, []);

	//동물보호 및 입양 요청 스크린에서 보내준 [임시보호 및 입양 신청을 한 동물에 대한 정보] 가 담겨 있는 'protect_request_pet_data'
	React.useEffect(() => {
		console.log('params', route.params.protect_request_pet_data);
	}, [route.params.protect_request_pet_data]);

	//보호장소 및 연락처가 공란이면 다음 단계로 넘어갈 수 없는 로직
	React.useEffect(() => {
		// console.log('data', data);
	}, [data]);

	React.useEffect(() => {
		const addr = route.params.addr;
		if (route.params != null) {
			//한번 주소 검색이 된적이 있는가?
			if (addr) {
				console.log('route.params.Address Changed?   ', addr);
				// setData({...data, user_address: {city: addr.siNm, district: addr.sggNm, neighbor: addr.rn + ' ' + addr.buldMnnm}});
				setData({...data, protect_act_address: {brief: addr.roadAddr, detail: addr.detailAddr}});
			}
		}
	}, [route.params.addr]);

	React.useEffect(() => {
		// console.log('data: ', data);
	}, [data]);

	//주소찾기 버튼 클릭
	const goToAddressSearch = () => {
		navigation.push('AddressSearch', {addr: '', from: route.name});
	};

	//연락처 Value 콜백
	const onChangePhoneNum = num => {
		let testString = num; // 원래 문자열
		let regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
		let result = testString.replace(regex, ''); // InputWithSelect에서 보내주는 num값에 통신사도 포함되어 있음. 통신사 문자열 제거 후 번호만 받기
		setData({...data, protect_act_phone_number: result});
	};

	const phoneValidate = num => {
		// console.log('num', num);
		let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		if (regPhone.test(num) === true) {
			console.log('입력된 값은 휴대전화번호입니다.');
		}
		return regPhone.test(num);
	};

	const onValidPhoneNum = isValid => {
		console.log('isValidPhone', isValid);
		setPhoneNumFormCheck(isValid);
	};

	//세부주소 입력
	const onChangeDeatilAddress = addr => {
		setData({
			...data,
			protect_act_address: {
				brief: data.protect_act_address.brief,
				detail: addr,
			},
		});
	};

	//주소 입력
	const onChangeAddress = addr => {
		setData({
			...data,
			protect_act_address: {
				brief: addr,
				detail: data.protect_act_address.detail,
			},
		});
	};

	//확인 버튼 클릭
	const goToNextStep = () => {
		// console.log('data', data);
		Object.assign(data, route.params.protect_request_pet_data);
		route.name == 'ApplyProtectActivityA' ? navigation.push('ApplyProtectActivityB', data) : navigation.push('ApplyAnimalAdoptionB', data);
	};

	return (
		<View style={[login_style.wrp_main, applyCompanionA.container]}>
			{/* stageBar */}
			<View style={[temp_style.stageBar, applyCompanionA.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={1} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			{/* textMSg */}
			<View style={[temp_style.stageBar, applyCompanionA.textMsg, {height: null}]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>
					개인정보의 내용이 맞는지 확인해 주세요.{'\n'} (보호장소 및 연락처는 반드시 작성되어야합니다.)
				</Text>
			</View>
			{/* InputForm */}
			<View style={[temp_style.inputForm_ApplyCompanionA, applyCompanionA.inputForm]}>
				{/* addressInput */}
				<View style={[temp_style.addressInput]}>
					<AddressInput
						title={'보호장소'}
						titleMode={'star'}
						address={data.protect_act_address.brief}
						detailAddress={data.protect_act_address.detail}
						onChangeAddress={onChangeAddress}
						onChangeDeatilAddress={onChangeDeatilAddress}
						onPressSearchAddr={goToAddressSearch}
					/>
				</View>
				<View style={[temp_style.input24A_applyCompanionA, applyCompanionA.input24A]}>
					<Input24
						title={'연락처'}
						keyboardType={'number-pad'}
						value={data.protect_act_phone_number || ''}
						width={654}
						alert_msg={'전화번호는 - 을 제외하고 10~11자로 작성해주세요'}
						showMsg
						confirm_msg={'올바른 전화번호 양식입니다.'}
						onChange={onChangePhoneNum}
						onValid={onValidPhoneNum}
						validator={phoneValidate}
						descriptionType={'star'}
						placeholder={'연락처를 입력해주세요.'}
						showCrossMark={false}
					/>

					{/* <InputWithSelect
						onChange={onChangePhoneNum}
						validator={phoneValidate}
						keyboardType={'number-pad'}
						title={'연락처'}
						title_star={true}
						items={mobile_carrier}
						width={360}
						placeholder={'연락처를 입력해주세요.'}
					/> */}
				</View>
			</View>
			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, applyCompanionA.btn_w654]}>
				<AniButton
					btnTitle={'확인'}
					disable={data.protect_act_address.brief != '' && phoneNumFormCheck ? false : true}
					titleFontStyle={40}
					btnLayout={btn_w654}
					onPress={goToNextStep}
				/>
			</View>
		</View>
	);
};
