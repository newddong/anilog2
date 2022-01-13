import {apiController} from './apiController';
// export const getUserObject = async (params, callback, errcallback) => {
// 	try {
// 		//서버와 통신
// 		// throw new Error('확인되지 않은 코드');
// 		console.log('pa', params);
// 		setTimeout(callback, 1000, params);
// 	} catch (err) {
// 		setTimeout(errcallback, 1000, err + ''); //에러 처리 콜백
// 	}
// };
/**
 * UserObject 정보 가져오기 [ params - _id]
 *
 * @param {object} params
 * @param {string} params.userobject_id - 유저 고유 아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 */

export async function getUserProfile(params, callback, errcallback) {
	apiController('/user/getUserProfile', arguments);
}

/**
 * 유저 프로필 변경
 *
 * @param {object} params
 * @param {string} params.user_object_id - 사용자 id
 * @param {string} params.new_user_nickname - 변경할 닉네임
 * @param {string} params.user_profile_uri - 변경할 프로필사진 uri
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateUserInformation(params, callback, errcallback) {
	apiController('/user/updateUserInformation', arguments);
}

/**
 * 유저 패스워드 변경
 *
 * @param {object} params
 * @param {string} params.user_password - 사용자 비밀번호
 * @param {string} params.new_user_password - 변경할 비밀번호
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function changeUserPassword(params, callback, errcallback) {
	apiController('/user/changeUserPassword', arguments);
}

/**
 * 유저 닉네임 중복 체크
 *
 * @param {object} params
 * @param {string} params.user_nickname - 중복체크할 유저 닉네임
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function nicknameDuplicationCheck(params, callback, errcallback) {
	apiController('/user/nicknameDuplicationCheck', arguments);
}
// export const getUserProfile = async (params, callback) => {
// 	console.log('para', params.userobject_id);
// 	// console.log('pa, calback', params.user_id);
// 	// console.log('getUserProfile =>' + params.user_id);
// 	try {
// 		let result = await axios.post(serveruri + '/user/getUserProfile', {
// 			userobject_id: params.userobject_id,
// 		});
// 		const {msg, status} = result.data;

// 		if (status === 200) {
// 			// console.log('msg', msg);
// 			callback(msg);
// 		} else {
// 			console.log('getUserProfile Network Error : ' + JSON.stringify(result.data.msg));
// 		}
// 		//서버와 통신
// 		// throw new Error('확인되지 않은 코드');
// 	} catch (err) {
// 		console.log('getUser Profile Cde Error :' + JSON.stringify(err)); //에러 처리 콜백
// 	}
// };

// export const updateUserInformation = async (params, callback) => {
// 	console.log('=========updatUserInfo-----', params);
// 	try {
// 		let result = await axios.post(serveruri + '/user/updateUserInformation', {
// 			userobject_id: params.userobject_id,
// 			user_nickname: params.user_nickname,
// 			user_profile_uri: params.user_profile_uri,
// 		});
// 		const {msg, status} = result.data;

// 		if (status === 200) {
// 			console.log('success ProfileChange');
// 			console.log('return message', msg);
// 			callback(msg);
// 		} else {
// 			console.log('updateUserInfo Network Error : ' + JSON.stringify(msg));
// 		}
// 		//서버와 통신
// 		// throw new Error('확인되지 않은 코드');
// 	} catch (err) {
// 		console.log('updateUserInfo Network Cde Error :' + JSON.stringify(err)); //에러 처리 콜백
// 	}
// };

// export const changeUserPassword = async params => {
// 	console.log('changePassword', params);
// 	let result = await axios.post(serveruri + '/user/changeUserPassord', {
// 		user_password: params.user_password,
// 		new_user_password: params.new_user_password,
// 	});
// 	const {msg, status} = result.data;
// 	if (status === 200) {
// 		console.log(msg);
// 	} else {
// 		console.log('changeUserPassword Network Error :' + JSON.stringify(msg));
// 	}
// };

// export const nicknameDuplicationCheck = async (params, callback) => {
// 	console.log('nicknameDuplicationCheck', params);
// 	let result = await axios.post(serveruri + '/user/nicknameDuplicationCheck', {
// 		user_nickname: params,
// 	});
// 	const {msg, status} = result.data;
// 	if (status === 200) {
// 		console.log('nicknameDup msg', msg);
// 		callback(!msg);
// 		return msg;
// 	} else {
// 		console.log('nicknameDuplicationCheck Network Error :' + JSON.stringify(msg));
// 	}
// };
