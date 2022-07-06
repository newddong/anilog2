import React from 'react';
import {Text, View, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, StyleSheet} from 'react-native';
import {APRI10, GRAY10, GRAY20, GRAY30, MAINBLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Atom/btn/btn_style';
import {Animal_another, Animal_another_off, Animal_cat, Animal_cat_off, Animal_dog, Animal_dog_off} from 'Root/component/atom/icon';
/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {component} props.svg - 버튼 제목목
 * @param {'shawdow'|'noShadow'|'gray'|undefined} props.btnTheme - 버튼 테마 'shawdow'|'noShadow'|'gray'|undefined
 * @param {'filled'|'border'|'noborder'|undefined} props.btnStyle - 버튼 스타일 'filled'|'border'|'noborder'|undefined
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX) / Default : btn_w226
 * @param {boolean} props.disable - 버튼 활성화 여부
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {(title:string)=>void} props.onPress - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const AnimalButton = ({type, on, onPress}) => {
	const getText = () => {
		switch (type) {
			case 'dog':
				return '개';
			case 'cat':
				return '고양이';
			case 'another':
				return '그 외';
			default:
				break;
		}
	};
	const getIcon = () => {
		if (type == 'dog') {
			return on ? <Animal_dog /> : <Animal_dog_off />;
		} else if (type == 'cat') {
			return on ? <Animal_cat /> : <Animal_cat_off />;
		} else {
			return on ? <Animal_another /> : <Animal_another_off />;
		}
	};
	return (
		<TouchableOpacity
			activeOpacity={0.2}
			onPress={onPress}
			style={[style.container, {backgroundColor: on ? MAINBLACK : WHITE, borderColor: !on ? GRAY30 : WHITE, borderWidth: 2 * DP}]}>
			{getIcon()}
			<Text style={[txt.noto22b, {color: on ? WHITE : MAINBLACK, marginLeft: 10 * DP}]}>{getText()}</Text>
		</TouchableOpacity>
	);
};

AnimalButton.defaultProps = {
	onPress: e => console.log(e), // 버튼을 탭했을때 발생하는 콜백
};

export default AnimalButton;

const style = StyleSheet.create({
	container: {
		height: 60 * DP,
		flexDirection: 'row',
		paddingHorizontal: 12 * DP,
		paddingVertical: 12 * DP,
		borderRadius: 22 * DP,
		alignItems: 'center',
	},
});
