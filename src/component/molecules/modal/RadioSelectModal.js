import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList} from 'react-native';
import {WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {RadioChecked48, RadioUnchecked48} from 'Atom/icon';

/**
 * 선택창과 직접 입력창을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {string} props.title - 확인 버튼 메시지
 * @param {(string)=>void} props.onSelect - 확인 버튼 콜백
 *
 */

const RadioSelectModal = props => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const onSelect = index => {
		setSelectedIndex(index);
		props.onSelect(props.items[index]);
	};

	const renderItem = (item, index) => {
		console.log('item', item);
		return (
			<View style={[style.itemContainer]}>
				<View style={[style.checkBox]}>
					{index == selectedIndex ? <RadioChecked48 onPress={() => onSelect(index)} /> : <RadioUnchecked48 onPress={() => onSelect(index)} />}
				</View>
				<Text style={[txt.roboto28b, style.itemTitle]} numberOfLines={1} ellipsizeMode={'tail'}>
					{item}
				</Text>
			</View>
		);
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={[style.header]}>
					<Text style={[txt.noto30b]}>{props.title}</Text>
				</View>
				<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} showsVerticalScrollIndicator={false} />
			</View>
		</View>
	);
};

RadioSelectModal.defaultProps = {
	selectMsg: '확인',
	exitMsg: '나가기',
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
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
		width: 224 * DP,
		height: 48 * DP,
		marginBottom: 40 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemTitle: {
		marginLeft: 20 * DP,
	},
	checkBox: {marginRight: 12 * DP},
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
});

export default RadioSelectModal;
