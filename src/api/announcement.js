import {apiController, apiFormController} from './apiController';

/**
 * 공지 생성
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {string} params.announcement_title - 공지사항 제목
 * @param {string} params.announcement_contents - 본문 내용
 * @param {Array.<string>} params.announcement_uri - 첨부파일 uri리스트 (첨부 이미지)
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createAnnouncement(params, callback, errcallback) {
	apiController('/announcement/createAnnouncement', arguments);
}

/**
 * 공지 모두 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getAllAnnouncement(params, callback, errcallback) {
	apiController('/announcement/getAllAnnouncement', arguments);
}
