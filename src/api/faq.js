import {apiController, apiFormController} from './apiController';

/**
 * 자주 묻는 질문 생성
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {string} params.faq_title - 자주 묻는 질문 제목
 * @param {string} params.faq_contents - 자주 묻는 질문 내용
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createFaq(params, callback, errcallback) {
	apiController('/faq/createFaq', arguments);
}

/**
 * 자주 묻는 질문 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFaq(params, callback, errcallback) {
	apiController('/faq/getFaq', arguments);
}
