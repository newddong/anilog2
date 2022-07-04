import CookieManager from '@react-native-cookies/cookies';

// export const serveruri = 'http://10.0.2.2:3000';
// export const serveruri = 'http://localhost:3000'
// export const serveruri = 'http://172.30.1.55:3000';
// export const serveruri = 'http://220.71.26.184:3000';
// export const serveruri = 'http://59.6.205.186:3000';
// export const serveruri = {uri:'https://api.zoodoongi.net'};
export const serveruri = {uri:'https://api.pinefriend.net'};
// export const serveruri = 'https://api.pinefriend.net';



export const cookieReset = async (token, path) => {
	// console.log('토큰',token,)
	// console.log('경로',path)

	await CookieManager.clearAll();
	await CookieManager.set(serveruri.uri, {
		name: 'connect.sid',
		value: token,
		path: '/',
	});
	return await CookieManager.get(serveruri.uri);
};
