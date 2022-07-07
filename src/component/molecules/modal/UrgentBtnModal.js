import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity} from 'react-native';
import {WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import {Urgent_Write2} from 'Atom/icon';

/**
 * 긴급 게시 버튼 출력 모달
 * @param {Object} props - props object
 * @param {()=>void} props.onReport - 제보 클릭
 * @param {()=>void} props.onMissing - 실종 클릭
 * @param {Object} props.layout - 액션 버튼 실제 위치 정보
 */
const UrgentBtnModal = ({onReport, onMissing, layout}) => {
	console.log('layout', layout);

	const moveToMissingForm = () => {
		console.log('moveToMissingForm');
		onMissing();
	};

	const moveToReportForm = () => {
		onReport();
	};

	const onPressShowActionButton = () => {
		Modal.close();
	};

	return (
		<TouchableOpacity onPress={() => Modal.close()} activeOpacity={1} style={style.background}>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => Modal.close()}
				style={[style.popUpWindow, {bottom: Platform.OS == 'android' ? layout.y - 104 * DP : layout.y - 40 * DP}]}>
				<View style={[{marginTop: 0 * DP}]}>
					<TouchableOpacity onPress={moveToMissingForm} activeOpacity={0.4} style={[style.urgentBtnItemContainer]}>
						<Text style={[txt.noto32, {color: WHITE}]}>실종</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={moveToReportForm} activeOpacity={0.4} style={[style.urgentBtnItemContainer]}>
						<Text style={[txt.noto32, {color: WHITE}]}>제보</Text>
					</TouchableOpacity>
					<View style={[style.urgentActionButton]}>
						<TouchableOpacity onPress={onPressShowActionButton}>
							<Urgent_Write2 />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

UrgentBtnModal.defaultProps = {
	okButtonnMsg: '확인',
	onOk: () => {
		console.log('YES');
	},
	onSelectPet: e => {},
	isWriteMode: true,
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		position: 'absolute',
	},
	popUpWindow: {
		// width: 110 * DP,
		// height: 110 * DP,
		// position: 'absolute',
		// marginBottom: 235 * DP,
		// marginRight: 60 * DP,
		// justifyContent: 'center',
		// backgroundColor: 'white',
		// opacity: 0.9,
		width: 158 * DP,
		height: 332 * DP,
		position: 'absolute',
		right: 30 * DP,
		// bottom: 40 * DP,
		justifyContent: 'flex-end',
	},
	urgentBtnItemContainer: {
		width: 158 * DP,
		height: 90 * DP,
		borderRadius: 40 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
	},
	urgentActionButton: {
		width: 98 * DP,
		height: 86 * DP,
		alignSelf: 'flex-end',
		// backgroundColor: 'white',
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		borderRadius: 40 * DP,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 2 * DP,
		// 	height: 1 * DP,
		// },
		elevation: 4,
	},
});

export default UrgentBtnModal;
