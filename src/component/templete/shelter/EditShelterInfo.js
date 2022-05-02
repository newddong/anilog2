import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {login_style, temp_style, editShelterInfo, btn_style, assignPetInfo_style} from 'Templete/style_templete';
import AddressInput from 'Organism/input/AddressInput';
import Input30 from 'Molecules/input/Input30';
import InputWithEmail from 'Molecules/input/InputWithEmail';
import DatePicker from 'Molecules/select/DatePicker';
import {COMPLETE_MODIFY, EMAIL_DOMAIN, NICKNAME_FORM, PHONE_FORM} from 'Root/i18n/msg';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import {GRAY10} from 'Root/config/color';
import moment from 'moment';
import Modal from 'Component/modal/Modal';
import {updateShelterDetailInformation} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import {useNavigation} from '@react-navigation/native';
import Input24 from 'Root/component/molecules/input/Input24';

export default EditShelterInfo = ({route, navigation}) => {
	const [data, setData] = React.useState(route.params.data);
	// console.log('dataEmail  : ', data);
	// console.log('data phone', data.shelter_delegate_contact_number);
	const isDirectInput = !EMAIL_DOMAIN.some(e => e == data.user_email.split('@')[1]);
	const nickRef = React.useRef();
	console.log(route.params.data);
	React.useEffect(() => {
		if (route.params.addr) {
			console.log('route.params.Address Changed?   ', route.params.addr);
			const addr = route.params.addr;
			setData({
				...data,
				shelter_address: {
					brief: addr.address,
					detail: addr.detailAddr,
				},
			});
		}
	}, [route.params?.addr]);

	//보호소 이름 변경 콜백
	const onChangeShelterName = name => {
		setData({...data, user_nickname: name});
	};

	//주소찾기 클릭
	const onPressSearchAddr = () => {
		navigation.push('AddressSearchPage', {prevRoute: route.name});
		// navigation.push('AddressSearch', {addr: data.shelter_address ? data.shelter_address : '', from: route.name});
	};

	//세부 주소 변경
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

	let regNick = /^[가-힣a-zA-Z0-9_]{2,20}$/;
	let regPhone = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	let regHomePhone = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/;
	//보호소 네임 Validation
	const shelterNameValidator = text => {
		return regNick.test(text);
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

	const phoneValidate = num => {
		// console.log('num', num);
		return regPhone.test(num) || regHomePhone.test(num);
	};

	//수정 완료 클릭
	const finalized = () => {
		let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		const regexPhone = regPhone.test(data.shelter_delegate_contact_number) || regHomePhone.test(data.shelter_delegate_contact_number);
		const regexEmail = regEmail.test(data.user_email);
		const regexNick = regNick.test(data.user_nickname);
		if (regexEmail && regexPhone && regexNick) {
			Modal.popTwoBtn(
				'정말 보호소 정보를 수정하시겠습니까?',
				'아니오',
				'예',
				() => Modal.close(),
				() => {
					updateShelterDetailInformation(
						{
							userobject_id: data._id,
							user_nickname: data.user_nickname,
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
					// navigation.navigate('ShelterInfoSetting');
					navigation.goBack();
				},
			);
		} else if (!regexEmail || !regexPhone) {
			Modal.close();
			setTimeout(() => {
				Modal.popOneBtn('이메일 혹은 전화번호를 \n 다시 확인해주세요.', '확인', () => Modal.close());
			}, 150);
		} else if (!regexNick) {
			Modal.close();
			setTimeout(() => {
				Modal.popOneBtn('보호소 닉네임 양식을 \n 확인해주세요.', '확인', () => {
					Modal.close();
					nickRef.current.focus();
				});
			}, 150);
		}
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'position'} contentContainerStyle={{alignItems: 'center'}}>
			<View style={[editShelterInfo.shelterInfoForm]}>
				<ScrollView>
					{/* 보호소 이름 */}
					<View style={[editShelterInfo.input30WithMsg]}>
						<View style={[editShelterInfo.category, {width: null}]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>보호소 이름</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30, {}]}>
							<Input24
								value={data.user_nickname}
								defaultValue={data.user_nickname}
								width={500}
								maxlength={20}
								showMsg
								showCrossMark={false}
								confirm_msg={'사용 가능한 보호소명입니다.'}
								alert_msg={NICKNAME_FORM}
								placeholder={'보호소 이름을 입력해 주세요.'}
								confirm={shelterNameValidator}
								validator={shelterNameValidator}
								onChange={onChangeShelterName}
								ref={nickRef}
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
					{/* 전화번호 */}
					<View style={[editShelterInfo.inputCont, {marginTop: 50 * DP}]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>전화번호</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							{/* <Input30
								value={data.shelter_delegate_contact_number}
								defaultValue={data.shelter_delegate_contact_number}
								showTitle={false}
								showmsg={false}
								validator={phoneValidate}
								keyboardType={'numeric'}
								width={520}
								placeholder={'전화번호를 기재해주세요.'}
								onChange={onChangeContact}
							/> */}
							<Input24
								value={data.shelter_delegate_contact_number}
								defaultValue={data.shelter_delegate_contact_number}
								keyboardType={'number-pad'}
								width={500}
								alert_msg={PHONE_FORM}
								showMsg
								confirm_msg={'올바른 전화번호 양식입니다.'}
								onChange={onChangeContact}
								validator={phoneValidate}
								descriptionType={'star'}
								placeholder={'전화번호를 기재해주세요.'}
								showCrossMark={false}
							/>
						</View>
					</View>
					{/* 이메일 */}
					<View style={[editShelterInfo.inputEmail, {marginTop: 50 * DP}]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.emailText]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>이메일</Text>
							</View>
						</View>
						<View style={[editShelterInfo.inputWithEmail]}>
							<InputWithEmail
								value={data.user_email}
								onSelectDropDown={onSelectDomain}
								onChange={onChangeEmail}
								defaultValue={data.user_email}
								width={200}
								placeholder={'이메일을 입력'}
							/>
						</View>
					</View>
					{/* 홈페이지 */}
					<View style={[editShelterInfo.inputCont, {marginTop: 50 * DP}]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>홈페이지</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<Input24
								value={data.shelter_homepage || ''}
								defaultValue={data.shelter_homepage || ''}
								placeholder={'홈페이지 입력'}
								showMsg={false}
								showCrossMark={false}
								width={500}
								onClear={onClearHomepage}
								maxLength={80}
								confirm={true}
								validator={txt => {
									return txt != '';
								}}
								onChange={onChangeHomePage}
							/>
						</View>
					</View>
					{/* 설립일 */}
					<View style={[editShelterInfo.inputCont, {marginTop: 50 * DP}]}>
						<View style={[editShelterInfo.category]}>
							<View style={[editShelterInfo.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>설립일</Text>
							</View>
						</View>
						<View style={[editShelterInfo.input30]}>
							<DatePicker width={500} onDateChange={onChangeDate} defaultDate={getFoundationDate()} future={false} />
						</View>
					</View>
				</ScrollView>
			</View>

			<View style={[editShelterInfo.btn_w654, {marginTop: 110 * DP}]}>
				<AniButton btnLayout={btn_w654} btnStyle={'border'} btnTitle={COMPLETE_MODIFY} titleFontStyle={32} onPress={finalized} />
			</View>
		</KeyboardAvoidingView>
	);
};
