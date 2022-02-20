import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList} from 'react-native';
import {WHITE, APRI10, BLACK, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';

/**
 * 하단 셀렉트 박스 모달
 *
 * @param {Object} props - props object
 * @param {Array} props.data - 출력될 데이터 목록 / 최대 두 개의 길이의 배열 타입 : 예 ) [ object, object  ]
 * @param {string} props.header - 모달 상단 좌측의 헤더 타이틀 / 빈 값 '' 을 보낼 경우 '취소' 출력
 * @param {(선택1, 선택2)=>void} props.onSelect - 완료 버튼 콜백 / data의 길이에 맞게 값 반환
 * @param {()=>void} props.onClose - 취소 버튼 콜백
 *
 */
const SelectMultipleScrollBoxModal = props => {
	const data = props.data;
	// console.log('data', JSON.stringify(data));

	const [selectedItem, setSelectedItem] = React.useState(2);
	const [selectedItem2, setSelectedItem2] = React.useState(2);
	const [first, setFirst] = React.useState(data.large);
	const [second, setSecond] = React.useState([]);
	const refContainerLeft = React.useRef('');
	const refContainerRight = React.useRef('');
	const padding = '-----------------------';

	const onSelect = () => {
		if (data.length == 1) {
			props.onSelect(data[0][selectedItem - 2]);
		} else {
			props.onSelect(data[0][selectedItem], data[1][selectedItem2]);
		}
	};

	const getSecondCategory = () => {
		let first_category = [];
		data.large.map((v, i) => {
			first_category.push(v.large);
		});
		setSecond(data.sub[selectedItem - 2]);
	};

	React.useEffect(() => {
		// refContainerLeft.current.scrollToIndex({animated: true, index: selectedItem});
		getSecondCategory();
	}, [selectedItem]);

	React.useEffect(() => {
		// refContainerRight.current.scrollToIndex({animated: true, index: selectedItem});
	}, [selectedItem]);

	const onScroll = event => {
		let y = event.nativeEvent.contentOffset.y;
		let focused = Math.floor(y / (68 * DP));
		console.log('foucsed', focused);
		if (focused < 1) {
			setSelectedItem(2);
		} else {
			setSelectedItem(focused + 2);
		}
	};

	const onScroll_second = event => {
		let y = event.nativeEvent.contentOffset.y;

		let focused = '';
		if (second.length < 5) {
			focused = Math.floor(y / (63 * DP));
		} else {
			focused = Math.floor(y / (69 * DP));
		}
		console.log('foucsed', focused);
		if (focused < 1) {
			setSelectedItem2(2);
		} else {
			setSelectedItem2(focused + 2);
		}
	};

	const getWidth = () => {
		return 324 * DP;
	};

	const onScrollToIndexFailed = e => {
		console.log('e', e);
	};

	const getFirst = () => {
		let arr = [padding, padding];
		let newArr = arr.concat(first);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};

	const getSecond = v => {
		let arr = [padding, padding];
		let newArr = arr.concat(second);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};

	return (
		<View style={style.background}>
			<TouchableWithoutFeedback onPress={() => Modal.close()}>
				<View style={{width: 750 * DP, height: 700}} />
			</TouchableWithoutFeedback>
			<View style={style.popUpWindow}>
				<View style={style.header}>
					{props.header == '' ? (
						<Text onPress={() => Modal.close()} style={[txt.noto30, {color: WHITE}]}>
							취소
						</Text>
					) : (
						<Text style={[txt.noto30, {color: WHITE}]}>{props.header}</Text>
					)}
					<TouchableOpacity onPress={onSelect}>
						<Text style={[txt.noto30, {color: WHITE}]}>완료</Text>
					</TouchableOpacity>
				</View>
				<View style={style.listContainer}>
					<View style={[style.list]}>
						<FlatList
							data={getFirst()}
							ref={refContainerLeft}
							scrollEventThrottle={50}
							onScroll={onScroll}
							showsVerticalScrollIndicator={false}
							renderItem={({item, index}) => {
								return (
									<TouchableWithoutFeedback key={index} onPress={() => setSelectedItem(index)}>
										<View
											key={index}
											style={[
												style.listItem,
												index == selectedItem && item != padding ? {backgroundColor: APRI10} : null,
												{
													width: getWidth(),
													// zIndex: 3,
												},
											]}>
											<Text style={[txt.roboto34, {color: item == padding ? GRAY20 : BLACK}]}>{item}</Text>
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
						{/* <View style={[style.box]} /> */}
					</View>
					<View style={[style.list]}>
						<FlatList
							data={getSecond()}
							ref={refContainerRight}
							scrollEventThrottle={50}
							onScroll={onScroll_second}
							showsVerticalScrollIndicator={false}
							renderItem={({item, index}) => {
								return (
									<TouchableWithoutFeedback key={index} onPress={() => setSelectedItem2(index)}>
										<View
											key={index}
											style={[
												style.listItem,
												index == selectedItem2 && item != padding ? {backgroundColor: APRI10} : null,
												{
													width: getWidth(),
													// zIndex: 3,
												},
											]}>
											<Text style={[txt.roboto34, {color: item == padding ? GRAY20 : BLACK}]}>{item}</Text>
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
						{/* <View style={[style.box]} /> */}
					</View>
				</View>
			</View>
		</View>
	);
};

SelectMultipleScrollBoxModal.defaultProps = {
	// header: 'popUp',
	onSelect: () => {},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 750 * DP,
		height: 476 * DP,
		// backgroundColor: 'yellow',
		paddingBottom: 52 * DP,
		// paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
		alignItems: 'center',
	},
	header: {
		width: 750 * DP,
		height: 88 * DP,
		flexDirection: 'row',
		backgroundColor: APRI10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	listContainer: {
		flexDirection: 'row',
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: WHITE,
	},
	list: {
		// width: 750 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'center',
		// width: 666 * DP,
		height: 70 * DP,
		borderRadius: 20 * DP,
	},
	box: {
		position: 'absolute',
		marginTop: 140 * DP,
		zIndex: -1,
		width: 322 * DP,
		borderRadius: 20 * DP,
		height: 70 * DP,
		backgroundColor: APRI10,
	},
});

export default SelectMultipleScrollBoxModal;
