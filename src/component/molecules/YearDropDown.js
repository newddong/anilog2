import React from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet, ScrollView} from 'react-native';
import Dropdown from 'Molecules/Dropdown';
import {btn_w226} from 'Atom/btn/btn_style';
import {APRI10, GRAY10, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import YearDropDownSelect from './YearDropDownSelect';

/**
 * 드롭다운
 * @param {object} props - Props Object
 * @param {object} props.menu - 드롭다운 목록
 * @param {number} props.defaultIndex - 드롭다운의 초기값 인덱스 defulat=0
 * @param {number} props.width - 드롭다운 길이
 * @param {number} props.titleFontStyle - 드롭다운 내부 글꼴 크기 default=24
 * @param {(item, index)=>void} props.onSelect - 드롭다운 선택했을 때 동작하는 콜백, 선택된 오브젝트와 인덱스를 반환
 */
const YearDropDown = props => {
	//Default로 선택되어 있어야 하는 경우 ex)프로필 수정 혹은 임시저장된 데이터 호출 시에는 기존 데이터와 일치하는 Default값을 보여주어야 함
	const [value, setValue] = React.useState(props.menu[props.defaultIndex ? props.defaultIndex : 0]);
	const onSelect = (v, i) => {
		setValue(v);
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};
	React.useEffect(() => {
		setValue(props.menu[props.menu.length - 1 - (props.index - props.menu[props.menu.length - 1])]);
	}, [props.index]);

	const dropdown = React.useRef();

	return (
		<Dropdown
			alignBottom
			ref={dropdown}
			buttonComponent={<YearDropDownSelect width={props.width} value={value} />}
			dropdownList={
				<View
					style={{
						backgroundColor: WHITE,
						marginLeft: 28 * DP,
						marginBottom: 100,
						top: 220 * DP,
						width: 240 * DP,
						borderRadius: 10 * DP,
						alignItems: 'center',
					}}>
					<ScrollView style={{height: 800 * DP}} contentContainerStyle={{}}>
						{props.menu.map((v, i) => (
							<View key={i}>
								<TouchableWithoutFeedback onPress={() => onSelect(v, i)}>
									<View style={[styles.itemContainer, {width: 240 * DP}]}>
										<Text
											style={[
												txt.roboto32b,
												{
													alignSelf: 'center',
													textAlign: 'center',
													color: GRAY10,
													width: 100 * DP,
													borderBottomColor: GRAY30,
													borderBottomWidth: 2 * DP,
												},
											]}>
											{v}
										</Text>
									</View>
								</TouchableWithoutFeedback>
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
		height: 60 * DP,
		borderRadius: 10 * DP,
	},
	separator: {
		backgroundColor: GRAY40,
		height: 4 * DP,
	},
});

YearDropDown.defaultProps = {
	btnTitle: 'BTN_W654', //버튼의 제목
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	defaultIndex: null,
	onSelect: (v, i) => console.log('NormalDropDown Default onSelect  ', i + ':' + v),
	menu: [],
	width: 120, //없으면 오류남
};

export default YearDropDown;
