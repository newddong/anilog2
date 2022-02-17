import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList} from 'react-native';
import {WHITE, APRI10, BLACK, GRAY20, GRAY30} from 'Root/config/color';
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
 * @param {height} props.height - 취소 버튼 콜백
 *
 */
const SelectScrollBoxModal = props => {
	const data = props.data;
	const [selectedItem, setSelectedItem] = React.useState(2);
	const [selectedItem2, setSelectedItem2] = React.useState(2);
	const refContainerLeft = React.useRef('');
	const refContainerRight = React.useRef('');
	const padding = '---------------------------';

	const onSelect = () => {
		if (data.length == 1) {
			props.onSelect(data[0][selectedItem - 2]);
		} else {
			console.log('selectedItem2', selectedItem2);
			props.onSelect(data[0][selectedItem - 2], data[1][selectedItem2 - 2]);
		}
	};

	React.useEffect(() => {
		// refContainerLeft.current.scrollToIndex({animated: true, index: selectedItem});
	}, [selectedItem]);

	React.useEffect(() => {
		// refContainerRight.current.scrollToIndex({animated: true, index: selectedItem});
	}, [selectedItem]);

	const onScroll = (event, i) => {
		let y = event.nativeEvent.contentOffset.y;
		let focused = '';
		data[0].length < 5 ? (focused = Math.floor(y / (72 * DP))) : (focused = Math.floor(y / (78 * DP)));
		// console.log('foucsed', focused, i);
		if (i == 0) {
			if (focused < 1) {
				setSelectedItem(2);
			} else if (focused > data[0].length - 1) {
				console.log('넘어갔나?');
				setSelectedItem(data[0].length + 1);
			} else {
				setSelectedItem(focused + 2);
			}
		} else {
			if (focused < 1) {
				setSelectedItem2(2);
			} else if (focused > data[1].length - 1) {
				console.log('넘어갔나?');
				setSelectedItem2(data[1].length + 1);
			} else {
				setSelectedItem2(focused + 2);
			}
		}
	};

	const getWidth = () => {
		if (data.length == 1) {
			return 666 * DP;
		} else if (data.length == 2) {
			return 324 * DP;
		}
	};

	const onScrollToIndexFailed = e => {
		console.log('e', e);
	};

	const getPadding = v => {
		let arr = [padding, padding];
		let newArr = arr.concat(v);
		newArr.push(padding);
		newArr.push(padding);
		newArr.push(padding);
		return newArr;
	};

	const getColor = item => {
		if (item == padding) {
			return GRAY20;
		} else {
			return BLACK;
		}
	};

	return (
		<View style={style.background}>
			<TouchableWithoutFeedback onPress={() => Modal.close()}>
				<View style={{width: 750 * DP, height: 1200 * DP}} />
			</TouchableWithoutFeedback>
			<View
				style={[
					style.popUpWindow,
					{
						// height: props.height * DP,
					},
				]}>
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
					{data.map((v, i) => {
						return (
							<View style={[style.list]} key={i}>
								<FlatList
									data={getPadding(v)}
									ref={i == 0 ? refContainerLeft : refContainerRight}
									scrollEventThrottle={50}
									// keyExtractor={item => String(item)}
									// onScrollToIndexFailed={onScrollToIndexFailed}
									onScroll={e => onScroll(e, i)}
									showsVerticalScrollIndicator={false}
									renderItem={({item, index}) => {
										return (
											<TouchableWithoutFeedback key={index} onPress={() => (i == 0 ? setSelectedItem(index) : setSelectedItem2(index))}>
												<View
													key={index}
													style={[
														style.listItem,
														index == (i == 0 ? selectedItem : selectedItem2) && item != padding ? {backgroundColor: APRI10} : null,
														{
															width: getWidth(),
															// zIndex: 3,
															height: i == 0 ? 80 * DP : 80 * DP,
														},
													]}>
													<Text style={[txt.roboto34, {color: getColor(item)}]}>{item}</Text>
												</View>
											</TouchableWithoutFeedback>
										);
									}}
								/>
								{/* <View style={[style.box]} /> */}
							</View>
						);
					})}
				</View>
			</View>
		</View>
	);
};

SelectScrollBoxModal.defaultProps = {
	// header: 'popUp',
	onSelect: () => {},
	height: 476,
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

export default SelectScrollBoxModal;
