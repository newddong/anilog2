import axios from 'axios';
import {serveruri, cookieReset} from 'Root/config/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

let sid = undefined;

/**
 * axios와 api파일의 각 함수들의 공통 작업을 연결하기 위한 컨트롤러
 * @param {string} path - API 호출 경로
 * @param {IArguments}} args - 함수의 arguments, MDN참조
 */
export async function apiController(path, args) {
	let existFileField = Object.keys(args[0]).some(v => v.includes('uri'));
	if (existFileField) {
		console.log('첨부파일 uri처리 루틴 진입');
		apiFormController(path, args);
		return;
	}

	try {
		let result = await axios.post(serveruri + path, args[0]);
		if (path.includes('userLogin')) {
			try {
				let cookie = await CookieManager.get(serveruri);
				console.log('경로 %s에 대한 쿠키정보 ', serveruri, cookie);
				if (cookie['connect.sid']) {
					sid = cookie['connect.sid'].value;
					console.log('메모리에 sid정보 불러옴', sid);
					await AsyncStorage.setItem('sid', sid);
					console.log('디스크에 sid정보를 씀', sid);
				}
				console.log('유저로그인', cookie);
			} catch (err) {
				console.log('로그인 에러', err);
				args[2](err + ''); //에러 처리 콜백
			}
		}
		process(path, result, args);
	} catch (err) {
		args[2](err + ''); //에러 처리 콜백
	}
}

/**
 * axios와 api파일의 각 함수들의 공통 작업을 연결하기 위한 컨트롤러
 * FormData를 이용
 * @param {string} path - API 호출 경로
 * @param {IArguments}} args - 함수의 arguments, MDN참조
 */
export async function apiFormController(path, args) {
	try {
		let form = new FormData();
		Object.entries(args[0]).forEach(v => {
			// console.log('uri처리',v);
			if (v[0].includes('uri')) {
				if (typeof v[1] == 'object') {
					//필드에 여러 값을 받을 경우, typeof는 object임(array도 object가 됨)
					// console.log('object처리',v)
					v[1].forEach(file => {
						form.append(v[0], {
							name: file,
							type: 'multipart/form-data',
							uri: file,
						});
					});
				}
				if (typeof v[1] == 'string') {
					//필드에 단일 값을 문자열로 받았을 경우
					// console.log('문자열 처리',v)
					if (v[1].includes('http')) {
						// console.log('http 주소 문자열 처리',v)
						form.append(v[0], v[1]);
						//파라메터 값 형식이 인터넷 주소일경우
					} else {
						// console.log('파일 문자열 처리',v)
						form.append(v[0], {
							name: v[1],
							type: 'multipart/form-data',
							uri: v[1],
						});
						//파라메터 값이 파일일 경우
					}
				}
			} else {
				// console.log('uri 필드가 아님',v)
				if (typeof v[1] == 'object') {
					form.append(v[0], JSON.stringify(v[1]));
				} else {
					form.append(v[0], v[1]);
				}
			}
		});
		console.log('upload form',form);
		let result = await axios.post(serveruri + path, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		process(path, result, args);
	} catch (err) {
		args[2](err + ''); //에러 처리 콜백
	}
}

async function process(path, result, args) {
	if (result.data.status == 200) {
		args[1](result.data);
	} else if (result.data.status == 401) {
		if (!sid) {
			try {
				sid = await AsyncStorage.getItem('sid');
			} catch (err) {
				console.log('디스크에서 sid정보 불러오기 오류', sid);
			}
			console.log('메모리상에 sid 정보가 없어 로컬에서 불러옴', sid);
		}
		console.log('메모리 sid정보', sid);

		if (sid) {
			try {
				let cookie = await cookieReset(sid, path);
				console.log('쿠키 리셋 완료', cookie);
			} catch (err) {
				console.log('쿠키 리셋중 에러', err);
				args[2](err + ''); //에러 처리 콜백
			}
		}
		let result = await axios.post(serveruri + path, args[0]); //한번 더 요청
		if (result.data.status == 200) {
			args[1](result.data);
		} else {
			args[2](result.data.msg); //이 단계에서는 로그인을 하지 않음이 확실해짐
		}
	} else {
		args[2](result.data.msg);
	}
}

//쿠키 리셋 코드
// let token = await AsyncStorage.getItem('token');
// await cookieReset(token);

//export async function (.*?) \(.*?\)\{\n(.*?\n)*?\};
//export async function $1(params, callback, errcallback){\n\tapiController(serveruri,'/user/$1',arguments);\n};
