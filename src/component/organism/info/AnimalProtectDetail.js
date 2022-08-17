import React from 'react';
import {View, Text, ScrollView, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, APRI10, BLUE20, GRAY40, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {House48, Phone48, Paw48_APRI10, Check48, TextBalloon48, Person48, Phone48_BLACK, Paw36_black, Check36_black} from 'Atom/icon';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {animalProtectList} from 'Templete/style_templete';
import {hyphened} from 'Root/util/dateutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import AniButton from 'Root/component/molecules/button/AniButton';
import {btn_w654_h70} from 'Root/component/atom/btn/btn_style';
import DP from 'Root/config/dp';
import ProtectRequest from '../listitem/ProtectRequest';
/**
 *

 * @param {object} props.data - 동물 보호 data


 */
export default AnimalProtectDetail = props => {
	console.log(' AnimalProtectDetail / props.data', props);
	const [statusText, setStatusText] = React.useState();
	const [userText, setUserText] = React.useState('본 계정 보호자');
	const data = props.data;

	React.useEffect(() => {
		if (props.data?.protect_act_type == 'protect') {
			setStatusText('임시보호 중입니다.');
		} else {
			setStatusText('입양 완료되었습니다.');
		}
		if (props.data?.approved_applicant == userGlobalObject.userInfo?._id) {
			setUserText('본 계정 보호자');
		} else {
			setUserText('다른 보호자');
		}
	}, []);
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
		Linking.openURL(`tel:${data.protect_act_phone_number}`);
	};

	const onClickLabel = data => {
		props.onClickLabel(data);
	};
	const StatusButton = () => {
		if (data?.approved_applicant) {
			return (
				<View>
					{data?.protect_act_type == 'protect' ? (
						<View style={[{marginTop: 70 * DP}]}>
							<AniButton btnTitle={`${userText}가 ${statusText}`} btnLayout={btn_w654_h70} btnStyle={'border'} />
						</View>
					) : (
						<View style={[{marginTop: 70 * DP}]}>
							{/* <Text>입양</Text> */}
							<AniButton btnTitle={`${userText}에게 ${statusText}`} btnLayout={btn_w654_h70} btnStyle={'border'} />
						</View>
					)}
				</View>
			);
		} else {
			return <></>;
		}
	};

	return (
		<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
			<View style={[animalProtectDetail.container]}>
				<View style={[animalProtectDetail.animalNeedHelp_container]}>
					<ProtectRequest data={data} inActiveOpacity={true} showFavorite={false} />
				</View>
				<View style={[animalProtectDetail.separator]} />
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
						<View style={[animalProtectDetail.menuHeader]}>
							<House48 />
							<Text style={[txt.noto30b, {}]}>{'   '}보호장소</Text>
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
						<View style={[animalProtectDetail.menuHeader]}>
							<Phone48_BLACK />
							<Text style={[txt.noto30b]}>{'   '}연락처</Text>
						</View>
						<TouchableOpacity onPress={onPressPhoneNum} style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.roboto28, {color: BLUE20, textDecorationLine: 'underline'}]}>{hyphened(data.protect_act_phone_number) || ''}</Text>
						</TouchableOpacity>
					</View>
					{/* 반려 동물 생활 */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectDetail.menuHeader]}>
							<Paw36_black />
							<Text style={[txt.noto30b]}>{'   '}반려 동물 생활</Text>
						</View>
						{data.protect_act_companion_history.map((v, i) => {
							console.log('v', i, v);
							return (
								<View style={[animalProtectDetail.detail_content]} key={i}>
									<Text style={[txt.noto28]}>
										{i + 1}. {v.companion_pet_species} / 나이 : {v.companion_pet_age} / 반려생활 : {v.companion_pet_period}
									</Text>
									<Text style={[txt.noto28, {color: GRAY10, paddingLeft: 30 * DP}]}>{getStatusText(v.companion_pet_current_status)}</Text>
								</View>
							);
						})}
					</View>
					{/* 체크 포인트  */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectDetail.menuHeader]}>
							<Check36_black />
							<Text style={[txt.noto30b]}>{'   '}체크 포인트</Text>
						</View>
						<View style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_adult ? APRI10 : MAINBLACK}]}>- 성인 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_near_veterinary ? APRI10 : MAINBLACK}]}>
								- 주거지 근처 동물병원 확인
							</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_agreed_housemate ? APRI10 : MAINBLACK}]}>- 동거인 동의 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_experience_defecate ? APRI10 : MAINBLACK}]}>- 배변 훈련 지식 확인</Text>
							<Text style={[txt.noto28, {color: data.protect_act_checklist.is_knowledge_sanitation ? APRI10 : MAINBLACK}]}>
								- 반려동물 청결 지식 확인
							</Text>
						</View>
					</View>
					{/* 신청 동기  */}
					<View style={[animalProtectDetail.detail]}>
						<View style={[animalProtectDetail.menuHeader]}>
							<TextBalloon48 />
							<Text style={[txt.noto30b]}>{'   '}신청 동기</Text>
						</View>
						<View style={[animalProtectDetail.detail_content]}>
							<Text style={[txt.noto28]}>{data.protect_act_motivation || ''}</Text>
						</View>
					</View>
					<StatusButton />
				</View>
			</View>
		</ScrollView>
	);
};

AnimalProtectDetail.defaultProps = {};

const animalProtectDetail = StyleSheet.create({
	container: {
		alignSelf: 'center',
		marginBottom: 50 * DP,
		alignItems: 'center',
	},
	animalNeedHelp_container: {
		marginBottom: 20 * DP,
		// backgroundColor: 'yellow',
	},
	separator: {
		width: 750 * DP,
		height: 10 * DP,
		backgroundColor: GRAY40,
	},
	details_container: {
		width: 694 * DP,
	},
	detail: {
		width: 694 * DP,
		marginTop: 40 * DP,
	},
	detail_icon48: {
		width: 48 * DP,
		height: 48 * DP,
	},
	detail_title: {
		width: 590 * DP,
		height: 40 * DP,
		marginLeft: 16 * DP,
		alignSelf: 'center',
	},
	detail_content: {
		width: 620 * DP,
		marginTop: 6 * DP,
		marginLeft: 64 * DP,
		minHeight: 50 * DP,
	},
	menuHeader: {
		width: 694 * DP,
		height: 48 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
});
