import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, FlatList, Animated, Easing} from 'react-native';
import {WHITE, APRI10, GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
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

	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		animateSelectModal();
	}, []);

	const animateSelectModal = () => {
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: (200 + data.length * 88) * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	const closeSelectModal = () => {
		Animated.timing(animatedHeight, {
			duration: 200,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => {
			Modal.close();
		});
	};

	const onSelect = item => {
		props.onSelect(item);
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() => onSelect(item)} style={[style.listItem]}>
				<Text style={[txt.noto30, {textAlignVertical: 'center', maxWidth: 400 * DP, fontWeight: item == '삭제' ? 'bold' : 'normal'}]}>{item}</Text>
			</TouchableOpacity>
		);
	};

	const ItemSeparatorComponent = () => {
		return <View style={{alignSelf: 'center', width: 470 * DP, height: 2 * DP, backgroundColor: GRAY30}}></View>;
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={closeSelectModal} style={[style.background]}>
			<Animated.View style={[style.container, {height: animatedHeight}]}>
				<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, {paddingVertical: 30 * DP}]}>
					<View style={[style.insideContainer]}>
						<FlatList data={data} renderItem={renderItem} scrollEnabled={false} ItemSeparatorComponent={ItemSeparatorComponent} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={closeSelectModal} activeOpacity={0.8} style={[style.closeBox]}>
					<Text style={[txt.noto30]}>취소</Text>
				</TouchableOpacity>
			</Animated.View>
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
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 30 * DP,
	},
	container: {
		// backgroundColor: 'yellow',
		marginBottom: 50 * DP,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	popUpWindow: {
		// paddingHorizontal: 40 * DP,
		// paddingVertical: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		borderRadius: 30 * DP,
		marginBottom: 20 * DP,
	},
	insideContainer: {
		width: 658 * DP,
		// height: 88 * DP,
		// backgroundColor: 'red',
		// paddingTop: 24 * DP,
	},
	listItem: {
		width: 658 * DP,
		height: 88 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeBox: {
		width: 658 * DP,
		height: 128 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
});

export default SelectBoxModal;
