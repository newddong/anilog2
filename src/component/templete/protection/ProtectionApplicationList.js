import React from 'react';
import {ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {getAnimalListWithApplicant} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {Star50_Border} from 'Root/component/atom/icon';
import {getUserInfoById} from 'Root/api/userapi';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectionAplicationList]
export default ProtectionApplicationList = ({route, navigation}) => {
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [adoptionList, setAdoptionList] = React.useState([]);
	const [protectList, setProtectList] = React.useState([]);

	React.useEffect(() => {
		getAnimalListWithApplicant(
			{},
			result => {
				// console.log('result / getAnimalListWithApplicant / ProtectApplyList', JSON.stringify(result.msg.adopt));
				const filtered_adopt = result.msg.adopt.filter(e => e.protect_act_status != 'accept');
				const filtered_protect = result.msg.protect.filter(e => e.protect_act_status != 'accept');
				setAdoptionList(filtered_adopt);
				setProtectList(filtered_protect);
				setTimeout(() => {
					setLoading(false);
				}, 500);
			},
			err => {
				console.log('err / getAnimalListWithApplicant', err);
				setTimeout(() => {
					setLoading(false);
				}, 500);
			},
		);
	}, []);

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 목록이 없습니다.</Text>
			</View>
		);
	};

	const onClickAdoptionItem = i => {
		navigation.push('ProtectApplyForm', {data: adoptionList[i], route: route.name});
	};

	const onClickProtectItem = i => {
		navigation.push('ProtectApplyForm', {data: protectList[i], route: route.name});
	};

	const listItem = (v, i, isAdopt) => {
		return (
			<View style={[style.listItem]} key={i}>
				<UserDescriptionLabel
					data={v.protect_act_applicant_id}
					width={360}
					onClickLabel={() => (isAdopt ? onClickAdoptionItem(i) : onClickProtectItem(i))}
				/>
				<Star50_Border />
			</View>
		);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	} else {
		return (
			<View style={[style.container]}>
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>입양 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{adoptionList.length}</Text>
					</View>
					<View style={[style.list]}>
						{adoptionList.length == 0
							? whenEmpty()
							: adoptionList.map((v, i) => {
									return listItem(v, i, true);
							  })}
					</View>
				</View>
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>임시 보호 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{protectList.length}</Text>
					</View>
					<View style={[style.list]}>
						{protectList.length == 0
							? whenEmpty()
							: protectList.map((v, i) => {
									return listItem(v, i, false);
							  })}
					</View>
				</View>
			</View>
		);
	}
};
// 61c1cc107be07611b00945f9

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		// backgroundColor: 'red',
		flex: 1,
	},
	listContainer: {
		marginTop: 40 * DP,
	},
	listTitle: {
		alignSelf: 'flex-start',
	},
	list: {
		width: 654 * DP,
		marginTop: 40 * DP,
		// backgroundColor: 'lightblue',
	},
	listItem: {
		marginBottom: 30 * DP,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'pink',
	},
});

const q = {
	adopt: [
		{
			protect_act_address: {
				brief: '경기 남양주시 덕소로 33-45',
				detail: '331',
			},
			protect_act_checklist: {
				is_adult: false,
				is_near_veterinary: false,
				is_agreed_housemate: false,
				is_experience_defecate: false,
				is_knowledge_sanitation: false,
			},
			_id: '621c54d71e2fe3271dfc0aa7',
			protect_act_type: 'adopt',
			protect_act_phone_number: '0100334412',
			protect_act_companion_history: [],
			protect_act_motivation: null,
			protect_act_applicant_id: {
				user_agreement: {
					is_over_fourteen: true,
				},
			},
			protect_act_request_article_id: '620bb4bde9c46a5c3f40bddb',
			protect_act_status: 'wait',
			protect_act_request_shelter_id: '6203aff5c0f179ccd5bb8054',
			protect_act_protect_animal_id: '620bb39fe9c46a5c3f40bdd8',
			__v: 0,
		},
		{
			protect_act_address: {
				brief: '경기 성남시 수정구 분당내곡로 301',
				detail: '오스',
			},
			protect_act_checklist: {
				is_adult: false,
				is_near_veterinary: false,
				is_agreed_housemate: false,
				is_experience_defecate: true,
				is_knowledge_sanitation: false,
			},
			_id: '621c41091e2fe3271dfc0841',
			protect_act_type: 'adopt',
			protect_act_phone_number: '01096450422',
			protect_act_companion_history: [],
			protect_act_motivation: null,
			protect_act_applicant_id: {
				user_agreement: {
					is_over_fourteen: true,
					is_service: true,
					is_personal_info: true,
					is_location_service_info: true,
					is_donation_info: true,
					is_marketting_info: true,
				},
				user_address: {
					city: '서울특별시',
					district: '마포구',
					neighbor: '신수동',
				},
				_id: '61d2de63c0f179ccd5ba5887',
				type: 'UserObject',
				user_type: 'user',
				user_name: '권상우',
				user_nickname: '권상우입',
				user_phone_number: '01096450422',
				user_mobile_company: 'SK텔레콤',
				user_is_verified_phone_number: true,
				user_is_verified_email: false,
				user_password: 'tkddn123',
				user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
				user_introduction: '아이에\n그라긋\nDd1',
				user_upload_count: 22,
				user_follow_count: 17,
				user_follower_count: 4,
				user_denied: false,
				user_my_pets: ['61d2de8ac0f179ccd5ba58a6', '61d2ff57c0f179ccd5ba6e72', '61e0f9c0c0f179ccd5bb06c3', '6200fa6fc0f179ccd5bb69be'],
				pet_family: [],
				user_interests: [],
				user_register_date: '2022-01-03T11:30:43.310Z',
				__v: 4,
			},
			protect_act_request_article_id: '620bb622e9c46a5c3f40bde7',
			protect_act_status: 'wait',
			protect_act_request_shelter_id: '6203aff5c0f179ccd5bb8054',
			protect_act_protect_animal_id: '620a4543c0f179ccd5bbb9e1',
			__v: 0,
		},
	],
	protect: [
		{
			protect_act_address: {
				brief: '서울 중랑구 구리포천고속도로 3',
				detail: '331',
			},
			protect_act_checklist: {
				is_adult: false,
				is_near_veterinary: false,
				is_agreed_housemate: false,
				is_experience_defecate: false,
				is_knowledge_sanitation: false,
			},
			_id: '621c54f61e2fe3271dfc0ada',
			protect_act_type: 'protect',
			protect_act_phone_number: '01099664312',
			protect_act_companion_history: [],
			protect_act_motivation: null,
			protect_act_applicant_id: {
				user_agreement: {
					is_over_fourteen: true,
					is_service: true,
					is_personal_info: true,
					is_location_service_info: true,
					is_donation_info: true,
					is_marketting_info: true,
				},
				user_address: {
					city: '서울특별시',
					district: '마포구',
					neighbor: '신수동',
				},
				_id: '61d2de63c0f179ccd5ba5887',
				type: 'UserObject',
				user_type: 'user',
				user_name: '권상우',
				user_nickname: '권상우입',
				user_phone_number: '01096450422',
				user_mobile_company: 'SK텔레콤',
				user_is_verified_phone_number: true,
				user_is_verified_email: false,
				user_password: 'tkddn123',
				user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
				user_introduction: '아이에\n그라긋\nDd1',
				user_upload_count: 22,
				user_follow_count: 17,
				user_follower_count: 4,
				user_denied: false,
				user_my_pets: ['61d2de8ac0f179ccd5ba58a6', '61d2ff57c0f179ccd5ba6e72', '61e0f9c0c0f179ccd5bb06c3', '6200fa6fc0f179ccd5bb69be'],
				pet_family: [],
				user_interests: [],
				user_register_date: '2022-01-03T11:30:43.310Z',
				__v: 4,
			},
			protect_act_request_article_id: '620bb4bde9c46a5c3f40bddb',
			protect_act_status: 'wait',
			protect_act_request_shelter_id: '6203aff5c0f179ccd5bb8054',
			protect_act_protect_animal_id: '620bb39fe9c46a5c3f40bdd8',
			__v: 0,
		},
		{
			protect_act_address: {
				brief: '서울 서대문구 경기대로9길 92',
				detail: '221\n221',
			},
			protect_act_checklist: {
				is_adult: false,
				is_near_veterinary: false,
				is_agreed_housemate: false,
				is_experience_defecate: false,
				is_knowledge_sanitation: false,
			},
			_id: '621c4b2c1e2fe3271dfc09a2',
			protect_act_type: 'protect',
			protect_act_phone_number: '01099942122',
			protect_act_companion_history: [],
			protect_act_motivation: null,
			protect_act_applicant_id: {
				user_agreement: {
					is_over_fourteen: true,
					is_service: true,
					is_personal_info: true,
					is_location_service_info: true,
					is_donation_info: true,
					is_marketting_info: true,
				},
				user_address: {
					city: '서울특별시',
					district: '마포구',
					neighbor: '신수동',
				},
				_id: '61d2de63c0f179ccd5ba5887',
				type: 'UserObject',
				user_type: 'user',
				user_name: '권상우',
				user_nickname: '권상우입',
				user_phone_number: '01096450422',
				user_mobile_company: 'SK텔레콤',
				user_is_verified_phone_number: true,
				user_is_verified_email: false,
				user_password: 'tkddn123',
				user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
				user_introduction: '아이에\n그라긋\nDd1',
				user_upload_count: 22,
				user_follow_count: 17,
				user_follower_count: 4,
				user_denied: false,
				user_my_pets: ['61d2de8ac0f179ccd5ba58a6', '61d2ff57c0f179ccd5ba6e72', '61e0f9c0c0f179ccd5bb06c3', '6200fa6fc0f179ccd5bb69be'],
				pet_family: [],
				user_interests: [],
				user_register_date: '2022-01-03T11:30:43.310Z',
				__v: 4,
			},
			protect_act_request_article_id: '620bb622e9c46a5c3f40bde7',
			protect_act_status: 'wait',
			protect_act_request_shelter_id: '6203aff5c0f179ccd5bb8054',
			protect_act_protect_animal_id: '620a4543c0f179ccd5bbb9e1',
			__v: 0,
		},
	],
};
