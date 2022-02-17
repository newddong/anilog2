/**
 * 문자열의 특정 위치근처 에서 구분되는 단어를 찾는다. #,@,' ',\n로 구분되는 단어를 반환
 * 
 * @param {number} position - 검색하고자하는 위치
 * @param {string} string - 검색하고자하는 대상 문자열
 * @example
 */
export function findTagAt(position, string){
    
    let checkChar = [' ','@','#','\n'];
    let foreIndx = Math.max.apply(null,checkChar.map(v=>string.lastIndexOf(v,position-1)));
    let aftIndx =  Math.min.apply(null,checkChar.map(v=>{
        let indx = string.indexOf(v,position);
        if(indx<0)return 999999;
        else return indx;
    }));
    return string.slice(foreIndx,aftIndx)
}

/**
 * 현재 position에서 가장 가까운 태그 시작 위치 '#','@' 의 인덱스를 찾는다.
 * 
 * @param {number} position - 검사하고자하는 위치
 * @param {string} string - 태그의 시작 위치를 찾고자하는 문자열
 * @example
 */
export function findStartIndexOfTag(position, string){
    
    let checkChar = [' ','@','#','\n'];
    let foreIndx = Math.max.apply(null,checkChar.map(v=>string.lastIndexOf(v,position-1)));
    return foreIndx;
}

/**
 * 현재 position에서 가장 가까운 태그 마지막 위치 '#','@' 의 인덱스를 찾는다.
 * 
 * @param {number} position - 검사하고자하는 위치
 * @param {string} string - 태그의 시작 위치를 찾고자하는 문자열
 * @example
 */
 export function findEndIndexOfTag(position, string){
    
    let checkChar = [' ','@','#','\n'];
    let aftIndx =  Math.min.apply(null,checkChar.map(v=>{
        let indx = string.indexOf(v,position);
        if(indx<0)return 999999;
        else return indx;
    }));
    return aftIndx;
}

/**
 * 대상 문자열이 태그인지 아닌지 판별
 * @param {string} string 
 */
export function isTag(string){
    let checkChar = ['#','@'];
    return checkChar.some(v=>string[0]==v);
}


/**
 * 태그에서 기호를 땐다
 * @param {string} string
 */
export function getTagName(string){
    let checkChar = ['#','@'];
    if(checkChar.some(v=>string[0]==v))return string.substring(1);
    return string;
}


/**
 * 01010041004 -> 010-1004-1004 포맷 정규식 함수
 * @param {string} num
 */
 export function phoneFomatter(num){
    var formatNum = '';
    if (!num) return;
    if (num.length == 11) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
        if (num.indexOf('02') == 0) {
            formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        } else {
            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
    }
    console.log(formatNum, 'formatNum');
    return formatNum;
};