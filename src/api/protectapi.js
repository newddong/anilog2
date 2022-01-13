import {apiController, apiFormController} from './apiController';

/**
 * 유저의 보호동물(프로필에서 보여지는) 목록 조회
 *
 * @param {object} params - token아이디
 * @param {string} params.userobject_id - 보호동물을 조회하고 싶은 유저의 오브젝트 아이디.
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserProtectAnimalList(params, callback, errcallback) {
	apiController('/protect/getUserProtectAnimalList', arguments);
}

/**
 * @typedef ProtectCheckList
 * @property {Boolean} is_adult - 성인여부
 * @property {Boolean} is_near_veterinary - 보호지 근처의 동물병원 여부
 * @property {Boolean} is_agreed_housemate - 가족, 동거인의 동의 여부
 * @property {Boolean} is_experience_defecate - 배변훈련 지식여부
 * @property {Boolean} is_knowledge_sanitation - 반려동물 미용,위생 지식여부
 */

/**
 * @typedef ProtectActAddress
 * @property {string} city - 시,도
 * @property {string} district - 군,구
 * @property {string} neighbor - 동,읍,면
 * @property {string} brief - 검색주소
 * @property {string} detail - 검색주소(자세히)
 */

/**
 * @typedef CompanionHistory
 * @property {String} companion_pet_species - 이전 반려동물의 종류
 * @property {String} companion_pet_age - 이전 반려동물의 나이
 * @property {String} companion_pet_period - 기른 기간
 * @property {'living'|'died'|'adopted'} companion_pet_current_status - 상태정보 카테고리 정해야함
 */

/**
 * 동물보호(입양, 임시보호) 신청
 *
 * @param {object} params
 * @param {'protect'|'adopt'} params.protect_act_type - 신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
 * @param {String} params.protect_request_object_id - 대상 보호신청 게시글
 * @param {Array.<CompanionHistory>} params.protect_act_companion_history - 보호 신청자의 반려생활 이력
 * @param {ProtectActAddress} params.protect_act_address - 보호 신청자의 주소
 * @param {String} params.protect_act_phone_number - 보호 신청자의 전화번호
 * @param {ProtectCheckList} params.protect_act_checklist - 보호신청 체크리스트
 * @param {String} params.protect_act_motivation - 보호활동 신청동기
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 *
 */
export async function createProtectActivity(params, callback, errcallback) {
	apiController('/protect/createProtectActivity', arguments);
}

/**
 * 유저의 동물보호 신청내역 가져오기
 * (입양신청, 임시보호 신청, 봉사활동 신청 - 한 화면에서 입양신청 1개, 임시보호 신청 1개, 봉사활동 신청 3 ~ 4개 표출)
 * @param {object} params
 * @param {string} params.userobject_id - 사용자 계정 id
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 *
 */
export async function getAppliesRecord(params, callback, errcallback) {
	apiController('/protect/getAppliesRecord', arguments);
}

/**
 * 유저의 보호활동(입양,임시보호) 신청 내역을 가져오기
 * @param {object} params
 * @param {'protect'|'adopt'} params.protect_act_type - 가져올 보호 활동의 종류, 임시보호(protect), 입양(adopt) {'protect'|'adopt'}
 * @param {number} params.request_number - 요청할 게시물의 숫자
 * @param {string} params.protect_act_object_id - 페이징을 위한 오브젝트 객체 아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserAdoptProtectionList(params, callback, errcallback) {
	apiController('/protect/getUserAdoptProtectionList', arguments);
}

/**
 * 유저의 보호활동(입양,임시보호) 신청서 자세히 보기
 * @param {object} params
 * @param {string} params.protect_act_object_id - 불러올 신청서의 오브젝트 아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getApplyDetailById(params, callback, errcallback) {
	apiController('/protect/getApplyDetailById', arguments);
}

/**
 * 보호활동 신청서의 상태를 변경
 * @param {object} params
 * @param {string} params.protect_act_object_id - 변경할 신청서의 오브젝트 아이디
 * @param {string} params.protect_act_status - 변경할 신청서의 상태('accept'|'denied'|'cancel'|'wait')
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setProtectActivityStatus(params, callback, errcallback) {
	apiController('/protect/setProtectActivityStatus', arguments);
}

/**
 * 동물보호요청 게시물의 상태를 변경
 * @param {object} params
 * @param {string} params.protect_request_object_id - 변경할 보호요청 게시물의 오브젝트 아이디
 * @param {string} params.protect_request_status - 변경할 보호요청 게시물의 상태('rescue'|'discuss'|'nearrainbow'|'complete')
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setProtectRequestStatus(params, callback, errcallback) {
	apiController('/protect/setProtectRequestStatus', arguments);
}

/**
 * 대상 동물보호 게시물에 동물보호를 신청한 신청자의 리스트
 * @param {object} params
 * @param {string} params.protect_request_object_id - 신청자 리스트를 불러올 보호요청 게시물의 오브젝트 아이디
 * @param {string} params.protect_request_status - 리스트의 보호요청 게시물의 상태('rescue'|'discuss'|'nearrainbow'|'complete')필터
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getProtectApplicantList(params, callback, errcallback){
	apiController( '/protect/getProtectApplicantList', arguments);
};


/**
 * 동물보호 요청 게시글 상세조회
 * @param {object} params
 * @param {string} params.protect_request_object_id - 동물보호 요청 게시물 오브젝트 아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getProtectRequestByProtectRequestId(params, callback, errcallback){
	apiController( '/protect/getProtectRequestByProtectRequestId', arguments);
	};
