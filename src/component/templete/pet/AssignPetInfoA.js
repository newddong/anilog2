import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {APRI10, GRAY10, GRAY30, GRAY50} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Stagebar from 'Molecules/info/Stagebar';
import AniButton from 'Molecules/button/AniButton';
import {login_style, btn_style, temp_style, progressbar_style} from 'Templete/style_templete';
import RadioBox from 'Molecules/select/RadioBox';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import {FEMALE, MALE, NO, PET_KIND, UNAWARENESS, YES} from 'Root/i18n/msg';
import {stagebar_style} from 'Organism/style_organism copy';
import {getPettypes} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';
import {Arrow_Down_BLACK, Arrow_Down_GRAY10} from 'Root/component/atom/icon';
import ArrowButton from 'Root/component/molecules/button/ArrowButton';
import RadioBoxGroup from 'Root/component/molecules/select/RadioBoxGroup';
import RadioBoxItem from 'Root/component/molecules/select/RadioBoxItem';

export default AssignPetInfoA = props => {
	const navigation = useNavigation();
	const isProtectAnimalRoute = props.route.name == 'AssignProtectAnimalType';
	const isAdoptRegist = props.route.params.isAdoptRegist;
	const params = props.route.params.data;
	// console.log('AssignPetInfoA : ', props.route.params);

	React.useEffect(() => {
		if (isAdoptRegist) {
			setData(props.route.params);
		}
	}, []);

	const [types, setTypes] = React.useState([
		{
			pet_species: [],
			pet_species_detail: [],
		},
	]);

	const [data, setData] = React.useState({
		...props.route.params.data,
		pet_species: isAdoptRegist ? params.pet_species : types[0].pet_species,
		pet_species_detail: isAdoptRegist ? params.pet_species_detail : types[0].pet_species_detail[0],
		type: types[0],
		pet_sex: isAdoptRegist ? params.pet_sex : 'male',
		pet_neutralization: isAdoptRegist ? params.pet_neutralization : 'unknown',
		pet_birthday: '',
		pet_weight: isAdoptRegist ? params.pet_weight : '',
	});

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				setTypes(types.msg);
				if (isAdoptRegist) {
					setData({...data, pet_species: params.pet_species, type: types.msg[0], pet_species_detail: params.pet_species_detail});
				} else {
					setData({...data, pet_species: types.msg[0].pet_species, type: types.msg[0], pet_species_detail: types.msg[0].pet_species_detail[0]});
				}
			},
			err => Modal.alert(err),
		);
	}, []);

	//성별 선택
	const onSelectGender = item => {
		switch (item) {
			case 0:
				setData({...data, pet_sex: 'male'});
			case 1:
				setData({...data, pet_sex: 'female'});
			case 2:
				setData({...data, pet_sex: 'unknown'});
			default:
				break;
		}
	};

	//중성화 RadioBox 선택
	const onSelectNeutralization = item => {
		let neutralization = 0;
		if (item == 0) neutralization = 'yes';
		else if (item == 1) neutralization = 'no';
		else neutralization = 'unknown';
		setData({...data, pet_neutralization: neutralization});
	};

	const onPressPetSpecies = () => {
		Modal.popSelectScrollBoxModal([types.map(v => v.pet_species)], '동물 종 선택', selectedItem => {
			const findItem = types.find(e => e.pet_species == selectedItem);
			const pet_spcies_detail = findItem.pet_species_detail;
			setData({...data, pet_species: selectedItem, pet_species_detail: pet_spcies_detail[0]});
			Modal.close();
		});
	};

	const onPressPetSpeciesDetail = () => {
		const findItem = types.find(e => e.pet_species == data.pet_species);
		const pet_spcies_detail = findItem.pet_species_detail;
		Modal.popSelectScrollBoxModal([pet_spcies_detail], '동물 종 선택', selectedItem => {
			setData({...data, pet_species_detail: selectedItem});
			Modal.close();
		});
	};

	const getDefaultGender = () => {
		let result = 0;
		if (isAdoptRegist) {
			params.pet_sex == 'male' ? (result = 0) : (result = 1);
			return result;
		} else return result;
	};

	const getDefaultNeutralization = () => {
		if (isAdoptRegist) {
			if (params.pet_neutralization == 'unknown') {
				return 2;
			} else if (params.pet_neutralization == 'yes') {
				return 0;
			} else return 1;
		} else {
			return 0;
		}
	};

	//다음버튼
	const gotoNextStep = () => {
		// console.log('data, ', data.pet_species_detail);
		props.route.name == 'AssignProtectAnimalType'
			? props.navigation.navigate('AssignProtectAnimalAge', data)
			: props.navigation.navigate('AssignPetInfoB', {data: data, isAdoptRegist: isAdoptRegist});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={isProtectAnimalRoute ? 3 : 2} //현재 단계를 정의
					maxstage={isProtectAnimalRoute ? 4 : 3} //전체 단계를 정의
					width={640 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			<View style={[assignPetInfo_style.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>반려 동물의 종과 성별, 중성화 여부를 알려주세요.</Text>
			</View>
			<View style={[assignPetInfo_style.inputForm]}>
				{/* 분류 */}
				<View style={[assignPetInfo_style.kindCont]}>
					<Text style={[temp_style.text_assignPetInfo, txt.noto28, {marginTop: 30 * DP}]}>분류</Text>
					<View>
						<TouchableOpacity onPress={onPressPetSpecies} style={[assignPetInfo_style.dropdownSelect_depth1, {alignSelf: 'flex-start'}]}>
							<View style={[assignPetInfo_style.petKind]}>
								<Text style={[txt.noto28, assignPetInfo_style.petKind_text]}>{data.pet_species}</Text>
								<Arrow_Down_BLACK />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onPressPetSpeciesDetail}
							style={[assignPetInfo_style.dropdownSelect_depth1, {alignSelf: 'flex-start', marginTop: 20 * DP}]}>
							<View style={[assignPetInfo_style.petKind]}>
								<Text style={[txt.noto28, assignPetInfo_style.petKind_text]}>{data.pet_species_detail}</Text>
								<Arrow_Down_BLACK />
							</View>
						</TouchableOpacity>
					</View>
				</View>

				{/* 성별 */}
				<View style={[assignPetInfo_style.line2]}>
					<Text style={[temp_style.text_assignPetInfo, txt.noto28]}>성별</Text>
					<View style={[assignPetInfo_style.tabSelectFilled_Type1]}>
						<TabSelectFilled_Type1 items={[MALE, FEMALE, '모름']} width={170} onSelect={onSelectGender} defaultIndex={getDefaultGender()} />
					</View>
				</View>

				{/* 중성화 */}
				<View style={[assignPetInfo_style.line3]}>
					<Text style={[temp_style.text_assignPetInfo, txt.noto28]}>중성화</Text>
					<View style={[assignPetInfo_style.tabSelectFilled_Type1]}>
						{/* <RadioBox items={[YES, NO, UNAWARENESS]} onSelect={onSelectNeutralization} defaultSelect={getDefaultNeutralization()} /> */}
						<RadioBoxGroup style={{width: 400 * DP, flexDirection: 'row'}} onSelect={(item, index) => console.log(item, index)}>
							<RadioBoxItem style={{width: 170 * DP}}>{YES}</RadioBoxItem>
							<RadioBoxItem style={{width: 170 * DP}}>{NO}</RadioBoxItem>
							<RadioBoxItem style={{width: 170 * DP}}>{UNAWARENESS}</RadioBoxItem>
						</RadioBoxGroup>
					</View>
				</View>
			</View>
			{/* 버튼 */}
			<View style={[assignPetInfo_style.btn_w226_viewA]}>
				<ArrowButton direction={'back'} onPress={() => navigation.goBack()} />
				<ArrowButton direction={'forward'} onPress={gotoNextStep} />
			</View>
		</View>
	);
};

const assignPetInfo_style = StyleSheet.create({
	textMsg: {
		width: 694 * DP,
		height: 36 * DP,
		marginTop: 12 * DP,
	},
	inputForm: {
		marginTop: 70 * DP,
	},
	kindCont: {
		flexDirection: 'row',
		width: 694 * DP,
		// height: 82 * DP,
		// alignItems: 'center',
	},
	dropdownSelect_depth1: {
		width: 550 * DP,
		height: 104 * DP,
		marginLeft: 12 * DP,
		borderRadius: 30 * DP,
		justifyContent: 'center',
		backgroundColor: GRAY50,
	},
	petKind: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	petKind_text: {
		width: 442 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
	dropdownSelect_depth2: {
		marginLeft: 24 * DP,
	},
	line2: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
		marginTop: 60 * DP,
	},
	tabSelectFilled_Type1: {
		marginLeft: 12 * DP,
	},
	line3: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 46 * DP,
		alignItems: 'center',
		marginTop: 60 * DP,
	},
	btn_w226_viewA: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 694 * DP,
		marginTop: 110 * DP,
	},
	btn_w226: {
		marginLeft: 202 * DP,
	},
	datePicker_depth1: {
		marginLeft: 16 * DP,
	},
	text218: {
		marginTop: 46 * DP,
		marginLeft: 12 * DP,
	},
	inputNoTitle: {
		marginLeft: 16 * DP,
	},
	text68: {
		marginLeft: 16 * DP,
	},
	btn_w226_viewB: {
		marginTop: 130 * DP,
	},

	pet_species_detail: {
		width: 292 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	pet_species_detail_text: {
		minWidth: 208 * DP,
		// width: 208 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
});
