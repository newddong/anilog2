/**
 * 문자열의 특정 위치근처 에서 구분되는 단어를 찾는다. #,@,' ',\n로 구분되는 단어를 반환
 *
 * @param {number} position - 검색하고자하는 위치
 * @param {string} string - 검색하고자하는 대상 문자열
 * @example
 */
export function findTagAt(position, string) {
	let checkChar = [' ', '@', '#', '\n'];
	let foreIndx = Math.max.apply(
		null,
		checkChar.map(v => string.lastIndexOf(v, position - 1)),
	);
	let aftIndx = Math.min.apply(
		null,
		checkChar.map(v => {
			let indx = string.indexOf(v, position);
			if (indx < 0) return 999999;
			else return indx;
		}),
	);
	return string.slice(foreIndx, aftIndx);
}

/**
 * 현재 position에서 가장 가까운 태그 시작 위치 '#','@' 의 인덱스를 찾는다.
 *
 * @param {number} position - 검사하고자하는 위치
 * @param {string} string - 태그의 시작 위치를 찾고자하는 문자열
 * @example
 */
export function findStartIndexOfTag(position, string) {
	let checkChar = [' ', '@', '#', '\n'];
	let foreIndx = Math.max.apply(
		null,
		checkChar.map(v => string.lastIndexOf(v, position - 1)),
	);
	return foreIndx;
}

/**
 * 현재 position에서 가장 가까운 태그 마지막 위치 '#','@' 의 인덱스를 찾는다.
 *
 * @param {number} position - 검사하고자하는 위치
 * @param {string} string - 태그의 시작 위치를 찾고자하는 문자열
 * @example
 */
export function findEndIndexOfTag(position, string) {
	let checkChar = [' ', '@', '#', '\n'];
	let aftIndx = Math.min.apply(
		null,
		checkChar.map(v => {
			let indx = string.indexOf(v, position);
			if (indx < 0) return 999999;
			else return indx;
		}),
	);
	return aftIndx;
}

/**
 * 대상 문자열이 태그인지 아닌지 판별
 * @param {string} string
 */
export function isTag(string) {
	let checkChar = ['#', '@'];
	return checkChar.some(v => string[0] == v);
}

/**
 * 태그에서 기호를 땐다
 * @param {string} string
 */
export function getTagName(string) {
	let checkChar = ['#', '@'];
	if (checkChar.some(v => string[0] == v)) return string.substring(1);
	return string;
}

/**
 * 01010041004 -> 010-1004-1004 포맷 정규식 함수
 * @param {string} num
 */
export function phoneFomatter(num) {
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
	// console.log(formatNum, 'formatNum');
	return formatNum;
}

/**
 * 좋아요 숫자 k 단위로 환산
 * @param {string} num
 */
export const count_to_K = cnt => {
	if (cnt > 1000000) {
		let count = (cnt / 1000000).toFixed(0) + 'm';
		return count;
	} else if (cnt > 1000) {
		let count = (cnt / 1000).toFixed(0) + 'k';
		return count;
	} else {
		return cnt;
	}
};

/**
 * 문자열의 길이 구하기(한글 1문자를 2로 판단)
 * @param {string} str
 */
export function getStringLength(str) {
	let result = 0;
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
			result += 2;
		} else {
			result += 1;
		}
	}
	return result;
}

/**
 * 문자열의 라인 수 구하기
 * @param {string} str
 * @param {number} num - 한줄에 들어가는 최대 문자열의 수
 */
export function getLinesOfString(str, num) {
	let ar = getFeedText(str, num);
	return ar.length;
}

/**
 * 피드 문자열의 라인별 배열을 구하는 함수
 * @param {*} str - 대상 피드 문자열
 * @param {*} byte - 한줄에 들어갈 바이트 수(넘으면 개행됨)
 */
export function getFeedText(str, byte) {
	//문자열에서 해시태그, 프로필 링크를 나타내는 문자들을 정리한뒤 개행문자로 나눔
	let arr = str.replace(/(&[#|@]){2}(.*?)%&%.*?(&[#|@]){2}/g, '$2').split('\n');

	let ar = [];
	for (let s of arr) {
		if (getStringLength(s) <= byte) {
			ar.push(s);
			continue;
		}

		ar.push(splitStr(s, byte));
	}
	ar = ar.flat().map(v => v.trim());
	return ar;
}

/**
 * 문자열 바이트 단위로 자르기
 * @param {string} str - 대상 문자열
 * @param {number} start - 시작 인덱스(byte)
 * @param {number} end - 끝 인덱스(byte)
 */
export function getByteSubtring(str, start, end) {
	let s = Date.now();

	let startIdx = 0;
	let endIndx = 0;
	for (let i = 0; i <= str.length; i++) {
		let tmp = getStringLength(str.substring(0, i));
		// console.log('start '+start+'  for '+i+' length '+tmp)
		if (tmp >= start) {
			if (tmp >= start + 1) {
				startIdx = i - 1;
				break;
			} else {
				startIdx = i;
				break;
			}
		}
	}
	for (let i = 0; i <= str.length; i++) {
		let tmp = getStringLength(str.substring(0, i));
		// console.log('start '+start+'  for '+i+' length '+tmp)
		// console.log(tmp,str.substring(0,i));
		if (tmp >= end) {
			if (tmp >= end + 1) {
				endIndx = i - 1;
				break;
			} else {
				endIndx = i;
				break;
			}
		}
	}

	// console.log('start' +startIdx+'end'+endIndx+'laps'+(Date.now()-s));
	return str.substring(startIdx, endIndx);
}

export function getByteCharAt(str, index) {
	let startIdx = 0;
	for (let i = 0; i <= str.length; i++) {
		let tmp = getStringLength(str.substring(0, i));
		if (tmp >= index) {
			if (tmp >= index + 1) {
				startIdx = i - 1;
				break;
			} else {
				startIdx = i;
				break;
			}
		}
	}
	return str.charAt(startIdx);
}

export function findByteIndex(str, char) {
	let temp = str.indexOf(char);
	if (temp < 0) return -1;
	let sub = str.substring(0, temp);
	return getStringLength(sub);
}

export function findByteLastIndex(str, char) {
	let temp = str.lastIndexOf(char);
	if (temp < 0) return -1;
	let sub = str.substring(0, temp);
	return getStringLength(sub);
}

export function findNearSpace(str, index) {
	let pre = findByteLastIndex(getByteSubtring(str, 0, index), ' ');
	let sub = findByteIndex(getByteSubtring(str, index, getStringLength(str)), ' ');
	let tmp = findByteIndex(getByteSubtring(str, index - 1, getStringLength(str)), ' ');
	if (index == 0) return {pre: pre, sub: sub};
	if (sub == 0) return {pre: pre, sub: pre};
	return {pre: pre, sub: sub == tmp ? sub + index - 1 : sub + index};
}

/**
 * 문자열을 한줄이 일정 바이트 이상 넘어가지 않도록 단어 단위로 개행하여 문자열의 배열로 반환
 * @param {string} str - 대상 문자열
 * @param {number} byte - 한줄의 최대 바이트수
 * @param {array} arr - 결과를 담을 배열(배열을 주지 않아도 빈 배열이 기본으로 주어짐)
 * @returns
 */
export function splitStr(str, byte, arr = []) {
	if (getStringLength(str) <= byte) {
		arr.push(str);
		return;
	}
	let preStr = getByteSubtring(str, 0, byte);
	let subStr = getByteSubtring(str, byte, getStringLength(str));
	let preSpace = findByteLastIndex(preStr, ' ');
	let subSpace = findByteIndex(subStr, ' ');
	if (subSpace == 0) {
		arr.push(preStr);
		splitStr(subStr, byte, arr);
	} else {
		let tmp = getByteSubtring(str, preSpace, getStringLength(str));
		arr.push(getByteSubtring(str, 0, preSpace));
		splitStr(tmp, byte, arr);
	}

	return arr;
}

/**
 * 대상 문자열에서 해시택그와 유저 링크 정보를 추출하여 오브젝트로 반환
 * @param {string} str - 해시태그와 유저링크를 추출할 문자열
 */
export function extractTags(str) {
	let regex = /(&[#|@]){2}(.*?)%&%(.*?)(&[#|@]){2}/g;
	let match;
	let obj = {};
	while ((match = regex.exec(str)) !== null) {
		// console.log(match);
		obj[match[2]] = match[3];
	}
	return obj;
}
