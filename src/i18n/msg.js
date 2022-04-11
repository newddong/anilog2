import {getPettypes} from 'Root/api/userapi';

//common
export const BTN_CHECK = '확인';
export const INQUIRY = '문의하기';
export const BTN_NEXT = '다음';
export const BTN_BACK = '뒤로';
export const SKIP = '건너뛰기';

//login
export const REQ_PHONE_NUM_AND_EMAIL = '전화번호 또는 이메일을 입력해주세요.';
export const REQ_PASSWORD = '비밀번호를 입력해주세요.';
export const WITHOUT_LOGIN = '로그인 없이 둘러보기';
export const LOGIN_AUTO = '자동 로그인';
export const SAVE_ID = '아이디 저장';
export const ASK_LOST_ID_PASS = '계정을 잊으셨나요?';
export const FIND_ID = 'ID찾기';
export const FIND_PASS = '비밀번호 찾기';
export const ASK_USER = '아직 회원이 아닌가요?';
export const ASSIGN_USER = '회원 가입';
export const LOGIN = '로그인';
export const FAIL_MSG = '아이디와 비밀번호가 일치하지 않습니다.';
export const FAIL_LOGIN_COUNT = '로그인 실패 횟수가 10회 초과되었습니다.';
export const FAIL_LOGIN_LOCK = '계정을 안전하게 보호하기 위해 잠김 처리가 되었습니다. 비밀번호 찾기를 통한 재설정 후 로그인 가능합니다.';
export const RECAPTCHA = '상단 이미지의 보안문자를 입력해주세요.';
export const LOGIN_SOCIAL = '소셜 아이디로 로그인';
export const FIND_MY_ACCOUNT = '내 계정 찾기';
export const CONFIRM_MY_ACCOUNT = '계정 확인';
export const NONE_OF_YOUR_ACCOUNTS = '이 번호로 가입한 계정이 없습니다.';
export const NEEDS_LOGIN_ARE_YOU_MEMBER = '로그인이 필요한 페이지입니다.\n아직 회원이 아닌가요?';
export const LOGOUT = '로그아웃';

//Verify_User
export const REQ_NAME = '이름을 입력해주세요.';
export const REQ_PHONE_NUM = "휴대폰 번호 입력 ('-'제외)";
export const VERIFY_USER_DESCRIPTION_ID = '회원가입시 등록한 정보로\n 아이디 일부를 확인 할 수 있습니다.';
export const VERIFY_USER_DESCRIPTION_PASS = '회원가입시 등록한 정보로\n 인증을 통해 비밀번호를 변경할 수 있습니다.';
export const TAB_VERIFY_PHONE = '휴대폰 인증';
export const TAB_VERIFY_EMAIL = '이메일 인증';
export const INQUERY_ACCOUNT = '휴대폰 번호나 이메일 주소로\n가입된 계정 조회가 가능합니다.';
export const EXIST_ACCOUNT = '이 계정은 이미 가입이 되어있습니다.\n잠시 뒤에 로그인 페이지로 넘어갑니다.';

//Assign_user
export const ASSIGN_USER_DESCRIPTION = '휴대폰 번호나 이메일주소로\n 가입이 가능합니다.';
export const CHECK_VERIFYCATION_NUM1 = '휴대폰으로 발송된 인증번호를\n 확인해 주세요.';
export const CHECK_VERIFYCATION_NUM2 = '인증번호 확인';
export const SEND_VERIFYCATION_NUM = '인증번호 보내기';
export const INPUT_VERIFYCATION_NUM = '인증번호 입력';
export const REQ_VERIFYCATION_NUM = '인증번호를 입력 해주세요.';
export const RESEND_VERIFYCATION_NUM = '인증번호 다시 보내기';
export const COMPLETE_VERIFYCATION = '인증이 완료되었습니다.';
export const REQ_EMAIL = '이메일 입력';
export const CHECK_VERIFYCATION = '인증 확인';
export const REQUEST_VERIFYCATION = '인증 요청';
export const EMAIL_NAVER = 'naver.com';
export const EMAIL_DAUM = 'daum.com';
export const EMAIL_KAKAO = 'kakao.com';
export const EMAIL_NATE = 'nate.com';
export const EMAIL_GMAIL = 'gmail.com';
export const INPUT_DIRECT = '직접입력';
export const INPUT_DOMAIN = '도메인 입력';

//Verify Password
export const PASSWORD_INPUT = '비밀번호 입력';
export const COMPLETE_ASSIGN = '가입 완료';
export const VERIFY_CONDITION = '*8자 이상 ~ 15자 이하, 영문과 숫자만 입력 가능합니다.';
export const CHECK_PASS = '비밀번호 확인';
export const REQ_PASSCHECK = '비밀번호를 확인해주세요';
export const FAIL_PASS_CHECK = '비밀번호가 일치하지 않습니다.';
export const RESET_PASSWORD = '비밀번호 재설정';
export const FINDED_ACCOUNT = '가입 정보가 확인 되었습니다.';
export const VERIFYCATION_NULL = '인증이 만료되었거나 인증 정보가 없습니다.\n인증을 요청해 주세요.';
export const COMPLETE_PASSWORD_RESET = '비밀번호 설정이 완료되었습니다.';
export const PASSWORD = '비밀번호';
export const CHECK_PASSWORD_CONFIG = '비밀번호 형식을 확인하세요.';

//Assign Shelter
export const REQ_CODE_DESCRIPTION = '발급받은 코드를 입력해 주세요.';
export const REQ_CODE = '코드입력해 주세요';
export const REQ_CODE_NOUN = '코드 입력';
export const ASK_SHELTER_ASSIGN = '보호소 등록을 하고 싶으신가요?';

export const SHELTER_NAME = '보호소 이름';
export const SHELTER_ADDRESS = '보호소 주소';
export const SHELTER_ASSIGN = '보호소 등록';

export const SHELTER_PHONE_NUM = '전화번호';
export const SHELTER_EMAIL = 'E-mail';
export const SHELTER_HOMEPAGE = '홈페이지';
export const SHELTER_DATE_FOUNDATION = '설립일';

export const REQ_SHELTER_NAME = '보호소 이름을 입력해 주세요';
export const REQ_SHELTER_PHONE = '보호소 전화번호를 입력하세요';
export const REQ_SHELTER_URI = '보호소 홈페이지를 입력하세요.';
export const REQ_SHELTER_ADDRESS = '보호소 주소를 입력하세요';
export const REQ_DETAIL_ADDRESS = '세부 주소를 입력해 주세요';

//profile
export const INTRODUCE_PROFILE = '프로필 사진과 닉네임은 나중에도 변경 할 수 있어요.';
export const DEFINE_NICK_NAME = "*2자 이상 15자 이내의 한글,영문,숫자,'_'의 입력만 가능합니다.";
export const NICK_NAME = '닉네임';
export const PET_NAME = '*2자 이상 15자 이내의 한글,영문,숫자만 입력 가능합니다.';

//Assign Pet
export const PET_ASSIGN = '반려동물 프로필의 대표 이미지가 될 사진과 이름을 알려주세요.';
export const MALE = '남아';
export const FEMALE = '여아';
export const REQ_PET_TYPE_SEX = '반려 동물의 종과 성별을 알려주세요.';
export const PET_TYPE = '분류';
export const PET_SEX = '성별';
export const CHOICE_TYPE = '반려 동물 분류 선택';
export const REQ_PET_TYPE_REG_NUM = '반려 동물의 입양 형태와 동물 등록번호를 알려주세요.';
export const ADOPTION_TYPE = '입양형태';
export const PET_REG_NUM = '동물 등록번호';
export const REQ_INPUT_NUM = '15자리 숫자를 입력해 주세요.';
export const REQ_BIRTH_WEIGHT = '반려 동물의 생일과 체중, 중성화 여부를 적어 주세요.';
export const BIRTH = '생일';
export const WEIGHT = '체중';
export const INPUT_WEIGHT = '몸무게 입력';
export const NEUTERING = '중성화';
export const YES = '예';
export const NO = '아니오';
export const UNAWARENESS = '모름';
export const REQ_VACCINE = '반려 동물이 어떤 초기 접종을 했는지 알려 주세요.';
export const COMPREHENSIVE_VACCINE = '종합';
export const COVID = '코로나';
export const KENNEL_COUGH = '캔넬코프';
export const RABIES = '광견병';
export const DISCLOSE = '공개';
export const ASSIGN_PET = '반려동물 추가';
export const OPENSETTING = '공개 설정';
//SearchTopTabRoute
export const FEED = '피드';
export const HEALTH_VIDEO = '건강영상';
export const REQ_PROTECTION = '보호요청';
export const VIDEO = '영상';
export const REQ_ANIMAL = '동물보호';
export const MY = 'MY';

//AnimalSavingHomeTopTabRoute
export const MY_ACTIVITY = '내활동';
export const HOW_TO_JOIN = '참여방법';

//MainStackRoute
export const PIC_SELECTION = '사진선택';

//WriteFeedStackRoute
export const NEW_FEED = '새 게시물';
export const FEED_EDIT = '게시물 편집';
export const DOING_TAG = '태그하기';
export const CAMERA = '카메라';

//FeedTopTabRoute
export const RECOMMENDATION = '추천';
export const ACCOUNT = '계정';
export const TAG = '태그';
export const TEMP_PROTECTION_DIARY = '임보일기';
export const SEARCHED_TAG = '검색한 태그';
export const ORI_ACCOUNT = '본 계정';

//Calendar
export const day = ['일', '월', '화', '수', '목', '금', '토']; //요일 정보

//Usertype - Profile Templete
export const NORMAL = 'user';
export const PET = 'pet';
export const SHELTER = 'shelter';

//통신사
export const mobile_carrier = ['SK텔레콤', 'LG U+', 'KT', '알뜰'];

//이메일 도메인
export const EMAIL_DOMAIN = [
	'선택',
	'naver.com',
	'daum.net',
	'gmail.com',
	'hanmail.net',
	'kakao.com',
	'nate.com',
	'outlook.com',
	'paran.com',
	'yahoo.com',
	'직접입력',
];

export const CALENDAR_YEAR = () => {
	let currentTime = new Date();
	let year = ['', ''];
	for (let i = 0; i < 70; i++) {
		year.push(currentTime.getFullYear() - i);
	}
	year.push('', '');
	return year;
};

export const CALENDAR_MONTH = ['', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '', '', ''];
export const CALENDAR_DAY = () => {
	const paddingObject = '';
	let day30 = ['', ''];
	let day31 = ['', ''];
	let day29 = ['', ''];
	for (let i = 1; i < 32; i++) {
		day31.push(i);
	}
	for (let i = 1; i < 31; i++) {
		day30.push(i);
	}
	for (let i = 1; i < 30; i++) {
		day29.push(i);
	}
	day31.push(paddingObject);
	day31.push(paddingObject);
	day30.push(paddingObject);
	day30.push(paddingObject);
	day29.push(paddingObject);
	day29.push(paddingObject);
	const days = {day31: day31, day30: day30, day29: day29};
	return days;
};

//반려동물 종류
export const PET_KIND = async () => {
	function getPetKind() {
		return new Promise((res, rej) => {
			getPettypes(
				{},
				types => {
					res(types.msg);
				},
				err => Modal.alert(err),
			);
		});
	}
	const result = await getPetKind();
	// console.log('result', result);
	return result;
};

export const PUBLIC_SETTING = ['전체 공개', '팔로워 공개', '비공개'];

export const DOG_KIND = [
	'믹스견',
	'치와와',
	'말티즈',
	'미니어처 핀셔',
	'파피용',
	'포메라니안',
	'푸들',
	'시추',
	'미니어처 슈나우저',
	'요크셔 테리어',
	'에어데일 테리어',
	'스코티시 테리어',
	'비글',
	'닥스훈트',
	'아프간 하운드',
	'그레이 하운드',
	'바셋 하운드',
	'코커스패니얼',
	'골든 리트리버',
	'래브라도 리트리버',
	'포인터',
	'세터',
	'비즐라',
	'시베리안 허스키',
	'알래스칸 말라뮤트',
	'도베르만 핀셔',
	'로트 와일러',
	'버니즈 마운틴독',
	'보더콜리',
	'셔틀랜드 쉽독',
	'웰시코기',
	'저먼 셰퍼드',
	'올드 잉글리시 쉽독',
	'러프콜리',
	'진돗개',
	'삽살개',
	'풍산개',
	'불독',
	'시바견',
	'달마시안',
	'비숑프리제',
	'차우차우',
	'기타',
];

//보호 지역
export const PET_PROTECT_LOCATION = [
	'지역',
	'서울',
	'부산',
	'인천',
	'대구',
	'대전',
	'광주',
	'울산',
	'경기',
	'강원',
	'충청북도',
	'충청남도',
	'전라북도',
	'전라남도',
	'경상남도',
	'경상북도',
	'세종특별자치',
];

//반려동물 상태( 임보, 반려, 입양)
export const PET_STATUS_PROTECT = 'protect';
export const PET_STATUS_ADOPT = 'adopt';
export const PET_STATUS_COMPANION = 'companion';

//보호소 종류 (공립 사립)
export const PUBLIC = 'public';
export const PRIVATE = 'private';

//DefaultImage uri
export const DEFAULT_PROFILE = 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg';
export const DEFAULT_ANIMAL_PROFILE = 'https://w7.pngwing.com/pngs/944/500/png-transparent-dog-computer-icons-puppy-puppy-cute-cdr-animals-pet.png';

//잠시 임시저장 기능 관련 테스트용
export let temp_inputLongText = '';

//버튼
export const COMPLETE_MODIFY = '수정 완료';
export const MY_INFO_MODIFY = '내 정보 수정'; // usermenu
export const MY_COMPANION = '나의 반려동물'; //userMenu
export const MODIFY_PROFILE = '프로필 변경';

// Shelter MENU 버튼
export const MANAGEMENT_OF_PROTECTED_ANIMAL = '보호동물 관리';
export const PROTECTED_ANIMAL = '보호중인 동물';
export const INQUERY_APPLICATION = '신청서 조회';
export const FROM_MY_SHELTER = '나의 보호소 출신 동물';
export const MANAGEMENT_OF_VOLUNTEER = '봉사활동 신청관리';

export const FAVORITES = '즐겨찾기';
export const FRIENDS = '친구';
export const PEED_CONTENTS = '피드 게시글';
export const REQ_PROTECTION_SAVE = '보호요청(저장)';
export const COMUNITY = '커뮤니티';

export const MY_ACTIVITY_IN_SHELTER = '나의 활동';
export const MY_CONTENTS = '내 게시글';
export const TAGED_CONTENTS_FOR_ME = '나를 태그한 글';
export const APPLICATION_HISTORY = '신청 내역';
export const UPLOADED_POST_FOR_REQ_PROTECTION = '보호 요청 글';
export const NOTE_LIST = '쪽지함';
export const MODIFY_SHELTER_DATA = '보호소 정보수정';

export const SETTING = '설정';
export const INFO_QUESTION = '정보/문의';
//'계정' 은 상위에 존재 하므로 생략

//User Menu 버튼
export const INFO = '알림';
export const ANIMAL_PROTECTION_STATE = '동물 보호 현황';
export const PROTECTION_REQUEST = '보호 요청(저장)';

export const PLEASE_UPLOAD_PIC = '해당 동물의 특징이 잘 보이는 이미지를 올려주세요.';
export const PLEASE_GIVE_ME_DATE_AND_PLACE = '해당 동물이 구조된 날짜와 장소를 알려 주세요.';

// CompanionForm (반려 생활 추가) , ApplyCompanion참조
export const PET_AGE = ['1세 이하', '5세 이하', '10세 이하', '15세 미만', '15세 이상'];
export const COMPANION_DURATION = ['1년 이하', '5년 이하', '10년 이하', '15년 미만', '15년 이상'];
export const COMPANION_STATUS = ['함께 생활하고 있어요.', '입양이 되었어요.', '무지개 다리를 건넜어요.'];

//버튼
export const SHARE = '공유';

//안내 메세지
export const ONLY_CONTENT_FOR_ADOPTION = '입양 가능한 게시글만 보기';

//Input PlaceHolder 관련
export const INPUT_PHONE_NUM = '휴대전화번호 입력';

//UserInfoDetailSettings
export const INTEREST_REGION = '관심 지역';
export const INTEREST_ACT = '관심 활동';

//TabSelect
export const GENDER_TAB_SELECT = ['남자', '여자'];

//PasswordChecker
export const PASSWORD_TITLE = '새로운 비밀번호';
export const PASSWORD_CHECK_TITLE = '비밀번호 확인';
export const NEW_PWD_TITLE = '새로운 비밀번호';
export const CURRENT_PWD_TITLE = '현재 비밀번호';
export const PASSWORD_UNMATCHED = '비밀번호가 일치하지 않습니다.';
export const PASSWORD_CHECK_MATCHED = '비밀번호가 서로 일치합니다.';
export const PASSWORD_FORM_DESCRIPTION = '최소 8자 이상, 영문과 숫자만 입력 가능합니다.';
export const CURRENT_PWD_INFO = '현재 비밀번호를 적어주세요.';
export const FORM_UNMATCHED_DESC = '비밀번호 작성 양식에 맞지 않습니다.';
export const FORM_MATCHED_DESC = '비밀번호 작성 양식과 일치합니다!';
export const NEW_PWD_CHECK_TITLE = '새로운 비밀번호 확인';
export const NEW_PWD_PLACEHOLDER = '새로운 비밀번호 확인';
export const PWD_CHECK_INFO = '비밀번호를 다시 한 번 적어주세요.';

//Nickname 설정 관련
export const NICKNAME_FORM = '2~15자 이내의 영문,한글,숫자 입력만 가능합니다';
export const NEW_NICK_REQUEST = '닉네임을 입력 해주세요.';
export const PREVIOUS_NICK_TITLE = '기존 닉네임';

export const NEW_NICK_TITLE = '새 닉네임';
export const UNAVAILABLE_NICK = '사용 불가한 닉네임입니다.';
export const AVAILABLE_NICK = '사용 가능한 닉네임입니다!';

//FilterButton 관련

//Meatball
export const PROTECT_STATUS = ['모든 게시글', '입양가능', '협의 중', '완료']; //SHELTER PROTECT REQUEST 템플릿
export const PROTECT_STATUS_VAR = ['all', 'rescue', 'discuss', 'complete']; //SHELTER PROTECT REQUEST 템플릿
export const SETTING_OWN_COMMENT = ['수정', '삭제'];
export const SETTING_COMMENT = ['신고'];
export const PROTECT_REQUEST_STATUS = ['협의 중', '사망', '입양 가능'];

//Modal Message
export const CONFIRM_PROTECT_REQUEST = '이 내용으로 \n 보호 활동 신청을 하시겠습니까?';
export const CONFIRM_ADOPT_REQUEST = '위 내용으로 입양 신청을 하시겠습니까?';
export const CONFIRM_FINALIZED =
	'신청이 완료 되었습니다. \n 보호소마다 심사의 기간과 기준이 다르며, 상황에 따라 연락이 가지 않을 수도 있음을 알려드립니다.';
export const CONFIRM_DELETE_TAG_ME_FEED = '해당 게시글을 나의 "태그된 피드"에서 삭제하시겠습니까? 게시물을 올린 계정에서는 삭제되지 않습니다.';
export const CONFIRM_DELETE_FAVORITE_FEED = '선택한 피드를 즐겨찾기에서\n 해제하시겠습니까?';
export const CONFIRM_DELETE_MY_FEED = '선택한 목록을 내 피드글에서 해제하시겠습니까?';
export const PROTECT_ACT_PROTECT_CONFIRM = '임시보호는 확정을 눌러도 이 게시물의 \n 상태가 "입양가능"으로 유지됩니다.';
export const PROTECT_ACT_ADOPT_CONFIRM = '입양확정을 하게 되면 이 게시물의 상태가 "완료"로 변경됩니다.';

//보호동물 및 보호 요청게시글 상태에 대한 텍스트
export const RESCUE = '입양가능';
export const DISCUSS = '협의 중';
export const ADOPT = '입양 완료';
export const PROTECT = '임시보호중';
export const RAINBOWBRIDGE = '사망';
export const NEAR_RAINBOWBRIDGE = '안락사 임박';

//동물 나이
export const PET_YEAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
export const PET_MONTH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

//팔로우 중 => 출력  메뉴
export const FOLLOWER_MENU = ['즐겨찾기 추가', '소식 받기', '차단', '팔로우 취소'];
export const FOLLOWER_PET_MENU = ['즐겨찾기 추가', '소식 받기', '차단', '팔로우 취소', '입양하기'];

//피드 미트볼 메뉴 리스트
export const FEED_MEATBALL_MENU_FOLLOWING = ['쪽지 보내기', '즐겨찾기', '공유하기', '게시물 알람 설정', '팔로우 취소', '신고'];
export const FEED_MEATBALL_MENU_UNFOLLOWING = ['쪽지 보내기', '팔로우', '즐겨찾기', '공유하기', '신고'];
export const FEED_MEATBALL_MENU_FOLLOWING_UNFAVORITE = ['쪽지 보내기', '즐겨찾기 취소', '공유하기', '게시물 알람 설정', '팔로우 취소', '신고'];
export const FEED_MEATBALL_MENU_UNFOLLOWING_UNFAVORITE = ['쪽지 보내기', '팔로우', '즐겨찾기 취소', '공유하기', '신고'];
export const FEED_MEATBALL_MENU_MY_FEED = ['공유하기', '수정', '삭제'];
export const FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS = ['상태변경', '공유하기', '수정', '삭제'];
export const FEED_MEATBALL_MENU = ['공유하기', '신고'];

//신고 목록
export const REPORT_MENU = [
	'부적절한 홍보 게시글',
	'음란성 또는 청소년에게 부적절한 게시글',
	'명예 훼손/사생활 침해  및 저작권 침해',
	'심한 불쾌감 유발(폭력성, 욕설 등)',
	'기타(직접 입력)',
];

//댓글 미트볼 헤더 출력 메뉴
export const REPLY_MEATBALL_MENU_MY_REPLY = ['공유하기', '수정', '삭제'];
export const REPLY_MEATBALL_MENU = ['공유하기', '신고'];

//동물 체중 안내
export const WEIGHT_INPUT_FORM_INFO = '두자리 숫자, 소수점 한자리';

//알림  설정

export const FOLLWER_NEW_POST_ALRAM = '팔로워 새 게시글 알림';
export const FAVORITE_PROTECT_STATUS_CHANGE_ALRAM = '즐겨찾은 보호요청 상태 변경 알림';
export const PET_VACCIN_DATE_ALRAM = '반려동물의 접종 예정일 알림';
export const MY_POST_ALRAM = '내 게시글 알림';
export const MY_POST_COMMENT_ALRAM = '내가 쓴 글/댓글 업데이트 알림';
export const TAG_OR_FOLLOW_ALRAM = '나를 태그할 시 알림';
export const MY_APPLY_STATUS_CHANGE_ALRAM = '내 신청 상태 변경 알림';
export const NEW_FOLLOWER = '나를 팔로우 시 알림';

export const INITIAL_NUMBER = ['010', '02', '031', '033', '043', '041', '054', '055', '063', '061', '064'];

export const applyComanionCheckList = [
	{
		text: '입양 혹은 임시보호를 하려는 당사자는 성인입니다',
		detail: false,
		state: false,
	},
	{
		text: '주거지 근처에 접종을 위해 주기적으로 갈 수 있는 동물병원이 있습니다',
		detail: false,
		state: false,
	},
	{
		text: '현재 함께 사는 동거인들에게 입양 혹은 임시보호의 동의를 받았거나 동거인이 없습니다.',
		detail: false,
		state: false,
	},
	{
		text: '입양 혹은 임시보호를 하려는 동물에 대한 배변 훈련 지식이 있습니다.',
		detail: false,
		state: false,
	},
	{
		text: '입양 혹은 임시보호를 하려는 동물 청결(손톱 손질, 목욕, 항문낭, 귀청결 등)에 대한 지식이 있습니다.',
		detail: false,
		state: false,
	},
];
