import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {btn_w226} from 'Atom/btn/btn_style';
import {login_style, btn_style, temp_style, progressbar_style, assignProtectAnimal_style, assignProtectAnimalDate} from './style_templete';
import {useNavigation} from '@react-navigation/core';
import Stagebar from 'Molecules/info/Stagebar';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {PLEASE_GIVE_ME_DATE_AND_PLACE, BTN_BACK, BTN_NEXT} from 'Root/i18n/msg';
import DatePicker from 'Molecules/select/DatePicker';
import Input24 from 'Molecules/input/Input24';
import AniButton from 'Molecules/button/AniButton';
import {stagebar_style} from 'Organism/style_organism';

export default AssignProtectAnimalDate = props => {
	// console.log(props.route.params);
	const navigation = useNavigation();
	const [data, setData] = React.useState({
		...props.route.params,
		protect_animal_rescue_date: '',
		protect_animal_rescue_location: '',
	});

	//구조날짜 값 변경 콜백
	const onDateChange = date => {
		setData({...data, protect_animal_rescue_date: date});
	};

	//구조장소 값 변경 콜백
	const onChangeLocation = location => {
		setData({...data, protect_animal_rescue_location: location});
	};

	//다음 버튼 클릭
	const gotoNextStep = () => {
		console.log('Before MoveOut Data : ', data);
		navigation.push('AssignProtectAnimalType', {data: data, route: 'AssignProtectAnimalType'});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={2} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			<View style={[assignProtectAnimal_style.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>{PLEASE_GIVE_ME_DATE_AND_PLACE}</Text>
			</View>

			<View style={[temp_style.inputForm_assignProtectAnimal]}>
				{/* 구조날짜 */}
				<View style={[temp_style.inputForm_assignProtectAnimal_line1]}>
					<Text style={txt.noto28}>구조날짜</Text>
					<View style={assignProtectAnimal_style.marginLeft16}>
						<DatePicker width={520} onDateChange={onDateChange} future={false} />
					</View>
				</View>

				{/* 구조장소2 */}
				<View style={[temp_style.inputForm_assignProtectAnimal_line1, assignProtectAnimal_style.inputform]}>
					<Text style={txt.noto28}>구조장소</Text>
					<View style={assignProtectAnimal_style.marginLeft16}>
						<Input24
							width={520}
							value={data.protect_animal_rescue_location}
							showmsg={false}
							onChange={onChangeLocation}
							descriptionType={'none'}
							placeholder={'구조장소를 적어주세요.'}
							value={data.protect_animal_rescue_location}
						/>
					</View>
				</View>
			</View>

			<View style={[temp_style.btn_w226_assignProtectAnimal, assignProtectAnimal_style.btn_w226_view_image]}>
				<AniButton onPress={() => navigation.goBack()} btnLayout={btn_w226} btnTitle={BTN_BACK} btnStyle={'border'} />
				<AniButton
					onPress={gotoNextStep}
					disable={data.protect_animal_rescue_date == '' || data.protect_animal_rescue_location == ''}
					btnLayout={btn_w226}
					btnTitle={BTN_NEXT}
				/>
			</View>
		</View>
	);
};
