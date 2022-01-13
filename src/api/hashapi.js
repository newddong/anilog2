import {apiController, apiFormController} from './apiController';

/**
 * 해시태그 키워드를 가지고 연결된 피드들의 리스트를 검색한다.
 * @param {object} params
 * @param {string} params.hashtag_keyword - 해시태그의 키워드
 * @param {string} params.request_number - 요청할 숫자
 * @param {string} params.feedobject_id - 커서 역할을 할 피드오브잭트(페이징 처리)
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFeedsByHash (params, callback, errcallback){
	apiController('/hash/getFeedsByHash',arguments);
};

/**
 * 등록된 해시태그 키워드를 검색한다. 키워드 목록을 반환한다.
 * @param {object} params
 * @param {string} params.hashtag_keyword - 해시태그의 키워드
 * @param {string} params.request_number - 요청할 숫자
 * @param {string} params.feedobject_id - 커서 역할을 할 피드오브잭트(페이징 처리)
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getHashKeywords (params, callback, errcallback){
	apiController('/hash/getHashKeywords',arguments);
};

