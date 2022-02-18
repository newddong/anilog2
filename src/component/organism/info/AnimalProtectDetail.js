import React from 'react';
import {View, Text, ScrollView, Linking, TouchableOpacity, ActivityIndicator} from 'react-native';
import {GRAY10, APRI10, BLUE20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {House48, Phone48, Paw48_APRI10, Check48, TextBalloon48, Person48} from 'Atom/icon';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {animalProtectList} from 'Templete/style_templete';
import AnimalNeedHelp from 'Organism/listitem/AnimalNeedHelp';
import {animalProtectDetail} from 'Organism/style_organism copy';
import {hyphened} from 'Root/util/dateutil';

export default AnimalProtectDetail = props => {
	// console.log(' AnimalProtectDetail / props.data', props.data.protect_act_companion_history);

	const data = props.data;
	const getStatusText = arg => {
		switch (arg) {
			case 'living':
				return '함께 살고 있어요.';
			case 'died':
				return '무지개 다리를 건넜어요';
			case 'adopted':
				return '다른 친구에게 입양되었어요.';
		}
	};

	const onPressPhoneNum = () => {
		Linking.openURL(`tel:${data.shelter_delegate_contact_number}`);
	};

	const onClickLabel = data => {
		props.onClickLabel(data);
	};

	return (
		<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
			<View style={[animalProtectDetail.container]}>
				<View style={[animalProtectDetail.animalNeedHelp_container]}>
					<AnimalNeedHelp data={data} />
				</View>
				<View style={[animalProtectDetail.details_container]}>
					{/* 보호장소 */}
					{
						//입양신청을 통해서 들어왔을 경우 입양자 계정에 대한 View를 보여줌
						props.nav == 'AdoptorInformation' ? (
							<View style={[animalProtectDetail.detail]}>
								<View style={{flexDirection: 'row'}}>
									<View style={[animalProtectDetail.detail_icon48]}>
										<Person48 />
									</View>
									<View style={[animalProtectDetail.detail_title]}>
										<Text style={[txt.noto28b, {color: GRAY10}]}>입양자 계정</Text>
									</View>
								</View>
								<View style={[animalProtectDetail.detail_content]}>
									<UserDescriptionLabel data={data.adoptorObject} onClickLabel={onClickLabel} />
								</View>
							</View>
						) : null
					}

					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectList.menuHeader]}>
							<House48 />
							<Text style={[txt.noto26b, {color: GRAY10}]}>{'   '}보호장소</Text>
						</View>
						<View style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28]}>
								{data.protect_act_address.brief || ''} {'  ' + data.protect_act_address.detail != undefined ? data.protect_act_address.detail : ''}
								{data.protect_act_address.city || ''} {data.protect_act_address.district || ''} {data.protect_act_address.neighbor || ''}
							</Text>
						</View>
					</View>
					{/* 연락처 */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectList.menuHeader]}>
							<Phone48 />
							<Text style={[txt.noto26b, {color: GRAY10}]}>{'   '}연락처</Text>
						</View>
						<TouchableOpacity onPress={onPressPhoneNum} style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28, {color: BLUE20, textDecorationLine: 'underline'}]}>{hyphened(data.protect_act_phone_number) || ''}</Text>
						</TouchableOpacity>
					</View>
					{/* 반려 동물 생활 */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectList.menuHeader]}>
							<Paw48_APRI10 />
							<Text style={[txt.noto26b, {color: GRAY10}]}>{'   '}반려 동물 생활</Text>
						</View>
						{data.protect_act_companion_history.map((v, i) => {
							// console.log('v', i, v.companion_pet_current_status);
							return (
								<View style={[animalProtectDetail.detail_content]} key={i}>
									<Text style={[txt.noto28]}>
										{i + 1}. {v.companion_pet_species} / 나이 : {v.companion_pet_age} / 반려생활 : {v.companion_pet_period}
									</Text>
									<Text style={[txt.noto28, {color: APRI10, paddingLeft: 10}]}>{getStatusText(v.companion_pet_current_status)}</Text>
								</View>
							);
						})}
					</View>
					{/* 체크 포인트  */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectList.menuHeader]}>
							<Check48 />
							<Text style={[txt.noto26, {color: GRAY10}]}>{'   '}체크 포인트</Text>
						</View>
						<View style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_adult ? APRI10 : GRAY10}]}>- 성인 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_near_veterinary ? APRI10 : GRAY10}]}>- 주거지 근처 동물병원 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_agreed_housemate ? APRI10 : GRAY10}]}>- 동거인 동의 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_experience_defecate ? APRI10 : GRAY10}]}>- 배변 훈련 지식 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_knowledge_sanitation ? APRI10 : GRAY10}]}>
								- 반려동물 청결 지식 확인
							</Text>
						</View>
					</View>
					{/* 신청 동기  */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectList.menuHeader]}>
							<TextBalloon48 />
							<Text style={[txt.noto26b, {color: GRAY10}]}>{'   '}신청 동기</Text>
						</View>
						<View style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28]}>{data.protect_act_motivation || ''}</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

AnimalProtectDetail.defaultProps = {};
