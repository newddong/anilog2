import {apiController, apiFormController} from './apiController';

/**
 * 소식 정보 생성
 * @param {object} params
 * @param {string} params.notice_user_receive_id - 소식 받는 사용자 UserObjectID
 * @param {string} params.notice_user_related_id - 소식 관계자 UserObjectID
 * @param {string} params.notice_user_contents_kor - 소식 내용 (한글)
 * @param {string} params.notice_user_contents_eng - 소식 내용 (영어)
 * @param {string} params.notice_user_collection - 소식 대상 컬렉션 ('follow'|팔로우,'comment'|댓글,'tag'|태그,'favorite'|즐겨찾기,'like'|좋아요,'volunteer'|봉사활동신청서,'protect'|보호요청신청서)
 * @param {string} params.notice_user_collection_object_id - 소식 대상 컬렉션 Object_id
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createNoticeUser(params, callback, errcallback) {
	apiController('/notice/createNoticeUser', arguments);
}

/**
 * 소식 정보 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getNoticeUserList(params, callback, errcallback) {
	apiController('/notice/getNoticeUserList', arguments);
}
