import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

/**
 *
 */
export async function getAddress() {
	return new Promise(function (resolve, reject) {
		Geolocation.getCurrentPosition(
			async position => {
				// const latitude = JSON.stringify(position.coords.latitude);
				// const longitude = JSON.stringify(position.coords.longitude);
				let res = await axios
					.get(
						`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${position.coords.longitude}&y=${position.coords.latitude}`,
						{
							headers: {
								Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
							},
						},
					)
					.then(res => {
						const location = res.data.documents[0];
						// console.log('location  ', location);
						resolve(location);
					});
			},
			error => {
				console.log('error get GEOLOCation', error.code, error.message);
			},
			{enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
		);
	});
}
