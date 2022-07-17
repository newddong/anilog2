import {apiController, apiFormController} from './apiController';

/**
 * 즐겨찾기&취소 (피드외에 신규 추가되는 모든 게시물을 다룸)
 * @param {object} params
 * @param {string} params.collectionName - 타겟 컬렉션 이름
 * @param {string} params.target_object_id - 게시물 혹은 사용자 object_id
 * @param {string} params.is_favorite - 즐겨찾기를 설정할때는 true, 취소할때는 false를 보내 즐겨찾기를 설정/취소
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setFavoriteEtc(params, callback, errcallback) {
	apiController('/favoriteetc/setFavoriteEtc', arguments);
}

/**
 * 특정 유저의 즐겨찾기 목록 조회 (피드를 제외한 타 게시물)
 * @param {object} params
 * @param {string} params.userobject_id - 게시물 object_id
 * @param {string} params.collectionName - 타겟 컬렉션 이름
 * @param {string} params.community_type - 커뮤니티일 경우 자유게시물과 리뷰글 구별 값 (community_type) - 커뮤니티가 아닐 경우 필드값 보내지 말 것
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFavoriteEtcListByUserId(params, callback, errcallback) {
	apiController('/favoriteetc/getFavoriteEtcListByUserId', arguments);
}

/**
 * 즐겨찾기 리스트로 취소 (피드외에 신규 추가되는 모든 게시물을 다룸)
 * @param {object} params
 * @param {string} params.collectionName - 타겟 컬렉션 이름
 * @param {string} params.target_object_id - 게시물 혹은 사용자 object_id 리스트
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function setFavoriteEtcCancelList(params, callback, errcallback) {
	apiController('/favoriteetc/setFavoriteEtcCancelList', arguments);
}
