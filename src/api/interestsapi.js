import {apiController, apiFormController} from './apiController';

/**
 * 관심사 내역을 가져온다.
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getInterestsList(params, callback, errcallback) {
	apiController('/interests/getInterestsList', arguments);
}
