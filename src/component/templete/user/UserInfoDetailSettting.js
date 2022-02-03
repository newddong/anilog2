import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import DatePicker from 'Molecules/select/DatePicker';
import {login_style, btn_style, temp_style, userInfoDetailSettting_style} from 'Templete/style_templete';
import InterestTagList from 'Organism/list/InterestTagList';
import {GENDER_TAB_SELECT, INPUT_PHONE_NUM, INTEREST_ACT, INTEREST_REGION, mobile_carrier} from 'Root/i18n/msg';
import Modal from 'Component/modal/Modal';
import Input24 from 'Molecules/input/Input24';
import {getAddressList} from 'Root/api/address';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';

export default UserInfoDetailSettting = ({route, navigation}) => {
	const debug = false;
	// console.log('UserInfoDetailSetting route.params : ', route.params);
	// console.log('UserInfoDetailSetting route.params : ', route.params.data.user_interests);
	const [data, setData] = React.useState(route.params); //기존 유저의 데이터가 담겨있음
	const [loaded, setLoaded] = React.useState(false);
	const [addrSearched, setAddrSearched] = React.useState(false);
	// 갱신되는 데이터는 Header에도 Json형태로 전해짐
	// React.useEffect(() => {
	// 	navigation.setParams({data: data, route_name: route.name});
	// 	// console.log('user_mobile_company', data.user_mobile_company);
	// }, [data]);

	React.useEffect(() => {
		navigation.setParams({data: route.params, route_name: route.name});
		console.log('route', data);
		const t = {
			__v: 2,
			_id: '61d2de63c0f179ccd5ba5887',
			is_follow: false,
			pet_family: [],
			type: 'UserObject',
			user_address: {city: '서울특별시', district: '마포구', neighbor: '신수동'},
			user_agreement: {
				is_donation_info: true,
				is_location_service_info: true,
				is_marketting_info: true,
				is_over_fourteen: true,
				is_personal_info: true,
				is_service: true,
			},
			user_denied: false,
			user_follow_count: 5,
			user_follower_count: 3,
			user_interests: [],
			user_introduction: 'Dkd		Dkdk',
			user_is_verified_email: false,
			user_is_verified_phone_number: true,
			user_mobile_company: 'SK텔레콤',
			user_my_pets: [
				{
					__v: 2,
					_id: '61d2de8ac0f179ccd5ba58a6',
					pet_birthday: '2022-01-03T00:00:00.000Z',
					pet_family: [Array],
					pet_is_temp_protection: false,
					pet_neutralization: 'no',
					pet_sex: 'male',
					pet_species: '개',
					pet_species_detail: '코커스패니얼',
					pet_status: 'companion',
					pet_weight: '4',
					type: 'UserObject',
					user_agreement: [Object],
					user_denied: false,
					user_follow_count: 0,
					user_follower_count: 1,
					user_interests: [Array],
					user_introduction: '',
					user_is_verified_email: false,
					user_is_verified_phone_number: false,
					user_my_pets: [Array],
					user_nickname: '길동이',
					user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209482105_A3B92DE3-4536-43F5-B8A9-94355C099318.jpg',
					user_register_date: '2022-01-03T11:31:22.210Z',
					user_type: 'pet',
					user_upload_count: 0,
				},
				{
					__v: 0,
					_id: '61d2ff57c0f179ccd5ba6e72',
					pet_birthday: '2021-03-03T00:00:00.000Z',
					pet_family: [Array],
					pet_is_temp_protection: true,
					pet_neutralization: 'unknown',
					pet_sex: 'female',
					pet_species: '고양이',
					pet_species_detail: '브리티시 숏헤어',
					pet_status: 'protect',
					pet_weight: '2',
					type: 'UserObject',
					user_agreement: [Object],
					user_denied: false,
					user_follow_count: 0,
					user_follower_count: 0,
					user_interests: [Array],
					user_introduction: '',
					user_is_verified_email: false,
					user_is_verified_phone_number: false,
					user_my_pets: [Array],
					user_nickname: '기스',
					user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641217879453_1d4f1cf2-f720-4377-9f14-4b9f513317f7.jpg',
					user_register_date: '2022-01-03T13:51:19.661Z',
					user_type: 'pet',
					user_upload_count: 0,
				},
			],
			user_name: '권상우',
			user_nickname: '권상우',
			user_password: 'tkddn123',
			user_phone_number: '01096450422',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
			user_register_date: '2022-01-03T11:30:43.310Z',
			user_type: 'user',
			user_upload_count: 4,
		};
		setLoaded(true);
	}, []);

	React.useEffect(() => {
		if (route.params != null) {
			if (route.params.addr && !addrSearched) {
				console.log('route.params.Address Changed?   ', route.params.addr);
				const addr = route.params.addr;
				setData({
					...data,
					user_address: {city: addr.siNm, district: addr.sggNm, neighbor: addr.emdNm, brief: addr.roadAddr, detail: addr.detailAddr},
				});
				setAddrSearched(true);
			}
		}
	}, [route.params]);

	React.useEffect(() => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg), handleError;
			},
			err => Modal.alert(err),
		);
	}, []);

	const handleError = error => {
		Modal.popOneBtn(error, '확인', () => Modal.close());
	};

	const [city, setCity] = React.useState([data.user_address.city]);
	const [district, setDistrict] = React.useState([data.user_address.district]);
	const [neighbor, setNeighbor] = React.useState([data.user_address.neighbor]);

	const onSelectCity = (v, i) => {
		debug && console.log('city:', city[i]);
		setData({...data, user_address: {...data.user_address, city: city[i]}});
		getAddressList(
			{city: city[i]},
			districts => {
				setDistrict(districts.msg);
				debug && console.log('districts:', districts);
			},
			handleError,
		);
	};

	const onSelectDistrict = (v, i) => {
		debug && console.log('district:', district[i]);
		setData({...data, user_address: {...data.user_address, district: district[i]}});
		getAddressList(
			{city: data.user_address.city, district: district[i]},
			neighbor => {
				setNeighbor(neighbor.msg);
				debug && console.log('neighbors:', neighbor);
			},
			handleError,
		);
	};

	const onSelectNeighbor = (v, i) => {
		debug && console.log('neighbor:', neighbor[i]);
		setData({...data, user_address: {...data.user_address, neighbor: neighbor[i]}});
	};

	const onPressSearchAddress = () => {
		setAddrSearched(false);

		navigation.push('AddressSearch', {addr: data.user_address.brief, from: route.name});
	};

	//생일 값 변경 콜백
	const onDateChange = date => {
		setData({...data, user_birthday: date});
	};

	//통신사 드롭다운 선택 콜백
	const onSelectMobileCompany = (v, i) => {
		console.log('이동통신사ㅏㅏ', v);
		setData({...data, user_mobile_company: v});
	};

	const onSelectGender = index => {
		console.log('OnSelectGender', index);
		index == 0 ? setData({...data, user_sex: 'male'}) : setData({...data, user_sex: 'female'});
	};

	const onChangePhoneNum = num => {
		// console.log('splited', num.split(' '));
		// let phone_number = num.slice(-11); //num의 인자값이 통신사와 같이 넘어와서 처리
		// let phone_company = num.slice(0, -11); //통신사 처리
		// console.log('전화 번호값', num.slice(-11, num.length));
		setData({...data, user_phone_number: num});
		// setData({...data, user_mobile_company: phone_company});
	};

	const phoneValidate = num => {
		// console.log('num', num);
		let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		if (regPhone.test(num) === true) {
			console.log('입력된 값은 휴대전화번호입니다.');
		}
		return regPhone.test(num);
	};

	//관심지역 태그 X마크 삭제클릭
	const onDeleteInterestRegion = index => {
		let copy = data.user_interests.location;
		copy.splice(index, 1);
		setData({
			...data,
			user_interests: {
				location: copy,
				activity: data.user_interests.activity,
			},
		});
	};

	//관심활동 태그 X마크 삭제 클릭
	const onDeleteInterestAct = index => {
		let copy = data.user_interests.activity;
		copy.splice(index, 1);
		setData({
			...data,
			user_interests: {
				location: data.user_interests.location,
				activity: copy,
			},
		});
	};

	//유저의 통신사 정보와 일치하도록 DropDown의 디폴트 값을 적용
	const getDefault = () => {
		const found = mobile_carrier.findIndex(e => e == data.user_mobile_company);
		return found;
	};
	if (loaded) {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView contentContainerStyle={{flex: 1}}>
					<View style={[temp_style.inputForm_userInfoDetailSettting, userInfoDetailSettting_style.inputForm]}>
						{/* 성별 */}
						<View style={[userInfoDetailSettting_style.inputForm_detail]}>
							<View style={[temp_style.text_userInfoDetailSettting, userInfoDetailSettting_style.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>성별</Text>
							</View>
							<View style={[temp_style.tabSelectFilled_Type1]}>
								<TabSelectFilled_Type1
									items={GENDER_TAB_SELECT}
									width={500}
									onSelect={onSelectGender}
									defaultIndex={data.user_sex == 'male' ? 0 : 1}
								/>
							</View>
						</View>
						{/* 생일 */}
						<View style={[userInfoDetailSettting_style.inputForm_detail]}>
							<View style={[temp_style.text_userInfoDetailSettting, userInfoDetailSettting_style.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>생일</Text>
							</View>
							<View style={[temp_style.tabSelectFilled_Type1]}>
								<DatePicker onDateChange={date => onDateChange(date)} defaultDate={data.user_birthday} future={false} />
							</View>
						</View>
						{/* 전화번호 */}
						<View style={[userInfoDetailSettting_style.inputWithSelect]}>
							<View style={[temp_style.text_userInfoDetailSettting, userInfoDetailSettting_style.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>전화번호</Text>
							</View>
							<View style={[userInfoDetailSettting_style.phone_num_input, {}]}>
								<Input24
									value={data.user_phone_number}
									width={654}
									onChange={onChangePhoneNum}
									descriptionType={'none'}
									validator={phoneValidate}
									placeholder={'연락처를 입력해주세요.'}
									showCrossMark={false}
									keyboardType={'number-pad'}
								/>
								{/* <InputWithSelect
									onChange={onChangePhoneNum}
									onSelectDropDown={onSelectMobileCompany}
									items={mobile_carrier}
									placeholder={INPUT_PHONE_NUM}
									width={300}
									defaultValue={data.user_phone_number || ''}
									defaultIndex={getDefault()}
									defaultInput={data.user_phone_number || ''}
								/> */}
							</View>
						</View>
						{/* 나의 지역 */}
						<View style={[temp_style.addressInput]}>
							<Text style={[txt.noto28, {color: GRAY10}]}>나의 지역</Text>
							<View style={[userInfoDetailSettting_style.adressSelect]}>
								<NormalDropDown menu={city} width={210} height={500} onSelect={onSelectCity} defaultIndex={0} />
								<NormalDropDown menu={district} width={210} height={500} onSelect={onSelectDistrict} defaultIndex={0} />
								<NormalDropDown menu={neighbor} width={210} height={500} onSelect={onSelectNeighbor} defaultIndex={0} />
							</View>

							{/* <AddressInput
								title={'나의 지역'}
								// address={data.user_address.brief ? data.user_address.brief : '없음'}
								// detailAddress={data.user_address.detail ? data.user_address.detail : '없음'}
								onChangeAddress={onChangeAddress}
								onChangeDeatilAddress={onChangeDeatilAddress}
								onPressSearchAddr={onPressSearchAddress}
								// addressDefault={data ? data.user_address.city + '  ' + data.user_address.district : ''}
								// addressDefault={data.user_address.brief ? data.user_address.brief : '없음'}
								// detailAddressDefault={data ? data.user_address.neighbor : ''}
								// detailAddressDefault={data.user_address.detail ? data.user_address.detail : '없음'}
							/> */}
						</View>
						{/* 관심지역 및 활동 */}
						<View style={[userInfoDetailSettting_style.tagListContainer]}>
							<View style={[userInfoDetailSettting_style.interestTagList]}>
								<InterestTagList title={INTEREST_REGION} items={data.user_interests.location || []} onDelete={onDeleteInterestRegion} />
							</View>
							<View style={[userInfoDetailSettting_style.interestTagList]}>
								<InterestTagList title={INTEREST_ACT} items={data.user_interests.activity || []} onDelete={onDeleteInterestAct} />
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	} else {
		return <View></View>;
	}
};
