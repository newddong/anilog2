import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP, {isNotch} from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {styles} from 'Root/component/atom/image/imageStyle';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg, Triangle, Urgent_Write1, Urgent_Write2, Write94} from 'Atom/icon';
import userGlobalObject from 'Root/config/userGlobalObject';
import {feedWrite} from 'Root/component/templete/style_templete';

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
					<TouchableOpacity onPress={moveToMissingForm} activeOpacity={0.6} style={[style.urgentBtnItemContainer]}>
						<Text style={[txt.noto32, {color: WHITE}]}>실종</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={moveToReportForm} activeOpacity={0.6} style={[style.urgentBtnItemContainer]}>
						<Text style={[txt.noto32, {color: WHITE}]}>제보</Text>
					</TouchableOpacity>
					<View style={[style.urgentActionButton]}>
						<TouchableOpacity activeOpacity={0.8} onPress={onPressShowActionButton}>
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
