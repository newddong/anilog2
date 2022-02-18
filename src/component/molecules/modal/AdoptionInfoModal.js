import React from 'react';
import {View, StyleSheet, Platform, Dimensions, Text, TouchableOpacity} from 'react-native';
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import AidRequest from 'Organism/listitem/AidRequest';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';

/**
 * 입양 및 임시보호 동물 알림 모달
 *
 * @param {Object} props - props object
 * @param {object} props.data - 보호동물 데이터오브젲ㄱ트
 * @param {string} props.msg - 팝업 메시지
 * @param {string} props.yesMsg - Yes버튼 타이틀
 * @param {string} props.noMsg - No 버튼 타이틀
 * @param {(data)=>void} props.onYes - 등록 클릭
 * @param {(data)=>void} props.onNo - 아니오  클릭
 *
 */
const AdoptionInfoModal = props => {
	// console.log('Adoption data', props.data);
	const data = props.data;
	const onYes = () => {
		props.onYes();
	};

	const onNo = () => {
		props.onNo();
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<View style={[style.infoText]}>
						<Text style={[txt.noto28, {color: GRAY10, textAlign: 'center'}]}>
							{/* 새로 입양하시는 동물이 있습니다. {'\n'}해당 동물을 등록하시겠습니까?{' '} */}
							{props.msg}
						</Text>
					</View>
					<View style={[style.aidRequestContainer]}>
						<AidRequest data={data} selectBorderMode={true} showBadge={false} />
					</View>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={props.noMsg} onPress={onYes} />
						<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.yesMsg} onPress={onNo} />
					</View>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

AdoptionInfoModal.defaultProps = {
	yesMsg: '등 록',
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
		width: 694 * DP,
		height: 490 * DP,
		padding: 20 * DP,
		// paddingBottom: 30 * DP,
		backgroundColor: WHITE,
		borderRadius: 50 * DP,
	},
	inside: {
		width: 654 * DP,
		height: 420 * DP,
		paddingVertical: 40 * DP,
	},
	infoText: {
		width: 466 * DP,
		height: 92 * DP,
		alignItems: 'center',
		alignSelf: 'center',
	},
	aidRequestContainer: {
		marginVertical: 20 * DP,
		// backgroundColor: 'yellow',
	},
	buttonContainer: {
		width: 486 * DP,
		alignSelf: 'center',
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

export default AdoptionInfoModal;
