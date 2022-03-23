import {apiController, apiFormController} from './apiController';

/**
 * 카테고리 도움말 생성
 * @param {object} params
 * @param {string} params.help_by_category_common_code_id - 공통 코드 ID
 * @param {string} params.help_by_category_title - 카테고리별 도움말 제목
 * @param {string} params.help_by_category_contents - 카테고리별 도움말 내용
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createHelpByCategory(params, callback, errcallback) {
	apiController('/helpbycategory/createHelpByCategory', arguments);
}

/**
 * 카테고리 도움말 불러오기
 * @param {object} params
 * @param {string} params.help_by_category_common_code_id - 공통 코드 Object_ID (topic 카테고리)
 * @param {string} params.help_by_category_title - 카테고리별 도움말 제목
 * @param {string} params.help_by_category_contents - 카테고리별 도움말 내용
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getHelpByCategoryDynamicQuery(params, callback, errcallback) {
	apiController('/helpbycategory/getHelpByCategoryDynamicQuery', arguments);
}

/**
 * 카테고리 제목 검색
 * @param {object} params
 * @param {string} params.searchKeyword - 검색 키워드
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getSearchHelpByCategoryList(params, callback, errcallback) {
	apiController('/helpbycategory/getSearchHelpByCategoryList', arguments);
}
