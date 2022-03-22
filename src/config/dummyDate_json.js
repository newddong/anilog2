export const dummy_userObject = [
	{
		_id: '61d2de63c0f179ccd5ba5887',
		type: 'UserObject',
		user_type: 'user',
		user_agreement: {
			is_over_fourteen: true,
			is_service: true,
			is_personal_info: true,
			is_location_service_info: true,
			is_donation_info: true,
			is_marketting_info: true,
		},
		user_name: '권상우',
		user_nickname: '권상우입',
		user_phone_number: '01096450422',
		user_mobile_company: 'SK텔레콤',
		user_is_verified_phone_number: true,
		user_is_verified_email: false,
		user_password: 'tkddn123',
		user_address: {
			city: '서울특별시',
			district: '마포구',
			neighbor: '신수동',
		},
		user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
		user_introduction: '아이에',
		user_upload_count: 23,
		user_follow_count: 18,
		user_follower_count: 4,
		user_denied: false,
		user_my_pets: ['61d2de8ac0f179ccd5ba58a6', '61d2ff57c0f179ccd5ba6e72'],
		pet_family: [],
		user_register_date: '2022-01-03T11:30:43.310Z',
		__v: 9,
		user_update_date: '2022-03-04T16:21:15.980Z',
		user_interests: {
			interests_activity: [],
			interests_beauty: [],
			interests_food: [],
			interests_health: [],
			interests_location: [],
		},
	},
	{
		_id: 2, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '하알라', //실명
		user_nickname: 'aldne', //닉네임
		user_gender: 'male',
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
		user_profile_uri:
			'https://post-phinf.pstatic.net/MjAxODAzMzBfMjg3/MDAxNTIyNDAwMjIyNzUy.9XqjidN7_Z07X0FVGPGEcF_TS2NV4P82iF7UQeLaY8gg.zPkhckokUdTkpNIqKptrmgPhTb4uOPXZ3t23cp2sRc4g.JPEG/2018-03-28_16.08.33.jpg?type=w1200', //프로필 사진
		user_introduction: 'Telling me about yourself. ',
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

		//@FollowObject
		follow_id: [1, 3],
	},
	{
		_id: 3, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '귄도간', //실명
		user_nickname: '데일리', //닉네임
		user_gender: 'male',
		user_phone_number: '010-9645-0422', //휴대폰번호
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
		user_profile_uri: 'https://i.pinimg.com/736x/16/ca/de/16cade45fafd9d4299b1c36e5e1a5c64.jpg', //프로필 사진
		user_introduction: '솜사탕 같은 하양이 엄마 노릇 중',
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

		//@FollowObject
		follow_id: [2, 4],
	},
	{
		_id: 4, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '김시연', //실명
		user_nickname: '애교용', //닉네임
		user_gender: 'female',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad04@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '위례구', //군,구
			neighbor: '조화동 87-90', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/a9177f36792f5ea4406c0182f5a4131eabf4ae90d4828cab3ea4bf3ebccb5f19c2eaa73e753385c7c602673dab83e8d81c44f33f1bd3311ab02724a9432c0f7c77f9c00ccdc25ce6c4bc282517fe5988',
		user_introduction: '우리 애교 넘치는 교용이. ',
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

		//@FollowObject
		follow_id: [1, 2],
	},
	{
		_id: 1, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '권상우', //실명
		user_nickname: 'Dende', //닉네임
		user_gender: 'female',
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
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_introduction:
			'권상우는 연예계에서 없어선 안 될 배우다. 드라마와 영화, 두 분야를 오가며 시청자와 관객의 부름을 받는 배우는 생각보다 많지 않다. 호감도와 연기력, 두 가지 모두를 갖춰야 전방위 활동이 가능하다.',
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

		//@FollowObject
		follow_id: [2, 3],
	},
	{
		_id: 2, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '하알라', //실명
		user_nickname: 'aldne', //닉네임
		user_gender: 'male',
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
		user_profile_uri:
			'https://post-phinf.pstatic.net/MjAxODAzMzBfMjg3/MDAxNTIyNDAwMjIyNzUy.9XqjidN7_Z07X0FVGPGEcF_TS2NV4P82iF7UQeLaY8gg.zPkhckokUdTkpNIqKptrmgPhTb4uOPXZ3t23cp2sRc4g.JPEG/2018-03-28_16.08.33.jpg?type=w1200', //프로필 사진
		user_introduction: 'Telling me about yourself. ',
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

		//@FollowObject
		follow_id: [1, 3],
	},
	{
		_id: 3, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '귄도간', //실명
		user_nickname: '데일리', //닉네임
		user_gender: 'male',
		user_phone_number: '010-9645-0422', //휴대폰번호
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
		user_profile_uri: 'https://i.pinimg.com/736x/16/ca/de/16cade45fafd9d4299b1c36e5e1a5c64.jpg', //프로필 사진
		user_introduction: '솜사탕 같은 하양이 엄마 노릇 중',
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

		//@FollowObject
		follow_id: [2, 4],
	},
	{
		_id: 4, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '김시연', //실명
		user_nickname: '애교용', //닉네임
		user_gender: 'female',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad04@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '위례구', //군,구
			neighbor: '조화동 87-90', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/a9177f36792f5ea4406c0182f5a4131eabf4ae90d4828cab3ea4bf3ebccb5f19c2eaa73e753385c7c602673dab83e8d81c44f33f1bd3311ab02724a9432c0f7c77f9c00ccdc25ce6c4bc282517fe5988',
		user_introduction: '우리 애교 넘치는 교용이. ',
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

		//@FollowObject
		follow_id: [1, 2],
	},
	{
		_id: 4, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '김시연', //실명
		user_nickname: '애교용', //닉네임
		user_gender: 'female',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad04@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '위례구', //군,구
			neighbor: '조화동 87-90', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/a9177f36792f5ea4406c0182f5a4131eabf4ae90d4828cab3ea4bf3ebccb5f19c2eaa73e753385c7c602673dab83e8d81c44f33f1bd3311ab02724a9432c0f7c77f9c00ccdc25ce6c4bc282517fe5988',
		user_introduction: '우리 애교 넘치는 교용이. ',
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

		//@FollowObject
		follow_id: [1, 2],
	},
	{
		_id: 4, //temp
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_agreement: {
			is_over_fourteen: true, //14살 이상
			is_service: true, //서비스 동의
			is_personal_Info: true, //개인정보 제공 동의
			is_location_service_info: true, //위치정보 제공 동의
			is_donation_info: true, //기부정보 제공 동의
			is_marketting_Info: false, //마케팅정보 제공 동의
		}, //회원가입 동의항목 동의여부
		user_name: '김시연', //실명
		user_nickname: '애교용', //닉네임
		user_gender: 'female',
		user_phone_number: '010-9645-0422', //휴대폰번호
		user_mobile_company: 'LG U+', //가입된 통신사
		user_is_verified_phone_number: true, //폰번호 인증여부
		user_email: 'lanad04@naver.com', //이메일
		user_is_verified_email: false, //이메일 인증여부
		user_password: '121212', //패스워드
		user_address: {
			city: '서울시', //시,도
			district: '위례구', //군,구
			neighbor: '조화동 87-90', //동,읍,면
		}, //회원주소
		user_profile_uri:
			'https://w.namu.la/s/a9177f36792f5ea4406c0182f5a4131eabf4ae90d4828cab3ea4bf3ebccb5f19c2eaa73e753385c7c602673dab83e8d81c44f33f1bd3311ab02724a9432c0f7c77f9c00ccdc25ce6c4bc282517fe5988',
		user_introduction: '우리 애교 넘치는 교용이. ',
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

		//@FollowObject
		follow_id: [1, 2],
	},
];

export const dummy_UserObject_pet = [
	{
		_id: 11, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
		user_introduction: '우리 애교 넘치는 교용이. ',
	},
	{
		_id: 12, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
		user_upload_count: 142142, //업로드 게시물 숫자
		user_follow_count: 12324, //팔로우 숫자
		user_follower_count: 1245667, //팔로워 숫자
		user_denied: false, //유저의 차단여부
		user_register_date: '2021-11-24', //가입일
		user_introduction: '우리 애교 넘치는 교용이. ',
	},
	{
		_id: 13, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '요들', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		_id: 14, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/cfile/blog/2547A74C52B3D5D40B',
		user_nickname: '명수',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '새', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '청사초롱', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'no', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '0.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
];

export const dummy_UserObject_protected_pet = [
	{
		_id: 11, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
	},
	{
		_id: 12, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		protect_act_address: {
			city: '서울시',
			district: '용산구',
			neighbor: '신흥동',
		},
	},
	{
		_id: 13, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '방이동',
		},
	},
	{
		_id: 14, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/cfile/blog/2547A74C52B3D5D40B',
		user_nickname: '명수',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '새', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '청사초롱', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'no', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '0.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		protect_act_address: {
			city: '강원도',
			district: '원주시',
			neighbor: '단계동',
		},
	},
];
export const dummy_UserObject_pet_with_owner = [
	{
		_id: 11, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		owner_nickname: '덴데',
	},
	{
		_id: 12, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		owner_nickname: '덴데',
	},
	{
		_id: 13, //temp
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자

		owner_nickname: '덴데',
	},
];

export const dummy_UserObject_shelter = [
	{
		_id: 21,
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 22,
		user_type: 'shelter',
		user_profile_uri: 'https://abandonedpetrescue.org/wp-content/uploads/2016/10/logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: 'APR 보호소', //보호소 이름
		shelter_address: {
			city: '서울시', //시,도
			district: '용산구', //군,구
			neighbor: '검단동', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2015.12.02', //보호소 설립일
		user_introduction: '서울시 용산구 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 156, //팔로우 숫자
		user_follower_count: 1055, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 23,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'public', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '천사 보호소', //보호소 이름
		shelter_address: {
			city: '경기도', //시,도
			district: '하남시', //군,구
			neighbor: '단계동 99-102', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '경기도 하남시 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 15, //업로드 게시물 숫자
		user_follow_count: 15, //팔로우 숫자
		user_follower_count: 144, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 24,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '티리엘 보호소', //보호소 이름
		shelter_address: {
			city: '전라도', //시,도
			district: '유현군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '전라도 유현군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 444, //업로드 게시물 숫자
		user_follow_count: 223, //팔로우 숫자
		user_follower_count: 125, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 25,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '나라 보호소', //보호소 이름
		shelter_address: {
			city: '서울시', //시,도
			district: '송파구', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '서울시 송파구 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 231, //업로드 게시물 숫자
		user_follow_count: 104, //팔로우 숫자
		user_follower_count: 122, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 26,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '충주 신천 보호소', //보호소 이름
		shelter_address: {
			city: '충주시', //시,도
			district: '신천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '충주시 신천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 231, //업로드 게시물 숫자
		user_follow_count: 551, //팔로우 숫자
		user_follower_count: 901, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 27,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍천 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '홍천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 홍천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
];
export const dummy_ProtectAnimalObject = [
	{
		_id: 1, // 고유아이디
		protect_animal_id: 11, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
	},
	{
		_id: 2, // 고유아이디
		protect_animal_id: 12, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
	},
	{
		_id: 3, // 고유아이디
		protect_animal_id: 13, //임시보호중인 동물
		protect_protector_id: 2, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
	},
];

export const dummy_AnimalProtectList = [
	{
		//@ProtectAnimalObject
		_id: 1, // 고유아이디
		protect_animal_id: 11, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 2, // 고유아이디
		protect_animal_id: 12, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 3, // 고유아이디
		protect_animal_id: 13, //임시보호중인 동물
		protect_protector_id: 2, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 1, // 고유아이디
		protect_animal_id: 11, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 2, // 고유아이디
		protect_animal_id: 12, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 3, // 고유아이디
		protect_animal_id: 13, //임시보호중인 동물
		protect_protector_id: 2, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 1, // 고유아이디
		protect_animal_id: 11, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 2, // 고유아이디
		protect_animal_id: 12, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 3, // 고유아이디
		protect_animal_id: 13, //임시보호중인 동물
		protect_protector_id: 2, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 1, // 고유아이디
		protect_animal_id: 11, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부
		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
		user_nickname: '하양이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '개', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '리트리버', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'protect',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 2, // 고유아이디
		protect_animal_id: 12, //임시보호중인 동물
		protect_protector_id: 1, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://i.pinimg.com/236x/d7/3d/30/d73d30cb3d816a517a11025dc6851c4f--the-ojays.jpg',
		user_nickname: '구룸이',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '고양이', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '도사견', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'yes', //반려동물 중성화 여부
		pet_birthday: '2020-12-21', //반려동물 생일
		pet_weight: '1.5', //반려동물 몸무게
		pet_status: 'normal',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
	{
		//@ProtectAnimalObject
		_id: 3, // 고유아이디
		protect_animal_id: 13, //임시보호중인 동물
		protect_protector_id: 2, //임시보호자 계정 id
		protect_animal_date: '2021-10-23', //생성일시
		protect_animal_update_date: '2021-10-25', //수정일시
		protect_animal_is_delete: false, //삭제여부

		//@UserObject - pet
		user_type: 'pet', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_profile_uri: 'https://t1.daumcdn.net/liveboard/holapet/7dd0ffdc19294528b5de0ffb31829366.JPG',
		user_nickname: '앵지',
		pet_is_temp_protection: true, //반려동물이 임시보호 중인지 여부
		pet_species: '악어', //반려동물의 종류(ex 개, 고양이, 토끼 등)
		pet_species_detail: '스크류 엘리게이터', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
		pet_sex: 'female', //반려동물의 성별
		pet_neutralization: 'unknown', //반려동물 중성화 여부
		pet_birthday: '2020-12-03', //반려동물 생일
		pet_weight: '350', //반려동물 몸무게
		pet_status: 'adopt',
		pet_adopter: null, //반려동물 입양자
		pet_protector: 1, //반려동물 임시보호자
	},
];

export const dummy_CompanionObject = [
	//반려동물 관계 - 주인이 2개 이상, 펫이 2개이상은 상식적이다
	{
		_id: 1,
		companion_pet_id: 11, //반려동물
		companion_user_id: 1, //주인 계정
		companion_date: '2021-11-20', //생성일시
		companion_update_date: '2021-11-21', //수정일시
		companion_is_delete: false, //삭제여부
	},
	{
		_id: 2,
		companion_pet_id: 12, //반려동물
		companion_user_id: 1, //주인 계정
		companion_date: '2021-11-20', //생성일시
		companion_update_date: '2021-11-21', //수정일시
		companion_is_delete: false, //삭제여부
	},
	{
		_id: 3,
		companion_pet_id: 13, //반려동물
		companion_user_id: 2, //주인 계정
		companion_date: '2021-11-20', //생성일시
		companion_update_date: '2021-11-21', //수정일시
		companion_is_delete: false, //삭제여부
	},
	{
		_id: 4,
		companion_pet_id: 13, //반려동물
		companion_user_id: 2, //주인 계정
		companion_date: '2021-11-20', //생성일시
		companion_update_date: '2021-11-21', //수정일시
		companion_is_delete: false, //삭제여부
	},
];

export const dummy_VolunteerAcitivityApplicantObject = [
	{
		_id: 1,
		volunteer_target_shelter: 21, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.30', '21.11.30', '21.12.06', '21.11.30', '21.11.30', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 2], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'accept',
		// Enum('done','notaccept','accept’,’waiting’,’cancel') //봉사활동 신청서 상태
		//완료(done)
		//신청승인안됨(notaccept)
		//신청승인됨(accept)
		//보호소승인대기(waiting)
		//신청취소(cancel)
	},
	{
		_id: 2,
		volunteer_target_shelter: 22, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.22', '21.11.28', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 3], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
	{
		_id: 3,
		volunteer_target_shelter: 23, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.23', '21.11.28', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [2, 3, 4], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
	{
		_id: 4,
		volunteer_target_shelter: 24, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 3], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
	{
		_id: 5,
		volunteer_target_shelter: 25, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 3], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
	{
		_id: 6,
		volunteer_target_shelter: 26, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 3], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
	{
		_id: 7,
		volunteer_target_shelter: 27, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [1, 3], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
	},
];

// Title : ShelterProtectAnimalObject
export const dummy_ShelterProtectAnimalObject = [
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)

		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 11,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)

		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 11,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'rescue', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)

		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 11,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)

		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 11,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
];

export const dummy_ProtectRequestObject = [
	//보호소의 동물 보호 요청 게시글
	{
		_id: 1,
		shelter_name: '홍단 보호소',
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'rescue', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수
	},
	{
		_id: 2,
		shelter_name: '홍단 보호소',

		protect_request_photos: [
			'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/4OR1LFTQ0F0ZB4vCb32Agwk9UMw',
			'https://creators.mypetlife.co.kr/wp-content/uploads/2020/01/949_1990_2548.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://t1.daumcdn.net/news/202105/22/petzzi/20210522141352278yebt.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 12, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '둘리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '둘리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 124, //보호요청 게시물 조회수
		protect_request_favorite_count: 55, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'rescue', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.15', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수
	},
	{
		_id: 3,
		shelter_name: '홍단 보호소',

		protect_request_photos: [
			'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/4OR1LFTQ0F0ZB4vCb32Agwk9UMw',
			'https://creators.mypetlife.co.kr/wp-content/uploads/2020/01/949_1990_2548.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://t1.daumcdn.net/news/202105/22/petzzi/20210522141352278yebt.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 13, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '둘리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '둘리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 124, //보호요청 게시물 조회수
		protect_request_favorite_count: 55, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'rescue', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.24', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수
	},
];

export const dummy_AnimalFromShelter_adopted = [
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',
		feed_id: 1,
		feed_writer_id: 21,

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_id: 1,
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
];
export const dummy_AnimalNeedHelpList_various_status = [
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 1,
		protect_animal_photos: [
			'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'protect', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '밍키의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'discuss', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.25', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 1034545, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//@feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiD1HUODwudK8Bghzqxx0YGuiNC2pfyw28Pw&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '간석동 호수주변', //보호중인 동물의 구조장소
		protect_animal_species: '개', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '치와와', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'emergency', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '달리의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '달리의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.29', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.29', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		//feedObject
		feed_type: 'feed',

		//@ShelterPRotectAnimalObject
		_id: 3,
		protect_animal_photos: ['https://i.ytimg.com/vi/JumpaYjsges/hqdefault.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '송파구 석촌호수 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '불분명', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '12', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'adopted', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: null,
		protect_animal_protect_request: false,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 5, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: 1, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: 21, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		// @ProtectRequestObject 보호요청 게시글
		protect_request_photos: [
			'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
			'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
		], //보호요청 게시물의 첨부사진 uri
		protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg', //보호요청 게시물 썸네일 uri
		protect_animal_id: 11, //보호요청할 동물 ShelterProtectAnimalObject
		protect_request_title: '히야의 새 보금자리를 찾아요', //보호요청 게시물의 제목
		protect_request_content: '히야의 새 집사가 되어주실수 있으신 분 무한 찾습니다', //보호요청 게시물 내용
		protect_request_writer_id: 21, //보호요청 게시물 작성자 UserObject
		protect_request_hit: 102, //보호요청 게시물 조회수
		protect_request_favorite_count: 21, //보호요청 게시물을 즐겨찾기 한 숫자
		protect_request_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //항목 추가 필요
		//입양가능(rescue), 보호소에서 구조가 이루어졌으므로 입양가능한 상태임,
		//협의중(discuss)
		//안락사 임박(nearrainbow)
		//완료(complete), 입양, 임시보호가 되면 보호요청 게시글은 완료 상태로 변경됨, 해당 동물은(adopt,protect)가 됨
		//사망(rainbowbridge)
		protect_request_date: '2021.11.21', //보호요청 게시글 작성일시
		protect_request_update_date: '2021.11.21', //보호요청 게시글 수정일시
		protect_request_comment_count: null, //보호요청 게시물 댓글의 수

		//@UserObejct(shelter)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
];

export const dummy_AdoptorInformation = {
	_id: 1,
	feed_id: 1,
	feed_type: 'feed',
	feed_writer_id: 21,
	protect_act_address: {city: '서울시', district: '성북구', neighbor: '가례 3동 11-44'},
	protect_act_applicant_id: 1,
	protect_act_checklist: {
		is_adult: true,
		is_agreed_housemate: true,
		is_experience_defecate: true,
		is_knowledge_sanitation: true,
		is_near_veterinary: true,
	},
	protect_act_companion_history: [
		{companion_pet_age: '3년 이상', companion_pet_current_status: 'living', companion_pet_period: '6개월', companion_pet_species: '개'},
	],
	protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.',
	protect_act_phone_number: '010-9645-0422',
	protect_act_request_article_id: 3,
	protect_act_request_shelter_id: 11,
	protect_act_type: 'adopt',
	//@ShelterPRotectAnimalObject

	protect_animal_adoption_days_remain: null,
	protect_animal_adoptor_id: 1,
	protect_animal_estimate_age: '6개월',
	protect_animal_id: 11,
	protect_animal_neutralization: 'yes',
	protect_animal_photos: [
		'https://contents.creators.mypetlife.co.kr/content/uploads/2020/10/13134542/20201013131307_365d1baf95782ec7b30225d1fe1616a5_j6xk.jpg',
	],
	protect_animal_protect_request: false,
	protect_animal_protect_request_id: 2,
	protect_animal_protector_discussion_id: null,
	protect_animal_protector_id: 21,
	protect_animal_rescue_date: '2021-11-24',
	protect_animal_rescue_location: '자운동',
	protect_animal_sex: 'male',
	protect_animal_species: '고양이',
	protect_animal_species_detail: '러브숏',
	protect_animal_status: 'adopted',
	protect_animal_weight: '1.2',
	protect_animal_writer_id: 21,
	// @ProtectRequestObject 보호요청 게시글
	protect_request_comment_count: null,
	protect_request_content: '밍키의 새 집사가 되어주실수 있으신 분 무한 찾습니다',
	protect_request_date: '2021.11.21',
	protect_request_favorite_count: 21,
	protect_request_hit: 102,
	protect_request_id: 1,
	protect_request_photo_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202006/06/76723291-7f53-4b1a-b058-766f6215d566.jpg',
	protect_request_photos: [
		'https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2',
		'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg',
	],
	protect_request_status: 'adopt',
	protect_request_title: '밍키의 새 보금자리를 찾아요',
	protect_request_update_date: '2021.11.25',
	protect_request_writer_id: 21,
	//@UserObejct(shelter)

	shelter_address: {city: '강원도', district: '평창군', neighbor: '용평면'},
	shelter_delegate_contact_number: '010-4442-1325',
	shelter_foundation_date: '2012.05.02',
	shelter_homepage: 'http://google.com',
	shelter_name: '홍단 보호소',
	shelter_type: 'private',
	user_denied: false,
	user_follow_count: 1034545,
	user_follower_count: 555,
	user_introduction: '강원도 평창군 소재의 입양보호소',
	user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
	user_type: 'shelter',
	user_upload_count: 123,
};

export const dummy_CommentObject = [
	{
		//@CommentObejct
		_id: 1,
		comment_photo_uri: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/MdR4J997-uHmKvzDMVa68hXFt1U', //댓글 첨부 이미지 uri
		comment_contents: '아깽이 머리가 두 개인게 너무 신기하고 귀엽네요. 저희 고양이 첫 째 사진도 보고 가세요. 슬퍼하는 모습이 참 보기 좋네요.', //댓글 내용
		comment_like_count: 122, //댓글 좋아요 숫자
		comment_dislike_count: 0, //댓글 싫어요 숫자(현재 기획에는 없음)
		comment_report_count: 0, //댓글 신고 숫자(신고기능과 연결, 관리자만 열람가능, 일반유저에게 공개할지 결정해야함)
		comment_report_block: false, //댓글 신고로 인한 댓글 공개차단여부(true일 경우, ‘신고된 댓글입니다’로 내용 비공개 전환
		comment_parent: null, //Mongodb_ID(ref:CommentObject), //대댓글이 달린 댓글의 ID
		comment_parent_writer_id: null, //Mongodb_ID(ref:UserObject), //부모 댓글의 작성자 ID
		comment_date: '2021-11-20', //댓글 작성일시
		comment_update_date: '2021-11-20', //댓글 최정 수정일시
		comment_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글 작성자
		comment_feed_id: 1, //Mongodb_ID(ref:FeedObject), //댓글이 작성된 피드 게시물
		comment_feed_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 피드 게시물의 작성자
		comment_protect_request_id: 1, //Mongodb_ID(ref:ProtectRequestObject), //댓글이 작성된 동물보호 요청 게시물
		comment_protect_request_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 동물보호 요청 게시물의 작성자
		comment_is_secure: false, //true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음,
		comment_is_delete: false, //댓글의 삭제여부

		//@UserObject ref(comment_parent_writer_id: 1)
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_name: '권상우', //실명
		user_nickname: 'Dende', //닉네임
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_denied: false, //유저의 차단여부
		user_address: {
			city: '서울시', //시,도
			district: '마포구', //군,구
			neighbor: '신수동 89-77', //동,읍,면
		}, //회원주소

		//@FeedObject ref(comment_feed_id : 1)

		//@LikeCommentObject ref( comment_writer_id )
		like_comment_id: 1,
		like_comment_user_id: [2, 3],
	},
	{
		_id: 2,
		comment_photo_uri: 'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/p0ySdMBfA9uj8_Amo-YKqv6fJFE', //댓글 첨부 이미지 uri
		comment_contents: ' 제 주인 사진도 보고 가세요', //댓글 내용
		comment_like_count: 122, //댓글 좋아요 숫자
		comment_dislike_count: 0, //댓글 싫어요 숫자(현재 기획에는 없음)
		comment_report_count: 0, //댓글 신고 숫자(신고기능과 연결, 관리자만 열람가능, 일반유저에게 공개할지 결정해야함)
		comment_report_block: false, //댓글 신고로 인한 댓글 공개차단여부(true일 경우, ‘신고된 댓글입니다’로 내용 비공개 전환
		comment_parent: 1, //Mongodb_ID(ref:CommentObject), //대댓글이 달린 댓글의 ID
		comment_parent_writer_id: 1, //Mongodb_ID(ref:UserObject), //부모 댓글의 작성자 ID
		comment_date: '2021-11-23', //댓글 작성일시
		comment_update_date: '2021-11-30', //댓글 최정 수정일시
		comment_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글 작성자
		comment_feed_id: 1, //Mongodb_ID(ref:FeedObject), //댓글이 작성된 피드 게시물
		comment_feed_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 피드 게시물의 작성자
		comment_protect_request_id: 1, //Mongodb_ID(ref:ProtectRequestObject), //댓글이 작성된 동물보호 요청 게시물
		comment_protect_request_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 동물보호 요청 게시물의 작성자
		comment_is_secure: false, //true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음,
		comment_is_delete: false, //댓글의 삭제여부

		//@UserObject ref(comment_parent_writer_id: 1)
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_name: '권상우', //실명
		user_nickname: 'Dende', //닉네임
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_denied: false, //유저의 차단여부
		user_address: {
			city: '서울시', //시,도
			district: '마포구', //군,구
			neighbor: '신수동 89-77', //동,읍,면
		}, //회원주소

		//@LikeCommentObject ref( comment_writer_id )
		like_comment_id: 1,
		like_comment_user_id: [1, 2, 3],
	},
	{
		_id: 3,
		comment_photo_uri: 'https://d1bg8rd1h4dvdb.cloudfront.net/upload/imgServer/storypick/editor/2020062615503065168.jpg', //댓글 첨부 이미지 uri
		comment_contents: ' 강아지는 역시 리트리버죠 ~ ', //댓글 내용
		comment_like_count: 122, //댓글 좋아요 숫자
		comment_dislike_count: 0, //댓글 싫어요 숫자(현재 기획에는 없음)
		comment_report_count: 0, //댓글 신고 숫자(신고기능과 연결, 관리자만 열람가능, 일반유저에게 공개할지 결정해야함)
		comment_report_block: false, //댓글 신고로 인한 댓글 공개차단여부(true일 경우, ‘신고된 댓글입니다’로 내용 비공개 전환
		comment_parent: 1, //Mongodb_ID(ref:CommentObject), //대댓글이 달린 댓글의 ID
		comment_parent_writer_id: 1, //Mongodb_ID(ref:UserObject), //부모 댓글의 작성자 ID
		comment_date: '2021-11-23', //댓글 작성일시
		comment_update_date: '2021-11-30', //댓글 최정 수정일시
		comment_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글 작성자
		comment_feed_id: 1, //Mongodb_ID(ref:FeedObject), //댓글이 작성된 피드 게시물
		comment_feed_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 피드 게시물의 작성자
		comment_protect_request_id: 1, //Mongodb_ID(ref:ProtectRequestObject), //댓글이 작성된 동물보호 요청 게시물
		comment_protect_request_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 동물보호 요청 게시물의 작성자
		comment_is_secure: false, //true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음,
		comment_is_delete: false, //댓글의 삭제여부

		//@UserObject ref(comment_parent_writer_id: 1)
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_name: '권상우', //실명
		user_nickname: 'Dende', //닉네임
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_denied: false, //유저의 차단여부
		user_address: {
			city: '서울시', //시,도
			district: '마포구', //군,구
			neighbor: '신수동 89-77', //동,읍,면
		}, //회원주소

		//@LikeCommentObject ref( comment_writer_id )
		like_comment_id: 1,
		like_comment_user_id: [1, 2, 3],
	},
];

export const dummy_ChildComment = [
	{
		_id: 3,
		comment_photo_uri: 'https://image-notepet.akamaized.net/resize/620x-/seimage/20170502%2F1a5031697ab995d95eadb8db6ad53290.jpg', //댓글 첨부 이미지 uri
		comment_contents: '2개월 반 된 제 아가도 보고 가세요~ 항상 화나 있는 얼굴이지만 이게 기분 좋은 상태인겁니다', //댓글 내용
		comment_like_count: 122, //댓글 좋아요 숫자
		comment_dislike_count: 0, //댓글 싫어요 숫자(현재 기획에는 없음)
		comment_report_count: 0, //댓글 신고 숫자(신고기능과 연결, 관리자만 열람가능, 일반유저에게 공개할지 결정해야함)
		comment_report_block: false, //댓글 신고로 인한 댓글 공개차단여부(true일 경우, ‘신고된 댓글입니다’로 내용 비공개 전환
		comment_parent: 1, //Mongodb_ID(ref:CommentObject), //대댓글이 달린 댓글의 ID
		comment_parent_writer_id: 1, //Mongodb_ID(ref:UserObject), //부모 댓글의 작성자 ID
		comment_date: '2021-11-23', //댓글 작성일시
		comment_update_date: '2021-11-30', //댓글 최정 수정일시
		comment_writer_id: 2, //Mongodb_ID(ref:UserObject), //댓글 작성자
		comment_feed_id: 1, //Mongodb_ID(ref:FeedObject), //댓글이 작성된 피드 게시물
		comment_feed_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 피드 게시물의 작성자
		comment_protect_request_id: 1, //Mongodb_ID(ref:ProtectRequestObject), //댓글이 작성된 동물보호 요청 게시물
		comment_protect_request_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 동물보호 요청 게시물의 작성자
		comment_is_secure: false, //true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음,
		comment_is_delete: false, //댓글의 삭제여부

		//@UserObject ref(comment_parent_writer_id: 1)
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_name: '김시연', //실명
		user_nickname: '애교용', //닉네임
		user_address: {
			city: '서울시', //시,도
			district: '위례구', //군,구
			neighbor: '조화동 87-90', //동,읍,면
		}, //회원주소
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_denied: false, //유저의 차단여부

		//@LikeCommentObject ref( comment_writer_id )
		like_comment_id: 1,
		like_comment_user_id: [2, 3, 4],
	},
	{
		_id: 4,
		comment_photo_uri: null, //댓글 첨부 이미지 uri
		comment_contents: '너무 웃긴 사진들이네요 ㅎㅎ 저는 항상 이쁘게만 찍혀서 문제에요', //댓글 내용
		comment_like_count: 122, //댓글 좋아요 숫자
		comment_dislike_count: 0, //댓글 싫어요 숫자(현재 기획에는 없음)
		comment_report_count: 0, //댓글 신고 숫자(신고기능과 연결, 관리자만 열람가능, 일반유저에게 공개할지 결정해야함)
		comment_report_block: false, //댓글 신고로 인한 댓글 공개차단여부(true일 경우, ‘신고된 댓글입니다’로 내용 비공개 전환
		comment_parent: 1, //Mongodb_ID(ref:CommentObject), //대댓글이 달린 댓글의 ID
		comment_parent_writer_id: 1, //Mongodb_ID(ref:UserObject), //부모 댓글의 작성자 ID
		comment_date: '2021-11-23', //댓글 작성일시
		comment_update_date: '2021-11-30', //댓글 최정 수정일시
		comment_writer_id: 3, //Mongodb_ID(ref:UserObject), //댓글 작성자
		comment_feed_id: 1, //Mongodb_ID(ref:FeedObject), //댓글이 작성된 피드 게시물
		comment_feed_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 피드 게시물의 작성자
		comment_protect_request_id: 1, //Mongodb_ID(ref:ProtectRequestObject), //댓글이 작성된 동물보호 요청 게시물
		comment_protect_request_writer_id: 1, //Mongodb_ID(ref:UserObject), //댓글이 작성된 동물보호 요청 게시물의 작성자
		comment_is_secure: false, //true일때는 writer와 댓글이 달린 게시글 작성자만 볼수있음,
		comment_is_delete: false, //댓글의 삭제여부

		//@UserObject ref(comment_parent_writer_id: 1)
		user_type: 'user', //유저의 유형, 일반유저(user),보호소(shelter),반려동물(pet)으로 나뉨
		user_name: '하알라', //실명
		user_nickname: 'aldne', //닉네임
		user_address: {
			city: '서울시', //시,도
			district: '포천구', //군,구
			neighbor: '용소 89-77', //동,읍,면
		}, //회원주소
		user_profile_uri: 'https://photo.jtbc.joins.com/news/2017/06/05/20170605100602700.jpg', //프로필 사진
		user_denied: false, //유저의 차단여부

		//@LikeCommentObject ref( comment_writer_id )
		like_comment_id: 1,
		like_comment_user_id: [1, 2, 3, 4],
	},
];

export const dummy_requestAnimalListApplied = [
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 1,
		protect_animal_photos: ['https://storage.cobak.co/uploads/1588405371328060_143f1eabc3.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '바른치킨 서강대역점 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: 1.2, //몸무게
		protect_animal_status: 'protect', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 21, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 1, //보호요청 게시물
		protect_animal_adoptor_id: null, //입양자
		protect_animal_protector_id: null, //임시보호자
		protect_animal_protector_discussion_id: null, //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [1, 2, 3], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-7780-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPMjNlensOfXbaEJkMyyzjNnidrSWRvzXMA&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: null, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: null, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: null, // Mongodb_ID(ref:UserObject), //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [1, 2, 3], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 3,
		protect_animal_photos: [
			'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/bw39r42kS9dlP_tnNMix6z2iXUM',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '굴다리 식당 공덕점', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '키스숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '1년', //보호중인 동물의 추정 연령
		protect_animal_weight: 2, //몸무게
		protect_animal_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 22, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 3, //보호요청 게시물
		protect_animal_adoptor_id: 3, //입양자
		protect_animal_protector_id: 2, //임시보호자
		protect_animal_protector_discussion_id: null, //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [1, 2, 3], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '아이를 키워보고 싶습니다.', //보호활동 신청동기
	},
	{
		//@FeedObeject

		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 1,
		protect_animal_photos: ['https://storage.cobak.co/uploads/1588405371328060_143f1eabc3.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '바른치킨 서강대역점 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: 1.2, //몸무게
		protect_animal_status: 'protect', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 21, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 1, //보호요청 게시물
		protect_animal_adoptor_id: null, //입양자
		protect_animal_protector_id: null, //임시보호자
		protect_animal_protector_discussion_id: null, //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [1, 2, 3], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-7780-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
];

export const dummy_AidRequestAnimalList = [
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 1,
		protect_animal_photos: ['https://storage.cobak.co/uploads/1588405371328060_143f1eabc3.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '바른치킨 서강대역점 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: 1.2, //몸무게
		protect_animal_status: 'protect', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 21, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 1, //보호요청 게시물
		protect_animal_adoptor_id: null, //입양자
		protect_animal_protector_id: null, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-7780-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPMjNlensOfXbaEJkMyyzjNnidrSWRvzXMA&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: null, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: null, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 3,
		protect_animal_photos: [
			'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/bw39r42kS9dlP_tnNMix6z2iXUM',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '굴다리 식당 공덕점', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '키스숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '1년', //보호중인 동물의 추정 연령
		protect_animal_weight: 2, //몸무게
		protect_animal_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 22, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 3, //보호요청 게시물
		protect_animal_adoptor_id: 3, //입양자
		protect_animal_protector_id: 2, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '아이를 키워보고 싶습니다.', //보호활동 신청동기
	},
	{
		//@FeedObeject

		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 1,
		protect_animal_photos: ['https://storage.cobak.co/uploads/1588405371328060_143f1eabc3.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '바른치킨 서강대역점 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: 1.2, //몸무게
		protect_animal_status: 'protect', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 21, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 1, //보호요청 게시물
		protect_animal_adoptor_id: null, //입양자
		protect_animal_protector_id: null, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-7780-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPMjNlensOfXbaEJkMyyzjNnidrSWRvzXMA&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: null, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: null, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 3,
		protect_animal_photos: [
			'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/bw39r42kS9dlP_tnNMix6z2iXUM',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '굴다리 식당 공덕점', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '키스숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '1년', //보호중인 동물의 추정 연령
		protect_animal_weight: 2, //몸무게
		protect_animal_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 22, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 3, //보호요청 게시물
		protect_animal_adoptor_id: 3, //입양자
		protect_animal_protector_id: 2, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '아이를 키워보고 싶습니다.', //보호활동 신청동기
	},
	{
		//@FeedObeject

		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 1,
		protect_animal_photos: ['https://storage.cobak.co/uploads/1588405371328060_143f1eabc3.jpg'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '바른치킨 서강대역점 주변', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러시안블루', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: 1.2, //몸무게
		protect_animal_status: 'protect', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 21, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 1, //보호요청 게시물
		protect_animal_adoptor_id: null, //입양자
		protect_animal_protector_id: null, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '마포구',
			neighbor: '신수동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-7780-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		feed_type: 'feed',

		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 2,
		protect_animal_photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPMjNlensOfXbaEJkMyyzjNnidrSWRvzXMA&usqp=CAU'], //보호중인 동물 사진
		protect_animal_rescue_date: '2021-11-24', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '자운동', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '러브숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'male', //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //중성화 여부
		protect_animal_estimate_age: '6개월', //보호중인 동물의 추정 연령
		protect_animal_weight: '1.2', //몸무게
		protect_animal_status: 'rescue', // Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_adoption_days_remain: 10,
		protect_animal_protect_request: true,
		//기본상태는 rescue임 (동물이 구조되어 보호소로 들어온 최초 상태)
		//임시보호가 되면 protect로 변경
		//입양을 가게 되면 상태가 adopt로 변경
		//임시보호, 입양 협의중이면 discuss로 변경
		//안락사, 혹은 폐사상태가 되면 rainbowbridge로 변경
		protect_animal_writer_id: 21, // Mongodb_ID(ref:UserObject), //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 2, //Mongodb_ID(ref:ProtectRequestObject), //보호요청 게시물
		protect_animal_adoptor_id: null, //Mongodb_ID(ref:UserObject), //입양자
		protect_animal_protector_id: null, //Mongodb_ID(ref:UserObject), //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '키우던 개의 가족을 만들어주고 싶습니다.', //보호활동 신청동기
	},
	{
		feed_type: 'feed',

		//@UserObject
		shelter_name: '홍단 보호소',

		//@ProtectRequestObject
		protect_request_date: '2021.11.30',

		//@ShelterProtectAnimalObject
		_id: 3,
		protect_animal_photos: [
			'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/bw39r42kS9dlP_tnNMix6z2iXUM',
		], //보호중인 동물 사진
		protect_animal_rescue_date: '2021.11.23', //보호중인 동물의 구조일자(보호소가 동물을 맡은 일자)
		protect_animal_rescue_location: '굴다리 식당 공덕점', //보호중인 동물의 구조장소
		protect_animal_species: '고양이', //보호중인 동물의 종류(ex 개, 고양이, 토끼)
		protect_animal_species_detail: '키스숏', //보호중인 동물의 종류(ex 리트리버, 푸들, 진돗개)
		protect_animal_sex: 'female', // Enum('male','female','unknown'), //보호중인 동물의 성별
		protect_animal_neutralization: 'yes', //Enum('yes','no','unknown'), //중성화 여부
		protect_animal_estimate_age: '1년', //보호중인 동물의 추정 연령
		protect_animal_weight: 2, //몸무게
		protect_animal_status: 'adopt', //Enum(‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’), //보호중인 동물의 상태
		protect_animal_protect_request: false,
		protect_animal_adoption_days_remain: 10,
		protect_animal_writer_id: 22, //보호요청을 작성한 작성자(보호소)
		protect_animal_protect_request_id: 3, //보호요청 게시물
		protect_animal_adoptor_id: 3, //입양자
		protect_animal_protector_id: 2, //임시보호자
		protect_animal_protector_discussion_id: [], //입양, 임시보호 협의중인 유저

		//@ProtectionActivityApllicantObject -
		protect_act_applicant_id: [], // 해당 보호동물에 대한 보호활동신청을 함 지원자들의 id list
		protect_act_address: {
			city: '서울시',
			district: '송파구',
			neighbor: '송정동',
		},
		protect_act_companion_history: [
			{
				companion_pet_species: '개',
				companion_pet_age: '3년 이상',
				companion_pet_period: '6개월',
				companion_pet_current_status: 'living', //Enum('living', 'died', 'adopted'), //상태정보 카테고리 정해야함
			},
		], //보호 신청자의 반려생활 이력
		protect_act_checklist: {
			is_adult: true, //성인여부
			is_near_veterinary: true, //보호지 근처의 동물병원 여부
			is_agreed_housemate: true, //가족, 동거인의 동의 여부
			is_experience_defecate: true, //배변훈련 지식여부
			is_knowledge_sanitation: true, //반려동물 미용,위생 지식여부
		}, //보호신청 체크리스트
		protect_act_phone_number: '010-4742-6690',
		protect_act_motivation: '아이를 키워보고 싶습니다.', //보호활동 신청동기
	},
];

export const _dummyData_favoriteFeeds = [
	{
		feed_id: 'dog7',
		isVideo: true,
		//Video가 포함되어 있는 dummyData의 경우 FeedThumbnail에서 재생표시( '▶')가 나타난다
		medias: [1, 2, 3, 'Video'],
		alert_title: '실종',
		img_uri:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
	},
	{
		feed_id: 'dog2',
		isVideo: true,
		medias: [1, 2, 3, 4],
		alert_title: '',
		img_uri: 'https://t1.daumcdn.net/cfile/tistory/9925F03C5AD486B033',
	},
	{
		feed_id: 'dog3',
		isVideo: false,
		medias: [1, 2, 3, 'Video'],
		alert_title: '',
		img_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
	},
	{
		feed_id: 'dog4',
		isVideo: true,
		medias: [1, 2, 3, 'Video'],
		alert_title: '실종',
		img_uri: 'https://t1.daumcdn.net/cfile/blog/2547A74C52B3D5D40B',
	},
	{
		feed_id: 'dog6',
		isVideo: true,
		medias: [1, 2, 3, 4],
		alert_title: '구조',
		img_uri: 'https://i.pinimg.com/originals/96/02/ee/9602ee8abb93b9100335c49c147e4098.jpg',
	},
];

export const dummy_FeedObject = [
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 1,
		feed_content: '자꾸 앞머리 잘라주는 편이 낫다고 해서 잘랐어요~', //피드 본문
		feed_thumbnail:
			'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fhappypet%2F9075e36d837244bd84cc370a63444825.jpg', //피드 첨부된 미디어의 aws s3 uri
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 11, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '마포구 신수동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 2,
		feed_content: '루퐁이네 "제발 그만 귀여어ㅜ~~이러다 다 죽어~~" 유튜브 업로드 되었습니다~', //피드 본문
		feed_thumbnail: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 12, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '용산구 우산동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 3,
		feed_content: '새벽마다 냉장고 앞에 나타나는 강아지가 있다는데...원하는 마늠 간식을 먹은 후에야 다시 자러간대여', //피드 본문
		feed_thumbnail:
			'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
			{
				is_video: true, //미디어가 동영상인지 여부를 판단
				duration: 15000, //동영상일 경우 재생 시간
				media_uri:
					'https://pro2-bar-s3-cdn-cf2.myportfolio.com/c3de7d5eaa03f1fbdf4593a06d4c69d2/dca948a8-475d-427f-bb65-ed65c37592f6_rw_1200.jpg?h=fc2452990e4e8230ca2b05fa0aaf75dc',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'feed', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
	{
		//피드 게시물
		_id: 4,
		feed_content: '매일 산책하다가 인형이잘 있는지 확인하는 포토관에 드디어 입성!', //피드 본문
		feed_thumbnail: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
		feed_medias: [
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
			{
				is_video: false, //미디어가 동영상인지 여부를 판단
				duration: null, //동영상일 경우 재생 시간
				media_uri: 'https://cdn.imweb.me/upload/S20190926a0754ded73eb5/dc9933a6cf7b3.png',
				tags: null,
			},
		],
		feed_writer_id: 1, //게시글 작성자의 db고유 아이디
		feed_avatar_id: 13, //주인공 동물로 지정한 반려동물 계정의 id, 작성자가 avatar_id로 클라이언트에 표시됨
		feed_location: '강원도 원주시 단계동', //게시글의 작성 지역정보
		feed_date: '2021-11-30', //피드 최초 작성일자
		feed_update_date: '2021-11-30', //피드 최종 업로드 날자
		feed_type: 'missing', //Enum(‘feed’,’missing’,’report’), //게시글의 타잎, ‘일반게시물(feed)’,’실종게시물(missing)’,’제보게시물(report)’로 나뉨
		feed_is_protect_diary: false, //임보일기일 경우 true
		feed_like_count: 112, //게시글에 좋아요를 누른 수
		feed_favorite_count: 552, //게시글을 즐겨찾기로 등록한 수
		feed_comment_count: 11, //게시글에 달린 댓글의 수(대댓글 포함)
		missing_animal_species: null, //실종 동물의 종류(ex 강아지, 고양이, 토끼 등)
		missing_animal_species_detail: null, //실종 동물의 세부 종류(ex 리트리버, 불독, 진돗개 등)
		missing_animal_sex: null, // Enum('male','female','unknown'), //실종 동물의 성별
		missing_animal_age: null, //String, //실종 동물의 나이
		missing_animal_lost_location: null, // String, //실종 동물의 실종 지역 혹은 장소
		missing_animal_contact: null, //String, //실종 동물의 제보를 받을 사람의 연락처
		missing_animal_features: null, //LongText, //실종 동물의 특징
		report_witness_date: null, //제보일자(해당 동물의 목격일)
		report_witness_location: null, //제보장소(목격장소)
	},
];

export const dummy_manageUserVolunteer = [
	{
		_id: 1,
		volunteer_target_shelter: 21, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.01', '21.11.02', '21.12.03', '21.11.04', '21.11.05', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[0], dummy_userObject[1]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'waiting',
		// Enum('done','notaccept','accept’,’waiting’,’cancel') //봉사활동 신청서 상태
		//완료(done)
		//신청승인안됨(notaccept)
		//신청승인됨(accept)
		//보호소승인대기(waiting)
		//신청취소(cancel)
		user_type: 'shelter',
		user_profile_uri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/DWG_KIA_logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍단 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '평창군', //군,구
			neighbor: '용평면', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 평창군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
	},
	{
		_id: 2,
		volunteer_target_shelter: 22, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.22', '21.11.28', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[0], dummy_userObject[2]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'waiting',
		user_type: 'shelter',
		user_profile_uri: 'https://abandonedpetrescue.org/wp-content/uploads/2016/10/logo.png',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: 'APR 보호소', //보호소 이름
		shelter_address: {
			city: '서울시', //시,도
			district: '용산구', //군,구
			neighbor: '검단동', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2015.12.02', //보호소 설립일
		user_introduction: '서울시 용산구 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 156, //팔로우 숫자
		user_follower_count: 1055, //팔로워 숫자
	},
	{
		_id: 3,
		volunteer_target_shelter: 23, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.23', '21.11.28', '21.12.06'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[0], dummy_userObject[1], dummy_userObject[3]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-6694-1921', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'waiting',
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'public', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '천사 보호소', //보호소 이름
		shelter_address: {
			city: '경기도', //시,도
			district: '하남시', //군,구
			neighbor: '단계동 99-102', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '경기도 하남시 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 15, //업로드 게시물 숫자
		user_follow_count: 15, //팔로우 숫자
		user_follower_count: 144, //팔로워 숫자
	},
	{
		_id: 4,
		volunteer_target_shelter: 24, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[0], dummy_userObject[1]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'waiting',
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '티리엘 보호소', //보호소 이름
		shelter_address: {
			city: '전라도', //시,도
			district: '유현군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '전라도 유현군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 444, //업로드 게시물 숫자
		user_follow_count: 223, //팔로우 숫자
		user_follower_count: 125, //팔로워 숫자
	},
	{
		_id: 5,
		volunteer_target_shelter: 25, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[2], dummy_userObject[3]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'waiting',
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '나라 보호소', //보호소 이름
		shelter_address: {
			city: '서울시', //시,도
			district: '송파구', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '서울시 송파구 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 231, //업로드 게시물 숫자
		user_follow_count: 104, //팔로우 숫자
		user_follower_count: 122, //팔로워 숫자
	},
	{
		_id: 6,
		volunteer_target_shelter: 26, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[2], dummy_userObject[3]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '충주 신천 보호소', //보호소 이름
		shelter_address: {
			city: '충주시', //시,도
			district: '신천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '충주시 신천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 231, //업로드 게시물 숫자
		user_follow_count: 551, //팔로우 숫자
		user_follower_count: 901, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 7,
		volunteer_target_shelter: 27, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[2], dummy_userObject[1]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',

		_id: 27,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍천 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '홍천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 홍천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 7,
		volunteer_target_shelter: 27, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[2], dummy_userObject[1]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',

		_id: 27,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍천 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '홍천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 홍천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
	{
		_id: 7,
		volunteer_target_shelter: 27, //봉사활동 대상 보호소
		volunteer_wish_date: ['21.11.24'], //봉사활동 희망 날짜
		volunteer_accompany: [dummy_userObject[2], dummy_userObject[1]], //봉사활동 신청자 목록
		volunteer_delegate_contact: '010-1235-2356', //봉사활동 신청 대표자 전화번호
		volunteer_status: 'done',

		_id: 27,
		user_type: 'shelter',
		user_profile_uri: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/38404/1/?bust=1498744192',
		shelter_type: 'private', //보호소 유형, 공립(public), 사립(private)로 나뉨
		shelter_name: '홍천 보호소', //보호소 이름
		shelter_address: {
			city: '강원도', //시,도
			district: '홍천군', //군,구
			neighbor: '방운면 110-20', //동,읍,면
		}, //보호소 주소
		shelter_homepage: 'http://google.com', //보호소 홈페이지 uri
		shelter_delegate_contact_number: '010-4442-1325', //보호소 대표 전화번호, 휴대폰 번호
		shelter_foundation_date: '2012.05.02', //보호소 설립일
		user_introduction: '강원도 홍천군 소재의 입양보호소', //프로필에 노출될 자기소개
		user_upload_count: 123, //업로드 게시물 숫자
		user_follow_count: 142, //팔로우 숫자
		user_follower_count: 555, //팔로워 숫자
		user_denied: false, //유저의 차단여부
	},
];

export const dummy_hashTagListObject = [
	{
		_id: 1, //해시태그의 고유 아이디
		hashtag_keyword: '반려동물',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 2, //해시태그의 고유 아이디
		hashtag_keyword: '임시보호',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 3, //해시태그의 고유 아이디
		hashtag_keyword: '고양이',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 4, //해시태그의 고유 아이디
		hashtag_keyword: '개',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 5, //해시태그의 고유 아이디
		hashtag_keyword: '말라뮤트',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 6, //해시태그의 고유 아이디
		hashtag_keyword: '입양',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 1, //해시태그의 고유 아이디
		hashtag_keyword: '반려동물',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 2, //해시태그의 고유 아이디
		hashtag_keyword: '임시보호',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 3, //해시태그의 고유 아이디
		hashtag_keyword: '고양이',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 4, //해시태그의 고유 아이디
		hashtag_keyword: '개',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 5, //해시태그의 고유 아이디
		hashtag_keyword: '말라뮤트',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
	{
		_id: 6, //해시태그의 고유 아이디
		hashtag_keyword: '입양',
		hashtag_date: '2021-11-30',
		hashtag_update_date: '2021-12-01',
		hashtag_feed_id: [1, 2, 3, 4, 5],
	},
];
