import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList, Animated, Easing} from 'react-native';
import {WHITE, MAINBLACK, GRAY30, GRAY10, APRI10, OPACITY90} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import PetLabel68 from '../label/PetLabel68';
import {AddItem68, Check64Filled} from 'Root/component/atom/icon';
import {useNavigation} from '@react-navigation/core';
/**
 * 하단 셀렉트 박스 모달
 *
 * @param {Object} props - props object
 * @param {Array} props.data - 출력될 데이터 목록 / 최대 두 개의 길이의 배열 타입 : 예 ) [ object, object ]
 * @param {string} props.header - 모달 상단 좌측의 헤더 타이틀 / 빈 값 '' 을 보낼 경우 '취소' 출력
 * @param {(선택1, 선택2)=>void} props.onSelect - 완료 버튼 콜백 / data의 길이에 맞게 값 반환
 * @param {()=>void} props.onClose - 취소 버튼 콜백
 * @param {height} props.height - 취소 버튼 콜백
 *
 */

const PetProfileEditSelectModal = props => {
	const data = props.data.items;
	const [listHeight, setListHeight] = React.useState(0);
	const padding = '';
	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	// console.log('props!!!', props);
	React.useEffect(() => {
		animateSelectModal();
	}, []);

	const animateSelectModal = () => {
		let aniLength;

		console.log('length', data.length);
		if (data.length > 3) {
			aniLength = 842 * DP;
			setListHeight(592);
		} else {
			aniLength = (398 + data.length * 144) * DP;
			setListHeight(144 * (data.length + 1));
		}
		Animated.timing(animatedHeight, {
			duration: 400,
			toValue: aniLength,
			// easing: Easing.linear,
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
			// Modal.close();
			props.onClose();
		});
	};

	const onSelect = item => {
		props.onSelect(item);
	};

	const onScroll = (event, i) => {
		let y = event.nativeEvent.contentOffset.y;
		let focused = '';

		data[0].length < 5 ? (focused = Math.floor(y / (72 * DP))) : (focused = Math.floor(y / (78 * DP)));
		if (i == 0) {
			if (focused < 1) {
				setSelectedItem(2);
			} else {
				if (focused >= data[0].length) {
					// 마지막 배열을 넘어서서 스크롤을 할 경우 마지막으로 자동 회귀
					setSelectedItem(data[0].length + 1);
				} else {
					setSelectedItem(focused + 2);
				}
			}
		} else {
			if (focused < 1) {
				setSelectedItem2(2);
			} else {
				if (focused >= data[1].length) {
					console.log('focused', focused);
					// 마지막 배열을 넘어서서 스크롤을 할 경우 마지막으로 자동 회귀
					setSelectedItem2(data[1].length + 1);
				} else {
					setSelectedItem2(focused + 2);
				}
			}
		}
	};
	const userHeader = () => {
		return (
			<TouchableOpacity onPress={() => onSelect(props.data.user_data)}>
				<View style={[style.listContainer2]}>
					<View style={[style.listItem, {marginLeft: 10 * DP}]}>
						<PetLabel68
							data={{...props.data.user_data, pet_status: 'user'}}
							onLabelClick={() => {
								// onClicLabel(item);
							}}
						/>

						<View style={[{alignItems: 'center'}, {marginLeft: 30 * DP}]}>
							<Text style={[{width: 510 * DP}, {height: 46 * DP}, txt.noto30b]}>{props.data.user_data.user_nickname}</Text>
							<Text style={[{width: 510 * DP}, {height: 42 * DP}, txt.noto28, {color: GRAY10}]}>{props.data.user_data.user_phone_number}</Text>
						</View>
						{props.data.pet_data ? <></> : <Check64Filled />}
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	const AddPetFooter = () => {
		return (
			<View style={[style.listContainer3]}>
				<View style={[style.footer, {paddingLeft: 30 * DP}]}>
					<AddItem68 />
					<View style={[{alignItems: 'center'}, {marginLeft: 30 * DP}]}>
						<Text style={[{width: 510 * DP}, {height: 46 * DP}, txt.noto30, {color: APRI10}]}>새로운 동물 계정 만들기</Text>
					</View>
				</View>
			</View>
		);
	};

	const PetProfileEdit = item => {
		console.log('item selected', item);
		// navigation.push('PetInfoSetting', {pet_id: item._id});
	};

	console.log('props.data.pet_data', props.data.pet_data);

	const renderItem = ({item, index}) => {
		// console.log('item', item);
		return (
			<TouchableOpacity onPress={() => onSelect(item)}>
				<View style={[style.listContainer2]}>
					<View style={[style.listItem, {marginLeft: 10 * DP}]}>
						<PetLabel68
							data={item}
							onLabelClick={() => {
								onSelect(item);
							}}
						/>
						<View style={[{alignItems: 'center'}, {marginLeft: 30 * DP}]}>
							<Text style={[{width: 510 * DP}, {height: 46 * DP}, txt.noto30b]}>{item.user_nickname}</Text>
							<Text style={[{width: 510 * DP}, {height: 42 * DP}, txt.noto28, {color: GRAY10}]}>
								{item.pet_species} / {item.pet_species_detail}
							</Text>
						</View>
						{props.data.pet_data == item._id ? <Check64Filled /> : <></>}
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	// console.log(
	// 	'data',
	// 	data.map((v, i) => {
	// 		console.log('v, i', v);
	// 	}),
	// );
	const getPadding = v => {
		let arr = [padding, padding];
		let newArr = arr.concat(v);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};

	return (
		<View style={style.background}>
			<TouchableWithoutFeedback onPress={closeSelectModal}>
				<View style={[{width: 750 * DP, height: 1004 * DP}]} />
			</TouchableWithoutFeedback>
			<Animated.View
				style={[
					style.popUpWindow,
					{
						height: animatedHeight,
					},
				]}>
				<View style={style.header}>
					{props.header == '' ? <></> : <Text style={[txt.noto30b, {color: MAINBLACK}, {marginTop: 30 * DP}]}>{props.header}</Text>}
				</View>
				<View style={[style.listContainer, {height: listHeight * DP}]}>
					<View style={[style.list]}>
						<FlatList data={data} renderItem={renderItem} ListHeaderComponent={userHeader} />
					</View>
				</View>
				<TouchableOpacity sty={[style.footer]} onPress={() => onSelect({props: 'hi'})}>
					<AddPetFooter />
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

PetProfileEditSelectModal.defaultProps = {
	// header: 'popUp',
	onSelect: () => {},
	height: 476,
};

const style = StyleSheet.create({
	background: {
		// backgroundColor: '#0009',
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 750 * DP,
		// height: 842 * DP,
		backgroundColor: OPACITY90,
		// backgroundColor: 'rgba(255,255,255,0.9)',
		borderTopLeftRadius: 40 * DP,
		borderTopRightRadius: 40 * DP,
		// borderRadius: 40 * DP,
		alignItems: 'center',
		opacity: 0.9,
	},
	header: {
		width: 750 * DP,
		height: 108 * DP,
		flexDirection: 'row',
		// backgroundColor: WHITE,
		backgroundColor: OPACITY90,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
		opacity: 0.9,
	},
	listContainer: {
		flexDirection: 'row',
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: OPACITY90,
		opacity: 0.9,
		// height: a,
	},
	list: {
		// width: 750 * DP,
		// height: 592 * DP,
		// paddingHorizontal: 20 * DP,
		alignItems: 'center',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: 694 * DP,
		// width: 750 * DP,
		paddingHorizontal: 20 * DP,
		height: 148 * DP,
		borderRadius: 20 * DP,
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
	completeText: {
		width: 110 * DP,
		height: 80 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listContainer2: {
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY30,
		width: 750 * DP,
	},
	listContainer3: {
		width: 750 * DP,
	},
	footer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: 750 * DP,
		// width: 750 * DP,
		paddingHorizontal: 20 * DP,
		paddingTop: 30 * DP,
		paddingBottom: 70 * DP,
		// height: 148 * DP,
		flexDirection: 'row',
		backgroundColor: OPACITY90,
		opacity: 0.9,
	},
});

export default PetProfileEditSelectModal;
