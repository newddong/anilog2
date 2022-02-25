import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import DatePicker from 'Molecules/select/DatePicker';
import {login_style, btn_style, temp_style, userInfoDetailSettting_style} from '../style_templete';
import InterestTagList from 'Organism/list/InterestTagList';
import {GENDER_TAB_SELECT, INPUT_PHONE_NUM, INTEREST_ACT, INTEREST_REGION, mobile_carrier} from 'Root/i18n/msg';
import Modal from 'Component/modal/Modal';
import Input24 from 'Molecules/input/Input24';
import {getAddressList} from 'Root/api/address';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import InputWithSelect from 'Root/component/molecules/input/InputWithSelect';
import SelectInput from 'Root/component/molecules/button/SelectInput';
import {getInterestsList} from 'Root/api/interestsapi';
export default UserInfoDetailSettting = ({route, navigation}) => {
	const debug = false;
	// console.log('UserInfoDetailSetting route.params : ', route.params);
	// console.log('UserInfoDetailSetting route.params : ', route.params.data.user_interests);
	const [data, setData] = React.useState(route.params); //기존 유저의 데이터가 담겨있음
	const [loaded, setLoaded] = React.useState(false);
	const [addrSearched, setAddrSearched] = React.useState(false);
	const [locationInterest, setLocationInterest] = React.useState(route.params.user_interests.interests_location);

	const [contentInterest, setContentInterest] = React.useState([]);
	const [interestList, setInterestList] = React.useState();
	const [interestLoaded, setInterestLoaded] = React.useState(false);
	const [contentSendObejct, setContentSendObject] = React.useState({});

	// 갱신되는 데이터는 Header에도 Json형태로 전해짐
	// React.useEffect(() => {
	// 	navigation.setParams({data: data, route_name: route.name});
	// 	// console.log('user_mobile_company', data.user_mobile_company);
	// }, [data]);
	React.useEffect(() => {
		console.log('interset', locationInterest, contentInterest);
	}, [locationInterest, contentInterest]);
	React.useEffect(() => {
		navigation.setParams({data: route.params, route_name: route.name});
    
		var temp = [];
		console.log('ahhh', route.params.user_interests);

		getInterestsList({}, interests => {
			setInterestList(interests.msg);
			setInterestLoaded(true);
		});
		const getContentInteres = Object.entries(route.params.user_interests).map(content => {
			console.log('ohhh', content);

			if (content[0] != 'interests_location') {
				Object.entries(content[1]).map(contents => {
					console.log('contents', contents[1]);
					temp.push(contents[1]);
				});
			}
			setContentInterest(temp);
		});
		setLoaded(true);
	}, []);

	React.useEffect(() => {
		console.log('interset', locationInterest, contentInterest);

		setData({
			...data,
			user_interests: {...data.user_interests, interests_location: locationInterest, interests_contetn: contentInterest},
		});
		// setData({...data, user_address: {...data.user_address, city: selected, district: districts.msg[0]}});
		if (interestLoaded) {
			for (var props of contentInterest) {
				const getKey = Object.entries(interestList[0]).map(content => {
					// console.log('hihihi', content[1], props);

					if (content[1].includes(props)) {
						console.log('hohohoho', props, content[0]);
						// setContentSendObject((contentSendObejct[content[0]] = props));
					}
					console.log('content', contentSendObejct);
				});
			}
		}

		console.log('setData', data);
	}, [locationInterest, contentInterest]);

	function getKeyByValue(object, value) {
		// console.log(Object.keys(object).find(key => object[key] == value));
		return Object.keys(object).find(key => object[key] == value);
	}
	React.useEffect(() => {
		// if (route.params != null) {
		// 	if (route.params.addr && !addrSearched) {
		// 		// console.log('route.params.Address Changed?   ', route.params.addr);
		// 		const addr = route.params.addr;
		// 		setData({
		// 			...data,
		// 			user_address: {city: addr.siNm, district: addr.sggNm, neighbor: addr.emdNm, brief: addr.roadAddr, detail: addr.detailAddr},
		// 		});
		// 		setAddrSearched(true);
		// 	}
		// }
	}, [route.params]);

	React.useEffect(() => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg), handleError;
			},
			err => Modal.alert(err),
		);
		getAddressList(
			{city: data.user_address?.city},
			districts => {
				setDistrict(districts.msg), handleError;
			},
			err => Modal.alert(err),
		);
		getAddressList(
			{city: data.user_address?.city, district: data.user_address?.district},
			neighbors => {
				setNeighbor(neighbors.msg), handleError;
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
		// debug && console.log('city:', city[i]);
		Modal.popSelectScrollBoxModal(
			[city],
			'광역시,도 선택',
			selected => {
				// setData({...data, user_address: {...data.user_address, city: selected}});
				getAddressList(
					{city: selected},
					districts => {
						setDistrict(districts.msg);
						debug && console.log('districts:', districts);
						setData({...data, user_address: {...data.user_address, city: selected, district: districts.msg[0]}});

						Modal.close();
					},
					handleError,
				);
			},
			() => Modal.close(),
		);
	};

	const onSelectDistrict = () => {
		Modal.popSelectScrollBoxModal(
			[district],
			'광역시,도 선택',
			selected => {
				getAddressList(
					{city: data.user_address.city, district: selected},
					neighbor => {
						setNeighbor(neighbor.msg);
						setData({...data, user_address: {...data.user_address, city: data.user_address.city, district: selected, neighbor: neighbor.msg[0]}});
						debug && console.log('neighbors:', neighbor);
						Modal.close();
					},
					handleError,
				);
			},
			() => Modal.close(),
		);
	};

	const onSelectNeighbor = (v, i) => {
		Modal.popSelectScrollBoxModal(
			[neighbor],
			'광역시,도 선택',
			selected => {
				setData({...data, user_address: {...data.user_address, neighbor: selected}});
				Modal.close();
			},
			() => Modal.close(),
		);
	};

	// const onPressSearchAddress = () => {
	// 	setAddrSearched(false);
	// 	navigation.push('AddressSearch', {addr: data.user_address.brief, from: route.name});
	// };

	//생일 값 변경 콜백
	// const onDateChange = date => {
	// 	setData({...data, user_birthday: date});
	// };

	const onSelectGender = index => {
		console.log('OnSelectGender', index);
		index == 0 ? setData({...data, user_sex: 'male'}) : setData({...data, user_sex: 'female'});
	};

	const onChangePhoneNum = num => {
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
		// let copy = data.user_interests.location;
		let copy = locationInterest;
		copy.splice(index, 1);
		setData({
			...data,
			user_interests: {
				location: copy,
			},
		});
	};

	//관심활동 태그 X마크 삭제 클릭
	const onDeleteInterestAct = index => {
		// let copy = data.user_interests.activity;
		let copy = contentInterest;
		copy.splice(index, 1);
		console.log('copy', copy);
		setContentInterest(copy);
		// setData({
		// 	...data,
		// 	user_interests: {
		// 		location: data.user_interests.location,
		// 		activity: copy,
		// 	},
		// });
	};

	const onPressAddInterestActivation = () => {
		console.log(contentInterest);
		Modal.popInterestTagModal(
			true,
			// route.params.user_interests,
			contentInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setContentInterest,
		);
	};

	const onPressAddInterestLocation = () => {
		Modal.popInterestTagModal(
			false,
			// route.params.user_interests,
			locationInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setLocationInterest,
		);
		// setData(prevState => ({
		// 	...prevState,
		// 	user_interests: interest,
		// }));
		console.log('next State', data);
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
							</View>
						</View>
						{/* 나의 지역 */}
						<View style={[temp_style.addressInput]}>
							<Text style={[txt.noto28, {color: GRAY10}]}>나의 지역</Text>
							<View style={[userInfoDetailSettting_style.adressSelect]}>
								<SelectInput onPressInput={onSelectCity} width={210} value={data.user_address.city} />
								<SelectInput onPressInput={onSelectDistrict} width={210} fontSize={28} value={data.user_address.district} />
								<SelectInput onPressInput={onSelectNeighbor} width={210} value={data.user_address.neighbor} />
							</View>
						</View>
						{/* 관심지역 및 활동 */}
						<View style={[userInfoDetailSettting_style.tagListContainer]}>
							<View style={[userInfoDetailSettting_style.interestTagList]}>
								<InterestTagList
									onPressAddBtn={onPressAddInterestLocation}
									title={INTEREST_REGION}
									// items={data.user_interests.location || []}
									items={locationInterest || []}
									onDelete={onDeleteInterestRegion}
								/>
							</View>
							<View style={[userInfoDetailSettting_style.interestTagList]}>
								<InterestTagList
									onPressAddBtn={onPressAddInterestActivation}
									title={INTEREST_ACT}
									items={contentInterest || []}
									onDelete={onDeleteInterestAct}
								/>
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
