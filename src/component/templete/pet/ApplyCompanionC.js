import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {applyComanionCheckList} from 'Root/config/dummyDate_json';
import {txt} from 'Root/config/textstyle';
import {btn_w176} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Stagebar from 'Molecules/info/Stagebar';
import AssignCheckList from 'Organism/list/AssignCheckList';
import {stagebar_style} from 'Root/component/organism/style_organism copy';
import {applyCompanionC, btn_style, login_style, temp_style} from 'Templete/style_templete';

// protect_act_checklist : {
// 	is_adult : Boolean, //성인여부
// 	is_near_veterinary : Boolean, //보호지 근처의 동물병원 여부
// 	is_agreed_housemate : Boolean, //가족, 동거인의 동의 여부
// 	is_experience_defecate : Boolean, //배변훈련 지식여부
// 	is_knowledge_sanitation : Boolean, //반려동물 미용,위생 지식여부
// 	}, //보호신청 체크리스트

export default ApplyCompanionC = props => {
	const navigation = useNavigation();
	const isProtect = props.route.name == 'ApplyProtectActivityC';

	const [data, setData] = React.useState({
		...props.route.params,
		protect_act_checklist: {
			is_adult: false,
			is_near_veterinary: false,
			is_agreed_housemate: false,
			is_experience_defecate: false,
			is_knowledge_sanitation: false,
		},
	});

	const [temp, setTemp] = React.useState(undefined);
	const [checkList, setCheckList] = React.useState(applyComanionCheckList);
	React.useEffect(() => {
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
	}, []);
	//임시저장된 자료에 맞춰 각 CheckListItem에 대한 체크 상태 여부를 결정
	React.useEffect(() => {
		if (temp != undefined) {
			let copy = [...checkList];
			const jsonTemp = JSON.parse(temp);
			console.log('jsonTemp', jsonTemp);
			copy[0].state = jsonTemp.is_adult;
			copy[1].state = jsonTemp.is_near_veterinary;
			copy[2].state = jsonTemp.is_agreed_housemate;
			copy[3].state = jsonTemp.is_experience_defecate;
			copy[4].state = jsonTemp.is_knowledge_sanitation;
			setCheckList(copy);
			setData({
				...data,
				protect_act_checklist: {
					is_adult: jsonTemp.is_adult,
					is_near_veterinary: jsonTemp.is_near_veterinary,
					is_agreed_housemate: jsonTemp.is_agreed_housemate,
					is_experience_defecate: jsonTemp.is_experience_defecate,
					is_knowledge_sanitation: jsonTemp.is_knowledge_sanitation,
				},
			});
		}
	}, [temp]);

	//임시저장된 자료가 로컬에 존재한다면 Temp에 할당
	React.useEffect(() => {
		_loadData = async () => {
			try {
				await AsyncStorage.getItem('tempData_applyCompanionC', (err, res) => {
					res != null ? setTemp(res) : null;
				});
			} catch (error) {
				alert(error);
			}
		};
		_loadData();
	});

	//임시저장 버튼 클릭
	const tempSave = () => {
		AsyncStorage.setItem('tempData_applyCompanionC', JSON.stringify(data.protect_act_checklist));
	};

	//각 항목에 대한 체크함수
	const getCheckList = (item, index, state) => {
		let copy = data.protect_act_checklist;
		switch (index) {
			case 0: {
				copy.is_adult = state;
				break;
			}
			case 1: {
				copy.is_near_veterinary = state;
				break;
			}
			case 2: {
				copy.is_agreed_housemate = state;
				break;
			}
			case 3: {
				copy.is_experience_defecate = state;
				break;
			}
			case 4: {
				copy.is_knowledge_sanitation = state;
				break;
			}
		}
		setData({...data, protect_act_checklist: copy});
	};

	//다음버튼클릭
	const goToNextStep = () => {
		props.route.name == 'ApplyProtectActivityC' ? navigation.push('ApplyProtectActivityD', data) : navigation.push('ApplyAnimalAdoptionD', data);
	};

	// [임시] - Async자료 삭제
	const aa = () => {
		AsyncStorage.removeItem('tempData_applyCompanionC');
	};

	return (
		<View style={[login_style.wrp_main, applyCompanionC.container]}>
			{/* StageBar */}
			<View style={[temp_style.stageBar, applyCompanionC.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={3} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			<View style={[temp_style.stageBar, applyCompanionC.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>현재의 생활에 대해 체크해주세요.</Text>
			</View>
			<View style={[temp_style.assignCheckList, applyCompanionC.assignCheckList]}>
				<AssignCheckList onCheck={(item, index, state) => getCheckList(item, index, state)} items={checkList} />
			</View>
			<View style={[applyCompanionC.btnContainer]}>
				<View style={[btn_style.btn_w176, applyCompanionC.btn_w176]}>
					<AniButton btnStyle={'border'} btnLayout={btn_w176} btnTitle={'뒤로'} onPress={() => navigation.goBack()} />
				</View>
				<View style={[btn_style.btn_w176, applyCompanionC.btn_w176]}>
					<AniButton btnStyle={'border'} btnLayout={btn_w176} btnTitle={'임시저장'} onPress={tempSave} />
				</View>
				<View style={[btn_style.btn_w176, applyCompanionC.btn_w176]}>
					<AniButton btnLayout={btn_w176} btnTitle={'다음'} onPress={goToNextStep} />
				</View>
			</View>
		</View>
	);
};
