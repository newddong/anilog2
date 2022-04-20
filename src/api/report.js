import {apiController, apiFormController} from './apiController';

/**
 * 신고하기 생성
 * @param {object} params
 * @param {string} params.report_target_object_id - 신고대상 오브젝트 ID
 * @param {string} params.report_target_object_type - 신고대상 오브젝트 타입 (컬렉션 네임)
 * @param {string} params.report_target_reason - 신고이유
 * @param {string} params.report_is_delete - 신고 (false), 취소(true)
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createReport(params, callback, errcallback) {
	apiController('/report/createReport', arguments);
}

/**
 * 신고하기 정보 불러오기
 * @param {object} params
 * @param {string} params.report_target_object_id - 신고한 게시물 object_id
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getReportInfo(params, callback, errcallback) {
	apiController('/report/getReportInfo', arguments);
}
