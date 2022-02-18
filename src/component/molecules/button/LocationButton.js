import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {APRI10, GRAY20, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w176, btn_w226} from 'Atom/btn/btn_style';
import {Location54_APRI10} from 'Atom/icon';

/**
 * 로케이션 마크가 추가된 AniButton
 * @param {object} props - Props Object
 * @param {string} props.btnTitle - 버튼 제목목
 * @param {'shawdow'|'noShadow'|'gray'|undefined} props.btnTheme - 버튼 테마 'shawdow'|'noShadow'|'gray'|undefined
 * @param {'filled'|'border'|'noborder'|undefined} props.btnStyle - 버튼 스타일 'filled'|'border'|'noborder'|undefined
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX)
 * @param {boolean} props.disable - 버튼 활성화 여부
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {(title:string)=>void} props.onPress - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const LocationButton = props => {
	//default는 APRI10, Gray의 경우 GRAY20
	const border = () => {
		if (props.btnStyle == 'border' && props.btnTheme == 'gray') {
			return {borderColor: GRAY20, borderWidth: 4 * DP};
		} else if (props.btnStyle == 'border') {
			return {borderColor: APRI10, borderWidth: 4 * DP};
		}
	};

	const onPress = () => {
		props.disable ? false : props.onPress(props.btnTitle);
	};

	const insideView = () => {
		return (
			<View style={[btn_w176, {backgroundColor: WHITE, justifyContent: 'center', borderColor: APRI10, borderWidth: 4 * DP}]}>
				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 5 * DP}}>
					<Location54_APRI10 />
					<Text
						style={[
							txt.noto24b,
							{
								marginLeft: 12 * DP,
								fontSize: props.titleFontStyle * DP,
								color: APRI10,
								textAlign: 'center',
								textAlignVertical: 'center',
								// lineHeight: lineHeight(),
							},
						]}>
						{props.btnTitle}
					</Text>
				</View>
			</View>
		);
	};
	return props.disable ? (
		<TouchableWithoutFeedback onPress={onPress}>{insideView()}</TouchableWithoutFeedback>
	) : (
		<TouchableOpacity onPress={onPress}>{insideView()}</TouchableOpacity>
	);
};

LocationButton.defaultProps = {
	btnTitle: 'title', //버튼의 제목
	btnTheme: 'shadow', // btnTheme - ’shadow’, ‘noShadow’, ‘gray’에서 결정
	btnStyle: 'filled', // btnStyle - ‘filled’, ‘border’, ‘noBorder’ 에서 결정
	disable: false, // disable - 기본값은 false true일 경우 버튼 탭을 할수없도록 하고 표시를 바
	titleFontStyle: 24, // titleFontStyle - title의 폰트 크기
	btnLayout: btn_w226, // btnLayout - 버튼의 레이아웃(width, height, borderRadius를 결정)
	onPress: e => console.log(e), // 버튼을 탭했을때 발생하는 콜백
};
export default LocationButton;
