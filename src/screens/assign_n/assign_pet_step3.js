import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, WHITE} from 'Screens/color';
import {
	INPUT_DIRECT,
	REQ_INPUT_NUM,
	ADOPTION_TYPE,
	PET_REG_NUM,
	ASSIGN_PET,
	BTN_BACK,
	BTN_NEXT,
	REQ_PET_TYPE_REG_NUM,
} from 'Screens/msg';
import {DownBracket} from 'Asset/image';
import {txt, lo, btn, form, tab, tab_filled_color, assign_profile, petTypeSelect} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import Stagebar from 'Screens/common/stagebar';
import {addPet} from 'Root/api/userapi';

export default Assign_pet_step3 = props => {
	const adoptionType = ['유기 동물 입양', '유기 동물 분양', '온라인 신청 입양', '지인 추천 입양'];
	const [data, setData] = React.useState({...props.route.params.petData, adoptionType: adoptionType[0], animalNo: ''});

	const assignPet = () => {
		if(data.animalNo.length===0)return;
		console.log(data);
		//addingPet
		alert('팻 등록중');
		addPet(data,()=>{
			//successed
			alert('팻 등록 완료');
			props.navigation.navigate(props.route.params.navfrom);
		})
	}


	const selectAdoptionType = e => {
		setData({...data, adoptionType: e});
	};

	const onInputPetNumber = e => {
		console.log(e.nativeEvent.text);
		//TODO:Validation Check Logic (동물등록번호 형식 체크)
		setData({...data,animalNo:e.nativeEvent.text});
	};

	const test = () => {
		console.log(data);
		console.log(props.route.params);
	};

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
					current={3}
					maxstage={3}
				/>
				<TouchableWithoutFeedback onPress={test}>
					<Text style={[txt.noto24, txt.gray, {lineHeight: 36 * DP, marginTop: 12 * DP}]}>{REQ_PET_TYPE_REG_NUM}</Text>
				</TouchableWithoutFeedback>
				<View style={lo.petTypeSelection}>
					<Text style={[txt.noto28, {marginRight: 10 * DP, color: GRAY}]}>{ADOPTION_TYPE}</Text>
					<View style={[petTypeSelect.cntr_dropdown, {width: 464 * DP}]}>
						<Dropdown
							style={[petTypeSelect.select_animal_kind, {width: 464 * DP}]}
							dropdownContainerStyle={[petTypeSelect.select_animal_kind_dropdown_container, {width: 464 * DP}]}
							data={adoptionType}
							dropItemStyle={[petTypeSelect.select_animal_kind_item, {width: 464 * DP}]}
							dropItemTxtStyle={txt.noto28}
							listBackgroundStyle={[
								petTypeSelect.select_animal_kind_dropdown_list_background,
								{width: 464 * DP, height: 300 * DP},
								petKindBtnListAniStyle,
							]}
							listContainerStyle={[petTypeSelect.select_animal_kind_dropdown_list_container, {width: 464 * DP, height: 300 * DP}]}
							onSelect={selectAdoptionType}
							onSelectNotClose={false}
							onOpen={() => {
							}}
							onClose={() => {
							}}
							animation
							component={
								<View style={[petTypeSelect.select_animal_kind, {width: 464 * DP}]}>
									<Text style={[txt.noto28, petTypeSelect.select_animal_kind_text, {width: 392 * DP}]}>{data.adoptionType}</Text>
									<SvgWrapper style={[petTypeSelect.select_animal_kind_bracket]} svg={<DownBracket fill={'#999999'} />} />
								</View>
							}
						/>
					</View>
				</View>
				<View style={lo.petSexSelection}>
					<Text style={[txt.noto28, {marginRight: 10 * DP, color: GRAY}]}>{PET_REG_NUM}</Text>
					<FormTxtInput
						style={form.input_pet_assign_number}
						inputStyle={[form.input_pet_assign_number, txt.noto28]}
						placeholder={REQ_INPUT_NUM}
						placeholderTextColor={GRAY_PLACEHOLDER}
						onChange={onInputPetNumber}
						value={data.animalNo}
					/>
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 110 * DP}}>
					<TouchableWithoutFeedback onPress={props.navigation.goBack}>
						<View style={[btn.confirm_filled_empty, btn.shadow]}>
							<Text style={[txt.noto24b, txt.MAINCOLOR]}>{BTN_BACK}</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback onPress={assignPet}>
						<View style={[btn.confirm_filled_color,data.animalNo.length===0&&{backgroundColor:GRAY_BRIGHT}, btn.shadow]}>
							<Text style={[txt.noto24b, txt.white]}>{ASSIGN_PET}</Text>
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
