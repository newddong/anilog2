import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {login_style, temp_style, editShelterInfo, btn_style, assignPetInfo_style} from './style_templete';
import AddressInput from '../organism_ksw/AddressInput';
import Input30 from '../molecules/Input30';
import InputWithEmail from '../molecules/InputWithEmail';
import DatePicker from '../molecules/DatePicker';
import {COMPLETE_MODIFY, EMAIL_DOMAIN} from 'Root/i18n/msg';
import {btn_w654} from '../atom/btn/btn_style';
import AniButton from '../molecules/AniButton';
import {GRAY10} from 'Root/config/color';
import moment from 'moment';
import Modal from '../modal/Modal';
import {updateShelterDetailInformation} from 'Root/api/userapi';

export default EditShelterInfo = ({route, navigation}) => {
	const [data, setData] = React.useState(route.params.data);
	// console.log('dataEmail  : ', data.user_email);
	const isDirectInput = !EMAIL_DOMAIN.some(e => e == data.user_email.split('@')[1]);
	// console.log('isDirectInput', isDirectInput);

	React.useEffect(() => {
		if (route.params.addr) {
			console.log('route.params.Address Changed?   ', route.params.addr);
			const addr = route.params.addr;
			setData({
				...data,
				shelter_address: {
					brief: addr.siNm + ' ' + addr.sggNm + ' ' + addr.rn + ' ' + addr.buldMnnm,
					detail: addr.detailAddr,
					city: addr.siNm,
					district: addr.sggNm + ' ' + addr.emdNm + ' ' + addr.lnbrMnnm + '-' + addr.lnbrSlno,
					neighbor: '',
				},
			});
		}
	}, [route.params?.addr]);

	//보호소 이름 변경 콜백
	const onChangeShelterName = name => {
		setData({...data, shelter_name: name});
	};

	//주소찾기 클릭
	const onPressSearchAddr = () => {
		navigation.push('AddressSearch', {addr: data.shelter_address ? data.shelter_address : '', from: route.name});
	};

	const onChangeDeatilAddress = detail => {
		let copy = {...data.shelter_address};
		copy.detail = detail;
		setData({...data, shelter_address: copy});
	};

	//전화번호 변경 콜백
	const onChangeContact = num => {
		setData({...data, shelter_delegate_contact_number: num});
	};

	//홈페이지 인풋 값 변경 콜백
	const onChangeHomePage = hp => {
		setData({...data, shelter_homepage: hp});
	};

	//설렙일 변경 콜백
	const onChangeDate = date => {
		setData({...data, shelter_foundation_date: date});
	};

	//보호소 네임 Validation
	const shelterNameValidator = text => {
		// ('* 2자 이상 15자 이내의 영문,숫자, _ 의 입력만 가능합니다.');
		// console.log('text', text);
		var regExp2 = /^[가-힣a-zA-Z\s]{3,15}$/;
		return regExp2.test(data.shelter_name);
	};

	//이메일 도메인 드롭다운 설정 콜백
	const onSelectDomain = (item, index) => {
		console.log('item', item);
		console.log('item', index);
	};

	//이메일 주소 변경 콜백
	const onChangeEmail = email => {
		console.log('email / EditShelterInfo ', email);
		setData({...data, user_email: email});
	};

	const onClearHomepage = () => {
		setData({...data, shelter_homepage: ''});
	};

	// 설립일 Parsing(Date to String & String to Date) 함수
	const getFoundationDate = () => {
		let date = data.shelter_foundation_date;
		if (date == null) {
			return '';
		} else if (date.length < 15) {
			return date;
		} else {
			date = moment(date).format('YYYY-MM-DD');
			return date;
		}
	};

	//수정 완료 클릭
	const finalized = () => {
		console.log('email', data.user_email);

		Modal.popTwoBtn(
			'정말 보호소 정보를 수정하시겠습니까?',
			'아니오',
			'예',
			() => Modal.close(),
			() => {
				let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
				let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
				const regexPhone = regPhone.test(data.shelter_delegate_contact_number);
				const regexEmail = regEmail.test(data.user_email);
				console.log('regexEmail', regexEmail);
				console.log('regexPhone', regexPhone);
				if (regexEmail && regexPhone) {
					// console.log('Test', data);
					updateShelterDetailInformation(
						{
							userobject_id: data._id,
							shelter_name: data.shelter_name,
							shelter_address: data.shelter_address,
							shelter_delegate_contact_number: data.shelter_delegate_contact_number,
							user_email: data.user_email,
							shelter_homepage: data.shelter_homepage,
							shelter_foundation_date: data.shelter_foundation_date,
						},
						result => {
							// console.log('result / updateShelterDetail / EditShelterInfo   :  ', result);
							Modal.close();
						},
						err => {
							console.log('err / updateShelterInfo  EditShelterInfo  : ', err);
							Modal.close();
						},
					);
					navigation.navigate('ShelterInfoSetting');
				} else if (!regexEmail || !regexPhone) {
					console.log('eeee');
					Modal.close();
					setTimeout(() => {
						Modal.popOneBtn('이메일 혹은 전화번호를 \n 다시 확인해주세요.', '확인', () => Modal.close());
					}, 500);
				} else {
				}
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, editShelterInfo.container]}>
			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
				<View style={[editShelterInfo.shelterInfoForm]}>
					{/* 보호소 이름 */}
					<View style={[editShelterInfo.input30WithMsg]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>보호소 </Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<Input30
								value={data.shelter_name}
								defaultValue={data.shelter_name}
								showTitle={false}
								width={520}
								showmsg={false}
								confirm_msg={'사용 가능한 보호소명입니다.'}
								alert_msg={'사용 불가능한 보호소 이름입니다.'}
								placeholder={'보호소 이름을 입력해 주세요.'}
								confirm={shelterNameValidator}
								validator={shelterNameValidator}
								onChange={onChangeShelterName}
							/>
						</View>
					</View>
					{/* 나의 지역 */}
					<View style={[editShelterInfo.addressInput]}>
						<AddressInput
							onChangeDeatilAddress={onChangeDeatilAddress}
							width={654}
							title={'나의 지역'}
							address={data.shelter_address.brief}
							detailAddress={data.shelter_address.detail}
							onPressSearchAddr={onPressSearchAddr}
						/>
					</View>
					{/* 전ㄴ화번호 */}
					<View style={[editShelterInfo.inputCont]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>전화번호</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<Input30
								value={data.shelter_delegate_contact_number}
								defaultValue={data.shelter_delegate_contact_number}
								showTitle={false}
								showmsg={false}
								confirm={true}
								width={520}
								placeholder={'전화번호를 기재해주세요.'}
								onChange={onChangeContact}
							/>
						</View>
					</View>
					{/* 이메일 단위 */}
					<View style={[editShelterInfo.inputEmail]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.emailText]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>이메일</Text>
							</View>
						</View>
						<View style={[editShelterInfo.inputWithEmail]}>
							<InputWithEmail
								value={data.user_email}
								onSelectDropDown={onSelectDomain}
								onChange={onChangeEmail}
								defaultValue={data.user_email}
								width={240}
								placeholder={'이메일을 입력'}
							/>
						</View>
					</View>
					{/* 홈페이지 */}
					<View style={[editShelterInfo.inputCont]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>홈페이지</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<Input30
								value={data.shelter_homepage || ''}
								defaultValue={data.shelter_homepage || ''}
								placeholder={'홈페이지 입력'}
								showTitle={false}
								showmsg={false}
								width={520}
								onClear={onClearHomepage}
								confirm={true}
								onChange={onChangeHomePage}
							/>
						</View>
					</View>
					{/* 설립일 */}
					<View style={[editShelterInfo.inputCont]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>설립일</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<DatePicker width={530} onDateChange={onChangeDate} defaultDate={getFoundationDate()} future={false} />
						</View>
					</View>
				</View>

				<View style={[editShelterInfo.btn_w654]}>
					<AniButton btnLayout={btn_w654} btnTitle={COMPLETE_MODIFY} titleFontStyle={32} onPress={finalized} />
				</View>
			</ScrollView>
		</View>
	);
};
