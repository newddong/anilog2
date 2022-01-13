import {apiController, apiFormController} from './apiController';

/**
 * @typedef Tags
 * @property {string} tag_user_id - 태그된 유저의 아이디
 * @property {number} position_x - 태그의 사진 프레임에서 x좌표
 * @property {number} position_y - 태그의 사진 프레임에서 y좌표
 */

/**
 * @typedef FeedMedias
 * @property {boolean} is_video - 동영상 여부
 * @property {number} duration - 동영상 재생 시간
 * @property {string} media_uri - 미디어의 uri(서버에서 처리)
 * @property {Array.<Tags>} tags - 미디어의 태그 목록
 */

/**
 * 피드 작성
 *
 * @param {object} params
 * @param {string} params.feed_content - 피드 텍스트 내용
 * @param {string} params.feed_location - 피드 작성 지역
 * @param {string} params.feed_avatar_id - 피드의 작성자로 지정하고 싶은 반려동물 ID
 * @param {boolean} params.feed_is_protect_diary - 피드가 임보일기인지 정함 T/F
 * @param {Array.<string>} params.media_uri - 피드 첨부파일 uri리스트
 * @param {Array.<FeedMedias>} params.feed_medias - 첨부 객체정보 리스트
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createFeed(params, callback, errcallback){
	apiController('/feed/createFeed',arguments);
};

/**
 * 실종 게시물 작성
 *
 * @param {object} params
 * @param {string} params.feed_content - 게시물 내용
 * @param {string} params.feed_location - 게시물 작성 지역
 * @param {Array.<string>} params.media_uri - 게시물 첨부파일 uri리스트
 * @param {Array.<FeedMedias>} params.feed_medias - 첨부 객체정보 리스트
 * @param {string} params.missing_animal_date - 실종 동물 실종 추정일자
 * @param {Number} params.missing_animal_age - 실종 동물 나이
 * @param {string} params.missing_animal_features - 실종 동물 특징
 * @param {string} params.missing_animal_contact - 실종 동물의 주인 연락처
 * @param {string} params.missing_animal_lost_location - 실종 동물 실종 지점
 * @param {'male'|'female'|'unknown'} params.missing_animal_sex - 실종 동물 성별
 * @param {string} params.missing_animal_species - 실종 동물 종류(개, 고양이, 새)
 * @param {string} params.missing_animal_species_detail - 실종 동물 세부 종류(리트리버,푸들,말티즈)
 *
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createMissing(params, callback, errcallback){
	apiController('/feed/createMissing',arguments);
};


/**
 * 제보 게시물 작성
 *
 * @param {object} params
 * @param {string} params.feed_content - 제보 게시물 내용
 * @param {string} params.feed_location - 제보 게시물 작성 지역
 * @param {Array.<string>} params.media_uri - 제보 게시물 첨부파일 uri리스트
 * @param {Array.<FeedMedias>} params.feed_medias - 첨부 객체정보 리스트
 * @param {string} report_witness_date - 제보일자
 * @param {string} report_witness_location - 제보장소
 * @param { String} report_animal_species - 제보 동물의 종류(ex 강아지, 고양이, 토끼 등)
 * @param { String} report_animal_species_detail - 제보 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
 * @param { 'male'|'female'|'unknown'} report_animal_sex - 제보 동물의 성별
 * @param { String} report_animal_age - 제보 동물의 나이
 * @param { String} report_animal_contact - 제보자  연락처
 * @param { String} report_animal_features - 제보 동물의 특징
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function createReport(params, callback, errcallback){
	apiController('/feed/createReport',arguments);
};


/**
 * 특정 유저가 작성한 피드 리스트를 불러온다.
 *
 * @param {object} params
 * @param {string} params.userobject_id - 피드 리스트를 불로오고자 하는 유저의 몽고디비 아이디
 * @param {number} params.request_number - 요청할 리스트의 갯수
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
export async function getFeedListByUserId(params, callback, errcallback){
	apiController('/feed/getFeedListByUserId',arguments);
};



/**
 * 실종/제보 가져오기
 *
 * @param {string} params.city - 제보지역 (서울,부산,인천 등등)
 * @param {string} params.missing_animal_species - 보호중인 동물의 종류 (개, 고양이, 새 등등)
 * @param {string} params.feedobject_id - 커서 역할을 할 실종/제보 피드오브잭트(페이징 처리)
 * @param {number} params.request_number - 요청할 숫자
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
*/
 export async function getMissingReportList(params, callback, errcallback){
	apiController('/feed/getMissingReportList',arguments);
};


/**
 * 피드,실종,제보 게시글 상세정보 가져오기
 * 실종글일 경우 제보글 데이터의 report_witness_date, report_witness_location가 null 값인 상태에서 가져오면 됨.
 *
 * @param {string} params.feedobject_id - 피드 ID
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getFeedDetailById(params, callback, errcallback){
	apiController('/feed/getFeedDetailById',arguments);
};



/**
 * 추천 피드 리스트를 불러온다(홈)
 *
 * @param {({}:object)=>void} callback - API응답처리 콜백
 * @param {(errmsg:string)=>void} errcallback - 에러처리 콜백
 */
 export async function getSuggestFeedList(params, callback, errcallback){
	apiController('/feed/getSuggestFeedList',arguments);
};