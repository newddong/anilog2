import CookieManager from '@react-native-cookies/cookies';
import appConfig,{DEV,RELEASE,STAGING} from './appConfig';
// export const serveruri = 'http://10.0.2.2:3000';
// export const serveruri = 'http://localhost:3000'
// export const serveruri = {uri:'https://api.zoodoongi.net'};
export const serveruri = {uri:RELEASE?'https://api.pinefriend.net':'https://api.zoodoongi.net'};
// export const serveruri = {uri:'http://localhost:3000'};
// export const serveruri = {uri:'http://10.0.2.2:3000'};


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
