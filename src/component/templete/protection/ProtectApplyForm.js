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

export default ProtectApplyForm = ({route, navigation}) => {
	// console.log('ProtectApplyForm props', route.params);
	const [data, setData] = React.useState(route.params);
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	React.useEffect(() => {
		// console.log('data.protect_act_request_article_id', route.params.data.protect_act_request_article_id);
		if (route.params?.route == 'ProtectionApplicationList') {
			// console.log('route.params.data.protect_act_request_article_id', route.params.data.protect_act_request_article_id);
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
					setTimeout(() => {
						setLoading(false);
					}, 500);
				},
				err => {
					console.log('err / getProtectRequestByProtectRequestId / ProtectApplyForm /ProtectionApplicationList ', err);
				},
			);
		} else {
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
					// console.log('addred', addedData);
					setData(addedData);
					setTimeout(() => {
						setLoading(false);
					}, 500);
				},
				err => {
					console.log('err / getProtectRequestByProtectRequestId / ProtectApplyForm  ', err);
				},
			);
		}
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
				setShelterProtectAnimalStatus(
					{
						shelter_protect_animal_object_id: data.protect_animal_id._id,
						protect_animal_status: data.protect_act_status == 'adopt' ? 'adopt' : 'protect',
					},
					result => {
						console.log('result / setShelterProtectAnimalStatus / ProtectApplyForm : ', result.msg);
						navigation.goBack();
					},
					err => {
						console.log('err / setShelterProtectAnimalStatus / PRotectApplyForm : ', err);
					},
				);
				Modal.close();
			},
		);
	};
	console.log('protect_act_type', data.protect_act_type);

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
