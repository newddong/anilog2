import React from 'react';
import {Text, View, TextInput, Platform, NativeModules, AppState} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {btn_style, feedWrite, login_style, temp_style, buttonstyle} from 'Templete/style_templete';
import AniButton from 'Molecules/button/AniButton';
import {PHONE_FORM} from 'Root/i18n/msg';
import DatePicker from 'Molecules/select/DatePicker';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import Input24 from 'Molecules/input/Input24';
import InputBalloon from 'Molecules/input/InputBalloon';
import Modal from 'Component/modal/Modal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPettypes} from 'Root/api/userapi';
import {getAddressList} from 'Root/api/address';
import SelectInput from 'Molecules/button/SelectInput';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {openSettings} from 'react-native-permissions';

//실종 컴포넌트
export default MissingForm = props => {
	const route = useRoute();
	const [types, setTypes] = React.useState([
		{
			pet_species: '동물종류',
			pet_species_detail: ['품종'],
		},
	]);
	const [isSpeciesChanged, setIsSpeciesChanged] = React.useState(false);
	const [city, setCity] = React.useState(['광역시, 도']);
	const [district, setDistrict] = React.useState(['구를 선택']);

	React.useEffect(() => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg),
					() => {
						console.log('Get Address Failed');
					};
			},
			err => Modal.alert(err),
		);
	}, []);

	React.useEffect(() => {
		if (props.routeName == 'FeedEdit') {
			const stringToJson = JSON.parse(route.params.missing_animal_lost_location);
			console.log('stringToJson', stringToJson);
			setData({
				...data,
				missing_animal_species: route.params.missing_animal_species,
				missing_animal_species_detail: route.params.missing_animal_species_detail,
				missing_animal_sex: route.params.missing_animal_sex,
				missing_animal_age: route.params.missing_animal_age,
				missing_animal_lost_location: {
					city: stringToJson.city,
					district: stringToJson.district,
					detail: stringToJson.detail,
				},
				missing_animal_features: route.params.missing_animal_features,
				missing_animal_date: route.params.missing_animal_date,
				missing_animal_contact: route.params.missing_animal_contact,
				type: types[0],
			});
		}
	}, []);

	const [data, setData] = React.useState({
		missing_animal_species: types[0].pet_species,
		missing_animal_species_detail: types[0].pet_species_detail[0],
		missing_animal_sex: 'male',
		missing_animal_age: '',
		missing_animal_lost_location: {
			city: city[0],
			district: '구를 선택',
			detail: '',
		},
		missing_animal_features: '',
		missing_animal_date: '',
		missing_animal_contact: '',
		type: types[0],
	});

	React.useEffect(() => {
		props.onDataChange && props.onDataChange(data);
	}, [data]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				// console.log('types', types.msg);
				const init = {pet_species: '동물종류', pet_species_detail: ['품종']};
				let res = types.msg;
				res.unshift(init);
				setTypes(res);
			},
			err => Modal.alert(err),
		);
	}, []);

	const getDefaultGender = () => {
		let result = 0;
		switch (data.missing_animal_sex) {
			case 'male':
				result = 0;
				break;
			case 'female':
				result = 1;
				break;
			case 'unknown':
				result = 2;
				break;
			default:
				break;
		}
		return result;
	};

	const onDateChange = date => {
		setData({...data, missing_animal_date: date});
	};

	const onSelectSpecies = () => {
		Modal.popSelectScrollBoxModal(
			[types.map(v => v.pet_species)],
			'동물 종 선택',
			selected => {
				const find = types.find(e => e.pet_species == selected);
				setData({...data, missing_animal_species: selected, missing_animal_species_detail: find.pet_species_detail[0]});
				setIsSpeciesChanged(!isSpeciesChanged);
			},
			() => Modal.close(),
		);
	};

	const onSelectSpeciesDetail = () => {
		const find = types.find(e => e.pet_species == data.missing_animal_species);
		Modal.popSelectScrollBoxModal(
			[find.pet_species_detail],
			'품종 선택',
			selected => {
				setData({...data, missing_animal_species_detail: selected});
			},
			() => Modal.close(),
		);
		// setData({...data, missing_animal_species_detail: data.type.pet_species_detail[i]});
	};

	const selectSex = i => {
		console.log(i);
		switch (i) {
			//male
			case 0:
				setData({...data, missing_animal_sex: 'male'});
				break;
			//female
			case 1:
				setData({...data, missing_animal_sex: 'female'});
				break;
			//unknown
			case 2:
				setData({...data, missing_animal_sex: 'unknown'});
				break;
		}
	};

	const inputAge = age => {
		setData({...data, missing_animal_age: age});
	};
	const inputLocation = location => {
		setData({...data, missing_animal_lost_location: location});
	};
	const inputContact = contact => {
		setData({...data, missing_animal_contact: contact});
	};
	const inputFeature = feature => {
		setData({...data, missing_animal_features: feature});
	};

	const onPressCity = () => {
		Modal.popSelectScrollBoxModal([city], '도, 광역, 특별시', selectedItem => {
			let lost_location_container = data.missing_animal_lost_location;
			lost_location_container.city = selectedItem;
			lost_location_container.district = '구를 선택';
			setData({...data, missing_animal_lost_location: lost_location_container});
			getAddressList(
				{city: selectedItem},
				districts => {
					console.log('districts.msg', districts.msg);
					setDistrict(districts.msg);
				},
				e => console.log('e', e),
			);
			Modal.close();
		});
	};
	const onPressDistrict = () => {
		Modal.popSelectScrollBoxModal([district], '도, 광역, 특별시', selectedItem => {
			let lost_location_container = data.missing_animal_lost_location;
			lost_location_container.district = selectedItem;
			setData({...data, missing_animal_lost_location: lost_location_container});
			Modal.close();
		});
	};

	const onChangeMissingLocationDetail = text => {
		let lost_location_container = data.missing_animal_lost_location;
		lost_location_container.detail = text;
		setData({...data, missing_animal_lost_location: lost_location_container});
	};

	const keyboardArea = useKeyboardBottom(0 * DP);
	const inputAgeRef = React.useRef();
	const inputLocationRef = React.useRef();
	const inputContactRef = React.useRef();
	const inputBalloonRef = React.useRef();
	const currentPosition = React.useRef(0);

	//위치 권한을 위해 Background로 갔다가 앱으로 돌아왔을 경우 권한을 다시 확인
	React.useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			console.log('appState', nextAppState);
			Modal.close();
			if (nextAppState == 'active') {
				requestPermission(); //다시 권한 요구
			}
		});
		return () => {
			subscription.remove();
		};
	}, []);

	//위치 권한 요구 체크
	async function requestPermission() {
		try {
			request(
				//위치 권한 요청 (gps가 꺼져있을 경우 출력이 안됨)
				Platform.select({
					ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
					android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
				}),
			).then(res => {
				console.log('res', res);
				if (res == 'granted') {
					//허용
					onPressCurrentLocation();
				} else if (res == 'denied') {
					//거절
					getToSetting();
				} else if (res == 'unavailable') {
					//gps자체가 꺼짐 상태
					getToSetting();
				} else if (res == 'blocked') {
					// anilog앱만 '안함' 상태
					getToSetting('blocked');
				}
			});
		} catch (error) {
			console.log('location set error:', error);
		}
	}

	//위도 경도 받아오기
	const onPressCurrentLocation = () => {
		Modal.popLoading(true);
		Geolocation.getCurrentPosition(
			position => {
				callInitialAddress(position.coords.longitude, position.coords.latitude);
			},
			error => {
				console.log('error get GEOLOCation', error.code, error.message);
				Modal.close();
				//User denied access
				if (error.code == 1) {
					getToSetting();
				} else if (error.code == 2) {
					//Failed
					getToSetting();
				} else if (error.code == 3) {
					//Timeout
					Modal.popNoBtn('주소를 받아오는데 실패했습니다. \n 잠시후 다시 이용해주세요.');
					setTimeout(() => {
						Modal.close();
					}, 1500);
				}
			},
			{enableHighAccuracy: false, timeout: 6000, maximumAge: 10000},
		);
	};

	//위도 경도를 토대로 주소 받아오기
	const callInitialAddress = async (long, lati) => {
		try {
			let res = await axios
				.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${long}&y=${lati}`, {
					headers: {
						Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
					},
				})
				.then(async res => {
					console.log('res', res.data.documents[0]);
					let location = res.data.documents[0];
					const addr = location.address;

					if (location.road_address == null || location.road_address == undefined) {
						console.log('도로명이 Null  : ', location.address);
						let lost_location_container = data.missing_animal_lost_location;
						lost_location_container.city = addr.region_1depth_name;
						lost_location_container.district = addr.region_2depth_name;
						lost_location_container.detail = addr.region_3depth_name + ' ' + addr.main_address_no + '-' + addr.sub_address_no;
						setData({...data, missing_animal_lost_location: lost_location_container});
						// onChangeMissingLocationDetail(lost_location_container.detail);
						//카카오 API에서 도로명주소가 간혹 Null값으로 오는 현상 발견
						Modal.close();
					} else {
						console.log('도로명 주소를 받아온경우  : ', location);
						let lost_location_container = data.missing_animal_lost_location;
						lost_location_container.city = addr.region_1depth_name;
						lost_location_container.district = addr.region_2depth_name;
						lost_location_container.detail = addr.region_3depth_name + ' ' + addr.main_address_no + '-' + addr.sub_address_no;
						setData({...data, missing_animal_lost_location: lost_location_container});
						Modal.close();
					}
					Modal.close();
				});
		} catch (error) {
			console.log('error callInitialAddress', error.code, error.message);
			Modal.close();
			setTimeout(() => {
				Modal.alert('주소 받아오기에 실패하였습니다. \n 잠시후 다시 이용부탁드립니다.');
			}, 200);
		}
	};

	//위치 권한이 설정되어 있지 않을 경우 디바이스 세팅으로 안내
	const getToSetting = error => {
		let msg = '위치 서비스를 사용할 수 없습니다. \n 기기의 설정 > 개인정보 보호 에서 위치 \n 서비스를 켜주세요.';
		if (error == 'blocked') {
			msg = '현재 해당 앱의 위치서비스 이용이 거절되어 있는 상태입니다. 설정에서 앱에 대한 \n위치서비스를 허용해주세요.';
		}
		Modal.popTwoBtn(
			msg,
			'취소',
			'설정으로',
			() => {
				Modal.close();
				props.navigation.goBack();
			},
			() => {
				if (Platform.OS == 'android') {
					NativeModules.OpenExternalURLModule.generalSettings();
				} else {
					openSettings().catch(() => console.warn('cannot open settings'));
				}
			},
			() => {
				console.log('취소 불가능');
			},
		);
	};

	const previousOffset = React.useRef(0);
	const inputFocused = React.useRef(false);
	const containerHeight = React.useRef(0);
	React.useEffect(() => {
		console.log(
			'input:' +
				currentPosition.current +
				'  scrollOffset:' +
				props.currentScrollOffset +
				'   Previous:' +
				previousOffset.current +
				'    keyboardH:' +
				keyboardArea,
		);
		previousOffset.current = props.currentScrollOffset;
		// props.scrollref.current.scrollToOffset({offset: currentPosition.current});
		inputFocused.current && props.scrollref.current.scrollToOffset({offset: currentPosition.current - 20});
		currentPosition.current = previousOffset.current;
		inputFocused.current = false;
	}, [keyboardArea]);

	const onPressIn = inputRef => () => {
		if (Platform.OS === 'android') return;
		inputFocused.current = true;
		props.container.current.measure((x, y, width, height, pageX, pageY) => {
			containerHeight.current = height;
		});
		inputRef.current.measureLayout(
			props.container.current,
			(left, top, width, height) => {
				console.log('left:%s,top:%s,width:%s,height:%s', left, top, width, height);
				currentPosition.current = top;
				// props.scrollref.current.scrollToOffset({offset:top})
			},
			() => {
				console.log('measurelayout failed');
			},
		);
	};

	const phoneValidate = num => {
		let regPhone = /^01([0|1|6|7|8|9|])-?([0-9]{3,4})-?([0-9]{4})$/;
		let regHomePhone = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|505|70))(\d{3,4})(\d{4})$/;
		return regPhone.test(num) || regHomePhone.test(num);
	};

	return (
		<View style={[feedWrite.lostAnimalForm]} showsVerticalScrollIndicator={false}>
			{/* DropDownSelect */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>분류</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
						{/* <NormalDropDown items={pet_kind} menu={types.map(v => v.pet_species)} width={292} onSelect={onSelectSpecies} defaultIndex={0} /> */}
						<SelectInput onPressInput={onSelectSpecies} width={292} defaultText={'동물종류'} value={data.missing_animal_species} />
					</View>
					<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
						<SelectInput onPressInput={onSelectSpeciesDetail} width={292} defaultText={'품종'} value={data.missing_animal_species_detail} />
					</View>
				</View>
			</View>
			{/* DatePicker */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>실종된 날짜</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.datePicker_assignShelterInformation, feedWrite.datePicker]}>
						<DatePicker width={654} onDateChange={onDateChange} />
					</View>
				</View>
			</View>
			{/* tabSelectFilled_Type1 */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>실종 동물의 성별</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.tabSelectFilled_Type1, feedWrite.tabSelectFilled_Type1]}>
						<TabSelectFilled_Type1 items={['남아', '여아', '모름']} defaultIndex={getDefaultGender()} onSelect={selectSex} />
					</View>
				</View>
			</View>
			{/* Input24 */}
			<View style={[temp_style.input24, feedWrite.input24]}>
				<Input24
					title={'실종 동물의 나이'}
					placeholder="실종 동물의 나이를 입력하세요(년단위)"
					width={654}
					descriptionType={'none'}
					onChange={inputAge}
					maxlength={2}
					keyboardType={'number-pad'}
					value={data.missing_animal_age.toString()}
					// defaultValue={data.missing_animal_age || ''}
					onPressIn={onPressIn(inputAgeRef)}
					ref={inputAgeRef}
				/>
			</View>
			<View style={[feedWrite.missing_location_input]}>
				<View style={{flexDirection: 'row'}}>
					<Text style={[txt.noto24, {color: APRI10}]}>실종된 위치</Text>
					<View style={{marginLeft: 20 * DP}}>
						<AniButton
							onPress={onPressCurrentLocation}
							btnStyle={'border'}
							btnTitle={'현위치'}
							btnLayout={{height: 50 * DP, borderRadius: 30 * DP, width: 100 * DP}}
						/>
					</View>
				</View>
				<View style={[{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 * DP}]}>
					<SelectInput onPressInput={onPressCity} width={292} defaultText={'광역시, 도'} value={data.missing_animal_lost_location.city} />
					<SelectInput onPressInput={onPressDistrict} width={292} value={data.missing_animal_lost_location.district} defaultText={'구를 선택'} />
				</View>
				<TextInput
					onChangeText={onChangeMissingLocationDetail}
					value={data.missing_animal_lost_location.detail}
					style={[
						txt.noto28,
						feedWrite.missing_location_detail_input,
						{borderBottomColor: data.missing_animal_lost_location.detail == '' ? GRAY30 : APRI10},
					]}
					placeholder={'반려동물이 실종된 구체적인 장소를 설명해주세요.'}
					placeholderTextColor={GRAY10}
					maxLength={50}
					onPressIn={onPressIn(inputLocationRef)}
					ref={inputLocationRef}
				/>
			</View>
			<View style={[temp_style.input24, feedWrite.input24]}>
				<Input24
					title={'연락처'}
					placeholder="연락받으실 연락처를 입력하세요"
					width={654}
					onChange={inputContact}
					descriptionType={'none'}
					keyboardType={'number-pad'}
					maxlength={15}
					value={data.missing_animal_contact}
					onPressIn={onPressIn(inputContactRef)}
					ref={inputContactRef}
					alert_msg={PHONE_FORM}
					showMsg
					confirm_msg={'올바른 전화번호 양식입니다.'}
					validator={phoneValidate}
				/>
			</View>
			<View style={[temp_style.inputBalloon, feedWrite.inputBalloon]}>
				<InputBalloon
					title={'실종 동물의 특징'}
					placeholder="실종된 반려동물의 특징을 알려주세요. ex) 털 색, 겁이 많아서 잡으려고 하지 마시고 바로 연락주세요, 한 쪽귀가 접혀있어요, 등에 회색 점이 있어요..."
					onChange={inputFeature}
					value={data.missing_animal_features}
					maxLength={200}
					onPressIn={onPressIn(inputBalloonRef)}
					ref={inputBalloonRef}
					defaultValue={data.missing_animal_features}
				/>
			</View>
			<View style={{height: keyboardArea, width: '100%', backgroundColor: '#FFF'}}></View>
		</View>
	);
};
