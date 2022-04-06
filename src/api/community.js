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
 * @param {string} params.community_type - 커뮤니티 타입 (전체글|'all'|'free'|'review')
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommunityList(params, callback, errcallback) {
	apiController('/community/getCommunityList', arguments);
}

/**
 * 커뮤니티 제목 내용 검색
 * @param {object} params
 * @param {string} params.searchKeyword - 검색 키워드
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getSearchCommunityList(params, callback, errcallback) {
	apiController('/community/getSearchCommunityList', arguments);
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
