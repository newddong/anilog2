import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {login_style, manageVolunteer, protectApplicant} from './style_templete';
import {txt} from 'Root/config/textstyle';
import {GRAY20} from 'Root/config/color';
import AccountList from 'Organism/list/AccountList';
import {getUserInfoById, getUserProfile} from 'Root/api/userapi';

//보호 활동 신청자
export default ProtectApplicant = ({route, navigation}) => {
	// console.log('ProtectApplicant route', route.params);
	const data = route.params;
	const protect_animal_data = {
		protect_animal_photo_uri_list: data.protect_animal_photo_uri_list,
		protect_animal_estimate_age: data.protect_animal_estimate_age,
		protect_animal_neutralization: data.protect_animal_neutralization,
		protect_animal_protect_request_id: data.protect_animal_protect_request_id,
		protect_animal_rescue_date: data.protect_animal_rescue_date,
		protect_animal_rescue_location: data.protect_animal_rescue_location,
		protect_animal_rescue_date: data.protect_animal_rescue_date,
		protect_animal_sex: data.protect_animal_sex,
		protect_animal_species: data.protect_animal_species,
		protect_animal_status: data.protect_animal_status,
		protect_animal_weight: data.protect_animal_weight,
	};
	// delete data.protect_act_applicants;

	const applicants = route.params.protect_act_applicants;
	const [adoptorList, setAdoptorList] = React.useState([]); //입양신청자 계정 내역
	const [protectorList, setProtectorList] = React.useState([]); //임시보호 신청자 계정 내역
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	React.useEffect(() => {
		let adoptors = [];
		let protectors = [];
		//지원자들 중 입양신청과 임시보호 신청을 나누는 작업
		applicants.map((v, i) => {
			v.protect_act_type == 'adopt' ? adoptors.push(v) : protectors.push(v);
		});
		let copyAdopt = [...adoptorList];
		let copyProtect = [...protectorList];
		adoptors.map((v, i) => {
			let applicantId = v.protect_act_applicant_id;
			getUserInfoById(
				{
					userobject_id: applicantId,
				},
				result => {
					// console.log('result / getUserProfile / ProtectApplicant / Adoprtor  : ', result.msg);
					//API 접속 후 받은 데이터 + 비어있는 필드를 합쳐진 merged 변수 선언
					const merged = {...v, protect_animal_data};
					merged.user_introduction = result.msg.user_introduction;
					merged.user_profile_uri = result.msg.user_profile_uri;
					merged.user_nickname = result.msg.user_nickname;
					merged.shelter_name = route.params.shelter_name;
					merged.applicantObject = {_id: result.msg._id}; //UserProfile에 연결 시키기 위한 지원자의 userObject
					copyAdopt.push(merged);
					setAdoptorList(copyAdopt);
				},
				err => {
					console.log('err / getUserProfile / ProtectApplicant / Adoptor  : ', err);
				},
			);
		});
		protectors.map((v, i) => {
			let applicantId = v.protect_act_applicant_id;
			getUserInfoById(
				{
					userobject_id: applicantId,
				},
				result => {
					// console.log('result / getUserProfile / ProtectApplicant / Adoprtor  : ', result.msg);
					//API 접속 후 받은 데이터 + 비어있는 필드를 합쳐진 merged 변수 선언
					const merged = {...v, protect_animal_data};
					merged.user_introduction = result.msg.user_introduction;
					merged.user_profile_uri = result.msg.user_profile_uri;
					merged.user_nickname = result.msg.user_nickname;
					merged.shelter_name = route.params.shelter_name;
					merged.applicantObject = {_id: result.msg._id}; //UserProfile에 연결 시키기 위한 지원자의 userObject

					copyProtect.push(merged);
					setProtectorList(copyProtect);
				},
				err => {
					console.log('err / getUserProfile / ProtectApplicant / Adoptor  : ', err);
				},
			);
		});
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	//AccountList의 라벨 클릭 콜백 함수
	const onClickLabel = data => {
		// console.log('data', data);
		navigation.push('UserProfile', {userobject: data.applicantObject});
	};

	//입양, 임보 신청자 아이템 클릭 콜백 함수 (라벨 이외의 영역)
	const onSelect = (item, index) => {
		navigation.push('ProtectApplyForm', item);
	};
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView style={{flex: 1}}>
					{/* 입양 신청 */}
					<View style={[manageVolunteer.container]}>
						<View style={[manageVolunteer.title]}>
							<Text style={[txt.noto28]}>입양 신청</Text>
							<Text style={[txt.noto28, {color: GRAY20}]}> {adoptorList.length}</Text>
						</View>
						<View style={[protectApplicant.accountListContainer]}>
							{adoptorList.length == 0 ? (
								<Text style={[txt.noto24, manageVolunteer.none_adoptor_text]}>입양 신청건이 없습니다.</Text>
							) : (
								<AccountList
									items={adoptorList}
									showStarMark={true}
									showCrossMark={false}
									makeBorderMode={false}
									onSelect={onSelect}
									onClickLabel={onClickLabel}
								/>
							)}
						</View>
						{/* 임시보호신청 */}
						<View style={[manageVolunteer.title]}>
							<Text style={[txt.noto28]}>임시보호 신청</Text>
							<Text style={[txt.noto28, {color: GRAY20}]}> {protectorList.length}</Text>
						</View>
						<View style={[protectApplicant.accountListContainer]}>
							{protectorList.length == 0 ? (
								<Text style={[txt.noto24, manageVolunteer.none_adoptor_text]}>임시보호 신청건이 없습니다.</Text>
							) : (
								<AccountList
									items={protectorList}
									onSelect={onSelect}
									onClickLabel={onClickLabel}
									makeBorderMode={false}
									showStarMark={true}
									showCrossMark={false}
								/>
							)}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
};
