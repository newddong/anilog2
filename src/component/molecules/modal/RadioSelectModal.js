import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Platform, Dimensions, Animated, Easing} from 'react-native';
import {WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Check50, RadioChecked48, RadioUnchecked48} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';

/**
 * 선택창과 직접 입력창을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {Object} props.offset - 선택된 좌표
 * @param {Object} props.items - 출력 아이템
 * @param {(string)=>void} props.onSelect - 확인 버튼 콜백
 * @param {void} props.onClose - 모달 종료 콜백
 *
 */

const RadioSelectModal = props => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const onSelect = index => {
		setSelectedIndex(index);
		props.onSelect(props.items[index]);
	};

	const onClose = () => {
		closeAnimation();
		setTimeout(() => {
			props.onClose();
		}, 500);
	};

	const animatedHeight = React.useRef(new Animated.Value(0)).current;
	const animatedOpacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.spring(animatedHeight, {
			duration: 500,
			toValue: 300 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 300,
			toValue: 1,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const closeAnimation = () => {
		Animated.spring(animatedHeight, {
			toValue: 0,
			duration: 500,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		Animated.timing(animatedOpacity, {
			duration: 200,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	const renderItem = (item, index) => {
		return (
			<TouchableOpacity onPress={() => onSelect(index)} style={[style.itemContainer]}>
				<View style={[style.checkBox]}>{index == selectedIndex ? <Check50 /> : <RadioUnchecked48 />}</View>
				<Text style={[txt.roboto28b, style.itemTitle]} numberOfLines={1} ellipsizeMode={'tail'}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={onClose} style={style.background}>
			<Animated.View
				style={[
					style.popUpWindow,
					style.shadow,
					{
						position: 'absolute',
						left: props.offset.x - 240 * DP,
						top: props.offset.y + 70 * DP,
						width: animatedHeight,
						opacity: animatedOpacity,
					},
				]}>
				<TouchableOpacity
					activeOpacity={1}
					style={[
						{
							justifyContent: 'space-between',
							alignItems: 'center',
						},
					]}>
					<View style={[style.header]}>
						<Text style={[txt.noto30b]}>{props.title}</Text>
					</View>
					<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} showsVerticalScrollIndicator={false} />
				</TouchableOpacity>
			</Animated.View>
		</TouchableOpacity>
	);
};

RadioSelectModal.defaultProps = {
	selectMsg: '확인',
	exitMsg: '나가기',
	onClose: e => console.log(e),
};

const style = StyleSheet.create({
	background: {
		// backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	popUpWindow: {
		width: 300 * DP,
		backgroundColor: WHITE,
		paddingHorizontal: 20 * DP,
		paddingVertical: 30 * DP,
		borderRadius: 40 * DP,
		borderTopEndRadius: 0,
		alignItems: 'center',
	},
	header: {
		width: 260 * DP,
		height: 48 * DP,
		marginBottom: 40 * DP,
		alignItems: 'center',
	},
	itemContainer: {
		width: 200 * DP,
		height: 48 * DP,
		marginBottom: 40 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'red',
	},
	itemTitle: {
		width: 144 * DP,
		// marginLeft: 20 * DP,
		textAlign: 'center',
	},
	checkBox: {marginRight: 12 * DP},
	shadow: {
		shadowColor: 'black',
		shadowOpacity: 0.5,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 9,
	},
});

export default RadioSelectModal;
