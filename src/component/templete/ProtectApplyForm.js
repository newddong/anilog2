import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getProtectRequestByProtectRequestId, setProtectActivityStatus, setProtectRequestStatus} from 'Root/api/protectapi';
import {assignPet} from 'Root/api/userapi';
import {PROTECT_ACT_ADOPT_CONFIRM, PROTECT_ACT_PROTECT_CONFIRM} from 'Root/i18n/msg';
import {btn_w226} from 'Atom/btn/btn_style';
import Modal from '../modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import AnimalProtectDetail from 'Organism/AnimalProtectDetail';
import {login_style, btn_style, protectApplyForm} from './style_templete';

export default ProtectApplyForm = ({route, navigation}) => {
	// console.log('ProtectApplyForm props', route.params);
	const [data, setData] = React.useState(route.params);
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	// console.log('status', data.protect_act_type);

	React.useEffect(() => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: data.protect_act_request_article_id,
			},
			result => {
				// console.log('result / getProtectRequestByProtectRequestId / ProtectApplyForm ', result.msg);
				const addedData = {...data};
				addedData.protect_animal_species = result.msg.protect_animal_species;
				addedData.protect_animal_species_detail = result.msg.protect_animal_species_detail;
				addedData.protect_animal_rescue_location = result.msg.protect_animal_id.protect_animal_rescue_location;
				addedData.protect_request_date = result.msg.protect_request_date;
				addedData.protect_request_photos_uri = result.msg.protect_request_photos_uri;
				// const merged = Object.assign(data, result.msg);
				setData(addedData);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			},
			err => {
				console.log('err / getProtectRequestByProtectRequestId / ProtectApplyForm  ', err);
			},
		);
	}, []);

	const onPressConfirm = () => {
		// console.log('data', data);
		// 보호요청게시글의 상태뿐만 아니라 입양 및 보호신청 상태도 Accept로 바꾸어야한다
		Modal.popTwoBtn(
			data.protect_act_type == 'adopt' ? PROTECT_ACT_ADOPT_CONFIRM : PROTECT_ACT_PROTECT_CONFIRM,
			'취소',
			'확인',
			() => Modal.close,
			() => {
				//입양 및 임시보호 확정 => 신청서, 보호요청게시글, 보호동물의 상태, 유저의 반려동물
				// 위 네가지의 상태가 바뀌어야 함 (현재 보호동물의 상태 API는 미제작)
				console.log('data.protect_act_type', data.protect_act_type);
				setProtectActivityStatus(
					{
						protect_act_object_id: data._id,
						protect_act_status: 'accept',
					},
					result => {
						// console.log('result / setProtectActivityStatus / ProtectApplyForm  : ', result.msg);
					},
					err => {
						console.log('err / setProtectActivityStatus / ProtectApplyForm  : ', err);
					},
				);
				setProtectRequestStatus(
					{
						protect_request_object_id: data.protect_act_request_article_id,
						//임시보호 신청일 경우 입양완료로 출력되어서는 안됨
						protect_request_status: data.protect_act_type == 'protect' ? 'protect' : 'complete',
					},
					result => {
						// console.log('result / setProtectRequestStatus / ProtectApplyForm  : ', result.msg);
					},
					err => {
						console.log('err / SetProtectRequestStatus / ProtectApplyForm  :', err);
					},
				);
				assignPet(
					{
						userobject_id: data.protect_act_applicant_id,
						pet_is_temp_protection: data.protect_act_type == 'protet' ? true : false,
						pet_neutralization: data.protect_animal_data.protect_animal_neutralization,
						pet_sex: data.protect_animal_data.protect_animal_sex,
						pet_species: data.protect_animal_species,
						pet_species_detail: data.protect_animal_species_detail,
						pet_status: data.protect_act_type == 'protect' ? 'protect' : 'adopt',
						pet_weight: data.protect_animal_data.protect_animal_weight,
						user_nickname: data.protect_animal_species,
					},
					result => {
						console.log('result / AssignPet / ProtectApplyForm : ', result.msg);
						navigation.reset({
							index: 0,
							routes: [{name: 'ShelterMenu'}],
						});
					},
					err => {
						console.log('err / AssignPet / ProtectApplyForm ', err);
					},
				);
				Modal.close();
			},
		);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	}
	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[protectApplyForm.detailContainerm, {flex: 1}]}>
				<AnimalProtectDetail data={data} nav={route.name} />
			</View>
			<View style={[protectApplyForm.confirmButton]}>
				<AniButton onPress={onPressConfirm} btnTitle={data.protect_act_type == 'adopt' ? '입양 확정' : '임시보호 확정'} btnLayout={btn_w226} />
			</View>
		</View>
	);
};
