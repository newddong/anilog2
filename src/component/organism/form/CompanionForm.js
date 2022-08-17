import React from 'react';
import {Text, View} from 'react-native';
import {getPettypes} from 'Root/api/userapi';
import {APRI10, GRAY10, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {COMPANION_DURATION, COMPANION_STATUS, PET_AGE, PET_KIND} from 'Root/i18n/msg';
import {Cross52, CrossMark_Filled} from 'Atom/icon';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import {companionForm} from 'Organism/style_organism copy';
import DropdownSelect from 'Root/component/molecules/dropdown/DropdownSelect';
import Modal from 'Root/component/modal/Modal';
import SelectInput from 'Root/component/molecules/button/SelectInput';

/**
 *
	반려동물등록 
 * @param {void} props.onSelectSpecies - 종 선택  
 * @param {void} props.onSelectAge - 나이 선택
 * @param {void} props.onSelectDuration - 기간 선택
 * @param {void} props.onSelectStatus - 상태 선택
 * @param {void} props.onDelete - 삭제
 * 
 * 
 */

export default CompanionForm = props => {
	const [petTypes, setPetTypes] = React.useState(['동물종류']);
	const [selectedPetTypes, setSelectedPetTypes] = React.useState('동물종류');
	const [selectedYear, setSelectedYear] = React.useState(PET_AGE[0]);
	const [selectedDuration, setSelectedDuration] = React.useState(COMPANION_DURATION[0]);
	const [selectedStatus, setSelectedStatus] = React.useState(COMPANION_STATUS[0]);

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
	}, []);
	//종 선택 콜백
	const onSelectSpecies = (v, i) => {
		props.onSelectSpecies(v, i);
	};

	//나이 선택 콜백
	const onSelectAge = (v, i) => {
		props.onSelectAge(v, i);
	};

	//반려생활 기간 콜백
	const onSelectDuration = (v, i) => {
		props.onSelectDuration(v, i);
	};

	//반려생활 상태 콜백
	const onSelectStatus = (v, i) => {
		props.onSelectStatus(v, i);
	};

	const onPressPetTypes = () => {
		Modal.popSelectScrollBoxModal([petTypes], '동물 종 선택', selectedItem => {
			setSelectedPetTypes(selectedItem);
			Modal.close();
			props.onSelectSpecies(selectedItem);
		});
	};

	const onPressYear = () => {
		Modal.popSelectScrollBoxModal([PET_AGE], '동물 종 선택', selectedItem => {
			setSelectedYear(selectedItem);
			Modal.close();
			props.onSelectAge(selectedItem);
		});
	};

	const onPressDuration = () => {
		Modal.popSelectScrollBoxModal([COMPANION_DURATION], '동물 종 선택', selectedItem => {
			setSelectedDuration(selectedItem);
			Modal.close();
			props.onSelectDuration(selectedItem);
		});
	};

	const onPressStatus = () => {
		Modal.popSelectScrollBoxModal([COMPANION_STATUS], '동물 종 선택', selectedItem => {
			setSelectedStatus(selectedItem);
			Modal.close();
			props.onSelectStatus(selectedItem);
		});
	};

	return (
		<View style={[companionForm.container]}>
			<View style={[companionForm.insideContainer]}>
				<View style={[companionForm.upperMenu]}>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: APRI10}]}>종</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<SelectInput onPressInput={onPressPetTypes} width={202} value={selectedPetTypes} />
						</View>
					</View>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: APRI10}]}>나이</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<SelectInput onPressInput={onPressYear} width={202} value={selectedYear} />
						</View>
					</View>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: APRI10}]}>반려생활 기간</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<SelectInput onPressInput={onPressDuration} width={202} value={selectedDuration} />
						</View>
					</View>
				</View>
				<View style={[companionForm.lowerMenu]}>
					<SelectInput onPressInput={onPressStatus} width={654} value={selectedStatus} />
				</View>
			</View>
			<View style={{position: 'absolute', right: 0, top: -5, borderRadius: 50, backgroundColor: GRAY40, zIndex: 1}}>
				<CrossMark_Filled onPress={() => props.onDelete()} />
			</View>
		</View>
	);
};

CompanionForm.defaultProps = {
	data: {
		companion_pet_species: PET_KIND[0],
		companion_pet_age: PET_AGE[0],
		companion_pet_period: COMPANION_DURATION[0],
		companion_pet_current_status: COMPANION_STATUS[0],
		temp: false,
	},
	onDelete: e => console.log(e),
};

// value: null,
// itemList: [1, 2, 3, 4], //DropDown될 리스트 목록
// defaultIndex: 0, // DropDown Default상태의 index
// width: 180, //Select+Text 부분의 width Default=180(5글자)
// onChange: e => console.log(e),
