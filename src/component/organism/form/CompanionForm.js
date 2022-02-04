import React from 'react';
import {Text, View} from 'react-native';
import {getPettypes} from 'Root/api/userapi';
import {GRAY10, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {COMPANION_DURATION, COMPANION_STATUS, PET_AGE, PET_KIND} from 'Root/i18n/msg';
import {Cross52, CrossMark_Filled} from 'Atom/icon';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import {companionForm} from 'Organism/style_organism';

/**
 *
 * @param {{
 * onSelectSpecies : void,
 * onSelectAge:void,
 * onSelectDuration :void,
 * onSelectStatus :void,
 * onDelete : void,
 * }} props
 */
export default CompanionForm = props => {
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

	return (
		<View style={[companionForm.container]}>
			<View style={[companionForm.insideContainer]}>
				<View style={[companionForm.upperMenu]}>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: GRAY10}]}>종</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<NormalDropDown
								menu={petTypes}
								onSelect={(v, i) => onSelectSpecies(v, i)}
								// defaultIndex={isTempData ? species_index : 0}
							/>
						</View>
					</View>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: GRAY10}]}>나이</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<NormalDropDown
								menu={PET_AGE}
								onSelect={(v, i) => onSelectAge(v, i)}
								// defaultIndex={isTempData ? age_index : 0}
							/>
						</View>
					</View>
					<View style={[companionForm.inputItem]}>
						<View style={[companionForm.fieldName]}>
							<Text style={[txt.noto24, {color: GRAY10}]}>반려생활 기간</Text>
						</View>
						<View style={[companionForm.dropDownSelect]}>
							<NormalDropDown
								menu={COMPANION_DURATION}
								onSelect={(v, i) => onSelectDuration(v, i)}
								// defaultIndex={isTempData ? period_index : 0}
							/>
						</View>
					</View>
				</View>
				<View style={[companionForm.lowerMenu]}>
					<NormalDropDown
						menu={COMPANION_STATUS}
						onSelect={(v, i) => onSelectStatus(v, i)}
						width={654}
						// defaultIndex={isTempData ? status_index : 0}
					/>
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
