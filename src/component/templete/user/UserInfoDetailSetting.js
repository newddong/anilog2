import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import {login_style, btn_style, temp_style} from '../style_templete';
import InterestTagList from 'Organism/list/InterestTagList';
import {GENDER_TAB_SELECT, INPUT_PHONE_NUM, INTEREST_ACT, INTEREST_REGION} from 'Root/i18n/msg';
import Modal from 'Component/modal/Modal';
import {getAddressList} from 'Root/api/address';
import SelectInput from 'Root/component/molecules/button/SelectInput';
import {getInterestsList} from 'Root/api/interestsapi';
import DP from 'Root/config/dp';
export default UserInfoDetailSetting = ({route, navigation}) => {
	const debug = false;
	const [data, setData] = React.useState(route.params); //기존 유저의 데이터가 담겨있음
	const [loaded, setLoaded] = React.useState(false);
	const [locationInterest, setLocationInterest] = React.useState([]);
	const [contentInterest, setContentInterest] = React.useState([]);
	const [interestList, setInterestList] = React.useState();
	const [interestLoaded, setInterestLoaded] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	let temp = [];
	// 갱신되는 데이터는 Header에도 Json형태로 전해짐
	React.useEffect(() => {
		navigation.setParams({data: data, route_name: route.name});
	}, [data]);

	React.useEffect(() => {
		navigation.setParams({data: route.params, route_name: route.name});
		getInterestsList({}, interests => {
			setInterestList();
			setInterestLoaded(true);
		});
		if (data.user_interests) {
			const getContentInteres = Object.entries(data.user_interests).map(content => {
				// console.log('ohhh', content);
				if (content[0] != 'interests_location' && content[0] != '_id') {
					Object.entries(content[1]).map(contents => {
						// console.log('contents', contents[1]);
						temp.push(contents[1]);
					});
				}
			});
		}
		setContentInterest(temp);
		setLocationInterest(data.user_interests.interests_location);
		setLoaded(true);
	}, []);

	//변경된 locationObject와 contentInterest를 저장형식에 맞게 파싱
	React.useEffect(() => {
		if (interestLoaded) {
			for (let props of contentInterest) {
				const getKey = Object.entries(interestList[0]).map(content => {
					// console.log('hihihi', content[1], props);

					if (content[1].includes(props)) {
						// console.log('hohohoho', props, content[0]);
						// setContentSendObject((contentSendObejct[content[0]] = props));
						if (temp[content[0]]) {
							temp[content[0]].push(props);
						} else {
							temp[content[0]] = [props];
						}

						console.log('temp', temp);
					}
				});
			}
			let locationObject = {interests_location: locationInterest};
			Object.assign(locationObject, temp);
			setData(prevState => ({
				...prevState,
				user_interests: locationObject,
			}));
		}
		// console.log('setData', data);
	}, [refresh, locationInterest, contentInterest]);

	function getKeyByValue(object, value) {
		// console.log(Object.keys(object).find(key => object[key] == value));
		return Object.keys(object).find(key => object[key] == value);
	}

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
						// console.log()
						debug && console.log('districts:', districts);
						setData({...data, user_address: {...data.user_address, city: selected, district: districts.msg[0], neighbor: '동/읍을 선택'}});
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
			'시,군,구를 선택',
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
			'동, 읍을 선택',
			selected => {
				setData({...data, user_address: {...data.user_address, neighbor: selected}});
				Modal.close();
			},
			() => Modal.close(),
		);
	};

	const onSelectGender = index => {
		console.log('OnSelectGender', index);
		index == 0 ? setData({...data, user_sex: 'male'}) : setData({...data, user_sex: 'female'});
	};

	const onChangePhoneNum = num => {
		setData({...data, user_phone_number: num});
		// setData({...data, user_mobile_company: phone_company});
	};

	//관심지역 태그 X마크 삭제클릭
	const onDeleteInterestRegion = index => {
		let copy = locationInterest;
		copy.splice(index, 1);
		setLocationInterest(copy);
		setRefresh(!refresh);
	};

	//관심활동 태그 X마크 삭제 클릭
	const onDeleteInterestAct = index => {
		let copy = contentInterest;
		copy.splice(index, 1);
		console.log('copy', copy);
		setContentInterest(copy);
		setRefresh(!refresh);
	};

	const onPressAddInterestActivation = () => {
		console.log(contentInterest);
		Modal.popInterestTagModal(
			'Activity',
			contentInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setContentInterest,
		);
	};

	const onPressAddInterestLocation = () => {
		Modal.popInterestTagModal(
			'Location',
			locationInterest || [],
			() => alert('저장'),
			() => Modal.close(),
			setLocationInterest,
		);
	};

	const getGender = () => {
		let result = 0;
		switch (data.user_sex) {
			case undefined:
				result = -1;
				break;
			case 'male':
				result = 0;
				break;
			case 'female':
				result = 1;
				break;
			default:
				break;
		}
		return result;
	};

	if (loaded) {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView contentContainerStyle={{flex: 1}}>
					<View style={[temp_style.inputForm_userInfoDetailSettting, userInfoDetailSetting_style.inputForm]}>
						{/* 성별 */}
						<View style={[userInfoDetailSetting_style.inputForm_detail]}>
							<View style={[temp_style.text_userInfoDetailSettting, userInfoDetailSetting_style.text]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>성별</Text>
							</View>
							<View style={[temp_style.tabSelectFilled_Type1]}>
								<TabSelectFilled_Type1 items={GENDER_TAB_SELECT} width={250} onSelect={onSelectGender} defaultIndex={getGender()} />
							</View>
						</View>

						{/* 나의 지역 */}
						<View style={[temp_style.addressInput]}>
							<Text style={[txt.noto28, {color: GRAY10}]}>나의 지역</Text>
							<View style={[userInfoDetailSetting_style.adressSelect]}>
								<SelectInput onPressInput={onSelectCity} width={320} value={data.user_address.city} />
								<SelectInput onPressInput={onSelectDistrict} width={320} value={data.user_address.district} />
							</View>
							<SelectInput onPressInput={onSelectNeighbor} width={654} defaultText={'동/읍을 선택'} value={data.user_address.neighbor} />
						</View>
						{/* 관심지역 및 활동 */}
						<View style={[userInfoDetailSetting_style.interestTagList]}>
							<InterestTagList
								onPressAddBtn={onPressAddInterestLocation}
								title={INTEREST_REGION}
								// items={data.user_interests.location || []}
								items={locationInterest || []}
								onDelete={onDeleteInterestRegion}
								extra={refresh}
							/>
						</View>
						<View style={[userInfoDetailSetting_style.interestTagList]}>
							<InterestTagList
								onPressAddBtn={onPressAddInterestActivation}
								title={INTEREST_ACT}
								items={contentInterest || []}
								onDelete={onDeleteInterestAct}
								extra={refresh}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	} else {
		return <View></View>;
	}
};

const userInfoDetailSetting_style = StyleSheet.create({
	inputForm: {
		marginTop: 60 * DP,
	},
	inputForm_detail: {
		flexDirection: 'row',
		marginBottom: 40 * DP,
	},
	text: {
		marginTop: 18 * DP,
		marginRight: 16 * DP,
	},
	inputWithSelect: {
		flexDirection: 'row',
		marginBottom: 52 * DP,
	},
	phone_num_input: {
		width: 520 * DP,
		bottom: 0 * DP,
		height: 80 * DP,
	},
	tagListContainer: {
		width: 654 * DP,
		marginTop: 50 * DP,
	},
	interestTagList: {
		width: 654 * DP,
	},
	adressSelect: {
		flexDirection: 'row',
		width: 654 * DP,
		alignItems: 'center',
		marginBottom: 20 * DP,
		justifyContent: 'space-between',
		backgroundColor: '#FFF',
	},
});
