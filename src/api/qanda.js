import {apiController, apiFormController} from './apiController';

/**
 * 문의하기 생성
 * @param {object} params
 * @param {string} params.qanda_common_code_id - 공통 코드 Object_ID (topic 카테고리)
 * @param {string} params.qanda_question_title - 문의 제목
 * @param {string} params.qanda_question_contents - 문의 내용
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createQandA(params, callback, errcallback) {
	apiController('/qanda/createQandA', arguments);
}

/**
 * 문의하기 정보 불러오기
 * @param {object} params
 * @param {string} params.qanda_object_id - Q&A Object_ID
 * @param {string} params.qanda_user_id - Q&A 사용자 계정 Object_ID
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getQandInfo(params, callback, errcallback) {
	apiController('/qanda/getQandInfo', arguments);
}

/**
 * 문의하기 수정(사용자)
 * @param {object} params
 * @param {string} params.qanda_object_id - 수정할 QandA Object_ID
 * @param {string} params.qanda_common_code_id - 공통 코드 Object_ID (topic 카테고리)
 * @param {string} params.qanda_question_title - 수정할 문의 제목
 * @param {string} params.qanda_question_contents - 수정할 문의 내용
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateQandAWithUser(params, callback, errcallback) {
	apiController('/qanda/updateQandAWithUser', arguments);
}

/**
 * 문의하기 삭제
 * @param {object} params
 * @param {string} params.qanda_object_id - 삭제할 QandA Object_ID
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function deleteQandA(params, callback, errcallback) {
	apiController('/qanda/deleteQandA', arguments);
}

/**
 * 문의하기 답변달기 및 수정하기
 * @param {object} params
 * @param {string} params.qanda_object_id - 답변달기 및 수정할 QandA Object_ID
 * @param {string} params.qanda_common_code_id - 공통 코드 Object_ID (topic 카테고리)
 * @param {string} params.qanda_status - Q&A 상태  (waiting 대기중 | confirmming  관리자 확인중 | complete 답변완료)
 * @param {string} params.qanda_answer_contents - Q&A 답변 내용
 * @param {string} params.qanda_is_delete - 삭제 여부
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateQandAWithAdmin(params, callback, errcallback) {
	apiController('/qanda/updateQandAWithAdmin', arguments);
}
