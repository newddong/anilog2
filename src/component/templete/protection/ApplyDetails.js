import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import {createProtectActivity} from 'Root/api/protectapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {CONFIRM_ADOPT_REQUEST, CONFIRM_FINALIZED, CONFIRM_PROTECT_REQUEST} from 'Root/i18n/msg';
import {btn_w226} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {applyDetails, btn_style, login_style, temp_style} from 'Templete/style_templete';

export default ApplyDetails = ({route, navigation}) => {
	const [data, setData] = React.useState(route.params);
	//모달창에서 최종 확인을 클릭
	const isProtect = route.name == 'ApplyProtectActivityE';

	React.useEffect(() => {
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
	}, []);

	const onFinalize = () => {
		Modal.close();
		createProtectActivity(
			{
				protect_request_object_id: data._id,
				protect_act_type: data.protect_act_type,
				protect_act_companion_history: data.protect_act_companion_history,
				protect_act_address: data.protect_act_address,
				protect_act_phone_number: data.protect_act_phone_number,
				protect_act_checklist: data.protect_act_checklist,
				protect_act_motivation: data.protect_act_motivation,
			},
			result => {
				// console.log('result / createProtectActivity / ApplyDetails  : ', result);
				// navigation.reset({index: 0, routes: [{name: 'UserProfile', params: data.protect_request_writer_id}]});
				// navigation.reset({routes: [{name: 'UserProfile', params: data.protect_request_writer_id}]});
				const user_type = userGlobalObject.userInfo.user_type;
				navigation.reset({
					index: 0,
					routes: [{name: 'MainTab', params: user_type}],
				});
			},
			err => {
				console.log('err / createProtectActivity / ApplyDetails  : ', err);
			},
		);
	};

	//등록버튼 클릭
	const onPressRegister = () => {
		const isProtectRoute = route.name == 'ApplyProtectActivityE'; //임시보호 루트로 왔는지 여부 확인 - 아닐 경우 입양 루트
		Modal.popTwoBtn(isProtectRoute ? CONFIRM_PROTECT_REQUEST : CONFIRM_ADOPT_REQUEST, '취소', '확인', () => Modal.close(), onFinalize);
	};

	return (
		<View style={[login_style.wrp_main, applyDetails.container]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={[temp_style.animalProtectDetails, applyDetails.animalProtectDetails]}>
					<AnimalProtectDetail data={data} />
				</View>
				<View style={[applyDetails.btnContainer]}>
					<View style={[btn_style.btn_w226, applyDetails.btn_w226]}>
						<AniButton btnStyle={'border'} btnLayout={btn_w226} btnTitle={'뒤로'} onPress={() => navigation.goBack()} />
					</View>
					<View style={[btn_style.btn_w226, applyDetails.btn_w226]}>
						{/* ApplyProtectActivityE 혹은 ApplyAnimalAdoptionE ==> 입양이나 임시보호 신청의 마지막 단계이므로 '신청'버튼이 필요 */}
						{/* ApplyAdoptionDetails 혹은 ApplyTempProtectDetails ==> 유저가 신청한 입양이나 임시보호의 Detail을 보기만하는 것이므로 '신청'버튼 불필요 */}
						{route.name == 'ApplyAdoptionDetails' || route.name == 'ApplyTempProtectDetails' ? null : (
							<AniButton btnLayout={btn_w226} btnTitle={'신청하기'} onPress={onPressRegister} />
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
