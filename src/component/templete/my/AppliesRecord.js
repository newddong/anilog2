import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getAppliesRecord} from 'Root/api/protectapi';
import {txt} from 'Root/config/textstyle';
import {Arrow48_GRAY, Arrow48_gray10, Arrow48_GRAY10, NextMark} from 'Atom/icon';
import {login_style} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20} from 'Root/config/color';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import VolunteerItemList from 'Root/component/organism/list/VolunteerItemList';

export default AppliesRecord = ({route}) => {
	//첫번째 값만 신청내역에 보여주기 위함. AnimalNeedHelpList가 배열 데이터를 다루기 때문에 반드시 객체가 배열이어야 함.
	const navigation = useNavigation();
	const [adopt_application_list, setAdopt_application_list] = React.useState('false');
	const [protect_application_list, setProtect_application_list] = React.useState('false');
	const [volunteer_list, setVolunteer_list] = React.useState('false');

	React.useEffect(() => {
		console.log('- getAppliesRecord data -');
		getAppliesRecord(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			result => {
				// console.log('result / getAppliesRecord / AppliesRecord : ', JSON.stringify(result.msg.adopt.is_favorite));
				//입양
				if (result.msg.adopt != undefined) {
					let adopt = result.msg.adopt;
					let adopt_animal_info = adopt.protect_act_request_article_id._id;
					delete adopt_animal_info._id;
					adopt = Object.assign(adopt, adopt_animal_info);
					adopt.protect_request_photos_uri = adopt.protect_act_request_article_id.protect_request_photos_uri;
					adopt.protect_request_date = adopt.protect_act_request_article_id.protect_request_date;
					adopt.protect_request_status = adopt.protect_act_request_article_id.protect_request_status;
					adopt.shelter_name = adopt.protect_act_request_article_id.protect_request_writer_id.shelter_name;
					adopt.protect_animal_species = adopt.protect_act_request_article_id.protect_animal_species;
					adopt.protect_animal_species_detail = adopt.protect_act_request_article_id.protect_animal_species_detail;
					adopt.protect_animal_rescue_location = adopt.protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location;
					adopt.protect_request_writer_id = adopt.protect_act_request_article_id.protect_request_writer_id;
					adopt.protect_animal_id = {
						protect_animal_rescue_location: adopt.protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location,
					};
					// console.log('adopt.protect_request_writer_id', adopt.protect_request_writer_id);
					// delete adopt.protect_act_request_article_id;
					const adoptArr = [adopt];
					setAdopt_application_list(adoptArr);
				} else {
					setAdopt_application_list([]);
				}
				//임보
				if (result.msg.protect != undefined) {
					let protect = result.msg.protect;
					let protect_animal_info = protect.protect_act_request_article_id.protect_animal_id;
					delete protect_animal_info._id;
					protect = Object.assign(protect, protect_animal_info);
					protect.protect_request_photos_uri = protect.protect_act_request_article_id.protect_request_photos_uri;
					protect.protect_request_date = protect.protect_act_request_article_id.protect_request_date;
					protect.protect_request_status = protect.protect_act_request_article_id.protect_request_status;
					protect.shelter_name = protect.protect_act_request_article_id.protect_request_writer_id.shelter_name;
					protect.user_nickname = protect.protect_act_request_article_id.protect_request_writer_id.user_nickname;
					protect.protect_request_writer_id = protect.protect_act_request_article_id.protect_request_writer_id;
					protect.protect_animal_id = {
						protect_animal_rescue_location: protect.protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location,
					};
					// console.log('protect.protect_request_writer_id', protect.protect_request_writer_id);
					// delete protect.protect_act_request_article_id;
					const protectArr = [protect];
					setProtect_application_list(protectArr);
				} else {
					setProtect_application_list([]);
				}
				//봉사활동
				if (result.msg.volunteer != undefined) {
					let volunteerList = result.msg.volunteer;
					// console.log('volunteerList', volunteerList.length);
					volunteerList.map((v, i) => {
						v.shelter_address = v.volunteer_target_shelter.shelter_address;
						v.shelter_name = v.volunteer_target_shelter.shelter_name;
						v.user_nickname = v.volunteer_target_shelter.user_nickname;
						v.user_type = v.volunteer_target_shelter.user_type;
						v.user_profile_uri = v.volunteer_target_shelter.user_profile_uri;
						v.shelter_type = v.volunteer_target_shelter.shelter_type;
						// delete v.volunteer_target_shelter;
					});
					setVolunteer_list(volunteerList);
				} else {
					setVolunteer_list([]);
				}
			},
			err => {
				console.log('err / getAppliesRecord / : ', err);
				setAdopt_application_list([]);
				setAdopt_application_list([]);
				setVolunteer_list([]);
			},
		);
	}, []);

	//입양 신청 - 더보기 클릭
	const showMoreAdoption = () => {
		navigation.push('ApplyAdoptionList');
	};

	//임시보호 신청 - 더보기 클릭
	const showMoreProtection = () => {
		navigation.push('ApplyTempProtectList');
	};

	//봉사활동 신청 - 더보기 클릭
	const showMoreVolunteer = () => {
		navigation.push('ManageUserVolunteer'); // 활동 예정중인 신청, 지난 신청 등 나의 신청 목록을 보내줘야 알 수 있는 부분
	};

	//봉사활동 신청 하단 라벨 클릭
	const onClickShelterLabel = shelterInfo => {
		let volunteerData = shelterInfo;
		volunteerData.route = route.name;
		navigation.push('UserVolunteerForm', volunteerData); //봉사 활동 신청 관련
	};

	//입양 신청 라벨 클릭
	const onClickAdoptApplication = (status, id, data) => {
		console.log('data ', data);
		navigation.push('ApplyAdoptionDetails', adopt_application_list[0]);
	};

	//임시보호 신청 라벨 클릭
	const onClickProtectApplication = (status, id, data) => {
		navigation.push('ApplyTempProtectDetails', protect_application_list[0]);
	};

	//API 접속 이전 상태인 false가 단 하나라도 없으면 이미 로딩완료
	const isLoaded = adopt_application_list == 'false' || protect_application_list == 'false' || volunteer_list == 'false';
	// console.log('adopt_application_list.length', adopt_application_list.length);

	if (isLoaded) {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
					<View style={[style.record]}>
						<View style={[style.headerContainer]}>
							<Text style={[style.title]}>입양 신청 </Text>
							{adopt_application_list != undefined && adopt_application_list.length > 0 ? (
								<TouchableOpacity onPress={showMoreAdoption} style={[style.showMoreBox]}>
									<Text style={[txt.noto24, {color: 'gray'}]}>더보기</Text>
									<Arrow48_gray10 />
								</TouchableOpacity>
							) : (
								<></>
							)}
						</View>
						{adopt_application_list != undefined && adopt_application_list.length > 0 ? (
							<View style={{marginTop: -16 * DP, width: 694 * DP}}>
								<ProtectRequest data={adopt_application_list[0]} onClickLabel={onClickAdoptApplication} showFavorite={false} />
							</View>
						) : (
							<Text style={[txt.noto24, {color: GRAY10}, style.whenEmpty]}>입양 신청건이 없습니다.</Text>
						)}
					</View>
					<View style={[style.record]}>
						<View style={[style.headerContainer]}>
							<Text style={[style.title]}>임시보호 신청 </Text>
							{protect_application_list != undefined && protect_application_list.length > 0 ? (
								<TouchableOpacity onPress={showMoreProtection} style={[style.showMoreBox]}>
									<Text style={[txt.noto24, {color: 'gray'}]}>더보기 </Text>
									<Arrow48_gray10 />
								</TouchableOpacity>
							) : (
								<></>
							)}
						</View>
						{protect_application_list != undefined && protect_application_list.length > 0 ? (
							<View style={{marginTop: -16 * DP, width: 694 * DP}}>
								<ProtectRequest data={protect_application_list[0]} onClickLabel={onClickProtectApplication} showFavorite={false} />
							</View>
						) : (
							<Text style={[txt.noto24, {color: GRAY10}, style.whenEmpty]}>임시보호 신청건이 없습니다..</Text>
						)}
					</View>
					<View style={[style.shelterList_container]}>
						<View style={[style.headerContainer]}>
							<Text style={[style.title]}>봉사활동 신청 </Text>
							{volunteer_list != undefined && volunteer_list.length > 0 && (
								<TouchableOpacity onPress={showMoreVolunteer} style={[style.showMoreBox]}>
									<Text style={[txt.noto24, {color: GRAY10}]}>{volunteer_list.length - 1}건 더보기 </Text>
									<Arrow48_gray10 />
								</TouchableOpacity>
							)}
						</View>
						{volunteer_list != undefined && volunteer_list.length > 0 ? (
							<VolunteerItemList items={volunteer_list.slice(0, 1)} onShelterLabelClick={onClickShelterLabel} showStatus={false} />
						) : (
							<Text style={[txt.noto24, {color: GRAY10}, style.whenEmpty]}>봉사활동 신청건이 없습니다.</Text>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
};

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	record: {
		width: 750 * DP,
		marginTop: 20 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		// backgroundColor: 'palegreen',
	},
	itemContainer: {
		width: 654 * DP,
		height: 276 * DP,
		marginBottom: 30 * DP,
	},
	headerContainer: {
		width: 694 * DP,
		height: 48 * DP,
		// marginBottom: 20 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	title: {
		height: 48 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// color: GRAY20,
		color: '#191919',
	},
	showMoreBox: {
		// height: 50 * DP,
		position: 'absolute',
		alignItems: 'center',
		flexDirection: 'row',
		right: 0,
	},
	shelterList_container: {
		marginTop: 48 * DP,
		alignItems: 'center',
		// height: 312 * DP,
		// marginVertical: 30 * DP,
		// paddingVertical: 30 * DP,
	},
	whenEmpty: {
		paddingVertical: 80 * DP,
	},
});
