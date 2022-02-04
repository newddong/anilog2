import React from 'react';
import {Text, View, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {login_style, btn_style, temp_style, progressbar_style, assignShelterAddress_style} from 'Templete/style_templete';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Stagebar from 'Molecules/info/Stagebar';
import Input24 from 'Molecules/input/Input24';
import AddressInput from 'Organism/input/AddressInput';
import axios from 'axios';
import {stagebar_style} from 'Organism/style_organism';

export default AssignShelterAddress = props => {
	const [confirmed, setConfirmed] = React.useState(false); //주소란이 모두 작성되었다며 통과가능
	const [confirmName, setConfirmName] = React.useState(false); //이름 입력되었다면 통과가능
	const [data, setData] = React.useState({
		...props.route.params.data,
		shelter_name: '',
		shelter_address: {
			city: '', //
			district: '', //
			neighbor: '', //
			brief: '', //기본주소
			detail: '', //세부주소
		},
	});

	React.useEffect(() => {
		console.log('data', data.shelter_address);
	}, [data]);

	React.useEffect(() => {
		if (props.route.params.addr) {
			console.log('주소를 받아온다.', props.route.params.addr);
			let addr = props.route.params.addr;
			setData({
				...data,
				shelter_address: {
					brief: addr.jibunAddr,
					detail: addr.detailAddr,
				},
			});
		}
	}, [props.route.params.addr]);

	React.useEffect(() => {
		if (data.shelter_address.brief.length > 0 && data.shelter_address.detail != '' && data.shelter_name.length > 0) {
			setConfirmed(true);
		}
	}, [data]);

	//다음
	const goToNextStep = () => {
		props.navigation.push('AssignShelterInformation', {data: data});
	};

	//주소
	const onChangeAddress = addr => {
		setData({...data, shelter_address: {...data.shelter_address, brief: addr}});
	};

	//세부주소
	const onChangeDeatilAddress = addr => {
		setData({...data, shelter_address: {...data.shelter_address, detail: addr}});
	};

	//주소찾기 클릭
	const goToAddressSearch = () => {
		console.log('onPressSearchAddr');
		props.navigation.push('AddressSearch', {addr: '', from: props.route.name});
	};

	//보호소 이름
	const onChaneName = name => {
		setData({...data, shelter_name: name});
	};

	const nameValidator = name => {
		var regExp = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
		return regExp.test(name);
	};
	const onValidName = isValid => {
		setConfirmName(isValid);
	};

	const addressValidator = (addr, detailAddr) => {
		console.log('addressValidator', addr, detailAddr);
		// if (addr != undefined && detailAddr != undefined) {
		return addr != '' > 0 && detailAddr != '' > 0;
		// }
	};

	const onValidAddress = isValid => {
		console.log('onvalid', isValid);
		setConfirmed(isValid);
	};
	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'padding'}>
			{/* (M)StageBar	 */}
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={2} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
				/>
			</View>

			{/* InputForm */}
			<View style={[temp_style.input24A_assignShelterAddress, assignShelterAddress_style.input24A]}>
				<Input24
					title={'보호소 이름'}
					placeholder={'보호소 이름을 적어주세요'}
					descriptionType={'star'}
					onChange={onChaneName}
					value={data.shelter_name}
					validator={nameValidator}
					onValid={onValidName}
					showMsg
					width={654}
					confirm_msg={''}
					alert_msg={'유효한 보호소 이름을 입력하세요, 띄어쓰기는 허용되지 않습니다.'}
				/>
			</View>

			<View style={[temp_style.addressInput, assignShelterAddress_style.addressInput]}>
				<AddressInput
					title={'보호소 주소'}
					titleMode={'star'}
					titleColor={APRI10}
					onChangeAddress={onChangeAddress}
					onChangeDeatilAddress={onChangeDeatilAddress}
					address={data.shelter_address.brief}
					detailAddress={data.shelter_address.detail}
					onPressSearchAddr={goToAddressSearch}
				/>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, assignShelterAddress_style.btn_w654]}>
				<AniButton
					btnTitle={'다음'}
					btnTheme={'shadow'}
					disable={!confirmName || !confirmed}
					btnLayout={btn_w654}
					titleFontStyle={32}
					onPress={goToNextStep}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};
