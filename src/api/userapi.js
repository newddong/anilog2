import {apiController, apiFormController} from './apiController';

/**
 * 유저를 등록하는 함수
 * @param {object} params
 * @param {object} params.user_agreement
 * @param {boolean} params.user_agreement.is_over_fourteen - (동의)14살 이상
 * @param {boolean} params.user_agreement.is_service - (동의)서비스 동의
 * @param {boolean} params.user_agreement.is_personal_info - (동의)개인정보제공
 * @param {boolean} params.user_agreement.is_location_service_info - (동의)위치정보제공
 * @param {boolean} params.user_agreement.is_donation_info - (동의)기부정보
 * @param {boolean} params.user_agreement.is_marketting_info - (동의)마케팅정보
 * @param {object} params.user_address
 * @param {string} params.user_address.city - 사용자 주소(시,도,군)
 * @param {string} params.user_address.district - 사용자 주소(군,구)
 * @param {string} params.user_address.neighbor - 사용자 주소(동,읍,면)
 * @param {string} params.user_mobile_company - 이동통신사
 * @param {string} params.user_name - 유저 이름(실명)
 * @param {string} params.user_password - 유저 패스워드
 * @param {string} params.user_phone_number - 유저 핸드폰 번호
 * @param {string} params.user_nickname - 유저저 닉네임
 * @param {string} params.user_profile_uri - 유저 프로필 사진
 * @param {boolean} params.user_is_verified_phone_number - 핸드폰 인증여부
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function assignUser(params, callback, errcallback) {
	apiController('/user/assignUser', arguments);
}

/**
 * 유저가 등록중인 임시보호/입양할 동물이 있는지 체크
 * 있으면 해당 동물의 정보를 콜백의 오브젝트로 반환
 * @param {object} params
 * @param {string} params.userobject_id - 검색에 사용할 유저 ID(몽고디비 오브젝트 아이디)
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function checkProtectPet(params, callback, errcallback) {
	apiController('/user/checkProtectPet', arguments);
}

/**
 * 반려동물등록
 * 등록 결과를 콜백으로 반환
 *
 * @param {object} params
 * @param {object} params.userobject_id - 등록하고 있는 유저 ID(몽고디비 오브젝트 아이디)
 * @param {string} params.pet_birthday - 동물 생일
 * @param {boolean} params.pet_is_temp_protection - 임시보호 여부
 * @param {'yes'|'no'|'unknown'} params.pet_neutralization - 중성화 여부 {'yes'|'no'|'unknown'}
 * @param {'male'|'female'|'unknown'} params.pet_sex - 성별 { 'male'|'female'|'unknown'}
 * @param {string} params.pet_species - 반려동물의 종류(ex 개, 고양이, 토끼 등)
 * @param {string} params.pet_species_detail - 반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
 * @param {string} params.pet_status - 반려동물의 상태, 임시보호중(protect), 입양됨(adopt), 반려동물(companion) {'protect'|'adopt'|'companion'}
 * @param {string} params.pet_weight - 반려동물 몸무게
 * @param {string} params.user_nickname - 반려동물 닉네임
 * @param {string} params.user_profile_uri - 반려동물 프로필 사진
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function assignPet(params, callback, errcallback) {
	apiController('/user/assignPet', arguments);
}

/**
 * 보호소 등록
 *
 * @param {object} params
 * @param {object} params.shelter_address
 * @param {string} params.shelter_address.brief - 보호소 주소
 * @param {string} params.shelter_address.detail - 보호소 상세 주소
 * @param {string} params.shelter_delegate_contact_number - 보호소 대표전화번호
 * @param {string} params.shelter_foundation_date - 보호소 설립일자
 * @param {string} params.shelter_homepage - 보호소 홈페이지 uri
 * @param {string} params.shelter_name - 보호소 이름
 * @param {'private'|'public'} params.shleter_type - 보호소 타잎 ('private'|'public')
 * @param {string} params.user_email - 보호소 이메일
 * @param {string} params.user_password - 보호소 접속 패스워드
 * @param {string} params.user_profile_uri - 보호소 프로필 사진 uri
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function assignShelter(params, callback, errcallback) {
	apiController('/user/assignShelter', arguments);
}

/**
 * 보호소 코드 체크
 *
 * @param {object} params
 * @param {string} params.shelter_code - 보호소 확인코드
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function checkShelterCode(params, callback, errcallback) {
	apiController('/user/checkShelterCode', arguments);
}

/**
 * 로그인
 *
 * @param {object} params
 * @param {string} params.login_id - 아이디
 * @param {string} params.login_password - 패스워드
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function userLogin(params, callback, errcallback) {
	// console.log('param userLogin', params);
	apiController('/user/userLogin', arguments);
}

/**
 * 로그아웃
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function userLogout(params, callback, errcallback) {
	apiController('/user/userLogout', arguments);
}

/**
 * 유저 프로필조회
 *
 * @param {object} params
 * @param {string} params.userobject_id - 아이디(DB의 유저 객체 ID, _id필드)
 * @param {'user'|'pet'|'shelter'} params.user_type -
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserProfile(params, callback, errcallback) {
	apiController('/user/getUserProfile', arguments);
}

/**
 * 닉네임의 중복을 체크
 *
 * @param {object} params
 * @param {string} params.user_nickname - 중복체크할 닉네임
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function nicknameDuplicationCheck(params, callback, errcallback) {
	apiController('/user/nicknameDuplicationCheck', arguments);
}

/**
 * 유저 정보 수정
 *
 * @param {object} params
 * @param {string} params.userobject_id - 정보를 수정할 유저 몽고디비 도큐먼트 ID
 * @param {string} params.user_nickname - 유저의 수정할 닉네임
 * @param {string} params.user_profile_uri - 유저 프로필 사진 로컬 경로
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateUserInformation(params, callback, errcallback) {
	apiController('/user/updateUserInformation', arguments);
}

/**
 * @typedef UserInterest
 * @property {string} location - 지역 관심사
 * @property {string} activity - 활동 관심사
 */

/**
 * @typedef UserAddress
 * @property {string} city - 시,도
 * @property {string} district - 군,구
 * @property {string} neighbor - 동,읍,면
 * @property {string} brief - 검색주소
 * @property {string} detail - 검색주소(자세히)
 */

/**
 * 유저 상세정보 수정(반려동물, 보호소모두 적용가능)
 *
 * @param {object} params
 * @param {string} params.userobject_id - 정보를 수정할 유저 몽고디비 도큐먼트 ID
 * @param {string} params.user_birthday - 유저 생일, 마이메뉴-프로필 상세정보에서 수정
 * @param {'male'|'female'} params.user_sex - 유저 성별, 마이메뉴-프로필 상세정보에서 수정
 * @param {Array.<UserInterest>} params.user_interests - 유저의 관심사, 마이메뉴-프로필 상세정보에서 수정
 * @param {UserAddress} params.user_address - 유저 지역정보
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateUserDetailInformation(params, callback, errcallback) {
	apiController('/user/updateUserDetailInformation', arguments);
}

/**
 * 반려동물 상세 정보를 수정
 *
 * @param {object} params
 * @param {string} params.userobject_id - 반려동물 유저 객체 ID
 * @param {string} params.pet_species - 반려동물 종
 * @param {string} params.pet_species_detail - 반려동물 상세 품종
 * @param {'male'|'female'|'unknown'} params.pet_sex - 반려동물의 성별
 * @param {'yes'|'no'|'unknown'} params.pet_neutralization - 반려동물 중성화 여부
 * @param {Date} params.pet_birthday - 반려동물 생일
 * @param {String} params.pet_weight - 반려동물 몸무게
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updatePetDetailInformation(params, callback, errcallback) {
	apiController('/user/updatePetDetailInformation', arguments);
}

/**
 * 반려동물의 가족계정에 특정 유저를 추가
 *
 * @param {object} params
 * @param {string} params.userobject_id - 반려동물 유저 객체 ID
 * @param {string} params.family_userobject_id - 반려동물의 가족 계정에 추가할 유저의 ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function addUserToFamily(params, callback, errcallback) {
	apiController('/user/addUserToFamily', arguments);
}

/**
 * 유저의 패스워드를 변경
 *
 * @param {object} params
 * @param {string} params.userobject_id - 비밀번호를 변경하기 위한 유저의 객체 ID
 * @param {string} params.user_password - 유저의 현재 비밀번호
 * @param {string} params.new_user_password - 새로운 유저의 비밀번호
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function changeUserPassword(params, callback, errcallback) {
	apiController('/user/changeUserPassword', arguments);
}

/**
 * 유저의 상세 정보를 조회
 * 유저의 타잎에 따라 정보의 필드가 달라짐
 * @param {object} params
 * @param {string} params.userobject_id - 비밀번호를 변경하기 위한 유저의 객체 ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserInfoById(params, callback, errcallback) {
	apiController('/user/getUserInfoById', arguments);
}

/**
 * 유저의 소개글 변경(로그인 필요)
 *
 * @param {object} params
 * @param {string} params.userobject_id - 변경할 아이디
 * @param {string} params.user_introduction - 변경할 소개글
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateUserIntroduction(params, callback, errcallback) {
	apiController('/user/updateUserIntroduction', arguments);
}

/**
 * 보호소 상세 정보를 수정
 *
 * @param {object} params
 * @param {string} userobject_id - 수정할 보호소 오브젝트 아이디
 * @param {string} shelter_name - 보호소 이름
 * @param {object} params.shelter_address
 * @param {string} params.shelter_address.brief - 보호소 주소
 * @param {string} params.shelter_address.detail - 보호소 상세 주소
 * @param {string} shelter_delegate_contact_number - 보호소 대표 전화번호, 휴대폰 번호
 * @param {string} user_email - 이메일
 * @param {string} shelter_homepage - 보호소 홈페이지 uri
 * @param {string} shelter_foundation_date - 보호소 설립일
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateShelterDetailInformation(params, callback, errcallback) {
	apiController('/user/updateShelterDetailInformation', arguments);
}

/** 유저닉네임으로 유저 계정을 검색, 리스트를 반환
 * @param {object} params
 * @param {string} params.user_nickname - 검색할 유저의 닉네임
 * @param {number} params.request_number - 요청할 유저 계정 숫자
 * @param {string} params.userobject_id - 커서 객체(페이징 처리)
 *
 * @param {string} params.user_type - 조회할 유저의 타잎 {'user'|'shelter'|'pet'}
 *
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getUserListByNickname(params, callback, errcallback) {
	apiController('/user/getUserListByNickname', arguments);
}

/** 가족 계정에서 대상 유저를 삭제
 * @param {object} params
 * @param {string} params.target_userobject_id - 가족계정에서 뺄 유저아이디
 * @param {number} params.pet_userobject_id - 가족계정을 조정할 반려동물아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function removeUserFromFamily(params, callback, errcallback) {
	apiController('/user/removeUserFromFamily', arguments);
}

/** 펫 타입들을 불러온다.
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getPettypes(params, callback, errcallback) {
	apiController('/user/getPettypes', arguments);
}

/** 유저를 팔로우한다.
 * @param {object} params
 * @param {string} params.follow_userobject_id - 팔로우 할 유저아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function followUser(params, callback, errcallback) {
	apiController('/user/followUser', arguments);
}

/** 유저를 팔로우 취소한다.
 * @param {object} params
 * @param {string} params.follow_userobject_id - 팔로우 취소 할 유저아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function unFollowUser(params, callback, errcallback) {
	apiController('/user/unFollowUser', arguments);
}

/** 대상 유저가 팔로우 한 유저를 검색한다.
 * @param {object} params
 * @param {string} params.userobject_id  - 팔로우 목록을 열람할 유저의 아이디.
 * @param {string} params.user_nickname  - 팔로우 목록 중 찾고자 하는 닉네임/
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFollows(params, callback, errcallback) {
	apiController('/user/getFollows', arguments);
}

/** 대상 유저를 팔로우 한 유저를 검색한다.
 * @param {object} params
 * @param {string} params.userobject_id  - 팔로우 목록을 열람할 유저의 아이디.
 * @param {string} params.user_nickname  - 팔로우 목록 중 찾고자 하는 닉네임/
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFollowers(params, callback, errcallback) {
	apiController('/user/getFollowers', arguments);
}

/** 반려동물의 상태를 변경
 * @param {object} params
 * @param {string} params.userobject_id  - 반려동물 _id
 * @param {string} params.pet_status  - 반려동물의 상태  |임시보호중(protect), 입양됨(adopt), 반려동물(companion)|
 * @param {string} params.pet_adopter  - 반려동물 입양자
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setPetStatus(params, callback, errcallback) {
	apiController('/user/setPetStatus', arguments);
}

/** 입양 및 임보로 승인된 동물 중 반려 동물로 등록되지 않은 동물 목록 (로그인한 계정에 준함)
 * @param {object} params
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getAnimalListNotRegisterWithCompanion(params, callback, errcallback) {
	apiController('/user/getAnimalListNotRegisterWithCompanion', arguments);
}

/** 쪽지 보내기
 * @param {object} params
 * @param {string} params.memobox_receive_id  - 쪽지 수신 사용자 ID
 * @param {string} params.memobox_contents  - 쪽지 내용
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createMemoBox(params, callback, errcallback) {
	apiController('/user/createMemoBox', arguments);
}

/** 쪽지 삭제 (userObjectID로 삭제 - 상대방 사용자 대화 내용 모두 삭제)
 * @param {object} params
 * @param {string} params.user_object_id  - 삭제할 user_object _id
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function deleteMemoBoxWithUserObjectID(params, callback, errcallback) {
	apiController('/user/deleteMemoBoxWithUserObjectID', arguments);
}

/** 쪽지 삭제 (memoboxObjectID로 삭제)
 * @param {object} params
 * @param {string} params.memobox_object_id  - 삭제할 memobox_object_id
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function deleteMemoBoxWithMemoBoxObjectID(params, callback, errcallback) {
	apiController('/user/deleteMemoBoxWithMemoBoxObjectID', arguments);
}

/** 쪽지를 보내고 받은 모든 대상으로 1개씩만 가져오기 order by:DESC
 * @param {object} params
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getMemoBoxAllList(params, callback, errcallback) {
	apiController('/user/getMemoBoxAllList', arguments);
}

/** 특정 사용자와의 쪽지 내용 불러오기 order by:ASC
 * @param {object} params
 * @param {string} params.user_object_id  - 쪽지를 주고받은 특정 대상 user_object_id
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getMemoBoxWithReceiveID(params, callback, errcallback) {
	apiController('/user/getMemoBoxWithReceiveID', arguments);
}

/** 쪽지 신고하기 (memoboxObjectID로 신고)
 * @param {object} params
 * @param {string} params.memobox_object_id  - 신고할 memobox_object_id
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setMemoBoxWithReport(params, callback, errcallback) {
	apiController('/user/setMemoBoxWithReport', arguments);
}

/** 로그인 대상으로 상대방을 팔로우 했는지 확인
 * @param {object} params
 * @param {string} params.follow_userobject_id  - 체크할 상대방 userObject ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getChekingFollow(params, callback, errcallback) {
	apiController('/user/getChekingFollow', arguments);
}
