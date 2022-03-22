import React from 'react';
<<<<<<< HEAD
import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet,
	Dimensions,
	Platform,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Animated,
	TextInput,
} from 'react-native';
=======
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, Animated, TextInput} from 'react-native';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10, GRAY20, BLACK} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';

/**
 * 버튼 한 개의 셀렉트 모달창
 *
 * @param {Object} props - props object
 * @param {Object} props.data - 드롭다운 아이템 목록
 * @param {string} props.msg -  상단 모달창에서 타이틀
 * @param {(selectedItem)=>void} props.onYes - 상단 모달창에서 확인 버튼 콜백 / 선택한 아이템 반환
 * @param {string} props.yesMsg -  상단 모달창에서 확인 버튼 타이틀
<<<<<<< HEAD
 *
 */
const OneButtonSelectModal = props => {
	const data = props.data;
	console.log('data', props);
=======
 * @param {number} props.fontSize -  하단 리스트 아이템 텍스트 크기
 *
 */
const OneButtonSelectModal = props => {
	const padding = '';

	const data = props.data;
	const getData = () => {
		let init = [padding, padding];
		const newArr = init.concat(data);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca

	const [selectedItem, setSelectedItem] = React.useState(2);
	const [confirmedSelect, setConfirmedSelect] = React.useState(data[2]);
	const [selectOpen, setSelectOpen] = React.useState(false);
	const [directInput, setDirectInput] = React.useState('');

	React.useEffect(() => {
		if (selectOpen) {
			Animated.timing(animatedHeight, {
				duration: 500,
				toValue: 465 * DP,
				// easing: Easing.linear,
				useNativeDriver: false,
			}).start();
		} else if (!selectOpen) {
			Animated.timing(animatedHeight, {
				duration: 500,
				toValue: 0,
				// easing: Easing.linear,
				useNativeDriver: false,
			}).start();
		}
	}, [selectOpen]);

	const onScroll = event => {
		// console.log('event', event.nativeEvent.contentOffset);
		let y = event.nativeEvent.contentOffset.y;
<<<<<<< HEAD
		let focused = Math.floor(y / (60 * DP));
		console.log('foucsed', focused);
=======
		let focused = Math.floor(y / (68 * DP));
		// console.log('foucsed', focused);
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
		if (focused < 1) {
			setSelectedItem(2);
		} else {
			setSelectedItem(focused + 2);
		}
	};

	const getTextColor = index => {
		const abs = Math.abs(index - selectedItem);
		if (abs >= 2) {
			return GRAY20;
		} else if (abs == 1) {
			return GRAY10;
		} else {
			return BLACK;
		}
	};
	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	const interpolatedHeight = animatedHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 100],
	});

	//상단 모달창에서 확인 버튼 클릭
	const pressYes = () => {
		console.log('확인');
		if (confirmedSelect === '기타(직접 입력)') {
			props.onYes(directInput);
		} else {
			console.log('이외 항목', confirmedSelect);
			props.onYes(confirmedSelect);
		}
	};

	//상단 모달창에서 드롭다운 열기 클릭
	const onOpen = () => {
		setSelectOpen(!selectOpen);
	};

	//기타(직접 입력)의 경우 해당 텍스트 입력 콜백
	const onChangeDirectInput = text => {
		setDirectInput(text);
	};

	//하단 드롭다운에서 완료 버튼 클릭
	const onSelect = () => {
		setSelectOpen(false);
<<<<<<< HEAD
		setConfirmedSelect(data[selectedItem]);
=======
		setConfirmedSelect(data[selectedItem - 2]);
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
	};

	//직접 입력 선택했을 경우 상단 모달에 TextInput 출력
	const getDirectInput = () => {
<<<<<<< HEAD
		if (confirmedSelect === '기타(직접 입력)') {
=======
		// console.log('confirmedSelect', confirmedSelect);
		if (confirmedSelect === '기타(직접 입력)' || confirmedSelect == '직접입력') {
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
			return (
				<TextInput
					onChangeText={onChangeDirectInput}
					style={[txt.noto28, style.directInputStyle]}
					multiline={true}
<<<<<<< HEAD
=======
					textAlignVertical={'top'}
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
					placeholder={'가능한 상세히 적어주세요!'}
				/>
			);
		} else {
			<></>;
		}
	};

<<<<<<< HEAD
	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>{props.msg}</Text>
				<TouchableOpacity onPress={onOpen} style={style.dropdownContainer} activeOpacity={1}>
					<View style={style.selectedItem}>
						<Text style={[txt.noto28]}>{data[selectedItem]}</Text>
=======
	const onPressOutSide = () => {
		if (selectOpen) {
			setSelectOpen(!selectOpen);
		} else {
			Modal.close();
		}
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={onPressOutSide} style={style.background}>
			{/* 상단 선택영역  */}
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>{props.msg}</Text>
				<TouchableOpacity onPress={onOpen} style={style.dropdownContainer} activeOpacity={1}>
					<View style={style.selectedItem}>
						<Text style={[txt.noto28, {fontSize: props.fontSize * DP - 3}]}>{data[selectedItem - 2]}</Text>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
					</View>
					<View style={style.dropdownIcon}>{!selectOpen ? <Arrow_Down_GRAY10 onPress={onOpen} /> : <Arrow_Up_GRAY10 onPress={onOpen} />}</View>
				</TouchableOpacity>
				{getDirectInput()}
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={props.yesMsg} onPress={pressYes} />
				</View>
<<<<<<< HEAD
			</View>
=======
			</TouchableOpacity>
			{/* 하단 스크롤뷰 영역 */}
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
			<Animated.View
				style={[
					style.downScrollSelectContainer,
					{
						height: interpolatedHeight,
<<<<<<< HEAD
=======
						// bottom: 100,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
					},
				]}>
				<View style={[style.header]}>
					<Text onPress={() => setSelectOpen(false)} style={[txt.noto30, {color: WHITE, paddingVertical: 22 * DP}]}>
						취소
					</Text>
					<TouchableOpacity onPress={onSelect}>
						<Text style={[txt.noto30, {color: WHITE}]}>완료</Text>
					</TouchableOpacity>
				</View>
<<<<<<< HEAD
				<TouchableOpacity activeOpacity={1} style={[style.list]}>
					<FlatList
						data={props.data}
						// keyExtractor={item => item.index}
						onScroll={onScroll}
						showsVerticalScrollIndicator={false}
						overScrollMode={'always'}
						renderItem={({item, index}) => {
							return (
								<View key={index} style={[style.listItem, index == selectedItem && index != 1 && index != 0 ? {backgroundColor: APRI10} : null]}>
									<TouchableWithoutFeedback onPress={() => setSelectedItem(index)}>
										<Text style={[txt.roboto34, {color: getTextColor(index)}]}>{item}</Text>
									</TouchableWithoutFeedback>
								</View>
							);
						}}
					/>
				</TouchableOpacity>
=======
				<View style={[style.list, {}]}>
					<FlatList
						data={getData()}
						// keyExtractor={item => item.index}
						onScroll={onScroll}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}) => {
							return (
								<TouchableOpacity
									activeOpacity={1}
									onPress={() => setSelectedItem(index)}
									key={index}
									style={[style.listItem, index == selectedItem && item != padding ? {backgroundColor: APRI10} : null]}>
									<>
										<Text style={[txt.roboto34, {color: getTextColor(index), fontSize: props.fontSize * DP}]}>{item}</Text>
									</>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
			</Animated.View>
		</TouchableOpacity>
	);
};

OneButtonSelectModal.defaultProps = {
	yesMsg: 'ok',
	onYes: () => {
		alert('YES');
	},
<<<<<<< HEAD
=======
	fontSize: 34,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
<<<<<<< HEAD
		justifyContent: 'center',
=======
		// justifyContent: 'center',
		// top: 200 * DP,
		paddingTop: 300 * DP,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
		alignItems: 'center',
	},
	popUpWindow: {
		width: 654 * DP,
		backgroundColor: '#e4e4e4',
<<<<<<< HEAD
=======
		// backfaceVisibility: 'yellow',
		// backgroundColor: 'yellow',
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 46 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		alignSelf: 'center',
		flexDirection: 'row',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	dropdownContainer: {
		width: 562 * DP,
		height: 88 * DP,
		borderRadius: 20 * DP,
		marginBottom: 30 * DP,
		backgroundColor: WHITE,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedItem: {
		width: 514 * DP,
		height: 48 * DP,
		alignItems: 'center',
	},
	dropdownIcon: {
		width: 48 * DP,
		height: 48 * DP,
	},
	directInputStyle: {
		backgroundColor: '#ffffff',
		width: 562 * DP,
		height: 166 * DP,
		marginBottom: 20 * DP,
		borderRadius: 20 * DP,
		paddingLeft: 20 * DP,
	},
	downScrollSelectContainer: {
		position: 'absolute',
		bottom: 0,
		width: 750 * DP,
		// height: 476 * DP,
		justifyContent: 'flex-end',
	},
	header: {
		width: 750 * DP,
		flexDirection: 'row',
		backgroundColor: APRI10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	list: {
		width: 750 * DP,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 666 * DP,
		height: 70 * DP,
		borderRadius: 30 * DP,
	},
});

export default OneButtonSelectModal;
