import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {Location54_Filled} from 'Root/component/atom/icon';

/**
 * 한개 버튼을 띄우는 모달
 *
 * @param {Object} props - props object
 * @param {()=>void} props.onPressAddrSearch - 주소 찾기 클릭
 * @param {()=>void} props.onConfirm - 확인 버튼 콜백
 * @param {()=>void} props.searchedLocation - 확인 버튼 콜백
 *
 */
const LocationCheckModal = props => {
	const onPressAddrSearch = () => {
		props.onPressAddrSearch();
	};

	const onConfirm = () => {
		props.onConfirm();
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28b, {marginBottom: 30 * DP, alignSelf: 'center'}]}>아래의 주소가 검색되었습니다. </Text>
				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<Location54_Filled />
					<Text style={[txt.noto28, style.msg]}>{props.searchedLocation}</Text>
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'위 주소로 등록'} onPress={onConfirm} />
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={'다른 주소 검색'} onPress={onPressAddrSearch} />
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

LocationCheckModal.defaultProps = {
	searchedLocation: '',
	okMsg: 'ok',
	onOk: () => {
		alert('OK');
	},
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
		width: 614 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		color: GRAY10,
		paddingVertical: 20 * DP,
	},
	buttonContainer: {
		marginTop: 35 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default LocationCheckModal;
