import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {getAppliesRecord} from 'Root/api/protectapi';
import {dummy_AppliesRecord_protect} from 'Root/config/dummy_data_hjs';
import {dummy_AppliesRecord_rescue} from 'Root/config/dummy_data_hjs';
import {txt} from 'Root/config/textstyle';
import {NextMark} from '../atom/icon';
import AnimalNeedHelpList from '../organism_ksw/AnimalNeedHelpList';
import ShelterList from '../organism_ksw/ShelterList';
import {appliesRecord, login_style} from './style_templete';

export default AppliesRecord = ({route}) => {
	//첫번째 값만 신청내역에 보여주기 위함. AnimalNeedHelpList가 배열 데이터를 다루기 때문에 반드시 객체가 배열이어야 함.
	const navigation = useNavigation();
	const [adopt_application_list, setAdopt_application_list] = React.useState();
	const [protect_application_list, setProtect_application_list] = React.useState();
	const [volunteer_list, setVolunteer_list] = React.useState();
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	//보호 요청 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		console.log('- getAppliesRecord data -');
		//입양신청, 임시보호 신청, 봉사활동 신청 배열 형식으로 모두 가져오게 됨. 현재 리스트에서는 입양신청 1개, 임시보호 신청 1개, 봉사활동 신청 10개만 가져 올 예정
		//API 구조 변경 후 재작업 진행 예정.
		getAppliesRecord(
			{},
			result => {
				console.log('result / getAppliesRecord / ApplitesRecord  : ', JSON.stringify(result.msg.volunteer[0]));

				// 가장 최근 입양 신청한 내역 받고 필드 정리
				if (result.msg.adopt.length > 0) {
					console.log('dd');
					let adopt = result.msg.adopt[0];
					let adopt_animal_info = adopt.protect_act_request_article_id.protect_animal_id;
					delete adopt_animal_info._id;
					adopt = Object.assign(adopt, adopt_animal_info);
					adopt.protect_request_photos_uri = adopt.protect_act_request_article_id.protect_request_photos_uri;
					adopt.protect_request_date = adopt.protect_act_request_article_id.protect_request_date;
					adopt.protect_request_status = adopt.protect_act_request_article_id.protect_request_status;
					adopt.shelter_name = adopt.protect_act_request_article_id.protect_request_writer_id.shelter_name;
					delete adopt.protect_act_request_article_id;
					const adoptArr = [adopt];
					setAdopt_application_list(adoptArr);
				}

				//가장 최근 임보활동 신청한 내역 받고 필드 정리
				if (result.msg.protect.length > 0) {
					let protect = result.msg.protect[0];
					let protect_animal_info = protect.protect_act_request_article_id.protect_animal_id;
					delete protect_animal_info._id;
					protect = Object.assign(protect, protect_animal_info);
					protect.protect_request_photos_uri = protect.protect_act_request_article_id.protect_request_photos_uri;
					protect.protect_request_date = protect.protect_act_request_article_id.protect_request_date;
					protect.protect_request_status = protect.protect_act_request_article_id.protect_request_status;
					protect.shelter_name = protect.protect_act_request_article_id.protect_request_writer_id.shelter_name;
					delete protect.protect_act_request_article_id;
					const protectArr = [protect];
					setProtect_application_list(protectArr);
				}

				if (result.msg.volunteer.length > 0) {
					//봉사활동 신청 내역 받고 필드 정리
					let volunteer = result.msg.volunteer;
					volunteer.map((v, i) => {
						v.shelter_address = v.volunteer_target_shelter.shelter_address;
						v.shelter_name = v.volunteer_target_shelter.shelter_name;
						v.user_type = v.volunteer_target_shelter.user_type;
						v.user_profile_uri = v.volunteer_target_shelter.user_profile_uri;
						v.shelter_type = v.volunteer_target_shelter.shelter_type;
						delete v.volunteer_target_shelter;
					});
					setVolunteer_list(volunteer);
				}

				setTimeout(() => {
					setLoading(false);
				}, 500);
			},
			err => {
				console.log('err / getAppliesRecord / AppliesRecord', err);
				setTimeout(() => {
					setLoading(false);
				}, 500);
			},
		);
	}, []);

	//입양 신청 - 더보기 클릭
	const showMoreAdoption = () => {
		navigation.push('ApplyAdoptionList', dummy_AppliesRecord_rescue);
	};

	//임시보호 신청 - 더보기 클릭
	const showMoreProtection = () => {
		navigation.push('ApplyTempProtectList', dummy_AppliesRecord_protect);
	};

	//봉사활동 신청 - 더보기 클릭
	const showMoreVolunteer = () => {
		navigation.push('ManageUserVolunteer'); // 활동 예정중인 신청, 지난 신청 등 나의 신청 목록을 보내줘야 알 수 있는 부분
	};

	const onOff_FavoriteTag = (value, index) => {
		console.log('즐겨찾기=>' + value + ' ' + index);
	};

	//봉사활동 신청 하단 라벨 클릭
	const onClickShelterLabel = shelterInfo => {
		console.log('shelter', shelterInfo);
		navigation.push('UserVolunteerForm', shelterInfo); //봉사 활동 신청 관련
	};

	//입양 신청 라벨 클릭
	const onClickAdoptApplication = (status, id, data) => {
		console.log('data ', data);
		navigation.push('ApplyAdoptionDetails', data);
	};

	//임시보호 신청 라벨 클릭
	const onClickProtectApplication = (status, id, data) => {
		console.log('data', data);
		navigation.push('ApplyTempProtectDetails', data);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, appliesRecord.container]}>
				<ScrollView>
					<View style={[appliesRecord.record]}>
						<View style={[appliesRecord.animalNeedHelp.headerContainer]}>
							<Text style={[appliesRecord.animalNeedHelp.headerContainer.title]}>입양 신청 </Text>
							<TouchableOpacity onPress={showMoreAdoption} style={[appliesRecord.showMoreBox]}>
								<Text style={[txt.noto24]}>더보기 </Text>
								<NextMark />
							</TouchableOpacity>
						</View>
						{adopt_application_list != undefined && adopt_application_list.length > 0 ? (
							<AnimalNeedHelpList data={adopt_application_list} onClickLabel={onClickAdoptApplication} onFavoriteTag={onOff_FavoriteTag} />
						) : (
							<Text>검색 결과가 없습니다.</Text>
						)}
					</View>
					<View style={[appliesRecord.record]}>
						<View style={[appliesRecord.animalNeedHelp.headerContainer]}>
							<Text style={[appliesRecord.animalNeedHelp.headerContainer.title]}>임시보호 신청 </Text>
							<TouchableOpacity onPress={showMoreProtection} style={[appliesRecord.showMoreBox]}>
								<Text style={[txt.noto24]}>더보기 </Text>
								<NextMark />
							</TouchableOpacity>
						</View>
						{protect_application_list != undefined && protect_application_list.length > 0 ? (
							<AnimalNeedHelpList data={protect_application_list} onClickLabel={onClickProtectApplication} onFavoriteTag={onOff_FavoriteTag} />
						) : (
							<Text>검색 결과가 없습니다.</Text>
						)}
					</View>
					<View style={[appliesRecord.shelterList_container]}>
						<View style={[appliesRecord.animalNeedHelp.headerContainer]}>
							<Text style={[appliesRecord.animalNeedHelp.headerContainer.title]}>봉사활동 신청 </Text>
							{volunteer_list != undefined && volunteer_list.length > 1 && (
								<TouchableOpacity onPress={showMoreVolunteer} style={[appliesRecord.showMoreBox]}>
									<Text style={[txt.noto24]}>더보기 </Text>
									<NextMark />
								</TouchableOpacity>
							)}
						</View>
						{volunteer_list != undefined && volunteer_list.length > 0 ? (
							<ShelterList items={volunteer_list} onShelterLabelClick={onClickShelterLabel} />
						) : (
							<Text>검색 결과가 없습니다.</Text>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
};
