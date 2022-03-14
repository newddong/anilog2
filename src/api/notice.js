import {apiController, apiFormController} from './apiController';

/**
 * 알림 정보 생성
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createNotice(params, callback, errcallback) {
	apiController('/notice/createNotice', arguments);
}

/**
 * 알림 정보 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getNotice(params, callback, errcallback) {
	apiController('/notice/getNotice', arguments);
}

/**
 * 알림 상태 업데이트
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {boolean} params.notice_all - 전체 알림
 * @param {boolean} params.notice_newfollower - 팔로워 새 게시글 알림
 * @param {boolean} params.notice_favorite_protect_request - 즐겨찾은 보호요청 상태 변경 알림
 * @param {boolean} params.notice_pet_vaccination - 반려동물의 접종 예정일 알림
 * @param {boolean} params.notice_my_post - 내 게시글 알림
 * @param {boolean} params.notice_comment_on_my_post - 내 게시글에 달린 댓글 알림
 * @param {boolean} params.notice_tag_follower - 나를 태그하거나 팔로우시 알림
 * @param {boolean} params.notice_my_applicant - 내 신청서 상태 변경시 알림
 * @param {boolean} params.notice_alarm - 공지 알림
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateNotice(params, callback, errcallback) {
	apiController('/notice/updateNotice', arguments);
}
