import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w522} from '../atom/btn/btn_style';
import {Paw48_APRI10, Paw62_APRI10, Paw62_Mixed, Paw62_YELL20} from '../atom/icon';
import Modal from '../modal/Modal';
import AniButton from '../molecules/AniButton';
import {login_style, btn_style, animalAdoption} from './style_templete';

export default AnimalAdoption = props => {
	const navigation = useNavigation();

	//임시보호에서 반려 동물 변경 응원 팝업창 !
	const onCheerUp = () => {
		console.log('- onCheerUp - ');
		// Modal.popNoBtn('임시보호가 아닌 반려동물로서의 새로운 삶을 살게 된 구름이를 응원합니다!');
		// setTimeout(() => {
		// 	Modal.close();
		// 	navigation.navigate('SelectAccount');
		// }, 1000);
	};

	return (
		<ScrollView>
			<View style={[login_style.wrp_main, animalAdoption.container]}>
				{/* 축하메시지 */}
				<View style={[animalAdoption.congratulatory_message]}>
					<Text style={[txt.noto30b, {color: APRI10, textAlign: 'center'}]}>축하합니다! </Text>
					<Text style={[txt.noto30b, {color: APRI10, textAlign: 'center'}]}>임시보호를 하고 있는 동물이 입양을 가게 되었나요? </Text>
				</View>
				{/* Instruction */}
				<View style={[animalAdoption.instruction]}>
					<View style={[animalAdoption.instruction_text]}>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto24b, {color: GRAY20}]}>임시보호자가 입양을 하게 된 경우</Text>
							<Text style={[txt.noto24, {textAlign: 'center'}]}>
								본 동물의 계정은 현재와 같이 계속 유지가 되고, 임시보호 아이콘이 일반 반려동물의 색으로 변하게 됩니다.
							</Text>
						</View>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto24b, {color: GRAY20}]}>입양자가 애니로그 계정이 있는 경우</Text>
							<Text style={[txt.noto24, {textAlign: 'center'}]}>
								본 동물의 계정은 유지가 되지만 더 이상의 글쓰기는 불가합니다. 임시보호 아이콘에서 입양완료 아이콘으로 변하게 되고, 프로필 메뉴에
								입양자의 계정이 뜹니다. 계정을 비공개로 돌릴 수도 있습니다.
							</Text>
						</View>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto24b, {color: GRAY20}]}>입양자가 애니로그 계정이 없는 경우</Text>
							<Text style={[txt.noto24, {textAlign: 'center'}]}>
								프로필 메뉴에 입양자의 계정이 없고, 다른 변경사항들은 '입양자가 애니로그 계정이 있는 경우'와 같습니다.
							</Text>
						</View>
					</View>
					<View style={[animalAdoption.instruction_icon]}>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_APRI10 />
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>일반 반려동물</Text>
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>아이콘</Text>
						</View>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_YELL20 />
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>임시 보호동물</Text>
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>아이콘</Text>
						</View>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_Mixed />
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>입양완료</Text>
							<Text style={[txt.noto20, animalAdoption.instruction_icon_item_text]}>아이콘</Text>
						</View>
					</View>
				</View>
				{/* 입양 */}
				<View style={[btn_style.btn_w522, animalAdoption.btn_w522]}>
					<AniButton
						btnTitle={'입양'}
						btnLayout={btn_w522}
						titleFontStyle={32}
						onPress={() => {
							Modal.popOneBtn('패치 예정입니다!', '확인', () => Modal.close());
							// Modal.popTwoBtn(
							// 	'입양 예정자가 애니로그 계정이 있나요?',
							// 	'없음',
							// 	'계정 찾기',
							// 	() => {
							// 		Modal.close();
							// 		navigation.push('PetInfoSetting', {userobject_id: props.route.params.userobject_id});
							// 	},
							// 	() => {
							// 		Modal.close();
							// 		console.log('모달창 닫힘');
							// 		navigation.push('SelectAccount', {userobject_id: props.route.params.userobject_id});
							// 	},
							// );
						}}
					/>
				</View>
				{/* 임시보호자 입양*/}
				<View style={[btn_style.btn_w522, animalAdoption.btn_w522]}>
					<AniButton
						btnTitle={'임시보호자 입양'}
						btnStyle={'border'}
						btnLayout={btn_w522}
						titleFontStyle={32}
						onPress={() => {
							Modal.popOneBtn('패치 예정입니다!', '확인', () => Modal.close());

							// Modal.popTwoBtn(
							// 	'이 동물을 가족으로 맞이하시겠어요?',
							// 	'취소',
							// 	'예',
							// 	() => Modal.close(),
							// 	() => onCheerUp,
							// );
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
};
