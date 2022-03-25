import {apiController, apiFormController} from './apiController';

/**
 * 이용 약관 생성
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {string} params.terms_of_service_title - 이용약관 제목
 * @param {string} params.terms_of_service_contents - 이용약관 내용
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createTermsOfService(params, callback, errcallback) {
	apiController('/termsofservice/createTermsOfService', arguments);
}

/**
 * 이용 약관 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getTermsOfService(params, callback, errcallback) {
	apiController('/termsofservice/getTermsOfService', arguments);
}
