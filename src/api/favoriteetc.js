import {apiController, apiFormController} from './apiController';

/**
 * 즐겨찾기&취소 (피드외에 신규 추가되는 모든 게시물을 다룸)
 * @param {object} params
 * @param {string} params.collectionName - 타겟 컬렉션 이름
 * @param {string} params.post_object_id - 게시물 object_id
 * @param {string} params.is_favorite - 즐겨찾기를 설정할때는 true, 취소할때는 false를 보내 즐겨찾기를 설정/취소
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function favoriteEtc(params, callback, errcallback) {
	apiController('/favoriteetc/favoriteEtc', arguments);
}
