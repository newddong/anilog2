import {apiController, apiFormController} from './apiController';

/**
 * 공개 설정 정보 생성
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createSettingPublic(params, callback, errcallback) {
	apiController('/settingpublic/createSettingPublic', arguments);
}

/**
 * 공개 설정 정보 불러오기
 * @param {object} params
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getSettingPublic(params, callback, errcallback) {
	apiController('/settingpublic/getSettingPublic', arguments);
}

/**
 * 공개 설정 상태 업데이트
 * @param {object} params
 * @param {boolean} params.setting_public_all - 공개 설정 전체 공개
 * @param {boolean} params.setting_public_my_feed - 공개 설정 내 피드 비공개
 * @param {boolean} params.setting_public_my_tag_post - 공개 설정 내 태그 게시글 비공개
 * @param {boolean} params.setting_public_community_post - 공개 설정 내 커뮤니티 게시글 비공개
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateSettingPublic(params, callback, errcallback) {
	apiController('/settingpublic/updateSettingPublic', arguments);
}
