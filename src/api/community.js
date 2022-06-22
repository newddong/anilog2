import {apiController, apiFormController} from './apiController';

/**
 * 로컬경로 s3로 변경
 * @param {object} params
 * @param {string} params.s3path_uri - 로컬 주소
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function changeLocalPathToS3Path(params, callback, errcallback) {
	apiController('/community/changeLocalPathToS3Path', arguments);
}
/**
 * 커뮤니티를 불러옴
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {Array} params.community_animal_type
 * @param {string} params.interests_city
 * @param {string} params.interests_district
 * @param {string} params.interests_trip
 * @param {string} params.interests_hospital
 * @param {string} params.interests_interior
 * @param {string} params.interests_etc
 * @param {string} params.interests_review
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommunityList(params, callback, errcallback) {
	apiController('/community/getCommunityList', arguments);
}

/**
 * 커뮤니티 페이지 번호 클릭 형식 페이징 불러옴(필터 적용)
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.target_object_id - 타겟 object_id (상세 페이지에 들어간 상태가 아니면 필드 보내지 말 것!)
 * @param {string} params.community_free_type - 커뮤니티 타입 (|'all'|'talk'|'question'|'meeting')
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommunityListFreeByPageNumber(params, callback, errcallback) {
	apiController('/community/getCommunityListFreeByPageNumber', arguments);
}

/**
 * 커뮤니티 제목 내용 검색
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.searchKeyword - 검색 키워드
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getSearchCommunityList(params, callback, errcallback) {
	apiController('/community/getSearchCommunityList', arguments);
}

/**
 * 특정 유저가 작성한 커뮤니티를 불러옴
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.userobject_id - 작성자 userobject _id
 * @param {string} params.community_type - 게시글의 타입 (전체글|'all', 자유게시판|'free', 리뷰|'review')
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommunityListByUserId(params, callback, errcallback) {
	apiController('/community/getCommunityListByUserId', arguments);
}

/**
 * 커뮤니티 게시물 신규 작성
 * @param {object} params
 * @param {string} params.community_title - 커뮤니티 제목
 * @param {string} params.community_content - 커뮤니티 본문
 * @param {string} params.community_avatar_id - 커뮤니티의 작성자로 지정하고 싶은 반려동물 ID
 * @param {string} params.community_location - 커뮤니티 작성 지역
 * @param {string} params.community_is_temporary - 임시 저장 여부
 * @param {string} params.community_interests - 커뮤니티 게시글의 타입
 * @param {string} params.community_type - 커뮤니티 관심사 항목 키워드
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createCommunity(params, callback, errcallback) {
	apiController('/community/createCommunity', arguments);
}

/**
 * 커뮤니티 게시물 업데이트 및 삭제
 * @param {object} params
 * @param {string} params.community_object_id - 커뮤니티 게시글의 object ID
 * @param {string} params.community_content - 커뮤니티 본문
 * @param {string} params.community_is_temporary - 임시저장 여부
 * @param {string} params.community_is_delete - 삭제 여부
 * @param {string} params.community_is_recomment - 추천 게시물 여부
 * @param {string} params.community_is_attached_file - 이미지, 동영상 첨부 여부
 * @param {string} params.community_free_type - 자유게시판 타입 - (잡담|'talk', 질문|'qustion', 모임'meeting')
 * @param {string} params.community_animal_type - 글 내용 동물 타입 - (개|'doc', 고양이|'cat', 기타|'etc')
 * @param {string} params.community_interests - 관심사 항목 키워드
 * @param {string} params.community_address - 커뮤니티 리뷰 관련 주소
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateAndDeleteCommunity(params, callback, errcallback) {
	apiController('/community/updateAndDeleteCommunity', arguments);
}

/**
 * 커뮤니티 오브젝트 ID로 상세 정보 불러오기
 * @param {object} params
 * @param {string} params.community_object_id - 커뮤니티 게시물 object _id
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommunityByObjectId(params, callback, errcallback) {
	apiController('/community/getCommunityByObjectId', arguments);
}
