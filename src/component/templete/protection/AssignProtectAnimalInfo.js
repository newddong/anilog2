import React from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {btn_w226} from 'Atom/btn/btn_style';
import {login_style, btn_style, temp_style, progressbar_style, assignProtectAnimal_style} from 'Templete/style_templete';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Stagebar from 'Molecules/info/Stagebar';
import AniButton from 'Molecules/button/AniButton';
import {useNavigation} from '@react-navigation/core';
import Modal from 'Component/modal/Modal';
import {PET_YEAR, PET_MONTH} from 'Root/i18n/msg';
import {stagebar_style} from 'Organism/style_organism copy';
import {CommonActions} from '@react-navigation/native';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import Input30 from 'Molecules/input/Input30';
import {assignShelterAnimal} from 'Root/api/shelterapi';
import {Arrow_Down_GRAY10} from 'Root/component/atom/icon';

export default AssignProtectAnimalInfo = ({route}) => {
	// console.log('Assing', route.params);
	const navigation = useNavigation();
	const [btnOn, setBtnOn] = React.useState(true);
	const [data, setData] = React.useState({
		...route.params,
		protect_animal_estimate_age: year + '년 ' + month + '개월',
		// protect_animal_estimate_month: PET_MONTH[0],
		protect_animal_weight: '',
		//AssignPetInfoA 에서는 UserObject 반려동물 등록에 맞춘 컬럼명으로 지정되어 있으므로 이를 Protect_animal로 처리
		protect_animal_sex: route.params.pet_sex,
		protect_animal_species: route.params.pet_species,
		protect_animal_species_detail: route.params.pet_species_detail,
		protect_animal_neutralization: route.params.pet_neutralization,
		//요기까지.
	});

	const [year, setYear] = React.useState(PET_YEAR[0]);
	const [month, setMonth] = React.useState(PET_MONTH[0]);

	React.useEffect(() => {
		setData({...data, protect_animal_estimate_age: year == 0 ? month + '개월' : year + '년 ' + month + '개월'});
	}, [year, month]);

	//체중 Value 변동 시 실행
	const onChangeKg = kg => {
		setData({...data, protect_animal_weight: kg});
	};

	//등록 버튼 => 모달에서 '새 글 작성' 클릭
	const goToWriteAidRequest = animalData => {
		Modal.close();
		navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [
					{name: 'ShelterMenu'},
					{
						name: 'WriteAidRequest',
						params: {data: animalData},
					},
				],
			}),
		);
		// props.navigation.reset({index: 1, data: data, routes: [{name: 'ShelterMenu'}, {name: 'WriteAidRequest'}]});
	};

	//등록 버튼 => 모달에서 '취소' 클릭
	const goToShelterMenu = () => {
		Modal.close();
		navigation.push('ShelterMenu');
	};

	const registerProtectPet = () => {
		Modal.popProtectPetDetails(
			data,
			() => {
				assignShelterAnimal(
					data,
					result => {
						console.log(`assignShelterAnimal result.ms:${JSON.stringify(result.msg)}`);
						Modal.popTwoBtn('보호 동물이 등록되었습니다. \n바로 보호요청 글을 작성하시겠습니까?', '아니오', '새 글 작성', goToShelterMenu, () =>
							goToWriteAidRequest(result.msg),
						);
					},
					err => {
						console.log('assignShelterAnimal / err', err);
					},
				);
			},
			() => console.log('취소'),
		);
	};

	//다음 버튼 클릭
	const gotoNextStep = () => {
		// console.log('data At Last', data);
		//컨펌하는 복합모달 제작완료 후 붙일 예정
		registerProtectPet();
	};

	const goBack = () => {
		navigation.goBack();
	};

	const onPressYear = () => {
		Modal.popSelectScrollBoxModal([PET_YEAR], '동물 예상 연령(년)', selectedItem => {
			setYear(selectedItem);
			Modal.close();
		});
	};

	const onPressMonth = () => {
		Modal.popSelectScrollBoxModal([PET_MONTH], '동물 예상 연령(년)', selectedItem => {
			setMonth(selectedItem);
			Modal.close();
		});
	};

	const onSelectYear = (v, i) => {
		console.log('v=>' + v);
		setYear(v);
		// setData({...data, protect_animal_estimate_age: v});
	};

	const onSelectMonth = (v, i) => {
		console.log('v=>' + v);
		setMonth(v);
		// setData({...data, protect_animal_estimate_month: v});
	};

	const weigthValid = e => {
		var regExp = /^[0-9]{1,2}(\.[0-9]{0,1})?$/;
		// var regExp = /^[\D]{1,20}$/;
		setBtnOn(!regExp.test(e));
		return regExp.test(e);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={4} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
				/>
			</View>

			<View style={[temp_style.textMsg_assignProtectAnimal, assignProtectAnimal_style.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>해당 동물의 예상 연령과 체중, 중성화 여부를 적어주세요.</Text>
			</View>

			<View style={[temp_style.inputForm_assignProtectAnimal]}>
				{/* 예상 연령 */}
				<View style={[temp_style.inputForm_assignProtectAnimal_line1]}>
					<View style={assignProtectAnimal_style.width118}>
						<Text style={[txt.noto28]}>예상 연령</Text>
					</View>
					<TouchableOpacity onPress={onPressYear} style={[assignProtectAnimal_style.dropdownSelect_year]}>
						<Text style={[txt.roboto28, assignProtectAnimal_style.dropdownSelect_year_text]}>{year}</Text>
						<Arrow_Down_GRAY10 />
					</TouchableOpacity>
					<Text style={[txt.noto24, assignProtectAnimal_style.text118]}>년</Text>
					<TouchableOpacity onPress={onPressMonth} style={[assignProtectAnimal_style.dropdownSelect_month]}>
						<Text style={[txt.roboto28, assignProtectAnimal_style.dropdownSelect_year_text]}>{month}</Text>
						<Arrow_Down_GRAY10 />
					</TouchableOpacity>
					<Text style={[txt.noto24, assignProtectAnimal_style.text118]}>개월</Text>
				</View>

				{/* 체중 */}
				<View style={[temp_style.inputForm_assignProtectAnimal_line2, assignProtectAnimal_style.inputform]}>
					<View style={assignProtectAnimal_style.width118}>
						<Text style={[txt.noto28, {color: GRAY10}]}>체중</Text>
					</View>
					<View style={[assignProtectAnimal_style.weight]}>
						<Input30
							description="info"
							showmsg={false}
							confirm={true}
							showTitle={false}
							width={206}
							placeholder={'몸무게 입력'}
							showCrossMark={false}
							onChange={onChangeKg}
							value={data.pet_weight}
							validator={weigthValid}
							keyboardType={'numeric'}
							maxLength={4}
							confirm_msg=""
						/>
						<Text style={[txt.noto28, assignProtectAnimal_style.weightText]}>kg</Text>
					</View>
				</View>
			</View>

			<View style={[temp_style.btn_w226_assignProtectAnimal, assignProtectAnimal_style.btn_w226_view_image]}>
				<View style={[btn_style.btn_w226]}>
					<AniButton btnTitle={'뒤로'} btnTheme={'shadow'} btnStyle={'border'} btnLayout={btn_w226} onPress={goBack} />
				</View>
				<View style={[btn_style.btn_w226]}>
					<AniButton btnTitle={'완료'} btnTheme={'shadow'} btnLayout={btn_w226} onPress={gotoNextStep} />
				</View>
			</View>
		</View>
	);
};
