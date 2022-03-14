import {apiController, apiFormController} from './apiController';

/**
 * 서비스 약관 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getServicecenter(params, callback, errcallback) {
	apiController('/servicecenter/getServicecenter', arguments);
}
