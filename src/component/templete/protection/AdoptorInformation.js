import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getApplyDetailById} from 'Root/api/protectapi';
import {getProtectAnimalByProtectAnimalId} from 'Root/api/shelterapi';
import {getUserInfoById} from 'Root/api/userapi';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {login_style, btn_style, temp_style, baseInfo_style} from 'Templete/style_templete';

// ShelterMenu - 나의 보호소 출신동물 - 입양처 보기
// 연관 테이블 - PRotectionActivityApplicantObject , ProtectRequestObject, ShelterProtectAnimalObject
export default AdoptorInformation = ({route, navigation}) => {
	// console.log('AdoptorInformation request', route.params);

	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [data, setData] = React.useState(route.params);
	// console.log('route.params', route.params);
	const ee = {
		__v: 0,
		_id: '621f1a48da78318caa3fff7d',
		protect_animal_id: {
			__v: 0,
			_id: '621f1a3ada78318caa3fff7a',
			protect_act_applicants: [],
			protect_animal_belonged_shelter_id: '621f10b7da78318caa3ffd86',
			protect_animal_estimate_age: '1개월',
			protect_animal_neutralization: 'unknown',
			protect_animal_photo_uri_list: [
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646205497920_CA0D8C28-4965-4118-A232-EE695F2644F3.jpg',
			],
			protect_animal_protect_request_id: '621f1a48da78318caa3fff7d',
			protect_animal_protector_discussion_id: [],
			protect_animal_rescue_date: '2022-02-01T00:00:00.000Z',
			protect_animal_rescue_location: 'Dhdd',
			protect_animal_sex: 'male',
			protect_animal_species: '개',
			protect_animal_species_detail: '아프간 하운드',
			protect_animal_status: 'rescue',
			protect_animal_weight: null,
		},
		protect_animal_species: '개',
		protect_animal_species_detail: '아프간 하운드',
		protect_request_comment_count: 0,
		protect_request_content: '입양 확정 확인',
		protect_request_date: '2022-03-02T07:18:32.999Z',
		protect_request_favorite_count: 0,
		protect_request_hit: 0,
		protect_request_photos_uri: ['https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646205497920_CA0D8C28-4965-4118-A232-EE695F2644F3.jpg'],
		protect_request_status: 'complete',
		protect_request_title: 'Dkvㅡ칸',
		protect_request_update_date: '2022-03-02T07:18:32.999Z',
		protect_request_writer_id: {
			__v: 0,
			_id: '621f10b7da78318caa3ffd86',
			pet_family: [],
			shelter_address: {brief: '인천 부평구 갈산로 2', detail: '2315'},
			shelter_delegate_contact_number: '01096450422',
			shelter_foundation_date: '2022-01-02T00:00:00.000Z',
			shelter_homepage: 'Ssd1',
			shelter_name: '희망보호소',
			shelter_type: 'private',
			type: 'UserObject',
			user_agreement: {
				is_donation_info: false,
				is_location_service_info: false,
				is_marketting_info: false,
				is_over_fourteen: false,
				is_personal_info: false,
				is_service: false,
			},
			user_denied: false,
			user_email: 'Dsd@kakao.com',
			user_follow_count: 0,
			user_follower_count: 0,
			user_interests: [],
			user_introduction: '',
			user_is_verified_email: false,
			user_is_verified_phone_number: false,
			user_my_pets: [],
			user_name: '희망보호소',
			user_nickname: '희망보호소',
			user_password: 'tkddn123',
			user_phone_number: '01096450002',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646203063111_51E8EE62-FB0E-439D-8F90-EB4606F3C1FD.jpg',
			user_register_date: '2022-03-02T06:37:43.238Z',
			user_type: 'shelter',
			user_upload_count: 3,
		},
	};
	React.useEffect(() => {
		// console.log('data', data);
		const protect_animal_object = data.protect_animal_id;
		let merged = Object.assign(data, protect_animal_object);
		//현재 동물보호신청(protectActivityApplicationObject)필드가 없는 상태 (protect_act_applicant가 최신화되어 있지 않기 때문)
		//getProtectAnimalByProtectAnimalId를 통해 실시간 입양신청 ID 받기
		//Id로 신청정보 상세 조회
		//차후 깔끔하게 처리 필요
		getProtectAnimalByProtectAnimalId(
			{
				shelter_protect_animal_object_id: protect_animal_object._id,
			},
			result => {
				// console.log('result / getProtectAnimalByProtectAnimalId  / AdoptorInformation  : ', result.msg.protect_act_applicants);
				const e = {
					__v: 2,
					_id: '621f1a3ada78318caa3fff7a',
					protect_act_applicants: ['621f1ab6da78318caa3fffb0', '621f1affda78318caa3fffed'],
					protect_animal_belonged_shelter_id: '621f10b7da78318caa3ffd86',
					protect_animal_estimate_age: '1개월',
					protect_animal_neutralization: 'unknown',
					protect_animal_photo_uri_list: [
						'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646205497920_CA0D8C28-4965-4118-A232-EE695F2644F3.jpg',
					],
					protect_animal_protect_request_id: '621f1a48da78318caa3fff7d',
					protect_animal_protector_discussion_id: [],
					protect_animal_rescue_date: '2022-02-01T00:00:00.000Z',
					protect_animal_rescue_location: 'Dhdd',
					protect_animal_sex: 'male',
					protect_animal_species: '개',
					protect_animal_species_detail: '아프간 하운드',
					protect_animal_status: 'adopt',
					protect_animal_weight: null,
				};
				// 				1. 이전 템플릿(AnimalFromShelter)에서 보내주는 파라미터의 ProtectRequestObject 의
				// 보호동물 _id를 토대로 getProtectAnimalByProtectAnimalId(보호동물 상세정보 조회) API 접속
				// 2. 보호동물 오브젝트에서 해당 동물에 대한 입양 및 임보 신청 건이 배열 형태로 옴
				// protect_act_applicants : ["61c34aed17f59a595cc4219a", "61c34be517f59a595cc421a0"]
				// 3. 각 입양 임보 신청건 들 중 protect_act_status=='accept'인 건이 실제로 입양이 수락된 ProtectionActivityApplicantObject임.
				// 4. 하지만 id 배열형태로 오고 있는 상황이므로 다시 getApplyDetailById(입양 임보 신청 조회) API 접속
				// 로그 결과  : ["61c34aed17f59a595cc4219a", "61c34be517f59a595cc421a0", "61c34f5a17f59a595cc42211", "61c487b567b952173d67d9c8"]
				getApplyDetailById(
					{
						protect_act_object_id: result.msg.protect_act_applicants[1], //[0]번이면 안될텐데?
					},
					result => {
						console.log('result / getApplyDetailById / AdoptorInfor :', result.msg);
						const r = {
							__v: 0,
							_id: '621f1ab6da78318caa3fffb0',
							protect_act_address: {brief: '서울 동작구 노량진로 2'},
							protect_act_applicant_id: '621cc0bfd8ae3cf854a5bb6a',
							protect_act_checklist: {
								is_adult: false,
								is_agreed_housemate: false,
								is_experience_defecate: false,
								is_knowledge_sanitation: false,
								is_near_veterinary: false,
							},
							protect_act_companion_history: [],
							protect_act_motivation: null,
							protect_act_phone_number: '01685557441',
							protect_act_protect_animal_id: '621f1a3ada78318caa3fff7a',
							protect_act_request_article_id: '621f1a48da78318caa3fff7d',
							protect_act_request_shelter_id: '621f10b7da78318caa3ffd86',
							protect_act_status: 'accept',
							protect_act_type: 'adopt',
						};

						const e = {
							__v: 0,
							_id: '621f1affda78318caa3fffed',
							protect_act_address: {brief: '서울 강동구 강동대로 지하 303'},
							protect_act_applicant_id: '621cc0bfd8ae3cf854a5bb6a',
							protect_act_checklist: {
								is_adult: false,
								is_agreed_housemate: false,
								is_experience_defecate: false,
								is_knowledge_sanitation: false,
								is_near_veterinary: false,
							},
							protect_act_companion_history: [],
							protect_act_motivation: null,
							protect_act_phone_number: '0109998444',
							protect_act_protect_animal_id: '621f1a3ada78318caa3fff7a',
							protect_act_request_article_id: '621f1a48da78318caa3fff7d',
							protect_act_request_shelter_id: '621f10b7da78318caa3ffd86',
							protect_act_status: 'done',
							protect_act_type: 'protect',
						};

						merged.protect_act_address = result.msg.protect_act_address;
						merged.protect_act_checklist = result.msg.protect_act_checklist;
						merged.protect_act_companion_history = result.msg.protect_act_companion_history;
						merged.protect_act_motivation = result.msg.protect_act_motivation;
						merged.protect_act_phone_number = result.msg.protect_act_phone_number;
						merged.protect_act_motivation = result.msg.protect_act_motivation;
						merged.protect_act_status = result.msg.protect_act_status;
						merged.protect_act_type = result.msg.protect_act_type;
						getUserInfoById(
							{
								userobject_id: result.msg.protect_act_applicant_id,
							},
							result => {
								// console.log('result / getUserInfoById / AdoptorInformation  :', result.msg);
								merged.adoptorObject = result.msg;
								setData(merged);
								setTimeout(() => {
									setLoading(false);
								}, 500);
							},
							err => {
								console.log('err / getUserInfoById / AdoptorInformation  ', err);
							},
						);
						// console.log('merge', merged);
					},
					err => {
						console.log('err /getApplyDetailById / AdoptorInfor : ', err);
					},
				);
			},
			err => {
				console.log('err / getProtectAnimalByProtectAnimalId  / AdoptorInformation  :  ', err);
			},
		);
	}, []);

	const onClickAdoptor = data => {
		// console.log('data', data);
		navigation.push('UserProfile', {userobject: data});
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {}]}>
				{/* <ScrollView style={{flex: 1}}> */}
				<View style={[temp_style.animalProtectDetails_adoptorInformation, baseInfo_style.list]}>
					<AnimalProtectDetail data={data} onClickLabel={onClickAdoptor} nav={route.name} />
				</View>
				{/* </ScrollView> */}
			</View>
		);
	}
};
// 61c7104c10b3b3bf4acbd20b
