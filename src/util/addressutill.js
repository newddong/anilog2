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

export const parsingCityName = addr => {
	switch (addr) {
		case '서울':
			return '서울특별시';
		case '강원':
			return '강원도';
		case '경기':
			return '경기도';
		case '인천':
			return '인천광역시';
		case '충북':
			return '충청북도';
		case '충남':
			return '충청남도';
		case '전북':
			return '전라북도';
		case '전남':
			return '전라남도';
		case '울산':
			return '울산광역시';
		case '부산':
			return '부산광역시';
		case '대전':
			return '대전광역시';
		case '대구':
			return '대구광역시';
		case '경남':
			return '경상남도';
		case '경북':
			return '경상북도';

		default:
			break;
	}
};
