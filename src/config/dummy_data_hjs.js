export const dummy_ProtectRequestList = [
	{
		//@FeedObject
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨

		// @UserObject
		shelter_name: '양평보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['http://t1.daumcdn.net/liveboard/petnu/ae1fd342257d41768b4733d674f5d93c.JPG'],
		protect_animal_rescue_location: '한강시민공원', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '리트리버', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 2,
		protect_animal_protect_request: true,
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '4', //보호중인 동물의 추정 연령
		protect_animal_weight: '11', //몸무게

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'http://t1.daumcdn.net/liveboard/petnu/ae1fd342257d41768b4733d674f5d93c.JPG', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-01', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '3',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '여의도보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['http://webimage.10x10.co.kr/image/basic600/296/B002963730.jpg'],
		protect_animal_rescue_location: '신촌 9-1 버스정류장', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '퍼그', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '2', //보호중인 동물의 추정 연령
		protect_animal_weight: '19', //몸무게

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'http://webimage.10x10.co.kr/image/basic600/296/B002963730.jpg', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '3',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '한라산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['https://t1.daumcdn.net/cfile/tistory/213E434754D3A06406'],
		protect_animal_rescue_location: '서울역 5번 출구', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '몬노', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '3', //보호중인 동물의 추정 연령
		protect_animal_weight: '18', //몸무게

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'https://t1.daumcdn.net/cfile/tistory/213E434754D3A06406', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '1',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '익산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['https://t1.daumcdn.net/cfile/tistory/99C9B5435CD8E4B81F'],
		protect_animal_rescue_location: '영등포구 2기 횡단보도', //보호중인 동물의 구조장소
		protect_animal_species: '토끼', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '자이르만야', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '3', //보호중인 동물의 추정 연령
		protect_animal_weight: '4', //몸무게

		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_writer_id: '익산보호소',

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'https://t1.daumcdn.net/cfile/tistory/99C9B5435CD8E4B81F', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '0',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '익산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg'],
		protect_animal_rescue_location: '강남역 1번 출구', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '샤르몬', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '14', //보호중인 동물의 추정 연령
		protect_animal_weight: '8.2', //몸무게

		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_writer_id: '서울보호소',

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '0',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '익산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['https://cdn.ccdailynews.com/news/photo/202104/2047160_528296_3416.png'],
		protect_animal_rescue_location: '강남역 1번 출구', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '아르케', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '5', //보호중인 동물의 추정 연령
		protect_animal_weight: '2.2', //몸무게

		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_writer_id: '용인보호소',

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'https://cdn.ccdailynews.com/news/photo/202104/2047160_528296_3416.png', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '2',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '익산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: ['http://kormedi.com/wp-content/uploads/2021/01/eab3a0ec9691ec9db4-580x387.jpg'],
		protect_animal_rescue_location: '의정부 초암 초등학교 정문', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '요기암', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '7', //보호중인 동물의 추정 연령
		protect_animal_weight: '6.2', //몸무게

		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_writer_id: '상암보호소',

		// @ProtectRequestObject
		protect_request_photo_thumbnail: 'http://kormedi.com/wp-content/uploads/2021/01/eab3a0ec9691ec9db4-580x387.jpg', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '5',
	},
	{
		//@FeedObject
		feed_type: 'feed',

		// @UserObject
		shelter_name: '익산보호소',

		// @ShelterProtectAnimalObject
		protect_animal_photos: [
			'https://post-phinf.pstatic.net/MjAyMDA5MDFfMTg3/MDAxNTk4OTU0Mjg3ODY1.ScDj1g1gboyqfcQbp6NuBuT0iDBu2Pg_XnMz2UhFAcwg.jOo08-HSOT_iyTw7JE04-qao1J6MNEQbW9f6IQK7emgg.JPEG/1.JPG?type=w1200',
		],
		protect_animal_rescue_location: '의정부 초암 초등학교 정문', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '리트리버', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '17', //보호중인 동물의 추정 연령
		protect_animal_weight: '4.7', //몸무게

		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		protect_animal_writer_id: '제주보호소',

		// @ProtectRequestObject
		protect_request_photo_thumbnail:
			'https://post-phinf.pstatic.net/MjAyMDA5MDFfMTg3/MDAxNTk4OTU0Mjg3ODY1.ScDj1g1gboyqfcQbp6NuBuT0iDBu2Pg_XnMz2UhFAcwg.jOo08-HSOT_iyTw7JE04-qao1J6MNEQbW9f6IQK7emgg.JPEG/1.JPG?type=w1200', //보호요청 게시물 썸네일 uri
		protect_request_status: 'rescue', //항목 추가 필요
		protect_request_date: '2021-12-03', //보호요청 게시글 작성일시
		protect_act_request_article_id_cnt: '7',
	},
];

export const dummy_MissingReportList = [
	{
		_id: 'missing1',
		//임시로 지정
		protect_animal_photos: [
			'https://w.namu.la/s/f783eaddcfb087fe23cf0fa8b5341c803721b55167cd0f94a65ee7ae9b295e5056f58155cf5d70ec62470e89eb09f039d712b43cb13519f84f2c93eac5ce25557a6b6284dcbb4fd88936dc8faf26e872',
		],

		// @FeedObject
		feed_thumbnail:
			'https://w.namu.la/s/f783eaddcfb087fe23cf0fa8b5341c803721b55167cd0f94a65ee7ae9b295e5056f58155cf5d70ec62470e89eb09f039d712b43cb13519f84f2c93eac5ce25557a6b6284dcbb4fd88936dc8faf26e872',
		feed_type: 'missing',
		missing_animal_species: '개', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '진돗개', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'male', //실종 동물의 성별
		missing_animal_age: '8살', //실종 동물의 나이
		missing_animal_lost_location: '공덕역', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '온몸이 갈색이며, 무엇이든 잘 물어 뜯음', //실종 동물의 특징
		missing_animal_date: '2021-02-11', //실종일
	},
	{
		_id: 'missing2',
		//임시로 지정
		protect_animal_photos: ['https://t1.daumcdn.net/tistoryfile/fs8/1_tistory_2008_10_03_18_17_48e5e30cc7a63??original'],

		// @FeedObject
		feed_thumbnail: 'https://t1.daumcdn.net/tistoryfile/fs8/1_tistory_2008_10_03_18_17_48e5e30cc7a63??original',
		feed_type: 'report',
		missing_animal_species: '새', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '앵무새', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'female', //실종 동물의 성별
		missing_animal_age: '3살', //실종 동물의 나이
		missing_animal_lost_location: '집안(창문으로 나감)', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '실시간 말이 많음', //실종 동물의 특징
		missing_animal_date: '2021-01-03', //실종일
	},
	{
		_id: 'missing3',
		//임시로 지정
		protect_animal_photos: ['https://blog.kakaocdn.net/dn/q5IiN/btqEfrdKUwJ/kCxqtCQkjuV3UyRZo4K3Ik/img.jpg'],

		// @FeedObject
		feed_thumbnail: 'https://blog.kakaocdn.net/dn/q5IiN/btqEfrdKUwJ/kCxqtCQkjuV3UyRZo4K3Ik/img.jpg',
		feed_type: 'missing',
		missing_animal_species: '개', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '시베리안허스키', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'mail', //실종 동물의 성별
		missing_animal_age: '2살', //실종 동물의 나이
		missing_animal_lost_location: '청포동 이마트', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '자주 짖음', //실종 동물의 특징
		missing_animal_date: '2021-11-13', //실종일
	},
	{
		_id: 'missing4',
		//임시로 지정
		protect_animal_photos: [
			'https://lh3.googleusercontent.com/proxy/kKzot80pMGLttmHHHSt20eAyAQoVOfgEuId5Y8pHem0SVTFDq2gPIwrX8KaS7560Jg0ran6Tv8dPTjl3WMXCCz-9JkdnuR0cXQ5uqcxeMhxRDjHs805dohUZWrLCMzumvXEEhYM-uXC-J2iVkZx5KQLXyy6fpGBdybOlbbdO4gvd5Q',
		],

		// @FeedObject
		feed_thumbnail:
			'https://lh3.googleusercontent.com/proxy/kKzot80pMGLttmHHHSt20eAyAQoVOfgEuId5Y8pHem0SVTFDq2gPIwrX8KaS7560Jg0ran6Tv8dPTjl3WMXCCz-9JkdnuR0cXQ5uqcxeMhxRDjHs805dohUZWrLCMzumvXEEhYM-uXC-J2iVkZx5KQLXyy6fpGBdybOlbbdO4gvd5Q',
		feed_type: 'report',
		missing_animal_species: '개', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '웰시코기', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'mail', //실종 동물의 성별
		missing_animal_age: '1살', //실종 동물의 나이
		missing_animal_lost_location: '한남동 동동빌라', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '너무 어려서 잘 걷지 못함', //실종 동물의 특징
		missing_animal_date: '2021-10-22', //실종일
	},
	{
		_id: 'missing5',
		//임시로 지정
		protect_animal_photos: ['http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png'],

		// @FeedObject
		feed_thumbnail: 'http://cdn.ksilbo.co.kr/news/photo/202106/902252_501806_3356.png',
		feed_type: 'missing',
		missing_animal_species: '고양이', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '나인리', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'mail', //실종 동물의 성별
		missing_animal_age: '2살', //실종 동물의 나이
		missing_animal_lost_location: '한남동 동동빌라', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '몸만 흰색이고 갈색등이 주를 이룸', //실종 동물의 특징
		missing_animal_date: '2021-12-23', //실종일
	},
];

export const _dummy_familyAccountList = [
	{
		//@UserObject  (가족계정)
		_id: 'user27',
		user_profile_uri: 'https://cocotimes.kr/wp-content/uploads/2019/12/tica114d18020146_l.jpg',
		user_nickname: '호연', //닉네임
		userType: 'user', //required - 유저타입 pet user shelter hash
		size: 94, // icon size
	},
	{
		_id: 'user28',
		user_profile_uri: 'http://cdn.slist.kr/news/photo/201809/44963_111712_3649.png',
		user_nickname: '요들이', //닉네임
		userType: 'user', //required - 유저타입 pet user shelter hash
		size: 94, // icon size
	},
];

export const _dummy_PetVaccinationObject = {
	_id: 'petVaccina1',
	vaccination_pet_id: 'pet1', //접종 대상 반려동물

	vaccination_heartworm: {
		last_vaccination_date: '2021.01.12', //최종 접종일
		nearest_vaccination_date: '2021.03.06', //가장빠른 접종 예정일
		next_vaccination_date: '2022.01.11', //다음 접종 예정일
		is_vaccinated: true, //접종여부
	}, //심장사상충

	vaccination_ectozoon: {
		last_vaccination_date: '2019.07.07',
		nearest_vaccination_date: '2020.08.23',
		next_vaccination_date: '2018.02.11',
		is_vaccinated: true,
	}, //외부 기생충

	vaccination_anthelmintic: {
		last_vaccination_date: '2013.09.18',
		nearest_vaccination_date: '2017.12.11',
		next_vaccination_date: '2022.09.30',
		is_vaccinated: true,
	}, //구충제

	vaccination_comprehensive: {
		last_vaccination_date: '2019.02.15',
		nearest_vaccination_date: '2022.10.09',
		next_vaccination_date: '2023.04.12',
		is_vaccinated: true,
	}, //종합접종

	vaccination_coronaviral_enteritis: {
		last_vaccination_date: '2020.03.21',
		nearest_vaccination_date: '2022.09.16',
		next_vaccination_date: '2022.04.17',
		is_vaccinated: true,
	}, //코로나 장염

	vaccination_bronchitis: {
		last_vaccination_date: '2016.04.18',
		nearest_vaccination_date: '2024.06.25',
		next_vaccination_date: '2022.03.02',
		is_vaccinated: true,
	}, //기관지염

	vaccination_hydrophobia: {
		last_vaccination_date: '2020.02.17',
		nearest_vaccination_date: '2021.06.22',
		next_vaccination_date: '2023.07.23',
		is_vaccinated: true,
	}, //광견병

	vaccination_influenza: {
		last_vaccination_date: '2020.03.27',
		nearest_vaccination_date: '2022.03.01',
		next_vaccination_date: '2023.12.21',
		is_vaccinated: true,
	}, //인플루엔자
};

export const _dummy_MissingDetail = {
	_id: 'user_99',
	user_nickname: '웹툰작가99',
	user_profile_uri: 'http://pds.joins.com/news/component/moneytoday/201507/23/2015072308581995198_1.jpg',
	user_address: {
		city: '서울시', //시,도
		district: '강남구', //군,구
		neighbor: '신사동', //동,읍,면
	},
	feed_type: 'missing',
	feed_content:
		'집 문을 잠시 열어놨었는데..그틈을 타서 집에서 나간 것 같아요. 워낙 활발한 아이라서 이 사람 저사람 잘 따르기도 하지만 음식을 가리는 편이라 걱정이네요. 주위에서 보신 분들은 꼭 연락 부탁드립니다.',
};

export const _dummy_ReportDetail = {
	_id: 'user_99',
	user_nickname: '웹툰작가99',
	user_profile_uri: 'http://pds.joins.com/news/component/moneytoday/201507/23/2015072308581995198_1.jpg',
	user_address: {
		city: '서울시', //시,도
		district: '강남구', //군,구
		neighbor: '신사동', //동,읍,면
	},
	feed_type: 'report',
	feed_content:
		'호수공원 옆 돌담길에서 저 강아지를 보았어요. 너무나 귀엽게 생겼지만 주인 손을 떠난지 몇개월 된 것 같았어요. 목걸이가 있는 것 같은데 보려고 해도 자꾸 도망가서 확인할 길이 없네요.',
	report_witness_date: '2021.10.21',
	report_witness_location: '경기도 김포시 김포한강8로 16-6 비닐하우스',
};
