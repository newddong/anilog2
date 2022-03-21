import React from 'react';
import {ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {getAnimalListWithApplicant} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {Star50_Border} from 'Root/component/atom/icon';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectionAplicationList]
export default ProtectionApplicationList = ({route, navigation}) => {
	const [adoptionList, setAdoptionList] = React.useState('false');
	const [protectList, setProtectList] = React.useState('false');

	React.useEffect(() => {
		getAnimalListWithApplicant(
			{},
			result => {
				console.log('result / getAnimalListWithApplicant / ProtectApplyList', JSON.stringify(result.msg.adopt));
				const ge = result.msg.protect;
				ge.map((v, i) => {
					if (v.protect_act_status != 'accept') {
						console.log('v', v);
						const er = {
							__v: 0,
							_id: '621c4b2c1e2fe3271dfc09a2',
							protect_act_address: {brief: '서울 서대문구 경기대로9길 92', detail: '221221'},
							protect_act_applicant_id: {
								__v: 9,
								_id: '61d2de63c0f179ccd5ba5887',
								pet_family: [],
								type: 'UserObject',
								user_address: {city: '서울특별시', district: '마포구', neighbor: '신수동'},
								user_agreement: {
									is_donation_info: true,
									is_location_service_info: true,
									is_marketting_info: true,
									is_over_fourteen: true,
									is_personal_info: true,
									is_service: true,
								},
								user_denied: false,
								user_follow_count: 22,
								user_follower_count: 4,
								user_interests: {
									interests_activity: [Array],
									interests_beauty: [Array],
									interests_food: [Array],
									interests_health: [Array],
									interests_location: [Array],
								},
								user_introduction: '아이에',
								user_is_verified_email: false,
								user_is_verified_phone_number: true,
								user_mobile_company: 'SK텔레콤',
								user_my_pets: [
									'61d2de8ac0f179ccd5ba58a6',
									'61d2ff57c0f179ccd5ba6e72',
									'61e0f9c0c0f179ccd5bb06c3',
									'6200fa6fc0f179ccd5bb69be',
									'622053001e5b8dc9cbbb2119',
									'6224a90702a009f461a26f23',
									'6225868902a009f461a27dfe',
									'6226d2db269db4bdc762861d',
								],
								user_name: '권상우',
								user_nickname: '권상우입',
								user_password: '12',
								user_phone_number: '0422',
								user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
								user_register_date: '2022-01-03T11:30:43.310Z',
								user_type: 'user',
								user_update_date: '2022-03-04T16:21:15.980Z',
								user_upload_count: 23,
							},
							protect_act_checklist: {
								is_adult: false,
								is_agreed_housemate: false,
								is_experience_defecate: false,
								is_knowledge_sanitation: false,
								is_near_veterinary: false,
							},
							protect_act_companion_history: [],
							protect_act_motivation: null,
							protect_act_phone_number: '01099942122',
							protect_act_protect_animal_id: '620a4543c0f179ccd5bbb9e1',
							protect_act_request_article_id: '620bb622e9c46a5c3f40bde7',
							protect_act_request_shelter_id: '6203aff5c0f179ccd5bb8054',
							protect_act_status: 'wait',
							protect_act_type: 'protect',
						};
					}
				});
				const filtered_adopt = result.msg.adopt.filter(e => e.protect_act_status == 'wait'); //완료 목록도 출력되던 오류 수정 22.03.18
				const filtered_protect = result.msg.protect.filter(e => e.protect_act_status == 'wait');
				setAdoptionList(filtered_adopt);
				setProtectList(filtered_protect);
			},
			err => {
				console.log('err / getAnimalListWithApplicant', err);
				setAdoptionList([]);
				setProtectList([]);
			},
		);
	}, []);

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 목록이 없습니다.</Text>
			</View>
		);
	};

	//입양 신청 건 클릭
	const onClickAdoptionItem = i => {
		navigation.push('ProtectApplyForm', {data: adoptionList[i], route: route.name});
	};

	//임시 보호 신청 건 클릭
	const onClickProtectItem = i => {
		console.log('protectList', protectList[i]);
		navigation.push('ProtectApplyForm', {data: protectList[i], route: route.name});
	};

	const listItem = (v, i, isAdopt) => {
		return (
			<View style={[style.listItem]} key={i}>
				<UserDescriptionLabel
					data={v.protect_act_applicant_id}
					width={360}
					onClickLabel={() => (isAdopt ? onClickAdoptionItem(i) : onClickProtectItem(i))}
				/>
				<Star50_Border />
			</View>
		);
	};

	const isLoaded = protectList == 'false' || adoptionList == 'false';

	if (isLoaded) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	} else {
		return (
			<View style={[style.container]}>
				{/* 입양신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>입양 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{adoptionList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList data={adoptionList} renderItem={({item, index}) => listItem(item, index, true)} ListEmptyComponent={whenEmpty()} />
					</View>
				</View>
				{/* 임시보호신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>임시 보호 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{protectList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList data={protectList} renderItem={({item, index}) => listItem(item, index, false)} ListEmptyComponent={whenEmpty()} />
					</View>
				</View>
			</View>
		);
	}
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		// backgroundColor: 'red',
		flex: 1,
	},
	listContainer: {
		marginTop: 40 * DP,
	},
	listTitle: {
		alignSelf: 'flex-start',
	},
	list: {
		width: 654 * DP,
		marginTop: 40 * DP,
		// backgroundColor: 'lightblue',
	},
	listItem: {
		marginBottom: 30 * DP,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'pink',
	},
});
