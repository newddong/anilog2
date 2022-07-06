import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Platform, StyleSheet, TextInput, Keyboard, StatusBar, ScrollView, AppState} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CurrentLocation, LocationMarker} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w194, btn_w654} from 'Root/component/atom/btn/btn_style';
import X2JS from 'x2js';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import {openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {NativeModules} from 'react-native';

export default SearchMap = ({route}) => {
	const navigation = useNavigation();
	const [permission, setPermission] = React.useState(false);
	const [locationObj, setLocationObj] = useState(''); //현재 위치 주소
	const [init_latitude, setLatitude] = useState(''); //초기 위도
	const [init_longitude, setLogitude] = useState(''); //초기 경도
	const [changedLatitude, setChangedLatitude] = useState(''); //변경된 위도
	const [changedLongitude, setChangedLongitude] = useState(''); //변경된 경도
	const [changedLatitudeDelta, setChangedLatitudeDelta] = useState(0.00002);
	const [changedLongitudeDelta, setChangedLongitudeDelta] = useState(0.0023);
	const [detailAddr, setDetailAddr] = React.useState(''); //세부주소 텍스트
	const keyboardY = useKeyboardBottom(0 * DP);
	const [delay, setDelay] = React.useState(true);

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
			console.log('location set error:', error);
		}
	}

	//주소 불러오기 api 호출
	React.useEffect(() => {
		if (permission == true) {
			if (changedLatitude == '' || changedLongitude == '') {
				callInitialAddress(changedLongitude, changedLatitude);
				Modal.close();
			} else if (changedLatitude != '' && changedLongitude != '') {
				if (route.params.addr != undefined && delay) {
					//주소명 검색완료 후 첫 주소를 받아온 이후의 영역 변경
					callInitialAddress(changedLongitude, changedLatitude);
					Modal.close();
				} else if (delay) {
					//주소명 검색이 아닌 첫 좌표에서 이동한 경우
					callInitialAddress(changedLongitude, changedLatitude);
					Modal.close();
				}
			}
		}
	}, [changedLatitude]);

	//주소명으로 검색된 string을 위도 경도 좌표로 변환
	React.useEffect(() => {
		if (route.params.addr != undefined) {
			const addr = route.params.addr.roadAddress;
			connectGeoCoder(addr);
		}
	}, [route.params]);

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

	//위도 경도를 토대로 주소 받아오기
	const callInitialAddress = async (long, lati) => {
		console.log('callInitialAddress', long);
		console.log('callInitialAddress', lati);
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
						Modal.popLoading();
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
						console.log('location : ', location);
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
						// console.log('도로명주소 받아오기: ', json.results.juso.roadAddr);
						resolve(json.results);
					});
			} catch (error) {
				console.log('error getRoadAddr  :  ', error.message);
				Modal.close(); //오류발생 시 Modal 종료
			}
		});
	}

	//주소검색을 통해서 받아왔을 경우
	async function connectGeoCoder(addr) {
		console.log('addr', addr);
		let key = '7CC4F0EE-4F9E-353A-9B34-22B4D7F49CA9'; //https://www.vworld.kr - api 키 권상우 문의
		return new Promise(async function (resolve, reject) {
			try {
				let res = await axios
					.get(
						`http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${addr}&refine=true&simple=true&format=json&type=ROAD&key=${key}`,
					)
					.then(responseText => {
						// console.log()
						console.log('resoponse', JSON.stringify(responseText.data.response.status));
						if (responseText.data.response.status == 'ERROR') {
							Modal.alert('주소를 받아오는 과정에서 \n 오류가 발생하였습니다. \n 잠시후 다시 이용해주세요.');
						} else {
							const result = responseText.data.response.result.point;
							// console.log('parse Result y : ', parseFloat(result.y));
							setDelay(false);
							callInitialAddress(parseFloat(result.x), parseFloat(result.y));
							setChangedLatitude(parseFloat(result.y));
							setChangedLongitude(parseFloat(result.x));
							map.current = result;
						}
					});
			} catch (error) {
				console.log(error);
				Modal.alert('주소를 받아오는 과정에서 \n 오류가 발생하였습니다. \n 잠시후 다시 이용해주세요.');
				// Modal.close(); //오류발생 시 Modal 종료
			}
		});
	}

	//세부주소
	const onChangeDetailAddr = text => {
		setDetailAddr(text);
	};

	//터치로 인한 위도 경도 변경 콜백
	const goToLocation = region => {
		setChangedLatitude(region.latitude);
		setChangedLongitude(region.longitude);
		setChangedLongitudeDelta(region.longitudeDelta);
		setChangedLatitudeDelta(region.latitudeDelta);
	};

	//현재 위치로 돌아감
	const initializeRegion = () => {
		if (Platform.OS == 'android') {
			setChangedLatitude(init_latitude);
			setChangedLongitude(init_longitude);
		} else {
			if (map.current) {
				console.log('map', map.current);
				// map.current.animateToRegion(
				// 	{
				// 		latitude: init_latitude,
				// 		longitude: init_longitude,
				// 		latitudeDelta: 0.0002,
				// 		longitudeDelta: 0.0023,
				// 	},
				// 	400,
				// );
				setTimeout(() => {
					setChangedLatitude(init_latitude);
					setChangedLongitude(init_longitude);
				}, 500);
			}
		}
	};

	const goToAddressSearch = () => {
		if (route.name == 'FeedSearchMap') {
			//피드 위치추가 경로
			navigation.navigate('FeedAddressSearchWeb', {prevRoute: route.name});
		} else {
			// 커뮤니티 위치추가 경로
			navigation.navigate('AddressSearchWeb', {prevRoute: route.name});
		}
	};

	//선택한 위치로 설정 버튼 클릭
	const confirm = () => {
		let finalized = locationObj;
		finalized.detailAddr = detailAddr;
		if (route.name == 'FeedSearchMap') {
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

	return (
		<View style={[style.container, {}]}>
			{/* <Map /> */}
			<ScrollView contentContainerStyle={{alignItems: 'center', bottom: keyboardY}}>
				{changedLongitude != '' && changedLatitude != '' ? (
					<View style={{zIndex: -1, marginTop: 10 * DP, backgroundColor: '#fff'}}>
						{/* 현재 위치로 돌아가는 아이콘 */}
						<View style={[{paddingVertical: 10 * DP, width: 654 * DP, alignSelf: 'center'}]}>
							<AniButton onPress={goToAddressSearch} btnTitle={'주소 검색'} btnLayout={btn_w194} btnStyle={'border'} titleFontStyle={24} />
						</View>
						<TouchableOpacity onPress={initializeRegion} style={[style.currentLocationIcon]}>
							<CurrentLocation />
						</TouchableOpacity>
						{Platform.OS == 'android' ? (
							<MapView
								ref={map}
								style={[style.mapContainer]}
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
									{/* <LocationMarker /> */}
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
										<LocationMarker />
									</MapView.Marker>
								</MapView>
							</>
						)}
					</View>
				) : (
					<>
						<Loading isModal={false} />
					</>
				)}
				{locationObj != '' ? (
					<View>
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
		</View>
	);
};

function useKeyboardBottom(tabheight) {
	const [KeyboardY, setKeyboardY] = React.useState(0);
	const KeyboardBorderLine = (() => {
		if (Platform.OS === 'ios') {
			return isNotch ? -34 : 0;
		} else if (Platform.OS === 'android') {
			return isNotch ? StatusBar.currentHeight : 0;
		}
	})();
	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardY(0);
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			setKeyboardY(0);
		});
		return () => {
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	});
	return KeyboardY;
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		// height: 2000 * DP,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	mapContainer: {
		width: 750 * DP,
		height: 750 * DP,
		borderColor: GRAY10,
		borderWidth: 2 * DP,
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
		bottom: 220 * DP,
		width: 60 * DP,
		height: 60 * DP,
		// backgroundColor: 'red',
		zIndex: 1,
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
	locationSearch: {
		width: 654 * DP,
		height: 100 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10 * DP,
		marginBottom: 20 * DP,
		paddingVertical: 10 * DP,
		paddingRight: 20 * DP,
		// borderWidth: 2 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY30,
		flexDirection: 'row',
	},
	detailInput: {
		paddingHorizontal: 24 * DP,
		flex: 1,
	},
	btnContainer: {
		paddingVertical: 30 * DP,
	},
});
