import React from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet, ScrollView} from 'react-native';
import Dropdown from 'Molecules/Dropdown';
import {btn_w226} from 'Atom/btn/btn_style';
import {GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import DropdownSelect from './DropdownSelect';
import EmailDropDownSelect from './EmailDropDownSelect';
import {EMAIL_DOMAIN} from 'Root/i18n/msg';

/**
 * 이메일 전용 드롭다운
 * @param {object} props - Props Object
 * @param {object} props.menu - 드롭다운 목록
 * @param {number} props.defaultIndex - 드롭다운의 초기값 인덱스 defulat=0
 * @param {number} props.width - 드롭다운 길이
 * @param {number} props.height - 드롭다운 높이
 * @param {number} props.titleFontStyle - 드롭다운 내부 글꼴 크기 default=24
 * @param {(item, index)=>void} props.onSelect - 드롭다운 선택했을 때 동작하는 콜백, 선택된 오브젝트와 인덱스를 반환
 * @param {(item, index)=>void} props.onChangeDomain - 이메일 도메인 직접 작성 시 텍스트 콜백
 */
const EmialDropDown = props => {
	//Default로 선택되어 있어야 하는 경우 ex)프로필 수정 혹은 임시저장된 데이터 호출 시에는 기존 데이터와 일치하는 Default값을 보여주어야 함
	const [value, setValue] = React.useState(props.menu[props.defaultIndex ? props.defaultIndex : 0]);
	const onSelect = (v, i) => {
		setValue(v);
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};

	React.useEffect(() => {
		if (props.defaultIndex) {
			console.log('Props.DefaultIndex : ', props.defaultIndex);
			setValue(props.menu[props.defaultIndex]);
		}
	}, [props.defaultIndex]);

	React.useEffect(() => {
		setValue(props.menu[0]);
	}, [props.isLargeCategoryChanged]);

	const onChangeDomain = text => {
		props.onChangeDomain(text);
	};
	const dropdown = React.useRef();

	return (
		<Dropdown
			alignBottom
			ref={dropdown}
			buttonComponent={
				<EmailDropDownSelect width={props.width} value={value} defaultDirectInput={props.defaultDirectInput} onChangeDomain={onChangeDomain} />
			}
			dropdownList={
				<View style={{backgroundColor: 'white', alignItems: 'center', borderWidth: 2 * DP}}>
					<ScrollView style={{height: props.height * DP || null}} contentContainerStyle={{}}>
						{props.menu.map((v, i) => (
							<View key={i} style={{justifyContent: 'center'}}>
								<TouchableWithoutFeedback onPress={() => onSelect(v, i)}>
									<View style={[styles.itemContainer, {width: props.width != null ? props.width * DP : props.btnLayout.width}]}>
										<Text
											style={[
												txt.noto28b,
												{
													fontSize: props.titleFontStyle * DP,
													textAlign: 'center',
												},
											]}>
											{v}
										</Text>
									</View>
								</TouchableWithoutFeedback>
								<View style={[styles.separator, {}]} />
							</View>
						))}
					</ScrollView>
				</View>
			}
		/>
	);
};

export const styles = StyleSheet.create({
	itemContainer: {
		justifyContent: 'center',
		height: 50 * DP,
		borderRadius: 10 * DP,
	},
	separator: {
		backgroundColor: GRAY40,
		height: 4 * DP,
	},
});

EmialDropDown.defaultProps = {
	btnTitle: 'BTN_W654', //버튼의 제목
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	defaultIndex: null,
	onSelect: (v, i) => console.log('NormalDropDown Default onSelect  ', i + ':' + v),
	menu: [],
	width: 200, //없으면 오류남
};

export default EmialDropDown;
