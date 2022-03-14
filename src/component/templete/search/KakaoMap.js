import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';

import Geolocation from '@react-native-community/geolocation';
import {txt} from 'Root/config/textstyle';
import WebView from 'react-native-webview';
import DP from 'Root/config/dp';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function KakaoMap() {
	const [locationObj, setLocationObj] = useState({});

	const x = '126.9539484';
	const y = '37.3097165';
	const [latitude, setLatitude] = useState('22');
	const [longitude, setLogitude] = useState('22');

	React.useEffect(() => {
		geoLocation();
	}, []);
	//위도 경도 받아오기
	const geoLocation = () => {
		// console.log('geoLocation');
		Geolocation.getCurrentPosition(
			position => {
				console.log('getLocation Succed');
				const latitude = JSON.stringify(position.coords.latitude);
				const longitude = JSON.stringify(position.coords.longitude);
				setLatitude(position.coords.latitude);
				setLogitude(position.coords.longitude);
			},
			error => {
				console.log('error get GEOLOCation', error.code, error.message);
			},
			{enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
		);
	};

	const _callApi = async () => {
		try {
			let res = await axios
				.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`, {
					headers: {
						Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
					},
				})
				.then(res => {
					const location = res.data.documents[0];
					console.log('location  ', location);
					setLocationObj(location);
				});
			console.log('locationObj :  ', locationObj);
		} catch (error) {
			console.log('error  :  ', error.message);
		}
	};

	return (
		<View>
			<Button title="Api 불러오기 버튼" onPress={_callApi} />
			<TouchableOpacity onPress={geoLocation} style={[{alignSelf: 'center', backgroundColor: 'yellow'}]}>
				<Text style={[txt.noto32b]}>위도경도 받아오기</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={geoLocation} style={[{alignSelf: 'center', backgroundColor: 'yellow'}]}>
				<Text style={[txt.noto32b]}>맵</Text>
			</TouchableOpacity>
			<Text>{locationObj?.address?.address_name}</Text>
			<Text>{locationObj?.address?.region_1depth_name}</Text>
			<Text>{locationObj?.address?.region_2depth_name}</Text>
			<Text>{locationObj?.address?.region_3depth_name}</Text>

			<Text> latitude: {latitude} </Text>
			<Text> longitude: {longitude} </Text>
			{/* <Map /> */}
			{latitude != '' && longitude != '' ? (
				<View style={{width: '100%', height: '100%'}}>
					{/* <MapView
						style={{width: '100%', height: '100%'}}
						provider={PROVIDER_GOOGLE}
						initialRegion={{latitude: latitude, longitude: longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
						zoomEnabled
					/> */}
					<MapView
						// provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						style={{width: 654 * DP, height: 450 * DP}}
						region={{
							latitude: 37.5487407,
							longitude: 126.9371861,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121,
						}}
					/>
				</View>
			) : (
				<></>
			)}
		</View>
	);
}
