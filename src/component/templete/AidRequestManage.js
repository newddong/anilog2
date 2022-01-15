import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {login_style, temp_style, baseInfo_style} from './style_templete';
import AidRequestList from 'Organism/list/AidRequestList';
import {getAnimalListWithApplicant, getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import {getApplyDetailById} from 'Root/api/protectapi';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectApplyList]
//ShelterMenu => 보호중인 동물 [Nav명 - ShelterProtectAnimalList]
export default AidRequestManage = ({route, navigation}) => {
	const token = route.params.token;
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [data, setData] = React.useState([]);
	const [notFilteredData, setNotFilteredData] = React.useState([]);
	const isShelterProtect = route.name == 'ShelterProtectAnimalList';

	React.useEffect(() => {
		if (isShelterProtect) {
			// 보호중인 동물이므로 입양 및 임시보호가 완료된 보호동물들은 출력이 되어서는 안됨
			//protect_animal_status !='adopt' or 'protect'일 경우 제외되어야 함
			//차후 API 다듬는 과정에서 추가 필요
			getShelterProtectAnimalList(
				{
					shelter_protect_animal_object_id: '',
					request_number: '',
				},
				result => {
					// console.log('result / getShelterProtectAnimalList / ShelterProtectAnimalList', result.msg[0]);
					//현재 protect_animal_status 를 바꾸는 API가 없는 상태이므로 신청 및 확정이 완료된 동물이더라도
					//모든 보호소의 보호동물들은 protect_animal_status == 'rescue' 상태로 온다
					//우선 해당 보호동물에 대한 입양 및 보호 신청 _id를 토대로 getApplyDetailById 접속
					// 만약 status가 단 하나라도 'accept' 인 것이 있다면 출력을 시키지 말아야함
					// 모든 것은 API가 도착하면 개선이 가능
					setData(result.msg);
					const protectAnimalList = result.msg;
					let notFiltered = [];

					protectAnimalList.map((value, index) => {
						// console.log('v.protectActApplicants', v.protect_act_applicants);
						const protectActivities_id = value.protect_act_applicants;
						protectActivities_id.map((protect_activity_value, protect_activity_index) => {
							// console.log('v', index, protect_activity_value);
							getApplyDetailById(
								{
									protect_act_object_id: protect_activity_value,
								},
								res => {
									// console.log('result / getApplyDetailById / AidRequestManage  ', protect_activity_index, res.msg);
									const protect_activity_object = res.msg;
									protect_activity_object.protect_animal_id = index;

									notFiltered.push(res.msg);
									// const isAccepted = protect_activity_object.protect_act_status == 'accept';
									// console.log('isAccepted', index, protect_activity_index, isAccepted);
									// isAccepted ? shelterProtectAnimalList_notAccepted.push(protectAnimalList[index]) : null;
									// setNotFilteredData(shelterProtectAnimalList_notAccepted);
									// // setData(result.msg);
								},
								err => {
									console.log('err / getApplyDetailById / AidRequestManage   ', err);
								},
							);
						});
					});
					setTimeout(() => {
						setNotFilteredData(notFiltered);
					}, 1500);
				},
				err => {
					console.log('err / getShelterProtectAnimalList', err);
					setTimeout(() => {
						setLoading(false);
					}, 1500);
					// setData(err);
				},
			);
		} else {
			//token(id)를 토대로 보호소 계정이 등록한 보호요청 게시글 중 신청서가 들어와 있는 목록을 조회
			console.log('ProtectApplyList');
			getAnimalListWithApplicant(
				{},
				result => {
					// console.log('result / getAnimalListWithApplicant / ProtectApplyList', result.msg);
					let merged = []; //페이지 이동 후 입양 신청한
					result.msg.map((data, i) => {
						data.shelter_name = route.params.shelter_name;
						// console.log('data', i, data);
						//출력된 보호요청게시글들이 가지는 지원신청서가 혹시 accept 상태인 것이 있는 경우 ( == 입양/임보가 확정-취소-신청취소 된 상태 )
						// ==> 출력되어서는 안됨
						const hasApplicantsWaitng = data.protect_act_applicants.some(
							e => e.protect_act_status == 'accept' || e.protect_act_status == 'denied' || e.protect_act_status == 'cancel',
						);
						!hasApplicantsWaitng ? merged.push(data) : false;
					});
					setData(merged);
					setTimeout(() => {
						setLoading(false);
					}, 1500);
				},
				err => {
					console.log('err / getAnimalListWithApplicant', err);
					setTimeout(() => {
						setLoading(false);
					}, 1500);
					// setData(err);
				},
			);
		}
	}, []);

	React.useEffect(() => {
		// 보호소의 모든 보호동물이 담겨 있는 notFilteredData
		// 해당 보호동물에 대한 [입양/지원] 신청서가 있을 경우 해당 신청서들을 탐색
		// 탐색의 목적 => 신청서들 중 상태가 'accept'된 항목이 있을 경우 이미 보호소를 떠난 동물로 판단
		if (notFilteredData != null) {
			// const isNotProtect = notFilteredData.filter(e => e.protect_act_type == 'protect');
			// console.log('isNotProtect', isNotProtect);

			const filtered_by_status = notFilteredData.filter(e => e.protect_act_status == 'accept');
			let index_of_acceptItem = [];
			filtered_by_status.map((v, i) => {
				index_of_acceptItem.push(v.protect_animal_id);
			});
			const index_dup_deleted = Array.from(new Set(index_of_acceptItem));
			let protect_animal_list_copy = [...data];
			index_dup_deleted.map((v, i) => {
				protect_animal_list_copy.splice(v, 1);
			});
			setData(protect_animal_list_copy);
			setTimeout(() => {
				setLoading(false);
			}, 1500);
		} else {
			console.log('waiting');
		}
	}, [notFilteredData]);

	//선택 시 이동
	const onSelect = index => {
		console.log('index', data[index]);
		!isShelterProtect
			? navigation.push('ProtectApplicant', data[index])
			: console.log('ShelterProtectAnimalList에서는 네비게이션 정의가 안됨', data[index]);
	};

	const addProtectAnimal = () => {
		navigation.push('AssignProtectAnimalImage');
		// navigation.push('WriteAidRequest');
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
					<View style={[temp_style.aidRequestList_aidRequestManage, baseInfo_style.list]}>
						{data.length == 0 ? (
							<Text style={[txt.noto30, {alignSelf: 'center', marginTop: 130, color: GRAY10}]}>목록이 비어있습니다.</Text>
						) : (
							<AidRequestList
								items={data}
								onPressAddProtectAnimal={addProtectAnimal}
								onSelect={onSelect}
								callFrom={route.name}
								selectBorderMode={false}
							/>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
};
// 61c1cc107be07611b00945f9
