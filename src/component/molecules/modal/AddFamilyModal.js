import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';

/**
 * 가족 계정 추가 컨펌 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {()=>void} props.onNo - 취소 버튼 콜백
 * @param {()=>void} props.onYes - 확인 버튼 콜백
 *
 */
const AddFamilyModal = props => {
	const data = props.data;
	console.log('props.data', props.data);
	const pressYes = () => {
		props.onYes();
	};
	const pressNo = () => {
		props.onNo();
	};
	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>이 계정을 가족으로 추가하시겠습니까?</Text>
				<View style={style.label}>
					<UserDescriptionLabel data={data} />
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'취소'} onPress={pressNo} />
					<AniButton btnLayout={btn_w226} btnTitle={'추가하기'} onPress={pressYes} />
				</View>
			</View>
		</View>
	);
};

AddFamilyModal.defaultProps = {
	onNo: () => {
		alert('NO');
	},
	onYes: () => {
		alert('YES');
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
		height: 320 * DP,
		backgroundColor: WHITE,
		paddingVertical: 30 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 50 * DP,
	},
	msg: {
		marginBottom: 20 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	label: {
		marginBottom: 30 * DP,
		paddingHorizontal: 20 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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

export default AddFamilyModal;
