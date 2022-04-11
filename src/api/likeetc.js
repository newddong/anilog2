import {apiController, apiFormController} from './apiController';

/**
 * 좋아요 & 취소 ( 피드 외에 신규 추가되는 모든 게시물을 다룸)
 * @param {object} params
 * @param {string} params.collectionName - 타겟 컬렉션 이름 'communityobjects' || ''
 * @param {string} params.post_object_id - 게시물 object_id
 * @param {boolean} params.is_like - 좋아요를 설정할때는 true, 취소할때는 false를 보내 좋아요를 설정/취소
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function likeEtc(params, callback, errcallback) {
	apiController('/likeetc/likeEtc', arguments);
}
