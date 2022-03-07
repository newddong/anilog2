import {apiController} from './apiController';

/**
 * 보호소가 보호중인 동물을 등록한다.
 *
 * @param {object} params
 * @param {Array.<string>} params.protect_animal_photo_uri_list - 보호중인 동물의 사진 로컬 경로 목록
 * @param {string} params.protect_animal_rescue_date - 보호중인 동물의 구조날자
 * @param {string} params.protect_animal_rescue_location - 보호중인 동물의 구조장소
 * @param {string} params.protect_animal_species - 보호중인 동물의 종류(ex 개, 고양이, 토끼)
 * @param {string} params.protect_animal_species_detail - 보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
 * @param {'yes'|'no'|'unknown'} params.protect_animal_neutralization - { 'yes'|'no'|'unknown'} 중성화 여부
 * @param {'male'|'female'|'unknown'} params.protect_animal_sex - 보호중인 동물의 성별
 * @param {string} params.protect_animal_estimate_age - 보호중인 동물의 예상 연령
 * @param {string} params.protect_animal_weight - 보호중인 동물의 몸무게
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function assignShelterAnimal(params, callback, errcallback) {
	apiController('/shelter/assignShelterAnimal', arguments);
}

/**
 * 동물보호 요청 게시물을 작성한다.
 *
 * @param {object} params
 * @param {Array.<String>} protect_request_photos - 보호요청 게시물의 첨부사진 uri
 * @param {String} shelter_protect_animal_object_id - 보호요청할 동물 ID
 * @param {String} protect_request_title - 보호요청 게시물의 제목
 * @param {String} protect_request_content - 보호요청 게시물 내용
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createProtectRequest(params, callback, errcallback) {
	apiController('/shelter/createProtectRequest', arguments);
}

/**
 * 보호요청 가져오기
 *
 * @param {string} params.city - 보존지역 (서울,부산,인천 등등)
 * @param {string} params.protect_animal_species - 보호중이 동물의 종류 (개, 고양이, 새 등등)
 * @param {Boolean} params.adoptable_posts - //입양 가능한 게시글만 보기
 * @param {string} params.protect_request_object_id - 커서 역할을 할 보호요청 오브잭트(페이징 처리)
 * @param {number} params.request_number -  보호요청게시글 요청 숫자
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백 *
 */
export async function getProtectRequestList(params, callback, errcallback) {
	apiController('/shelter/getProtectRequestList', arguments);
}

/**
 * 보호소의 보호중인 동물 리스트 조회
 * 연관 템플릿 - ShelterPRotectRequest(ShelterMenu => 보호요청 게시글 메뉴 )
 * 연관 테이블 - ShelterProtectAnimalObject, ProtectRequestObject,
 * 필요 컬럼 디테일 -
 * ShelterPRotectAnimalObject
 *       [ _id, protect_animal_rescue_location,protect_animal_species ,protect_animal_species_detail,
 * 		 protect_animal_sex, protect_animal_status , protect_animal_protect_request, protect_animal_protect_request_id  ]
 * ProtectRequestObject
 *  	 [ protect_request_photo_thumbnail,  protect_request_status]
 * @param {object} params - token아이디
 * @param {string} params.shelter_protect_animal_object_id - 페이징에 사용할 오브젝트 ID, 입력하면 커서처럼 동작함.
 * @param {number} params.request_number - 요청할 게시물의 숫자
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getShelterProtectAnimalList(params, callback, errcallback) {
	apiController('/shelter/getShelterProtectAnimalList', arguments);
}

/**
 * 대상 유저 오브젝트 아이디의 보호소가 올린 동물보호 요청 게시물 리스트를 불러온다.
 * @param {object} params - token아이디
 * @param {string} params.shelter_userobject_id - 동물보호 요청 리스트를 불러올 대상
 * @param {string} params.protect_request_object_id - 커서 역할을 할 보호요청 오브잭트(페이징 처리)
 * @param {number} params.request_number - 요청할 게시물의 숫자
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getProtectRequestListByShelterId(params, callback, errcallback) {
	apiController('/shelter/getProtectRequestListByShelterId', arguments);
}

/**
 * 보호소에 보호활동(입양,임시보호)신청이 접수된 동물 목록을 조회
 * @param {object} params - token아이디
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getAnimalListWithApplicant(params, callback, errcallback) {
	apiController('/shelter/getAnimalListWithApplicant', arguments);
}

/**
 * 보호소에 등록된 동물의 상세 정보를 조회
 * @param {object} params - token아이디
 * @param {string} params.shelter_protect_animal_object_id - 보호소의 등록된 동물의 오브젝트 아이디.
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getProtectAnimalByProtectAnimalId(params, callback, errcallback) {
	apiController('/shelter/getProtectAnimalByProtectAnimalId', arguments);
}

/**
 * 보호소에 등록된 동물의 상태를 변경
 * @param {object} params - token아이디
 * @param {string} params.shelter_protect_animal_object_id - 보호소의 등록된 동물의 오브젝트 아이디.
 * @param {string} params.protect_animal_status - 동물 상태.
 * @param {string} params.protect_animal_adoptor_id - 입양자 (UserObjectID)
 * @param {string} params.protect_animal_protector_id - 임시보호자 (UserObjectID)
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setShelterProtectAnimalStatus(params, callback, errcallback) {
	apiController('/shelter/setShelterProtectAnimalStatus', arguments);
}

/**
 * 보호소가 보호중인 동물에 관한 요청 게시글 리스트 조회
 * @param {object} params - token아이디
 * @param {string} params.shelter_protect_animal_object_id - 보호소의 등록된 동물의 오브젝트 아이디.
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getProtectRequestListByProtectAnimalId(params, callback, errcallback) {
	apiController('/shelter/getProtectRequestListByProtectAnimalId', arguments);
}

/**
 * 동물보호 요청 게시물을 수정
 * @param {object} params - token아이디
 * @param {string} params.protect_request_object_id - 동물보호 요청 게시물 ID
 * @param {Array.<string>} params.protect_request_photos_uri - 동물보호 요청 게시물 추가 사진 uri
 * @param {Array.<string>} params.protect_photos_to_delete - 삭제할 동물보호 요청 게시물 사진 인덱스 (인덱스 0은 삭제 불가- 인덱스 숫자만 기입)
 * @param {string} params.protect_request_title - 동물보호 요청 게시물 제목
 * @param {string} params.protect_request_content - 동물보호 요청 게시물 내용
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateProtectRequest(params, callback, errcallback) {
	apiController('/shelter/updateProtectRequest', arguments);
}

/**
 * 동물보호 요청 게시물을 삭제
 * @param {object} params - token아이디
 * @param {string} params.protect_request_object_id - 동물보호 요청 게시물 ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function deleteProtectRequest(params, callback, errcallback) {
	apiController('/shelter/deleteProtectRequest', arguments);
}

/**
 * 우리 보호소 출신 동물 - 입양처 보기 조회
 * @param {object} params - token아이디
 * @param {string} params.protect_animal_object_id - 보호 동물 ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getAdoptInfo(params, callback, errcallback) {
	apiController('/shelter/getAdoptInfo', arguments);
}
