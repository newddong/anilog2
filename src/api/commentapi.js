import {apiController, apiFormController} from './apiController';

/**
 * 댓글과 대댓글 작성
 *
 * @param {object} params
 * @param {string} params.comment_photo_uri - 댓글 첨부 이미지 uri
 * @param {string} params.comment_contents - 댓글 내용
 * @param {string} params.commentobject_id - 대댓글이 달린 댓글의 ID
 * @param {string} params.feedobject_id - 댓글이 작성된 피드 게시물
 * @param {string} params.protect_request_object_id - 댓글이 작성된 동물보호 요청 게시물
 * @param {Boolean} params.comment_is_secure - true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createComment(params, callback, errcallback) {
	apiController('/comment/createComment', arguments);
}

/**
 * 피드(피드,실종,제보)댓글 리스트 불러오기
 *
 * @param {object} params
 * @param {string} params.feedobject_id - 댓글을 불러올 피드 게시물의 ID
 * @param {number} params.request_number - 댓글의 요청 숫자
 * @param {string} params.commentobject_id - 커서 역할을 할 코맨트(해당 ID의 코맨트 이전부터 불러옴)
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommentListByFeedId(params, callback, errcallback) {
	apiController('/comment/getCommentListByFeedId', arguments);
}

/**
 * 동물보호요청게시글 댓글 리스트 불러오기
 *
 * @param {object} params
 * @param {string} params.protect_request_object_id - 댓글을 불러올 동물보호요청 게시물의 ID
 * @param {number} params.request_number - 댓글의 요청 숫자
 * @param {string} params.commentobject_id - 커서 역할을 할 코맨트(해당 ID의 코맨트 이전부터 불러옴)
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommentListByProtectId(params, callback, errcallback) {
	apiController('/comment/getCommentListByProtectId', arguments);
}

/**
 * 해당 댓글의 대댓글 불러오기
 *
 * @param {object} params
 * @param {string} params.commentobject_id - 대댓글을 불러올 코맨트
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getChildCommentList(params, callback, errcallback) {
	apiController('/comment/getChildCommentList', arguments);
}

/**
 * 댓글/대댓글 삭제 (실제로 지워지지는 않고 comment_is_delete 필드값만 true로 변경)
 *
 * @param {object} params
 * @param {string} params.commentobject_id - 댓글/대댓글을 불러올 object ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function deleteComment(params, callback, errcallback) {
	apiController('/comment/deleteComment', arguments);
}

/**
 * 댓글/대댓글 수정 (현재 내용 및 비밀글 설정값 모두 보낼 것 - 이미지 수정은 추후 재개발 예정).
 *
 * @param {object} params
 * @param {string} params.commentobject_id - 댓글/대댓글을 불러올 object ID
 * @param {string} params.comment_contents - 댓글/대댓글 내용
 * @param {string} params.comment_is_secure - 댓글/대댓글 비밀글 설정
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function updateComment(params, callback, errcallback) {
	apiController('/comment/updateComment', arguments);
}

/**
 * 댓글/대댓글에 좋아요 설정
 *
 * @param {object} params
 * @param {string} params.commentobject_id - 좋아요를 누른 댓글/대댓글의 object ID
 * @param {string} params.userobject_id - 댓글/대댓글에 좋아요를 누른 유저의 object ID
 * @param {string} params.is_like - 좋아요 T/F
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function likeComment(params, callback, errcallback) {
	apiController('/comment/likeComment', arguments);
}

/**
 * 커뮤니티 게시물 댓글 리스트 불러오기
 * @param {object} params
 * @param {string} params.community_object_id - 댓글을 불러올 커뮤니티 게시물의 ID
 * @param {string} params.commentobject_id - 커서 역할을 할 코맨트(해당 ID의 코맨트 이전부터 불러옴)
 * @param {number} params.request_number - 댓글의 요청 숫자
 * @param {function} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getCommentListByCommunityId(params, callback, errcallback) {
	apiController('/comment/getCommentListByCommunityId', arguments);
}
