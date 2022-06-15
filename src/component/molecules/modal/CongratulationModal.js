import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, TouchableOpacity} from 'react-native';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Congratulation} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import ProfileImageLarge194 from '../image/ProfileImageLarge194';

/**
 * 임시보호 입양 확정 축하 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {string} props.pet_nickname - 팝업 메시지
 * @param {string} props.pet_profile - 프로필 사진
 *
 */
const CongratulationModal = props => {
	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity style={[style.popUpWindow, style.shadow]}>
				<Text style={[txt.noto28, style.msg]}>임시보호가 아닌 반려동물로서의 새로운</Text>
				<Text style={[txt.noto28, style.msg]}>삶을 살게 된 {props.pet_nickname}(을)를 응원합니다!</Text>
				<View style={style.bottom}>
					<View style={[{transform: [{rotate: '90deg'}]}]}>
						<Congratulation />
					</View>
					<View style={[style.profileImg]}>
						<ProfileImageLarge194 data={{user_profile_uri: props.user_profile_uri}} />
					</View>
					<Congratulation />
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

CongratulationModal.defaultProps = {
	popUpMsg: 'popUp',
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
		height: 368 * DP,
		backgroundColor: WHITE,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40 * DP,
		padding: 24 * DP,
	},
	msg: {
		// marginBottom: 30 * DP,
		// marginTop: 30 * DP,
		// maxWidth: 466 * DP, // 상우 추가
		textAlignVertical: 'center',
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
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
	bottom: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 20 * DP,
	},
});

export default CongratulationModal;
