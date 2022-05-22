import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback, TextInput, Platform, Keyboard} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {
	Arrow_Down_APRI10,
	Camera54,
	Location54_APRI10,
	Location54_Filled,
	Location54_GRAY30,
	Paw54_Border,
	Paw54_Gray,
} from 'Root/component/atom/icon/index';
import {Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import {btn_style, feedWrite, login_style, temp_style, buttonstyle} from 'Templete/style_templete';
import AniButton from 'Molecules/button/AniButton';
import {btn_w176, btn_w194} from 'Atom/btn/btn_style';
import {DOG_KIND, PET_KIND, pet_kind, PHONE_FORM, PUBLIC_SETTING} from 'Root/i18n/msg';
import DatePicker from 'Molecules/select/DatePicker';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import Input24 from 'Molecules/input/Input24';
import InputBalloon from 'Molecules/input/InputBalloon';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import userGlobalObj from 'Root/config/userGlobalObject';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPettypes} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';
import HashInput from 'Molecules/input/HashInput';
import {getAddressList} from 'Root/api/address';
import SelectInput from 'Molecules/button/SelectInput';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {FlatList} from 'react-native-gesture-handler';
import userGlobalObject from 'Root/config/userGlobalObject';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

//제보 컴포넌트
export default ReportForm = props => {
	const [types, setTypes] = React.useState([
		{
			pet_species: '동물종류',
			pet_species_detail: ['품종'],
		},
	]);

	const [city, setCity] = React.useState(['광역시, 도']); //광역시도 API자료 컨테이너
	const [isCityChanged, setIsCityChanged] = React.useState(false); //광역시도 선택되었는지 여부
	const [district, setDistrict] = React.useState(['시군 선택']); //시군 API자료 컨테이너
	const [isDistrictChanged, setIsDistrictChanged] = React.useState(false); // 시군 선택되었는지 여부
	const [neighbor, setNeighbor] = React.useState(['동읍면']); //동읍면 API 자료 컨테이너
	const [isSpeciesChanged, setIsSpeciesChanged] = React.useState(false);
	const [data, setData] = React.useState({
		report_witness_date: '',
		report_witness_location: '',
		report_location: {
			// 필드명 조정 필요 (상우)
			city: city[0], //시,도
			district: district[0], //군,구
			detail: '', //상세 주솧
		},
		report_animal_species: types[0].pet_species,
		type: types[0],
	});

	React.useEffect(() => {
		if (props.routeName == 'FeedEdit') {
			const prevData = props.data;
			const getDetailAddr = () => {
				let addr = prevData.report_witness_location.split(' ');
				let result = '';
				addr.map((v, i) => {
					if (i > 1) {
						result = result + addr[i];
					}
				});
				return result;
			};
			setData({
				...data,
				report_witness_date: '',
				report_witness_location: prevData.report_witness_location,
				report_location: {
					// 필드명 조정 필요 (상우)
					city: prevData.report_witness_location.split(' ')[0], //시,도
					district: prevData.report_witness_location.split(' ')[1], //군,구
					detail: getDetailAddr(), //상세 주솧
				},
				report_animal_species: prevData.report_animal_species,
				// type: types[0],
			});
		}
	}, []);

	React.useEffect(() => {
		props.onDataChange && props.onDataChange(data);
	}, [data]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				const init = {pet_species: '동물종류', pet_species_detail: ['품종']};
				let res = types.msg;
				res.unshift(init);
				setTypes(res);
			},
			err => Modal.alert(err),
		);
		getAddressList(
			{},
			cities => {
				// console.log('result / getAddressList / FeedWrite  ', cities.msg);
				setCity(cities.msg);
			},
			err => {
				console.log('err / getAddress / FeedWrite  : ', err);
			},
		);
	}, []);

	React.useEffect(() => {
		getAddressList(
			{
				city: data.report_location.city,
				district: data.report_location.district,
			},
			neighbor => {
				if (neighbor.msg.length == 0) {
					setNeighbor(['목록없음']);
				} else {
					setNeighbor(neighbor.msg);
				}
				// setData({...data, report_location: {city: data.report_location.city, district: data.report_location.district, neighbor: neighbor.msg[0]}});
				// data.report_location.district == data.report_location.district ? false : setIsDistrictChanged(!isDistrictChanged);
				setIsDistrictChanged(!isDistrictChanged);
			},
		);
	}, [data.report_location.district]);

	const onDateChange = date => {
		setData({...data, report_witness_date: date});
	};

	const onSelectSpecies = () => {
		Modal.popSelectScrollBoxModal(
			[types.map(v => v.pet_species)],
			'동물 종 선택',
			selected => {
				const find = types.find(e => e.pet_species == selected);
				setData({...data, report_animal_species: selected});
				setIsSpeciesChanged(!isSpeciesChanged);
			},
			() => Modal.close(),
		);
	};

	const onPressCity = () => {
		Keyboard.dismiss();
		Modal.popSelectScrollBoxModal([city], '도, 광역, 특별시', selectedItem => {
			let report_location = data.report_location;
			report_location.city = selectedItem;
			report_location.district = '시군 선택';
			setData({...data, report_location: report_location});
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
		Keyboard.dismiss();
		Modal.popSelectScrollBoxModal([district], '도, 광역, 특별시', selectedItem => {
			let report_location = data.report_location;
			report_location.district = selectedItem;
			setData({...data, report_location: report_location});
			Modal.close();
		});
	};

	const onChangeMissingLocationDetail = text => {
		let report_location = data.report_location;
		report_location.detail = text;
		setData({...data, report_location: report_location});
		console.log('text input :', data.report_location);
	};

	const keyboardArea = useKeyboardBottom(0 * DP);
	const inputLocationRef = React.useRef();
	const currentPosition = React.useRef(0);

	React.useEffect(() => {
		props.scrollref.current.scrollToOffset({offset: currentPosition.current});
		currentPosition.current = 0;
	}, [keyboardArea]);

	const onPressIn = inputRef => () => {
		if (Platform.OS === 'android') return;
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
				setTimeout(() => {
					Modal.alert('주소 받아오기에 실패하였습니다. \n 잠시후 다시 이용부탁드립니다.');
				}, 200);
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
						let report_location = data.report_location;
						report_location.city = addr.region_1depth_name;
						report_location.district = addr.region_2depth_name;
						report_location.detail = addr.region_3depth_name + ' ' + addr.main_address_no + '-' + addr.sub_address_no;
						setData({...data, report_location: report_location});

						Modal.close();
					} else {
						console.log('도로명 주소를 받아온경우  : ', location);
						let report_location = data.report_location;
						report_location.city = addr.region_1depth_name;
						report_location.district = addr.region_2depth_name;
						report_location.detail = addr.region_3depth_name + ' ' + addr.main_address_no + '-' + addr.sub_address_no;
						setData({...data, report_location: report_location});
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
			Modal.close();
		}
	};

	return (
		<View style={[feedWrite.reportForm_container]} showsVerticalScrollIndicator={false}>
			<View style={[feedWrite.reportForm]}>
				<View style={[feedWrite.reportForm_form]}>
					<View style={[feedWrite.lostAnimalForm_Form]}>
						<View style={[feedWrite.formTitle]}>
							<Text style={[txt.noto24, {color: APRI10}]}>분류</Text>
						</View>
						<View style={[feedWrite.formContentContainer]}>
							<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
								<SelectInput onPressInput={onSelectSpecies} width={292} defaultText={'동물종류'} value={data.report_animal_species} />
							</View>
							<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
								{/* <SelectInput onPressInput={onSelectSpeciesDetail} width={292} value={data.report_animal_species_detail} /> */}
							</View>
						</View>
					</View>
					<View style={[feedWrite.formTitle]}>
						<Text style={[txt.noto24, {color: APRI10}]}>제보 날짜</Text>
					</View>
					<View style={[temp_style.datePicker_assignShelterInformation, feedWrite.datePicker]}>
						<DatePicker width={654} onDateChange={onDateChange} defaultDate={data.report_witness_date || ''} />
					</View>
					<View style={[feedWrite.report_location]}>
						<View style={{flexDirection: 'row'}}>
							<Text style={[txt.noto24, {color: APRI10}]}>제보 장소</Text>
							<View style={{marginLeft: 20 * DP}}>
								<AniButton
									onPress={onPressCurrentLocation}
									btnStyle={'border'}
									btnTitle={'현위치'}
									btnLayout={{height: 50 * DP, borderRadius: 30 * DP, width: 100 * DP}}
								/>
							</View>
						</View>

						<View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
							<SelectInput onPressInput={onPressCity} width={292} defaultText={'광역시, 도'} value={data.report_location.city} />
							<SelectInput onPressInput={onPressDistrict} width={292} defaultText={'시군 선택'} value={data.report_location.district} />
						</View>
						<TextInput
							onChangeText={onChangeMissingLocationDetail}
							value={data.report_location.detail}
							style={[txt.noto28,feedWrite.missing_location_detail_input, {borderBottomColor: data.report_location.detail == '' ? GRAY30 : APRI10}]}
							placeholder={'제보하려는 장소의 위치를 설명해주세요.'}
							placeholderTextColor={GRAY10}
							onPressIn={onPressIn(inputLocationRef)}
							maxLength={50}
							ref={inputLocationRef}
						/>
					</View>
				</View>
			</View>
			<View style={{height: keyboardArea, width: '100%', backgroundColor: '#FFF'}}></View>
		</View>
	);
};
