import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import Vaccination from 'Organism/Vaccination';
import {login_style, temp_txt, vaccinationRecord} from './style_templete';
import {_dummy_PetVaccinationObject} from 'Root/config/dummy_data_hjs';

export default VaccinationRecord = ({route, navigation}) => {
	const [data, setData] = React.useState([]);
	const [vaccinOnceAmonthList, setVaccinOnceAmonthList] = React.useState([]);
	const [vaccinOnceEvery3monthsList, setVaccinOnceEvery3monthsList] = React.useState([]);
	const [vaccinOnceAyearList, setVaccinOnceAyearList] = React.useState([]);
	const [alaram, setAlaram] = React.useState(true);

	//Vaccin 접종 내역이 바뀔 때마다 헤더에 데이터 송신
	React.useEffect(() => {
		let copy = [vaccinOnceAmonthList, vaccinOnceEvery3monthsList, vaccinOnceAyearList];
		// const data = vaccinOnceAmonthList + vaccinOnceEvery3monthsList + vaccinOnceAyearList;
		setData(copy);
		navigation.setParams(copy); //헤더에 데이터 송신
	}, [vaccinOnceAmonthList, vaccinOnceEvery3monthsList, vaccinOnceAyearList]);

	React.useEffect(() => {
		// getVaccinationRecord(
		// 	{
		// 		vaccination_pet_id: userobject_id,
		// 	},
		// 	data => {
		// 		console.log('VaccinationRecord : getVaccinationRecord data - ', data);
		// 		setData(data);
		// 	},
		// 	err => {
		// 		console.log('VaccinationRecord : getVaccinationRecord data - ', err);
		// 	},
		// );
	}, []);

	const updateVaccinationRecord = () => {
		setVaccinationRecord(
			{
				vaccination_pet_id: route.params.userobject_id, //접종 대상 반려동물

				//심장사상충
				vaccination_heartworm: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//외부 기생충
				vaccination_ectozoon: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//구충제
				vaccination_anthelmintic: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//종합접종
				vaccination_comprehensive: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//코로나 장염
				vaccination_coronaviral_enteritis: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//기관지염
				vaccination_bronchitis: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//광견병
				vaccination_hydrophobia: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//인플루엔자
				vaccination_influenza: {
					nearest_vaccination_date: nearest_vaccination_date,
				},
				//다음 예정일 알람
				nextAlarmValue: alaram,
			},
			result => {
				console.log(`result:${result}`);
				navigation.push('PetInfoSetting', route.params.userobject_id);
			},
		);
	};

	const getDbFiled = [
		{
			//UserObject
			user_profile_uri: '', // 프로필 사진
			user_nickname: '', // 닉네임
			pet_species: '', //반려동물의 종류(ex 개, 고양이, 토끼 등)
			pet_species_detail: '', //반려동물의 종류(ex 리트리버, 불독, 진돗개 등)
			pet_status: '', //반려동물의 상태, 임시보호중(protect), 입양됨(adopt), 반려동물(companion)
			pet_family: [
				{
					//반려동물 가족계정들
					userobject_id: '',
					user_profile_uri: '',
					user_nickname: '',
				},
			],
			user_denied: '', //
		},
	];

	// [hjs] API 작업시 하단의 케이스문 리펙토링 필요
	//API로부터 가져온 쿼리 내용을 백신별로 그룹핑 진행.
	React.useEffect(() => {
		let temp_vaccinOnceAmonthList = [];
		let temp_vaccinOnceEvery3monthsList = [];
		let temp_vaccinOnceAyearList = [];

		//데이터에서 key를 추출해서 임시 json에 넣는다.
		for (var key in _dummy_PetVaccinationObject) {
			let jsonTemp = {};
			switch (key) {
				case 'vaccination_heartworm':
					jsonTemp.vacc_name = '심장 사상충';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAmonthList.push(jsonTemp);
					break;
				case 'vaccination_ectozoon':
					jsonTemp.vacc_name = '외부 기생충';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAmonthList.push(jsonTemp);
					break;
				case 'vaccination_anthelmintic':
					jsonTemp.vacc_name = '구충제';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceEvery3monthsList.push(jsonTemp);
					break;
				case 'vaccination_comprehensive':
					jsonTemp.vacc_name = '종합접종';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAyearList.push(jsonTemp);
					break;
				case 'vaccination_coronaviral_enteritis':
					jsonTemp.vacc_name = '코로나 장염';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAyearList.push(jsonTemp);
					break;
				case 'vaccination_bronchitis':
					jsonTemp.vacc_name = '기관지염';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAyearList.push(jsonTemp);
					break;
				case 'vaccination_hydrophobia':
					jsonTemp.vacc_name = '광견병';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAyearList.push(jsonTemp);
					break;
				case 'vaccination_influenza':
					jsonTemp.vacc_name = '인플루엔자';
					jsonTemp.current_dueDate = _dummy_PetVaccinationObject[key].last_vaccination_date;
					jsonTemp.next_dueDate = _dummy_PetVaccinationObject[key].next_vaccination_date;
					temp_vaccinOnceAyearList.push(jsonTemp);
					break;
			}
		}

		// //<Vaccination>의 data에 넣기 위해 useState한 작업
		setVaccinOnceAmonthList(temp_vaccinOnceAmonthList);
		setVaccinOnceEvery3monthsList(temp_vaccinOnceEvery3monthsList);
		setVaccinOnceAyearList(temp_vaccinOnceAyearList);
	}, []);

	//예정일 값 변경 콜백
	const onDateChange_OnceAmonthList = e => {
		setVaccinOnceEvery3monthsList(e);
	};

	//예정일 값 변경 콜백
	const onDateChange_OnceEvery3monthsList = e => {
		setVaccinOnceAmonthList(e);
	};

	//예정일 값 변경 콜백
	const onDateChange_OnceAyearList = e => {
		setVaccinOnceAyearList(e);
	};

	const onSwtichOn = () => {
		console.log(`-onSwtichOn-`);
		setAlaram(true);
	};

	const onSwtichOff = () => {
		console.log(`-onSwtichOff-`);
		setAlaram(false);
	};

	return (
		<ScrollView style={{flex: 1}}>
			<View style={[login_style.wrp_main, vaccinationRecord.container]}>
				<View style={[vaccinationRecord.vaccinationForm_container]}>
					<View style={[vaccinationRecord.vaccination_category]}>
						<Vaccination data={vaccinOnceAmonthList} title="매월 1회 접종" onDateChange={onDateChange_OnceAmonthList} />
					</View>
					<View style={[vaccinationRecord.vaccination_category]}>
						<Vaccination data={vaccinOnceEvery3monthsList} title="3개월에 1회 접종" onDateChange={onDateChange_OnceEvery3monthsList} />
					</View>
					<View style={[vaccinationRecord.vaccination_category]}>
						<Vaccination data={vaccinOnceAyearList} title="매년 1회 접종" onDateChange={onDateChange_OnceAyearList} />
					</View>
				</View>
				{/* 다음 예정일 알림 */}
				<View style={[vaccinationRecord.dueDateView]}>
					<View style={[vaccinationRecord.dueDateText]}>
						<Text style={[txt.noto24, {color: GRAY10}]}>다음예정일 알림</Text>
					</View>
					<View style={[vaccinationRecord.dueDateSwitch]}>
						<OnOffSwitch onSwtichOn={onSwtichOn} onSwtichOff={onSwtichOff} />
					</View>
				</View>
				{/* 접종표 관련 권고사항 메시지 */}
				<View style={[vaccinationRecord.guide_msg]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>해당 접종표는 표준에 근거한 접종간격입니다.</Text>
					<Text style={[txt.noto24, {color: GRAY10}]}>각 반려견마다 접종 기간 간격이 다를 수도 있음을 알려드립니다.</Text>
				</View>
			</View>
		</ScrollView>
	);
};
