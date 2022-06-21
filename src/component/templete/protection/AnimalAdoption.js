import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {APRI10, GRAY20, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w522, btn_w694_r30} from 'Atom/btn/btn_style';
import {Paw48_APRI10, Paw62_APRI10, Paw62_Mixed, Paw62_YELL20} from 'Atom/icon';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import {login_style, btn_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
import {setPetStatus} from 'Root/api/userapi';
import DP from 'Root/config/dp';

//UserMenu -> PetInfoSetting -> 보호동물 상태 변경
export default AnimalAdoption = props => {
	const navigation = useNavigation();
	// console.log('props.route.params', props.route.params);
	//입양 - 애니로그 계정 유무에 따른 버튼 분기
	const onPressAdoption = () => {
		Modal.popTwoBtn(
			'입양 예정자가 애니로그 계정이 있나요?',
			'아니요',
			'예',
			() => {
				//없어요 클릭 시 그냥 입양완료로 바꾸고 끝
				setPetStatus(
					{
						userobject_id: props.route.params._id,
						pet_status: 'adopt',
					},
					result => {
						// console.log('result / setPetStatus / AnimalAdoption : ', result.msg);
					},
					err => {
						console.log('err / setPetStatus / AnimalAdoption : ', err);
					},
				).then(() => {
					setTimeout(() => {
						Modal.popCongratulationModal(props.route.params.user_nickname, props.route.params.user_profile_uri);
						setTimeout(() => {
							Modal.close();
							navigation.navigate('PetInfoSetting', {pet_id: props.route.params._id});
						}, 1000);
					}, 200);
				});
			},
			() => {
				//계정 찾기 클릭 시 계정 선택하는 템플릿으로 이동
				Modal.close();
				navigation.push('SelectAccount', {userobject_id: props.route.params});
			},
		);
	};

	//임시보호자 입양 버튼 클릭(내가 직접 입양하므로 petStatus만 변경하면 종료)
	const onPressMyAdoption = () => {
		const changePetStatus = async () => {
			setPetStatus(
				{
					userobject_id: props.route.params._id,
					pet_status: 'companion',
				},
				result => {
					// console.log('result / setPetStatus / AnimalAdoption : ', result.msg);
				},
				err => {
					console.log('err / setPetStatus / AnimalAdoption : ', err);
				},
			);
		};
		//임시보호에서 반려 동물 변경 응원 팝업창 !
		const onCheerUp = () => {
			Modal.close();
			setTimeout(() => {
				Modal.popCongratulationModal(props.route.params.user_nickname, props.route.params.user_profile_uri);
				setTimeout(() => {
					Modal.close();
					changePetStatus().then(() => {
						navigation.navigate('PetInfoSetting', {pet_id: props.route.params._id});
					});
				}, 1000);
			}, 200);
		};
		Modal.popOneBtn('이 동물을 가족으로 입양하시겠어요?', '입양하기', () => onCheerUp());
	};

	return (
		<ScrollView>
			<View style={[login_style.wrp_main, animalAdoption.container]}>
				{/* 축하메시지 */}
				<View style={[animalAdoption.congratulatory_message]}>
					<Text style={[txt.noto30, {color: APRI10, textAlign: 'center'}]}>축하합니다! </Text>
					<Text style={[txt.noto30, {color: APRI10, textAlign: 'center'}]}>임시보호를 하고 있는 동물이 입양을 가게 되었나요? </Text>
				</View>
				{/* Instruction */}
				<View style={[animalAdoption.instruction]}>
					<View style={[animalAdoption.instruction_text]}>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto28b]}>임시보호자가 입양을 하게 된 경우</Text>
							<Text style={[txt.noto26, {textAlign: 'center'}]}>
								본 동물의 계정은 현재와 같이 계속 유지가 되고, 임시보호 아이콘이 일반 반려동물의 색으로 변하게 됩니다.
							</Text>
						</View>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto28b]}>입양자가 애니로그 계정이 있는 경우</Text>
							<Text style={[txt.noto26, {textAlign: 'center'}]}>
								본 동물의 계정은 유지가 되지만 더 이상의 글쓰기는 불가합니다. 임시보호 아이콘에서 입양완료 아이콘으로 변하게 되고, 프로필 메뉴에
								입양자의 계정이 뜹니다. 계정을 비공개로 돌릴 수도 있습니다.
							</Text>
						</View>
						<View style={[animalAdoption.text_step1]}>
							<Text style={[txt.noto28b]}>입양자가 애니로그 계정이 없는 경우</Text>
							<Text style={[txt.noto26, {textAlign: 'center'}]}>
								프로필 메뉴에 입양자의 계정이 없고, 다른 변경사항들은 '입양자가 애니로그 계정이 있는 경우'와 같습니다.
							</Text>
						</View>
					</View>
					<View style={[animalAdoption.instruction_icon]}>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_APRI10 />
							<Text style={[txt.noto26, animalAdoption.instruction_icon_item_text]}>일반 반려동물</Text>
						</View>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_YELL20 />
							<Text style={[txt.noto26, animalAdoption.instruction_icon_item_text]}>임시보호 중</Text>
						</View>
						<View style={[animalAdoption.instruction_icon_item]}>
							<Paw62_Mixed />
							<Text style={[txt.noto26, animalAdoption.instruction_icon_item_text]}>입양 완료</Text>
						</View>
					</View>
				</View>
				{/* 입양 */}
				<View style={[btn_style.btn_w522, animalAdoption.btn_w522]}>
					<AniButton btnTitle={'입양보내기'} btnLayout={btn_w694_r30} btnStyle={'border'} titleFontStyle={32} onPress={onPressAdoption} />
				</View>
				{/* 임시보호자 입양*/}
				<View style={[btn_style.btn_w522, animalAdoption.btn_w522]}>
					<AniButton
						btnTitle={'임시 보호자(본인) 입양'}
						btnStyle={'border'}
						btnLayout={btn_w694_r30}
						titleFontStyle={32}
						onPress={onPressMyAdoption}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const animalAdoption = StyleSheet.create({
	container: {
		flex: 1,
	},
	congratulatory_message: {
		width: 654 * DP,
		hegiht: 102 * DP,
		backgroundColor: WHITE,
		marginTop: 50 * DP,
	},
	instruction: {
		width: 694 * DP,
		// height: 880 * DP,
		marginTop: 30 * DP,
		marginBottom: 60 * DP,
		paddingVertical: 60 * DP,
		borderRadius: 40 * DP,
		backgroundColor: 'white',
		alignItems: 'center',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 0.5,
		elevation: 2,
		justifyContent: 'center',
	},
	instruction_text: {
		width: 606 * DP,
		// height: 542 * DP,
		alignItems: 'center',
	},
	text_step1: {
		marginBottom: 40 * DP,
		alignItems: 'center',
	},
	instruction_icon: {
		width: 464 * DP,
		// height: 142 * DP,
		// marginTop: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	instruction_icon_item: {
		// width: 126 * DP,
		height: 142 * DP,
		marginRight: 18 * DP,
		alignItems: 'center',
	},
	instruction_icon_item_text: {
		height: 40 * DP,
		marginTop: 10 * DP,
		textAlign: 'center',
	},
	btn_w522: {
		marginBottom: 50 * DP,
		alignSelf: 'center',
	},
});
