import {apiController, apiFormController} from './apiController';

/**
 * 봉사활동 신청서를 작성한다.
 * @param {object} params
 * @param {String} params.shelter_userobject_id - 봉사활동을 희망하는 보호소의 오브젝트 아이디
 * @param {Array.<String>} params.volunteer_wish_date_list - 봉사활동을 희망하는 날자
 * @param {Array.<String>} params.accompany_userobject_id_list - 봉사활동 참여인원 목록(신청자를 포함)
 * @param {String} params.volunteer_delegate_contact - 봉사활동 대표자의 연락처
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function assignVolunteerActivity(params, callback, errcallback) {
	apiController('/volunteer/assignVolunteerActivity', arguments);
}

/**
 * 봉사활동 신청서를 열람한다.
 * @param {object} params
 * @param {string} params.volunteer_activity_object_id - 열람하고자 하는 봉사활동 신청서의 아이디
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getVolunteerActivityById(params, callback, errcallback) {
	apiController('/volunteer/getVolunteerActivityById', arguments);
}

/**
 * 유저의 봉사활동 신청서 목록을 불러온다.
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserVolunteerActivityList(params, callback, errcallback) {
	apiController('/volunteer/getUserVolunteerActivityList', arguments);
	return 1;
}

/**
 * 봉사활동 신청서의 상태를 변경한다.
 * @param {object} params
 * @param {string} params.volunteer_activity_object_id - 상태를 변경하려는 봉사활동 신청서의 아이디
 * @param {'done'|'notaccept'|'accept'|'waiting'|'cancel'} params.volunteer_status - 변경하려고 하는 상태('done'|'notaccept'|'accept'|'waiting'|'cancel')
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setVolunteerActivityStatus(params, callback, errcallback) {
	apiController('/volunteer/setVolunteerActivityStatus', arguments);
}

/**
 * 보호소에 접수된 봉사활동 신청서 목록을 불러온다.(로그인 필요), 봉사활동 신청서의 상태별 필터링 가능
 * @param {object} params
 * @param {string} params.volunteer_activity_object_id - 커서 역할을 할 보호요청 오브잭트(페이징 처리)
 * @param {'done'|'notaccept'|'accept'|'waiting'|'cancel'} params.volunteer_status - 조회하려고 하는 상태('done'|'notaccept'|'accept'|'waiting'|'cancel')
 * @param {number} params.request_number - 봉사활동 신청서 요청 숫자
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getShelterVolunteerActivityList(params, callback, errcallback) {
	apiController('/volunteer/getShelterVolunteerActivityList', arguments);
}
