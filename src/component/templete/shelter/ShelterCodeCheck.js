import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, GRAY20, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import {NextMark} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import {login_style, btn_style, temp_style, shelterCodeCheck_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {checkShelterCode} from 'Root/api/userapi';
import StageBar from 'Root/component/molecules/info/Stagebar';
import {stagebar_style} from 'Root/component/organism/style_organism copy';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default ShelterCodeCheck = props => {
	const [confirmed, setConfirmed] = React.useState(false); //보호소 코드 인증 boolean
	const [shelterCode, setShelterCode] = React.useState(''); //보호소 코드

	const goToNextStep = () => {
		Modal.popNoBtn('코드 체크중입니다.');
		checkShelterCode(
			{},
			sucessed => {
				Modal.close();
				Modal.popOneBtn('코드 체크가 완료되었습니다', '확인', () => {
					//다음단계로
					Modal.close();
					props.navigation.push('ShelterAssignEntrance');
				});
			},
			error => {
				Modal.close();
				Modal.popOneBtn(error, '확인', () => {
					//에러, 대기
					Modal.close();
				});
			},
		);
	};
	const onInquery = () => {
		props.navigation.push('ShelterAsk');
	};

	const codeChecker = code => {
		console.log(code);
		setShelterCode(code);
		code.length > 1 ? setConfirmed(true) : null;
	};

	const validator = text => {
		return true;
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[styles.stageBar, {marginTop: 20 * DP}]}>
				<StageBar
					backgroundBarStyle={styles.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					// insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={1} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={640 * DP} //bar의 너비
				/>
			</View>
			<View style={[temp_style.textMsg]}>
				<Text style={[txt.noto30, {color: MAINBLACK}]}>발급받은 코드를 입력해주세요.</Text>
			</View>

			<View style={[{height: 104 * DP}, {width: 694 * DP}]}>
				{/* <Input24 placeholder={'보호소 코드를 입력해주세요.'} onChange={codeChecker} value={shelterCode} validator={validator} /> */}
				<Input24
					width={694}
					// defaultValue={'123'}
					height={104}
					value={shelterCode}
					placeholder={'코드를 입력해주세요.'}
					onChange={codeChecker}
				/>
			</View>

			<View style={[btn_style.queryBtn, shelterCodeCheck_style.queryBtn]}>
				<Text style={[txt.noto26, {color: GRAY10}]}>보호소 등록을 하고 싶으신가요? </Text>
				<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={onInquery}>
					<Text style={[txt.noto28, {color: MAINBLACK}]}>문의하기 </Text>
					<NextMark />
				</TouchableOpacity>
			</View>

			<View style={[btn_style.btn_w654, shelterCodeCheck_style.btn_w654]}>
				{confirmed ? (
					<AniButton btnTitle={'다음'} btnStyle={'border'} btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'다음'} btnLayout={btn_w694_r30} disable titleFontStyle={32} onPress={goToNextStep} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	stageBar: {
		width: 694 * DP,
		height: 32 * DP,
	},
	backgroundBar: {
		width: 640 * DP,
		height: 20 * DP,
		backgroundColor: 'white',
		borderRadius: 20 * DP,
		borderWidth: 4 * DP,
		// borderColor: APRI10,
		borderColor: MAINBLACK,
	},
});
