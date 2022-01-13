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

export const dummy_MissingAnimalDetail = [
	{
		_id: 'missingdetail1',
		//임시로 지정
		user_profile_uri:
			'https://w.namu.la/s/f783eaddcfb087fe23cf0fa8b5341c803721b55167cd0f94a65ee7ae9b295e5056f58155cf5d70ec62470e89eb09f039d712b43cb13519f84f2c93eac5ce25557a6b6284dcbb4fd88936dc8faf26e872',

		// @FeedObject
		feed_type: 'missing',
		missing_animal_species: '개', //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: '진돗개', //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: 'male', //실종 동물의 성별
		missing_animal_age: '8살', //실종 동물의 나이
		missing_animal_lost_location: '공덕역', //실종 동물의 실종 지역 혹은 장소
		missing_animal_features: '온몸이 갈색이며, 무엇이든 잘 물어 뜯음', //실종 동물의 특징
		missing_animal_date: '2021-02-11', //실종일
	},
];

export const dummy_AppliesRecord_protect = [
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 123456,
		protect_animal_photos: ['https://newspenguin.com/news/photo/202006/1837_5156_215.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '하이엠', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-03-01', //등록일
		shelter_name: '서울보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '반포대교 밑', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '서울시', //시,도,군
			district: '구로구', //구
			neighbor: '구로동', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-1234-1234', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '15살',
				companion_pet_period: '3년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: 'g24ghfd', //동물보호 게시글
		protect_act_request_shelter_id: 'jhth4dd', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 345345,
		protect_animal_photos: ['https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/19/7266c35b-f00e-4582-937a-61321be44667.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '라이컷', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 2,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-08-22', //등록일
		shelter_name: '익산보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '김포공원', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 23667,
		protect_animal_photos: [
			'https://post-phinf.pstatic.net/MjAxNzA2MzBfMTIy/MDAxNDk4NzgyMDkyMTUx.ukh7-et-tZsr2LPbPe3ccs0XLwB7V_EVRrepf9b0jwYg.j3iBalwSrvtzxJ0BvuYm2zMSQe2gJ6Cd9erBK-QaMIAg.PNG/20170630_092030.png?type=w1200',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 5,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-11-18', //등록일
		shelter_name: '홍단보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '강원도 평창군 장평리', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 123456,
		protect_animal_photos: ['https://newspenguin.com/news/photo/202006/1837_5156_215.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '하이엠', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-03-01', //등록일
		shelter_name: '서울보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '반포대교 밑', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '서울시', //시,도,군
			district: '구로구', //구
			neighbor: '구로동', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-1234-1234', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '15살',
				companion_pet_period: '3년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: 'g24ghfd', //동물보호 게시글
		protect_act_request_shelter_id: 'jhth4dd', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 345345,
		protect_animal_photos: ['https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/19/7266c35b-f00e-4582-937a-61321be44667.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '라이컷', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 2,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-08-22', //등록일
		shelter_name: '익산보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '김포공원', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 23667,
		protect_animal_photos: [
			'https://post-phinf.pstatic.net/MjAxNzA2MzBfMTIy/MDAxNDk4NzgyMDkyMTUx.ukh7-et-tZsr2LPbPe3ccs0XLwB7V_EVRrepf9b0jwYg.j3iBalwSrvtzxJ0BvuYm2zMSQe2gJ6Cd9erBK-QaMIAg.PNG/20170630_092030.png?type=w1200',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 5,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-11-18', //등록일
		shelter_name: '홍단보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '강원도 평창군 장평리', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 123456,
		protect_animal_photos: ['https://newspenguin.com/news/photo/202006/1837_5156_215.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '하이엠', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-03-01', //등록일
		shelter_name: '서울보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '반포대교 밑', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '서울시', //시,도,군
			district: '구로구', //구
			neighbor: '구로동', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-1234-1234', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '15살',
				companion_pet_period: '3년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: 'g24ghfd', //동물보호 게시글
		protect_act_request_shelter_id: 'jhth4dd', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 345345,
		protect_animal_photos: ['https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/19/7266c35b-f00e-4582-937a-61321be44667.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '라이컷', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 2,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-08-22', //등록일
		shelter_name: '익산보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '김포공원', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 23667,
		protect_animal_photos: [
			'https://post-phinf.pstatic.net/MjAxNzA2MzBfMTIy/MDAxNDk4NzgyMDkyMTUx.ukh7-et-tZsr2LPbPe3ccs0XLwB7V_EVRrepf9b0jwYg.j3iBalwSrvtzxJ0BvuYm2zMSQe2gJ6Cd9erBK-QaMIAg.PNG/20170630_092030.png?type=w1200',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 5,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-11-18', //등록일
		shelter_name: '홍단보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '강원도 평창군 장평리', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 123456,
		protect_animal_photos: ['https://newspenguin.com/news/photo/202006/1837_5156_215.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '하이엠', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-03-01', //등록일
		shelter_name: '서울보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '반포대교 밑', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '서울시', //시,도,군
			district: '구로구', //구
			neighbor: '구로동', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-1234-1234', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '15살',
				companion_pet_period: '3년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: 'g24ghfd', //동물보호 게시글
		protect_act_request_shelter_id: 'jhth4dd', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 345345,
		protect_animal_photos: ['https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/19/7266c35b-f00e-4582-937a-61321be44667.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '라이컷', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'discuss', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 2,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-08-22', //등록일
		shelter_name: '익산보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '김포공원', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 23667,
		protect_animal_photos: [
			'https://post-phinf.pstatic.net/MjAxNzA2MzBfMTIy/MDAxNDk4NzgyMDkyMTUx.ukh7-et-tZsr2LPbPe3ccs0XLwB7V_EVRrepf9b0jwYg.j3iBalwSrvtzxJ0BvuYm2zMSQe2gJ6Cd9erBK-QaMIAg.PNG/20170630_092030.png?type=w1200',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 5,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-11-18', //등록일
		shelter_name: '홍단보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '강원도 평창군 장평리', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-7777-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
];

export const dummy_AppliesRecord_rescue = [
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 8762345,
		protect_animal_photos: ['http://www.cctvnews.co.kr/news/photo/202009/209212_209761_1939.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '강아지', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '말티즈', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '2개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 3,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-09-24', //등록일
		shelter_name: '경기도보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '남산타워', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '울릉도', //시,도,군
			district: '울릉구', //구
			neighbor: '나인읍', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-9999-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'안녕! 저는 대학교때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
	{
		//@FeedObject
		feed_type: 'feed',

		//@ProtectRequestObject
		_id: 3426500,
		protect_animal_photos: ['https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_species: '강아지', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '키리마', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'no', //중성화 여부
		protect_animal_estimate_age: '2개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게

		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 9,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경

		protect_request_date: '2021-11-29', //등록일
		shelter_name: '목포보호소', //보호소 이름 (보호장소)
		protect_animal_rescue_location: '초등학교', //구조지역

		//@ProtectionActivityApplicantObject
		protect_act_type: 'protect', //신청한 보호 활동의 종류, 임시보호(protect), 입양(adopt)
		protect_act_address: {
			city: '부산', //시,도,군
			district: '남구', //구
			neighbor: '나인면', //읍,면,동
		}, //보호 신청자의 주소
		protect_act_phone_number: '010-9999-0111', //보호 신청자의 전화번호
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '7살',
				companion_pet_period: '2년이상',
				companion_pet_current_status: 'adopted', //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: false, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_motivation:
			'33안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한 마리를 모시고 있는 집사입니다.' +
			'한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미 동생 만들어 주고 싶어서 신청하게 되었습니다.', //보호활동 신청동기

		protect_act_request_article_id: '7654fdd', //동물보호 게시글
		protect_act_request_shelter_id: '8ghsfgf', //동물보호 게시글 작성한 보호소
	},
];

export const dummy_ShelterInfo = {
	//@UserObject (Shelter info)
	_id: 'fsdagsdf333',
	user_type: 'shelter',
	user_profile_uri: 'https://t1.daumcdn.net/cfile/tistory/994CA8375F4C62A42B',
	user_introduction: '마포구에 있는 작은 유기동물 보호소 입니다. 쾌적한 환경과 동물들이 함께 살아갈 수 있도록 많은 관심 부탁드립니다.', //프로필에 노출될 자기소개
	user_upload_count: 12, //업로드 게시물 숫자
	user_follow_count: 131, //팔로우 숫자
	user_follower_count: 333, //팔로워 숫자
	user_denied: false, //유저의 차단여부
	user_register_date: '2021-11-10', //가입일
	user_email: 'unique@abc.com',
	shelter_type: 'public', //보호소 유형, 공립(public), 사립(private)로 나뉨
	shelter_name: '유닉 보호소', //보호소 이름
	shelter_address: {
		city: '서울', //시,도
		district: '마포구', //군,구
		neighbor: '공덕동', //동,읍,면
	}, //보호소 주소
	shelter_homepage: 'http://naver.com', //보호소 홈페이지 uri
	shelter_delegate_contact_number: '010-1111-22222', //보호소 대표 전화번호, 휴대폰 번호
	shelter_foundation_date: '2021.11.02', //보호소 설립일
};

export const _dummy_VolunteerActivityApplicant = [
	{
		_id: 'Volunteer1',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user1', 'user2'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'accept', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer2',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user3'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'accept', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer3',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer4',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user5', 'user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer5',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer6',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer7',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer8',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer9',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
	{
		_id: 'Volunteer10',
		volunteer_target_shelter: 'shelter1234', //봉사활동 대상 보호소
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		volunteer_accompany: ['user4'], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-9999-0000', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'cancel', // 'done', 'notaccept', 'accept’,’waiting’,’cancel'), //봉사활동 신청서 상태
	},
];

export const _dummy_userObject_user = [
	{
		_id: 'user1', //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '로운', //실명
		user_nickname: '사랑 리더', //닉네임
		user_gender: 'male',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad01@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '마포구', //군,구
			neighbor: '신수동 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri: 'https://cdn.topstarnews.net/news/photo/201911/691304_401189_4155.jpg', //프로필 사진
		user_introduction: '강아지를 무척 사랑 ~',
		user_birthday: '1991.12.21', //필요한지 검토 필요
		user_interests: {
			location: ['마포', '용산', '남산'],
			activity: ['산책', '펫카페'],
		},
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
	},
	{
		_id: 'user2', //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '박은빈', //실명
		user_nickname: 'silver', //닉네임
		user_gender: 'female',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad03@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '포천구', //군,구
			neighbor: '용소 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri: 'https://t1.daumcdn.net/cfile/tistory/994CA8375F4C62A42B', //프로필 사진
		user_introduction: '하루라도 고양이를 못 보면 난 힘들어 ~',
		user_birthday: '1991-12-21', //필요한지 검토 필요
		user_interests: {
			location: ['마포', '용산', '남산'],
			activity: ['산책', '펫카페'],
		},
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
	},
	{
		_id: 'user3', //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '남윤수', //실명
		user_nickname: '동물 작가', //닉네임
		user_gender: 'male',
		user_phone_number: '010-111-1111', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad02@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '용산구', //군,구
			neighbor: '구월동 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri: 'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202011/05/newsen/20201105133517620vgwj.jpg', //프로필 사진
		user_introduction: '이제 함께하자 !',
		user_birthday: '1991-12-21', //필요한지 검토 필요
		user_interests: {
			location: ['마포', '용산', '남산'],
			activity: ['산책', '펫카페'],
		},
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
	},
	{
		_id: 'user4', //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '최병찬', //실명
		user_nickname: '고양이 집사', //닉네임
		user_gender: 'male',
		user_phone_number: '010-111-1111', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad02@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '용산구', //군,구
			neighbor: '구월동 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/b492a9aa90f2b7035596bd2c11700392a9a1ff4a8e17df8eeb0cd8fa740651542552d37c9740098755854325517b91a828df33aab479ab5c8d9911562f5e1cc7a5aeaa063618c5fec7bcc9b95d2c5e5e', //프로필 사진
		user_introduction: '보호소 전문 집사',
		user_birthday: '1991-12-21', //필요한지 검토 필요
		user_interests: {
			location: ['마포', '용산', '남산'],
			activity: ['산책', '펫카페'],
		},
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
	},
	{
		_id: 'user5', //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '정채연', //실명
		user_nickname: '강아지 훈련사', //닉네임
		user_gender: 'male',
		user_phone_number: '010-111-1111', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad02@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '용산구', //군,구
			neighbor: '구월동 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/056d0edf813127f1a3a829106c1bb9ae9b9a470f447bef1c12c26a2c7bb69360e6dc65647317d6179f25593a0f6f7b9826e5100c37f00f00f230a14c215e309d4f3fcca32d91ead0e527fcf0aeba2c5b', //프로필 사진
		user_introduction: '강아지를 정말 좋아한답니다 ! ㅋㅋ',
		user_birthday: '1991-12-21', //필요한지 검토 필요
		user_interests: {
			location: ['마포', '용산', '남산'],
			activity: ['산책', '펫카페'],
		},
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
	},
];

export const _dummy_ApplicationFormVolunteer_shelter = [
	{
		_id: 'application123', //temp
		// @VolunteerActivityApplicant
		volunteer_wish_date: ['21.07.08', '21.07.09', '21.07.10', '21.07.11', '21.07.12', '21.07.13'],
		//mongodb_id만 원래 db에는 존재하지만 API 선작업 편의상 사용자 정보 임의로 조인
		volunteer_leader_phone_number: '010-1000-8888', //휴대폰번호
		volunteer_accompany: [
			{
				// @UserObject
				user_nickname: '로운이', //닉네임
				user_profile_uri: 'https://newsimg.sedaily.com/2018/11/30/1S7E292GA4_1.jpg', //프로필 사진
				user_introduction: '푸들은 저의 반려견입니다.', //프로필에 노출될 자기소개
				user_phone_number: '010-1234-5475', //휴대폰번호
			},
			{
				// @UserObject
				user_nickname: '캣맘', //닉네임
				user_profile_uri: 'https://img.tvreportcdn.de/cms-content/uploads/2020/09/15/dc625ba9-def7-4cd2-958b-44f3436a28e9.jpg', //프로필 사진
				user_introduction: '고양이는 참치 먹이가 중요합니다.', //프로필에 노출될 자기소개
				user_phone_number: '010-1234-5475', //휴대폰번호
			},
		],
	},
];

export const _dummy_petInfo_from_user = [
	{
		//@UserObject
		_id: 'pet1',
		user_type: 'pet',
		pet_is_temp_protection: false, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'male', //반려동물의 성별
		pet_neutralization: 'no', //반려동물 중성화 여부
		pet_birthday: '2021-11-08', //반려동물 생일
		pet_weight: '6', //반려동물 몸무게
		pet_status: 'companion', //반려동물의 상태, 임시보호중(protect), 입양됨(adopt), 반려동물(companion)
		pet_adopter: 'user1', //반려동물 입양자
		pet_protector: null, //반려동물 임시보호자
		user_profile_uri: 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2020/10/Amber-1200x1600.jpg',
		//infoOnOffSwitch
		info_on_off: 0,
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
