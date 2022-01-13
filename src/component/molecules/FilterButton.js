import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet, ScrollView} from 'react-native';
import Dropdown from 'Molecules/Dropdown';
import {btn_w280, btn_w226} from 'Atom/btn/btn_style';
import {APRI10, BLACK, BLUE10, GRAY10, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import FilterButtonContainer from './FilterButtonContainer';

/**
 * 필터 버튼
 * @param {object} props - Props Object
 * @param {string} props.btnTitle - 버튼 제목
 * @param {'shawdow'|'noShadow'|'gray'|undefined} props.btnTheme - 버튼 테마 'shawdow'|'noShadow'|'gray'|undefined
 * @param {'filled'|'border'|'noborder'|undefined} props.btnStyle - 버튼 스타일 'filled'|'border'|'noborder'|undefined
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX)
 * @param {boolean} props.disable - 버튼 활성화 여부
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {number} props.defaultIndex - 미선택 상태에서 보여지는 item의 index
 * @param {number} props.width - DropDown 길이
 * @param {number} props.height - DropDown 스크롤뷰 높이
 * @param {()=>void} props.onOpen - 드롭다운을 열었을 때 동작하는 콜백
 * @param {()=>void} props.onClose - 드롭다운을 닫았을 때 동작하는 콜백
 * @param {()=>void} props.onSelect - 드롭다운 내의 항목을 선택했을 때 동작하는 콜백
 * @param {object} props.menu - 드롭다운 항목 리스트
 */
const FilterButton = props => {
	//Default로 선택되어 있어야 하는 경우 ex)프로필 수정 혹은 임시저장된 데이터 호출 시에는 기존 데이터와 일치하는 Default값을 보여주어야 함
	const [value, setValue] = React.useState(props.menu[props.defaultIndex ? props.defaultIndex : 0]);
	const onSelect = (v, i) => {
		setValue(v);
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};
	const dropdown = React.useRef();

	return (
		<Dropdown
			alignBottom
			ref={dropdown}
			buttonComponent={<FilterButtonContainer {...props} value={value} width={props.width ? props.width : props.btnLayout.width} />}
			dropdownList={
				<View style={{backgroundColor: WHITE, borderRadius: 10 * DP, alignItems: 'center', borderWidth: 2 * DP}}>
					<TouchableWithoutFeedback>
						<ScrollView style={{height: props.height * DP || null}} contentContainerStyle={{}}>
							{props.menu.map((v, i) => (
								<View key={i}>
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
									<View style={[styles.separator, {width: props.width != null ? props.width * DP : props.btnLayout.width}]} />
								</View>
							))}
						</ScrollView>
					</TouchableWithoutFeedback>
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

FilterButton.defaultProps = {
	btnTitle: 'BTN_W654', //버튼의 제목
	disable: false, // 버튼탭 사용불가 상태 boolean
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	// height: 300,
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	btnStyle: 'border', // 버튼스타일 filled border noBorder,
	defaultIndex: null,
	onOpen: e => console.log('Filter Default onOpen  ', e),
	onClose: e => console.log('Filter Default onClose  ', e),
	onSelect: (v, i) => console.log('Filter Default onSelect  ', i + ':' + v),
	menu: [],
};

export default FilterButton;
