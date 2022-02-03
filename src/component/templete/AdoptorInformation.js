import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getApplyDetailById} from 'Root/api/protectapi';
import {getProtectAnimalByProtectAnimalId} from 'Root/api/shelterapi';
import {getUserInfoById} from 'Root/api/userapi';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {login_style, btn_style, temp_style, baseInfo_style} from './style_templete';

// ShelterMenu - 나의 보호소 출신동물 - 입양처 보기
// 연관 테이블 - PRotectionActivityApplicantObject , ProtectRequestObject, ShelterProtectAnimalObject
export default AdoptorInformation = ({route, navigation}) => {
	// console.log('AdoptorInformation request', route.params);

	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [data, setData] = React.useState(route.params);

	React.useEffect(() => {
		// console.log('data', data);
		// delete data._id;
		const protect_animal_object = data.protect_animal_id;
		let merged = Object.assign(data, protect_animal_object);
		// console.log('e', e.protect_animal_id);
		// delete merged.protect_animal_id;
		//현재 동물보호신청(protectActivityApplicationObject)필드가 없는 상태 (protect_act_applicant가 최신화되어 있지 않기 때문)
		//getProtectAnimalByProtectAnimalId를 통해 실시간 입양신청 ID 받기
		//Id로 신청정보 상세 조회 총
		//차후 깔끔하게 처리 필요
		getProtectAnimalByProtectAnimalId(
			{
				shelter_protect_animal_object_id: protect_animal_object._id,
			},
			result => {
				// console.log('result / getProtectAnimalByProtectAnimalId  / AdoptorInformation  : ', result.msg.protect_act_applicants);
				// 로그 결과  : ["61c34aed17f59a595cc4219a", "61c34be517f59a595cc421a0", "61c34f5a17f59a595cc42211", "61c487b567b952173d67d9c8"]
				getApplyDetailById(
					{
						protect_act_object_id: result.msg.protect_act_applicants[0], //[0]번이면 안될텐데?
					},
					result => {
						console.log('result / getApplyDetailById / AdoptorInfor :', result.msg.protect_act_applicant_id);
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
								}, 1500);
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
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView style={{flex: 1}}>
					<View style={[temp_style.animalProtectDetails_adoptorInformation, baseInfo_style.list]}>
						<AnimalProtectDetail data={data} onClickLabel={onClickAdoptor} nav={route.name} />
					</View>
				</ScrollView>
			</View>
		);
	}
};
// 61c7104c10b3b3bf4acbd20b
