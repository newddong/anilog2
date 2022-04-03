import React, {useRef, useState} from 'react';
import {Text, View, Button, TouchableOpacity, Platform, StyleSheet, TextInput, Keyboard, StatusBar, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CurrentLocation, LocationMarker} from 'Root/component/atom/icon';
import {APRI10, GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w654} from 'Root/component/atom/btn/btn_style';
import X2JS from 'x2js';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';

export default SearchMap = ({route}) => {
	const navigation = useNavigation();

	const [locationObj, setLocationObj] = useState(''); //현재 위치 주소
	const x = 126.937125; //초기값 더미
	const y = 37.548721; //초기값 더미
	const [init_latitude, setLatitude] = useState(''); //초기 위도
	const [init_longitude, setLogitude] = useState(''); //초기 경도
	const [changedLatitude, setChangedLatitude] = useState(''); //변경된 위도
	const [changedLongitude, setChangedLongitude] = useState(''); //변경된 경도
	const [changedLatitudeDelta, setChangedLatitudeDelta] = useState(0.00002);
	const [changedLongitudeDelta, setChangedLongitudeDelta] = useState(0.0023);
	const [detailAddr, setDetailAddr] = React.useState(''); //세부주소 텍스트
	const keyboardY = useKeyboardBottom(0 * DP);

	// 템플릿 호출 시 바로 현재 모바일 위치를 기반으로 위치 정보 수령
	React.useEffect(() => {
		Modal.popLoading();
		geoLocation();
		initializeRegion();
	}, []);

	//주소 불러오기 api 호출
	React.useEffect(() => {
		if (changedLatitude == '' || changedLongitude == '') {
			callInitialAddress(init_longitude, init_latitude);
			Modal.close();
		} else if (changedLatitude != '') {
			callInitialAddress(changedLongitude, changedLatitude);
			Modal.close();
		}
	}, [init_latitude, changedLatitude]);

	//위도 경도 받아오기
	const geoLocation = () => {
		Geolocation.getCurrentPosition(
			position => {
				console.log('position.coords.latitude', position.coords.latitude);
				console.log('position.coords.longitude', position.coords.longitude);
				setLatitude(position.coords.latitude);
				setLogitude(position.coords.longitude);
				callInitialAddress(position.coords.longitude, position.coords.latitude);
			},
			error => {
				console.log('error get GEOLOCation', error.code, error.message);
			},
			{enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
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
					let location = res.data.documents[0];
					if (location.road_address == null) {
						// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
						// console.log('road_addr is null?', location.road_address);
						// console.log('changedLatitude  :  ', changedLatitude, 'changedLongitude :  ', changedLongitude);
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
						setLocationObj(location);
						Modal.close();
					}
				});
		} catch (error) {
			console.log('error callAddress  :  ', error.message);
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
						`https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10 &keyword=${addr}&confmKey=devU01TX0FVVEgyMDIyMDMyMjIxNTUyMzExMjM3NDQ=&firstSort=road`,
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

	//현재 위치로 돌아감
	const initializeRegion = () => {
		if (map.current) {
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
			// setChangedLongitudeDelta(0.00002);
			// setChangedLatitudeDelta(0.0023);
		}
	};

	//세부주소
	const onChangeDetailAddr = text => {
		setDetailAddr(text);
	};

	//터치로 인한 위도 경도 변경 콜백
	const goToLocation = region => {
		console.log('region');
		setChangedLatitude(region.latitude);
		setChangedLongitude(region.longitude);
		setChangedLongitudeDelta(region.longitudeDelta);
		setChangedLatitudeDelta(region.latitudeDelta);
	};

	//선택한 위치로 설정 버튼 클릭
	const confirm = () => {
		let finalized = locationObj;
		finalized.detailAddr = detailAddr;
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
			},
		};
		navigation.navigate({
			name: 'CommunityWrite',
			params: {data: data, isReview: route.params.isReview},
			merge: false,
		});
	};

	const map = React.useRef();

	return (
		<View
			style={[
				style.container,
				{
					bottom: keyboardY, //테스트 필요한 부분
				},
			]}>
			{/* <Map /> */}
			{init_latitude != '' && init_longitude != '' ? (
				<View style={{zIndex: -1, marginTop: 10 * DP}}>
					{/* 현재 위치로 돌아가는 아이콘 */}
					<TouchableOpacity activeOpacity={0.6} onPress={initializeRegion} style={[style.currentLocationIcon]}>
						<CurrentLocation />
					</TouchableOpacity>
					{Platform.OS == 'android' ? (
						<MapView
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
								coordinate={{
									latitude: changedLatitude != '' ? changedLatitude : init_latitude,
									longitude: changedLongitude != '' ? changedLongitude : init_longitude,
								}}
								key={`${changedLongitude}${Date.now()}`} // 현재 마커의 위치가 바뀌어도 타이틀 및 description이 최신화 되지 않던 현상 발견 -> 키 값 부여
							>
								<LocationMarker />
							</MapView.Marker>
						</MapView>
					) : (
						<>
							<MapView
								ref={map}
								// provider={PROVIDER_GOOGLE} // remove if not using Google Maps
								style={[style.mapContainer]}
								// customMapStyle={mapStyle}
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
										latitude: changedLatitude != '' ? changedLatitude : y,
										longitude: changedLongitude != '' ? changedLongitude : x,
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
						<AniButton onPress={confirm} btnTitle={'선택한 위치로 설정'} btnLayout={btn_w654} btnStyle={'border'} titleFontStyle={32} />
					</View>
				</View>
			) : (
				<></>
			)}
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
			console.log('keyboarddidshow');
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			console.log('keyboarddidhide');
			setKeyboardY(0);
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			console.log('keyboardwillshow');
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine - tabheight);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			console.log('keyboardwillhide');
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

const mapStyle = [
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi',
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

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	mapContainer: {
		width: 750 * DP,
		height: 800 * DP,
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
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
	detailInput: {
		paddingLeft: 24 * DP,
		// includeFontPadding: true,
		// lineHeight: 56 * DP,
	},
	btnContainer: {
		marginTop: 30 * DP,
	},
});
