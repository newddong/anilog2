import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions} from 'react-native';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {Clip72, Email72, SocialKakao72} from 'Atom/icon';

/**
 * 공유 - 공유 목록 출력 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {()=>void} props.onPressKakao - 카카오톡 클릭
 * @param {()=>void} props.onPressLinkCopy - 링크복사 클릭
 * @param {()=>void} props.onPressMsg - 메시지 클릭
 *
 */
const SocialModal = props => {
	const onPressKakao = () => {
		props.onPressKakao();
	};
	const onPressLinkCopy = () => {
		props.onPressLinkCopy();
	};
	const onPressMsg = () => {
		props.onPressMsg();
	};

	return (
		<TouchableOpacity onPress={() => Modal.close()} activeOpacity={1} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<TouchableOpacity onPress={onPressKakao} style={[style.socialItem]}>
						<SocialKakao72 />
						<Text style={[txt.noto22, {color: GRAY10}]}>카카오톡</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressLinkCopy} style={[style.socialItem]}>
						<Clip72 />
						<Text style={[txt.noto22, {color: GRAY10}]}>링크복사</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressMsg} style={[style.socialItem]}>
						<Email72 />
						<Text style={[txt.noto22, {color: GRAY10}]}>메시지</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

SocialModal.defaultProps = {};

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
		height: 218 * DP,
		borderRadius: 40 * DP,
		backgroundColor: WHITE,
		justifyContent: 'center',
		alignItems: 'center',
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
	inside: {
		width: 324 * DP,
		flexDirection: 'row',
	},
	socialItem: {
		width: 92 * DP,
		height: 116 * DP,
		marginRight: 40 * DP,
	},
});

export default SocialModal;
