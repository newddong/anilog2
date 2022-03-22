import React from 'react';
<<<<<<< HEAD
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
=======
import {View, StyleSheet, Platform, Dimensions, TouchableOpacity} from 'react-native';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import AidRequest from 'Organism/listitem/AidRequest';
<<<<<<< HEAD
=======
import Modal from 'Root/component/modal/Modal';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca

/**
 * 나의 보호소 출신 동물 / 보호동물 및 보호요청게시글 게이트웨이 모달
 *
 * @param {Object} props - props object
 * @param {object} props.data - 팝업 메시지
 * @param {(data)=>void} props.onPressAdoptorInfo - 입양처보기 클릭
 * @param {(data)=>void} props.onPressReqeustInfo - 게시글보기 클릭
 *
 */
const AnimalInfoModal = props => {
	const data = props.data;
	const onPressAdoptorInfo = () => {
		props.onPressAdoptorInfo();
	};

	const onPressReqeustInfo = () => {
		props.onPressReqeustInfo();
	};

	return (
<<<<<<< HEAD
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<View style={[style.aidRequestContainer]}>
						<AidRequest data={data.protect_animal_id} selectBorderMode={true} showBadge={false} />
=======
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<View style={[style.aidRequestContainer]}>
						<AidRequest data={data.protect_animal_id} selectBorderMode={true} showBadge={false} inActiveOpacity={true} />
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
					</View>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'게시글 보기'} onPress={onPressAdoptorInfo} />
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'입양처 보기'} onPress={onPressReqeustInfo} />
					</View>
				</View>
<<<<<<< HEAD
			</View>
		</View>
=======
			</TouchableOpacity>
		</TouchableOpacity>
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
	);
};

AnimalInfoModal.defaultProps = {};

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
<<<<<<< HEAD
		height: 358 * DP,
		padding: 20 * DP,
		paddingBottom: 30 * DP,
=======
		height: 368 * DP,
		padding: 20 * DP,
		paddingVertical: 30 * DP,
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca
		backgroundColor: WHITE,
		borderRadius: 50 * DP,
	},
	inside: {
		width: 654 * DP,
		height: 308 * DP,
		justifyContent: 'space-between',
	},
	aidRequestContainer: {},
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

export default AnimalInfoModal;
