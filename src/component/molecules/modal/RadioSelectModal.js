import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Platform, FlatList} from 'react-native';

import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import ProfileImageSmall from 'Molecules/image/ProfileImageSmall';
import {RadioChecked48, RadioUnchecked48} from 'Atom/icon';

/**
 * 선택창과 직접 입력창을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {string} props.selectMsg - 확인 버튼 메시지
 * @param {string} props.exitMsg - 나가기 버튼 메시지
 * @param {(petObject:string)=>void} props.onSelect - 확인 버튼 콜백
 * @param {()=>void} props.onExit - 확인 버튼 콜백
 * @param {Array.<string>} props.items - 첫번째 선택창에 들어갈 항목들의 배열
 *
 */

const RadioSelectModal = props => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const onSelect = index => {
		// console.log('dd', props.items[index].user_nickname);
		setSelectedIndex(index);
		// Mod;
	};

	const onConfirm = () => {
		// console.log('dddd');
		props.onSelect(props.items[selectedIndex]);
	};

	const renderItem = (item, index) => {
		// console.log('item', item);
		return (
			<View style={[style.itemContainer]}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<ProfileImageSmall size={94} data={item} />
					<Text style={[txt.roboto28b, style.itemTitle]} numberOfLines={1} ellipsizeMode={'tail'}>
						{item.user_nickname}
					</Text>
					<View style={[style.checkBox]}>
						{index == selectedIndex ? <RadioChecked48 onPress={() => onSelect(index)} /> : <RadioUnchecked48 onPress={() => onSelect(index)} />}
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={[style.listContainer]}>
					<FlatList
						data={props.items}
						keyExtractor={item => item._id}
						renderItem={({item, index}) => renderItem(item, index)}
						showsVerticalScrollIndicator={false}
					/>
				</View>

				<View style={{alignItems: 'center'}}>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnTitle={props.selectMsg} onPress={onConfirm} />
					</View>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTheme={'gray'} btnTitle={props.exitMsg} onPress={() => props.onExit()} />
					</View>
				</View>
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
		width: 450 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 10 * DP,
		paddingHorizontal: 30 * DP,
		borderRadius: 40 * DP,
		borderColor: APRI10,
		borderWidth: 5 * DP,
	},
	listContainer: {
		minHeight: 250 * DP,
		maxHeight: 667 * DP,
	},
	itemContainer: {
		marginBottom: 30 * DP,
		// backgroundColor: 'yellow',
	},
	itemTitle: {
		marginLeft: 20 * DP,
	},
	checkBox: {
		position: 'absolute',
		right: 10,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10 * DP,
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
});

export default RadioSelectModal;
