import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w522} from '../atom/btn/btn_style';
import AniButton from '../molecules/AniButton';
import Stagebar from '../molecules/Stagebar';
import {login_style, btn_style, temp_style, shelterAssignEntrance_style, progressbar_style} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default ShelterAssignEntrance = props => {
	const goToPrivateShelter = () => {
		props.navigation.push('AssignShelterAddress', {data: {shelter_type: 'private'}});
	};
	const goToPublicShelter = () => {
		props.navigation.push('AssignShelterAddress', {data: {shelter_type: 'public'}});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					style={{}} //전체 container style, text와 bar를 감싸는 view의 style
					backgroundBarStyle={{
						width: 400 * DP,
						height: 20 * DP,
						backgroundColor: 'white',
						borderRadius: 10 * DP,
						borderWidth: 4 * DP,
						borderColor: APRI10,
					}} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={{height: 20 * DP, backgroundColor: APRI10, borderRadius: 5 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={1} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
					textStyle={[txt.roboto24, {marginLeft: 18 * DP, width: 40 * DP, height: 32 * DP, marginBottom: 10 * DP, color: GRAY10}]} //text의 스타일
				/>
			</View>

			{/* (A)Btn_w522 */}
			<View style={[btn_style.btn_w522, shelterAssignEntrance_style.btn_w522_public]}>
				<AniButton
					btnTitle={'공립 보호소'}
					btnTheme={'shadow'}
					btnStyle={'border'}
					btnLayout={btn_w522}
					titleFontStyle={32}
					onPress={goToPublicShelter}
				/>
			</View>

			{/* (A)Btn_w522 */}
			<View style={[btn_style.btn_w522, shelterAssignEntrance_style.btn_w522_private]}>
				<AniButton
					btnTitle={'사설 보호소'}
					btnTheme={'shawdow'}
					btnStyle={'border'}
					btnLayout={btn_w522}
					titleFontStyle={32}
					onPress={goToPrivateShelter}
				/>
			</View>
		</View>
	);
};
