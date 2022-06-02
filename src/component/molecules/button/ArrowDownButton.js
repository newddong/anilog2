import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {APRI10, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Atom/btn/btn_style';
import {Arrow_Down_APRI10, Arrow_Down_GRAY10, Arrow_Down_GRAY20, Arrow_Down_White} from 'Atom/icon';
/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {string} props.btnTitle - 버튼 제목목
 * @param {'shawdow'|'noShadow'|'gray'|undefined} props.btnTheme - 버튼 테마 'shawdow'|'noShadow'|'gray'|undefined
 * @param {'filled'|'border'|'noborder'|undefined} props.btnStyle - 버튼 스타일 'filled'|'border'|'noborder'|undefined
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX) / Default : btn_w226
 * @param {boolean} props.disable - 버튼 활성화 여부
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {(title:string)=>void} props.onPress - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const ArrowDownButton = props => {
	const btnTheme = () => {
		//btnTheme이 shadow일 경우 Button의 View에 아래의 style을 추가한다
		if (props.btnTheme == 'shadow') {
			return {
				// shadowColor: '#000000',
				// shadowOpacity: 0.1,
				// shadowRadius: 4.65,
				// shadowOffset: {
				// 	width: 1 * DP,
				// 	height: 1 * DP,
				// },
				// elevation: 1,
			};
		}
	};

	//txt Color의 종류는 3가지 - white, APRI10, GRAY20
	const btnTxtColor = () => {
		if (props.disable || props.btnStyle == 'filled') {
			return WHITE;
		} else if (props.btnTheme == 'gray' && props.btnStyle == 'border') {
			return GRAY20;
		} else return GRAY20;
	};

	//default는 APRI10, Gray의 경우 GRAY20
	const border = () => {
		if (props.btnStyle == 'border' && props.btnTheme == 'gray') {
			return {borderColor: GRAY10, borderWidth: 2 * DP};
		} else if (props.btnStyle == 'border') {
			return {borderColor: GRAY30, borderWidth: 4 * DP};
		}
	};

	const btnStyle = () => {
		if (props.disable) {
			return GRAY30;
		} //disable일 경우 배경색 GRAY30
		else if (props.btnStyle == 'filled') {
			return APRI10;
		} //FILLED일 경우 배경색 APRI10
		else {
			return WHITE;
		} //이외의 경우 WHITE
	};

	const getArrow = () => {
		if (props.btnTheme == 'gray') {
			return <Arrow_Down_GRAY10 />;
		} else if (props.btnStyle == 'border') {
			return <Arrow_Down_GRAY20 />;
		}
		return <Arrow_Down_White />;
	};

	const onPress = () => {
		props.disable ? false : props.onPress(props.btnTitle);
	};

	const insideView = () => {
		return (
			<View
				style={[
					props.btnLayout,
					btnTheme(),
					border(),
					{backgroundColor: btnStyle(), justifyContent: 'center', alignItems: 'center', flexDirection: 'row'},
					{paddingHorizontal: 20 * DP},
				]}>
				<Text
					style={[
						txt.noto24,
						{
							fontSize: props.titleFontStyle * DP,
							color: btnTxtColor(),
							textAlign: 'center',
							width: (props.btnLayout.width + 30) * DP,
							// backgroundColor: 'purple',
						},
					]}
					numberOfLines={1}>
					{props.btnTitle}
				</Text>
				<View style={[]}>{getArrow()}</View>
			</View>
		);
	};
	return props.disable ? (
		<TouchableWithoutFeedback onPress={onPress}>{insideView()}</TouchableWithoutFeedback>
	) : (
		<TouchableOpacity onPress={onPress}>{insideView()}</TouchableOpacity>
	);
};

ArrowDownButton.defaultProps = {
	btnTitle: 'title', //버튼의 제목
	btnTheme: 'shadow', // btnTheme - ’shadow’, ‘noShadow’, ‘gray’에서 결정
	btnStyle: 'filled', // btnStyle - ‘filled’, ‘border’, ‘noBorder’ 에서 결정
	disable: false, // disable - 기본값은 false true일 경우 버튼 탭을 할수없도록 하고 표시를 바
	titleFontStyle: 24, // titleFontStyle - title의 폰트 크기
	btnLayout: btn_w226, // btnLayout - 버튼의 레이아웃(width, height, borderRadius를 결정)
	onPress: e => console.log(e), // 버튼을 탭했을때 발생하는 콜백
};

export default ArrowDownButton;
