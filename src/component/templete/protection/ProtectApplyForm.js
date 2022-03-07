import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getProtectRequestByProtectRequestId, setProtectActivityStatus, setProtectRequestStatus} from 'Root/api/protectapi';
import {assignPet} from 'Root/api/userapi';
import {PROTECT_ACT_ADOPT_CONFIRM, PROTECT_ACT_PROTECT_CONFIRM} from 'Root/i18n/msg';
import {btn_w226, btn_w654} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {login_style, btn_style, protectApplyForm} from 'Templete/style_templete';
import {setShelterProtectAnimalStatus} from 'Root/api/shelterapi';

//ShelterMenu -> 신청서조회 -> 신청서 클릭 -> 입양 확정 및 임시보호 확정
export default ProtectApplyForm = ({route, navigation}) => {
	console.log('ProtectApplyForm props', route.params.data.protect_act_applicant_id._id);

	const [data, setData] = React.useState('false');

	React.useEffect(() => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.data.protect_act_request_article_id,
			},
			result => {
				// console.log('result / getProtectRequestByProtectRequestId / ProtectApplyForm ', result.msg);
				const addedData = {...route.params.data};
				addedData.protect_animal_species = result.msg.protect_animal_species;
				addedData.protect_animal_species_detail = result.msg.protect_animal_species_detail;
				addedData.protect_animal_rescue_location = result.msg.protect_animal_id.protect_animal_rescue_location;
				addedData.protect_request_date = result.msg.protect_request_date;
				addedData.protect_request_photos_uri = result.msg.protect_request_photos_uri;
				addedData.protect_animal_id = result.msg.protect_animal_id;
				addedData.shelter_name = result.msg.protect_request_writer_id.user_nickname;
				setData(addedData);
			},
			err => {
				console.log('err / getProtectRequestByProtectRequestId / ProtectApplyForm /ProtectionApplicationList ', err);
				Modal.popOneBtn(err, '뒤로가기', () => navigation.goBack());
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
			() => Modal.close(),
			() => {
				//입양 및 임시보호 확정 => 신청서, 보호요청게시글, 보호동물의 상태, 유저의 반려동물
				// 위 네가지의 상태가 바뀌어야 함 (현재 보호동물의 상태 API는 미제작)
				setProtectActivityStatus(
					{
						protect_act_object_id: data._id,
						protect_act_status: 'accept',
					},
					result => {
						console.log('result / setProtectActivityStatus / ProtectApplyForm  : ', result.msg);
					},
					err => {
						console.log('err / setProtectActivityStatus / ProtectApplyForm  : ', err);
					},
				);
				//보호 요청 게시글의 상태를 변경
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
				//보호 동물의 상태를 변경
				if (data.protect_act_type == 'adopt') {
					setShelterProtectAnimalStatus(
						{
							shelter_protect_animal_object_id: data.protect_animal_id._id,
							protect_animal_status: 'adopt',
							protect_animal_adoptor_id: route.params.data.protect_act_applicant_id._id,
							// protect_animal_status: data.protect_act_type == 'adopt' ? 'adopt' : 'protect',
							// protect_animal_ddd
							// ---1. 여기서 입양자 임시보호자 아이디 넣어주고
							// 2. getAnimalListNotRegisteredWithCompanion으로 아직 등록안될 동물이 있는 경우
							// 3. 받아온 데이터로 모달 구성하고 AssignPet 실시함
							// 4. AssignPet 등록 시 protect_act_protect_animal_id / protect_animal_status
							//    두가지를 반드시 넣어줘야함
						},
						result => {
							// console.log('result / setShelterProtectAnimalStatus / ProtectApplyForm : ', result.msg);
							navigation.navigate('ShelterMenu');
						},
						err => {
							console.log('err / setShelterProtectAnimalStatus / PRotectApplyForm : ', err);
						},
					);
				} else {
					setShelterProtectAnimalStatus(
						{
							shelter_protect_animal_object_id: data.protect_animal_id._id,
							protect_animal_status: 'protect',
							protect_animal_protector_id: route.params.data.protect_act_applicant_id._id,
						},
						result => {
							console.log('result / setShelterProtectAnimalStatus / ProtectApplyForm : ', result.msg);
							navigation.navigate('ShelterMenu');
						},
						err => {
							console.log('err / setShelterProtectAnimalStatus / PRotectApplyForm : ', err);
						},
					);
				}

				Modal.close();
			},
		);
	};
	if (data == 'false') {
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
				<AniButton
					onPress={onPressConfirm}
					btnStyle={'border'}
					titleFontStyle={32}
					btnTitle={data.protect_act_type == 'adopt' ? '입양 확정' : '임시 보호 확정'}
					btnLayout={btn_w654}
				/>
			</View>
		</View>
	);
};
