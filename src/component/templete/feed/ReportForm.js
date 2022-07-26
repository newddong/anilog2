import React from 'react';
import {Text, View, Platform, Keyboard, AppState, NativeModules, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {GRAY10, GRAY30, GRAY50, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {feedWrite} from 'Templete/style_templete';
import DatePicker from 'Molecules/select/DatePicker';
import Modal from 'Component/modal/Modal';
import {getPettypes} from 'Root/api/userapi';
import {getAddressList} from 'Root/api/address';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {openSettings} from 'react-native-permissions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Camera54, Location48Border, Paw54_Border, Location54, Arrow_Down_BLACK, Search48_BLACK} from 'Root/component/atom/icon/index';
import Input24 from 'Molecules/input/Input24';
import {parsingCityName} from 'Root/util/addressutill';

//제보 컴포넌트
export default ReportForm = props => {
	const [types, setTypes] = React.useState([
		{
			pet_species: '동물종류',
			pet_species_detail: ['품종'],
		},
	]);

	const route = useRoute();
	const navigation = useNavigation();
	const [city, setCity] = React.useState(['광역시, 도']); //광역시도 API자료 컨테이너
	const [district, setDistrict] = React.useState(['시,군,구']); //시군 API자료 컨테이너
	const [isDistrictChanged, setIsDistrictChanged] = React.useState(false); // 시군 선택되었는지 여부
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
				report_witness_date: prevData.report_witness_date,
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

		//위치 권한을 위해 Background로 갔다가 앱으로 돌아왔을 경우 권한을 다시 확인
		const subscription = AppState.addEventListener('change', nextAppState => {
			Modal.close();
			if (nextAppState == 'active') {
				requestPermission(); //다시 권한 요구
			}
		});
		return () => {
			subscription.remove();
		};
	}, []);

	React.useEffect(() => {
		props.onDataChange && props.onDataChange(data);
	}, [data]);

	React.useEffect(() => {
		if (data.report_location.city != '광역시, 도') {
			console.log('data.report_location.city', data.report_location.city);
			const parsedCity = parsingCityName(data.report_location?.city);
			console.log('parsedCity', parsedCity);
			if (parsedCity != undefined) {
			}
			getAddressList(
				{
					city: parsedCity,
					// district: data.report_location.district,
				},
				neighbor => {
					// console.log('getAddressList neighbor', neighbor);
					if (neighbor.msg.length == 0) {
						setDistrict(['목록없음']);
					} else {
						setDistrict(neighbor.msg);
					}
					// setData({...data, report_location: {city: data.report_location.city, district: data.report_location.district, neighbor: neighbor.msg[0]}});
					// data.report_location.district == data.report_location.district ? false : setIsDistrictChanged(!isDistrictChanged);
					setIsDistrictChanged(!isDistrictChanged);
				},
			);
		}
	}, [data.report_location.city]);

	const onDateChange = date => {
		setData({...data, report_witness_date: date});
	};

	const onPressCity = () => {
		Keyboard.dismiss();
		Modal.popSelectScrollBoxModal([city], '도, 광역, 특별시', selectedItem => {
			let report_location = data.report_location;
			report_location.city = selectedItem;
			report_location.district = '시,군,구';
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
		Modal.popSelectScrollBoxModal([district], '시, 군, 구', selectedItem => {
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
				// navigation.goBack();
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
				// console.log('res', res);
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
						// https://developers.kakao.com/docs/latest/ko/local/dev-guide
					},
				})
				.then(async res => {
					// console.log('res', res.data.documents[0]);
					let location = res.data.documents[0];
					const addr = location.address;
					if (location.road_address == null || location.road_address == undefined) {
						// console.log('도로명이 Null  : ', location.address);
						let report_location = data.report_location;
						report_location.city = addr.region_1depth_name;
						report_location.district = addr.region_2depth_name;
						report_location.detail = addr.region_3depth_name + ' ' + addr.main_address_no + '-' + addr.sub_address_no;
						setData({...data, report_location: report_location});
						Modal.close();
					} else {
						// console.log('도로명 주소를 받아온경우  : ', location);
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
		}
	};

	const feedInput = props.feedInput();
	const feedInputRef = React.useRef();

	//사진 추가
	const moveToMultiPhotoSelect = () => {
		props.moveToPhotoSelect();
		// navigation.navigate('MultiPhotoSelect', {prev: {name: route.name, key: route.key}});
	};

	return (
		<View style={[feedWrite.reportForm_container]} showsVerticalScrollIndicator={false}>
			<View style={[reportStyle.reportForm]}>
				{React.cloneElement(feedInput, {onPressIn: onPressIn(feedInputRef), ref: feedInputRef, showImages: true})}
				<View style={[feedWrite.buttonContainer]}>
					<TouchableWithoutFeedback onPress={moveToMultiPhotoSelect}>
						<View style={[feedWrite.btnItemContainer, {marginBottom: 5 * DP}]}>
							<Camera54 />
							<Text style={[txt.noto28b, {color: BLACK, marginLeft: 12 * DP}]}>사진추가</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={[reportStyle.reportForm_form]}>
					<View style={reportStyle.report_date}>
						<Text style={[txt.noto26]}>제보 날짜</Text>
						<DatePicker
							width={550}
							onDateChange={onDateChange}
							defaultDate={
								data.report_witness_date.length > 0 ? data.report_witness_date.substring(0, 10).replace('-', '.').replace('-', '.') : '눌러서 지정'
							}
							future={false}
						/>
					</View>
					<View style={[reportStyle.report_location]}>
						<View style={{flexDirection: 'row'}}>
							<Text style={txt.noto26}>제보 위치</Text>
						</View>
						<View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 * DP, marginBottom: 20 * DP}]}>
							<TouchableOpacity onPress={onPressCity} style={[reportStyle.dropdownSelect_depth1, {width: 268 * DP}]}>
								<View style={[reportStyle.missing_location_container, {}]}>
									<Text style={[txt.noto28, reportStyle.missing_location]}>{data.report_location.city}</Text>
									<Arrow_Down_BLACK />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={onPressDistrict} style={[reportStyle.dropdownSelect_depth1, {width: 268 * DP}]}>
								<View style={[reportStyle.missing_location_container]}>
									<Text style={[txt.noto28, reportStyle.missing_location]}>{data.report_location.district}</Text>
									<Arrow_Down_BLACK />
								</View>
							</TouchableOpacity>
							<Location48Border onPress={onPressCurrentLocation} />
							<View style={{width: 48 * DP}}>{/* <Search48_BLACK /> */}</View>
						</View>
						<Input24
							placeholder="제보하려는 장소의 위치를 설명해주세요."
							placeholderTextColor={GRAY10}
							width={694}
							height={104}
							descriptionType={'none'}
							onChange={onChangeMissingLocationDetail}
							maxlength={50}
							value={data.report_location.detail}
							onPressIn={onPressIn(inputLocationRef)}
							ref={inputLocationRef}
						/>
					</View>
				</View>
			</View>
			<View style={{height: keyboardArea, width: '100%', backgroundColor: '#FFF'}}></View>
		</View>
	);
};

const reportStyle = StyleSheet.create({
	reportForm: {
		paddingHorizontal: 48 * DP,
	},
	reportForm_form: {
		marginBottom: 40 * DP,
	},
	report_date: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 60 * DP,
	},
	report_location: {
		marginTop: 60 * DP,
	},
	dropdownSelect_depth1: {
		width: 550 * DP,
		height: 104 * DP,
		// marginLeft: 12 * DP,
		borderRadius: 30 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GRAY50,
	},
	missing_location_container: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'center',
		// justifyContent: 'space-around',
	},
	missing_location: {
		height: 44 * DP,
		// backgroundColor: 'red',
		minWidth: 160 * DP,
		textAlign: 'center',
	},
});
