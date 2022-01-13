import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_PLACEHOLDER, MAINCOLOR, WHITE} from 'Screens/color';
import {INPUT_DIRECT, MALE, FEMALE, REQ_PET_TYPE_SEX, PET_TYPE, PET_SEX, BTN_BACK, BTN_NEXT,CHOICE_TYPE,EMAILCO} from 'Screens/msg';
import {DownBracketBlack, DownBracket, BtnWriteFeed, Progressbar_2_of_5, CancelInput} from 'Asset/image';
import {txt, lo, btn, form, tab, tab_filled_color, assign_profile, petTypeSelect} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import Stagebar from 'Screens/common/stagebar';

export default Assign_pet_step2 = props => {
	const [data, setData] = React.useState({...props.route.params.petData, sex: MALE, animalKind: '개',animalKindDetail:''});

	const tabSelect = menu => () => {
		switch (menu) {
			case MALE:
				setData({...data, sex: MALE});
				break;
			case FEMALE:
				setData({...data, sex: FEMALE});
				break;
		}
	};

	const moveNextStage = () => {
		props.navigation.push('Assign_pet_step3', {title: '반려동물 등록', petData: data, navfrom:props.route.params.navfrom});
	};

	const petType = ['개', '고양이', '새', '햄스터', '이구아나', INPUT_DIRECT];

	const selectPetType = e => {
		if (e === INPUT_DIRECT) {
		} else {
			setData({...data, animalKind: e});
		}
	};

	const selectPetDetailType = e => {};
	const onInputPetDetailType = e=> {
		setData({...data,animalKindDetail:e.nativeEvent.text});

	}

	const test = () => {
		console.log(data);
	}

	//animation setting


	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<Stagebar
					style={assign_profile.container_stagebar}
					width={600 * DP}
					backgroundBarStyle={assign_profile.stagebar_backgroundBar}
					insideBarStyle={assign_profile.stagebar_insideBar}
					textStyle={[txt.roboto24, {color: GRAY}]}
					current={2}
					maxstage={3}
				/>
				<TouchableWithoutFeedback onPress={test}>
				<Text style={[txt.noto24, txt.gray, {lineHeight: 36 * DP, marginTop: 12 * DP}]}>{REQ_PET_TYPE_SEX}</Text>
				</TouchableWithoutFeedback>
				<View style={lo.petTypeSelection}>
					<Text style={[txt.noto28, {marginRight: 10 * DP, color: GRAY}]}>{PET_TYPE}</Text>
					<View style={petTypeSelect.cntr_dropdown}>
						<View style={petTypeSelect.cntr_select_animal_kind}>
							<Dropdown
								style={petTypeSelect.select_animal_kind}
								dropdownContainerStyle={[petTypeSelect.select_animal_kind_dropdown_container]}
								data={petType}
								dropItemStyle={petTypeSelect.select_animal_kind_item}
								dropItemTxtStyle={txt.noto28}
								listBackgroundStyle={[petTypeSelect.select_animal_kind_dropdown_list_background]}
								listContainerStyle={petTypeSelect.select_animal_kind_dropdown_list_container}
								onSelect={selectPetType}
								onSelectNotClose={false}
								onOpen={() => {
								}}
								onClose={() => {
								}}
								animation
								component={
									<View style={petTypeSelect.select_animal_kind}>
										<Text style={[txt.noto28, petTypeSelect.select_animal_kind_text]}>{data.animalKind}</Text>
										<SvgWrapper
											style={[petTypeSelect.select_animal_kind_bracket]}
											svg={<DownBracket fill={'#999999'} />}
										/>
									</View>
								}
							/>
							{/* <FormTxtInput
								inputStyle={[form.email_domain, txt.noto28, {width: 450 * DP}]}
								placeholder={CHOICE_TYPE}
								placeholderTextColor={GRAY_PLACEHOLDER}
								onChange={emailCompany}
								value={EMAILCO}
									/> */}
						</View>
						<View style={petTypeSelect.cntr_select_animal_detail_type}>
							{false?<Dropdown
								style={[petTypeSelect.select_animal_kind, {width: 292 * DP}]}
								dropdownContainerStyle={[petTypeSelect.select_animal_kind_dropdown_container]}
								data={petType}
								dropItemStyle={petTypeSelect.select_animal_kind_item}
								dropItemTxtStyle={txt.noto28}
								listBackgroundStyle={[petTypeSelect.select_animal_kind_dropdown_list_background]}
								listContainerStyle={petTypeSelect.select_animal_kind_dropdown_list_container}
								onSelect={selectPetDetailType}
								onSelectNotClose={false}
								onOpen={() => {
								}}
								onClose={() => {
								}}
								animation
								component={
									<View style={[petTypeSelect.select_animal_kind, {width: 292 * DP}]}>
										<Text style={[txt.noto28, petTypeSelect.select_animal_kind_text]}>{data.animalKind}</Text>
										<SvgWrapper
											style={[petTypeSelect.select_animal_kind_bracket]}
											svg={<DownBracket fill={'#999999'} />}
										/>
									</View>
								}
							/>:
							<FormTxtInput
								style={form.input_pet_detail_type}
								inputStyle={[form.input_pet_detail_type,txt.noto28]}
								placeholder={'세부정보'}
								placeholderTextColor={GRAY_PLACEHOLDER}
								onChange={onInputPetDetailType}
								value={data.animalKindDetail}
							/>}
						</View>
					</View>
				</View>
				<View style={lo.petSexSelection}>
					<Text style={[txt.noto28, {marginRight: 10 * DP, color: GRAY}]}>{PET_SEX}</Text>
					<View style={tab_filled_color.cntr_tab}>
						<TabButton txt={MALE} onPress={tabSelect(MALE)} select={data.sex === MALE} />
						<TabButton txt={FEMALE} onPress={tabSelect(FEMALE)} select={data.sex === FEMALE} />
					</View>
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 110 * DP}}>
					<TouchableWithoutFeedback onPress={props.navigation.goBack}>
						<View style={[btn.confirm_filled_empty, btn.shadow]}>
							<Text style={[txt.noto24b, txt.MAINCOLOR]}>{BTN_BACK}</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback onPress={moveNextStage}>
						<View style={[btn.confirm_filled_color, btn.shadow]}>
							<Text style={[txt.noto24b, txt.white]}>{BTN_NEXT}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select ? tab_filled_color.btn_tab : tab_filled_color.btn_tab_notselected}>
				<Text style={props.select ? [txt.noto28b, {color: WHITE}] : [txt.noto28, {color: GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
