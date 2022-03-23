import {apiController, apiFormController} from './apiController';

/**
 * 로컬정보를 s3 정보로 변경
 * @param {object} params
 * @param {string} params.s3path_uri - 로컬 경로 uri
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function changeLocalPathToS3Path(params, callback, errcallback) {
	apiController('/community/changeLocalPathToS3Path', arguments);
}