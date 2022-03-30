import {apiController, apiFormController} from './apiController';

/**
 * 공통 코드 정보 생성
 * @param {object} params
 * @param {string} params.common_code_c_name - 컬렉션 이름
 * @param {string} params.common_code_f_name - 필드 이름
 * @param {string} params.common_code_value - 코드 값
 * @param {string} params.common_code_msg_kor - 한글
 * @param {string} params.common_code_msg_eng - 영문
 * @param {string} params.common_code_category - 카테고리 (root:최상의 범주 | topic:주제 | definition:코드 정의)
 * @param {string} params.common_code_spare - 추후 사용을 위한 임시 필드
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createCommonCode(params, callback, errcallback) {
	apiController('/commoncode/createCommonCode', arguments);
}

/**
 * 공통 코드 정보 불러오기
 * @param {object} params
 * @param {string} params.common_code_language - 언어선택
 * @param {string} params.common_code_c_name - 컬렉션 이름
 * @param {string} params.common_code_f_name - 필드 이름
 * @param {string} params.common_code_value - 코드 값
 * @param {string} params.common_code_category - 카테고리 (root:최상의 범주 | topic:주제 | definition:코드 정의)
 * @param {string} params.common_code_spare - 추후 사용을 위한 필드
 * @param {string} params.common_code_out_type - 출력형식 (list:일반나열, interests:관심분야)
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommonCodeDynamicQuery(params, callback, errcallback) {
	apiController('/commoncode/getCommonCodeDynamicQuery', arguments);
}
