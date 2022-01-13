import {apiController, apiFormController} from './apiController';


/**
 * 행정구역 불러오기
 *
 * @param {object} params
 * @param {string} params.city - 광역시도
 * @param {string} params.district - 시구군
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getAddressList(params, callback, errcallback){
	apiController('/address/getAddressList',arguments);
};
