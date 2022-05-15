import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import {createProtectActivity} from 'Root/api/protectapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {CONFIRM_ADOPT_REQUEST, CONFIRM_PROTECT_REQUEST} from 'Root/i18n/msg';
import {btn_w226} from 'Atom/btn/btn_style';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {applyDetails, login_style, temp_style} from 'Templete/style_templete';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {lo} from '../style_address';

export default ApplyDetails = ({route, navigation}) => {
	const data = route.params;
	// console.log('apply details', data);
	//모달창에서 최종 확인을 클릭
	const isProtect = route.name == 'ApplyProtectActivityE' || route.name == 'ApplyTempProtectDetails';

	React.useEffect(() => {
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
		if (data.protect_act_type == 'protect') {
			navigation.setOptions({title: '임시보호 신청 내역'});
		} else {
			navigation.setOptions({title: '입양 신청 내역'});
		}
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
	const onClickLabel = () => {
		console.log('proptec');
		if (data.protect_act_type == 'protect') {
			//임시보호 세부 페이지로 이동
			// navigation.setOptions({title: '임시보호 신청 내역'});
			console.log('임시호보');
		} else {
			//입양 신청 세부 페이지로 이동
			// navigation.setOptions({title: '입양 신청 내역'});
			console.log('입양');
		}
	};

	return (
		<View style={[login_style.wrp_main, applyDetails.container]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={[temp_style.animalProtectDetails, applyDetails.animalProtectDetails]}>
					<AnimalProtectDetail data={data} />
				</View>
				<View style={[applyDetails.btnContainer]}>
					{/* 입양 임보 신청건에 한해서만 버튼출력 */}
					{route.name == 'ApplyAdoptionDetails' || route.name == 'ApplyTempProtectDetails' ? (
						<></>
					) : (
						<>
							<AniButton btnStyle={'border'} btnLayout={btn_w226} btnTitle={'뒤로'} onPress={() => navigation.goBack()} />
							<AniButton btnLayout={btn_w226} btnTitle={'신청하기'} onPress={onPressRegister} />
						</>
					)}
				</View>
			</ScrollView>
		</View>
	);
};
