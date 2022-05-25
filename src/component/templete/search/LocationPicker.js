import React, {useRef, useState} from 'react';
import {AppState, FlatList, Keyboard, NativeModules, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import {locationPicker} from 'Templete/style_templete';
import {BLACK, GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {CurrentLocation, LocationGray, LocationMarker} from 'Root/component/atom/icon';
import Geolocation from '@react-native-community/geolocation';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';
import X2JS from 'x2js';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w654} from 'Root/component/atom/btn/btn_style';
import Loading from 'Root/component/molecules/modal/Loading';
import Modal from 'Root/component/modal/Modal';

export default LocationPicker = ({route}) => {
	const [keyword, setKeyword] = useState('');
	const [places, setPlaces] = useState([]);
	const [selected, setSelected] = useState({
		address_name: '',
		category_group_code: '',
		category_group_name: '',
		category_name: '',
		distance: '',
		id: '',
		phone: '',
		place_name: '',
		place_url: '',
		road_address_name: '',
		x: '',
		y: '',
	});
	const navigation = useNavigation();
	const [permission, setPermission] = useState(false);
	const [locationObj, setLocationObj] = useState(''); //현재 위치 주소
	const [init_latitude, setLatitude] = useState(''); //초기 위도
	const [init_longitude, setLogitude] = useState(''); //초기 경도
	const [changedLatitude, setChangedLatitude] = useState(''); //변경된 위도
	const [changedLongitude, setChangedLongitude] = useState(''); //변경된 경도
	const [changedLatitudeDelta, setChangedLatitudeDelta] = useState(0.00002);
	const [changedLongitudeDelta, setChangedLongitudeDelta] = useState(0.0023);
	const [detailAddr, setDetailAddr] = useState(''); //세부주소 텍스트
	const keyboardY = useKeyboardBottom(0 * DP);
	const [searchFocus, setSearchFocus] = React.useState(false);
	const [delay, setDelay] = useState(true);

	const map = React.useRef();

	// 템플릿 호출 시 바로 현재 모바일 위치를 기반으로 위치 정보 수령
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			requestPermission();
		});
		//위치 권한을 위해 Background로 갔다가 앱으로 돌아왔을 경우 권한을 다시 확인
		const subscription = AppState.addEventListener('change', nextAppState => {
			Modal.close();
			if (nextAppState == 'active') {
				requestPermission();
			}
		});
		return () => {
			unsubscribe;
			subscription.remove();
		};
	}, []);

	//주소 불러오기 api 호출
	React.useEffect(() => {
		if (permission == true) {
			if (changedLatitude == '' || changedLongitude == '') {
				callInitialAddress(changedLongitude, changedLatitude);
				Modal.close();
			} else if (changedLatitude != '' && changedLongitude != '') {
				callInitialAddress(changedLongitude, changedLatitude);
				Modal.close();
			}
		}
	}, [changedLatitude]);

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
					setPermission(true);
					geoLocation();
					initializeRegion();
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
			console.log('requestPermission error:', error);
		}
	}

	//위도 경도 받아오기
	const geoLocation = () => {
		Geolocation.getCurrentPosition(
			position => {
				setLatitude(position.coords.latitude);
				setLogitude(position.coords.longitude);
				setChangedLatitude(position.coords.latitude);
				setChangedLongitude(position.coords.longitude);
				callInitialAddress(position.coords.longitude, position.coords.latitude);
			},
			error => {
				console.log('error get GEOLOCation', error.code, error.message);
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
						navigation.goBack();
					}, 1500);
				}
			},
			{enableHighAccuracy: false, timeout: 6000, maximumAge: 10000},
		);
	};

	//카카오 api로 도로명주소가 조회되지 않을 경우에 호출되는 api
	async function getRoadAddr(addr) {
		return new Promise(async function (resolve, reject) {
			try {
				// 관련 api 사이트 주소 : https://www.juso.go.kr/addrlink/devAddrLinkRequestSubmit.do
				let res = await axios
					.get(
						`https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${addr}&confmKey=devU01TX0FVVEgyMDIyMDMyMjIxNTUyMzExMjM3NDQ=&firstSort=road`,
					)
					.then(responseText => {
						var x2js = new X2JS(); //XML 형식의 데이터를 JSON으로 파싱
						var json = x2js.xml2js(responseText.data);
						console.log('json', json);
						console.log('도로명주소 받아오기: ', json.results.juso.roadAddr);
						resolve(json.results);
					});
			} catch (error) {
				console.log('error getRoadAddr  :  ', error.message);
				Modal.close(); //오류발생 시 Modal 종료
			}
		});
	}

	//터치로 인한 위도 경도 변경 콜백
	const goToLocation = region => {
		setChangedLatitude(region.latitude);
		setChangedLongitude(region.longitude);
		setChangedLongitudeDelta(region.longitudeDelta);
		setChangedLatitudeDelta(region.latitudeDelta);
	};

	//위도 경도를 토대로 주소 받아오기
	const callInitialAddress = async (long, lati) => {
		console.log('long', long);
		console.log('lati', lati);
		try {
			let res = await axios
				.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${long}&y=${lati}`, {
					headers: {
						Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
					},
				})
				.then(async res => {
					let location = res.data.documents[0];
					if (location.road_address == null || location.road_address == undefined) {
						console.log('address_name  : ', location.address.address_name);
						//카카오 API에서 도로명주소가 간혹 Null값으로 오는 현상 발견
						// Modal.popLoading();
						const road_addr = await getRoadAddr(location.address.address_name); //카카오 API에서 받은 지번을 바탕으로 주변의 도로명주소를 받아오는 API
						console.log('road_addr count : ', road_addr.common.totalCount);
						if (road_addr.common.totalCount == '0') {
							location.road_address = {
								address_name: '도로명 주소가 없는 위치입니다.',
							};
							setLocationObj(location);
							Modal.close();
						} else {
							location.road_address = {
								address_name: road_addr.juso.roadAddr,
							};
							setLocationObj(location);
							Modal.close();
						}
					} else {
						// 도로명주소가 null값이 아니라면 그대로 setState
						// console.log('location : ', location);
						setLocationObj(location);
						Modal.close();
					}
					setDelay(true); //다시 주소검색이 가능하도록 처리
				});
		} catch (error) {
			console.log('error callAddress  :  ', error.message);
			if (error.message.includes('code 400')) {
				requestPermission();
			}
			Modal.close();
		}
	};

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
				navigation.goBack();
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

	//현재 위치로 돌아감
	const initializeRegion = () => {
		if (Platform.OS == 'android') {
			setChangedLatitude(init_latitude);
			setChangedLongitude(init_longitude);
		} else {
			if (map.current) {
				console.log('map', map.current);
				map.current.animateToRegion(
					{
						latitude: init_latitude,
						longitude: init_longitude,
						latitudeDelta: 0.0002,
						longitudeDelta: 0.0023,
					},
					400,
				);
				setTimeout(() => {
					setChangedLatitude(init_latitude);
					setChangedLongitude(init_longitude);
				}, 500);
			}
		}
	};

	//위도 경도를 토대로 주소 받아오
	const searchPlaceByKeyword = async keyword => {
		try {
			let res = await axios
				.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query={}'.${keyword}`, {
					headers: {
						Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
					},
				})
				.then(async res => {
					console.log('res', JSON.stringify(res.data.documents[0]));
					let result = res.data.documents;
					// console.log('result', result);
					setPlaces(result);
				});
		} catch (error) {
			console.log('error callInitialAddress', error.code, error.message);
			Modal.close();
		}
	};

	const onChangeSearchText = keyword => {
		console.log('keyword', keyword);
		if (keyword == '') {
			setPlaces([]);
		}
		setKeyword(keyword);
		setSelected({
			address_name: '',
			category_group_code: '',
			category_group_name: '',
			category_name: '',
			distance: '',
			id: '',
			phone: '',
			place_name: '',
			place_url: '',
			road_address_name: '',
			x: '',
			y: '',
		});
		searchPlaceByKeyword(keyword);
	};

	const onClear = () => {
		console.log('onClear');
		setPlaces([]);
	};

	//세부주소
	const onChangeDetailAddr = text => {
		setDetailAddr(text);
	};

	const onSelectPlace = item => {
		console.log('item', item);
		setPlaces([]);
		setKeyword(item.place_name);
		setSelected(item);
		let temp = {...locationObj};
		temp.address = {...temp.address, address_name: item.road_address_name != '' ? item.road_address_name : item.address_name};
		setLocationObj(temp);
		setDetailAddr(item.place_name);
		setChangedLongitude(parseFloat(item.x));
		setChangedLatitude(parseFloat(item.y));
		Keyboard.dismiss();
	};

	//선택한 위치로 설정 버튼 클릭
	const confirm = () => {
		let finalized = locationObj;
		finalized.detailAddr = detailAddr;
		if (route.name == 'FeedLocationPicker') {
			const data = {
				...route.params.data,
				address: {
					road_address: {
						address_name: finalized.road_address.address_name + ' ' + finalized.detailAddr,
						city: finalized.road_address.region_1depth_name,
						district: finalized.road_address.region_2depth_name,
					},
					normal_address: {
						address_name: finalized.address.address_name + ' ' + finalized.detailAddr,
						city: finalized.address.region_1depth_name,
						district: finalized.address.region_2depth_name,
					},
					region: {
						latitude: changedLatitude != '' ? changedLatitude : init_latitude,
						longitude: changedLongitude != '' ? changedLongitude : init_longitude,
					},
					detail: finalized.detailAddr,
				},
			};
			const routeName = route.params.routeName; // 피드 수정에서 호출인지 피드 글쓰기에서 호출인지
			navigation.navigate({
				name: routeName,
				params: {feed_location: data.address},
				merge: true,
			});
		} else {
			const data = {
				...route.params.data,
				community_interests: {
					...route.params.data.community_interests,
					interests_location: {
						city: finalized.address.region_1depth_name,
						district: finalized.address.region_2depth_name,
					},
				},
				community_address: {
					road_address: {
						address_name: finalized.road_address.address_name + ' ' + finalized.detailAddr,
						city: finalized.road_address.region_1depth_name,
						district: finalized.road_address.region_2depth_name,
					},
					normal_address: {
						address_name: finalized.address.address_name + ' ' + finalized.detailAddr,
						city: finalized.address.region_1depth_name,
						district: finalized.address.region_2depth_name,
					},
					region: {
						latitude: changedLatitude != '' ? changedLatitude : init_latitude,
						longitude: changedLongitude != '' ? changedLongitude : init_longitude,
					},
					detail: finalized.detailAddr,
				},
			};
			navigation.navigate({
				name: route.params.isEdit ? 'CommunityEdit' : 'CommunityWrite',
				params: {data: data, isReview: route.params.isReview},
				merge: true,
			});
		}
	};

	//장소 검색 결과 아이템
	const renderItem = ({item, index}) => {
		return (
			<View style={{paddingBottom: 26 * DP, paddingTop: index == 0 ? 26 * DP : 0 * DP}}>
				<TouchableOpacity onPress={() => onSelectPlace(item)} activeOpacity={0.6} style={{maxWidth: 460 * DP}}>
					<Text style={[txt.roboto28, {}]}>{item.place_name}</Text>
					<Text style={[txt.roboto26, {color: GRAY20}]}>
						{item.road_address_name ? item.road_address_name : item.address_name}
						{item.road_address_name ? item.road_address_name : item.address_name}
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const onFocusSearch = () => {
		setSearchFocus(true);
	};

	const onBlurSearch = () => {
		setTimeout(() => {
			setSearchFocus(false);
		}, 500);
	};

	const [numOfTouch, setNumOfTouch] = React.useState(0);

	const onPressOut = () => {
		console.log('onPressOut');
		console.log('num', numOfTouch);
		if (numOfTouch > 4) {
			setNumOfTouch(0);
			setPlaces([]);
		} else {
			setNumOfTouch(numOfTouch + 1);
		}
		Keyboard.dismiss();
	};

	if (changedLongitude == '' && changedLatitude == '') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<View style={[{marginBottom: 26 * DP}]}>
					<InputWithSearchIcon
						onClear={onClear}
						placeholder={'검색어를 입력하세요.'}
						width={654}
						onChange={onChangeSearchText}
						onClear={onClear}
						value={keyword}
						onFocus={onFocusSearch}
						onBlur={onBlurSearch}
					/>
				</View>
				{places.length != 0 ? (
					<View style={[style.listContainer]}>
						<FlatList data={places} renderItem={renderItem} showsVerticalScrollIndicator={false} />
					</View>
				) : (
					<ScrollView
						onScroll={e => console.log('e', e.nativeEvent.layoutMeasurement)}
						contentContainerStyle={[{alignItems: 'center', bottom: Platform.OS == 'android' ? keyboardY : searchFocus ? 0 : keyboardY}]}>
						<View style={{zIndex: -1, marginTop: 10 * DP, backgroundColor: '#fff'}}>
							<TouchableOpacity activeOpacity={0.6} onPress={initializeRegion} style={[style.currentLocationIcon]}>
								<CurrentLocation />
							</TouchableOpacity>
							{changedLongitude != '' && changedLatitude != '' ? (
								Platform.OS == 'android' ? (
									<MapView
										ref={map}
										style={[style.mapContainer]}
										onPress={Keyboard.dismiss}
										mapType={'standard'}
										zoomEnabled
										zoomControlEnabled
										onRegionChangeComplete={(region, gesture) => {
											if (gesture.isGesture) {
												//클릭을 안했음에도 지속적으로 위도 경도가 바뀌는 현상 발생 -> 오로지 터치 시에만 반응하도록 적용
												goToLocation(region); //탐색된 위도 경도를 바꿈
											}
										}}
										region={{
											latitude: changedLatitude != '' ? changedLatitude : init_latitude,
											longitude: changedLongitude != '' ? changedLongitude : init_longitude,
											latitudeDelta: changedLatitudeDelta, //지도의 초기줌 수치
											longitudeDelta: changedLongitudeDelta, //지도의 초기줌 수치
										}}>
										{/* 현재 선택된 위도 경도의 마커 */}
										<MapView.Marker
											tracksViewChanges={false}
											coordinate={{
												latitude: changedLatitude != '' ? changedLatitude : init_latitude,
												longitude: changedLongitude != '' ? changedLongitude : init_longitude,
											}}
											icon={require('Atom/icon/marker.png')} // https://lifesaver.codes/answer/custom-markers-cause-extreme-lag-and-slow-down-on-android-2658
											key={`${changedLongitude}${Date.now()}`}>
											{locationObj != '' ? (
												<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
													<Text style={[txt.noto22b, style.locationText]}>{locationObj.address.address_name}</Text>
													<View style={[style.triangle]}></View>
													<LocationMarker />
												</View>
											) : (
												<></>
											)}
										</MapView.Marker>
									</MapView>
								) : (
									<>
										<MapView
											ref={map}
											// provider={PROVIDER_GOOGLE} // remove if not using Google Maps
											style={[style.mapContainer]}
											onRegionChangeComplete={(region, gesture) => {
												//클릭을 안했음에도 지속적으로 위도 경도가 바뀌는 현상 발생 -> 오로지 터치 시에만 반응하도록 적용
												goToLocation(region); //탐색된 위도 경도를 바꿈
											}}
											onPress={Keyboard.dismiss}
											region={{
												latitude: changedLatitude != '' ? changedLatitude : init_latitude,
												longitude: changedLongitude != '' ? changedLongitude : init_longitude,
												latitudeDelta: changedLatitudeDelta, //지도의 초기줌 수치
												longitudeDelta: changedLongitudeDelta, //지도의 초기줌 수치
											}}>
											<MapView.Marker
												coordinate={{
													latitude: changedLatitude != '' ? changedLatitude : init_latitude,
													longitude: changedLongitude != '' ? changedLongitude : init_longitude,
												}}
												key={`${changedLongitude}${Date.now()}`}>
												{locationObj != '' ? (
													<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
														<Text style={[txt.noto22b, style.locationText]}>{locationObj.address.address_name}</Text>
														<View style={[style.triangle]}></View>
														<LocationMarker />
													</View>
												) : (
													<></>
												)}
											</MapView.Marker>
										</MapView>
									</>
								)
							) : (
								<></>
							)}
						</View>
						{locationObj != '' ? (
							<View style={{zIndex: selected.id == '' ? -1 : 1}}>
								<View style={[style.currentLocation, {}]}>
									<Text style={[txt.noto28b]}>
										{locationObj.road_address != null ? locationObj.road_address.address_name : '도로명 주소가 없는 좌표입니다. '}
									</Text>
									<Text style={[txt.noto24, {color: GRAY10}]}>[지번] {locationObj.address.address_name}</Text>
								</View>
								<View style={[style.locationDetail]}>
									<TextInput
										onChangeText={onChangeDetailAddr}
										style={[txt.noto26, style.detailInput]}
										placeholder={'상세주소를 입력해주세요.'}
										placeholderTextColor={GRAY20}
										maxLength={25}
										value={detailAddr}
									/>
									<Text style={[txt.noto22, {color: GRAY20}]}>{detailAddr.length + '/' + 25} </Text>
								</View>
								<View style={[style.btnContainer]}>
									<AniButton onPress={confirm} btnTitle={'선택한 위치로 선택'} btnLayout={btn_w654} btnStyle={'border'} titleFontStyle={32} />
								</View>
							</View>
						) : (
							<></>
						)}
					</ScrollView>
				)}
			</View>
		);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		// height: 2000 * DP,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	listContainer: {
		flex: 1,
		// alignItems: 'center',
		width: 654 * DP,
	},
	mapContainer: {
		width: 750 * DP,
		height: 750 * DP,
		borderColor: GRAY10,
		borderWidth: 2 * DP,
		marginVertical: 15 * DP,
		zIndex: -1,
	},
	locationText: {
		maxWidth: 520 * DP,
		// height: 60 * DP,
		borderRadius: 20 * DP,
		padding: 10 * DP,
		borderWidth: 2 * DP,
		textAlign: 'center',
		backgroundColor: 'white',
	},
	currentLocation: {
		width: 654 * DP,
		alignSelf: 'center',
		marginTop: 10 * DP,
		paddingVertical: 24 * DP,
	},
	currentLocationIcon: {
		position: 'absolute',
		right: 50 * DP,
		bottom: 240 * DP,
		width: 60 * DP,
		height: 60 * DP,
		zIndex: 1,
	},
	btnContainer: {
		paddingVertical: 30 * DP,
	},
	locationDetail: {
		width: 654 * DP,
		height: 100 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10 * DP,
		marginBottom: 20 * DP,
		paddingVertical: 10 * DP,
		paddingRight: 20 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: BLACK,
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
	placeListContainer: {
		backgroundColor: 'white',
		// width: 654 * DP,
		// flex: 1,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.1,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 1 * DP,
		},
		elevation: 1,
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 15 * DP,
		borderRightWidth: 15 * DP,
		borderBottomWidth: 15 * DP,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'black',
		transform: [{rotate: '180deg'}],
	},
	detailInput: {
		paddingHorizontal: 24 * DP,
		flex: 1,
	},
	location: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	webview: {
		width: 670 * DP,
		// minHeight: 500 * DP,
	},
	// currentLocationIcon: {
	// 	position: 'absolute',
	// 	right: 50 * DP,
	// 	bottom: 100 * DP,
	// 	width: 60 * DP,
	// 	height: 60 * DP,
	// 	// backgroundColor: 'red',
	// 	zIndex: 1,
	// },
});

const mapStyle2 = [
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'transit',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
];
