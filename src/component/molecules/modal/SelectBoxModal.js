import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY30, GREEN} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Cross24, Cross24_Filled, Cross24_White} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';

/**
 * 중앙 셀렉트 박스 모달
 *
 * @param {Object} props - props object
 * @param {Object} props.data - 셀렉트 박스 모달 아이템
 * @param {(selectedItem)=>void} props.onSelect - 선택 콜백 함수
 * @param {()=>void} props.onClose - X 마크 클릭 콜백 함수
 * @param {boolean} props.headerRoof - 모달 헤더 지붕 출력 여부 (default=false)
 * @param {string} props.headerTitle - 헤더 타이틀 문자열
 *
 */
const SelectBoxModal = props => {
	const data = props.data;

	const onSelect = item => {
		props.onSelect(item);
	};

	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => onSelect(item)} style={[style.listItem, {}]}>
				<Text style={[txt.noto30, {height: 48 * DP}]}>{item}</Text>
			</TouchableOpacity>
		);
	};

	const ItemSeparatorComponent = () => {
		return <View style={{width: 470 * DP, height: 2 * DP, backgroundColor: GRAY30}}></View>;
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow]}>
				{props.headerRoof ? (
					<View
						style={[
							style.roof,
							{
								flexDirection: 'row',
							},
						]}>
						<Text style={[txt.noto30, style.headerTitle]}>{props.headerTitle}</Text>
						<TouchableOpacity onPress={() => props.onClose()} style={[style.crossMarkContainer]}>
							<Cross24_White />
						</TouchableOpacity>
					</View>
				) : (
					<View style={style.crossMarkContainer_withoutTitle}>
						<Cross24_Filled onPress={() => props.onClose()} />
					</View>
				)}
				<View style={[style.insideContainer]}>
					<FlatList
						data={data}
						renderItem={({item, index}) => renderItem(item, index)}
						scrollEnabled={false}
						ItemSeparatorComponent={ItemSeparatorComponent}
					/>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

SelectBoxModal.defaultProps = {
	onSelect: () => {},
	onClose: () => {},
	headerRoof: false,
	headerTitle: 'HeaderTitle',
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		// paddingHorizontal: 40 * DP,
		paddingBottom: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		opacity: 0.9,
		borderRadius: 50 * DP,
	},
	insideContainer: {
		width: 486 * DP,
		// paddingTop: 24 * DP,
	},
	roof: {
		paddingHorizontal: 40 * DP,
		marginBottom: 20 * DP,
		height: 88 * DP,
		backgroundColor: APRI10,
		borderTopLeftRadius: 50 * DP,
		borderTopRightRadius: 50 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	roofInside: {
		// paddingHorizontal: 40 * DP,
		paddingVertical: 18 * DP,
		width: 486 * DP,
		height: 75 * DP,
		// backgroundColor: 'green',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		color: WHITE,
		width: 434 * DP,
	},
	listItem: {
		width: 470 * DP,
		height: 88 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossMarkContainer: {
		width: 60 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossMarkContainer_withoutTitle: {
		alignSelf: 'flex-end',
		marginRight: 20 * DP,
		width: 60 * DP,
		height: 60 * DP,
		marginTop: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
});

export default SelectBoxModal;
