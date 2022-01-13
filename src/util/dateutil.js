/**
 * 몽고디비의 시간 표시형식 YYYY-MM-DDTHH:mm:ss.sssZ를(2021-12-28T07:39:48.018Z)을 
 * 현재의 시간 기준으로 얼마정도 전인지를 간단하게 표시(~일전, ~시간 전, ~분전, 방금)
 * 
 * @param {string} date_mongo - 변환하고자 하는 시간 YYYY-MM-DDTHH:mm:ss.sssZ 형식으로 string으로 입력한다.
 * @example
 * getTimeLapsed('2021-12-28T07:39:48.018Z')
 */
export function getTimeLapsed(date_mongo){
    let date = date_mongo.match(/(\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}).*?$/);
    // console.log(date);
    // console.log(new Date().toTimeString());
    let dateobj = new Date(date[1]);

    let timelapsed = Date.now() - new Date(date[1]);
    let hourOffset = 1000*60*60*9;
    let localtime = Platform.OS == 'ios' ? hourOffset : 0;
    timelapsed = timelapsed - localtime; //UTC 시간차
    let day = Math.floor(timelapsed / 1000 / 60 / 60 / 24);
    let hour = Math.floor(timelapsed / 1000 / 60 / 60);
    let min = Math.floor(timelapsed / 1000 / 60);
    let sec = Math.ceil(timelapsed / 1000);
    // console.log(day > 0 ? `${day}일 전` : hour > 0 ? `${hour} 시간 전` : min > 0 ? `${min} 분 전` : `방금`);
    return day > 0 ? `${day}일 전` : hour > 0 ? `${hour} 시간 전` : min > 0 ? `${min} 분 전` : `방금`;
};

/**
 * 몽고디비의 시간 표시형식 YYYY-MM-DDTHH:mm:ss.sssZ를(2021-12-28T07:39:48.018Z)을
 * YYYY년 MM월 DD일로 표시
 * 
 * @param {string} date_mongo - 변환하고자 하는 시간 YYYY-MM-DDTHH:mm:ss.sssZ 형식으로 string으로 입력한다.
 * @example
 * parsingDate('2021-12-28T07:39:48.018Z')
 */
export function parsingDate(date_mongo){
    let temp = date_mongo.match(/(\d{4})-(\d{1,2})-(\d{1,2}).*?$/);
    return `${temp[1]}년 ${temp[2]}월 ${temp[3]}일`;
};