import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w176} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import InputLongText from 'Molecules/input/InputLongText';
import Stagebar from 'Molecules/info/Stagebar';
import SelectStat from 'Organism/list/SelectStat';
import {stagebar_style} from 'Root/component/organism/style_organism copy';
import {applyCompanionD, btn_style, login_style, temp_style} from 'Templete/style_templete';

// protect_act_applicant_id : Mongodb_ID(ref:UserObject), //보호활동 신청자

// protect_act_request_article_id : Mongodb_ID(ref:ProtectRequestObject), //동물보호 게시글
// protect_act_request_shelter_id : Mongodb_ID(ref:UserObject), //동물보호 게시글 작성한 보호소

export default ApplyCompanionD = props => {
	const navigation = useNavigation();
	const isProtect = props.route.name == 'ApplyProtectActivityD';

	const [temp, setTemp] = React.useState(''); //임시저장된 data
	const [data, setData] = React.useState({
		...props.route.params,
		protect_act_motivation: '', //보호활동 신청동기
	});
	React.useEffect(() => {
		isProtect ? navigation.setOptions({title: '임시보호 신청'}) : navigation.setOptions({title: '입양 신청'});
	}, []);

	React.useEffect(() => {
		setData({...data, protect_act_motivation: temp});
	}, [temp]);

	//임시저장된 자료가 있다면 호출
	React.useEffect(() => {
		_loadData = async () => {
			try {
				await AsyncStorage.getItem('tempData_applyCompanionD', (err, res) => {
					setTemp(JSON.parse(res));
				});
			} catch (error) {
				alert(error);
			}
		};
		_loadData();
	});

	//임시보호 동기
	const onChangeText = text => {
		setData({...data, protect_act_motivation: text});
	};

	//임시저장
	const temp_save = () => {
		AsyncStorage.setItem('tempData_applyCompanionD', JSON.stringify(data.protect_act_motivation));
	};

	//다음버튼
	const goToNextStep = () => {
		console.log('data Before Next', data);
		props.route.name == 'ApplyProtectActivityD' ? navigation.push('ApplyProtectActivityE', data) : navigation.push('ApplyAnimalAdoptionE', data);
	};

	return (
		<View style={[login_style.wrp_main, applyCompanionD.container]}>
			{/* StageBar */}
			<View style={[temp_style.stageBar, applyCompanionD.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={4} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			<View style={[temp_style.stageBar, applyCompanionD.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>임시보호의 이유나 동기를 500자 이내로 작성해주세요.</Text>
			</View>
			<View style={[temp_style.inputLongText, applyCompanionD.InputLongText]}>
				<InputLongText placeholder={'내용 입력...'} onChange={onChangeText} value={temp == '' ? null : temp} />
			</View>
			<View style={[applyCompanionD.btnContainer]}>
				<View style={[btn_style.btn_w176, applyCompanionD.btn_w176]}>
					<AniButton btnStyle={'border'} btnLayout={btn_w176} btnTitle={'뒤로'} onPress={() => navigation.goBack()} />
				</View>
				<View style={[btn_style.btn_w176, applyCompanionD.btn_w176]}>
					<AniButton btnStyle={'border'} btnLayout={btn_w176} btnTitle={'임시저장'} onPress={temp_save} />
				</View>
				<View style={[btn_style.btn_w176, applyCompanionD.btn_w176]}>
					<AniButton btnLayout={btn_w176} btnTitle={'다음'} onPress={goToNextStep} />
				</View>
			</View>
		</View>
	);
};
