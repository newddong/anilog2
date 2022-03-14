import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';

import Geolocation from '@react-native-community/geolocation';
import {txt} from 'Root/config/textstyle';

export default function GeoLocation() {
	const [locationObj, setLocationObj] = useState({});

	const x = '126.9539484';
	const y = '37.3097165';
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLogitude] = useState(null);

	//위도 경도 받아오기
	const geoLocation = () => {
		// console.log('geoLocation');
		Geolocation.getCurrentPosition(
			position => {
				console.log('getLocation Succed');
				const latitude = JSON.stringify(position.coords.latitude);
				const longitude = JSON.stringify(position.coords.longitude);
				setLatitude(latitude);
				setLogitude(longitude);
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

	const e = {
		address: {
			address_name: '서울 마포구 신수동 89-76',
			main_address_no: '89',
			mountain_yn: 'N',
			region_1depth_name: '서울',
			region_2depth_name: '마포구',
			region_3depth_name: '신수동',
			sub_address_no: '76',
			zip_code: '',
		},
		road_address: null,
	};

	return (
		<View>
			<Button title="Api 불러오기 버튼" onPress={_callApi} />
			<TouchableOpacity onPress={geoLocation} style={[{alignSelf: 'center', backgroundColor: 'yellow'}]}>
				<Text style={[txt.noto32b]}>위도경도 받아오기</Text>
			</TouchableOpacity>
			<Text>{locationObj?.address?.address_name}</Text>
			<Text>{locationObj?.address?.region_1depth_name}</Text>
			<Text>{locationObj?.address?.region_2depth_name}</Text>
			<Text>{locationObj?.address?.region_3depth_name}</Text>

			<Text> latitude: {latitude} </Text>
			<Text> longitude: {longitude} </Text>
		</View>
	);
}
