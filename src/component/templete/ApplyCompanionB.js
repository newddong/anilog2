import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {getPettypes} from 'Root/api/userapi';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {COMPANION_DURATION, COMPANION_STATUS, PET_AGE, PET_KIND} from 'Root/i18n/msg';
import {btn_w176} from 'Atom/btn/btn_style';
import {AddItem64} from 'Atom/icon';
import Modal from '../modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import Stagebar from 'Molecules/info/Stagebar';
import CompanionFormList from 'Organism/list/CompanionFormList';
import {stagebar_style} from 'Organism/style_organism';
import {applyCompanionB, login_style, temp_style, applyCompanionC, btn_style} from './style_templete';

export default ApplyCompanionC = props => {
	const navigation = useNavigation();

	const [data, setData] = React.useState({
		...props.route.params,
		protect_act_companion_history: [],
	});
	console.log('data', data);
	const isProtect = props.route.name == 'ApplyProtectActivityB';
	const [isTempDataAdded, setIsTempDataAdded] = React.useState(false);
	const [companionList, setCompanionList] = React.useState([]);
	const [tempData, setTempData] = React.useState([]); //임시저장 정보가 들어갈 컨테이너
	const [petTypes, setPetTypes] = React.useState(['동물종류']);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				const species = [...petTypes];
				types.msg.map((v, i) => {
					species[i + 1] = v.pet_species;
				});
				setPetTypes(species);
			},
			err => Modal.alert(err),
		);
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
	}, []);

	React.useEffect(() => {
		setData({...data, protect_act_companion_history: companionList});
	}, [companionList]);

	//임시저장 버튼 클릭
	const tempSave = () => {
		AsyncStorage.setItem('tempData_applyCompanionB', JSON.stringify(data.protect_act_companion_history));
	};

	// //임시저장한 값을 AsyncStorage에서 호출
	// const _retrieveData = async () => {
	// 	try {
	// 		await AsyncStorage.getItem('tempData_applyCompanionB', (err, res) => {
	// 			res != null ? setTempData(res) : null
	// 		})
	// 	} catch (error) {
	// 		console.log('error', JSON.stringify(error))
	// 	}
	// };

	//반려 생활 추가
	const onPressAddCompanion = () => {
		let copy = [...companionList];
		if (tempData.length > 0 && !isTempDataAdded) {
			tempData.map((v, i) => {
				copy.push(tempData[i]);
			});
			setIsTempDataAdded(true);
		}
		//반려 생활 추가를 누를 시 모두 첫번째 드롭다운 선택 상태인 CompanionForm이 추가됨
		copy.push({
			companion_pet_species: petTypes[0],
			companion_pet_age: PET_AGE[0],
			companion_pet_period: COMPANION_DURATION[0],
			companion_pet_current_status: 'living',
		});
		setCompanionList(copy);
	};

	//itemIndex번째 반려동물의 '종' 선택 콜백, value에는 선택한 item의 String , selectedIndex에는 선택한 Item의 Index가 담겨있음
	const onSelectSpecies = (value, selectedIndex, itemIndex) => {
		let copy = [...companionList];
		copy[itemIndex] = {
			...copy[itemIndex],
			companion_pet_species: value,
		};
		setCompanionList(copy);
	};

	//itemIndex번째 반려동물의 '나이' 선택 콜백, value에는 선택한 item의 String , selectedIndex에는 선택한 Item의 Index가 담겨있음
	const onSelectAge = (value, selectedIndex, itemIndex) => {
		let copy = [...companionList];
		copy[itemIndex] = {
			...copy[itemIndex],
			companion_pet_age: value,
		};
		setCompanionList(copy);
	};

	//itemIndex번째 반려동물의 '반려생활 기간' 선택 콜백, value에는 선택한 item의 String , selectedIndex에는 선택한 Item의 Index가 담겨있음
	const onSelectPeriod = (value, selectedIndex, itemIndex) => {
		let copy = [...companionList];
		copy[itemIndex] = {
			...copy[itemIndex],
			companion_pet_period: value,
		};
		setCompanionList(copy);
	};

	//itemIndex번째 반려동물의 '반려생활 상태' 선택 콜백, value에는 선택한 item의 String , selectedIndex에는 선택한 Item의 Index가 담겨있음
	const onSelectStatus = (value, selectedIndex, itemIndex) => {
		console.log('va', value);
		let copy = [...companionList];
		let status = () => {
			if (selectedIndex == 0) {
				return 'living';
			} else if (selectedIndex == 1) {
				return 'adopted';
			} else if (selectedIndex == 2) {
				return 'died';
			}
		};
		copy[itemIndex] = {
			...copy[itemIndex],
			companion_pet_current_status: status(),
		};
		setCompanionList(copy);
	};

	//반려 생활 삭제 마크 클릭
	const onDelteCompanion = index => {
		let copy = [...companionList];
		copy.splice(index, 1);
		setCompanionList(copy);
	};

	//다음버튼 클릭
	const goToNextStep = () => {
		console.log('data', data.protect_act_companion_history);
		const isSelectedCompanionKind = !data.protect_act_companion_history.some(e => e.companion_pet_species == '동물종류');
		// console.log('isSelectedCompanionKind', isSelectedCompanionKind);
		if (isSelectedCompanionKind) {
			//반려생활추가 목록 중 동물종류가 올바르게 선택되지 않았을 경우
			props.route.name == 'ApplyProtectActivityB' ? navigation.push('ApplyProtectActivityC', data) : navigation.push('ApplyAnimalAdoptionC', data);
		} else {
			Modal.popOneBtn('동물의 종은 반드시 선택해주셔야 합니다!', '확인', () => Modal.close());
		}
		// props.route.name == 'ApplyProtectActivityB' ? navigation.push('ApplyProtectActivityC', data) : navigation.push('ApplyAnimalAdoptionC', data);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
				<View style={{alignItems: 'center', flex: 1}}>
					{/* StageBar */}
					<View style={[temp_style.stageBar, applyCompanionB.stageBar]}>
						<Stagebar
							backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
							insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
							current={2} //현재 단계를 정의
							maxstage={4} //전체 단계를 정의
							width={600 * DP} //bar의 너비
							textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
						/>
					</View>
					<View style={[temp_style.stageBar, applyCompanionB.textMsg]}>
						<Text style={[txt.noto24, {color: GRAY10}]}>지금까지 함께 한 반려동물에 대해 알려주세요.</Text>
					</View>
					{/* 반려동물 정보 박스 */}
					<View style={[temp_style.companionFormList, applyCompanionB.inputForm]}>
						<CompanionFormList
							items={companionList}
							onSelectSpecies={(v, i, index) => onSelectSpecies(v, i, index)}
							onSelectAge={(v, i, index) => onSelectAge(v, i, index)}
							onSelectDuration={(v, i, index) => onSelectPeriod(v, i, index)}
							onSelectStatus={(v, i, index) => onSelectStatus(v, i, index)}
							onDelete={index => onDelteCompanion(index)}
							// tempData={tempData}
						/>
					</View>

					{/* 반려생활 추가 */}
					<TouchableOpacity onPress={onPressAddCompanion} style={[applyCompanionB.addPetBtnView]}>
						<AddItem64 />
						<View style={[applyCompanionB.addPetTextView]}>
							<Text style={[txt.noto30, {color: APRI10}]}>반려 생활 추가</Text>
							{/* <TouchableOpacity onPress={deleteAs}>
							<Text style={[txt.noto30, { color: APRI10 }]}>어싱크 체크</Text>
						</TouchableOpacity> */}
						</View>
					</TouchableOpacity>
					{/* 3개 버튼 */}
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
			</ScrollView>
		</View>
	);
};
